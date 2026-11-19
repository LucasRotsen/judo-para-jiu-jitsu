(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Mesmo referencial do Yoko Shiho Gatame, com os papéis trocados:
   Tori está POR BAIXO, de costas, cabeça para -x (yaw 0, pitch -90: direita de Tori = +z; roll + vira o peito para +z).
   Uke está por cima no 100 quilos, atravessado sobre o peito de Tori, do lado DIREITO dele (+z), de frente para -z.
   Tori enquadra (antebraço esquerdo no pescoço de Uke, mão direita no quadril dele), faz a ponte, vira de lado para Uke
   e foge com o quadril para -z; o joelho direito entra no vão. Depois Tori gira de costas até os pés apontarem para Uke
   (yaw 0 -> -90: a cabeça vai de -x para -z) e fecha a guarda. Uke sobe de joelhos, de frente para -z, entre as pernas.
   Cabeça de Tori vista de cima: começa em -x, passa por (-x,-z) e termina em -z, sem voltar. */
const toriBase={x:.30,y:.13,z:0,yaw:0,pitch:-90,roll:0,h:-8,gf:0,
 leg:{R:W3(1.14,.07,.19),L:W3(1.14,.07,-.19)},arm:{R:W3(.30,.06,.30),L:W3(.08,.06,-.36)},
 pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[-.3,0,1],armL:[.2,.3,-1]}};
/* Uke no 100 quilos: peito no peito de Tori, braço esquerdo por baixo do pescoço, mão direita no quadril de Tori */
const ukeBase={x:.05,y:.38,z:.45,yaw:90,pitch:92,roll:0,h:-10,gf:0,
 leg:{R:W3(.30,.05,.68),L:W3(-.20,.05,.68)},arm:{L:B('o',-.05,.55,-.12),R:B('o',.04,-.12,.20)},
 pole:{legR:[1,1,.15],legL:[1,1,-.15],armL:[.4,-.5,-1],armR:[.6,-.3,1]}};
