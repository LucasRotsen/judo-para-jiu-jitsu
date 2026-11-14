(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z). Tori senta junto aos pés de Uke e
   deita de costas com a cabeça para +x; Uke gira para a frente (pitch crescente) por cima de Tori
   e cai de costas além da cabeça dele, em x>1. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,-.08),L:B('o',.13,.40,.08)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.42,-.08),L:B('o',.14,.42,.08)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const belt=B('o',.25,.10,0);
Judo.register3d({
 id:'tomoe-nage', name:'Tomoe Nage', kanji:'巴投',
 cls:'Nage-waza · Ma-sutemi-waza', group:'nage',
 bjj:'Projeção de sacrifício a partir da guarda',
 why:'Tori cai de costas de propósito, como numa puxada para a guarda, e usa o pé na barriga para lançar Uke por cima da cabeça.',
 summary:'Projeção de sacrifício para trás. Tori puxa Uke para frente, senta bem perto dele, apoia o pé direito na faixa de Uke e rola para trás estendendo a perna. Uke gira por cima da cabeça de Tori e cai de costas.',
 reading:[{k:'巴',r:'tomoe',m:'círculo, giro'},{k:'投',r:'nage',m:'projeção'}],
 facts:[['Grupo','Nage-waza › Sutemi-waza › Ma-sutemi-waza (sacrifício de costas)'],
  ['Gokyo','3º grupo (Dai-sankyo)'],
  ['Direção do kuzushi','Para frente: Uke precisa estar inclinado sobre Tori'],
  ['No jiu-jitsu','Aparece quando o oponente avança ou empurra na pegada. Se a projeção falha, Tori já está na guarda aberta, com o pé no quadril, e pode emendar raspagens.']],
 errors:[['Sentar longe','Se o quadril de Tori cai longe dos pés de Uke, a perna não alcança a faixa e Uke só dá um passo.'],
  ['Pé no peito ou na coxa','O pé vai na faixa, no centro de gravidade de Uke. Alto demais ele dobra o corpo; baixo demais só empurra a perna.'],
  ['Braços sem puxar','Sem a puxada para cima da cabeça, Uke cai em cima de Tori em vez de passar por cima.'],
  ['Uke sem desequilíbrio','Contra um Uke ereto e pesado para trás, a técnica vira uma puxada para a guarda.']],
 safety:['Uke precisa dominar o rolamento para frente (zempo kaiten ukemi) antes de receber tomoe nage.',
  'Comece com Uke ajoelhado ou com a projeção pela metade, sem lançar.',
  'O pé empurra, não chuta: pressão contínua na faixa.'],
 phases:[
 {s:0,e:1.2,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori e Uke se seguram de frente. Tori pega as duas golas ou a gola e a manga, com os cotovelos próximos do corpo.',
  l:['Pegada alta, na gola, para conseguir puxar Uke por cima.','Postura natural e joelhos destravados.','Tori procura o momento em que Uke avança ou empurra.']},
 {s:1.2,e:2.5,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa Uke para frente e para baixo e dá um passo curto com o pé esquerdo, entrando entre os pés de Uke. O peso de Uke vai para a ponta dos pés.',
  l:['Uke se inclina sobre Tori: o tronco passa da linha dos pés.','O passo de Tori é curto, para ficar embaixo de Uke.','A puxada continua durante toda a queda.']},
 {s:2.5,e:3.9,kanji:'作り',ro:'Tsukuri',pt:'Sentar e apoiar o pé',
  d:'Tori senta bem perto, quase sobre o próprio calcanhar esquerdo, e apoia a sola do pé direito na faixa de Uke. As costas começam a rolar para trás.',
  l:['O quadril de Tori cai entre ou logo à frente dos pés de Uke.','A sola do pé direito na faixa, joelho dobrado.','Os braços mantêm Uke inclinado para frente.']},
 {s:3.9,e:5.6,kanji:'掛け',ro:'Kake',pt:'Rolar e lançar',
  d:'Tori rola para trás, estende a perna direita e puxa as golas por cima da própria cabeça. Uke sobe apoiado no pé, gira no ar e passa por cima de Tori.',
  l:['A perna estende quando Uke já está sobre ela, não antes.','Os braços puxam para cima da cabeça, como num arco.','O giro de Uke é para frente: ele cai de costas.']},
 {s:5.6,e:9,kanji:'残心',ro:'Zanshin',pt:'Queda e controle',
  d:'Uke cai de costas além da cabeça de Tori, fazendo ukemi. Tori mantém as mãos na gola e pode rolar por cima para a montada, uma transição comum no jiu-jitsu.',
  l:['Uke bate os braços no tatame e mantém o queixo no peito.','Tori não solta a gola: ela controla a queda.','Rolar para trás sobre o ombro leva Tori direto à montada.']}],
 rep:[.6,2.2,3.5,4.85,7.5], cover:4.85,
 views:[
  {name:'Diagonal',a:22,e:14,center:[.55,.95,0],span:4.6},
  {name:'Lateral',a:0,e:4,center:[.55,.95,0],span:4.6},
  {name:'Diagonal alta',a:-40,e:38,center:[.55,.6,0],span:4.2}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* kuzushi: puxa para frente e passo curto entre os pés de Uke */
 [2.0,{tori:{x:.18,y:.88,pitch:6,leg:{L:W3(-.02,.07,.08)}},
       uke:{x:-.32,pitch:14,h:6,pole:{armR:[-.2,-.6,1],armL:[-.2,-.6,-1]},leg:{R:W3(-.30,.11,.25),L:W3(-.42,.11,-.25)}}}],
 [2.5,{}],
 /* Daqui em diante conforme o vídeo da Kodokan (巴投 / Tomoe-nage).
    tsukuri: Tori agacha fundo e senta quase no calcanhar esquerdo, entre os pés de Uke, tronco ainda
    quase ereto; a sola direita sobe até a faixa e os braços seguram Uke dobrado sobre ele. */
 [3.2,{tori:{x:-.04,y:.30,pitch:-26,h:22,leg:{R:belt,L:W3(-.02,.07,.12)},
        pole:{legR:[.3,1,-.3],legL:[1,.6,.4]}},
       uke:{x:-.32,y:.86,pitch:38,h:12,arm:{R:B('o',.14,.30,-.12),L:B('o',.14,.30,.12)},leg:{R:W3(-.30,.09,.31),L:W3(-.42,.09,-.31)}}}],
 [3.9,{tori:{x:-.07,y:.22,pitch:-55,h:25},uke:{x:-.28,y:.88,pitch:52}}],
 /* kake: Tori rola de costas; Uke vem por cima, apoiado no pé, o tronco mergulha rumo à cabeça de Tori
    e os pés deixam o chão por trás */
 [4.4,{tori:{x:-.12,y:.14,pitch:-90,h:12,leg:{L:W3(-.42,.07,.28)},pole:{legR:[.8,1,-.3]}},
       uke:{x:-.14,y:.95,pitch:95,h:10,gf:0,leg:{R:W3(-.62,.30,.30),L:W3(-.66,.36,-.30)},
        arm:{R:B('s',.30,.40,.18),L:B('s',.30,.40,-.18)},pole:{legR:[1,-.3,.2],legL:[1,-.3,-.2]}}}],
 /* a perna estende: Uke de cabeça para baixo, a cabeça desce junto à cabeça de Tori, pernas sobem */
 [4.85,{tori:{arm:{R:B('o',.14,.36,-.17),L:B('o',.14,.36,.17)},pole:{armR:[.3,.2,1],armL:[.3,.2,-1]}},
        uke:{x:.22,y:1.08,pitch:155,h:20,leg:{R:B('s',.10,-.84,.14),L:B('s',.06,-.84,-.14)},
         arm:{R:B('s',.40,.30,.24),L:B('s',.40,.30,-.24)},pole:{legR:[1,0,.2],legL:[1,0,-.2]}}}],
 /* quase vertical, invertido, o quadril passa por cima da cabeça de Tori; a perna de Tori fica no alto */
 [5.1,{tori:{leg:{R:W3(-.04,.92,-.10)},arm:{R:B('o',.16,.30,-.18),L:B('o',.16,.30,.18)}},
       uke:{x:.70,y:.98,pitch:205,h:15,leg:{R:B('s',.05,-.86,.15),L:B('s',.02,-.86,-.15)}}}],
 [5.35,{uke:{x:1.12,y:.62,pitch:240,h:20,leg:{R:B('s',.10,-.85,.16),L:B('s',.08,-.85,-.16)},
         arm:{R:B('s',.25,.20,.45),L:B('s',.25,.20,-.45)}}}],
 /* queda: Uke de costas, estendido, cabeça junto à cabeça de Tori; Tori continua deitado com a perna direita no alto */
 [5.6,{tori:{leg:{R:W3(-.08,.86,-.12)},pole:{legR:[1,1,0]}},
       uke:{x:1.50,y:.13,pitch:270,h:25,gf:1,leg:{R:W3(2.30,.08,.20),L:W3(2.30,.08,-.20)},
        arm:{R:W3(1.42,.07,.46),L:W3(1.42,.07,-.46)},pole:{legR:[1,.5,.3],legL:[1,.5,-.3],armR:[0,0,1],armL:[0,0,-1]}}}],
 [6.6,{uke:{h:-5}}],
 [9,{}]],
 glow:{s:2.6,e:5.0,limbs:{'T.R.leg':'force'}},
 stamp:{s:5.65,e:9,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('pegada alta, nas golas',T.armR.H,-4,-4.5,C.force,a);
  a=win(t,1.2,2.7);
  {const ch=api.bp(U,.15,.42,0);api.arrow(ch,api.add(ch,[.32,-.08,0]),C.force,a);
   api.tag('puxa Uke para frente',api.add(ch,[.32,-.08,0]),4,-2.4,C.force,a,false);}
  api.tag('passo curto, entre os pés',T.legL.H,-5,2.2,C.force,win(t,1.6,2.7));
  a=win(t,2.6,4.1);
  api.tag('pé na barriga, na faixa',T.legR.H,6,-1.5,C.force,a);
  api.tag('senta perto, embaixo de Uke',T.hip,2,4,C.force,a);
  a=win(t,4.0,5.4);
  api.arc([.62,.15,0],[1,0,0],[0,1,0],1.0,150,18,C.info,a);
  api.tag('a perna estende e lança',T.legR.E,4,4.5,C.force,a);
  api.tag('braços puxam por cima da cabeça',T.armR.H,9,2.5,C.force,win(t,4.3,5.5));
  a=win(t,5.7,99);
  api.tag('Uke cai de costas, além da cabeça de Tori',U.hip,0,-7,C.uke,a);
  api.tag('ukemi: braço bate no tatame',U.armR.H,3,3,C.uke,a);}
});})();
