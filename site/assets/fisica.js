/* Judô para Jiu-Jitsu: pose física.
   Os keyframes dizem a INTENÇÃO (onde fica o tronco, para onde vai cada mão e pé). Este arquivo
   transforma a intenção numa pose que dois corpos de verdade conseguem fazer:
   - nenhum membro entra no corpo ou nos membros do outro, nem no próprio corpo (cápsulas);
   - joelho e cotovelo dobram para o lado anatômico e não trocam de lado de um quadro para o outro;
   - a ponta do membro anda de onde estava até o alvo, escorregando na superfície do que encontrar
     (por isso uma perna nunca "aparece" do outro lado de um corpo).
   Judo.solve(def,t) devolve a mesma estrutura de Judo.pose3. A técnica inteira é resolvida em
   sequência uma vez (quadros a 1/60 s) e guardada, para que voltar no tempo dê sempre o mesmo quadro. */
(function(){
'use strict';
const J=window.Judo,X=J._3d,{bp,bv,LEN,LIMBS,rootOf}=X;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const len=a=>Math.hypot(a[0],a[1],a[2]),norm=a=>{const l=len(a)||1;return [a[0]/l,a[1]/l,a[2]/l];};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const lerp3=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;

/* Raios do corpo (m). O desenho (corpo-gl.js) e as ferramentas usam estes mesmos números. */
const R={coxa:.075,canela:.058,pe:.04,braco:.052,ante:.045,tronco:.125,pelve:.105,cabeca:.108};
const TOL=.015,TOL_PROPRIO=.03,FPS=60,PISO=.035;

/* Cápsulas de um boneco: {a,b,r,g} com g = grupo ('tronco','cabeca','legR'...) e s = segmento (0 raiz, 1 ponta, 2 pé). */
function capsulas(o){
 const C=[{a:bp(o,0,.12,.07),b:bp(o,0,.42,.07),r:R.tronco,g:'tronco'},{a:bp(o,0,.12,-.07),b:bp(o,0,.42,-.07),r:R.tronco,g:'tronco'},
  {a:bp(o,0,.03,.07),b:bp(o,0,.03,-.07),r:R.pelve,g:'tronco',pelve:true},{a:o.head,b:o.head,r:R.cabeca,g:'cabeca'}];
 for(const [g,side] of LIMBS){const L=o[g+side],leg=g==='leg';if(!L)continue;
  C.push({a:L.root,b:L.E,r:leg?R.coxa:R.braco,g:g+side,s:0},{a:L.E,b:L.H,r:leg?R.canela:R.ante,g:g+side,s:1});
  if(leg&&L.heel)C.push({a:L.heel,b:L.toe,r:R.pe,g:g+side,s:2});}
 return C;}

/* Distância entre dois segmentos. Devolve em Q: d, s (parâmetro no 1º), e a normal n (do 2º para o 1º). */
const Q={d:0,s:0,nx:0,ny:0,nz:0};
function seg(p1,q1,p2,q2){
 const d1x=q1[0]-p1[0],d1y=q1[1]-p1[1],d1z=q1[2]-p1[2],d2x=q2[0]-p2[0],d2y=q2[1]-p2[1],d2z=q2[2]-p2[2];
 const rx=p1[0]-p2[0],ry=p1[1]-p2[1],rz=p1[2]-p2[2];
 const a=d1x*d1x+d1y*d1y+d1z*d1z,e=d2x*d2x+d2y*d2y+d2z*d2z,f=d2x*rx+d2y*ry+d2z*rz;let s,t;
 if(a<1e-10&&e<1e-10){s=0;t=0;}
 else if(a<1e-10){s=0;t=clamp(f/e,0,1);}
 else{const c=d1x*rx+d1y*ry+d1z*rz;
  if(e<1e-10){t=0;s=clamp(-c/a,0,1);}
  else{const b=d1x*d2x+d1y*d2y+d1z*d2z,den=a*e-b*b;s=den>1e-10?clamp((b*f-c*e)/den,0,1):0;t=(b*s+f)/e;
   if(t<0){t=0;s=clamp(-c/a,0,1);}else if(t>1){t=1;s=clamp((b-c)/a,0,1);}}}
 const x=rx+d1x*s-d2x*t,y=ry+d1y*s-d2y*t,z=rz+d1z*s-d2z*t,d=Math.sqrt(x*x+y*y+z*z);
 Q.d=d;Q.s=s;if(d>1e-6){Q.nx=x/d;Q.ny=y/d;Q.nz=z/d;}else{Q.nx=0;Q.ny=1;Q.nz=0;}
 return d;}

/* Soma do quadrado das penetrações de um segmento contra uma lista de obstáculos. */
function penal(p,q,r,obs,skipTronco){let k=0;
 for(let i=0;i<obs.length;i++){const o=obs[i];if(skipTronco&&o.raiz)continue;
  const lim=r+o.r-o.tol;
  /* descarte rápido pela esfera envolvente */
  const mx=(o.a[0]+o.b[0])*.5-(p[0]+q[0])*.5,my=(o.a[1]+o.b[1])*.5-(p[1]+q[1])*.5,mz=(o.a[2]+o.b[2])*.5-(p[2]+q[2])*.5;
  if(mx*mx+my*my+mz*mz>(lim+o.h+.3)*(lim+o.h+.3))continue;
  const d=seg(p,q,o.a,o.b);if(d<lim){const e=lim-d;k+=e*e;}}
 return k;}

/* Transporte paralelo de v (perpendicular a "de") quando o eixo vai de "de" para "para". */
function transporta(v,de,para){const k=1+dot(de,para);if(k<.08)return null;
 const s=add(de,para),c=dot(s,v)/k;return add(sub(v,mul(s,c)),mul(para,2*dot(de,v)));}

/* Custo anatômico de uma dobra: a segunda parte do membro (canela/antebraço) tem de dobrar para o lado
   certo em relação ao corpo. Devolve radianos além do limite (0 = confortável). */
function anatomia(o,leg,side,root,E,H,l1,l2){
 const d=mul(sub(E,root),1/l1),s=mul(sub(H,E),1/l2),sd=dot(s,d);
 let px=s[0]-d[0]*sd,py=s[1]-d[1]*sd,pz=s[2]-d[2]*sd;const pl=Math.hypot(px,py,pz);
 if(pl<.12)return 0;                                   /* quase reto: sem dobra para julgar */
 const down=mul(o.u,-1),fw=transporta(o.f,down,d);if(!fw)return 0;
 const lat=cross(d,fw);                                 /* lateral depois do transporte */
 const sg=side==='R'?1:-1;
 /* perna: canela dobra para trás (−fw). braço: antebraço dobra para a frente (+fw). */
 const a=(px*fw[0]+py*fw[1]+pz*fw[2])/pl*(leg?-1:1),b=(px*lat[0]+py*lat[1]+pz*lat[2])/pl;
 /* lado: b>0 aponta para "lat". Para medir rotação medial/lateral usamos o sinal do lado do corpo. */
 const ang=Math.atan2(b,a),med=ang*(dot(lat,o.r)>=0?1:-1)*sg*(leg?1:-1); /* >0 = pé/mão para fora */
 const lim=leg?[-1.25,1.05]:[-1.9,1.5];                /* perna: pé p/ dentro até 72°, p/ fora até 60°; braço bem mais solto */
 const ex=med<lim[0]?lim[0]-med:med>lim[1]?med-lim[1]:0;
 return ex*Math.min(1,(pl-.12)/.3);}

/* Resolve um membro de dois ossos. prev = {H,E} (de onde a ponta e a dobra vêm) ou null. Devolve {root,E,H}. */
const W_PEN=2500,W_ALVO=90;
function membro(o,g,side,T,prev,todos,dt,fixo){
 const leg=g==='leg',root=rootOf(o,g,side),l1=leg?LEN.th:LEN.ua,l2=leg?LEN.sh:LEN.fa,r1=leg?R.coxa:R.braco,r2=leg?R.canela:R.ante;
 const Lmax=(l1+l2)*.999,Lmin=Math.abs(l1-l2)+1e-3,pole=bv(o,o.pole[g+side]),rmin=leg?R.canela:R.ante;
 /* só interessa o que está ao alcance do membro */
 const obs=[];for(let i=0;i<todos.length;i++){const ob=todos[i];if(seg(root,root,ob.a,ob.b)<l1+l2+ob.r+r1+.12)obs.push(ob);}
 const alcance=H=>{const v=sub(H,root),d=len(v);if(d>Lmax)return add(root,mul(v,Lmax/d));if(d<Lmin)return add(root,mul(d>1e-6?mul(v,1/d):[0,-1,0],Lmin));return H;};
 const piso=H=>{const m=leg?PISO:R.ante*.6;return H[1]<m?[H[0],m,H[2]]:H;};
 /* círculo do cotovelo/joelho para um dado H */
 const circ=H=>{const v=sub(H,root),dv=len(v)||1,d=clamp(dv,Lmin,Lmax),n=mul(v,1/dv);
  const ca=clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1),rho=l1*Math.sqrt(1-ca*ca),c=add(root,mul(n,l1*ca));
  let e1=sub(pole,mul(n,dot(pole,n)));if(len(e1)<1e-5)e1=Math.abs(n[1])<.9?cross(n,[0,1,0]):cross(n,[1,0,0]);e1=norm(e1);
  return {n,c,rho,e1,e2:cross(n,e1)};};
 const Eem=(K,q)=>{const cs=Math.cos(q)*K.rho,sn=Math.sin(q)*K.rho;return [K.c[0]+cs*K.e1[0]+sn*K.e2[0],K.c[1]+cs*K.e1[1]+sn*K.e2[1],K.c[2]+cs*K.e1[2]+sn*K.e2[2]];};
 const psiDe=(K,E)=>{const v=sub(E,K.c);return Math.atan2(dot(v,K.e2),dot(v,K.e1));};
 /* pé: do tornozelo para a frente do corpo (como em pes()), para não pisar dentro do outro */
 const gh=leg?[o.f[0],0,o.f[2]]:null,pd=leg?(len(gh)>.2?mul(norm(gh),.12):mul(o.f,.12)):null;
 const pen=(E,H)=>{const fl=rmin-E[1];return penal(root,E,r1,obs,true)+penal(E,H,r2,obs,false)+(fl>0?fl*fl:0)+(leg?.5*penal(H,add(H,pd),R.pe,obs,false):0);};
 /* empurra H para fora do que a parte de baixo do membro atravessa (contatos perto da ponta; perto da dobra é com o giro) */
 const empurra=(E,H)=>{let m=0;
  for(let i=0;i<obs.length;i++){const ob=obs[i],lim=r2+ob.r-ob.tol,d=seg(E,H,ob.a,ob.b);
   if(d<lim&&Q.s>.35){const e=(lim-d)/Q.s;H=[H[0]+Q.nx*e,H[1]+Q.ny*e,H[2]+Q.nz*e];if(lim-d>m)m=lim-d;}
   if(leg){const l2=R.pe+ob.r-ob.tol,d2=seg(H,add(H,pd),ob.a,ob.b);if(d2<l2){const e=l2-d2;H=[H[0]+Q.nx*e,H[1]+Q.ny*e,H[2]+Q.nz*e];if(e>m)m=e;}}}
  return [H,m];};
 /* melhor giro para um H: preferência (polo), continuidade, colisão e anatomia */
 const gira=(H,pE)=>{const K=circ(H);if(K.rho<.02)return [Eem(K,0),0];
  const pc=pE?psiDe(K,pE):0,wp=.05,wc=pE?.09:0;
  const livre=q=>wp*(1-Math.cos(q))+wc*(1-Math.cos(q-pc));
  const custo=q=>{const e=Eem(K,q),an=anatomia(o,leg,side,root,e,H,l1,l2);return livre(q)+W_PEN*pen(e,H)+(leg?1.2:.25)*an*an;};
  let psi=Math.atan2(wc*Math.sin(pc),wp+wc*Math.cos(pc)),best=custo(psi);
  if(best>livre(psi)+1e-7){
   const N=24;for(let i=0;i<N;i++){const q=-Math.PI+i*2*Math.PI/N,c=custo(q);if(c<best){best=c;psi=q;}}
   let st=Math.PI/N;for(let k=0;k<4;k++){st*=.5;for(const q of [psi-st,psi+st]){const c=custo(q);if(c<best){best=c;psi=q;}}}}
  if(pE&&K.rho>.05){let dq=psi-pc;while(dq>Math.PI)dq-=2*Math.PI;while(dq<-Math.PI)dq+=2*Math.PI;const w=14*dt;psi=pc+clamp(dq,-w,w);}
  const E=Eem(K,psi);return [E,pen(E,H)];};
 let H,E,pE=prev?prev.E:null,res;
 if(fixo){/* pé de apoio: não sai do chão; só desliza de lado se pisar em cima do pé do outro */
  H=piso(alcance(T));const K0=circ(H);let m,h2;[h2,m]=empurra(Eem(K0,pE?psiDe(K0,pE):0),H);if(m>0)H=piso(alcance([h2[0],H[1],h2[2]]));
  [E,res]=gira(H,pE);return {root,E,H};}
 if(prev){H=prev.H;const dist=len(sub(T,H)),n=clamp(Math.ceil(dist/.03),1,12);
  for(let i=0;i<n;i++){H=piso(alcance(lerp3(H,T,1/(n-i))));
   const K=circ(H),e=Eem(K,psiDe(K,pE));let m;[H,m]=empurra(e,H);if(m>0)H=piso(alcance(H));}}
 else{H=piso(alcance(T));for(let i=0;i<4;i++){const K=circ(H);let m;[H,m]=empurra(Eem(K,0),H);if(m<=0)break;H=piso(alcance(H));}}
 [E,res]=gira(H,pE);
 /* ainda atravessa: procura, perto dali, a ponta que menos atravessa sem fugir muito do alvo */
 const longe=()=>(H[0]-T[0])**2+(H[1]-T[1])**2+(H[2]-T[2])**2>.04*.04;
 if(res>1e-6||longe()){
  const cst=(h,e,r)=>W_PEN*r+W_ALVO*((h[0]-T[0])**2+(h[1]-T[1])**2+(h[2]-T[2])**2);
  let best=cst(H,E,res);
  for(let st=.05;st>.008&&(res>1e-6||longe());st*=.5){let mexeu=true,guard=0;
   while(mexeu&&guard++<6){mexeu=false;
    for(const d of DIRS){const h=piso(alcance([H[0]+d[0]*st,H[1]+d[1]*st,H[2]+d[2]*st]));
     const K=circ(h),e=K.rho<.02?Eem(K,0):Eem(K,psiDe(K,E)),r=pen(e,h),c=cst(h,e,r);
     if(c<best-1e-9){best=c;H=h;E=e;res=r;mexeu=true;}}}}
  [E,res]=gira(H,E);}
 return {root,E,H};}
const DIRS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];

