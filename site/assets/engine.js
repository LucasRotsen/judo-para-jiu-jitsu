/* Judô para Jiu-Jitsu: motor de animação compartilhado.
   Cada técnica chama Judo.register({...}) num arquivo próprio em assets/tecnicas/. */
(function(){
'use strict';
const D=Math.PI/180, LEN={th:.44,sh:.44,ua:.29,fa:.27};

const CATALOG=window.JUDO_CATALOG||[];
const techs={};

/* ---------- specs ---------- */
const W=(x,y)=>['w',x,y];                 // ponto fixo no mundo
const TP=(who,u,v)=>['t',who,u,v];        // ponto no tronco: 's' = próprio, 'o' = oponente
const A=(a,b)=>['a',a,b];                 // ângulos no referencial do corpo (coxa/braço, canela/antebraço)
const SL=(limb,k)=>['s',limb,k];          // ponto ao longo do membro do oponente (ex.: 'armR', .7)

function merge(a,b){for(const k in b){const v=b[k];if(v&&typeof v==='object'&&!Array.isArray(v)){if(!a[k]||typeof a[k]!=='object')a[k]={};merge(a[k],v);}else a[k]=v;}return a;}
const FIG_DEFAULTS={r:0,h:0,gf:1,bR:-1,bL:-1};
function register(def){
 const K=[];let prev=null;
 for(const [t,o] of def.keys){
  const n=prev?JSON.parse(JSON.stringify(prev)):{uke:Object.assign({},FIG_DEFAULTS),tori:Object.assign({},FIG_DEFAULTS)};
  merge(n,o);n.t=t;K.push(n);prev=n;}
 def.K=K;def.end=K[K.length-1].t;
 def.view=Object.assign({x0:-.95,y0:-.16,w:3.2,h:2.58},def.view||{});
 def.first=def.first||'uke';
 techs[def.id]=def;return def;}

/* ---------- interpolation & kinematics ---------- */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const nrm=v=>{const l=Math.hypot(v[0],v[1])||1;return [v[0]/l,v[1]/l];};
const lerp2=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];
function tan(a,b,c){const d0=b-a,d1=c-b;if(d0*d1<=0)return 0;const m=(d0+d1)/2,lim=3*Math.min(Math.abs(d0),Math.abs(d1));return Math.sign(m)*Math.min(Math.abs(m),lim);}
function herm(p,u){const m1=tan(p[0],p[1],p[2]),m2=tan(p[1],p[2],p[3]),u2=u*u,u3=u2*u;
 return (2*u3-3*u2+1)*p[1]+(u3-2*u2+u)*m1+(-2*u3+3*u2)*p[2]+(u3-u2)*m2;}
function wv(o,a){const w=(a+o.r)*D;return [o.fx*Math.cos(w),Math.sin(w)];}
function tp(o,u,v){const t=o.T*D,n=(o.T-90)*D;const bx=v*Math.cos(t)+u*Math.cos(n),by=v*Math.sin(t)+u*Math.sin(n);
 const c=Math.cos(o.r*D),s=Math.sin(o.r*D);return [o.x+o.fx*(bx*c-by*s),o.y+bx*s+by*c];}
function ik(P,T,l1,l2,s){const dx=T[0]-P[0],dy=T[1]-P[1],d=Math.hypot(dx,dy);
 const dc=clamp(d,Math.abs(l1-l2)+1e-3,(l1+l2)*.999),base=Math.atan2(dy,dx);
 const a=Math.acos(clamp((l1*l1+dc*dc-l2*l2)/(2*l1*dc),-1,1)),ang=base+s*a;
 return [[P[0]+l1*Math.cos(ang),P[1]+l1*Math.sin(ang)],[P[0]+dc*Math.cos(base),P[1]+dc*Math.sin(base)]];}
function spec(s,o,other,root,l1,l2){
 if(s[0]==='w')return [s[1],s[2]];
 if(s[0]==='t')return tp(s[1]==='s'?o:other,s[2],s[3]);
 if(s[0]==='a'){const a=wv(o,s[1]),b=wv(o,s[2]);return [root[0]+l1*a[0]+l2*b[0],root[1]+l1*a[1]+l2*b[1]];}
 const R=other[s[1]];if(!R)return other.sh;return lerp2(R.E,R.H,s[2]);}
const SC=['x','y','T','r','f','h','gf','bR','bL'];
function pose(def,t){
 const K=def.K;t=clamp(t,0,def.end);let i=0;while(i<K.length-2&&t>=K[i+1].t)i++;
 const span=K[i+1].t-K[i].t,u=span>0?clamp((t-K[i].t)/span,0,1):1;
 const idx=[Math.max(i-1,0),i,i+1,Math.min(i+2,K.length-1)];
 const F={t};
 for(const w of ['uke','tori']){const o={};for(const p of SC)o[p]=herm(idx.map(j=>K[j][w][p]),u);
  o.fx=(o.f>=0?1:-1)*Math.max(Math.abs(o.f),.35);
  o.hip=[o.x,o.y];o.sh=tp(o,0,.5);o.neck=tp(o,0,.57);
  const hd=wv(o,o.T+o.h);o.head=[o.neck[0]+.13*hd[0],o.neck[1]+.13*hd[1]];
  o.up=nrm(hd);o.front=nrm(wv(o,o.T+o.h-90));F[w]=o;}
 const order=def.first==='tori'?['tori','uke']:['uke','tori'];
 for(const w of order)limbs(F,w,idx,u,K);
 return F;}
function limbs(F,w,idx,u,K){
 const o=F[w],other=F[w==='uke'?'tori':'uke'],sg=o.fx>=0?1:-1;
 for(const [g,side] of [['leg','R'],['leg','L'],['arm','R'],['arm','L']]){
  const leg=g==='leg',root=leg?o.hip:o.sh,l1=leg?LEN.th:LEN.ua,l2=leg?LEN.sh:LEN.fa;
  const pts=idx.map(j=>spec(K[j][w][g][side],o,other,root,l1,l2));
  const T=[herm(pts.map(p=>p[0]),u),herm(pts.map(p=>p[1]),u)];
  const [E,H]=ik(root,T,l1,l2,(leg?1:o['b'+side])*sg);
  o[g+side]={root,E,H};}
 for(const side of ['R','L']){const L=o['leg'+side];const s=nrm([L.H[0]-L.E[0],L.H[1]-L.E[1]]);
  const perp=sg>0?[-s[1],s[0]]:[s[1],-s[0]];const th=-Math.asin(clamp((L.H[1]-.07)/.12,0,1));
  const d=nrm(lerp2(perp,[sg*Math.cos(th),Math.sin(th)],o.gf));
  L.heel=[L.H[0]-.035*d[0],L.H[1]-.035*d[1]];L.toe=[L.H[0]+.14*d[0],L.H[1]+.14*d[1]];}
}

/* ---------- theme ---------- */
const C={};
const TOKENS=['bg','surface','ink','muted','line','tatami','tatami-2','wall','wall-2','force','gold','info','uke','uke-2','uke-line','tori','tori-2','tori-line','skin','hair','belt'];
function readTheme(){const cs=getComputedStyle(document.documentElement);for(const n of TOKENS)C[n]=cs.getPropertyValue('--'+n).trim();}

/* ---------- drawing primitives ---------- */
function viewport(w,h,view){const v=view||{x0:-.95,y0:-.16,w:3.2,h:2.58};const sc=Math.min(w/v.w,h/v.h);
 const ox=(w-v.w*sc)/2-v.x0*sc,oy=(h+v.h*sc)/2+v.y0*sc;
 return {w,h,sc,S:p=>[ox+p[0]*sc,oy-p[1]*sc],lw:Math.max(1,sc*.011),fs:clamp(w/60,10.5,13.5)};}
function cap(ctx,V,a,b,w,fill,line){const A=V.S(a),B=V.S(b);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);
 ctx.strokeStyle=line;ctx.lineWidth=w*V.sc+V.lw*2;ctx.stroke();ctx.strokeStyle=fill;ctx.lineWidth=w*V.sc;ctx.stroke();}
