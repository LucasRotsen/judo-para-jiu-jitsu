(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke ajoelhado na guarda, de frente para -x (direita de Uke = -z).
   Tori deitado de costas, cabeça para -x (yaw 180, pitch 90, roll 180 = de costas, direita = +z).
   O braço atacado é o DIREITO de Uke (lado esquerdo de Tori, -z). Referência: Lucas Lepri (YouTube VRYCMYJOn4g).
   Tori prende o braço no peito, põe o pé direito no quadril esquerdo de Uke e gira deitado: a cabeça de Tori
   vai para +z (rumo ao joelho esquerdo de Uke, yaw 180 -> 285) e o quadril sai para o lado do braço.
   No fim o corpo de Tori fica atravessado sob Uke: o ombro direito de Uke entre as coxas, o cotovelo acima
   do quadril de Tori, a perna esquerda de Tori por cima da nuca e o pé direito ainda no quadril de Uke.
   Uke tem a postura quebrada (cabeça baixa) e o quadril de Tori sobe: só assim a perna passa por cima da cabeça. */
const ukeBase={x:.34,y:.40,z:0,yaw:180,pitch:42,roll:0,h:-15,
 leg:{R:W3(.57,.07,-.17),L:W3(.57,.07,.17)},arm:{R:B('o',.14,.24,-.08),L:B('o',.14,.24,.08)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
const toriBase={x:0,y:.15,z:0,yaw:180,pitch:90,roll:180,h:30,
 leg:{R:B('o',-.26,.02,.02),L:B('o',-.26,.07,-.02)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
/* mão direita de Uke presa no peito de Tori (referencial de Tori): acompanha o giro */
const naGola=B('o',.14,.26,-.05),esticado=B('o',.18,.34,0);
const grip={R:SL('armR',.72),L:SL('armR',.93)};
const tapAt=W3(.16,.04,.34),tapUp=W3(.16,.18,.34);
const taps=[8.4,8.6,8.8,9.0,9.2,9.4].map((t,i)=>[t,{uke:{arm:{L:i%2?tapAt:tapUp}}}]);
Judo.register3d({
 id:'chave-de-braco-da-guarda', name:'Chave de braço da guarda', kanji:'', group:'ne', cls:'Jiu-jitsu · Chave de braço',
 bjj:'Chave de braço da guarda',
 why:'Para quem já sabe puxar para a guarda e trava no passo seguinte. Uke apoia as mãos no seu peito: esse braço esticado é a porta. Prenda, pé no quadril, gire e finalize.',
 summary:'Chave de braço a partir da guarda fechada. Tori prende o braço de Uke contra o peito, apoia o pé no quadril do lado oposto e gira deitado até ficar atravessado embaixo dele. A perna passa por cima da cabeça, os joelhos fecham no braço e o quadril sobe.',
 reading:[{k:'Armlock',r:'chave de braço',m:'hiperextensão do cotovelo'}],
 facts:[['Depois de puxar para a guarda','Puxar para a guarda é só o começo. Com a guarda fechada, Uke quase sempre apoia as mãos no seu peito ou segura a gola para se proteger. Cada mão apoiada é um braço que você pode prender.'],
  ['O giro','Tori não fica reto embaixo de Uke. O pé no quadril é o apoio para girar: a cabeça de Tori vai para o lado do joelho oposto de Uke e o quadril sai para o lado do braço preso.'],
  ['Alavanca','O cotovelo de Uke fica acima do quadril de Tori, com o polegar para cima. As mãos seguram o punho no peito e o quadril sobe: é ele que estende o cotovelo.'],
  ['Mesma família','É a juji-gatame do judô, só que saindo de baixo. Se Uke defende puxando o braço, o mesmo giro abre o triângulo e a omoplata.']],
 errors:[['Ficar reto embaixo','Sem girar o quadril, a perna não passa por cima da cabeça e o cotovelo fica abaixo do quadril. Gire até ficar atravessado.'],
  ['Soltar o braço para girar','Se as mãos largam o punho durante o giro, Uke recolhe o braço. Prenda primeiro, gire depois.'],
  ['Perna solta na cabeça','Se a perna esquerda não pesa na nuca, Uke levanta a postura e empilha Tori. Os calcanhares puxam Uke para baixo.'],
  ['Polegar para baixo','Com o polegar de Uke para baixo, a força escapa para o ombro. O polegar aponta para cima antes de subir o quadril.']],
 safety:['O cotovelo machuca antes de doer muito: suba o quadril devagar e solte na primeira batida.',
  'Nunca dê tranco no final. A pressão aumenta aos poucos, sempre.',
  'Quem recebe bate cedo e não tenta girar o braço para fora com força. Pratique com um professor por perto.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.peR',de:'U.quadril',lado:'esquerda',s:3.8,e:5.4,min:.0,txt:'o pé direito de Tori vai no quadril ESQUERDO de Uke'},
  {c:'lado',a:'T.cabeca',de:'U.quadril',lado:'esquerda',s:5.8,e:'fim',min:.1,txt:'Tori gira: a cabeça vai para o lado do joelho esquerdo de Uke'},
  {c:'contato',a:'T.canelaL',b:'U.pescoco',s:6.0,e:'fim',txt:'a perna esquerda de Tori passa por cima da nuca de Uke'},
  {c:'longe',a:'T.canelaR',b:'U.tronco',s:5.4,e:'fim',min:-.10,txt:'a canela direita de Tori não atravessa o tronco de Uke (fica no quadril, por baixo)'},
  {c:'longe',a:'T.canelaL',b:'U.cabeca',s:5.4,e:'fim',min:-.10,txt:'a perna esquerda passa POR CIMA da cabeça de Uke, não por dentro'}],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Guarda fechada',pt:'Uke apoia as mãos no peito',
  d:'Você puxou para a guarda e fechou as pernas nas costas de Uke. Para não ser puxado, ele apoia as mãos no seu peito e segura a gola. Esse braço apoiado é o alvo.',
  l:['Pernas cruzadas nas costas de Uke.','Mão de Uke no peito ou na gola: é a porta.','Escolha o braço: aqui, o direito de Uke.']},
 {s:1.8,e:3.6,kanji:'2',ro:'Prender',pt:'As duas mãos no braço',
  d:'Tori segura o punho direito de Uke com a mão esquerda e o antebraço com a direita, e cola esse braço no próprio peito. Os joelhos puxam Uke para baixo para ele não recolher o braço.',
  l:['Duas mãos no mesmo braço.','O punho de Uke fica colado no peito de Tori.','Joelhos puxam: Uke não levanta a postura.']},
 {s:3.6,e:5.4,kanji:'3',ro:'Pé no quadril',pt:'Abrir a guarda e girar',
  d:'Tori abre a guarda e apoia o pé direito no quadril esquerdo de Uke, do lado oposto ao braço preso. Usando o pé como apoio, gira deitado: o quadril sai para o lado do braço e a cabeça vai rumo ao joelho esquerdo de Uke. A perna esquerda sobe alta nas costas dele.',
  l:['Pé no quadril do lado oposto ao braço.','Girar, não ficar reto embaixo de Uke.','A cabeça vai rumo ao joelho do outro lado.']},
 {s:5.4,e:7.6,kanji:'4',ro:'Perna na cabeça',pt:'Atravessado embaixo de Uke',
  d:'A perna esquerda de Tori passa por cima da cabeça de Uke e pesa na nuca, o pé direito segue no quadril controlando a distância, e os joelhos fecham no braço. Tori está atravessado embaixo de Uke, com o ombro dele entre as coxas e o cotovelo acima do quadril.',
  l:['Perna esquerda por cima da cabeça, puxando para baixo.','Joelhos fechados no braço.','Cotovelo de Uke acima do quadril de Tori.']},
 {s:7.6,e:11,kanji:'極め',ro:'Kime',pt:'Polegar para cima e subir o quadril',
  d:'Com o polegar de Uke apontando para cima, Tori segura o punho no peito e sobe o quadril devagar. O cotovelo é estendido sobre o quadril. Uke bate três vezes e Tori solta na hora.',
  l:['Polegar de Uke para cima.','As mãos seguram o punho, o quadril sobe.','Bateu, soltou. Sem exceção.']}],
 rep:[.9,2.8,4.6,6.6,9.0], cover:8.0,
 views:[
  {name:'Por cima, pelas costas de Uke',a:-90,e:35,center:[0,.3,0],span:2.6},
  {name:'Pela cabeça de Tori',a:15,e:35,center:[-.05,.3,0],span:2.6},
  {name:'De cima',a:0,e:88,center:[.05,0,.05],span:2.8}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 /* as duas mãos de Tori no braço direito de Uke; os joelhos puxam Uke um pouco para baixo */
 [2.6,{tori:{arm:grip,pole:{armR:[.2,-1,.4],armL:[.2,-1,-.4]}},uke:{pitch:50,h:-10,arm:{R:naGola,L:B('o',.12,-.06,.17)}}}],
 [3.6,{}],
 /* abre a guarda: pé direito no quadril esquerdo de Uke, perna esquerda alta nas costas, do lado do braço */
 [4.1,{tori:{leg:{R:B('o',.06,.02,-.20),L:B('o',-.12,.38,.24)},pole:{legR:[1,.3,.6],legL:[1,.2,-.4]}}}],
 /* o giro começa: a cabeça de Tori vai para +z, o quadril sai para o lado do braço */
 [4.8,{tori:{z:-.05,yaw:225,leg:{R:B('o',.06,.02,-.20),L:B('o',-.15,.50,.18)}},uke:{pitch:58,h:5}}],
 [5.4,{}],
 /* a mão esquerda de Uke sai da cintura de Tori por fora, antes do giro passar por ela */
 [5.7,{uke:{arm:{L:W3(.30,.28,.26)},pole:{armL:[-.7,.2,-.7]}}}],
 /* a perna esquerda sobe alta e passa por cima da cabeça de Uke, sem raspar nela */
 [5.9,{tori:{leg:{L:W3(-.26,.94,-.04)},pole:{legL:[.6,-1,-.3]}}}],
 /* perna esquerda por cima da cabeça, pé direito no quadril; Uke quebra a postura e o quadril de Tori sobe */
 [6.1,{tori:{x:-.10,y:.22,z:-.14,yaw:285,leg:{L:W3(-.14,.78,.16),R:W3(.55,.25,.22)},pole:{legL:[.3,-1,0],legR:[.5,.3,1]}},
       uke:{x:.40,pitch:84,h:40,arm:{L:tapAt},leg:{R:W3(.64,.07,-.17),L:W3(.64,.07,.17)},pole:{armL:[-.2,-.5,-1],legR:[1,-.2,.1],legL:[1,-.2,-.1]}}}],
 [6.8,{tori:{leg:{L:W3(-.14,.54,.16),R:W3(.55,.25,.22)}},uke:{pitch:94,h:50}}],
 [7.6,{}],
 /* polegar para cima, quadril sobe devagar */
 [8.3,{tori:{y:.22},uke:{arm:{R:esticado}}}],
 ...taps,
 [10.0,{}],
 [11,{tori:{y:.15},uke:{arm:{R:naGola}}}]],
 /* as pernas de Tori pesam na nuca e nas costas de Uke, e o braço dele fica preso entre as coxas, de propósito */
 aperto:[{s:4.0,e:5.6,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true},{s:5.6,e:11,limbs:['T.R.leg'],tol:.10,tudo:true},{s:5.6,e:11,limbs:['T.L.leg'],tol:.10,tudo:true,fiel:true},{s:1.8,e:11,limbs:['U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.30,F.tori.head[2]],uke:[F.uke.hip[0]+.15,F.uke.hip[1]+.42,F.uke.hip[2]]}),
 glow:{s:3.6,e:9.6,limbs:{'T.L.leg':'force','T.R.leg':'force','U.R.arm':'gold'}},
 stamp:{s:8.6,e:10.6,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('mãos no peito: braço exposto',U.armR.H,-7,3.2,C.info,a);
  api.tag('pernas cruzadas nas costas',T.legR.H,-7,-3,C.force,a);
  a=win(t,1.8,3.7);
  api.tag('duas mãos no mesmo braço',T.armL.H,-7,-3,C.force,a);
  a=win(t,3.6,5.5);
  api.tag('pé no quadril do lado oposto',T.legR.H,7,3,C.force,a);
  api.tag('cabeça vai rumo ao joelho',T.head,5,3.4,C.force,win(t,4.4,5.5));
  a=win(t,5.4,7.7);
  api.tag('perna por cima da cabeça',T.legL.E,-4,-3.4,C.force,a);
  api.tag('cotovelo acima do quadril',U.armR.E,7,3,C.gold,win(t,6.2,7.7));
  a=win(t,7.7,10.4);
  api.arrow(api.add(T.hip,[0,.02,0]),api.add(T.hip,[0,.24,0]),C.force,a);
  api.tag('quadril sobe devagar',api.add(T.hip,[0,.24,0]),6,-2,C.force,a,false);
  api.tag('polegar para cima',U.armR.H,-6,-2,C.gold,a);}
});})();
