# Judô para Jiu-Jitsu

**Site:** https://lucasrotsen.github.io/judo-para-jiu-jitsu/

Catálogo animado de técnicas de judô para quem treina jiu-jitsu. Cada técnica tem uma animação
explicativa com as fases do golpe, os pontos de atenção, os erros comuns e o nome que ela recebe
no jiu-jitsu.

- **Nage-waza** (em pé): Ippon Seoi Nage, O Soto Gari, O Goshi, De Ashi Barai, Tomoe Nage, Morote Gari
- **Ne-waza** (no chão): Tate Shiho Gatame, Kami Shiho Gatame, Sankaku Jime, Hadaka Jime

## Como funciona

Site estático, sem build e sem dependências em tempo de execução. As animações são desenhadas em
`<canvas>` por dois motores próprios:

- `site/assets/engine.js`: motor 2D de perfil (rig com IK de dois ossos, keyframes com
  interpolação Hermite monotônica, anotações) e a interface das páginas.
- `site/assets/engine3d.js`: motor 3D com câmeras ortográficas, para técnicas cuja ação acontece em
  profundidade. Mostra três ângulos sincronizados.

Cada técnica é um arquivo de dados em `site/assets/tecnicas/<id>.js`.

## Rodando localmente

```sh
python3 -m http.server -d site 8000   # abre http://localhost:8000
python3 tools/build.py                # regenera as páginas <id>.html a partir do catálogo
node tools/folha.js sankaku-jime 1,4,6.5 out/sk.png "views=1"   # folha de quadros p/ revisão visual
npm run build                         # resolve as poses físicas e regenera as páginas
npm test                              # smoke test: todas as páginas carregam sem erro de JS
```

## Simulador

`simulador.html`: o aluno escolhe a posição e arrasta mãos, pés, quadril e tronco dos dois
bonecos até a situação que quer (uma mão solta perto de um ponto do gi pega ali). A página lista
as opções com o porquê de cada uma e, em "Simular daqui", roda a técnica no palco a partir da
pose montada.

- `site/assets/simulador/situacoes.js`: posições (poses dos bonecos), pegadas, ações e a base de
  conhecimento (`OPCOES`, cada uma com `score(estado)`, `porque`, `passos` e `tech` opcional).
- `site/assets/simulador/simulador.js`: cena, arraste, URL compartilhável e lista de opções.
- Para acrescentar uma opção, inclua um item em `OPCOES` e um caso em `tests/simulador.spec.js`.

## Bonecos e movimento

- `site/assets/engine3d.js`: keyframes e IK. É a *intenção*: onde fica o tronco e para onde vai
  cada mão e pé.
- `site/assets/fisica.js`: transforma a intenção numa pose que dois corpos conseguem fazer
  (nada atravessa nada, joelho e cotovelo dobram para o lado certo e não trocam de lado de um
  quadro para o outro). `Judo.solve(def,t)` é o que o site desenha.
- `site/assets/assado/`: a pose física de cada técnica, resolvida de antemão por
  `tools/assar.js` (no navegador custaria 1 a 3 s por técnica). Gerado; não edite à mão.
- `site/assets/corpo-gl.js`: o corpo humano de judogi (malha gerada no próprio arquivo, sem
  modelo externo) desenhado em WebGL com profundidade real. Sem WebGL2 cai nas cápsulas.

## Adicionando uma técnica

1. Acrescente `{id, name, group}` em `site/assets/catalog.js` (`group`: `nage` ou `ne`; técnicas próprias do jiu-jitsu levam também `"origin": "bjj"`).
2. Crie `site/assets/tecnicas/<id>.js`. Use `Judo.register3d` quando a ação acontece em
   profundidade (veja `sankaku-jime.js`) e `Judo.register` para quedas de perfil
   (veja `ippon-seoi-nage.js`).
3. Inclua o script no índice: `tools/templates/index.body.html` não precisa mudar; rode
   `python3 tools/build.py` para gerar a página e atualizar o índice.
4. Rode `npm run build`: resolve a pose física da técnica (`tools/assar.js` grava
   `site/assets/assado/<id>.js`) e gera a página.
5. Meça o movimento: `node tools/diagnostico.js <id>` lista, com instante e duração, cada parte de
   um boneco dentro do outro (`cruza`) ou de si mesmo (`proprio`), joelho/cotovelo que salta
   (`salto`) e mão ou pé que não chega no alvo (`erro`). `--cru` mede os keyframes sem a física.
   Quando estiver bom, `node tools/diagnostico.js --gravar` atualiza o orçamento da CI.
   Para medir posições: `node tools/sonda.js <id> <tempos>`.
6. Revise quadro a quadro: `node tools/folha.js <id> 1,3,5 out/x.png "views=1"`
   (`capsulas=1&cru=1` mostra o desenho e a pose antigos, para comparar).
7. `npm test`.

## Arquitetura e decisões

Ver [`docs/adr`](docs/adr).

## Segurança

As animações servem para estudo. Aprenda quedas e estrangulamentos com um professor qualificado.
