(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
 id:'o-soto-gari', name:'O Soto Gari', kanji:'大外刈',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'O soto gari, quase sempre pelo nome japonês',
 why:'Derruba quem fica de pé com a postura alta e deixa Tori ao lado de Uke, a um passo dos 100 quilos.',
 summary:'Grande ceifada por fora. Tori quebra o equilíbrio de Uke para trás, cola o peito no dele e ceifa a perna direita de Uke por trás, panturrilha contra panturrilha. Uke cai de costas junto aos pés de Tori.',
 reading:[{k:'大',r:'o',m:'grande'},{k:'外',r:'soto',m:'por fora'},{k:'刈',r:'gari',m:'ceifada'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['Direção do kuzushi','Para trás e para a direita de Uke, sobre o calcanhar direito'],
  ['No jiu-jitsu','Funciona bem contra quem fica ereto segurando gola e manga. Uke cai ao lado de Tori, que só precisa descer o joelho para os 100 quilos.']],
 errors:[['Ceifar sem desequilibrar','Se o peso de Uke não está no calcanhar, a perna dele não sai do chão e Tori fica num pé só, exposto ao contragolpe (o soto gaeshi).'],
  ['Peito afastado','Sem o peito colado, Uke não vai para trás junto com o movimento e a ceifada vira chute.'],
  ['Tronco para trás','Tori precisa inclinar o tronco para frente enquanto a perna sobe, como uma gangorra. Inclinar para trás entrega o equilíbrio.'],
  ['Soltar a manga','O hikite controla a queda e impede que Uke bata a nuca no tatame.']],
 safety:['A queda de o soto gari é para trás e rápida: Uke precisa dominar o ushiro ukemi (queda para trás) com o queixo no peito.',
  'No treino, ceife com a panturrilha, nunca com o calcanhar contra o joelho de Uke.',
  'Tori mantém a manga até Uke tocar o tatame.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori segura a manga direita de Uke (hikite) e a mão direita segura a gola esquerda (tsurite). Postura natural, distância de um braço dobrado.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Peso distribuído nos dois pés, joelhos destravados.']},
 {s:1,e:2.9,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio para trás',
  d:'Tori avança o pé esquerdo ao lado do pé direito de Uke. Ao mesmo tempo, puxa a manga para baixo e empurra a gola para trás, levando o peso de Uke para o calcanhar direito.',
  l:['O passo do pé esquerdo é o que aproxima o quadril de Tori.','O tsurite empurra Uke para trás e para cima, na direção da nuca dele.','Com o peso no calcanhar, a perna direita de Uke fica sem força.']},
 {s:2.9,e:4,kanji:'作り',ro:'Tsukuri',pt:'Encaixe',
  d:'Tori cola o peito no peito de Uke e passa a perna direita por fora e por trás da perna direita dele. O apoio fica todo na perna esquerda de Tori.',
  l:['Peito com peito: Tori e Uke se movem como um bloco.','A perna direita passa estendida, ponta do pé para baixo.','Cabeça de Tori ao lado da cabeça de Uke.']},
 {s:4,e:5.4,kanji:'掛け',ro:'Kake',pt:'A ceifada',
  d:'A perna direita de Tori varre a perna de Uke de trás para frente, panturrilha contra panturrilha. Enquanto a perna sobe, o tronco de Tori desce, como uma gangorra. Uke perde o apoio e cai de costas.',
  l:['O contato é panturrilha contra panturrilha, nunca no joelho.','Quanto mais alta a perna, mais baixo o tronco.','Hikite puxa para baixo, tsurite empurra para trás.']},
 {s:5.4,e:8,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas ao lado de Tori. Tori segura a manga para controlar a queda, apoia de novo a perna direita e fica pronto para descer aos 100 quilos.',
  l:['A manga segura protege a nuca de Uke.','Uke faz ukemi: queixo no peito e braço livre batendo no tatame.','Tori termina estável, já ao lado do quadril de Uke.']}],
 rep:[.5,2.4,3.7,4.75,7], cover:4.75,
 keys:[
 [0,{tori:{x:-.30,y:.93,T:90,f:1,leg:{R:W(-.22,.07),L:W(-.40,.07)},arm:{R:TP('o',.12,.38),L:SL('armR',.65)}},
     uke:{x:.30,y:.93,T:90,f:-1,leg:{R:W(.22,.07),L:W(.40,.07)},arm:{R:TP('o',.13,.40),L:TP('o',.12,.24)}}}],
 [1,{}],
 [1.6,{tori:{x:-.17,y:.93,T:86,leg:{L:W(-.06,.15)}},uke:{x:.33,T:96}}],
 [2.2,{tori:{x:-.02,y:.92,T:80,leg:{L:W(.12,.07),R:W(-.24,.10)}},uke:{x:.40,y:.92,T:108,h:-10,leg:{R:W(.26,.07),L:W(.44,.08)}}}],
 [2.9,{}],
 [3.5,{tori:{x:.05,y:.92,T:70,h:10,leg:{R:A(-35,-55)}},uke:{x:.40,y:.93,T:110}}],
 [4,{}],
 [4.35,{tori:{x:.06,y:.92,T:62,leg:{R:A(-55,-75)}},uke:{x:.41,y:.92,r:6}}],
 [4.7,{tori:{x:.06,y:.90,T:45,leg:{R:A(-120,-135)}},
       uke:{x:.42,y:.80,r:25,h:-20,gf:0,leg:{R:A(-40,-50),L:W(.46,.09)},arm:{R:TP('o',.22,.30),L:A(-120,-150)}}}],
 [5,{tori:{x:.08,y:.88,T:32,leg:{R:A(-165,-170)}},
     uke:{x:.40,y:.48,r:55,h:-25,leg:{R:A(-20,-30),L:A(-50,-70)},arm:{R:TP('o',.30,.20),L:A(-90,-110)}}}],
 [5.35,{tori:{x:.10,y:.84,T:35,h:5,leg:{R:A(-130,-140)},arm:{R:TP('s',.22,.22)}},
        uke:{x:.35,y:.15,r:72,h:-25,leg:{R:A(-10,-20),L:A(-25,-45)},arm:{R:W(.66,.62),L:A(-72,-72)}}}],
 [6.3,{tori:{x:.12,y:.83,T:38,h:0,leg:{R:W(-.20,.07)}},uke:{h:-15,leg:{R:A(-45,-115),L:A(-40,-108)}}}],
 [8,{}]],
 order:()=>['T.L.leg','T.L.arm','U.R.arm','T.body','U.body','T.R.leg','U.R.leg','U.L.leg','U.L.arm','T.R.arm'],
 names:F=>F.t>4.5?{uke:[F.uke.head[0]+.1,F.uke.head[1]+.32]}:{},
 glow:{s:3.3,e:4.9,limbs:{'T.R.leg':'force','U.R.leg':'gold'}},
 trail:{s:4.3,e:5.45,hide:7.6,fig:'uke',joints:['head']},
 stamp:{s:5.4,e:7.8,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,8,-5.5,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6.5,-2.6,C.force,a);
  a=win(t,1.6,3.1);
  if(a>0){const ch=tp(U,.16,.42);api.arrow([ch[0]-.05,ch[1]+.05],[ch[0]+.28,ch[1]-.08],C.force,a);
   api.tag('empurra para trás',[ch[0]+.28,ch[1]-.08],2,-2.4,C.force,a,false);
   api.ring(U.legR.heel,.08,C.gold,a);api.tag('peso no calcanhar direito',U.legR.heel,7,-2.6,C.gold,a);
   api.tag('passo do pé esquerdo',T.legL.toe,-8,1.4,C.force,win(t,1.5,2.7));}
  a=win(t,3.1,4.2);
  if(a>0){api.tag('peito colado',tp(T,.15,.38),-7.5,-3.4,C.force,a);
   api.tag('perna passa por trás',T.legR.H,6.5,-.8,C.force,a);}
  a=win(t,4.15,4.75);
  api.tag('panturrilha contra panturrilha',lerp2(T.legR.E,T.legR.H,.5),8.5,1,C.gold,a);
  a=win(t,4.4,5.35);
  if(a>0){api.arc(T.hip,.62,-55,-165,C.force,a);
   api.tag('a perna sobe, o tronco desce',[T.hip[0]-.55,T.hip[1]+.5],0,0,C.force,a,false);}
  a=win(t,5.5,7.9);
  api.tag('manga segura até o fim',T.armL.H,6.5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,1,3.4,C.uke,a);}
});})();
