(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita = -z). Uke avança e golpeia de cima com o punho direito;
   Tori abaixa, passa por baixo do braço pelo lado direito de Uke (+z) e gira para a direita até ficar atrás dele,
   olhando quase para +x, com a cabeça encostada no lado direito do peito de Uke. O braço esquerdo de Tori abraça a
   cintura pelas costas, a mão direita fica na barriga. Tori levanta Uke com o quadril e cai de costas para -x:
   Uke deita de costas sobre o peito de Tori e passa DE LADO por cima do ombro esquerdo dele (lado -z): a cabeça desce
   inclinada para -z, no máximo 45 graus abaixo da horizontal (nunca na vertical de ponta-cabeça), as pernas passam
   inclinadas, o corpo torce e Uke toca o tatame com ombro e costas juntos, queixo no peito, deitado de costas com a
   cabeça para +x, ao lado da cabeça de Tori. O voo (4,45 a 6,3 s) é gerado como rotação de 180 graus em volta de um
   eixo inclinado (0, cos45, -sen45) mais torção no eixo do corpo, convertida em yaw/pitch/roll a cada 0,05 s.
   Conferido com o vídeo da Kodokan 裏投 / Ura-nage (Fgi9b8DJ5sQ). */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:2,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('s',.06,-.02,.25),L:B('s',.06,-.02,-.25)},
 pole:{armR:[-.3,-.8,.4],armL:[-.3,-.8,-.4]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:2,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('s',.06,-.02,.25),L:B('s',.06,-.02,-.25)},
 pole:{armR:[-.3,-.8,.4],armL:[-.3,-.8,-.4]}};
