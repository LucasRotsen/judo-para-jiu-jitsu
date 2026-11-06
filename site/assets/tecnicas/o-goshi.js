(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
 id:'o-goshi', name:'O Goshi', kanji:'大腰',
 cls:'Nage-waza · Koshi-waza', group:'nage',
 bjj:'O goshi, a queda de quadril do clinch',
 why:'Aproveita o clinch com o braço nas costas, posição que aparece o tempo todo no jiu-jitsu em pé.',
 summary:'Grande projeção de quadril. Tori envolve a cintura de Uke com o braço direito, gira e encaixa o quadril mais baixo e mais fundo que o dele. Ao estender as pernas e girar, Uke rola por cima do quadril de Tori.',
 reading:[{k:'大',r:'o',m:'grande'},{k:'腰',r:'goshi',m:'quadril'}],
 facts:[['Grupo','Nage-waza (projeções) › Koshi-waza (técnicas de quadril)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['Direção do kuzushi','Para frente, puxando Uke para a ponta dos pés'],
  ['Diferença para o seoi nage','No seoi o eixo da rotação é o ombro. No o goshi o eixo é o quadril, e o braço de Tori abraça a cintura em vez de prender o braço de Uke.'],
  ['No jiu-jitsu','Entra direto do clinch com underhook ou braço nas costas, sem precisar de pegada na gola. Uke cai de costas à frente de Tori, pronto para os 100 quilos ou o kesa-gatame.']],
 errors:[['Quadril raso','Se o quadril de Tori fica só ao lado do de Uke, não há onde ele rolar. O quadril precisa passar além da linha do quadril de Uke.'],
  ['Quadril alto','Tori precisa dobrar os joelhos e ficar abaixo da faixa de Uke para poder levantá-lo com as pernas.'],
  ['Braço solto na cintura','O braço nas costas cola Uke ao quadril de Tori. Frouxo, Uke escorrega para trás e pega as costas de Tori.'],
  ['Puxar só com os braços','A projeção vem da extensão das pernas e da rotação do tronco.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Repita a entrada (uchikomi) muitas vezes antes de projetar.',
  'Tori mantém a manga presa até Uke tocar o tatame.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita. Na entrada, a mão direita solta a gola e vai para as costas de Uke.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, pronta para mudar de lugar.','Postura natural, joelhos destravados.']},
 {s:1,e:2.9,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa a manga para frente e para cima e avança o pé direito para a frente dos pés de Uke. O peso de Uke vai para a ponta dos pés.',
  l:['A puxada leva o peito de Uke para frente.','O passo do pé direito já prepara o giro.','Uke na ponta dos pés não consegue sentar o quadril para defender.']},
 {s:2.9,e:5,kanji:'作り',ro:'Tsukuri',pt:'Giro e encaixe do quadril',
  d:'Tori gira sobre o pé direito, traz o pé esquerdo para trás e encaixa o quadril abaixo e além do quadril de Uke. O braço direito abraça a cintura de Uke e cola os dois corpos.',
  l:['Braço direito nas costas, na altura da faixa de Uke.','Quadril de Tori mais baixo e mais fundo que o de Uke.','Joelhos flexionados, pés entre os pés de Uke.']},
 {s:5,e:6.8,kanji:'掛け',ro:'Kake',pt:'Execução',
  d:'Tori estende as pernas, levantando Uke com o quadril, e gira o tronco para a esquerda puxando a manga. Uke rola por cima do quadril de Tori e cai à frente dele.',
  l:['Eixo da rotação: o quadril de Tori, não o ombro.','As pernas fazem a força; o braço só mantém Uke colado.','Hikite puxa até o próprio quadril.']},
 {s:6.8,e:9,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas à frente de Tori. Tori mantém a manga presa para controlar a queda e termina equilibrado, pronto para seguir no chão.',
  l:['Manga segura até o fim.','Uke faz ukemi com o queixo no peito.','Tori termina em pé, sem cair junto.']}],
 rep:[.5,2.4,4.6,5.95,7.8], cover:5.95,
 keys:[
 [0,{uke:{x:-.30,y:.93,T:90,f:1,leg:{R:W(-.20,.07),L:W(-.40,.07)},arm:{R:TP('o',.13,.40),L:TP('o',.12,.24)}},
     tori:{x:.30,y:.93,T:90,f:-1,leg:{R:W(.20,.07),L:W(.42,.07)},arm:{R:TP('o',.12,.38),L:SL('armR',.65)}}}],
 [1,{}],
 [1.6,{tori:{x:.26,leg:{R:W(.10,.14)}},uke:{x:-.27,T:84}}],
 [2.2,{tori:{x:.20,y:.92,T:94,leg:{R:W(0,.07)}},uke:{x:-.22,T:72,h:12,leg:{R:W(-.20,.11),L:W(-.40,.11)}}}],
 [2.9,{}],
 [3.4,{tori:{x:.10,y:.86,T:86,leg:{R:W(-.06,.07),L:W(.28,.12)},arm:{R:TP('o',-.02,.22)}}}],
 [3.8,{tori:{x:0,y:.76,T:76,f:0,h:10,leg:{L:W(.08,.18)},arm:{R:TP('o',-.12,.20)}}}],
 [4.3,{tori:{x:-.08,y:.72,T:72,f:1,h:15,leg:{R:W(-.13,.07),L:W(.04,.07)},arm:{R:TP('o',-.17,.22),L:SL('armR',.7)}},
       uke:{x:-.29,y:.96,T:68,bR:1,leg:{R:W(-.20,.12),L:W(-.38,.12)},arm:{R:TP('o',.18,.30),L:TP('o',-.10,.45)}}}],
 [5,{}],
 [5.5,{tori:{x:-.06,y:.82,T:48,h:20},uke:{x:-.16,y:1.19,r:-40,h:10,gf:0,leg:{R:A(-100,-110),L:A(-90,-100)}}}],
 [6,{tori:{x:-.04,y:.86,T:30,h:20},uke:{x:.45,y:1.32,r:-150,h:-15,leg:{R:A(-95,-100),L:A(-85,-95)},arm:{L:A(-60,-60),R:TP('o',.2,.35)}}}],
 [6.4,{tori:{y:.84,T:38,h:15,bR:-1,arm:{R:TP('s',.25,.20)}},uke:{x:.95,y:.80,r:-225,h:-25,bR:-1,leg:{R:A(-95,-100),L:A(-88,-95)},arm:{L:A(-100,-110),R:TP('o',.25,.30)}}}],
 [6.8,{tori:{y:.80,T:48,h:10},uke:{x:1.12,y:.15,r:-248,h:-20,leg:{R:A(-89,-139),L:A(-84,-130)},arm:{L:A(-119,-119),R:W(.47,.72)}}}],
 [7.8,{tori:{y:.81,T:51,h:5}}],
 [9,{}]],
 glow:{s:3.3,e:5.4,limbs:{'T.R.arm':'force'}},
 trail:{s:5,e:6.95,hide:8.6,fig:'uke',joints:['hip','head']},
 stamp:{s:6.85,e:8.8,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('Hikite: puxa',T.armL.H,3.2,-4.2,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6.5,-3.4,C.force,a);
  a=win(t,1.3,3.1);
  if(a>0){const ch=tp(U,.2,.40);api.arrow(ch,[ch[0]+.32,ch[1]+.14],C.force,a);
   api.tag('puxada: frente e para cima',[ch[0]+.32,ch[1]+.14],1,-2.6,C.force,a,false);
   api.tag('Uke na ponta dos pés',U.legR.toe,-8,1.2,C.gold,a);}
  a=win(t,3.6,5.2);
  api.tag('braço abraça a cintura',T.armR.H,-7,-3.6,C.force,a);
  a=win(t,4.2,5.2);
  if(a>0){const hb=tp(U,0,.09);api.dashed([-.6,hb[1]],[.6,hb[1]],C.uke,a,1.8);api.dashed([-.6,T.y],[.6,T.y],C.force,a,1.8);
   api.tag('faixa de Uke',[.6,hb[1]],4.6,0,C.uke,a,false);
   api.tag('quadril de Tori: mais baixo e mais fundo',[.6,T.y],12,0,C.force,a,false);
   api.ring(tp(T,-.14,.05),.12,C.force,a);}
  a=win(t,5,5.9);
  api.arrow([T.x+.42,.18],[T.x+.42,.62],C.force,a);api.tag('pernas estendem',[T.x+.42,.4],5.4,0,C.force,a,false);
  a=win(t,5.3,6.6);
  if(a>0){const c=tp(T,-.05,.12);api.arc(c,.48,160,10,C.force,a);
   api.tag('eixo no quadril (no seoi, no ombro)',[-.45,1.78],0,0,C.force,a,false);}
  a=win(t,6.9,8.9);
  api.tag('manga segura até o fim',T.armL.H,6.5,-2.2,C.force,a);api.tag('ukemi: queixo no peito',U.head,-2,3.4,C.uke,a);}
});})();
