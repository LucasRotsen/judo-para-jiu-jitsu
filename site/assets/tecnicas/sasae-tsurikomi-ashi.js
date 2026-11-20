(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180; esquerda de Tori = +z). O pé direito de Uke e o pé
   esquerdo de Tori ficam do mesmo lado (+z): é ali que acontece o bloqueio.
   Tori recua o pé direito e puxa; Uke avança o pé direito. Tori gira para a esquerda (yaw crescente) e
   apoia a sola do pé esquerdo na frente do tornozelo direito de Uke, perna reta. As mãos giram como um
   volante: Uke tropeça no pé bloqueado, roda baixo à frente e à esquerda de Tori, por cima do próprio
   ombro direito, e cai de costas com a cabeça junto aos pés de Tori e as pernas para longe (+x).
   Poses conferidas com o vídeo da Kodokan 支釣込足 / Sasae-tsurikomi-ashi. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.20,.26,.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.7)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
const gola=B('o',.14,.40,-.08); // gola esquerda de Uke, no referencial de Uke
const tornozelo=W3(.0,.15,.17); // frente do tornozelo direito de Uke, onde a sola de Tori apoia
Judo.register3d({
 id:'sasae-tsurikomi-ashi', name:'Sasae Tsurikomi Ashi', kanji:'支釣込足',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'Sasae tsurikomi ashi, o bloqueio do pé que avança',
 why:'Projeção de pé que não precisa de entrada profunda nem de força: o pé só bloqueia e as mãos fazem Uke tropeçar. No jiu-jitsu em pé é uma forma segura de derrubar sem dar as costas.',
 summary:'Tori recua e puxa, Uke avança o pé direito. Tori gira para a esquerda e apoia a sola do pé esquerdo na frente do tornozelo direito de Uke, com a perna reta. Puxando a manga e levantando pela gola, faz Uke tropeçar no pé bloqueado e rodar à sua frente até cair de costas.',
 reading:[{k:'支',r:'sasae',m:'apoiar, sustentar'},{k:'釣込',r:'tsurikomi',m:'pescar puxando e levantando'},{k:'足',r:'ashi',m:'pé, perna'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['Direção do kuzushi','Para frente e para a direita de Uke, o canto da frente do pé direito dele'],
  ['O pé','A sola do pé esquerdo encosta na frente do tornozelo direito de Uke e fica ali, parada. É um apoio, não uma varrida.'],
  ['Tsurikomi','As mãos pescam: a esquerda puxa a manga para frente e para a esquerda de Tori, a direita levanta pela gola. As duas giram juntas, como um volante.'],
  ['No jiu-jitsu','Funciona com manga e gola e sem encaixar o quadril, então Tori não fica de costas. Uke cai de costas à frente de Tori, que segue em pé, segurando a manga, pronto para descer por cima.']],
 errors:[['Varrer o pé','Se a perna varre, vira de ashi barai fora de tempo e o pé de Uke escapa. A sola apoia e fica parada; quem projeta são as mãos.'],
  ['Apoiar no lugar errado','A sola vai na frente do tornozelo, logo acima do pé. Na canela alta ou no joelho, vira chute e machuca.'],
  ['Perna dobrada','Com o joelho dobrado, Uke empurra o pé de Tori e dá o passo. A perna fica reta, firme do quadril ao pé.'],
  ['Mãos paradas','Sem a puxada e o giro das mãos, Uke só tropeça e recupera o equilíbrio com o outro pé.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Apoie com a sola do pé, nunca com o calcanhar ou com a ponta, e nunca no joelho.',
  'Tori mantém a manga presa e puxada para cima até Uke tocar o tatame. É ela que protege a cabeça dele.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.peL',b:'U.canelaR',s:4.0,e:5.4,txt:'a sola esquerda de Tori apoia na frente do tornozelo direito de Uke'},
  {c:'lado',a:'T.peL',de:'U.peR',lado:'frente',s:4.0,e:5.0,min:-.10,txt:'o pé de Tori bloqueia na frente do tornozelo, não atrás do calcanhar (medido do meio do pé de Uke, que fica à frente do tornozelo)'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'frente',s:7.0,e:'fim',min:.5,txt:'Uke cai à frente de Tori'}],
 phases:[
 {s:0,e:1.2,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola esquerda com a mão direita. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, cotovelo baixo.','Distância de um braço dobrado.']},
 {s:1.2,e:3.0,kanji:'崩し',ro:'Kuzushi',pt:'Recuar e puxar',
  d:'Tori recua o pé direito um pouco para trás e para a direita e puxa a manga para frente e para cima. Uke avança o pé direito para não perder o equilíbrio, e o peso vai para a ponta desse pé.',
  l:['O recuo de Tori convida Uke a dar o passo.','A puxada leva o peso de Uke para o canto da frente do pé direito.','O pé direito de Tori, atrás, vira o eixo do giro.']},
 {s:3.0,e:5.0,kanji:'作り',ro:'Tsukuri',pt:'Giro e bloqueio',
  d:'Tori gira o corpo para a esquerda sobre o pé direito e estende a perna esquerda, reta, apoiando a sola do pé na frente do tornozelo direito de Uke. O tronco fica um pouco para trás, e as mãos continuam puxando.',
  l:['Sola do pé esquerdo na frente do tornozelo direito de Uke.','Perna esquerda reta; o peso fica na perna direita.','Uke não consegue tirar o pé: ele está carregado.']},
 {s:5.0,e:6.8,kanji:'掛け',ro:'Kake',pt:'Execução',
  d:'Tori gira as mãos como um volante para a esquerda: puxa a manga para o próprio quadril e levanta pela gola. Uke tropeça no pé bloqueado e roda baixo à frente e à esquerda de Tori, por cima do próprio ombro direito, o da manga puxada. O lado das costas chega primeiro e ele termina de costas.',
  l:['O pé fica parado: Uke tropeça nele.','As mãos giram juntas, para a esquerda.','Uke roda à frente de Tori, baixo, sem passar por cima dele.']},
 {s:6.8,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas à frente de Tori, com a cabeça perto dos pés dele e as pernas para longe. Tori fica em pé, inclinado sobre ele, e segura a manga puxada para cima para controlar a queda.',
  l:['Manga presa até o fim.','Uke faz ukemi com o queixo no peito e bate o braço livre.','Tori termina equilibrado, sem cair junto.']}],
 rep:[.6,2.6,4.6,5.75,8.5], cover:5.75,
 views:[
  {name:'Lateral',a:20,e:14,center:[.4,.80,.2],span:3.7},
  {name:'Por trás de Tori',a:60,e:20,center:[.4,.75,.25],span:3.9},
  {name:'De cima',a:0,e:88,center:[.6,0,.75],span:4.0}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* kuzushi: Tori recua o pé direito e puxa; Uke avança o pé direito */
 [1.8,{tori:{x:.37,leg:{R:W3(.38,.12,-.20)}},uke:{pitch:8}}],
 [2.3,{tori:{x:.40,y:.92,yaw:186,leg:{R:W3(.42,.07,-.24)}},
       uke:{x:-.27,pitch:10,leg:{R:W3(-.15,.13,.15)},arm:{R:B('o',.22,.56,.10)},pole:{armR:[.4,-.6,.6]}}}],
 [2.8,{uke:{x:-.21,y:.92,pitch:12,h:4,leg:{R:W3(-.08,.07,.16)}}}],
 [3.0,{}],
 /* tsukuri: giro para a esquerda sobre o pé direito; o pé esquerdo sai do chão */
 [3.6,{tori:{x:.42,y:.87,z:-.08,yaw:196,pitch:0,leg:{L:W3(.20,.20,.17)},pole:{legL:[.8,0,-.3]}}}],
 /* bloqueio: sola do pé esquerdo na frente do tornozelo direito de Uke, perna reta */
 [4.2,{tori:{x:.46,y:.85,z:-.10,yaw:205,pitch:-6,h:6,leg:{L:tornozelo},
        arm:{R:gola,L:SL('armR',.75)},pole:{legL:[.6,.4,-.3],armR:[0,-.4,1],armL:[0,.3,-1]}},
       uke:{x:-.20,y:.91,z:.04,pitch:18,h:6,arm:{R:B('o',.26,.50,-.04),L:B('o',.05,.30,.30)}}}],
 [4.8,{tori:{yaw:210},uke:{x:-.17,y:.90,z:.08,pitch:24,h:8}}],
 [5.0,{}],
 /* kake: as mãos giram para a esquerda; Uke tropeça no pé e começa a rodar por cima do ombro direito */
 [5.3,{tori:{yaw:222,pitch:-2,pole:{armR:[-.5,0,1]}},
       uke:{x:-.02,y:.86,z:.22,yaw:-22,pitch:45,roll:4,h:6,gf:0,leg:{R:W3(-.07,.08,.16),L:W3(-.20,.22,.0)},
        arm:{R:B('o',.30,.36,-.16),L:SL('armR',.35)}}}],
 /* roda baixa e de lado, à frente e à esquerda de Tori: o quadril não passa da cintura de Tori, a cabeça,
    recolhida, fica longe do tatame e de Tori; o lado direito e as costas chegam primeiro.
    Tori recolhe a perna esquerda e continua o giro para a esquerda, de frente para a queda. */
 [5.42,{uke:{x:.18,y:.84,z:.36,yaw:-20,pitch:70,roll:12,h:10,leg:{R:W3(-.06,.11,.17),L:B('s',-.15,-.80,-.12)}}}],
 [5.55,{tori:{yaw:235,pitch:4,arm:{R:B('s',.34,.36,-.02)},leg:{L:W3(.12,.22,.10)},pole:{legL:[.8,-.2,-.3]}},
       uke:{x:.40,y:.84,z:.52,yaw:-19,pitch:95,roll:28,h:12,leg:{R:B('s',-.12,-.80,.12),L:B('s',-.14,-.80,-.12)},
        arm:{R:B('s',.25,.55,-.20)},pole:{armR:[0,.4,1]}}}],
 [5.75,{tori:{yaw:250,pitch:10,leg:{L:W3(.42,.16,-.06)}},
       uke:{x:.62,y:.88,z:.70,yaw:10,pitch:123,roll:58,h:18,leg:{R:B('s',0,-.85,.12),L:B('s',-.05,-.84,-.12)},
        arm:{R:B('s',.25,.55,-.20)}}}],
 [5.95,{tori:{x:.37,y:.80,z:-.10,yaw:262,pitch:16,leg:{L:W3(.50,.07,-.12)}},
       uke:{x:.82,y:.86,z:.78,yaw:41,pitch:145,roll:70,h:20,leg:{R:B('s',.05,-.85,.12),L:B('s',0,-.84,-.12)},
        arm:{R:B('s',.25,.55,-.20),L:SL('armR',.3)},pole:{armR:[0,.4,1]}}}],
 /* Tori ajeita o pé direito para ficar de frente para Uke */
 [6.1,{tori:{yaw:278,pitch:22,leg:{R:W3(.32,.15,-.12)}},
       uke:{x:.98,y:.76,z:.72,yaw:74,pitch:155,roll:72,h:20,leg:{R:B('s',.08,-.85,.12),L:B('s',.04,-.84,-.12)}}}],
 [6.18,{uke:{x:1.04,y:.66,z:.64,yaw:63,pitch:176,roll:80}}],
 [6.25,{tori:{pitch:26},
       uke:{x:1.08,y:.54,z:.56,yaw:9,pitch:246,roll:57,h:20,leg:{R:B('s',.10,-.84,.12),L:B('s',.06,-.84,-.12)},
        arm:{R:B('o',.42,.30,-.20),L:B('s',.10,.15,-.50)},pole:{armR:[.6,.6,.6]}}}],
 /* o lado direito das costas toca primeiro e Uke rola para as costas */
 [6.42,{tori:{x:.33,z:-.04,yaw:298,pitch:32,leg:{R:W3(.16,.07,.12)}},
       uke:{x:1.10,y:.30,z:.36,yaw:12,pitch:266,roll:14,h:15}}],
 /* queda: de costas, cabeça junto aos pés de Tori, pernas para longe dele */
 [6.6,{tori:{x:.30,y:.80,z:.0,yaw:310,pitch:42,h:12,arm:{R:B('s',.30,.10,.12)},pole:{armR:[-.3,-.6,.6]}},
       uke:{x:1.08,y:.14,z:.20,yaw:16,pitch:270,roll:0,h:10,gf:1,
        leg:{R:W3(1.92,.07,.06),L:W3(1.86,.07,-.14)},
        arm:{R:W3(.66,.66,.30),L:W3(.68,.05,-.16)},pole:{legR:[1,0,.1],legL:[1,0,-.1]}}}],
 [8.0,{tori:{y:.79,pitch:44,h:15},uke:{h:18}}],
 [10.5,{}]],
 aperto:[{s:4.0,e:5.8,limbs:['T.L.leg'],tol:.10,tudo:true},
  /* a canela de Uke apoia na sola que bloqueia: o tornozelo encosta, o joelho não vira */
  {s:4.0,e:5.8,limbs:['U.R.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0]+.12,Math.max(F.tori.head[1],F.tori.hip[1])+.22,F.tori.head[2]],
  uke:[F.uke.hip[0]-.15,Math.max(F.uke.head[1],F.uke.hip[1])+.22,F.uke.hip[2]]}),
 glow:{s:3.9,e:5.6,limbs:{'T.L.leg':'force'}},
 stamp:{s:6.7,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.4);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.3,3.1);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.30,.16,.12]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.30,.16,.12]),1,-2.6,C.force,a,false);
   api.tag('Tori recua o pé direito',T.legR.H,6,.5,C.gold,a);
   api.tag('Uke avança o pé direito',U.legR.H,-6,1.5,C.uke,a);}
  a=win(t,4.0,5.3);
  api.tag('sola na frente do tornozelo',T.legL.H,-5,2,C.force,a);
  api.tag('perna reta',T.legL.E,6,-1,C.force,a);
  a=win(t,5.0,6.5);
  if(a>0){api.arc(api.add(T.hip,[0,.55,0]),[1,0,0],[0,0,1],.45,40,250,C.force,a);
   api.tag('mãos giram como um volante',api.add(T.hip,[0,.85,0]),0,0,C.force,a,false);}
  a=win(t,6.8,9.5);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-4,3.4,C.uke,a);}
});})();