/* Obstáculos para um membro: tudo do outro boneco + o próprio tronco, cabeça e outros membros. */
function obstaculos(F,w,g,side){
 const o=F[w],other=F[w==='uke'?'tori':'uke'],me=g+side,leg=g==='leg',out=[];
 const put=(c,tol,extra)=>{const h=Math.hypot(c.b[0]-c.a[0],c.b[1]-c.a[1],c.b[2]-c.a[2])*.5+(leg?.44:.29);out.push(Object.assign({a:c.a,b:c.b,r:c.r,tol,h},extra));};
 for(const c of capsulas(other))put(c,TOL);
 for(const c of capsulas(o)){if(c.g===me)continue;
  if(c.g==='tronco'){put(c,TOL_PROPRIO,{raiz:true});continue;}       /* raiz: a 1ª parte do membro nasce ali */
  if(c.g==='cabeca'){put(c,TOL_PROPRIO);continue;}
  const mesmoTipo=c.g.slice(0,3)===g;
  if(mesmoTipo&&c.s===0)put(c,TOL_PROPRIO,{raiz:true});               /* coxa×coxa e braço×braço se tocam na raiz */
  else put(c,TOL_PROPRIO);}
 return out;}

/* Move o boneco inteiro (tronco, ombros, cabeça) por d. */
function desloca(o,d){for(const k of ['hip','sh','shR','shL','neck','head'])o[k]=add(o[k],d);o.x=o.hip[0];o.y=o.hip[1];o.z=o.hip[2];}
const troncoDe=o=>[[bp(o,0,.12,.07),bp(o,0,.42,.07),R.tronco],[bp(o,0,.12,-.07),bp(o,0,.42,-.07),R.tronco],[bp(o,0,.03,.07),bp(o,0,.03,-.07),R.pelve]];
/* Tronco contra tronco: afasta os dois (quem está deitado no chão não afunda; o outro cede). Devolve os deslocamentos. */
function separa(F){const dt=[0,0,0],du=[0,0,0],T=F.tori,U=F.uke;
 for(let it=0;it<4;it++){let pior=0,n=null;
  for(const a of troncoDe(T))for(const b of troncoDe(U)){const e=a[2]+b[2]-TOL-seg(a[0],a[1],b[0],b[1]);if(e>pior){pior=e;n=[Q.nx,Q.ny,Q.nz];}}
  if(!n||pior<1e-4)break;
  /* peso: quem está mais baixo (apoiado no tatame) mexe menos */
  let wt=.5;if(T.hip[1]<.25&&U.hip[1]>=.25)wt=.1;else if(U.hip[1]<.25&&T.hip[1]>=.25)wt=.9;
  let a=mul(n,pior*wt),b=mul(n,-pior*(1-wt));
  if(T.hip[1]+a[1]<.11)a[1]=Math.max(0,.11-T.hip[1]);if(U.hip[1]+b[1]<.11)b[1]=Math.max(0,.11-U.hip[1]);
  desloca(T,a);desloca(U,b);for(let i=0;i<3;i++){dt[i]+=a[i];du[i]+=b[i];}}
 return {tori:dt,uke:du};}
