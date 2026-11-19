(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z). Pegada direita: mão esquerda de Tori na manga direita
   de Uke, mão direita na gola esquerda. Tori pisa com o pé esquerdo por fora do pé direito de Uke (+z), gira para a
   direita (yaw decrescente) até ficar de frente para o flanco direito de Uke (yaw ~85), passa para trás dele e senta
   no quadril esquerdo, com a perna esquerda estendida no chão por trás dos dois calcanhares de Uke. Ao deitar sobre o
   lado esquerdo, o tronco de Tori vai para -x. Uke cai de costas para trás (-x), por cima da perna, queixo no peito,
   pernas para o alto, e termina deitado ao lado de Tori, os dois com a cabeça para o mesmo lado.
   Conferido com o vídeo da Kodokan 谷落 / Tani-otoshi (3b9Me3Fohpk). */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.15),L:W3(-.38,.07,-.15)},
 arm:{R:B('o',.14,.38,-.08),L:B('o',.22,.24,.24)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.14),L:W3(.38,.07,.14)},
 arm:{R:B('o',.14,.40,-.08),L:SL('armR',.35)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
Judo.register3d({
 id:'tani-otoshi', name:'Tani Otoshi', kanji:'谷落',
 cls:'Nage-waza · Yoko-sutemi-waza', group:'nage',
 bjj:'Sacrifício lateral com a perna atrás dos calcanhares',
 why:'Serve quando Tori está ao lado ou atrás do oponente, uma posição comum na luta em pé do jiu-jitsu. Tori senta, bloqueia os calcanhares com a perna e leva Uke de costas para o chão, terminando colado nele.',
 summary:'Projeção de sacrifício para o lado. Tori passa para o lado direito de Uke e para trás dele, senta no quadril esquerdo e estende a perna esquerda no chão por trás dos dois calcanhares de Uke. Ao deitar de lado, puxando a manga para baixo e empurrando a gola para trás, Uke tropeça na perna e cai de costas ao lado de Tori.',
 reading:[{k:'谷',r:'tani',m:'vale'},{k:'落',r:'otoshi',m:'derrubar, deixar cair'}],
 facts:[['Grupo','Nage-waza › Sutemi-waza › Yoko-sutemi-waza (sacrifício de lado)'],
  ['Gokyo','4º grupo (Dai-yonkyo)'],
  ['Direção do kuzushi','Para trás, sobre os calcanhares de Uke'],
  ['A perna','Desliza rente ao tatame e fica estendida atrás dos dois calcanhares. Ela não varre: é um obstáculo, e quem derruba é o peso de Tori caindo de lado.'],
  ['No jiu-jitsu','Funciona quando o oponente fica ereto ou quando Tori consegue chegar ao lado dele. Os dois caem juntos e Tori já está ao lado de Uke, perto de passar para os 100 quilos ou para a montada.']],
 errors:[['Sentar longe','Se o quadril cai longe de Uke, a perna não alcança os calcanhares e Tori só senta sozinho no chão.'],
  ['Perna no lugar errado','A perna precisa passar por trás dos DOIS calcanhares. Atrás de um só, Uke dá um passo para trás e recupera.'],
  ['Uke inclinado para frente','Com o peso de Uke na ponta dos pés não há o que derrubar para trás. A técnica precisa de Uke ereto ou recuando.'],
  ['Soltar a manga','Sem a manga, Uke cai sem controle e Tori perde a chance de seguir no chão.']],
 safety:['Uke precisa dominar a queda para trás (ushiro ukemi): queixo no peito e braço batendo no tatame.',
  'Tori não cai com o peso sobre as pernas ou o joelho de Uke: o corpo de Tori vai para o lado, ao lado de Uke.',
  'Comece devagar, só sentando e encaixando a perna, com Uke sentando junto.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.peL',b:'U.peL',s:3.4,e:4.6,frac:.6,txt:'a perna esquerda de Tori fica estendida por trás dos calcanhares de Uke'},
  {c:'lado',a:'T.quadril',de:'U.quadril',lado:'tras',s:3.8,e:4.6,min:.1,txt:'Tori passa para trás de Uke antes de sentar'},
  {c:'lado',a:'U.cabeca',de:'T.quadril',lado:'acima',s:6.5,e:'fim',min:.5,txt:'no fim os dois ficam deitados com a cabeça para o mesmo lado'}],
 phases:[
 {s:0,e:1.2,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada direita: Tori segura a manga direita de Uke com a mão esquerda e a gola esquerda com a mão direita. Os dois em postura natural.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola.','Uke ereto, com o peso nos calcanhares, é a deixa para a técnica.']},
 {s:1.2,e:3.0,kanji:'崩し',ro:'Kuzushi',pt:'Passo para o lado',
  d:'Tori pisa com o pé esquerdo por fora do pé direito de Uke e gira para a direita, chegando ao lado direito dele. A mão direita empurra a gola para trás e a esquerda puxa a manga para baixo, levando o peso de Uke para os calcanhares.',
  l:['O pé esquerdo passa por fora do pé direito de Uke.','Tori fica de frente para o lado direito de Uke.','O peso de Uke vai para os calcanhares.']},
 {s:3.0,e:4.4,kanji:'作り',ro:'Tsukuri',pt:'Sentar com a perna atrás',
  d:'Tori desce o quadril, passa para trás do lado direito de Uke e senta no quadril esquerdo. A perna esquerda desliza rente ao tatame e fica estendida por trás dos dois calcanhares de Uke.',
  l:['O quadril cai junto de Uke, atrás do pé direito dele.','A perna esquerda estendida atrás dos dois calcanhares.','As mãos mantêm Uke ereto, sem deixar ele se curvar.']},
 {s:4.4,e:6.0,kanji:'掛け',ro:'Kake',pt:'Deitar de lado e derrubar',
  d:'Tori deita sobre o lado esquerdo, puxando a manga para baixo e empurrando a gola para trás. Os calcanhares de Uke batem na perna de Tori e ele cai de costas por cima dela, com o queixo no peito e as pernas subindo.',
  l:['O peso de Tori caindo de lado é o que derruba.','A perna não varre, só bloqueia os calcanhares.','Uke cai para trás, sem cambalhota.']},
 {s:6.0,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Queda e controle',
  d:'Uke cai de costas ao lado de Tori e bate o braço esquerdo no tatame. Tori termina deitado de lado, colado em Uke, segurando a manga.',
  l:['Uke cai de costas com o queixo no peito.','A manga segura até o fim.','Os dois terminam deitados lado a lado, cabeça para o mesmo lado.']}],
 rep:[.6,2.4,4.0,5.2,7.5], cover:5.2,
 views:[
  {name:'Lado esquerdo de Uke',a:200,e:14,center:[-.40,.82,.2],span:3.9},
  {name:'Por trás de Uke',a:-110,e:20,center:[-.40,.85,.2],span:3.9},
  {name:'De cima',a:0,e:88,center:[-.5,0,.15],span:3.2}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* kuzushi: o pé esquerdo de Tori pisa por fora do pé direito de Uke; Tori começa a girar para a direita */
 [2.0,{tori:{x:.08,z:.22,yaw:160,pitch:4,leg:{L:W3(-.10,.07,.46)}},
       uke:{pitch:-2,h:4}}],
 [2.8,{tori:{x:-.16,y:.88,z:.44,yaw:118,pitch:6,leg:{R:W3(.08,.07,.62)},pole:{legR:[1,-.2,.3]}},
       uke:{x:-.33,y:.92,pitch:-8,h:8}}],
 [3.0,{}],
 /* tsukuri: Tori desce e passa para trás do lado direito de Uke; a perna esquerda desliza para trás dos calcanhares */
 [3.6,{tori:{x:-.42,y:.62,z:.48,yaw:96,pitch:8,h:6,leg:{L:W3(-.52,.10,.18),R:W3(-.08,.07,.66)},
        pole:{legL:[1,.1,-.3],legR:[1,.4,.3]}},
       uke:{x:-.34,y:.92,pitch:-12,h:12,arm:{L:B('s',.32,.22,-.40)},pole:{armL:[0,-.6,-1]}}}],
 [4.2,{tori:{x:-.58,y:.30,z:.46,yaw:86,pitch:-4,roll:-8,h:10,leg:{L:W3(-.48,.07,-.30)},
        pole:{legL:[1,.4,-.2],legR:[1,.6,.4]}},
       uke:{x:-.37,y:.91,pitch:-16,h:16}}],
 /* kake: Tori deita sobre o lado esquerdo e leva Uke junto; Uke tropeça na perna e cai de costas por cima dela */
 [4.6,{tori:{x:-.62,y:.22,z:.46,yaw:85,pitch:-12,roll:-32,h:14},
       uke:{x:-.55,y:.85,pitch:-24,h:22}}],
 [4.95,{tori:{x:-.67,y:.17,z:.46,yaw:83,pitch:-15,roll:-55,h:16},
       uke:{x:-.80,y:.70,z:-.03,pitch:-44,h:28,gf:0,leg:{R:W3(-.30,.10,.15),L:W3(-.40,.12,-.16)},
        pole:{armL:[0,-.5,-1]},arm:{L:B('s',.25,.30,-.40)}}}],
 [5.25,{tori:{x:-.70,y:.15,z:.45,yaw:82,pitch:-14,roll:-68,h:14},
       uke:{x:-.98,y:.45,z:-.05,pitch:-66,h:32,leg:{R:W3(-.24,.40,.14),L:W3(-.30,.52,-.16)},
        pole:{legR:[1,.2,.1],legL:[1,.2,-.1]}}}],
 [5.5,{uke:{x:-1.05,y:.20,z:-.07,pitch:-84,h:32,leg:{R:B('s',.62,-.40,.12),L:B('s',.70,-.32,-.12)}}}],
 /* queda: de costas, ao lado de Tori, pernas no alto */
 [5.8,{tori:{y:.14,yaw:80,roll:-84,pitch:-8,h:6},
       uke:{x:-1.06,y:.13,z:-.08,pitch:-90,h:30,leg:{R:B('s',.74,-.25,.12),L:B('s',.78,-.17,-.12)},
        arm:{L:W3(-.90,.25,-.62)}}}],
 [6.05,{uke:{arm:{L:W3(-.95,.05,-.72)}}}],
 [6.4,{}],
 /* as pernas de Uke descem por cima da perna de Tori */
 [7.4,{uke:{h:22,leg:{R:W3(-.30,.07,-.02),L:W3(-.34,.07,-.28)},pole:{legR:[1,0,.1],legL:[1,0,-.1]}}}],
 [10.5,{}]],
 /* a perna esquerda de Tori encosta de propósito atrás dos calcanhares; as pegadas seguram a roupa */
 aperto:[{s:3.8,e:5.5,limbs:['T.L.leg'],tol:.10,tudo:true},
  {s:0,e:10.5,limbs:['T.R.arm','T.L.arm','U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.30,F.tori.head[2]+.1],
  uke:[F.uke.hip[0],Math.max(F.uke.head[1],F.uke.hip[1])+.34,F.uke.hip[2]-.1]}),
 glow:{s:3.4,e:5.5,limbs:{'T.L.leg':'force'}},
 stamp:{s:6.0,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('manga',T.armL.H,5,-3,C.force,a);
  api.tag('gola',T.armR.H,-4,-4.5,C.force,a);
  api.tag('pé esquerdo por fora do pé de Uke',T.legL.H,4,3,C.force,win(t,1.7,3.0));
  a=win(t,2.4,3.4);
  if(a>0){const c=api.bp(U,.05,.45,0);api.arrow(c,api.add(c,[-.30,-.04,0]),C.force,a);
   api.tag('peso para os calcanhares',api.add(c,[-.30,-.04,0]),-3,-2.4,C.force,a,false);}
  a=win(t,3.6,5.0);
  api.tag('perna atrás dos dois calcanhares',T.legL.H,-8,1,C.force,a);
  api.tag('senta junto de Uke',T.hip,5,3,C.force,win(t,3.9,4.7));
  a=win(t,4.7,5.9);
  api.tag('queixo no peito',U.head,-5,-2,C.uke,a);
  a=win(t,6.1,99);
  api.tag('Uke cai de costas ao lado de Tori',U.hip,-5,4,C.uke,a);
  api.tag('manga segura',T.armL.H,6,-3,C.force,a);}
});})();