/* pegada de Tori: braço esquerdo pelas costas até a faixa do lado esquerdo de Uke; mão direita na barriga */
const abraco=B('o',-.02,.10,-.17), barriga=B('o',.15,.08,.03);
Judo.register3d({
 id:'ura-nage', name:'Ura Nage', kanji:'裏投',
 cls:'Nage-waza · Ma-sutemi-waza', group:'nage',
 bjj:'O suplex do judô: abraço pela cintura e queda para trás',
 why:'Mostra como usar o ataque do outro: quem entra curvado e com o peso para frente deixa as costas e a cintura livres. É a mesma pegada do clinch por trás do jiu-jitsu, mas aqui a projeção é de sacrifício e de alto risco.',
 summary:'Projeção de sacrifício para trás. Uke avança para golpear; Tori abaixa o quadril, passa por baixo do braço e fica atrás e ao lado de Uke, com o braço esquerdo abraçando a cintura pelas costas e a mão direita na barriga. Tori levanta Uke com o quadril e cai de costas, jogando Uke por cima do ombro esquerdo. Uke gira, toca o tatame com o ombro e as costas e cai deitado ao lado da cabeça de Tori.',
 reading:[{k:'裏',r:'ura',m:'avesso, parte de trás'},{k:'投',r:'nage',m:'projeção'}],
 facts:[['Grupo','Nage-waza › Sutemi-waza › Ma-sutemi-waza (sacrifício de costas)'],
  ['Gokyo','5º grupo (Dai-gokyo)'],
  ['Nage-no-kata','É a segunda técnica do grupo de ma-sutemi-waza, entre o tomoe nage e o sumi gaeshi. Uke ataca com um golpe de punho de cima para baixo, e Tori entra por baixo do braço.'],
  ['Direção do kuzushi','Para trás de Uke: Tori o levanta e o leva por cima do próprio ombro'],
  ['No jiu-jitsu','A pegada é a do clinch por trás ou de lado. Tori cai de costas e perde a posição de cima; a técnica serve mais para entender o abraço na cintura e o levantamento com o quadril do que para usar em competição.']],
 errors:[['Quadril alto','Tori precisa estar com o quadril abaixo da faixa de Uke. De cima, o quadril não levanta nada e Tori só puxa Uke para trás.'],
  ['Quadril longe','Afastado, o quadril não encaixa embaixo de Uke e a técnica vira um arrasto. O peito e a barriga de Tori ficam colados no flanco e nas costas de Uke.'],
  ['Cair sem levantar','Primeiro as pernas estendem e o quadril empurra Uke para cima. Cair antes disso joga o peso de Uke em cima de Tori.'],
  ['Cair reto para trás','Uke passa por cima do ombro esquerdo de Tori, não por cima da cabeça. Caindo reto, Tori recebe Uke em cima do próprio rosto.']],
 safety:['Só se treina ura nage com ukemi dominado pelos dois e com professor acompanhando, em tatame macio.',
  'Uke rola por cima do ombro de Tori e toca o tatame com o ombro e as costas, com o queixo no peito. Nunca de cabeça.',
  'Comece só com a entrada e o levantamento, devolvendo Uke ao chão em pé. A queda completa vem depois, devagar e com Uke preparado.',
  'Tori também cai de costas com o queixo no peito, e solta a pegada a tempo de Uke fazer o ukemi.'],
 phases:[
 {s:0,e:2.1,kanji:'攻撃',ro:'Kōgeki',pt:'O ataque de Uke',
  d:'Uke avança com o pé direito e levanta o punho direito para golpear de cima para baixo, como no nage-no-kata. Tori espera o golpe com os joelhos destravados.',
  l:['O ura nage é uma resposta: nasce do avanço de Uke.','Uke vem com o peso para frente e o braço no alto.','Tori não recua: vai entrar por baixo do golpe.']},
 {s:2.1,e:3.8,kanji:'作り',ro:'Tsukuri',pt:'Entrar por baixo e abraçar',
  d:'Tori abaixa o quadril, passa por baixo do braço direito de Uke pelo lado direito dele e gira até ficar atrás e ao lado, com o pé esquerdo atrás do calcanhar direito de Uke. O braço esquerdo abraça a cintura pelas costas, a mão direita fica na barriga e a cabeça encosta no lado direito do peito de Uke.',
  l:['Quadril de Tori abaixo da faixa de Uke.','Braço esquerdo pelas costas até a faixa do outro lado.','Mão direita espalmada na barriga, abaixo da faixa.']},
 {s:3.8,e:4.9,kanji:'崩し',ro:'Kuzushi',pt:'Levantar com o quadril',
  d:'Tori estende as pernas e empurra o quadril para frente e para cima, contra Uke. O abraço cola Uke ao peito de Tori, os pés dele saem do chão e o corpo dele inclina para trás.',
  l:['Quem levanta são as pernas e o quadril, não os braços.','A mão na barriga empurra Uke para cima.','Uke fica deitado de costas sobre o peito de Tori.']},
 {s:4.9,e:6.3,kanji:'掛け',ro:'Kake',pt:'Cair de costas e projetar',
  d:'Tori arqueia o corpo e cai de costas, girando um pouco para a esquerda. Uke passa de lado por cima do ombro esquerdo de Tori, gira no ar e toca o tatame com o ombro e as costas, com o queixo no peito.',
  l:['Uke passa pelo ombro esquerdo, não por cima do rosto de Tori.','Queixo no peito: ombro e costas tocam primeiro, nunca a cabeça.','Tori solta a pegada a tempo de Uke bater os braços.']},
 {s:6.3,e:10.5,kanji:'残心',ro:'Zanshin',pt:'Queda e atenção',
  d:'Uke termina deitado de costas, batendo os braços no tatame. Os dois ficam deitados, cabeça ao lado da cabeça, e Tori se mantém atento para virar por cima se Uke se levantar.',
  l:['Uke bate os dois braços e mantém o queixo no peito.','Tori cai de costas, também com o queixo recolhido.','No jiu-jitsu, Tori precisa virar rápido para não ficar por baixo.']}],
 rep:[1.6,3.4,4.6,5.45,7.5], cover:5.3,
 views:[
  {name:'Lateral',a:15,e:10,center:[-.7,.75,0],span:4.4},
  {name:'Por trás de Tori',a:95,e:16,center:[-.7,.7,0],span:4.0},
  {name:'De cima',a:0,e:88,center:[-.75,0,.05],span:3.8}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [0.9,{}],
 /* ataque: Uke avança o pé direito e levanta o punho direito */
 [1.5,{uke:{x:-.20,pitch:6,leg:{R:W3(-.04,.07,.14)},arm:{R:B('s',.14,1.00,.16)},pole:{armR:[.2,.3,1]}},
       tori:{y:.90,pitch:6}}],
 /* Tori vê o golpe e já começa a abaixar e sair para a direita de Uke */
 [1.75,{tori:{x:.26,y:.78,z:.18,yaw:168,pitch:14,h:6}}],
 /* golpe de cima para baixo; Tori abaixa o quadril e sai para o lado direito de Uke (+z) */
 [2.0,{uke:{x:-.18,pitch:14,h:5,arm:{R:B('s',.52,.70,.14)},pole:{armR:[0,-.5,.8]}},
       tori:{x:.20,y:.66,z:.34,yaw:150,pitch:18,h:12,leg:{L:W3(.12,.07,.36)},pole:{legL:[1,-.1,-.3]}}}],
 /* passa por baixo do braço, pelo lado direito de Uke, girando para a direita (yaw decrescente) */
 [2.45,{uke:{pitch:18,arm:{R:B('o',-.05,.52,-.04)},pole:{armR:[.2,.6,1]}},
       tori:{x:.00,y:.64,z:.42,yaw:115,pitch:24,h:10,leg:{L:W3(-.18,.07,.42),R:W3(.26,.07,.26)},
        arm:{R:B('s',.25,.25,.20),L:B('s',.25,.25,-.20)},pole:{armR:[-.2,-.7,.6],armL:[-.2,-.7,-.6]}}}],
 [2.8,{uke:{arm:{R:B('o',-.10,.36,-.02)},pole:{armR:[.2,.8,.6]}},
       tori:{x:-.30,y:.58,z:.36,yaw:55,pitch:24,h:12,leg:{L:W3(-.48,.07,.24),R:W3(.02,.07,.46)}}}],
 /* atrás e ao lado de Uke: pé esquerdo atrás do calcanhar direito dele, braço esquerdo pelas costas, mão na barriga.
    O braço direito de Uke, que errou o golpe, fica por cima das costas de Tori. */
 [3.2,{uke:{x:-.20,pitch:16,arm:{R:B('o',-.14,.34,-.04),L:B('s',.22,.12,-.20)},pole:{armR:[.2,.8,.6],armL:[-.2,-.7,-.5]}},
       tori:{x:-.44,y:.56,z:.30,yaw:20,pitch:24,h:14,leg:{L:W3(-.52,.07,.20),R:W3(-.16,.07,.52)},
        arm:{L:abraco,R:barriga},pole:{armL:[-.4,-.4,-.8],armR:[.2,-.5,.9],legL:[.8,0,.3],legR:[1,-.1,.4]}}}],
 [3.8,{tori:{y:.52,pitch:22}}],
 /* levantar: pernas estendem, quadril empurra para frente e para cima; os pés de Uke saem do chão */
 [4.35,{tori:{x:-.38,y:.70,z:.26,pitch:2,h:18},
       uke:{x:-.20,y:1.04,z:.02,pitch:-4,h:12,gf:0,leg:{R:B('s',.06,-.84,.12),L:B('s',.14,-.83,-.16)},
        arm:{R:B('s',.25,.30,.12),L:B('s',.25,.30,-.14)},pole:{armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6],legR:[1,0,.2],legL:[1,0,-.2]}}}],
 [4.45,{uke:{x:-.2,y:1.06,z:.02,yaw:0,pitch:-8,roll:0,h:13,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.06,-.84,.12),L:B('s',.14,-.83,-.16)}},
   tori:{x:-.38,y:.72,z:.26,yaw:19,pitch:-3,h:19,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.50,{uke:{x:-.21,y:1.08,z:.03,yaw:0,pitch:-9,roll:0,h:13,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.06,-.84,.12),L:B('s',.14,-.83,-.16)}},
   tori:{x:-.38,y:.73,z:.25,yaw:19,pitch:-6,h:19,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.55,{uke:{x:-.21,y:1.09,z:.03,yaw:0,pitch:-12,roll:0,h:14,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.06,-.84,.12),L:B('s',.14,-.83,-.16)}},
   tori:{x:-.38,y:.74,z:.25,yaw:18,pitch:-9,h:20,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.60,{uke:{x:-.22,y:1.1,z:.03,yaw:0,pitch:-15,roll:0,h:15,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.06,-.84,.12),L:B('s',.14,-.83,-.16)}},
   tori:{x:-.38,y:.74,z:.25,yaw:18,pitch:-12,h:20,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.65,{uke:{x:-.23,y:1.11,z:.03,yaw:0,pitch:-19,roll:0,h:16,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.07,-.84,.12),L:B('s',.14,-.83,-.15)}},
   tori:{x:-.39,y:.74,z:.25,yaw:18,pitch:-15,h:20,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.70,{uke:{x:-.25,y:1.12,z:.03,yaw:0,pitch:-24,roll:0,h:18,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.07,-.84,.12),L:B('s',.14,-.83,-.15)}},
   tori:{x:-.39,y:.73,z:.25,yaw:17,pitch:-19,h:21,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.75,{uke:{x:-.27,y:1.13,z:.03,yaw:0,pitch:-29,roll:0,h:20,arm:{R:B('s',.25,.3,.12),L:B('s',.25,.3,-.14)},leg:{R:B('s',.07,-.84,.12),L:B('s',.14,-.83,-.15)}},
   tori:{x:-.4,y:.71,z:.25,yaw:17,pitch:-23,h:21,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.80,{uke:{x:-.29,y:1.14,z:.03,yaw:0,pitch:-35,roll:0,h:22,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.08,-.84,.12),L:B('s',.14,-.83,-.14)}},
   tori:{x:-.41,y:.7,z:.25,yaw:16,pitch:-27,h:22,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.85,{uke:{x:-.32,y:1.14,z:.03,yaw:0,pitch:-42,roll:0,h:24,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.08,-.83,.13),L:B('s',.14,-.82,-.14)}},
   tori:{x:-.42,y:.68,z:.25,yaw:16,pitch:-30,h:22,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.90,{uke:{x:-.36,y:1.13,z:.03,yaw:0,pitch:-50,roll:0,h:25,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.09,-.83,.13),L:B('s',.14,-.82,-.13)}},
   tori:{x:-.43,y:.66,z:.25,yaw:15,pitch:-33,h:22,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [4.95,{uke:{x:-.4,y:1.12,z:.02,yaw:-1,pitch:-61,roll:1,h:27,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.09,-.83,.13),L:B('s',.14,-.82,-.13)}},
   tori:{x:-.44,y:.64,z:.25,yaw:15,pitch:-36,h:23,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [5.00,{uke:{x:-.45,y:1.1,z:.02,yaw:-1,pitch:-71,roll:2,h:28,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.09,-.83,.13),L:B('s',.14,-.82,-.13)}},
   tori:{x:-.44,y:.61,z:.26,yaw:14,pitch:-39,h:23,arm:{L:B('o',-.02,.1,-.17),R:B('o',.15,.08,.03)}}}],
 [5.05,{uke:{x:-.5,y:1.09,z:.01,yaw:0,pitch:-81,roll:2,h:29,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.1,-.83,.13),L:B('s',.14,-.82,-.12)}},
   tori:{x:-.45,y:.59,z:.26,yaw:14,pitch:-41,h:24,arm:{L:B('o',-.02,.1,-.17),R:B('s',.43,.47,-.17)}}}],
 [5.10,{uke:{x:-.55,y:1.08,z:0,yaw:0,pitch:-88,roll:0,h:30,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.1,-.83,.13),L:B('s',.14,-.82,-.12)}},
   tori:{x:-.46,y:.56,z:.26,yaw:13,pitch:-44,h:24,arm:{L:B('o',-.02,.1,-.17),R:B('s',.42,.47,-.14)},leg:{R:W3(-.16,.07,.52),L:W3(-.52,.07,.2)}}}],
 [5.15,{uke:{x:-.6,y:1.09,z:-.02,yaw:-8,pitch:-99,roll:-4,h:31,arm:{R:B('s',.25,.31,.13),L:B('s',.25,.31,-.14)},leg:{R:B('s',.1,-.83,.13),L:B('s',.14,-.82,-.12)}},
   tori:{x:-.47,y:.53,z:.26,yaw:12,pitch:-47,h:24,arm:{L:B('o',-.02,.1,-.17),R:B('s',.4,.49,-.08)},leg:{R:W3(-.16,.07,.52),L:W3(-.51,.07,.2)}}}],
 [5.20,{uke:{x:-.66,y:1.1,z:-.05,yaw:-24,pitch:-110,roll:-8,h:33,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.1,-.83,.13),L:B('s',.14,-.82,-.12)}},
   tori:{x:-.48,y:.51,z:.27,yaw:12,pitch:-49,h:24,arm:{L:B('o',-.02,.1,-.17),R:B('s',.38,.5,.01)},leg:{R:W3(-.15,.07,.51),L:W3(-.48,.07,.19)}}}],
 [5.25,{uke:{x:-.72,y:1.1,z:-.08,yaw:-40,pitch:-120,roll:-9,h:34,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.1,-.83,.13),L:B('s',.14,-.82,-.12)}},
   tori:{x:-.49,y:.48,z:.27,yaw:12,pitch:-52,h:24,arm:{L:B('s',.39,.41,-.46),R:B('s',.35,.52,.12)},leg:{R:W3(-.15,.07,.51),L:W3(-.44,.08,.19)}}}],
 [5.30,{uke:{x:-.78,y:1.09,z:-.11,yaw:-57,pitch:-128,roll:-7,h:35,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.09,-.83,.13),L:B('s',.13,-.82,-.12)}},
   tori:{x:-.5,y:.45,z:.27,yaw:11,pitch:-55,h:24,arm:{L:B('s',.34,.39,-.47),R:B('s',.33,.53,.21)},leg:{R:W3(-.14,.07,.5),L:W3(-.39,.08,.18)}}}],
 [5.35,{uke:{x:-.85,y:1.07,z:-.13,yaw:-73,pitch:-133,roll:-4,h:36,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.09,-.83,.13),L:B('s',.13,-.82,-.12)}},
   tori:{x:-.51,y:.41,z:.27,yaw:10,pitch:-59,h:24,arm:{L:B('s',.25,.36,-.48),R:B('s',.31,.55,.27)},leg:{R:W3(-.13,.07,.49),L:W3(-.33,.09,.17)}}}],
 [5.40,{uke:{x:-.92,y:1.02,z:-.16,yaw:-90,pitch:-135,roll:0,h:36,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.08,-.83,.13),L:B('s',.12,-.82,-.12)}},
   tori:{x:-.52,y:.37,z:.27,yaw:10,pitch:-64,h:24,arm:{L:B('s',.15,.32,-.49),R:B('s',.3,.55,.3)},leg:{R:W3(-.12,.07,.48),L:W3(-.28,.09,.16)}}}],
 [5.45,{uke:{x:-1.01,y:.94,z:-.18,yaw:-107,pitch:-133,roll:5,h:36,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.07,-.83,.13),L:B('s',.11,-.83,-.12)}},
   tori:{x:-.53,y:.33,z:.27,yaw:9,pitch:-68,h:24,arm:{L:B('s',.1,.3,-.5),R:B('s',.29,.54,.3)},leg:{R:W3(-.11,.07,.47),L:W3(-.23,.09,.15)}}}],
 [5.50,{uke:{x:-1.11,y:.83,z:-.21,yaw:-125,pitch:-127,roll:8,h:36,arm:{R:B('s',.25,.32,.14),L:B('s',.25,.32,-.14)},leg:{R:B('s',.06,-.83,.13),L:B('s',.1,-.83,-.12)}},
   tori:{x:-.54,y:.29,z:.27,yaw:8,pitch:-72,h:23,arm:{L:B('s',.09,.3,-.5),R:B('s',.26,.51,.31)},leg:{R:W3(-.11,.07,.47),L:W3(-.19,.1,.15)}}}],
 [5.55,{uke:{x:-1.2,y:.72,z:-.22,yaw:-140,pitch:-120,roll:9,h:36,arm:{R:B('s',.24,.32,.16),L:B('s',.24,.31,-.16)},leg:{R:B('s',.05,-.83,.13),L:B('s',.09,-.83,-.12)}},
   tori:{x:-.54,y:.25,z:.27,yaw:8,pitch:-77,h:23,arm:{L:B('s',.08,.29,-.49),R:B('s',.21,.46,.33)},leg:{R:W3(-.1,.07,.46),L:W3(-.16,.1,.14)}}}],
 [5.60,{uke:{x:-1.28,y:.61,z:-.22,yaw:-151,pitch:-114,roll:8,h:36,arm:{R:B('s',.2,.31,.22),L:B('s',.2,.3,-.21)},leg:{R:B('s',.04,-.84,.13),L:B('s',.08,-.83,-.12)}},
   tori:{x:-.55,y:.22,z:.27,yaw:7,pitch:-80,h:22,arm:{L:B('s',.06,.27,-.47),R:B('s',.15,.4,.34)},leg:{R:W3(-.1,.07,.46),L:W3(-.15,.1,.14)}}}],
 [5.65,{uke:{x:-1.36,y:.5,z:-.22,yaw:-160,pitch:-107,roll:6,h:35,arm:{R:B('s',.15,.31,.3),L:B('s',.15,.28,-.27)},leg:{R:B('s',.03,-.84,.13),L:B('s',.07,-.83,-.12)}},
   tori:{x:-.55,y:.19,z:.27,yaw:6,pitch:-83,h:21,arm:{L:B('s',.04,.26,-.46),R:B('s',.1,.35,.36)},leg:{R:W3(-.1,.07,.46),L:W3(-.14,.1,.14)}}}],
 [5.70,{uke:{x:-1.43,y:.39,z:-.22,yaw:-168,pitch:-101,roll:4,h:35,arm:{R:B('s',.1,.31,.37),L:B('s',.1,.27,-.33)},leg:{R:B('s',.02,-.84,.13),L:B('s',.06,-.84,-.12)}},
   tori:{x:-.56,y:.17,z:.27,yaw:6,pitch:-85,h:21,arm:{L:B('s',.01,.24,-.44),R:B('s',.04,.29,.37)},leg:{R:W3(-.08,.07,.46),L:W3(-.13,.1,.14)}}}],
 [5.75,{uke:{x:-1.5,y:.3,z:-.22,yaw:-173,pitch:-96,roll:2,h:34,arm:{R:B('s',.06,.3,.43),L:B('s',.06,.26,-.38)},leg:{R:B('s',.01,-.84,.13),L:B('s',.05,-.84,-.12)}},
   tori:{x:-.56,y:.15,z:.27,yaw:5,pitch:-87,h:20,arm:{L:B('s',-.01,.23,-.43),R:B('s',-.01,.24,.39)},leg:{R:W3(-.06,.07,.46),L:W3(-.11,.1,.14)}}}],
 [5.80,{uke:{x:-1.55,y:.23,z:-.22,yaw:-177,pitch:-93,roll:0,h:33,arm:{R:B('s',.05,.3,.45),L:B('s',.05,.25,-.4)},leg:{R:B('s',.01,-.84,.13),L:B('s',.05,-.84,-.12)}},
   tori:{x:-.56,y:.14,z:.27,yaw:5,pitch:-88,h:20,arm:{L:B('s',-.03,.21,-.41),R:B('s',-.04,.21,.4)},leg:{R:W3(-.04,.07,.46),L:W3(-.08,.09,.14)}}}],
 [5.85,{uke:{x:-1.59,y:.18,z:-.22,yaw:-179,pitch:-91,roll:0,h:31,arm:{R:B('s',.03,.28,.47),L:B('s',.03,.2,-.4)},leg:{R:B('s',0,-.84,.13),L:B('s',.04,-.84,-.12)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-89,h:20,arm:{L:B('s',-.04,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(-.01,.07,.45),L:W3(-.05,.09,.14)}}}],
 [5.90,{uke:{x:-1.62,y:.14,z:-.22,yaw:-180,pitch:-90,roll:0,h:30,arm:{R:B('s',-.01,.22,.5),L:B('s',-.01,.08,-.41)},leg:{R:B('s',0,-.84,.13),L:B('s',.04,-.84,-.12)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:19,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.03,.07,.45),L:W3(-.01,.09,.14)}}}],
 [5.95,{uke:{x:-1.63,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:29,arm:{R:B('s',-.04,.17,.53),L:B('s',-.04,-.03,-.42)},leg:{R:B('s',-.02,-.84,.13),L:B('s',.01,-.84,-.12)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:19,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.06,.07,.45),L:W3(.03,.08,.14)}}}],
 [6.00,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:29,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.04,-.84,.14),L:B('s',-.03,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:18,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.09,.07,.45),L:W3(.06,.08,.14)}}}],
 [6.05,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:28,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)},gf:1,pole:{legR:[1,0,.2],legL:[1,0,-.2]}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:17,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.13,.07,.45),L:W3(.1,.08,.14)}}}],
 [6.10,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:27,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:17,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.16,.07,.44),L:W3(.13,.08,.14)},pole:{legR:[1,.3,.2],legL:[1,.3,-.2]}}}],
 [6.15,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:27,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:16,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.18,.07,.44),L:W3(.16,.07,.14)}}}],
 [6.20,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:26,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:16,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.2,.07,.44),L:W3(.18,.07,.14)}}}],
 [6.25,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:25,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:15,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.22,.07,.44),L:W3(.19,.07,.14)}}}],
 [6.30,{uke:{x:-1.62,y:.13,z:-.22,yaw:-180,pitch:-90,roll:0,h:25,arm:{R:B('s',-.06,.15,.55),L:B('s',-.06,-.08,-.42)},leg:{R:B('s',-.06,-.84,.14),L:B('s',-.06,-.84,-.13)}},
   tori:{x:-.56,y:.13,z:.27,yaw:5,pitch:-90,h:15,arm:{L:B('s',-.05,.2,-.4),R:B('s',-.05,.2,.4)},leg:{R:W3(.22,.07,.44),L:W3(.2,.07,.14)}}}],
 [6.6,{}],
 [7.5,{uke:{h:22}}],
 [10.5,{}]],
 /* abraço e mão na barriga encostam em Uke de propósito; o braço direito de Uke fica apoiado nas costas de Tori */
 aperto:[{s:3.0,e:5.4,limbs:['T.L.arm','T.R.arm'],tol:.10,tudo:true},
  {s:2.6,e:4.4,limbs:['U.R.arm'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0]+.1,Math.max(F.tori.head[1],F.tori.hip[1])+.32,F.tori.head[2]+.15],
  uke:[F.uke.hip[0],Math.max(F.uke.head[1],F.uke.hip[1])+.34,F.uke.hip[2]-.1]}),
 glow:{s:3.2,e:5.2,limbs:{'T.L.arm':'force','T.R.arm':'force'}},
 stamp:{s:6.2,e:8.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,1.2,2.3);
  api.tag('golpe de cima para baixo',U.armR.H,-4,-4,C.uke,a);
  a=win(t,2.1,3.4);
  api.tag('passa por baixo do braço',T.head,5,-3,C.force,a);
  a=win(t,3.0,3.95);
  api.tag('braço abraça a cintura pelas costas',T.armL.H,-2,6,C.force,a);
  api.tag('mão na barriga',T.armR.H,6,2,C.force,a);
  a=win(t,3.85,4.4);
  if(a>0){const th=T.hip,ub=api.bp(U,0,.1,0);
   api.dashed([ub[0]-.3,ub[1],ub[2]],[ub[0]+.5,ub[1],ub[2]],C.uke,a,1.8);
   api.dashed([th[0]-.3,th[1],th[2]],[th[0]+.5,th[1],th[2]],C.force,a,1.8);
   api.tag('faixa de Uke',[ub[0]+.5,ub[1],ub[2]],4,-.4,C.uke,a,false);
   api.tag('quadril de Tori mais baixo',[th[0]+.5,th[1],th[2]],4,1.4,C.force,a,false);}
  a=win(t,4.35,5.0);
  api.arrow([T.hip[0]+.3,T.hip[1]-.15,T.hip[2]+.3],[T.hip[0]+.3,T.hip[1]+.30,T.hip[2]+.3],C.force,a);
  api.tag('quadril levanta Uke',[T.hip[0]+.3,T.hip[1]+.1,T.hip[2]+.3],5,0,C.force,a,false);
  a=win(t,4.9,6.0);
  api.tag('por cima do ombro esquerdo',T.shL,-6,-4,C.force,a);
  api.tag('queixo no peito',U.head,6,-2,C.uke,win(t,5.0,6.2));
  a=win(t,6.2,99);
  api.tag('ombro e costas tocam primeiro',U.shR,3,-5,C.uke,a);
  api.tag('ukemi: braços batem no tatame',U.armL.H,5,3.5,C.uke,a);}
});})();
