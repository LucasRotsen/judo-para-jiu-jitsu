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
tools/sheet.sh sankaku-jime 1,4,6.5 out/sk.png "views=1"   # folha de quadros p/ revisão visual
npm test                              # smoke test: todas as páginas carregam sem erro de JS
```

## Simulador

`simulador.html`: o aluno escolhe a posição, arrasta as mãos do oponente até pegadas no próprio
gi e diz o que ele está fazendo; a página lista as opções com o porquê de cada uma.

- `site/assets/simulador/situacoes.js`: posições (poses dos bonecos), pegadas, ações e a base de
  conhecimento (`OPCOES`, cada uma com `score(estado)`, `porque`, `passos` e `tech` opcional).
- `site/assets/simulador/simulador.js`: cena, arraste, URL compartilhável e lista de opções.
- Para acrescentar uma opção, inclua um item em `OPCOES` e um caso em `tests/simulador.spec.js`.

## Adicionando uma técnica

1. Acrescente `{id, name, group}` em `site/assets/catalog.js` (`group`: `nage` ou `ne`; técnicas próprias do jiu-jitsu levam também `"origin": "bjj"`).
2. Crie `site/assets/tecnicas/<id>.js`. Use `Judo.register3d` quando a ação acontece em
   profundidade (veja `sankaku-jime.js`) e `Judo.register` para quedas de perfil
   (veja `ippon-seoi-nage.js`).
3. Inclua o script no índice: `tools/templates/index.body.html` não precisa mudar; rode
   `python3 tools/build.py` para gerar a página e atualizar o índice.
4. Confira que nenhum membro atravessa o outro corpo: `node tools/interpenetracao.js <id>`
   (lista cada instante em que um membro entra mais de 6 cm no tronco ou na cabeça do outro).
5. Revise quadro a quadro: `tools/sheet.sh <id> 1,3,5 out/x.png "views=1"`.
6. `npm test`.

## Arquitetura e decisões

Ver [`docs/adr`](docs/adr).

## Segurança

As animações servem para estudo. Aprenda quedas e estrangulamentos com um professor qualificado.
