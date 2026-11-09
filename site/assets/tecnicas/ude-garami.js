(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, cabeça para -x; direita de Uke = +z.
   Tori nos 100 quilos pelo lado direito de Uke (+z), virado para -z, peito sobre o peito de Uke,
   ombros sobre o ombro esquerdo (de longe) de Uke. Direita de Tori = +x (quadril de Uke).
   O braço atacado é o ESQUERDO de Uke. Figura-4: mão esquerda de Tori no punho de Uke; braço direito
   passa por baixo do braço de Uke e a mão direita segura o próprio punho esquerdo. */
const ukeBase={x:0,y:.15,z:0,yaw:0,pitch:-90,roll:0,h:0,
 leg:{R:W3(.62,.06,.24),L:W3(.62,.06,-.24)},arm:{R:W3(-.08,.22,.32),L:W3(-.46,.52,-.06)},
 pole:{legR:[1,0,.3],legL:[1,0,-.3],armR:[-.3,-.6,.6],armL:[.3,-.8,-.6]}};
const toriBase={x:-.10,y:.36,z:.30,yaw:135,pitch:85,roll:0,h:25,
 leg:{R:W3(.22,.06,.78),L:W3(-.30,.06,.88)},arm:{R:W3(-.28,.07,-.40),L:W3(-.74,.08,.06)},
 pole:{legR:[1,0,0],legL:[1,0,0],armR:[.6,.6,.1],armL:[.3,.3,-.6]}};
/* Braço esquerdo de Uke: mão perto da orelha (cotovelo a 90°) → “pinta o chão” até o quadril → cotovelo sobe. */
const byEar=W3(-.78,.06,-.36),paintMid=W3(-.46,.08,-.66),byHip=W3(-.25,.07,-.47),liftHand=W3(-.24,.22,-.50);
const tapAt=W3(-.34,.07,.46),tapUp=W3(-.34,.24,.46);
const taps=[8.9,9.1,9.3,9.5,9.7].map((t,i)=>[t,{uke:{arm:{R:i%2?tapUp:tapAt}}}]);
Judo.register3d({
 id:'ude-garami', name:'Ude Garami', kanji:'腕緘', group:'ne', cls:'Ne-waza · Kansetsu-waza',
 bjj:'Kimura (e americana, na direção oposta)',
 why:'A chave de ombro que leva o nome de Masahiko Kimura, saindo dos 100 quilos, em três ângulos para ver a figura-4 girar o ombro.',
 summary:'Chave de ombro com os braços em figura-4. Por cima, nos 100 quilos, Tori segura o punho de Uke, passa o outro braço por baixo do braço dele e segura o próprio punho. Com o cotovelo de Uke a 90°, leva a mão dele até o quadril e levanta o cotovelo.',
 reading:[{k:'腕',r:'ude',m:'braço'},{k:'緘',r:'garami',m:'enroscar, travar'}],
 facts:[['Grupo','Katame-waza › Kansetsu-waza (chaves de articulação)'],
  ['Articulação','O ombro, em rotação interna. O cotovelo fica dobrado a 90° só para servir de alavanca.'],
  ['Kimura × americana','Mesma figura-4, direções opostas. Na kimura a mão de Uke desce para o quadril e as costas; na americana, com a palma para cima, sobe para a cabeça.'],
  ['No jiu-jitsu','Kimura. Sai da guarda fechada, da meia-guarda e dos 100 quilos, e também serve para raspar ou pegar as costas.']],
 errors:[['Braço de Uke esticado','Com o cotovelo aberto a alavanca some e o ombro não gira. Mantenha o cotovelo dele a 90°.'],
  ['Pegar a mão, não o punho','Segurando a mão, Uke gira o punho e escapa. A pegada é no punho, com o polegar junto dos dedos.'],
  ['Cotovelo de Uke longe do peito','Se o cotovelo dele se afasta do seu peito, a trava abre. Cole o braço dele em você antes de girar.'],
  ['Girar de uma vez','O ombro cede sem aviso. A rotação é lenta e para no primeiro sinal de batida.']],
 safety:['Chave de ombro machuca rápido e sem aviso: gire devagar e pare na hora em que o parceiro bater ou disser “bati”.',
  'Nunca dê tranco nem gire até o fim no treino. Uma lesão de ombro pode levar meses para sarar.',
  'Quem recebe bate cedo, antes de sentir dor forte. Pratique só com a orientação de um professor qualificado.'],
 phases:[
 {s:0,e:1.4,kanji:'横四方',ro:'100 quilos',pt:'Uke empurra com o braço de longe',
  d:'Tori está nos 100 quilos, peito sobre o peito de Uke. Para criar espaço, Uke empurra o pescoço de Tori com o braço esquerdo, o de longe.',
  l:['Peito de Tori pesado sobre o peito de Uke.','O braço que empurra é o que vai ser atacado.','Joelhos de Tori colados no quadril de Uke.']},
 {s:1.4,e:3.0,kanji:'崩し',ro:'Kuzushi',pt:'Levar o braço ao tatame',
  d:'Tori agarra o punho esquerdo de Uke com a mão esquerda e leva o braço dele ao tatame, ao lado da cabeça, com o cotovelo dobrado a 90°.',
  l:['Pegada no punho, polegar junto dos dedos.','Cotovelo de Uke dobrado, mão perto da orelha.','Tori mantém o peso no peito de Uke.']},
 {s:3.0,e:4.8,kanji:'緘',ro:'Garami',pt:'Fechar a figura-4',
  d:'O braço direito de Tori passa por baixo do braço de Uke, junto ao cotovelo, e a mão direita segura o próprio punho esquerdo. Os dois braços formam um “4” em volta do braço de Uke.',
  l:['Mão direita no próprio punho esquerdo.','O braço de baixo passa colado ao cotovelo de Uke.','Cotovelo de Uke continua a 90°.']},
 {s:4.8,e:6.6,kanji:'回す',ro:'Pintar o chão',pt:'Mão de Uke até o quadril',
  d:'Tori arrasta a mão de Uke pelo tatame, da cabeça até o quadril dele, como quem pinta o chão. O cotovelo de Uke fica no lugar e serve de eixo.',
  l:['A mão de Uke desliza pelo tatame, sem subir.','O cotovelo de Uke não se mexe: é o eixo.','Na direção oposta, com a palma para cima, seria a americana.']},
 {s:6.6,e:8.6,kanji:'極め',ro:'Kime',pt:'Levantar o cotovelo',
  d:'Com a mão de Uke junto ao quadril, Tori levanta o cotovelo dele em direção ao teto. O ombro gira para dentro e a chave entra. Devagar.',
  l:['A mão fica baixa, perto do quadril; o cotovelo sobe.','O ombro de Uke gira para dentro.','Devagar: a chave de ombro machuca sem aviso.']},
 {s:8.6,e:11,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate no tatame (maitta, “desisto”). No judô isso vale ippon. Tori solta na hora e devolve o braço ao tatame.',
  l:['A batida pode ser no corpo, no tatame ou com a voz.','Soltar imediatamente é parte da técnica.','Quem recebe bate cedo: o ombro não avisa.']}],
 rep:[.7,2.4,4.2,5.9,7.8,9.4], cover:7.8,
 views:[
  {name:'Lado do braço',a:172,e:18,center:[.02,.30,.08],span:2.6,bias:{'U.L.arm':.12}},
  {name:'Pela cabeça',a:-95,e:24,center:[0,.25,.08],span:2.6,bias:{'U.L.arm':.12}},
  {name:'Diagonal alta',a:200,e:55,center:[.02,.12,.08],span:2.7,bias:{'U.L.arm':.3,'T.L.arm':.25,'T.R.arm':.25}}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 [2.4,{uke:{arm:{L:byEar},pole:{armL:[-.3,0,-1]}},tori:{arm:{L:SL('armL',.98)}}}],
 [3.0,{}],
 [4.0,{tori:{h:-10,arm:{R:SL('armL',.80)}}}],
 [4.8,{}],
 [5.7,{uke:{arm:{L:paintMid}},tori:{yaw:118,z:.16,y:.33}}],
 [6.6,{uke:{arm:{L:byHip}},tori:{yaw:100,z:.22,y:.34}}],
 [7.2,{}],
 [8.4,{uke:{roll:8,arm:{L:liftHand},pole:{armL:[1,0,-.3]}},tori:{y:.40,z:.24,h:-45}}],
 ...taps,
 [10.2,{uke:{roll:0,arm:{L:byEar,R:W3(-.08,.22,.32)},pole:{armL:[.3,-.8,-.6]}},
        tori:{yaw:135,y:.36,z:.30,h:25,arm:{L:W3(-.74,.08,.06),R:W3(-.28,.07,-.40)}}}],
 [11,{}]],
 names:F=>({tori:[F.tori.hip[0]+.05,F.tori.hip[1]+.22,F.tori.hip[2]],uke:[F.uke.hip[0]+.25,F.uke.hip[1]+.3,F.uke.hip[2]]}),
 glow:{s:3.6,e:8.8,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:9.0,e:10.8,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('Uke empurra com o braço de longe',U.armL.H,-3,6,C.info,a);
  a=win(t,1.6,3.2);
  api.tag('mão esquerda no punho',T.armL.H,-7,3,C.gold,a);
  api.tag('cotovelo de Uke a 90°',U.armL.E,-4,6,C.info,a);
  a=win(t,3.2,5.0);
  api.tag('braço por baixo, mão no próprio punho',T.armR.H,-9,3.5,C.force,a);
  a=win(t,5.0,6.9);
  api.tag('pinta o chão até o quadril',U.armL.H,-3,5,C.force,a);
  api.ring(U.armL.E,.06,C.info,a);
  a=win(t,6.9,8.9);
  api.arrow(api.add(U.armL.E,[0,-.02,0]),api.add(U.armL.E,[0,.22,0]),C.force,a);
  api.tag('cotovelo sobe, mão fica no quadril',U.armL.E,-9,-4,C.force,a);
  a=win(t,9.0,10.8);
  api.tag('Uke bate: solte na hora',U.armR.H,-4,5,C.uke,a);}
});})();
