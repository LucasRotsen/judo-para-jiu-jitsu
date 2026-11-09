(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, cabeça para -x, quadril em x=.15; direita de Uke = +z.
   Tori começa montado, virado para a cabeça de Uke (yaw 180: direita de Tori = -z).
   O braço preso é o DIREITO de Uke: Tori o empurra por cima do rosto até o lado esquerdo (-z),
   encosta a cabeça nele (lado -z), passa o braço esquerdo por trás do pescoço e fecha as mãos.
   Depois desmonta para o lado direito de Uke (+z), o lado oposto ao da cabeça, e aperta. */
const ukeBase={x:.15,y:.13,z:0,yaw:0,pitch:-90,h:8,gf:0,
 leg:{R:W3(1.0,.06,.16),L:W3(1.0,.06,-.16)},arm:{R:B('o',.16,.36,-.11),L:B('o',.16,.36,.11)},
 pole:{armR:[.2,-.6,.8],armL:[.2,-.6,-.8]}};
const toriBase={x:.05,y:.40,z:0,yaw:180,pitch:8,h:0,gf:0,
 leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('o',.14,.26,-.13),L:B('o',.14,.30,.15)},
 pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5],armR:[-.3,-.8,-.4],armL:[-.3,-.8,.4]}};
/* Braço direito de Uke atravessado no rosto: cotovelo sobre o queixo, mão além da orelha esquerda. */
const across=W3(-.62,.24,-.20);
/* Fechamento das mãos (palma com palma), logo atrás do pescoço, do lado esquerdo de Uke. */
const clasp=W3(-.42,.11,-.25);
/* Batidas no tatame, ao lado esquerdo de Uke (o braço livre não cruza o corpo de Tori). */
const tapAt=W3(-.02,.06,-.50),tapUp=W3(-.02,.24,-.50);
Judo.register3d({
 id:'kata-gatame', name:'Kata Gatame', kanji:'肩固', group:'ne', cls:'Ne-waza · Shime-waza',
 bjj:'Triângulo de braço (arm triangle)',
 why:'O estrangulamento que usa o próprio ombro de Uke, da montada aos 100 quilos, em três ângulos para ver o braço e a cabeça fecharem o pescoço.',
 summary:'Estrangulamento com o braço de Uke. Da montada, Tori empurra o braço de Uke por cima do rosto, encosta a cabeça nele e fecha as mãos atrás do pescoço. O ombro de Uke aperta um lado do pescoço e o braço de Tori aperta o outro.',
 reading:[{k:'肩',r:'kata',m:'ombro'},{k:'固',r:'gatame',m:'imobilização'}],
 facts:[['Grupo','Katame-waza › Osaekomi-waza no Kodokan; no jiu-jitsu é usado como estrangulamento'],
  ['A ideia','O ombro do próprio Uke vira uma das paredes do estrangulamento. A outra é o braço de Tori atrás do pescoço.'],
  ['Para que lado descer','Para o lado oposto ao da cabeça de Tori. Aqui a cabeça fica do lado esquerdo de Uke, e Tori desce para o lado direito dele.'],
  ['No jiu-jitsu','Triângulo de braço, ou arm triangle. Sai da montada, dos 100 quilos e da meia-guarda por cima.']],
 errors:[['Ficar montado para apertar','Montado, o ângulo não fecha. Desça para o lado e baixe o quadril.'],
  ['Cabeça longe do braço','Se a cabeça não cola no braço de Uke, ele recolhe o braço e o espaço volta.'],
  ['Apertar com os bíceps','O aperto vem de juntar os cotovelos e empurrar com o peito e o ombro, não de puxar com os braços.'],
  ['Quadril alto','Com o quadril alto o peso sai do peito de Uke. Pernas abertas, quadril perto do chão.']],
 safety:['Solte imediatamente quando o parceiro bater ou disser “bati”.',
  'Aperte de forma progressiva: o estrangulamento sanguíneo faz efeito em poucos segundos.',
  'Pratique o encaixe sem apertar. O aperto completo só com um professor por perto.'],
 phases:[
 {s:0,e:1.4,kanji:'馬乗り',ro:'Montada',pt:'Uke empurra',
  d:'Tori está montado sobre o quadril de Uke. Para tirar Tori de cima, Uke estica os braços e empurra o peito dele.',
  l:['Os joelhos de Tori ficam colados nas costelas de Uke.','Braço esticado empurrando é a porta de entrada.','Tori não briga com a força: usa o braço que vem.']},
 {s:1.4,e:3.2,kanji:'崩し',ro:'Kuzushi',pt:'Braço por cima do rosto',
  d:'Tori segura o cotovelo direito de Uke e empurra o braço dele por cima do rosto, até o outro lado da cabeça. O ombro direito de Uke fica colado no próprio pescoço.',
  l:['Empurre pelo cotovelo, não pelo punho.','O braço de Uke atravessa o rosto dele.','O ombro de Uke já fecha um lado do pescoço.']},
 {s:3.2,e:4.8,kanji:'固め',ro:'Encaixe',pt:'Cabeça no braço, mãos fechadas',
  d:'Tori desce o peito, encosta a cabeça no braço de Uke, do lado esquerdo do rosto dele, e passa o braço esquerdo por trás do pescoço. As mãos se fecham palma com palma.',
  l:['A cabeça de Tori prende o braço contra o rosto de Uke.','O braço passa por trás do pescoço, rente ao tatame.','Pegada palma com palma, ou mão no próprio bíceps.']},
 {s:4.8,e:6.6,kanji:'横',ro:'Desmontar',pt:'Descer para o lado',
  d:'Sem abrir a pegada, Tori tira a perna de cima e desce para o lado direito de Uke, o lado oposto ao da cabeça. Fica de lado, com o peito sobre o peito de Uke e as pernas abertas.',
  l:['Desça para o lado oposto ao da cabeça.','O peito continua pesado durante a troca.','Pernas abertas e quadril baixo dão a base.']},
 {s:6.6,e:10.6,kanji:'絞め',ro:'Shime',pt:'Juntar os cotovelos',
  d:'Tori baixa o quadril, empurra com o ombro e junta os cotovelos. O ombro de Uke aperta um lado do pescoço e o braço de Tori aperta o outro. Uke bate e Tori solta na hora.',
  l:['Juntar os cotovelos, não puxar com os bíceps.','O peso desce pelo ombro, na direção do tatame.','Bateu, soltou. Sem exceção.']}],
 rep:[.7,2.5,4.2,5.9,8.4], cover:8.0,
 views:[
  {name:'Pela cabeça',a:-65,e:22,center:[-.1,.42,.25],span:2.7},
  {name:'Do outro lado',a:200,e:18,center:[0,.3,.15],span:2.7},
  {name:'De cima',a:-90,e:80,center:[.22,.2,.3],span:3.4}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 [2.4,{tori:{pitch:22,arm:{L:B('o',.18,.42,.02)}},uke:{arm:{R:W3(-.52,.36,-.05)}}}],
 [3.2,{tori:{pitch:30,arm:{L:across},pole:{armL:[-.3,-.8,.2]}},uke:{arm:{R:across,L:B('o',.10,.30,.18)},pole:{armR:[1,0,0]}}}],
 [4.2,{tori:{x:.12,y:.34,z:.02,yaw:162,pitch:84,h:25,leg:{R:W3(.48,.05,-.30),L:W3(.60,.05,.32)},
        arm:{L:clasp,R:clasp},pole:{legR:[-.2,1,.5],legL:[-.2,1,-.5],armL:[1,.5,-1],armR:[-1,0,1]}},
       uke:{arm:{L:W3(-.10,.12,-.50)}}}],
 [4.8,{}],
 [5.7,{tori:{x:.04,y:.30,z:.22,yaw:145,pitch:80,h:35,leg:{R:W3(.45,.05,.05),L:W3(.52,.05,.78)},pole:{legR:[-.2,1,.6],legL:[-.2,1,-.5]}}}],
 [6.6,{tori:{x:-.04,y:.26,z:.40,yaw:130,pitch:75,h:45,leg:{R:W3(.50,.05,.62),L:W3(.05,.05,1.05)},pole:{legR:[.2,1,.4],legL:[.2,1,-.4],armL:[1,-1,0]}}}],
 [7.4,{tori:{y:.25,h:50}}],
 [8.2,{tori:{y:.25}}],
 [8.6,{uke:{arm:{L:tapAt}}}],
 [8.85,{uke:{arm:{L:tapUp}}}],
 [9.1,{uke:{arm:{L:tapAt}}}],
 [9.35,{uke:{arm:{L:tapUp}}}],
 [9.6,{uke:{arm:{L:tapAt}}}],
 [10.6,{tori:{y:.34,h:30,arm:{L:W3(-.30,.06,-.34)}},uke:{arm:{L:W3(-.10,.12,-.50)}}}]],
 names:F=>({tori:[F.tori.hip[0],F.tori.hip[1]+.45,F.tori.hip[2]],uke:[F.uke.legR.H[0]-.15,F.uke.legR.H[1]+.12,F.uke.legR.H[2]+.2]}),
 glow:{s:3.2,e:8.6,limbs:{'U.R.arm':'gold','T.L.arm':'force'}},
 stamp:{s:8.6,e:10.4,big:'参った',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('Uke empurra com os braços esticados',U.armR.E,-4,-5,C.info,a);
  a=win(t,1.5,3.4);
  api.tag('empurra o cotovelo por cima do rosto',U.armR.E,-1,-5,C.force,a);
  a=win(t,3.3,5.0);
  api.tag('cabeça cola no braço de Uke',T.head,3,-7,C.force,a);
  api.tag('braço por trás do pescoço',T.armL.E,6,4,C.force,a);
  a=win(t,4.9,6.8);
  api.tag('desce para o lado oposto ao da cabeça',T.hip,6,-5,C.force,a);
  a=win(t,6.7,9.0);
  api.tag('ombro de Uke fecha um lado',U.armR.E,-2,-9,C.gold,a);
  api.ring(U.neck,.09,C.info,a);
  api.tag('braço de Tori fecha o outro',T.armL.E,-6,5,C.force,a);
  api.tag('quadril baixo, cotovelos juntos',T.hip,3,4,C.force,a);
  a=win(t,8.7,10.4);
  api.tag('Uke bate: solte na hora',U.armL.H,5,-4,C.uke,a);}
});})();
