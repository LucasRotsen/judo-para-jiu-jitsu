(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori em pé nos pés de Uke, de frente para a cabeça dele (yaw 180): direita de Tori = -z.
   Tori joga as pernas de Uke para +z (lado direito de Uke) e corre para -z (lado esquerdo),
   terminando em 100 quilos: peito no peito, de frente para +z (yaw -90). */
const ukeBase={x:0,y:.14,z:0,yaw:0,pitch:-90,h:-10,
 leg:{R:B('o',.13,-.02,-.13),L:B('o',.13,-.02,.13)},
 arm:{R:SL('armL',.85),L:SL('armR',.85)},
 pole:{legR:[.2,1,.5],legL:[.2,1,-.5],armR:[.3,-.6,.6],armL:[.3,-.6,-.6]}};
const toriBase={x:.58,y:.84,z:0,yaw:180,pitch:22,h:-15,
 leg:{R:W3(.86,.04,-.24),L:W3(.86,.04,.24)},
 arm:{R:SL('legL',.12),L:SL('legR',.12)},
 pole:{legR:[1,-.3,.2],legL:[1,-.3,-.2],armR:[.4,-.8,.4],armL:[.4,-.8,-.4]}};
/* pernas de Uke empurradas juntas para o lado direito dele, joelhos no chão */
const legsAside={leg:{R:W3(.5,.08,.46),L:W3(.6,.08,.32)},pole:{legR:[.3,.1,1],legL:[.3,.1,1]}};
Judo.register3d({
 id:'passagem-toreando', name:'Passagem toreando', kanji:'闘牛',
 cls:'Jiu-jitsu · Passagem de guarda', group:'ne',
 bjj:'Toreando (bullfighter pass)',
 why:'A passagem em pé mais ensinada do jiu-jitsu: tira os pés do quadril, joga as pernas para um lado como capa de toureiro e corre para o outro.',
 summary:'Passagem de guarda em pé. Tori segura as calças de Uke nos joelhos, empurra as pernas dele para baixo e para um lado, contorna os pés pelo lado oposto e desce o peito para os 100 quilos.',
 reading:[{k:'闘牛',r:'tōgyū',m:'tourada (o nome vem do toureiro)'}],
 facts:[['Origem','Técnica do jiu-jitsu, sem nome próprio no judô. O nome vem do movimento do toureiro com a capa.'],
  ['Pontuação (IBJJF)','Passar a guarda e estabilizar por 3 segundos vale 3 pontos.'],
  ['Pegada','Calça na altura do joelho, por fora, com os punhos virados para baixo. Também funciona segurando as canelas.'],
  ['Encadeia com','Se Uke recupera a guarda, Tori troca de lado (toreando duplo), passa o joelho pela coxa ou vai para as costas.']],
 errors:[['Ficar na frente dos pés','Correr em linha reta deixa os pés de Uke no quadril. Tori sai em ângulo, pelo lado das pernas que empurrou.'],
  ['Empurrar só para o lado','As pernas vão para baixo e para o lado ao mesmo tempo, coladas no chão, para Uke não recolocar a guarda.'],
  ['Soltar cedo','A pegada nos joelhos só sai quando o peito de Tori já está no peito de Uke.'],
  ['Quadril alto no fim','Sem descer o quadril, Uke repõe o joelho entre os dois e volta para a guarda.']],
 safety:['Empurre as pernas de Uke para o chão sem torcer os joelhos dele.',
  'Desça o peito com controle: Tori não se joga sobre as costelas de Uke.',
  'Treine primeiro com Uke cooperando, depois com resistência leve.'],
 phases:[
 {s:0,e:1.6,kanji:'組み手',ro:'Pegada',pt:'Calças nos joelhos',
  d:'Uke está de costas com a guarda aberta e os pés no quadril de Tori. Tori fica em pé, base firme, e segura as calças de Uke por fora, na altura dos joelhos.',
  l:['Pés de Uke no quadril de Tori: é a guarda que Tori precisa desmontar.','A pegada é por fora do joelho, punhos para baixo.','Quadril de Tori afastado, fora do alcance das pernas.']},
 {s:1.6,e:3.3,kanji:'崩し',ro:'Kuzushi',pt:'A capa do toureiro',
  d:'Tori dá meio passo para trás para tirar os pés de Uke do quadril e, num só movimento, empurra os dois joelhos para baixo e para o lado direito de Uke, até quase encostar no tatame.',
  l:['Para baixo e para o lado, ao mesmo tempo.','Os joelhos de Uke ficam juntos, apontando para longe de Tori.','O quadril de Uke gira junto com as pernas.']},
 {s:3.3,e:5.0,kanji:'回り',ro:'Mawari',pt:'Correr para o outro lado',
  d:'Tori solta o peso nas mãos, que prendem os joelhos no chão, e dá passos largos para o lado esquerdo de Uke, contornando os pés dele.',
  l:['As pernas vão para um lado, Tori corre para o outro.','As mãos continuam pressionando os joelhos no chão.','Tori chega ao lado do quadril de Uke, já baixando o tronco.']},
 {s:5.0,e:6.6,kanji:'抑込',ro:'Osaekomi',pt:'Peito no peito',
  d:'Tori desce o peito sobre o peito de Uke, passa um braço por trás da cabeça dele e o outro bloqueia o quadril. Os joelhos encostam no lado de Uke para ele não recolocar a guarda.',
  l:['Peito no peito, de lado: são os 100 quilos.','Joelho colado no quadril de Uke tapa o espaço da guarda.','Um braço controla a cabeça, o outro o quadril.']},
 {s:6.6,e:9,kanji:'安定',ro:'Antei',pt:'Estabilizar',
  d:'Tori abaixa o quadril e espalha a base. Com a posição estável por 3 segundos, a passagem vale pontos no jiu-jitsu.',
  l:['Quadril baixo, peso no peito.','Três segundos estáveis: 3 pontos na regra da IBJJF.','Daqui saem montada, joelho na barriga ou kimura.']}],
 rep:[.8,2.7,4.3,5.9,7.8], cover:4.1,
 views:[
  {name:'De cima',a:0,e:90,center:[-.12,0,-.18],span:3.0},
  {name:'Pela cabeça',a:-90,e:24,center:[.1,.6,-.2],span:3.3},
  {name:'Lateral',a:0,e:14,center:[.1,.72,-.2],span:3.6}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 [2.2,{tori:{x:.74,y:.78,pitch:30}}],
 [3.2,{tori:{x:.66,y:.66,z:-.08,pitch:50,yaw:172,arm:{R:SL('legL',.08),L:SL('legR',.08)}},
       uke:{roll:-18,leg:legsAside.leg,arm:{R:W3(-.35,.06,.42),L:W3(-.2,.06,-.42)},pole:{...legsAside.pole,armR:[0,-1,.6],armL:[0,-1,-.6]}}}],
 [4.1,{tori:{x:.5,y:.6,z:-.42,yaw:-125,pitch:62,leg:{R:W3(.58,.04,-.86),L:W3(.98,.04,-.5)}}}],
 [5.0,{tori:{x:.08,y:.46,z:-.6,yaw:-95,pitch:72,leg:{R:W3(-.02,.05,-1.02),L:W3(.42,.05,-.95)},
       arm:{R:W3(.32,.1,.45),L:W3(.5,.1,.4)}}}],
 [5.9,{tori:{x:-.22,y:.34,z:-.56,yaw:-90,pitch:80,h:10,
       leg:{R:W3(-.42,.05,-1.02),L:W3(.0,.05,-1.02)},pole:{legR:[1,-.6,0],legL:[1,-.6,0]},
       arm:{R:W3(-.62,.1,.2),L:W3(.2,.12,.3)},pole:{armR:[.3,-.4,.8],armL:[.3,-.4,-.8]}},
       uke:{roll:-8}}],
 [6.6,{}],
 [7.2,{tori:{y:.31,leg:{R:W3(-.5,.05,-1.04),L:W3(.08,.05,-1.04)}}}],
 [9,{}]],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.3,F.tori.head[2]],uke:[F.uke.head[0]-.15,.3,F.uke.head[2]]}),
 glow:{s:1.6,e:5.0,limbs:{'T.R.arm':'force','T.L.arm':'force'}},
 stamp:{s:6.8,e:9,big:'3 pts',small:'PASSAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('pés de Uke no quadril',U.legR.H,6,-6,C.uke,a);
  api.tag('calças nos joelhos, por fora',T.armR.H,5,6,C.force,a);
  a=win(t,1.7,3.6);
  api.arrow(api.lerp3(U.legR.E,U.legL.E,.5),api.add(api.lerp3(U.legR.E,U.legL.E,.5),[0,-.12,.8]),C.force,win(t,1.7,3.0));
  api.tag('pernas para baixo e para o lado',U.legR.E,-10,0,C.force,a);
  a=win(t,3.4,5.2);
  api.arrow(api.add(T.hip,[.3,0,.5]),api.add(T.hip,[-.2,0,-.5]),C.force,win(t,3.4,4.6));
  api.tag('Tori corre para o outro lado',T.hip,-7,-6,C.force,a);
  api.tag('mãos prendem os joelhos no chão',T.armL.H,-9,1,C.force,a);
  a=win(t,5.1,6.8);
  api.tag('peito no peito',api.bp(T,.12,.4,0),8,-6,C.force,a);
  api.tag('joelho colado no quadril',T.legL.E,-8,5,C.force,a);
  a=win(t,6.8,99);
  api.tag('quadril baixo: 100 quilos',T.hip,9,-2,C.ink,a);}
});})();
