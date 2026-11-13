# ADR 0002 — Corpo humano em WebGL e pose física resolvida de antemão

Data: 2026-11-13 · Status: proposta (aguarda o usuário ver o antes/depois)

## Contexto

Os bonecos eram cápsulas desenhadas em canvas 2D e ordenadas por profundidade (algoritmo do
pintor), animadas por keyframes com IK direto no alvo. O usuário descreveu o resultado como
"horrível": pernas atravessando corpos e trocando de lado do nada. A medição confirmou
(`tools/diagnostico.js --cru`): somando todas as técnicas, 654 s de alguma parte de um boneco
dentro do outro. O portão antigo só olhava membro contra tronco; membro contra membro nunca foi
medido. As "trocas de lado" vinham de três fontes: a ordenação por profundidade invertendo peças
que se cruzam, o joelho/cotovelo saltando quando o alvo passa perto do eixo do membro, e alvos
interpolados em linha reta por dentro do outro corpo.

Uma tentativa anterior de palco WebGL com cápsulas volumosas foi rejeitada pelo usuário, e
corrigir keyframe por keyframe (14 PRs) não resolveu a classe do problema.

## Decisão

1. **Keyframes passam a ser intenção; o que se desenha é a pose física** (`fisica.js`).
   Para cada quadro, em sequência: troncos se afastam se estiverem um dentro do outro, a cabeça
   inclina para não entrar no corpo do outro, e cada membro anda de onde estava até o alvo
   escorregando na superfície do que encontrar; o giro do joelho/cotovelo é escolhido por custo
   (colisão, anatomia, preferência do keyframe, continuidade) com limite de velocidade.
   Isto não é o "empurrão automático" que a lição de 06/11 proíbe: lá o membro era jogado para
   fora depois de pronto e perdia o contato; aqui o contato é o resultado (a canela da tesoura
   fica encostada na barriga, não dentro dela).
2. **A pose física é resolvida no build** (`tools/assar.js` → `site/assets/assado/<id>.js`,
   30 quadros/s, int16, ~40 KB por técnica). No navegador a técnica inteira custaria 1 a 3 s.
   O índice carrega só o quadro de capa de cada técnica (`capas.js`, 4 KB) e baixa o resto
   quando o card anima. O simulador resolve ao vivo, um quadro por vez.
3. **O corpo é uma malha humana de judogi gerada em código** (`corpo-gl.js`): sem modelo
   externo nem biblioteca, presa aos ossos da pose, desenhada em WebGL2 com buffer de
   profundidade, sombreado em dois tons e contorno. Um único canvas WebGL escondido serve todos
   os canvas 2D do site (palco, miniaturas, cards) via `drawImage`; piso e anotações continuam
   em 2D. Sem WebGL2 o motor cai nas cápsulas.

## Consequências

- Penetração entre bonecos: de 654 s para ~25 s somados; o que resta são contatos de raiz
  (pé plantado sobre pé, braço preso entre dois peitos) e está listado por técnica em
  `tools/orcamento.json`, que a CI usa como catraca: nenhuma técnica pode piorar.
- `site/assets/assado/` é gerado e versionado; a CI confere com `node tools/assar.js --check`.
- `site/assets/modelos/corpo.glb` (2,9 MB, personagem de terceiros) não é usado por nada.
- Mudar `fisica.js` ou uma técnica exige `npm run build`.