function dot(ctx,V,p,r,fill,line){const P=V.S(p);ctx.beginPath();ctx.arc(P[0],P[1],r*V.sc,0,7);ctx.fillStyle=fill;ctx.fill();if(line){ctx.lineWidth=V.lw;ctx.strokeStyle=line;ctx.stroke();}}
function pal(who){return who==='U'?{gi:C.uke,gi2:C['uke-2'],line:C['uke-line'],lapel:C['uke-2']}:{gi:C.tori,gi2:C['tori-2'],line:C['tori-line'],lapel:C['tori-2']};}
function drawLeg(ctx,V,o,P,side,far,glow=0,gc=''){const L=o['leg'+side],gi=far?P.gi2:P.gi;
 if(glow>0){ctx.save();ctx.globalAlpha*=glow*.75;cap(ctx,V,L.root,L.E,.19,gc,gc);cap(ctx,V,L.E,L.H,.175,gc,gc);cap(ctx,V,L.heel,L.toe,.11,gc,gc);ctx.restore();}
 cap(ctx,V,L.heel,L.toe,.065,C.skin,P.line);cap(ctx,V,L.root,L.E,.145,gi,P.line);cap(ctx,V,L.E,lerp2(L.E,L.H,.9),.13,gi,P.line);}
function drawArm(ctx,V,o,P,side,far,glow=0,gc='',part='all'){const A=o['arm'+side],gi=far?P.gi2:P.gi,cuff=lerp2(A.E,A.H,.72);
 const up=part!=='lower',lo=part!=='upper';
 if(glow>0){ctx.save();ctx.globalAlpha*=glow*.75;if(up)cap(ctx,V,A.root,A.E,.165,gc,gc);if(lo){cap(ctx,V,A.E,A.H,.15,gc,gc);dot(ctx,V,A.H,.07,gc);}ctx.restore();}
 if(lo){cap(ctx,V,cuff,A.H,.06,C.skin,P.line);dot(ctx,V,A.H,.047,C.skin,P.line);}
 if(up)cap(ctx,V,A.root,A.E,.12,gi,P.line);if(lo)cap(ctx,V,A.E,cuff,.11,gi,P.line);}