/* Cabeça: inclina o pescoço para a cabeça não entrar no corpo do outro. prev = direção anterior (no tronco) ou null. */
const CONE=(()=>{const c=[[0,0]];for(const th of [.2,.4,.6,.85,1.1])for(let k=0;k<8;k++)c.push([th,k*Math.PI/4+th]);return c;})();
function cabeca(o,other,prevLocal,dt){
 /* só tronco e cabeça do outro: dos braços e pernas dele quem desvia são eles (senão a cabeça fugiria do estrangulamento) */
 const obs=capsulas(other).filter(c=>c.g==='tronco'||c.g==='cabeca').map(c=>({a:c.a,b:c.b,r:c.r,tol:TOL,h:Math.hypot(c.b[0]-c.a[0],c.b[1]-c.a[1],c.b[2]-c.a[2])*.5}));
 const hu0=o.hu,hf0=o.hf,r=o.r,pen=d=>{const h=add(o.neck,mul(d,.13));return penal(h,h,R.cabeca,obs,false)+(h[1]<R.cabeca*.8?(R.cabeca*.8-h[1])**2:0);};
 let best=hu0,bc=pen(hu0);
 if(bc>1e-7){bc=1e9;const pw=prevLocal?bv(o,prevLocal):null;
  for(const [th,az] of CONE){const lat=add(mul(hf0,Math.cos(az)),mul(r,Math.sin(az))),d=norm(add(mul(hu0,Math.cos(th)),mul(lat,Math.sin(th))));
   const c=W_PEN*pen(d)+.25*th*th+(pw?.2*(1-dot(d,pw)):0);if(c<bc){bc=c;best=d;}}}
 if(prevLocal){const pw=norm(bv(o,prevLocal)),cs=clamp(dot(pw,best),-1,1),ang=Math.acos(cs),mx=5*dt;
  if(ang>mx){best=norm(lerp3(pw,best,mx/ang));}}
 poeCabeca(o,best);}
