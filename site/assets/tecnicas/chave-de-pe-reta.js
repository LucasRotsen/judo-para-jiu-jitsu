(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori começa em pé na guarda aberta, de frente para a cabeça de Uke (yaw 180): direita de Tori = -z.
   A perna atacada é a DIREITA de Uke (lado +z). O braço ESQUERDO de Tori abraça o tornozelo e o pé fica
   na axila esquerda. Perna de fora = esquerda de Tori, pé no quadril direito de Uke; perna de dentro =
   direita de Tori, entre as pernas de Uke, pé na barriga. Tori deita sobre o lado esquerdo (o da perna de fora),
   de frente para +z, e Uke rola um pouco para o lado da perna presa. Conferido com o vídeo XQfj3a4FaCo. */
const ukeBase={x:0,y:.14,z:0,yaw:0,pitch:-90,h:-10,gf:0,
 leg:{R:B('o',.13,-.02,-.13),L:B('o',.13,-.02,.13)},
 arm:{R:B('s',.25,.40,.16),L:B('s',.25,.40,-.16)},
 pole:{legR:[.2,1,.5],legL:[.2,1,-.5],armR:[.3,-.6,.6],armL:[.3,-.6,-.6]}};
const toriBase={x:.60,y:.82,z:0,yaw:180,pitch:26,h:-15,gf:0,
 leg:{R:W3(.88,.04,-.24),L:W3(.88,.04,.24)},
 arm:{R:SL('legL',.30),L:SL('legR',.30)},
 pole:{legR:[1,-.3,.2],legL:[1,-.3,-.2],armR:[.4,-.8,.4],armL:[.4,-.8,-.4]}};
const tapAt=W3(-.12,.04,-.40),tapUp=W3(-.12,.20,-.40);
const taps=[8.0,8.25,8.5,8.75,9.0].map((t,i)=>[t,{uke:{arm:{L:i%2?tapUp:tapAt},pole:{armL:[0,-.3,-1]}}}]);
Judo.register3d({
 id:'chave-de-pe-reta', name:'Chave de pé reta', kanji:'', group:'ne', cls:'Jiu-jitsu · Chave de pé',
 bjj:'Straight ankle lock (botinha)',
 why:'A primeira chave de pé que se aprende no jiu-jitsu, permitida desde a faixa branca. Sai da guarda aberta quando Uke deixa um pé solto.',
 summary:'Chave no tornozelo a partir da guarda aberta. Tori prende o pé de Uke debaixo da axila, encaixa o antebraço atrás do calcanhar, senta com o pé de fora no quadril de Uke e os joelhos fechados na coxa, e deita de lado arqueando as costas.',
 reading:[{k:'Botinha',r:'botinha',m:'apelido brasileiro da chave de pé reta'}],
 facts:[['Origem','Jiu-jitsu. No judô as chaves de pé são proibidas; só o cotovelo pode ser atacado.'],
  ['Onde dói','A pressão estica o pé para baixo e força o tornozelo e o tendão de Aquiles. Com a técnica certa, a perna de Uke fica reta e o joelho não torce.'],
  ['Onde o antebraço encaixa','A lâmina do antebraço, o lado do osso do rádio, fica atrás do tornozelo, logo acima do calcanhar. Na panturrilha a chave não aperta.'],
  ['Regras (IBJJF)','Permitida em todas as faixas, desde que Tori não cruze a perna de fora por cima da coxa de Uke. O pé de fora fica no quadril.']],
 errors:[['Antebraço na panturrilha','Muito alto, o braço só aperta músculo. O osso do antebraço desce até atrás do calcanhar.'],
  ['Joelhos abertos','Com espaço entre as coxas, Uke gira o joelho, tira o calcanhar do braço e escapa. Os joelhos fecham na coxa dele.'],
  ['Pé de fora solto','Sem o pé no quadril de Uke, ele senta e se aproxima, e a perna dobra. O pé no quadril mantém a perna dele reta.'],
  ['Cruzar a perna de fora','Passar a perna de fora por cima da coxa, para dentro, torce o joelho de Uke e é ilegal em várias faixas. O pé fica no quadril.']],
 safety:['A chave de pé machuca rápido e o tornozelo avisa pouco: aplique devagar e solte assim que o parceiro bater.',
  'Nunca gire o corpo de forma explosiva com o pé preso. A pressão vem do quadril estendendo aos poucos.',
  'Uke não deve girar de repente para escapar: isso transfere a força para o joelho.',
  'Pratique com um professor por perto e com parceiro que sabe bater a tempo.'],
 phases:[
 {s:0,e:1.6,kanji:'組み手',ro:'Guarda aberta',pt:'Pés no quadril',
  d:'Uke está de costas com a guarda aberta e os pés no quadril de Tori. Tori está em pé entre as pernas dele, com as mãos nos joelhos de Uke.',
  l:['A guarda aberta deixa os pés de Uke soltos, ao alcance das mãos.','Tori mantém a postura ereta.','Aqui o alvo é o pé direito de Uke.']},
 {s:1.6,e:3.8,kanji:'入り',ro:'Abraçar o pé',pt:'Pé na axila, antebraço no tendão',
  d:'Tori tira o pé direito de Uke do quadril e o prende debaixo da axila esquerda. O braço esquerdo passa por baixo da perna e o antebraço encaixa atrás do tornozelo, no tendão de Aquiles. A mão esquerda segura a gola do próprio kimono, do outro lado.',
  l:['O pé fica preso debaixo da axila do braço que abraça.','A lâmina do antebraço fica atrás do calcanhar, não na panturrilha.','A outra mão segura a canela de Uke e fecha o abraço.']},
 {s:3.8,e:5.8,kanji:'座り',ro:'Sentar',pt:'Pé no quadril, joelhos fechados',
  d:'Tori pisa com o pé esquerdo, o de fora, no lado de fora do quadril direito de Uke e senta perto dele. A perna direita, a de dentro, entra entre as pernas de Uke e o pé apoia na barriga dele. Os joelhos fecham na coxa direita de Uke e a perna dele fica reta.',
  l:['O pé de fora fica no quadril de Uke. Ele não cruza por cima da coxa.','Os joelhos apertam a coxa: Uke não gira o joelho.','O pé de fora empurra o quadril de Uke e mantém a perna dele esticada.']},
 {s:5.8,e:7.8,kanji:'極め',ro:'Kime',pt:'Deitar de lado e arquear',
  d:'Tori deita de lado, para o lado da perna de fora, estende o quadril e arqueia as costas. O antebraço sobe contra o tendão e o peito empurra a ponta do pé para baixo: o tornozelo estica.',
  l:['O movimento vem do quadril e das costas, não dos braços.','A ponta do pé de Uke fica presa na axila.','Aperte devagar: o tornozelo avisa pouco.']},
 {s:7.8,e:10.6,kanji:'参った',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate três vezes no tatame. Tori solta a pressão na hora e desfaz o arco das costas.',
  l:['Bateu, soltou. Sem exceção.','Tori solta antes de soltar o pé, sem tranco.','No treino, o batimento chega antes da dor forte.']}],
 rep:[.8,2.9,4.9,7.0,9.4], cover:7.4,
 views:[
  {name:'Diagonal',a:-20,e:35,center:[.42,.62,0],span:3.0},
  {name:'Lateral',a:0,e:10,center:[.4,.80,0],span:3.2},
  {name:'De cima',a:0,e:88,center:[.35,0,.05],span:2.6}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* Tori tira o pé direito de Uke do quadril: a mão esquerda pega o calcanhar */
 [2.3,{tori:{pitch:18,arm:{L:SL('legR',.95)}},uke:{leg:{R:B('o',.30,.12,-.20)},pole:{legR:[.4,1,.3]}}}],
 /* pé debaixo da axila esquerda, antebraço atrás do tornozelo, mãos fechadas no peito */
 [3.0,{tori:{y:.86,pitch:10,arm:{L:B('s',.17,.26,.02),R:B('s',.20,.29,-.01)},pole:{armL:[.2,-1,-.6],armR:[0,-1,.7]}},
       uke:{leg:{R:B('o',.04,.34,-.25)},pole:{legR:[.2,1,.3]}}}],
 [3.8,{}],
 /* a perna esquerda (de fora) pisa no lado de fora do quadril direito de Uke; o pé esquerdo de Uke sai do quadril */
 [4.5,{tori:{x:.50,y:.70,z:-.02,pitch:6,leg:{L:W3(.05,.12,.27),R:W3(.80,.04,-.20)},pole:{legL:[1,.3,-.2]}},
       uke:{leg:{L:W3(.36,.05,-.30)},pole:{legL:[.2,1,-.4]}}}],
 /* senta: a perna direita (de dentro) entra entre as pernas de Uke, pé na barriga; joelhos fecham na coxa */
 /* agacha com o pé esquerdo ainda no quadril de Uke e senta perto do quadril dele */
 [4.9,{tori:{x:.52,y:.46,z:-.02,pitch:-8,leg:{R:W3(.62,.04,-.14)},pole:{legR:[1,.5,.1]}}}],
 [5.2,{tori:{x:.48,y:.24,z:-.02,pitch:-40,h:10,leg:{L:W3(.05,.10,.27),R:B('o',.15,.06,-.04)},pole:{legL:[1,.4,-.1],legR:[1,.4,.1]}},
       uke:{leg:{R:B('o',.10,.40,-.13)}}}],
 [5.8,{}],
 /* deita sobre o lado esquerdo (o da perna de fora), de frente para o mesmo lado que Uke */
 [6.6,{tori:{x:.40,y:.21,z:-.03,pitch:-72,roll:-50,h:15,arm:{L:B('s',.22,.30,-.02),R:B('s',.22,.35,.04)},leg:{L:W3(.08,.07,.27),R:B('o',.15,.03,.05)},pole:{armL:[.3,-.3,-1],armR:[.2,-.6,1],legL:[1,.4,0],legR:[1,.8,0]}},
       uke:{y:.15,roll:18,arm:{R:W3(-.40,.05,.30)},pole:{armR:[0,-1,.4]}}}],
 /* estende o quadril e arqueia as costas: a perna de Uke fica reta */
 [7.4,{tori:{x:.38,pitch:-84,roll:-58,h:25},uke:{roll:26}}],
 [7.8,{}],
 ...taps,
 [9.4,{}],
 [10.6,{tori:{pitch:-72,roll:-50,h:10}}]],
 aperto:[{s:2.6,e:10.6,limbs:['T.L.arm','U.R.leg'],tol:.10,tudo:true},{s:4.6,e:10.6,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.3,F.tori.head[2]],uke:[F.uke.head[0],F.uke.head[1]+.3,F.uke.head[2]]}),
 glow:{s:2.2,e:8.0,limbs:{'T.L.arm':'force','U.R.leg':'gold'}},
 stamp:{s:8.2,e:10.2,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('pés de Uke no quadril',U.legR.H,6,-4,C.uke,a);
  a=win(t,1.8,4.0);
  api.tag('pé preso na axila',U.legR.H,6,-3,C.gold,a);
  api.tag('antebraço atrás do tornozelo',T.armL.E,-6,3,C.force,a);
  a=win(t,4.0,6.0);
  api.tag('pé de fora no quadril de Uke',T.legL.H,-6,3,C.force,a);
  api.tag('joelhos fechados na coxa',T.legR.E,6,-3,C.force,win(t,5.1,6.2));
  a=win(t,6.0,8.2);
  api.tag('quadril estende, costas arqueiam',T.hip,6,-4,C.force,a);
  api.tag('perna de Uke reta',U.legR.E,-6,4,C.gold,a);}
});})();
