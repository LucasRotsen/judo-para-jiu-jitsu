(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda (yaw crescente) até ficar de lado,
   de costas para Uke (yaw 330), com a perna direita estendida e reta na frente da canela direita de Uke,
   por fora do pé direito dele. Sem encaixe de quadril: o lado direito de Tori fica de frente para Uke, com espaço.
   Na projeção Tori continua o giro para a esquerda (yaw 360) puxando a manga. Uke tropeça na perna,
   roda baixo à frente dele por cima do próprio ombro direito e cai de lado e de costas, com a cabeça à
   frente dos pés de Tori e as pernas esticadas para a frente e para a esquerda dele.
   Poses conferidas com o vídeo da Kodokan 体落 / Tai-otoshi. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.20,.26,.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.7)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
const gola=B('o',.14,.40,-.08); // gola esquerda de Uke, no referencial de Uke
Judo.register3d({
 id:'tai-otoshi', name:'Tai Otoshi', kanji:'体落',
 cls:'Nage-waza · Te-waza', group:'nage',
 bjj:'Tai otoshi, a queda sem encaixar o quadril',
 why:'Projeção de mão que não exige carregar o oponente nas costas: a perna só bloqueia e o giro faz o resto. No jiu-jitsu em pé é uma entrada com pouco risco de ter as costas tomadas.',
 summary:'Tori gira de lado, sem encostar o quadril em Uke, e estende a perna direita na frente da canela direita dele. Puxando a manga e girando o tronco para a esquerda, faz Uke tropeçar por cima da perna e cair de costas à sua frente.',
 reading:[{k:'体',r:'tai',m:'corpo'},{k:'落',r:'otoshi',m:'derrubar, deixar cair'}],
 facts:[['Grupo','Nage-waza (projeções) › Te-waza (técnicas de mão)'],['Gokyo','2º grupo (Dai-nikyo)'],
  ['Direção do kuzushi','Para frente e para a direita de Uke, o canto da frente do pé direito dele'],
  ['A perna','Fica reta e parada, só bloqueando. Ela não varre nem levanta: quem projeta são as mãos e o giro do tronco.'],
  ['No jiu-jitsu','Funciona com manga e gola e não precisa encaixar o quadril, então Tori fica menos exposto a ter as costas pegas. Uke cai de costas à frente de Tori, que segue segurando a manga.']],
 errors:[['Encaixar o quadril','No tai otoshi o quadril de Tori não carrega Uke. Encostado demais, vira um seoi nage mal feito e Uke senta nas costas de Tori.'],
  ['Perna dobrada','A perna direita fica estendida, na frente da canela de Uke. Dobrada, não bloqueia nada e Uke passa por cima dando um passo.'],
  ['Perna que varre','Levantar a perna para varrer tira o bloqueio. Ela fica plantada e Uke tropeça nela.'],
  ['Parar de girar','Sem a puxada da manga e o giro do tronco para a esquerda, Uke só tropeça e recupera o passo.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Repita a entrada (uchikomi) muitas vezes antes de projetar.',
  'Tori mantém a manga presa até Uke tocar o tatame. É ela que protege a cabeça de Uke na queda.'],
 phases:[
 {s:0,e:1.2,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, cotovelo baixo.','Distância de um braço dobrado.']},
 {s:1.2,e:3.0,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa a manga para frente e para cima e põe o pé direito na frente do pé direito de Uke. Uke avança o pé direito e o peso vai para a ponta dele.',
  l:['A puxada leva o peso de Uke para o canto da frente do pé direito.','O pé direito de Tori fica na frente do de Uke, com os dedos para dentro.','Esse pé é o eixo do giro.']},
 {s:3.0,e:5.0,kanji:'作り',ro:'Tsukuri',pt:'Giro e bloqueio',
  d:'Tori gira para a esquerda sobre o pé direito e leva o pé esquerdo para trás, ficando de lado e de costas para Uke, sem encostar o quadril. Em seguida estende a perna direita, reta, na frente da canela direita de Uke, com o pé por fora do pé direito dele.',
  l:['Perna direita reta, na frente da canela direita de Uke.','Quadril de Tori sem encostar em Uke: o lado direito fica de frente para ele.','Joelho esquerdo dobrado, com o peso nessa perna.']},
 {s:5.0,e:6.8,kanji:'掛け',ro:'Kake',pt:'Execução',
  d:'Tori continua o giro do tronco para a esquerda, puxando a manga e empurrando a gola. Uke tropeça na perna estendida e roda baixo à frente de Tori, por cima do próprio ombro direito, o da manga puxada. Cai primeiro de lado e termina de costas.',
  l:['A perna fica parada: Uke tropeça nela.','As mãos giram como um volante, para a esquerda.','Uke roda à frente de Tori, não por cima das costas.']},
 {s:6.8,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas à frente de Tori, com a cabeça perto dos pés dele. Tori fica em pé, com base larga, e segura a manga puxada para cima para controlar a queda.',
  l:['Manga presa até o fim.','Uke faz ukemi com o queixo no peito e bate o braço livre.','Tori termina equilibrado, sem cair junto.']}],
 rep:[.6,2.6,4.8,5.9,8.5], cover:5.9,
 views:[
  {name:'Lateral',a:20,e:14,center:[.15,.75,.0],span:3.6},
  {name:'Linha da queda',a:-80,e:22,center:[.2,.7,-.1],span:3.6},
  {name:'De cima',a:0,e:88,center:[.2,0,-.1],span:3.4}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* kuzushi: pé direito de Tori na frente do pé direito de Uke; puxada da manga */
 [1.9,{tori:{x:.22,leg:{R:W3(.06,.12,.06)}},uke:{pitch:8}}],
 [2.5,{tori:{x:.16,yaw:200,pitch:2,leg:{R:W3(.06,.07,.07)}},
       uke:{x:-.30,y:.94,pitch:12,h:4,leg:{R:W3(-.25,.07,.15)},arm:{R:B('o',.24,.60,.12)},pole:{armR:[.4,-.6,.6]}}}],
 [3.0,{}],
 /* tsukuri: giro para a esquerda sobre o pé direito; o pé esquerdo vai para trás */
 [3.5,{tori:{x:.12,y:.86,z:-.04,yaw:262,pitch:8,leg:{L:W3(.26,.15,-.10)},pole:{armR:[-.2,-.8,.5]}},
       uke:{arm:{R:B('o',.20,.50,-.02)}}}],
 [4.0,{tori:{x:.12,y:.80,z:-.10,yaw:315,pitch:10,leg:{L:W3(.14,.07,-.26)}}}],
 /* a perna direita sai do chão e passa por fora do pé direito de Uke */
 [4.4,{tori:{yaw:322,leg:{R:W3(-.08,.25,.32)},pole:{legR:[.3,.2,1]}}}],
 /* bloqueio: perna direita reta na frente da canela direita de Uke, pé por fora do dele */
 [4.8,{tori:{x:.10,y:.74,z:-.14,yaw:330,pitch:14,h:8,leg:{R:W3(-.30,.07,.36)},
        arm:{R:gola,L:SL('armR',.75)},pole:{legR:[.4,0,1],armR:[0,-.4,1],armL:[0,.3,-1]}},
       uke:{x:-.30,y:.90,z:.08,pitch:22,h:8,arm:{R:B('o',.25,.42,-.12),L:B('o',.0,.30,.30)}}}],
 [5.0,{}],
 /* kake: Tori gira o tronco para a esquerda; Uke tropeça na perna e roda pelo lado direito de Tori */
 [5.3,{tori:{yaw:338,pitch:16,pole:{armR:[-.5,0,1]}},
       uke:{x:-.18,y:.86,z:.24,yaw:8,pitch:45,h:-5,gf:0,leg:{R:W3(-.25,.07,.15),L:W3(-.30,.22,-.04)},
        arm:{R:B('o',.30,.36,-.10),L:SL('armR',.35)}}}],
 /* Uke tropeça na canela e roda baixo por cima do próprio ombro direito (o da manga puxada), num plano
    inclinado 50 graus: o quadril não passa da altura do quadril de Tori, as pernas passam rasantes para a
    direita de Uke, longe de Tori, e a cabeça, recolhida, fica longe do tatame. O lado direito e as costas
    chegam primeiro. Ângulos calculados a partir dos eixos do corpo. */
 [5.55,{tori:{yaw:344,pitch:16},
       uke:{x:.18,y:.72,z:.40,yaw:11,pitch:100,roll:1,h:12,leg:{R:B('s',-.05,-.85,.12),L:B('s',-.12,-.83,-.12)},
        arm:{R:B('o',.36,.30,-.08)},pole:{armR:[.3,-.3,1]}}}],
 [5.75,{tori:{yaw:349,pitch:16},
       uke:{x:.45,y:.72,z:.48,yaw:40,pitch:123,roll:12,h:18,leg:{R:B('s',0,-.85,.12),L:B('s',-.05,-.84,-.12)},
        arm:{R:B('o',.42,.40,.08)}}}],
 [5.95,{tori:{x:.11,y:.73,z:-.10,yaw:354,pitch:18,leg:{L:W3(-.02,.16,-.30)}},
       uke:{x:.66,y:.70,z:.42,yaw:71,pitch:142,roll:38,h:20,leg:{R:B('s',.05,-.85,.12),L:B('s',0,-.84,-.12)},
        arm:{R:B('o',.46,.34,.10),L:SL('armR',.3)},pole:{armR:[0,-.2,1]}}}],
 /* a rotação continua no mesmo plano até o corpo deitar de lado, ainda no ar e à frente de Tori */
 [6.1,{tori:{yaw:356,pitch:22,leg:{L:W3(-.16,.07,-.30)}},
       uke:{x:.88,y:.60,z:.25,yaw:104,pitch:145,roll:67,h:20,leg:{R:B('s',.08,-.85,.12),L:B('s',.04,-.84,-.12)}}}],
 [6.18,{uke:{x:.90,y:.52,z:.14,yaw:93,pitch:176,roll:81}}],
 [6.25,{tori:{yaw:358,pitch:28},
       uke:{x:.90,y:.42,z:.02,yaw:39,pitch:242,roll:57,h:20,leg:{R:B('s',.10,-.84,.12),L:B('s',.06,-.84,-.12)},arm:{R:W3(.48,.84,.25),L:B('s',.10,.15,-.50)},pole:{armR:[.6,.6,.6]}}}],
 /* o lado direito toca primeiro e Uke rola para as costas */
 [6.42,{tori:{pitch:40},
       uke:{x:.78,y:.26,z:-.22,yaw:42,pitch:263,roll:14,h:15}}],
 /* queda: de costas, cabeça à frente dos pés de Tori, pernas para a frente e para a esquerda dele */
 [6.6,{tori:{x:.10,y:.77,z:0,yaw:360,pitch:58,h:12,leg:{L:W3(-.16,.07,-.30)},
        arm:{R:B('o',.34,.36,-.02)}},
       uke:{x:.68,y:.14,z:-.36,yaw:46,pitch:270,roll:0,h:10,gf:1,
        leg:{R:W3(1.35,.07,-.87),L:W3(1.21,.07,-1.01)},
        arm:{R:W3(.46,.66,-.04),L:W3(.10,.05,-.62)},pole:{legR:[1,0,.1],legL:[1,0,-.1]}}}],
 [6.8,{tori:{leg:{R:W3(-.14,.17,.36)},pole:{legR:[1,-.2,.3]}}}],
 [7.05,{tori:{leg:{R:W3(-.02,.07,.34)}}}],
 [8.0,{tori:{y:.76,pitch:60,h:15},uke:{h:18}}],
 [10.5,{}]],
 aperto:{s:4.6,e:5.7,limbs:['T.R.leg'],tol:.10,tudo:true},
 names:F=>({tori:[F.tori.head[0]+.12,Math.max(F.tori.head[1],F.tori.hip[1])+.22,F.tori.head[2]],
  uke:[F.uke.hip[0]-.15,Math.max(F.uke.head[1],F.uke.hip[1])+.22,F.uke.hip[2]]}),
 glow:{s:4.3,e:5.9,limbs:{'T.R.leg':'force'}},
 stamp:{s:6.7,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.3,3.1);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.30,.16,.12]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.30,.16,.12]),1,-2.6,C.force,a,false);
   api.tag('pé direito na frente do pé de Uke',T.legR.H,6,.5,C.gold,a);}
  a=win(t,4.6,5.8);
  api.tag('perna reta na frente da canela de Uke',T.legR.E,5,1.5,C.force,a);
  api.tag('quadril sem encostar',T.hip,-6,-2,C.force,a);
  a=win(t,5.1,6.6);
  if(a>0){api.arc(api.add(T.hip,[0,.55,0]),[1,0,0],[0,0,1],.45,40,250,C.force,a);
   api.tag('giro do tronco para a esquerda',api.add(T.hip,[0,.85,0]),0,0,C.force,a,false);}
  a=win(t,6.8,9.5);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-4,3.4,C.uke,a);}
});})();