function drawBody(ctx,V,o,P){
 cap(ctx,V,tp(o,0,.10),tp(o,0,.44),.30,P.gi,P.line);
 const L1=V.S(tp(o,.02,.55)),L2=V.S(tp(o,.15,.23));ctx.lineCap='round';ctx.strokeStyle=P.lapel;ctx.lineWidth=.022*V.sc;
 ctx.beginPath();ctx.moveTo(L1[0],L1[1]);ctx.lineTo(L2[0],L2[1]);ctx.stroke();
 cap(ctx,V,tp(o,-.15,.09),tp(o,.15,.09),.05,C.belt,C.belt);
 cap(ctx,V,tp(o,.15,.09),tp(o,.21,-.05),.028,C.belt,C.belt);
 cap(ctx,V,tp(o,0,.48),o.head,.07,C.skin,P.line);
 const nose=[o.head[0]+o.front[0]*.105,o.head[1]+o.front[1]*.105];dot(ctx,V,nose,.026,C.skin,P.line);
 const H=V.S(o.head),r=.115*V.sc;ctx.save();ctx.beginPath();ctx.arc(H[0],H[1],r,0,7);ctx.fillStyle=C.skin;ctx.fill();ctx.clip();
 const hc=V.S([o.head[0]-o.front[0]*.05+o.up[0]*.04,o.head[1]-o.front[1]*.05+o.up[1]*.04]);
 ctx.beginPath();ctx.arc(hc[0],hc[1],r,0,7);ctx.fillStyle=C.hair;ctx.fill();ctx.restore();
 ctx.beginPath();ctx.arc(H[0],H[1],r,0,7);ctx.lineWidth=V.lw;ctx.strokeStyle=P.line;ctx.stroke();}
function drawStage(ctx,V){
 const {w,h,S}=V,f=S([0,0]);
 const g=ctx.createLinearGradient(0,0,0,f[1]);g.addColorStop(0,C.wall);g.addColorStop(1,C['wall-2']);
 ctx.fillStyle=g;ctx.fillRect(0,0,w,f[1]);ctx.fillStyle=C.tatami;ctx.fillRect(0,f[1],w,h-f[1]);
 ctx.strokeStyle=C['tatami-2'];ctx.lineWidth=Math.max(1,V.sc*.01);
 for(let x=-3.5;x<4.5;x+=.9){const a=S([x,0]),b=S([x-.12,-.4]);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
 ctx.fillStyle=C['tatami-2'];ctx.fillRect(0,f[1],w,Math.max(2,V.sc*.018));}
function shadow(ctx,V,o){const lo=Math.min(o.hip[1],o.head[1]),k=clamp(1-lo/1.6,.25,1);const P=V.S([o.x+.05,0]);
 ctx.save();ctx.globalAlpha=.18*k;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(P[0],P[1]+V.sc*.01,.38*V.sc*k+8,.035*V.sc,0,0,7);ctx.fill();ctx.restore();}

/* ---------- annotation primitives ---------- */
const win=(t,s,e,f=.3)=>clamp((t-s)/f,0,1)*clamp((e-t)/f,0,1);
function tag(ctx,V,text,wp,dx,dy,col,a,lead=true){if(!(a>0))return;const P=V.S(wp),fs=V.fs;
 ctx.save();ctx.globalAlpha*=a;ctx.font=`600 ${fs}px "IBM Plex Sans",system-ui,sans-serif`;
 const tw=ctx.measureText(text).width,pw=tw+fs*1.1,ph=fs*1.9,bx=P[0]+dx*fs-pw/2,by=P[1]+dy*fs-ph/2;
 if(lead){ctx.strokeStyle=col;ctx.lineWidth=1.25;ctx.beginPath();ctx.moveTo(P[0],P[1]);ctx.lineTo(clamp(P[0],bx,bx+pw),clamp(P[1],by,by+ph));ctx.stroke();
  ctx.fillStyle=col;ctx.beginPath();ctx.arc(P[0],P[1],3,0,7);ctx.fill();}
 ctx.fillStyle=C.surface;ctx.strokeStyle=col;ctx.lineWidth=1.25;ctx.beginPath();ctx.roundRect(bx,by,pw,ph,ph/2);ctx.fill();ctx.stroke();
 ctx.fillStyle=C.ink;ctx.textBaseline='middle';ctx.fillText(text,bx+fs*.55,by+ph/2+.5);ctx.restore();}
function head(ctx,B,ang,s){ctx.beginPath();ctx.moveTo(B[0],B[1]);ctx.lineTo(B[0]-s*Math.cos(ang-.45),B[1]-s*Math.sin(ang-.45));
 ctx.lineTo(B[0]-s*Math.cos(ang+.45),B[1]-s*Math.sin(ang+.45));ctx.closePath();ctx.fill();}
function arrow(ctx,V,a,b,col,al){if(!(al>0))return;const A=V.S(a),B=V.S(b),s=V.fs*.9;ctx.save();ctx.globalAlpha*=al;
 ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=Math.max(2,V.fs*.22);ctx.lineCap='round';
 const ang=Math.atan2(B[1]-A[1],B[0]-A[0]);ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0]-Math.cos(ang)*s*.6,B[1]-Math.sin(ang)*s*.6);ctx.stroke();head(ctx,B,ang,s);ctx.restore();}
