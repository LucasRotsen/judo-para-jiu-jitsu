(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, quadril na origem, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori chega pelo lado DIREITO de Uke (z>0): ajoelhado de frente para Uke (yaw 90, direita de Tori = +x),
   pega o braço direito de Uke, gira para ficar de frente para a cabeça dele (yaw 180, direita de Tori = -z, colada em Uke)
   e senta com o quadril direito junto à axila direita de Uke. Como no vídeo da Kodokan (NDaQuJOFBYk):
   braço direito de Tori por baixo do pescoço de Uke, braço direito de Uke preso na axila esquerda de Tori com o
   antebraço apontando para cima atrás do ombro dele, perna direita de Tori à frente quase esticada, esquerda dobrada atrás. */
const ukeBase={x:0,y:.13,z:0,yaw:0,pitch:-90,roll:0,h:-5,gf:0,
 leg:{R:W3(.84,.08,.15),L:W3(.84,.08,-.15)},arm:{R:B('s',.14,.10,.10),L:W3(-.10,.06,-.36)},
 pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[0,-.3,1],armL:[0,.4,-1]}};
const toriBase={x:.02,y:.55,z:.74,yaw:90,pitch:8,roll:0,h:12,
 leg:{R:W3(.15,.07,.44),L:W3(-.10,.07,1.10)},arm:{R:B('s',.24,.02,.13),L:B('s',.16,-.02,-.15)},
 pole:{legR:[1,.4,.2],legL:[1,-.8,-.1],armR:[-.3,-.8,.4],armL:[-.3,-.8,-.4]}};
/* kesa-gatame: sentado ao lado, tronco inclinado à frente e caído sobre o peito de Uke */
const kesa={x:-.12,y:.17,z:.40,yaw:160,pitch:65,roll:20,h:35,
 leg:{R:W3(-1.00,.07,.80),L:W3(-.02,.07,.86)},
 arm:{R:B('o',-.08,.52,-.12),L:SL('armR',.25)},
 pole:{legR:[.3,.2,-1],legL:[.4,.9,-.6],armR:[.6,-.8,-.3],armL:[-.2,-1,-.6]}};
