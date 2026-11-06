(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z).
   Tori começa em +x olhando para -x (direita de Tori = -z). Na entrada, o joelho direito de Tori
   desce entre os pés de Uke e a cabeça de Tori fica por fora, do lado direito de Uke (+z). */
const uke0={x:-.42,y:.90,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.40,.07,.16),L:W3(-.44,.07,-.16)},
 arm:{R:B('s',.30,.36,.18),L:B('s',.30,.30,-.18)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.42,y:.86,z:0,yaw:180,pitch:8,h:-4,
 leg:{R:W3(.36,.07,-.16),L:W3(.48,.07,.16)},
 arm:{R:B('s',.30,.38,.18),L:B('s',.30,.30,-.18)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const behindKnees={R:B('o',-.10,-.40,-.12),L:B('o',-.10,-.40,.12)};
Judo.register3d({
 id:'morote-gari', name:'Morote Gari', kanji:'双手刈',
 cls:'Nage-waza · Te-waza', group:'nage',
 bjj:'Baiana (double leg)',
 why:'A baiana do jiu-jitsu tem nome japonês: muda de nível, entra com o joelho perto do chão e derruba pelas duas pernas.',
 summary:'Projeção agarrando as duas pernas. Tori abaixa o quadril, dá um passo profundo entre os pés de Uke com o joelho quase no tatame, abraça a parte de trás dos joelhos e empurra com as pernas e o peito. Uke cai de costas e Tori termina por cima.',
 reading:[{k:'双手',r:'morote',m:'as duas mãos'},{k:'刈',r:'gari',m:'ceifar'}],
 facts:[['Grupo','Nage-waza › Te-waza (técnicas de mão)'],
  ['Kodokan','Reconhecida em 1982, no grupo Shinmeisho no waza'],
  ['Competição de judô','Desde 2013 a IJF proíbe agarrar as pernas diretamente. A punição já variou entre shido e desclassificação conforme a revisão das regras.'],
  ['No jiu-jitsu','É a baiana, uma das quedas mais usadas. Vale 2 pontos na IBJJF quando Tori estabiliza por cima.']],
 errors:[['Cabeça no meio','A cabeça vai ao lado do peito de Uke. No centro, ela entrega a guilhotina.'],
  ['Entrar de longe','Sem passo profundo, Uke tem tempo de jogar as pernas para trás (sprawl) e cair por cima.'],
  ['Costas curvadas','Olhar para o chão curva as costas e tira a força do empurrão. Tori olha para frente.'],
  ['Parar na entrada','Depois de agarrar, Tori continua andando e virando o canto. Parado, ele só segura as pernas.']],
 safety:['Uke precisa saber cair para trás (ushiro ukemi) com o queixo no peito.',
  'O joelho de Tori toca o tatame de leve. Pancada direta no chão machuca a patela.',
  'Tori desce junto, controlando a queda, sem soltar Uke de cabeça no chão.'],
 phases:[
 {s:0,e:1.0,kanji:'構え',ro:'Kamae',pt:'Guarda em pé',
  d:'Tori e Uke se estudam sem pegada fixa, como é comum no jiu-jitsu. Tori mantém os joelhos dobrados e as mãos à frente, controlando a distância.',
  l:['Base com os pés na largura dos ombros.','Mãos à frente, prontas para afastar a pegada de Uke.','Tori espera Uke dar um passo para frente.']},
 {s:1.0,e:2.3,kanji:'崩し',ro:'Kuzushi',pt:'Mudança de nível',
  d:'Tori dobra os joelhos e abaixa o quadril sem curvar as costas. O quadril de Tori fica abaixo do quadril de Uke.',
  l:['O movimento é das pernas, não da cintura.','Olhar para frente, coluna reta.','Uke ainda está com o peso nos dois pés.']},
 {s:2.3,e:3.2,kanji:'作り',ro:'Tsukuri',pt:'Passo de penetração',
  d:'Tori dá um passo profundo com o pé direito entre os pés de Uke, desce o joelho quase até o tatame e abraça a parte de trás dos dois joelhos de Uke. A cabeça encosta no lado do peito dele.',
  l:['O joelho de trás quase toca o tatame.','Mãos atrás dos joelhos de Uke, braços colados nas pernas.','Cabeça ao lado do peito, nunca no centro.']},
 {s:3.2,e:4.4,kanji:'掛け',ro:'Kake',pt:'Empurrar e derrubar',
  d:'Tori levanta com as pernas, puxa os joelhos de Uke para o próprio peito e empurra com o ombro. As pernas de Uke saem do chão e ele cai para trás.',
  l:['A força vem das pernas que se estendem.','Os braços puxam, o ombro empurra: duas forças opostas.','Tori segue andando, virando o canto se Uke resistir.']},
 {s:4.4,e:7.5,kanji:'残心',ro:'Zanshin',pt:'Por cima',
  d:'Uke cai de costas. Tori acompanha a queda e termina por cima, entre as pernas de Uke, pronto para passar a guarda.',
  l:['Tori desce junto, com o peso no peito de Uke.','As pernas de Uke continuam presas nos braços.','No jiu-jitsu, a queda vale 2 pontos quando Tori estabiliza por cima.']}],

 rep:[.5,2.0,2.95,3.9,6], cover:3.9,
 views:[
  {name:'Diagonal',a:-50,e:14,center:[-.3,.78,.05],span:3.7},
  {name:'Lateral',a:0,e:8,center:[-.3,.78,0],span:3.9},
  {name:'De cima',a:90,e:88,center:[-.62,0,0],span:3.9}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.0,{}],
 [1.8,{tori:{x:.36,y:.62,pitch:18,h:-22,leg:{R:W3(.18,.07,-.17),L:W3(.62,.07,.18)},arm:{R:B('s',.34,.22,.16),L:B('s',.32,.16,-.16)}},
       uke:{x:-.38,leg:{R:W3(-.32,.07,.16)}}}],
 [2.3,{}],
 [2.9,{tori:{x:.02,y:.44,z:.20,pitch:42,h:-38,gf:0,leg:{R:W3(.20,.06,.06),L:W3(.58,.07,.32)},arm:behindKnees,pole:{legR:[1,-.3,.05],legL:[1,-.2,-.15]}},
       uke:{x:-.40,pitch:6,arm:{R:B('s',.18,.48,.24),L:B('s',.20,.42,-.22)}}}],
 [3.2,{}],
 [3.6,{tori:{x:-.10,y:.60,z:.18,pitch:30,h:-20,gf:1,leg:{R:W3(.10,.07,.04),L:W3(.30,.07,.30)}},
       uke:{x:-.55,y:.98,pitch:-28,h:20,gf:0,leg:{R:W3(-.30,.42,.12),L:W3(-.30,.42,-.12)},arm:{R:B('s',.10,.62,.40),L:B('s',.10,.62,-.40)}}}],
 [4.0,{tori:{x:-.30,y:.58,z:.12,pitch:38,h:-15,leg:{R:W3(-.10,.07,.0),L:W3(.15,.07,.28)}},
       uke:{x:-.78,y:.55,pitch:-68,h:25,leg:{R:W3(-.45,.50,.14),L:W3(-.45,.50,-.14)}}}],
 [4.4,{tori:{x:-.42,y:.47,z:0,pitch:40,h:-10,gf:0,leg:{R:W3(-.04,.08,-.15),L:W3(-.04,.08,.15)},pole:{legR:[1,-.3,.1],legL:[1,-.3,-.1]},
        arm:{R:B('o',.05,.04,-.20),L:B('o',.05,.04,.20)}},
       uke:{x:-.92,y:.13,pitch:-90,h:20,leg:{R:W3(-.50,.07,.30),L:W3(-.50,.07,-.30)},arm:{R:B('s',.10,.22,.42),L:B('s',.10,.22,-.42)},pole:{legR:[.3,1,.3],legL:[.3,1,-.3],armR:[1,.2,.3],armL:[1,.2,-.3]}}}],
 [5.2,{tori:{y:.45,pitch:46},uke:{h:12}}],
 [7.5,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],uke:[F.uke.head[0],Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.head[2]]}),
 glow:{s:2.4,e:3.7,limbs:{'T.R.arm':'force','T.L.arm':'force','T.R.leg':'gold'}},
 stamp:{s:4.45,e:7.5,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.1);
  api.tag('base baixa, mãos à frente',T.armR.H,4,-4,C.force,a);
  a=win(t,1.1,2.5);
  if(a>0){const top=api.add(T.head,[0,.35,0]);api.arrow(top,api.add(T.head,[0,.08,0]),C.force,a);
   api.tag('muda de nível: quadril desce, costas retas',top,0,-1.6,C.force,a,false);
   api.ring(U.hip,.10,C.uke,a);api.tag('quadril de Tori abaixo do de Uke',T.hip,6,3,C.force,a);}
  a=win(t,2.4,3.3);
  api.tag('joelho no tatame entre os pés',T.legR.E,-8,2.6,C.gold,a);
  api.tag('cabeça por fora do quadril',T.head,8,-2.2,C.force,a);
  api.tag('mãos atrás dos joelhos',T.armR.H,-8,-1.5,C.force,a);
  a=win(t,3.25,4.3);
  if(a>0){api.arrow(T.sh,api.add(T.sh,[-.38,.10,0]),C.force,a);
   api.tag('braços puxam, ombro empurra',api.add(T.sh,[-.2,.05,0]),0,-3,C.force,a,false);}
  a=win(t,4.6,7.5);
  api.tag('Uke cai de costas',U.hip,-4,3.4,C.uke,a);
  api.tag('Tori por cima, entre as pernas',T.hip,6,-3.4,C.force,a);}
});})();
