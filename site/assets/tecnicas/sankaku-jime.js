(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori deitado de costas, cabeça para -x, quadril perto da origem; direita de Tori = +z.
   Uke ajoelhado na guarda, de frente para Tori (yaw 180); direita de Uke = -z.
   Braço direito de Uke fica DENTRO, o esquerdo FORA. A perna direita de Tori passa sobre o ombro esquerdo de Uke. */
const ukeBase={x:.42,y:.40,z:0,yaw:180,pitch:35,h:-20,
 leg:{R:W3(.57,.07,-.17),L:W3(.57,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-90,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:SL('armL',.9),L:SL('armR',.9)},
 pole:{legR:[-.25,.75,1],legL:[0,.25,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
const tapAt=B('o',.16,-.12,.27),tapUp=B('o',.30,-.12,.27);
Judo.register3d({
 id:'sankaku-jime', name:'Sankaku Jime', kanji:'三角絞', group:'ne', cls:'Ne-waza · Shime-waza',
 bjj:'Triângulo',
 why:'A finalização de guarda mais clássica do jiu-jitsu, em três ângulos sincronizados para ver as pernas fecharem o “4”.',
 summary:'Estrangulamento com as pernas a partir da guarda. Um braço de Uke fica dentro e o outro fora. A coxa de Tori fecha um lado do pescoço e o próprio ombro de Uke fecha o outro.',
 reading:[{k:'三角',r:'sankaku',m:'triângulo'},{k:'絞',r:'jime',m:'estrangulamento'}],
 facts:[['Grupo','Katame-waza › Shime-waza (estrangulamentos)'],
  ['A regra de ouro','Um braço dentro, um braço fora. Com os dois dentro, Uke se defende; com os dois fora, não há estrangulamento.'],
  ['Qual perna sobe','A do lado do braço de fora. Aqui o braço esquerdo de Uke está fora, então a perna direita de Tori passa sobre o ombro esquerdo dele.'],
  ['No jiu-jitsu','Sai da guarda fechada, da guarda aberta e da montada. A mesma trava de pernas abre a chave de braço e o omoplata.']],
 errors:[['Os dois braços dentro','Sem um braço fora, o ombro de Uke não fecha o pescoço e ele empurra para escapar.'],
  ['Canela nas costas, não na nuca','Se a canela cai nas costas, a perna que trava fica longa e o triângulo abre. A canela atravessa a nuca.'],
  ['Ficar reto embaixo de Uke','Sem angular o quadril, o triângulo aperta pouco. Tori gira para o lado do braço de fora.'],
  ['Puxar só com os braços','O aperto vem de fechar os joelhos e subir o quadril. As mãos apenas puxam a cabeça para baixo.']],
 safety:['Solte imediatamente quando o parceiro bater na perna, no corpo ou no tatame, ou disser “bati”.',
  'Aperte de forma progressiva. Um estrangulamento sanguíneo leva segundos para fazer efeito.',
  'Pratique a trava sem apertar. O aperto completo só com um professor por perto.'],
 phases:[
 {s:0,e:1.2,kanji:'組み手',ro:'Guarda fechada',pt:'Controle dos punhos',
  d:'Tori está de costas com as pernas cruzadas nas costas de Uke. Uke apoia as mãos na barriga de Tori para manter a postura, e Tori controla os dois punhos.',
  l:['Os tornozelos ficam cruzados atrás das costas de Uke.','Tori segura os punhos, não as mangas soltas.','Uke ereto é Uke seguro. O primeiro trabalho é quebrar essa postura.']},
 {s:1.2,e:3.4,kanji:'崩し',ro:'Kuzushi',pt:'Quebrar a postura',
  d:'Tori puxa Uke para baixo com os joelhos e prende o punho direito dele na própria barriga (braço dentro). Com a outra mão, empurra o punho esquerdo de Uke para fora, até o tatame (braço fora).',
  l:['Um braço dentro, um braço fora: é a condição do triângulo.','Os joelhos puxam Uke para a frente e quebram a postura.','O braço de fora fica longe do quadril de Tori.']},
 {s:3.4,e:5.2,kanji:'入り',ro:'Entrada',pt:'Perna sobre o ombro',
  d:'Tori abre a guarda e apoia o pé esquerdo no quadril de Uke para criar ângulo. A perna direita sobe por cima do ombro esquerdo de Uke, o do braço de fora, e a canela cai atravessada na nuca.',
  l:['A perna que sobe é a do lado do braço de fora.','A canela atravessa a nuca de Uke, não as costas.','O quadril de Tori sobe para encurtar a distância.']},
 {s:5.2,e:7.4,kanji:'三角',ro:'Sankaku',pt:'Fechar o triângulo',
  d:'Tori leva a perna esquerda por cima e encaixa a dobra do joelho esquerdo sobre o tornozelo direito, formando um “4” com as pernas. A mão esquerda segura o punho direito de Uke dentro do triângulo.',
  l:['A dobra do joelho trava o tornozelo, como um cadeado.','Visto de cima, as pernas desenham um triângulo em volta do pescoço e do ombro.','O braço de dentro fica preso contra o próprio pescoço de Uke.']},
 {s:7.4,e:10.6,kanji:'絞め',ro:'Shime',pt:'Apertar e finalizar',
  d:'Tori puxa a cabeça de Uke para baixo, fecha os joelhos e sobe o quadril. A coxa direita de Tori aperta um lado do pescoço e o ombro de Uke aperta o outro. Uke bate e Tori solta na hora.',
  l:['Puxar a cabeça e apertar os joelhos ao mesmo tempo.','O estrangulamento é sanguíneo: as carótidas são fechadas dos dois lados.','Bateu, soltou. Sem exceção.']}],
 rep:[.6,2.6,4.8,6.6,9.0], cover:6.6,
 views:[
  {name:'Diagonal',a:-55,e:32,center:[.1,.35,0],span:2.5},
  {name:'Lateral',a:0,e:8,center:[.2,.5,0],span:2.9},
  {name:'De cima',a:-90,e:90,center:[-.05,0,.05],span:2.7}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.2,{}],
 [2.4,{uke:{x:.38,y:.40,pitch:58,h:5,leg:{R:W3(.53,.07,-.17),L:W3(.53,.07,.17)},arm:{R:B('o',.12,.08,-.06),L:W3(-.12,.14,.32)}}}],
 [3.4,{}],
 [3.8,{tori:{leg:{R:B('o',.05,.30,-.42)},pole:{legR:[.3,.6,1]}}}],
 [4.2,{tori:{y:.20,pitch:-98,leg:{R:B('o',-.04,.62,-.22),L:B('o',.05,.05,.22)},arm:{R:B('o',.05,.30,-.20)},pole:{legR:[.6,0,1],legL:[.3,0,-1]}},
       uke:{x:.44,pitch:62,leg:{R:W3(.59,.07,-.17),L:W3(.59,.07,.17)},arm:{L:W3(.02,.10,.40)}}}],
 [5.0,{tori:{leg:{R:B('o',-.10,.56,.28),L:B('o',0,.22,.30)},pole:{legL:[.4,0,-1]}},uke:{x:.52,y:.40,pitch:70,h:15,leg:{R:W3(.62,.07,-.17),L:W3(.62,.07,.17)}}}],
 [6.0,{tori:{y:.20,z:.07,pitch:-95,h:40,leg:{R:B('o',-.10,.56,.28),L:B('o',-.18,.17,.12)},arm:{R:B('o',-.06,.68,0)},pole:{legL:[.2,.19,-.2]}},
       uke:{x:.52,y:.40,pitch:75,h:20,leg:{R:W3(.63,.07,-.17),L:W3(.63,.07,.17)},arm:{R:B('o',.19,.08,.24),L:W3(.08,.10,.40)}}}],
 [7.0,{tori:{leg:{R:B('o',-.11,.54,.30),L:B('o',-.22,.13,.11)}},uke:{pitch:78,y:.38}}],
 [7.6,{}],
 [8.0,{uke:{arm:{L:tapAt}}}],
 [8.25,{uke:{arm:{L:tapUp}}}],
 [8.5,{uke:{arm:{L:tapAt}}}],
 [8.75,{uke:{arm:{L:tapUp}}}],
 [9.0,{uke:{arm:{L:tapAt}}}],
 [9.6,{}],
 [10.6,{tori:{leg:{R:B('o',-.02,.62,.40),L:B('o',-.05,.15,.30)},arm:{R:B('o',.05,.40,-.15)}},uke:{pitch:55,h:-10,arm:{L:W3(.08,.10,.40)}}}]],
 names:F=>({tori:Judo.lerp2?[F.tori.head[0],F.tori.head[1]+.32,F.tori.head[2]]:null,uke:[F.uke.hip[0]+.1,F.uke.hip[1]+.45,F.uke.hip[2]]}),
 glow:{s:4.0,e:7.6,limbs:{'T.R.leg':'force','T.L.leg':'gold'}},
 stamp:{s:8.3,e:10.2,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('pés cruzados nas costas',T.legR.H,8,3,C.force,a);
  api.tag('Tori controla os punhos',T.armL.H,-8,2.5,C.force,a);
  a=win(t,1.5,3.6);
  api.tag('braço de dentro',U.armR.E,-7,-2.5,C.info,a);
  api.tag('braço de fora',U.armL.H,6,2.5,C.info,a);
  a=win(t,3.6,5.3);
  api.tag('perna sobe pelo lado do braço de fora',T.legR.E,4,-3.2,C.force,a);
  a=win(t,5.0,7.6);
  api.tag('canela atravessa a nuca',api.lerp3(T.legR.E,T.legR.H,.55),7,-3,C.force,a);
  api.tag('dobra do joelho trava o tornozelo',T.legL.E,-4,5,C.gold,a);
  a=win(t,7.5,10.2);
  api.arrow(api.add(U.head,[0,.32,0]),api.add(U.head,[0,.1,0]),C.force,a);
  api.tag('puxa a cabeça e fecha os joelhos',api.add(U.head,[0,.32,0]),0,-1.6,C.force,a,false);
  api.tag('ombro de Uke fecha o outro lado',U.shR,-8,3,C.info,a);}
});})();
