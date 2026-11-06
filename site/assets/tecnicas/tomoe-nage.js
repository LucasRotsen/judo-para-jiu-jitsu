(()=>{const {W,TP,A,lerp2,tp,win}=Judo;
Judo.register({
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
 rep:[.6,2.3,3.6,4.85,7.5], cover:4.85,
 view:{x0:-1.2,y0:-.16,w:3.5,h:2.58},
 keys:[
 [0,{tori:{x:1.0,y:.93,T:90,f:1,leg:{R:W(1.10,.07),L:W(.90,.07)},arm:{R:TP('o',.12,.40),L:TP('o',.12,.34)}},
     uke:{x:1.6,y:.93,T:90,f:-1,leg:{L:W(1.50,.07),R:W(1.70,.07)},arm:{L:TP('o',.12,.38),R:TP('o',.10,.30)}}}],
 [1.2,{}],
 [2.0,{tori:{x:1.15,y:.86,T:96,leg:{L:W(1.30,.07)}},uke:{x:1.50,T:70,h:10,leg:{L:W(1.50,.11),R:W(1.70,.11)}}}],
 [2.5,{}],
 [3.2,{tori:{x:1.23,y:.28,T:120,h:-10,leg:{R:TP('o',.12,.08),L:W(1.45,.07)}},
       uke:{x:1.43,y:.95,T:60,leg:{L:W(1.52,.11),R:W(1.72,.11)}}}],
 [3.9,{}],
 [4.4,{tori:{x:1.25,y:.18,T:178,h:10,leg:{L:W(1.58,.09)}},
       uke:{x:1.20,y:1.15,r:-60,gf:0,h:0,leg:{L:A(-100,-100),R:A(-95,-105)}}}],
 [4.85,{tori:{leg:{R:A(110,105)}},uke:{x:.45,y:1.25,r:-150,h:-20,leg:{L:A(-95,-95),R:A(-90,-100)},arm:{L:A(90,95),R:A(85,100)}}}],
 [5.25,{tori:{leg:{R:A(70,20)},arm:{R:A(178,178),L:A(176,176)}},uke:{x:-.22,y:.75,r:-205,leg:{L:A(-95,-100),R:A(-90,-105)}}}],
 [5.6,{tori:{leg:{R:A(40,-40),L:A(50,-30)}},uke:{x:-.42,y:.15,r:-240,h:-20,leg:{L:A(-75,-165),R:A(-70,-158)},arm:{L:A(-120,-120),R:A(-115,-125)}}}],
 [6.6,{uke:{h:-10}}],
 [9,{}]],
 names:F=>F.t>5.4?{tori:[F.tori.x-.2,.62],uke:[F.uke.x-.1,.68]}:{},
 glow:{s:2.6,e:5.0,limbs:{'T.R.leg':'force'}},
 trail:{s:3.9,e:5.7,hide:9,fig:'uke',joints:['hip','head']},
 stamp:{s:5.65,e:9,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('pegada alta, nas golas',T.armR.H,-4,-4.5,C.force,a);
  a=win(t,1.2,2.7);
  {const ch=tp(U,.2,.42);api.arrow(ch,[ch[0]-.3,ch[1]-.08],C.force,a);
   api.tag('puxa Uke para frente',[ch[0]-.3,ch[1]-.08],-4,-2.4,C.force,a,false);}
  api.tag('passo curto, entre os pés',T.legL.H,-5,2.2,C.force,win(t,1.6,2.7));
  a=win(t,2.6,4.0);
  api.tag('pé na faixa de Uke',T.legR.H,7,0,C.force,a);
  api.tag('senta perto, embaixo de Uke',T.hip,-8,-2,C.force,a);
  a=win(t,4.0,5.3);
  api.tag('a perna estende e lança',T.legR.E,9,-1,C.force,a);
  api.tag('braços puxam por cima da cabeça',T.armR.H,-10,1,C.force,win(t,4.3,5.5));
  a=win(t,5.7,99);
  api.tag('Uke cai de costas, além da cabeça de Tori',[.2,1.2],0,0,C.ink,a,false);
  api.tag('ukemi: braço bate no tatame',U.armL.H,-2,3,C.uke,a);}
});})();