function poeCabeca(o,d){const hf=sub(o.hf,mul(d,dot(o.hf,d)));o.hu=d;o.hf=len(hf)>1e-4?norm(hf):o.f;o.head=add(o.neck,mul(d,.13));}

/* Um quadro: parte da pose crua (intenção) e resolve cada membro. prev = quadro resolvido anterior. */
function quadro(def,t,prev,dt){
 const F=J.pose3(def,t),ordem=def.first==='tori'?['tori','uke']:['uke','tori'];
 const novo={},loc0=(o,v)=>[dot(v,o.f),dot(v,o.u),dot(v,o.r)];
 const raiz=separa(F);
 for(const w of ordem)cabeca(F[w],F[w==='uke'?'tori':'uke'],prev?prev[w].cab:null,dt);
 for(let volta=0;volta<2;volta++)for(const w of ordem){const o=F[w],other=F[w==='uke'?'tori':'uke'];novo[w]=novo[w]||{};
  for(const [g,side] of LIMBS){const k=g+side,tipo=X.tipoAlvo(F,w,g,side);
   let T=X.alvo(F,w,g,side);
   const leg=g==='leg',fixo=leg&&tipo==='w'&&T[1]<.1&&o.hip[1]>.5;     /* pé de apoio em pé não cede */
   let p=null;
   if(volta===1)p=novo[w][k];
   else if(prev){const q=prev[w][k];
    /* de onde a ponta vem: fica com o referencial (mundo, próprio corpo, corpo do outro) que a deixa mais perto do alvo */
    const cands=[q.H,bp(o,q.Hs[0],q.Hs[1],q.Hs[2]),bp(other,q.Ho[0],q.Ho[1],q.Ho[2])];
    let H=cands[0],bd=1e9;for(const c of cands){const d=len(sub(c,T));if(d<bd){bd=d;H=c;}}
    p={H,E:bp(o,q.Es[0],q.Es[1],q.Es[2])};}
   const L=membro(o,g,side,T,p,obstaculos(F,w,g,side),dt,fixo);
   novo[w][k]=L;const old=o[k];o[k]={root:L.root,E:L.E,H:L.H};if(old.heel){o[k].heel=old.heel;o[k].toe=old.toe;}}
  X.pes(o);}
 const loc=(o,p)=>{const d=sub(p,o.hip);return [dot(d,o.f),dot(d,o.u),dot(d,o.r)];};
 const st={};for(const w of ordem){st[w]={};const o=F[w],other=F[w==='uke'?'tori':'uke'];
  st[w].raiz=raiz[w];st[w].cab=loc0(o,o.hu);
  for(const [g,side] of LIMBS){const k=g+side,L=novo[w][k];st[w][k]={E:L.E,H:L.H,Hs:loc(o,L.H),Ho:loc(other,L.H),Es:loc(o,L.E)};}}
 return {F,st};}

