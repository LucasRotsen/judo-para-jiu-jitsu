/* Judô para Jiu-Jitsu: motor 3D. Esqueleto em 3D, projeção ortográfica por câmera,
   cápsulas desenhadas com o mesmo traço do motor 2D (a projeção de uma cápsula é uma cápsula). */
(function(){
'use strict';
const J=window.Judo, D=Math.PI/180, LEN={th:.44,sh:.44,ua:.29,fa:.27};
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]], sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const len=a=>Math.hypot(a[0],a[1],a[2]), norm=a=>{const l=len(a)||1;return mul(a,1/l);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const lerp3=(a,b,k)=>add(a,mul(sub(b,a),k)), clamp=J.clamp;

/* specs: W3(x,y,z) mundo · B(who,f,u,r) ponto no referencial do tronco ('s' próprio, 'o' oponente) · SL(limb,k) */
const W3=(x,y,z)=>['w',x,y,z], B=(who,f,u,r)=>['b',who,f,u,r];
const FIG3={x:0,y:.93,z:0,yaw:0,pitch:0,roll:0,h:0,gf:1,
 pole:{legR:[1,-.2,.15],legL:[1,-.2,-.15],armR:[-.6,-.7,.4],armL:[-.6,-.7,-.4]}};
const SC=['x','y','z','yaw','pitch','roll','h','gf'];
const POLES=['legR','legL','armR','armL'];

function register3d(def){
 const K=[];let prev=null;
 for(const [t,o] of def.keys){
  const n=prev?JSON.parse(JSON.stringify(prev)):{uke:JSON.parse(JSON.stringify(FIG3)),tori:JSON.parse(JSON.stringify(FIG3))};
  merge(n,o);n.t=t;K.push(n);prev=n;}
 def.K=K;def.end=K[K.length-1].t;def.is3d=true;def.first=def.first||'uke';
 def.views=def.views||[{name:'Lateral',a:0,e:8,center:[0,.6,0],span:3.2}];
 J.techs[def.id]=def;resolverDrills();return def;}
function merge(a,b){for(const k in b){const v=b[k];if(v&&typeof v==='object'&&!Array.isArray(v)){if(!a[k]||typeof a[k]!=='object')a[k]={};merge(a[k],v);}else a[k]=v;}return a;}

/* ---------- drills: trechos de técnicas já registradas, ligados por pontes (a reação de Uke) ----------
   def.passos: {tec:'id',de,ate} usa os keyframes da técnica entre de e ate (os dois têm que ser keyframes dela);
               {ponte:[[dt,parcial],...],aperto?,glow?,notas?(api,F,t)} keyframes novos, dt contado do fim do passo anterior.
   O primeiro keyframe de cada trecho entra `entrada` s (padrão .6) depois do fim do passo anterior.
   Os dados vêm das técnicas de origem: corrigir uma técnica corrige o drill. */
const ESPERA=[];
function drill(def){ESPERA.push(def);resolverDrills();}
function resolverDrills(){for(let i=ESPERA.length-1;i>=0;i--){const d=ESPERA[i];
 if(d.passos.every(p=>!p.tec||J.techs[p.tec])){ESPERA.splice(i,1);compor(d);}}}
/* (yaw,pitch,roll) e (yaw+180,pitch+180,180-roll) são o mesmo corpo; cada técnica escolheu uma.
   Escolhe a escrita e as voltas de 360 mais próximas do estado anterior, para a interpolação não girar o boneco. */
const volta=(a,ref)=>a+360*Math.round((ref-a)/360);
function alinhar(K,prev){
 for(const w of ['uke','tori']){const p=prev[w],o=K[0][w];
  const cands=[[o.yaw,o.pitch,o.roll,false],[o.yaw+180,o.pitch+180,180-o.roll,true]].map(([y,pi,r,flip])=>{
   const Y=volta(y,p.yaw),P=volta(pi,p.pitch),R=volta(r,p.roll);
   return {flip,dy:Y-y,dp:P-pi,dr:R-r,custo:Math.abs(Y-p.yaw)+Math.abs(P-p.pitch)+Math.abs(R-p.roll)};});
  const c=cands[0].custo<=cands[1].custo?cands[0]:cands[1];
  for(const k of K){const q=k[w];if(c.flip){q.yaw+=180;q.pitch+=180;q.roll=180-q.roll;}q.yaw+=c.dy;q.pitch+=c.dp;q.roll+=c.dr;}}}
const lista=x=>x?Array.isArray(x)?x:[x]:[];
function compor(def){
 const keys=[],aperto=[],glow=[],trechos=[];let T=0,prev=null;
 for(const p of def.passos){
  if(p.tec){const src=J.techs[p.tec],K=src.K.filter(k=>k.t>=p.de-1e-6&&k.t<=p.ate+1e-6).map(k=>JSON.parse(JSON.stringify(k)));
   if(!K.length||Math.abs(K[0].t-p.de)>1e-6||Math.abs(K[K.length-1].t-p.ate)>1e-6)
    throw new Error(`${def.id}: ${p.tec} não tem keyframes em ${p.de} e ${p.ate}`);
   const t0=prev?T+(p.entrada||.6):0,off=t0-p.de;
   /* a entrada (do fim do passo anterior até o trecho) fica com o passo anterior: sem notas do golpe que ainda não começou */
   if(trechos.length)trechos[trechos.length-1].e=t0;
   if(prev)alinhar(K,prev);
   for(const k of K){const t=k.t+off;delete k.t;keys.push([t,k]);}
   for(const a of lista(src.aperto)){const s=Math.max(a.s,p.de),e=Math.min(a.e,p.ate);if(e>s)aperto.push(Object.assign({},a,{s:s+off,e:e+off}));}
   for(const g of lista(src.glow)){const s=Math.max(g.s,p.de),e=Math.min(g.e,p.ate);if(e>s)glow.push(Object.assign({},g,{s:s+off,e:e+off}));}
   T=p.ate+off;trechos.push({s:t0,e:T,off,src});prev=K[K.length-1];}
  else{const t0=T;
   for(const [dt,o] of p.ponte){keys.push([T=t0+dt,o]);}
   for(const a of lista(p.aperto))aperto.push(Object.assign({},a,{s:a.s+t0,e:a.e+t0}));
   for(const g of lista(p.glow))glow.push(Object.assign({},g,{s:g.s+t0,e:g.e+t0}));
   trechos.push({s:t0,e:T,off:-t0,notas:p.notas});
   /* estado completo no fim da ponte, para alinhar o próximo trecho */
   const st=JSON.parse(JSON.stringify(prev));for(const [,o] of p.ponte)merge(st,o);prev=st;}}
 const trechoEm=t=>trechos.find(r=>t>=r.s&&t<=r.e)||trechos[trechos.length-1];
 const ult=trechos.filter(r=>r.src).pop();
 /* vista "Acompanhar": a vista principal de cada técnica, girando suavemente nas pontes */
 const ancoras=trechos.filter(r=>r.src).flatMap(r=>[[r.s,r.src.views[0]],[r.e,r.src.views[0]]]);
 def.views=[{name:'Acompanhar',segue:ancoras}].concat(def.views||[]);
 Object.assign(def,{keys,aperto:aperto.concat(lista(def.aperto)),glow,trechos,
  stamp:ult.src.stamp&&Object.assign({},ult.src.stamp,{s:ult.src.stamp.s+ult.off,e:ult.src.stamp.e+ult.off}),
  names:F=>{const r=trechoEm(F.t);return r.src&&r.src.names?r.src.names(F):{};},
  annotate:(api,F,vi)=>{const r=trechoEm(api.t);
   if(r.src&&r.src.annotate)r.src.annotate(Object.assign({},api,{t:api.t-r.off}),F,vi);
   else if(r.notas)r.notas(api,F,api.t+r.off);}});
 register3d(def);}
function vistaEm(v,t){if(!v||!v.segue)return v;const A=v.segue;let i=0;while(i<A.length-1&&t>A[i+1][0])i++;
 const [t0,a]=A[i],[t1,b]=A[Math.min(i+1,A.length-1)];if(t1<=t0)return Object.assign({},a,{name:v.name});
 const u=clamp((t-t0)/(t1-t0),0,1),k=u*u*(3-2*u),mix=(x,y)=>x+(y-x)*k,da=((b.a-a.a)%360+540)%360-180;
 return {name:v.name,a:a.a+da*k,e:mix(a.e,b.e),span:mix(a.span,b.span),center:[0,1,2].map(i=>mix(a.center[i],b.center[i]))};}
/* brilho ativo no instante t: técnicas têm um; drills, um por trecho */
function glowEm(def,t){const g=def.glow;if(!Array.isArray(g))return g;let b=null,ba=0;
 for(const x of g){const a=J.win(t,x.s,x.e);if(a>ba){ba=a;b=x;}}return b||g[0];}

function tan(a,b,c){const d0=b-a,d1=c-b;if(d0*d1<=0)return 0;const m=(d0+d1)/2,lim=3*Math.min(Math.abs(d0),Math.abs(d1));return Math.sign(m)*Math.min(Math.abs(m),lim);}
function herm(p,u){const m1=tan(p[0],p[1],p[2]),m2=tan(p[1],p[2],p[3]),u2=u*u,u3=u2*u;
 return (2*u3-3*u2+1)*p[1]+(u3-2*u2+u)*m1+(-2*u3+3*u2)*p[2]+(u3-u2)*m2;}
const hermV=(pts,u)=>[0,1,2].map(i=>herm(pts.map(p=>p[i]),u));

function frame(o){const φ=o.roll*D,θ=o.pitch*D,ψ=o.yaw*D;
 const f0=[1,0,0],u0=[0,1,0],r0=[0,0,1];
 const u1=add(mul(u0,Math.cos(φ)),mul(r0,Math.sin(φ))),r1=sub(mul(r0,Math.cos(φ)),mul(u0,Math.sin(φ)));
 const u2=add(mul(u1,Math.cos(θ)),mul(f0,Math.sin(θ))),f2=sub(mul(f0,Math.cos(θ)),mul(u1,Math.sin(θ)));
 const ry=v=>[v[0]*Math.cos(ψ)+v[2]*Math.sin(ψ),v[1],-v[0]*Math.sin(ψ)+v[2]*Math.cos(ψ)];
 return {f:ry(f2),u:ry(u2),r:ry(r1)};}
const bp=(o,F,U,R)=>add(o.hip,add(mul(o.f,F),add(mul(o.u,U),mul(o.r,R))));
const bv=(o,v)=>add(mul(o.f,v[0]),add(mul(o.u,v[1]),mul(o.r,v[2])));
function ik3(S,T,l1,l2,pole){const v=sub(T,S),d=len(v),dc=clamp(d,Math.abs(l1-l2)+1e-3,(l1+l2)*.999);
 const n=d>1e-6?mul(v,1/d):[0,-1,0];let p=sub(pole,mul(n,dot(pole,n)));
 if(len(p)<1e-6)p=Math.abs(n[1])<.9?cross(n,[0,1,0]):cross(n,[1,0,0]);p=norm(p);
 const ca=clamp((l1*l1+dc*dc-l2*l2)/(2*l1*dc),-1,1),sa=Math.sqrt(1-ca*ca);
 return [add(S,add(mul(n,l1*ca),mul(p,l1*sa))),add(S,mul(n,dc))];}
function spec(s,o,other){
 if(s[0]==='w')return [s[1],s[2],s[3]];
 if(s[0]==='b')return bp(s[1]==='s'?o:other,s[2],s[3],s[4]);
 const R=other[s[1]];return R?lerp3(R.E,R.H,s[2]):other.sh;}

/* Tronco, ombros e cabeça dos dois bonecos no instante t (sem membros). F._c guarda o trecho de keyframes. */
function torsos(def,t){
 const K=def.K;t=clamp(t,0,def.end);let i=0;while(i<K.length-2&&t>=K[i+1].t)i++;
 const span=K[i+1].t-K[i].t,u=span>0?clamp((t-K[i].t)/span,0,1):1;
 const idx=[Math.max(i-1,0),i,i+1,Math.min(i+2,K.length-1)];const F={t};
 Object.defineProperty(F,'_c',{value:{K,idx,u,def},enumerable:false});
 for(const w of ['uke','tori']){const o={};for(const p of SC)o[p]=herm(idx.map(j=>K[j][w][p]),u);
  o.pole={};for(const p of POLES)o.pole[p]=hermV(idx.map(j=>K[j][w].pole[p]),u);
  Object.assign(o,frame(o));o.hip=[o.x,o.y,o.z];
  o.sh=bp(o,0,.48,0);o.shR=bp(o,0,.48,.19);o.shL=bp(o,0,.48,-.19);o.neck=bp(o,0,.57,0);
  const hd=norm(add(mul(o.u,Math.cos(o.h*D)),mul(o.f,Math.sin(o.h*D))));
  o.hu=hd;o.hf=norm(sub(mul(o.f,Math.cos(o.h*D)),mul(o.u,Math.sin(o.h*D))));o.head=add(o.neck,mul(hd,.13));F[w]=o;}
 return F;}
const LIMBS=[['leg','R'],['leg','L'],['arm','R'],['arm','L']];
const rootOf=(o,g,side)=>g==='leg'?bp(o,0,0,side==='R'?.1:-.1):(side==='R'?o.shR:o.shL);
/* Alvo pedido pelos keyframes para a ponta de um membro, com o estado atual do outro boneco. */
function alvo(F,w,g,side){const c=F._c,o=F[w],other=F[w==='uke'?'tori':'uke'];
 return hermV(c.idx.map(j=>spec(c.K[j][w][g][side],o,other)),c.u);}
/* Tipo do alvo no trecho atual: 'w' mundo, 'bs' próprio corpo, 'bo' corpo do outro, 's' membro do outro. */
/* Membro do outro que este membro está pegando (alvo SL nos dois keyframes vizinhos), ou null. */
function pegando(F,w,g,side){const c=F._c,a=c.K[c.idx[1]][w][g][side],b=c.K[c.idx[2]][w][g][side];return a[0]==='s'&&b[0]==='s'&&a[1]===b[1]?a[1]:null;}
function tipoAlvo(F,w,g,side){const c=F._c,s=c.K[c.idx[c.u<.5?1:2]][w][g][side];return s[0]==='b'?'b'+s[1]:s[0];}
function pes(o){
 for(const side of ['R','L']){const L=o['leg'+side],s=norm(sub(L.H,L.E));
  let toe=sub(o.f,mul(s,dot(o.f,s)));toe=len(toe)<1e-3?o.f:norm(toe);
  const gh=[o.f[0],0,o.f[2]];const k=o.gf*clamp((.17-L.H[1])/.08,0,1);
  if(k>0&&len(gh)>.2)toe=norm(lerp3(toe,norm(gh),k));
  L.heel=sub(L.H,mul(toe,.035));L.toe=add(L.H,mul(toe,.14));}}
/* Pose "crua": IK analítico direto nos alvos dos keyframes, sem colisão. É a intenção; Judo.solve dá a pose física. */
function pose3(def,t){
 const F=torsos(def,t),first=def.first==='tori'?'tori':'uke';
 for(const w of (first==='tori'?['tori','uke']:['uke','tori'])){const o=F[w];
  for(const [g,side] of LIMBS){const leg=g==='leg',root=rootOf(o,g,side);
   const [E,H]=ik3(root,alvo(F,w,g,side),leg?LEN.th:LEN.ua,leg?LEN.sh:LEN.fa,bv(o,o.pole[g+side]));o[g+side]={root,E,H};}
  pes(o);}
 /* 2ª passada: quem foi resolvido primeiro não enxergava os membros do outro (SL caía no ombro). */
 {const w=first,o=F[w],c=F._c;
  for(const [g,side] of LIMBS){
   if(!c.idx.some(j=>c.K[j][w][g][side][0]==='s'))continue;
   const leg=g==='leg',L=o[g+side];
   const [E,H]=ik3(L.root,alvo(F,w,g,side),leg?LEN.th:LEN.ua,leg?LEN.sh:LEN.fa,bv(o,o.pole[g+side]));
   const d=L.toe?sub(L.toe,L.H):null;L.E=E;L.H=H;   /* pé mantém a direção, só acompanha o tornozelo */
   if(d){L.heel=sub(H,mul(norm(d),.035));L.toe=add(H,d);}}}
 return F;}

/* ---------- camera ---------- */
function camera(v){const a=v.a*D,e=v.e*D;const c=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)];
 const R=[Math.cos(a),0,-Math.sin(a)],U=cross(c,R);return {c,R,U};}
