(()=>{const {W3,B,win}=Judo;
/* Mundo 3D: y para cima. Uke de costas, cabeça para -x, pés para +x; direita de Uke = +z.
   Tori na cabeça de Uke, de frente para os pés dele (yaw 0); deitado (pitch ~80) o peito olha para baixo e a direita de Tori também fica em +z.
   Os braços de Tori entram pelas axilas de Uke (por baixo dos braços dele) e seguram a faixa nas laterais. */
const ukeBase={x:.35,y:.13,z:0,yaw:0,pitch:-90,h:-8,
 leg:{R:W3(1.16,.08,.2),L:W3(1.16,.08,-.2)},arm:{R:W3(.22,.06,.36),L:W3(.22,.06,-.36)},
 pole:{legR:[1,0,.1],legL:[1,0,-.1],armR:[0,.4,1],armL:[0,.4,-1]}};
const toriBase={x:-.62,y:.52,z:0,yaw:0,pitch:6,h:12,
 leg:{R:W3(-1.04,.06,.27),L:W3(-1.04,.06,-.27)},arm:{R:B('s',.2,.02,.17),L:B('s',.2,.02,-.17)},
 pole:{legR:[1,-.6,.35],legL:[1,-.6,-.35],armR:[0,-1,.6],armL:[0,-1,-.6]}};
const belt={R:B('o',.02,.1,.25),L:B('o',.02,.1,-.25)};
const lying={x:-.55,y:.30,pitch:82,h:35,leg:{R:W3(-1.22,.06,.34),L:W3(-1.22,.06,-.34)},arm:belt,
 pole:{legR:[.6,-1,.4],legL:[.6,-1,-.4],armR:[1,.3,.6],armL:[1,.3,-.6]}};
const ukePinned={arm:{R:B('o',-.13,.40,.16),L:B('o',-.13,.40,-.16)},pole:{armR:[.4,-.5,1],armL:[.4,-.5,-1]}};
Judo.register3d({
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
 views:[
  {name:'Diagonal',a:35,e:60,center:[-.15,.3,0],span:3.3},
  {name:'Lateral',a:0,e:8,center:[-.05,.45,0],span:3.0},
  {name:'De cima',a:0,e:90,center:[-.1,0,0],span:2.9}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.5,{}],
 [2.4,{tori:{x:-.6,y:.44,pitch:50,h:20,arm:{R:B('o',.04,.44,.32),L:B('o',.04,.44,-.32)},pole:{armR:[.4,-.3,1],armL:[.4,-.3,-1]}},
       uke:{arm:{R:W3(.18,.12,.4),L:W3(.18,.12,-.4)}}}],
 [3.2,{tori:lying,uke:ukePinned}],
 [3.6,{tori:{y:.29}}],
 [5.2,{}],
 [5.8,{uke:{x:.30,y:.30,pitch:-106,h:-20,leg:{R:W3(.78,.07,.22),L:W3(.78,.07,-.22)}},tori:{x:-.50,y:.40,pitch:72}}],
 [6.4,{uke:{y:.24,pitch:-100},tori:{x:-.62,y:.27,pitch:86,leg:{R:W3(-1.4,.06,.48),L:W3(-1.4,.06,-.48)},pole:{legR:[.3,-1,.2],legL:[.3,-1,-.2]}}}],
 [7.0,{uke:{x:.35,y:.13,pitch:-90,h:-8,leg:{R:W3(1.0,.08,.22),L:W3(1.0,.08,-.22)}},tori:{x:-.55,y:.29,pitch:82}}],
 [7.6,{}],
 [10,{}]],
 names:F=>({uke:[F.uke.legR.H[0]-.1,.42,F.uke.legR.H[2]+.1],tori:[F.tori.hip[0]-.4,F.tori.hip[1]+.25,F.tori.hip[2]+.35]}),
 glow:{s:1.8,e:4.0,limbs:{'T.R.arm':'force','T.L.arm':'force'}},
 stamp:{s:3.7,e:10,big:'抑込',small:'OSAEKOMI'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.7);
  api.tag('joelhos abertos, base larga',T.legR.E,-4,4,C.force,a);
  api.tag('Uke de costas no tatame',api.bp(U,.1,.25,-.15),4,4,C.uke,a);
  a=win(t,1.6,3.7);
  api.arrow(T.sh,api.lerp3(T.sh,U.sh,.7),C.force,win(t,1.6,2.6));
  api.tag('braços entram pelas axilas de Uke',T.armR.E,6,-4,C.force,a);
  api.tag('mãos na faixa',T.armR.H,5,3,C.force,win(t,2.8,3.9));
  a=win(t,3.7,5.3);
  api.tag('peito contra peito',api.bp(T,.12,.38,0),3,-7,C.force,a);
  api.tag('braços de Uke presos por fora',U.armL.E,4,5,C.uke,a);
  api.tag('quadril baixo',T.hip,-7,4,C.force,a);
  a=win(t,5.3,6.9);
  api.arrow(api.add(U.hip,[0,.25,0]),api.add(U.hip,[0,.6,0]),C.uke,win(t,5.3,6.2));
  api.tag('upa: Uke faz a ponte',api.add(U.hip,[0,.6,0]),0,-1.6,C.uke,a,false);
  api.arrow(T.legR.H,api.add(T.legR.H,[-.3,0,.12]),C.force,win(t,6.0,7.0));
  api.tag('pernas para trás (sprawl)',T.legR.E,2,4,C.force,win(t,6.0,7.2));
  a=win(t,7.3,99);
  api.tag('peso de volta no peito',api.bp(T,.12,.38,0),3,-7,C.force,a);
  api.tag('pronto para 100 quilos ou kimura',api.add(U.hip,[.3,.7,0]),0,0,C.ink,a,false);}
});})();
