(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori deitado de costas, cabeça para -x, quadril perto da origem; direita de Tori = +z.
   Uke ajoelhado na guarda fechada, de frente para Tori (yaw 180); direita de Uke = -z.
   A mão direita de Tori entra funda na gola DIREITA de Uke (lado esquerdo de Tori, -z), palma para cima, até a nuca.
   A mão esquerda cruza e pega a gola ESQUERDA de Uke (+z). Os antebraços fazem um X na frente da garganta. */
const ukeBase={x:.42,y:.40,z:0,yaw:180,pitch:32,roll:0,h:-15,
 leg:{R:W3(.60,.07,-.17),L:W3(.60,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-90,roll:0,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[-.25,.75,1],legL:[0,.25,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* pegadas de Tori no referencial de Uke (frente, cima, direita de Uke): gola rasa no peito, gola funda na nuca */
const golaRasa=B('o',.14,.36,.07),abreGola=B('o',.13,.30,.12);
const fundaR=B('o',-.01,.64,.09),fundaL=B('o',-.01,.54,-.09);
const apertaR=B('o',.01,.64,.10),apertaL=B('o',.01,.54,-.10);
const tapAt=W3(-.22,.05,.46),tapUp=W3(-.22,.18,.46);
const taps=[7.9,8.15,8.4,8.65,8.9,9.15].map((t,i)=>[t,{uke:{arm:{L:i%2?tapAt:tapUp}}}]);
Judo.register3d({
 id:'juji-jime', name:'Juji Jime', kanji:'十字絞', group:'ne', cls:'Ne-waza · Shime-waza',
 bjj:'Estrangulamento cruzado da guarda',
 why:'O estrangulamento de gola mais básico da guarda fechada. Três ângulos para ver a primeira mão entrar funda, a segunda cruzar e os antebraços fecharem o X no pescoço.',
 summary:'Estrangulamento cruzado com as duas mãos na gola de Uke. Da guarda fechada, Tori enfia uma mão funda na gola, quebra a postura com as pernas, cruza a outra mão e pega a gola do outro lado. Os antebraços formam um X na frente do pescoço e Tori abre os cotovelos trazendo a cabeça de Uke ao peito.',
 reading:[{k:'十字',r:'juji',m:'cruz, em forma do ideograma 十'},{k:'絞',r:'jime',m:'estrangulamento'}],
 facts:[['Grupo','Katame-waza › Shime-waza (estrangulamentos)'],
  ['Três pegadas','Nami-juji-jime: as duas palmas para cima, polegares dentro da gola. Gyaku-juji-jime: as duas palmas para baixo, dedos dentro. Kata-juji-jime: uma de cada jeito.'],
  ['Ponto de pressão','As laterais do pescoço (artérias carótidas). Cada antebraço pressiona um lado; o X fica na frente, sem esmagar a traqueia.'],
  ['No jiu-jitsu','Estrangulamento cruzado da guarda. É das primeiras finalizações ensinadas com kimono e funda boa parte do jogo de gola.']],
 errors:[['Primeira mão rasa','Se a mão pega a gola perto do peito, os antebraços não alcançam o pescoço. A primeira mão entra funda, até a nuca, antes de qualquer coisa.'],
  ['Postura de Uke de pé','Com Uke ereto, Tori não chega ao pescoço e o aperto não fecha. As pernas e o braço puxam Uke para baixo primeiro.'],
  ['Puxar só para trás','Puxar as mãos para o próprio peito afrouxa o X. Tori abre os cotovelos para os lados e para baixo, como quem rasga a gola.'],
  ['Abrir a guarda','Sem os pés cruzados, Uke afasta o quadril, levanta a cabeça e sai.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'O estrangulamento de gola é sanguíneo e chega à perda de consciência em segundos. Aperte devagar no treino.',
  'Pratique só com orientação de um professor qualificado.'],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda fechada',pt:'Controle dos punhos',
  d:'Tori está de costas com as pernas cruzadas nas costas de Uke. Uke apoia as mãos na barriga de Tori para manter a postura, e Tori segura os punhos dele.',
  l:['Tornozelos cruzados atrás das costas de Uke.','Uke ereto está seguro: o pescoço fica longe.','Os punhos controlados não empurram.']},
 {s:1.6,e:3.6,kanji:'崩し',ro:'Kuzushi',pt:'Quebrar a postura e a primeira mão funda',
  d:'Tori puxa Uke para baixo com as pernas. As mãos de Uke caem no tatame, dos lados do peito de Tori. A mão esquerda de Tori abre a gola direita de Uke e a mão direita entra nela, palma para cima, deslizando até a nuca.',
  l:['As pernas puxam, o braço ajuda: a postura cai.','A mão de baixo abre a gola para a de cima entrar.','A primeira mão vai funda, até atrás do pescoço.']},
 {s:3.6,e:5.4,kanji:'十字',ro:'Juji',pt:'A segunda mão cruza',
  d:'Com Uke ainda curvado, a mão esquerda de Tori cruza por cima do antebraço direito e pega a gola esquerda de Uke, também funda, atrás do pescoço. Os dois antebraços formam um X na frente da garganta.',
  l:['A segunda mão passa por cima do primeiro braço.','As duas mãos fundas, atrás do pescoço.','O X dos antebraços fica na frente da garganta.']},
 {s:5.4,e:7.6,kanji:'絞め',ro:'Shime',pt:'Cotovelos abrem, cabeça no peito',
  d:'Tori abre os cotovelos para os lados e para baixo e, com as pernas fechadas, puxa Uke ainda mais. A cabeça de Uke desce até o peito de Tori e cada antebraço aperta um lado do pescoço.',
  l:['Cotovelos para fora e para baixo, como quem rasga a gola.','As pernas trazem Uke: a cabeça cola no peito.','Aperto progressivo, sem tranco.']},
 {s:7.6,e:10.6,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate três vezes no tatame. Tori solta na hora: abre as mãos, tira os antebraços do pescoço e deixa Uke levantar a cabeça.',
  l:['A batida pode ser no tatame, em Tori ou com a voz.','Soltar imediatamente é parte da técnica.','Abra as mãos antes de mexer as pernas.']}],
 rep:[.8,2.8,4.6,6.8,8.6], cover:7.0,
 views:[
  {name:'Pela cabeça',a:-55,e:6,center:[-.02,.45,0],span:2.4},
  {name:'Lateral',a:20,e:14,center:[.05,.40,0],span:2.4},
  {name:'De cima',a:-90,e:88,center:[0,0,0],span:2.4}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* as pernas puxam: Uke curva, as mãos dele saem da barriga e vão ao tatame, dos lados do peito de Tori */
 [2.3,{uke:{x:.36,y:.44,pitch:62,h:0,leg:{R:W3(.64,.07,-.17),L:W3(.64,.07,.17)},arm:{R:W3(-.18,.06,-.34),L:W3(-.18,.06,.34)},
        pole:{armR:[-.3,-.6,1],armL:[-.3,-.6,-1]}},
       tori:{arm:{R:golaRasa,L:abreGola},pole:{armR:[-.2,0,1],armL:[-.2,0,-1]}}}],
 [3.0,{uke:{x:.32,y:.47,pitch:82,h:10,leg:{R:W3(.68,.07,-.17),L:W3(.68,.07,.17)},arm:{R:W3(-.26,.06,-.36),L:W3(-.26,.06,.36)}},
       tori:{pitch:-80,h:35,arm:{R:fundaR},pole:{armR:[-.5,-1,1]}}}],
 [3.6,{}],
 /* a mão esquerda cruza por cima do antebraço direito até a gola esquerda de Uke */
 [4.3,{tori:{pitch:-74,arm:{L:B('o',.05,.50,.04)},pole:{armL:[.5,-1,-1]}},uke:{pitch:88}}],
 [5.0,{tori:{arm:{L:fundaL},pole:{armL:[.5,-1,-1]}}}],
 [5.4,{}],
 /* cotovelos abrem para os lados e para baixo; Uke vem com a cabeça ao peito de Tori */
 [6.4,{tori:{pitch:-66,h:20,arm:{R:apertaR,L:apertaL},pole:{armR:[-.6,-.4,1],armL:[.5,-1,-1]}},
       uke:{x:.35,y:.50,pitch:96,h:10,leg:{R:W3(.68,.07,-.17),L:W3(.68,.07,.17)}}}],
 [7.6,{}],
 ...taps,
 [9.6,{tori:{arm:{R:golaRasa,L:B('o',.14,.36,-.07)},pole:{armR:[-.2,0,1],armL:[-.2,0,-1]}}}],
 [10.3,{tori:{pitch:-90,h:30},uke:{x:.36,y:.44,pitch:62,h:0,arm:{L:W3(-.18,.06,.34)}}}],
 [10.6,{}]],
 /* os dois braços de Tori apertam o pescoço de propósito; os pés cruzados fecham a guarda nas costas de Uke */
 aperto:[{s:2.6,e:9.8,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true},{s:3.2,e:9.4,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true,fiel:true},{s:0,e:10.6,limbs:['T.R.leg','T.L.leg'],tol:.10}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.hip[0]+.1,Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.hip[2]]}),
 glow:{s:2.4,e:7.6,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:7.9,e:10.4,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('pés cruzados nas costas',T.legR.H,8,3,C.force,a);
  api.tag('Tori segura os punhos',T.armL.H,-8,2.5,C.force,a);
  a=win(t,1.8,3.7);
  api.tag('as pernas puxam: a postura cai',T.legR.E,2,4,C.force,a);
  api.tag('primeira mão funda, até a nuca',T.armR.H,3,-5,C.force,a);
  a=win(t,3.7,5.5);
  api.tag('segunda mão cruza por cima',T.armL.E,6,-3.5,C.gold,a);
  a=win(t,5.5,7.7);
  api.tag('cotovelos para fora e para baixo',T.armR.E,6,3,C.force,a);
  api.tag('cabeça no peito',U.head,-6,-4,C.uke,a);
  a=win(t,7.8,10.5);
  api.tag('Uke bate: solte na hora',U.armL.H,6,2.5,C.uke,a);}
});})();
