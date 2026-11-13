/* Simulador: monta a cena a partir do estado, deixa arrastar as mãos do oponente até as pegadas
   e lista as opções da base de conhecimento (situacoes.js). */
(()=>{const J=window.Judo,S=window.JudoSim,{W3}=J,D=Math.PI/180;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
const lerp3=(a,b,k)=>[0,1,2].map(i=>a[i]+(b[i]-a[i])*k);
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const HAND_NAME={R:'Mão direita dele',L:'Mão esquerda dele'};
const SLEEVE_K=.72,HIKITE_K=.55;

/* Mesma projeção do engine3d (makeView), para acertar o arraste com o que está desenhado. */
function project(w,h,view){const a=view.a*D,e=view.e*D;
 const c=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)],R=[Math.cos(a),0,-Math.sin(a)],U=cross(c,R);
 const sc=Math.min(w,h*1.5)/view.span,cx=dot(view.center,R),cy=dot(view.center,U);
 return p=>[w/2+(dot(p,R)-cx)*sc,h/2-(dot(p,U)-cy)*sc];}

const bodyPt=(o,f,u,r)=>add(o.hip,add(mul(o.f,f),add(mul(o.u,u),mul(o.r,r))));
/* who = de quem é a mão: 'uke' (ele) ou 'tori' (você); 'o' é sempre o outro. */
function gripPoint(F,spec,who='uke'){const self=F[who],other=F[who==='uke'?'tori':'uke'];
 if(spec.sleeve){const A=F.tori['arm'+spec.sleeve];return lerp3(A.E,A.H,SLEEVE_K);}
 if(spec.sleeveOf){const A=F.uke['arm'+spec.sleeveOf];return lerp3(A.E,A.H,HIKITE_K);}
 if(spec[0]==='b')return bodyPt(spec[1]==='o'?other:self,spec[2],spec[3],spec[4]);
 return [spec[1],spec[2],spec[3]];}
const HANDS=[{k:'R',who:'uke',side:'R'},{k:'L',who:'uke',side:'L'},{k:'mR',who:'tori',side:'R'},{k:'mL',who:'tori',side:'L'}];

/* Aplica o que o usuário arrastou (ov) por cima da pose padrão de um boneco. */
function aplicaOv(fig,ov){if(!ov)return;
 for(const k of ['x','y','z','yaw','pitch','roll'])if(ov[k]!==undefined)fig[k]=ov[k];
 for(const g of ['leg','arm'])for(const h of ['R','L'])if(ov[g+h]){fig[g]=fig[g]||{};fig[g][h]=W3(...ov[g+h]);}}
/* Monta as poses; mangas dependem de onde o braço do outro está, então resolve em duas passadas. */
function resolvePose(s,ov){ov=ov||{};
 const P=S.POSICOES[s.pos],{op,me}=P.pose(s);
 op.arm={R:P.grips[s.R].spec('R'),L:P.grips[s.L].spec('L')};
 aplicaOv(op,ov.uke);aplicaOv(me,ov.tori);
 const want={op:clone(op.arm),me:clone(me.arm||{})};
 const fill=(arm,who)=>{for(const h of ['R','L']){const v=arm[h];if(v&&(v.sleeve||v.sleeveOf))arm[h]=J.B('s',.24,.2,h==='R'?.2:-.2);}};
 fill(op.arm);fill(me.arm||(me.arm={}));
 for(let pass=0;pass<2;pass++){
  const tmp={id:'__sim-tmp',keys:[[0,{uke:clone(op),tori:clone(me)}],[1,{}]]};J.register3d(tmp);delete J.techs['__sim-tmp'];
  const F=J.pose3(tmp,0);
  for(const h of ['R','L']){
   if(want.op[h]&&want.op[h].sleeve){const A=F.tori['arm'+want.op[h].sleeve];op.arm[h]=W3(...lerp3(A.E,A.H,SLEEVE_K));}
   if(want.me[h]&&want.me[h].sleeveOf){const A=F.uke['arm'+want.me[h].sleeveOf];me.arm[h]=W3(...lerp3(A.E,A.H,HIKITE_K));}}}
 return {uke:op,tori:me};}

