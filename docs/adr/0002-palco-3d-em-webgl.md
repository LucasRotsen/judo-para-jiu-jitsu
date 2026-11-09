# ADR 0002 — Palco das técnicas 3D em WebGL (three.js)

Data: 2026-11-09 · Status: aceita

## Contexto

O motor 3D em canvas desenha cápsulas ordenadas por profundidade (algoritmo do pintor) e só
mostra ângulos fixos. Isso limita o realismo e gera erros de ordem de desenho quando as peças se
cruzam. O usuário pediu para "enxergar o movimento como se fossem dois humanos" e girar a cena
livremente.

## Decisão

- O palco principal das técnicas 3D passa a ser renderizado em WebGL com three.js 0.160.1
  (vendorizado em `site/assets/vendor/three`, MIT, para o PWA continuar funcionando offline).
- Os dados não mudam: keyframes, IK e anotações continuam vindo de `Judo.pose3`. O renderizador
  novo (`site/assets/engine-gl.js`) só desenha: buffer de profundidade, luz, sombra, tronco
  anatômico em malha única, contorno (inverted hull) e câmera orbital (arrastar gira, pinça/roda
  aproxima; botões levam aos ângulos sugeridos).
- Anotações continuam sendo as primitivas 2D do motor, desenhadas num canvas por cima e
  projetadas da câmera real.
- Sem WebGL, a página cai no palco em canvas de antes. Miniaturas, cards do índice e imagens de
  compartilhamento continuam no canvas (baratos e determinísticos).

## Consequências

- ~700 KB a mais no primeiro acesso a uma técnica 3D (cacheado pelo service worker).
- Testes rodam com WebGL por software (SwiftShader) para exercitar o caminho real.
- Próximos passos: mãos e pés com forma, rosto, tecido do gi; migrar as técnicas 2D restantes.
