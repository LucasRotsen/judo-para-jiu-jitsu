(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori fica do lado DIREITO de Uke (+z), de frente para ele (yaw ~90: frente de Tori = -z, direita de Tori = +x, os pés de Uke).
   Como no vídeo da Kodokan (TT7XJVSEQxA): Tori ajoelha junto ao lado direito de Uke, deita o peito atravessado sobre o
   peito dele, passa o braço esquerdo por baixo do pescoço (mão na gola esquerda, atrás do ombro) e o direito entre as
   pernas de Uke (mão na faixa). O braço direito de Uke fica esticado no tatame, por fora, do lado de Tori.
   Para girar Uke sobre a própria coluna (virar de lado para Tori) usamos roll com pitch -90: roll + vira o peito para +z. */
const ukeBase={x:.30,y:.13,z:0,yaw:0,pitch:-90,roll:0,h:-8,gf:0,
 leg:{R:W3(1.14,.07,.19),L:W3(1.14,.07,-.19)},arm:{R:W3(.08,.06,.34),L:W3(.08,.06,-.34)},
 pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[.2,.3,1],armL:[.2,.3,-1]}};
const toriBase={x:0,y:.55,z:.74,yaw:90,pitch:4,roll:0,h:10,gf:1,
 leg:{R:W3(.14,.05,1.14),L:W3(-.14,.05,1.14)},arm:{R:B('s',.18,.04,.16),L:B('s',.18,.04,-.16)},
 pole:{legR:[1,-.2,.2],legL:[1,-.2,-.2],armR:[-.3,-1,.4],armL:[-.3,-1,-.4]}};
/* pegadas: mão esquerda por baixo do pescoço até a gola esquerda de Uke; mão direita entre as pernas, na faixa */
const nuca=B('o',-.05,.55,-.12), virilha=B('o',.0,-.20,-.03);
/* braço direito de Uke esticado no tatame, por fora, um pouco para o lado da cabeça */
const ukeArmOut=W3(-.58,.06,.56);
/* Tori deitado atravessado: peito sobre o peito de Uke, joelhos no tatame colados no lado direito dele */
const pin={x:.05,y:.38,z:.45,yaw:90,pitch:92,h:-10,
 leg:{R:W3(.30,.05,.68),L:W3(-.20,.05,.68)},arm:{L:nuca,R:virilha},
 pole:{legR:[1,1,.15],legL:[1,1,-.15],armL:[.4,-.5,-1],armR:[.6,-.3,1]}};
/* pernas abertas para trás (variação do vídeo): quadril baixo, peso todo no peito */
const sprawl={x:.05,y:.30,z:.48,pitch:98,
 leg:{R:W3(.52,.05,1.26),L:W3(-.36,.05,1.30)},pole:{legR:[.3,-1,.4],legL:[.3,-1,-.4]}};
