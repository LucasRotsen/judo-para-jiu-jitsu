(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori começa de costas, cabeça para -x, direita = +z.
   Uke ajoelhado na guarda (yaw 180: direita de Uke = -z). Tori segura a manga DIREITA de Uke com a mão esquerda.
   O braço direito de Tori passa por baixo da perna ESQUERDA de Uke (lado +z); a perna direita de Tori balança
   como pêndulo e a esquerda corta pelas costas de Uke. Uke cai para a direita dele (-z), o lado da manga presa. */
const sleeve=SL('armR',.85), collar=B('o',.21,.40,-.07), underKnee=W3(.31,.11,.30), elbowIn=[-.5,-.6,-.7];
const ukeBase={x:.40,y:.40,z:0,yaw:180,pitch:45,roll:0,h:-20,
 leg:{R:W3(.68,.07,-.17),L:W3(.68,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-72,roll:0,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:collar,L:sleeve},
 pole:{legR:[-.25,.75,1],legL:[-.25,.75,-1],armR:[-.6,.3,.6],armL:[.8,.2,-.4]}};
Judo.register3d({
 id:'raspagem-pendular', name:'Raspagem pendular', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Pêndulo (pendulum sweep, flower sweep)',
 why:'Raspagem clássica da guarda fechada que usa o balanço da perna como motor: quem aprende o pêndulo entende que a força vem do quadril, não dos braços.',
 summary:'Raspagem da guarda fechada. Tori prende a manga de um lado, passa o outro braço por baixo da perna de Uke do lado oposto, abre a guarda e balança a perna livre como um pêndulo. A outra perna corta pelas costas e Uke cai para o lado da manga presa. Tori rola junto e termina montado.',
 reading:[{k:'Pêndulo',r:'pendulum sweep',m:'a perna balança como o pêndulo de um relógio'},{k:'Flor',r:'flower sweep',m:'outro nome da mesma raspagem'}],
 facts:[['Origem','Jiu-jitsu. Uma das primeiras raspagens ensinadas da guarda fechada, junto com a tesoura.'],
  ['Pontuação','Raspagem vale 2 pontos; terminar montado e estabilizar vale mais 4.'],
  ['Braço e manga em lados opostos','A mão esquerda de Tori prende a manga direita de Uke; o braço direito passa por baixo da perna esquerda dele. Uke perde o apoio da mão e da perna em lados opostos.'],
  ['Para que lado ele cai','Para o lado da manga presa, onde ele não tem a mão para apoiar. Aqui é a manga direita, então Uke cai para a direita dele.']],
 errors:[['Soltar a manga','Com a mão livre, Uke apoia no tatame e a raspagem para.'],
  ['Balançar a perna dobrada','O pêndulo é com a perna esticada e o movimento vem do quadril. Perna dobrada não gera impulso.'],
  ['Perna de cima parada','A perna nas costas de Uke precisa cortar para baixo ao mesmo tempo em que a outra sobe. Sem o corte, Uke só balança.'],
  ['Ficar reto embaixo de Uke','Tori gira o tronco para o lado da perna que vai levantar. Reto, o braço não alcança por baixo do joelho.']],
 safety:['Treine devagar e com um parceiro que sabe cair de lado.',
  'O braço preso pela manga não tem como amortecer a queda: Uke cai sobre o ombro, então controle a velocidade.',
  'Ao subir para a montada, apoie os joelhos no tatame em vez de cair com o peso sobre o parceiro.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoL',b:'U.antebracoR',s:0,e:5.2,txt:'a mão esquerda de Tori segura a manga DIREITA de Uke'},
  {c:'lado',a:'T.quadril',de:'U.quadril',lado:'frente',s:7.6,e:'fim',min:.1,txt:'Uke cai de costas e Tori sobe montado'}],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda fechada',pt:'Manga e gola',
  d:'Tori está de costas com as pernas cruzadas nas costas de Uke. A mão esquerda segura a manga direita de Uke, no punho, e a mão direita segura a gola esquerda dele.',
  l:['A manga é o que decide o lado da queda.','Pegada no punho, para tirar a mão de Uke da base.','As pernas ainda estão fechadas.']},
 {s:1.6,e:3.4,kanji:'2',ro:'Braço por baixo da perna',pt:'Abrir a guarda e enganchar o joelho',
  d:'Tori puxa a manga para o peito, abre a guarda e solta a gola. O braço direito passa por dentro e por baixo da perna esquerda de Uke e abraça o joelho. Tori gira o tronco para esse lado, e a perna esquerda sobe nas costas de Uke, do lado direito dele.',
  l:['Manga e perna presas em lados opostos.','O tronco gira para o lado do joelho enganchado.','A perna esquerda fica alta, nas costas de Uke.']},
 {s:3.4,e:5.2,kanji:'3',ro:'Pêndulo',pt:'Balançar a perna livre',
  d:'A perna direita de Tori, esticada, desce para o lado e volta subindo alta, como o pêndulo de um relógio. O balanço gira o quadril de Tori e carrega o impulso para a raspagem.',
  l:['Perna esticada, movimento do quadril.','Primeiro desce para o lado, depois sobe alta.','Manga e joelho continuam presos.']},
 {s:5.2,e:7.2,kanji:'4',ro:'Raspagem',pt:'Cortar, levantar e virar',
  d:'No alto do pêndulo, a perna esquerda corta para baixo pelas costas de Uke enquanto o braço levanta o joelho esquerdo dele e a mão puxa a manga. Sem a mão direita para apoiar, Uke tomba para a direita, sobre o ombro, e cai de costas.',
  l:['Perna de cima corta, braço levanta o joelho.','Uke cai para o lado da manga presa.','Tori rola junto, sem soltar a manga.']},
 {s:7.2,e:10,kanji:'5',ro:'Montada',pt:'Estabilizar',
  d:'Tori acompanha o giro, senta em cima do quadril de Uke e termina montado, joelhos no chão dos dois lados, ainda segurando a manga.',
  l:['Rolar junto, sem soltar.','Joelhos abertos, quadril pesado.','Da montada saem estrangulamentos e chaves.']}],
 rep:[.8,2.8,4.6,6.0,8.6], cover:4.8,
 views:[
  {name:'Pela cabeça de Tori',a:-90,e:35,center:[.3,.35,-.15],span:2.9},
  {name:'Lado do pêndulo',a:35,e:22,center:[.3,.42,-.1],span:2.9},
  {name:'De cima',a:-90,e:88,center:[.3,0,-.15],span:2.9}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* guarda aberta: manga puxada para o peito, Uke inclina para a frente */
 [2.2,{tori:{leg:{R:B('o',.02,-.02,-.42),L:B('o',.04,.0,.45)},arm:{R:B('s',.30,.30,.30)},pole:{legR:[-.6,.5,.6],legL:[-.2,.4,-1],armR:[-.3,-.6,.8]}},
       uke:{pitch:52,h:-10,arm:{R:B('o',.18,.30,-.16)}}}],
 /* braço direito por dentro e por baixo da perna esquerda de Uke; tronco gira para esse lado; perna esquerda alta nas costas */
 [3.0,{tori:{z:-.06,yaw:30,roll:18,pitch:-58,h:25,arm:{R:underKnee},leg:{R:W3(.45,.08,.55),L:B('o',-.10,.30,.24)},
        pole:{armR:elbowIn,armL:[-.6,-.2,-.7],legR:[.6,.6,.4],legL:[1,-.3,-.5]}},
       uke:{pitch:55,x:.40,h:-5,arm:{L:B('o',.13,.06,.08),R:B('o',.16,.32,-.24)},pole:{armR:[-.3,-.3,.9],armL:[-.3,-.3,-.9]}}}],
 [3.4,{}],
 /* pêndulo: a perna direita esticada desce para o lado... */
 [4.1,{tori:{yaw:14,leg:{R:W3(.15,.12,.80)},pole:{legR:[.6,.3,.6]}}}],
 /* ...e volta subindo alta */
 [4.8,{tori:{yaw:28,roll:8,leg:{R:W3(.15,.95,.40)},pole:{legR:[.6,.4,.3]}}}],
 [5.2,{}],
 /* corte: perna esquerda desce pelas costas, braço levanta o joelho, Uke tomba para a direita dele (-z) */
 [5.6,{tori:{yaw:15,roll:-20,arm:{R:SL('legL',.05)},leg:{R:W3(.30,.95,-.05),L:B('o',-.05,.18,.34)},pole:{legL:[.6,.3,-1]}},
       uke:{x:.41,y:.48,z:-.20,roll:40,pitch:62,leg:{L:W3(.56,.36,.12)}}}],
 [6.0,{tori:{x:.10,y:.20,z:-.06,yaw:8,roll:-80,pitch:-110,leg:{R:W3(.55,.75,-.30),L:W3(.62,.08,.04)},arm:{R:B('s',.25,.20,.30)},pole:{legR:[1,.2,0],legL:[1,0,.2]}},
       uke:{x:.43,y:.30,z:-.50,roll:120,pitch:80,h:0,leg:{R:W3(1.10,.10,-.32),L:W3(1.06,.32,-.46)},pole:{legR:[1,-.1,.1],legL:[1,-.1,-.1]}}}],
 [6.3,{tori:{x:.30,y:.42,z:-.22,yaw:0,roll:-125,pitch:-140,leg:{R:W3(.60,.30,-.72),L:W3(.72,.06,.08)},pole:{legR:[1,.2,-.1],legL:[1,0,.1]}}}],
 [6.7,{tori:{x:.44,y:.38,z:-.46,roll:-150,pitch:-160,h:10,leg:{R:B('o',-.1,-.25,-.3),L:B('o',-.1,-.25,.3)},
        pole:{legR:[.5,.25,-.5],legL:[0,-.5,.25]}},
       uke:{x:.46,y:.13,z:-.46,roll:180,pitch:90,h:10,leg:{R:W3(1.15,.07,-.34),L:W3(1.18,.07,-.58)},pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15]}}}],
 [7.1,{tori:{pole:{legR:[.5,.25,-.5],legL:[.75,.75,.25]}}}],
 [7.6,{tori:{arm:{R:B('o',.14,.38,.05)},x:.48,y:.35,z:-.46,roll:-180,pitch:-178,h:15,leg:{R:B('o',-.1,-.25,-.3),L:B('o',-.1,-.25,.3)},pole:{legR:[1,.25,-.25],legL:[1,.25,.25],armR:[-.3,-.4,.8]}},
       uke:{arm:{L:B('o',.05,-.02,.2)}}}],
 [10,{}]],
 /* o braço enganchado no joelho e a perna que corta pelas costas tocam Uke de propósito */
 aperto:[{s:2.6,e:6.0,limbs:['T.R.arm'],tol:.12,tudo:true},{s:2.6,e:5.9,limbs:['T.L.leg'],tol:.12,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.2,F.tori.head[2]],
  uke:[F.uke.hip[0]+.2,Math.max(F.uke.head[1],F.uke.hip[1])+.24,F.uke.hip[2]-.1]}),
 glow:{s:3.4,e:6.4,limbs:{'T.R.leg':'force','T.L.leg':'gold','T.R.arm':'gold'}},
 stamp:{s:7.8,e:10,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.8);
  api.tag('manga direita',T.armL.H,6,2.5,C.force,a);
  api.tag('pernas fechadas',T.legR.H,-6,-2.5,C.force,a);
  a=win(t,2.6,3.6);
  api.tag('braço por baixo do joelho',T.armR.H,6,-3,C.gold,a);
  api.tag('perna alta nas costas',T.legL.E,-6,3,C.gold,a);
  a=win(t,3.6,5.2);
  api.tag('pêndulo: perna esticada',T.legR.H,6,-3,C.force,a);
  a=win(t,5.2,6.4);
  api.tag('corta pelas costas',T.legL.E,-5,3,C.gold,a);
  api.tag('cai para o lado da manga',U.head,-3,-4.5,C.info,a);
  a=win(t,7.4,10);
  api.tag('joelhos dos dois lados do quadril',T.legR.E,6,3,C.force,a);}
});})();