function arc(ctx,V,c,r,a0,a1,col,al){if(!(al>0))return;const pts=[];for(let i=0;i<=24;i++){const a=(a0+(a1-a0)*i/24)*D;pts.push(V.S([c[0]+r*Math.cos(a),c[1]+r*Math.sin(a)]));}
 ctx.save();ctx.globalAlpha*=al;ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=Math.max(2,V.fs*.2);ctx.lineCap='round';
 ctx.beginPath();pts.slice(0,-1).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
 const B=pts[pts.length-1],Pb=pts[pts.length-3];head(ctx,B,Math.atan2(B[1]-Pb[1],B[0]-Pb[0]),V.fs*.9);ctx.restore();}
function dashed(ctx,V,a,b,col,al,w=1.5){if(!(al>0))return;const A=V.S(a),B=V.S(b);ctx.save();ctx.globalAlpha*=al;ctx.setLineDash([5,4]);
 ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();ctx.restore();}
function ring(ctx,V,p,r,col,al){if(!(al>0))return;const P=V.S(p);ctx.save();ctx.globalAlpha*=al;ctx.strokeStyle=col;ctx.lineWidth=2;ctx.setLineDash([4,3]);
 ctx.beginPath();ctx.arc(P[0],P[1],r*V.sc,0,7);ctx.stroke();ctx.restore();}
function makeApi(ctx,V,F){return {ctx,V,F,t:F.t,C,D,tp,lerp2,win,clamp,
 tag:(text,wp,dx,dy,col,a,lead=true)=>tag(ctx,V,text,wp,dx,dy,col,a,lead),
 arrow:(a,b,col,al)=>arrow(ctx,V,a,b,col,al),
 arc:(c,r,a0,a1,col,al)=>arc(ctx,V,c,r,a0,a1,col,al),
 dashed:(a,b,col,al,w)=>dashed(ctx,V,a,b,col,al,w),
 ring:(p,r,col,al)=>ring(ctx,V,p,r,col,al),
 dot:(p,r,col,al)=>{if(!(al>0))return;ctx.save();ctx.globalAlpha*=al;dot(ctx,V,p,r,col,C.surface);ctx.restore();},
 band:(x0,x1,col,al)=>{if(!(al>0))return;const P1=V.S([x0,0]),P2=V.S([x1,0]);ctx.save();ctx.globalAlpha*=al;ctx.strokeStyle=col;ctx.lineWidth=Math.max(3,V.sc*.025);ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(P1[0],P1[1]+2);ctx.lineTo(P2[0],P2[1]+2);ctx.stroke();ctx.restore();},
 label:(text,sx,sy,col,a)=>tag(ctx,{S:q=>q,fs:V.fs},text,[sx*V.w,sy*V.h],0,0,col,a,false)};}

/* ---------- scene ---------- */
const DEFAULT_ORDER=['T.far.leg','T.far.arm','U.far.leg','U.far.arm','T.body','U.body','U.near.leg','U.near.arm','T.near.leg','T.near.arm'];
function resolve(F,tok){const p=tok.split('.'),who=p[0],o=who==='T'?F.tori:F.uke;
 if(p[1]==='body')return {who,o,body:true,key:who+'.body'};
 const nearS=o.fx>=0?'R':'L',side=p[1]==='near'?nearS:p[1]==='far'?(nearS==='R'?'L':'R'):p[1];
 return {who,o,side,limb:p[2],part:p[3]||'all',far:side!==nearS,key:`${who}.${side}.${p[2]}`};}
function drawPart(ctx,V,r,gcol,ga){const P=pal(r.who);if(r.body)return drawBody(ctx,V,r.o,P);
 const gc=gcol?C[gcol]:'',gl=gcol?ga:0;
 if(r.limb==='arm')drawArm(ctx,V,r.o,P,r.side,r.far,gl,gc,r.part);else drawLeg(ctx,V,r.o,P,r.side,r.far,gl,gc);}
function trailOf(def){if(def._trail||!def.trail)return def._trail;const tr=def.trail,out=[];
 for(let s=tr.s;s<=tr.e+1e-6;s+=.02){const p=pose(def,s);const o=p[tr.fig||'uke'];const row={t:s};for(const j of tr.joints||['hip','head'])row[j]=o[j];out.push(row);}
 return def._trail=out;}
function drawScene(ctx,V,F,def,opts={}){
 const annot=!!opts.annot,g=def.glow;
 const ga=opts.glow!==undefined?opts.glow:(annot&&g?win(F.t,g.s,g.e):0);
 drawStage(ctx,V);shadow(ctx,V,F.tori);shadow(ctx,V,F.uke);
 const order=(def.order&&def.order(F))||DEFAULT_ORDER;
 for(const tok of order){const r=resolve(F,tok);if(opts.xray&&r.key===opts.xray)continue;drawPart(ctx,V,r,g&&g.limbs?g.limbs[r.key]:null,ga);}
 if(opts.xray){const r=resolve(F,opts.xray);r.part='all';ctx.save();ctx.globalAlpha*=.38;drawPart(ctx,V,r,null,0);ctx.restore();
  const L=r.o[r.limb+r.side];ctx.save();ctx.setLineDash([5,4]);ctx.lineWidth=2;ctx.strokeStyle=C.gold;ctx.lineCap='round';
  for(const [a,b] of [[L.root,L.E],[L.E,L.H]]){const p=V.S(a),q=V.S(b);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();}ctx.restore();}
 if(!annot)return;
 const api=makeApi(ctx,V,F);
 const top=o=>[o.x,Math.max(o.head[1],o.hip[1])+.27];
 const nm=def.names?def.names(F):{};
 tag(ctx,V,'TORI',nm.tori||top(F.tori),0,0,C['tori-line'],.95,false);
 tag(ctx,V,'UKE',nm.uke||top(F.uke),0,0,C.uke,.95,false);
 const tr=def.trail;
 if(tr&&F.t>tr.s){const al=win(F.t,tr.s,tr.hide||def.end+1,.6)*.85;const pts=trailOf(def);ctx.save();ctx.globalAlpha*=al;ctx.strokeStyle=C.info;ctx.lineWidth=2;ctx.setLineDash([2,5]);ctx.lineCap='round';
  for(const k of tr.joints||['hip','head']){ctx.beginPath();let first=true;for(const p of pts){if(p.t>F.t)break;const P=V.S(p[k]);first?ctx.moveTo(P[0],P[1]):ctx.lineTo(P[0],P[1]);first=false;}ctx.stroke();}ctx.restore();}
 if(def.annotate)def.annotate(api,F);
 if(def.stamp)stamp(ctx,V,def.stamp,F.t);
 if(def.lens)drawLens(ctx,V,F,def);}
