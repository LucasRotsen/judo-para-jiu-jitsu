(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z).
   Tori começa em +x olhando para -x (direita de Tori = -z). O pé esquerdo de Tori pisa ao lado do
   pé direito de Uke (+z) e a perna direita de Tori passa por fora (+z) e por trás da perna direita
   de Uke, ceifando-a de trás para frente. Uke cai de costas para -x. */
const uke0={x:-.30,y:.90,z:0,yaw:0,h:5,
 leg:{R:W3(-.27,.07,.16),L:W3(-.33,.07,-.16)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.20,.20,.24)}};
const tori0={x:.30,y:.90,z:0,yaw:180,h:5,
 leg:{L:W3(.27,.07,.16),R:W3(.33,.07,-.16)},
 arm:{L:SL('armR',.35),R:B('o',.16,.40,-.09)}};
Judo.register3d({
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
 rep:[.5,2.2,3.3,4.4,7], cover:4.5,
 views:[
  {name:'Por trás de Uke',a:-62,e:16,center:[-.3,.90,.2],span:3.8},
  {name:'Lado direito de Uke',a:14,e:14,center:[-.25,.85,.2],span:3.7},
  {name:'De cima',a:0,e:86,center:[-.3,.1,.2],span:3.1}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 [2.0,{tori:{x:.0,y:.88,z:.26,yaw:186,pitch:6,leg:{L:W3(-.16,.07,.42),R:W3(.20,.07,.12)},arm:{R:B('o',.14,.42,-.08)}},
       uke:{x:-.34,y:.89,pitch:-8,leg:{R:W3(-.28,.07,.17),L:W3(-.40,.10,-.17)}}}],
 [2.9,{tori:{x:-.10,y:.86,z:.34,yaw:184,pitch:10,leg:{L:W3(-.18,.07,.46),R:W3(-.06,.34,.30)},pole:{legR:[1,-.3,.3]}},
       uke:{x:-.36,pitch:-11}}],
 [3.5,{tori:{x:-.12,y:.86,z:.34,pitch:14,leg:{R:W3(-.60,.24,.25)}},
       uke:{x:-.37,y:.89,pitch:-13}}],
 [4.0,{}],
 [4.4,{tori:{x:-.10,y:.81,pitch:34,leg:{R:W3(-.30,.56,.25)},pole:{legR:[1,-.6,.3]}},
       uke:{x:-.47,y:.80,pitch:-40,h:18,leg:{R:W3(-.12,.30,.0),L:W3(-.44,.07,-.17)},arm:{L:B('s',.1,.3,-.5)},pole:{legR:[.4,0,-1]}}}],
 [4.75,{tori:{x:-.08,y:.80,pitch:50,leg:{R:W3(.30,.92,.30)},arm:{R:B('s',.30,.30,.14)}},
        uke:{x:-.62,y:.46,pitch:-66,h:24,arm:{R:B('s',.36,.30,.30)},leg:{R:W3(-.10,.66,.0),L:W3(-.24,.36,-.18)}}}],
 [5.15,{tori:{x:-.85,y:.66,z:.40,yaw:166,pitch:44,leg:{R:W3(-.62,.10,.40),L:W3(-.86,.07,.86)},pole:{legR:[1,-.2,.15]}},
        uke:{x:-.72,y:.13,pitch:-88,h:28,leg:{R:W3(-.24,.20,.30),L:W3(-.28,.10,-.22)},arm:{R:W3(-.90,.70,.60),L:B('s',-.05,0,-.55)}}}],
 [5.6,{}],
 [6.4,{tori:{x:-.95,y:.62,z:.40,yaw:160,pitch:48,h:-10,leg:{R:W3(-.68,.07,.42),L:W3(-.98,.07,.88)},arm:{R:B('s',.22,.24,.2)}},
       uke:{h:20,leg:{R:W3(-.17,.07,.30),L:W3(-.20,.07,-.26)},arm:{R:W3(-.90,.70,.60)}}}],
 [8,{}]],
 names:F=>F.t>4.6?{uke:[F.uke.head[0]-.1,F.uke.head[1]+.36,F.uke.head[2]]}:{},
 glow:{s:3.0,e:4.9,limbs:{'T.R.leg':'force','U.R.leg':'gold'}},
 stamp:{s:5.2,e:7.6,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  if(vi===2){a=win(t,1.6,3.0);
   if(a>0){api.ring(T.legL.H,.1,C.force,a);api.tag('pé esquerdo ao lado do pé de Uke',T.legL.H,7,2.5,C.force,a);}
   a=win(t,3.0,4.3);api.tag('perna passa por fora',T.legR.H,7,-2.5,C.force,a);
   return;}
  if(vi!==0)return;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,7,2,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-7,2,C.force,a);
  a=win(t,1.5,3.0);
  if(a>0){const c=api.add(U.sh,[.05,.06,0]);api.arrow(c,api.add(c,[-.34,.04,.14]),C.force,a);
   api.tag('para trás, sobre o calcanhar direito',api.add(c,[-.34,.04,.14]),-2,-2.6,C.force,a,false);
   api.ring(U.legR.H,.12,C.gold,a);}
  a=win(t,2.9,4.0);
  if(a>0){api.tag('peito colado',api.bp(T,.14,.40,0),7,-3,C.force,a);
   api.tag('perna passa por fora e por trás',T.legR.E,-8,2.5,C.force,a);}
  a=win(t,3.9,4.55);
  api.tag('panturrilha contra panturrilha',api.lerp3(U.legR.E,U.legR.H,.5),-9,2.5,C.gold,a);
  a=win(t,4.55,5.15);
  api.tag('a perna sobe, o tronco desce',T.legR.H,6,-2,C.force,a);
  a=win(t,5.4,7.9);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-2,3.2,C.uke,a);}
});})();
