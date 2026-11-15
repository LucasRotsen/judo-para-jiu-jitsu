(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Tori começa de costas, cabeça para -x, direita = +z.
   Uke ajoelhado na guarda (yaw 180: direita de Uke = -z). Tori segura a gola e a manga DIREITAS de Uke.
   Escudo: o joelho direito de Tori fica no peito de Uke e a canela desce até a cintura ESQUERDA dele (o lado do quadril de Tori);
   a perna esquerda fica no chão contra o joelho direito. Uke cai para a direita dele (-z), Tori sobe montado. */
const sleeve=SL('armR',.85), collar=B('o',.21,.42,.06);
const ukeBase={x:.40,y:.40,z:0,yaw:180,pitch:45,roll:0,h:-20,
 leg:{R:W3(.68,.07,-.17),L:W3(.68,.07,.17)},arm:{R:B('o',.12,.05,-.12),L:B('o',.12,.05,.12)}};
const toriBase={x:0,y:.15,z:0,yaw:0,pitch:-72,roll:0,h:30,
 leg:{R:B('o',-.2,-.04,-.03),L:B('o',-.2,-.02,.03)},arm:{R:collar,L:sleeve},
 pole:{legR:[-.25,.75,1],legL:[0,.25,-1],armR:[-.6,.3,.6],armL:[.8,.2,-.4]}};
Judo.register3d({
 id:'raspagem-de-tesoura', name:'Raspagem de tesoura', kanji:'', group:'ne', cls:'Jiu-jitsu · Raspagem',
 bjj:'Tesoura (scissor sweep)',
 why:'A primeira raspagem que todo faixa-branca aprende: da guarda fechada direto para a montada, em três ângulos para ver as pernas cortarem como uma tesoura.',
 summary:'Raspagem da guarda fechada. Tori segura a gola e a manga do mesmo lado, sai o quadril, arma o escudo (joelho de cima no peito de Uke, canela na cintura) e corta o joelho dele com a outra perna. Uke cai para o lado da manga presa e Tori termina montado.',
 reading:[{k:'Tesoura',r:'scissor sweep',m:'as pernas cortam em sentidos opostos'}],
 facts:[['Origem','Jiu-jitsu. Não tem nome próprio no Kodokan; é a raspagem mais básica da guarda fechada.'],
  ['Pontuação','Raspagem vale 2 pontos; terminar montado e estabilizar vale mais 4.'],
  ['Pegadas','Gola e manga do mesmo lado de Uke. A manga presa impede que ele apoie a mão para não cair.'],
  ['Para que lado ele cai','Para o lado da manga presa. Aqui é a manga direita, então Uke cai para a direita dele.']],
 errors:[['Ficar reto embaixo de Uke','Sem sair o quadril, o escudo não entra: o joelho não chega ao peito e não há alavanca. Tori deita de lado.'],
  ['Soltar a manga','Com a mão livre, Uke apoia no tatame e a raspagem para.'],
  ['Perna de baixo parada','Só chutar com a de cima não basta: a perna do chão precisa cortar o joelho ao mesmo tempo.'],
  ['Não puxar antes','Uke precisa estar com o peso para a frente, em cima do joelho de Tori. Puxe gola e manga antes de cortar.']],
 safety:['Treine a raspagem devagar e com um parceiro que sabe cair de lado.',
  'Cuidado com o joelho de quem é raspado: a perna de baixo corta na altura do joelho, não chuta a articulação.',
  'Ao subir para a montada, apoie os joelhos no tatame em vez de cair com o peso sobre o parceiro.'],
 phases:[
 {s:0,e:1.4,kanji:'1',ro:'Guarda fechada',pt:'Gola e manga',
  d:'Tori está de costas com as pernas cruzadas nas costas de Uke. A mão direita segura a gola direita de Uke, alta, e a mão esquerda segura a manga direita.',
  l:['Gola e manga do mesmo lado.','A pegada da manga é no punho, para controlar a mão.','As pernas ainda estão fechadas.']},
 {s:1.4,e:3.0,kanji:'2',ro:'Fuga de quadril',pt:'Abrir e deitar de lado',
  d:'Tori abre a guarda, apoia o pé e tira o quadril para a direita, deitando sobre o lado esquerdo. Ao mesmo tempo puxa gola e manga para trazer o peso de Uke para a frente.',
  l:['Sair o quadril cria o ângulo da tesoura.','Tori fica de lado, não de costas.','O peso de Uke vem para a frente com as pegadas.']},
 {s:3.0,e:4.5,kanji:'3',ro:'Tesoura armada',pt:'Escudo: joelho no peito',
  d:'Tori arma o escudo com a perna direita: o joelho apoia no peito de Uke e a canela desce até a cintura esquerda dele. A perna esquerda fica estendida no chão, encostada no joelho direito de Uke.',
  l:['Escudo: joelho no peito, canela na cintura.','Perna de baixo no chão, contra o joelho.','Manga presa: Uke não tem como apoiar a mão direita.']},
 {s:4.5,e:6.4,kanji:'4',ro:'Raspagem',pt:'Puxar, chutar e cortar',
  d:'Tori puxa gola e manga, empurra com o joelho de cima para levantar Uke e corta o joelho dele com a perna de baixo. As pernas se cruzam como uma tesoura e Uke tomba para o lado da manga presa.',
  l:['Perna de cima levanta, perna de baixo corta.','Uke cai para o lado da manga presa.','Tori não solta as pegadas e vem junto.']},
 {s:6.4,e:8.6,kanji:'5',ro:'Montada',pt:'Estabilizar',
  d:'Tori rola por cima junto com Uke e termina montado, joelhos no chão dos dois lados do quadril dele, ainda segurando gola e manga.',
  l:['Rolar junto, sem soltar.','Joelhos abertos, quadril pesado.','Da montada saem estrangulamentos e chaves.']}],
 rep:[.7,2.4,3.9,5.3,7.6], cover:4.0,
 views:[
  {name:'Lado da queda',a:-122,e:20,center:[.3,.48,-.2],span:2.8},
  {name:'Pela cabeça de Tori',a:-90,e:16,center:[.3,.55,-.18],span:2.7},
  {name:'De cima',a:-90,e:88,center:[.3,0,-.2],span:2.7}],
 keys:[
 [0,{uke:ukeBase,tori:toriBase}],
 [1.4,{}],
 [2.0,{tori:{leg:{R:B('o',.02,-.02,-.42),L:B('o',.04,.0,.45)},pole:{legR:[-.75,.5,-.25],legL:[.2,.1,-1]}}}],
 [2.3,{tori:{leg:{R:B('o',.26,.04,-.10)},pole:{legR:[.75,-1,.75]}}}],
 /* tesoura armada, conferida com foto de referência: Tori de lado, escudo (referência: Roger Gracie e correção do usuário): joelho de cima no peito de Uke,
    canela descendo até a cintura esquerda dele; perna de baixo no chão, por fora do joelho de Uke */
 [2.6,{tori:{x:.05,y:.19,z:.18,roll:-48,h:25,leg:{R:B('o',.12,.09,-.18),L:W3(.36,.06,-.52)},
        pole:{legR:[.8,.5,.3],legL:[.38,0,-.98],armR:[-.4,-.2,.9]}},
       uke:{pitch:34,x:.42,h:-5,arm:{R:B('o',.12,.30,-.10),L:B('o',-.02,.16,.30)},pole:{armL:[-.3,.3,-.9],armR:[-.3,.3,.9]}}}],
 [3.4,{tori:{x:.05,z:.18,roll:-50,leg:{R:B('o',.12,.09,-.18),L:W3(.36,.06,-.52)},pole:{legR:[.8,.5,.3]}},
       uke:{pitch:38,x:.42,y:.42,h:5,arm:{R:B('o',.14,.32,-.08),L:B('o',-.02,.16,.30)}}}],
 [4.5,{}],
 [5.0,{tori:{roll:-55,leg:{R:B('o',.14,.18,-.16),L:W3(.62,.06,-.16)},pole:{legL:[.8,-.3,0]}},
       uke:{x:.41,y:.50,z:-.12,roll:40,pitch:62,arm:{R:B('o',.16,.20,-.12)},leg:{R:W3(.66,.14,-.06),L:W3(.60,.30,.14)}}}],
 [5.6,{tori:{x:.12,y:.22,z:.02,roll:-95,pitch:-115,leg:{R:B('o',.34,.14,-.06),L:W3(.68,.06,.12)},pole:{legR:[1,.2,0],legL:[1,0,.2]}},
       uke:{x:.42,y:.32,z:-.36,roll:120,pitch:80,h:0,leg:{R:W3(1.10,.10,-.32),L:W3(1.06,.32,-.46)},pole:{legR:[1,-.1,.1],legL:[1,-.1,-.1]}}}],
 [5.75,{tori:{leg:{R:W3(.46,.70,-.46)},pole:{legL:[1,0,.1]}}}],
 [5.9,{tori:{x:.30,y:.42,z:-.22,roll:-125,pitch:-140,leg:{R:W3(.60,.30,-.72),L:W3(.72,.06,.08)},pole:{legR:[1,.2,-.1],legL:[1,0,.1]}}}],
 [6.2,{tori:{x:.44,y:.38,z:-.46,roll:-150,pitch:-160,h:10,leg:{R:B('o',-.1,-.25,-.3),L:B('o',-.1,-.25,.3)},
        pole:{legR:[.5,.25,-.5],legL:[0,-.5,.25]}},
       uke:{x:.46,y:.13,z:-.46,roll:180,pitch:90,h:10,leg:{R:W3(1.15,.07,-.34),L:W3(1.18,.07,-.58)},pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15]}}}],
 [6.6,{tori:{pole:{legR:[.5,.25,-.5],legL:[.75,.75,.25]}}}],
 [7.0,{tori:{arm:{R:B('o',.14,.38,.05)},x:.48,y:.35,z:-.46,roll:-180,pitch:-178,h:15,leg:{R:B('o',-.1,-.25,-.3),L:B('o',-.1,-.25,.3)},pole:{legR:[1,.25,-.25],legL:[1,.25,.25],armR:[-.3,-.4,.8]}},
       uke:{arm:{L:B('o',.05,-.02,.2)}}}],
 [8.6,{}]],
 /* o joelho e a coxa de Tori empurram o peito de Uke de propósito */
 aperto:{s:2.2,e:5.8,limbs:['T.R.leg'],tol:.13},
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.2,F.tori.head[2]],
  uke:[F.uke.hip[0]+.2,Math.max(F.uke.head[1],F.uke.hip[1])+.24,F.uke.hip[2]-.1]}),
 glow:{s:2.8,e:6.2,limbs:{'T.R.leg':'force','T.L.leg':'gold'}},
 stamp:{s:6.9,e:8.6,big:'2 pts',small:'RASPAGEM'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.6);
  api.tag('gola',T.armR.H,-6,-2.5,C.force,a);
  api.tag('manga do mesmo lado',T.armL.H,6,2.5,C.force,a);
  a=win(t,1.5,3.2);
  api.tag('sai o quadril, deita de lado',T.hip,-6,3,C.force,a);
  a=win(t,3.1,4.8);
  api.tag('escudo: joelho no peito, canela na cintura',T.legR.E,5,-3.2,C.force,a);
  api.tag('perna de baixo contra o joelho',T.legL.H,4,3,C.gold,a);
  a=win(t,4.6,5.5);
  api.arrow(api.lerp3(T.legR.E,T.legR.H,.5),api.add(api.lerp3(T.legR.E,T.legR.H,.5),[0,.25,-.25]),C.force,a);
  api.tag('de cima levanta',api.lerp3(T.legR.E,T.legR.H,.5),5,-3,C.force,a,false);
  api.tag('de baixo corta',T.legL.H,4,3,C.gold,a);
  api.tag('cai para o lado da manga',U.head,-6,-4.5,C.info,a);
  a=win(t,6.6,8.6);
  api.tag('joelhos dos dois lados do quadril',T.legR.E,6,3,C.force,a);}
});})();
