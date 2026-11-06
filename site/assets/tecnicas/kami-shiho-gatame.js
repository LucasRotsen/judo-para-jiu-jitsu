(()=>{const {W,TP,A,lerp2,tp,win}=Judo;
Judo.register({
 id:'kami-shiho-gatame', name:'Kami Shiho Gatame', kanji:'上四方固',
 cls:'Ne-waza · Osaekomi-waza', group:'ne',
 bjj:'Norte-sul',
 why:'A imobilização pela cabeça que o jiu-jitsu chama de norte-sul: peso no peito, braços por baixo e quadril colado no chão.',
 summary:'Imobilização por cima, a partir da cabeça de Uke. Tori deita o peito sobre o peito de Uke, passa os braços por baixo dos braços dele e segura a faixa pelas laterais. Quando Uke faz a ponte, Tori espalha as pernas e devolve o peso.',
 reading:[{k:'上',r:'kami',m:'em cima, pela cabeça'},{k:'四方',r:'shiho',m:'quatro direções'},{k:'固',r:'gatame',m:'imobilização'}],
 facts:[['Grupo','Ne-waza (luta de solo) › Osaekomi-waza (imobilizações)'],
  ['Pontuação no judô','Pelas regras atuais da IJF, 10 segundos de osaekomi valem waza-ari e 20 segundos valem ippon.'],
  ['Variação comum','Kuzure kami shiho gatame: um braço passa por cima do ombro de Uke, em vez de os dois por baixo.'],
  ['No jiu-jitsu','É o norte-sul. Não pontua sozinho nas regras da IBJJF, mas é uma posição de controle de onde saem kimura, estrangulamento norte-sul e a volta para os 100 quilos.']],
 errors:[['Quadril alto','Com o quadril no ar, o peso sai do peito de Uke e a ponte dele joga Tori para frente.'],
  ['Braços soltos','Sem segurar a faixa ou o gi pelas laterais, Uke gira o ombro e coloca o braço entre os dois.'],
  ['Joelhos colados na cabeça','Base estreita: qualquer ponte de Uke derruba Tori para o lado.'],
  ['Cabeça no centro','A cabeça de Tori vai de lado, sobre a barriga de Uke. No centro, ela vira alavanca para Uke empurrar.']],
 safety:['Peso no peito sim, cotovelos e queixo cravados no rosto ou no pescoço de Uke não.',
  'Uke bate (maitta) se sentir falta de ar. Tori alivia na hora.',
  'Treine a ponte (upa) e a resposta com a pegada leve primeiro, aumentando a resistência aos poucos.'],
 phases:[
 {s:0,e:1.5,kanji:'姿勢',ro:'Shisei',pt:'Posição de partida',
  d:'Uke está de costas no tatame. Tori ajoelha junto à cabeça dele, de frente para os pés de Uke, com os joelhos afastados e o tronco ereto.',
  l:['Joelhos abertos dão base larga.','Tori fica perto: a cabeça de Uke quase toca os joelhos dele.','Os olhos já procuram as axilas de Uke, onde os braços vão entrar.']},
 {s:1.5,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'Encaixe',
  d:'Tori se inclina para frente, passa os dois braços por baixo dos braços de Uke e agarra a faixa pelas laterais do quadril. O peito desce e cola no peito de Uke.',
  l:['Os braços de Uke ficam por cima dos braços de Tori, presos.','As mãos agarram a faixa ou o gi na altura da cintura.','O queixo vai para o lado, sobre a barriga de Uke.']},
 {s:3.6,e:5.2,kanji:'抑込',ro:'Osaekomi',pt:'Imobilização',
  d:'Com os braços travados e o peito pesando, Tori relaxa o quadril até o chão. Uke fica de costas, sem espaço para virar.',
  l:['Quadril baixo, quase encostado no tatame.','O peso vem do peito, não dos braços.','Pelas regras da IJF, 20 segundos assim valem ippon.']},
 {s:5.2,e:7.2,kanji:'受',ro:'Upa',pt:'Ponte de Uke',
  d:'Uke planta os pés perto do quadril e faz a ponte (upa) para levantar Tori. Tori espalha as pernas para trás, como no sprawl, e abaixa o quadril para manter o peso no peito.',
  l:['A ponte de Uke empurra o quadril para cima e para a cabeça.','Tori estica as pernas e afasta os pés: base larga.','O peito não sai do peito de Uke em nenhum momento.']},
 {s:7.2,e:10,kanji:'残心',ro:'Zanshin',pt:'Controle mantido',
  d:'A ponte perde força e Uke volta ao chão achatado. Tori segue no controle, pronto para trocar para 100 quilos ou buscar a finalização se Uke girar.',
  l:['Tori acompanha a ponte em vez de resistir parado.','Cada saída de Uke tem uma transição de Tori: 100 quilos, montada ou kimura.','Respiração calma: o controle é longo.']}],
 rep:[.8,3.0,4.4,6.0,8.8], cover:4.4,
 keys:[
 [0,{uke:{x:1.12,y:.15,T:66,r:-246,f:1,h:-5,gf:1,leg:{R:W(1.62,.08),L:W(1.70,.08)},arm:{R:A(-114,-114),L:A(-108,-118)}},
     tori:{x:0,y:.52,T:85,f:1,h:0,gf:0,leg:{R:W(-.43,.13),L:W(-.36,.13)},arm:{R:TP('s',.22,.02),L:TP('s',.22,.06)}}}],
 [1.5,{}],
 [2.3,{tori:{x:.12,y:.55,T:40,h:-5,leg:{R:W(-.38,.14),L:W(-.31,.14)},arm:{R:TP('o',0,.45),L:TP('o',0,.40)}},
       uke:{arm:{R:TP('o',.10,.45),L:TP('o',.10,.40)}}}],
 [3.2,{tori:{x:.25,y:.52,T:-6,h:-15,leg:{R:W(-.31,.15),L:W(-.24,.15)},arm:{R:TP('o',0,.10),L:TP('o',0,.12)}},
       uke:{arm:{R:TP('o',.12,.35),L:TP('o',.12,.30)}}}],
 [3.6,{tori:{y:.50}}],
 [5.2,{}],
 [5.8,{uke:{x:1.10,y:.40,r:-221,h:-20,leg:{R:W(1.50,.08),L:W(1.58,.08)}},tori:{x:.30,y:.60,T:-14}}],
 [6.4,{uke:{y:.30,r:-232},tori:{x:.22,y:.46,T:-2,leg:{R:W(-.62,.13),L:W(-.55,.13)}}}],
 [7.0,{uke:{x:1.12,y:.15,r:-246,h:-5,leg:{R:W(1.62,.08),L:W(1.70,.08)}},tori:{y:.47,T:-5}}],
 [7.6,{tori:{y:.48}}],
 [10,{}]],
 order:()=>['T.far.leg','T.far.arm','U.far.leg','U.far.arm','U.body','T.body','T.near.arm','U.near.leg','U.near.arm','T.near.leg'],
 names:F=>({uke:[F.uke.legR.E[0],F.uke.legR.E[1]+.22],tori:[F.tori.x,Math.max(F.tori.head[1],F.tori.hip[1])+.3]}),
 glow:{s:1.8,e:3.9,limbs:{'T.R.arm':'force'}},
 stamp:{s:3.7,e:10,big:'抑込',small:'OSAEKOMI'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('joelhos abertos, base larga',T.legR.E,-2,-5,C.force,a);
  api.tag('Uke de costas no tatame',tp(U,0,.3),2,-4,C.uke,a);
  a=win(t,1.6,3.6);
  api.arrow(T.sh,lerp2(T.sh,tp(U,0,.12),.85),C.force,win(t,1.6,2.6));
  api.tag('braços por baixo dos braços de Uke',T.armR.E,8,-5,C.force,a);
  api.tag('mãos na faixa',T.armR.H,5,2.6,C.force,win(t,2.8,3.8));
  a=win(t,3.7,5.3);
  api.tag('peito contra peito',tp(T,.15,.35),-2,-9,C.force,a);
  api.tag('cabeça de lado',T.head,7,-6.5,C.force,a);
  api.tag('quadril baixo',T.hip,-7,-1.5,C.force,a);
  a=win(t,5.3,6.9);
  api.arrow([U.x,.45],[U.x,.85],C.uke,win(t,5.3,6.2));
  api.tag('upa: Uke faz a ponte',[U.x,.85],0,-1.6,C.uke,a,false);
  api.arrow(T.legR.E,[T.legR.E[0]-.32,T.legR.E[1]],C.force,win(t,6.0,7.0));
  api.tag('pernas para trás (sprawl)',[T.legR.E[0]-.32,T.legR.E[1]],-1,-2.6,C.force,win(t,6.0,7.2),false);
  a=win(t,7.3,99);
  api.tag('peso de volta no peito',tp(T,.15,.35),-2,-9,C.force,a);
  api.tag('pronto para 100 quilos ou kimura',[.6,1.4],0,0,C.ink,a,false);}
});})();