function makeView(w,h,view){const cam=camera(view),sc=Math.min(w,h*1.5)/view.span;
 const cx=dot(view.center,cam.R),cy=dot(view.center,cam.U);
 const S=p=>[w/2+(dot(p,cam.R)-cx)*sc,h/2-(dot(p,cam.U)-cy)*sc];
 return {w,h,sc,S,cam,bias:view.bias,depth:p=>dot(p,cam.c),lw:Math.max(1,sc*.011),fs:clamp(w/60,10.5,13.5)};}

/* ---------- primitives ---------- */
function pal(who,C){return who==='U'?{gi:C.uke,gi2:C['uke-2'],line:C['uke-line'],lapel:C['uke-2']}:{gi:C.tori,gi2:C['tori-2'],line:C['tori-line'],lapel:C['tori-2']};}
function buildPrims(F,def,ga){const P=[],g=glowEm(def,F.t);
 for(const [who,o] of [['T',F.tori],['U',F.uke]]){
  const cap=(a,b,r,kind,side,extra)=>P.push(Object.assign({k:'cap',a,b,r,kind,side,who},extra||{}));
  for(const s of [1,-1])cap(bp(o,0,.12,.07*s),bp(o,0,.42,.07*s),.125,'gi',s>0?'R':'L');
  cap(o.neck,lerp3(o.neck,o.head,.6),.035,'skin',null);
  const ring=[];for(let k=0;k<=12;k++){const a=k/12*2*Math.PI;ring.push(bp(o,.15*Math.cos(a),.1,.205*Math.sin(a)));}
  for(let k=0;k<12;k++)cap(ring[k],ring[k+1],.026,'belt',null);
  cap(bp(o,.15,.1,.05),bp(o,.2,-.05,.09),.016,'belt',null);
  cap(bp(o,.135,.53,.06),bp(o,.15,.24,-.02),.011,'lapel',null);
  cap(bp(o,.135,.53,-.06),bp(o,.15,.32,.03),.011,'lapel',null);
  P.push({k:'head',c:o.head,f:o.hf,u:o.hu,who});
  P.push({k:'sph',c:add(o.head,mul(o.hf,.105)),r:.026,kind:'skin',who});
  for(const side of ['R','L']){
   const L=o['leg'+side],A=o['arm'+side],gl=g&&g.limbs?g.limbs[`${who}.${side}.leg`]:null,ga2=g&&g.limbs?g.limbs[`${who}.${side}.arm`]:null;
   const lk=`${who}.${side}.leg`,ak=`${who}.${side}.arm`;
   if(gl&&ga>0){cap(L.root,L.E,.105,'glow',null,{glow:gl,ga,key:lk,bias:-.004});cap(L.E,L.H,.098,'glow',null,{glow:gl,ga,key:lk,bias:-.004});}
   if(ga2&&ga>0){cap(A.root,A.E,.09,'glow',null,{glow:ga2,ga,key:ak,bias:-.004});cap(A.E,A.H,.085,'glow',null,{glow:ga2,ga,key:ak,bias:-.004});}
   cap(L.root,L.E,.072,'gi',side,{key:lk});cap(L.E,lerp3(L.E,L.H,.9),.064,'gi',side,{key:lk});cap(L.heel,L.toe,.033,'skin',null,{key:lk});
   const cuff=lerp3(A.E,A.H,.72);
   cap(A.root,A.E,.06,'gi',side,{key:ak});cap(A.E,cuff,.055,'gi',side,{key:ak});cap(cuff,A.H,.03,'skin',null,{key:ak});
   P.push({k:'sph',c:A.H,r:.047,kind:'skin',who,key:ak});}}
 return P;}
