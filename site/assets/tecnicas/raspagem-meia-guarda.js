(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori começa de costas, cabeça para -x, direita = +z (esquerda = -z).
   Uke por cima de barriga para baixo, de frente para -x (yaw 180): direita de Uke = -z, o lado esquerdo de Tori.
   Meia-guarda: as pernas de Tori prendem a perna DIREITA de Uke. O braço ESQUERDO de Tori faz a esgrima por baixo
   do braço direito de Uke. Tori vira sobre o lado esquerdo, de frente para -z, e sai de lado até ficar de joelhos
   embaixo do quadril de Uke, de frente para -z (yaw 90: direita de Tori = +x, para os pés de Uke).
   A mão DIREITA (a de fora) pega o calcanhar direito de Uke. Tori empurra com o ombro para -z, o lado da perna presa:
   Uke não tem o pé para apoiar, cai sobre o lado direito e fica de costas (cabeça para -x, direita = +z).
   Tori sobe por cima pelo lado direito de Uke. */
const esgrima=B('o',-.06,.28,.24), calcanhar=SL('legR',.92);
const ukeBase={x:.12,y:.36,z:.06,yaw:180,pitch:78,roll:0,h:5,gf:0,
 leg:{R:W3(.80,.08,-.12),L:W3(.62,.07,.58)},
 arm:{R:W3(-.62,.07,-.42),L:W3(-.48,.07,.42)},
 pole:{legR:[1,-.3,0],legL:[.7,0,-.7],armR:[-.3,0,1],armL:[-.3,0,-1]}};
const toriBase={x:0,y:.14,z:0,yaw:0,pitch:-90,roll:0,h:25,gf:0,
 leg:{R:W3(.58,.08,-.22),L:W3(.64,.22,-.04)},
 arm:{R:B('o',.04,.0,-.14),L:esgrima},
 pole:{legR:[1,0,.4],legL:[1,0,-.6],armR:[.3,-.3,1],armL:[.3,-.2,-1]}};
Judo.register3d({
 id:'raspagem-meia-guarda', name:'Raspagem da meia-guarda (velha escola)', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Old school sweep',
 why:'Para quem puxa para a guarda e cai na meia-guarda sem saber o que fazer: em vez de ficar de costas esperando a passagem, Tori vira de lado, sai por baixo de Uke e usa a perna que já está presa para derrubá-lo.',
 summary:'Raspagem da meia-guarda por baixo. Tori prende uma perna de Uke entre as pernas, pega a esgrima por baixo do braço do mesmo lado, vira de lado e sai até ficar de joelhos embaixo do quadril de Uke. A mão de fora segura o calcanhar da perna presa e o ombro empurra para esse lado: Uke não tem o pé para apoiar, cai de lado e de costas, e Tori sobe por cima.',
 reading:[{k:'Velha escola',r:'old school sweep',m:'a raspagem clássica da meia-guarda, ensinada há décadas'},{k:'Esgrima',r:'underhook',m:'o braço por baixo da axila de Uke'}],
 facts:[['Origem','Jiu-jitsu. Não tem nome próprio no Kodokan; é a raspagem básica da meia-guarda por baixo.'],
  ['Para que lado ele cai','Para o lado da perna presa. Aqui é a perna direita de Uke: ele cai para a direita dele, onde não tem o pé para apoiar.'],
  ['De que lado a esgrima','Do lado da perna presa. As pernas de Tori prendem a direita de Uke e o braço esquerdo de Tori passa por baixo do braço direito dele.'],
  ['Pontuação','Raspagem vale 2 pontos.'],
  ['Quando usar','Quando Uke amassa a meia-guarda e Tori está ficando de costas. Virar de lado e pegar a esgrima é o primeiro passo de quase tudo que sai da meia-guarda por baixo.']],
 errors:[['Ficar de costas','De costas, Uke esmaga o peito de Tori com o ombro e passa. A primeira coisa é virar de lado, de frente para a perna presa.'],
  ['Sem a esgrima','Sem o braço por baixo da axila, Uke deita o peso, prende a cabeça e Tori não consegue sair por baixo.'],
  ['Cabeça para fora errada','A cabeça sai do lado da perna presa, junto ao quadril de Uke. Se sair do outro lado, Tori empurra para onde Uke tem base.'],
  ['Soltar o calcanhar','Com o pé livre, Uke apoia no tatame e a raspagem para. A mão de fora segura o calcanhar ou a calça até ele cair.'],
  ['Empurrar de longe','Tori tem que estar de joelhos embaixo do quadril de Uke, não deitado. Quem empurra é o ombro, com as pernas.']],
 safety:['Treine devagar: quem é raspado cai de lado e de costas, sem tentar apoiar a mão aberta no tatame.',
  'Segure o calcanhar ou a calça; não torça o pé do parceiro.',
  'Ao subir por cima, desça o peso aos poucos sobre o parceiro.'],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Meia-guarda',pt:'Perna presa e esgrima',
  d:'Tori está de costas com as pernas prendendo a perna direita de Uke, que está por cima. O braço esquerdo de Tori passa por baixo do braço direito de Uke (esgrima) e a mão vai às costas dele. A mão direita apoia no quadril esquerdo de Uke.',
  l:['As pernas prendem uma perna só: a direita de Uke.','Esgrima do mesmo lado da perna presa.','Tori ainda está de costas: é aqui que muita gente para.']},
 {s:1.8,e:3.6,kanji:'2',ro:'De lado',pt:'Virar de frente para a perna presa',
  d:'Tori vira sobre o lado esquerdo, de frente para a perna presa, e aprofunda a esgrima puxando Uke para cima de si. A cabeça entra embaixo da axila direita de Uke.',
  l:['De lado, nunca de costas.','A esgrima puxa o peso de Uke para cima de Tori.','Cabeça baixa, embaixo da axila.']},
 {s:3.6,e:5.6,kanji:'3',ro:'Sair por baixo',pt:'Joelhos sob o quadril, mão no calcanhar',
  d:'Tori solta as pernas, desliza para baixo e sai de lado até ficar de joelhos embaixo do quadril de Uke, com a cabeça para fora do lado da perna presa. A mão direita, a de fora, agarra o calcanhar direito de Uke.',
  l:['Cabeça para fora do lado da perna presa.','Joelhos embaixo do quadril de Uke.','A mão de fora segura o calcanhar ou a calça.']},
 {s:5.6,e:7.6,kanji:'4',ro:'Raspagem',pt:'Ombro empurra, Uke cai de lado',
  d:'Tori puxa o calcanhar e empurra com o ombro para o lado da perna presa. Sem o pé direito para apoiar, Uke tomba sobre o lado direito e fica de costas.',
  l:['O ombro empurra para o lado da perna presa.','A mão não solta o calcanhar.','Uke cai de lado e de costas, sem rolar por cima.']},
 {s:7.6,e:10.6,kanji:'5',ro:'Por cima',pt:'Subir e estabilizar',
  d:'Tori acompanha a queda, sobe pelo lado direito de Uke e põe o peito sobre o tronco dele, joelhos colados ao corpo. Saiu de baixo e terminou por cima.',
  l:['Seguir Uke na queda, sem dar espaço.','Peito pesado, joelhos colados.','Raspou: 2 pontos.']}],
 rep:[.9,2.8,4.8,6.6,9.2], cover:5.2,
 views:[
  {name:'Lado da queda',a:-130,e:22,center:[.22,.32,-.3],span:2.7},
  {name:'Pelos pés de Uke',a:90,e:20,center:[.1,.35,-.2],span:2.9},
  {name:'De cima',a:-90,e:88,center:[.05,0,-.2],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 /* vira sobre o lado esquerdo, de frente para -z (yaw 45, pitch -45, roll -90 é o mesmo que de lado com a cabeça para -x) */
 [2.7,{tori:{x:.13,y:.24,z:.16,arm:{R:B('o',.04,.0,-.14)},pole:{armR:[0,.3,1]},yaw:45,pitch:-45,roll:-90,h:30,
        leg:{R:W3(.56,.06,-.20),L:W3(.62,.27,-.02)},pole:{legR:[.6,.2,1],legL:[.6,-.4,1],armL:[1,.2,-.2]}},
       uke:{x:.14,y:.38,z:.04,pitch:80}}],
 [3.6,{tori:{x:.16,z:.16,leg:{R:W3(.48,.06,-.14),L:W3(.46,.27,.0)}},uke:{x:.18,y:.42,z:.02}}],
 /* solta as pernas: recolhe os joelhos e leva os pés para trás */
 [4.0,{tori:{leg:{R:W3(.36,.08,.34),L:W3(.20,.08,.40)},arm:{R:B('s',.32,-.05,.22)},pole:{legR:[1,.5,.3],legL:[1,.5,.3]}}}],
 /* desliza para baixo, a cabeça vai em direção ao quadril de Uke */
 [4.4,{tori:{x:.14,y:.20,z:.14,yaw:70,pitch:30,roll:-50,h:30,
        leg:{R:W3(.16,.06,.52),L:W3(-.04,.06,.48)},arm:{R:B('s',.30,.05,.28)},pole:{legR:[1,.4,0],legL:[1,.4,0],armL:[1,-.3,-.6]}},
       uke:{x:.28,y:.48,z:.0,pitch:82,leg:{R:W3(.74,.20,-.20),L:W3(.95,.07,.40)},pole:{legL:[1,-.3,-.3]}}}],
 /* de joelhos embaixo do quadril de Uke, cabeça para fora do lado da perna presa, mão de fora no calcanhar */
 [5.0,{tori:{x:.10,y:.34,z:.20,yaw:90,pitch:84,roll:0,h:25,
        leg:{R:W3(.22,.06,.58),L:W3(-.02,.06,.58)},arm:{R:calcanhar,L:B('o',-.14,.32,.08)},
        pole:{legR:[1,.6,0],legL:[1,.6,0],armR:[0,-.5,1],armL:[-.6,0,-1]}},
       uke:{x:.32,y:.50,z:-.02,pitch:82,leg:{R:W3(.70,.28,-.20),L:W3(.95,.07,.36)},
        arm:{R:W3(-.45,.07,-.58)},pole:{legL:[1,-.3,-.2],armR:[-.3,0,1]}}}],
 [5.6,{}],
 /* o ombro empurra para o lado da perna presa (-z) */
 [6.2,{tori:{x:.09,y:.34,z:.14,pitch:86},
       uke:{x:.32,y:.56,z:-.26,roll:50,pitch:84,h:15,leg:{R:W3(.62,.45,-.36),L:W3(.90,.10,.30)}}}],
 [6.8,{tori:{x:.07,y:.33,z:.12,pitch:88,h:25},
       uke:{x:.31,y:.40,z:-.64,roll:120,pitch:88,h:20,leg:{R:W3(.62,.45,-.55),L:W3(1.0,.32,-.32)},
        arm:{R:B('s',.25,.40,.28),L:B('s',.28,.30,-.30)}}}],
 [7.4,{tori:{x:.06,y:.40,z:.04,pitch:68,h:10},
       uke:{x:.30,y:.13,z:-.80,roll:180,pitch:90,h:15,leg:{R:W3(.70,.30,-.60),L:W3(.84,.07,-.88)},
        arm:{L:W3(-.42,.07,-1.05)},pole:{legR:[1,.2,0],legL:[1,-.1,-.3],armL:[0,-.5,-1]}}}],
 /* Tori sobe por cima pelo lado direito de Uke */
 [8.2,{tori:{x:-.02,y:.34,z:-.22,pitch:88,h:-5,leg:{R:W3(.18,.05,.18),L:W3(-.14,.05,.18)},
        arm:{R:B('o',.04,.0,-.18),L:B('o',-.05,.42,-.16)},pole:{armR:[.3,-.4,1],armL:[.3,-.4,-1]}},
       uke:{leg:{R:W3(.88,.07,-.62),L:W3(.88,.07,-.90)},arm:{R:B('o',-.10,.30,.10)},pole:{legR:[1,0,.2],legL:[1,0,-.2]}}}],
 [10.6,{}]],
 /* pernas de Tori prendem a perna de Uke; a esgrima abraça as costas; a mão de fora segura o calcanhar */
 aperto:[{s:0,e:4.2,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true},
  {s:0,e:10.6,limbs:['T.L.arm','U.R.arm'],tol:.10,tudo:true},
  {s:4.6,e:7.6,limbs:['T.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],
  uke:[F.uke.hip[0]+.15,Math.max(F.uke.head[1],F.uke.hip[1])+.25,F.uke.hip[2]]}),
 glow:{s:4.6,e:7.6,limbs:{'T.R.arm':'force','T.L.arm':'gold'}},
 stamp:{s:8.2,e:10.6,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('perna direita de Uke presa',T.legL.H,6,3.5,C.force,a);
  api.tag('esgrima',T.armL.E,-6,-3,C.gold,a);
  a=win(t,1.8,3.7);
  api.tag('de lado, de frente para a perna presa',T.head,-7,-4,C.force,a);
  a=win(t,3.6,5.7);
  api.tag('joelhos embaixo do quadril',T.hip,6,3.5,C.force,a);
  api.tag('mão de fora no calcanhar',T.armR.H,6,-3.5,C.force,win(t,4.7,5.7));
  a=win(t,5.6,7.6);
  api.arrow(T.sh,api.add(T.sh,[0,0,-.3]),C.force,win(t,5.6,6.9));
  api.tag('ombro empurra para o lado da perna presa',T.head,-7,-4,C.force,a,false);
  api.tag('sem o pé para apoiar',U.legR.H,6,3,C.info,a);
  a=win(t,8.2,10.6);
  api.tag('por cima',api.bp(T,.12,.38,0),3,-7,C.force,a);}
});})();