Judo.register3d({
 id:'yoko-shiho-gatame', name:'Yoko Shiho Gatame', kanji:'横四方固', group:'ne', cls:'Ne-waza · Osaekomi-waza',
 bjj:'Cem quilos (controle lateral)',
 why:'A imobilização lateral que o jiu-jitsu chama de cem quilos: peito atravessado no peito de Uke, um braço por baixo do pescoço e o outro entre as pernas.',
 summary:'Imobilização pelo lado. Tori deita o peito atravessado sobre o peito de Uke, passa o braço esquerdo por baixo do pescoço e o direito entre as pernas dele. Quando Uke vira de lado para repor a guarda, Tori fecha o quadril com o braço e o joelho, abre as pernas e achata Uke de novo.',
 reading:[{k:'横',r:'yoko',m:'de lado'},{k:'四方',r:'shiho',m:'quatro direções'},{k:'固',r:'gatame',m:'imobilização'}],
 facts:[['Grupo','Ne-waza (luta de solo) › Osaekomi-waza (imobilizações)'],
  ['Pontuação no judô','Pelas regras atuais da IJF, 10 segundos de osaekomi valem waza-ari e 20 segundos valem ippon.'],
  ['Pegadas','Mão esquerda por baixo do pescoço, na gola do outro lado. Mão direita entre as pernas, na faixa. Variação comum: a mão direita no quadril ou na faixa por cima.'],
  ['No jiu-jitsu','É o cem quilos, ou controle lateral. Nas regras da IBJJF, passar a guarda e estabilizar aqui vale 3 pontos. Dele saem a montada, o joelho na barriga, a kimura e o norte-sul.']],
 errors:[['Quadril alto','Com o quadril no ar o peso sai do peito de Uke e sobra espaço para ele virar e colocar o joelho.'],
  ['Braço de baixo solto','Se o braço entre as pernas não fecha o quadril, Uke vira de lado e repõe a guarda.'],
  ['Joelhos longe','Joelhos afastados do corpo de Uke deixam o vão onde entra o joelho dele.'],
  ['Brigar parado','Quando Uke vira, Tori acompanha: abre as pernas e baixa o quadril, em vez de só segurar com os braços.']],
 safety:['Peso no peito sim, antebraço cravado na garganta de Uke não.',
  'Uke bate (maitta) se sentir falta de ar. Tori alivia na hora.',
  'Treine a fuga e o bloqueio devagar, aumentando a resistência aos poucos.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.quadril',de:'U.tronco',lado:'direita',s:1.6,e:'fim',min:.15,txt:'Tori fica do lado DIREITO de Uke'},
  {c:'contato',a:'T.peito',b:'U.peito',s:3.8,e:5.4,txt:'osaekomi: o peito de Tori atravessado sobre o peito de Uke'},
  {c:'contato',a:'T.antebracoL',b:'U.pescoco',s:3.8,e:'fim',txt:'o braço esquerdo de Tori passa por baixo do pescoço de Uke'},
  {c:'contato',a:'T.maoR',b:'U.quadril',s:3.8,e:'fim',txt:'a mão direita de Tori entra entre as pernas de Uke, na faixa'}],
 phases:[
 {s:0,e:1.6,kanji:'姿勢',ro:'Shisei',pt:'Posição de partida',
  d:'Uke está de costas no tatame. Tori ajoelha junto ao lado direito dele, de frente para Uke, com o tronco ereto.',
  l:['Tori chega pelo lado, não pela cabeça nem pelas pernas.','Joelhos perto do corpo de Uke.','Os olhos já procuram o pescoço e o quadril de Uke.']},
 {s:1.6,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'Entrada',
  d:'Tori se inclina, passa o braço esquerdo por baixo do pescoço de Uke e segura a gola do outro lado. O braço direito passa entre as pernas de Uke e segura a faixa. O peito desce atravessado sobre o peito de Uke.',
  l:['Braço esquerdo por baixo do pescoço, mão na gola esquerda de Uke.','Braço direito entre as pernas, mão na faixa.','O braço direito de Uke fica esticado no tatame, por fora.']},
 {s:3.6,e:5.4,kanji:'抑込',ro:'Osaekomi',pt:'Encaixe',
  d:'Tori deixa o peso cair pelo peito sobre o peito de Uke, perpendicular a ele, com os joelhos no tatame colados no lado direito de Uke. A cabeça de Tori fica baixa, do lado esquerdo de Uke.',
  l:['Peito no peito, atravessado.','Joelhos colados: um no ombro, outro no quadril de Uke.','O peso vem do peito, não dos braços.']},
 {s:5.4,e:7.8,kanji:'受',ro:'Fuga',pt:'Uke tenta repor a guarda',
  d:'Uke vira de lado para Tori, dobra as pernas e tenta enfiar o joelho direito no vão entre os dois. Tori fecha o quadril: o braço direito entre as pernas trava a coxa, o joelho direito cola no quadril de Uke e as pernas abrem para trás, baixando o quadril.',
  l:['Uke precisa de espaço para o joelho entrar.','Braço e joelho de Tori fecham o quadril de Uke.','Pernas abertas para trás, quadril baixo, peito pesado.']},
 {s:7.8,e:10.6,kanji:'残心',ro:'Zanshin',pt:'Controle mantido',
  d:'Sem espaço, Uke volta a ficar de costas e achatado. Tori segue atravessado sobre o peito dele, pernas abertas e quadril baixo, pronto para trocar para a montada ou para o joelho na barriga.',
  l:['O controle é do quadril de Tori, não da força dos braços.','Pelas regras da IJF, 20 segundos assim valem ippon.','No jiu-jitsu, daqui saem montada, kimura e norte-sul.']}],
 rep:[.8,2.8,4.6,6.6,9.4], cover:4.6,
 views:[
  {name:'Pelo lado esquerdo de Uke',a:140,e:30,center:[.15,.5,.25],span:3.3},
  {name:'Pelas costas de Tori',a:15,e:14,center:[.15,.45,.3],span:3.1},
  {name:'De cima',a:-90,e:88,center:[.2,0,.3],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* inclina e prepara: a mão esquerda leva o braço direito de Uke para fora */
 [2.3,{tori:{z:.62,y:.50,pitch:40,h:15,arm:{L:B('o',.05,.42,.30),R:B('o',.12,.0,.14)},pole:{armL:[.5,-.5,-.6],armR:[.5,-.5,.6]}},
       uke:{arm:{R:W3(-.30,.10,.52)},pole:{armR:[-.2,-1,.3]}}}],
 [3.0,{tori:{x:.03,z:.50,y:.44,pitch:75,h:0,leg:{R:W3(.32,.05,.80),L:W3(-.22,.05,.82)},arm:{L:B('o',-.02,.55,.06),R:B('o',.05,-.18,.08)},
        pole:{legR:[1,.4,.3],legL:[1,.4,-.3]}},
       uke:{arm:{R:ukeArmOut,L:W3(-.02,.08,-.36)}}}],
 [3.6,{tori:pin,uke:{h:-14}}],
 [4.2,{uke:{arm:{L:B('o',-.14,.44,-.24)},pole:{armL:[.3,.6,-1]}}}],
 [5.4,{}],
 /* Uke vira de lado para Tori, recolhe as pernas e traz o joelho direito para o vão */
 [6.0,{uke:{z:-.06,roll:25,h:-10,leg:{R:W3(.80,.07,.22),L:W3(.86,.07,-.18)},pole:{legR:[1,0,.3],legL:[1,0,-.2]}}}],
 [6.6,{uke:{z:-.11,roll:45,leg:{R:W3(.64,.12,.30),L:W3(.84,.07,-.10)},pole:{legR:[1,-.3,.3]}},
       tori:{x:.06,y:.34,z:.38,pitch:95,leg:{R:W3(.36,.05,.58)},pole:{legR:[1,1.2,.3]}}}],
 /* Tori fecha o quadril e abre as pernas para trás: Uke volta de costas */
 [7.2,{uke:{z:-.03,roll:18,leg:{R:W3(.80,.07,.22)}},tori:sprawl}],
 [7.8,{uke:{z:0,roll:0,h:-12,leg:{R:W3(1.08,.07,.20),L:W3(1.10,.07,-.20)},pole:{legR:[1,0,.1],legL:[1,0,-.1]}}}],
 [10.6,{}]],
 aperto:[{s:2.6,e:10.6,limbs:['T.L.arm','T.R.arm'],tol:.12,tudo:true},{s:3.4,e:10.6,limbs:['T.R.leg','T.L.leg'],tol:.08,tudo:true},
  {s:3.4,e:10.6,limbs:['U.R.arm'],tol:.08,tudo:true}],
 names:F=>({tori:[F.tori.hip[0],F.tori.hip[1]+.4,F.tori.hip[2]+.2],uke:[F.uke.legL.H[0]-.15,F.uke.legL.H[1]+.15,F.uke.legL.H[2]-.15]}),
 glow:{s:1.8,e:7.8,limbs:{'T.L.arm':'force','T.R.arm':'force'}},
 stamp:{s:8.0,e:10.6,big:'抑込',small:'OSAEKOMI'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('Tori pelo lado direito de Uke',T.legR.E,5,2,C.force,a);
  api.tag('Uke de costas',U.legL.E,4,4,C.uke,a);
  a=win(t,1.7,3.7);
  api.tag('braço por baixo do pescoço',T.armL.E,-7,-1,C.force,a);
  api.tag('braço entre as pernas',T.armR.H,6,3,C.force,a);
  a=win(t,3.7,5.5);
  api.tag('peito no peito, atravessado',api.bp(T,.12,.38,0),3,-7,C.force,a);
  api.tag('joelhos colados no lado de Uke',T.legR.E,5,4,C.force,a);
  a=win(t,5.5,7.0);
  api.arrow(U.legR.E,api.add(U.legR.E,[-.1,0,.2]),C.uke,a);
  api.tag('Uke vira e tenta pôr o joelho',U.legR.E,4,-5,C.uke,a);
  a=win(t,6.4,7.9);
  api.tag('braço e joelho fecham o quadril',T.armR.E,5,-4,C.force,a);
  api.arrow(T.legR.H,api.add(T.legR.H,[.08,0,.25]),C.force,win(t,6.6,7.6));
  a=win(t,7.9,99);
  api.tag('quadril baixo, pernas abertas',T.legL.E,-4,4,C.force,a);
  api.tag('Uke achatado de costas',U.head,5,4,C.uke,a);}
});})();
