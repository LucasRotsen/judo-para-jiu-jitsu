(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
Judo.register({
 id:'de-ashi-barai', name:'De Ashi Barai', kanji:'出足払',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'De ashi barai, a rasteira de tempo',
 why:'Derruba sem força e sem entrada profunda: ensina a ler o passo do oponente para levar a luta ao chão por cima.',
 summary:'Varrida do pé que avança. Quando Uke dá um passo e o pé da frente ainda não recebeu o peso, Tori varre esse pé com a sola, na direção do próprio passo, e gira as mãos como um volante. Uke perde o apoio e cai de costas.',
 reading:[{k:'出',r:'de',m:'que avança'},{k:'足',r:'ashi',m:'pé'},{k:'払',r:'barai',m:'varrida'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['O segredo','Tempo. O pé é varrido no instante entre tocar o tatame e receber o peso do corpo.'],
  ['No jiu-jitsu','Funciona no início da luta, quando os dois andam em busca de pegada. Uke cai na frente de Tori, que já está por cima e pode passar direto para a guarda ou os 100 quilos.']],
 errors:[['Varrer cedo ou tarde','Antes do passo, o pé está livre e só se move. Depois que recebe o peso, está plantado. O ponto certo é o instante entre os dois.'],
  ['Chutar em vez de varrer','O contato é a sola do pé contra o tornozelo, com a perna quase reta. Chutar machuca e não derruba.'],
  ['Mãos paradas','Sem o giro das mãos, como um volante, Uke só perde o pé e recupera o equilíbrio com o outro.'],
  ['Varrer na direção errada','A varrida acompanha o passo de Uke, nunca vai contra ele.']],
 safety:['Treine primeiro em movimento lento, com Uke andando para frente, até sentir o tempo do passo.',
  'Varra com a sola do pé, nunca com o peito do pé ou com o calcanhar contra o tornozelo.',
  'Mantenha a manga para que Uke caia de costas, e não de lado sobre o ombro.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke e a mão direita na gola esquerda. Os dois em postura natural, prontos para se deslocar.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Corpo leve: a técnica nasce do deslocamento.']},
 {s:1,e:2.9,kanji:'崩し',ro:'Kuzushi',pt:'Puxar e fazer andar',
  d:'Tori recua um passo e puxa Uke, que precisa avançar para não perder o equilíbrio. O pé direito de Uke sai do chão e vai para frente.',
  l:['O recuo de Tori convida Uke a dar o passo.','O tsurite levanta um pouco, deixando Uke mais leve.','Tori observa o pé direito de Uke, não as mãos.']},
 {s:2.9,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'O instante certo',
  d:'O pé direito de Uke está quase tocando o tatame, mas o peso ainda está na perna de trás. É nesse instante que a sola do pé esquerdo de Tori encosta no tornozelo dele.',
  l:['Sola do pé contra o tornozelo, por fora.','Perna de Tori quase reta, sem dobrar o joelho para chutar.','O pé de Uke ainda está leve: ele não consegue firmar.']},
 {s:3.6,e:4.8,kanji:'掛け',ro:'Kake',pt:'A varrida',
  d:'Tori varre o pé de Uke na direção do passo dele e gira as mãos como um volante: a esquerda puxa para baixo, a direita empurra para cima. Uke fica sem apoio e cai de costas.',
  l:['A varrida acompanha o passo de Uke.','As mãos giram juntas, como num volante.','Tori recua o corpo para abrir espaço à queda.']},
 {s:4.8,e:8,kanji:'残心',ro:'Zanshin',pt:'Controle final',
  d:'Uke cai de costas à frente de Tori. Tori mantém a manga presa para frear a queda e fica de pé, por cima, pronto para seguir no chão.',
  l:['Manga segura até Uke tocar o tatame.','Uke faz ukemi: queixo no peito e braço livre no chão.','Tori termina por cima e em pé.']}],
 rep:[.5,2.6,3.2,4.1,6.5], cover:3.95,
 keys:[
 [0,{uke:{x:-.30,y:.93,T:90,f:1,leg:{R:W(-.22,.07),L:W(-.40,.07)},arm:{R:TP('o',.13,.40),L:TP('o',.12,.24)}},
     tori:{x:.30,y:.93,T:90,f:-1,leg:{L:W(.22,.07),R:W(.40,.07)},arm:{R:TP('o',.12,.38),L:SL('armR',.65)}}}],
 [1,{}],
 [1.8,{tori:{x:.40,leg:{R:W(.55,.07),L:W(.30,.07)}},uke:{x:-.20,T:88,leg:{R:W(-.14,.11),L:W(-.32,.07)}}}],
 [2.6,{tori:{x:.40,y:.92,T:93,leg:{L:W(.20,.11)},arm:{R:TP('o',.12,.42)}},uke:{x:-.10,y:.92,leg:{R:W(0,.13),L:W(-.30,.09)}}}],
 [3,{tori:{x:.38,T:95,leg:{L:W(.11,.09)}},uke:{x:-.06,y:.91,leg:{R:W(.05,.09),L:W(-.30,.10)}}}],
 [3.4,{}],
 [3.9,{tori:{x:.48,T:98,leg:{L:W(.30,.24),R:W(.62,.07)}},uke:{x:-.08,y:.86,r:15,leg:{R:W(.25,.32),L:W(-.28,.07)}}}],
 [4.3,{tori:{x:.62,y:.82,T:75,leg:{L:W(.50,.09),R:W(.76,.07)}},
       uke:{x:.02,y:.52,r:60,h:-20,gf:0,leg:{R:A(20,15),L:A(0,-10)},arm:{R:W(-.05,.80),L:A(-100,-120)}}}],
 [4.8,{tori:{x:.70,y:.72,T:32,h:10,leg:{L:W(.58,.07),R:W(.84,.07)},arm:{R:TP('s',.2,.25)}},
       uke:{x:.10,y:.15,r:90,h:-20,leg:{R:A(0,-20),L:A(-8,-30)},arm:{R:W(-.10,.62),L:A(-90,-90)}}}],
 [5.8,{tori:{y:.74,T:36},uke:{h:-12,leg:{R:A(-20,-160),L:A(-25,-155)}}}],
 [8,{}]],
 names:F=>F.t>4.2?{uke:[F.uke.head[0],F.uke.head[1]+.36]}:{},
 glow:{s:2.5,e:4.3,limbs:{'T.L.leg':'force','U.R.leg':'gold'}},
 trail:{s:3.6,e:4.85,hide:7.6,fig:'uke',joints:['head']},
 stamp:{s:4.85,e:7.8,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,4,-4,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6.5,-3.6,C.force,a);
  a=win(t,1.2,3);
  if(a>0){const ch=tp(U,.2,.40);api.arrow(ch,[ch[0]+.3,ch[1]+.06],C.force,a);
   api.tag('Tori recua e puxa',[ch[0]+.3,ch[1]+.06],1,-2.8,C.force,a,false);
   api.tag('pé direito de Uke avança',U.legR.toe,-9,1.4,C.gold,win(t,1.8,3));}
  a=win(t,2.95,3.75);
  if(a>0){api.ring(U.legR.H,.12,C.gold,a);
   api.tag('o pé toca, mas ainda sem peso',U.legR.H,-9,-5,C.gold,a);
   api.tag('sola contra o tornozelo',T.legL.toe,6,-6.5,C.force,a);}
  a=win(t,3.55,4.4);
  if(a>0){api.arrow([-.02,.05],[.32,.36],C.force,a);
   api.tag('varre na direção do passo',[.32,.36],-9,-1,C.force,a,false);
   const hm=lerp2(T.armL.H,T.armR.H,.5);api.arc(hm,.22,200,320,C.force,a);
   api.tag('mãos giram como volante',hm,10,-1.5,C.force,a);}
  a=win(t,4.9,7.9);
  api.tag('manga segura até o fim',T.armL.H,-7.5,-3.2,C.force,a);
  api.tag('ukemi: queixo no peito',U.head,1,3.4,C.uke,a);},
 view:{x0:-1.1}
});})();