/* braço direito de Uke: cotovelo na axila esquerda de Tori, antebraço para cima por fora do ombro esquerdo dele */
const presoR=B('o',-.12,.62,-.24);
Judo.register3d({
 id:'kesa-gatame', name:'Kesa Gatame', kanji:'袈裟固',
 cls:'Ne-waza · Osaekomi-waza', group:'ne',
 bjj:'Kesa-gatame (scarf hold)',
 why:'A imobilização lateral mais clássica do judô e uma posição de controle de primeira no jiu-jitsu. Em três ângulos para ver o braço em volta do pescoço, o braço de Uke preso na axila e a base das pernas.',
 summary:'Imobilização lateral. Tori senta ao lado de Uke, prende o braço direito dele debaixo da própria axila e passa o braço direito por baixo do pescoço. O peito pesa sobre o peito de Uke e as pernas abertas, a direita à frente e a esquerda atrás, seguram a ponte.',
 reading:[{k:'袈裟',r:'kesa',m:'a faixa que o monge budista usa atravessada no peito'},{k:'固',r:'gatame',m:'imobilização'}],
 facts:[['Grupo','Ne-waza (luta de solo) › Osaekomi-waza (imobilizações)'],
  ['Pontuação no judô','Pelas regras atuais da IJF, 10 segundos de osaekomi valem waza-ari e 20 segundos valem ippon.'],
  ['O nome','O braço de Tori atravessa o peito e o pescoço de Uke como a faixa do monge (kesa) atravessa o tronco.'],
  ['Variação comum','Kuzure kesa gatame: em vez de abraçar o pescoço, o braço direito de Tori entra por baixo da axila esquerda de Uke.'],
  ['No jiu-jitsu','Mesma posição, chamada de kesa-gatame ou scarf hold. É um controle lateral de onde saem a chave de braço com as pernas e a pegada nas costas.']],
 errors:[['Braço de Uke solto','Se o braço preso escapa da axila, Uke vira de frente para Tori, encaixa o cotovelo e pega as costas.'],
  ['Pernas juntas','Sem base larga, a ponte de Uke rola Tori por cima do corpo dele.'],
  ['Quadril longe','O quadril de Tori fica colado na axila de Uke. Com espaço, Uke vira de lado e tira o quadril.'],
  ['Sentar reto','O peso precisa cair no peito de Uke. Tronco ereto deixa o peso no próprio quadril e Uke respira e se mexe.']],
 safety:['O controle vem do peso no peito, não de espremer o pescoço. Braço em volta do pescoço não é estrangulamento.',
  'Uke bate (maitta) se sentir dor no ombro ou falta de ar. Tori alivia na hora.',
  'Treine a ponte de Uke e a resposta de Tori com resistência leve primeiro, aumentando aos poucos.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'lado',a:'T.quadril',de:'U.tronco',lado:'direita',s:3.2,e:'fim',min:.1,txt:'Tori senta do lado DIREITO de Uke'},
  {c:'contato',a:'T.antebracoR',b:'U.pescoco',s:3.6,e:'fim',txt:'o braço direito de Tori passa por baixo do pescoço de Uke'}],
 phases:[
 {s:0,e:1.4,kanji:'姿勢',ro:'Shisei',pt:'Chegada pelo lado',
  d:'Uke está de costas no tatame. Tori chega pelo lado direito dele e ajoelha na altura da faixa, de frente para Uke: joelho esquerdo no chão, pé direito plantado.',
  l:['Tori fica perto, mas sem encostar ainda.','Joelho esquerdo no chão, joelho direito para cima.','Os olhos já procuram o braço direito de Uke.']},
 {s:1.4,e:3.2,kanji:'作り',ro:'Tsukuri',pt:'Pegar o braço',
  d:'Tori segura o braço direito de Uke com as duas mãos, a esquerda no punho e a direita perto do cotovelo, e o puxa para cima, junto ao próprio peito. Ao mesmo tempo gira para ficar de frente para a cabeça de Uke.',
  l:['O braço de Uke vem para o peito de Tori, esticado.','Tori gira sobre os joelhos para o lado da cabeça de Uke.','Quem controla o braço controla a virada de Uke.']},
 {s:3.2,e:5.0,kanji:'固め',ro:'Kime',pt:'Encaixe',
  d:'Tori senta com o quadril direito colado na axila direita de Uke e prende o braço dele debaixo da axila esquerda, segurando a manga perto do cotovelo. O braço direito passa por baixo do pescoço de Uke. As pernas abrem: a direita à frente, a esquerda dobrada atrás.',
  l:['Braço de Uke preso entre a axila e a mão esquerda de Tori.','Braço direito por baixo do pescoço, mão no tatame ou na gola.','Peito de Tori caído sobre o peito de Uke, cabeça baixa.']},
 {s:5.0,e:7.6,kanji:'受',ro:'Upa',pt:'Ponte de Uke',
  d:'Uke dobra os joelhos, planta os pés e faz a ponte, tentando rolar Tori por cima do próprio corpo. Tori abre ainda mais as pernas, afunda o quadril e acompanha a ponte com o peito colado.',
  l:['A ponte levanta o quadril de Uke e tenta virar para a esquerda dele.','A perna direita de Tori escora à frente, a esquerda atrás: tripé largo.','Tori não solta o braço preso nem o pescoço.']},
 {s:7.6,e:10.6,kanji:'抑込',ro:'Osaekomi',pt:'Controle mantido',
  d:'A ponte perde força e Uke volta a ficar achatado. Tori devolve todo o peso ao peito dele e segue imobilizando. Pelas regras da IJF, 20 segundos assim valem ippon.',
  l:['Peso no peito, não no tatame.','Base larga o tempo todo.','Se Uke virar de frente, Tori troca para outra imobilização.']}],
 rep:[.7,2.4,4.4,6.4,9.0], cover:9.0,
 views:[
  {name:'Pela cabeça',a:-50,e:42,center:[-.35,.15,.50],span:3.6},
  {name:'Do outro lado',a:180,e:14,center:[-.05,.35,.30],span:3.0},
  {name:'De cima',a:0,e:88,center:[-.15,0,.35],span:3.0}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 /* Tori se inclina e pega o braço direito de Uke: esquerda no punho, direita perto do cotovelo */
 [2.1,{tori:{z:.70,y:.50,pitch:50,h:20,arm:{L:SL('armR',.92),R:SL('armR',.15)},pole:{armR:[.2,-.6,.8],armL:[.2,-.6,-.6]}}}],
 /* puxa o braço para o peito e começa a girar para a cabeça de Uke */
 [2.7,{tori:{x:-.10,y:.48,z:.66,yaw:120,pitch:30,h:15},
       uke:{arm:{R:B('o',.30,.44,-.08)},pole:{armR:[.3,.4,1]}}}],
 /* a perna direita sai para fora antes de ir à frente, sem passar por baixo do braço de Uke */
 [3.05,{tori:{leg:{R:W3(-.30,.14,.80)},pole:{legR:[.6,.6,-.3]}}}],
 /* desce o quadril ao lado da axila de Uke, perna direita vai à frente */
 [3.4,{tori:{x:-.24,y:.30,z:.48,yaw:160,pitch:30,roll:25,h:18,
        leg:{R:W3(-.80,.07,.80),L:W3(.18,.07,1.0)},arm:{R:B('o',.10,.66,.12),L:SL('armR',.2)},
        pole:{legR:[.4,.4,-1],legL:[.4,.9,-.6],armR:[.3,-.8,.6],armL:[-.1,-1,-.6]}},
       uke:{arm:{R:B('o',.08,.34,-.44)},pole:{armR:[0,-.7,.7]}}}],
 /* o braço de Uke contorna o lado esquerdo de Tori e fica preso na axila */
 [3.8,{uke:{arm:{R:presoR}}}],
 /* encaixe: braço por baixo do pescoço, braço de Uke na axila, peito sobre o peito */
 [4.2,{tori:kesa}],
 [5.0,{}],
 /* Uke dobra os joelhos e planta os pés */
 [5.7,{uke:{leg:{R:W3(.46,.07,.22),L:W3(.46,.07,-.22)},pole:{legR:[1,.2,.3],legL:[1,.2,-.3]}}}],
 /* ponte: quadril sobe e Uke tenta rolar para a esquerda; Tori abre as pernas e afunda */
 [6.3,{uke:{y:.30,roll:-18,pitch:-98,h:-12,arm:{L:W3(-.15,.06,-.42)}},
       tori:{y:.22,z:0.44,roll:16,leg:{R:W3(-1.08,.07,.98),L:W3(.30,.07,1.06)}}}],
 [6.8,{uke:{y:.28,roll:-12}}],
 /* Uke cai de volta; Tori devolve o peso */
 [7.4,{uke:{y:.13,roll:0,pitch:-90,h:-5},tori:{y:.17,z:.40,roll:20,pitch:65}}],
 [7.6,{}],
 [8.4,{uke:{leg:{R:W3(.70,.07,.20),L:W3(.70,.07,-.20)}}}],
 [10.6,{}]],
 names:F=>({tori:[F.tori.hip[0]+.1,F.tori.hip[1]+.55,F.tori.hip[2]+.35],uke:[F.uke.legR.H[0]-.1,.40,F.uke.legR.H[2]-.3]}),
 glow:{s:3.2,e:5.4,limbs:{'T.R.arm':'force','T.L.arm':'force','U.R.arm':'gold'}},
 stamp:{s:4.6,e:10.6,big:'抑込',small:'OSAEKOMI'},
 aperto:[{s:3.2,e:10.6,limbs:['T.R.arm','T.L.arm'],tol:.10,tudo:true},{s:3.6,e:10.6,limbs:['U.R.arm'],tol:.10,tudo:true,fiel:true}],
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('Tori chega pelo lado direito de Uke',T.head,4,-4,C.force,a);
  api.tag('Uke de costas no tatame',api.bp(U,.1,.25,-.15),4,4,C.uke,a);
  a=win(t,1.5,3.3);
  api.tag('as duas mãos no braço direito de Uke',T.armL.H,-6,-4,C.force,a);
  a=win(t,3.3,5.1);
  api.tag('braço por baixo do pescoço',T.armR.E,-6,4,C.force,a);
  api.tag('braço de Uke preso na axila',U.armR.E,5,-4,C.gold,a);
  api.tag('quadril colado na axila de Uke',T.hip,6,3,C.force,a);
  a=win(t,5.1,7.7);
  api.arrow(api.add(U.hip,[0,.2,0]),api.add(U.hip,[0,.42,-.25]),C.uke,win(t,5.6,6.8));
  api.tag('Uke faz a ponte',api.add(U.hip,[0,.42,-.25]),0,-1.6,C.uke,a,false);
  api.tag('pernas abertas: tripé largo',T.legR.E,-4,4,C.force,win(t,5.9,7.7));
  a=win(t,7.7,99);
  api.tag('peso no peito de Uke',api.bp(T,.12,.38,0),3,-7,C.force,a);
  api.tag('base larga',T.legL.E,5,3,C.force,a);}
});})();
