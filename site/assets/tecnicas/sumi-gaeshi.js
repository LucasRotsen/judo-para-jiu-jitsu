(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z). Pegada direita: mão direita de Tori na gola esquerda
   de Uke, mão esquerda na manga direita; Uke segura igual. Tori põe o pé esquerdo entre os pés de Uke, senta junto ao
   próprio calcanhar e deita de costas com a cabeça para +x. O PEITO do pé direito de Tori entra entre as pernas de Uke
   e engancha por dentro da coxa esquerda dele. Uke sobe no gancho, passa invertido pelo lado ESQUERDO da cabeça de
   Tori (+z: canto frontal direito de Uke), queixo no peito, e cai de costas cabeça com cabeça, levemente na diagonal.
   Conferido com o vídeo da Kodokan 隅返 / Sumi-gaeshi (5VhduA5xkbA). */
const hook=SL('legL',-.40);
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:6,h:0,
 leg:{R:W3(-.28,.07,.15),L:W3(-.38,.07,-.15)},
 arm:{R:B('o',.14,.38,-.08),L:B('o',.24,.22,.22)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:2,h:0,
 leg:{R:W3(.30,.07,-.14),L:W3(.38,.07,.14)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.35)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
Judo.register3d({
 id:'sumi-gaeshi', name:'Sumi Gaeshi', kanji:'隅返',
 cls:'Nage-waza · Ma-sutemi-waza', group:'nage',
 bjj:'Sacrifício com gancho por dentro da coxa',
 why:'É o gancho da guarda borboleta usado de pé: Tori senta embaixo de Uke, encaixa o peito do pé por dentro da coxa e o leva por cima. Se Uke não cai, Tori já está sentado com o gancho no lugar.',
 summary:'Projeção de sacrifício para trás. Tori puxa Uke para frente, põe o pé esquerdo entre os pés dele e senta bem perto, junto ao próprio calcanhar. Ao deitar de costas, encaixa o peito do pé direito por dentro da coxa esquerda de Uke e levanta. Uke passa por cima de Tori, para o canto da frente à direita dele, e cai de costas.',
 reading:[{k:'隅',r:'sumi',m:'canto'},{k:'返',r:'gaeshi',m:'virar, reverter'}],
 facts:[['Grupo','Nage-waza › Sutemi-waza › Ma-sutemi-waza (sacrifício de costas)'],
  ['Gokyo','4º grupo (Dai-yonkyo)'],
  ['Direção do kuzushi','Para frente e para o canto da frente à direita de Uke'],
  ['Diferença para o tomoe nage','No tomoe nage a sola do pé empurra a barriga. No sumi gaeshi o peito do pé engancha por dentro da coxa e levanta a perna de Uke.'],
  ['No jiu-jitsu','O gancho é o mesmo da guarda borboleta. Contra quem chega curvado e pesado para frente, Tori senta, engancha e raspa, ou termina sentado na guarda se Uke defender.']],
 errors:[['Sentar longe','O quadril de Tori tem que cair junto ao calcanhar, embaixo de Uke. Longe, o pé não alcança a coxa e vira só uma puxada para a guarda.'],
  ['Pé na barriga','Aqui o pé não empurra a faixa. O peito do pé encaixa por dentro da coxa, perto do joelho, e levanta.'],
  ['Braços parados','Sem puxar as golas para cima da própria cabeça, Uke cai em cima de Tori em vez de passar por cima.'],
  ['Uke ereto','Contra um Uke de tronco reto e peso para trás não há o que levantar. A técnica nasce de Uke curvado para frente.']],
 safety:['Uke precisa dominar o rolamento para frente (zempo kaiten ukemi) antes de receber sumi gaeshi.',
  'Uke rola por cima do ombro e cai de costas, nunca de cabeça: queixo no peito o tempo todo.',
  'Comece devagar, com Tori só sentando e encaixando o gancho, sem levantar.'],
 /* contratos (tools/contratos.js): exceção declarada à regra de queda de cabeça, com o motivo */
 contratos:[{c:'pilao',cabeca:.38,txt:'sumi gaeshi: Uke passa invertido por cima de Tori, levantado pelo peito do pé na coxa; a cabeça fica a ~40 cm do tatame e ele cai de costas'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'acima',s:5.8,e:6.8,min:.4,txt:'Uke passa por cima de Tori e cai além da cabeça dele'}],
 phases:[
 {s:0,e:1.3,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada direita: Tori segura a gola esquerda de Uke com a mão direita e a manga direita com a esquerda. Uke segura igual, com os braços mais esticados e o tronco um pouco à frente.',
  l:['Mão direita alta, na gola.','Mão esquerda na manga, perto do cotovelo.','Uke curvado para frente é a deixa para a técnica.']},
 {s:1.3,e:2.8,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa Uke para frente e dá um passo com o pé esquerdo, fundo, entre os pés de Uke. Os joelhos dobram e o quadril começa a descer.',
  l:['O pé esquerdo entra entre os pés de Uke.','A puxada leva o peso de Uke para a ponta dos pés.','Tori desce o quadril sem soltar a pegada.']},
 {s:2.8,e:4.2,kanji:'作り',ro:'Tsukuri',pt:'Sentar e enganchar',
  d:'Tori senta bem perto, junto ao calcanhar esquerdo, e começa a deitar de costas. O pé direito entra entre as pernas de Uke e o peito do pé encaixa por dentro da coxa esquerda dele, perto do joelho.',
  l:['O quadril cai embaixo de Uke, não longe dele.','Peito do pé por dentro da coxa esquerda.','Os braços seguram Uke curvado sobre Tori.']},
 {s:4.2,e:6.0,kanji:'掛け',ro:'Kake',pt:'Levantar e projetar',
  d:'Tori deita de costas, puxa as golas por cima da própria cabeça e levanta a perna direita. Uke sobe no gancho, passa invertido pelo lado esquerdo da cabeça de Tori e rola sobre o ombro.',
  l:['O gancho levanta, não chuta.','Os braços puxam para cima da cabeça de Tori.','Uke passa na diagonal, para o canto da frente à direita dele.']},
 {s:6.0,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Queda e controle',
  d:'Uke cai de costas, cabeça perto da cabeça de Tori, e bate o braço esquerdo no tatame. Tori continua deitado, com a perna direita no alto, e mantém a pegada na manga.',
  l:['Uke cai de costas com o queixo no peito.','A manga segura controla a queda.','Os dois terminam deitados, cabeça com cabeça.']}],
 rep:[.6,2.2,3.7,5.1,7.5], cover:5.1,
 views:[
  {name:'Lateral',a:8,e:10,center:[.65,.75,.15],span:4.4},
  {name:'Por trás de Uke',a:-70,e:22,center:[.55,.6,.15],span:3.9},
  {name:'De cima',a:0,e:88,center:[.7,0,.2],span:3.6}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.3,{}],
 /* kuzushi: puxa para frente; o pé esquerdo de Tori entra fundo entre os pés de Uke */
 [2.0,{tori:{x:.22,y:.88,pitch:4,leg:{L:W3(.04,.07,.10)}},
       uke:{x:-.30,pitch:14,h:4,leg:{R:W3(-.28,.07,.20),L:W3(-.38,.07,-.20)}}}],
 [2.8,{tori:{x:.10,y:.68,pitch:8,h:5,leg:{L:W3(-.15,.07,.02)},pole:{legL:[1,.3,-.4],legR:[1,.4,0],armR:[-.2,-.6,1]}},
       uke:{x:-.30,y:.90,pitch:24,h:8}}],
 /* tsukuri: senta junto ao calcanhar esquerdo; o pé direito entra entre as pernas de Uke e engancha a coxa esquerda */
 [3.5,{tori:{x:.26,y:.30,pitch:-22,h:20,leg:{R:hook,L:W3(-.17,.07,.06)},pole:{legR:[1,.4,.3],legL:[1,.6,-.4]}},
       uke:{x:-.28,y:.87,pitch:40,h:12}}],
 [4.2,{tori:{x:.28,y:.17,pitch:-58,h:25,pole:{armR:[0,-.4,1]}},
       uke:{x:-.18,y:.88,pitch:55,h:15}}],
 /* kake: Tori deita; o gancho levanta a coxa esquerda; Uke sobe por cima, queixo no peito */
 [4.7,{tori:{x:.28,y:.13,pitch:-88,h:22,leg:{L:W3(-.32,.07,.14)}},
       uke:{x:.04,y:1.02,z:.08,yaw:-5,pitch:100,roll:-4,h:28,gf:0,
        leg:{R:W3(-.50,.22,.22),L:W3(-.36,.52,-.16)},pole:{legR:[1,0,.2],legL:[1,0,-.2]}}}],
 /* invertido, quadril sobre a cabeça de Tori, a cabeça de Uke desce pelo lado esquerdo dela (+z) */
 [5.1,{tori:{leg:{R:W3(.16,.82,-.12)},pole:{legR:[1,1,0]}},
       uke:{x:.56,y:1.10,z:.32,yaw:-10,pitch:170,roll:-12,h:32,
        leg:{R:B('s',.10,-.82,.16),L:B('s',.18,-.80,-.14)},pole:{legR:[1,0,.2],legL:[1,0,-.2],armR:[0,-.3,1]}}}],
 /* rola sobre o ombro direito: os ombros descem antes da cabeça, queixo no peito */
 [5.3,{uke:{x:.87,y:1.10,z:.40,yaw:-13,pitch:214,roll:-10,h:34,
        leg:{R:B('s',.22,-.80,.16),L:B('s',.28,-.78,-.14)}}}],
 [5.55,{tori:{arm:{R:W3(.77,.40,-.40)},pole:{armR:[0,-.3,1]}},
       uke:{x:1.22,y:.62,z:.43,yaw:-15,pitch:258,roll:-6,h:34,
        leg:{R:B('s',.32,-.76,.16),L:B('s',.36,-.74,-.14)}}}],
 [5.8,{uke:{x:1.50,y:.24,z:.45,yaw:-16,pitch:265,roll:-2,h:32}}],
 /* queda: de costas, cabeça perto da cabeça de Tori, na diagonal para +z */
 [6.0,{tori:{leg:{R:W3(.14,.86,-.12)},arm:{R:W3(.77,.06,-.38)},pole:{armR:[0,-.3,1],armL:[.2,.4,-1]}},
       uke:{x:1.60,y:.13,z:.45,yaw:-17,pitch:270,roll:0,h:30,gf:1,
        leg:{R:W3(2.35,.07,.78),L:W3(2.40,.07,.48)},
        arm:{L:W3(1.70,.30,.0),R:W3(.85,.08,.62)},pole:{legR:[1,.6,.3],legL:[1,.6,-.3],armL:[0,0,-1],armR:[0,-.3,1]}}}],
 [6.3,{uke:{arm:{L:W3(1.77,.05,-.05)}}}],
 [7.5,{tori:{leg:{R:W3(.10,.80,-.12)}},uke:{h:20}}],
 [10.5,{}]],
 /* o gancho encosta na coxa de Uke de propósito; as pegadas seguram a roupa */
 aperto:[{s:3.2,e:5.2,limbs:['T.R.leg'],tol:.10,tudo:true},
  {s:0,e:6.2,limbs:['T.R.arm','T.L.arm','U.R.arm','U.L.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.30,F.tori.head[2]-.2],
  uke:[F.uke.hip[0]+.1,Math.max(F.uke.head[1],F.uke.hip[1])+.32,F.uke.hip[2]+.1]}),
 glow:{s:3.0,e:5.4,limbs:{'T.R.leg':'force'}},
 stamp:{s:6.0,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('gola',T.armR.H,-4,-4.5,C.force,a);
  api.tag('manga',T.armL.H,5,-3,C.force,a);
  a=win(t,1.3,2.9);
  {const ch=api.bp(U,.15,.42,0);api.arrow(ch,api.add(ch,[.32,-.08,0]),C.force,a);
   api.tag('puxa Uke para frente',api.add(ch,[.32,-.08,0]),4,-2.4,C.force,a,false);}
  api.tag('pé esquerdo entre os pés de Uke',T.legL.H,3,3,C.force,win(t,1.9,3.0));
  a=win(t,2.9,4.4);
  api.tag('senta junto ao calcanhar',T.hip,4,4,C.force,a);
  api.tag('peito do pé por dentro da coxa',T.legR.H,2,-6,C.force,a);
  a=win(t,4.3,5.7);
  api.tag('o gancho levanta',T.legR.E,4,4.5,C.force,a);
  api.tag('queixo no peito',U.head,5,-2,C.uke,win(t,4.6,5.9));
  a=win(t,6.0,99);
  api.tag('Uke cai de costas, cabeça com cabeça',U.hip,0,-7,C.uke,a);
  api.tag('ukemi: braço bate no tatame',U.armL.H,-7,3.5,C.uke,a);}
});})();
