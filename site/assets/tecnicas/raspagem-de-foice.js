(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke em pé de frente para -x (yaw 180, direita de Uke = -z), pés em x≈.46.
   Tori deitado na guarda aberta à frente dele. Na entrada Tori gira de lado (yaw -65): cabeça ao lado do pé
   DIREITO de Uke (-z), pernas para o lado do pé ESQUERDO (+z). Mão esquerda de Tori segura o calcanhar direito
   de Uke; mão direita segura a manga esquerda. Perna de cima (esquerda) com o pé no quadril esquerdo de Uke;
   perna de baixo (direita) no chão, por fora e atrás do calcanhar esquerdo de Uke: é a foice.
   Uke senta para trás (+x) e cai de costas, sem rolar. Tori senta, levanta seguindo a perna presa e termina
   em base, por cima, abraçando o pé direito de Uke. Conferido com o vídeo YIFf4VNzDOY (tripod & sickle sweep). */
const heel=SL('legR',.97), sleeveL=SL('armL',.85);
const hipPush=B('o',.13,-.06,-.12);
const ukeBase={x:.50,y:.92,z:0,yaw:180,pitch:22,roll:0,h:25,gf:1,
 leg:{R:W3(.48,.03,-.19),L:W3(.48,.03,.19)},
 arm:{R:SL('legL',.75),L:SL('legR',.75)},
 pole:{legR:[1,-.2,.1],legL:[1,-.2,-.1],armR:[-.2,-.9,.4],armL:[-.2,-.9,-.4]}};
const toriBase={x:.12,y:.15,z:0,yaw:0,pitch:-55,roll:0,h:30,gf:0,
 leg:{R:B('o',.13,-.06,-.13),L:B('o',.13,-.06,.13)},
 arm:{R:SL('armL',.8),L:SL('armR',.8)},
 pole:{legR:[1,.2,.5],legL:[1,.2,-.5],armR:[0,-.8,.6],armL:[0,-.8,-.6]}};
Judo.register3d({
 id:'raspagem-de-foice', name:'Raspagem de foice', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Foice (sickle sweep)',
 why:'Você puxou para a guarda e Uke ficou em pé: esta é a resposta. Em vez de deixar ele passar, Tori segura o calcanhar, põe o pé no quadril e corta o outro pé por trás. Uke senta e Tori levanta por cima, já com a perna dele presa.',
 summary:'Raspagem da guarda aberta contra Uke em pé. Tori deita de lado com a cabeça junto ao pé de Uke, segura esse calcanhar e a manga do outro lado. O pé de cima empurra o quadril de Uke e a perna de baixo, no chão, corta por trás o calcanhar da outra perna como uma foice. Sem os dois apoios, Uke senta para trás. Tori levanta seguindo a perna presa e termina por cima.',
 reading:[{k:'Foice',r:'sickle sweep',m:'a perna de baixo corta o calcanhar como uma foice'}],
 facts:[['Origem','Jiu-jitsu. Costuma ser ensinada junto com a raspagem tripé: mesma pegada no calcanhar, outra perna fazendo o corte.'],
  ['Quando usar','Quando Uke levanta dentro da sua guarda aberta. Em pé ele está com o peso em dois pés; prendendo um e cortando o outro, não sobra base.'],
  ['Por que ele não dá um passo','O pé preso pela mão não sai do lugar, e o outro pé é tirado por baixo. Para não cair ele precisaria pisar para trás, e o pé no quadril empurra justamente para trás.'],
  ['Pontuação','Raspagem vale 2 pontos, desde que Tori termine por cima e estabilize.']],
 errors:[['Ficar longe do calcanhar','Deitado reto e longe, a mão não chega ao pé de Uke e a perna de baixo não alcança o outro calcanhar. Tori gira de lado e chega a cabeça junto ao pé que vai segurar.'],
  ['Cortar sem empurrar','A foice sozinha só arrasta o pé. O pé de cima empurra o quadril para trás ao mesmo tempo em que a de baixo puxa o calcanhar para a frente.'],
  ['Soltar o calcanhar','Com o pé livre, Uke dá um passo para trás e fica em pé. A mão segura o calcanhar até ele sentar.'],
  ['Ficar deitado depois','Uke sentado volta para a guarda ou levanta de novo. Tori senta junto, segue a perna presa e sobe por cima.']],
 safety:['Faça devagar no treino: quem é raspado cai sentado e precisa saber apoiar as mãos atrás e recolher o queixo.',
  'A perna de baixo corta no calcanhar, nunca chuta a parte de trás do joelho.',
  'Ao levantar, não caia com o peso sobre a perna presa do parceiro.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoL',b:'U.peR',s:3.4,e:7.6,txt:'a mão esquerda de Tori segura o calcanhar DIREITO de Uke'},
  {c:'lado',a:'T.peL',de:'U.quadril',lado:'esquerda',s:4.0,e:5.4,min:.0,txt:'a perna de cima tem o pé no quadril ESQUERDO de Uke'},
  {c:'lado',a:'T.peR',de:'U.peL',lado:'tras',s:4.0,e:5.4,txt:'a foice: a perna de baixo fica atrás do calcanhar esquerdo de Uke'}],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Guarda aberta',pt:'Uke em pé',
  d:'Tori puxou para a guarda e Uke ficou em pé. Tori está sentado para trás, com os dois pés no quadril de Uke e as mãos nas mangas dele. Uke segura a calça de Tori.',
  l:['Os pés no quadril mantêm a distância.','Uke em pé quer passar a guarda.','É aqui que muita gente fica parada: hora de agir.']},
 {s:1.8,e:4.0,kanji:'2',ro:'Entrada',pt:'Deitar de lado e pegar o calcanhar',
  d:'Tori desce para baixo de Uke e gira de lado, com a cabeça junto ao pé direito dele. A mão esquerda segura o calcanhar direito por trás. O pé esquerdo fica no quadril esquerdo de Uke e a perna direita desce para o chão, por fora do pé esquerdo dele. A mão direita continua na manga esquerda.',
  l:['Cabeça perto do pé que vai segurar.','Mão em concha atrás do calcanhar.','Pé de cima no quadril, perna de baixo no chão.']},
 {s:4.0,e:5.4,kanji:'3',ro:'Foice armada',pt:'Perna de baixo atrás do calcanhar',
  d:'A perna direita de Tori desliza pelo chão e o peito do pé encaixa por trás do calcanhar esquerdo de Uke, por fora. Os dois pés de Uke estão presos: um pela mão, o outro pela foice.',
  l:['A foice entra por fora e por trás do calcanhar.','O pé de cima ainda empurra o quadril.','Uke não tem para onde dar o passo.']},
 {s:5.4,e:7.6,kanji:'4',ro:'Raspagem',pt:'Puxar, empurrar e cortar',
  d:'Tori puxa o calcanhar direito, empurra o quadril de Uke para trás com o pé de cima e corta o calcanhar esquerdo para a frente com a perna de baixo. Sem base, Uke senta para trás, apoia as mãos e cai de costas.',
  l:['Pé de cima empurra, perna de baixo corta.','A mão não solta o calcanhar.','Uke cai sentado, para trás, sem rolar.']},
 {s:7.6,e:10.8,kanji:'5',ro:'Por cima',pt:'Levantar seguindo a perna',
  d:'Tori senta, apoia a mão direita atrás, levanta o quadril e vem para cima seguindo a perna presa. Termina em base, um joelho no chão, abraçando o pé direito de Uke e com a mão no joelho esquerdo dele, pronto para passar.',
  l:['Levantar sem soltar o pé.','Base com um joelho no chão, peso para a frente.','Da perna presa sai a passagem.']}],
 rep:[.9,3.2,4.9,6.6,9.6], cover:5.2,
 views:[
  {name:'Lado da foice',a:20,e:20,center:[.42,.78,.05],span:3.4},
  {name:'Por trás de Uke',a:90,e:14,center:[.4,.78,0],span:3.3},
  {name:'De cima',a:0,e:88,center:[.45,0,0],span:2.7}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 /* Tori solta a manga direita, desce para baixo de Uke e começa a girar de lado */
 [2.6,{tori:{x:.18,y:.14,z:.04,yaw:-35,pitch:-70,roll:10,h:35,
        arm:{L:B('s',.15,.2,-.32)},leg:{L:hipPush,R:W3(.30,.06,.42)},
        pole:{legL:[.6,.6,.2],legR:[.2,-1,.4],armL:[-.3,-.3,-1]}},
       uke:{arm:{R:SL('legL',.05),L:SL('legL',.35)},pole:{armR:[0,-.9,.4],armL:[0,-.9,-.4]}}}],
 /* de lado, cabeça junto ao pé direito de Uke; mão esquerda no calcanhar; perna de baixo por fora do pé esquerdo */
 [3.4,{tori:{x:.22,y:.14,z:.06,yaw:-65,pitch:-78,roll:25,h:40,
        arm:{L:heel,R:sleeveL},leg:{L:hipPush,R:W3(.40,.05,.46)},
        pole:{legL:[.6,.6,.2],legR:[.1,-1,.3],armL:[-.4,-.2,-.8],armR:[-.3,-.6,.6]}}}],
 [4.0,{}],
 /* a foice: o peito do pé direito encaixa atrás do calcanhar esquerdo de Uke, por fora */
 [4.7,{tori:{leg:{R:W3(.58,.06,.27)},pole:{legR:[.2,-1,.2]}}}],
 [5.4,{}],
 /* puxa o calcanhar, empurra o quadril, corta: o pé esquerdo de Uke sai do chão para a frente */
 [5.9,{tori:{pitch:-82,leg:{R:W3(.36,.10,.24),L:B('o',.18,-.04,-.12)}},
       uke:{x:.56,y:.86,pitch:4,h:30,leg:{L:W3(.30,.10,.21)},arm:{L:B('s',.05,.15,-.40),R:B('s',.05,.15,.40)},
        pole:{armR:[-.3,-.3,1],armL:[-.3,-.3,-1]}}}],
 [6.3,{tori:{leg:{R:W3(.20,.22,.26),L:B('o',.25,-.02,-.12)}},
       uke:{x:.64,y:.58,pitch:-18,h:35,leg:{L:W3(.20,.30,.22)},arm:{L:B('s',-.15,.05,-.42),R:B('s',-.15,.05,.42)}}}],
 /* Uke senta para trás e apoia as mãos */
 [6.8,{tori:{pitch:-75,arm:{R:B('s',.20,.25,.25)},leg:{R:W3(.12,.06,.40),L:W3(.42,.30,.18)},pole:{armR:[0,-.6,1],legL:[.6,.6,.3]}},
       uke:{x:.70,y:.16,pitch:-40,h:35,leg:{L:W3(.22,.20,.24)},arm:{L:W3(.95,.04,.32),R:W3(.95,.04,-.32)},
        pole:{legR:[1,.3,.1],legL:[1,.2,-.1],armR:[-.6,-.2,.6],armL:[-.6,-.2,-.6]}}}],
 /* cai de costas, queixo no peito; Tori senta e apoia a mão direita atrás */
 [7.6,{tori:{x:.18,y:.20,z:.02,yaw:-35,pitch:-35,roll:10,h:20,arm:{R:W3(-.05,.04,.30)},leg:{R:W3(.38,.05,.38),L:W3(.48,.05,.00)},
        pole:{armR:[-.6,-.3,.6],legR:[.8,.4,.4],legL:[.8,.6,-.2]}},
       uke:{x:.82,y:.14,pitch:-72,h:30,leg:{R:W3(.46,.18,-.20),L:W3(.42,.05,.40)},arm:{L:B('s',.1,.3,-.28),R:B('s',.1,.3,.28)},
        pole:{legL:[1,.4,-.2],armR:[.3,-.6,.6],armL:[.3,-.6,-.6]}}}],
 /* levanta o quadril seguindo a perna presa */
 [8.3,{tori:{x:.30,y:.36,z:0,yaw:-12,pitch:5,roll:0,h:15,arm:{R:W3(.02,.04,.30)},leg:{R:W3(.20,.04,.20),L:W3(.62,.03,-.16)},
        pole:{legR:[1,-.6,.2],legL:[1,.4,-.2]}},
       uke:{leg:{R:W3(.50,.50,-.21)}}}],
 /* base: joelho direito no chão, pé esquerdo plantado; abraça o pé direito de Uke, mão no joelho esquerdo dele */
 [9.0,{tori:{x:.38,y:.46,z:-.02,yaw:0,pitch:18,h:10,arm:{R:SL('legL',.05)},leg:{R:W3(.04,.04,.17),L:W3(.74,.03,-.20)},
        pole:{legR:[1,-1,.1],legL:[1,.5,-.2],armR:[-.2,-.6,.7],armL:[-.3,-.8,-.4]}},
       uke:{leg:{R:W3(.50,.80,-.22)},pole:{legR:[1,.2,0]}}}],
 [10.8,{}]],
 /* a mão e a perna de baixo prendem os pés de Uke, o pé de cima pesa no quadril dele, de propósito */
 aperto:[{s:0,e:7.2,limbs:['T.L.leg','T.R.leg'],tol:.10,tudo:true},{s:2.8,e:10.8,limbs:['T.L.arm','U.R.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.head[0],F.uke.head[1]+.28,F.uke.head[2]]}),
 glow:{s:3.6,e:7.4,limbs:{'T.R.leg':'force','T.L.arm':'gold','T.L.leg':'gold'}},
 stamp:{s:9.2,e:10.8,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('pés no quadril',T.legR.H,6,-3,C.force,a);
  api.tag('Uke em pé',U.head,-6,-3,C.uke,a);
  a=win(t,2.9,4.2);
  api.tag('mão no calcanhar',T.armL.H,-6,3,C.gold,a);
  api.tag('pé de cima no quadril',T.legL.H,6,-3,C.gold,a);
  a=win(t,4.2,5.6);
  api.tag('foice atrás do calcanhar',T.legR.H,6,3,C.force,a);
  a=win(t,5.5,7.0);
  api.tag('de baixo corta',T.legR.H,6,3,C.force,a);
  api.tag('de cima empurra',T.legL.H,6,-3,C.gold,a);
  api.tag('senta para trás',U.hip,-6,-4,C.info,win(t,6.2,7.6));
  a=win(t,7.8,10.8);
  api.tag('sobe sem soltar o pé',T.armL.H,-6,-3,C.force,a);}
});})();
