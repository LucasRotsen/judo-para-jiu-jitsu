(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em +x olhando para -x (direita de Tori = -z). A perna direita de Tori e a perna
   esquerda de Uke ficam do mesmo lado (-z): o gancho entra por dentro, vindo do espaço entre as pernas. */
const uke0={x:-.30,y:.90,z:0,yaw:0,h:5,
 leg:{R:W3(-.27,.07,.16),L:W3(-.33,.07,-.16)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.20,.20,.24)}};
const tori0={x:.30,y:.90,z:0,yaw:180,h:5,
 leg:{L:W3(.27,.07,.16),R:W3(.33,.07,-.16)},
 arm:{L:SL('armR',.35),R:B('o',.16,.40,-.09)}};
Judo.register3d({
 id:'o-uchi-gari', name:'O Uchi Gari', kanji:'大内刈',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'O uchi gari, a ceifada por dentro',
 why:'Entrada curta e segura, sem dar as costas. Uke cai de costas e Tori já cai dentro da guarda, pronto para passar.',
 summary:'Grande ceifada por dentro. Tori empurra Uke para trás, sobre o calcanhar esquerdo, entra perto e passa a perna direita por dentro das pernas dele. A panturrilha engancha a perna esquerda de Uke e a ceifa num arco, como uma meia-lua desenhada no chão, enquanto o peito empurra. Uke cai de costas.',
 reading:[{k:'大',r:'o',m:'grande'},{k:'内',r:'uchi',m:'por dentro'},{k:'刈',r:'gari',m:'ceifada'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['O segredo','O peso de Uke precisa estar no calcanhar da perna atacada. Perna sem peso não cai, só se mexe.'],
  ['Qual perna ceifa qual','A perna direita de Tori ceifa a perna esquerda de Uke, por dentro. Visto de cima, o pé de Tori desenha uma meia-lua: entra entre os pés de Uke, contorna o calcanhar e abre para fora.'],
  ['No jiu-jitsu','É uma das quedas mais usadas no jiu-jitsu em pé: Tori não dá as costas e, quando Uke cai, já está entre as pernas dele, na guarda, pronto para passar.']],
 errors:[['Ceifar sem kuzushi','Se o peso de Uke está na ponta dos pés, ele levanta a perna e o golpe vira um chute no vazio.'],
  ['Entrar longe','Com o quadril longe, a perna não alcança o calcanhar e o peito não empurra. Tori entra até encostar o peito.'],
  ['Ceifar com o pé','O contato é panturrilha contra panturrilha, na dobra do joelho. Só o pé engancha pouco.'],
  ['Cair com as duas mãos no chão','Tori acompanha a queda e cai por cima, mas solta a manga só depois. Apoiar as mãos à frente entrega a guarda fechada a Uke.']],
 safety:['Uke precisa dominar o ukemi para trás (ushiro ukemi): queixo no peito e braços batendo no tatame.',
  'Tori não despenca com o peso todo sobre Uke: acompanha a queda e apoia o joelho.',
  'Pratique primeiro o gancho parado, sem projetar, até o movimento da perna ficar limpo.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke e a direita na gola esquerda. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Pés na largura dos ombros.']},
 {s:1,e:2.7,kanji:'崩し',ro:'Kuzushi',pt:'Para trás, sobre o calcanhar',
  d:'Tori dá um passo à frente e empurra Uke para trás e para o lado esquerdo dele. O peso de Uke vai para o calcanhar esquerdo, e essa perna fica presa no chão.',
  l:['A direção é a diagonal de trás, do lado do calcanhar atacado.','O tsurite empurra a gola para trás e para baixo.','Tori aproxima o quadril até o peito encostar.']},
 {s:2.7,e:3.5,kanji:'作り',ro:'Tsukuri',pt:'O gancho por dentro',
  d:'Com o peito colado, Tori passa a perna direita por dentro, entre as pernas de Uke, e engancha a panturrilha esquerda dele por trás. As duas panturrilhas se cruzam na dobra do joelho.',
  l:['A perna entra pelo meio, não por fora.','Panturrilha contra panturrilha, joelho dobrado.','O pé de apoio de Tori fica perto, com o joelho flexionado.']},
 {s:3.5,e:4.9,kanji:'掛け',ro:'Kake',pt:'Ceifar em meia-lua',
  d:'Tori ceifa a perna de Uke num arco, com o pé rente ao chão, abrindo-a para fora e para a frente, enquanto o peito empurra para trás. Sem a perna de apoio, Uke cai de costas.',
  l:['Na vista de cima: o pé de Tori desenha uma meia-lua.','Peito e perna trabalham juntos, em direções opostas.','Tori acompanha Uke na queda.']},
 {s:4.9,e:8.5,kanji:'残心',ro:'Zanshin',pt:'Dentro da guarda',
  d:'Uke cai de costas com as pernas abertas. Tori cai de joelhos entre elas, com o quadril baixo e as mãos no quadril de Uke. No jiu-jitsu, já está dentro da guarda aberta, pronto para passar.',
  l:['Uke faz ushiro ukemi: queixo no peito, braços batendo.','Tori cai de joelhos, sem desabar sobre Uke.','Mãos no quadril de Uke controlam a guarda antes da passagem.']}],
 rep:[.5,2.2,3.1,4.0,7.0], cover:3.3,
 views:[
  {name:'Diagonal',a:215,e:20,center:[-.15,.88,0],span:3.6},
  {name:'De cima',a:180,e:84,center:[-.3,.2,-.12],span:2.9},
  {name:'Lateral',a:180,e:8,center:[-.1,.95,0],span:3.8}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 [2.0,{tori:{x:.14,y:.88,pitch:6,leg:{L:W3(.04,.07,.14),R:W3(.20,.07,-.10)},arm:{R:B('o',.12,.40,-.10)}},
       uke:{x:-.34,y:.90,pitch:-6,z:-.02,leg:{R:W3(-.24,.10,.17),L:W3(-.36,.07,-.18)}}}],
 [2.7,{tori:{x:.08,y:.85,pitch:10,leg:{L:W3(.0,.07,.14),R:W3(-.08,.20,-.06)}},
       uke:{x:-.36,pitch:-9,z:-.03}}],
 [3.2,{tori:{x:.06,y:.83,pitch:14,leg:{R:W3(-.46,.12,-.10)},pole:{legR:[1,-.4,.4]}},
       uke:{x:-.37,y:.89,pitch:-11}}],
 [3.5,{}],
 [3.9,{tori:{x:.02,y:.82,pitch:20,leg:{R:W3(-.34,.14,-.44)}},
       uke:{x:-.42,y:.84,pitch:-26,leg:{L:W3(-.26,.24,-.40)}}}],
 [4.3,{tori:{x:-.04,y:.74,pitch:32,leg:{R:W3(-.12,.10,-.40),L:W3(.06,.07,.14)}},
       uke:{x:-.50,y:.50,pitch:-60,h:20,leg:{R:W3(-.28,.32,.30),L:W3(-.12,.42,-.34)},arm:{L:B('s',.1,.3,-.5)}}}],
 [4.9,{tori:{x:-.04,y:.48,pitch:70,leg:{R:W3(.18,.07,-.16),L:W3(.30,.07,.18)},pole:{legR:[1,-.2,.15]},arm:{R:B('o',.18,.40,-.05)}},
       uke:{x:-.58,y:.13,pitch:-88,h:28,leg:{R:W3(-.12,.07,.32),L:W3(-.10,.25,-.38)},arm:{R:B('s',.35,.35,.15),L:B('s',-.05,0,-.55)}}}],
 [5.6,{}],
 [6.6,{tori:{x:.12,y:.50,pitch:30,h:-5,leg:{R:W3(.36,.07,-.16),L:W3(.36,.07,.16)},arm:{R:W3(-.46,.20,-.20),L:W3(-.46,.20,.20)}},
       uke:{h:20,leg:{R:W3(-.05,.07,.33),L:W3(-.05,.07,-.33)},arm:{R:B('s',.26,.34,-.12),L:B('s',.26,.34,.12)}}}],
 [8.5,{}]],
 names:F=>F.t>4.5?{uke:[F.uke.head[0]-.1,F.uke.head[1]+.38,F.uke.head[2]]}:{},
 xray:{s:2.8,e:4.1,key:'U.L.leg'},
 glow:{s:2.6,e:4.6,limbs:{'T.R.leg':'force','U.L.leg':'gold'}},
 stamp:{s:4.95,e:6.4,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  if(vi===1){a=win(t,3.0,4.6);
   if(a>0){api.arc([-.34,.04,-.22],[1,0,0],[0,0,1],.2,140,330,C.force,a);
    api.tag('meia-lua no chão',T.legR.H,6,4,C.force,a);}
   return;}
  if(vi!==0)return;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,4,-4,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6,-4,C.force,a);
  a=win(t,1.2,2.8);
  if(a>0){const c=api.add(T.sh,[-.05,.05,0]);api.arrow(c,api.add(c,[-.32,0,-.14]),C.force,a);
   api.tag('empurra para trás e para a esquerda de Uke',api.add(c,[-.32,0,-.14]),2,-2.6,C.force,a,false);
   api.ring(U.legL.H,.12,C.gold,a);api.tag('peso no calcanhar esquerdo',U.legL.H,-8,3,C.gold,a);}
  a=win(t,2.8,3.7);
  if(a>0){api.tag('perna entra por dentro',T.legR.E,9,-2,C.force,a);
   api.tag('panturrilha contra panturrilha',api.lerp3(U.legL.E,U.legL.H,.45),-9,2.5,C.gold,a);}
  a=win(t,3.6,4.7);
  if(a>0){api.tag('ceifa em arco e o peito empurra',T.legR.H,6,3.5,C.force,a);}
  a=win(t,5.4,8.4);
  api.tag('joelhos entre as pernas de Uke',T.legR.E,6,3.5,C.force,a);
  api.tag('mãos no quadril',T.armR.H,-6,-3,C.force,a);}
});})();
