(()=>{const {W3,B,SL,win}=Judo;
/* Drill da guarda fechada: raspagem de quadril → kimura → guilhotina.
   Os trechos de cada golpe vêm dos keyframes das próprias técnicas (Judo.drill); aqui só ficam as pontes,
   que são a reação de Uke que leva de um golpe ao outro. Mesmo referencial das três: Uke de frente para -x
   (direita de Uke = -z), Tori de costas com a cabeça para -x (direita de Tori = +z).
   Ponte 1: Uke trava a raspagem tirando o braço direito e apoiando a mão no tatame; Tori pega o punho (kimura).
   Ponte 2: Uke esconde o braço da kimura e vem para a frente com a cabeça baixa; o braço direito de Tori já
   está por cima do ombro dele e vira guilhotina. */
Judo.drill({
 id:'drill-quadril-kimura-guilhotina', name:'Drill: quadril, kimura, guilhotina', kanji:'', group:'drill', cls:'Drill · Guarda fechada',
 bjj:'Raspagem de quadril → kimura → guilhotina',
 why:'O trio de ataques clássico de quem senta na guarda fechada: cada defesa de Uke abre o golpe seguinte.',
 summary:'Três ataques encadeados da guarda fechada, do jeito que aparecem numa luta. Tori senta para a raspagem de quadril; Uke trava apoiando a mão no tatame, e essa mão vira a kimura. Uke esconde o braço e vem para a frente com a cabeça baixa: o braço de Tori já está por cima do ombro dele e vira guilhotina.',
 reading:[{k:'1',r:'raspagem de quadril',m:'Uke apoia a mão para não cair'},{k:'2',r:'kimura',m:'Uke esconde o braço e vem para a frente'},{k:'3',r:'guilhotina',m:'a cabeça baixa entrega o pescoço'}],
 facts:[['O que é um drill','Uma sequência treinada em dupla, sempre igual, até o encadeamento sair sem pensar. Uke dá a reação certa, sem resistir de verdade.'],
  ['Por que esses três','Os três saem da mesma posição: Tori sentado, com um braço por cima do ombro de Uke. O que muda é a reação dele.'],
  ['Como treinar','Faça cada golpe até o encaixe, sem finalizar. Depois de algumas voltas, Uke escolhe a defesa e Tori reage.'],
  ['Técnicas','Cada etapa tem a página da técnica completa, com os detalhes e os erros comuns.']],
 errors:[['Insistir no golpe que foi defendido','O drill existe para trocar de golpe assim que Uke defende. Brigar pela raspagem dá tempo para ele recuperar a postura.'],
  ['Deitar entre um golpe e outro','Tori fica sentado o tempo todo. Se deitar, perde a distância e o braço sobre o ombro.'],
  ['Uke resistindo demais','No drill, Uke reage do jeito combinado. Resistência total é para o rola.']],
 safety:['Nos dois golpes de finalização, encaixe e solte. Não aperte nem gire o ombro no drill.',
  'Quem recebe a raspagem cai de lado, sem travar a queda com o braço preso.',
  'Pratique só com orientação de um professor qualificado.'],
 passos:[
  {tec:'raspagem-de-quadril',de:0,ate:5.4},
  /* Ponte 1: Uke puxa o braço direito de baixo do braço de Tori e apoia a mão no tatame, ao lado da cintura dele */
  {ponte:[
   [.5,{uke:{pitch:30,h:-10,arm:{R:B('o',.25,.30,-.30)},pole:{armR:[-.5,0,.8]}},tori:{arm:{L:B('o',.05,.55,.05)},pole:{armL:[.4,1,-.3]}}}],
   [1.0,{uke:{pitch:50,arm:{R:W3(.04,.04,-.36)}},tori:{arm:{L:SL('armR',.95)},pole:{armL:[-.3,.2,-1]}}}],
   [1.5,{}]],
   aperto:{s:.8,e:1.5,limbs:['T.L.arm'],tol:.10,tudo:true},
   glow:{s:.3,e:1.6,limbs:{'U.R.arm':'gold','T.L.arm':'force'}},
   notas:(api,F,t)=>{const {C}=api,U=F.uke,T=F.tori;const a=win(t,0,1.6);
    api.tag('Uke tira o braço e apoia a mão',U.armR.H,-7,3.4,C.uke,a);
    api.tag('mão esquerda no punho',T.armL.H,6,-3,C.force,a);}},
  {tec:'kimura',de:2.9,ate:5.4,entrada:.8},
  /* Ponte 2: Uke tira o cotovelo da figura-4 e vem para a frente; a cabeça desce para o lado direito de Tori */
  {ponte:[
   /* Tori não espera parado: enquanto Uke desce, ele desfaz o giro da kimura (de lado → de frente para Uke),
      recentra o quadril e o braço direito passa por cima das costas, chegando à pegada da guilhotina */
   /* primeiro os braços saem da figura-4: o direito sobe (não atravessa as costas de Uke), o esquerdo vai pelo lado de fora do corpo */
   [.15,{tori:{arm:{R:W3(-.04,.48,-.16)},pole:{armR:[0,1,-.3]}}}],
   [.35,{tori:{arm:{R:W3(.12,.80,-.02),L:W3(-.06,.26,-.62)},pole:{armR:[0,1,.2],armL:[-.3,0,-1]}}}],
   [.6,{uke:{x:.50,pitch:85,yaw:190,h:10,arm:{R:W3(.30,.06,-.10)},pole:{armR:[.3,0,-.9]}},
        tori:{x:.0,z:-.20,yaw:135,pitch:178,h:15,arm:{L:W3(-.40,.06,-.30),R:W3(.30,.62,.10)},pole:{armL:[-.6,0,-.6],armR:[0,1,.3]}}}],
   [1.3,{uke:{x:.60,z:.08,pitch:95,yaw:196,h:16,arm:{R:W3(.31,.06,-.06)}},
        tori:{x:-.14,z:-.06,yaw:165,pitch:192,h:20,arm:{L:W3(-.42,.10,-.28),R:W3(.16,.48,.32)},pole:{armR:[0,1,.6]}}}],
   [1.6,{}]],
   glow:{s:0,e:1.7,limbs:{'U.R.arm':'gold'}},
   notas:(api,F,t)=>{const {C}=api,U=F.uke;const a=win(t,0,1.7);
    api.tag('Uke esconde o braço e vem para a frente',U.head,-6,-4,C.uke,a);}},
  {tec:'guilhotina',de:3.2,ate:10.6,entrada:.8}],
 views:[
  {name:'Lado do braço',a:-150,e:30,center:[.1,.35,-.05],span:3.0},
  {name:'Pela cabeça de Tori',a:-90,e:22,center:[.15,.4,0],span:3.0},
  {name:'De cima',a:-90,e:88,center:[.15,0,0],span:3.0}],
 /* tempos do drill montado: raspagem 0–5,4 · ponte 5,4–6,9 · kimura 7,7–10,2 · ponte 10,2–12,6 (Tori desfaz o giro junto) · guilhotina 12,6–20,0 */
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda fechada',pt:'Uke ergue a postura',
  d:'Tori está de costas com a guarda fechada. Uke senta para trás e ergue o tronco para abrir a guarda. É o gatilho da raspagem de quadril.',
  l:['Postura alta de Uke: o peso dele fica nos joelhos.','Tori não espera a guarda abrir.']},
 {s:1.6,e:5.4,kanji:'2',ro:'Raspagem de quadril',pt:'Sentar e prender o braço',tec:'raspagem-de-quadril',
  d:'Tori abre a guarda, senta apoiando a mão direita atrás e passa o braço esquerdo por cima do ombro direito de Uke, prendendo o braço dele. Se Uke não reagir, Tori bate o quadril e raspa.',
  l:['Sentar e prender o braço é um movimento só.','A raspagem vai para o lado do braço preso.']},
 {s:5.4,e:7.7,kanji:'3',ro:'Defesa: mão no tatame',pt:'Uke apoia a mão; Tori pega o punho',
  d:'Para não cair, Uke tira o braço direito e apoia a mão no tatame, ao lado da cintura de Tori. A raspagem acabou, mas essa mão apoiada é exatamente o gatilho da kimura: a mão esquerda de Tori segura o punho.',
  l:['Mão de Uke no tatame = kimura.','Tori continua sentado, sem voltar a deitar.','Pegada no punho, polegar junto dos dedos.']},
 {s:7.7,e:10.2,kanji:'4',ro:'Kimura',pt:'Figura-4 no braço apoiado',tec:'kimura',
  d:'O braço direito de Tori sobe por cima do ombro de Uke, passa por cima do tríceps, entra por dentro do braço e a mão direita segura o próprio punho esquerdo. No drill, Tori encaixa a figura-4 e não gira o ombro.',
  l:['Peito colado no ombro de Uke.','Por cima do tríceps, por dentro do braço.','Cotovelo de Uke dobrado.']},
 {s:10.2,e:12.6,kanji:'5',ro:'Defesa: esconder o braço',pt:'Uke vem para a frente, cabeça baixa',
  d:'Uke tira o cotovelo da figura-4 puxando o braço para baixo e vem para a frente para tirar a distância. A cabeça desce para o lado direito de Tori. Ao mesmo tempo, Tori solta a figura-4, desfaz o giro para ficar de frente para Uke e passa o braço direito por cima das costas dele.',
  l:['Cabeça baixa na guarda = guilhotina.','O braço de cima da kimura vira o braço da guilhotina.']},
 {s:12.6,e:17.0,kanji:'6',ro:'Guilhotina',pt:'Braço por cima da nuca, guarda fechada',tec:'guilhotina',
  d:'O braço direito passa por cima da nuca de Uke e volta por baixo da garganta; a mão esquerda segura o punho. Tori fecha a guarda, deita e estica o quadril enquanto o antebraço sobe contra o pescoço.',
  l:['Axila por cima da nuca, antebraço na garganta.','Guarda fechada: Uke não passa.','A força vem do quadril, não dos braços.']},
 {s:17.0,e:20.0,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate e Tori solta na hora. No treino do drill, o mais comum é parar no encaixe, sem apertar, e recomeçar do zero.',
  l:['Bateu, soltou.','Depois de algumas voltas, Uke escolhe a defesa e Tori reage.']}],
 rep:[.8,4.6,6.6,9.4,11.4,14.6,18.4],cover:9.4
});})();