/* Alças que o usuário arrasta: quadril, ombros (inclina o tronco), frente (gira), mãos e pés de cada boneco. */
const ALCAS=[];for(const who of ['uke','tori']){
 for(const side of ['R','L']){ALCAS.push({id:who+'.arm'+side,who,tipo:'mao',side},{id:who+'.leg'+side,who,tipo:'pe',side});}
 ALCAS.push({id:who+'.ombros',who,tipo:'ombros'},{id:who+'.frente',who,tipo:'frente'},{id:who+'.quadril',who,tipo:'quadril'});}
const ROTULO={quadril:'quadril',ombros:'tronco',frente:'girar',pe:'pé',mao:'mão'};
function pontoAlca(F,a){const o=F[a.who];
 if(a.tipo==='mao')return o['arm'+a.side].H;if(a.tipo==='pe')return o['leg'+a.side].H;
 if(a.tipo==='quadril')return o.hip;if(a.tipo==='ombros')return o.sh;return bodyPt(o,.3,.3,0);}

function readHash(){const q=new URLSearchParams(location.hash.slice(1));
 return S.normalizar({pos:q.get('pos'),R:q.get('R'),L:q.get('L'),f:q.get('f'),b:q.get('b'),mR:q.get('mR'),mL:q.get('mL')});}
function writeHash(s){const h=`#pos=${s.pos}&R=${s.R}&L=${s.L}&f=${s.f}${s.b?'&b='+s.b:''}${s.mR?`&mR=${s.mR}&mL=${s.mL}`:''}`;
 if(location.hash!==h)history.replaceState(null,'',h);}

const EXEMPLOS=[
 {t:'Pegou sua manga direita e está puxando',s:{pos:'em-pe',R:'gola-esq',L:'manga-dir',f:'puxando'}},
 {t:'Mão na sua nuca, curvado',s:{pos:'em-pe',R:'nuca',L:'manga-dir',f:'curvado'}},
 {t:'Na sua guarda, empurrando com os dois braços',s:{pos:'guarda-baixo',R:'faixa',L:'faixa',f:'ereto'}},
 {t:'Na sua guarda, um braço dentro e um fora',s:{pos:'guarda-baixo',R:'faixa',L:'livre',f:'curvado'}},
 {t:'Montado, segurando as duas golas',s:{pos:'montada-baixo',R:'gola-esq',L:'gola-dir',f:'alto'}}];

