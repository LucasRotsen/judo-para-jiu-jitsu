(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Mesmo referencial do Tate Shiho Gatame: Uke de costas, cabeça para -x, quadril em x=.15
   (yaw 0, pitch -90: direita de Uke = +z). Tori montado, sentado no quadril de Uke, virado para -x (yaw 180: direita = -z).
   Uke vira de bruços por cima do ombro direito (roll de 0 a 180: o peito vai para +z e depois para baixo); de bruços a
   direita dele passa a ser -z, o mesmo lado da direita de Tori. Tori sobe o quadril e deixa Uke virar sem sair de cima.
   Uke sobe para os joelhos (tartaruga: pitch de -90 para -70, quadril acima da cabeça); Tori deita o peito nas costas dele,
   passa o braço direito por cima do ombro direito e o esquerdo por baixo da axila esquerda (cinto de segurança)
   e põe os dois pés na frente do quadril de Uke, por dentro das coxas (ganchos). */
const ukeBase={x:.15,y:.13,z:0,yaw:0,pitch:-90,roll:0,h:8,gf:0,
 leg:{R:W3(.55,.06,.20),L:W3(.55,.06,-.20)},arm:{R:B('o',.14,.0,-.2),L:B('o',.14,.0,.2)},
 pole:{legR:[1,0,.2],legL:[1,0,-.2],armR:[.3,-.6,1],armL:[.3,-.6,-1]}};
const toriBase={x:.05,y:.40,z:0,yaw:180,pitch:8,roll:0,h:0,gf:0,
 leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('s',.2,-.02,.27),L:B('s',.2,-.02,-.27)},
 pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5],armR:[.2,-.6,-1],armL:[.2,-.6,1]}};
