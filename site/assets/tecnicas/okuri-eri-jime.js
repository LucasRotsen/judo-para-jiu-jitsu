(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Os dois olham para +x; direita dos dois = +z.
   Uke sentado no tatame, pernas estendidas, mãos nas coxas. Tori ajoelhado (os dois joelhos no chão,
   quadril alto) logo atrás, tronco inclinado sobre as costas de Uke, cabeça do lado ESQUERDO da cabeça de Uke.
   Conferido com o vídeo da Kodokan (EiqyoVcIAi8): a mão esquerda entra por baixo da axila esquerda e puxa a
   gola esquerda para baixo; o braço direito passa por cima do ombro direito, cruza a garganta e pega fundo a
   gola esquerda, ao lado do pescoço. */
const ukeBase={x:.45,y:.13,z:0,yaw:0,pitch:0,roll:0,h:0,gf:0,
 leg:{R:W3(1.22,.05,.20),L:W3(1.22,.05,-.20)},arm:{R:B('s',.33,.08,.15),L:B('s',.33,.08,-.15)},
 pole:{legR:[.2,1,.1],legL:[.2,1,-.1],armR:[-.3,-.3,1],armL:[-.3,-.3,-1]}};
const toriBase={x:-.03,y:.46,z:-.10,yaw:0,pitch:48,roll:-8,h:22,gf:1,
 leg:{R:W3(-.30,.04,.12),L:W3(-.30,.04,-.24)},
 arm:{R:B('o',-.03,.50,.17),L:B('o',-.04,.42,-.22)},
 pole:{legR:[1,0,.2],legL:[1,0,-.2],armR:[.3,-.6,.8],armL:[.3,-.6,-.8]}};
const tapAt=W3(.50,.72,.26),tapUp=W3(.52,.84,.30);
const taps=[7.9,8.1,8.3,8.5,8.7,8.9].map((t,i)=>[t,{uke:{arm:{R:i%2?tapUp:tapAt}}}]);
Judo.register3d({
 id:'okuri-eri-jime', name:'Okuri Eri Jime', kanji:'送襟絞', group:'ne', cls:'Ne-waza · Shime-waza', first:'tori',
 bjj:'Estrangulamento de gola pelas costas',
 why:'O estrangulamento pelas costas que usa a gola do próprio Uke, em três ângulos para ver um braço por cima do ombro e o outro por baixo da axila.',
 summary:'Estrangulamento pelas costas com as golas. O braço direito de Tori passa por cima do ombro, cruza a garganta e pega fundo a gola esquerda de Uke; a mão esquerda entra por baixo da axila e puxa a gola para baixo. Tori cola o peito, encosta a cabeça e gira o punho.',
 reading:[{k:'送',r:'okuri',m:'deslizar, mandar adiante'},{k:'襟',r:'eri',m:'gola'},{k:'絞',r:'jime',m:'estrangulamento'}],
 facts:[['Grupo','Katame-waza › Shime-waza (estrangulamentos)'],
  ['Pegada','A mão direita pega fundo na gola esquerda, ao lado do pescoço. A esquerda, por baixo da axila, puxa a gola para baixo e estica o pano.'],
  ['Ponto de pressão','A borda da gola e o antebraço apertam as laterais do pescoço (carótidas).'],
  ['No jiu-jitsu','Estrangulamento de gola pelas costas, também chamado de “gola cruzada pelas costas”. Sai das costas com os ganchos ou da tartaruga.']],
 errors:[['Pegada rasa','Se a mão direita pega longe do pescoço, a gola fica frouxa e não aperta. A mão vai fundo, os dedos por dentro da gola, perto da orelha de Uke.'],
  ['Esquecer a mão de baixo','Sem a mão esquerda puxando a gola para baixo, o pano escorrega e o aperto some.'],
  ['Espaço nas costas','Peito longe das costas de Uke deixa ele abaixar o queixo e virar para escapar.'],
  ['Puxar só com o braço','O aperto vem de girar o punho e colar o peito e a cabeça, não de força bruta.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'Aplique devagar no treino. O estrangulamento sanguíneo leva à perda de consciência em segundos.',
  'Pratique só com orientação de um professor qualificado.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.quadril',de:'U.quadril',lado:'tras',s:0,e:7.8,min:.1,txt:'Tori fica atrás de Uke'},
  {c:'lado',a:'T.cabeca',de:'U.cabeca',lado:'esquerda',s:1.8,e:7.8,min:.05,txt:'a cabeça de Tori fica do lado ESQUERDO da cabeça de Uke'},
  {c:'contato',a:'T.antebracoR',b:'U.pescoco',s:5.8,e:7.8,txt:'o braço direito cruza a garganta de Uke'},
  {c:'contato',a:'T.antebracoL',b:'U.ombroL',s:2.6,e:7.8,txt:'a mão esquerda entra por baixo da axila esquerda de Uke'}],
 phases:[
 {s:0,e:1.8,kanji:'後',ro:'Costas',pt:'Ajoelhado atrás de Uke',
  d:'Uke está sentado com as pernas estendidas. Tori se ajoelha logo atrás, com o peito colado nas costas dele e as mãos nos ombros de Uke.',
  l:['Os dois joelhos no chão, quadril alto.','Peito colado: sem espaço entre os dois.','A cabeça de Tori fica do lado esquerdo da cabeça de Uke.']},
 {s:1.8,e:3.8,kanji:'襟',ro:'Shita no te',pt:'Mão esquerda por baixo da axila',
  d:'A mão esquerda de Tori passa por baixo da axila esquerda de Uke, sai na frente do peito e segura a gola esquerda. Tori puxa essa gola para baixo para esticar o pano.',
  l:['O braço entra por baixo da axila, entre o braço e o tronco de Uke.','Puxar a gola para baixo deixa o pano firme em volta do pescoço.','O cotovelo esquerdo prende o braço de Uke junto ao corpo.']},
 {s:3.8,e:5.8,kanji:'送',ro:'Ue no te',pt:'Braço direito em volta do pescoço',
  d:'O braço direito passa por cima do ombro direito de Uke, cruza a frente da garganta e a mão pega fundo a gola esquerda, ao lado do pescoço, com os dedos por dentro.',
  l:['A pegada é funda: a mão chega perto da orelha esquerda de Uke.','O antebraço fica atravessado na frente do pescoço.','A mão esquerda segue puxando a gola para baixo.']},
 {s:5.8,e:7.8,kanji:'絞',ro:'Shime',pt:'Peito colado, punho gira',
  d:'Tori cola o peito nas costas de Uke e encosta a cabeça na dele, do lado esquerdo. O punho direito gira e puxa a gola para trás enquanto a mão esquerda puxa para baixo: a gola fecha as laterais do pescoço.',
  l:['Aperto progressivo, nunca um tranco.','A cabeça de Tori trava a cabeça de Uke contra o braço.','As duas mãos trabalham juntas: uma gira, a outra puxa para baixo.']},
 {s:7.8,e:10.5,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate no braço de Tori (maitta, “desisto”). No judô isso vale ippon. Tori solta a gola na hora e abre os braços.',
  l:['A batida pode ser no braço, no corpo ou no tatame.','Soltar imediatamente é parte da técnica.','Uke volta a respirar normalmente em instantes.']}],
 rep:[.9,3.0,5.0,6.9,8.6], cover:6.9,
 views:[
  {name:'Frente',a:100,e:12,center:[.45,.55,-.05],span:1.9},
  {name:'Lado esquerdo',a:180,e:10,center:[.45,.5,0],span:2.3},
  {name:'Por trás, de cima',a:-60,e:55,center:[.5,.4,0],span:2.3}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 /* a mão esquerda desce pelas costas e entra por baixo da axila esquerda de Uke */
 [2.5,{tori:{arm:{L:B('o',.0,.39,-.20)},pole:{armL:[.3,-.8,-.6]}},uke:{arm:{L:B('s',.31,.08,-.21)},pole:{armL:[-.3,-.1,-1]}}}],
 [3.1,{tori:{arm:{L:B('o',.15,.40,-.06)},pole:{armL:[.5,-.8,-.4]}}}],
 [3.8,{tori:{arm:{L:B('o',.15,.34,-.05)}}}],
 /* o braço direito sobe por cima do ombro direito e cruza a garganta até a gola esquerda */
 [4.4,{tori:{arm:{R:B('o',.10,.62,.17)},pole:{armR:[.4,.2,1]}}}],
 [5.1,{tori:{arm:{R:B('o',.16,.57,.04)},pole:{armR:[.5,0,1]}},uke:{h:6}}],
 [5.8,{tori:{arm:{R:B('o',.07,.55,-.10)}}}],
 [6.8,{tori:{pitch:52,h:28,arm:{R:B('o',.05,.56,-.11),L:B('o',.16,.34,-.05)}},uke:{pitch:3,h:10}}],
 [7.8,{}],
 ...taps,
 [9.3,{tori:{pitch:44,h:18,arm:{R:B('o',-.03,.52,.19),L:B('o',-.05,.36,-.24)},pole:{armR:[.3,-.6,.8],armL:[.3,-.6,-.8]}},
       uke:{pitch:0,h:0,arm:{R:B('s',.33,.08,.15),L:B('s',.33,.08,-.15)},pole:{armR:[-.3,-.3,1],armL:[-.3,-.3,-1]}}}],
 [10.5,{}]],
 /* o braço esquerdo passa entre o braço e o tronco de Uke e o direito aperta o pescoço, de propósito */
 aperto:[{s:0,e:10.5,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true},{s:4.0,e:9.2,limbs:['T.R.arm'],tol:.12,tudo:true,fiel:true},
  {s:2.6,e:9.2,limbs:['T.L.arm'],tol:.12,tudo:true,fiel:true},{s:7.7,e:9.3,limbs:['U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0]-.1,F.tori.head[1]+.22,F.tori.head[2]-.05],uke:[F.uke.legL.E[0],F.uke.legL.E[1]+.14,F.uke.legL.E[2]]}),
 glow:{s:1.8,e:7.9,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:8.0,e:10.5,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('peito colado nas costas',T.shL,-7,-3,C.force,a);
  a=win(t,2.0,4.0);
  api.tag('por baixo da axila',T.armL.E,-7,3,C.gold,a);
  api.tag('puxa a gola para baixo',T.armL.H,6,3,C.gold,a);
  a=win(t,4.0,6.0);
  api.tag('por cima do ombro',T.armR.E,7,-3,C.force,a);
  api.tag('pegada funda na gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,6.0,8.0);
  api.tag('punho gira',T.armR.H,-7,-3.5,C.force,a);
  api.tag('cabeça encostada',T.head,-6,-3,C.info,a);
  a=win(t,8.0,10.6);
  api.tag('Uke bate: solte na hora',U.armR.H,7,-2,C.uke,a);}
});})();
