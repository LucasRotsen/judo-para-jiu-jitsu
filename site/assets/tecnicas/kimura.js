(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa ajoelhado na guarda, de frente para -x (direita de Uke = -z).
   Tori começa deitado de costas, cabeça para -x (yaw 180, pitch 90, roll 180 = de costas, direita = +z).
   O braço atacado é o DIREITO de Uke, que fica do lado esquerdo de Tori (-z).
   Mão esquerda de Tori no punho direito de Uke; Tori senta, o braço direito passa por cima do ombro/tríceps
   de Uke, entra por dentro (entre o braço e o corpo dele) e a mão direita segura o próprio punho esquerdo.
   Ao cair de costas, Uke é puxado para baixo e gira: a cabeça dele desce para o lado direito de Tori (+z),
   o ombro direito fica sobre o peito de Tori e a perna esquerda de Tori trava as costas dele. */
const ukeBase={x:.34,y:.40,z:0,yaw:180,pitch:35,roll:0,h:-20,
 leg:{R:W3(.57,.07,-.17),L:W3(.57,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:180,pitch:90,roll:180,h:30,
 leg:{R:B('o',-.26,.02,.02),L:B('o',-.26,.07,-.02)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* mão direita de Uke apoiada no tatame, ao lado da cintura esquerda de Tori */
const post=W3(.0,.04,-.30);
/* depois que Tori senta, o punho de Uke fica preso na frente do quadril dele (referencial de Tori) */
const atHip=B('o',.24,.14,0);
/* mão de Uke atrás das costas (referencial de Uke): antes e depois de girar o ombro */
const behind=B('s',-.20,.25,.06),crank=B('s',-.30,.40,.10);
const grip=SL('armR',.95),fig4=SL('armR',.80);
const tapAt=W3(.10,.04,.42),tapUp=W3(.10,.17,.42);
Judo.register3d({
 id:'kimura', name:'Kimura', kanji:'', group:'ne', cls:'Jiu-jitsu · Chave de ombro',
 bjj:'Kimura (no judô, gyaku-ude-garami)',
 why:'A chave de ombro mais famosa do jiu-jitsu, saindo da guarda fechada. É a mesma figura-4 da americana, girando o ombro para o outro lado.',
 summary:'Chave de ombro em figura-4, da guarda fechada. Uke apoia a mão no tatame; Tori segura o punho, senta, passa o outro braço por cima do ombro dele e segura o próprio punho. Cai de costas, escapa o quadril, trava as costas de Uke com a perna e leva a mão dele para as costas, em direção à cabeça.',
 reading:[{k:'Kimura',r:'kimura',m:'sobrenome de Masahiko Kimura, judoca japonês'}],
 facts:[['Origem do nome','O jiu-jitsu batizou a chave com o nome de Masahiko Kimura, judoca japonês que a usou na famosa luta contra Hélio Gracie, em 1951.'],
  ['No judô','Gyaku-ude-garami, "ude-garami invertido", dentro do grupo das chaves de articulação (kansetsu-waza).'],
  ['Kimura × americana','Mesma figura-4, direção oposta. Na americana a mão de Uke vai para o lado da cabeça, palma para cima. Na kimura a mão vai para as costas e o cotovelo aponta para cima: o ombro gira para dentro.'],
  ['De onde sai','Guarda fechada, meia-guarda, cem quilos e norte-sul. Da guarda, o gatilho é Uke apoiar a mão no tatame.']],
 errors:[['Não sentar','Deitado, o braço de Tori não alcança por cima do ombro de Uke. Tori senta e cola o peito no ombro dele antes de fechar a figura-4.'],
  ['Braço de Uke esticado','Com o cotovelo aberto não há alavanca. O cotovelo de Uke fica dobrado a 90° o tempo todo.'],
  ['Cair reto de costas','Sem escapar o quadril, Uke rola por cima e sai. Tori cai de lado, sai o quadril e passa a perna por cima das costas dele.'],
  ['Puxar só com os braços','Os braços fazem o "4"; o giro vem do tronco de Tori indo para trás e do quadril escapando.']],
 safety:['Chave de ombro machuca rápido e sem aviso: gire devagar e pare na hora em que o parceiro bater.',
  'Nunca dê tranco nem leve a mão até o fim no treino. Uma lesão de ombro pode levar meses para sarar.',
  'Quem recebe bate cedo e não tenta rolar com o braço preso. Pratique com um professor por perto.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoL',b:'U.maoR',s:1.8,e:'fim',txt:'a mão esquerda de Tori segura o punho DIREITO de Uke'},
  {c:'contato',a:'T.antebracoR',b:'U.bracoR',s:4.0,e:'fim',txt:'o braço direito de Tori passa por cima do tríceps e entra por dentro do braço de Uke'},
  {c:'lado',a:'U.cabeca',de:'T.peito',lado:'direita',s:7.0,e:'fim',min:.15,txt:'a cabeça de Uke fica do lado DIREITO de Tori na finalização'}],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Guarda fechada',pt:'Uke apoia a mão',
  d:'Tori está de costas com a guarda fechada e puxa Uke com as pernas. Para não cair, Uke apoia a mão direita no tatame, ao lado da cintura de Tori. A mão esquerda de Tori segura esse punho.',
  l:['O gatilho é a mão de Uke no tatame.','Pegada no punho, polegar junto dos dedos.','Mão esquerda de Tori no punho direito de Uke.']},
 {s:1.8,e:3.6,kanji:'2',ro:'Sentar',pt:'Abrir a guarda e sentar',
  d:'Tori abre a guarda, apoia a mão direita atrás e senta, virando o peito para o ombro direito de Uke. O braço direito sobe por cima do ombro dele, do lado de fora.',
  l:['Abrir as pernas para poder sentar.','Peito colado no ombro de Uke.','O punho de Uke continua preso no tatame.']},
 {s:3.6,e:5.4,kanji:'3',ro:'Figura-4',pt:'Por cima do tríceps, por dentro do braço',
  d:'O braço direito de Tori passa por cima do ombro e do tríceps de Uke, entra por dentro, entre o braço e o corpo dele, e a mão direita segura o próprio punho esquerdo. Os dois braços formam um "4" em volta do braço de Uke, com o cotovelo dele dobrado.',
  l:['Por cima do tríceps, por dentro do braço.','Mão direita no próprio punho esquerdo.','Cotovelo de Uke dobrado a 90°.']},
 {s:5.4,e:7.6,kanji:'4',ro:'Cair de costas',pt:'Escapar o quadril e travar as costas',
  d:'Tori cai de costas levando o braço preso. Uke é puxado para baixo e a cabeça dele desce para o outro lado de Tori. Tori escapa o quadril e passa a perna esquerda por cima das costas de Uke para ele não rolar.',
  l:['Cair de costas, sem soltar o "4".','Perna por cima das costas: Uke não rola.','O ombro de Uke fica colado no peito de Tori.']},
 {s:7.6,e:11,kanji:'極め',ro:'Kime',pt:'Mão para as costas, rumo à cabeça',
  d:'Com o cotovelo de Uke dobrado e colado, Tori leva a mão dele para as costas e depois em direção à cabeça. O cotovelo aponta para cima e o ombro gira para dentro. Uke bate e Tori solta na hora.',
  l:['A mão de Uke sobe pelas costas, rumo à cabeça.','Cotovelo dobrado e para cima: o ombro gira.','Bateu, soltou. Sem exceção.']}],
 rep:[1.2,3.0,4.8,7.0,9.0], cover:8.8,
 views:[
  {name:'Lado do braço',a:-150,e:30,center:[-.05,.35,-.15],span:2.8},
  {name:'Pela cabeça',a:-90,e:24,center:[0,.35,0],span:2.8},
  {name:'De cima',a:0,e:88,center:[0,0,-.1],span:2.8}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [0.6,{uke:{pitch:48,h:-10}}],
 [1.2,{uke:{y:.38,pitch:65,h:0,arm:{R:post},pole:{armR:[-.5,0,.8]}},tori:{arm:{L:grip},pole:{armL:[-.3,.2,-1]}}}],
 [1.8,{}],
 /* as pernas abrem por fora dos quadris de Uke, sem atravessar as coxas dele */
 [2.0,{tori:{leg:{R:W3(.42,.32,.40),L:W3(.45,.35,-.45)},pole:{legR:[.6,0,1],legL:[.6,0,-1]}}}],
 /* Tori abre a guarda e começa a sentar apoiando a mão direita atrás */
 [2.3,{uke:{arm:{R:B('o',.16,.06,-.06),L:W3(.14,.05,.24)},pole:{armL:[-.3,-.4,-1]}},tori:{x:.05,z:-.15,roll:185,pitch:120,yaw:145,h:20,leg:{R:W3(.12,.06,.45),L:W3(.60,.06,-.65)},arm:{R:W3(-.18,.04,.10)},
        pole:{legR:[1,0,.3],legL:[1,0,-.4],armR:[-.6,0,.6]}}}],
 /* sentado, peito no ombro direito de Uke; o braço direito sobe por fora, por cima do ombro */
 [2.9,{tori:{x:.08,z:-.30,roll:180,pitch:165,yaw:105,h:10,arm:{R:B('o',-.12,.50,.30)},pole:{armR:[.2,1,.4]}},uke:{pitch:62,arm:{R:atHip},pole:{armR:[-.6,.6,.6]}}}],
 [3.6,{}],
 /* por cima do tríceps e por dentro do braço: a mão direita encontra o próprio punho esquerdo */
 [4.1,{tori:{arm:{R:SL('armR',.45)},pole:{armR:[.4,1,-.2]}},uke:{pitch:66}}],
 [4.6,{tori:{arm:{R:fig4},pole:{armR:[.3,1,-.3]}}}],
 [5.4,{}],
 /* Tori cai de costas; Uke vem junto e começa a girar, a cabeça indo para o lado direito de Tori */
 [6.0,{tori:{x:.05,z:.02,roll:185,pitch:115,yaw:140,h:15,leg:{L:W3(.40,.40,-.50)},pole:{legL:[1,.3,-.6]}},
       uke:{x:.20,y:.44,z:-.18,yaw:215,pitch:85,h:0,arm:{R:B('s',-.06,.22,.20),L:W3(.05,.05,.30)},leg:{R:W3(.45,.07,-.45),L:W3(.62,.07,-.15)},
        pole:{armR:[-.5,.3,.9],armL:[.2,-.6,-.8]}}}],
 /* perna esquerda de Tori por cima das costas de Uke; ombro direito dele sobre o peito de Tori */
 [6.8,{tori:{x:.02,z:.12,roll:180,pitch:100,yaw:172,h:20,leg:{L:B('o',-.14,.12,.12),R:W3(.48,.06,.40)},pole:{legL:[1,-.5,-.6],legR:[1,0,.4]}},
       uke:{x:-.085,y:.46,z:-.38,yaw:255,pitch:106,roll:5,h:20,arm:{R:behind,L:W3(.12,.04,.38)},
        leg:{R:W3(-.18,.07,-.82),L:W3(.20,.07,-.80)},pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[-.5,.2,1],armL:[.3,-.5,-.8]}}}],
 [7.6,{}],
 [8.6,{tori:{pitch:108,h:30},uke:{arm:{R:crank}}}],
 [8.9,{uke:{arm:{L:tapAt}}}],
 [9.15,{uke:{arm:{L:tapUp}}}],
 [9.4,{uke:{arm:{L:tapAt}}}],
 [9.65,{uke:{arm:{L:tapUp}}}],
 [9.9,{uke:{arm:{L:tapAt}}}],
 [10.5,{tori:{pitch:100,h:20},uke:{arm:{R:behind}}}],
 [11,{}]],
 /* os braços de Tori enrolam o braço de Uke (figura-4) e a perna esquerda pesa nas costas dele, de propósito */
 aperto:[{s:2.8,e:11,limbs:['T.R.arm','T.L.arm'],tol:.10,tudo:true},{s:2.8,e:11,limbs:['U.R.arm'],tol:.10,tudo:true},
  {s:6.2,e:11,limbs:['T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.hip[0]+.15,F.tori.hip[1]+.30,F.tori.hip[2]+.25],uke:[F.uke.hip[0]+.1,F.uke.hip[1]+.35,F.uke.hip[2]]}),
 glow:{s:3.6,e:9.9,limbs:{'T.R.arm':'force','T.L.arm':'force','U.R.arm':'gold'}},
 stamp:{s:9.2,e:10.8,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0.9,2.0);
  api.tag('Uke apoia a mão no tatame',U.armR.H,-7,3.4,C.info,a);
  api.tag('mão esquerda no punho',T.armL.E,6,-3,C.force,a);
  a=win(t,2.0,3.7);
  api.tag('abre a guarda e senta',T.head,-5,-3.4,C.force,a);
  a=win(t,3.7,5.5);
  api.tag('por cima do tríceps, por dentro do braço',T.armR.E,-6,-3.4,C.force,a);
  api.tag('cotovelo de Uke dobrado',U.armR.E,6,3.4,C.gold,a);
  a=win(t,5.6,7.7);
  api.tag('perna por cima das costas',T.legL.E,6,-3.4,C.force,a);
  api.tag('cai de costas sem soltar o "4"',T.head,-5,3.4,C.force,a);
  a=win(t,7.8,9.0);
  api.arrow(U.armR.H,api.add(U.armR.H,[-.05,.12,.12]),C.force,a);
  api.tag('mão para as costas, rumo à cabeça',U.armR.H,-6,-3.6,C.force,a);
  api.tag('cotovelo aponta para cima',U.armR.E,6,3.4,C.gold,a);
  a=win(t,9.0,10.8);
  api.tag('Uke bate: solte na hora',U.armL.H,5,3.4,C.uke,a);}
});})();