/* view.bias {'T.R.arm':.15}: empurra um membro para frente na ordenação desta vista (cápsulas longas sobrepostas) */
function primDepth(p,V){const vb=V.bias&&p.key?V.bias[p.key]||0:0;
 return (p.k==='cap'?V.depth(lerp3(p.a,p.b,.5)):V.depth(p.c))+(p.bias||0)+vb;}
function drawPrim(ctx,V,p,F,C){
 const P=pal(p.who,C),o=p.who==='T'?F.tori:F.uke;
 const far=p.side?dot(o.r,V.cam.c)*(p.side==='R'?1:-1)<-.05:false;
 const fill=p.kind==='gi'?(far?P.gi2:P.gi):p.kind==='skin'?C.skin:p.kind==='belt'?C.belt:p.kind==='lapel'?P.lapel:C[p.glow];
 if(p.k==='cap'){const A=V.S(p.a),Bq=V.S(p.b);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(Bq[0],Bq[1]);
  if(p.kind==='glow'){ctx.save();ctx.globalAlpha*=p.ga*.75;ctx.strokeStyle=fill;ctx.lineWidth=p.r*2*V.sc;ctx.stroke();ctx.restore();return;}
  if(p.kind!=='lapel'&&p.kind!=='belt'){ctx.strokeStyle=P.line;ctx.lineWidth=p.r*2*V.sc+V.lw*2;ctx.stroke();}
  ctx.strokeStyle=fill;ctx.lineWidth=p.r*2*V.sc;ctx.stroke();return;}
 if(p.k==='sph'){const c=V.S(p.c);ctx.beginPath();ctx.arc(c[0],c[1],p.r*V.sc,0,7);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=V.lw;ctx.strokeStyle=P.line;ctx.stroke();return;}
 const H=V.S(p.c),r=.115*V.sc;ctx.save();ctx.beginPath();ctx.arc(H[0],H[1],r,0,7);ctx.fillStyle=C.skin;ctx.fill();ctx.clip();
 /* Rosto voltado para a câmera: o cabelo sobe para o topo, senão cobre o rosto inteiro. */
 const fa=Math.max(0,dot(p.f,V.cam.c));
 const hc=V.S(add(p.c,add(mul(p.f,-.05*(1-fa)),mul(p.u,.04+.06*fa))));ctx.beginPath();ctx.arc(hc[0],hc[1],r,0,7);ctx.fillStyle=C.hair;ctx.fill();ctx.restore();
 ctx.beginPath();ctx.arc(H[0],H[1],r,0,7);ctx.lineWidth=V.lw;ctx.strokeStyle=P.line;ctx.stroke();}