/* guarda fechada no fim: a da raspagem de quadril, girada 90° (pés de Tori para +z) */
const toriGuarda={x:0,y:.15,z:-.16,yaw:-90,pitch:-90,roll:0,h:30,
 leg:{R:B('o',-.24,.08,.03),L:B('o',-.24,.12,-.03)},arm:{R:SL('armL',.85),L:SL('armR',.85)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
const ukeGuarda={x:0,y:.42,z:.20,yaw:90,pitch:22,roll:0,h:-5,
 leg:{R:W3(.17,.07,.46),L:W3(-.17,.07,.46)},arm:{R:B('o',.10,-.02,-.15),L:B('o',.10,-.02,.15)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
Judo.register3d({
 id:'fuga-de-quadril', name:'Fuga de quadril (repor a guarda)', kanji:'', group:'ne', cls:'Jiu-jitsu · Fuga',
 bjj:'Fuga de quadril (shrimp) e reposição da guarda',
 why:'O movimento mais treinado do jiu-jitsu. Quem está embaixo do 100 quilos cria espaço com os braços, foge com o quadril e põe as pernas de volta entre os dois.',
 summary:'Fuga do controle lateral. Tori, por baixo, enquadra com os antebraços: um no pescoço de Uke, a mão do outro no quadril dele. Faz uma ponte curta, vira de lado e empurra o quadril para longe, como um camarão. No espaço que abriu, o joelho entra entre os dois; Tori gira de costas, traz as pernas para a frente de Uke e fecha a guarda.',
 reading:[{k:'Fuga de quadril',r:'shrimp',m:'virar de lado e levar o quadril para longe, como um camarão'}],
 facts:[['Origem','Jiu-jitsu. No judô o mesmo movimento serve para sair de yoko-shiho-gatame antes dos 20 segundos.'],
  ['Braços não empurram','Os antebraços só seguram a distância, como uma moldura. Quem cria o espaço é o quadril indo para longe.'],
  ['Para que lado','Tori vira de lado DE FRENTE para Uke e leva o quadril para o lado oposto. De costas para Uke, ele entrega as costas.'],
  ['Onde termina','Na guarda fechada, por baixo. De uma posição em que só se defende, Tori volta a uma em que ataca.']],
 errors:[['Empurrar com os braços esticados','Braço esticado vira alavanca para a kimura ou para o juji-gatame. Cotovelos dobrados e colados, só segurando.'],
  ['Fugir sem a ponte','Com o peso de Uke em cima, o quadril não sai do lugar. A ponte curta tira o peso por um instante e é nele que o quadril foge.'],
  ['Virar de costas para Uke','Ao fugir, o peito fica de frente para Uke. De costas, ele pega as costas ou o pescoço.'],
  ['Joelho por fora','O joelho entra entre os dois corpos, pela frente do quadril de Uke. Por fora, Uke volta para o 100 quilos.']],
 safety:['A ponte é com os pés e o quadril. O pescoço não faz força.',
  'Quem está por cima não crava o antebraço na garganta de quem foge.',
  'Treine o movimento sozinho (camarão no tatame) antes de treinar com parceiro, e com orientação de um professor qualificado.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'U.quadril',de:'T.tronco',lado:'direita',s:0,e:1.6,min:.15,txt:'Uke começa nos 100 quilos do lado direito de Tori'},
  {c:'contato',a:'T.antebracoL',b:'U.pescoco',s:2.0,e:4.6,txt:'enquadrar: o antebraço esquerdo de Tori no pescoço de Uke'},
  {c:'giro',a:'T.cabeca',centro:'T.quadril',s:6.4,e:8.2,txt:'ao repor a guarda, a cabeça de Tori vai de -x para -z sem voltar'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'abaixo',s:8.4,e:'fim',min:.1,txt:'no fim Uke fica entre as pernas de Tori, na guarda'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'100 quilos',pt:'Uke por cima, atravessado',
  d:'Tori está de costas e Uke está atravessado sobre o peito dele, do lado direito, com o braço por baixo do pescoço. Tori mantém o cotovelo direito colado ao corpo.',
  l:['Cotovelo de dentro colado: não deixa Uke montar.','Não empurrar ainda: primeiro enquadrar.','Tori espera Uke aliviar o peso do peito.']},
 {s:1.6,e:3.4,kanji:'2',ro:'Enquadrar',pt:'Antebraço no pescoço, mão no quadril',
  d:'O antebraço esquerdo de Tori atravessa e encosta no pescoço e no ombro de Uke. A mão direita para no quadril dele. Os pés sobem e plantam no tatame, perto do quadril.',
  l:['Antebraço de cima no pescoço, de lado, sem esticar.','Mão de baixo no quadril de Uke.','Pés plantados para a ponte.']},
 {s:3.4,e:4.6,kanji:'3',ro:'Ponte',pt:'Ponte curta na direção de Uke',
  d:'Tori levanta o quadril e empurra Uke um pouco para cima e para o lado. É uma ponte curta: o objetivo é tirar o peso de cima por um instante.',
  l:['Ponte para cima e para Uke.','Os braços seguram a moldura, não empurram.','O espaço dura meio segundo: aproveitar na hora.']},
 {s:4.6,e:6.4,kanji:'4',ro:'Fuga de quadril',pt:'Virar de lado e levar o quadril para longe',
  d:'Tori cai de lado, de frente para Uke, e empurra o tatame com o pé para levar o quadril para longe dele, como um camarão. No espaço que abre, o joelho direito entra entre os dois corpos, na frente do quadril de Uke.',
  l:['De lado, de frente para Uke.','O quadril vai para longe; a cabeça fica.','Joelho de dentro entre os dois corpos.']},
 {s:6.4,e:8.2,kanji:'5',ro:'Repor a guarda',pt:'Girar de costas e trazer as pernas',
  d:'Com o joelho como escudo, Tori gira de costas e aponta os pés para Uke. As pernas passam pela frente do quadril dele e se fecham atrás da cintura. Uke sobe de joelhos, já entre as pernas de Tori.',
  l:['Os pés apontam para Uke.','Pernas fecham atrás da cintura dele.','A cabeça de Tori vai para longe, sem voltar pelo mesmo caminho.']},
 {s:8.2,e:10.5,kanji:'6',ro:'Guarda fechada',pt:'De volta à guarda',
  d:'Tori está de costas com a guarda fechada e controla as mangas de Uke, que está de joelhos com a postura alta. Saiu de baixo do 100 quilos para a posição de onde saem as raspagens e as finalizações da guarda.',
  l:['Guarda fechada e mangas controladas.','Daqui saem raspagem de quadril, kimura e guilhotina.']}],
 rep:[.8,2.6,4.1,5.6,7.4,9.6], cover:5.6,
 views:[
  {name:'Pelo lado das cabeças',a:90,e:26,center:[.05,.4,.1],span:3.0},
  {name:'Pelas costas de Tori',a:160,e:30,center:[.05,.4,.1],span:3.0},
  {name:'De cima',a:-90,e:88,center:[0,0,0],span:3.0}],
 keys:[
 [0,{tori:toriBase,uke:ukeBase}],
 [1.4,{}],
 /* moldura: antebraço esquerdo de Tori no pescoço e ombro de Uke, mão direita no quadril dele; pés plantados */
 [2.2,{tori:{arm:{L:B('o',.16,.40,-.06),R:B('o',.14,-.04,.10)},leg:{R:W3(.86,.07,.24),L:W3(.92,.07,-.20)},
        pole:{armL:[-.2,-.6,-1],armR:[-.3,-.6,1],legR:[1,.2,.3],legL:[1,.2,-.3]}}}],
 [2.9,{tori:{leg:{R:W3(.70,.07,.22),L:W3(.74,.07,-.22)}}}],
 [3.4,{}],
 /* ponte curta: quadril sobe, peito vira um pouco para Uke; Uke é levantado e vai para trás */
 [3.9,{tori:{y:.30,roll:20,h:5},uke:{y:.48,z:.52,pitch:80,h:-5,arm:{R:B('o',.04,-.06,-.20)},pole:{armR:[.3,.6,1]}}}],
 [4.4,{tori:{y:.20,roll:40},uke:{y:.46,z:.56,pitch:78}}],
 /* fuga: de lado, de frente para Uke; o quadril vai para -z; o joelho direito entra no vão */
 [5.0,{tori:{x:.24,y:.18,z:-.22,yaw:-12,roll:72,h:10,leg:{R:W3(.62,.10,.02),L:W3(.80,.07,-.34)},pole:{legR:[1,.4,.6],legL:[1,0,-.4]}}}],
 [5.6,{tori:{x:.20,y:.18,z:-.34,yaw:-24,roll:76,leg:{R:W3(.30,.42,.30),L:W3(.70,.07,-.42)},pole:{legR:[.4,.4,1]}},
       uke:{y:.48,z:.60,pitch:70}}],
 [6.4,{}],
 [6.75,{uke:{arm:{L:B('s',.38,.20,-.18)},pole:{armL:[-.3,-.7,-.6]}},tori:{arm:{R:SL('armL',.6),L:SL('armR',.6)},pole:{armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}}}],
 /* Tori gira de costas e aponta os pés para Uke; Uke levanta o tronco */
 [7.0,{tori:{x:.12,y:.15,z:-.28,yaw:-55,roll:40,h:20,leg:{R:W3(-.06,.36,.16),L:W3(.42,.40,.36)},pole:{legR:[.6,.4,1],legL:[.3,.2,-1]}},
       uke:{x:.02,y:.46,z:.44,pitch:55,h:-8,arm:{R:B('o',.10,.05,-.18),L:B('o',.10,.05,.18)},pole:{armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}}}],
 [7.6,{tori:{x:.04,y:.15,z:-.20,yaw:-82,roll:8,leg:{R:W3(-.34,.42,.34),L:W3(.34,.42,.34)},pole:{legR:[.3,0,1],legL:[.3,0,-1]}},
       uke:{x:0,y:.43,z:.26,pitch:30,leg:{R:W3(.17,.07,.50),L:W3(-.17,.07,.50)},pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15]}}}],
 [8.2,{tori:toriGuarda,uke:ukeGuarda}],
 [10.5,{}]],
 /* moldura no pescoço e no quadril de Uke; o joelho de Tori entra entre os dois; guarda fechada no fim */
 aperto:[{s:2.0,e:6.8,limbs:['T.L.arm','T.R.arm'],tol:.10,tudo:true},{s:5.2,e:7.4,limbs:['T.R.leg'],tol:.10,tudo:true},
  {s:0,e:3.0,limbs:['U.L.arm'],tol:.08,tudo:true},{s:7.8,e:10.5,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],
  uke:[F.uke.head[0],Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.head[2]]}),
 glow:{s:1.8,e:8.2,limbs:{'T.L.arm':'force','T.R.arm':'force','T.R.leg':'gold'}},
 stamp:{s:8.4,e:10.5,big:'Guarda',small:'FUGA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('cotovelo colado',T.armR.E,6,3,C.force,a);
  api.tag('Uke atravessado no peito',U.head,-6,-4,C.uke,a);
  a=win(t,1.7,3.5);
  api.tag('antebraço no pescoço',T.armL.H,-6,-3,C.force,a);
  api.tag('mão no quadril',T.armR.H,6,-3,C.force,a);
  a=win(t,3.5,4.7);
  api.arrow(T.hip,api.add(T.hip,[0,.2,.1]),C.force,a);
  api.tag('ponte curta',T.hip,5,3,C.force,a);
  a=win(t,4.7,6.5);
  api.arrow(T.hip,api.add(T.hip,[0,0,-.25]),C.force,a);
  api.tag('quadril para longe',T.hip,-6,4,C.force,a);
  api.tag('joelho entra no vão',T.legR.E,5,-4,C.gold,a);
  a=win(t,6.5,8.3);
  api.tag('pés para Uke',T.legL.H,6,3,C.force,a);
  a=win(t,8.4,10.5);
  api.tag('guarda fechada',T.legR.E,6,-3,C.force,a);}
});})();
