(()=>{const {W,TP,A,SL,lerp2,tp,win}=Judo;
const tapK=[];[8.0,8.2,8.4,8.6,8.8,9.0].forEach((t,i)=>tapK.push([t,{uke:{arm:{R:W(.45,i%2?.30:.42)}}}]));
Judo.register({
 id:'hadaka-jime', name:'Hadaka Jime', kanji:'裸絞',
 cls:'Ne-waza · Shime-waza', group:'ne', first:'tori',
 bjj:'Mata-leão',
 why:'O estrangulamento mais famoso do jiu-jitsu, a finalização que coroa a pegada das costas.',
 summary:'Estrangulamento sem usar o gi. Tori, nas costas de Uke com os ganchos, passa o antebraço pela garganta, fecha a figura-4 e aperta. É o mata-leão do jiu-jitsu.',
 reading:[{k:'裸',r:'hadaka',m:'nu, sem o gi'},{k:'絞',r:'jime',m:'estrangulamento'}],
 facts:[['Grupo','Katame-waza › Shime-waza (estrangulamentos)'],['Pegada','Sem gi: o braço faz todo o trabalho, por isso vale também no no-gi e no MMA'],
  ['Ponto de pressão','As laterais do pescoço (artérias carótidas). O antebraço não esmaga a traqueia.'],
  ['No jiu-jitsu','Mata-leão. Sai das costas com os dois ganchos e o cinto de segurança. Em competição vale a finalização; nas costas, os ganchos já somam pontos.']],
 errors:[['Antebraço na traqueia','Apertar a frente da garganta dói, mas não finaliza e machuca. O cotovelo fica sob o queixo e os lados do braço fazem a pressão.'],
  ['Cruzar os pés','Com os tornozelos cruzados na frente de Uke, ele pode travar seus pés e fazer uma chave de pé.'],
  ['Distância do peito','Espaço entre o peito de Tori e as costas de Uke deixa ele escorregar para baixo e escapar.'],
  ['Puxar só com o braço','O aperto vem de expandir o peito e fechar os cotovelos, não de puxar para trás com força.']],
 safety:['Solte imediatamente quando o parceiro bater (no tatame, nele ou com a voz). Nunca aperte de uma vez.',
  'Aplique devagar no treino. O estrangulamento sanguíneo leva à perda de consciência em segundos.',
  'Pratique só com orientação de um professor qualificado.'],
 phases:[
 {s:0,e:2.2,kanji:'後',ro:'Costas',pt:'Ganchos e cinto de segurança',
  d:'Tori está sentado atrás de Uke, peito colado nas costas dele. Os calcanhares entram por dentro das coxas de Uke (ganchos) e os braços fecham o cinto de segurança: um por cima do ombro, outro por baixo da axila.',
  l:['Ganchos por dentro das coxas, nunca com os pés cruzados.','Peito colado: as costas de Uke não podem desgrudar.','O cinto de segurança controla os ombros antes do pescoço.']},
 {s:2.2,e:4.4,kanji:'絞',ro:'Encaixe',pt:'Antebraço na garganta',
  d:'O braço que estava por cima do ombro desliza para o pescoço. O cotovelo de Tori fica bem embaixo do queixo de Uke, com o bíceps de um lado do pescoço e o antebraço do outro.',
  l:['Cotovelo alinhado com o queixo de Uke.','Uke luta pelo pulso, por isso o encaixe é rápido.','A cabeça de Tori cola na cabeça de Uke, do lado do braço que estrangula.']},
 {s:4.4,e:6.0,kanji:'固',ro:'Trava',pt:'Figura-4',
  d:'A mão do braço que estrangula agarra o bíceps do outro braço. A outra mão vai para a nuca de Uke. Isso fecha a figura-4, que não deixa o braço escapar.',
  l:['Mão no bíceps, não no antebraço.','A segunda mão empurra a cabeça para frente, por trás.','Os ganchos seguem firmes durante a troca.']},
 {s:6.0,e:7.9,kanji:'締',ro:'Aperto',pt:'Peito expande, cotovelos fecham',
  d:'Tori aperta expandindo o peito para frente e trazendo os cotovelos um em direção ao outro. A pressão vem dos lados do pescoço, nas artérias carótidas.',
  l:['Aperto progressivo, nunca um tranco.','Expandir o peito vale mais do que puxar para trás.','A cabeça de Tori segue colada à de Uke.']},
 {s:7.9,e:10.5,kanji:'参',ro:'Maitta',pt:'Uke bate, Tori solta',
  d:'Uke bate (maitta, “desisto”). No judô isso vale ippon. Tori solta na hora e abre o braço.',
  l:['A batida pode ser na perna, no braço ou no tatame.','Soltar imediatamente é parte da técnica.','Uke volta a respirar normalmente em instantes.']}],
 rep:[1.1,3.3,5.2,7.2,8.7], cover:6.8,
 view:{x0:-.5,y0:-.1,w:2.1,h:1.4},
 keys:[
 [0,{uke:{x:.55,y:.16,T:100,f:1,h:-20,gf:0,leg:{R:W(1.22,.07),L:W(1.12,.07)},arm:{R:TP('s',.17,.50),L:TP('s',.15,.44)}},
     tori:{x:.12,y:.16,T:82,f:1,h:-8,gf:0,bR:1,leg:{R:W(.88,.18),L:W(.84,.18)},arm:{R:TP('o',.17,.40),L:TP('o',.15,.22)}}}],
 [2.2,{}],
 [3.0,{tori:{bR:0,arm:{R:TP('o',.16,.62)}},uke:{h:-14,arm:{R:SL('armR',.12),L:SL('armR',.3)}}}],
 [3.6,{tori:{bR:-1,h:-5,arm:{R:TP('o',-.16,.72)}},uke:{h:-10}}],
 [4.4,{}],
 [5.2,{tori:{bL:1,arm:{L:TP('o',-.12,.76)}}}],
 [6.0,{}],
 [7.0,{tori:{x:.09,T:88,h:-8},uke:{x:.52,T:107,h:-2}}],
 [7.9,{}],
 ...tapK,
 [9.5,{tori:{x:.12,T:82,h:-8,bR:1,arm:{R:TP('s',.30,.35),L:TP('o',.15,.22)}},uke:{x:.55,T:100,h:-15,arm:{R:TP('s',.17,.42),L:TP('s',.15,.40)}}}],
 [10.5,{}]],
 order:()=>['U.far.leg','U.far.arm','T.far.leg','T.far.arm','U.body','T.body','U.near.leg','U.near.arm','T.near.leg','T.near.arm'],
 glow:{s:2.2,e:4.6,limbs:{'T.R.arm':'force'}},
 stamp:{s:8.0,e:10.5,big:'一本',small:'MAITTA'},
 annotate:(api,F)=>{const {t,C}=api,U=F.uke,T=F.tori;let a;
  a=win(t,0,2.4);
  api.tag('ganchos por dentro das coxas',T.legR.H,2,4.2,C.force,a);
  api.tag('cinto de segurança',T.armR.E,4,-4,C.force,a);
  a=win(t,2.6,4.6);
  api.tag('cotovelo sob o queixo',T.armR.E,6,-3,C.force,a);
  api.tag('Uke luta pelo pulso',U.armR.H,7,2.5,C.uke,a);
  a=win(t,4.6,6.2);
  api.tag('mão no bíceps',T.armR.H,-8,2.6,C.force,a);
  api.tag('mão na nuca',T.armL.H,6,-4,C.force,a);
  a=win(t,6.1,8.0);
  if(a>0){const c=tp(T,.18,.30);api.arrow(c,[c[0]+.22,c[1]+.02],C.force,a);api.tag('peito expande',[c[0]+.22,c[1]],4.2,1.8,C.force,a,false);
   api.arc(U.neck,.2,120,40,C.force,a);api.tag('cotovelos fecham',[U.neck[0],U.neck[1]+.2],-1,-2.2,C.force,a,false);}
  a=win(t,8.0,10.6);
  api.tag('Uke bate: solte na hora',U.armR.H,7,1.5,C.uke,a);}
});})();
