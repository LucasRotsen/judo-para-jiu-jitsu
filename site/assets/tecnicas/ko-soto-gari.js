(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em +x olhando para -x (direita de Tori = -z, esquerda = +z).
   Uke avança o pé direito (lado +z). Tori pisa à frente com o pé direito, gira um pouco deixando o lado
   esquerdo à frente, e o pé esquerdo dele contorna POR FORA o pé direito de Uke (pelo lado +z, longe das
   pernas de Uke) até a sola encostar atrás do calcanhar. A sola ceifa esse calcanhar para +x, na direção
   dos dedos de Uke, enquanto as mãos empurram o tronco para trás. Uke cai de costas, para trás (-x). */
const uke0={x:-.30,y:.90,z:0,yaw:0,h:5,
 leg:{R:W3(-.27,.07,.16),L:W3(-.33,.07,-.16)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.20,.20,.24)}};
const tori0={x:.30,y:.90,z:0,yaw:180,h:5,
 leg:{L:W3(.27,.07,.16),R:W3(.33,.07,-.16)},
 arm:{L:SL('armR',.35),R:B('o',.16,.40,-.09)}};
Judo.register3d({
 id:'ko-soto-gari', name:'Ko Soto Gari', kanji:'小外刈',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'Ko soto gari, a pequena ceifada por fora',
 why:'Ataque curto contra quem pisa à frente com o peso no calcanhar. Tori não entra fundo nem dá as costas, e quando Uke cai já está de pé ao lado dele, na altura da cintura, segurando a manga.',
 summary:'Pequena ceifada por fora. Uke avança o pé direito e Tori empurra o tronco dele para trás, sobre esse calcanhar. O pé esquerdo de Tori contorna por fora o pé direito de Uke e a sola encosta atrás do calcanhar. A sola ceifa o pé para frente, na direção dos dedos de Uke, enquanto as mãos empurram para trás e para baixo. Sem apoio, Uke cai de costas.',
 reading:[{k:'小',r:'ko',m:'pequeno'},{k:'外',r:'soto',m:'por fora'},{k:'刈',r:'gari',m:'ceifada'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','2º grupo (Dai-nikyo)'],
  ['Qual pé ceifa qual','O pé esquerdo de Tori ceifa o pé direito de Uke, por fora. O contato é a sola de Tori contra a parte de trás do calcanhar de Uke.'],
  ['Direção da ceifada','Para onde apontam os dedos do pé de Uke. O pé dele sai do chão para frente e o tronco, empurrado pelas mãos, vai para trás.'],
  ['Diferença para o ko uchi gari','No ko uchi gari o pé de Tori entra por dentro, entre os pés de Uke. No ko soto gari ele contorna o pé de Uke por fora.'],
  ['Diferença para o o soto gari','No o soto gari Tori cola o peito no de Uke e ceifa a coxa com a perna inteira. No ko soto gari é só a sola contra o calcanhar, num movimento curto.'],
  ['No jiu-jitsu','Funciona quando o oponente pisa à frente com o peso no pé da frente. Uke cai de costas e Tori fica de pé ao lado do quadril dele, segurando a manga, já fora das pernas.']],
 errors:[['Ceifar sem kuzushi','Se o peso de Uke não está no calcanhar, o pé dele só levanta e Uke recupera a base.'],
  ['Ceifar para o lado','A ceifada vai na direção dos dedos de Uke. Varrer o pé para o lado vira um de ashi barai mal feito.'],
  ['Usar a canela ou a panturrilha','O contato é a sola, rente ao chão, atrás do calcanhar. Enganchar com a perna é ko soto gake, outra técnica.'],
  ['Mãos paradas','Pé e mãos trabalham juntos, em direções opostas. Sem o empurrão do tronco para trás, Uke só perde o pé.']],
 safety:['Uke precisa dominar o ushiro ukemi: queixo no peito e braço batendo no tatame.',
  'Ceife com a sola, nunca com o calcanhar ou com a canela contra o tornozelo de Uke.',
  'Tori acompanha a queda de pé e segura a manga, sem despencar sobre Uke.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke e a mão direita na gola esquerda. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Pés na largura dos ombros.']},
 {s:1,e:2.8,kanji:'崩し',ro:'Kuzushi',pt:'Peso no calcanhar direito',
  d:'Uke avança o pé direito. Tori pisa com o pé direito à frente e por fora do pé direito de Uke, ficando ao lado direito dele, gira o corpo deixando o lado esquerdo à frente e empurra o tronco de Uke para trás, na diagonal do lado direito dele. O peso de Uke vai para o calcanhar direito.',
  l:['O tsurite empurra a gola para trás.','O hikite puxa a manga para baixo.','Tori sai da frente de Uke e se coloca ao lado direito dele.']},
 {s:2.8,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'A sola por fora, atrás do calcanhar',
  d:'O pé esquerdo de Tori sai do chão, contorna por fora o pé direito de Uke e encosta a sola na parte de trás do calcanhar dele. O pé fica rente ao chão, com a sola virada para o calcanhar.',
  l:['O pé passa por fora, longe das pernas de Uke.','Sola contra o calcanhar, não a canela.','A perna direita de Tori sustenta o peso, joelho flexionado.']},
 {s:3.6,e:5.0,kanji:'掛け',ro:'Kake',pt:'Ceifar na direção dos dedos',
  d:'A sola ceifa o calcanhar direito de Uke para frente, na direção dos dedos dele, enquanto as mãos empurram o tronco para trás e para baixo. O pé de Uke sai do chão e ele cai de costas.',
  l:['Pé e mãos trabalham juntos, em direções opostas.','O pé de Uke vai para frente, o tronco para trás.','Tori não solta a manga.']},
 {s:5.0,e:10,kanji:'残心',ro:'Zanshin',pt:'De pé, segurando a manga',
  d:'Uke cai de costas, com o queixo no peito, e bate o braço esquerdo no tatame. Tori apoia o pé esquerdo, dá um passo para o lado de Uke e fica de pé junto ao quadril direito dele, de frente para ele, inclinado, puxando a manga direita para cima.',
  l:['Uke faz ushiro ukemi: queixo no peito, a cabeça não toca o tatame.','Tori fica de pé, base larga, sem cair junto.','A manga presa controla Uke antes da passagem.']}],
 rep:[.5,2.4,3.3,4.2,7.0], cover:3.9,
 views:[
  {name:'Diagonal',a:-40,e:14,center:[-.35,.90,.20],span:3.6},
  {name:'Pés, de cima',a:0,e:60,center:[-.38,.25,.05],span:3.3},
  {name:'Lateral',a:0,e:8,center:[-.40,.90,.2],span:3.9}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 [2.0,{tori:{x:.12,y:.89,z:.20,yaw:160,pitch:6,leg:{R:W3(.20,.07,.02)}},
       uke:{x:-.25,pitch:2,leg:{R:W3(-.13,.07,.19)}}}],
 [2.4,{tori:{x:.06,y:.88,z:.30,yaw:148,pitch:9,leg:{R:W3(.17,.07,.36),L:W3(.16,.12,.54)},pole:{legL:[1,0,-.5]}},
       uke:{x:-.27,z:.01,pitch:-3}}],
 [2.8,{tori:{x:.00,y:.86,z:.38,yaw:138,pitch:12,h:10,leg:{R:W3(.15,.07,.43),L:W3(-.10,.13,.58)},pole:{legL:[1,0,-.6]},
        arm:{R:B('o',.14,.38,-.09)}},
       uke:{x:-.29,y:.89,z:.02,pitch:-6,h:6}}],
 [3.3,{tori:{x:-.04,y:.84,z:.40,yaw:130,pitch:14,leg:{L:W3(-.23,.09,.26)},pole:{legL:[1,-.1,-.4]}},
       uke:{x:-.31,y:.88,pitch:-9,h:8}}],
 [3.6,{}],
 [3.95,{tori:{x:-.06,y:.84,pitch:16,leg:{L:W3(-.08,.14,.25)},arm:{R:B('o',.14,.34,-.08),L:SL('armR',.40)}},
       uke:{x:-.40,y:.84,pitch:-18,h:12,gf:0,leg:{R:W3(-.03,.18,.20)},pole:{legR:[1,-.1,0]}}}],
 [4.3,{tori:{x:-.14,y:.80,z:.42,yaw:124,pitch:22,h:10,leg:{L:W3(-.32,.07,.48)},pole:{legL:[1,-.1,-.3]}},
       uke:{x:-.54,y:.55,z:.08,pitch:-48,h:25,leg:{R:W3(.00,.38,.10),L:B('s',.32,-.72,-.18)},pole:{legR:[1,.2,0]},
        arm:{R:B('s',.40,.40,.22),L:B('s',.10,.25,-.55)}}}],
 [4.65,{tori:{x:-.28,y:.79,z:.48,yaw:115,pitch:28,
        arm:{R:B('s',.25,.0,.25),L:SL('armR',.55)}},
       uke:{x:-.64,y:.18,z:.14,pitch:-82,h:30,gf:1,leg:{R:W3(-.06,.26,.10),L:W3(-.24,.07,-.22)},pole:{legL:[1,0,-.2]},
        arm:{R:B('s',.50,.20,.26),L:W3(-.80,.05,-.48)}}}],
 [5.0,{tori:{x:-.34,y:.78,z:.54,yaw:108,pitch:32,h:12,leg:{L:W3(-.52,.15,.52)}},
       uke:{x:-.66,y:.13,z:.15,pitch:-88,h:28,leg:{R:W3(.00,.07,.12),L:W3(-.16,.07,-.22)},pole:{legR:[1,0,.2],legL:[1,0,-.2]},
        arm:{R:B('s',.47,.16,.30)}}}],
 [5.3,{tori:{x:-.40,y:.77,z:.58,yaw:100,leg:{L:W3(-.70,.07,.52)}}}],
 [5.6,{tori:{x:-.44,y:.76,z:.62,yaw:96,leg:{R:W3(-.06,.16,.52)}}}],
 [5.9,{tori:{x:-.45,y:.75,z:.62,yaw:95,pitch:38,leg:{R:W3(-.20,.07,.68)}}}],
 [7.0,{tori:{pitch:36,h:8},uke:{h:24}}],
 [10,{}]],
 /* a sola de Tori encosta no calcanhar de Uke de propósito */
 aperto:{s:3.1,e:4.1,limbs:['T.L.leg'],tol:.10,tudo:true},
 names:F=>F.t>4.5?{uke:[F.uke.head[0]-.1,F.uke.head[1]+.38,F.uke.head[2]]}:{},
 glow:{s:2.8,e:4.4,limbs:{'T.L.leg':'force','U.R.leg':'gold'}},
 stamp:{s:5.05,e:6.6,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  if(vi===1){a=win(t,3.0,4.3);
   if(a>0){api.ring(T.legL.toe,.08,C.force,win(t,3.0,3.7));
    api.tag('sola atrás do calcanhar, por fora',T.legL.H,7,4,C.force,win(t,3.0,3.7));
    api.arrow([-.22,.10,.27],[.04,.12,.25],C.force,win(t,3.6,4.3));
    api.tag('ceifa na direção dos dedos',[.04,.12,.25],-9,4,C.force,win(t,3.6,4.3),false);}
   return;}
  if(vi!==0)return;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,4,-4,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6,-4,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const c=api.add(T.sh,[-.05,.05,0]);api.arrow(c,api.add(c,[-.32,-.06,.12]),C.force,a);
   api.tag('empurra para trás e para a direita de Uke',api.add(c,[-.32,-.06,.12]),2,-2.6,C.force,a,false);
   api.ring(U.legR.H,.12,C.gold,a);api.tag('peso no calcanhar direito',U.legR.H,-8,3,C.gold,a);}
  a=win(t,2.9,3.7);
  if(a>0){api.tag('pé esquerdo contorna por fora',T.legL.E,9,-2,C.force,a);
   api.tag('sola contra o calcanhar',T.legL.H,-9,3,C.gold,a);}
  a=win(t,3.6,4.6);
  if(a>0)api.tag('ceifa para frente, mãos para trás',T.legL.H,6,3.5,C.force,a);
  a=win(t,5.2,9.8);
  api.tag('manga presa no alto',T.armL.H,-6,-3,C.force,a);
  api.tag('queixo no peito',U.head,-4,3.4,C.uke,win(t,4.6,7.5));}
});})();
