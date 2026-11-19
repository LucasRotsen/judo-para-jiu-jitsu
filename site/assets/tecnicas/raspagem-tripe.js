(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori deitado de costas, cabeça para -x, pés para +x (yaw 0, direita = +z).
   Uke EM PÉ dentro da guarda aberta, de frente para -x (yaw 180, direita de Uke = -z, esquerda = +z).
   Tripé: a mão ESQUERDA de Tori segura o calcanhar DIREITO de Uke (por fora), o pé ESQUERDO engancha atrás
   do mesmo tornozelo (vindo por dentro das pernas de Uke) e o pé DIREITO empurra o quadril ESQUERDO de Uke.
   Empurra com o pé de cima, puxa o calcanhar: Uke cai sentado para trás (+x), sem cambalhota.
   Tori levanta em base (levantada técnica: mão direita no chão, perna direita passa para trás) segurando o calcanhar. */
const hipPush=B('o',.13,0,-.12), heel=SL('legR',.93), sleeve=SL('armL',.85);
const ukeBase={x:.42,y:.76,z:0,yaw:180,pitch:38,roll:0,h:-8,gf:1,
 leg:{R:W3(.08,.07,-.30),L:W3(.72,.07,.24)},
 arm:{R:SL('legL',.12),L:SL('legR',.18)},
 pole:{legR:[.5,1,.1],legL:[1,-.2,-.1],armR:[-.2,-.6,1],armL:[-.2,-.6,-1]}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-62,roll:0,h:30,gf:0,
 leg:{R:hipPush,L:B('o',.08,.02,.17)},arm:{R:sleeve,L:SL('armR',.85)},
 pole:{legR:[1,.3,.3],legL:[1,.3,-.3],armR:[0,-.8,.6],armL:[0,-.8,-.6]}};
Judo.register3d({
 id:'raspagem-tripe', name:'Raspagem tripé', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Tripé (tripod sweep)',
 why:'Para quem puxa bem para a guarda e trava quando Uke se levanta: em pé, ele deixa os calcanhares ao alcance da mão. O tripé transforma esse momento em raspagem e devolve Tori de pé, por cima.',
 summary:'Raspagem da guarda aberta contra Uke em pé. Tori segura o calcanhar de Uke atrás de um pé, engancha o próprio pé atrás desse tornozelo e põe o outro pé no quadril do lado oposto. Empurra o quadril e puxa o calcanhar ao mesmo tempo: Uke perde a base e cai sentado para trás. Tori levanta em base sem soltar o calcanhar.',
 reading:[{k:'Tripé',r:'tripod sweep',m:'três pontos de contato: dois pés e uma mão'}],
 facts:[['Origem','Jiu-jitsu. Não tem nome próprio no Kodokan; é uma das raspagens básicas contra o adversário em pé.'],
  ['Os três pontos','A mão no calcanhar e o pé atrás do mesmo tornozelo prendem uma perna; o outro pé empurra o quadril do lado oposto.'],
  ['Para que lado ele cai','Para trás, sentado. O calcanhar puxado não pode dar o passo para trás que salvaria o equilíbrio.'],
  ['Quando usar','Quando Uke fica em pé na sua guarda e põe peso na perna da frente. Puxar para a guarda e esperar é o que deixa ele passar.'],
  ['Pontuação','Na regra da IBJJF, raspagem vale 2 pontos quando Tori termina por cima e Uke fica embaixo.']],
 errors:[['Puxar o calcanhar do mesmo lado do pé no quadril','O calcanhar puxado é o do lado oposto ao pé que empurra. Do mesmo lado, Uke só gira e não cai.'],
  ['Empurrar sem puxar','Só empurrar o quadril afasta Uke, que dá um passo para trás. Empurra e puxa ao mesmo tempo, como uma tesoura de braço e perna.'],
  ['Ficar deitado depois','Uke caiu e Tori continua de costas: ele volta para cima de Tori. Levante em base na mesma hora.'],
  ['Soltar o calcanhar ao levantar','Com a perna livre, Uke levanta junto ou recompõe a guarda. Segure até estar de pé.']],
 safety:['Treine devagar: quem é raspado cai sentado e rola para trás com o queixo no peito.',
  'O pé do quadril empurra, não chuta. Nada de pisar no joelho de Uke.',
  'Ao levantar em base, mantenha a mão livre na frente do rosto e não pise no parceiro.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.maoL',b:'U.peR',s:2.6,e:7.0,txt:'a mão ESQUERDA de Tori segura o calcanhar DIREITO de Uke'},
  {c:'contato',a:'T.peL',b:'U.canelaR',s:2.8,e:5.6,txt:'o pé esquerdo engancha atrás do mesmo tornozelo'},
  {c:'lado',a:'T.peR',de:'U.quadril',lado:'esquerda',s:2.8,e:5.6,min:.0,txt:'o pé DIREITO empurra o quadril ESQUERDO de Uke'}],
 phases:[
 {s:0,e:1.8,kanji:'1',ro:'Uke em pé',pt:'Guarda aberta, pés no quadril',
  d:'Uke se levantou dentro da guarda. Tori está de costas, com os dois pés nos quadris dele, a mão direita segura a manga esquerda de Uke e a esquerda segura a manga direita. As mãos de Uke pressionam os joelhos de Tori.',
  l:['Os pés no quadril controlam a distância.','Uke em pé deixa os calcanhares perto da mão de Tori.','É aqui que muita gente só espera: não espere.']},
 {s:1.8,e:4.0,kanji:'2',ro:'Montar o tripé',pt:'Calcanhar, gancho e pé no quadril',
  d:'Tori solta a manga direita e segura por fora o calcanhar direito de Uke com a mão esquerda. O pé esquerdo sai do quadril, desce por dentro das pernas de Uke e engancha atrás do mesmo tornozelo. O pé direito continua no quadril esquerdo de Uke.',
  l:['Mão no calcanhar, pé atrás do tornozelo: a perna fica presa.','O pé de cima fica no quadril do lado oposto.','Três pontos: dois pés e uma mão.']},
 {s:4.0,e:5.6,kanji:'3',ro:'Empurrar e puxar',pt:'Quadril para trás, calcanhar para frente',
  d:'Tori estica a perna direita e empurra o quadril de Uke para trás, enquanto a mão e o gancho puxam o calcanhar direito dele na direção da cabeça de Tori. O quadril de Uke vai para trás e o pé preso não consegue recuar.',
  l:['Empurra e puxa juntos, no mesmo instante.','O pé preso não dá o passo para trás.','Tori solta a manga para Uke cair livre.']},
 {s:5.6,e:7.0,kanji:'4',ro:'Queda',pt:'Uke cai sentado',
  d:'Sem base, Uke cai sentado para trás e deita de costas com o queixo no peito. Tori senta e continua segurando o calcanhar.',
  l:['Uke cai sentado, não rola por cima.','A mão de Tori não larga o calcanhar.','Tori já começa a sentar.']},
 {s:7.0,e:10.6,kanji:'5',ro:'Levantar em base',pt:'De pé, por cima',
  d:'Tori apoia a mão direita no chão atrás, planta o pé esquerdo, levanta o quadril e passa a perna direita para trás. Fica de pé em base na frente de Uke, ainda segurando o calcanhar, pronto para passar a guarda.',
  l:['Mão no chão, pé plantado, perna passa por baixo.','Segure o calcanhar até estar de pé.','De pé e Uke de costas: raspagem completa.']}],
 rep:[.9,3.0,4.9,6.4,9.5], cover:4.9,
 views:[
  {name:'Lado do calcanhar',a:180,e:14,center:[.5,.68,0],span:3.0},
  {name:'Lado do pé no quadril',a:20,e:16,center:[.5,.68,0],span:3.0},
  {name:'De cima',a:0,e:88,center:[.45,0,0],span:2.9}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.8,{}],
 /* a mão esquerda desce da manga até o calcanhar direito de Uke, por fora */
 /* a mão sai por fora da coxa esquerda (a manga estava por dentro das pernas) */
 [2.1,{tori:{arm:{L:W3(-.12,.42,-.42)},pole:{armL:[0,-.5,-.9]}}}],
 [2.5,{tori:{arm:{L:heel},pole:{armL:[0,-.7,-.7]}}}],
 /* o pé esquerdo sai do quadril e desce por dentro das pernas de Uke */
 [3.0,{tori:{leg:{L:W3(.10,.42,-.10)},pole:{legL:[1,.3,-.3]}},uke:{arm:{R:W3(.18,.40,-.16)}}}],
 /* gancho atrás do tornozelo direito de Uke */
 [3.6,{tori:{leg:{L:W3(.19,.14,-.24)},pole:{legL:[1,.2,-.4]}}}],
 [4.0,{}],
 /* empurra o quadril com o pé direito, puxa o calcanhar com a mão e o gancho */
 [4.6,{tori:{pitch:-60,leg:{L:W3(.10,.17,-.26)}},
       uke:{x:.52,y:.76,pitch:20,h:0,gf:0,leg:{R:W3(.02,.14,-.30)},arm:{R:W3(.30,.75,-.35)}}}],
 [5.1,{tori:{arm:{R:B('s',.30,.30,.25)},leg:{L:W3(.10,.30,-.32)},pole:{armR:[0,-.6,1]}},
       uke:{x:.66,y:.60,pitch:0,h:15,leg:{R:W3(.00,.33,-.30),L:W3(.72,.07,.24)},
        arm:{R:W3(.86,.50,-.36),L:W3(.86,.50,.36)},pole:{armR:[-.3,-.5,1],armL:[-.3,-.5,-1]}}}],
 /* Uke cai sentado para trás; o pé direito de Tori sai do quadril */
 [5.6,{tori:{pitch:-50,leg:{R:W3(.35,.35,.16),L:W3(.20,.25,-.18)},pole:{legR:[1,.3,.3]}},
       uke:{x:.66,y:.15,pitch:-30,h:25,leg:{R:W3(.06,.45,-.30),L:W3(.42,.07,.24)},
        arm:{R:W3(.95,.10,-.38),L:W3(.95,.10,.38)},pole:{legL:[1,.3,-.1]}}}],
 /* Uke deita de costas, queixo no peito, e bate os braços; Tori senta segurando o calcanhar */
 [6.3,{tori:{pitch:-35,h:15,arm:{R:W3(-.25,.07,.28)},leg:{R:W3(.16,.08,.32),L:W3(.32,.07,-.12)},
        pole:{armR:[-.2,-.2,1],legR:[.2,-.3,1],legL:[1,0,-.2]}},
       uke:{x:.86,y:.13,pitch:-75,h:35,leg:{R:W3(.15,.52,-.28),L:W3(.56,.14,.30)},
        arm:{R:W3(1.15,.07,-.46),L:W3(1.15,.07,.46)},pole:{armR:[-.3,0,1],armL:[-.3,0,-1]}}}],
 [7.0,{}],
 /* levantada técnica: mão direita e pé esquerdo sustentam, o quadril sobe */
 [7.5,{tori:{x:.02,y:.40,pitch:-20,h:5,leg:{R:W3(.05,.12,.18)},pole:{legR:[.3,-1,.3]}},
       uke:{leg:{R:W3(.22,.60,-.28)}}}],
 /* a perna direita passa para trás e o pé planta */
 [8.0,{tori:{x:.06,y:.62,pitch:20,h:-5,leg:{R:W3(-.28,.07,.16)},arm:{R:B('s',.30,.35,.20)},pole:{legR:[1,-.2,.1],armR:[-.3,-.7,.5]}},
       uke:{leg:{R:W3(.30,.68,-.26)}}}],
 /* de pé em base, um passo para frente, sem soltar o calcanhar */
 [8.6,{tori:{x:.08,y:.82,pitch:28,gf:1,leg:{R:W3(-.14,.07,.16),L:W3(.08,.07,-.18)},pole:{legL:[1,-.2,-.15]}},
       uke:{leg:{R:W3(.34,.62,-.36)}}}],
 [9.2,{tori:{x:.18,y:.76,pitch:40,h:-10,leg:{R:W3(.34,.07,.15),L:W3(.06,.07,-.18)}},
       uke:{x:.92,leg:{R:W3(.40,.62,-.38),L:W3(.54,.07,.34)},pole:{legL:[1,.5,.3]}}}],
 [10.6,{}]],
 /* pé no quadril, gancho atrás do tornozelo e mão no calcanhar tocam Uke de propósito; mãos de Uke nos joelhos de Tori */
 aperto:[{s:0,e:5.4,limbs:['T.R.leg'],tol:.10,tudo:true},{s:0,e:5.6,limbs:['T.L.leg'],tol:.10,tudo:true},
  {s:2.2,e:10.6,limbs:['T.L.arm'],tol:.10,tudo:true},{s:0,e:4.4,limbs:['U.R.arm','U.L.arm','T.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.25,F.tori.head[2]],
  uke:[F.uke.hip[0]+.15,Math.max(F.uke.head[1],F.uke.hip[1])+.24,F.uke.hip[2]]}),
 glow:{s:2.2,e:5.8,limbs:{'T.R.leg':'force','T.L.leg':'gold','T.L.arm':'gold'}},
 stamp:{s:9.0,e:10.6,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.9);
  api.tag('pés no quadril',T.legR.H,5,-3,C.force,a);
  api.tag('Uke em pé',U.head,-5,-3.5,C.info,a);
  a=win(t,2.2,4.2);
  api.tag('mão no calcanhar',T.armL.H,-6,3.5,C.gold,a);
  api.tag('pé atrás do tornozelo',T.legL.H,6,3.5,C.gold,win(t,3.3,4.2));
  api.tag('pé no quadril do outro lado',T.legR.H,6,-3.5,C.force,a);
  a=win(t,4.1,5.7);
  api.arrow(T.legR.H,api.add(T.legR.H,[.3,.05,0]),C.force,a);
  api.tag('empurra o quadril',api.add(T.legR.H,[.3,.05,0]),5,-3,C.force,a,false);
  api.arrow(T.armL.H,api.add(T.armL.H,[-.25,.05,0]),C.gold,a);
  api.tag('puxa o calcanhar',api.add(T.armL.H,[-.25,.05,0]),-5,3.5,C.gold,a,false);
  a=win(t,5.6,7.1);
  api.tag('cai sentado, para trás',U.hip,5,-4,C.uke,a);
  a=win(t,7.1,10.6);
  api.tag('levanta em base',T.hip,-6,-3,C.force,a);
  api.tag('sem soltar o calcanhar',T.armL.H,5,3.5,C.gold,win(t,7.6,10.6));}
});})();
