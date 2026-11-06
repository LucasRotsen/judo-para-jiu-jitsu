(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Os dois sentados olhando para +x; direita dos dois = +z.
   Uke sentado entre as pernas de Tori, recostado no peito dele. Tori estrangula com o braço direito,
   a mão direita segura o bíceps esquerdo e a mão esquerda vai atrás da cabeça de Uke (figura-4). */
const ukeBase={x:.45,y:.13,z:0,yaw:0,pitch:-20,h:10,
 leg:{R:W3(1.08,.05,.26),L:W3(1.08,.05,-.26)},arm:{R:SL('armR',.86),L:SL('armR',.66)},
 pole:{legR:[.3,1,.25],legL:[.3,1,-.25],armR:[.3,-.8,.6],armL:[.3,-.8,-.6]}};
const toriBase={x:.15,y:.13,z:.06,yaw:0,pitch:-6,roll:0,h:5,
 leg:{R:W3(.74,.17,.06),L:W3(.74,.17,-.06)},
 arm:{R:B('o',.17,.36,-.08),L:B('o',.17,.27,-.02)},
 pole:{legR:[0,1,1.3],legL:[0,1,-1.3],armR:[.1,.6,.8],armL:[.2,-.8,-.5]}};
const tapAt=W3(.42,.37,.34),tapUp=W3(.45,.50,.37);
const taps=[8.0,8.2,8.4,8.6,8.8,9.0].map((t,i)=>[t,{uke:{arm:{R:i%2?tapUp:tapAt}}}]);
Judo.register3d({
 id:'hadaka-jime', name:'Hadaka Jime', kanji:'裸絞',
 cls:'Ne-waza · Shime-waza', group:'ne', first:'tori',
 bjj:'Mata-leão',
 why:'O estrangulamento mais famoso do jiu-jitsu, em três ângulos sincronizados para ver a figura-4 dos braços fechar.',
 summary:'Estrangulamento sem usar o gi. Tori, nas costas de Uke com os ganchos, passa o braço em volta do pescoço, fecha a figura-4 e aperta. É o mata-leão do jiu-jitsu.',
 reading:[{k:'裸',r:'hadaka',m:'nu, sem o gi'},{k:'絞',r:'jime',m:'estrangulamento'}],
 facts:[['Grupo','Katame-waza › Shime-waza (estrangulamentos)'],['Pegada','Sem gi: o braço faz todo o trabalho, por isso vale também no no-gi e no MMA'],
  ['Ponto de pressão','As laterais do pescoço (artérias carótidas). A dobra do cotovelo fica na frente da garganta e não esmaga a traqueia.'],
  ['No jiu-jitsu','Mata-leão. Sai das costas com os dois ganchos e o cinto de segurança. Nas costas, os ganchos já somam pontos.']],
 errors:[['Antebraço na traqueia','Apertar a frente da garganta dói, mas não finaliza e machuca. A dobra do cotovelo fica sob o queixo e os lados do braço fazem a pressão.'],
  ['Cruzar os pés','Com os tornozelos cruzados na frente de Uke, ele pode travar seus pés e fazer uma chave de pé.'],
  ['Distância do peito','Espaço entre o peito de Tori e as costas de Uke deixa ele escorregar para baixo e escapar.'],
  ['Mão no antebraço','Segurar o antebraço em vez do bíceps deixa a trava frouxa. A mão vai fundo, até o bíceps.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'Aplique devagar no treino. O estrangulamento sanguíneo leva à perda de consciência em segundos.',
  'Pratique só com orientação de um professor qualificado.'],
 phases:[
 {s:0,e:2.2,kanji:'後',ro:'Costas',pt:'Ganchos e cinto de segurança',
  d:'Tori está sentado atrás de Uke, peito colado nas costas dele. Os calcanhares entram por dentro das coxas de Uke (ganchos) e os braços fecham o cinto de segurança: o direito por cima do ombro, o esquerdo por baixo da axila.',
  l:['Ganchos por dentro das coxas, nunca com os pés cruzados.','Peito colado: as costas de Uke não podem desgrudar.','O cinto de segurança controla os ombros antes do pescoço.']},
 {s:2.2,e:4.4,kanji:'絞',ro:'Encaixe',pt:'Braço em volta do pescoço',
  d:'O braço direito, que estava por cima do ombro, envolve o pescoço. A dobra do cotovelo fica bem na frente da garganta, embaixo do queixo de Uke, com o bíceps de um lado do pescoço e o antebraço do outro.',
  l:['Cotovelo alinhado com o queixo de Uke.','Uke luta pelo pulso, por isso o encaixe é rápido.','A cabeça de Tori cola na cabeça de Uke, do lado do braço que estrangula.']},
 {s:4.4,e:6.0,kanji:'固',ro:'Trava',pt:'Figura-4',
  d:'A mão direita agarra o bíceps do braço esquerdo. A mão esquerda vai para trás da cabeça de Uke. Os dois braços formam um “4” que não deixa o estrangulamento abrir.',
  l:['Mão no bíceps, não no antebraço.','A mão de trás empurra a cabeça para frente.','Os ganchos seguem firmes durante a troca.']},
 {s:6.0,e:7.9,kanji:'締',ro:'Aperto',pt:'Peito expande, cotovelos fecham',
  d:'Tori aperta expandindo o peito para frente e trazendo os cotovelos um em direção ao outro. A pressão vem dos lados do pescoço, nas artérias carótidas.',
  l:['Aperto progressivo, nunca um tranco.','Expandir o peito vale mais do que puxar para trás.','A cabeça de Tori segue colada à de Uke.']},
 {s:7.9,e:10.5,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate na perna de Tori (maitta, “desisto”). No judô isso vale ippon. Tori solta na hora e abre o braço.',
  l:['A batida pode ser na perna, no braço ou no tatame.','Soltar imediatamente é parte da técnica.','Uke volta a respirar normalmente em instantes.']}],
 rep:[1.1,3.3,5.2,7.2,8.7], cover:6.8,
 views:[
  {name:'Frente',a:80,e:14,center:[.42,.58,.24],span:2.0,bias:{'T.R.arm':.15}},
  {name:'Lado esquerdo',a:150,e:28,center:[.42,.62,-.05],span:2.0,bias:{'T.R.arm':.1}},
  {name:'Por trás',a:-120,e:45,center:[.38,.45,0],span:2.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [2.2,{}],
 [3.0,{tori:{arm:{R:B('o',.18,.52,-.04)},pole:{armR:[.6,.5,.4]}},uke:{h:14}}],
 [3.7,{tori:{z:.09,yaw:34,roll:0,h:22,arm:{R:B('o',-.04,.63,-.19)},pole:{armR:[1,.35,-.3]}},uke:{h:4}}],
 [4.4,{}],
 [5.2,{tori:{arm:{R:B('o',-.05,.64,-.17),L:B('o',-.05,.77,-.04)},pole:{armL:[1.6,.2,-.5]}},uke:{arm:{R:SL('armR',.9),L:SL('armR',.98)},pole:{armR:[.3,-1,.2],armL:[.5,-1,0]}}}],
 [6.0,{}],
 [7.0,{tori:{pitch:-9,arm:{R:B('o',-.03,.62,-.16)}},uke:{pitch:-22,h:6}}],
 [7.9,{}],
 ...taps,
 [9.5,{tori:{pitch:-4,roll:0,h:5,arm:{R:B('o',.15,.30,.12),L:B('o',.10,.20,-.15)},pole:{armR:[.1,.4,.9],armL:[.2,-.8,-.5]}},
       uke:{pitch:-14,h:0,arm:{R:B('s',.25,.20,.18),L:B('s',.25,.20,-.18)}}}],
 [10.5,{}]],
 names:F=>({tori:[F.tori.head[0]-.05,F.tori.head[1]+.2,F.tori.head[2]+.05],uke:[F.uke.legL.E[0],F.uke.legL.E[1]+.14,F.uke.legL.E[2]]}),
 glow:{s:2.2,e:6.2,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:8.0,e:10.5,big:'一本',small:'MAITTA'},
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,2.4);
  api.tag('ganchos por dentro das coxas',T.legR.H,6,3,C.force,a);
  api.tag('cinto de segurança',T.armR.E,5,-4,C.force,a);
  a=win(t,2.6,4.6);
  api.tag('dobra do cotovelo sob o queixo',T.armR.E,6,-3.5,C.force,a);
  api.tag('Uke luta pelo pulso',U.armR.H,7,2.5,C.uke,a);
  a=win(t,4.6,6.2);
  api.tag('mão no bíceps',T.armR.H,-9,-2,C.force,a);
  api.tag('mão atrás da cabeça',T.armL.H,-6,-4.5,C.gold,a);
  a=win(t,6.1,8.0);
  api.tag('peito expande',api.bp(U,-.12,.36,.1),-9,1.5,C.force,a);
  api.tag('cotovelos fecham',T.armR.E,6,-3,C.force,a);
  a=win(t,8.0,10.6);
  api.tag('Uke bate: solte na hora',U.armR.H,7,2,C.uke,a);}
});})();
