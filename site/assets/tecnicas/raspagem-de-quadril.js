(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa ajoelhado na guarda, de frente para -x (direita de Uke = -z), postura alta.
   Tori começa deitado de costas, cabeça para -x (yaw 180, pitch 90, roll 180 = de costas, direita = +z).
   Tori apoia a mão DIREITA atrás (+z) e senta; o braço ESQUERDO passa por cima do ombro direito de Uke e prende o braço
   direito dele junto ao corpo. Tori bate o quadril em Uke e gira para a esquerda (-z): Uke cai para a direita dele,
   do lado do braço preso, sem a mão para apoiar. Tori sobe montado. */
const ukeBase={x:.36,y:.42,z:0,yaw:180,pitch:22,roll:0,h:-5,
 leg:{R:W3(.62,.07,-.17),L:W3(.62,.07,.17)},arm:{R:B('o',.10,-.02,-.15),L:B('o',.10,-.02,.15)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:180,pitch:90,roll:180,h:30,
 leg:{R:B('o',-.24,.08,.03),L:B('o',-.24,.12,-.03)},arm:{R:SL('armL',.85),L:SL('armR',.85)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
const post=W3(-.22,.04,.34);
Judo.register3d({
 id:'raspagem-de-quadril', name:'Raspagem de quadril', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Raspagem de quadril (hip bump sweep)',
 why:'A resposta da guarda fechada quando Uke ergue a postura: Tori senta, prende um braço e usa o quadril para derrubá-lo para o lado onde ele não tem apoio.',
 summary:'Raspagem da guarda fechada contra a postura alta. Tori abre a guarda, senta apoiando uma mão atrás, passa o outro braço por cima do ombro de Uke e prende o braço dele. Bate o quadril em Uke e gira para o lado do braço preso: Uke cai de costas sem a mão para apoiar e Tori termina montado.',
 reading:[{k:'Raspagem de quadril',r:'hip bump sweep',m:'o quadril de Tori empurra Uke para trás e para o lado'}],
 facts:[['Origem','Jiu-jitsu. Não tem nome próprio no Kodokan; é uma das raspagens básicas da guarda fechada.'],
  ['Quando usar','Quando Uke senta para trás e ergue o tronco. Com Uke debruçado, o quadril de Tori não tem espaço para subir.'],
  ['Para que lado ele cai','Para o lado do braço preso. Tori apoia a mão direita e prende o braço direito de Uke com o braço esquerdo, então Uke cai para a direita dele.'],
  ['Combinação','Se Uke se defende levando o peso para a frente, Tori já está sentado na posição da kimura e da guilhotina.']],
 errors:[['Sentar e ficar parado','Uke recupera a postura ou empurra Tori de volta. Sentar, prender o braço e bater o quadril é um movimento só.'],
  ['Não prender o braço','Com o braço livre, Uke apoia a mão no tatame e não cai.'],
  ['Girar para o lado da mão apoiada','A raspagem vai para o lado do braço preso, o oposto da mão que apoia no chão.'],
  ['Quadril no chão','Quem derruba é o quadril subindo e indo contra Uke. Sentado com o quadril baixo, só os braços trabalham.']],
 safety:['Treine devagar e com um parceiro que sabe cair de lado sem apoiar a mão.',
  'Quem recebe não deve tentar travar a queda com o braço preso: o ombro fica exposto.',
  'Ao subir para a montada, apoie os joelhos no tatame em vez de cair com o peso sobre o parceiro.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.bracoL',b:'U.ombroR',s:4.2,e:5.4,tol:.06,txt:'o braço esquerdo de Tori passa por cima do ombro DIREITO de Uke (até 6 cm da articulação do ombro)'},
  {c:'contato',a:'T.antebracoL',b:'U.bracoR',s:4.0,e:5.4,txt:'e prende o braço direito de Uke junto ao corpo'},
  {c:'lado',a:'T.maoR',de:'T.quadril',lado:'direita',s:2.4,e:5.4,min:.1,txt:'Tori senta com a mão DIREITA apoiada atrás'},
  {c:'lado',a:'T.quadril',de:'U.quadril',lado:'frente',s:8.0,e:'fim',min:.1,txt:'Uke cai de costas e Tori sobe montado'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda fechada',pt:'Uke ergue a postura',
  d:'Tori está de costas com a guarda fechada. Uke senta para trás, ergue o tronco e apoia as mãos no quadril de Tori para abrir a guarda.',
  l:['O gatilho é a postura alta de Uke.','Com o tronco ereto, o peso de Uke fica nos joelhos.','Tori controla as mangas.']},
 {s:1.6,e:3.6,kanji:'2',ro:'Sentar',pt:'Abrir a guarda e apoiar a mão',
  d:'Tori abre a guarda, planta os pés no tatame e senta, apoiando a mão direita atrás do corpo. O tronco vira um pouco para a esquerda e vai em direção a Uke.',
  l:['Pés no tatame, perto do quadril.','Mão direita apoiada atrás.','Peito em direção a Uke, sem dar distância.']},
 {s:3.6,e:5.4,kanji:'3',ro:'Prender o braço',pt:'Por cima do ombro, braço preso',
  d:'O braço esquerdo de Tori passa por cima do ombro direito de Uke, por fora, e prende o braço dele colado ao corpo de Tori, na altura do cotovelo. Agora Uke não tem a mão direita para apoiar.',
  l:['Braço esquerdo por cima do ombro direito de Uke.','O braço de Uke fica colado no corpo de Tori.','A mão direita de Tori continua apoiada no chão.']},
 {s:5.4,e:7.6,kanji:'4',ro:'Raspagem',pt:'Bater o quadril e girar',
  d:'Tori empurra o chão com a mão e os pés, sobe o quadril contra Uke e gira para a esquerda, o lado do braço preso. Uke é empurrado para trás e para a direita dele e cai de costas.',
  l:['O quadril sobe e vai contra Uke.','Gira para o lado do braço preso, oposto à mão apoiada.','Uke cai sem a mão para apoiar.']},
 {s:7.6,e:10,kanji:'5',ro:'Montada',pt:'Estabilizar',
  d:'Tori acompanha a queda e termina montado, joelhos no chão dos dois lados do quadril de Uke.',
  l:['Ir junto com Uke, sem soltar o braço cedo.','Joelhos abertos, quadril pesado.','Da montada saem estrangulamentos e chaves.']}],
 rep:[.8,2.8,4.6,6.6,9.0], cover:6.4,
 views:[
  {name:'Lado da queda',a:-140,e:22,center:[.25,.5,-.2],span:3.1},
  {name:'Pela cabeça de Tori',a:-90,e:18,center:[.25,.55,-.15],span:3.0},
  {name:'De cima',a:-90,e:88,center:[.25,0,-.15],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [0.8,{uke:{pitch:16,h:-10}}],
 [1.6,{}],
 /* as pernas abrem por fora do quadril de Uke e os pés descem ao tatame */
 [2.0,{tori:{leg:{R:W3(.42,.32,.40),L:W3(.42,.32,-.40)},pole:{legR:[.6,0,1],legL:[.6,0,-1]}}}],
 [2.4,{tori:{leg:{R:W3(.18,.05,.44),L:W3(.18,.05,-.44)},pole:{legR:[.5,.6,1],legL:[.5,.6,-1]}}}],
 /* senta apoiando a mão direita atrás, ao lado; o tronco vai em direção a Uke */
 [3.0,{tori:{x:.04,y:.17,z:.05,pitch:140,yaw:192,roll:180,h:15,arm:{R:post},pole:{armR:[-.6,0,.8]}},uke:{x:.40,y:.40,pitch:10}}],
 [3.6,{tori:{x:.10,y:.20,pitch:176,yaw:200,h:0},uke:{arm:{R:B('o',.08,.20,-.22)},pole:{armR:[-.4,-.6,.9]}}}],
 /* braço esquerdo por cima do ombro direito de Uke, por fora */
 [4.1,{tori:{arm:{L:B('o',-.10,.52,.24)},pole:{armL:[.4,1,-.5]}}}],
 /* e desce por trás do tríceps, prendendo o braço dele colado ao corpo de Tori */
 [4.7,{tori:{arm:{L:B('o',-.11,.38,.22)},pole:{armL:[.2,1,-.3]}},uke:{arm:{R:B('o',.14,.18,-.18)}}}],
 [5.4,{}],
 [6.0,{tori:{x:.14,y:.32,z:.0,pitch:172,yaw:212,roll:198},uke:{x:.44,y:.50,z:-.08,pitch:0,roll:25,h:0}}],
 [6.6,{tori:{x:.24,y:.36,z:-.10,pitch:176,yaw:230,roll:210,leg:{R:W3(.42,.38,.36)},pole:{legR:[.6,.8,.4]}},uke:{x:.48,y:.36,z:-.20,pitch:-40,yaw:215,roll:50,leg:{R:W3(.42,.22,.30),L:W3(.66,.26,.42)}}}],
 [7.1,{tori:{x:.48,y:.36,z:-.32,pitch:185,yaw:246,roll:190,h:10,arm:{R:W3(.36,.04,-.02)},leg:{R:W3(.60,.10,.18),L:W3(.10,.10,-.04)},pole:{legR:[.6,-.6,.4],legL:[.6,-.6,-.4]}},
       uke:{x:.48,y:.13,z:-.24,pitch:-90,yaw:246,roll:0,h:10,leg:{R:W3(.03,.07,.38),L:W3(.31,.07,.50)},pole:{legR:[1,-.2,.3],legL:[1,-.2,-.3]}}}],
 /* montada: joelhos dos dois lados do quadril de Uke, mãos no peito dele */
 [7.6,{tori:{x:.52,y:.30,z:-.36,roll:180,pitch:188,arm:{R:B('o',.15,.30,-.12),L:B('o',.15,.30,.12)},leg:{R:W3(.57,.05,.23),L:W3(.07,.05,.01)},pole:{legR:[.6,-.6,.4],legL:[.6,-.6,-.4],armR:[-.3,-.5,.8],armL:[-.3,-.5,-.8]}}}],
 [10,{}]],
 /* o braço esquerdo de Tori enrola o braço direito de Uke de propósito */
 aperto:{s:4.0,e:7.4,limbs:['T.L.arm'],tol:.10,tudo:true},
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.2,F.tori.head[2]],
  uke:[F.uke.hip[0]+.2,Math.max(F.uke.head[1],F.uke.hip[1])+.24,F.uke.hip[2]-.1]}),
 glow:{s:3.6,e:7.4,limbs:{'T.L.arm':'force','U.R.arm':'gold'}},
 stamp:{s:8.2,e:10,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('postura alta',U.head,-6,-3,C.info,a);
  a=win(t,1.7,3.7);
  api.tag('mão direita apoiada atrás',T.armR.H,-6,3,C.force,a);
  a=win(t,3.7,5.5);
  api.tag('por cima do ombro, braço preso',T.armL.E,4,-3.6,C.force,a);
  api.tag('sem a mão para apoiar',U.armR.H,6,3.4,C.gold,a);
  a=win(t,5.5,7.4);
  api.arrow(T.hip,api.add(T.hip,[.15,.15,-.15]),C.force,a);
  api.tag('quadril sobe contra Uke',T.hip,5,3,C.force,a);
  api.tag('cai para o lado do braço preso',U.head,3,-4,C.info,a);
  a=win(t,7.8,10);
  api.tag('joelhos dos dois lados do quadril',T.legR.E,6,3,C.force,a);}
});})();
