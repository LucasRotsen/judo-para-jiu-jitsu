# Todo

O backlog vive nas issues do GitHub. Este arquivo guarda a revisão de cada entrega.

## 2026-11-13 — Bonecos humanos, pose física e simulador livre (branch `feat/bonecos-humanos`)

Pedido: bonecos "horríveis" (pernas atravessando corpos, trocando de lado) e simulação engessada
(poder arrastar os bonecos e rodar a simulação dali). Foco nos bonecos.

- [x] Medir: `tools/diagnostico.js` (tudo contra tudo, saltos, alvo não alcançado)
- [x] Pose física: `site/assets/fisica.js` (colisão, anatomia, continuidade, tronco e cabeça)
- [x] Assar no build: `tools/assar.js` → `site/assets/assado/`; índice só com as capas
- [x] Corpo humano de judogi em WebGL: `site/assets/corpo-gl.js`, com queda para cápsulas
- [x] Simulador: alças em mãos, pés, quadril, tronco e giro; "Simular daqui"
- [x] Testes (WebGL ativo, queda sem WebGL, arrastes, simular daqui) e catraca na CI
- [ ] Usuário ver o antes/depois e aprovar antes de qualquer merge (lição de 09/11)

### Revisão

Penetração entre os dois bonecos, somando as 18 técnicas: 654 s → 24,5 s. Dentro do próprio
corpo: 217 s → 38 s. O que resta e por quê:
- pé de apoio sobre pé de apoio e braço preso entre dois peitos colados: são erros de posição do
  tronco nos keyframes; o solucionador não move pé plantado nem tira braço de onde não há espaço;
- juji-gatame: braço de Uke 11 cm dentro do peito de Tori no fim (raiz do braço colada no tronco);
- `dobra` (88 s): a régua de anatomia de cotovelo ainda não foi validada no olho, não entra na catraca;
- malha: mão é um punho fechado fixo, sem dedos; coluna rígida do quadril ao ombro (só a pelve inclina);
- "Simular daqui" faz uma entrada de 0,9 s da pose montada até o início da técnica gravada; não
  adapta a técnica à pose (ex.: se o usuário trocou os bonecos de lado, eles voltam).

