(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180) e gira para a esquerda até ficar de costas (yaw 360:
   olha para +x, direita = +z, do mesmo lado da direita de Uke). O braço direito de Tori entra sob a
   axila direita de Uke; Uke passa por cima do ombro direito de Tori e cai de costas à frente dele,
   com a cabeça junto aos pés de Tori. Tori desce para o norte-sul (kami-shiho-gatame). */
const DX=.43; // deslocamento do norte-sul em relação ao kami-shiho-gatame.js
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,.08),L:B('o',.20,.26,.27)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.42,-.08),L:SL('armR',.7)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.6]}};
const belt={R:B('o',.02,.1,.25),L:B('o',.02,.1,-.25)};
Judo.register3d({
 id:'ippon-seoi-nage', name:'Ippon Seoi Nage', kanji:'一本背負投',
 cls:'Nage-waza · Te-waza', group:'nage',
 bjj:'Seoi nage de um braço',
 why:'A projeção que termina com o oponente de costas e sua cabeça junto aos pés dele: entrada direta para o norte-sul.',
 summary:'Projeção pelas costas usando um braço. Tori (quem aplica) carrega Uke (quem recebe) sobre o ombro e o projeta à frente. Depois da queda, Tori desce junto e estabiliza no chão.',
 reading:[{k:'一本',r:'ippon',m:'um (braço)'},{k:'背負',r:'seoi',m:'carregar nas costas'},{k:'投',r:'nage',m:'projeção'}],
 facts:[['Grupo','Nage-waza (projeções) › Te-waza (técnicas de mão)'],['Gokyo','1º grupo (Dai-ikkyo), dentro de seoi-nage'],
  ['Direção do kuzushi','Para frente, puxando para o canto direito à frente de Uke'],
  ['No jiu-jitsu','Funciona com pegada de manga e gola. Como Uke cai de costas com a cabeça perto dos pés de Tori, a passagem para o norte-sul ou para os 100 quilos é imediata.']],
 errors:[['Quadril alto','Se o quadril de Tori fica na altura do de Uke ou acima, não há alavanca. Uke só se apoia nas costas e trava o golpe.'],
  ['Espaço entre os corpos','Costas longe do peito de Uke deixam ele contornar o quadril ou pegar as costas, algo comum no jiu-jitsu.'],
  ['Soltar o hikite','Sem a puxada da manga até o fim, Uke cai de lado ou de cabeça e Tori perde o controle.'],
  ['Força só de braço','A projeção vem das pernas que estendem e do tronco que gira. Os braços apenas prendem e guiam.']],
 safety:['Aprenda e pratique apenas com um professor qualificado, em tatame, e com um parceiro que já domina o ukemi (técnica de queda).',
  'Comece sem projetar: repita só a entrada (uchikomi) muitas vezes antes de executar a queda completa.',
  'Tori nunca solta a manga durante a queda. É ela que mantém a cabeça de Uke longe do chão.'],
 phases:[
 {s:0,e:1.2,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Tori segura a manga direita de Uke com a mão esquerda e a gola com a mão direita. Os dois começam em postura natural (shizentai), com joelhos destravados.',
  l:['Hikite: a mão esquerda na manga, perto do cotovelo. É a mão que puxa.','Tsurite: a mão direita na gola. Na forma clássica ela solta a gola na entrada.','Distância de um braço dobrado entre os dois.']},
 {s:1.2,e:3.2,kanji:'崩し',ro:'Kuzushi',pt:'Desequilíbrio',
  d:'Tori puxa a manga para frente e para cima, como quem olha o relógio de pulso, e avança o pé direito para a frente do pé direito de Uke. O peso de Uke vai para a ponta dos pés.',
  l:['O centro de gravidade de Uke chega na borda da base de apoio.','A puxada não para mais até o fim do golpe.','Sem desequilíbrio, Uke resiste com as pernas e o golpe trava.']},
 {s:3.2,e:5.5,kanji:'作り',ro:'Tsukuri',pt:'Entrada e encaixe',
  d:'Tori gira sobre o pé direito (mawari-komi), traz o pé esquerdo para trás e encosta as costas no peito de Uke. O braço direito entra por baixo da axila de Uke e a dobra do cotovelo prende o braço dele contra o ombro.',
  l:['Joelhos flexionados: o quadril de Tori fica abaixo da faixa de Uke.','Pés paralelos, entre ou logo à frente dos pés de Uke.','Costas coladas. Qualquer espaço vira rota de fuga para Uke.']},
 {s:5.5,e:7.4,kanji:'掛け',ro:'Kake',pt:'Execução',
  d:'Tori estende as pernas, inclina o tronco à frente e gira para a esquerda, sem parar de puxar a manga em direção ao próprio quadril. Uke sai do chão e passa por cima do ombro direito de Tori.',
  l:['A força vem das pernas e da rotação do tronco, não dos braços.','O ombro direito de Tori é o eixo da rotação.','O olhar acompanha o giro, para a esquerda e para baixo.']},
 {s:7.4,e:9,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas à frente de Tori. Tori mantém a manga presa para frear a queda e proteger a cabeça de Uke. Em competição, uma queda assim, de costas, com força, velocidade e controle, vale ippon.',
  l:['A manga fica presa até Uke tocar o tatame.','Uke faz ukemi: queixo no peito e braço livre batendo no chão.','Tori termina estável, pronto para continuar.']},
 {s:9,e:12.5,kanji:'上四方',ro:'Norte-sul',pt:'Jiu-jitsu: controle no chão',
  d:'Sem dar tempo para Uke se recuperar, Tori desce junto e estabiliza por cima, peito contra peito, na posição norte-sul (no judô, kami-shiho-gatame). É a saída natural do seoi nage: Uke cai com a cabeça junto aos pés de Tori.',
  l:['Tori solta a manga só quando o peito já pressiona o de Uke.','Joelhos no tatame e quadril baixo: o peso vai todo para o peito de Uke.','As mãos agarram a faixa ou o gi pelas laterais e fecham os espaços.']}],
 rep:[.6,2.8,4.8,6.4,8.2,11.5], cover:6.4,
 views:[
  {name:'Lado direito',a:8,e:10,center:[.15,.98,0],span:3.2},
  {name:'Frente e direita de Tori',a:50,e:14,center:[.3,1.05,0],span:4.4},
  {name:'De cima',a:0,e:90,center:[.3,0,0],span:3.2}],
 xray:{s:3.9,e:5.6,key:'U.R.arm'},
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* kuzushi: passo do pé direito, puxada da manga para frente e para cima */
 [1.9,{tori:{x:.20,leg:{R:W3(.02,.12,-.08)}},uke:{pitch:8}}],
 [2.6,{tori:{x:.14,yaw:200,pitch:2,leg:{R:W3(-.02,.07,.10)}},
       uke:{y:.97,pitch:10,h:4,arm:{R:B('o',.24,.62,.12)},pole:{armR:[.4,-.6,.6]}}}],
 [3.2,{}],
 /* tsukuri: giro sobre o pé direito; o braço direito busca a axila de Uke */
 [3.45,{tori:{arm:{R:B('o',.26,.42,.12)}}}],
 [3.7,{tori:{x:.14,y:.88,yaw:265,pitch:10,leg:{L:W3(.14,.14,.26)},
        arm:{R:B('o',.16,.36,.26)},pole:{armR:[0,1,.3]}},
       uke:{arm:{R:B('o',.0,.66,.24),L:W3(-.05,1.05,-.32)}}}],
 [4.5,{tori:{x:-.05,y:.74,z:.04,yaw:358,pitch:22,h:12,leg:{R:W3(-.02,.07,.16),L:W3(-.08,.07,-.12)},
        arm:{R:B('s',.17,.62,.12),L:SL('armR',.78)},pole:{armR:[-.2,.8,.8],armL:[.3,-.6,-.6]}},
       uke:{x:-.33,y:.95,pitch:24,h:12,arm:{R:B('o',.17,.50,.17),L:B('o',-.16,.30,-.22)},
        pole:{armR:[.3,.9,.2],armL:[.2,-.5,-.6]}}}],
 [5.5,{}],
 /* kake: pernas estendem, tronco inclina e gira; Uke passa por cima do ombro direito */
 [6.0,{tori:{y:.82,yaw:362,pitch:52,h:22},
       uke:{x:-.10,y:1.46,z:.08,yaw:4,pitch:78,h:10,gf:0,leg:{R:B('s',-.08,-.86,.12),L:B('s',-.10,-.84,-.12)},
        arm:{R:B('o',.26,.40,.08)}}}],
 [6.5,{tori:{y:.86,yaw:372,pitch:50,h:22,arm:{R:B('s',.26,.18,.32)}},
       uke:{x:.38,y:1.44,z:.04,yaw:8,pitch:122,roll:-10,h:-10,leg:{R:B('s',.12,-.74,.14),L:B('s',.10,-.72,-.10)},
        arm:{R:B('o',.37,.29,.08),L:B('s',.1,.25,-.45)}}}],
 [6.75,{uke:{x:.60,y:1.16,z:.03,yaw:6,pitch:175,roll:-8,h:-15,leg:{R:B('s',.18,-.66,.13),L:B('s',.16,-.64,-.11)}}}],
 [7.0,{tori:{y:.84,yaw:370,pitch:42,h:15,arm:{R:B('s',.32,.22,.22)}},
       uke:{x:.74,y:.80,z:.02,yaw:4,pitch:225,roll:-5,h:-20,leg:{R:B('s',.1,-.85,.12),L:B('s',.06,-.84,-.12)},
        arm:{R:B('o',.40,.15,.10),L:B('s',.05,0,-.50)}}}],
 [7.4,{tori:{y:.82,yaw:360,pitch:55,h:10},
       uke:{x:.35+DX,y:.14,z:0,yaw:0,pitch:270,roll:0,h:-20,gf:1,leg:{R:W3(1.55,.07,.20),L:W3(1.55,.07,-.20)},
        arm:{R:B('s',.50,.38,.10),L:B('s',0,.15,-.48)}}}],
 [8.4,{tori:{y:.82,pitch:52,h:8},uke:{h:-25}}],
 [9.0,{}],
 /* norte-sul: Tori recua, ajoelha junto à cabeça de Uke e deita peito contra peito */
 [9.8,{tori:{x:-.26,y:.62,yaw:360,pitch:40,h:15,leg:{R:W3(-.60,.07,.24),L:W3(-.52,.07,-.24)},
        arm:{R:B('o',.05,.45,.30),L:B('o',.05,.45,-.30)},pole:{armR:[.4,-.3,1],armL:[.4,-.3,-1],legR:[1,-.6,.35],legL:[1,-.6,-.35]}},
       uke:{h:-8,leg:{R:W3(1.16+DX,.08,.2),L:W3(1.16+DX,.08,-.2)},arm:{R:W3(.22+DX,.06,.36),L:W3(.22+DX,.06,-.36)},
        pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[0,.4,1],armL:[0,.4,-1]}}}],
 [10.6,{tori:{x:-.66+DX,y:.34,pitch:85,h:35,leg:{R:W3(-1.36+DX,.06,.34),L:W3(-1.36+DX,.06,-.34)},arm:belt,
         pole:{legR:[.6,-1,.4],legL:[.6,-1,-.4],armR:[1,.3,.6],armL:[1,.3,-.6]}},
        uke:{arm:{R:B('o',-.13,.40,.16),L:B('o',-.13,.40,-.16)},pole:{armR:[.4,-.5,1],armL:[.4,-.5,-1]}}}],
 [12.5,{}]],
 names:F=>({tori:[F.tori.head[0]+.12,Math.max(F.tori.head[1],F.tori.hip[1])+.22,F.tori.head[2]],
  uke:[F.uke.hip[0]-.15,Math.max(F.uke.head[1],F.uke.hip[1])+.22,F.uke.hip[2]-.2]}),
 glow:{s:3.5,e:5.7,limbs:{'T.R.arm':'force','U.R.arm':'gold'}},
 stamp:{s:7.45,e:9.2,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('hikite: puxa a manga',T.armL.H,4,-3.5,C.force,a);
  api.tag('tsurite: gola',T.armR.H,-7,-3.5,C.force,a);
  a=win(t,1.3,3.3);
  if(a>0){const ch=api.bp(U,.1,.45,0);api.arrow(ch,api.add(ch,[.32,.18,0]),C.force,a);
   api.tag('puxada: frente e para cima',api.add(ch,[.32,.18,0]),1,-2.6,C.force,a,false);
   api.tag('pé direito à frente do pé de Uke',T.legR.H,6,.5,C.gold,a);}
  a=win(t,3.5,5.6);
  api.tag('cotovelo de Tori sob a axila de Uke',T.armR.E,7,.4,C.force,a);
  api.tag('braço de Uke preso',api.lerp3(U.armR.root,U.armR.E,.5),-5.5,-2.4,C.gold,a);
  a=win(t,4.4,5.6);
  if(a>0){const ub=api.bp(U,0,.1,0),tb=api.bp(T,0,.1,0);
   api.dashed([ub[0],ub[1],ub[2]],[ub[0]+.8,ub[1],ub[2]],C.uke,a,1.8);
   api.dashed([tb[0],tb[1],tb[2]],[tb[0]+.55,tb[1],tb[2]],C.force,a,1.8);
   api.tag('faixa de Uke',ub,-7,0,C.uke,a,false);
   api.tag('faixa de Tori: mais baixa',[tb[0]+.55,tb[1],tb[2]],2,1.6,C.force,a,false);}
  a=win(t,5.5,6.4);
  api.arrow([T.hip[0]+.35,.2,T.hip[2]-.3],[T.hip[0]+.35,.62,T.hip[2]-.3],C.force,a);
  api.tag('pernas estendem',[T.hip[0]+.35,.4,T.hip[2]-.3],5.4,0,C.force,a,false);
  a=win(t,5.8,7.1);
  if(a>0){api.arc(api.add(T.shR,[0,.1,0]),[1,0,0],[0,1,0],.5,160,20,C.force,a);
   api.tag('rotação sobre o ombro direito',api.add(T.shR,[-.1,.72,0]),0,0,C.force,a,false);}
  a=win(t,7.5,9.2);
  api.tag('manga segura até o fim',T.armL.H,6,-2.6,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,-3,3.4,C.uke,a);
  a=win(t,10.2,99);
  api.tag('peito contra peito',api.bp(T,.15,.35,0),6,2.4,C.force,a);
  api.tag('joelhos no tatame, quadril baixo',T.legR.E,2,-3.4,C.force,a);
  api.tag('norte-sul · kami-shiho-gatame',api.add(U.hip,[0,1.0,0]),0,0,C.ink,a,false);}
});})();