/* Resolve a técnica inteira em sequência (simula a 60 quadros/s, guarda a 30).
   Guarda por quadro, para cada boneco e membro: dobra no referencial do tronco (3) + ponta no mundo (3). */
const ORDEM=['tori','uke'],POR_BONECO=LIMBS.length*6+6,POR_QUADRO=ORDEM.length*POR_BONECO,FPS_G=30;
function grava(st,D,off){for(const w of ORDEM){for(const [g,side] of LIMBS){const L=st[w][g+side];
   D[off++]=L.Es[0];D[off++]=L.Es[1];D[off++]=L.Es[2];D[off++]=L.H[0];D[off++]=L.H[1];D[off++]=L.H[2];}
  const r=st[w].raiz,c=st[w].cab;D[off++]=r[0];D[off++]=r[1];D[off++]=r[2];D[off++]=c[0];D[off++]=c[1];D[off++]=c[2];}}
function assar(def){
 const n=Math.max(1,Math.ceil(def.end*FPS_G)),D=new Float32Array((n+1)*POR_QUADRO),sub2=FPS/FPS_G;let prev=null;
 for(let i=0;i<=n*sub2;i++){const t=Math.min(def.end,i/FPS);prev=quadro(def,t,prev,1/FPS).st;if(i%sub2===0)grava(prev,D,i/sub2*POR_QUADRO);}
 return {fps:FPS_G,n:n+1,D};}