function floor(ctx,V,C){const {w,h}=V;ctx.fillStyle=C.wall;ctx.fillRect(0,0,w,h);
 const q=[[-4,0,-3],[4,0,-3],[4,0,3],[-4,0,3]].map(V.S);ctx.beginPath();q.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
 ctx.fillStyle=C.tatami;ctx.fill();ctx.strokeStyle=C['tatami-2'];ctx.lineWidth=Math.max(1,V.sc*.01);
 for(let x=-3.6;x<=4;x+=.9){const a=V.S([x,0,-3]),b=V.S([x,0,3]);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
 for(let z=-2.7;z<=3;z+=1.8){const a=V.S([-4,0,z]),b=V.S([4,0,z]);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}}
function shadow(ctx,V,o){const k=clamp(1-o.hip[1]/1.6,.3,1);ctx.save();ctx.globalAlpha=.16*k;ctx.fillStyle='#000';ctx.beginPath();
 for(let i=0;i<=20;i++){const a=i/20*2*Math.PI,p=V.S([o.hip[0]+.42*Math.cos(a),0,o.hip[2]+.3*Math.sin(a)]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}
 ctx.fill();ctx.restore();}

function draw3d(ctx,w,h,def,t,opts,vi){
 const C=J.C,view=opts.view||vistaEm(def.views[vi]||def.views[0],t),V=makeView(w,h,view),F=opts.F||(J.solve||pose3)(def,t);
 const g=glowEm(def,t),ga=opts.glow!==undefined?opts.glow:(opts.annot&&g?J.win(t,g.s,g.e):0);
 floor(ctx,V,C);
 /* membro "fantasma" só no palco com anotações; em miniatura o pontilhado vira ruído */
 const xk=opts.xray||(opts.annot&&def.xray&&J.win(t,def.xray.s,def.xray.e)>0?def.xray.key:null);
 /* corpo humano em WebGL; sem WebGL2 (ou com ?capsulas), as cápsulas de antes */
 if(!(J.gl&&!J.semGL&&J.gl.desenhar(ctx,V,F,C,{glow:{limbs:g&&g.limbs,ga},xray:xk}))){
  shadow(ctx,V,F.tori);shadow(ctx,V,F.uke);
  const all=buildPrims(F,def,ga),ghost=all.filter(p=>xk&&p.key===xk&&p.kind!=='glow');
  const list=all.filter(p=>!ghost.includes(p)).map(p=>[primDepth(p,V),p]).sort((a,b)=>a[0]-b[0]);
  for(const [,p] of list)drawPrim(ctx,V,p,F,C);
  if(ghost.length){const xa=opts.xray?1:J.win(t,def.xray.s,def.xray.e);ctx.save();ctx.globalAlpha*=1-.62*xa;
   for(const p of ghost.map(p=>[primDepth(p,V),p]).sort((a,b)=>a[0]-b[0]))drawPrim(ctx,V,p[1],F,C);ctx.restore();}}
 if(!opts.annot)return;
 const api=makeApi(ctx,V,F);
 const top=o=>[o.hip[0],Math.max(o.head[1],o.hip[1])+.3,o.hip[2]];const nm=def.names?def.names(F):{};
 const lb=def.labels||{tori:'TORI',uke:'UKE'};
 J.prim.tag(ctx,V,lb.tori,nm.tori||top(F.tori),0,0,C['tori-line'],.95,false);
 J.prim.tag(ctx,V,lb.uke,nm.uke||top(F.uke),0,0,C.uke,.95,false);
 if(def.annotate&&(vi===0||def.annotateAll))def.annotate(api,F,vi);
 if(def.stamp)J.prim.stamp(ctx,V,def.stamp,t);}
function makeApi(ctx,V,F){const P=J.prim;return {ctx,V,F,t:F.t,C:J.C,D,win:J.win,clamp,add,sub,mul,lerp3,bp,
 tag:(text,wp,dx,dy,col,a,lead=true)=>P.tag(ctx,V,text,wp,dx,dy,col,a,lead),
 arrow:(a,b,col,al)=>P.arrow(ctx,V,a,b,col,al),dashed:(a,b,col,al,w)=>P.dashed(ctx,V,a,b,col,al,w),
 ring:(p,r,col,al)=>P.ring(ctx,V,p,r,col,al),
 arc:(c,ax,ay,r,a0,a1,col,al)=>{if(!(al>0))return;const pts=[];for(let i=0;i<=24;i++){const a=(a0+(a1-a0)*i/24)*D;pts.push(add(c,add(mul(ax,r*Math.cos(a)),mul(ay,r*Math.sin(a)))));}
  for(let i=0;i<pts.length-2;i++)P.dashed(ctx,V,pts[i],pts[i+1],col,al,Math.max(2,V.fs*.2));P.arrow(ctx,V,pts[pts.length-3],pts[pts.length-1],col,al);}};}

Object.assign(J,{register3d,drill,glowEm,vistaEm,pose3,draw3d,W3,B,_3d:{torsos,alvo,tipoAlvo,pegando,pes,rootOf,ik3,bp,bv,LEN,LIMBS,makeView,makeApi,floor,shadow,frame}});
})();
