(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z) e gira para a esquerda
   (yaw crescente) até ficar de costas para Uke (yaw ~340). A projeção continua o giro
   para a esquerda e Uke cai de costas à frente de Tori, para o lado de -z. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.20,.26,.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.7)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'o-goshi', name:'O Goshi', kanji:'大腰',
 cls:'Nage-waza · Koshi-waza', group:'nage',
 bjj:'O goshi, a queda de quadril do clinch',
 why:'Aproveita o clinch com o braço nas costas, posição que aparece o tempo todo no jiu-jitsu em pé. Em três ângulos para ver o giro do quadril e o braço abraçando a cintura.',
 summary:'Grande projeção de quadril. Tori abraça a cintura de Uke com o braço direito, gira de costas e encaixa o quadril mais baixo e mais fundo que o dele. Ao estender as pernas e continuar o giro, Uke rola por cima do quadril de Tori e cai de costas. Tori segue para o kesa-gatame.',
 reading:[{k:'大',r:'o',m:'grande'},{k:'腰',r:'goshi',m:'quadril'}],
 facts:[['Grupo','Nage-waza (projeções) › Koshi-waza (técnicas de quadril)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['Direção do kuzushi','Para frente, puxando Uke para a ponta dos pés'],
  ['Diferença para o seoi nage','No seoi o eixo da rotação é o ombro. No o goshi o eixo é o quadril, e o braço de Tori abraça a cintura em vez de prender o braço de Uke.'],
  ['No jiu-jitsu','Entra direto do clinch com underhook ou braço nas costas, sem precisar de pegada na gola. Uke cai de costas ao lado de Tori, que já está com o braço por perto do pescoço: o kesa-gatame sai naturalmente.']],
 errors:[['Quadril raso','Se o quadril de Tori fica só ao lado do de Uke, não há onde ele rolar. O quadril precisa passar além da linha do quadril de Uke.'],
  ['Quadril alto','Tori precisa dobrar os joelhos e ficar abaixo da faixa de Uke para poder levantá-lo com as pernas.'],
  ['Braço solto na cintura','O braço nas costas cola Uke ao quadril de Tori. Frouxo, Uke escorrega para trás e pega as costas de Tori.'],
  ['Parar o giro','Sem continuar o giro para a esquerda, Uke fica sentado no quadril de Tori. A rotação do tronco é o que faz Uke rolar.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Repita a entrada (uchikomi) muitas vezes antes de projetar.',
  'Tori mantém a manga presa até Uke tocar o tatame. No kesa-gatame, não force o pescoço: o controle vem do peso, não do aperto.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita. Na entrada, a mão direita solta a gola e vai para as costas de Uke.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, pronta para mudar de lugar.','Postura natural, joelhos destravados.']},
 {s:1,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa a manga para frente e para cima e avança o pé direito para a frente do pé direito de Uke. O peso de Uke vai para a ponta dos pés.',
  l:['A puxada leva o peito de Uke para frente.','O passo do pé direito já prepara o giro.','Uke na ponta dos pés não consegue sentar o quadril para defender.']},
 {s:2.6,e:4.8,kanji:'作り',ro:'Tsukuri',pt:'Giro e encaixe do quadril',
  d:'Tori gira sobre o pé direito, leva o pé esquerdo para trás e fica de costas para Uke, com os pés entre os pés dele. O braço direito passa por baixo do braço de Uke e abraça a cintura por trás, com a mão nas costas, na altura da faixa. O quadril de Tori encaixa abaixo e além do quadril de Uke.',
  l:['Braço direito nas costas de Uke, na altura da faixa: abraço, não empurrão.','Quadril de Tori mais baixo e mais fundo que o de Uke.','Joelhos flexionados, pés entre os pés de Uke.']},
 {s:4.8,e:6.6,kanji:'掛け',ro:'Kake',pt:'Execução',
  d:'Tori estende as pernas, levantando Uke com o quadril, e continua o giro para a esquerda puxando a manga. Uke rola por cima do quadril de Tori e cai de costas à frente dele.',
  l:['Eixo da rotação: o quadril de Tori, não o ombro.','As pernas fazem a força; o braço só mantém Uke colado.','Hikite puxa até o próprio quadril.']},
 {s:6.6,e:7.9,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas. Tori mantém a manga presa para controlar a queda e termina equilibrado, sem cair junto.',
  l:['Manga segura até o fim.','Uke faz ukemi com o queixo no peito.','Tori fica ao lado da cabeça e do braço direito de Uke.']},
 {s:7.9,e:10.5,kanji:'袈裟固',ro:'Kesa-gatame',pt:'Jiu-jitsu: controle no chão',
  d:'Sem soltar a manga, Tori senta ao lado do tronco de Uke, prende o braço direito dele embaixo da própria axila e passa o braço direito por trás do pescoço. As pernas abrem em base larga, a direita à frente e a esquerda atrás.',
  l:['O braço de Uke fica preso entre a axila e a mão de Tori.','O peso de Tori fica no peito de Uke, não no tatame.','Pernas abertas: a base impede Uke de rolar Tori por cima.']}],
 rep:[.5,2.2,4.4,5.7,7.2,9.8], cover:5.7,
 views:[
  {name:'Diagonal',a:28,e:20,center:[.35,.95,-.25],span:3.5},
  {name:'Por trás de Uke',a:-125,e:18,center:[.3,.92,-.25],span:3.5},
  {name:'De cima',a:0,e:90,center:[.45,0,-.3],span:3.0}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* kuzushi: passo do pé direito de Tori, puxada da manga */
 [1.7,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)}},uke:{pitch:8}}],
 [2.3,{tori:{x:.14,yaw:200,pitch:2,leg:{R:W3(-.02,.07,.10)}},
       uke:{x:-.32,y:.97,pitch:8,h:4,arm:{R:B('o',.24,.62,.12)},pole:{armR:[.4,-.6,.6]}}}],
 [2.6,{}],
 [2.95,{tori:{arm:{R:B('o',.24,.26,.22)},pole:{armR:[-1,-1,-1]}}}],
 /* tsukuri: giro para a esquerda (yaw crescente) e braço para as costas */
 [3.3,{tori:{x:.22,y:.86,yaw:270,pitch:12,leg:{L:W3(.12,.14,.25)},
        arm:{R:B('o',.02,.20,.32)},pole:{armR:[0,-1,0]}},
       uke:{arm:{R:B('o',-.05,.64,.24),L:B('o',.02,.30,.33)}}}],
 [4.0,{tori:{x:-.10,y:.74,z:-.03,yaw:340,pitch:24,h:12,leg:{R:W3(-.04,.07,.12),L:W3(-.10,.07,-.14)},
        arm:{R:B('o',-.17,.12,.02),L:SL('armR',.5)},pole:{armR:[-.6,-.2,1],armL:[.3,-.6,-.6]}},
       uke:{x:-.31,y:.96,pitch:22,h:14,arm:{R:B('o',-.14,.57,-.17),L:B('o',-.22,.30,.10)},pole:{armR:[.2,.8,.3],armL:[.2,-.5,-.6]}}}],
 [4.8,{}],
 [5.05,{uke:{arm:{R:B('o',.06,.56,-.34)}}}],
 /* kake: extensão das pernas, giro contínuo, Uke rola por cima do quadril */
 [5.3,{tori:{y:.84,yaw:360,pitch:44,h:20,arm:{R:B('o',-.04,.12,.32),L:SL('armR',.55)}},
       uke:{x:-.14,y:1.42,z:-.06,yaw:6,pitch:72,h:10,gf:0,leg:{R:B('s',-.08,-.86,.12),L:B('s',-.10,-.84,-.12)},
        arm:{R:B('o',.14,.46,-.36)},pole:{armR:[1,-.5,-1]}}}],
 [5.85,{tori:{y:.88,yaw:378,pitch:38,h:20},
       uke:{x:.10,y:1.54,z:-.52,yaw:20,pitch:140,roll:-25,h:-10,leg:{R:B('s',-.05,-.86,.14),L:B('s',-.06,-.84,-.10)},
        arm:{R:B('o',.30,.10,-.32),L:B('s',.1,.25,-.45)}}}],
 [6.3,{tori:{y:.84,yaw:392,pitch:40,h:15,arm:{R:B('s',.32,.22,.22)}},
       uke:{x:.52,y:.72,z:-.68,yaw:25,pitch:220,roll:-15,h:-20,leg:{R:B('s',.1,-.85,.12),L:B('s',.06,-.84,-.12)},
        arm:{R:B('o',.32,.15,-.30),L:B('s',.05,.0,-.50)}}}],
 [6.6,{tori:{y:.80,yaw:395,pitch:50,h:10,arm:{L:B('s',.42,.02,-.15)}},
       uke:{x:.80,y:.14,z:-.62,yaw:25,pitch:268,roll:0,h:-25,gf:1,leg:{R:W3(1.50,.07,-.82),L:W3(1.45,.07,-1.05)},
        arm:{R:SL('armL',1),L:B('s',0,.15,-.48)}}}],
 [7.6,{tori:{y:.82,pitch:46,h:5},uke:{h:-30}}],
 [7.9,{}],
 /* kesa-gatame: Tori senta ao lado de Uke, de frente para a cabeça dele */
 [8.8,{tori:{x:.45,y:.42,z:.08,yaw:530,pitch:30,roll:15,h:10,
        leg:{R:W3(.15,.07,.28),L:W3(1.0,.10,.30)},arm:{R:B('o',.05,.66,.10),L:SL('armR',.35)},
        pole:{legR:[.6,.4,.6],legL:[-.2,-.4,-.3],armR:[.2,-.4,1]}},
       uke:{h:-15,arm:{R:B('o',.20,.36,-.22)}}}],
 [9.5,{tori:{x:.72,y:.20,z:-.12,yaw:565,pitch:15,roll:35,h:-5,
        leg:{R:W3(.12,.07,.22),L:W3(1.25,.07,.05)},arm:{R:B('o',-.08,.66,-.16),L:SL('armR',.3)},
        pole:{legR:[.4,.7,.3],legL:[-.3,-.3,-.4],armR:[.6,-.2,1],armL:[-.6,-.6,-.6]}},
       uke:{h:-10,arm:{R:B('o',.20,.30,-.24),L:B('s',.05,.25,-.45)}}}],
 [10.5,{}]],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.30,F.tori.head[2]],uke:[F.uke.hip[0]+.25,Math.max(F.uke.head[1],F.uke.hip[1])+.40,F.uke.hip[2]-.25]}),
 glow:{s:3.0,e:5.0,limbs:{'T.R.arm':'force'}},
 stamp:{s:6.65,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.32,.16,0]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.32,.16,0]),1,-2.6,C.force,a,false);
   api.tag('pé direito à frente do pé de Uke',T.legR.H,6,.5,C.gold,a);}
  a=win(t,3.2,5.0);
  api.tag('braço abraça a cintura, mão nas costas',T.armR.H,-4,-7.5,C.force,a);
  a=win(t,3.9,5.0);
  if(a>0){const ub=api.bp(U,0,.1,0),th=T.hip;
   api.dashed([ub[0]-.25,ub[1],ub[2]],[ub[0]+.65,ub[1],ub[2]],C.uke,a,1.8);
   api.dashed([th[0]-.25,th[1],th[2]],[th[0]+.65,th[1],th[2]],C.force,a,1.8);
   api.tag('faixa de Uke',[ub[0]+.65,ub[1],ub[2]],4.4,-.4,C.uke,a,false);
   api.tag('quadril de Tori: mais baixo e mais fundo',[th[0]+.65,th[1],th[2]],4,1.4,C.force,a,false);}
  a=win(t,4.8,5.7);
  api.arrow([T.hip[0]+.35,.2,T.hip[2]+.25],[T.hip[0]+.35,.62,T.hip[2]+.25],C.force,a);
  api.tag('pernas estendem',[T.hip[0]+.35,.4,T.hip[2]+.25],5.4,0,C.force,a,false);
  a=win(t,5.0,6.5);
  if(a>0){api.arc(api.add(T.hip,[0,.25,0]),[1,0,0],[0,1,0],.55,165,15,C.force,a);
   api.tag('eixo no quadril (no seoi, no ombro)',api.add(T.hip,[-.05,-.72,.4]),0,0,C.force,a,false);}
  a=win(t,6.7,8.0);
  api.tag('manga segura até o fim',T.armL.H,5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-3,3.4,C.uke,a);
  a=win(t,8.9,10.5);
  api.tag('braço por trás do pescoço',T.armR.E,-6,-3,C.force,a);
  api.tag('braço de Uke preso na axila',U.armR.E,6,-2.5,C.gold,a);
  api.tag('base larga',T.legL.H,5,-1.5,C.force,a);}
});})();