/* Técnicas resolvidas de antemão (tools/assar.js gera site/assets/assado/<id>.js): int16 em passos de 0,5 mm, base64. */
const assados={},capas={};
function assado(id,fps,b64){const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
 const q=new Int16Array(u.buffer),D=new Float32Array(q.length);for(let i=0;i<q.length;i++)D[i]=q[i]/2000;
 assados[id]={fps,n:D.length/POR_QUADRO,D};const def=J.techs[id];if(def)def._assado=assados[id];}
/* Só o quadro da capa de cada técnica (índice): {id:[t, ...48 valores em passos de 0,5 mm]} */
function capa(obj){for(const id in obj)capas[id]={t:obj[id][0],D:Float32Array.from(obj[id].slice(1),v=>v/2000)};}
function aplica(F,D,a,b,k){
 for(let wi=0;wi<ORDEM.length;wi++){const o=F[ORDEM[wi]];
  {const p=a+wi*POR_BONECO+LIMBS.length*6,q=b+wi*POR_BONECO+LIMBS.length*6,L=i=>D[p+i]+(D[q+i]-D[p+i])*k;
   desloca(o,[L(0),L(1),L(2)]);const c=[L(3),L(4),L(5)];if(len(c)>.5)poeCabeca(o,norm(bv(o,c)));}
  for(let li=0;li<LIMBS.length;li++){const [g,side]=LIMBS[li],key=g+side,leg=g==='leg',root=rootOf(o,g,side),l1=leg?LEN.th:LEN.ua,l2=leg?LEN.sh:LEN.fa;
   const p=a+wi*POR_BONECO+li*6,q=b+wi*POR_BONECO+li*6,L=i=>D[p+i]+(D[q+i]-D[p+i])*k;
   /* joelho/cotovelo interpolado no referencial do tronco (acompanha giros rápidos); ponta no mundo */
   const E0=bp(o,L(0),L(1),L(2)),H0=[L(3),L(4),L(5)];
   const E=add(root,mul(norm(sub(E0,root)),l1)),H=add(E,mul(norm(sub(H0,E)),l2));
   o[key]={root,E,H};}
  X.pes(o);}
 return F;}
