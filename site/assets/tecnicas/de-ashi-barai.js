(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em -x olhando para +x (direita de Uke = +z).
   Tori começa em +x olhando para -x (direita de Tori = -z; esquerda = +z).
   O pé direito de Uke e o pé esquerdo de Tori ficam do mesmo lado (+z): é ali que acontece a varrida.
   A varrida empurra o pé de Uke para frente (+x) e para dentro (-z), cruzando na frente do outro pé. */
const uke0={x:-.33,y:.90,z:0,yaw:0,h:5,
 leg:{R:W3(-.30,.07,.16),L:W3(-.36,.07,-.16)},
 arm:{R:B('o',.16,.38,-.09),L:B('o',.20,.20,.24)}};
const tori0={x:.33,y:.90,z:0,yaw:180,h:5,
 leg:{L:W3(.30,.07,.16),R:W3(.36,.07,-.16)},
 arm:{L:SL('armR',.35),R:B('o',.16,.40,-.09)}};
Judo.register3d({
 id:'de-ashi-barai', name:'De Ashi Barai', kanji:'出足払',
 cls:'Nage-waza · Ashi-waza', group:'nage',
 bjj:'De ashi barai, a rasteira de tempo',
 why:'Derruba sem força e sem entrada profunda. Ensina a ler o passo do oponente e a levar a luta para o chão já por cima.',
 summary:'Varrida do pé que avança. Quando Uke dá um passo e o pé da frente ainda não recebeu o peso, Tori varre esse pé com a sola, na direção em que ele já ia, e gira as mãos como um volante. Uke perde o apoio e cai de lado. Os três ângulos mostram a varrida, que é lateral e some numa vista de perfil.',
 reading:[{k:'出',r:'de',m:'que avança'},{k:'足',r:'ashi',m:'pé'},{k:'払',r:'barai',m:'varrida'}],
 facts:[['Grupo','Nage-waza (projeções) › Ashi-waza (técnicas de perna)'],['Gokyo','1º grupo (Dai-ikkyo)'],
  ['O segredo','Tempo. O pé é varrido no instante entre tocar o tatame e receber o peso do corpo.'],
  ['Qual pé varre qual','O pé esquerdo de Tori varre o pé direito de Uke, os dois do mesmo lado. Visto de cima, a sola empurra o pé de Uke de fora para dentro, na frente do outro pé.'],
  ['No jiu-jitsu','Funciona no início da luta, quando os dois andam em busca de pegada. Uke cai na frente de Tori, que já está por cima e passa direto para o joelho na barriga ou os 100 quilos.']],
 errors:[['Varrer cedo ou tarde','Antes do passo, o pé está livre e só se move. Depois que recebe o peso, está plantado. O ponto certo é o instante entre os dois.'],
  ['Chutar em vez de varrer','O contato é a sola do pé contra o tornozelo, com a perna quase reta. Chutar machuca e não derruba.'],
  ['Mãos paradas','Sem o giro das mãos, como um volante, Uke só perde o pé e recupera o equilíbrio com o outro.'],
  ['Varrer na direção errada','A varrida acompanha o passo de Uke e cruza o pé dele na frente do outro. Empurrar contra o passo só trava o pé no chão.']],
 safety:['Treine primeiro em movimento lento, com Uke andando para frente, até sentir o tempo do passo.',
  'Varra com a sola do pé, nunca com o peito do pé ou com o calcanhar contra o tornozelo.',
  'Mantenha a manga presa e puxada para cima, para Uke cair de lado amortecido, e não sobre o ombro.'],
 phases:[
 {s:0,e:1,kanji:'組み方',ro:'Kumikata',pt:'A pegada',
  d:'Pegada clássica: a mão esquerda de Tori na manga direita de Uke e a mão direita na gola esquerda. Os dois em postura natural, prontos para se deslocar.',
  l:['Hikite na manga, perto do cotovelo.','Tsurite na gola, na altura da clavícula.','Corpo leve: a técnica nasce do deslocamento.']},
 {s:1,e:2.9,kanji:'崩し',ro:'Kuzushi',pt:'Puxar e fazer andar',
  d:'Tori recua um passo e puxa Uke, que precisa avançar para não perder o equilíbrio. O pé direito de Uke sai do chão e vai para frente.',
  l:['O recuo de Tori convida Uke a dar o passo.','O tsurite levanta um pouco, deixando Uke mais leve.','Tori observa o pé direito de Uke, não as mãos.']},
 {s:2.9,e:3.6,kanji:'作り',ro:'Tsukuri',pt:'O instante certo',
  d:'O pé direito de Uke está quase tocando o tatame, mas o peso ainda está na perna de trás. É nesse instante que a sola do pé esquerdo de Tori encosta no tornozelo dele, pelo lado de fora.',
  l:['Sola do pé contra o tornozelo, por fora.','Perna de Tori quase reta, sem dobrar o joelho para chutar.','O pé de Uke ainda está leve: ele não consegue firmar.']},
 {s:3.6,e:4.8,kanji:'掛け',ro:'Kake',pt:'A varrida',
  d:'Tori varre o pé de Uke para frente e para dentro, cruzando na frente do outro pé, e gira as mãos como um volante: a esquerda puxa a manga para baixo, a direita empurra a gola para cima. Uke fica sem apoio e cai de lado.',
  l:['Na vista de cima: a sola leva o pé de Uke de fora para dentro.','As mãos giram juntas, como num volante.','Tori recua o corpo para abrir espaço à queda.']},
 {s:4.8,e:8.5,kanji:'残心',ro:'Zanshin',pt:'Joelho na barriga',
  d:'Uke cai de lado e de costas à frente de Tori. Tori não solta a manga: desce o joelho direito na barriga de Uke, apoia o pé esquerdo longe e segura a gola. No jiu-jitsu, é o joelho na barriga.',
  l:['Manga segura e puxada para cima durante toda a queda.','Uke faz ukemi: queixo no peito e braço livre batendo no tatame.','Canela atravessada na barriga, pé de apoio longe, quadril alto.']}],
 rep:[.5,2.6,3.2,4.1,7.0], cover:3.95,
 views:[
  {name:'Diagonal',a:25,e:28,center:[0,.82,0],span:3.5},
  {name:'Pés, de cima',a:10,e:58,center:[.05,.2,.05],span:2.4},
  {name:'Lateral',a:0,e:8,center:[0,.85,0],span:3.5}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1,{}],
 [1.8,{tori:{x:.45,leg:{R:W3(.58,.07,-.16),L:W3(.36,.09,.16)}},
       uke:{x:-.22,pitch:4,leg:{R:W3(-.16,.12,.17),L:W3(-.34,.07,-.16)}}}],
 [2.6,{tori:{x:.44,y:.89,pitch:-4,leg:{L:W3(.22,.12,.22)},arm:{R:B('o',.16,.46,-.09)}},
       uke:{x:-.15,y:.89,pitch:4,leg:{R:W3(.0,.14,.17),L:W3(-.32,.08,-.16)}}}],
 [3.0,{tori:{x:.44,y:.86,pitch:-8,yaw:192,leg:{L:W3(.12,.10,.31)}},
       uke:{x:-.12,y:.89,pitch:-2,leg:{R:W3(.08,.09,.17),L:W3(-.31,.09,-.16)}}}],
 [3.4,{}],
 [3.9,{tori:{x:.46,y:.84,pitch:-12,yaw:200,leg:{L:W3(.32,.18,-.02)},arm:{R:B('o',.14,.56,-.12)}},
       uke:{x:-.10,y:.84,roll:18,pitch:-8,leg:{R:W3(.26,.24,-.18),L:W3(-.30,.07,-.16)},arm:{L:B('s',.1,.5,-.45)}}}],
 [4.3,{tori:{x:.44,y:.84,pitch:5,yaw:196,leg:{L:W3(.22,.07,.12),R:W3(.60,.07,-.16)},arm:{R:B('o',.12,.48,-.10)}},
       uke:{x:-.12,y:.48,z:.10,yaw:35,pitch:-50,roll:30,h:20,
            leg:{R:W3(.18,.42,-.30),L:W3(-.02,.28,-.30)},arm:{R:B('s',.25,.45,.45),L:B('s',.2,.3,-.5)}}}],
 [4.8,{tori:{x:.40,y:.82,pitch:18,yaw:190,leg:{L:W3(.24,.07,.24),R:W3(.58,.07,-.12)},arm:{R:B('o',.14,.42,0)}},
       uke:{x:-.17,y:.13,z:.10,yaw:73,pitch:-88,roll:0,h:25,
            leg:{R:W3(.06,.07,-.58),L:W3(-.16,.07,-.62)},arm:{R:W3(.15,.40,.40),L:W3(-.72,.05,.26)},pole:{armL:[.6,-.3,-.4]}}}],
 [5.6,{}],
 [6.4,{tori:{x:.12,y:.60,z:.30,pitch:32,yaw:180,h:-20,leg:{R:W3(-.58,.12,.22),L:W3(.36,.07,.82)},pole:{legR:[1,-.3,-.7]},arm:{R:B('o',.14,.42,0)}},
       uke:{arm:{R:W3(.18,.46,.42),L:W3(-.70,.05,.30)}}}],
 [8.5,{}]],
 names:F=>F.t>4.4?{uke:[F.uke.head[0]-.15,F.uke.head[1]+.38,F.uke.head[2]]}:{},
 glow:{s:2.5,e:4.4,limbs:{'T.L.leg':'force','U.R.leg':'gold'}},
 stamp:{s:4.85,e:6.4,big:'一本',small:'IPPON'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('Hikite: manga',T.armL.H,4,-4,C.force,a);
  api.tag('Tsurite: gola',T.armR.H,-6,-4,C.force,a);
  a=win(t,1.2,2.95);
  if(a>0){const c=api.add(T.sh,[.1,.1,0]);api.arrow(c,api.add(c,[.32,0,0]),C.force,a);
   api.tag('Tori recua e puxa',api.add(c,[.32,0,0]),2,-2.4,C.force,a,false);
   api.tag('pé direito de Uke avança',U.legR.toe,-6,3,C.gold,win(t,1.8,2.95));}
  a=win(t,2.95,3.7);
  if(a>0){api.ring(U.legR.H,.13,C.gold,a);
   api.tag('o pé toca, mas ainda sem peso',U.legR.H,-9,3.2,C.gold,a);
   api.tag('sola contra o tornozelo, por fora',T.legL.toe,5,-5.5,C.force,a);}
  a=win(t,3.6,4.5);
  if(a>0){api.arrow([.12,.12,.36],[.32,.2,-.22],C.force,a);
   api.tag('varre para frente e para dentro',[.32,.2,-.22],4,3,C.force,a,false);
   const hm=api.lerp3(T.armL.H,T.armR.H,.5);api.arc(hm,[0,0,1],[0,1,0],.2,200,330,C.force,a);
   api.tag('mãos giram como volante',hm,10,2.5,C.force,a);}
  a=win(t,4.9,8.4);
  api.tag('manga segura até o fim',T.armL.H,6,-3,C.force,a);
  api.tag('joelho na barriga',T.legR.E,-2,5,C.force,win(t,6.0,8.4));}
});})();
