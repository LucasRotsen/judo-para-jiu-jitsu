(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori em pé nos pés de Uke, de frente para a cabeça dele (yaw 180): direita de Tori = -z.
   Como no drill de referência (Swh-9OMNt-Y, câmera atrás da cabeça de Uke): a mão direita de Tori segura a calça de Uke
   no tornozelo DIREITO e a esquerda no joelho direito. Tori puxa essa perna cruzando por cima do próprio quadril direito
   para -z (lado esquerdo de Uke): os joelhos de Uke apontam para -z e o quadril dele vira. Tori pisa com o pé esquerdo
   ao lado do quadril direito de Uke, cola o joelho direito atrás da coxa dele e desce o peito: termina no lado DIREITO
   de Uke (+z), o lado oposto ao que as pernas apontam. */
const ukeBase={x:0,y:.14,z:0,yaw:0,pitch:-90,roll:0,h:-10,gf:0,
 leg:{R:B('o',.13,-.02,-.13),L:B('o',.13,-.02,.13)},
 arm:{R:B('s',.25,.40,.16),L:B('s',.25,.40,-.16)},
 pole:{legR:[.2,1,.5],legL:[.2,1,-.5],armR:[.3,-.6,.6],armL:[.3,-.6,-.6]}};
const toriBase={x:.60,y:.80,z:0,yaw:180,pitch:32,roll:0,h:-15,gf:1,
 leg:{R:W3(.88,.04,-.24),L:W3(.88,.04,.24)},
 arm:{R:SL('legR',.78),L:SL('legR',.08)},
 pole:{legR:[1,-.3,.2],legL:[1,-.3,-.2],armR:[.9,-.3,.5],armL:[.4,-.8,-.4]}};
/* final: lado direito de Uke, peito no peito, joelho direito colado no quadril dele, perna esquerda esticada para trás */
const fim={x:.08,y:.36,z:.40,yaw:142,pitch:80,h:-5,
 leg:{R:W3(.60,.05,.62),L:W3(.50,.05,1.06)},
 arm:{R:B('o',.08,.04,-.20),L:W3(-.66,.09,-.04)},
 pole:{legR:[1,-.2,.3],legL:[.3,-1,-.4],armR:[.3,-.6,.6],armL:[.4,-.6,-.6]}};
Judo.register3d({
 id:'passagem-arrastando-a-perna', name:'Passagem arrastando a perna (leg drag)', kanji:'', group:'ne', cls:'Jiu-jitsu · Passagem de guarda',
 bjj:'Leg drag',
 why:'Uma passagem em pé que não contorna os pés: Tori arrasta uma perna de Uke por cima do próprio quadril, prende o quadril dele virado e desce pelo lado de trás das coxas.',
 summary:'Passagem de guarda em pé. Tori segura a calça de uma perna de Uke no tornozelo e no joelho, puxa essa perna cruzando por cima do próprio quadril para o outro lado, cola o joelho atrás da coxa dele com o quadril de Uke virado e desce o peito para o controle lateral, do lado oposto ao que as pernas de Uke apontam.',
 reading:[{k:'Leg drag',r:'leg drag',m:'arrastar a perna'}],
 facts:[['Origem','Técnica do jiu-jitsu, sem nome próprio no judô.'],
  ['Pontuação (IBJJF)','Passar a guarda e estabilizar por 3 segundos vale 3 pontos.'],
  ['Para que lado passa','Para o lado oposto ao que as pernas de Uke apontam. Aqui Tori arrasta a perna direita de Uke para o lado esquerdo dele e termina no lado direito.'],
  ['Diferença do toreando','No toreando Tori empurra as duas pernas e corre em volta dos pés. Aqui a perna fica presa no quadril de Tori e ele entra pelo lado de trás das coxas, sem dar a volta.']],
 errors:[['Puxar só com os braços','A perna atravessa por cima do quadril de Tori. Sem o quadril, Uke recolhe o joelho e recompõe a guarda.'],
  ['Deixar o quadril de Uke reto','A passagem só funciona com o quadril dele virado, os joelhos apontando para o outro lado.'],
  ['Espaço atrás da coxa','O joelho e o quadril de Tori colam atrás da coxa de Uke. Com espaço, ele vira de volta para a guarda.'],
  ['Subir o peito no fim','O peito desce direto no peito de Uke antes de soltar a perna.']],
 safety:['Arraste a perna sem torcer o joelho de Uke: o quadril dele vira junto com a perna.',
  'Desça o peito com controle, sem cair com o peso sobre as costelas.',
  'Treine primeiro com Uke cooperando, depois com resistência leve.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'U.joelhoR',de:'U.quadril',lado:'esquerda',s:3.0,e:5.6,min:.05,txt:'Tori arrasta a perna: os joelhos de Uke apontam para o lado esquerdo dele'},
  {c:'lado',a:'T.quadril',de:'U.tronco',lado:'direita',s:7.6,e:'fim',min:.15,txt:'Tori termina no lado DIREITO de Uke, o oposto ao que as pernas apontam'},
  {c:'contato',a:'T.peito',b:'U.peito',s:7.6,e:'fim',txt:'peito no peito'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Pegada',pt:'Tornozelo e joelho',
  d:'Uke está de costas com a guarda aberta e os pés no quadril de Tori. Tori fica em pé, com base, e segura a calça da perna direita de Uke: a mão direita no tornozelo e a mão esquerda no joelho.',
  l:['As duas mãos na mesma perna.','Mão de cima no tornozelo, mão de baixo no joelho.','Quadril de Tori atrás, longe dos pés.']},
 {s:1.6,e:3.8,kanji:'2',ro:'Arrastar',pt:'A perna cruza o quadril de Tori',
  d:'Tori recua meio passo para tirar os pés de Uke do quadril e puxa a perna direita dele cruzando por cima do próprio quadril, para o lado esquerdo de Uke. Os joelhos de Uke passam a apontar para esse lado e o quadril dele vira.',
  l:['A perna passa por cima do quadril de Tori, não por baixo.','Os joelhos de Uke apontam para longe do lado da passagem.','O quadril de Uke fica virado, de lado.']},
 {s:3.8,e:5.6,kanji:'3',ro:'Colar',pt:'Joelho atrás da coxa',
  d:'A mão direita leva a perna arrastada até o chão e escorrega do tornozelo para o joelho, prendendo-a. Tori pisa com o pé esquerdo ao lado do quadril direito de Uke, desce o quadril e cola o joelho direito atrás da coxa dele.',
  l:['O joelho de Tori fecha o espaço atrás da coxa.','A perna arrastada fica presa no chão do outro lado.','Tori entra pelo lado de trás das pernas, sem contornar os pés.']},
 {s:5.6,e:7.6,kanji:'4',ro:'Peito',pt:'Peito no peito',
  d:'Tori solta o tornozelo, desce o peito sobre o peito de Uke, passa o braço esquerdo por trás da cabeça dele e o direito bloqueia o quadril do outro lado.',
  l:['O peito desce antes de soltar a pressão do quadril.','Braço por trás da cabeça, braço no quadril.','Uke continua com o quadril virado.']},
 {s:7.6,e:10,kanji:'5',ro:'Antei',pt:'Controle lateral',
  d:'Tori fica no lado direito de Uke, oposto ao que as pernas dele apontam, quadril baixo e perna esquerda esticada para trás. Com 3 segundos estáveis, a passagem vale pontos.',
  l:['Peito no peito, quadril baixo.','Três segundos estáveis: 3 pontos na regra da IBJJF.','Daqui saem montada, joelho na barriga ou pegada das costas.']}],
 rep:[.8,3.1,4.9,6.8,9.0], cover:3.2,
 views:[
  {name:'Pela cabeça de Uke',a:-90,e:30,center:[.12,.58,0],span:3.4},
  {name:'Lado da passagem',a:20,e:24,center:[.2,.55,.1],span:3.3},
  {name:'De cima',a:-90,e:88,center:[0,0,.12],span:3.3}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* meio passo para trás: os pés saem do quadril, a perna direita fica nas mãos de Tori */
 [2.2,{tori:{x:.74,y:.79,pitch:36,pole:{armR:[.5,-.7,.4]},leg:{R:W3(1.0,.04,-.24),L:W3(1.0,.04,.24)}},
       uke:{leg:{R:W3(.58,.56,.06),L:W3(.44,.10,-.18)},pole:{legR:[.5,.6,.2],legL:[1,.2,-.3]}}}],
 /* a perna cruza por cima do quadril direito de Tori, para o lado esquerdo de Uke */
 [3.0,{tori:{x:.70,y:.77,z:.04,yaw:188,pitch:40},
       uke:{roll:14,leg:{R:W3(.58,.62,-.30),L:W3(.48,.10,-.34)},pole:{legR:[.4,.6,-.5],legL:[.6,.2,-1]}}}],
 [3.8,{tori:{x:.62,y:.72,z:.10,yaw:178,pitch:48},
       uke:{roll:26,leg:{R:W3(.46,.44,-.44),L:W3(.46,.07,-.46)},pole:{legR:[.4,.4,-1],legL:[.5,.3,-1]}}}],
 /* passo do pé esquerdo ao lado do quadril direito de Uke; mão esquerda vai para o quadril dele */
 [4.6,{tori:{x:.46,y:.56,z:.26,yaw:160,pitch:60,leg:{L:W3(.14,.04,.52),R:W3(.92,.04,.08)},
        arm:{L:B('o',.12,.04,.14)},pole:{legL:[1,-.1,-.4],legR:[1,-.3,.2],armL:[.3,-.6,-.6]}},
       uke:{roll:30,leg:{R:W3(.40,.36,-.50),L:W3(.54,.07,-.34)}}}],
 /* o joelho direito desce e cola atrás da coxa de Uke */
 [5.6,{tori:{x:.32,y:.48,z:.36,yaw:150,pitch:66,leg:{R:W3(.66,.05,.58),L:W3(.30,.04,.82)},arm:{R:SL('legR',.12)},pole:{legR:[1,-.1,.3],legL:[.6,-.6,-.4]}},
       uke:{roll:32,leg:{R:W3(.28,.18,-.62),L:W3(.56,.07,-.32)},pole:{legR:[.5,.3,-1],legL:[.5,.3,-1]}}}],
 /* peito desce: braço esquerdo por trás da cabeça, braço direito no quadril de lá */
 [6.4,{tori:{x:.18,y:.40,z:.40,yaw:146,pitch:74,h:-10,arm:{R:B('o',.10,.06,-.16),L:W3(-.60,.16,.06)},leg:{L:W3(.42,.05,.98)},
        pole:{armR:fim.pole.armR,armL:fim.pole.armL,legL:[.4,-.9,-.4]}},
       uke:{roll:26,arm:{R:W3(-.66,.07,.40),L:W3(-.24,.07,-.42)},pole:{armR:[0,-1,.6],armL:[0,-1,-.6]}}}],
 [7.2,{tori:fim,uke:{roll:22}}],
 [7.6,{}],
 [8.2,{tori:{y:.34}}],
 [10,{}]],
 aperto:[{s:5.0,e:10,limbs:['T.R.leg'],tol:.10,tudo:true},{s:6.0,e:10,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.3,F.tori.head[2]],uke:[F.uke.head[0]-.15,.3,F.uke.head[2]-.2]}),
 glow:{s:1.6,e:5.6,limbs:{'T.R.arm':'force','T.L.arm':'force','T.R.leg':'gold'}},
 stamp:{s:7.8,e:10,big:'3 pts',small:'PASSAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('tornozelo',T.armR.H,-6,-4,C.force,a);
  api.tag('joelho',T.armL.H,6,3,C.force,a);
  a=win(t,1.7,3.9);
  api.arrow(U.legR.H,api.add(U.legR.H,[0,-.1,-.4]),C.force,win(t,1.8,3.4));
  api.tag('a perna cruza o quadril de Tori',U.legR.H,-4,-5,C.force,a);
  api.tag('quadril de Uke vira',U.hip,-6,5,C.uke,win(t,2.8,3.9));
  a=win(t,3.8,5.7);
  api.tag('joelho atrás da coxa',T.legR.E,6,4,C.gold,win(t,5.0,5.8));
  api.tag('perna presa no chão',T.armR.H,-8,3,C.force,win(t,4.8,5.7));
  a=win(t,5.6,7.7);
  api.tag('peito no peito',api.bp(T,.12,.38,0),8,-6,C.force,a);
  api.tag('braço por trás da cabeça',T.armL.H,-6,-4,C.force,a);
  a=win(t,7.7,99);
  api.tag('lado oposto às pernas',T.hip,8,-3,C.ink,a);}
});})();
