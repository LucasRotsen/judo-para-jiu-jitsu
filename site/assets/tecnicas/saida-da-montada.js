(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori está POR BAIXO, de costas, cabeça para -x (yaw 180, pitch 90, roll 180: direita = +z).
   Uke está montado, sentado no quadril de Tori e virado para a cabeça dele (yaw 180: direita de Uke = -z).
   Tori prende o braço DIREITO de Uke e o pé DIREITO de Uke com o próprio pé esquerdo: os dois estão do lado esquerdo de Tori (-z).
   A ponte sai por cima do ombro esquerdo de Tori: o roll de Tori vai de 180 a 360 (de costas -> de bruços pela esquerda)
   e Uke tomba para a direita dele (-z) e para a frente, caindo de costas com a cabeça para (-x,-z).
   Cabeças vistas de cima: a de Tori sai do chão em -x e sobe por cima de Uke; a de Uke vai de cima de Tori para (-x,-z) e fica lá. */
const toriBase={x:.15,y:.13,z:0,yaw:180,pitch:90,roll:180,h:20,gf:0,
 leg:{R:W3(.58,.06,.20),L:W3(.58,.06,-.20)},arm:{R:B('o',.10,.05,-.15),L:B('o',.10,.05,.15)},
 pole:{legR:[1,0,.25],legL:[1,0,-.25],armR:[-1,0,.3],armL:[-1,0,-.3]}};
const ukeBase={x:.05,y:.40,z:0,yaw:180,pitch:8,roll:0,h:0,gf:0,
 leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('o',.14,.30,-.10),L:B('o',.14,.30,.10)},
 pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5],armR:[0,-.5,1],armL:[0,-.5,-1]}};
