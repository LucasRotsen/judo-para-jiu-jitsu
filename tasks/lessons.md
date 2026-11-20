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

## 2026-11-14 — Sankaku Jime: "olha o seu, olha o certo. Por quê?"
- Erro 1: o corretor de colisões tratava a perna que estrangula como "perna atravessando o corpo" e a empurrava para longe do pescoço. Os keyframes pediam o triângulo; o corretor o desfazia. O medidor premiava isso (menos penetração = melhor).
- Erro 2: o subagente otimizou o número (auto-penetração 10 s -> 0,7 s) e eu aceitei o relatório sem olhar a pose final contra uma imagem da técnica.
- Regra: técnica em que um membro aperta o corpo do outro de propósito (triângulo, mata-leão, kata-gatame) declara `aperto:{s,e,limbs,tol}`; corretor e medidor respeitam. Antes de mexer em keyframe, renderizar com `cru=1`: se a pose crua está certa e a resolvida não, o defeito é do corretor.
- Regra: relatório de subagente não substitui olhar. Toda técnica entregue tem que ter o quadro da posição final comparado por mim com uma referência, não só os números.
- Regra: a vista principal da página tem que ser a que mostra a técnica (no triângulo, por trás da cabeça de Tori), não uma diagonal genérica.

## 2026-11-14 — Joelho na barriga: "Ficou excelente. Use como aprendizado" (usuário)
- O que funcionou: (1) foto de referência do usuário; (2) render `cru=1` contra resolvido para saber se o erro é do keyframe ou do corretor; (3) descrever a foto em pontos do corpo (onde está o joelho, o pé, o quadril, o tronco, cada mão) e calcular esses pontos no mundo, conferindo comprimentos de coxa/canela/braço; (4) declarar `aperto` quando um membro pesa no outro; (5) render de perto no ângulo da foto antes de entregar; (6) dizer o que ainda difere.
- Regra: repetir exatamente esse roteiro em toda correção de pose.

## 2026-11-15 — Tesoura: "é o joelho que cruza o peito, não a canela" (usuário, com vídeo do Roger Gracie)
- Erro: li a primeira foto (vista de cima, por trás da cabeça) como "canela atravessada na barriga" e ainda escrevi isso nos textos da página. Uma foto num só ângulo não mostra qual parte da perna faz contato.
- Regra: antes de posar, dizer em uma frase QUAL parte do corpo toca ONDE ("joelho cruza o peito; pé engancha no quadril") e conferir essa frase com uma segunda imagem de outro ângulo, ou perguntar. Se o texto da página descreve o contato, ele muda junto com a pose.

- Omoplata, sentido do giro (correção do usuário): depois de encaixar a perna por dentro do braço, Tori continua de costas e a cabeça segue rodando para o lado das pernas de Uke; só então senta. Eu tinha feito a cabeça ir até o lado e voltar. Regra: em giros no chão, escrever antes por onde a CABEÇA de Tori passa (início, meio, fim) e conferir numa vista de cima que ela não volta pelo caminho por onde veio.

## 2026-11-16 — Commit com teste falhando, de novo (erro meu, pego por mim)
- Erro: encadeei teste e commit com `;` e o commit entrou com 2 testes de PWA falhando. Causa da falha: `sw.js` (gerado, fora do git) lista TODOS os arquivos de `site/assets/tecnicas/`; havia dois arquivos de técnica ainda fora do catálogo quando rodei o build, depois os tirei da pasta, e o precache do service worker passou a pedir arquivos inexistentes (instalação falha em silêncio e o usuário fica com a versão velha em cache).
- Regra: teste e commit sempre com `&&`, nunca `;`. Ler a linha "N passed / N failed" antes de qualquer `git commit`.
- Regra: técnica em construção não fica em `site/assets/tecnicas/` na hora do build. Ou está no catálogo, ou está fora da pasta. Depois de mover arquivo de técnica, rodar o build de novo.

## 2026-11-16 — Quedas na vertical de ponta-cabeça (pego por mim em 5 de 16 técnicas novas)
- Erro recorrente dos subagentes: copiar a cambalhota de outra técnica ou do vídeo e deixar Uke na vertical, cabeça perto do tatame e pernas para o teto. Um judoca lê isso como pilão (queda de cabeça, proibida). Os números (cruza/proprio/erro) não pegam isso.
- Regra: em toda projeção, olhar a vista principal a cada 0,1 s na queda e medir cabeça/ombro/quadril a cada 0,05 s. Com a cabeça abaixo de ~0,5 m, o corpo tem que estar de lado e perto da horizontal; ombro/costas tocam antes da cabeça; `h` positivo (queixo no peito).
- Regra: pôr isso no brief do subagente desde o início (está no fim do BRIEF2), não só na revisão.

## 2026-11-19 — Harai Goshi: "o adversário cai pro lado contrário. Noção básica de física entre os corpos" (usuário)
- Erro: a animação (e o texto e o contrato que escrevemos em cima dela) faz Uke cair para o lado ESQUERDO dele,
  quando o braço direito de Tori, a varrida da perna direita e o próprio kuzushi da página ("mais para o lado
  direito dele") o levam para o canto frente-direita. O contrato foi escrito a partir do texto da técnica, e o texto
  descrevia a animação errada: contrato copiado de texto errado só tranca o erro.
- Regra: em toda projeção, o lado da queda sai da física, não do texto: a queda vai para o canto do kuzushi, pelo lado
  do braço e da perna que aplicam. Conferir lado da queda × direção do kuzushi (fatos da página) antes de escrever
  contrato, e escrever o contrato como "Uke cai para o lado X dele".
- Regra: ajuste fino de keyframes não muda a direção de uma queda. Trocar o lado da queda é refazer a fase aérea
  (por onde o quadril de Uke passa, por cima de qual quadril/coxa de Tori), a partir de referência.
