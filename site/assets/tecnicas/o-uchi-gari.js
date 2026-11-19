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
 why:'Entrada curta e segura, sem dar as costas. Uke cai de costas e Tori fica de pé entre as pernas dele, pronto para passar a guarda.',
 summary:'Grande ceifada por dentro. Tori empurra Uke para trás, sobre o calcanhar esquerdo, entra perto e passa a perna direita por dentro das pernas dele. A panturrilha engancha a perna esquerda de Uke e a ceifa num arco, como uma meia-lua desenhada no chão, enquanto o peito empurra. Uke cai de costas.',
 reading:[{k:'大',r:'o',m:'grande'},{k:'内',r:'uchi',m:'por dentro'},{k:'刈',r:'gari',m:'ceifada'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['O segredo','O peso de Uke precisa estar no calcanhar da perna atacada. Perna sem peso não cai, só se mexe.'],
  ['Qual perna ceifa qual','A perna direita de Tori ceifa a perna esquerda de Uke, por dentro. Visto de cima, o pé de Tori desenha uma meia-lua: entra entre os pés de Uke, contorna o calcanhar e abre para fora.'],
  ['No jiu-jitsu','É uma das quedas mais usadas no jiu-jitsu em pé: Tori não dá as costas e, quando Uke cai, já está entre as pernas dele, na guarda, pronto para passar.']],
 errors:[['Ceifar sem kuzushi','Se o peso de Uke está na ponta dos pés, ele levanta a perna e o golpe vira um chute no vazio.'],
  ['Entrar longe','Com o quadril longe, a perna não alcança o calcanhar e o peito não empurra. Tori entra até encostar o peito.'],
  ['Ceifar com o pé','O contato é panturrilha contra panturrilha, na dobra do joelho. Só o pé engancha pouco.'],
  ['Cair junto','Tori acompanha a queda com um passo, mas fica de pé e segura a manga. Cair de joelhos ou apoiar as mãos à frente entrega a guarda fechada a Uke.']],
 safety:['Uke precisa dominar o ukemi para trás (ushiro ukemi): queixo no peito e braços batendo no tatame.',
  'Tori não despenca sobre Uke: acompanha a queda com um passo e fica de pé.',
  'Pratique primeiro o gancho parado, sem projetar, até o movimento da perna ficar limpo.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.coxaR',b:'U.coxaL',s:2.9,e:4.0,txt:'o gancho entra por dentro: a perna direita de Tori contra a perna esquerda de Uke'},
  {c:'lado',a:'T.peR',de:'U.peL',lado:'tras',s:3.2,e:4.0,txt:'o pé direito de Tori engancha por trás do calcanhar esquerdo de Uke'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'frente',s:5.0,e:'fim',min:.4,txt:'Uke cai de costas à frente de Tori, que fica dentro da guarda'}],
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
  d:'Uke cai de costas com as pernas abertas. Tori dá um passo com a perna esquerda e fica de pé entre elas, inclinado à frente, segurando a manga direita de Uke no alto e a gola com a outra mão. No jiu-jitsu, já está dentro da guarda aberta, de pé, pronto para passar.',
  l:['Uke faz ushiro ukemi: queixo no peito, o braço livre bate no tatame.','Tori fica de pé, base larga, sem cair junto.','A manga presa no alto controla Uke antes da passagem.']}],
 rep:[.5,2.2,3.1,4.0,7.0], cover:3.3,
 views:[
  {name:'Diagonal',a:215,e:20,center:[-.35,.80,0],span:3.8},
  {name:'De cima',a:180,e:84,center:[-.55,.2,-.05],span:3.0},
  {name:'Lateral',a:180,e:8,center:[-.40,.90,0],span:3.9}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* Poses conferidas com o vídeo da Kodokan (大内刈 / O-uchi-gari): Tori entra até o peito encostar,
    a perna direita engancha por dentro a panturrilha esquerda de Uke e ceifa para fora; Uke cai reto
    para trás; Tori acompanha com um passo da perna esquerda e termina DE PÉ, inclinado, entre as pernas
    de Uke, segurando a manga direita dele no alto. */
 [2.0,{tori:{x:.10,y:.88,pitch:8,leg:{L:W3(.10,.07,.22),R:W3(.18,.07,-.10)},arm:{R:B('o',.12,.40,-.10)}},
       uke:{x:-.34,y:.90,pitch:-6,z:-.02,leg:{R:W3(-.24,.10,.17),L:W3(-.36,.07,-.18)}}}],
 [2.7,{tori:{x:-.02,y:.84,pitch:13,leg:{L:W3(.0,.07,.26),R:W3(-.20,.16,-.03)},pole:{legR:[1,-.4,0]}},
       uke:{x:-.37,pitch:-10,z:-.04}}],
 [3.2,{tori:{x:-.06,y:.81,pitch:16,leg:{R:W3(-.48,.15,-.13)},pole:{legR:[1,-.5,.05]}},
       uke:{x:-.38,y:.89,pitch:-12}}],
 [3.5,{}],
 /* ceifa em meia-lua: o pé sai de trás do calcanhar, abre para fora e leva a perna de Uke junto */
 [3.9,{tori:{x:-.12,y:.80,pitch:20,leg:{R:W3(-.40,.28,-.42)},pole:{legR:[1,-.2,.5]}},
       uke:{x:-.46,y:.84,pitch:-20,h:10,gf:0,leg:{L:B('s',.38,-.74,-.26)},pole:{legL:[1,-.3,-.3]}}}],
 [4.3,{tori:{x:-.30,y:.74,z:-.15,pitch:34,h:8,leg:{R:W3(.20,.50,-.34),L:W3(-.34,.22,.30)},pole:{legR:[.4,-1,.2]},
        arm:{R:B('o',.20,.32,-.08),L:SL('armR',.45)}},
       uke:{x:-.64,y:.48,pitch:-55,h:25,leg:{R:B('s',.30,-.78,.16),L:B('s',.55,-.60,-.30)},
        arm:{R:B('s',.40,.40,.22),L:B('s',.10,.25,-.55)}}}],
 [4.6,{tori:{x:-.44,y:.64,z:-.08,pitch:48,leg:{R:W3(.04,.24,-.18),L:W3(-.72,.07,.36)},pole:{legL:[.3,1,-.1]}},
       uke:{x:-.80,y:.22,pitch:-80,h:28,leg:{R:W3(-.22,.12,.36),L:B('s',.48,-.66,-.32)}}}],
 [4.9,{tori:{x:-.50,y:.60,z:-.02,pitch:55,h:10,leg:{R:W3(-.08,.07,-.05),L:W3(-.78,.07,.36)},pole:{legR:[.7,.1,.1],legL:[.3,1,-.1]},
        arm:{R:B('o',.22,.25,-.06),L:SL('armR',.55)}},
       uke:{x:-.86,y:.13,pitch:-88,h:28,gf:1,leg:{R:W3(-.18,.07,.40),L:W3(-.22,.10,-.40)},pole:{legR:[1,0,.2],legL:[1,0,-.2]},
        arm:{R:B('s',.50,.30,.20),L:W3(-1.00,.05,-.55)}}}],
 [5.6,{}],
 [6.6,{tori:{y:.62,pitch:52,h:5},uke:{h:22}}],
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
  api.tag('de pé entre as pernas de Uke',T.legR.E,6,3.5,C.force,a);
  api.tag('manga presa no alto',T.armL.H,-6,-3,C.force,a);}
});})();
