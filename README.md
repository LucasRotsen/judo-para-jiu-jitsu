# Judô para Jiu-Jitsu

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

## Arquitetura e decisões

Ver [`docs/adr`](docs/adr).

## Segurança

As animações servem para estudo. Aprenda quedas e estrangulamentos com um professor qualificado.
