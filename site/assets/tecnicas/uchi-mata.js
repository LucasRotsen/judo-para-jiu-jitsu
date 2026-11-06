(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda até ficar de costas (yaw ~345).
   A perna direita de Tori entra entre as pernas de Uke e sobe pela face interna da coxa esquerda
   dele (lado -z). Uke gira por cima e cai de costas à frente de Tori, no lado -z, como no o goshi. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.14,.24,-.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.45)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'uchi-mata', name:'Uchi Mata', kanji:'内股',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'Uchi mata, a queda da coxa por dentro',
 why:'A queda mais usada no judô de competição. Em três ângulos para ver a coxa de Tori entrar entre as pernas de Uke e subir como um pêndulo.',
 summary:'Ceifada por dentro da coxa. Tori puxa Uke para frente e para cima, gira de costas com o pé de apoio entre os pés dele e passa a perna direita entre as pernas de Uke. A coxa sobe pela parte interna da coxa esquerda de Uke enquanto o tronco de Tori desce, e Uke gira por cima. Tori segue para o kesa-gatame.',
 reading:[{k:'内',r:'uchi',m:'por dentro'},{k:'股',r:'mata',m:'coxa'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna). Alguns professores a ensinam como koshi-waza, pela participação do quadril.'],
  ['Gokyo','2º grupo (Dai-nikyo)'],
  ['Direção do kuzushi','Para frente e para cima, levando Uke para a ponta dos pés'],
  ['Qual coxa é ceifada','Com a pegada direita, a perna direita de Tori sobe pela face interna da coxa esquerda de Uke. Na versão de competição, a coxa pode ir mais ao centro, entre as pernas.'],
  ['No jiu-jitsu','Funciona contra quem abre a base para defender a queda de dupla perna. Uke cai de costas ao lado de Tori, que mantém a manga e chega ao kesa-gatame ou ao cem quilos.']],
 errors:[['Perna sem tronco','Se o tronco de Tori não desce, a perna sobe sozinha e não tira Uke do chão. Tronco e perna são as duas pontas do mesmo pêndulo.'],
  ['Entrada longe','Com o pé de apoio fora da linha dos pés de Uke, a coxa só alcança o joelho dele. O pé de apoio entra entre os pés de Uke.'],
  ['Puxada só para frente','Sem o "para cima" da puxada, Uke não fica na ponta dos pés e senta o quadril para defender.'],
  ['Perna de apoio rígida','O joelho de apoio começa flexionado e estende na hora da ceifada. Travado desde o começo, Tori não tem como subir Uke.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Faça muitas entradas (uchikomi) antes de projetar. Na queda, Tori não mergulha a cabeça no tatame.',
  'Tori mantém a manga presa até Uke tocar o tatame.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita, alta, perto da nuca.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite alta na gola: é ela que levanta Uke.','Postura natural, joelhos destravados.']},
 {s:1,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Frente e para cima',
  d:'Tori puxa a manga para frente e para cima e levanta a gola. O pé direito avança para a frente do pé direito de Uke. Uke fica na ponta dos pés e abre as pernas para se equilibrar.',
  l:['A puxada sobe: o cotovelo de Uke vai acima do ombro dele.','Uke na ponta dos pés não consegue sentar o quadril.','O passo do pé direito já prepara o giro.']},
 {s:2.6,e:4.4,kanji:'作り',ro:'Tsukuri',pt:'Giro e perna por dentro',
  d:'Tori gira para a esquerda e fica de costas para Uke, com o pé de apoio esquerdo entre os pés dele e o joelho flexionado. A perna direita entra entre as pernas de Uke, encostando na parte interna da coxa esquerda.',
  l:['Pé de apoio entre os pés de Uke, apontando para a mesma direção que ele.','A perna direita entra por dentro, entre as pernas de Uke.','Tori colado: o lado direito das costas contra o peito de Uke.']},
 {s:4.4,e:6.2,kanji:'掛け',ro:'Kake',pt:'O pêndulo',
  d:'O tronco de Tori desce para frente enquanto a perna direita sobe por trás, levantando a coxa esquerda de Uke. As mãos continuam o giro para a esquerda. Uke perde os dois apoios, gira por cima da perna de Tori e cai de costas à frente dele.',
  l:['Tronco desce, perna sobe: um pêndulo com eixo no quadril de Tori.','A coxa de Tori levanta a coxa de Uke por dentro.','A perna de apoio estende e Tori fica sobre ela.']},
 {s:6.2,e:7.5,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas. Tori apoia a perna direita de volta no chão, mantém a manga presa e termina equilibrado, sem cair junto.',
  l:['Manga segura até o fim.','Uke faz ukemi com o queixo no peito.','Tori não mergulha atrás de Uke: fica de pé.']},
 {s:7.5,e:10.2,kanji:'袈裟固',ro:'Kesa-gatame',pt:'Jiu-jitsu: controle no chão',
  d:'Sem soltar a manga, Tori senta ao lado do tronco de Uke, prende o braço direito dele embaixo da própria axila e passa o braço direito por trás do pescoço. As pernas abrem em base larga.',
  l:['O braço de Uke fica preso entre a axila e a mão de Tori.','O peso de Tori fica no peito de Uke.','Pernas abertas: a base impede Uke de rolar Tori por cima.']}],
 rep:[.5,2.2,4.0,5.3,6.9,9.6], cover:5.2,
 views:[
  {name:'Diagonal',a:35,e:16,center:[.2,1.0,-.2],span:3.7},
  {name:'Por trás de Uke',a:-90,e:6,center:[0,1.0,-.1],span:3.4},
  {name:'De cima',a:0,e:90,center:[.4,0,-.3],span:3.0}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* kuzushi: passo do pé direito, puxada para frente e para cima, Uke abre a base */
 [1.7,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)}},uke:{pitch:8}}],
 [2.3,{tori:{x:.08,yaw:200,pitch:6,leg:{R:W3(-.06,.07,.10)},arm:{R:B('o',.10,.52,-.04)}},
       uke:{x:-.30,y:.97,pitch:16,h:12,leg:{R:W3(-.24,.07,.20),L:W3(-.38,.07,-.20)},arm:{R:W3(.18,1.28,.22)}}}],
 [2.6,{}],
 /* tsukuri: giro para a esquerda; pé de apoio entre os pés de Uke; perna direita entra por dentro */
 [3.3,{tori:{x:-.02,y:.88,yaw:270,pitch:12,leg:{L:W3(.10,.14,.22)},arm:{R:B('o',.06,.54,.10)}},
       uke:{arm:{R:W3(.20,1.18,.05)}}}],
 [3.9,{tori:{x:-.08,y:.80,z:-.02,yaw:345,pitch:22,h:10,leg:{L:W3(-.14,.07,-.02),R:W3(-.36,.22,-.03)},
        arm:{R:B('o',-.04,.52,.08),L:SL('armR',.5)},pole:{legR:[1,-.2,0],armL:[.3,-.6,-.6]}},
       uke:{x:-.31,y:.97,pitch:22,h:14,arm:{R:W3(.24,1.02,-.22),L:B('o',-.10,.46,.16)},pole:{armL:[.2,-.5,-.6]}}}],
 [4.4,{}],
 /* kake: o tronco desce, a perna sobe por dentro e levanta a coxa esquerda de Uke */
 [4.9,{tori:{y:.82,yaw:355,pitch:50,h:20,leg:{R:W3(-.72,.62,-.07)},pole:{legR:[0,-1,0]}},
       uke:{x:-.24,y:1.08,z:-.03,pitch:42,h:16,leg:{L:W3(-.42,.48,-.30)},pole:{legL:[.3,.2,-1]}}}],
 [5.3,{tori:{y:.84,yaw:368,pitch:72,h:30,leg:{R:W3(-.70,1.42,-.10)}},
       uke:{x:-.10,y:1.28,z:-.12,yaw:6,pitch:85,h:10,gf:0,leg:{R:B('s',-.10,-.84,.14),L:B('s',-.30,-.70,-.18)},
        arm:{R:B('o',.32,.20,-.32)}}}],
 [5.7,{tori:{y:.84,yaw:380,pitch:70,h:30,leg:{R:W3(-.52,1.30,-.10)}},
       uke:{x:.14,y:1.32,z:-.52,yaw:20,pitch:150,roll:-25,h:-10,leg:{R:B('s',-.05,-.86,.14),L:B('s',-.10,-.84,-.12)},
        arm:{R:B('o',.30,.10,-.32),L:B('s',.1,.25,-.45)}}}],
 [6.0,{tori:{y:.82,yaw:390,pitch:55,h:20,leg:{R:W3(-.18,.60,-.02)}},
       uke:{x:.52,y:.70,z:-.68,yaw:25,pitch:225,roll:-15,h:-20,leg:{R:B('s',.1,-.85,.12),L:B('s',.06,-.84,-.12)},
        arm:{R:B('o',.32,.15,-.30),L:B('s',.05,.0,-.50)}}}],
 [6.3,{tori:{y:.82,yaw:395,pitch:34,h:10,leg:{R:W3(-.06,.07,.14)},pole:{legR:[1,-.2,.15]}},
       uke:{x:.80,y:.14,z:-.62,yaw:25,pitch:268,roll:0,h:-25,gf:1,leg:{R:W3(1.50,.07,-.82),L:W3(1.45,.07,-1.05)},
        arm:{R:B('o',.32,.18,-.28),L:B('s',0,.15,-.48)}}}],
 [7.2,{tori:{y:.86,pitch:20,h:5},uke:{h:-30}}],
 [7.5,{}],
 /* kesa-gatame */
 [8.4,{tori:{x:.45,y:.42,z:.08,yaw:530,pitch:30,roll:15,h:10,
        leg:{R:W3(.15,.07,.28),L:W3(1.0,.10,.30)},arm:{R:B('o',.05,.66,.10),L:SL('armR',.35)},
        pole:{legR:[.6,.4,.6],legL:[-.2,-.4,-.3],armR:[.2,-.4,1]}},
       uke:{h:-15,arm:{R:B('o',.04,.38,-.28)}}}],
 [9.1,{tori:{x:.60,y:.20,z:-.12,yaw:565,pitch:15,roll:35,h:-5,
        leg:{R:W3(.12,.07,.22),L:W3(1.25,.07,.05)},arm:{R:B('o',-.08,.66,-.16),L:SL('armR',.3)},
        pole:{legR:[.4,.7,.3],legL:[-.3,-.3,-.4],armR:[.6,-.2,1],armL:[-.6,-.6,-.6]}},
       uke:{h:-10,arm:{R:B('o',.02,.22,-.30),L:B('s',.05,.25,-.45)}}}],
 [10.2,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.32,F.tori.head[2]],uke:[F.uke.hip[0]+.25,Math.max(F.uke.head[1],F.uke.hip[1])+.40,F.uke.hip[2]-.25]}),
 glow:{s:3.4,e:6.0,limbs:{'T.R.leg':'force','U.L.leg':'gold'}},
 stamp:{s:6.35,e:8.0,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  if(vi===1){
   a=win(t,3.4,4.7);
   api.tag('perna direita entra entre as pernas de Uke',T.legR.E,7,-2,C.force,a);
   api.tag('pé de apoio entre os pés de Uke',T.legL.H,-8,-1.2,C.gold,a);
   a=win(t,4.6,5.5);
   api.tag('coxa levanta a coxa de Uke por dentro',U.legL.E,-1,3.5,C.gold,a);
   return;}
  if(vi!==0)return;
  a=win(t,0,1.3);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola alta',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.26,.30,0]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.26,.30,0]),1,-2.6,C.force,a,false);
   api.tag('Uke abre a base',U.legL.H,-5,1.5,C.uke,a);}
  a=win(t,3.4,4.7);
  api.tag('pé de apoio entre os pés de Uke',T.legL.H,6,1,C.gold,a);
  a=win(t,4.6,5.9);
  if(a>0){api.arc(api.add(T.hip,[0,.1,0]),[1,0,0],[0,1,0],.6,200,340,C.force,a);
   api.tag('tronco desce, perna sobe: pêndulo',api.add(T.hip,[.3,.9,.3]),6,-1,C.force,a,false);}
  a=win(t,6.4,7.6);
  api.tag('manga segura até o fim',T.armL.H,5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-6,-2.5,C.uke,a);
  a=win(t,8.5,10.2);
  api.tag('braço por trás do pescoço',T.armR.E,-6,-3,C.force,a);
  api.tag('braço de Uke preso na axila',U.armR.E,6,-2.5,C.gold,a);
  api.tag('base larga',T.legL.H,5,-1.5,C.force,a);}
});})();
