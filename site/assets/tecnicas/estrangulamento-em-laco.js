(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori deitado de costas, cabeça para -x, quadril perto da origem; direita de Tori = +z.
   Uke ajoelhado na guarda fechada, de frente para Tori (yaw 180); direita de Uke = -z.
   A mão direita de Tori entra funda na gola DIREITA de Uke (lado esquerdo de Tori, -z), polegar por dentro, ao lado do pescoço.
   Uke abaixa a cabeça; a mão esquerda de Tori empurra a cabeça para baixo e para a direita de Tori (+z).
   O cotovelo direito passa por cima da nuca: o antebraço fica atrás do pescoço e a gola cruza a garganta (o laço).
   Tori vira o tronco, leva a própria cabeça para a esquerda (-z) e puxa o cotovelo para baixo, rolando um pouco. */
const ukeBase={x:.40,y:.40,z:0,yaw:180,pitch:42,roll:0,h:-15,
 leg:{R:W3(.60,.07,-.17),L:W3(.60,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-90,roll:0,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[-.25,.75,1],legL:[0,.25,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* pegada da mão direita no referencial de Uke: gola direita, funda, ao lado do pescoço */
const gola=B('o',.12,.50,.09),golaFunda=B('o',.07,.58,.10),golaLado=B('o',.02,.60,.11),golaAperta=B('o',.01,.60,.12);
const nuca=B('o',-.06,.70,-.02),costas=B('o',-.10,.32,.17);
const tapAt=W3(-.30,.05,.62),tapUp=W3(-.30,.18,.62);
const taps=[7.9,8.15,8.4,8.65,8.9,9.15].map((t,i)=>[t,{uke:{arm:{L:i%2?tapAt:tapUp}}}]);
Judo.register3d({
 id:'estrangulamento-em-laco', name:'Estrangulamento em laço', kanji:'', group:'ne', cls:'Jiu-jitsu · Estrangulamento',
 bjj:'Loop choke',
 why:'Para quem já chega bem na guarda e trava no que fazer depois: uma pegada só na gola, deixada pronta, transforma cada vez que Uke abaixa a cabeça num estrangulamento. Três ângulos para ver a mão funda, o cotovelo passar por cima da nuca e o tronco girar.',
 summary:'Estrangulamento da guarda com uma mão na gola. Tori pega fundo a gola de Uke ao lado do pescoço e espera a cabeça baixar. A outra mão empurra a cabeça para baixo, o cotovelo passa por cima da nuca e a gola fica cruzada na garganta, formando um laço. Tori gira o tronco, puxa o cotovelo para baixo e rola um pouco para o lado.',
 reading:[{k:'Laço',r:'loop choke',m:'a gola e o antebraço formam uma volta fechada em torno do pescoço'}],
 facts:[['Origem','Jiu-jitsu com kimono. Depende da gola: sem pano, não existe o laço.'],
  ['Quando aparece','Quando Uke abaixa a cabeça para passar a guarda, para se defender de uma raspagem ou para ganhar pegada no chão. Cabeça baixa com a gola já pega é o momento.'],
  ['Uma mão só','Diferente do estrangulamento cruzado, as mãos não se juntam e não cruzam. Quem aperta é a gola de um lado e o antebraço do outro; a mão livre só empurra a cabeça.'],
  ['Depois de puxar para a guarda','A primeira pegada na gola, funda e com o polegar por dentro, já deixa o laço armado. Se Uke fica de postura alta, ela serve de ameaça; se a cabeça cai, vira o estrangulamento.']],
 errors:[['Pegada rasa','Se a mão pega a gola perto do peito, o laço fica largo e a cabeça de Uke sai. A mão entra funda, ao lado do pescoço.'],
  ['Fazer o laço com Uke de postura alta','Com a cabeça alta não há onde passar o cotovelo. Espere a cabeça cair ou quebre a postura com as pernas antes.'],
  ['Puxar só com o braço','O braço sozinho cansa e não fecha. O aperto vem de girar o tronco e levar o cotovelo para baixo, com o peso do corpo.'],
  ['Cotovelo alto','Se o cotovelo fica em cima da nuca sem descer, a gola não aperta a garganta. O cotovelo desce em direção ao tatame, do lado da cabeça de Uke.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'O laço aperta rápido e o parceiro pode não perceber a tempo. Aperte devagar no treino.',
  'Pratique só com orientação de um professor qualificado.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.maoR',de:'U.pescoco',lado:'direita',s:1.0,e:7.6,txt:'a mão direita de Tori entra funda na gola DIREITA de Uke'},
  {c:'contato',a:'T.antebracoR',b:'U.pescoco',s:5.2,e:7.6,txt:'o laço: o antebraço direito fica atrás do pescoço e a gola cruza a garganta'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Pegada',pt:'Mão funda na gola',
  d:'Tori está de costas com a guarda fechada. A mão direita entra funda na gola direita de Uke, polegar por dentro, até o lado do pescoço. A mão esquerda segura a manga direita de Uke.',
  l:['Polegar por dentro da gola, mão ao lado do pescoço.','A pegada fica pronta enquanto Uke está de postura alta.','A mão esquerda controla a manga.']},
 {s:1.6,e:3.6,kanji:'2',ro:'Cabeça baixa',pt:'Uke abaixa a cabeça',
  d:'Tori puxa Uke com as pernas e Uke cai para a frente, com as mãos no tatame dos lados do peito de Tori. A cabeça desce e passa por baixo do braço direito de Tori, que continua segurando a gola.',
  l:['As pernas puxam, a postura cai.','A cabeça baixa é o sinal.','A mão direita não solta a gola.']},
 {s:3.6,e:5.6,kanji:'3',ro:'Laço',pt:'Empurrar a cabeça e passar o cotovelo',
  d:'A mão esquerda solta a manga, vai na nuca de Uke e empurra a cabeça para baixo, para o lado direito de Tori, e desce para as costas dele. O cotovelo direito passa por cima da nuca: o antebraço fica atrás do pescoço e a gola cruza a garganta.',
  l:['A mão livre empurra a cabeça para baixo.','O cotovelo passa por cima da nuca.','Gola na frente, antebraço atrás: o laço fechou.']},
 {s:5.6,e:7.6,kanji:'4',ro:'Aperto',pt:'Girar o tronco e descer o cotovelo',
  d:'A perna direita descruza e apoia no quadril de Uke para dar ângulo. Tori leva a própria cabeça para a esquerda, girando o tronco para ficar de lado em relação a Uke, e puxa o cotovelo direito para baixo em direção ao tatame. Rola um pouco para o lado e o peso do corpo fecha o laço. A mão esquerda segue nas costas de Uke, sem se juntar à direita.',
  l:['O tronco gira, a cabeça de Tori sai para o lado.','Cotovelo para baixo, rumo ao tatame.','O aperto vem do giro, não do bíceps.']},
 {s:7.6,e:10.6,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate três vezes no tatame. Tori solta na hora: abre a mão da gola, levanta o cotovelo e deixa Uke tirar a cabeça.',
  l:['A batida pode ser no tatame, em Tori ou com a voz.','Soltar imediatamente é parte da técnica.','Abra a mão da gola antes de qualquer outro movimento.']}],
 rep:[.8,2.8,4.6,6.8,8.6], cover:7.0,
 views:[
  {name:'Pela cabeça',a:-55,e:20,center:[-.05,.35,.1],span:2.4},
  {name:'Lateral',a:20,e:14,center:[.05,.35,.05],span:2.4},
  {name:'De cima',a:-90,e:88,center:[.12,0,.08],span:2.7}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.0,{tori:{pitch:-80,h:40,arm:{R:gola},pole:{armR:[-.3,0,1]}}}],
 [1.6,{}],
 /* as pernas puxam: Uke cai para a frente, mãos no tatame dos lados do peito de Tori */
 [2.5,{uke:{x:.36,y:.44,pitch:62,h:0,leg:{R:W3(.64,.07,-.17),L:W3(.64,.07,.17)},arm:{R:W3(-.18,.06,-.34),L:W3(-.18,.06,.38)},
        pole:{armR:[-.3,-.6,1],armL:[-.3,-.6,-1]}},
       tori:{arm:{R:golaFunda,L:SL('armR',.5)}}}],
 [3.4,{uke:{x:.32,y:.47,pitch:86,h:10,leg:{R:W3(.68,.07,-.17),L:W3(.68,.07,.17)},arm:{R:W3(-.26,.06,-.36),L:W3(-.20,.06,.46)}},
       tori:{pitch:-82,h:35}}],
 [3.6,{}],
 /* mão esquerda na nuca empurra a cabeça para baixo e para a direita de Tori; o cotovelo direito sobe por cima */
 [4.3,{tori:{arm:{L:nuca},pole:{armL:[.6,.2,-1],armR:[1,-.2,.6]}},uke:{x:.29,yaw:192,pitch:96,z:.08}}],
 [5.0,{tori:{x:.04,arm:{R:golaLado,L:costas},pole:{armL:[.3,0,-1],armR:[1.2,-.5,.8]}},uke:{x:.25,yaw:196,pitch:104,roll:-4,z:.12,y:.44}}],
 [5.6,{}],
 /* o tronco gira: a cabeça de Tori vai para a esquerda (-z), o cotovelo desce rumo ao tatame */
 [6.6,{tori:{x:0,z:.16,yaw:-30,roll:-18,h:20,arm:{R:golaAperta},leg:{R:B('o',-.12,-.10,-.22)},pole:{armR:[.5,-.6,1]}},
       uke:{x:.28,yaw:198,pitch:106,roll:-6,z:.14,y:.50}}],
 [7.6,{}],
 ...taps,
 [9.6,{tori:{z:.08,yaw:-12,roll:-6,h:30,arm:{R:golaFunda,L:B('o',.05,.30,.22)},leg:{R:B('o',-.2,-.04,-.03)},pole:{armR:[1,-.2,.6],armL:[.3,0,-1]}},
       uke:{x:.29,yaw:192,pitch:98,roll:-2,z:.08,y:.46}}],
 [10.3,{tori:{x:0,z:0,yaw:0,roll:0,h:30,arm:{R:B('s',.3,.25,.2),L:B('s',.35,.30,-.06)}},uke:{x:.34,y:.45,yaw:184,pitch:70,roll:0,z:.02,arm:{L:W3(-.20,.06,.40)}}}],
 [10.6,{}]],
 /* a mão direita segura a gola e o antebraço envolve a nuca de propósito; a mão esquerda empurra a cabeça e fica nas costas; as pernas abraçam Uke */
 aperto:[{s:.8,e:9.8,limbs:['T.R.arm'],tol:.12,tudo:true},{s:4.0,e:9.4,limbs:['T.R.arm'],tol:.12,tudo:true,fiel:true},
  {s:3.8,e:9.4,limbs:['T.L.arm'],tol:.12,tudo:true},{s:0,e:10.6,limbs:['T.R.leg','T.L.leg'],tol:.10}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.hip[0]+.1,Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.hip[2]]}),
 glow:{s:.6,e:7.6,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:7.9,e:10.4,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('mão funda na gola, polegar dentro',T.armR.H,3,-5,C.force,a);
  api.tag('guarda fechada',T.legR.H,8,3,C.force,a);
  a=win(t,1.8,3.7);
  api.tag('a cabeça cai',U.head,-6,-4,C.uke,a);
  a=win(t,3.7,5.7);
  api.tag('mão livre empurra a cabeça',T.armL.H,-7,3,C.gold,a);
  api.tag('cotovelo por cima da nuca',T.armR.E,6,-3.5,C.force,a);
  a=win(t,5.7,7.7);
  api.tag('tronco gira, cotovelo desce',T.armR.E,6,3,C.force,a);
  api.tag('gola na garganta',U.head,-6,-4,C.uke,a);
  a=win(t,7.8,10.5);
  api.tag('Uke bate: solte na hora',U.armL.H,6,2.5,C.uke,a);}
});})();
