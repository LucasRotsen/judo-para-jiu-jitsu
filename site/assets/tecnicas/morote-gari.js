(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
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
 keys:[
 [0,{tori:{x:0,y:.90,T:85,f:1,h:5,leg:{R:W(.12,.07),L:W(-.12,.07)},arm:{R:TP('s',.32,.40),L:TP('s',.30,.30)}},
     uke:{x:.78,y:.93,T:92,f:-1,leg:{L:W(.68,.07),R:W(.88,.07)},arm:{L:TP('s',.30,.40),R:TP('s',.28,.32)}}}],
 [1.0,{}],
 [1.8,{tori:{x:.04,y:.64,T:72,h:22,leg:{R:W(.20,.07),L:W(-.18,.07)},arm:{R:TP('s',.34,.18),L:TP('s',.32,.12)}}}],
 [2.3,{}],
 [2.9,{tori:{x:.30,y:.48,T:45,h:35,gf:0,leg:{R:W(.08,.12),L:W(-.25,.09)},arm:{R:SL('legL',.12),L:SL('legR',.12)}},
       uke:{x:.82,T:96,arm:{L:A(20,50),R:A(15,45)}}}],
 [3.2,{}],
 [3.6,{tori:{x:.50,y:.62,T:52,h:20,gf:1,leg:{R:W(.32,.08),L:W(.05,.07)}},
       uke:{x:.95,y:1.0,r:30,gf:0,h:15,leg:{L:A(-60,-80),R:A(-55,-85)},arm:{L:A(150,140),R:A(140,130)}}}],
 [4.0,{tori:{x:.70,y:.60,T:30,h:5,leg:{R:W(.55,.07),L:W(.25,.07)}},
       uke:{x:1.15,y:.55,r:70,h:-20,leg:{L:A(-40,-70),R:A(-35,-75)},arm:{L:A(120,90),R:A(110,80)}}}],
 [4.4,{tori:{x:.72,y:.45,T:-5,h:-10,gf:0,leg:{R:W(.32,.13),L:W(.38,.13)}},
       uke:{x:1.15,y:.15,r:85,h:-15,leg:{L:A(-20,-110),R:A(-15,-105)},arm:{L:A(-70,-75),R:A(-62,-70)}}}],
 [5.2,{tori:{y:.43},uke:{h:-5}}],
 [7.5,{}]],
 order:F=>F.t>4.0?['U.far.leg','U.far.arm','T.far.leg','T.far.arm','U.body','T.body','U.near.arm','T.near.leg','U.near.leg','T.near.arm']
  :F.t>2.2?['T.far.leg','T.far.arm','U.far.leg','U.far.arm','U.body','T.body','U.near.leg','U.near.arm','T.near.leg','T.near.arm']:null,
 names:F=>F.t>4.2?{uke:[F.uke.head[0],.62],tori:[F.tori.x,.95]}:{},
 glow:{s:2.4,e:3.7,limbs:{'T.R.arm':'force','T.R.leg':'force'}},
 trail:{s:3.2,e:4.5,hide:7.5,fig:'uke',joints:['hip','head']},
 stamp:{s:4.45,e:7.5,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.2);
  api.tag('base baixa, mãos à frente',T.armR.H,1,-5,C.force,a);
  a=win(t,1.2,2.5);
  if(a>0){const hu=U.y;api.dashed([-.6,hu],[1.3,hu],C.uke,a,1.8);api.dashed([-.6,T.y],[1.3,T.y],C.force,a,1.8);
   api.tag('quadril de Uke',[1.3,hu],4.2,0,C.uke,a,false);api.tag('quadril de Tori abaixo',[1.3,T.y],6.2,0,C.force,a,false);
   api.arrow([-.45,1.25],[-.45,.85],C.force,a);api.tag('muda de nível',[-.45,1.05],-4.6,0,C.force,a,false);}
  a=win(t,2.4,3.3);
  api.tag('joelho quase no tatame',T.legR.E,-6,2.2,C.force,a);
  api.tag('cabeça colada ao lado de Uke',T.head,-10,-.5,C.force,a);
  api.tag('mãos atrás dos joelhos',T.armR.H,6,1.5,C.force,a);
  a=win(t,3.25,4.3);
  api.arrow(T.hip,[T.hip[0]+.35,T.hip[1]+.12],C.force,a);
  api.tag('pernas empurram, braços puxam',T.legR.E,-3,3.2,C.force,a);
  a=win(t,4.5,99);
  api.tag('Uke cai de costas',U.head,2,-3.6,C.uke,a);
  api.tag('Tori por cima, entre as pernas',T.hip,-6,-4.5,C.force,a);}
});})();
