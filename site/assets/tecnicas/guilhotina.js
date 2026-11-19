(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori começa de costas, cabeça para -x, direita de Tori = +z.
   Uke ajoelhado na guarda (yaw 180: direita de Uke = -z). Uke abaixa a cabeça para a esquerda dele,
   que é o lado DIREITO de Tori (+z). Tori senta, o braço direito passa por cima da nuca de Uke, desce por fora
   do pescoço (lado esquerdo de Uke) e volta por baixo da garganta; a mão esquerda segura o punho direito.
   Tori fecha a guarda e deita: a cabeça de Uke fica sob a axila direita de Tori, ao lado do peito dele. */
const ukeBase={x:.42,y:.40,z:0,yaw:180,pitch:32,roll:0,h:-15,
 leg:{R:W3(.60,.07,-.17),L:W3(.60,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)},
 pole:{armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-90,roll:0,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[-.25,.75,1],legL:[0,.25,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* Mãos de Tori no referencial de Uke: a direita sai por baixo da garganta, a esquerda segura o punho. */
const maoR=B('o',.14,.57,0),maoL=B('o',.02,.48,.18);
const maoRaperta=B('o',.10,.58,0),maoLaperta=B('o',.0,.49,.18);
const tapAt=W3(0,.06,.55),tapUp=W3(0,.18,.55);
Judo.register3d({
 id:'guilhotina', name:'Guilhotina', kanji:'', group:'ne', cls:'Jiu-jitsu · Estrangulamento',
 bjj:'Guilhotina (guillotine choke)',
 why:'O estrangulamento que pune quem abaixa a cabeça dentro da guarda. Três ângulos para ver o braço passar por cima da nuca e o antebraço subir contra o pescoço.',
 summary:'Estrangulamento da guarda fechada. Quando Uke abaixa a cabeça, Tori senta, passa o braço por cima da nuca e por baixo do pescoço, junta as mãos, fecha a guarda e deita para trás. O quadril estica e o antebraço sobe contra o pescoço.',
 reading:[{k:'Guilhotina',r:'guillotine choke',m:'o braço cai sobre o pescoço como a lâmina'}],
 facts:[['Origem','Jiu-jitsu, luta livre e MMA. No judô, o estrangulamento de frente com o braço em volta do pescoço não tem um nome único na lista do Kodokan.'],
  ['Quando aparece','Sempre que Uke abaixa a cabeça na guarda ou tenta uma queda de cabeça baixa. A cabeça baixa entrega o pescoço.'],
  ['Qual braço','O do lado em que a cabeça de Uke caiu. Aqui a cabeça vai para o lado direito de Tori, então o braço direito envolve o pescoço.'],
  ['No jiu-jitsu','Funciona com e sem kimono. Sem pegada no tecido, por isso é uma das finalizações mais usadas no no-gi e no MMA.']],
 errors:[['Puxar só com os braços','A força vem de deitar, fechar a guarda e esticar o quadril. Os braços apenas mantêm o antebraço no lugar.'],
  ['Guarda aberta no aperto','Sem as pernas fechadas, Uke sobe o quadril, passa para o lado e alivia o pescoço.'],
  ['Cotovelo longe do pescoço','Se o braço fica frouxo em volta do pescoço, Uke tira a cabeça. O cotovelo cola na lateral da cabeça dele.'],
  ['Antebraço no queixo','Com o queixo dentro do braço, o estrangulamento não fecha. O antebraço entra por baixo do queixo, na garganta.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'A guilhotina pressiona a traqueia e a coluna cervical. Aperte devagar, e não puxe o pescoço para cima com tranco.',
  'Pratique só com orientação de um professor qualificado.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.antebracoR',b:'U.pescoco',s:4.4,e:7.6,txt:'o antebraço direito de Tori volta por baixo da garganta de Uke'},
  {c:'lado',a:'U.cabeca',de:'T.peito',lado:'direita',s:4.0,e:7.6,min:.05,txt:'a cabeça de Uke fica sob a axila DIREITA de Tori'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda fechada',pt:'Uke abaixa a cabeça',
  d:'Tori está de costas com as pernas cruzadas nas costas de Uke. Uke apoia as mãos na barriga de Tori e começa a abaixar a cabeça para o lado direito de Tori.',
  l:['Tornozelos cruzados atrás das costas de Uke.','Cabeça baixa na guarda é o convite para a guilhotina.','Tori controla os punhos enquanto espera.']},
 {s:1.6,e:3.8,kanji:'2',ro:'Sentar',pt:'Abrir as pernas e sentar',
  d:'Tori abre a guarda, apoia os pés no chão e senta, com a mão esquerda apoiada atrás. A cabeça de Uke fica do lado direito de Tori, junto da costela, e o braço direito vem por cima da nuca dele.',
  l:['Sentar encurta a distância até o pescoço.','A cabeça de Uke fica do lado do braço que vai estrangular.','A mão de trás dá base para sentar.']},
 {s:3.8,e:5.6,kanji:'3',ro:'Encaixe',pt:'Braço por cima da nuca, mãos juntas',
  d:'O braço direito passa por cima da nuca de Uke, desce por fora do pescoço e volta por baixo da garganta. A mão esquerda vem por baixo e segura o punho direito. A cabeça de Uke fica presa embaixo da axila direita de Tori.',
  l:['Axila por cima da nuca, antebraço por baixo da garganta.','O cotovelo cola na lateral da cabeça de Uke.','A mão esquerda segura o punho, sem cruzar os dedos.']},
 {s:5.6,e:7.6,kanji:'4',ro:'Aperto',pt:'Fechar a guarda, deitar e esticar o quadril',
  d:'Tori fecha a guarda em volta da cintura de Uke e deita para trás levando a cabeça dele junto. Com as pernas, empurra o quadril de Uke para longe e estica o próprio quadril, enquanto puxa o antebraço para cima contra o pescoço.',
  l:['Guarda fechada impede Uke de passar.','As pernas afastam o quadril de Uke; o braço segura a cabeça.','O antebraço sobe contra a garganta, sem tranco.']},
 {s:7.6,e:10.6,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate três vezes no tatame. Tori solta na hora: abre as mãos, tira o braço do pescoço e deixa Uke levantar a cabeça.',
  l:['A batida pode ser no tatame, em Tori ou com a voz.','Soltar imediatamente é parte da técnica.','Abra as mãos antes de abrir a guarda.']}],
 rep:[.8,3.0,4.8,6.8,8.4], cover:7.2,
 views:[
  {name:'Lado da cabeça',a:-20,e:14,center:[.05,.40,.1],span:2.4},
  {name:'Diagonal',a:-125,e:40,center:[.05,.35,0],span:2.5},
  {name:'De cima',a:-90,e:88,center:[0,0,.08],span:2.5}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{uke:{pitch:48,yaw:190,h:5}}],
 [2.4,{tori:{leg:{R:W3(.30,.06,.36),L:W3(.30,.06,-.36)},arm:{R:B('o',-.10,.64,0)},pole:{legR:[1,0,.4],legL:[1,0,-.4],armR:[.2,.6,.8]}},
       uke:{x:.52,y:.42,z:.04,pitch:72,yaw:194,h:15}}],
 [3.2,{tori:{x:-.20,y:.13,pitch:20,h:25,arm:{R:B('o',-.16,.60,-.06),L:W3(-.52,.06,-.30)},pole:{armR:[.6,.4,1],armL:[-.6,0,-.6]}},
       uke:{x:.64,y:.40,z:.12,pitch:100,yaw:198,h:20,leg:{R:W3(.95,.07,-.05),L:W3(.95,.07,.32)},arm:{R:W3(.32,.06,-.04),L:W3(.38,.06,.56)},pole:{armR:[.3,0,-.9],armL:[.3,0,.9]}}}],
 [3.8,{}],
 [4.6,{tori:{pitch:35,arm:{R:maoR,L:maoL},pole:{armR:[.6,0,1],armL:[1,-.4,-.6]}},uke:{arm:{R:SL('armR',.8)},pole:{armR:[.5,0,.9]}}}],
 [5.6,{}],
 [6.6,{tori:{x:0,y:.16,pitch:-84,roll:-12,h:35,leg:{R:B('o',-.18,.04,-.05),L:B('o',-.18,.06,.05)},pole:{legR:[.5,0,1],legL:[.5,0,-1],armR:[.3,-.2,1],armL:[1,-.4,-.6]}},
       uke:{x:.14,y:.54,z:0,pitch:100,yaw:206,h:25,leg:{R:W3(.52,.07,-.12),L:W3(.52,.07,.26)},arm:{L:W3(0,.06,.55)}}}],
 [7.4,{tori:{y:.17,pitch:-80,arm:{R:maoRaperta,L:maoLaperta},pole:{armR:[.3,-.2,1]}}}],
 [7.8,{}],
 [8.0,{uke:{arm:{L:tapUp}}}],
 [8.2,{uke:{arm:{L:tapAt}}}],
 [8.45,{uke:{arm:{L:tapUp}}}],
 [8.65,{uke:{arm:{L:tapAt}}}],
 [8.9,{uke:{arm:{L:tapUp}}}],
 [9.1,{uke:{arm:{L:tapAt}}}],
 [9.5,{tori:{arm:{R:B('s',.35,.30,.40),L:B('s',.35,.25,-.35)},pole:{armR:[0,-.3,1],armL:[0,-.3,-1]}},uke:{arm:{R:B('o',.16,.22,-.02)},pole:{armR:[.4,-.4,.8]}}}],
 [10.2,{tori:{y:.15,pitch:-88,roll:0},uke:{x:.30,y:.44,pitch:75,yaw:195,h:-5}}],
 [10.6,{}]],
 /* o braço direito de Tori envolve o pescoço de propósito; as pernas fecham na cintura de Uke */
 aperto:[{s:3.0,e:9.6,limbs:['T.R.arm','T.L.arm'],tol:.12,tudo:true},{s:4.2,e:9.4,limbs:['T.R.arm'],tol:.12,tudo:true,fiel:true},
  {s:0,e:10.6,limbs:['T.R.leg','T.L.leg'],tol:.10}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.hip[0]+.1,Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.hip[2]]}),
 glow:{s:3.4,e:7.8,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:8.0,e:10.6,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('Uke abaixa a cabeça',U.head,-6,-4,C.uke,a);
  api.tag('pés cruzados nas costas',T.legR.H,8,3,C.force,a);
  a=win(t,1.8,4.0);
  api.tag('Tori senta, mão de trás apoiada',T.armL.H,-7,3,C.gold,a);
  api.tag('cabeça do lado do braço',U.head,6,-4,C.info,a);
  a=win(t,3.9,5.8);
  api.tag('axila por cima da nuca',T.armR.E,5,-4,C.force,a);
  api.tag('mão segura o punho',T.armL.H,-7,3,C.gold,a);
  a=win(t,5.8,7.8);
  api.tag('guarda fechada',T.legR.H,7,3,C.force,a);
  api.tag('antebraço sobe contra o pescoço',T.armR.H,-8,-3,C.force,a);
  a=win(t,8.0,10.6);
  api.tag('Uke bate: solte na hora',U.armL.H,6,2.5,C.uke,a);}
});})();
