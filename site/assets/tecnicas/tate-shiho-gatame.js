(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke deitado de costas, cabeça para -x, quadril em x=.15; direita de Uke = +z.
   Tori começa no lado direito de Uke (+z), passa o joelho direito por cima da barriga e monta virado para a cabeça (-x). */
const ukeBase={x:.15,y:.13,z:0,yaw:0,pitch:-90,h:8,gf:0,
 leg:{R:W3(1.0,.06,.16),L:W3(1.0,.06,-.16)},arm:{R:B('o',.12,0,.15),L:B('o',.14,.5,-.12)},
 pole:{armR:[.6,-.3,.6],armL:[-.3,-.6,-1]}};
const toriBase={x:-.15,y:.42,z:.57,yaw:90,pitch:84,h:-25,gf:0,
 leg:{R:W3(.15,.05,.75),L:W3(-.45,.05,.75)},arm:{R:B('o',.1,.05,.24),L:B('o',-.02,.68,-.1)},
 pole:{legR:[.3,1,.15],legL:[.3,1,-.15]}};
Judo.register3d({
 id:'tate-shiho-gatame', name:'Tate Shiho Gatame', kanji:'縦四方固',
 cls:'Ne-waza · Osaekomi-waza', group:'ne',
 bjj:'Montada',
 why:'A montada do jiu-jitsu: a posição dominante que vale 4 pontos e abre o caminho para chaves e estrangulamentos.',
 summary:'Imobilização em que Tori monta sobre Uke, sentado no quadril dele e virado para a cabeça. Tori passa o joelho por cima da barriga, fecha os joelhos nas costelas e sobe para a montada alta, abrindo a base quando Uke tenta o upa.',
 reading:[{k:'縦',r:'tate',m:'vertical, no comprimento'},{k:'四方',r:'shiho',m:'quatro lados'},{k:'固',r:'gatame',m:'imobilização'}],
 facts:[['Grupo','Katame-waza › Osaekomi-waza (imobilizações)'],['No judô','A imobilização vale ippon se Uke não escapar em 20 segundos.'],
  ['Fuga clássica','Upa (ponte): Uke prende um braço e um pé do mesmo lado e ergue o quadril para virar Tori.'],
  ['No jiu-jitsu','Montada. Vale 4 pontos ao estabilizar 3 segundos. Da montada alta saem o armlock, o ezequiel e o estrangulamento com a gola.']],
 errors:[['Joelhos abertos','Com espaço entre os joelhos e as costelas, Uke coloca o cotovelo ali e devolve para a meia-guarda.'],
  ['Mãos no peito de Uke','Apoiar as mãos no peito dele deixa os braços expostos ao upa e à chave de braço.'],
  ['Sentar alto demais na barriga','Com o quadril em cima da barriga, a ponte de Uke tem força total para te tirar.'],
  ['Base estreita no upa','Quando Uke ergue o quadril, Tori precisa abrir as mãos para a frente e para os lados da ponte.']],
 safety:['Na montada alta, cuidado com o peso sobre o peito e o pescoço do parceiro. Pressão sem objetivo só machuca.',
  'Treine as fugas e a manutenção em ritmo progressivo, com um professor qualificado.'],
 phases:[
 {s:0,e:2.2,kanji:'横',ro:'Lateral',pt:'Peito no peito',
  d:'Tori começa ao lado de Uke, de joelhos e com o peito pressionando o peito dele. Uke está de costas e empurra o quadril de Tori para criar espaço.',
  l:['O peso fica no peito de Uke, não nos joelhos.','O braço de dentro controla a cabeça; o de fora fecha o quadril.','O joelho de trás já se prepara para passar.']},
 {s:2.2,e:4.2,kanji:'跨',ro:'Passagem',pt:'Joelho cruza a barriga',
  d:'Tori desliza o joelho por cima da barriga de Uke, rente ao corpo, e senta no quadril dele. O peito continua pesado até o joelho tocar o tatame do outro lado.',
  l:['O joelho passa colado na barriga, sem levantar o quadril.','O peito só sobe depois que os dois joelhos estão no chão.','Os pés ficam por baixo das coxas de Uke.']},
 {s:4.2,e:6.0,kanji:'縦',ro:'Montada',pt:'Joelhos colados, quadril pesado',
  d:'Tori está sentado no quadril de Uke, virado para a cabeça dele. Os joelhos apertam as costelas dos dois lados e o peso cai sobre o quadril, tirando a mobilidade de Uke.',
  l:['Joelhos colados nas costelas, sem espaço para o cotovelo.','Quadril pesado e coluna ereta.','Mãos livres, longe do alcance para a chave.']},
 {s:6.0,e:8.0,kanji:'橋',ro:'Upa',pt:'Uke prende um lado e faz a ponte',
  d:'Uke traz os pés para perto do quadril, abraça o braço direito de Tori contra o peito e prende o pé direito dele por fora com o pé esquerdo. Com braço e pé do mesmo lado presos, Uke faz a ponte (upa) para virar Tori por cima do ombro esquerdo. Tori tira o braço, inclina para frente e posta as mãos longe, abrindo a base. Quando o quadril de Uke cai, Tori volta a sentar.',
  l:['Uke prende braço e pé do MESMO lado: é para esse lado que ele vira.','Tori tira o braço preso e posta a mão longe, do lado da ponte.','Inclinar para frente tira a força da ponte.']},
 {s:8.0,e:10.5,kanji:'抑',ro:'Osaekomi',pt:'Montada alta e controle',
  d:'Tori sobe os joelhos até as axilas de Uke (montada alta) e controla a cabeça. Os cotovelos de Uke ficam presos para cima e a ponte perde a força. O árbitro anuncia osaekomi.',
  l:['Joelhos nas axilas: os cotovelos de Uke ficam presos para cima.','Um braço controla a cabeça e o outro faz base.','Daqui saem o armlock e os estrangulamentos.']}],
 rep:[1.1,3.0,5.1,6.7,9.3], cover:5.1,
 views:[
  {name:'Diagonal',a:-130,e:32,center:[0,.52,0],span:2.6},
  {name:'Lateral',a:180,e:10,center:[.1,.5,0],span:2.6},
  {name:'De frente',a:-90,e:18,center:[0,.5,0],span:2.3}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [2.2,{}],
 [3.0,{tori:{x:-.04,y:.52,z:.32,yaw:130,pitch:60,leg:{R:W3(.32,.38,.14),L:W3(-.30,.05,.80)},arm:{R:B('o',.1,.15,-.2)},pole:{legR:[1,.15,.6]}}}],
 [3.3,{tori:{x:0,y:.52,z:.21,yaw:148,pitch:48,leg:{R:W3(.30,.36,-.20)},pole:{legR:[1,.15,.6]}}}],
 [3.6,{tori:{x:.03,y:.52,z:.10,yaw:165,pitch:35,leg:{R:W3(.42,.05,-.38),L:W3(.35,.05,.55)},pole:{legR:[1,-.2,.4]},arm:{R:B('o',.08,.45,-.2),L:B('o',.08,.45,.2)}}}],
 [4.2,{tori:{x:.05,y:.40,z:0,yaw:180,pitch:8,h:0,leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('s',.22,.02,-.24),L:B('s',.22,.02,.24)},
   pole:{legR:[1,-.5,.5],legL:[1,-.5,-.5]}},uke:{arm:{R:B('o',.14,.12,.12),L:B('o',.14,.12,-.12)}}}],
 [5.4,{}],
 [6.0,{uke:{leg:{R:W3(.55,.06,.20),L:W3(.55,.06,-.20)}}}],
 [6.4,{tori:{arm:{R:B('o',.17,.26,-.13)}},
       uke:{leg:{L:W3(.33,.06,-.44)},arm:{L:B('o',.17,-.05,.15),R:B('o',.11,.17,.12)}}}],
 [6.8,{}],
 [7.2,{uke:{y:.30,pitch:-104,roll:-14,leg:{R:W3(.52,.06,.20)},
       arm:{L:B('s',.2,.3,-.1),R:B('s',.2,.3,.1)}},
       tori:{x:-.05,y:.55,pitch:80,h:-10,leg:{R:W3(.38,.10,-.36),L:W3(.38,.10,.30)},arm:{R:W3(-.70,.05,-.52),L:W3(-.78,.05,.40)}}}],
 [7.5,{}],
 [8.0,{uke:{y:.13,pitch:-90,roll:0,leg:{R:W3(.55,.06,.20),L:W3(.55,.06,-.20)},arm:{R:B('o',.14,.12,.12),L:B('o',.14,.12,-.12)},pole:{armR:[.6,-.3,.6],armL:[-.3,-.6,-1]}},
       tori:{x:.05,y:.40,pitch:8,h:0,leg:{R:W3(.27,.05,-.33),L:W3(.27,.05,.33)},arm:{R:B('s',.22,.02,-.24),L:B('s',.22,.02,.24)}}}],
 [8.6,{tori:{x:-.22,y:.44,pitch:78,h:-15,leg:{R:W3(.06,.05,-.37),L:W3(.06,.05,.37)},pole:{legR:[.7,.6,.6],legL:[.7,.6,-.6]},arm:{R:B('o',-.03,.66,-.05),L:W3(-.85,.05,.42)}},
   uke:{leg:{R:W3(1.0,.06,.16),L:W3(1.0,.06,-.16)},arm:{R:B('o',.14,.40,.18),L:B('o',.14,.40,-.18)},pole:{armR:[.6,.3,1],armL:[.6,.3,-1]}}}],
 [10.5,{}]],
 names:F=>({tori:[F.tori.head[0],F.tori.head[1]+.3,F.tori.head[2]],uke:[F.uke.legL.H[0]-.1,.35,F.uke.legL.H[2]]}),
 glow:{s:4.2,e:6.0,limbs:{'T.R.leg':'force','T.L.leg':'force'}},
 stamp:{s:8.8,e:10.5,big:'抑込',small:'OSAEKOMI'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,2.4);
  api.tag('peito no peito',T.sh,6,-5,C.force,a);
  api.tag('joelho pronto para passar',T.legR.E,4,3,C.force,a);
  a=win(t,2.3,4.3);
  api.tag('joelho cruza a barriga',T.legR.E,5,-3,C.force,a);
  a=win(t,4.3,6.1);
  api.tag('quadril pesado',T.hip,-7,-3,C.force,a);
  api.tag('joelhos colados nas costelas',T.legR.E,5,2.5,C.force,a);
  a=win(t,6.05,7.9);
  let b=win(t,6.05,7.0);
  api.tag('Uke prende o braço',U.armL.H,-9,-5,C.info,b);
  api.tag('e o pé do mesmo lado',U.legL.H,4,2.5,C.info,b);
  b=win(t,6.9,7.9);
  api.arrow([U.hip[0],U.hip[1]-.1,-.32],[U.hip[0],U.hip[1]+.35,-.32],C.info,b);api.tag('upa: ponte para o lado preso',[U.hip[0],U.hip[1]+.35,-.32],6,-3,C.info,b,false);
  api.tag('braço sai e posta longe',T.armR.H,-7,-2,C.force,b);
  a=win(t,8.1,10.6);
  api.tag('joelhos nas axilas',T.legR.E,6,2.5,C.force,a);
  api.tag('controle da cabeça',U.head,-8,-3,C.force,a);}
});})();
