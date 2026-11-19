(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda até ficar de costas (yaw ~350).
   A mão direita de Tori passa por baixo da axila esquerda de Uke e segura as costas dele, na altura da
   escápula. O quadril de Tori encaixa na frente do quadril de Uke, deslocado para a direita, e a perna
   direita de Tori, esticada, varre a face externa da frente da coxa direita de Uke (lado +z).
   Uke roda por cima do quadril e da coxa direitos de Tori e cai de costas à frente dele, na diagonal
   para o lado esquerdo de Tori (-z), com a cabeça perto do pé esquerdo de Tori. Poses conferidas com o
   vídeo da Kodokan (払腰 / Harai-goshi). */
const uke0={x:-.27,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.14,.24,-.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.27,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.45)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'harai-goshi', name:'Harai Goshi', kanji:'払腰',
 cls:'Nage-waza · Koshi-waza', group:'nage',
 bjj:'Harai goshi, o quadril com a perna que varre',
 why:'Junta o encaixe de quadril do o goshi com uma perna que varre, e entra bem quando Uke chega perto e alto, comum no jiu-jitsu em pé. Em três ângulos para ver a mão nas costas e a perna varrendo a coxa.',
 summary:'Projeção de quadril com varrida. Tori puxa Uke para frente e para cima, passa a mão direita por baixo da axila esquerda dele até as costas e gira de costas, com o quadril encaixado à frente do quadril de Uke. Apoiado na perna esquerda, Tori varre para trás e para cima a coxa direita de Uke com a perna direita esticada. Uke roda por cima do quadril e da coxa de Tori e cai de costas à frente dele.',
 reading:[{k:'払',r:'harai',m:'varrer'},{k:'腰',r:'goshi',m:'quadril'}],
 facts:[['Grupo','Nage-waza (projeções) › Koshi-waza (técnicas de quadril)'],['Gokyo','2º grupo (Dai-nikyo)'],
  ['Direção do kuzushi','Para frente e para cima, levando Uke para a ponta dos pés, mais para o lado direito dele'],
  ['Diferença para o uchi mata','No uchi mata a perna de Tori entra entre as pernas de Uke e levanta a coxa por dentro. No harai goshi a perna fica do lado de fora e varre a frente da coxa direita de Uke.'],
  ['No jiu-jitsu','Funciona quando Uke fica alto e colado, com a mão de Tori nas costas dele. Uke cai de costas à frente de Tori, que mantém a manga e já está em pé para escolher a passagem ou o controle.']],
 errors:[['Quadril sem encaixe','Se o quadril de Tori fica longe, a perna varre o ar. O quadril encosta na frente do quadril de Uke antes de a perna sair.'],
  ['Varrer com a perna dobrada','A perna que varre vai esticada, com a parte de trás da coxa contra a frente da coxa de Uke. Dobrada, ela só empurra o joelho.'],
  ['Mão direita solta','A mão nas costas cola o peito de Uke nas costas de Tori. Sem ela, Uke fica para trás e a varrida não tem o que levantar.'],
  ['Parar o giro','A varrida e o giro para a esquerda acontecem juntos. Sem o giro do tronco e a puxada da manga, Uke cai sentado em cima de Tori.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Faça muitas entradas (uchikomi) antes de projetar.',
  'Tori mantém a manga presa até Uke tocar o tatame e não cai junto por cima dele.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.peR',de:'U.quadril',lado:'direita',s:4.6,e:5.2,txt:'a perna direita de Tori varre pelo lado de fora da coxa direita de Uke'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'frente',s:6.5,e:'fim',min:.6,txt:'Uke roda por cima do quadril e cai de costas à frente de Tori'},
  {c:'lado',a:'U.cabeca',de:'T.quadril',lado:'esquerda',s:7.0,e:'fim',min:.05,txt:'a cabeça de Uke cai perto do pé esquerdo de Tori'}],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola esquerda com a mão direita.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, pronta para ir às costas.','Postura natural, joelhos destravados.']},
 {s:1,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Frente e para cima',
  d:'Tori puxa a manga para frente e para cima e avança o pé direito para a frente do pé direito de Uke. A mão direita solta a gola e passa por baixo da axila esquerda de Uke até as costas dele, na altura da escápula.',
  l:['A puxada leva Uke para a ponta dos pés.','A mão direita passa por baixo da axila esquerda e segura as costas.','O passo do pé direito já prepara o giro.']},
 {s:2.6,e:4.4,kanji:'作り',ro:'Tsukuri',pt:'Giro e encaixe',
  d:'Tori gira para a esquerda sobre o pé direito, leva o pé esquerdo para trás, entre os pés de Uke, e fica de costas para ele. O quadril encosta na frente do quadril de Uke, deslocado para a direita. A mão nas costas cola o peito de Uke nas costas de Tori, e a perna direita, esticada, se apoia do lado de fora da perna direita de Uke.',
  l:['Pé de apoio esquerdo entre os pés de Uke, joelho flexionado.','Mão direita nas costas de Uke: peito dele colado nas costas de Tori.','Perna direita esticada, do lado de fora da coxa direita de Uke.']},
 {s:4.4,e:6.2,kanji:'掛け',ro:'Kake',pt:'A varrida',
  d:'Apoiado na perna esquerda, Tori varre a coxa direita de Uke para trás e para cima com a parte de trás da perna direita esticada. Ao mesmo tempo o tronco desce e gira para a esquerda, e a mão esquerda puxa a manga. Uke perde os apoios, roda por cima do quadril e da coxa de Tori e cai de costas à frente dele.',
  l:['A parte de trás da coxa de Tori varre a frente da coxa de Uke.','Perna que varre esticada; perna de apoio estende na hora da varrida.','Giro do tronco e puxada da manga junto com a varrida.']},
 {s:6.2,e:10,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas à frente de Tori, na diagonal, com a cabeça perto do pé esquerdo dele. Tori apoia a perna direita de volta no chão e fica de pé, curvado, segurando a manga com as duas mãos.',
  l:['Manga segura até o fim, puxada para cima.','Uke faz ukemi com o queixo no peito.','Tori fica de pé, sem cair junto.']}],
 rep:[.5,2.2,3.9,5.3,8.0], cover:5.3,
 views:[
  {name:'Lateral',a:15,e:12,center:[.15,.95,-.1],span:3.8},
  {name:'Por trás de Uke',a:-100,e:12,center:[.1,.95,-.1],span:3.8},
  {name:'De cima',a:0,e:90,center:[.4,0,-.5],span:3.7}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* kuzushi: passo do pé direito, puxada para frente e para cima; a mão direita vai para as costas por baixo da axila */
 [1.7,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)}},uke:{pitch:8}}],
 [2.1,{tori:{x:.14,yaw:200,pitch:4,leg:{R:W3(.06,.07,.04)},arm:{R:B('o',.14,.26,-.28)},pole:{armR:[-.3,-.7,.8]}},
       uke:{x:-.29,y:.96,pitch:12,h:8,arm:{R:B('o',.16,.58,-.10),L:B('s',.24,.20,-.32)},pole:{armR:[.4,-.6,.6],armL:[-.2,-.6,-.8]}}}],
 [2.6,{tori:{arm:{R:B('o',-.10,.40,-.12)},pole:{armR:[-.3,-.8,.6]}},uke:{x:-.30,y:.97,pitch:14,h:10}}],
 /* tsukuri: giro para a esquerda sobre o pé direito; pé esquerdo entre os pés de Uke */
 [3.2,{tori:{x:.08,y:.88,z:.02,yaw:275,pitch:10,leg:{L:W3(.24,.14,.06)},arm:{R:B('o',-.12,.40,-.10)},pole:{armR:[-.2,-.8,-.6]}},
       uke:{arm:{R:B('o',.18,.54,-.14),L:B('s',.24,.20,-.32)},pole:{armR:[.2,-.4,1]}}}],
 [3.5,{tori:{x:.0,y:.86,yaw:315,pitch:15,leg:{L:W3(.06,.12,-.16)}}}],
 [3.8,{tori:{x:-.07,y:.84,z:.04,yaw:350,pitch:20,h:8,leg:{L:W3(-.12,.07,-.06),R:W3(-.02,.07,.16)},
        arm:{R:B('o',-.13,.40,-.08),L:SL('armR',.5)},pole:{armR:[-.2,-.8,-.8],armL:[.3,-.6,-.6]}},
       uke:{x:-.31,y:.97,pitch:22,h:14,arm:{R:B('o',.18,.48,-.10),L:B('o',-.20,.40,.12)},pole:{armL:[.2,-.5,-.6],armR:[0,.6,1]}}}],
 /* a perna direita sai esticada para fora da perna direita de Uke */
 [4.4,{tori:{yaw:352,pitch:24,leg:{R:W3(-.30,.16,.32)},pole:{legR:[1,-.2,.2]}}}],
 /* kake: a perna varre para trás e para cima, o tronco desce e gira; Uke perde os apoios */
 [4.85,{tori:{y:.86,yaw:358,pitch:42,h:15,leg:{R:W3(-.62,.52,.28)},arm:{L:SL('armR',.55)}},
       uke:{x:-.24,y:1.06,z:.04,pitch:40,h:16,leg:{R:B('s',-.26,-.80,.20)},pole:{legR:[1,0,.3]}}}],
 [5.2,{tori:{y:.88,yaw:366,pitch:56,h:24,leg:{R:W3(-.78,.98,.22)}},
       uke:{x:-.20,y:1.14,z:.05,yaw:10,pitch:72,roll:-10,h:6,gf:0,leg:{R:B('s',-.36,-.72,.20),L:B('s',-.20,-.80,-.14)},
        arm:{R:B('o',.32,.40,-.30),L:B('s',.40,.40,-.20)},pole:{armR:[.5,.3,1]}}}],
 /* Uke passa por cima do quadril direito de Tori; a cabeça desce pelo lado esquerdo, à frente dele.
    Roda deitado, com o quadril baixo e o corpo inclinado de lado (roll), nunca na vertical de ponta-cabeça;
    a manga puxada para cima mantém a cabeça longe do chão e o primeiro contato é o ombro e as costas. */
 [5.38,{tori:{arm:{R:B('o',-.16,.44,-.02)}},uke:{x:-.06,y:1.12,z:-.08,yaw:30,pitch:105,roll:-28,h:-8,leg:{R:B('s',-.20,-.80,.16),L:B('s',-.12,-.84,-.12)}}}],
 [5.55,{tori:{y:.88,yaw:378,pitch:60,h:28,leg:{R:W3(-.80,1.10,.12)},arm:{R:B('s',.15,.05,.36)},pole:{armR:[-.3,-.5,1]}},
       uke:{x:.10,y:1.0,z:-.30,yaw:34,pitch:132,roll:-50,h:10,leg:{R:B('s',-.05,-.84,.14),L:B('s',-.02,-.82,-.12)},
        arm:{R:B('o',.38,.24,-.24),L:B('s',.1,.25,-.45)}}}],
 /* Uke chega ao chão de costas: ombro e costas primeiro, cabeça recolhida e acima do tatame, pernas por último */
 [5.66,{uke:{x:.40,y:.90,z:-.56,yaw:34,pitch:180,roll:-64,h:25}}],
 [5.80,{tori:{pitch:56},uke:{x:.64,y:.60,z:-.78,yaw:34,pitch:252,roll:-26,h:38,leg:{R:B('s',.45,-.66,.14),L:B('s',.40,-.68,-.13)},arm:{R:B('o',.42,.26,-.20)}}}],
 [5.92,{uke:{x:.70,y:.38,z:-.76,pitch:262,roll:-12,h:40}}],
 [6.05,{tori:{y:.86,yaw:384,pitch:54,h:25,leg:{R:W3(-.76,.98,.08)}},
       uke:{x:.72,y:.20,z:-.70,yaw:35,pitch:266,roll:-10,h:40,leg:{R:B('s',.38,-.72,.12),L:B('s',.32,-.74,-.14)},
        arm:{R:B('o',.42,.20,-.20),L:B('s',.05,.05,-.50)}}}],
 [6.18,{uke:{x:.72,y:.15,z:-.66,pitch:268,roll:-4,h:35}}],
 [6.3,{tori:{y:.84,yaw:386,pitch:56,h:22,leg:{R:W3(-.60,.70,.06)},arm:{R:SL('armR',.25)}},
       uke:{x:.72,y:.14,z:-.62,yaw:35,pitch:268,roll:0,h:25,gf:1,leg:{R:W3(1.40,.20,-.92),L:W3(1.24,.25,-1.16)},
        arm:{R:B('o',.38,.02,-.18),L:B('s',0,.15,-.48)}}}],
 /* zanshin: a perna direita volta ao chão depois que Uke assenta; Tori de pé, curvado, as duas mãos na manga */
 [6.8,{tori:{y:.84,pitch:50,h:15,leg:{R:W3(-.24,.40,.18)},pole:{legR:[1,-.2,.15]}},
       uke:{leg:{R:W3(1.40,.07,-.94),L:W3(1.26,.07,-1.18)}}}],
 [7.3,{tori:{y:.84,pitch:46,h:10,leg:{R:W3(-.04,.07,.22)}},uke:{h:-15}}],
 [10,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.30,F.tori.head[2]+.30],uke:[F.uke.hip[0],Math.max(F.uke.head[1],F.uke.hip[1])+.30,F.uke.hip[2]-.38]}),
 glow:{s:3.6,e:6.0,limbs:{'T.R.leg':'force','U.R.leg':'gold'}},
 stamp:{s:6.35,e:8.6,big:'一本',small:'IPPON'},
 aperto:[{s:3.8,e:5.6,limbs:['T.R.leg'],tol:.10,tudo:true},{s:2.6,e:5.4,limbs:['T.R.arm'],tol:.10},{s:3.0,e:5.0,limbs:['U.L.arm'],tol:.10}],
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.26,.28,0]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.26,.28,0]),-9,1,C.force,a);}
  a=win(t,2.2,4.6);
  api.tag('mão nas costas, por baixo da axila',T.armR.H,3,-3,C.force,a);
  a=win(t,3.9,4.8);
  api.tag('perna esticada por fora da coxa direita',T.legR.H,6,1,C.gold,a);
  a=win(t,4.7,5.6);
  api.tag('varre a coxa para trás e para cima',T.legR.E,2,4,C.force,a);
  a=win(t,6.5,8.6);
  api.tag('manga segura até o fim',T.armL.H,5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-6,-2.5,C.uke,a);}
});})();
