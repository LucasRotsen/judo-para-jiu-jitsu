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

/* Monta as poses; mangas dependem de onde o braço do outro está, então resolve em duas passadas. */
function resolvePose(s){
 const P=S.POSICOES[s.pos],{op,me}=P.pose(s);
 op.arm={R:P.grips[s.R].spec('R'),L:P.grips[s.L].spec('L')};
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
 <p class="lede">Monte a situação: arraste as mãos do oponente (gi azul) até um ponto do seu gi, e em pé também as suas, e diga o que ele está fazendo. O simulador mostra as suas opções e por que cada uma funciona.</p></div></header>
<section class="main sim-main">
 <div class="stage">
  <div class="views-wrap multi"><div class="cv-wrap"><canvas id="cv" role="img" aria-label="Cena do simulador"></canvas><span class="vname" id="vname"></span>
   <span class="drag-hint sim-hint" aria-hidden="true">arraste as mãos · arraste no vazio para girar</span></div><div class="minis" id="minis"></div></div>
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
 let s=readHash(),pose=resolvePose(s),prevPose=pose,tAnim=1,vi=0,camOverride={};
 let drag=null,hoverHand=null,raf=0;
 const P=()=>S.POSICOES[s.pos];
 const hands=()=>HANDS.filter(h=>h.who==='uke'||P().meus);
 const gripsOf=k=>k[0]==='m'?P().meus:P().grips;
 const viewOf=k=>Object.assign({},P().views[k],camOverride[s.pos+':'+k]||{});
 function def(){const d={id:'__sim',first:'tori',labels:{tori:'VOCÊ',uke:'ELE'},views:P().views.map((v,k)=>viewOf(k)),annotateAll:false,
   keys:[[0,{uke:clone(prevPose.uke),tori:clone(prevPose.tori)}],[1,{uke:clone(pose.uke),tori:clone(pose.tori)}]],
   names:F=>({tori:[F.tori.head[0],Math.max(F.tori.head[1],F.tori.hip[1])+.3,F.tori.head[2]],uke:[F.uke.head[0],Math.max(F.uke.head[1],F.uke.hip[1])+.3,F.uke.head[2]]}),
   annotate:(api,F)=>annotate(api,F)};
  J.register3d(d);delete J.techs.__sim;return d;}
 let D3=def();
 function annotate(api,F){const {C}=api,G=P().grips;
  const force=P().force(s);
  if(force){const a=bodyPt(F.tori,0,-.42,0),b=bodyPt(F.uke,0,-.42,0);
   const dir=force==='pull'?[lerp3(a,b,.1),lerp3(a,b,1.05)]:[lerp3(b,a,.1),lerp3(b,a,1.05)];
   api.arrow(dir[0],dir[1],C.force,.95);api.tag(force==='pull'?'ele puxa você':'ele empurra você',lerp3(dir[0],dir[1],.5),0,2.2,C.force,.95,false);}
  for(const hd of hands()){const H=F[hd.who]['arm'+hd.side].H,G2=gripsOf(hd.k),mineH=hd.who==='tori',act=hd.k===hoverHand||(drag&&drag.k===hd.k);
   api.ring(H,.055,act?C.gold:mineH?C['tori-line']:C.info,.9);
   if(!mineH&&s[hd.k]!=='livre'&&!drag)api.tag(G2[s[hd.k]].name.replace(/^S/,'s'),H,hd.side==='R'?-6:6,mineH?-2.2:2.2,mineH?C['tori-line']:C.info,.95);}
  if(drag&&drag.k){const hd=HANDS.find(x=>x.k===drag.k);for(const [id,g] of Object.entries(gripsOf(drag.k))){if(id==='livre')continue;
    const p=gripPoint(F,g.spec(hd.side),hd.who);
    api.ring(p,id===drag.near?.07:.045,id===drag.near?C.gold:C.muted,id===drag.near?1:.7);
    if(id===drag.near)api.tag(g.name,p,4,-2.4,C.gold,1);}}}
 function draw(){const [w,h,dpr]=size(cv);ctx.setTransform(dpr,0,0,dpr,0,0);
  J.renderDef(ctx,w,h,D3,tAnim,{annot:true,glow:0},vi);
  $('#vname').textContent=P().views[vi].name;
  minis.forEach((b,k)=>{b.querySelector('span').textContent=P().views[+b.dataset.v].name;J.renderTo(b.querySelector('canvas'),D3,tAnim,{},+b.dataset.v);});}
 function size(c){const r=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;const w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));
  if(c.width!==w||c.height!==h){c.width=w;c.height=h;}return [r.width,r.height,dpr];}
 function animate(){cancelAnimationFrame(raf);tAnim=0;let last=0;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step=now=>{const dt=last?Math.min(.05,(now-last)/1000):0;last=now;tAnim=reduce?1:Math.min(1,tAnim+dt/.45);draw();if(tAnim<1)raf=requestAnimationFrame(step);};
  raf=requestAnimationFrame(step);}
 function setState(n,anim=true){const posChanged=!!n.pos&&n.pos!==s.pos;
  s=S.normalizar(Object.assign({},posChanged?S.POSICOES[n.pos].defaults:s,n));
  prevPose=posChanged?resolvePose(s):pose;if(posChanged)vi=0;
  pose=resolvePose(s);D3=def();writeHash(s);controls();options();if(anim)animate();else{tAnim=1;draw();}}
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
   ${o.tech&&known.has(o.tech)?`<a class="op-link" href="${o.tech}.html${o.fase?'#fase='+encodeURIComponent(o.fase):''}">Ver a animação →</a>`:''}</li>`).join('')||'<li class="op">Nenhuma opção cadastrada para essa combinação ainda.</li>';}
 /* arraste */
 const proj=()=>{const r=cv.getBoundingClientRect();return {r,S:project(r.width,r.height,viewOf(vi))};};
 const pose3=()=>J.pose3(D3,tAnim);
 const handAt=(x,y)=>{const {S:Sx}=proj(),F=pose3();let best=null,bd=28;
  for(const hd of hands()){const p=Sx(F[hd.who]['arm'+hd.side].H),d=Math.hypot(p[0]-x,p[1]-y);if(d<bd){bd=d;best=hd.k;}}return best;};
 const nearest=(x,y,k)=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(h=>h.k===k);let best='livre',bd=60;
  for(const [id,g] of Object.entries(gripsOf(k))){if(id==='livre')continue;const p=Sx(gripPoint(F,g.spec(hd.side),hd.who)),d=Math.hypot(p[0]-x,p[1]-y);if(d<bd){bd=d;best=id;}}return best;};
 const local=e=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
 cv.addEventListener('pointermove',e=>{if(drag)return;const [x,y]=local(e),h=handAt(x,y);if(h!==hoverHand){hoverHand=h;cv.style.cursor=h?'grab':'move';draw();}});
 cv.addEventListener('pointerdown',e=>{if(e.button)return;const [x,y]=local(e),h=handAt(x,y);cv.setPointerCapture(e.pointerId);
  const hint=root.querySelector('.sim-hint');if(hint)hint.classList.add('gone');
  if(h){drag={k:h,near:s[h]};draw();}
  else{const k=s.pos+':'+vi,v0=viewOf(vi),x0=e.clientX,y0=e.clientY;drag={cam:true};
   const mv=ev=>{camOverride[k]={a:v0.a-(ev.clientX-x0)*.4,e:Math.max(4,Math.min(89,v0.e+(ev.clientY-y0)*.3))};D3=def();draw();};
   const up=()=>{cv.removeEventListener('pointermove',mv);cv.removeEventListener('pointerup',up);cv.removeEventListener('pointercancel',up);drag=null;};
   cv.addEventListener('pointermove',mv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);return;}
  const mv=ev=>{const [x2,y2]=local(ev),n=nearest(x2,y2,drag.k);if(n!==drag.near){drag.near=n;draw();}};
  const up=()=>{cv.removeEventListener('pointermove',mv);cv.removeEventListener('pointerup',up);cv.removeEventListener('pointercancel',up);
   const d=drag;drag=null;if(d.near!==s[d.k])setState({[d.k]:d.near});else draw();};
  cv.addEventListener('pointermove',mv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);});
 cv.addEventListener('pointerleave',()=>{if(hoverHand&&!drag){hoverHand=null;draw();}});
 addEventListener('hashchange',()=>{const n=readHash();if(JSON.stringify(n)!==JSON.stringify(s))setState(n);});
 new ResizeObserver(draw).observe($('.cv-wrap'));
 controls();options();writeHash(s);draw();
 window.JudoSimUI={state:()=>Object.assign({},s),set:n=>setState(n,false),
  handScreen:k=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(x=>x.k===k);return Sx(F[hd.who]['arm'+hd.side].H);},
  gripScreen:(id,k)=>{const {S:Sx}=proj(),F=pose3(),hd=HANDS.find(x=>x.k===k);return Sx(gripPoint(F,gripsOf(k)[id].spec(hd.side),hd.who));}};}
window.JudoSim.mount=mount;
})();
