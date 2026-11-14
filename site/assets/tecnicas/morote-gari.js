(()=>{const {W3,B,win,SL}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z).
   Tori começa em +x olhando para -x (direita de Tori = -z). Na entrada, o pé direito de Tori
   entra entre os pés de Uke e a cabeça de Tori fica por fora, do lado esquerdo de Uke (-z), como no vídeo
   da Kodokan; as pernas de Uke passam pelo ombro esquerdo de Tori. */
const uke0={x:-.42,y:.90,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.40,.07,.16),L:W3(-.44,.07,-.16)},
 arm:{R:B('s',.30,.36,.18),L:B('s',.30,.30,-.18)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.42,y:.86,z:0,yaw:180,pitch:8,h:-4,
 leg:{R:W3(.36,.07,-.16),L:W3(.48,.07,.16)},
 arm:{R:B('s',.30,.38,.18),L:B('s',.30,.30,-.18)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
/* mãos atrás dos joelhos: presas às pernas de Uke (acompanham quando elas sobem) */
const behindKnees={R:SL('legL',.06),L:SL('legR',.06)};
Judo.register3d({
 id:'morote-gari', name:'Morote Gari', kanji:'双手刈',
 cls:'Nage-waza · Te-waza', group:'nage',
 bjj:'Baiana (double leg)',
 why:'A baiana do jiu-jitsu tem nome japonês: muda de nível, entra com o quadril baixo e derruba pelas duas pernas.',
 summary:'Projeção agarrando as duas pernas. Tori abaixa o quadril, dá um passo profundo entre os pés de Uke, abraça a parte de trás dos joelhos e empurra com as pernas e o ombro. Uke cai de costas com as pernas para cima e Tori termina de pé, prendendo as pernas dele no peito.',
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
  'Tori segura as pernas de Uke até o fim: assim Uke cai de costas, nunca de cabeça.',
  'Pratique primeiro em velocidade baixa, com Uke caindo no tatame macio.'],
 phases:[
 {s:0,e:1.0,kanji:'構え',ro:'Kamae',pt:'Guarda em pé',
  d:'Tori e Uke se estudam sem pegada fixa, como é comum no jiu-jitsu. Tori mantém os joelhos dobrados e as mãos à frente, controlando a distância.',
  l:['Base com os pés na largura dos ombros.','Mãos à frente, prontas para afastar a pegada de Uke.','Tori espera Uke dar um passo para frente.']},
 {s:1.0,e:2.3,kanji:'崩し',ro:'Kuzushi',pt:'Mudança de nível',
  d:'Tori dobra os joelhos e abaixa o quadril sem curvar as costas. O quadril de Tori fica abaixo do quadril de Uke.',
  l:['O movimento é das pernas, não da cintura.','Olhar para frente, coluna reta.','Uke ainda está com o peso nos dois pés.']},
 {s:2.3,e:3.2,kanji:'作り',ro:'Tsukuri',pt:'Passo de penetração',
  d:'Tori dá um passo profundo com o pé direito entre os pés de Uke, dobra bem os joelhos e abraça a parte de trás dos dois joelhos de Uke. O ombro encosta na barriga dele e a cabeça fica por fora, ao lado do quadril.',
  l:['Afundo profundo: quadril baixo, perna de trás estendida.','Mãos atrás dos joelhos de Uke, braços colados nas pernas.','Cabeça por fora, ao lado do quadril de Uke, nunca no centro.']},
 {s:3.2,e:4.4,kanji:'掛け',ro:'Kake',pt:'Empurrar e derrubar',
  d:'Tori levanta com as pernas, puxa os joelhos de Uke para o próprio peito e avança empurrando com o ombro. As pernas de Uke saem do chão, sobem pelo ombro de Tori e ele tomba para trás.',
  l:['A força vem das pernas que se estendem.','Os braços puxam, o ombro empurra: duas forças opostas.','Tori segue andando, virando o canto se Uke resistir.']},
 {s:4.4,e:7.5,kanji:'残心',ro:'Zanshin',pt:'Por cima',
  d:'Uke cai de costas com as pernas para cima. Tori termina de pé, em afundo longo, com as pernas de Uke presas no peito, pronto para passar a guarda.',
  l:['Pé da frente junto ao quadril de Uke, perna de trás estendida.','As pernas de Uke continuam presas nos braços, contra o peito.','No jiu-jitsu, a queda vale 2 pontos quando Tori estabiliza por cima.']}],

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
 /* Daqui em diante as poses seguem o vídeo da Kodokan (双手刈 / Morote-gari): Tori entra em afundo, sem
    apoiar o joelho, com o pé direito entre os pés de Uke e o ombro na barriga dele; levanta as pernas de Uke
    até o peito e avança. Uke tomba de costas quase na horizontal, na altura da cintura de Tori, e cai com as
    pernas para cima, presas no peito de Tori, que termina de pé em afundo longo. */
 [2.9,{tori:{x:.12,y:.62,z:-.20,pitch:48,h:-25,leg:{R:W3(-.18,.07,-.06),L:W3(.48,.07,.06)},arm:behindKnees,
        pole:{legR:[1,-.1,.05],legL:[1,-.1,-.1],armR:[.3,-.7,.6],armL:[.3,-.7,-.6]}},
       uke:{x:-.42,pitch:10,h:8,leg:{R:W3(-.38,.07,.17),L:W3(-.46,.07,-.17)},arm:{R:B('s',.20,.42,.22),L:B('s',.18,.48,-.26)}}}],
 [3.2,{}],
 /* Tori estende as pernas e puxa os joelhos de Uke para o peito: os pés de Uke saem do chão */
 [3.5,{tori:{x:.04,y:.76,z:-.22,pole:{armR:[0,-1,.9]},pitch:30,h:-15,leg:{R:W3(-.08,.07,-.26),L:W3(.44,.07,.04)}},
       uke:{x:-.44,y:1.08,z:.06,pitch:-14,h:15,gf:0,leg:{R:W3(-.30,.36,.14),L:W3(-.32,.36,-.04)},pole:{legR:[1,0,.3],legL:[1,0,.2]},
        arm:{R:B('s',.22,.62,.32),L:B('s',.22,.60,-.30)}}}],
 [3.68,{tori:{x:-.03,y:.74,z:-.23,pitch:40},
       uke:{x:-.54,y:1.07,z:.07,pitch:-40,h:22,leg:{R:W3(-.08,1.02,.22),L:W3(-.08,1.02,.07)}}}],
 /* Tori avança com o pé direito; Uke tomba de costas, quase na horizontal, na altura da cintura de Tori */
 [3.85,{tori:{x:-.10,y:.72,z:-.24,pitch:50,h:-5,gf:0,leg:{R:W3(-.38,.16,-.22),L:W3(.42,.07,.04)}},
       uke:{x:-.64,y:1.0,z:.06,pitch:-66,h:30,leg:{R:W3(-.04,1.40,.26),L:W3(-.04,1.40,.10)},pole:{legR:[.6,1,.35],legL:[.6,1,.25],armR:[0,-1,.4],armL:[0,-1,-.4]},
        arm:{R:B('s',.25,.55,.40),L:B('s',.25,.55,-.40)}}}],
 /* queda: costas no tatame, pernas para cima presas no peito de Tori; Tori de pé em afundo longo */
 [4.15,{tori:{x:-.06,y:.76,z:-.10,pitch:54,h:5,gf:1,leg:{R:W3(-.44,.07,-.20),L:W3(.40,.07,.10)},arm:{R:SL('legL',.2),L:SL('legR',.2)}},
       uke:{x:-.70,y:.21,z:0,pitch:-95,h:30,leg:{R:W3(-.62,1.0,.16),L:W3(-.62,1.0,.0)},pole:{legR:[.3,1,.2],legL:[.3,1,-.2],armR:[1,.2,.4],armL:[1,.2,-.4]},
        arm:{R:W3(-.86,.05,.56),L:W3(-.86,.05,-.56)}}}],
 [4.4,{tori:{pitch:56},uke:{y:.20,h:25}}],
 [5.2,{tori:{y:.75,pitch:57,h:8},uke:{h:15}}],
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
  api.tag('pé direito entre os pés de Uke',T.legR.H,-8,2.6,C.gold,a);
  api.tag('cabeça por fora, ao lado do quadril',T.head,8,-2.2,C.force,a);
  api.tag('mãos atrás dos joelhos',T.armR.H,-8,-1.5,C.force,a);
  a=win(t,3.25,4.3);
  if(a>0){api.arrow(T.sh,api.add(T.sh,[-.38,.10,0]),C.force,a);
   api.tag('braços puxam, ombro empurra',api.add(T.sh,[-.2,.05,0]),0,-3,C.force,a,false);}
  a=win(t,4.6,7.5);
  api.tag('Uke cai de costas',U.hip,-4,3.4,C.uke,a);
  api.tag('pernas de Uke presas no peito',T.hip,6,-3.4,C.force,a);}
});})();
