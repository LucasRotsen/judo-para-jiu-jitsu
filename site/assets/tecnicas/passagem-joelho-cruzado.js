(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori começa em pé nos pés de Uke, de frente para a cabeça dele (yaw 180): esquerda de Tori = +z (lado direito de Uke).
   Como no drill de Marcelo Garcia (VgmsMddwUZs): a mão esquerda de Tori prende o joelho DIREITO de Uke no chão, o joelho
   DIREITO de Tori atravessa por cima da coxa direita de Uke e desce no tatame do lado de fora do quadril direito dele.
   O joelho aponta para a esquerda de Tori (+z) e é para esse lado que ele passa: termina no lado direito de Uke, peito no
   peito, cabeça junto da cabeça de Uke, braço esquerdo por baixo da cabeça e braço direito por baixo do braço esquerdo de Uke. */
const ukeBase={x:0,y:.14,z:0,yaw:0,pitch:-90,roll:0,h:-12,gf:0,
 leg:{R:W3(.48,.07,.22),L:W3(.48,.07,-.22)},
 arm:{R:B('s',.30,.36,.14),L:B('s',.30,.36,-.14)},
 pole:{legR:[1,0,.3],legL:[1,0,-.3],armR:[.2,-.6,.7],armL:[.2,-.6,-.7]}};
const toriBase={x:.66,y:.68,z:.02,yaw:180,pitch:66,roll:0,h:-25,gf:1,
 leg:{R:W3(.84,.04,-.10),L:W3(.76,.04,.38)},
 arm:{R:B('o',.12,.28,-.04),L:SL('legR',.05)},
 pole:{legR:[1,-.2,.3],legL:[1,-.2,-.3],armR:[.2,-.8,.5],armL:[.2,-.8,-.5]}};
/* final: peito no peito pelo lado direito de Uke, perna esquerda esticada para trás, joelho direito no chão junto ao quadril dele */
const fim={x:.22,y:.33,z:.38,yaw:162,pitch:84,h:-5,
 leg:{R:W3(.64,.05,.46),L:W3(.98,.05,.80)},
 arm:{R:B('o',-.03,.44,-.24),L:B('o',-.03,.64,-.08)},
 pole:{legR:[.15,-.46,-.38],legL:[.3,-1,-.4],armR:[.5,-.6,.6],armL:[.5,-.6,-.6]}};
Judo.register3d({
 id:'passagem-joelho-cruzado', name:'Passagem de joelho cruzado', kanji:'', group:'ne', cls:'Jiu-jitsu · Passagem de guarda',
 bjj:'Knee cut (knee slice)',
 why:'A passagem mais usada do jiu-jitsu moderno: em vez de rodear as pernas, Tori atravessa o joelho por cima da coxa de Uke e cai direto no peito dele.',
 summary:'Passagem de guarda por dentro. Tori prende o joelho de Uke no chão, cruza o joelho e a canela por cima da coxa dele com o joelho apontando para o tatame do outro lado, pega o braço por baixo, desce o peito e solta o pé que ficou entre as pernas de Uke, terminando no controle lateral.',
 reading:[{k:'Knee cut',r:'knee slice',m:'o joelho corta a coxa'}],
 facts:[['Origem','Técnica do jiu-jitsu, sem nome próprio no judô.'],
  ['Pontuação (IBJJF)','Passar a guarda e estabilizar por 3 segundos vale 3 pontos.'],
  ['Para que lado passa','Para o lado em que o joelho aponta. Aqui o joelho direito de Tori cruza a coxa direita de Uke e desce do lado de fora do quadril direito: Tori termina no lado direito dele.'],
  ['De onde sai','Guarda aberta com Uke de joelhos para cima, meia-guarda com escudo de joelho ou depois de um toreando que não entrou.']],
 errors:[['Joelho no meio','Joelho apoiado entre as pernas de Uke não passa nada: ele atravessa a coxa e desce no tatame do outro lado.'],
  ['Sem o braço de baixo','Se Uke pega o braço por baixo (esgrima) do lado da passagem, ele vira de lado e repõe a guarda ou vai para as costas de Tori.'],
  ['Peito alto','Com o tronco ereto, Uke empurra o quadril de Tori e recoloca a guarda. O peito desce junto com o joelho.'],
  ['Esquecer o pé de trás','No fim, Uke tenta prender o pé que ficou entre as pernas dele. Tori só estabiliza depois de soltar esse pé.']],
 safety:['O joelho desliza por cima da coxa de Uke; não cai com o peso sobre o joelho dele.',
  'Desça o peito com controle sobre o peito de Uke.',
  'Treine primeiro com Uke cooperando, depois com resistência leve.'],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Pegada',pt:'Gola e joelho',
  d:'Uke está de costas com os joelhos para cima. Tori fica em pé nos pés dele, curvado, a mão direita na gola de Uke e a mão esquerda no joelho direito dele.',
  l:['A mão da gola segura o tronco de Uke no chão.','A mão esquerda vai abaixar a perna que será cortada.','Pés de Tori firmes, por fora dos pés de Uke.']},
 {s:1.6,e:4.2,kanji:'2',ro:'Corte',pt:'Joelho por cima da coxa',
  d:'Tori empurra o joelho direito de Uke para o chão, levanta a perna direita e atravessa o joelho por cima da coxa direita dele, com o joelho apontando para o tatame do outro lado. O joelho desce no tatame por fora do quadril de Uke e a perna esquerda fica atrás, aberta.',
  l:['O joelho de Tori aponta para o lado da passagem.','A canela fica atravessada sobre a coxa de Uke, o pé entre as pernas dele.','A perna de trás estica e abre a base.']},
 {s:4.2,e:6.2,kanji:'3',ro:'Braço de baixo',pt:'Braço por baixo, peito no peito',
  d:'Tori desce o peito sobre o peito de Uke. O braço direito passa por baixo do braço esquerdo de Uke antes que ele faça a esgrima, e o braço esquerdo envolve a cabeça dele.',
  l:['O braço por baixo impede Uke de virar de lado.','Cabeça de Tori junto da cabeça de Uke.','O peito desce junto com o joelho, sem espaço.']},
 {s:6.2,e:8.2,kanji:'4',ro:'Soltar o pé',pt:'Tirar o pé preso',
  d:'Com o peito pesado, Tori puxa o pé direito, que ficou entre as pernas de Uke, por cima da coxa dele e apoia o joelho no chão junto ao quadril. A perna esquerda continua esticada para trás.',
  l:['O pé sai por último.','O joelho direito fecha o quadril de Uke.','Perna esquerda longa: base para não ser rolado.']},
 {s:8.2,e:11,kanji:'5',ro:'Antei',pt:'Controle lateral',
  d:'Tori fica no lado direito de Uke, peito no peito, um braço por baixo da cabeça e o outro por baixo do braço do outro lado. Com 3 segundos estáveis, a passagem vale pontos.',
  l:['Peito no peito, quadril baixo.','Três segundos estáveis: 3 pontos na regra da IBJJF.','Daqui saem montada, joelho na barriga ou kimura.']}],
 rep:[.8,3.8,5.6,7.4,9.8], cover:3.9,
 views:[
  {name:'Lado da passagem',a:-20,e:28,center:[.25,.35,.2],span:3.0},
  {name:'Pelos pés de Uke',a:70,e:24,center:[.25,.4,.15],span:3.0},
  {name:'De cima',a:-90,e:88,center:[.08,0,.2],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* a mão esquerda empurra o joelho direito de Uke para o chão, para fora */
 [2.3,{uke:{leg:{R:W3(.54,.07,.08)},pole:{legR:[.3,0,1]}},
       tori:{y:.64,pitch:70}}],
 /* a perna direita sobe e vem para a frente */
 [3.0,{tori:{x:.56,y:.62,z:.06,yaw:186,leg:{R:W3(.50,.34,.0)},pole:{legR:[1,.4,.1]}}}],
 /* o joelho atravessa por cima da coxa direita de Uke */
 [3.6,{tori:{x:.38,y:.50,z:.20,yaw:195,pitch:58,leg:{R:W3(.36,.30,.06),L:W3(.95,.04,.55)},pole:{legR:[.26,.11,-.14],legL:[.3,-1,-.4]}}}],
 /* o joelho desce no tatame por fora do quadril de Uke */
 [4.2,{tori:{x:.28,y:.42,z:.28,pitch:64,leg:{R:W3(.32,.30,.08)},arm:{L:W3(-.10,.10,.50)},pole:{legR:[.43,.03,-.12],armL:[.2,-.4,-.9]}}}],
 /* braço direito por baixo do braço esquerdo de Uke, braço esquerdo para a cabeça */
 [4.9,{tori:{x:.26,y:.38,z:.32,yaw:178,pitch:72,h:-10,arm:{R:W3(-.30,.10,-.30),L:W3(-.62,.10,.20)},
        pole:{armR:[.3,-.6,.6],armL:[.4,-.6,-.6]}},
       uke:{arm:{L:W3(-.30,.45,-.32)},pole:{armL:[.2,.4,-.9]}}}],
 [5.6,{tori:{x:.24,y:.34,z:.36,yaw:170,pitch:80,h:-5,arm:fim.arm,pole:{legR:[.52,.05,-.23],armR:fim.pole.armR,armL:fim.pole.armL}},
       uke:{arm:{L:B('o',-.15,.42,.12)},leg:{L:W3(.50,.10,-.10)},pole:{armL:[.5,.2,-.8],legL:[1,0,-.6]}}}],
 [6.2,{}],
 /* o pé direito sai de entre as pernas por cima da coxa direita de Uke */
 [6.9,{tori:{leg:{R:W3(.50,.34,.30)},pole:{legR:[.6,0,-.13]}}}],
 [7.6,{tori:{...fim,arm:fim.arm},uke:{leg:{R:W3(.86,.07,.16),L:W3(.92,.07,-.16)},pole:{legR:[1,0,.2],legL:[1,0,-.2]}}}],
 [8.2,{}],
 [11,{}]],
 aperto:[{s:3.3,e:7.0,limbs:['T.R.leg'],tol:.10,tudo:true,fiel:true},{s:4.6,e:11,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true},
  {s:5.2,e:11,limbs:['U.L.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.hip[0],F.tori.hip[1]+.45,F.tori.hip[2]+.2],uke:[F.uke.head[0]-.1,F.uke.head[1]+.3,F.uke.head[2]-.25]}),
 glow:{s:1.6,e:6.2,limbs:{'T.R.leg':'force','T.R.arm':'gold'}},
 stamp:{s:8.4,e:11,big:'3 pts',small:'PASSAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('gola',T.armR.H,-6,-3,C.force,a);
  api.tag('joelho de Uke',T.armL.H,6,3,C.force,a);
  a=win(t,1.7,4.3);
  api.tag('joelho por cima da coxa',T.legR.E,6,-4,C.force,a);
  api.tag('pé entre as pernas de Uke',T.legR.H,6,3,C.force,win(t,3.4,4.3));
  api.tag('perna de trás abre a base',T.legL.E,6,3,C.gold,win(t,3.4,4.3));
  a=win(t,4.2,6.3);
  api.tag('braço por baixo do braço de Uke',T.armR.H,4,-6,C.gold,a);
  api.tag('peito no peito',api.bp(T,.12,.38,0),9,4,C.force,a);
  a=win(t,6.2,8.3);
  api.arrow(T.legR.H,api.add(T.legR.H,[.15,0,.25]),C.force,win(t,6.2,7.6));
  api.tag('solta o pé preso',T.legR.H,6,3,C.force,a);
  a=win(t,8.3,99);
  api.tag('controle lateral',api.bp(T,.12,.38,0),3,-7,C.force,a);}
});})();
