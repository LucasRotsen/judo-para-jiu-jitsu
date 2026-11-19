(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda até ficar de costas (yaw ~345).
   A mão direita de Tori segura a gola esquerda de Uke o tempo todo, com o cotovelo por baixo da axila
   esquerda dele. O quadril de Tori encosta na frente do quadril direito de Uke. A perna direita de Tori
   sobe DOBRADA, joelho para fora (lado +z), e a face externa da canela e da coxa se apoia na parte da
   frente e de dentro da perna direita de Uke; a "mola" levanta essa perna para cima e para fora enquanto
   o tronco gira. Uke roda por cima do quadril e da perna direitos de Tori e cai de costas à frente dele,
   com a cabeça perto do pé esquerdo de Tori. Poses conferidas com o vídeo da Kodokan (跳腰 / Hane-goshi). */
const uke0={x:-.27,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.14,.24,-.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.27,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.45)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'hane-goshi', name:'Hane Goshi', kanji:'跳腰',
 cls:'Nage-waza · Koshi-waza', group:'nage',
 bjj:'Hane goshi, o quadril com mola',
 why:'Funciona quando Uke está colado e alto, mas com a perna direita adiantada, o que é comum no jiu-jitsu em pé. Em três ângulos para ver a perna dobrada por dentro da perna de Uke e a mola que a levanta.',
 summary:'Projeção de quadril com a perna dobrada. Tori puxa Uke para frente e para cima, gira de costas e encosta o quadril na frente do quadril direito dele. A perna direita sobe dobrada, joelho para fora, com a face externa da canela e da coxa contra a parte de dentro da perna direita de Uke. Tori "salta" essa perna para cima e para fora enquanto gira o tronco, e Uke roda por cima do quadril e cai de costas à frente dele.',
 reading:[{k:'跳',r:'hane',m:'saltar, mola'},{k:'腰',r:'goshi',m:'quadril'}],
 facts:[['Grupo','Nage-waza (projeções) › Koshi-waza (técnicas de quadril)'],['Gokyo','3º grupo (Dai-sankyo)'],
  ['Direção do kuzushi','Para frente e para cima, levando Uke para a ponta dos pés, mais para o lado direito dele'],
  ['Diferença para o harai goshi','No harai goshi a perna de Tori vai esticada e varre a coxa de Uke por fora. No hane goshi ela vai dobrada, joelho para fora, por dentro da perna direita de Uke, e levanta essa perna com uma mola para cima e para o lado.'],
  ['No jiu-jitsu','Entra quando Uke avança a perna direita e fica colado. Uke cai de costas à frente de Tori, que mantém a manga e fica em pé para escolher a passagem ou o controle.']],
 errors:[['Perna esticada','Com a perna esticada vira um harai goshi mal feito. A perna sobe dobrada, joelho para fora, e a canela encosta na perna de Uke.'],
  ['Perna por fora','A face externa da perna de Tori trabalha por dentro da perna direita de Uke. Por fora não há o que levantar.'],
  ['Quadril longe','O quadril de Tori encosta na frente do quadril direito de Uke antes da mola. Longe, a perna só chuta o ar.'],
  ['Mola sem giro','A perna levanta e o tronco gira para a esquerda junto, com a puxada da manga. Só a perna, Uke cai sentado em cima de Tori.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Faça muitas entradas (uchikomi) antes de projetar.',
  'Tori mantém a manga presa até Uke tocar o tatame e não cai junto por cima dele.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.canelaR',b:'U.coxaR',s:4.5,e:5.0,txt:'a canela da perna dobrada de Tori levanta a coxa direita de Uke'},
  {c:'lado',a:'T.joelhoR',de:'T.quadril',lado:'direita',s:4.4,e:5.0,min:.15,txt:'a perna sobe dobrada, com o joelho para fora'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'frente',s:6.5,e:'fim',min:.6,txt:'Uke cai de costas à frente de Tori'},
  {c:'lado',a:'U.cabeca',de:'T.quadril',lado:'esquerda',s:7.0,e:'fim',min:.05,txt:'a cabeça de Uke cai perto do pé esquerdo de Tori'}],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola esquerda com a mão direita.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, alto, perto da clavícula.','Postura natural, joelhos destravados.']},
 {s:1,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Frente e para cima',
  d:'Tori puxa a manga para frente e para cima e avança o pé direito para a frente do pé direito de Uke. A mão direita segura a gola e levanta, com o cotovelo entrando por baixo da axila esquerda de Uke.',
  l:['A puxada leva Uke para a ponta dos pés.','Cotovelo direito por baixo da axila de Uke, levantando.','O passo do pé direito já prepara o giro.']},
 {s:2.6,e:4.4,kanji:'作り',ro:'Tsukuri',pt:'Giro e perna dobrada',
  d:'Tori gira para a esquerda sobre o pé direito, leva o pé esquerdo para trás, entre os pés de Uke, e fica de costas para ele, com o quadril encostado na frente do quadril direito de Uke. Apoiado na perna esquerda, Tori levanta a perna direita dobrada, joelho para fora, e encosta a face externa da canela e da coxa na parte de dentro da perna direita de Uke.',
  l:['Pé de apoio esquerdo entre os pés de Uke, joelho flexionado.','Perna direita dobrada, joelho para fora.','Face externa da canela contra a parte de dentro da perna direita de Uke.']},
 {s:4.4,e:6.2,kanji:'掛け',ro:'Kake',pt:'A mola',
  d:'Tori salta a perna direita para cima e para fora, levantando a perna direita de Uke, enquanto o tronco desce e gira para a esquerda e a mão esquerda puxa a manga. Uke perde os apoios, roda por cima do quadril e da perna de Tori e cai de costas à frente dele.',
  l:['A perna dobrada levanta a perna de Uke como uma mola.','Tronco gira para a esquerda junto com a mola.','Puxada da manga para baixo, rumo ao próprio quadril.']},
 {s:6.2,e:10,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas à frente de Tori, na diagonal, com a cabeça perto do pé esquerdo dele. Tori apoia a perna direita de volta no chão e fica de pé, curvado, segurando a manga com as duas mãos.',
  l:['Manga segura até o fim, puxada para cima.','Uke faz ukemi com o queixo no peito.','Tori fica de pé, sem cair junto.']}],
 rep:[.5,2.2,4.2,5.2,8.0], cover:4.4,
 views:[
  {name:'Lateral',a:15,e:12,center:[.15,.95,-.1],span:3.8},
  {name:'De frente para Tori',a:100,e:10,center:[.1,.9,-.1],span:3.8},
  {name:'De cima',a:0,e:90,center:[.4,0,-.5],span:3.7}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* kuzushi: passo do pé direito, puxada para frente e para cima; a mão direita fica na gola e o cotovelo entra por baixo da axila */
 [1.7,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)}},uke:{pitch:8}}],
 [2.1,{tori:{x:.14,yaw:200,pitch:4,leg:{R:W3(.06,.07,.04)},arm:{R:B('o',.14,.44,-.10)},pole:{armR:[-.2,-.9,.6]}},
       uke:{x:-.29,y:.96,pitch:12,h:8,arm:{R:B('o',.16,.58,-.10),L:B('s',.24,.20,-.32)},pole:{armR:[.4,-.6,.6],armL:[-.2,-.6,-.8]}}}],
 [2.6,{uke:{x:-.30,y:.97,pitch:14,h:10}}],
 /* tsukuri: giro para a esquerda sobre o pé direito; pé esquerdo entre os pés de Uke */
 [3.2,{tori:{x:.08,y:.88,z:.0,yaw:275,pitch:10,leg:{L:W3(.24,.14,.06)},arm:{R:B('o',.13,.36,-.11)},pole:{armR:[.2,-1,.3]}},
       uke:{arm:{R:B('o',.18,.54,-.14),L:B('s',.24,.20,-.32)},pole:{armR:[.2,-.4,1]}}}],
 [3.5,{tori:{x:.0,y:.86,yaw:310,pitch:14,leg:{L:W3(.06,.12,-.14)}}}],
 [3.8,{tori:{x:-.07,y:.84,z:.0,yaw:345,pitch:18,h:8,leg:{L:W3(-.10,.07,-.10),R:W3(-.04,.07,.12)},
        arm:{R:B('o',.14,.32,-.10),L:SL('armR',.5)},pole:{armR:[.4,-1,.2],armL:[.3,-.6,-.6]}},
       uke:{x:-.31,y:.97,pitch:22,h:14,arm:{R:B('o',.18,.48,-.10),L:B('o',-.20,.40,.12)},pole:{armL:[.2,-.5,-.6],armR:[0,.6,1]}}}],
 /* a perna direita sobe dobrada, joelho para fora: a face externa da canela encosta por dentro da perna direita de Uke */
 [4.15,{tori:{y:.83,leg:{R:B('s',-.08,-.56,.06)},pole:{legR:[.3,.1,1]}}}],
 [4.4,{tori:{yaw:348,pitch:22,leg:{R:B('s',-.12,-.52,.02)},pole:{legR:[.3,.2,1]}}}],
 [4.65,{tori:{pitch:30,leg:{R:B('s',-.20,-.42,.12)},pole:{legR:[.1,.5,1]}},uke:{y:1.0,pitch:30,leg:{R:B('s',.06,-.76,.28)}}}],
 /* kake: a mola levanta a perna de Uke para cima e para fora, o tronco desce e gira */
 [4.85,{tori:{y:.86,yaw:356,pitch:40,h:15,leg:{R:B('s',-.32,-.26,.28)},pole:{legR:[0,.6,1]},arm:{L:SL('armR',.55)}},
       uke:{x:-.24,y:1.06,z:.04,pitch:40,h:16,leg:{R:B('s',-.10,-.70,.36)},pole:{legR:[1,0,.3]}}}],
 [5.2,{tori:{y:.88,yaw:366,pitch:56,h:24,leg:{R:B('s',-.62,-.18,.24)},pole:{legR:[-.3,.3,1]}},
       uke:{x:-.20,y:1.14,z:.05,yaw:10,pitch:72,roll:-10,h:6,gf:0,leg:{R:B('s',-.30,-.72,.26),L:B('s',-.20,-.80,-.14)},
        arm:{R:B('o',.32,.40,-.30),L:B('s',.40,.40,-.20)},pole:{armR:[.5,.3,1]}}}],
 /* Uke passa por cima do quadril direito de Tori; a cabeça desce pelo lado esquerdo, à frente dele,
    deitado de lado (roll), nunca na vertical de ponta-cabeça; a manga puxada mantém a cabeça longe do chão. */
 [5.38,{tori:{arm:{R:B('o',.05,.44,-.06)}},uke:{x:-.06,y:1.12,z:-.08,yaw:30,pitch:105,roll:-28,h:-8,leg:{R:B('s',-.20,-.80,.16),L:B('s',-.12,-.84,-.12)}}}],
 [5.55,{tori:{y:.88,yaw:378,pitch:60,h:28,leg:{R:B('s',-.72,-.06,.22)},arm:{R:B('s',.15,.05,.36)},pole:{armR:[-.3,-.5,1]}},
       uke:{x:.10,y:1.0,z:-.30,yaw:34,pitch:132,roll:-50,h:10,leg:{R:B('s',-.05,-.84,.14),L:B('s',-.02,-.82,-.12)},
        arm:{R:B('o',.38,.24,-.24),L:B('s',.1,.25,-.45)}}}],
 /* Uke chega ao chão de costas: ombro e costas primeiro, cabeça recolhida, pernas por último */
 [5.66,{uke:{x:.40,y:.90,z:-.56,yaw:34,pitch:180,roll:-64,h:25}}],
 [5.80,{tori:{pitch:56},uke:{x:.64,y:.60,z:-.78,yaw:34,pitch:252,roll:-26,h:38,leg:{R:B('s',.45,-.66,.14),L:B('s',.40,-.68,-.13)},arm:{R:B('o',.42,.26,-.20)}}}],
 [5.92,{uke:{x:.70,y:.38,z:-.76,pitch:262,roll:-12,h:40}}],
 [6.05,{tori:{y:.86,yaw:384,pitch:54,h:25,leg:{R:B('s',-.64,-.30,.20)}},
       uke:{x:.72,y:.20,z:-.70,yaw:35,pitch:266,roll:-10,h:40,leg:{R:B('s',.38,-.72,.12),L:B('s',.32,-.74,-.14)},
        arm:{R:B('o',.42,.20,-.20),L:B('s',.05,.05,-.50)}}}],
 [6.18,{uke:{x:.72,y:.15,z:-.66,pitch:268,roll:-4,h:35}}],
 [6.3,{tori:{y:.84,yaw:386,pitch:56,h:22,leg:{R:W3(-.60,.62,.06)},arm:{R:SL('armR',.25)}},
       uke:{x:.72,y:.14,z:-.62,yaw:35,pitch:268,roll:0,h:25,gf:1,leg:{R:W3(1.40,.20,-.92),L:W3(1.24,.25,-1.16)},
        arm:{R:B('o',.38,.02,-.18),L:B('s',0,.15,-.48)}}}],
 /* zanshin: a perna direita volta ao chão; Tori de pé, curvado, as duas mãos na manga */
 [6.8,{tori:{y:.84,pitch:50,h:15,leg:{R:W3(-.24,.40,.18)},pole:{legR:[1,-.2,.15]}},
       uke:{leg:{R:W3(1.40,.07,-.94),L:W3(1.26,.07,-1.18)}}}],
 [7.3,{tori:{y:.84,pitch:46,h:10,leg:{R:W3(-.04,.07,.22)}},uke:{h:-15}}],
 [10,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.30,F.tori.head[2]+.30],uke:[F.uke.hip[0],Math.max(F.uke.head[1],F.uke.hip[1])+.30,F.uke.hip[2]-.38]}),
 glow:{s:3.8,e:5.8,limbs:{'T.R.leg':'force','U.R.leg':'gold'}},
 stamp:{s:6.35,e:8.6,big:'一本',small:'IPPON'},
 aperto:[{s:4.0,e:5.4,limbs:['T.R.leg'],tol:.10,tudo:true},{s:2.0,e:5.3,limbs:['T.R.arm'],tol:.10},{s:3.0,e:5.0,limbs:['U.L.arm'],tol:.10}],
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.26,.28,0]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.26,.28,0]),-9,1,C.force,a);}
  a=win(t,2.2,4.0);
  api.tag('cotovelo por baixo da axila',T.armR.E,3,-3,C.force,a);
  a=win(t,4.0,4.8);
  api.tag('perna dobrada, joelho para fora',T.legR.E,6,1,C.gold,a);
  a=win(t,4.7,5.5);
  api.tag('mola: para cima e para fora',T.legR.H,2,4,C.force,a);
  a=win(t,6.5,8.6);
  api.tag('manga segura até o fim',T.armL.H,5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-6,-2.5,C.uke,a);}
});})();