function solve(def,t){
 if(def.cru)return J.pose3(def,t);
 t=clamp(t,0,def.end);
 let B=def._assado||(def._assado=assados[def.id]);
 if(!B){const c=capas[def.id];if(c&&Math.abs(t-c.t)<1e-3)return aplica(J.pose3(def,t),c.D,0,0,0);B=def._assado=assar(def);}
 const x=t*B.fps,i=clamp(Math.floor(x),0,B.n-1),j=Math.min(B.n-1,i+1);
 return aplica(J.pose3(def,t),B.D,i*POR_QUADRO,j*POR_QUADRO,clamp(x-i,0,1));}
/* true quando solve(def,t) não precisa calcular a técnica inteira na hora */
const pronto=(def,t)=>!!(def._assado||assados[def.id]||(capas[def.id]&&Math.abs(t-capas[def.id].t)<1e-3));

/* Pose física ao vivo (simulador): cada passo parte do quadro anterior. zera() quando a cena muda de uma vez. */
function aoVivo(){let prev=null;return {passo(def,t,dt){const q=quadro(def,clamp(t,0,def.end),prev,clamp(dt||1/60,1/240,1/20));prev=q.st;return q.F;},zera(){prev=null;}};}
J.solve=solve;J.assado=assado;J.capa=capa;J.fisica={aoVivo,capsulas,R,seg,Q,quadro,assar,anatomia,TOL,pronto,grava,POR_QUADRO,ORDEM};
})();