/* cinto de segurança: mão direita por cima do ombro direito, até o peito esquerdo de Uke; mão esquerda por baixo da axila */
const cintoR=B('o',.17,.40,-.10), cintoL=B('o',.17,.34,-.02);
/* ganchos: peito do pé na frente do quadril de Uke, por dentro das coxas */
const ganchoR=B('o',.22,.10,.08), ganchoL=B('o',.22,.10,-.08);
Judo.register3d({
 id:'tomar-as-costas', name:'Tomar as costas', kanji:'', group:'ne', cls:'Jiu-jitsu · Transição',
 bjj:'Pegar as costas da montada (ganchos e cinto de segurança)',
 why:'Da montada, quem está por baixo muitas vezes vira de bruços para fugir. Tori deixa ele virar, fica nas costas e prende com os ganchos e o cinto de segurança.',
 summary:'Transição da montada para as costas. Uke vira de bruços para escapar. Tori levanta um pouco o quadril, deixa Uke girar por baixo e continua em cima. Quando Uke sobe para os joelhos, Tori deita o peito nas costas dele, passa um braço por cima do ombro e o outro por baixo da axila (cinto de segurança) e põe os pés na frente do quadril de Uke (ganchos).',
 reading:[{k:'Ganchos',r:'hooks',m:'os pés por dentro das coxas, na frente do quadril'},{k:'Cinto de segurança',r:'seatbelt',m:'um braço por cima do ombro, o outro por baixo da axila, mãos juntas no peito'}],
 facts:[['Origem','Jiu-jitsu. No judô a posição aparece quando Uke vira de quatro para fugir da imobilização.'],
  ['Pontuação','Nas regras da IBJJF, as costas com os dois ganchos valem 4 pontos, como a montada.'],
  ['Por que deixar virar','Brigar para manter Uke de costas gasta força. Se ele vira de bruços, entrega as costas, que é uma posição ainda melhor para Tori.'],
  ['Daqui','Das costas saem o mata-leão (hadaka-jime) e o estrangulamento com a gola (okuri-eri-jime).']],
 errors:[['Sair de cima quando Uke vira','Tori sobe só o suficiente para Uke girar. Se sai de cima, Uke vira de quatro e se levanta.'],
  ['Cruzar os pés','Com os tornozelos cruzados na barriga de Uke, ele aperta com as pernas e machuca o tornozelo de Tori. Os ganchos ficam separados, um em cada coxa.'],
  ['Braços dos dois lados por cima','No cinto de segurança um braço vai por cima do ombro e o outro por baixo da axila. Os dois por cima escorregam pela cabeça.'],
  ['Peito longe das costas','Com espaço entre o peito de Tori e as costas de Uke, ele gira e volta para a guarda.']],
 safety:['Nos ganchos, os pés empurram as coxas, não chutam a virilha.',
  'Quem vira de bruços apoia os joelhos e os cotovelos, sem cair com o peito no chão.',
  'Treine a transição devagar e com orientação de um professor qualificado.'],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Montada',pt:'Tori sentado no quadril',
  d:'Tori está montado, sentado no quadril de Uke e virado para a cabeça dele. Uke empurra o quadril de Tori procurando espaço.',
  l:['Joelhos colados nas costelas.','Quadril pesado, coluna ereta.']},
 {s:1.6,e:3.4,kanji:'2',ro:'Uke vira',pt:'Deixar Uke virar de bruços',
  d:'Uke vira de lado e depois de bruços para fugir. Tori levanta um pouco o quadril e abre o joelho do lado do giro, o suficiente para Uke passar por baixo, sem sair de cima.',
  l:['Quadril sobe só um pouco.','Os joelhos continuam dos dois lados de Uke.','Uke virando de bruços entrega as costas.']},
 {s:3.4,e:5.0,kanji:'3',ro:'Cinto de segurança',pt:'Um braço por cima, outro por baixo',
  d:'Uke sobe para os joelhos. Tori deita o peito nas costas dele: o braço direito passa por cima do ombro direito de Uke e o esquerdo por baixo da axila esquerda. As mãos se juntam no peito de Uke.',
  l:['Por cima do ombro e por baixo da axila.','Mãos juntas no peito, cotovelos fechados.','Peito colado nas costas de Uke.']},
 {s:5.0,e:6.6,kanji:'4',ro:'Ganchos',pt:'Pés na frente do quadril',
  d:'Tori tira os joelhos do chão e põe os dois pés na frente do quadril de Uke, por dentro das coxas. Agora o peso de Tori fica todo nas costas de Uke.',
  l:['Um gancho em cada coxa, sem cruzar os pés.','Calcanhares puxam para trás.','O peso fica em Uke, não no chão.']},
 {s:6.6,e:9.0,kanji:'5',ro:'Costas',pt:'Costas com os dois ganchos',
  d:'Tori controla as costas com os ganchos e o cinto de segurança. É a posição de onde saem o mata-leão e o estrangulamento com a gola.',
  l:['Ganchos e cinto: as costas estão presas.','Daqui saem o mata-leão e o okuri-eri-jime.']}],
 rep:[.8,2.6,4.4,5.8,8.0], cover:5.8,
 views:[
  {name:'Diagonal',a:-130,e:30,center:[.15,.45,.08],span:2.8},
  {name:'Pela cabeça de Uke',a:-90,e:14,center:[.15,.45,.08],span:2.9},
  {name:'Lateral',a:180,e:20,center:[.15,.4,.08],span:2.6}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 /* Uke vira de lado por cima do ombro direito; Tori sobe o quadril e abre o joelho esquerdo (lado do giro, +z) */
 [2.2,{uke:{z:.06,y:.18,roll:70,h:15,leg:{R:W3(.62,.07,.16),L:W3(.58,.30,.16)},arm:{R:W3(-.30,.06,.20),L:W3(-.10,.07,.36)},
        pole:{legR:[1,0,.2],legL:[1,0,-.1],armR:[0,-1,.3],armL:[.3,-.3,-1]}},
       tori:{y:.52,pitch:14,leg:{L:W3(.28,.05,.44)},arm:{R:W3(-.40,.05,-.40),L:W3(-.40,.05,.52)},pole:{armR:[0,.3,-1],armL:[0,.3,1]}}}],
 /* de bruços: a direita de Uke agora é -z; mãos no chão debaixo dos ombros */
 [3.0,{uke:{z:.12,y:.15,roll:180,h:5,leg:{R:W3(.95,.06,.02),L:W3(.95,.06,.30)},arm:{R:W3(-.34,.06,-.14),L:W3(-.34,.06,.38)},
        pole:{legR:[1,0,-.2],legL:[1,0,.2],armR:[.4,-1,.4],armL:[.4,-1,-.4]}},
       tori:{z:.10,y:.48,pitch:20,leg:{R:W3(.30,.05,-.22),L:W3(.30,.05,.44)}}}],
 [3.4,{}],
 /* Uke sobe para os joelhos; Tori deita o peito nas costas dele e monta o cinto de segurança */
 [4.0,{uke:{x:.20,y:.46,pitch:-72,leg:{R:W3(.88,.05,.02),L:W3(.88,.05,.26)},arm:{R:W3(-.30,.06,-.06),L:W3(-.30,.06,.30)},
        pole:{legR:[1,.3,0],legL:[1,.3,0]}},
       tori:{x:.30,y:.66,pitch:62,h:10,leg:{R:W3(.40,.05,-.20),L:W3(.40,.05,.42)},arm:{R:cintoR,L:cintoL},pole:{armR:[.6,.4,-1],armL:[.6,-.6,1]}}}],
 [4.6,{tori:{x:.30,y:.68,pitch:72}}],
 [5.0,{}],
 /* ganchos: os pés saem do chão e entram na frente do quadril, por dentro das coxas */
 [5.5,{tori:{y:.72,leg:{R:B('o',.16,.06,.30),L:B('o',.16,.06,-.30)},pole:{legR:[.6,-.6,-1],legL:[.6,-.6,1]}}}],
 [6.0,{tori:{x:.30,y:.66,pitch:80,leg:{R:ganchoR,L:ganchoL},pole:{legR:[.3,-.8,-1],legL:[.3,-.8,1]}}}],
 [6.6,{}],
 [9.0,{}]],
 /* cinto de segurança e ganchos apertam Uke de propósito */
 aperto:[{s:3.8,e:9.0,limbs:['T.R.arm','T.L.arm'],tol:.10,tudo:true},{s:5.3,e:9.0,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.3,F.tori.head[2]],uke:[F.uke.head[0],F.uke.head[1]+.28,F.uke.head[2]]}),
 glow:{s:3.4,e:6.8,limbs:{'T.R.arm':'force','T.L.arm':'force','T.R.leg':'gold','T.L.leg':'gold'}},
 stamp:{s:6.8,e:9.0,big:'4 pts',small:'COSTAS'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('montada',T.hip,6,-3,C.force,a);
  a=win(t,1.7,3.5);
  api.tag('Uke vira de bruços',U.head,-6,-3,C.uke,a);
  api.tag('quadril sobe um pouco',T.hip,6,-3,C.force,a);
  a=win(t,3.5,5.1);
  api.tag('por cima do ombro',T.armR.E,6,-3,C.force,a);
  api.tag('por baixo da axila',T.armL.E,-6,3,C.force,a);
  a=win(t,5.1,6.7);
  api.tag('ganchos por dentro das coxas',T.legR.H,6,3,C.gold,a);
  a=win(t,6.8,9.0);
  api.tag('peito nas costas',T.head,6,-3,C.force,a);}
});})();
