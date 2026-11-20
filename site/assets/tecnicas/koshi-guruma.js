(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z, esquerda = -z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda até ficar de costas (yaw ~355).
   O braço direito de Tori passa por cima do ombro esquerdo de Uke e envolve o pescoço por trás, com a
   mão na nuca. No giro o quadril de Tori passa bem além do quadril de Uke, para a direita (+z), mais
   fundo que no o goshi. Uke roda por cima do quadril direito de Tori e cai de costas à frente dele, com a
   cabeça perto do pé direito de Tori: o braço direito no pescoço segura Uke daquele lado, como no harai goshi.
   Poses conferidas com o vídeo da Kodokan (腰車 / Koshi-guruma). */
const uke0={x:-.27,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.14,.24,-.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.27,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.45)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'koshi-guruma', name:'Koshi Guruma', kanji:'腰車',
 cls:'Nage-waza · Koshi-waza', group:'nage',
 bjj:'Koshi guruma, o quadril com o braço no pescoço',
 why:'É a projeção de quadril que sai do braço em volta do pescoço, pegada que aparece o tempo todo no jiu-jitsu em pé quando Uke abaixa a cabeça. Em três ângulos para ver o braço no pescoço e o quadril passando além do quadril de Uke.',
 summary:'Roda de quadril. Tori puxa a manga, passa o braço direito por cima do ombro esquerdo de Uke e envolve o pescoço dele. Gira de costas e encaixa o quadril bem além do quadril de Uke. Ao estender as pernas, curvar o tronco e continuar o giro, Uke roda por cima do quadril de Tori como uma roda e cai de costas à frente dele.',
 reading:[{k:'腰',r:'koshi',m:'quadril'},{k:'車',r:'guruma',m:'roda'}],
 facts:[['Grupo','Nage-waza (projeções) › Koshi-waza (técnicas de quadril)'],['Gokyo','2º grupo (Dai-nikyo)'],
  ['Direção do kuzushi','Para frente, levando Uke para a ponta dos pés, sobre o canto da frente direito dele'],
  ['Diferença para o o goshi','No o goshi o braço abraça a cintura e o quadril fica logo à frente do de Uke. No koshi guruma o braço envolve o pescoço e o quadril passa bem além do quadril de Uke, que roda por cima dele como uma roda.'],
  ['No jiu-jitsu','Entra quando Uke abaixa a cabeça e Tori consegue passar o braço por cima do ombro até o pescoço. Uke cai de costas à frente de Tori, que continua em pé segurando a manga.']],
 errors:[['Quadril raso','Se o quadril de Tori fica só à frente do de Uke, ele não roda: vira um o goshi mal feito. O quadril passa além do quadril de Uke.'],
  ['Braço só no ombro','O braço envolve o pescoço, com a mão na nuca. Apoiado só no ombro, ele não puxa o peito de Uke para as costas de Tori.'],
  ['Quadril alto','Tori dobra os joelhos e fica abaixo da faixa de Uke. Depois estende as pernas para levantar.'],
  ['Parar o giro','A rotação do tronco para a esquerda e a puxada da manga fazem Uke rodar. Sem elas, Uke fica pendurado nas costas de Tori.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'O braço no pescoço guia o giro, não estrangula: não aperte a garganta.',
  'Tori mantém a manga presa até Uke tocar o tatame e não cai junto por cima dele.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoR',b:'U.pescoco',s:2.8,e:5.2,txt:'a mão direita de Tori fica na nuca de Uke'},
  {c:'lado',a:'T.maoR',de:'U.pescoco',lado:'tras',s:2.8,e:5.2,min:.05,txt:'o braço envolve o pescoço por trás: a mão fica atrás do pescoço, não na frente'},
  {c:'lado',a:'U.cabeca',de:'T.quadril',lado:'direita',s:3.7,e:5.1,min:.1,txt:'no giro, a cabeça de Uke fica sobre o ombro DIREITO de Tori, presa pelo braço no pescoço'},
  {c:'lado',a:'T.quadril',de:'U.quadril',lado:'direita',s:4.2,e:5.0,txt:'o quadril de Tori passa além do quadril de Uke, para a direita dele'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'frente',s:6.5,e:'fim',min:.6,txt:'Uke roda por cima do quadril e cai de costas à frente de Tori'},
  {c:'lado',a:'U.cabeca',de:'T.quadril',lado:'direita',s:7.0,e:'fim',min:.15,txt:'Uke cai à DIREITA de Tori: o braço direito no pescoço não deixa ele ir para o outro lado'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'direita',s:5.5,e:'fim',min:.1,txt:'Uke passa pelo quadril direito de Tori e cai à direita dele'}],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola esquerda com a mão direita.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, pronta para ir ao pescoço.','Postura natural, joelhos destravados.']},
 {s:1,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio e braço no pescoço',
  d:'Tori puxa a manga para frente e avança o pé direito para a frente do pé direito de Uke. A mão direita solta a gola, o braço passa por cima do ombro esquerdo de Uke e envolve o pescoço por trás, com a mão na nuca.',
  l:['A puxada leva Uke para a ponta dos pés.','O braço direito passa por cima do ombro esquerdo de Uke.','Mão na nuca: o braço envolve o pescoço, sem apertar a garganta.']},
 {s:2.6,e:4.4,kanji:'作り',ro:'Tsukuri',pt:'Giro e quadril além',
  d:'Tori gira para a esquerda sobre o pé direito, leva o pé esquerdo para trás e fica de costas para Uke, com os joelhos dobrados. O quadril passa bem além do quadril direito de Uke. O braço no pescoço cola o peito de Uke nas costas de Tori.',
  l:['Quadril de Tori além do quadril de Uke, não só à frente.','Joelhos dobrados, quadril abaixo da faixa de Uke.','Peito de Uke colado nas costas de Tori.']},
 {s:4.4,e:6.2,kanji:'掛け',ro:'Kake',pt:'A roda',
  d:'Tori estende as pernas, curva o tronco e continua o giro para a esquerda, puxando a manga e o pescoço. Uke roda por cima do quadril direito de Tori, as pernas passam por cima e a cabeça desce pela frente, do lado direito. Uke cai de costas à frente e à direita de Tori.',
  l:['Eixo da roda: o quadril de Tori.','As pernas estendem, o tronco curva e gira.','Hikite puxa a manga até o próprio quadril.']},
 {s:6.2,e:10,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas à frente de Tori, com a cabeça perto do pé direito dele e as pernas apontando para longe. O braço direito de Tori já soltou o pescoço e se junta à mão esquerda na manga. Tori termina de pé, curvado, sem cair junto.',
  l:['Manga segura até o fim.','Uke faz ukemi com o queixo no peito.','Tori fica de pé, sem cair junto.']}],
 rep:[.5,2.2,3.9,5.3,8.0], cover:5.2,
 views:[
  {name:'Diagonal',a:40,e:14,center:[.2,.9,-.15],span:3.8},
  {name:'Por trás de Uke',a:-100,e:12,center:[.1,.95,-.1],span:3.8},
  {name:'De cima',a:0,e:90,center:[.4,0,-.5],span:3.7}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* kuzushi: passo do pé direito e puxada; a mão direita solta a gola e sobe por cima do ombro esquerdo de Uke */
 [1.7,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)},arm:{R:B('o',.10,.62,-.24)},pole:{armR:[-.2,.4,.9]}},uke:{pitch:8}}],
 [2.1,{tori:{x:.14,yaw:200,pitch:4,leg:{R:W3(.06,.07,.06)},arm:{R:B('o',-.10,.58,-.04)},pole:{armR:[-.3,.6,.8]}},
       uke:{x:-.29,y:.96,pitch:14,h:10,arm:{R:B('o',.16,.58,-.10),L:B('s',.24,.20,-.32)},pole:{armR:[.4,-.6,.6],armL:[-.2,-.6,-.8]}}}],
 [2.6,{tori:{arm:{R:B('o',-.10,.58,.04)}},uke:{x:-.30,y:.97,pitch:18,h:12}}],
 /* tsukuri: giro para a esquerda sobre o pé direito; o quadril passa além do quadril direito de Uke */
 [3.2,{tori:{x:.06,y:.88,z:.06,yaw:275,pitch:10,leg:{L:W3(.24,.14,.08)},pole:{armR:[-.6,.6,.4]}},
       uke:{arm:{R:B('o',.18,.50,-.18)},pole:{armR:[.2,-.8,-.2]}}}],
 [3.5,{tori:{x:-.02,y:.86,z:.14,yaw:318,pitch:14,leg:{L:W3(.04,.12,-.04)}},uke:{z:0.05,pitch:33,roll:15.0,yaw:-6.0,arm:{R:B('o',.24,.52,-.26)}}}],
 [3.9,{tori:{x:-.08,y:.80,z:.18,yaw:352,pitch:22,h:8,leg:{L:W3(-.14,.07,.03),R:W3(-.04,.07,.34)},
        arm:{R:B('o',-.10,.56,.02),L:SL('armR',.5)},pole:{armR:[-.8,.5,.3],armL:[.3,-.6,-.6]}},
       uke:{x:-.31,y:.97,z:.10,pitch:50,roll:30,yaw:-12,h:16,arm:{R:B('o',.20,.40,-.22),L:B('o',-.20,.40,.12)},pole:{armL:[.2,-.5,-.6],armR:[.2,-.8,-.3]}}}],
 [4.4,{tori:{yaw:358,pitch:28},uke:{pitch:54,roll:30}}],
 /* kake: as pernas estendem, o tronco curva e gira para a esquerda; Uke sai do chão com os dois pés juntos,
    carregado no quadril direito de Tori, e já começa a torcer (yaw e roll) para rodar pela frente dele */
 [4.85,{tori:{y:.88,yaw:368,pitch:44,roll:-4,h:15,arm:{L:SL('armR',.55)}},
       uke:{x:-.22,y:1.02,z:.14,yaw:-4,pitch:46,roll:25,h:16,arm:{L:B('o',-.22,.46,.16)}}}],
 [5.2,{tori:{y:.92,yaw:384,pitch:60,roll:-10,h:24},
       uke:{x:-.12,y:1.10,z:.14,yaw:10,pitch:78,roll:10,h:10,gf:0,leg:{R:B('s',-.26,-.78,.16),L:B('s',-.18,-.80,-.14)},
        arm:{R:B('o',.40,.34,-.34),L:B('s',.40,.40,-.20)},pole:{armR:[.5,.3,1]}}}],
 /* Uke roda em volta do quadril de Tori, deitado de lado, nunca na vertical de ponta-cabeça;
    a manga puxada para cima mantém a cabeça longe do chão */
 [5.38,{tori:{yaw:394,pitch:60,roll:-12,h:32,arm:{R:B('s',.32,.28,.30)},pole:{armR:[-.3,-.5,1]}},
       uke:{x:0.13,y:1.30,z:0.08,yaw:26,pitch:105,roll:-10,h:12,leg:{R:B('s',-.20,-.80,.16),L:B('s',-.12,-.84,-.12)},arm:{R:B('o',.42,.28,-.30)}}}],
 [5.55,{tori:{y:.88,yaw:400,pitch:62,roll:-12,h:30,arm:{R:B('s',.15,.05,.36)},pole:{armR:[-.3,-.5,1]}},
       uke:{x:0.41,y:1.22,z:-0.28,yaw:34,pitch:150,roll:-78,h:25,leg:{R:W3(-0.18,1.10,-0.62),L:W3(-0.24,1.00,-0.76)},
        arm:{R:B('o',.38,.24,-.24),L:B('s',.1,.25,-.45)}}}],
 /* Uke chega ao chão DE LADO, deitado: o quadril desce junto com os ombros, o ombro e o lado das costas
    tocam antes da cabeça, cabeça recolhida e acima dos ombros, pernas por último. A manga puxada para
    cima segura o tronco. */
 [5.66,{uke:{x:0.80,y:.76,z:-0.41,yaw:34,pitch:200,roll:-84,h:30,leg:{R:W3(0.74,.92,-0.99),L:W3(0.60,.86,-1.07)}}}],
 [5.80,{tori:{pitch:58,roll:0},uke:{x:1.04,y:.50,z:-0.37,yaw:34,pitch:245,roll:-70,h:38,leg:{R:W3(1.40,.62,-0.81),L:W3(1.28,.58,-0.93)},arm:{R:B('o',.42,.26,-.20)}}}],
 [5.92,{uke:{x:1.04,y:.30,z:-0.33,pitch:258,roll:-40,h:40,leg:{R:W3(1.56,.44,-0.63),L:W3(1.44,.40,-0.81)}}}],
 [6.05,{tori:{y:.86,yaw:398,pitch:54,h:25},
       uke:{x:1.06,y:.19,z:-0.27,yaw:35,pitch:264,roll:-12,h:40,leg:{R:W3(1.70,.34,-0.53),L:W3(1.56,.36,-0.75)},
        arm:{R:B('o',.42,.20,-.20),L:B('s',.05,.05,-.50)}}}],
 [6.18,{uke:{x:1.06,y:.15,z:-0.23,pitch:268,roll:-4,h:35}}],
 [6.3,{tori:{y:.84,yaw:398,pitch:56,h:22,arm:{R:SL('armR',.25)}},
       uke:{x:1.06,y:.14,z:-0.19,yaw:35,pitch:268,roll:0,h:25,gf:1,leg:{R:W3(1.74,.20,-0.49),L:W3(1.58,.25,-0.73)},
        arm:{R:B('o',.38,.02,-.18),L:B('s',0,.15,-.48)}}}],
 /* zanshin: Tori de pé, curvado, as duas mãos na manga */
 [6.8,{tori:{y:.84,pitch:50,h:15},uke:{leg:{R:W3(1.74,.07,-0.51),L:W3(1.60,.07,-0.75)}}}],
 [7.3,{tori:{y:.84,pitch:46,h:10},uke:{h:15}}],
 [10,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.30,F.tori.head[2]+.30],uke:[F.uke.hip[0],Math.max(F.uke.head[1],F.uke.hip[1])+.30,F.uke.hip[2]-.38]}),
 glow:{s:2.0,e:5.4,limbs:{'T.R.arm':'force'}},
 stamp:{s:6.35,e:8.6,big:'一本',small:'IPPON'},
 aperto:[{s:1.9,e:5.25,limbs:['T.R.arm'],tol:.10,tudo:true},{s:1.8,e:5.4,limbs:['U.L.arm'],tol:.10},{s:3.3,e:5.5,limbs:['U.R.arm'],tol:.10}],
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.30,.18,0]),C.force,a);
   api.tag('puxada para frente',api.add(ch,[.30,.18,0]),-9,1,C.force,a);}
  a=win(t,2.6,4.8);
  api.tag('braço envolve o pescoço',T.armR.E,7,-2,C.force,a);
  a=win(t,3.8,4.9);
  if(a>0){const ur=api.bp(U,0,0,.13),tr=api.bp(T,0,0,.13);
   api.dashed([ur[0],.35,ur[2]],[ur[0],1.15,ur[2]],C.uke,a,1.8);
   api.dashed([tr[0],.35,tr[2]],[tr[0],1.15,tr[2]],C.force,a,1.8);
   api.tag('quadril de Uke',[ur[0],.35,ur[2]],-6,1.5,C.uke,a,false);
   api.tag('quadril de Tori passa além',[tr[0],.35,tr[2]],6,3.5,C.force,a,false);}
  a=win(t,5.0,6.2);
  if(a>0){api.arc(api.add(T.hip,[0,.25,0]),[1,0,0],[0,1,0],.55,165,15,C.force,a);
   api.tag('roda em volta do quadril',api.add(T.hip,[-.05,-.72,.4]),0,0,C.force,a,false);}
  a=win(t,6.5,8.6);
  api.tag('manga segura até o fim',T.armL.H,5,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-6,-2.5,C.uke,a);}
});})();
