(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em +x olhando para -x (direita de Tori = -z, esquerda = +z).
   O pé direito de Uke fica do lado +z, na frente do pé esquerdo de Tori. O pé direito de Tori atravessa
   para o lado +z por dentro (entre os pés de Uke), encosta a sola atrás do calcanhar direito de Uke e o
   ceifa para +x, na direção para onde apontam os dedos de Uke. Uke cai reto para trás (-x), de costas. */
const uke0={x:-.30,y:.90,z:0,yaw:0,h:5,
 leg:{R:W3(-.27,.07,.16),L:W3(-.33,.07,-.16)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.20,.20,.24)}};
const tori0={x:.30,y:.90,z:0,yaw:180,h:5,
 leg:{L:W3(.27,.07,.16),R:W3(.33,.07,-.16)},
 arm:{L:SL('armR',.35),R:B('o',.16,.40,-.09)}};
Judo.register3d({
 id:'ko-uchi-gari', name:'Ko Uchi Gari', kanji:'小内刈',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'Ko uchi gari, a pequena ceifada por dentro',
 why:'Ataque curto, sem dar as costas e sem entrar fundo. Tori fica de pé, de frente para Uke, e quando ele cai já está na frente das pernas dele, pronto para passar a guarda.',
 summary:'Pequena ceifada por dentro. Tori empurra Uke para trás, sobre o calcanhar direito, passa o pé direito por dentro, entre os pés dele, e encosta a sola atrás do calcanhar direito de Uke. A sola ceifa esse pé para frente, na direção dos dedos dele, enquanto as mãos empurram para trás e para baixo. Sem o apoio, Uke cai de costas.',
 reading:[{k:'小',r:'ko',m:'pequeno'},{k:'内',r:'uchi',m:'por dentro'},{k:'刈',r:'gari',m:'ceifada'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['Qual pé ceifa qual','O pé direito de Tori ceifa o pé direito de Uke, por dentro. O contato é a sola de Tori contra a parte de trás do calcanhar de Uke.'],
  ['Direção da ceifada','Para onde apontam os dedos do pé de Uke. O pé dele desliza para frente rente ao chão e o corpo fica para trás.'],
  ['Diferença para o o uchi gari','No o uchi gari a perna inteira engancha a perna esquerda de Uke e a ceifa em arco para fora. No ko uchi gari é só o pé, contra o calcanhar do pé direito, num movimento curto.'],
  ['No jiu-jitsu','Entra bem quando o oponente pisa à frente com o pé do mesmo lado da sua pegada na gola. Uke cai de costas e Tori fica em pé diante das pernas dele, já em posição de passar a guarda.']],
 errors:[['Ceifar sem kuzushi','Se o peso de Uke não está no calcanhar, ele só levanta o pé e o golpe passa no vazio.'],
  ['Ceifar para o lado','A ceifada vai na direção dos dedos de Uke. Puxar o pé para o lado abre as pernas dele, mas não tira o apoio.'],
  ['Usar a perna em vez do pé','O contato é a sola, atrás do calcanhar, com o pé rente ao chão. Enganchar com a panturrilha vira outra técnica.'],
  ['Mãos paradas','Sem as mãos empurrando para trás e para baixo, Uke só perde o pé e recupera o equilíbrio.']],
 safety:['Uke precisa dominar o ushiro ukemi: queixo no peito e braços batendo no tatame.',
  'Ceife com a sola, nunca com o calcanhar ou com a canela contra o tornozelo de Uke.',
  'Tori acompanha a queda com um passo e fica de pé, sem despencar sobre Uke.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke e a mão direita na gola esquerda. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Pés na largura dos ombros.']},
 {s:1,e:2.8,kanji:'崩し',ro:'Kuzushi',pt:'Peso no calcanhar direito',
  d:'Uke avança o pé direito. Tori dá um passo curto com o pé esquerdo e empurra Uke para trás, na diagonal do lado direito dele. O peso de Uke vai para o calcanhar direito.',
  l:['O tsurite empurra a gola para trás e para baixo.','O hikite puxa a manga para baixo.','Tori gira um pouco para a esquerda, deixando o lado direito à frente.']},
 {s:2.8,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'A sola atrás do calcanhar',
  d:'Tori passa o pé direito por dentro, entre os pés de Uke, e encosta a sola na parte de trás do calcanhar direito dele. O pé de Tori fica rente ao chão, com a ponta virada para dentro.',
  l:['O pé entra pelo meio, não por fora.','Sola contra o calcanhar, não a canela.','O pé esquerdo de Tori sustenta o peso, joelho flexionado.']},
 {s:3.6,e:5.0,kanji:'掛け',ro:'Kake',pt:'Ceifar para frente',
  d:'A sola ceifa o pé direito de Uke para frente, na direção dos dedos dele, enquanto as mãos empurram para trás e para baixo. O pé de Uke escorrega, o corpo vai para trás e ele cai de costas.',
  l:['Pé e mãos trabalham juntos, em direções opostas.','O pé de Uke desliza rente ao chão, sem ser chutado.','Tori acompanha Uke com o corpo, sem soltar a manga.']},
 {s:5.0,e:10,kanji:'残心',ro:'Zanshin',pt:'De pé, controlando a manga',
  d:'Uke cai de costas, com o queixo no peito, e bate o braço livre no tatame. Tori acompanha com um passo do pé direito, que pisa entre as pernas dele, e fica de pé, inclinado à frente, puxando a manga direita de Uke para cima.',
  l:['Uke faz ushiro ukemi: queixo no peito, a cabeça não toca o tatame.','Tori fica de pé, base firme, sem cair junto.','A manga presa controla Uke antes da passagem.']}],
 rep:[.5,2.3,3.3,4.2,7.0], cover:3.9,
 views:[
  {name:'Diagonal',a:-28,e:14,center:[-.30,.82,.05],span:3.6},
  {name:'Pés, de cima',a:0,e:60,center:[-.32,.2,.05],span:3.0},
  {name:'Lateral',a:0,e:8,center:[-.35,.90,0],span:3.9}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* Poses conferidas com o vídeo da Kodokan (小内刈 / Ko-uchi-gari): Tori se inclina e empurra, o pé esquerdo
    pisa perto do centro e o pé direito cruza na frente dele até a sola encostar atrás do calcanhar direito de Uke.
    A ceifada leva o pé de Uke para frente; a perna dele sobe por FORA da perna esquerda de Tori, até a altura do
    joelho, e Uke cai reto para trás, sentando e deitando de costas com o queixo no peito. Tori acompanha com o
    corpo e termina de pé, inclinado, com o pé direito entre as pernas de Uke, puxando a manga direita para cima. */
 [2.0,{tori:{x:.15,y:.89,pitch:8,leg:{L:W3(.15,.07,.12),R:W3(.32,.07,-.14)}},
       uke:{x:-.27,pitch:2,leg:{R:W3(-.16,.08,.19),L:W3(-.38,.07,-.15)}}}],
 [2.8,{tori:{x:.05,y:.86,z:-.02,yaw:196,pitch:16,h:10,leg:{L:W3(.07,.07,.05)},arm:{R:B('o',.14,.38,-.09)}},
       uke:{x:-.31,y:.89,pitch:-6,h:6}}],
 [3.3,{tori:{x:.01,y:.84,z:-.02,yaw:206,pitch:16,leg:{R:W3(-.24,.09,.13)},pole:{legR:[1,-.2,-.5]}},
       uke:{x:-.32,y:.88,pitch:-9,h:8}}],
 [3.6,{}],
 [3.95,{tori:{x:-.02,y:.84,pitch:18,leg:{R:W3(-.02,.13,.17)},arm:{R:B('o',.14,.34,-.08),L:SL('armR',.40)}},
       uke:{x:-.40,y:.84,pitch:-18,h:12,gf:0,leg:{R:W3(.06,.18,.23)},pole:{legR:[1,-.1,.1]}}}],
 [4.3,{tori:{x:-.10,y:.80,yaw:196,pitch:26,h:10,leg:{R:W3(-.10,.16,-.06)},pole:{legR:[1,-.2,.15]}},
       uke:{x:-.56,y:.55,pitch:-48,h:25,leg:{R:W3(.08,.40,.32),L:B('s',.32,-.72,-.18)},pole:{legR:[1,.2,.3]},
        arm:{R:B('s',.40,.40,.22),L:B('s',.10,.25,-.55)}}}],
 [4.65,{tori:{x:-.22,y:.76,yaw:192,pitch:36,leg:{R:W3(-.22,.07,-.10)},
        arm:{R:B('s',.25,.0,.25),L:SL('armR',.55)}},
       uke:{x:-.68,y:.18,pitch:-82,h:30,gf:1,leg:{R:W3(-.08,.30,.34),L:W3(-.30,.07,-.25)},pole:{legL:[1,0,-.2]},
        arm:{R:B('s',.50,.20,.22),L:W3(-.85,.05,-.58)}}}],
 [5.0,{tori:{x:-.30,y:.72,z:-.03,yaw:190,pitch:44,h:12},
       uke:{x:-.72,y:.13,pitch:-88,h:28,leg:{R:W3(-.18,.07,.34),L:W3(-.26,.07,-.26)},pole:{legR:[1,0,.3],legL:[1,0,-.2]}}}],
 [6.0,{}],
 [7.0,{tori:{y:.74,pitch:40,h:8},uke:{h:24}}],
 [10,{}]],
 /* a sola de Tori encosta no calcanhar de Uke de propósito */
 aperto:{s:3.1,e:4.1,limbs:['T.R.leg'],tol:.10,tudo:true},
 names:F=>F.t>4.5?{uke:[F.uke.head[0]-.1,F.uke.head[1]+.38,F.uke.head[2]]}:{},
 glow:{s:2.8,e:4.4,limbs:{'T.R.leg':'force','U.R.leg':'gold'}},
 stamp:{s:5.05,e:6.6,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  if(vi===1){a=win(t,3.0,4.3);
   if(a>0){api.ring(T.legR.toe,.08,C.force,win(t,3.0,3.7));
    api.tag('sola atrás do calcanhar',T.legR.H,7,4,C.force,win(t,3.0,3.7));
    api.arrow([-.24,.10,.12],[.06,.12,.15],C.force,win(t,3.6,4.3));
    api.tag('ceifa na direção dos dedos',[.06,.12,.15],-9,4,C.force,win(t,3.6,4.3),false);}
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
  if(a>0){api.tag('pé entra por dentro',T.legR.E,9,-2,C.force,a);
   api.tag('sola contra o calcanhar',T.legR.H,-9,3,C.gold,a);}
  a=win(t,3.6,4.6);
  if(a>0)api.tag('ceifa para frente, mãos para trás',T.legR.H,6,3.5,C.force,a);
  a=win(t,5.2,9.8);
  api.tag('manga presa no alto',T.armL.H,-6,-3,C.force,a);
  api.tag('queixo no peito',U.head,-4,3.4,C.uke,win(t,4.6,7.5));}
});})();
