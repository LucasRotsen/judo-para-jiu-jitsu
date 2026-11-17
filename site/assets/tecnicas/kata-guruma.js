(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z, esquerda = +z) e não gira: entra de frente.
   Tori recua puxando a manga direita de Uke para cima, abaixa o quadril com o pé direito entre os pés dele,
   põe a cabeça por baixo da axila direita de Uke (do lado +z) e passa o braço direito entre as pernas,
   segurando a coxa direita. Ao levantar, Uke fica atravessado nos ombros de Tori, de barriga para baixo
   sobre a nuca dele: cabeça à esquerda de Tori (+z), pernas à direita (-z), lado direito para a frente de Tori.
   Na queda Uke escorrega pelo ombro esquerdo, desce de lado, quase na horizontal, ao lado esquerdo de Tori
   (rola em volta da própria coluna, nunca de ponta-cabeça), as pernas passam em arco por cima e ele cai de costas à frente e à esquerda de Tori,
   com a cabeça junto ao pé esquerdo dele. Tori termina de pé, curvado, segurando a manga.
   Poses conferidas com o vídeo da Kodokan 肩車 / Kata-guruma. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.20,.26,.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.7)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
const manga=SL('armR',.72);           // mão esquerda de Tori na manga direita de Uke
const coxa=B('o',-.08,-.30,.17);      // mão direita de Tori por cima da coxa direita de Uke (o braço vem por entre as pernas)
const pernasU={R:B('s',.25,-.78,.30),L:B('s',.25,-.78,-.34)};   // pernas de Uke atravessadas, uma de cada lado do braço de Tori
Judo.register3d({
 id:'kata-guruma', name:'Kata Guruma', kanji:'肩車',
 cls:'Nage-waza · Te-waza', group:'nage',
 bjj:'Kata guruma, a carregada nos ombros',
 why:'É a queda de carregar o oponente nos ombros. No jiu-jitsu, onde agarrar a perna é permitido, ela entra direto da pegada de manga, e a mesma mecânica aparece nas variações feitas de joelhos.',
 summary:'Roda de ombros. Tori puxa a manga direita de Uke para cima, abaixa o quadril entre as pernas dele, põe a cabeça por baixo da axila direita e passa o braço direito entre as pernas, segurando a coxa. Ao estender as pernas, carrega Uke atravessado nos ombros e o deixa cair pela frente, à sua esquerda, sem soltar a manga.',
 reading:[{k:'肩',r:'kata',m:'ombro'},{k:'車',r:'guruma',m:'roda'}],
 facts:[['Grupo','Nage-waza (projeções) › Te-waza (técnicas de mão)'],['Gokyo','3º grupo (Dai-sankyo)'],
  ['Nage-no-kata','É a terceira técnica do grupo de mão (te-waza) do Nage-no-kata.'],
  ['Direção do kuzushi','Para frente e para a direita de Uke, puxando a manga para cima'],
  ['Competição de judô','Desde 2013 as regras da IJF punem agarrar a perna diretamente. A forma clássica, com a mão na coxa, ficou para o kata e para o treino.'],
  ['No jiu-jitsu','A pegada na perna é permitida. A queda entra da pegada de manga e gola e Uke cai de costas ao lado de Tori, que já está em pé e com a manga presa para passar por cima.']],
 errors:[['Quadril alto','Se Tori só se curva sem dobrar os joelhos, os ombros não chegam embaixo do centro de Uke e as costas fazem a força que era das pernas.'],
  ['Cabeça do lado errado','A cabeça de Tori vai por baixo da axila direita de Uke, do lado da manga puxada. Do outro lado, Uke não deita nos ombros.'],
  ['Soltar a manga','A mão esquerda puxa a manga do começo ao fim. É ela que deita Uke nos ombros e que guia a queda.'],
  ['Levantar com as costas','Quem levanta são as pernas, com o tronco quase reto. Curvado, Tori carrega o peso na lombar e perde o equilíbrio.']],
 safety:['Pratique com orientação de um professor, em tatame, e com um parceiro que domina o ukemi.',
  'Tori deixa Uke descer pela frente, perto dos próprios pés, e não o arremessa do alto.',
  'A manga fica presa até Uke tocar o tatame: assim ele cai de costas, com o queixo no peito, e nunca de cabeça.'],
 phases:[
 {s:0,e:1.0,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita. Os dois em postura natural.',
  l:['Hikite na manga direita, perto do cotovelo.','Tsurite na gola esquerda.','Joelhos destravados.']},
 {s:1.0,e:2.6,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori recua um passo com o pé esquerdo e puxa a manga para frente e para cima. Uke avança o pé direito e o peso vai para a frente e para a direita dele.',
  l:['A manga sobe: o braço direito de Uke fica alto, abrindo a axila.','Uke avança o pé direito, os pés dele se abrem.','Tori solta a gola e prepara a entrada.']},
 {s:2.6,e:4.6,kanji:'作り',ro:'Tsukuri',pt:'Entrada por baixo',
  d:'Tori dobra bem os joelhos e põe o pé direito entre os pés de Uke. A cabeça entra por baixo da axila direita de Uke e o braço direito passa entre as pernas dele, segurando a coxa direita por dentro. Uke tomba para frente e deita sobre os ombros de Tori.',
  l:['Quadril de Tori bem abaixo da faixa de Uke.','Cabeça por baixo da axila direita, do lado da manga.','Braço direito entre as pernas, mão na coxa direita.']},
 {s:4.6,e:6.6,kanji:'掛け',ro:'Kake',pt:'Carregar e deixar cair',
  d:'Tori estende as pernas e levanta Uke atravessado nos ombros, com a barriga dele sobre a nuca. Puxando a manga para baixo e inclinando o ombro esquerdo, deixa Uke escorregar pela frente, à esquerda. As pernas de Uke passam por cima e ele cai de costas ao lado do pé esquerdo de Tori.',
  l:['As pernas levantam, não as costas.','Uke deitado de lado nos ombros: cabeça à esquerda, pernas à direita.','A manga puxa para baixo e guia a queda pela frente.']},
 {s:6.6,e:10.0,kanji:'残心',ro:'Zanshin',pt:'Controle da queda',
  d:'Uke cai de costas, com o queixo no peito, à frente e à esquerda de Tori. Tori termina em pé, curvado sobre ele, ainda segurando a manga.',
  l:['Manga segura até o fim.','Uke cai de costas, não de cabeça.','Tori equilibrado, pés afastados, pronto para seguir.']}],
 rep:[.5,2.2,4.1,5.6,6.25,8], cover:5.6,
 views:[
  {name:'Diagonal à frente de Tori',a:-40,e:14,center:[-.35,.85,.35],span:4.0},
  {name:'Lado direito de Tori',a:160,e:12,center:[-.25,.85,.25],span:3.9},
  {name:'De cima',a:-90,e:88,center:[-.60,0,.40],span:4.0}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.0,{}],
 /* kuzushi: Tori recua o pé esquerdo puxando a manga; Uke avança o pé direito */
 [1.7,{tori:{x:.38,leg:{L:W3(.56,.07,.16)},pitch:6},uke:{pitch:8}}],
 [2.3,{tori:{x:.42,y:.90,pitch:10,leg:{R:W3(.34,.07,-.14)},arm:{R:B('s',.32,.12,.20)},pole:{armR:[-.2,-1,.4]}},
       uke:{x:-.24,pitch:12,h:6,leg:{R:W3(-.08,.07,.22)},arm:{R:B('o',.10,.72,-.28),L:B('o',.18,.30,.22)},pole:{armR:[.2,-.4,1]}}}],
 [2.6,{uke:{leg:{L:W3(-.42,.07,-.20)}}}],
 /* tsukuri: Tori afunda o quadril; pé direito entre os pés de Uke, cabeça por baixo da axila direita */
 [3.1,{tori:{x:.38,y:.66,z:.16,pitch:32,h:10,leg:{R:W3(.02,.10,-.02)},arm:{R:B('o',.12,-.05,.02)},pole:{armR:[.4,-1,.3]}},
       uke:{pitch:14,arm:{R:B('o',.05,.62,-.32)}}}],
 [3.6,{tori:{x:.32,y:.54,z:.28,pitch:50,h:15,leg:{R:W3(-.16,.07,-.02),L:W3(.62,.07,.46)},
        arm:{R:B('o',-.10,-.24,.14)},pole:{armR:[.5,-1,.2],legR:[1,-.1,.1],legL:[1,-.1,-.3]}},
       uke:{x:-.22,y:.93,pitch:24,yaw:-15,h:10,arm:{R:B('o',.15,.45,-.32),L:B('o',-.15,.25,.02)},pole:{armR:[.2,.6,1],armL:[-.2,-.6,-.6]}}}],
 [4.1,{tori:{x:.30,y:.54,z:.28,h:20},
       uke:{x:-.16,y:.92,pitch:55,yaw:-45,h:15,leg:{R:W3(-.12,.10,.20),L:W3(-.38,.10,-.18)}}}],
 /* Uke deita sobre os ombros; os pés saem do chão */
 [4.6,{tori:{x:.24,y:.60,z:.25,pitch:45,arm:{R:coxa},pole:{armR:[-.3,-.4,1]}},
       uke:{x:-.05,y:1.15,z:0,pitch:80,yaw:-75,h:15,gf:0,leg:pernasU,arm:{L:B('o',-.18,.30,.02)}}}],
 /* kake: Tori estende as pernas; Uke atravessado nos ombros, barriga sobre a nuca */
 [5.2,{tori:{x:.14,y:.78,z:.22,pitch:30,h:30,leg:{L:W3(.30,.07,.50)},pole:{armR:[-.5,0,1]}},
       uke:{x:.04,y:1.44,z:.04,pitch:95,yaw:-88,h:15,arm:{R:B('o',.30,.32,-.22)}}}],
 [5.6,{tori:{x:.08,y:.86,z:.20,pitch:22,h:35,leg:{L:W3(.10,.07,.52)}},
       uke:{x:.06,y:1.56,z:.05,pitch:100,yaw:-90,h:15}}],
 [5.75,{}],
 /* Queda de lado, como uma roda deitada: o corpo de Uke fica quase horizontal (pitch ~100, que com yaw -90 é
    deitado), o yaw leva a cabeça de +z para junto do pé esquerdo de Tori e o roll gira Uke em volta da própria
    coluna, de barriga para baixo (roll 0) a de costas (roll 180), passando de lado com a barriga virada para Tori.
    Nada de ponta-cabeça: a cabeça nunca fica abaixo dos ombros; a manga segura o tronco no alto. */
 [5.95,{tori:{y:.85,pitch:28,yaw:186,roll:-6,h:42,arm:{R:B('s',.32,.22,.26)},pole:{armR:[-.3,-.8,.6]}},
       uke:{x:-.04,y:1.68,z:.36,pitch:100,yaw:-80,roll:25,h:25,arm:{R:B('o',.32,.18,-.25)},pole:{armR:[0,-1,.5]},leg:{R:B('s',-.02,-.80,.28),L:B('s',-.02,-.80,-.30)}}}],
 /* as pernas sobem um pouco para passar por cima da cabeça de Tori (corpo ~15° da horizontal) */
 [6.05,{uke:{x:-.15,y:1.66,z:.56,pitch:115,yaw:-66,roll:50,h:30}}],
 /* Uke escorrega pelo ombro esquerdo, deitado de lado, barriga para Tori; as pernas passam em arco à frente */
 [6.15,{tori:{y:.84,pitch:32,yaw:192,roll:-4,h:38,arm:{R:B('s',.35,.05,.22)}},
       uke:{x:-.28,y:1.30,z:.74,pitch:102,yaw:-50,roll:80,h:30,leg:{R:B('s',-.08,-.80,.24),L:B('s',-.08,-.80,-.28)}}}],
 [6.35,{tori:{pitch:38,yaw:197,roll:0},
       uke:{x:-.58,y:.78,z:.86,pitch:98,yaw:-15,roll:140,h:32,arm:{R:B('o',.38,.05,-.25)}}}],
 /* costas e ombro chegam ao tatame com o quadril; queixo no peito */
 [6.55,{uke:{x:-.82,y:.28,z:.82,pitch:96,yaw:8,roll:172,h:30}}],
 [6.65,{tori:{x:.10,y:.82,z:.22,pitch:42,yaw:200,h:20,arm:{R:B('s',.30,-.28,.16)}},
       uke:{x:-.86,y:.17,z:.80,pitch:95,yaw:15,roll:180,h:30,gf:1,leg:{R:W3(-1.62,.07,.86),L:W3(-1.58,.07,1.12)},
        arm:{R:B('o',.40,.0,-.22),L:W3(-.80,.05,1.30)},pole:{legR:[0,1,0],legL:[0,1,0]}}}],
 [6.85,{uke:{y:.14,pitch:94,h:28}}],
 [7.6,{tori:{pitch:38,h:25},uke:{h:25}}],
 [10.0,{}]],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.uke.hip[1])+.32,F.tori.head[2]-.3],uke:[F.uke.hip[0]-.2,Math.max(F.uke.head[1],F.uke.hip[1])+.40,F.uke.hip[2]+.2]}),
 glow:{s:3.0,e:5.6,limbs:{'T.R.arm':'force','T.L.arm':'force'}},
 stamp:{s:6.65,e:9.0,big:'一本',small:'IPPON'},
 aperto:[{s:3.3,e:6.1,limbs:['T.R.arm'],tol:.10,tudo:true},{s:2.3,e:10,limbs:['T.L.arm','U.R.arm'],tol:.10,tudo:true}],
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.2);
  api.tag('hikite: manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.2,2.9);
  api.tag('manga para cima: a axila abre',T.armL.H,5,-4,C.force,a);
  api.tag('Uke avança o pé direito',U.legR.H,-6,2,C.uke,a);
  a=win(t,3.0,4.7);
  api.tag('cabeça por baixo da axila direita',T.head,6,-4,C.force,a);
  api.tag('braço entre as pernas, na coxa',T.armR.H,-7,2.5,C.force,a);
  api.tag('quadril abaixo da faixa de Uke',T.hip,6,3,C.gold,a);
  a=win(t,4.8,5.9);
  if(a>0){api.arrow([T.hip[0]-.35,.25,T.hip[2]-.3],[T.hip[0]-.35,.65,T.hip[2]-.3],C.force,a);
   api.tag('pernas estendem',[T.hip[0]-.35,.45,T.hip[2]-.3],-6,0,C.force,a,false);
   api.tag('barriga de Uke sobre a nuca',U.hip,5,-3.5,C.uke,a);}
  a=win(t,5.8,6.6);
  api.tag('manga puxa para baixo',T.armL.H,6,-1,C.force,a);
  a=win(t,6.7,9.5);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-4,3.4,C.uke,a);}
});})();
