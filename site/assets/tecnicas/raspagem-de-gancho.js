(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori sentado de frente para +x (yaw 0, direita = +z), Uke ajoelhado de frente para -x
   (yaw 180, direita de Uke = -z). Guarda borboleta: os dois pés de Tori por dentro das coxas de Uke.
   Esgrima: o braço DIREITO de Tori passa por baixo da axila ESQUERDA de Uke, mão nas costas.
   Controle: a mão ESQUERDA de Tori segura o braço DIREITO de Uke acima do cotovelo.
   Tori cai sobre o lado ESQUERDO (o do braço controlado) e levanta o gancho DIREITO, embaixo da coxa esquerda de Uke.
   Uke rola para a direita dele (-z), cai de costas com a cabeça para -z, e Tori sobe no controle lateral pelo lado direito de Uke. */
const hookR=B('o',.20,-.18,-.08), hookL=B('o',.20,-.18,.08);
const underhook=B('o',-.14,.32,-.06), armGrip=SL('armR',-.25);
const ukeBase={x:.55,y:.45,z:0,yaw:180,pitch:15,roll:0,h:-5,
 leg:{R:W3(.84,.07,-.22),L:W3(.84,.07,.22)},arm:{R:B('o',-.08,.36,-.26),L:B('o',-.15,.40,.08)},
 pole:{legR:[1,-.4,.45],legL:[1,-.4,-.45],armR:[0,-.6,1],armL:[0,-.6,-1]}};
const toriBase={x:.02,y:.14,z:0,yaw:0,pitch:30,roll:0,h:10,
 leg:{R:hookR,L:hookL},arm:{R:underhook,L:armGrip},
 pole:{legR:[-.2,1,.8],legL:[-.2,1,-.8],armR:[0,-.6,1],armL:[0,-.6,-1]}};
Judo.register3d({
 id:'raspagem-de-gancho', name:'Raspagem de gancho', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Raspagem de gancho (butterfly sweep)',
 why:'A raspagem que define a guarda borboleta: sentado, com os pés por dentro das coxas de Uke, Tori usa o próprio peso caindo de lado para levantar um homem mais pesado.',
 summary:'Raspagem da guarda borboleta. Tori sentado põe os dois ganchos por dentro das coxas de Uke, passa a esgrima por baixo de um braço e prende o outro braço. Cai de lado para o lado do braço preso e levanta o gancho do lado oposto: Uke rola por cima e cai de costas, e Tori sobe no controle lateral.',
 reading:[{k:'Gancho',r:'hook',m:'o peito do pé por dentro da coxa de Uke'},{k:'Borboleta',r:'butterfly',m:'os joelhos abertos de Tori lembram asas'}],
 facts:[['Origem','Jiu-jitsu. Não tem nome próprio no Kodokan; é a raspagem básica da guarda borboleta.'],
  ['Para que lado cair','Para o lado do braço controlado. Aqui Tori prende o braço direito de Uke e cai sobre o lado esquerdo: Uke não tem a mão para apoiar.'],
  ['Qual gancho levanta','O do lado oposto ao da queda, o do lado da esgrima. Aqui é o gancho direito, embaixo da coxa esquerda de Uke.'],
  ['Pontuação','Raspagem vale 2 pontos. Estabilizar o controle lateral depois não soma mais nada.']],
 errors:[['Cair de costas','Tori cai de lado, não para trás. De costas, o peso de Uke não vem junto e o gancho não levanta nada.'],
  ['Cair para o lado errado','Se Tori cai para o lado da esgrima, Uke apoia a mão livre no tatame e a raspagem para.'],
  ['Ficar longe','Sem a cabeça colada no peito de Uke e a esgrima funda, Uke não vem para a frente e não há o que levantar.'],
  ['Chutar só com a perna','O gancho acompanha a queda do corpo. É o tronco caindo que faz a força, a perna só direciona.']],
 safety:['Treine devagar: quem é raspado precisa saber cair de costas sem apoiar a mão presa.',
  'Não force o gancho contra o joelho de Uke; ele fica na parte de dentro da coxa, perto da virilha.',
  'Ao subir para o controle lateral, desça o peso aos poucos sobre o peito do parceiro.'],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Guarda borboleta',pt:'Ganchos, esgrima e braço',
  d:'Tori está sentado com os joelhos abertos e os dois pés por dentro das coxas de Uke, que está ajoelhado. O braço direito de Tori passa por baixo da axila esquerda de Uke (esgrima) e a mão esquerda segura o braço direito dele acima do cotovelo.',
  l:['Os ganchos ficam por dentro das coxas, perto da virilha.','Esgrima de um lado, braço controlado do outro.','Tori sentado, não deitado.']},
 {s:1.8,e:3.4,kanji:'2',ro:'Puxar',pt:'Cabeça no peito, peso para a frente',
  d:'Tori puxa Uke para cima de si e cola a cabeça no peito dele. O peso de Uke vai para a frente, em cima dos ganchos.',
  l:['Cabeça colada no peito de Uke.','O peso dele tem que estar nos ganchos.','O braço direito de Uke continua preso.']},
 {s:3.4,e:5.2,kanji:'3',ro:'Cair de lado',pt:'Levantar o gancho',
  d:'Tori cai sobre o lado esquerdo, o lado do braço que ele controla, levando Uke junto pela esgrima. Ao mesmo tempo o gancho direito levanta a coxa esquerda de Uke.',
  l:['Cai de lado, para o lado do braço preso.','O gancho que levanta é o do outro lado.','A perna esquerda de Tori fica no chão.']},
 {s:5.2,e:7.2,kanji:'4',ro:'Raspagem',pt:'Uke rola e cai de costas',
  d:'Sem a mão direita para apoiar, Uke tomba sobre o ombro direito, passa por cima e cai de costas ao lado de Tori.',
  l:['Uke cai para o lado do braço preso.','O gancho leva o quadril dele por cima.','Tori não solta a esgrima nem o braço.']},
 {s:7.2,e:10.4,kanji:'5',ro:'Controle lateral',pt:'Subir e estabilizar',
  d:'Tori vira de barriga para baixo, sobe nos joelhos pelo lado direito de Uke e põe o peito sobre o peito dele, ainda com o braço direito de Uke preso.',
  l:['Seguir Uke na queda, sem dar espaço.','Peito no peito, joelhos colados ao corpo dele.','Raspou: 2 pontos.']}],
 rep:[.9,2.6,4.6,6.2,8.8], cover:4.8,
 views:[
  {name:'Pelas costas de Uke',a:70,e:18,center:[.2,.4,-.3],span:2.8},
  {name:'Lado da queda',a:-120,e:20,center:[.2,.4,-.3],span:2.9},
  {name:'De cima',a:0,e:88,center:[.2,0,-.4],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 [2.6,{uke:{x:.56,y:.46,pitch:26,h:0},tori:{x:0,pitch:22,h:15}}],
 [3.4,{}],
 [4.0,{tori:{x:0,z:-.03,roll:-35,pitch:-5,pole:{armL:[-.3,.3,-1]}},uke:{x:.46,y:.46,z:-.06,pitch:50,roll:15}}],
 [4.6,{tori:{x:-.05,y:.14,z:-.08,roll:-75,pitch:-20,leg:{L:W3(.42,.08,-.10)},pole:{legL:[1,.2,-.3]}},
       uke:{x:.43,y:.56,z:-.14,pitch:50,roll:45,leg:{R:W3(.70,.14,-.28),L:W3(.62,.55,.18)}}}],
 [5.2,{tori:{h:10},uke:{x:.46,y:.60,z:-.26,yaw:170,pitch:55,roll:100,leg:{R:W3(.62,.55,-.10),L:W3(.55,.85,.05)}}}],
 [5.8,{uke:{x:.47,y:.42,z:-.40,yaw:150,pitch:65,roll:135,leg:{R:W3(.45,.75,.05),L:W3(.55,.70,.15)}}}],
 [6.4,{tori:{x:-.05,y:.15,z:-.18,roll:-60,pitch:15,leg:{R:W3(.05,.30,.22),L:W3(.10,.07,-.05)}},
       uke:{x:.42,y:.18,z:-.45,yaw:110,pitch:85,roll:170,leg:{R:W3(.40,.35,.10),L:W3(.58,.35,.05)}}}],
 [7.0,{tori:{x:-.08,y:.22,z:-.50,roll:-25,pitch:55,leg:{R:W3(-.25,.06,-.30),L:W3(-.20,.06,-.55)}},
       uke:{x:.40,y:.13,z:-.45,yaw:90,pitch:90,roll:180,h:5,leg:{R:W3(.30,.07,-.02),L:W3(.52,.07,-.02)},pole:{legR:[1,-.2,.1],legL:[1,-.2,-.1]}}}],
 [7.6,{tori:{x:-.12,y:.25,z:-.72,yaw:0,roll:0,pitch:84,h:-20,leg:{R:W3(-.58,.05,-.56),L:W3(-.58,.05,-.88)},
        arm:{R:B('o',.05,.30,-.30)},pole:{legR:[1,-.3,.2],legL:[1,-.3,-.2],armR:[.2,0,1]}},
       uke:{arm:{R:B('o',-.05,.35,-.2),L:B('o',-.05,.52,.12)},pole:{armL:[-.5,0,-1]}}}],
 [10.4,{}]],
 /* os ganchos ficam encostados nas coxas de Uke de propósito; a esgrima abraça as costas */
 aperto:[{s:0,e:5.6,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true},{s:0,e:10.4,limbs:['T.R.arm','T.L.arm','U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.hip[0]+.15,Math.max(F.uke.head[1],F.uke.hip[1])+.22,F.uke.hip[2]]}),
 glow:{s:3.4,e:6.4,limbs:{'T.R.leg':'force','T.L.arm':'gold'}},
 stamp:{s:7.8,e:10.4,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('ganchos por dentro das coxas',T.legR.H,7,3.5,C.force,a);
  api.tag('esgrima',T.armR.E,-6,-3,C.force,a);
  api.tag('braço direito de Uke preso',T.armL.H,-7,4.5,C.gold,a);
  a=win(t,1.8,3.5);
  api.tag('cabeça no peito, peso para a frente',T.head,-6,-3.5,C.force,a);
  a=win(t,3.4,5.4);
  api.tag('cai para o lado do braço preso',T.head,-7,-4,C.force,a);
  api.arrow(T.legR.H,api.add(T.legR.H,[0,.3,0]),C.force,a);
  api.tag('gancho direito levanta',T.legR.H,6,3,C.force,a,false);
  a=win(t,5.3,7.2);
  api.tag('sem a mão para apoiar',U.armR.H,-6,3.5,C.info,a);
  a=win(t,7.4,10.4);
  api.tag('peito no peito',T.head,6,-3.5,C.force,a);}
});})();
