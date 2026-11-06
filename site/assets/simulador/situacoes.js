/* Simulador: posições, pegadas, ações do oponente e base de conhecimento das opções.
   "Você" é o boneco de gi branco (tori); "ele" é o oponente de gi azul (uke).
   Pegadas em B('o',f,u,r) usam o referencial do SEU tronco (f frente, u cima, r sua direita),
   então valem em pé ou deitado. {sleeve:'R'|'L'} é resolvido pela posição real do seu antebraço. */
(()=>{const {W3,B}=Judo;
const SELF_FREE=side=>B('s',.24,.20,side==='R'?.2:-.2);

const GRIPS_STANDING={
 'gola-esq':{name:'Sua gola esquerda',spec:()=>B('o',.15,.42,-.08)},
 'gola-dir':{name:'Sua gola direita',spec:()=>B('o',.15,.42,.08)},
 'manga-dir':{name:'Sua manga direita',spec:()=>({sleeve:'R'})},
 'manga-esq':{name:'Sua manga esquerda',spec:()=>({sleeve:'L'})},
 'nuca':{name:'Sua nuca',spec:()=>B('o',-.06,.6,0)},
 'faixa':{name:'Sua faixa',spec:h=>B('o',.15,.02,h==='R'?-.05:.05)},
 'livre':{name:'Solta',spec:h=>SELF_FREE(h)}};
const GRIPS_GROUND={
 'gola-esq':GRIPS_STANDING['gola-esq'],'gola-dir':GRIPS_STANDING['gola-dir'],
 'manga-dir':GRIPS_STANDING['manga-dir'],'manga-esq':GRIPS_STANDING['manga-esq'],
 'faixa':{name:'Sua faixa / quadril',spec:h=>B('o',.13,.04,h==='R'?-.12:.12)},
 'livre':GRIPS_STANDING.livre};

const GRIPS_BACK={
 'pescoco':{name:'Seu pescoço (braço em volta)',spec:h=>B('o',.17,.36,h==='R'?-.08:.08)},
 'peito':{name:'Seu peito, por baixo do braço',spec:h=>B('o',.12,.24,h==='R'?-.06:.06)},
 'gola-esq':GRIPS_STANDING['gola-esq'],'gola-dir':GRIPS_STANDING['gola-dir'],
 'livre':GRIPS_STANDING.livre};
const GRIPS_SIDE={
 'nuca':{name:'Sua nuca (por baixo da cabeça)',spec:()=>B('o',-.02,.68,-.1)},
 'faixa':{name:'Seu quadril do lado de lá',spec:()=>B('o',.1,.05,.24)},
 'gola-esq':GRIPS_STANDING['gola-esq'],'gola-dir':GRIPS_STANDING['gola-dir'],
 'manga-dir':GRIPS_STANDING['manga-dir'],'manga-esq':GRIPS_STANDING['manga-esq'],
 'livre':GRIPS_STANDING.livre};

const POSICOES={
 'em-pe':{name:'Em pé',lede:'Os dois em pé, na pegada.',
  grips:GRIPS_STANDING,defaults:{R:'gola-esq',L:'manga-dir',f:'parado'},
  acoes:{parado:'Parado, só segurando',puxando:'Puxando você para ele',empurrando:'Empurrando você',curvado:'Curvado, defendendo'},
  views:[{name:'Diagonal',a:35,e:16,center:[0,1.02,0],span:3.5},{name:'De lado',a:90,e:6,center:[0,1.02,0],span:3.5},
   {name:'De cima',a:90,e:88,center:[0,0,0],span:2.4}],
  pose(s){const op={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,gf:1,
    leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   const me={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,gf:1,
    leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},arm:{R:B('o',.15,.42,-.08),L:{sleeveOf:'R'}},
    pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   if(s.f==='puxando'){Object.assign(op,{x:-.40,pitch:-8});op.leg={R:W3(-.36,.07,.13),L:W3(-.52,.07,-.12)};
    Object.assign(me,{x:.24,pitch:12});me.leg={R:W3(.14,.07,-.13),L:W3(.36,.07,.12)};}
   if(s.f==='empurrando'){Object.assign(op,{x:-.26,pitch:16});op.leg={R:W3(-.18,.07,.13),L:W3(-.42,.07,-.12)};
    Object.assign(me,{x:.38,pitch:-6});me.leg={R:W3(.40,.07,-.13),L:W3(.50,.07,.12)};}
   if(s.f==='curvado'){Object.assign(op,{x:-.42,y:.80,pitch:34,h:-30});op.leg={R:W3(-.40,.07,.20),L:W3(-.62,.07,-.20)};
    Object.assign(me,{x:.30,pitch:10});}
   return {op,me};},
  force(s){return {puxando:'pull',empurrando:'push'}[s.f]||null;}},

 'guarda-baixo':{name:'Guarda fechada (você por baixo)',lede:'Você de costas, pernas fechadas nas costas dele.',
  grips:GRIPS_GROUND,defaults:{R:'faixa',L:'faixa',f:'ereto'},
  acoes:{ereto:'Postura alta, empurrando',curvado:'Postura quebrada, inclinado'},
  views:[{name:'Diagonal',a:-55,e:32,center:[.1,.35,0],span:2.5},{name:'De lado',a:0,e:8,center:[.2,.5,0],span:2.9},
   {name:'De cima',a:-90,e:90,center:[-.05,0,.05],span:2.7}],
  pose(s){const curv=s.f==='curvado';
   const op={x:curv?.38:.44,y:.40,z:0,yaw:180,pitch:curv?60:22,h:curv?5:-15,gf:1,
    leg:{R:W3(.58,.07,-.17),L:W3(.58,.07,.17)},pole:{armR:[-.6,-.7,.4],armL:[-.6,-.7,-.4],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   const me={x:0,y:.15,z:0,yaw:0,pitch:-90,h:30,gf:1,
    leg:{R:B('o',-.17,.15,.07),L:B('o',-.15,.2,-.07)},arm:{R:{sleeveOf:'L'},L:{sleeveOf:'R'}},
    pole:{legR:[.5,0,1],legL:[.5,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
   return {op,me};},
  force(s){return s.f==='ereto'?'push':null;}},

 'guarda-cima':{name:'Dentro da guarda (você por cima)',lede:'Você de joelhos dentro da guarda fechada dele.',
  grips:GRIPS_STANDING,defaults:{R:'gola-esq',L:'manga-dir',f:'parado'},
  acoes:{parado:'Segurando, guarda fechada',puxando:'Puxando você para baixo'},
  views:[{name:'Diagonal',a:125,e:30,center:[.2,.35,0],span:2.6},{name:'De lado',a:0,e:8,center:[.2,.5,0],span:2.9},
   {name:'De cima',a:90,e:90,center:[.2,0,0],span:2.7}],
  pose(s){const pux=s.f==='puxando';
   const me={x:pux?.36:.44,y:.40,z:0,yaw:180,pitch:pux?62:12,h:pux?10:-10,gf:1,
    leg:{R:W3(.62,.07,-.17),L:W3(.62,.07,.17)},arm:{R:B('o',.12,.05,-.14),L:B('o',.12,.05,.14)},
    pole:{armR:[-.6,-.7,.4],armL:[-.6,-.7,-.4],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   const op={x:0,y:.15,z:0,yaw:0,pitch:-90,h:30,gf:1,
    leg:{R:B('o',-.17,.15,.07),L:B('o',-.15,.2,-.07)},
    pole:{legR:[.5,0,1],legL:[.5,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
   return {op,me};},
  force(s){return s.f==='puxando'?'pull':null;}},

 'montada-baixo':{name:'Montada (você por baixo)',lede:'Ele sentado no seu quadril, você de costas.',
  grips:GRIPS_GROUND,defaults:{R:'gola-esq',L:'gola-dir',f:'alto'},
  acoes:{alto:'Sentado alto, mãos em você',baixo:'Peito no peito, base baixa'},
  views:[{name:'Diagonal',a:-125,e:34,center:[.15,.3,0],span:2.6},{name:'De lado',a:180,e:10,center:[.2,.4,0],span:2.9},
   {name:'Pela cabeça',a:-90,e:22,center:[.1,.35,0],span:2.4}],
  pose(s){const baixo=s.f==='baixo';
   const me={x:.15,y:.13,z:0,yaw:0,pitch:-90,h:8,gf:0,
    leg:{R:W3(1.0,.06,.16),L:W3(1.0,.06,-.16)},arm:{R:B('o',.14,.12,.12),L:B('o',.14,.12,-.12)},
    pole:{armR:[.6,-.3,.6],armL:[.6,-.3,-.6],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   const op={x:baixo?-.05:.05,y:baixo?.36:.40,z:0,yaw:180,pitch:baixo?62:8,h:baixo?-25:0,gf:1,
    leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},
    pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5],armR:[-.6,-.7,.4],armL:[-.6,-.7,-.4]}};
   return {op,me};},
  force(s){return null;}},

 '100kg-baixo':{name:'100 quilos (você por baixo)',lede:'Ele atravessado no seu peito, você de costas.',
  grips:GRIPS_SIDE,defaults:{R:'faixa',L:'nuca',f:'pesado'},
  acoes:{pesado:'Peito no peito, pesado',subindo:'Subindo para montar'},
  views:[{name:'Diagonal',a:-150,e:36,center:[.05,.3,.25],span:2.7},{name:'Pela cabeça',a:-90,e:24,center:[.05,.3,.25],span:2.5},
   {name:'De cima',a:-90,e:90,center:[.3,0,.25],span:2.9}],
  pose(s){const sub=s.f==='subindo';
   const me={x:.15,y:.13,z:0,yaw:0,pitch:-90,h:8,gf:0,
    leg:{R:W3(1.0,.06,.16),L:W3(1.0,.06,-.16)},arm:{R:B('o',.05,.45,0),L:B('o',.0,.02,.05)},
    pole:{armR:[.6,-.3,.6],armL:[-.3,-.6,-1],legR:[1,-.2,.15],legL:[1,-.2,-.15]}};
   const op={x:-.15,y:sub?.50:.42,z:.57,yaw:90,pitch:sub?50:84,h:-25,gf:0,
    leg:{R:W3(sub?.35:.15,sub?.30:.05,sub?.35:.75),L:W3(-.45,.05,.75)},
    pole:{legR:[.3,1,.15],legL:[.3,1,-.15],armR:[-.6,-.7,.4],armL:[-.6,-.7,-.4]}};
   return {op,me};},
  force(s){return null;}},

 'costas':{name:'Ele nas suas costas',lede:'Você sentado, ele atrás com os ganchos.',
  grips:GRIPS_BACK,defaults:{R:'pescoco',L:'peito',f:'ganchos'},
  acoes:{ganchos:'Ganchos colocados, ajustando',estrangulando:'Apertando o pescoço'},
  views:[{name:'Frente',a:80,e:14,center:[.42,.58,.24],span:2.2},{name:'Lado esquerdo',a:150,e:28,center:[.42,.62,-.05],span:2.2},
   {name:'Por trás',a:-120,e:45,center:[.38,.45,0],span:2.2}],
  pose(s){const ap=s.f==='estrangulando';
   const me={x:.45,y:.13,z:0,yaw:0,pitch:ap?-28:-20,h:ap?18:10,gf:1,
    leg:{R:W3(1.08,.05,.26),L:W3(1.08,.05,-.26)},arm:{R:{sleeveOf:'R'},L:{sleeveOf:'R'}},
    pole:{legR:[.3,1,.25],legL:[.3,1,-.25],armR:[.3,-.8,.6],armL:[.3,-.8,-.6]}};
   const op={x:.15,y:.13,z:.06,yaw:0,pitch:ap?-10:-6,roll:0,h:5,gf:1,
    leg:{R:W3(.74,.17,.06),L:W3(.74,.17,-.06)},
    pole:{legR:[0,1,1.3],legL:[0,1,-1.3],armR:[.1,.6,.8],armL:[.2,-.8,-.5]}};
   return {op,me};},
  force(s){return null;}}};

/* ---------- base de conhecimento ---------- */
const holds=(s,g)=>s.R===g||s.L===g;
const nGrips=s=>['R','L'].filter(h=>s[h]!=='livre').length;
const anyCollar=s=>holds(s,'gola-esq')||holds(s,'gola-dir');
const anySleeve=s=>holds(s,'manga-dir')||holds(s,'manga-esq');

const OPCOES=[
 /* em pé */
 {id:'o-uchi-gari',pos:'em-pe',tipo:'Queda',nome:'O Uchi Gari',tech:'o-uchi-gari',
  score:s=>({puxando:5,parado:2,curvado:1}[s.f]||0),
  porque:s=>s.f==='puxando'?'Ele puxa e põe o peso nos calcanhares. Você vai com o puxão, encosta o peito e ceifa a perna dele por dentro: a força dele vira a sua.':'Funciona quando o peso dele vai para trás. Provoque empurrando primeiro e ataque quando ele reagir puxando.',
  passos:['Dê um passo curto para dentro, peito colado','Perna ceifa por dentro, em meia-lua','Empurre na direção do calcanhar dele']},
 {id:'o-soto-gari',pos:'em-pe',tipo:'Queda',nome:'O Soto Gari',tech:'o-soto-gari',
  score:s=>({puxando:4,parado:2}[s.f]||0),
  porque:()=>'Quem puxa fica com o tronco ereto e o peso atrás. Entre pelo lado de fora, cole o peito e ceife a perna de apoio.',
  passos:['Pé de apoio ao lado do pé dele','Peito no peito, quebre para trás','Ceife a perna de trás para frente']},
 {id:'morote-gari',pos:'em-pe',tipo:'Queda',nome:'Morote Gari (baiana)',tech:'morote-gari',
  score:s=>({puxando:4,parado:3,empurrando:2}[s.f]||0),
  porque:s=>s.f==='puxando'?'Ele já está trazendo você. Mude de nível e use a distância que ele mesmo encurtou para entrar nas duas pernas.':'Postura alta e quadril aberto deixam as pernas dele expostas para a baiana.',
  passos:['Abaixe o quadril, não a cabeça','Joelho no chão entre os pés dele','Cabeça no lado de fora, puxe as pernas e empurre']},
 {id:'ippon-seoi-nage',pos:'em-pe',tipo:'Queda',nome:'Ippon Seoi Nage',tech:'ippon-seoi-nage',
  score:s=>({empurrando:5,parado:2}[s.f]||0),
  porque:()=>'Se ele empurra, puxe. O peso dele já vem para a frente: gire de costas por baixo dele e carregue nas costas.',
  passos:['Puxe a manga para cima e para frente','Gire entrando com os pés por dentro dos dele','Braço sob a axila dele, joelhos dobrados, projete']},
 {id:'uchi-mata',pos:'em-pe',tipo:'Queda',nome:'Uchi Mata',tech:'uchi-mata',
  score:s=>({empurrando:4,parado:2,curvado:2}[s.f]||0),
  porque:()=>'O peso dele vem para a frente. Você entra girando e levanta a coxa dele por dentro como um pêndulo.',
  passos:['Puxada para frente e para cima','Pé de apoio entre os pés dele','Coxa sobe por dentro, tronco desce']},
 {id:'o-goshi',pos:'em-pe',tipo:'Queda',nome:'O Goshi',tech:'o-goshi',
  score:s=>({empurrando:4,parado:2}[s.f]||0)+(holds(s,'nuca')?1:0),
  porque:()=>'Ele vem para cima de você. Abrace a cintura, encaixe o quadril abaixo do dele e gire.',
  passos:['Braço abraça a cintura por trás','Quadril abaixo e além do dele','Estenda as pernas e gire']},
 {id:'tomoe-nage',pos:'em-pe',tipo:'Queda',nome:'Tomoe Nage',tech:'tomoe-nage',
  score:s=>({empurrando:4,curvado:4}[s.f]||0),
  porque:s=>s.f==='curvado'?'Curvado, ele pesa para a frente e fica com a cabeça baixa: sente perto, pé na barriga, e lance por cima.':'Ele empurra e avança. Sente embaixo dele e use o próprio avanço para lançá-lo.',
  passos:['Puxe para frente e sente bem perto','Pé na barriga dele, não no peito','Puxe as mãos por cima da sua cabeça']},
 {id:'de-ashi-barai',pos:'em-pe',tipo:'Queda',nome:'De Ashi Barai',tech:'de-ashi-barai',
  score:s=>({empurrando:3,parado:3}[s.f]||0),
  porque:()=>'Quando ele dá um passo à frente, o pé que avança ainda não tem peso. Varra esse pé no tempo certo.',
  passos:['Recue e convide o passo','Sola contra o tornozelo, por fora','Varra para onde o pé já ia e gire as mãos']},
 {id:'quebrar-pegada',pos:'em-pe',tipo:'Pegada',nome:'Quebrar a pegada',
  score:s=>nGrips(s)?2+(anySleeve(s)?2:0):0,
  porque:s=>anySleeve(s)?'Quem controla a sua manga controla o seu braço de ataque. Antes de tentar qualquer coisa, solte essa pegada.':'Tire a pegada dele antes de atacar; quem tem a melhor pegada escolhe o golpe.',
  passos:['Gire o punho preso para fora, contra o polegar dele','Puxe o braço para trás com o quadril, não só com o braço','Pegue primeiro na pegada que você quer']},
 {id:'postura-nuca',pos:'em-pe',tipo:'Defesa',nome:'Recuperar a postura',
  score:s=>(holds(s,'nuca')?4:0)+(s.f==='puxando'&&holds(s,'nuca')?1:0),
  porque:()=>'Com a mão na sua nuca ele abaixa sua cabeça e prepara a queda. Cabeça baixa é postura perdida.',
  passos:['Endireite a coluna, quadril para frente','Mão no bíceps ou na clavícula dele','Afaste o cotovelo dele para tirar a mão']},
 {id:'puxar-guarda',pos:'em-pe',tipo:'Jiu-jitsu',nome:'Puxar para a guarda',
  score:s=>nGrips(s)?(s.f==='puxando'?4:2):0,
  porque:s=>s.f==='puxando'?'Ele já puxa você para perto: com gola e manga firmes, sente e feche a guarda. No jiu-jitsu é um caminho seguro para o chão.':'Com pegada firme, sentar na guarda leva a luta para o seu jogo de chão.',
  passos:['Pegada firme na gola e na manga','Pé no quadril dele ao sentar, não caia de costas','Feche a guarda e quebre a postura']},
 /* guarda, você por baixo */
 {id:'sankaku-jime',pos:'guarda-baixo',tipo:'Finalização',nome:'Sankaku Jime (triângulo)',tech:'sankaku-jime',
  score:s=>nGrips(s)===1?5+(s.f==='curvado'?1:0):(s.f==='curvado'?1:0),
  porque:s=>nGrips(s)===1?'Um braço dentro e um fora: é exatamente a condição do triângulo. A perna sobe pelo lado do braço de fora.':'Para o triângulo você precisa de um braço dentro e um fora. Empurre um dos braços dele para fora.',
  passos:['Empurre o braço de fora até o tatame','Perna sobe sobre o ombro do braço de fora','Canela na nuca, trave com a dobra do joelho']},
 {id:'juji-gatame',pos:'guarda-baixo',tipo:'Finalização',nome:'Juji Gatame (chave de braço)',tech:'juji-gatame',
  score:s=>nGrips(s)===2&&s.f==='ereto'?5:(nGrips(s)===2?2:0),
  porque:()=>'Braços esticados empurrando você são a porta da chave de braço. Prenda um punho no seu peito e gire o quadril.',
  passos:['Prenda o punho dele no seu peito','Pé no quadril, gire 90°','Perna sobre o rosto, joelhos juntos, quadril sobe']},
 {id:'omoplata',pos:'guarda-baixo',tipo:'Finalização',nome:'Omoplata',tech:'omoplata',
  score:s=>(holds(s,'faixa')&&s.f==='curvado'?4:0)+(nGrips(s)===1?1:0),
  porque:()=>'Ele apoia a mão no seu quadril com a postura baixa. A perna passa por cima desse ombro e você gira para o lado.',
  passos:['Escape o quadril para o lado do braço','Perna passa por cima do ombro','Sente, controle a cintura, incline à frente devagar']},
 {id:'raspagem-de-tesoura',pos:'guarda-baixo',tipo:'Raspagem',nome:'Raspagem de tesoura',tech:'raspagem-de-tesoura',
  score:s=>s.f==='ereto'?(anyCollar(s)?4:3):1,
  porque:()=>'Postura alta, peso sobre os joelhos. Canela na barriga dele, perna de baixo varre o joelho: ele cai e você monta.',
  passos:['Gola e manga do mesmo lado','Escape o quadril, canela atravessada na barriga','Puxe e varra ao mesmo tempo, suba montado']},
 {id:'quebrar-postura',pos:'guarda-baixo',tipo:'Controle',nome:'Quebrar a postura',
  score:s=>s.f==='ereto'?4:0,
  porque:()=>'Com ele ereto nada funciona bem. Puxe com os joelhos e com a gola até o peito dele chegar perto do seu.',
  passos:['Puxe com as pernas fechadas','Uma mão na gola ou na nuca','Controle um punho antes de atacar']},
 {id:'ude-garami-guarda',pos:'guarda-baixo',tipo:'Finalização',nome:'Ude Garami (kimura)',tech:'ude-garami',
  score:s=>nGrips(s)===1&&s.f==='curvado'?3:(nGrips(s)===1?2:0),
  porque:()=>'Quando ele apoia uma mão no tatame ou deixa um braço solto, a figura-4 nesse braço está disponível. A animação mostra a mesma trava a partir dos 100 quilos.',
  passos:['Segure o punho com a mão do mesmo lado','Outro braço por cima do ombro dele, segure o próprio punho','Sente de lado e gire o braço para as costas dele']},
 /* dentro da guarda, você por cima */
 {id:'postura-guarda',pos:'guarda-cima',tipo:'Defesa',nome:'Postura na guarda',
  score:s=>s.f==='puxando'?5:2,
  porque:()=>'Ele quebra sua postura para atacar. Coluna reta e cabeça alta tiram a maioria dos ataques da guarda.',
  passos:['Quadril para frente, coluna reta','Mãos no quadril ou no peito dele, cotovelos fechados','Cabeça alta, olhando para frente']},
 {id:'braco-dentro-fora',pos:'guarda-cima',tipo:'Cuidado',nome:'Nunca um braço dentro e outro fora',
  score:()=>3,
  porque:()=>'Um braço dentro e um fora entrega o triângulo. Os dois dentro ou os dois fora, nunca dividido.',
  passos:['Cotovelos colados no corpo','Não apoie a mão no tatame por fora','Se um braço sair, traga de volta antes de levantar'],tech:'sankaku-jime'},
 {id:'quebrar-pegada-gola',pos:'guarda-cima',tipo:'Pegada',nome:'Soltar a pegada da gola',
  score:s=>anyCollar(s)?4:(anySleeve(s)?3:0),
  porque:s=>anyCollar(s)?'Na gola ele puxa sua postura e prepara estrangulamentos. Tire essa pegada antes de abrir a guarda.':'A pegada na manga prepara raspagens e o triângulo. Solte antes de se mexer.',
  passos:['Segure o punho dele com as duas mãos','Empurre o punho para o quadril dele, não para cima','Mantenha a postura enquanto solta']},
 {id:'passagem-toreando',pos:'guarda-cima',tipo:'Passagem',nome:'Abrir a guarda e passar toreando',tech:'passagem-toreando',
  score:s=>s.f==='parado'?4:1,
  porque:()=>'Com a postura segura, levante, abra a guarda e, quando ele soltar as pernas, controle os joelhos e passe para o lado.',
  passos:['Levante com a postura reta, um pé de cada vez','Abra a guarda com o joelho ou o quadril','Segure as calças nos joelhos, jogue para um lado e corra para o outro']},
 /* montada, você por baixo */
 {id:'upa',pos:'montada-baixo',tipo:'Fuga',nome:'Upa (ponte e rolamento)',tech:'tate-shiho-gatame',
  score:s=>(s.f==='alto'?3:2)+(nGrips(s)===2?2:0),
  porque:s=>nGrips(s)===2?'As duas mãos dele estão ocupadas em você: não sobra mão para apoiar no tatame. Prenda um braço e o pé do mesmo lado e role.':'Prenda o braço e o pé do mesmo lado: ele fica sem base daquele lado e rola com a ponte.',
  passos:['Prenda o braço dele junto ao seu peito','Pé por fora do pé dele, do mesmo lado','Ponte alta para o lado preso e role para a guarda dele'],
  fase:'Upa',nota:'A animação do Tate Shiho Gatame abre na fase Upa, vista do lado de quem está por cima.'},
 {id:'fuga-de-quadril',pos:'montada-baixo',tipo:'Fuga',nome:'Fuga de quadril (cotovelo-joelho)',
  score:s=>s.f==='baixo'?5:3,
  porque:s=>s.f==='baixo'?'Peito no peito, ele fica pesado e difícil de rolar. Crie espaço com o quadril e recoloque o joelho por dentro.':'Quando a ponte não basta, o espaço vem do quadril: cotovelo no joelho dele e joelho de volta para a guarda.',
  passos:['Cotovelos colados, antebraço no quadril dele','Ponte curta e escape o quadril para o lado','Recoloque o joelho por dentro e feche a guarda']},
 {id:'defesa-estrangulamento',pos:'montada-baixo',tipo:'Defesa',nome:'Defender o estrangulamento',
  score:s=>holds(s,'gola-esq')&&holds(s,'gola-dir')?6:(anyCollar(s)?3:0),
  porque:()=>'As duas mãos na sua gola preparam o estrangulamento cruzado. Proteja o pescoço e use a ponte para o lado do braço de cima.',
  passos:['Queixo no peito, mãos nos cotovelos dele','Empurre o cotovelo de cima para o centro','Ponte para o lado do braço de cima e role']},
 {id:'braco-esticado',pos:'montada-baixo',tipo:'Cuidado',nome:'Não empurre com os braços esticados',tech:'juji-gatame',
  score:s=>s.f==='alto'?3:1,
  porque:()=>'Empurrar o peito dele com os braços retos é a porta da chave de braço. Mantenha os cotovelos dobrados e colados.',
  passos:['Cotovelos dentro, perto das costelas','Empurre o quadril, não o peito','Se ele subir a montada, proteja os braços primeiro']},
 /* 100 quilos, você por baixo */
 {id:'enquadrar',pos:'100kg-baixo',tipo:'Fuga',nome:'Enquadrar e repor a guarda',
  score:s=>s.f==='pesado'?5:3,
  porque:()=>'Ele está pesado no seu peito. Os antebraços fazem uma moldura (pescoço e quadril dele) e o espaço vem do seu quadril, não dos braços.',
  passos:['Antebraço no pescoço dele, outro no quadril','Ponte curta e fuga de quadril para longe dele','Joelho entra no espaço e você repõe a guarda']},
 {id:'cross-face',pos:'100kg-baixo',tipo:'Defesa',nome:'Tirar a cabeça do controle',
  score:s=>holds(s,'nuca')?4:0,
  porque:()=>'Com o braço por baixo da sua cabeça ele controla para onde você olha e para onde você vira. Recupere a cabeça antes de fugir.',
  passos:['Vire o rosto para ele','Empurre o cotovelo dele para cima da sua cabeça','Encaixe a moldura no pescoço dele']},
 {id:'upa-ao-montar',pos:'100kg-baixo',tipo:'Fuga',nome:'Ponte quando ele passar para a montada',tech:'tate-shiho-gatame',fase:'Passagem',
  score:s=>s.f==='subindo'?5:0,
  porque:()=>'Para montar ele tira o peso do seu peito e passa o joelho pela sua barriga. É o momento de ponte e de colocar o joelho na frente.',
  passos:['Joelho de cima bloqueia a passagem','Ponte forte quando o joelho dele cruzar','Role para o lado ou recoloque a guarda'],
  nota:'A animação abre na fase Passagem, do lado de quem passa.'},
 {id:'cuidado-kimura',pos:'100kg-baixo',tipo:'Cuidado',nome:'Braço longe do corpo é kimura',tech:'ude-garami',
  score:()=>3,
  porque:()=>'No 100 quilos, o braço esticado empurrando o pescoço dele é a porta da kimura. Mantenha os cotovelos colados.',
  passos:['Cotovelos perto das costelas','Empurre com o antebraço, não com a mão','Se ele pegar o punho, junte as mãos e não estique']},
 /* costas */
 {id:'defesa-mata-leao',pos:'costas',tipo:'Defesa',nome:'Defender o mata-leão',tech:'hadaka-jime',
  score:s=>holds(s,'pescoco')?6+(s.f==='estrangulando'?1:0):0,
  porque:()=>'O braço dele está no seu pescoço. Antes de qualquer fuga, as duas mãos vão no punho desse braço e o queixo desce.',
  passos:['Duas mãos no punho do braço do pescoço','Queixo para baixo, ombros para cima','Puxe o braço para baixo e só então comece a fugir'],
  nota:'A animação mostra o ataque, do lado de quem estrangula.'},
 {id:'fuga-costas',pos:'costas',tipo:'Fuga',nome:'Fugir das costas',
  score:s=>s.f==='ganchos'?5:3,
  porque:()=>'A fuga leva as suas costas ao chão do lado do braço que passa por cima do seu ombro. Com as costas no tatame ele perde o controle das costas.',
  passos:['Escorregue as costas para o lado do braço de cima','Tire o gancho desse lado com a mão','Vire para dentro, de frente para ele']},
 {id:'defesa-gola-costas',pos:'costas',tipo:'Defesa',nome:'Defender o estrangulamento na gola',
  score:s=>anyCollar(s)?6+(s.f==='estrangulando'?1:0):0,
  porque:()=>'Pela gola ele estrangula mesmo sem passar o braço inteiro. A mão que segura a gola é o alvo.',
  passos:['Mão do mesmo lado puxa a pegada da gola para baixo','Queixo protege o pescoço','Fuja para o lado oposto à pegada']}];

function avaliar(s){
 return OPCOES.filter(o=>o.pos===s.pos).map(o=>({o,score:o.score(s)}))
  .filter(x=>x.score>0).sort((a,b)=>b.score-a.score||OPCOES.indexOf(a.o)-OPCOES.indexOf(b.o))
  .map(({o,score})=>({id:o.id,nome:o.nome,tipo:o.tipo,tech:o.tech||null,fase:o.fase||'',score,porque:o.porque(s),passos:o.passos,nota:o.nota||''}));}

function normalizar(s){const P=POSICOES[s.pos]?s.pos:'em-pe',d=POSICOES[P].defaults,G=POSICOES[P].grips,A=POSICOES[P].acoes;
 return {pos:P,R:G[s.R]?s.R:d.R,L:G[s.L]?s.L:d.L,f:A[s.f]?s.f:d.f};}

window.JudoSim={POSICOES,OPCOES,avaliar,normalizar};
})();