function stamp(ctx,V,st,t){const sa=win(t,st.s,st.e,.25);if(sa<=0)return;const s=V.fs;ctx.save();ctx.globalAlpha*=sa;ctx.translate(V.w*.80,V.h*.17);ctx.rotate(-6*D);
 const sz=1+.5*(1-clamp((t-st.s)/.25,0,1));ctx.scale(sz,sz);ctx.strokeStyle=C.force;ctx.lineWidth=2.5;ctx.strokeRect(-s*4.8,-s*2,s*9.6,s*4);
 ctx.fillStyle=C.force;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${s*2}px "Shippori Mincho",serif`;ctx.fillText(st.big,-s*1.9,0);
 ctx.font=`600 ${s*.9}px "IBM Plex Mono",monospace`;ctx.fillText(st.small,s*2.5,0);ctx.restore();}
function drawLens(ctx,V,F,def){const L=def.lens,a=win(F.t,L.s,L.e);if(a<=0)return;
 const c=L.center(F),R=Math.min(V.h*.25,V.w*.19),lx=V.w-R-12,ly=R+12,z=L.zoom||1.9,sc=V.sc*z;
 const V2={w:V.w,h:V.h,sc,lw:V.lw*1.7,fs:V.fs,S:p=>[lx+(p[0]-c[0])*sc,ly-(p[1]-c[1])*sc]};
 const P=V.S(c),r0=R/z,ang=Math.atan2(ly-P[1],lx-P[0]);
 ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=C.ink;ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
 ctx.beginPath();ctx.arc(P[0],P[1],r0,0,7);ctx.stroke();
 ctx.beginPath();ctx.moveTo(P[0]+r0*Math.cos(ang),P[1]+r0*Math.sin(ang));ctx.lineTo(lx-R*Math.cos(ang),ly-R*Math.sin(ang));ctx.stroke();ctx.setLineDash([]);
 ctx.save();ctx.beginPath();ctx.arc(lx,ly,R,0,7);ctx.clip();drawScene(ctx,V2,F,def,{annot:false,glow:1,xray:L.ghost});ctx.restore();
 ctx.lineWidth=3;ctx.strokeStyle=C.ink;ctx.beginPath();ctx.arc(lx,ly,R,0,7);ctx.stroke();ctx.restore();
 if(L.labels)L.labels(makeApi(ctx,V2,F),F,a);
 if(L.caption)tag(ctx,{S:q=>q,fs:V.fs},L.caption,[lx,ly+R],0,1.7,C.ink,a,false);}

/* ---------- canvas helpers ---------- */
function size(c){const r=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1;const w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));
 if(c.width!==w||c.height!==h){c.width=w;c.height=h;}return [r.width,r.height,dpr];}
function renderDef(ctx,w,h,def,t,opts,vi){opts=opts||{};
 if(def.is3d)return window.Judo.draw3d(ctx,w,h,def,t,opts,vi||0);
 drawScene(ctx,viewport(w,h,def.view),pose(def,t),def,opts);}
function renderTo(c,def,t,opts,vi){const [w,h,dpr]=size(c);const ctx=c.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
 renderDef(ctx,w,h,def,t,opts,vi);}
function onTheme(fn){matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{readTheme();fn();});
 new MutationObserver(()=>{readTheme();fn();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 if(document.fonts)document.fonts.ready.then(()=>{readTheme();fn();});}
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Progresso do aluno, só no aparelho (ADR 0001). Falha silenciosa em modo privado. */
const Progress={KEY:'jpj:v1',
 read(){try{return Object.assign({seen:{},done:{},fav:{},speed:1},JSON.parse(localStorage.getItem(this.KEY)||'{}'));}catch(e){return {seen:{},done:{},fav:{},speed:1};}},
 write(d){try{localStorage.setItem(this.KEY,JSON.stringify(d));}catch(e){}},
 update(fn){const d=this.read();fn(d);this.write(d);return d;},
 toggle(set,id){return this.update(d=>{if(d[set][id])delete d[set][id];else d[set][id]=Date.now();})[set][id]!==undefined;}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const GROUP={nage:'Nage-waza · projeção',ne:'Ne-waza · solo'};
const DEFAULT_SAFETY=['Pratique apenas com um professor qualificado, em tatame, e com um parceiro que conhece a técnica.',
 'Comece devagar e sem resistência. Repita a entrada muitas vezes antes de aplicar com força.'];

/* ---------- technique page ---------- */
function mountPage(id){
 const def=techs[id],root=document.getElementById('app');readTheme();
 const i0=CATALOG.findIndex(c=>c.id===id),prev=CATALOG[(i0+CATALOG.length-1)%CATALOG.length],next=CATALOG[(i0+1)%CATALOG.length];
 const PH=def.phases,END=def.end;
 root.innerHTML=`
 <nav class="topnav"><a class="home" href="index.html">← Todas as técnicas</a>
  <span class="pn"><a href="${prev.id}.html">‹ ${esc(prev.name)}</a><a href="${next.id}.html">${esc(next.name)} ›</a></span></nav>
 <header class="thead">
  <div><div class="eyebrow">${esc(def.cls)}</div><h1>${esc(def.name)}</h1>
   <p class="bjj"><span>No jiu-jitsu</span>${esc(def.bjj)}</p>
   <div class="mine" role="group" aria-label="Meu progresso">
    <button class="pill" id="done" aria-pressed="false"><span aria-hidden="true">✓</span> <span class="lbl">Marcar como estudada</span></button>
    <button class="pill" id="fav" aria-pressed="false"><span aria-hidden="true">★</span> <span class="lbl">Favoritar</span></button></div>
   <p class="lede">${esc(def.summary)}</p></div>
  <div class="name" aria-label="Leitura do nome">${def.reading.map(p=>`<div><b lang="ja">${p.k}</b><i>${esc(p.r)}</i><span>${esc(p.m)}</span></div>`).join('')}</div>
 </header>
 <section class="main">
  <div class="stage">
   <div class="views-wrap${def.is3d?' multi':''}">
    <div class="cv-wrap"><canvas id="cv" role="img" aria-label="Animação de ${esc(def.name)}. Toque para pausar, arraste para os lados para avançar ou voltar."></canvas><span class="drag-hint" aria-hidden="true">⟷ arraste para avançar ou voltar</span>${def.is3d?'<span class="vname" id="vname"></span>':''}</div>
    ${def.is3d?'<div class="minis" id="minis"></div>':''}
   </div>
   <div class="controls">
    <button class="btn" id="prev" aria-label="Fase anterior"><svg viewBox="0 0 16 16"><path d="M10.5 2.5 5 8l5.5 5.5-1.2 1.2L2.6 8l6.7-6.7z"/></svg></button>
    <button class="btn primary" id="play"><svg viewBox="0 0 16 16" id="playIcon"></svg><span id="playTxt"></span></button>
    <button class="btn" id="next" aria-label="Próxima fase"><svg viewBox="0 0 16 16"><path d="M5.5 2.5 11 8l-5.5 5.5 1.2 1.2L13.4 8 6.7 1.3z"/></svg></button>
    <div class="speed" role="group" aria-label="Velocidade">
     <button data-s="0.25" aria-pressed="false">0,25×</button><button data-s="0.5" aria-pressed="false">0,5×</button><button data-s="1" aria-pressed="true">1×</button></div>
    <label class="tog"><input type="checkbox" id="ann" checked> Anotações</label>
    <span class="clock" id="clock">0,0 s</span>
   </div>
   <div class="timeline" id="tl" aria-label="Linha do tempo"><div class="playhead" id="ph"></div></div>
  </div>
  <aside class="phase" aria-live="polite">
   <div class="ph-step" id="phn"></div><div class="ph-kanji" id="phk" lang="ja"></div>
   <h2 id="pht"></h2><p id="phd"></p><h3>O que observar</h3><ul id="phl"></ul>
  </aside>
 </section>
 <section class="seq"><h2>Sequência</h2><div class="strip" id="strip" style="--n:${PH.length}"></div></section>
 <section class="cards">
  <div class="card"><h2>Ficha técnica</h2><dl>${def.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl></div>
  <div class="card"><h2>Erros comuns</h2><dl>${def.errors.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl></div>
  <div class="card warn"><h2>Segurança</h2>${(def.safety||DEFAULT_SAFETY).map(s=>`<p>${esc(s)}</p>`).join('')}</div>
 </section>
 <nav class="botnav"><a href="${prev.id}.html"><small>Anterior</small>${esc(prev.name)}</a><a href="index.html"><small>Catálogo</small>Todas as técnicas</a><a href="${next.id}.html"><small>Próxima</small>${esc(next.name)}</a></nav>`;
 const $=s=>root.querySelector(s);
 const cv=$('#cv'),ctx=cv.getContext('2d'),tl=$('#tl'),phEl=$('#ph'),clock=$('#clock');
 const saved=Progress.update(d=>{d.seen[id]=Date.now();});
let t=0,playing=!reduced(),speed=[.25,.5,1].includes(saved.speed)?saved.speed:1,annot=true,last=0,cur=-1;
root.querySelectorAll('.speed button').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.s===speed));
const pills={done:['Marcar como estudada','Estudada'],fav:['Favoritar','Favorita']};
const paint=(k,on)=>{const b=$('#'+k);b.setAttribute('aria-pressed',on);b.querySelector('.lbl').textContent=pills[k][on?1:0];};
for(const k of Object.keys(pills)){paint(k,!!saved[k][id]);$('#'+k).onclick=()=>paint(k,Progress.toggle(k,id));}
 const phaseAt=tt=>{for(let i=PH.length-1;i>=0;i--)if(tt>=PH[i].s)return i;return 0;};
 PH.forEach((p,i)=>{const b=document.createElement('button');b.className='seg';b.style.flexGrow=p.e-p.s;b.innerHTML=`<b>${esc(p.ro)}</b><small>${esc(p.pt)}</small>`;
  b.addEventListener('click',e=>{e.stopPropagation();jump(i);});b.addEventListener('pointerdown',e=>e.stopPropagation());tl.insertBefore(b,phEl);});
 const segs=[...tl.querySelectorAll('.seg')];
 const REP=def.rep||PH.map(p=>(p.s+p.e)/2);
 const thumbs=PH.map((p,i)=>{const el=document.createElement('button');el.className='thumb';
  el.innerHTML=`<canvas></canvas><div><b>${i+1}. ${esc(p.ro)}</b><small>${esc(p.pt)}</small></div>`;
  el.onclick=()=>{jump(i);cv.scrollIntoView({behavior:'smooth',block:'nearest'});};$('#strip').appendChild(el);return {el,c:el.querySelector('canvas')};});
 let mv=0;
 const minis=def.is3d?def.views.slice(1).map((v,i)=>{const b=document.createElement('button');b.className='mini';b.type='button';
  b.innerHTML=`<canvas></canvas><span></span>`;b.onclick=()=>{const k=+b.dataset.v;b.dataset.v=mv;mv=k;render();};
  b.dataset.v=i+1;$('#minis').appendChild(b);return b;}):[];
 function render(){const [w,h,dpr]=size(cv);ctx.setTransform(dpr,0,0,dpr,0,0);renderDef(ctx,w,h,def,t,{annot},mv);
  if(def.is3d){$('#vname').textContent=def.views[mv].name;
   for(const b of minis){const k=+b.dataset.v;b.querySelector('span').textContent=def.views[k].name;b.setAttribute('aria-label','Ver ângulo '+def.views[k].name);
    renderTo(b.querySelector('canvas'),def,t,{},k);}}
  ui();}
 function ui(){phEl.style.left=`calc(${(t/END*100).toFixed(3)}% - 1px)`;clock.textContent=t.toFixed(1).replace('.',',')+' s';
  const i=phaseAt(t);if(i===cur)return;cur=i;const p=PH[i];
  $('#phn').textContent=`Fase ${i+1} de ${PH.length}`;$('#phk').textContent=p.kanji;
  $('#pht').innerHTML=`${esc(p.ro)}<span>${esc(p.pt)}</span>`;$('#phd').textContent=p.d;
  $('#phl').innerHTML=p.l.map(x=>`<li>${esc(x)}</li>`).join('');
  segs.forEach((s,j)=>s.classList.toggle('on',j===i));thumbs.forEach((s,j)=>s.el.classList.toggle('on',j===i));}
 function setPlay(p){playing=p;$('#playTxt').textContent=p?'Pausar':'Animar';
  $('#playIcon').innerHTML=p?'<path d="M4 2h3v12H4zM9 2h3v12H9z"/>':'<path d="M4 2v12l10-6z"/>';}
 function jump(i){t=PH[i].s+.001;setPlay(true);render();}
 $('#play').onclick=()=>{if(!playing&&t>=END-.01)t=0;setPlay(!playing);render();};
 $('#prev').onclick=()=>{const i=phaseAt(t);jump(t-PH[i].s>.6||i===0?i:i-1);};
 $('#next').onclick=()=>jump((phaseAt(t)+1)%PH.length);
 root.querySelectorAll('.speed button').forEach(b=>b.onclick=()=>{speed=+b.dataset.s;Progress.update(d=>{d.speed=speed;});root.querySelectorAll('.speed button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 $('#ann').onchange=e=>{annot=e.target.checked;render();};
 /* Toque no palco: arrastar na horizontal avança/volta o tempo; toque simples alterna play/pausa. */
const hint=$('.drag-hint'),hideHint=()=>hint&&hint.classList.add('gone');setTimeout(hideHint,4000);
cv.addEventListener('pointerdown',e=>{if(e.button)return;hideHint();const x0=e.clientX,t0=t,w=cv.getBoundingClientRect().width;let dragged=false;
  const mv=ev=>{const dx=ev.clientX-x0;if(!dragged&&Math.abs(dx)<8)return;
   if(!dragged){dragged=true;setPlay(false);cv.setPointerCapture(ev.pointerId);}
   t=clamp(t0+dx/w*END*.8,0,END);render();};
  const up=()=>{cv.removeEventListener('pointermove',mv);cv.removeEventListener('pointerup',up);cv.removeEventListener('pointercancel',up);
   if(!dragged)$('#play').click();};
  cv.addEventListener('pointermove',mv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);});
const scrub=e=>{const r=tl.getBoundingClientRect();t=clamp((e.clientX-r.left)/r.width,0,1)*END;render();};
 tl.addEventListener('pointerdown',e=>{tl.setPointerCapture(e.pointerId);setPlay(false);scrub(e);
  const mv=ev=>scrub(ev),up=()=>{tl.removeEventListener('pointermove',mv);tl.removeEventListener('pointerup',up);};tl.addEventListener('pointermove',mv);tl.addEventListener('pointerup',up);});
 document.addEventListener('keydown',e=>{if(e.target.matches('input,button,a'))return;
  if(e.code==='Space'){e.preventDefault();$('#play').click();}
  if(e.key==='ArrowRight')$('#next').click();if(e.key==='ArrowLeft')$('#prev').click();});
 const drawThumbs=()=>thumbs.forEach((s,i)=>renderTo(s.c,def,REP[i]));
 function frame(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;if(playing){t+=dt*speed;if(t>=END)t=0;render();}requestAnimationFrame(frame);}
 setPlay(playing);render();drawThumbs();
 new ResizeObserver(()=>{render();drawThumbs();}).observe($('.cv-wrap'));
 onTheme(()=>{render();drawThumbs();});
 window.JudoPlayer={seek(x){t=x;setPlay(false);render();}};
 requestAnimationFrame(frame);}

/* ---------- index page ---------- */
function mountIndex(){
 readTheme();const grid=document.getElementById('grid'),chips=document.querySelectorAll('.chip');
 const cards=CATALOG.map((c,i)=>{const def=techs[c.id];const a=document.createElement('a');a.className='tcard';a.href=c.id+'.html';a.dataset.group=c.group;
  a.innerHTML=`<div class="tc-cv"><canvas></canvas></div><div class="tc-body">
   <div class="tc-meta"><span class="tc-num">${String(i+1).padStart(2,'0')}</span><span class="tc-grp ${c.group}">${c.group==='nage'?'Nage-waza':'Ne-waza'}</span></div>
   <h3>${esc(c.name)} <span lang="ja">${def?def.kanji:''}</span></h3>
   <p class="tc-bjj">${def?esc(def.bjj):'Em preparação'}</p>
   <p class="tc-why">${def?esc(def.why):''}</p></div>`;
  grid.appendChild(a);return {a,c:a.querySelector('canvas'),def,t:def?def.cover:0,raf:0};});
 const prog=Progress.read(),nDone=CATALOG.filter(c=>prog.done[c.id]).length;
 cards.forEach(k=>{const id=k.a.getAttribute('href').replace('.html','');const tags=[];
  if(prog.done[id])tags.push('<span class="badge done" title="Estudada" aria-label="Estudada">✓</span>');
  else if(prog.seen[id])tags.push('<span class="badge seen" title="Já vista" aria-label="Já vista">•</span>');
  if(prog.fav[id])tags.push('<span class="badge fav" title="Favorita" aria-label="Favorita">★</span>');
  if(tags.length)k.a.querySelector('.tc-num').insertAdjacentHTML('afterend',`<span class="badges">${tags.join('')}</span>`);
  k.a.dataset.fav=prog.fav[id]?'1':'';});
 const pr=document.getElementById('progress');
 if(pr)pr.innerHTML=nDone||Object.keys(prog.seen).length?`<b>${nDone} de ${CATALOG.length}</b> técnicas estudadas<span class="bar"><i style="width:${nDone/CATALOG.length*100}%"></i></span>`:'';
 const favChip=document.querySelector('.chip[data-g="fav"]');if(favChip)favChip.hidden=!Object.keys(prog.fav).length;
 const draw=k=>{if(k.def)renderTo(k.c,k.def,k.t);};
 cards.forEach(k=>{if(!k.def)return;let last=0;
  const loop=now=>{const dt=Math.min(.05,(now-last)/1000||0);last=now;k.t=(k.t+dt)%k.def.end;draw(k);k.raf=requestAnimationFrame(loop);};
  k.a.addEventListener('pointerenter',()=>{if(reduced()||k.raf)return;last=0;k.t=0;k.raf=requestAnimationFrame(loop);});
  k.a.addEventListener('pointerleave',()=>{cancelAnimationFrame(k.raf);k.raf=0;k.t=k.def.cover;draw(k);});});
 /* Sem hover (celular): anima o card enquanto ele está bem visível na tela. */
 if(matchMedia('(hover: none)').matches&&!reduced()&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{const k=cards.find(c=>c.a===en.target);if(!k||!k.def)return;
   k.a.dispatchEvent(new PointerEvent(en.isIntersecting?'pointerenter':'pointerleave'));}),{threshold:.75});
  cards.forEach(k=>io.observe(k.a));}
 const all=()=>cards.forEach(draw);all();
 chips.forEach(ch=>ch.addEventListener('click',()=>{chips.forEach(x=>x.setAttribute('aria-pressed',x===ch));const g=ch.dataset.g;
  cards.forEach(k=>k.a.hidden=!(g==='all'||k.a.dataset.group===g||(g==='fav'&&k.a.dataset.fav)));all();}));
 new ResizeObserver(all).observe(grid);onTheme(all);}

window.Judo={Progress,register,pose,drawScene,viewport,readTheme,renderTo,renderDef,mountPage,mountIndex,techs,CATALOG,W,TP,A,SL,win,tp,lerp2,clamp,D,C,
 prim:{tag,arrow,dashed,ring,stamp,dot:(ctx,V,p,r,f,l)=>dot(ctx,V,p,r,f,l)}};
})();