Judo.register3d({
 id:'saida-da-montada', name:'Saída da montada (upa)', kanji:'', group:'ne', cls:'Jiu-jitsu · Fuga',
 bjj:'Upa (bridge and roll)',
 why:'A primeira fuga que se aprende no jiu-jitsu. Quem está por baixo da montada prende um lado de quem está por cima e usa a ponte para virar o jogo.',
 summary:'Fuga da montada por ponte e rolamento. Tori, por baixo, prende o braço de Uke contra o peito e o pé do mesmo lado com o próprio pé, faz a ponte alta por cima do ombro desse lado e rola. Uke não tem braço nem pé para apoiar, cai de costas e Tori termina por cima, dentro da guarda dele.',
 reading:[{k:'Upa',r:'upa',m:'ponte de quadril para virar quem está montado'}],
 facts:[['Origem','Jiu-jitsu. No judô a mesma fuga existe para sair de tate-shiho-gatame.'],
  ['Mesmo lado','Braço e pé presos são do mesmo lado de Uke. Aqui o braço direito e o pé direito: os dois ficam do lado esquerdo de Tori.'],
  ['Para onde rola','Para o lado preso. Sem o braço e sem o pé desse lado, Uke não tem como apoiar e tomba por cima do ombro esquerdo de Tori.'],
  ['Onde termina','Tori sai por cima, de joelhos dentro da guarda de Uke. Não vale pontos de raspagem, mas tira Tori da pior posição do jogo.']],
 errors:[['Ponte sem prender','Sem o braço e o pé presos, Uke apoia a mão ou o pé no chão e a ponte não vira ninguém.'],
  ['Prender braço e pé de lados opostos','O lado que rola precisa estar todo preso. Braço de um lado e pé do outro deixam um apoio livre.'],
  ['Ponte reta para cima','A ponte vai para cima e por cima do ombro do lado preso, não reta. Reta, Uke só sobe e desce.'],
  ['Cair dentro da guarda sem postura','Depois de rolar, Tori levanta o tronco e controla o quadril de Uke. Curvado para a frente, vira alvo de estrangulamento.']],
 safety:['Na ponte, empurre com os pés e o quadril, não com o pescoço. O peso fica nos ombros.',
  'Quem é rolado não deve apoiar o braço preso esticado no chão: caia com o ombro encolhido.',
  'Treine devagar e com um professor qualificado.'],
 phases:[
 {s:0,e:2.0,kanji:'1',ro:'Montada',pt:'Uke por cima, mãos no peito',
  d:'Tori está de costas e Uke está montado no quadril dele, joelhos no chão dos dois lados e mãos apoiadas no peito de Tori. Tori mantém os cotovelos fechados junto ao corpo.',
  l:['Cotovelos colados no corpo.','Pés no chão perto do quadril, prontos para a ponte.','Tori ainda não empurra: primeiro prende.']},
 {s:2.0,e:3.8,kanji:'2',ro:'Braço',pt:'Prender o braço contra o peito',
  d:'Tori segura o braço direito de Uke com as duas mãos, uma no punho e outra acima do cotovelo, e prende esse braço contra o próprio peito. Uke não consegue mais apoiar essa mão no chão.',
  l:['As duas mãos no mesmo braço.','O braço fica colado no peito de Tori.','É o braço do lado para onde Tori vai rolar.']},
 {s:3.8,e:5.4,kanji:'3',ro:'Pé',pt:'Prender o pé do mesmo lado',
  d:'Tori passa o pé esquerdo por fora do pé direito de Uke e prende o tornozelo dele contra o chão. O pé direito de Tori fica plantado perto do quadril, pronto para empurrar.',
  l:['Pé de Tori por fora do pé de Uke.','Braço e pé presos do MESMO lado de Uke.','O outro pé de Tori fica perto do quadril.']},
 {s:5.4,e:7.4,kanji:'4',ro:'Upa',pt:'Ponte por cima do ombro e rolar',
  d:'Tori faz a ponte: empurra com os pés, levanta o quadril bem alto e leva Uke para a frente. No alto da ponte, vira por cima do ombro esquerdo, o lado preso. Uke não tem mão nem pé para apoiar e cai de costas.',
  l:['Quadril alto, peso nos ombros.','A ponte vai por cima do ombro do lado preso.','Tori rola junto, sem soltar o braço.']},
 {s:7.4,e:10.5,kanji:'5',ro:'Guarda',pt:'Postura dentro da guarda',
  d:'Tori cai peito no peito, entre as pernas de Uke, que fecha a guarda. Logo em seguida Tori levanta o tronco, fica de joelhos e apoia as mãos no quadril de Uke. Saiu de baixo da montada.',
  l:['Coluna reta, cabeça alta.','Mãos no quadril de Uke.','Joelhos abertos, base firme.']}],
 rep:[1.0,3.0,4.8,6.4,9.2], cover:6.4,
 views:[
  {name:'Lado da ponte',a:180,e:16,center:[-.1,.55,-.25],span:3.0},
  {name:'Pela cabeça de Tori',a:-60,e:24,center:[-.1,.66,-.25],span:3.2},
  {name:'De cima',a:-90,e:88,center:[-.1,0,-.3],span:2.9}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 /* braço: mão esquerda de Tori no punho direito de Uke, mão direita acima do cotovelo */
 [2.4,{tori:{arm:{L:SL('armR',.85),R:SL('armR',.15)},pole:{armR:[0,-.3,1],armL:[0,-.5,-1]}}}],
 [3.2,{tori:{h:25},uke:{pitch:16,arm:{R:B('o',.16,.30,-.08)},pole:{armR:[-.2,-.6,1]}}}],
 [3.8,{}],
 /* pé: o pé esquerdo de Tori sobe e desce por fora do pé direito de Uke */
 [4.3,{tori:{leg:{L:W3(.48,.22,-.44)},pole:{legL:[1,0,-.6]}}}],
 [4.8,{tori:{leg:{L:W3(.34,.06,-.46),R:W3(.52,.06,.18)},pole:{legL:[.8,0,-.8]}}}],
 [5.4,{}],
 /* ponte (conferida no vídeo ZVeW0-YIiqg): quadril de Tori bem alto, ombros e cabeça no chão, pés plantados;
    Uke é jogado para a frente quase na horizontal, joelhos fora do chão, e posta a mão livre no chão além da cabeça de Tori */
 [6.0,{tori:{x:.06,y:.42,z:-.03,pitch:55,roll:195,h:10},
       uke:{x:-.20,y:.52,z:-.05,pitch:78,roll:8,h:10,leg:{L:W3(.22,.12,.30)},arm:{L:W3(-.82,.08,.24)},pole:{armL:[0,-.3,-1],legL:[.2,-1,-.4],legR:[.2,-1,.4]}}}],
 [6.2,{}],
 /* virada por cima do ombro esquerdo de Tori; Uke tomba para a direita dele, as pernas passam por cima */
 [6.6,{tori:{x:.04,y:.40,z:-.16,yaw:172,pitch:68,roll:262,h:0,leg:{L:W3(.46,.10,-.12)},pole:{legL:[1,-.3,0]}},
       uke:{x:-.24,y:.42,z:-.36,yaw:165,pitch:72,roll:95,leg:{R:W3(.36,.06,-.40),L:W3(.18,.58,-.02)},arm:{L:B('s',.30,.30,-.35)},pole:{armL:[0,-.3,-1],legR:[.3,-1,-.3],legL:[1,0,-.3]}}}],
 /* Uke cai de costas; Tori cai peito no peito, entre as pernas dele, que ficam no alto */
 [7.1,{tori:{x:.10,y:.32,z:-.20,yaw:150,pitch:78,roll:345,h:15,arm:{L:SL('armR',.85),R:SL('armR',.15)},leg:{R:W3(.46,.06,.08),L:W3(.30,.06,-.16)},pole:{legR:[-1,-.3,.3],legL:[-1,-.3,-.3],armR:[0,0,1],armL:[0,0,-1]}},
       uke:{x:-.12,y:.17,z:-.45,yaw:140,pitch:88,roll:180,h:20,leg:{R:B('o',-.15,-.15,-.36),L:W3(.27,.55,-.52)},arm:{L:B('s',.20,.30,-.30)},pole:{legR:[1,.3,.4],legL:[1,.3,-.4]}}}],
 /* Uke fecha a guarda; Tori ainda baixo */
 [7.6,{tori:{x:.14,y:.36,z:-.19,yaw:140,pitch:62,roll:360,h:5,leg:{R:W3(.54,.05,-.03),L:W3(.32,.05,.19)},pole:{legR:[1,-.5,.3],legL:[1,-.5,-.3]}},
       uke:{x:-.06,y:.19,z:-.40,yaw:135,pitch:84,leg:{R:B('o',-.17,.10,.06),L:B('o',-.17,.10,-.06)}}}],
 /* postura: Tori levanta o tronco, de joelhos, mãos no quadril de Uke */
 [8.4,{tori:{x:.18,y:.42,z:-.17,yaw:135,pitch:15,roll:360,h:-5,
        arm:{R:B('o',.14,.04,-.16),L:B('o',.14,.04,.16)},pole:{armR:[-1,-.5,.3],armL:[-1,-.5,-.3]}},
       uke:{x:-.04,y:.20,z:-.38,yaw:135,pitch:82,roll:180,h:15,leg:{R:B('o',-.17,.08,.06),L:B('o',-.17,.08,-.06)},
        arm:{R:SL('armL',.3),L:SL('armR',.3)},pole:{legR:[1,.3,.3],legL:[1,.3,-.3],armR:[0,-.3,1],armL:[0,-.3,-1]}}}],
 [10.5,{}]],
 /* pernas de Uke fechadas em volta da cintura de Tori, braço de Uke preso no peito de Tori */
 aperto:[{s:2.2,e:6.8,limbs:['U.R.arm','T.R.arm','T.L.arm'],tol:.10},{s:4.4,e:6.2,limbs:['T.L.leg'],tol:.10,tudo:true},
  {s:7.2,e:10.5,limbs:['U.R.leg','U.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],
  uke:[F.uke.head[0],Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.head[2]]}),
 glow:{s:2.2,e:7.4,limbs:{'T.R.arm':'force','T.L.arm':'force','T.L.leg':'gold'}},
 stamp:{s:8.2,e:10.5,big:'Upa',small:'FUGA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,2.0);
  api.tag('cotovelos fechados',T.armR.E,6,3,C.force,a);
  a=win(t,2.1,4.0);
  api.tag('braço preso contra o peito',U.armR.E,-7,-3,C.force,a);
  a=win(t,3.9,5.6);
  api.tag('pé por fora do pé de Uke',T.legL.H,5,3,C.gold,a);
  api.tag('mesmo lado do braço preso',U.armR.H,-7,-3,C.info,a);
  a=win(t,5.6,7.0);
  api.tag('ponte alta, por cima do ombro',T.hip,6,-3,C.force,a);
  api.tag('sem apoio deste lado',U.shR,-8,4,C.info,a);
  a=win(t,8.2,10.5);
  api.tag('postura: tronco reto',T.head,6,-3,C.force,a);
  api.tag('guarda fechada',U.legR.E,-6,3,C.info,a);}
});})();
