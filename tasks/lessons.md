# Lessons

## 2026-11-06 — Sankaku jime ilegível em 2D
- Erro: aceitei uma técnica cuja mecânica acontece em profundidade (triângulo: canela atravessando a nuca, figura-4 das pernas) num rig 2D de perfil. O fork relatou "joelho cobre a cabeça" e eu publiquei mesmo assim.
- Regra: antes de animar, perguntar "a ação principal acontece no plano da câmera?". Se não, usar o motor 3D com múltiplos ângulos, ou não incluir a técnica.
- Regra: fraquezas visuais relatadas por subagentes que atingem o *ponto principal* da técnica bloqueiam a publicação; só fraquezas periféricas podem ir para o relatório.

## 2026-11-06 — Merge antes da CI registrar
- Erro: `gh pr checks --watch && gh pr merge` fez merge quando a CI ainda não tinha aparecido ("no checks reported" não falha o `&&` como esperado).
- Regra: esperar explicitamente até existir um check com `pass` (`until gh pr checks N | grep -q pass`) antes de mergear.

## 2026-11-06 — `[hidden]` vencido por `display`
- Erro: `.tcard{display:grid}` anulava o atributo `hidden`; o filtro do índice nunca funcionou e ninguém viu porque não havia teste.
- Regra: todo controle de UI que esconde/mostra coisas ganha um teste de visibilidade; CSS base tem `[hidden]{display:none!important}`.

## 2026-11-06 — CI travando no apt
- Erro: `playwright install --with-deps` trava às vezes no apt do runner; cache dos browsers não resolve porque o apt continua rodando.
- Regra: rodar Playwright no container oficial `mcr.microsoft.com/playwright:<versão>` com a mesma versão do package.json.

## 2026-11-06 — Arquivos gerados em PRs paralelos
- Erro: rebase automático de PRs paralelos duplicou uma entrada do `catalog.js` (cada fork já trazia a do outro).
- Regra: ao resolver conflito em lista de dados, deduplicar por id; o teste "catálogo e arquivos batem" é a rede de segurança. `index.html`/`sw.js` nunca se resolvem à mão: regenerar com `tools/build.py`.

## 2026-11-06 — Prioridade em regras do simulador
- Erro: empate de pontuação deixou o "upa" acima de "defender o estrangulamento" com as duas golas presas.
- Regra: toda situação de perigo imediato (estrangulamento, chave encaixada) tem pontuação estritamente maior que qualquer ataque/fuga; cada situação clássica ganha um caso em `tests/simulador.spec.js`.

## 2026-11-06 — Membros atravessando o outro corpo (relatado pelo usuário)
- Erro: aprovei 14 técnicas 3D olhando folhas de quadros e checando só "abaixo do chão". Um membro passando por dentro do outro boneco não aparece de forma óbvia numa folha pequena; 13 de 14 técnicas tinham isso (canela da tesoura atravessando o tronco, antebraço no Kata Gatame).
- Regra: revisão visual não basta para geometria. Toda técnica 3D passa no medidor de penetração (hoje `node tools/diagnostico.js <id>`) antes do merge; depois de corrigidas todas, isso vira portão da CI.
- Regra: não corrigir dados ruins com remendo no motor. Empurrar o membro para fora automaticamente escondeu o erro e distorceu a técnica (a tesoura deixou de ser tesoura). Corrigir o keyframe/polo/transição na origem.
- Regra: transições entre um alvo atrás do corpo do outro e um à frente precisam de keyframe intermediário contornando pelo lado; interpolação em linha reta passa por dentro.

## 2026-11-09 — Vendi melhoria visual que o usuário achou pior
- Erro: afirmei "bem mais humano" para o palco WebGL olhando miniaturas que eu mesmo gerei; o usuário achou pior que antes e ilegível.
- Regra: mudança visual grande só entra depois de o usuário ver um lado a lado (antes/depois, mesmo quadro). Não declarar "melhor" em nome dele.
- Regra: antes de iterar em detalhes, perguntar se a abordagem consegue chegar no alvo. Bonecos de cápsula animados à mão não chegam em "dois humanos treinando"; o caminho é modelo humano com esqueleto e/ou captura de movimento.

## 2026-11-13 — "Pernas atravessando corpos e trocando de lado" (relatado pelo usuário, de novo)
- Erro: o portão de 06/11 media só membro contra tronco/cabeça do outro. Perna contra perna, braço contra braço e o próprio corpo nunca foram medidos; 13 PRs "sem membros atravessando" passaram com coxa sobreposta a coxa por segundos. Medindo tudo: 654 s somados de penetração.
- Regra: um portão só vale pelo que mede. Antes de declarar uma classe de defeito resolvida, listar o que o medidor NÃO cobre e dizer isso ao usuário.
- Regra: quando o mesmo defeito volta depois de corrigido caso a caso, parar de corrigir caso a caso. Aqui a causa era de modelo (keyframe interpolado em linha reta + IK sem colisão + ordenação por profundidade), e a correção foi no modelo (`fisica.js` + WebGL com profundidade).
- Regra (refina a de 06/11): "não remendar no motor" vale para remendo que quebra o contato. Um solucionador que mantém o membro encostado na superfície, com continuidade, é o modelo certo; ainda assim, cada técnica é conferida em folha de quadros.
- Regra: artefato gerado que depende de dois lados (`site/assets/assado/` depende das técnicas e de `fisica.js`) precisa de checagem de frescor (`tools/assar.js --check`). Mudei o formato e rodei a página com arquivos velhos: os bonecos flutuaram.

## 2026-11-14 — "Braço pelo lado errado", Kata Gatame "horrível": a técnica estava errada, não só a física
- Erro: escrevi e "corrigi" poses de memória. O medidor de penetração não sabe se o braço passa pelo flanco certo, se Uke cai onde cai de verdade ou se a imobilização parece a imobilização. Só quem treina viu.
- Regra: técnica nova ou refeita parte de um vídeo de referência (canal KODOKAN: vários ângulos, câmera lenta). Extrair quadros com ffmpeg, renderizar o boneco no mesmo ângulo (`tools/folha.js ... cam=`) e comparar lado a lado, em pelo menos lateral, frente e de cima. Vídeo e quadros ficam fora do repositório.
- Fato medido: detector de pose 2D (YOLO-pose) acompanha os dois enquanto estão em pé e separados, e se perde assim que os corpos se sobrepõem na projeção. Captura automática não serve para a parte que importa; rotoscopia manual serve.
- Regra: cambalhota com torção em ângulos de Euler: fazer a torção com o corpo invertido (pitch passando por 180, yaw fazendo a torção, roll mantendo a inclinação). Torcer com roll cruzando 90 achata o corpo no meio do voo.
- Regra: numa projeção de quadril Uke roda em volta do quadril, pela frente de Tori. Se ele passa acima dos ombros de Tori, está errado.