function mount(){
 const root=document.getElementById('app');J.readTheme();
 const known=new Set(J.CATALOG.map(c=>c.id));
 root.innerHTML=`
<nav class="topnav" aria-label="Navegação"><a class="home" href="index.html">← Todas as técnicas</a><span class="pn"><a href="index.html#grid">Catálogo</a></span></nav>
<header class="thead"><div><div class="eyebrow">Simulador · beta</div><h1>E se ele…?</h1>
 <p class="lede">Monte a situação: arraste as mãos, os pés, o quadril e o tronco dos dois bonecos até a posição que você quer (você é o de gi branco). Solte uma mão perto de um ponto do gi para ela pegar ali. O simulador mostra as suas opções, por que cada uma funciona, e roda a técnica a partir da posição que você montou.</p></div></header>
<section class="main sim-main">
 <div class="stage">
  <div class="views-wrap multi"><div class="cv-wrap"><canvas id="cv" role="img" aria-label="Cena do simulador"></canvas><span class="vname" id="vname"></span>
   <span class="drag-hint sim-hint" aria-hidden="true">arraste mãos, pés, quadril e tronco · arraste no vazio para girar a câmera</span></div><div class="minis" id="minis"></div></div>
  <div class="simbar" id="simbar" hidden><b id="simnome"></b><span id="simfase"></span>
   <span class="simprog"><i id="simprog"></i></span>
   <button class="btn" type="button" id="simvel">1×</button><button class="btn" type="button" id="simpausa">Pausar</button><button class="btn primary" type="button" id="simvoltar">Voltar à minha posição</button></div>
  <div class="simlivre"><button class="btn" type="button" id="reset" hidden>Desfazer o que arrastei</button></div>
 </div>
 <section class="sim-panel" aria-label="Montar a situação">
  <h2>Posição</h2><div class="chips" id="pos" role="group" aria-label="Posição"></div>
  <h2>Pegadas dele</h2>
  <label class="sel">${HAND_NAME.R}<select id="selR"></select></label>
  <label class="sel">${HAND_NAME.L}<select id="selL"></select></label>
  <h2>O que ele está fazendo</h2><div class="chips" id="acao" role="group" aria-label="Ação do oponente"></div>
  <h2 id="meusH">Suas pegadas</h2>
  <label class="sel" id="lmR">Sua mão direita<select id="selmR"></select></label>
  <label class="sel" id="lmL">Sua mão esquerda<select id="selmL"></select></label>
  <h2 id="baseH">Base dele</h2><div class="chips" id="base" role="group" aria-label="Base do oponente"></div>
  <h2>Exemplos</h2><div class="exemplos" id="ex"></div>
 </section>
</section>
<section class="sim-opcoes" aria-live="polite"><h2>Suas opções</h2><p class="sim-resumo" id="resumo"></p><ol id="ops"></ol></section>
<p class="foot">As opções são um ponto de partida para estudo, não uma regra. Treine com um professor e com um parceiro que conhece as técnicas.</p>`;
 const $=q=>root.querySelector(q),cv=$('#cv'),ctx=cv.getContext('2d');
 let s=readHash(),ov={},pose=resolvePose(s,ov),prevPose=pose,tAnim=1,vi=0,camOverride={};
 let drag=null,hoverHand=null,raf=0,lastF=null,play=null;
 const vivo=J.fisica?J.fisica.aoVivo():null;
 const P=()=>S.POSICOES[s.pos];
 const hands=()=>HANDS.filter(h=>h.who==='uke'||P().meus);
 const gripsOf=k=>k[0]==='m'?P().meus:P().grips;
 const handKey=a=>a.tipo!=='mao'?null:(a.who==='uke'?a.side:'m'+a.side);
 const viewOf=k=>Object.assign({},P().views[k],camOverride[s.pos+':'+k]||{});
 function def(){const d={id:'__sim',first:'tori',labels:{tori:'VOCÊ',uke:'ELE'},views:P().views.map((v,k)=>viewOf(k)),annotateAll:false,
   keys:[[0,{uke:clone(prevPose.uke),tori:clone(prevPose.tori)}],[1,{uke:clone(pose.uke),tori:clone(pose.tori)}]],
   names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],uke:[F.uke.head[0],Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.head[2]]}),
   annotate:(api,F)=>annotate(api,F)};
  J.register3d(d);delete J.techs.__sim;return d;}
 let D3=def();
 function annotate(api,F){const {C}=api,G=P().grips;
  if(play)return;
  const force=P().force(s);
  if(force&&!drag){const a=bodyPt(F.tori,0,-.42,0),b=bodyPt(F.uke,0,-.42,0);
   const dir=force==='pull'?[lerp3(a,b,.1),lerp3(a,b,1.05)]:[lerp3(b,a,.1),lerp3(b,a,1.05)];
   api.arrow(dir[0],dir[1],C.force,.95);api.tag(force==='pull'?'ele puxa você':'ele empurra você',lerp3(dir[0],dir[1],.5),0,2.2,C.force,.95,false);}
  for(const a of ALCAS){const p=pontoAlca(F,a),mine=a.who==='tori',act=a.id===hoverHand||(drag&&drag.id===a.id);
   const col=act?C.gold:mine?C['tori-line']:C.info;
   if(a.tipo==='mao'){api.ring(p,.055,col,.9);const k=handKey(a),G2=hands().some(h=>h.k===k)?gripsOf(k):null;
    if(G2&&!mine&&s[k]!=='livre'&&!drag)api.tag(G2[s[k]].name.replace(/^S/,'s'),p,a.side==='R'?-6:6,2.2,C.info,.95);}
   else{api.ring(p,a.tipo==='pe'?.05:.04,col,act?1:.75);if(a.tipo==='frente')api.dashed(F[a.who].sh,p,col,act?.9:.45,1.5);}
   if(act&&a.tipo!=='mao')api.tag(ROTULO[a.tipo],p,0,-2.2,C.gold,1,false);}
  if(drag&&drag.hand){const hd=HANDS.find(x=>x.k===drag.hand);for(const [id,g] of Object.entries(gripsOf(drag.hand))){if(id==='livre')continue;
    const p=gripPoint(F,g.spec(hd.side),hd.who);
    api.ring(p,id===drag.near?.07:.045,id===drag.near?C.gold:C.muted,id===drag.near?1:.7);
    if(id===drag.near)api.tag(g.name,p,4,-2.4,C.gold,1);}}}
 /* quadro físico atual: no modo simulação vem da técnica; senão, da pose montada resolvida ao vivo */
 let lastT=0;
 function frameNow(){const now=performance.now(),dt=(now-lastT)/1000;lastT=now;
  if(play&&play.fase==='tecnica')return J.solve(play.def,play.t);
  const d=play?play.entrada:D3,t=play?play.t:tAnim;
  return vivo?vivo.passo(d,t,dt>.2?1/30:dt):J.pose3(d,t);}
 function draw(){const [w,h,dpr]=size(cv);ctx.setTransform(dpr,0,0,dpr,0,0);
  const F=lastF=frameNow(),d=play&&play.fase==='tecnica'?play.def:(play?play.entrada:D3);
  J.renderDef(ctx,w,h,d,play?play.t:tAnim,{annot:true,glow:play&&play.fase==='tecnica'?undefined:0,F},vi);
  $('#vname').textContent=P().views[vi].name;
  minis.forEach((b,k)=>{b.querySelector('span').textContent=P().views[+b.dataset.v].name;J.renderTo(b.querySelector('canvas'),d,play?play.t:tAnim,{F},+b.dataset.v);});}
 function size(c){const r=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;const w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));
  if(c.width!==w||c.height!==h){c.width=w;c.height=h;}return [r.width,r.height,dpr];}
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function animate(){cancelAnimationFrame(raf);tAnim=0;let last=0;
  const step=now=>{const dt=last?Math.min(.05,(now-last)/1000):0;last=now;tAnim=reduce()?1:Math.min(1,tAnim+dt/.45);draw();if(tAnim<1)raf=requestAnimationFrame(step);else assenta();};
  raf=requestAnimationFrame(step);}
 /* alguns quadros a mais para a pose física terminar de se acomodar */
 function assenta(n=10){cancelAnimationFrame(raf);const step=()=>{draw();if(--n>0)raf=requestAnimationFrame(step);};raf=requestAnimationFrame(step);}
 function setState(n,anim=true){stop(false);const posChanged=!!n.pos&&n.pos!==s.pos;
  if(posChanged)ov={};
  for(const k of ['R','L','mR','mL'])if(n[k]!==undefined&&!n._solta){const who=k[0]==='m'?'tori':'uke';if(ov[who])delete ov[who]['arm'+k.slice(-1)];}
  n=Object.assign({},n);delete n._solta;
  s=S.normalizar(Object.assign({},posChanged?S.POSICOES[n.pos].defaults:s,n));
  prevPose=posChanged?resolvePose(s,ov):pose;if(posChanged){vi=0;if(vivo)vivo.zera();}
  pose=resolvePose(s,ov);D3=def();writeHash(s);controls();options();livreUI();if(anim)animate();else{tAnim=1;draw();assenta(6);}}
 /* pose arrastada: sem animação entre poses, a física acompanha quadro a quadro */
 function repose(){pose=prevPose=resolvePose(s,ov);D3=def();tAnim=1;draw();}
 const temOv=()=>Object.values(ov).some(o=>Object.keys(o).length);
 function livreUI(){const b=$('#reset');if(b)b.hidden=!temOv();}
 /* controles */
 const minis=[1,2].map(k=>{const b=document.createElement('button');b.className='mini';b.type='button';b.dataset.v=k;
  b.innerHTML='<canvas></canvas><span></span>';b.onclick=()=>{const t=+b.dataset.v;b.dataset.v=vi;vi=t;D3=def();draw();};$('#minis').appendChild(b);return b;});
 function chips(el,items,cur,fn){el.innerHTML='';for(const [id,label] of items){const b=document.createElement('button');b.className='chip';b.type='button';
  b.textContent=label;b.setAttribute('aria-pressed',id===cur);b.onclick=()=>fn(id);el.appendChild(b);}}
 function controls(){chips($('#pos'),Object.entries(S.POSICOES).map(([k,v])=>[k,v.name]),s.pos,id=>setState({pos:id}));
  chips($('#acao'),Object.entries(P().acoes),s.f,id=>setState({f:id}));
  const hasB=!!P().bases;$('#base').hidden=$('#baseH').hidden=!hasB;if(hasB)chips($('#base'),Object.entries(P().bases),s.b,id=>setState({b:id}));
  const hasM=!!P().meus;for(const id of ['#meusH','#lmR','#lmL'])$(id).hidden=!hasM;
  for(const h of hands().map(x=>x.k)){const sel=$('#sel'+h);sel.innerHTML=Object.entries(gripsOf(h)).map(([k,g])=>`<option value="${k}"${k===s[h]?' selected':''}>${esc(g.name)}</option>`).join('');
   sel.onchange=()=>setState({[h]:sel.value});}}
 $('#ex').innerHTML=EXEMPLOS.map((e,i)=>`<button class="ex" type="button" data-i="${i}">${esc(e.t)}</button>`).join('');
 $('#ex').onclick=e=>{const b=e.target.closest('.ex');if(!b)return;const ex=EXEMPLOS[+b.dataset.i].s;
  setState(ex);$('#cv').scrollIntoView({behavior:'smooth',block:'nearest'});};
 function options(){const list=S.avaliar(s),G=P().grips;
  const desc=[`${P().name}.`,...['R','L'].map(h=>`${HAND_NAME[h]}: ${G[s[h]].name.toLowerCase()}.`),...(s.mR?[`Você: mão direita na ${P().meus[s.mR].name.toLowerCase()}, mão esquerda na ${P().meus[s.mL].name.toLowerCase()}.`.replace(/na solta/g,'solta')]:[]),`Ele: ${P().acoes[s.f].toLowerCase()}.`,...(s.b?[`Base: ${P().bases[s.b].toLowerCase()}.`]:[])];
  $('#resumo').textContent=desc.join(' ');
  $('#ops').innerHTML=list.map((o,i)=>`<li class="op${i<3?' top':''}" data-id="${o.id}">
   <div class="op-head"><span class="op-tipo t-${esc(o.tipo.toLowerCase().replace(/[^a-z]/g,''))}">${esc(o.tipo)}</span>${i===0?'<span class="op-best">melhor encaixe</span>':''}</div>
   <h3>${esc(o.nome)}</h3><p>${esc(o.porque)}</p>
   <ol class="op-passos">${o.passos.map(p=>`<li>${esc(p)}</li>`).join('')}</ol>
   ${o.nota?`<p class="op-nota">${esc(o.nota)}</p>`:''}
   ${o.tech&&known.has(o.tech)?`<div class="op-acoes"><button class="btn primary op-sim" type="button" data-tech="${o.tech}">▶ Simular daqui</button><a class="op-link" href="${o.tech}.html${o.fase?'#fase='+encodeURIComponent(o.fase):''}">Ver a técnica passo a passo →</a></div>`:''}</li>`).join('')||'<li class="op">Nenhuma opção cadastrada para essa combinação ainda.</li>';}
 /* arraste */
 const proj=()=>{const r=cv.getBoundingClientRect();return {r,S:project(r.width,r.height,viewOf(vi))};};
 const pose3=()=>lastF||frameNow();
 const alcaAt=(x,y)=>{const {S:Sx}=proj(),F=pose3();let best=null,bd=1e9;
  for(const a of ALCAS){const p=Sx(pontoAlca(F,a)),d=Math.hypot(p[0]-x,p[1]-y)-(a.tipo==='mao'?6:a.tipo==='pe'?3:0);if(d<24&&d<bd){bd=d;best=a;}}return best;};
 const nearest=(x,y,k)=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(h=>h.k===k);let best='livre',bd=34;
  for(const [id,g] of Object.entries(gripsOf(k))){if(id==='livre')continue;const p=Sx(gripPoint(F,g.spec(hd.side),hd.who)),d=Math.hypot(p[0]-x,p[1]-y);if(d<bd){bd=d;best=id;}}return best;};
 const local=e=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
 /* deslocamento na tela -> deslocamento no mundo, no plano da câmera */
 const noMundo=(dx,dy)=>{const v=viewOf(vi),a=v.a*D,e=v.e*D,c=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)],R=[Math.cos(a),0,-Math.sin(a)],U=cross(c,R);
  const r=cv.getBoundingClientRect(),sc=Math.min(r.width,r.height*1.5)/v.span;return add(mul(R,dx/sc),mul(U,-dy/sc));};
 function mover(a,p0,delta){const o=ov[a.who]||(ov[a.who]={}),fig=pose[a.who],p=add(p0,delta);
  if(a.tipo==='quadril'){o.x=p[0];o.y=Math.max(.11,p[1]);o.z=p[2];}
  else if(a.tipo==='mao')o['arm'+a.side]=[p[0],Math.max(.03,p[1]),p[2]];
  else if(a.tipo==='pe')o['leg'+a.side]=[p[0],Math.max(.05,p[1]),p[2]];
  else if(a.tipo==='ombros'){/* inclina o tronco: o eixo quadril→ombros aponta para onde se arrasta */
   const hip=[fig.x,fig.y,fig.z],v=[p[0]-hip[0],p[1]-hip[1],p[2]-hip[2]],l=Math.hypot(...v)||1,u=v.map(q=>q/l),ps=-(fig.yaw||0)*D;
   const ux=u[0]*Math.cos(ps)+u[2]*Math.sin(ps),uz=-u[0]*Math.sin(ps)+u[2]*Math.cos(ps);
   o.pitch=Math.asin(Math.max(-1,Math.min(1,ux)))/D;o.roll=Math.atan2(uz,u[1])/D;}
  else{/* frente: gira o corpo no eixo vertical */
   const hip=[fig.x,fig.y,fig.z],dx=p[0]-hip[0],dz=p[2]-hip[2];if(Math.hypot(dx,dz)>.08){let y=Math.atan2(-dz,dx)/D;const y0=fig.yaw||0;while(y-y0>180)y-=360;while(y-y0<-180)y+=360;o.yaw=y;}}}
 cv.addEventListener('pointermove',e=>{if(drag||play)return;const [x,y]=local(e),h=alcaAt(x,y),id=h?h.id:null;if(id!==hoverHand){hoverHand=id;cv.style.cursor=h?'grab':'move';draw();}});
 cv.addEventListener('pointerdown',e=>{if(e.button)return;const [x,y]=local(e),h=play?null:alcaAt(x,y);cv.setPointerCapture(e.pointerId);
  const hint=root.querySelector('.sim-hint');if(hint)hint.classList.add('gone');
  const fim=(mv,up)=>{cv.removeEventListener('pointermove',mv);cv.removeEventListener('pointerup',up);cv.removeEventListener('pointercancel',up);};
  if(!h){const k=s.pos+':'+vi,v0=viewOf(vi),x0=e.clientX,y0=e.clientY;drag={cam:true};
   const mv=ev=>{camOverride[k]={a:v0.a-(ev.clientX-x0)*.4,e:Math.max(4,Math.min(89,v0.e+(ev.clientY-y0)*.3))};D3=def();if(play)playViews();draw();};
   const up=()=>{fim(mv,up);drag=null;};
   cv.addEventListener('pointermove',mv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);return;}
  cancelAnimationFrame(raf);tAnim=1;
  const hk=handKey(h),snap=hk&&hands().some(q=>q.k===hk)?hk:null,p0=pontoAlca(pose3(),h).slice(),x0=e.clientX,y0=e.clientY;
  drag={id:h.id,hand:snap,near:snap?s[snap]:null,moved:false};draw();
  const mv=ev=>{const dx=ev.clientX-x0,dy=ev.clientY-y0;if(!drag.moved&&Math.hypot(dx,dy)<3)return;drag.moved=true;
   mover(h,p0,noMundo(dx,dy));if(snap){const [x2,y2]=local(ev);drag.near=nearest(x2,y2,snap);}
   repose();};
  const up=()=>{fim(mv,up);const d=drag;drag=null;
   if(!d.moved){draw();return;}
   if(d.hand){if(d.near!=='livre'){setState({[d.hand]:d.near},false);return;}   /* soltou em cima de uma pegada: gruda */
    if(s[d.hand]!=='livre'){setState({[d.hand]:'livre',_solta:true},false);return;}}
   repose();assenta(8);livreUI();};
  cv.addEventListener('pointermove',mv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);});
 cv.addEventListener('pointerleave',()=>{if(hoverHand&&!drag){hoverHand=null;draw();}});
 $('#reset').onclick=()=>{ov={};if(vivo)vivo.zera();prevPose=pose;pose=resolvePose(s,ov);D3=def();livreUI();animate();};
 /* ---------- simular daqui: entra na técnica a partir da pose montada ---------- */
 const scripts={};
 const carrega=src=>scripts[src]||(scripts[src]=new Promise(ok=>{const el=document.createElement('script');el.src=src;el.onload=el.onerror=ok;document.head.appendChild(el);}));
 function playViews(){if(play&&play.def)play.def.views=P().views.map((v,k)=>viewOf(k));if(play&&play.entrada)play.entrada.views=P().views.map((v,k)=>viewOf(k));}
 async function simular(id){stop(false);const bar=$('#simbar');bar.hidden=false;$('#simnome').textContent='carregando…';
  if(!J.techs[id])await carrega('assets/tecnicas/'+id+'.js');
  const tech=J.techs[id];if(!tech)return stop();
  await new Promise(ok=>J.loadBaked(tech,ok));
  /* 1) entrada: da pose montada até o primeiro quadro da técnica, com a física ao vivo */
  const K0=clone(tech.K[0]),de={uke:clone(pose.uke),tori:clone(pose.tori)};
  for(const w of ['uke','tori']){let y=de[w].yaw||0;const alvo=K0[w].yaw||0;while(y-alvo>180)y-=360;while(y-alvo<-180)y+=360;de[w].yaw=y;}
  const entrada={id:'__entrada',first:tech.first,labels:{tori:'VOCÊ',uke:'ELE'},views:[],keys:[[0,de],[.9,{uke:K0.uke,tori:K0.tori}]]};
  J.register3d(entrada);delete J.techs.__entrada;
  /* 2) a técnica, com a câmera e os nomes do simulador */
  const d=Object.assign({},tech,{labels:{tori:'VOCÊ',uke:'ELE'},stamp:null,annotate:null,annotateAll:false,names:null});
  play={id,tech,def:d,entrada,fase:'entrada',t:0,on:true,vel:1};playViews();
  $('#simnome').textContent=tech.name;$('#simpausa').textContent='Pausar';
  $('#cv').scrollIntoView({behavior:'smooth',block:'nearest'});
  cancelAnimationFrame(raf);let last=0;
  const step=now=>{if(!play)return;const dt=last?Math.min(.05,(now-last)/1000):0;last=now;
   if(play.on){play.t+=dt*play.vel;
    if(play.fase==='entrada'&&play.t>=play.entrada.end){play.fase='tecnica';play.t=0;}
    else if(play.fase==='tecnica'&&play.t>=play.def.end){play.t=play.def.end;play.on=false;$('#simpausa').textContent='Repetir';}}
   const ph=play.fase==='entrada'?null:play.tech.phases.find(p=>play.t>=p.s&&play.t<p.e)||play.tech.phases[play.tech.phases.length-1];
   $('#simfase').textContent=ph?`${ph.ro} · ${ph.pt}`:'entrando na pegada';
   $('#simprog').style.width=(play.fase==='entrada'?0:play.t/play.def.end*100)+'%';
   draw();raf=requestAnimationFrame(step);};
  raf=requestAnimationFrame(step);}
 function stop(redraw=true){if(!play&&$('#simbar').hidden)return;play=null;cancelAnimationFrame(raf);$('#simbar').hidden=true;if(vivo)vivo.zera();if(redraw){tAnim=1;draw();assenta(6);}}
 $('#simpausa').onclick=()=>{if(!play)return;if(!play.on&&play.fase==='tecnica'&&play.t>=play.def.end-.01)play.t=0;play.on=!play.on;$('#simpausa').textContent=play.on?'Pausar':'Continuar';};
 $('#simvoltar').onclick=()=>stop();
 $('#simvel').onclick=()=>{if(!play)return;play.vel=play.vel===1?.5:play.vel===.5?.25:1;$('#simvel').textContent=String(play.vel).replace('.',',')+'×';};
 $('#ops').addEventListener('click',e=>{const b=e.target.closest('.op-sim');if(b)simular(b.dataset.tech);});
 addEventListener('hashchange',()=>{const n=readHash();if(JSON.stringify(n)!==JSON.stringify(s))setState(n);});
 new ResizeObserver(draw).observe($('.cv-wrap'));
 controls();options();writeHash(s);draw();
 window.JudoSimUI={state:()=>Object.assign({},s),set:n=>setState(n,false),livre:()=>clone(ov),simulando:()=>play?{id:play.id,fase:play.fase,t:play.t}:null,
  alcaScreen:id=>{const {S:Sx}=proj();return Sx(pontoAlca(pose3(),ALCAS.find(a=>a.id===id)));},
  handScreen:k=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(x=>x.k===k);return Sx(F[hd.who]['arm'+hd.side].H);},
  gripScreen:(id,k)=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(x=>x.k===k);return Sx(gripPoint(F,gripsOf(k)[id].spec(hd.side),hd.who));}};}
window.JudoSim.mount=mount;
})();
