(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z).
   Tori começa em +x olhando para -x (direita de Tori = -z; esquerda = +z).
   Os dois se deslocam de lado para -z (a direita de Tori, a esquerda de Uke), em passos que não cruzam os pés.
   O pé que fica para trás em Uke é o direito (+z), do mesmo lado do pé esquerdo de Tori: é ele que varre.
   Conferido com o vídeo da Kodokan (送足払 / Okuri-ashi-harai): Uke voa de costas na altura da faixa de Tori,
   os pés juntos indo para -z, e cai de costas com a cabeça junto aos pés de Tori, as pernas para longe. */
const uke0={x:-.30,y:.92,z:0,yaw:0,pitch:3,h:4,
 leg:{R:W3(-.27,.07,.14),L:W3(-.27,.07,-.14)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.18,.22,.25)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.30,y:.92,z:0,yaw:180,pitch:3,h:4,
 leg:{L:W3(.27,.07,.14),R:W3(.27,.07,-.14)},
 arm:{L:SL('armR',.4),R:B('o',.16,.40,-.09)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
Judo.register3d({
 id:'okuri-ashi-barai', name:'Okuri Ashi Barai', kanji:'送足払',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'Okuri ashi barai, a rasteira dos dois pés',
 why:'Derruba usando o próprio deslocamento do oponente, sem entrada e sem força. Ensina a conduzir o adversário de lado e a sentir o instante em que ele junta os pés.',
 summary:'Varrida dos pés que acompanham. Tori desloca Uke de lado, passo a passo, e acelera no último passo. Quando o pé de trás de Uke vem se juntar ao da frente, Tori encosta a sola por fora do tornozelo e varre os dois pés juntos na direção em que eles já iam, levantando Uke pelas pegadas. Uke fica no ar, deitado, e cai de costas aos pés de Tori. A vista de trás de Tori mostra o deslocamento e a varrida, que acontecem de lado.',
 reading:[{k:'送',r:'okuri',m:'que acompanha'},{k:'足',r:'ashi',m:'pé'},{k:'払',r:'barai',m:'varrida'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','2º grupo (Dai-nikyo)'],
  ['O segredo','Tempo e direção. A varrida vem quando o pé de trás de Uke está chegando ao da frente, e empurra os dois na direção em que já se moviam.'],
  ['Diferença para o de ashi barai','No de ashi barai Tori varre um pé que avança para frente. No okuri ashi barai o deslocamento é de lado e a sola leva os dois pés de Uke juntos.'],
  ['No jiu-jitsu','Funciona quando o oponente circula de lado procurando pegada. Uke cai de costas aos pés de Tori, que segura a manga e já está por cima.']],
 errors:[['Varrer contra o movimento','Empurrar o pé de Uke de volta para onde ele veio só trava o pé no chão. A varrida acompanha o passo.'],
  ['Varrer só um pé','Se a sola chega cedo, o pé da frente ainda está firme e Uke só tropeça. Espere os pés quase se juntarem.'],
  ['Mãos paradas','Sem levantar pelas pegadas, o peso de Uke continua nos pés e a varrida não tira nada do chão.'],
  ['Cruzar os próprios pés','No deslocamento lateral os pés de Tori se aproximam, mas nunca se cruzam. Pé cruzado é base perdida.']],
 safety:['Treine primeiro o deslocamento lateral sem varrer, até os dois andarem no mesmo ritmo.',
  'Varra com a sola do pé, por fora do tornozelo, nunca com o calcanhar ou o peito do pé.',
  'Segure a manga e puxe para cima durante a queda, para Uke cair de costas amortecido e com o queixo no peito.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke, perto do cotovelo, e a mão direita na gola esquerda. Os dois em postura natural, pés paralelos na largura dos ombros.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Pés paralelos, peso nos dois pés.']},
 {s:1,e:3.1,kanji:'崩し',ro:'Kuzushi',pt:'Deslocamento lateral',
  d:'Tori anda de lado para a própria direita e leva Uke junto, para a esquerda dele. Em cada passo, o pé da frente abre e o de trás vem se juntar, sem cruzar. As mãos conduzem o ritmo.',
  l:['Passos de lado, os pés nunca se cruzam.','As mãos levam Uke junto, no mesmo ritmo.','Tori observa o pé direito de Uke, o de trás.']},
 {s:3.1,e:4.1,kanji:'作り',ro:'Tsukuri',pt:'Acelerar e encostar',
  d:'No terceiro passo Tori acelera e abre mais. Uke precisa trazer o pé direito depressa para não ficar aberto. Quando esse pé está chegando ao esquerdo, a sola do pé esquerdo de Tori encosta por fora do tornozelo dele.',
  l:['O passo mais rápido obriga Uke a juntar os pés.','Sola contra o tornozelo, por fora, com a perna quase reta.','As mãos começam a levantar Uke.']},
 {s:4.1,e:5.4,kanji:'掛け',ro:'Kake',pt:'A varrida dos dois pés',
  d:'Tori varre o pé direito de Uke contra o esquerdo e leva os dois juntos, na direção do deslocamento, enquanto as mãos levantam pelas pegadas. Uke fica deitado no ar, na altura da faixa de Tori, de costas para o tatame, e cai.',
  l:['A sola leva os dois pés juntos, para o lado em que já iam.','As mãos levantam: a manga para cima, a gola para cima e para o lado.','Uke gira em volta das mãos de Tori, nunca acima dos ombros dele.']},
 {s:5.4,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Queda e controle',
  d:'Uke cai de costas, com a cabeça junto aos pés de Tori e as pernas esticadas para o lado do deslocamento. Tori fica de pé, com os joelhos dobrados, e segura o braço direito de Uke com as duas mãos, puxando para cima.',
  l:['Manga segura e puxada para cima até o fim.','Uke faz ukemi: queixo no peito e braço esquerdo batendo no tatame.','Tori termina em pé, equilibrado, sem cair junto.']}],
 rep:[.5,2.3,3.9,4.6,7.5], cover:4.6,
 views:[
  {name:'Por trás de Tori',a:58,e:15,center:[-.2,.8,-1.0],span:4.1},
  {name:'Pés, de cima',a:100,e:62,center:[-.15,.2,-.95],span:3.7},
  {name:'De frente para Tori',a:-60,e:18,center:[-.15,.8,-1.0],span:4.2}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 /* 1º passo: o pé da frente abre (direito de Tori, esquerdo de Uke) */
 [1.25,{tori:{z:-.08,leg:{R:W3(.27,.12,-.29)}},uke:{z:-.08,leg:{L:W3(-.27,.12,-.29)}}}],
 [1.5,{tori:{z:-.15,leg:{R:W3(.27,.07,-.44)}},uke:{z:-.15,leg:{L:W3(-.27,.07,-.44)}}}],
 /* o pé de trás vem se juntar, sem cruzar */
 [1.75,{tori:{z:-.24,leg:{L:W3(.27,.11,-.02)}},uke:{z:-.24,leg:{R:W3(-.27,.11,-.02)}}}],
 [2.0,{tori:{z:-.30,leg:{L:W3(.27,.07,-.16)}},uke:{z:-.30,leg:{R:W3(-.27,.07,-.16)}}}],
 /* 2º passo */
 [2.25,{tori:{z:-.38,leg:{R:W3(.27,.12,-.59)}},uke:{z:-.38,leg:{L:W3(-.27,.12,-.59)}}}],
 [2.5,{tori:{z:-.45,leg:{R:W3(.27,.07,-.74)}},uke:{z:-.45,leg:{L:W3(-.27,.07,-.74)}}}],
 [2.75,{tori:{z:-.54,leg:{L:W3(.27,.11,-.32)}},uke:{z:-.54,leg:{R:W3(-.27,.11,-.32)}}}],
 [3.0,{tori:{z:-.60,leg:{L:W3(.27,.07,-.46)}},uke:{z:-.60,leg:{R:W3(-.27,.07,-.46)}}}],
 /* 3º passo, mais rápido e mais largo */
 [3.25,{tori:{z:-.70,leg:{R:W3(.28,.13,-.91)}},uke:{z:-.70,leg:{L:W3(-.27,.13,-.91)}}}],
 [3.45,{tori:{z:-.80,y:.90,leg:{R:W3(.28,.07,-1.08)}},uke:{z:-.80,leg:{L:W3(-.27,.07,-1.08)}}}],
 /* o pé direito de Uke vem se juntar; o pé esquerdo de Tori sai do chão em direção ao tornozelo dele */
 [3.7,{tori:{x:.28,y:.88,z:-.86,pitch:-4,leg:{L:W3(.12,.14,-.62)},arm:{R:B('o',.16,.46,-.09)}},
       uke:{z:-.88,y:.93,leg:{R:W3(-.25,.11,-.70)}}}],
 /* contato: sola de Tori por fora do tornozelo direito de Uke, perna quase reta */
 [3.95,{tori:{x:.26,y:.85,z:-.90,pitch:-8,leg:{L:W3(-.10,.12,-.75)},pole:{legL:[.3,.1,-1]},arm:{R:B('o',.16,.50,-.10)}},
       uke:{z:-.93,y:.95,leg:{R:W3(-.22,.10,-.86)}}}],
 [4.1,{}],
 /* a varrida leva os dois pés juntos para -z e para cima; as mãos levantam.
    Uke gira como uma tábua em volta do eixo da frente: a cabeça vai para +z, os pés para -z,
    o corpo fica quase horizontal (cabeça e quadril na mesma altura) com o lado direito para baixo.
    Ângulos na família pitch -90: (yaw 90, pitch -90, roll 90) = deitado de lado, peito para Tori;
    roll 0 = deitado de costas. O caminho de (0,0,0) até lá inclina a cabeça para +z sem cambalhota. */
 [4.3,{tori:{y:.85,pitch:-6,leg:{L:W3(-.12,.22,-1.05)},arm:{R:B('o',.16,.50,-.07)}},
       uke:{y:.98,z:-.94,yaw:18,pitch:-18,roll:18,h:10,gf:0,
            leg:{R:W3(-.22,.20,-1.14),L:W3(-.25,.17,-1.25)}}}],
 [4.55,{tori:{y:.85,pitch:0,leg:{L:W3(-.04,.28,-1.18)},arm:{R:W3(-.06,1.30,-.86)},pole:{armR:[-.3,-.8,.5]}},
       uke:{x:-.35,y:.88,z:-1.04,yaw:72,pitch:-62,roll:60,h:15,
            leg:{R:B('s',.12,-.83,.08),L:B('s',.10,-.83,-.08)},arm:{L:B('s',.15,.40,-.45)}}}],
 [4.8,{tori:{x:.30,y:.84,pitch:16,leg:{L:W3(.16,.10,-.72)},arm:{L:SL('armR',.6),R:SL('armR',.3)}},
       uke:{x:-.42,y:.66,z:-1.20,yaw:110,pitch:-90,roll:82,h:18,
            leg:{R:B('s',.12,-.83,.08),L:B('s',.10,-.83,-.08)},arm:{L:B('s',.20,.30,-.50)}}}],
 [5.0,{tori:{y:.82,pitch:24},
       uke:{x:-.40,y:.38,z:-1.32,yaw:114,pitch:-90,roll:65,h:22}}],
 /* queda: ombro direito e quadril tocam juntos, de lado/costas; as pernas por último */
 [5.2,{tori:{x:.31,y:.80,pitch:32,h:10,leg:{L:W3(.30,.07,-.72)},arm:{L:SL('armR',.75),R:SL('armR',.35)}},
       uke:{x:-.37,y:.15,z:-1.42,yaw:117,pitch:-89,roll:38,h:24,
            leg:{R:B('s',.06,-.84,.08),L:B('s',.05,-.84,-.08)},arm:{R:W3(.05,.62,-1.05),L:W3(-.72,.06,-.95)},
            pole:{armL:[.3,-.4,-.8]}}}],
 [5.4,{tori:{y:.80,pitch:36,leg:{L:W3(.36,.07,-.64),R:W3(.30,.07,-1.14)},pole:{legR:[1,-.1,-.1],legL:[1,-.1,.1]}},
       uke:{y:.13,z:-1.45,yaw:118,pitch:-88,roll:2,h:26,gf:1,
            leg:{R:W3(-.58,.07,-2.23),L:W3(-.80,.07,-2.13)},arm:{R:W3(.06,.68,-1.03),L:W3(-.75,.05,-.92)},
            pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15]}}}],
 [6.6,{}],
 [7.4,{tori:{y:.82,pitch:32},uke:{h:20}}],
 [10.5,{}]],
 /* a sola de Tori encosta no tornozelo de Uke de propósito */
 aperto:{s:3.85,e:4.6,limbs:['T.L.leg'],tol:.10,tudo:true},
 names:F=>F.t>4.6?{uke:[F.uke.hip[0]-.2,F.uke.hip[1]+.45,F.uke.hip[2]-.3]}:{},
 glow:{s:3.7,e:4.7,limbs:{'T.L.leg':'force','U.R.leg':'gold','U.L.leg':'gold'}},
 stamp:{s:5.5,e:7.0,big:'一本',small:'IPPON'},
 annotateAll:true,
 annotate:(api,F,vi)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  /* Vista de cima: só os pés. */
  if(vi===1){
   a=win(t,1.0,3.5);
   if(a>0){api.arrow([0,.05,-.2],[0,.05,-.9],C.force,a);
    api.tag('os dois andam de lado',[0,.05,-.9],3,2,C.force,a,false);}
   a=win(t,3.8,4.7);
   if(a>0){api.ring(T.legL.toe,.08,C.force,a);
    api.arrow([-.2,.15,-.8],[-.2,.25,-1.3],C.force,a);
    api.tag('a sola leva os dois pés',[-.2,.25,-1.3],4,3,C.force,a,false);}
   return;}
  if(vi!==0)return;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,4,-4,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6,-4,C.force,a);
  a=win(t,1.2,3.4);
  if(a>0){const c=api.add(T.sh,[0,.2,0]);api.arrow(c,api.add(c,[0,0,-.45]),C.force,a);
   api.tag('passos de lado, sem cruzar',api.add(c,[0,0,-.45]),2,-2.4,C.force,a,false);}
  a=win(t,3.5,4.2);
  if(a>0){api.ring(U.legR.H,.12,C.gold,a);
   api.tag('o pé de trás vem se juntar',U.legR.H,-9,3,C.gold,a);
   api.ring(T.legL.toe,.07,C.force,a);
   api.tag('sola por fora do tornozelo',T.legL.toe,8,-2,C.force,a);}
  a=win(t,4.1,4.9);
  if(a>0){api.arrow([-.2,.2,-.85],[-.2,.35,-1.35],C.force,a);
   api.tag('varre os dois pés juntos',[-.2,.35,-1.35],4,3,C.force,a,false);
   api.tag('mãos levantam',T.armR.H,-6,-3,C.force,a);}
  a=win(t,5.4,10.4);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-6,3,C.uke,win(t,5.4,8));}
});})();
