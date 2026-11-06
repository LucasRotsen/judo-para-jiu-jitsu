(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
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
 rep:[.6,2.8,4.9,6.55,8.4,11.5], cover:6.55,
 keys:[
 [0,{uke:{x:-.30,y:.93,T:90,f:1,leg:{R:W(-.20,.07),L:W(-.40,.07)},arm:{R:TP('o',.13,.40),L:TP('o',.12,.24)}},
     tori:{x:.30,y:.93,T:90,f:-1,leg:{R:W(.20,.07),L:W(.42,.07)},arm:{R:TP('o',.12,.38),L:SL('armR',.65)}}}],
 [1.2,{}],
 [1.8,{tori:{x:.26,leg:{R:W(.10,.14)}},uke:{x:-.27,T:82}}],
 [2.4,{tori:{x:.22,y:.92,T:96,leg:{R:W(0,.07)}},uke:{x:-.20,T:66,h:15,leg:{R:W(-.20,.11),L:W(-.40,.11)}}}],
 [3.2,{}],
 [3.7,{tori:{x:.12,y:.86,T:88,leg:{R:W(-.04,.07),L:W(.30,.12)},arm:{R:TP('o',.14,.44)}},uke:{T:64}}],
 [4.1,{tori:{x:.04,y:.76,T:76,f:0,h:10,leg:{R:W(-.05,.07),L:W(.10,.18)},arm:{R:TP('o',.10,.28)}}}],
 [4.6,{tori:{x:-.03,y:.68,T:62,f:1,h:15,bR:1,leg:{R:W(-.07,.07),L:W(.09,.07)},arm:{R:TP('s',.02,.66),L:SL('armR',.7)}},
       uke:{x:-.24,y:.96,T:66,bR:1,leg:{R:W(-.17,.12),L:W(-.36,.12)},arm:{R:TP('o',.16,.46),L:TP('o',-.12,.25)}}}],
 [5.5,{}],
 [6.1,{tori:{x:-.02,y:.80,T:42,h:25},uke:{x:-.10,y:1.21,r:-40,h:10,gf:0,leg:{R:A(-100,-110),L:A(-90,-100)}}}],
 [6.6,{tori:{x:0,y:.86,T:28,h:20},uke:{x:.72,y:1.42,r:-160,h:-15,leg:{R:A(-95,-100),L:A(-85,-95)},arm:{L:A(-60,-60),R:TP('o',.18,.46)}}}],
 [7.0,{tori:{y:.84,T:36,h:15,bR:-1,arm:{R:TP('s',.25,.20)}},uke:{x:1.0,y:.85,r:-225,h:-25,bR:-1,leg:{R:A(-95,-100),L:A(-88,-95)},arm:{L:A(-100,-110),R:TP('o',.25,.30)}}}],
 [7.4,{tori:{y:.80,T:48,h:10},uke:{x:1.12,y:.15,r:-246,h:-20,leg:{R:A(-89,-139),L:A(-84,-130)},arm:{L:A(-119,-119),R:W(.47,.72)}}}],
 [8.4,{tori:{y:.81,T:51,h:5}}],
 [9,{}],
 [9.6,{tori:{x:.10,y:.64,T:16,h:0,leg:{R:W(-.12,.12),L:W(.05,.07)},arm:{R:TP('o',0,.32)}},uke:{h:-10,leg:{R:A(-75,-150),L:A(-72,-145)}}}],
 [10.2,{tori:{x:.25,y:.52,T:-6,h:-15,gf:0,leg:{R:W(-.31,.15),L:W(-.24,.15)},arm:{R:TP('o',0,.30),L:TP('o',0,.22)}},
        uke:{h:-5,leg:{R:A(-69,-159),L:A(-66,-152)},arm:{R:TP('o',.12,.35)}}}],
 [12.5,{}]],
 order:F=>{const b=F.t>9.3?['U.body','T.body']:['T.body','U.body'];
  return ['T.far.leg','T.far.arm','U.far.leg','U.far.arm',...b,'U.near.leg','T.near.arm.upper','U.near.arm','T.near.leg','T.near.arm.lower'];},
 names:F=>F.t>9.6?{uke:[F.uke.legR.E[0],F.uke.legR.E[1]+.2]}:{},
 glow:{s:3.4,e:5.7,limbs:{'T.R.arm':'force','U.R.arm':'gold'}},
 lens:{s:3.5,e:5.7,zoom:1.9,ghost:'U.R.arm',caption:'raio-X: braço de Uke transparente',
  center:F=>lerp2(F.uke.sh,F.tori.sh,.5),
  labels:(api,F,a)=>{api.tag('Tori: cotovelo sob a axila',F.tori.armR.E,-5,-4.6,api.C.force,a);
   api.tag('Uke: braço preso na dobra',lerp2(F.uke.armR.root,F.uke.armR.E,.6),-9,2.4,api.C.gold,a);}},
 trail:{s:5.5,e:7.6,hide:9.2,fig:'uke',joints:['hip','head']},
 stamp:{s:7.45,e:9.2,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('Hikite: puxa',T.armL.H,3.2,-4.2,C.force,a);
  api.tag('Tsurite: levanta',T.armR.H,-6.5,-3.4,C.force,a);
  a=win(t,1.3,3.4);
  if(a>0){const c=tp(U,0,.16),toeX=Math.max(U.legR.toe[0],U.legL.toe[0]),heelX=Math.min(U.legR.heel[0],U.legL.heel[0]);
   api.band(heelX,toeX,C.gold,a);api.dashed(c,[c[0],0],C.gold,a,2);api.dot(c,.03,C.gold,a);
   api.tag('centro de gravidade',c,-8.5,-1.2,C.gold,a);api.tag('base de apoio',[heelX,0],-6,1.4,C.gold,a);
   const ch=tp(U,.2,.40),b=win(t,1.5,3.4);api.arrow(ch,[ch[0]+.32,ch[1]+.14],C.force,b);
   api.tag('puxada: frente e para cima',[ch[0]+.32,ch[1]+.14],1,-2.6,C.force,b,false);}
  a=win(t,3.4,4.7);
  if(a>0){const fr=T.legR.H;api.arc([fr[0]+.02,.02],.24,200,-20,C.force,a);api.tag('giro sobre o pé direito',[fr[0]+.02,.26],-3,-2,C.force,a,false);}
  a=win(t,4.4,5.6);
  if(a>0){const hb=tp(U,0,.09);api.dashed([-.55,hb[1]],[.6,hb[1]],C.uke,a,1.8);api.dashed([-.55,T.y],[.6,T.y],C.force,a,1.8);
   api.tag('faixa de Uke',[.6,hb[1]],4.6,0,C.uke,a,false);api.tag('quadril de Tori, mais baixo',[.6,T.y],8.6,0,C.force,a,false);}
  a=win(t,5.5,6.4);
  api.arrow([T.x+.42,.18],[T.x+.42,.62],C.force,a);api.tag('pernas estendem',[T.x+.42,.4],5.4,0,C.force,a,false);
  a=win(t,5.8,7.1);
  api.arc(T.sh,.5,150,30,C.force,a);
  api.tag('rotação sobre o ombro',[T.sh[0]+.5*Math.cos(150*api.D),T.sh[1]+.5*Math.sin(150*api.D)],-6,-.5,C.force,a,false);
  a=win(t,5.6,7.2);api.tag('hikite puxa até o quadril',T.armL.H,-10,1.6,C.force,a);
  a=win(t,7.5,9.2);
  api.tag('manga segura até o fim',T.armL.H,6.5,-2.2,C.force,a);api.tag('ukemi: queixo no peito',U.head,-2,3.4,C.uke,a);
  a=win(t,10.1,99);
  api.tag('peito contra peito',tp(T,.15,.35),5,-6,C.force,a);
  api.tag('joelhos no tatame, quadril baixo',T.legR.E,-7,-6,C.force,a);
  api.tag('NORTE-SUL · KAMI-SHIHO-GATAME',[.45,1.5],0,0,C.ink,a,false);}
});})();
