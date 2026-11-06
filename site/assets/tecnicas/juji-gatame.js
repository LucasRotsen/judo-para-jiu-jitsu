(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, cabeça para -x, quadril em x=.15; direita de Uke = +z.
   Tori monta (virado para -x), isola o braço direito de Uke, gira para o lado dele e cai de costas
   perpendicular a Uke: cabeça de Tori para +z, direita de Tori = +x. A perna direita de Tori cruza o peito
   de Uke e a esquerda cruza o rosto/pescoço. O braço direito de Uke fica entre as coxas de Tori. */
const ukeBase={x:.15,y:.13,z:0,yaw:0,pitch:-90,h:8,gf:0,
 leg:{R:W3(1.0,.06,.18),L:W3(1.0,.06,-.18)},arm:{R:B('o',.15,.36,-.1),L:B('o',.15,.36,.1)},
 pole:{armR:[.6,-.3,.6],armL:[.6,-.3,-.6]}};
const toriBase={x:.05,y:.40,z:0,yaw:180,pitch:8,h:0,gf:0,
 leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('s',.22,.02,.24),L:B('s',.22,.02,-.24)},
 pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5],armR:[-.2,-.7,.6],armL:[-.2,-.7,-.6]}};
/* braço direito de Uke preso: as duas mãos de Tori seguram o punho dele */
const grip={arm:{R:SL('armR',.86),L:SL('armR',.74)}};
const tapAt=W3(-.14,.30,.10),tapUp=W3(-.14,.44,.04);
const taps=[8.2,8.4,8.6,8.8,9.0,9.2].map((t,i)=>[t,{uke:{arm:{L:i%2?tapUp:tapAt}}}]);
Judo.register3d({
 id:'juji-gatame', name:'Juji Gatame', kanji:'腕挫十字固',
 cls:'Ne-waza · Kansetsu-waza', group:'ne', first:'uke',
 bjj:'Chave de braço (armlock)',
 why:'A chave de braço do jiu-jitsu saindo da montada, em três ângulos para ver o braço preso entre as coxas.',
 summary:'Chave de braço em cruz. Da montada, Tori isola um braço de Uke, gira para o lado dele e cai de costas com as pernas sobre o peito e o rosto. O braço fica entre as coxas, com o cotovelo acima do quadril de Tori, e o quadril sobe para hiperestender o cotovelo.',
 reading:[{k:'腕挫',r:'ude hishigi',m:'quebra do braço'},{k:'十字',r:'juji',m:'em cruz'},{k:'固',r:'gatame',m:'controle'}],
 facts:[['Grupo','Katame-waza › Kansetsu-waza (chaves de articulação). No judô, só o cotovelo pode ser atacado.'],
  ['Nome completo','Ude-hishigi-juji-gatame. “Juji”, cruz, vem da posição: Tori deitado perpendicular a Uke.'],
  ['Alavanca','O cotovelo de Uke fica acima do quadril de Tori, com o polegar para cima. O quadril é o ponto de apoio e as mãos puxam o punho para baixo.'],
  ['No jiu-jitsu','Chave de braço, ou armlock. Sai da montada, da guarda e das costas. É uma das primeiras finalizações que se aprende.']],
 errors:[['Joelhos abertos','Com espaço entre as coxas, Uke gira o cotovelo para baixo e tira o braço. Os joelhos ficam apertados.'],
  ['Sentar longe do ombro','Se o quadril cai longe da axila de Uke, o cotovelo fica abaixo do quadril e não há alavanca. Sente colado no ombro.'],
  ['Polegar para baixo','Com o polegar de Uke para baixo, a força vai para o ombro e ele escapa. O polegar aponta para cima, para o teto.'],
  ['Pernas soltas','Sem os calcanhares puxando para baixo, Uke senta e empilha Tori. A perna de cima pesa no pescoço e a de baixo, no peito.']],
 safety:['Aplique devagar. A chave de braço machuca o cotovelo antes de doer muito: solte assim que o parceiro bater.',
  'Nunca dê um tranco ao subir o quadril. A pressão aumenta aos poucos.',
  'Pratique com um professor qualificado e com parceiro que sabe bater a tempo.'],
 phases:[
 {s:0,e:1.8,kanji:'縦',ro:'Montada',pt:'Uke empurra',
  d:'Tori está montado e Uke empurra o peito dele com os dois braços esticados para criar espaço. Braços esticados, longe do corpo, são a porta da chave de braço.',
  l:['Braço esticado de Uke = braço exposto.','Tori mantém o quadril pesado e os joelhos colados.','Escolha o braço: aqui, o direito de Uke.']},
 {s:1.8,e:3.6,kanji:'崩し',ro:'Isolar',pt:'Prender o braço no peito',
  d:'Tori abraça o braço direito de Uke e prende o punho contra o próprio peito. A outra mão apoia no peito de Uke para manter o peso enquanto Tori se prepara para girar.',
  l:['O punho de Uke fica colado no peito de Tori.','Tori não solta o braço até o fim.','O peso continua sobre Uke.']},
 {s:3.6,e:5.2,kanji:'回転',ro:'Giro',pt:'Quadril vai para o ombro',
  d:'Tori sobe nos pés e gira sobre Uke até ficar de frente para o lado dele. A perna esquerda passa por cima da cabeça de Uke e o quadril desce colado na axila do braço preso.',
  l:['O quadril de Tori desce colado no ombro de Uke.','A perna do lado do braço preso passa por cima da cabeça.','A perna direita fica sobre o peito de Uke.']},
 {s:5.2,e:7.6,kanji:'十字',ro:'Juji',pt:'Cair de costas em cruz',
  d:'Tori senta e cai de costas, perpendicular a Uke. O braço de Uke fica entre as coxas de Tori, com o cotovelo acima do quadril e o polegar para cima. Uma perna pesa no peito, a outra no pescoço, e os joelhos apertam.',
  l:['Corpos em cruz: é daí que vem o nome “juji”.','Cotovelo de Uke acima do quadril de Tori, polegar para cima.','Joelhos apertados e calcanhares puxando para baixo.']},
 {s:7.6,e:10.4,kanji:'極め',ro:'Kime',pt:'Subir o quadril e finalizar',
  d:'Tori puxa o punho de Uke para o peito e sobe o quadril devagar. O cotovelo é estendido sobre o quadril de Tori. Uke bate e Tori solta na hora.',
  l:['O quadril sobe, as mãos puxam o punho para baixo.','A pressão vem aos poucos, nunca de uma vez.','Bateu, soltou. Sem exceção.']}],
 rep:[.9,2.8,4.6,6.6,9.0], cover:6.8,
 views:[
  {name:'De cima',a:0,e:80,center:[-.12,.2,.44],span:2.75},
  {name:'Diagonal',a:35,e:52,center:[-.2,.32,.25],span:2.6},
  {name:'Pela cabeça',a:-90,e:14,center:[-.2,.42,.3],span:2.3}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 [2.6,{tori:{pitch:22,arm:{R:B('o',.14,.40,-.12),L:B('s',.24,.30,-.02)},pole:{armL:[.3,-.5,-.9]}},
       uke:{arm:{R:B('o',.15,.32,-.03)}}}],
 [3.6,{}],
 [4.3,{tori:{x:-.18,y:.50,z:.14,yaw:130,pitch:28,leg:{R:W3(-.04,.05,-.34),L:W3(-.42,.05,.52)},
       arm:grip.arm,pole:{legR:[.2,1,.3],legL:[1,-.3,-.4],armR:[-.3,-.6,.6],armL:[-.3,-.6,-.6]}},
       uke:{arm:{R:B('o',.18,.30,0)},pole:{armR:[.6,-.3,-.2]}}}],
 [4.9,{tori:{x:-.30,y:.44,z:.28,yaw:100,pitch:30,leg:{L:W3(-.66,.44,-.12)},pole:{legL:[.2,1,-.3]}}}],
 [5.6,{tori:{x:-.33,y:.15,z:.30,yaw:90,pitch:-12,leg:{R:W3(-.10,.10,-.33),L:W3(-.68,.07,-.32)},
       pole:{legR:[1,.2,.2],legL:[1,.2,-.2]}},
       uke:{arm:{R:B('o',.20,.30,0)}}}],
 [6.6,{tori:{y:.13,pitch:-88,h:15,pole:{legR:[1,0,.2],legL:[1,0,-.2]}},
       uke:{arm:{R:B('o',.36,.30,-.02),L:W3(-.22,.30,-.30)}}}],
 [7.6,{}],
 [8.2,{tori:{y:.22,pitch:-80},uke:{arm:{R:B('o',.30,.33,-.02)}}}],
 ...taps,
 [9.6,{}],
 [10.4,{tori:{y:.13,pitch:-88},uke:{arm:{R:B('o',.40,.25,-.02),L:W3(-.22,.30,-.30)}}}]],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.32,F.tori.head[2]],uke:[F.uke.legR.H[0]-.12,F.uke.legR.H[1]+.1,F.uke.legR.H[2]+.22]}),
 glow:{s:5.4,e:8.0,limbs:{'T.R.leg':'force','T.L.leg':'force','U.R.arm':'gold'}},
 stamp:{s:8.4,e:10.2,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('braços esticados: porta da chave',U.armR.E,6,-3,C.info,a);
  a=win(t,1.8,3.7);
  api.tag('punho preso no peito de Tori',U.armR.H,6,4,C.force,a);
  a=win(t,3.6,5.3);
  api.tag('quadril colado no ombro',T.hip,7,2.5,C.force,a);
  api.tag('perna passa sobre a cabeça',T.legL.E,-2,3.5,C.force,win(t,4.4,5.3));
  a=win(t,5.4,7.8);
  api.tag('cotovelo acima do quadril',U.armR.E,8,3,C.gold,win(t,6.1,7.8));
  api.tag('perna no peito',T.legR.E,6,-2.5,C.force,win(t,6.0,7.8));
  api.tag('perna no rosto e pescoço',T.legL.E,-3,-3.5,C.force,win(t,6.0,7.8));
  a=win(t,7.7,10.2);
  api.arrow(api.add(T.hip,[0,.02,0]),api.add(T.hip,[0,.24,0]),C.force,a);
  api.tag('quadril sobe devagar',api.add(T.hip,[0,.24,0]),6,-2,C.force,a,false);
  api.tag('polegar para cima',U.armR.H,-6,-2,C.gold,a);}
});})();
