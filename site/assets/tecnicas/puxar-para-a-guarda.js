(()=>{const {W3,B,SL,win}=Judo;
/* Mundo 3D: y para cima. Uke começa em x<0 olhando para +x (direita de Uke = +z).
   Tori começa em x>0 olhando para -x (yaw 180, direita de Tori = -z), como no Tomoe Nage.
   Tori põe o pé direito no quadril esquerdo de Uke, senta perto do próprio calcanhar e deita de costas com a cabeça
   para +x (yaw 180, pitch -90). Os braços puxam Uke para a frente; Uke cai de joelhos entre as pernas de Tori,
   que se fecham atrás da cintura dele. No fim é a guarda fechada da raspagem de quadril, girada 180°. */
const uke0={x:-.32,y:.93,z:0,yaw:0,pitch:4,h:0,
 leg:{R:W3(-.26,.07,.13),L:W3(-.40,.07,-.12)},
 arm:{R:B('o',.13,.40,-.08),L:B('o',.13,.40,.08)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
/* pegada: mão direita na gola de Uke, mão esquerda na manga direita dele */
const tori0={x:.32,y:.93,z:0,yaw:180,pitch:4,h:0,
 leg:{R:W3(.28,.07,-.13),L:W3(.40,.07,.12)},
 arm:{R:B('o',.14,.42,-.08),L:SL('armR',.55)},
 pole:{armR:[-.4,-.8,.5],armL:[-.4,-.8,-.5]}};
/* guarda fechada (raspagem de quadril girada 180°, deslocada para x=.40) */
const toriG={x:.40,y:.15,z:0,yaw:180,pitch:-90,roll:0,h:30,
 leg:{R:B('o',-.24,.08,.03),L:B('o',-.24,.12,-.03)},arm:{R:SL('armL',.85),L:SL('armR',.85)},
 pole:{legR:[.3,0,1],legL:[.3,0,-1],armR:[-.6,.3,.6],armL:[-.6,.3,-.6]}};
const ukeG={x:.04,y:.42,z:0,yaw:0,pitch:22,roll:0,h:-5,
 leg:{R:W3(-.22,.07,.17),L:W3(-.22,.07,-.17)},arm:{R:B('o',.10,-.02,-.15),L:B('o',.10,-.02,.15)},
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.3,-.7,.6],armL:[-.3,-.7,-.6]}};
Judo.register3d({
 id:'puxar-para-a-guarda', name:'Puxar para a guarda', kanji:'', group:'ne', cls:'Jiu-jitsu · Puxada',
 bjj:'Puxar para a guarda (pull guard)',
 why:'O jeito de levar a luta para o chão sem projetar: quem prefere lutar por baixo senta com a pegada e já cai na guarda fechada.',
 summary:'Puxada para a guarda fechada a partir da pegada em pé. Tori segura a gola e a manga, apoia o pé no quadril de Uke e senta perto do próprio calcanhar, sem pular. Os braços trazem Uke para baixo, Uke cai de joelhos e as pernas de Tori se fecham atrás da cintura dele.',
 reading:[{k:'Puxar',r:'pull guard',m:'levar o oponente para dentro da própria guarda'}],
 facts:[['Origem','Jiu-jitsu. No judô sentar sem projetar é punido; no jiu-jitsu é o começo mais comum da luta.'],
  ['Pegada primeiro','Sem gola e manga presas, Uke dá um passo para trás e Tori fica sentado sozinho, sem guarda.'],
  ['Sentar, não pular','Tori senta perto do próprio calcanhar, controlando a descida. Pular com as duas pernas na cintura cai com o peso de Uke em cima.'],
  ['Pontuação','Nas regras da IBJJF puxar para a guarda não vale ponto nem punição. Nas regras de luta agarrada sem kimono também é permitido.']],
 errors:[['Sentar longe de Uke','Com o quadril longe dos pés de Uke, as pernas não alcançam a cintura e Uke passa direto para o lado.'],
  ['Soltar a pegada ao sentar','Os braços continuam puxando. Sem a puxada, Uke fica em pé e começa a passar a guarda.'],
  ['Cair de costas reto','Tori senta primeiro e depois deita. Cair reto bate a cabeça e as costas.'],
  ['Deixar a guarda aberta','As pernas se fecham logo atrás da cintura. Aberta, Uke se levanta e a luta recomeça de pé.']],
 safety:['Sente de forma controlada, nunca se jogue de costas com o peso de Uke vindo junto.',
  'Uke não deve cair com os joelhos travados: dobre as pernas e ajoelhe.',
  'Nas competições de faixas mais baixas, confira se a regra permite puxar. Treine com orientação de um professor qualificado.'],
 /* contratos (tools/contratos.js): o que tem que ser verdade no movimento, conferido em todo build */
 contratos:[
  {c:'contato',a:'T.peR',b:'U.quadril',s:1.4,e:2.6,txt:'Tori põe o pé direito no quadril de Uke'},
  {c:'lado',a:'T.peR',de:'U.quadril',lado:'esquerda',s:1.4,e:2.6,min:.0,txt:'o pé direito vai no quadril ESQUERDO de Uke'},
  {c:'lado',a:'U.quadril',de:'T.quadril',lado:'abaixo',s:5.0,e:'fim',min:.1,txt:'Uke cai de joelhos entre as pernas de Tori'}],
 phases:[
 {s:0,e:1.2,kanji:'1',ro:'Pegada',pt:'Gola e manga',
  d:'Tori e Uke estão de pé, de frente. Tori segura a gola de Uke com a mão direita e a manga direita dele com a esquerda.',
  l:['Gola e manga presas antes de sentar.','Cotovelos perto do corpo.','Tori escolhe a hora, não espera Uke projetar.']},
 {s:1.2,e:2.2,kanji:'2',ro:'Pé no quadril',pt:'Apoiar o pé no quadril de Uke',
  d:'Tori levanta o pé direito e apoia a sola no quadril esquerdo de Uke. A perna dobrada segura a distância e prepara a descida.',
  l:['Sola no osso do quadril, não na barriga.','O pé de apoio fica perto de Uke.']},
 {s:2.2,e:3.4,kanji:'3',ro:'Sentar',pt:'Sentar perto do calcanhar',
  d:'Tori dobra a perna de apoio e senta perto do próprio calcanhar, sem pular. Os braços puxam a gola e a manga para baixo e Uke é trazido para a frente.',
  l:['Desce controlando, como quem senta numa cadeira baixa.','Os braços puxam Uke junto.','O quadril cai perto dos pés de Uke.']},
 {s:3.4,e:4.6,kanji:'4',ro:'Deitar',pt:'Costas no chão, pernas na cintura',
  d:'Tori deita de costas e as duas pernas abraçam a cintura de Uke. Puxado pelos braços, Uke dobra os joelhos e cai ajoelhado entre as pernas de Tori.',
  l:['Primeiro senta, depois deita.','As pernas vão por fora do quadril de Uke.','Uke cai de joelhos, não de cara.']},
 {s:4.6,e:7.5,kanji:'5',ro:'Guarda fechada',pt:'Fechar as pernas',
  d:'Tori cruza os tornozelos atrás da cintura de Uke e mantém a gola e a manga. Agora está na guarda fechada, de onde saem raspagens e finalizações.',
  l:['Tornozelos cruzados atrás da cintura.','Pegadas mantidas.','Daqui saem raspagem de quadril, kimura e guilhotina.']}],
 rep:[.6,1.8,2.9,4.0,6.4], cover:2.9,
 views:[
  {name:'Diagonal',a:20,e:14,center:[.15,.75,0],span:3.6},
  {name:'Lateral',a:0,e:4,center:[.15,.75,0],span:3.6},
  {name:'Diagonal alta',a:-40,e:38,center:[.15,.5,0],span:3.4}],
 keys:[
 [0,{uke:uke0,tori:tori0}],
 [1.2,{}],
 /* pé direito de Tori sobe ao quadril esquerdo de Uke; o pé esquerdo dá meio passo para perto */
 [1.8,{tori:{x:.28,y:.90,pitch:-4,leg:{R:B('o',.14,.02,-.14),L:W3(.30,.07,.10)},pole:{legR:[1,.4,-.4],legL:[1,0,.2]}},
       uke:{pitch:8}}],
 [2.2,{}],
 /* senta perto do calcanhar esquerdo; braços puxam Uke para a frente e para baixo */
 [2.8,{tori:{x:.34,y:.36,pitch:-30,h:20,leg:{L:W3(.16,.07,.22)},pole:{legL:[1,.4,.5]},arm:{R:B('o',.14,.36,-.08)}},
       uke:{x:-.24,y:.88,pitch:22,h:8,leg:{R:W3(-.20,.09,.20),L:W3(-.36,.09,-.18)}}}],
 [3.4,{tori:{x:.38,y:.18,pitch:-62,h:25,leg:{L:W3(.14,.26,.42)},pole:{legL:[1,.3,.6]}},
       uke:{x:-.12,y:.74,pitch:30,leg:{R:W3(-.18,.08,.20),L:W3(-.28,.08,-.18)},pole:{legR:[1,-.2,.2],legL:[1,-.2,-.2]}}}],
 /* deita; as duas pernas por fora do quadril de Uke, que cai de joelhos */
 [4.0,{tori:{x:.40,y:.15,pitch:-84,h:28,leg:{R:B('o',.02,.06,-.26),L:B('o',.02,.06,.26)},pole:{legR:[.3,0,1],legL:[.3,0,-1]}},
       uke:{x:-.02,y:.52,pitch:30,leg:{R:W3(-.22,.07,.18),L:W3(-.24,.07,-.18)}}}],
 [4.6,{tori:toriG,uke:ukeG}],
 [7.5,{}]],
 /* pé no quadril de Uke; pernas fechadas em volta da cintura */
 aperto:[{s:1.6,e:3.6,limbs:['T.R.leg'],tol:.08,tudo:true},{s:3.8,e:7.5,limbs:['T.R.leg','T.L.leg'],tol:.10,tudo:true}],
 names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],
  uke:[F.uke.head[0],F.uke.head[1]+.3,F.uke.head[2]]}),
 glow:{s:1.2,e:4.8,limbs:{'T.R.arm':'force','T.L.arm':'force','T.R.leg':'gold'}},
 stamp:{s:4.8,e:7.5,big:'Guarda',small:'PUXADA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,1.3);
  api.tag('gola e manga',T.armR.H,6,-3,C.force,a);
  a=win(t,1.3,2.3);
  api.tag('pé no quadril',T.legR.H,6,3,C.gold,a);
  a=win(t,2.3,3.5);
  api.arrow(T.hip,api.add(T.hip,[0,-.25,0]),C.force,a);
  api.tag('senta perto do calcanhar',T.hip,6,3,C.force,a);
  api.tag('braços puxam Uke',T.armL.E,-6,-3,C.force,a);
  a=win(t,3.5,4.7);
  api.tag('Uke cai de joelhos',U.legR.E,-6,3,C.uke,a);
  a=win(t,4.8,7.5);
  api.tag('tornozelos cruzados',T.legR.H,6,-3,C.force,a);}
});})();
