(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori começa de joelhos na guarda aberta de Uke, de frente para a cabeça dele (yaw 180): esquerda de Tori = +z.
   Como no vídeo de Bernardo Faria (NY5DZPW7bMs): o braço ESQUERDO de Tori passa POR BAIXO da coxa DIREITA de Uke e a
   mão segura a calça no quadril direito dele; o braço DIREITO passa POR CIMA da coxa esquerda e a prende no chão.
   A coxa direita de Uke fica no ombro esquerdo de Tori. Tori sobe nas pontas dos pés, quadril alto, pernas esticadas
   para trás, e empilha Uke: o quadril de Uke sai do chão e o joelho direito vai para o peito dele. A cabeça de Tori fica
   colada na barriga de Uke. Tori anda com os pés para +z (lado do braço de baixo), girando em volta da cabeça
   (yaw 180 -> 120), a cabeça sobe para o peito de Uke, e no fim tira o ombro de baixo da perna e cai no controle lateral
   do lado direito de Uke (yaw 90). */
const ukeBase={x:0,y:.14,z:0,yaw:0,pitch:-90,roll:0,h:-12,gf:0,
 leg:{R:B('o',.12,.02,-.15),L:B('o',.12,.02,.15)},
 arm:{R:B('s',.30,.36,.14),L:B('s',.30,.36,-.14)},
 pole:{legR:[1,0,.4],legL:[1,0,-.4],armR:[.2,-.6,.7],armL:[.2,-.6,-.7]}};
const toriBase={x:.66,y:.50,z:0,yaw:180,pitch:12,roll:0,h:-15,gf:1,
 leg:{R:W3(1.02,.04,-.17),L:W3(1.02,.04,.17)},
 arm:{R:SL('legL',.05),L:SL('legR',.05)},
 pole:{legR:[1,-.6,.1],legL:[1,-.6,-.1],armR:[.2,-.8,.5],armL:[.2,-.8,-.5]}};
/* pegadas da passagem: mão esquerda (por baixo da coxa direita) na calça do quadril direito de Uke;
   mão direita (por cima da coxa esquerda) na calça do quadril esquerdo */
const maoBaixo=B('o',.02,-.08,.24), maoCima=B('o',.10,-.20,-.20);
/* perna direita de Uke por cima do ombro esquerdo de Tori, canela nas costas dele */
const pernaNoOmbro=B('o',-.32,.36,-.20);
/* controle lateral final, como no yoko shiho gatame */
const fim={x:.05,y:.38,z:.45,yaw:90,pitch:92,h:-10,
 leg:{R:W3(.32,.05,.70),L:W3(-.18,.05,.70)},arm:{L:B('o',-.05,.55,-.12),R:B('o',.05,-.12,-.22)},
 pole:{legR:[1,1,.15],legL:[1,1,-.15],armL:[.4,-.5,-1],armR:[.6,-.3,1]}};
Judo.register3d({
 id:'passagem-por-baixo', name:'Passagem por baixo da perna (over-under)', kanji:'', group:'ne', cls:'Jiu-jitsu · Passagem de guarda',
 bjj:'Over-under pass',
 why:'A passagem de pressão por excelência: um braço por baixo de uma perna, o outro por cima da outra, e o peso do corpo dobrando Uke até as pernas dele não servirem para nada.',
 summary:'Passagem de guarda de joelhos, colada. Tori passa um braço por baixo de uma coxa de Uke e o outro por cima da outra, segura a calça no quadril, cola o ombro na coxa de baixo e sobe nas pontas dos pés para empilhar Uke. Com o peso no quadril dele, anda para o lado do braço de baixo, sobe a cabeça para o peito, solta a perna e termina no controle lateral.',
 reading:[{k:'Over',r:'por cima',m:'um braço por cima de uma coxa'},{k:'Under',r:'por baixo',m:'o outro por baixo da outra coxa'}],
 facts:[['Origem','Técnica do jiu-jitsu, sem nome próprio no judô.'],
  ['Pontuação (IBJJF)','Passar a guarda e estabilizar por 3 segundos vale 3 pontos.'],
  ['Para que lado passa','Para o lado do braço que entrou por baixo. Aqui o braço esquerdo de Tori passa por baixo da coxa direita de Uke e Tori termina no lado direito dele.'],
  ['De onde sai','Guarda aberta, borboleta ou meia-guarda, quando Uke deixa uma perna alta e a outra baixa. É a passagem preferida de quem é mais pesado.']],
 errors:[['Quadril baixo no empilhamento','De joelhos, o peso fica no tatame. Tori sobe nas pontas dos pés e põe o peso do quadril no quadril de Uke.'],
  ['Cabeça longe','A cabeça de Tori fica colada na barriga e depois no peito de Uke. Com espaço, Uke encaixa o pé no quadril ou um triângulo.'],
  ['Soltar a perna de cima','O braço por cima prende a coxa de Uke no chão do começo ao fim. Solta, ela volta para a guarda.'],
  ['Passar para o lado errado','Andar para o lado do braço de cima deixa a perna empilhada livre para voltar. Tori anda para o lado do braço de baixo.']],
 safety:['Empilhar dobra o pescoço de Uke: pressão aos poucos e atenção ao tapa.',
  'Os joelhos de Uke não são torcidos: a perna de baixo vai reto para o peito dele.',
  'Treine primeiro com Uke cooperando, depois com resistência leve.'],
 phases:[
 {s:0,e:1.6,kanji:'1',ro:'Guarda aberta',pt:'Tori de joelhos',
  d:'Uke está de costas, com os pés no quadril de Tori. Tori fica de joelhos entre as pernas dele, tronco ereto, as mãos nos joelhos de Uke.',
  l:['Tori ajoelhado, quadril sobre os calcanhares.','As mãos controlam os joelhos de Uke.','Os pés de Uke empurram o quadril de Tori.']},
 {s:1.6,e:3.8,kanji:'2',ro:'Por baixo e por cima',pt:'Um braço em cada perna',
  d:'Tori empurra a coxa esquerda de Uke para baixo com o braço direito, por cima dela, e passa o braço esquerdo por baixo da coxa direita. A coxa direita fica no ombro esquerdo de Tori e as duas mãos seguram a calça no quadril de Uke.',
  l:['Braço esquerdo por baixo da coxa direita de Uke.','Braço direito por cima da coxa esquerda, prendendo-a no chão.','Ombro colado na parte de trás da coxa de baixo.']},
 {s:3.8,e:6.2,kanji:'3',ro:'Empilhar',pt:'Quadril alto, peso no quadril',
  d:'Tori sobe nas pontas dos pés com as pernas esticadas para trás e o quadril alto. O peso desce pelo ombro e leva o joelho direito de Uke em direção ao peito dele: o quadril de Uke sai do chão. A cabeça de Tori fica colada na barriga de Uke.',
  l:['Pernas esticadas, nas pontas dos pés.','O ombro dobra a perna de Uke contra o peito dele.','Cabeça colada na barriga: sem espaço.']},
 {s:6.2,e:8.4,kanji:'4',ro:'Andar',pt:'Para o lado do braço de baixo',
  d:'Sem tirar o peso, Tori anda com os pés para o lado direito de Uke, o lado do braço de baixo, girando em volta da própria cabeça. A cabeça sobe da barriga para o peito de Uke.',
  l:['Os pés andam, o peito não sai de cima.','O braço de cima segura a outra perna no chão.','A cabeça sobe até o peito de Uke.']},
 {s:8.4,e:11,kanji:'5',ro:'Controle lateral',pt:'Soltar a perna, 100 quilos',
  d:'Tori tira o ombro de baixo da perna direita de Uke, que desce, e cai com o peito no peito dele, de lado, com o braço esquerdo por baixo da cabeça. Com 3 segundos estáveis, a passagem vale pontos.',
  l:['A perna sai do ombro por último.','Peito no peito, quadril baixo, joelhos colados em Uke.','Três segundos estáveis: 3 pontos na regra da IBJJF.']}],
 rep:[.8,3.2,5.4,7.6,10], cover:5.4,
 views:[
  {name:'Lado da passagem',a:-30,e:30,center:[.25,.35,.2],span:3.0},
  {name:'Pelo lado de cima',a:150,e:30,center:[.25,.35,.1],span:3.0},
  {name:'De cima',a:-90,e:88,center:[.25,0,.25],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.6,{}],
 /* a mão direita leva o joelho esquerdo de Uke para baixo e para fora; a esquerda escorrega para baixo da coxa direita */
 [2.3,{uke:{leg:{L:W3(.56,.07,-.30)},pole:{legL:[.6,0,-1]}},
       tori:{pitch:30,arm:{R:SL('legL',.0),L:B('o',.05,-.20,.22)},pole:{armL:[.3,-1,-.6]}}}],
 /* a perna direita de Uke sobe para o ombro esquerdo; braço esquerdo por baixo, mão na calça do quadril */
 [3.0,{uke:{leg:{R:pernaNoOmbro},pole:{legR:[1,.5,.3]}},
       tori:{x:.60,y:.44,pitch:52,h:0,arm:{R:maoCima,L:maoBaixo},pole:{armR:[.4,-.3,.9],armL:[.3,-1,-.5]}}}],
 [3.8,{tori:{x:.58,y:.42,pitch:62}}],
 /* sobe nas pontas dos pés, pernas para trás */
 [4.6,{tori:{x:.56,y:.60,pitch:100,h:10,leg:{R:W3(1.26,.04,-.22),L:W3(1.26,.04,.20)},pole:{legR:[1,0,.15],legL:[1,0,-.15]}},
       uke:{x:.02,y:.22,pitch:-102,h:-25}}],
 /* empilhado: quadril de Uke no ar, joelho direito no peito dele */
 [5.4,{tori:{x:.53,y:.69,pitch:114,h:15},uke:{x:.04,y:.28,pitch:-110,h:-35}}],
 [6.2,{uke:{arm:{R:W3(-.42,.07,.36)},pole:{armR:[0,.2,1]}}}],
 /* anda com os pés para +z, girando em volta da cabeça */
 [7.0,{tori:{x:.46,z:.20,yaw:155,leg:{R:W3(1.10,.04,.10),L:W3(1.06,.04,.56)}}}],
 [7.8,{tori:{x:.30,z:.38,yaw:130,pitch:112,leg:{R:W3(.86,.04,.52),L:W3(.70,.04,.92)}}}],
 [8.4,{tori:{x:.20,z:.48,yaw:118}}],
 /* a perna direita de Uke sai por cima das costas de Tori, para o lado dos pés */
 [8.8,{uke:{y:.20,pitch:-100,leg:{R:W3(.58,.72,.36)},pole:{legR:[1,.3,.3]}}}],
 /* tira o ombro de baixo da perna: a perna de Uke desce, Uke volta a deitar */
 [9.2,{tori:{x:.12,y:.45,z:.46,yaw:100,pitch:100,h:0,leg:{R:W3(.50,.05,.80),L:W3(.05,.05,.86)},
        arm:{L:B('o',-.02,.40,.20)},pole:{legR:[1,.6,.15],legL:[1,.6,-.15],armL:[.4,-.5,-1]}},
       uke:{x:0,y:.14,pitch:-90,h:-12,leg:{R:W3(.74,.07,.22),L:W3(.72,.07,-.22)},
        arm:{R:W3(-.56,.06,.54)},pole:{legR:[1,0,.3],legL:[1,0,-.3],armR:[0,.3,1]}}}],
 [10,{tori:fim}],
 [11,{}]],
 aperto:[{s:2.2,e:9.4,limbs:['T.L.arm','T.R.arm'],tol:.12,tudo:true},{s:2.6,e:9.0,limbs:['U.R.leg'],tol:.12,tudo:true},
  {s:9.4,e:11,limbs:['T.L.arm','T.R.arm','T.R.leg','T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.hip[0],F.tori.hip[1]+.45,F.tori.hip[2]+.2],uke:[F.uke.head[0]-.1,F.uke.head[1]+.3,F.uke.head[2]-.25]}),
 glow:{s:1.6,e:8.4,limbs:{'T.L.arm':'force','T.R.arm':'gold'}},
 stamp:{s:9.8,e:11,big:'3 pts',small:'PASSAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('pés de Uke no quadril',U.legR.H,6,-3,C.uke,a);
  api.tag('Tori de joelhos',T.legL.E,6,3,C.force,a);
  a=win(t,1.7,3.9);
  api.tag('braço por baixo da coxa',T.armL.E,6,-4,C.force,a);
  api.tag('braço por cima da coxa',T.armR.E,-6,3,C.gold,a);
  a=win(t,3.9,6.3);
  api.tag('pontas dos pés, quadril alto',T.legR.H,4,4,C.force,a);
  api.tag('cabeça colada na barriga',T.head,-6,-3,C.force,a);
  api.tag('quadril de Uke no ar',U.hip,-6,4,C.uke,a);
  a=win(t,6.3,8.5);
  api.arrow(T.legL.H,api.add(T.legL.H,[-.15,0,.3]),C.force,a);
  api.tag('anda para o lado do braço de baixo',T.legL.H,5,3,C.force,a);
  a=win(t,8.5,99);
  api.tag('controle lateral',api.bp(T,.12,.38,0),3,-7,C.force,a);}
});})();
