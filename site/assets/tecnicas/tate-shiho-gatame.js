(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
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
  ['Base estreita no upa','Quando Uke ergue o quadril, Tori precisa abrir a mão e o pé para o lado da ponte.']],
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
  d:'Tori está sentado no quadril de Uke, virado para a cabeça dele. Os joelhos apertam as costelas e o peso cai sobre o quadril, tirando a mobilidade de Uke.',
  l:['Joelhos colados nas costelas, sem espaço para o cotovelo.','Quadril pesado e coluna ereta.','Mãos livres, longe do alcance para a chave.']},
 {s:6.0,e:8.0,kanji:'橋',ro:'Upa',pt:'Uke ergue o quadril; Tori abre a base',
  d:'Uke faz a ponte (upa) para tentar virar Tori. Tori inclina para frente, posta as mãos no tatame além da cabeça de Uke e abre a base. Quando o quadril de Uke cai, Tori volta a sentar.',
  l:['A mão vai para o tatame, longe da cabeça de Uke.','Inclinar para frente tira a força da ponte.','Tori sobe junto, sem resistir de frente.']},
 {s:8.0,e:10.5,kanji:'抑',ro:'Osaekomi',pt:'Montada alta e controle',
  d:'Tori sobe os joelhos até as axilas de Uke (montada alta) e controla a cabeça. Uke não consegue mais fazer a ponte com eficiência. O árbitro anuncia osaekomi.',
  l:['Joelhos nas axilas: os cotovelos de Uke ficam presos para cima.','Um braço controla a cabeça e o outro faz base.','Daqui saem o armlock e os estrangulamentos.']}],
 rep:[1.1,3.0,5.1,6.7,9.3], cover:5.1,
 view:{x0:-1.2,y0:-.12,w:2.4,h:1.6},
 keys:[
 [0,{uke:{x:-.2,y:.15,T:90,r:90,f:-1,h:0,gf:0,leg:{R:W(-.72,.07),L:W(-.62,.07)},arm:{R:TP('o',.05,.12),L:TP('o',.05,.05)}},
     tori:{x:-.30,y:.47,T:5,f:1,h:-15,gf:0,leg:{R:W(-.76,.15),L:W(-.70,.15)},arm:{R:TP('o',.05,.70),L:TP('o',.05,.40)}}}],
 [2.2,{}],
 [3.0,{tori:{x:-.24,y:.58,T:30,h:-10,leg:{R:W(-.40,.40)}}}],
 [3.6,{tori:{x:-.18,y:.50,T:55,leg:{R:W(-.40,.15),L:W(-.42,.15)},arm:{R:TP('o',.16,.42),L:TP('o',.16,.38)}}}],
 [4.2,{tori:{x:-.12,y:.46,T:84,h:0,leg:{R:W(-.38,.15),L:W(-.32,.15)},arm:{R:TP('s',.20,.22),L:TP('s',.18,.20)}},uke:{arm:{R:TP('o',.06,.10),L:TP('o',.06,.04)}}}],
 [6.0,{}],
 [6.6,{uke:{y:.40,T:115,arm:{R:SL('armL',.6),L:TP('o',.12,.30)}},tori:{x:-.02,y:.66,T:38,h:-5,arm:{R:W(.80,.06),L:W(.88,.06)}}}],
 [7.2,{}],
 [7.8,{uke:{y:.15,T:90,arm:{R:TP('o',.06,.10),L:TP('o',.06,.04)}},tori:{x:-.10,y:.46,T:80,h:0,arm:{R:TP('s',.20,.22),L:TP('s',.18,.20)}}}],
 [8.6,{tori:{x:.08,y:.48,T:78,h:-5,leg:{R:W(-.18,.15),L:W(-.12,.15)},arm:{R:TP('o',.05,.72),L:W(.84,.06)}},uke:{arm:{L:TP('o',.10,.30),R:TP('o',.10,.24)}}}],
 [10.5,{}]],
 order:()=>['U.far.leg','U.far.arm','T.far.leg','T.far.arm','U.body','U.near.leg','T.body','U.near.arm','T.near.leg','T.near.arm'],
 names:F=>({uke:[F.uke.legL.E[0]-.2,F.uke.legL.E[1]+.2]}),
 trail:{s:2.3,e:3.9,hide:4.6,fig:'tori',joints:['legR']},
 stamp:{s:8.8,e:10.5,big:'抑込',small:'OSAEKOMI'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,2.4);
  api.tag('peito no peito',tp(T,.15,.32),2,-4.5,C.force,a);
  api.tag('joelho pronto para passar',T.legR.E,-4,-6.5,C.force,a);
  a=win(t,2.3,4.3);
  api.arc([-.30,.22],.24,170,10,C.force,a);
  api.tag('joelho cruza a barriga',[-.30,.50],-1,-1.6,C.force,a,false);
  a=win(t,4.3,6.1);
  api.tag('quadril pesado',T.hip,-7,-2,C.force,a);
  api.tag('joelhos colados nas costelas',T.legR.E,5,2.4,C.force,a);
  a=win(t,6.05,7.9);
  api.arrow([U.x,.05],[U.x,.55],C.uke,a);api.tag('upa: Uke ergue o quadril',[U.x,.3],-9,2.5,C.uke,a,false);
  api.tag('mãos na base, além da cabeça',T.armR.H,0,-3.6,C.force,a);
  a=win(t,8.1,10.6);
  api.tag('joelhos nas axilas',T.legR.E,6,2.2,C.force,a);
  api.tag('controle da cabeça',T.armR.H,2,-4,C.force,a);}
});})();
