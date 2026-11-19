(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori ajoelhado dentro da guarda fechada, de frente para a cabeça de Uke (yaw 180): esquerda de Tori = +z (lado direito de Uke).
   Referência: Procel BJJ (Yhy-QVscGq8), guarda fechada aberta de joelhos e passagem com o joelho por cima da coxa.
   Tori senta nos calcanhares, costas retas, cabeça alta, as duas mãos no quadril de Uke (na faixa). O joelho DIREITO vem para a
   frente, embaixo do cóccix de Uke; a perna ESQUERDA vai para trás e para fora (+x, +z) e o quadril de Tori gira (yaw 200),
   esticando a perna direita de Uke até os tornozelos se soltarem. A mão esquerda empurra o joelho direito de Uke para o chão,
   o joelho direito de Tori atravessa por cima dessa coxa e Tori termina no lado direito de Uke, no controle lateral. */
const ukeBase={x:.04,y:.24,z:0,yaw:0,pitch:-100,roll:0,h:22,gf:0,
 leg:{R:B('o',-.19,.08,.07),L:B('o',-.17,.12,-.07)},
 arm:{R:SL('armL',.88),L:SL('armR',.88)},
 pole:{legR:[.5,0,1],legL:[.5,0,-1],armR:[-.6,0,.8],armL:[-.6,0,-.8]}};
const toriBase={x:.36,y:.42,z:0,yaw:180,pitch:12,roll:0,h:-8,gf:1,
 leg:{R:W3(.62,.04,-.15),L:W3(.62,.04,.15)},
 arm:{R:B('o',.12,0,-.13),L:B('o',.12,0,.13)},
 pole:{legR:[1,-.3,.15],legL:[1,-.3,-.15],armR:[-.2,-.7,.6],armL:[-.2,-.7,-.6]}};
/* final: controle lateral pelo lado direito de Uke, igual ao fim da passagem de joelho cruzado */
const fim={x:.22,y:.33,z:.38,yaw:162,pitch:84,h:-5,
 leg:{R:W3(.64,.05,.46),L:W3(.98,.05,.80)},
 arm:{R:B('o',-.03,.44,-.24),L:B('o',-.03,.64,-.08)},
 pole:{legR:[.15,-.46,-.38],legL:[.3,-1,-.4],armR:[.5,-.6,.6],armL:[.5,-.6,-.6]}};
Judo.register3d({
 id:'abrir-e-passar-a-guarda', name:'Abrir a guarda fechada e passar', kanji:'', group:'ne', cls:'Jiu-jitsu · Passagem de guarda',
 bjj:'Closed guard break (kneeling)',
 why:'Antes de qualquer passagem, a guarda fechada precisa abrir. Esta é a abertura de joelhos que todo faixa-branca aprende: postura, joelho no cóccix, ângulo, e só então a passagem.',
 summary:'Abertura da guarda fechada de joelhos. Tori senta com as costas retas e as mãos no quadril de Uke, coloca um joelho embaixo do cóccix dele e leva a outra perna para trás e para fora, criando um ângulo que estica a perna de Uke até os tornozelos se soltarem. Com a guarda aberta, Tori empurra o joelho de Uke para o chão, passa o joelho por cima da coxa dele e chega ao controle lateral.',
 reading:[{k:'Abrir a guarda',r:'guard break',m:'soltar os tornozelos cruzados nas costas'},{k:'Postura',r:'posture',m:'costas retas, cabeça alta, quadril para a frente'}],
 facts:[['Origem','Técnica do jiu-jitsu, sem nome próprio no judô.'],
  ['Pontuação (IBJJF)','Abrir a guarda não pontua. Passar e estabilizar o controle lateral por 3 segundos vale 3 pontos.'],
  ['Por que o ângulo abre','Com Tori de frente, as pernas de Uke fecham sem esforço. Girando o quadril, a perna do lado que foi para trás fica esticada e os tornozelos não alcançam mais um ao outro.'],
  ['Outro jeito','Em pé é a outra grande escola. De joelhos é a mais segura para começar, porque a base fica perto do chão.']],
 errors:[['Perder a postura','Com as costas curvadas e a cabeça baixa, Uke puxa Tori para o peito dele e ataca: estrangulamento, chave de braço, raspagem. Cabeça alta sempre.'],
  ['Mãos no peito de Uke esticando os braços','Braço esticado no alto é braço que Uke pega para a chave. As mãos ficam baixas, no quadril.'],
  ['Joelhos colados','Com os joelhos juntos e o quadril para trás, Uke raspa para o lado com facilidade. Um joelho no cóccix, o outro afastado para trás.'],
  ['Passar antes de abrir','Tentar passar com os tornozelos ainda cruzados só cansa. Primeiro a guarda abre, depois Tori controla a perna e passa.']],
 safety:['Empurre o joelho de Uke para baixo com a mão, sem torcer a articulação.',
  'O joelho de Tori desliza por cima da coxa de Uke; não cai com o peso em cima do joelho dele.',
  'Treine primeiro com Uke abrindo sem resistência, depois com resistência leve.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoL',b:'U.quadril',s:0,e:1.6,txt:'postura: as mãos de Tori no quadril de Uke'},
  {c:'contato',a:'T.canelaR',b:'U.coxaR',s:6.6,e:8.2,txt:'o joelho e a canela direitos de Tori atravessam por cima da coxa direita de Uke'},
  {c:'lado',a:'T.quadril',de:'U.tronco',lado:'direita',s:8.6,e:'fim',min:.15,txt:'Tori termina no controle lateral pelo lado direito de Uke'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Postura',pt:'Costas retas, mãos no quadril',
  d:'Uke está de costas com as pernas fechadas na cintura de Tori e os tornozelos cruzados nas costas dele. Tori senta nos calcanhares com as costas retas e a cabeça alta, e apoia as duas mãos no quadril de Uke, na faixa.',
  l:['Cabeça alta, costas retas, quadril para a frente.','As mãos seguram o quadril de Uke no chão.','Os cotovelos ficam perto do corpo.']},
 {s:1.6,e:4.0,kanji:'2',ro:'Ângulo',pt:'Joelho no cóccix, perna para trás',
  d:'Tori sai dos calcanhares e coloca o joelho direito para a frente, embaixo do cóccix de Uke. A perna esquerda vai para trás e para fora, e o quadril de Tori gira para a esquerda. A perna direita de Uke fica esticada e os tornozelos começam a soltar.',
  l:['Joelho direito embaixo do cóccix: Uke não desce o quadril.','Perna esquerda para trás e para fora: o ângulo.','A postura continua reta durante o giro.']},
 {s:4.0,e:6.0,kanji:'3',ro:'Abertura',pt:'Empurrar o joelho para baixo',
  d:'Com os tornozelos soltos, a mão esquerda de Tori sai do quadril e empurra o joelho direito de Uke para o chão. A mão direita continua no quadril, segurando Uke no lugar.',
  l:['A mão empurra o joelho, não o pé.','A perna de Uke fica deitada no tatame.','A outra mão não solta o quadril.']},
 {s:6.0,e:8.4,kanji:'4',ro:'Passagem',pt:'Joelho por cima da coxa',
  d:'Tori mantém a perna de Uke presa no chão e passa o joelho direito por cima da coxa dela, descendo no tatame do lado de fora do quadril de Uke. O peito desce, o braço direito passa por baixo do braço esquerdo de Uke e o braço esquerdo envolve a cabeça.',
  l:['O joelho atravessa a coxa presa.','A perna esquerda, que já estava para trás, dá a base.','O peito desce junto com o joelho.']},
 {s:8.4,e:11,kanji:'5',ro:'Controle lateral',pt:'Estabilizar',
  d:'Tori solta o pé que ficou entre as pernas de Uke e fica no lado direito dele, peito no peito, quadril baixo. Com 3 segundos estáveis, a passagem vale pontos.',
  l:['Peito no peito, quadril baixo.','Três segundos estáveis: 3 pontos na regra da IBJJF.','Daqui saem montada, joelho na barriga ou kimura.']}],
 rep:[.8,3.2,5.4,7.6,9.8], cover:3.4,
 views:[
  {name:'Lado da abertura',a:-15,e:16,center:[.22,.55,.15],span:3.0},
  {name:'Pela cabeça de Uke',a:-90,e:14,center:[.25,.55,.12],span:2.8},
  {name:'De cima',a:-90,e:88,center:[.22,0,.2],span:3.4}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* sai dos calcanhares: joelho direito para a frente, embaixo do cóccix; a perna esquerda começa a ir para trás */
 [2.3,{tori:{x:.37,y:.46,yaw:186,leg:{R:W3(.60,.04,-.10),L:W3(.80,.12,.32)},pole:{legR:[1,-.5,.1],legL:[.3,-.6,-.8]}}}],
 /* ângulo: perna esquerda para trás e para fora, quadril girado para a esquerda */
 [3.2,{tori:{x:.38,y:.45,z:-.02,yaw:200,pitch:10,leg:{R:W3(.64,.04,-.20),L:W3(.98,.04,.42)},pole:{legR:[1,-.5,0],legL:[.2,-1,-.6]}},
       uke:{z:-.02,roll:-6,leg:{R:B('o',-.15,.06,-.05),L:B('o',-.17,.12,-.03)}}}],
 [4.0,{}],
 /* tornozelos soltos: a perna direita de Uke sai das costas de Tori e a mão esquerda vai ao joelho */
 [4.6,{uke:{leg:{R:W3(.60,.48,.36),L:B('o',-.12,.06,.16)},arm:{R:B('s',.34,.40,.12)},pole:{legR:[.3,0,1],legL:[.9,0,-.45],armR:[.2,-.6,.7]}},
       tori:{arm:{L:SL('legR',.03)},pole:{armL:[0,-.6,-.8]}}}],
 /* o joelho direito de Uke vai ao chão; o quadril dele desce */
 [5.4,{uke:{y:.18,pitch:-94,roll:-4,h:15,leg:{R:W3(.42,.07,.14)},pole:{legR:[-.3,0,1]}},
       tori:{pitch:18}}],
 [6.0,{}],
 /* o joelho direito de Tori sobe e atravessa por cima da coxa direita de Uke */
 [6.6,{tori:{x:.34,y:.48,z:.10,yaw:195,pitch:45,leg:{R:W3(.36,.30,.04)},pole:{legR:[.3,.1,-.2]}},
       uke:{y:.15,pitch:-90,roll:0,leg:{R:W3(.70,.07,.26),L:W3(.62,.07,-.22)},pole:{legR:[.5,0,1],legL:[1,0,-.5]}}}],
 [7.2,{tori:{x:.28,y:.42,z:.28,pitch:64,leg:{R:W3(.32,.28,.08)},arm:{L:W3(-.10,.10,.50)},pole:{legR:[.43,.03,-.12],armL:[.2,-.4,-.9]}},
       uke:{x:0,y:.14,h:-5,leg:{R:W3(.84,.07,.18)},arm:{R:B('s',.30,.36,.14),L:B('s',.30,.36,-.14)},pole:{legR:[1,0,.4],armR:[.2,-.6,.7],armL:[.2,-.6,-.7]}}}],
 /* braço direito por baixo do braço esquerdo de Uke, braço esquerdo para a cabeça */
 [7.8,{tori:{x:.24,y:.36,z:.34,yaw:172,pitch:78,h:-8,arm:fim.arm,pole:{legR:[.6,.2,-.4],armR:fim.pole.armR,armL:fim.pole.armL}},
       uke:{h:-12,arm:{L:B('o',-.15,.42,.12)},pole:{armL:[.5,.2,-.8]}}}],
 /* o pé direito sai de entre as pernas de Uke */
 [8.4,{tori:{leg:{R:W3(.50,.34,.30)},pole:{legR:[.6,0,-.13]}}}],
 [9.0,{tori:{...fim},uke:{leg:{R:W3(.86,.07,.16),L:W3(.92,.07,-.16)},pole:{legR:[1,0,.2],legL:[1,0,-.2]}}}],
 [11,{}]],
 aperto:[{s:0,e:4.4,limbs:['U.R.leg','U.L.leg'],tol:.12,tudo:true},
  {s:1.8,e:6.0,limbs:['T.R.leg'],tol:.12,tudo:true},
  {s:4.4,e:6.4,limbs:['T.L.arm'],tol:.10,tudo:true},
  {s:6.2,e:8.6,limbs:['T.R.leg'],tol:.10,tudo:true,fiel:true},
  {s:7.4,e:11,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true},
  {s:7.6,e:11,limbs:['U.L.arm'],tol:.10,tudo:true},
  {s:6.6,e:8.6,limbs:['U.R.leg'],tol:.10,tudo:true,fiel:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.25,F.tori.head[2]+.15],uke:[F.uke.head[0]-.1,F.uke.head[1]+.3,F.uke.head[2]-.25]}),
 glow:{s:1.6,e:8.4,limbs:{'T.R.leg':'force','T.L.leg':'gold'}},
 stamp:{s:9.2,e:11,big:'3 pts',small:'PASSAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('cabeça alta, costas retas',T.head,-9,2,C.force,a);
  api.tag('mãos no quadril',T.armL.H,6,3,C.force,a);
  api.tag('tornozelos cruzados',U.legR.H,6,-3,C.info,a);
  a=win(t,1.7,4.1);
  api.tag('joelho no cóccix',T.legR.E,-6,3,C.force,a);
  api.tag('perna para trás e para fora',T.legL.E,6,3,C.gold,a);
  a=win(t,4.0,6.1);
  api.arrow(T.armL.H,api.add(T.armL.H,[0,-.2,.06]),C.force,win(t,4.6,5.6));
  api.tag('empurra o joelho para baixo',T.armL.H,6,3,C.force,a);
  a=win(t,6.0,8.5);
  api.tag('joelho por cima da coxa',T.legR.E,6,-4,C.force,a);
  api.tag('peito desce',api.bp(T,.12,.38,0),9,4,C.gold,win(t,7.2,8.5));
  a=win(t,8.6,99);
  api.tag('controle lateral',api.bp(T,.12,.38,0),3,-7,C.force,a);}
});})();
