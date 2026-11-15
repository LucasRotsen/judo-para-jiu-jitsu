(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa ajoelhado na guarda, de frente para -x (direita de Uke = -z).
   Tori começa deitado de costas, cabeça para -x (yaw 180, pitch 90, roll 180 = de costas, direita = +z).
   A chave é no braço DIREITO de Uke: a perna ESQUERDA de Tori entra por dentro do braço (pela axila) e fecha por cima do ombro direito de Uke.
   Ao girar, o roll de Tori vai de 180 a 0 (deitado → de lado → sentado de frente para -x, ao lado do ombro de Uke). */
const ukeBase={x:.34,y:.40,z:0,yaw:180,pitch:35,roll:0,h:-20,
 leg:{R:W3(.57,.07,-.17),L:W3(.57,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)},
 pole:{armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:180,pitch:90,roll:180,h:30,
 leg:{R:B('o',-.26,.02,.02),L:B('o',-.26,.07,-.02)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* Mão direita de Uke presa no quadril de Tori (referencial de Tori sentado). */
const handOnHip=B('o',.04,.10,-.14);
const tapAt=W3(-.22,.06,.34),tapUp=W3(-.22,.17,.34);
Judo.register3d({
 id:'omoplata', name:'Omoplata', kanji:'', group:'ne', cls:'Jiu-jitsu · Chave de ombro',
 bjj:'Omoplata',
 why:'Chave de ombro com as pernas que nasce da guarda. Quando Uke defende o triângulo, a omoplata está a um giro de distância.',
 summary:'Chave de ombro com as pernas, a partir da guarda. Tori passa a perna por dentro do braço de Uke e por cima do ombro, gira para o lado, senta e leva o tronco à frente: o braço preso torce o ombro de Uke.',
 reading:[{k:'Omoplata',r:'omoplata',m:'escápula, em português'}],
 facts:[['Origem','Jiu-jitsu. No judô a mesma torção de ombro aparece como variação de ude-garami com as pernas (ashi-sankaku-garami).'],
  ['Qual perna passa','A do lado do braço atacado. Aqui o braço direito de Uke fica preso, então a perna esquerda de Tori entra por dentro desse braço, pela axila, e fecha por cima do ombro direito dele.'],
  ['Onde fica a mão de Uke','Presa na lateral do quadril de Tori, com o cotovelo dobrado. Se o braço esticar, a chave some.'],
  ['No jiu-jitsu','Ataque clássico da guarda, combinado com triângulo e chave de braço: o mesmo controle de punho abre os três.']],
 errors:[['Não controlar a cintura','Sem o braço por cima das costas, Uke rola para a frente e sai da posição.'],
  ['Deixar Uke de quatro','Com Uke de joelhos, ele tem base para rolar ou levantar. Tori achata Uke antes de finalizar.'],
  ['Torcer com os braços','A pressão vem do quadril indo para a frente e do tronco inclinando, não de puxar a mão de Uke.'],
  ['Ficar de costas no chão','Tori precisa sentar. Deitado, a perna não prende o ombro e a chave não aperta.']],
 safety:['O ombro é frágil: aplique devagar, centímetro por centímetro, e solte assim que o parceiro bater.',
  'O rolamento para a frente é a defesa natural da omoplata. No treino, deixe o parceiro rolar em vez de forçar a finalização.',
  'Pratique a posição sem a inclinação final até os dois dominarem a mecânica, e sempre com um professor por perto.'],
 phases:[
 {s:0,e:1.4,kanji:'組み手',ro:'Guarda fechada',pt:'Controle do punho',
  d:'Tori está de costas com a guarda fechada. A mão esquerda dele prende o punho direito de Uke, o braço que vai ser atacado.',
  l:['O ataque começa no punho, não no ombro.','Tori escolhe o braço: aqui, o direito de Uke.','A mão direita de Tori controla a gola ou o ombro do outro lado.']},
 {s:1.4,e:3.4,kanji:'崩し',ro:'Kuzushi',pt:'Quebrar a postura e criar ângulo',
  d:'Tori abre a guarda, apoia o pé direito no quadril de Uke e escapa o quadril para o lado. O braço direito de Uke fica no tatame, ao lado do quadril de Tori.',
  l:['Fuga de quadril: Tori deixa de estar reto embaixo de Uke.','O pé no quadril mantém a distância.','O braço atacado fica longe do corpo de Uke.']},
 {s:3.4,e:5.2,kanji:'入り',ro:'Entrada',pt:'Perna por dentro do braço',
  d:'Com o punho de Uke preso no quadril, Tori sobe o quadril e a perna esquerda entra por dentro do braço direito de Uke: a coxa sobe pela axila, a dobra do joelho encaixa em cima do ombro e a canela atravessa as costas. O braço de Uke fica enrolado na perna de Tori, e é daí que vem a chave.',
  l:['A perna que passa é a do lado do braço atacado.','A perna entra por dentro do braço, pela axila. Por fora não existe chave.','Uke começa a ser achatado contra o tatame.']},
 {s:5.2,e:7.4,kanji:'回転',ro:'Kaiten',pt:'Girar e sentar',
  d:'Tori gira de lado, leva o quadril para junto do ombro de Uke e senta, de frente para o mesmo lado que Uke. O braço direito de Uke fica dobrado entre as pernas de Tori, com a mão presa no quadril dele. O braço esquerdo de Tori passa por cima das costas de Uke.',
  l:['Tori senta: deitado, a chave não existe.','O braço por cima das costas impede o rolamento.','Uke fica achatado, de barriga para baixo.']},
 {s:7.4,e:11,kanji:'極め',ro:'Kime',pt:'Inclinar e finalizar',
  d:'Tori leva o quadril para a frente e inclina o tronco na direção dos próprios pés. A mão de Uke continua presa no quadril, então o cotovelo sobe e o ombro gira. Uke bate e Tori solta na hora.',
  l:['O quadril vai à frente; o tronco acompanha devagar.','A mão de Uke fica presa, o cotovelo sobe: é a torção do ombro.','Bateu, soltou. Sem exceção.']}],
 rep:[.7,2.6,4.6,6.6,8.8], cover:8.2,
 views:[
  {name:'Diagonal',a:25,e:48,center:[.12,.32,-.32],span:3.1,bias:{'T.L.leg':.6}},
  {name:'Pela cabeça',a:-75,e:22,center:[.25,.35,-.2],span:2.9},
  {name:'De cima',a:0,e:90,center:[.48,0,-.25],span:3.1,bias:{'T.L.leg':.6}}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 [1.9,{tori:{leg:{R:B('o',.02,.05,-.42)}}}],
 [2.4,{uke:{x:.40,y:.38,pitch:50,h:-5,arm:{R:W3(.10,.06,-.32)}},
       tori:{z:-.02,yaw:168,roll:172,leg:{R:B('o',.20,.10,-.22),L:B('o',.02,.12,.42)},arm:{L:SL('armR',.95),R:B('o',.18,.47,-.14)},pole:{legL:[1,.3,-.6]}}}],
 [3.4,{tori:{x:.03,z:-.08,yaw:145,roll:178,pitch:88,leg:{L:B('o',.18,.72,.34)},pole:{legL:[1,.3,-.3]}},uke:{pitch:55,arm:{R:handOnHip},pole:{armR:[-.3,.4,1]}}}],
 [3.9,{tori:{leg:{L:B('o',-.02,.74,.26)}}}],
 /* conferido com vídeo de referência: o punho de Uke fica preso no quadril de Tori; a coxa de Tori sobe pela axila
    (por dentro do braço), a dobra do joelho encaixa em cima do ombro e a canela atravessa as costas até o outro lado */
 [4.4,{tori:{x:.06,y:.30,z:-.16,yaw:118,roll:180,pitch:88,h:20,leg:{L:B('o',-.22,.50,-.16),R:B('o',.20,.10,-.22)},pole:{legL:[1,.2,0]}},
       uke:{x:.44,y:.39,pitch:66,h:-10,arm:{R:handOnHip},leg:{R:W3(.66,.07,-.17),L:W3(.66,.07,.17)},pole:{legR:[0,-1,.15],legL:[0,-1,-.15]}}}],
 [5.2,{}],
 [5.6,{tori:{x:.08,y:.15,z:-.24,yaw:96,roll:225,pitch:88,leg:{R:W3(-.22,.08,-.40)},pole:{legR:[.3,1,-.6]},arm:{L:B('o',.05,.52,.44)}},uke:{x:.48,y:.34,pitch:76,leg:{R:W3(.98,.07,-.17),L:W3(.98,.07,.17)},pole:{legR:[0,-1,.15],legL:[0,-1,-.15]}}}],
 [6.0,{tori:{x:.10,y:.16,z:-.32,yaw:100,roll:272,pitch:82,h:10,leg:{L:B('o',-.24,.42,0),R:W3(-.26,.08,-.52)},
        arm:{L:W3(.30,.14,-.24),R:W3(.36,.06,-.62)},pole:{legL:[.2,1,.4],legR:[.4,.3,-1],armR:[0,1,-.5],armL:[1,-.3,0]}},
       uke:{x:.52,y:.22,pitch:82,h:-20,leg:{R:W3(1.30,.07,-.16),L:W3(1.30,.07,.16)},arm:{R:handOnHip,L:W3(-.20,.06,.32)},pole:{armR:[-.3,.4,1],legR:[-1,0,.1],legL:[-1,0,-.1]}}}],
 [6.4,{uke:{arm:{R:handOnHip}},tori:{x:.12,y:.20,z:-.38,yaw:122,roll:325,pitch:58,leg:{L:B('o',-.26,.50,-.10),R:W3(-.36,.10,-.24)},
        arm:{L:W3(.36,.30,.08),R:W3(.26,.06,-.70)},pole:{armL:[0,1,0]}}}],
 [6.8,{tori:{x:.14,y:.16,z:-.43,yaw:152,roll:352,pitch:30,leg:{L:W3(-.42,.30,-.24),R:W3(-.52,.10,-.36)},pole:{legL:[0,1,.2]}}}],
 [7.2,{tori:{x:.15,y:.12,z:-.45,yaw:180,roll:360,pitch:12,h:5,leg:{L:W3(-.60,.09,-.04),R:W3(-.58,.18,-.18)},
        arm:{L:W3(.46,.24,.18),R:W3(.12,.06,-.78)},pole:{legL:[0,1,-.3],legR:[0,.6,1],armL:[0,1,.2],armR:[0,-.5,-1]}},
       uke:{x:.56,y:.14,pitch:88,h:-25,leg:{R:W3(1.42,.07,-.15),L:W3(1.42,.07,.15)}}}],
 [7.8,{}],
 [8.8,{tori:{x:.03,pitch:36,h:-5,arm:{L:W3(.40,.22,.16)}},uke:{pole:{armR:[.3,.5,-1]}}}],
 [9.0,{uke:{arm:{L:tapAt}}}],
 [9.25,{uke:{arm:{L:tapUp}}}],
 [9.5,{uke:{arm:{L:tapAt}}}],
 [9.75,{uke:{arm:{L:tapUp}}}],
 [10.0,{uke:{arm:{L:tapAt}}}],
 [11,{tori:{x:.16,pitch:6,h:10}}]],
 /* a coxa de Tori encaixa na axila e o braço de Uke fica enrolado nela, de propósito */
 aperto:[{s:3.2,e:11,limbs:['T.L.leg'],tol:.10,tudo:true},{s:3.2,e:11,limbs:['U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.30,F.tori.head[2]-.1],uke:[F.uke.hip[0]+.25,F.uke.hip[1]+.42,F.uke.hip[2]+.1]}),
 glow:{s:3.6,e:9.0,limbs:{'T.L.leg':'force','U.R.arm':'gold'}},
 stamp:{s:9.2,e:10.8,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('Tori prende o punho direito',T.armL.H,-7,3,C.force,a);
  api.tag('pernas cruzadas nas costas',T.legR.H,7,-3,C.force,a);
  a=win(t,1.6,3.6);
  api.tag('pé no quadril, fuga de quadril',T.legR.H,7,3,C.force,a);
  api.tag('braço atacado no tatame',U.armR.H,-7,3.4,C.info,a);
  a=win(t,3.6,5.4);
  api.tag('perna por dentro do braço, pela axila',T.legL.E,-6,-3.4,C.force,a);
  a=win(t,5.4,7.6);
  api.tag('braço por cima das costas: Uke não rola',T.armL.H,3,-3.6,C.force,a);
  api.tag('mão de Uke presa no quadril',U.armR.H,-5,4.2,C.gold,a);
  a=win(t,8.0,10.4);
  api.arrow(T.head,api.add(T.head,[-.24,-.1,0]),C.force,a);
  api.tag('quadril à frente, tronco inclina',api.add(T.head,[-.24,-.1,0]),2,3.4,C.force,a);
  api.tag('cotovelo sobe: o ombro gira',U.armR.E,8,3.4,C.gold,a);
  api.tag('pernas fechadas: tornozelos cruzados',T.legR.E,3,-4.2,C.force,win(t,7.2,8.1));}
});})();
