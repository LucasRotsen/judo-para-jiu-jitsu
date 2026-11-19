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


## 2026-11-19 — Contratos por técnica + botão "isso parece errado" (etapas A e F)

Objetivo: o computador pega sozinho os erros que hoje só o usuário pega (parte errada do corpo
no contato, lado trocado, cabeça voltando no giro, queda de cabeça).

- [x] `tools/contratos.js`: partes do corpo nomeadas (T.joelhoR, U.peito...) e regras:
      contato, longe, lado, giro sem volta, e "ninguém cai de cabeça" (vale para toda técnica)
- [x] Contratos declarados como dados em `def.contratos` (o motor ignora)
- [x] Validação com erros históricos (`--historico`): as 4 versões antigas falham, as atuais passam
- [x] Portão no build e na CI, com catraca (`tools/contratos-pendentes.json`)
- [x] F: "⚑ Parece errado" no player → issue no GitHub com técnica, segundo, fase, ângulo e link
- [ ] Testes, commit, push

### Revisão

- Os 4 erros que o usuário já tinha apontado são pegos pelos contratos atuais nas versões antigas do git.
- Calibração honesta: 3 contratos falharam nas versões BOAS na primeira escrita. Em todos o erro era
  meu, de anatomia ou de régua, não da animação: (1) o joelho do escudo fica a 9 cm do peito porque o gi
  e o corretor deixam folga; o que separa o certo do errado é o pé ficar na cintura esquerda (no erro, a
  canela cruzava a barriga até o lado direito); (2) no triângulo fechado o joelho vai para o outro lado da
  cabeça; o essencial é a coxa por cima do ombro esquerdo; (3) o giro da omoplata se mede em volta do
  próprio quadril de Tori, vista de cima, até ele sentar.
- A regra global achou 5 quedas de cabeça que ninguém tinha visto (Ippon Seoi Nage, O Goshi, Uchi Mata,
  Tomoe Nage, Sumi Gaeshi): Uke vertical com a cabeça a 30 cm do tatame. Ficam na catraca até corrigir.
- Limite: contrato só pega o que foi escrito. 4 de 53 técnicas têm contrato próprio.
