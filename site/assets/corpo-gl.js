/* Judô para Jiu-Jitsu: corpo humano em WebGL.
   Uma malha de pessoa de judogi (tronco, cabeça, braços, mãos, pernas, pés), gerada aqui mesmo e
   presa aos ossos da pose (skinning). Desenha com buffer de profundidade de verdade: o que está
   na frente fica na frente, sem ordenar peças. Um único canvas WebGL escondido serve todos os
   canvas 2D do site (palco, miniaturas, cards): desenha e copia com drawImage.
   Sem WebGL2, Judo.gl fica nulo e o motor cai no desenho de cápsulas. */
(function(){
'use strict';
const J=window.Judo;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const len=a=>Math.hypot(a[0],a[1],a[2]),norm=a=>{const l=len(a)||1;return [a[0]/l,a[1]/l,a[2]/l];};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const lerp=(a,b,k)=>a+(b-a)*k,lerp3=(a,b,k)=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k)];
const clamp=(v,a,b)=>v<a?a:v>b?b:v,smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};

/* ---------- ossos ----------
   Coordenadas da malha: x = direita do corpo, y = para cima, z = para a frente; quadril na origem.
   Cada osso tem origem O e eixos X,Y,Z; nos membros Y aponta ao longo do osso e Z é a "frente" dele. */
const OSSO={tronco:0,cabeca:1,coxaR:2,coxaL:3,canelaR:4,canelaL:5,peR:6,peL:7,bracoR:8,bracoL:9,anteR:10,anteL:11,maoR:12,maoL:13,pelve:14,peito:15};
const NB=16,SX={R:1,L:-1};
const BAIXO=[[-1,0,0],[0,-1,0],[0,0,1]],RETO=[[1,0,0],[0,1,0],[0,0,1]],PE=[[-1,0,0],[0,0,1],[0,1,0]];
const BIND=[];
BIND[OSSO.tronco]={O:[0,0,0],B:RETO};BIND[OSSO.pelve]={O:[0,0,0],B:RETO};BIND[OSSO.peito]={O:[0,.24,0],B:RETO};
BIND[OSSO.cabeca]={O:[0,.57,0],B:RETO};
for(const s of ['R','L']){const x=SX[s];
 BIND[OSSO['coxa'+s]]={O:[.1*x,0,0],B:BAIXO};BIND[OSSO['canela'+s]]={O:[.1*x,-.44,0],B:BAIXO};BIND[OSSO['pe'+s]]={O:[.1*x,-.88,0],B:PE};
 BIND[OSSO['braco'+s]]={O:[.19*x,.48,0],B:BAIXO};BIND[OSSO['ante'+s]]={O:[.19*x,.19,0],B:BAIXO};BIND[OSSO['mao'+s]]={O:[.19*x,-.08,0],B:BAIXO};}

function transporta(v,de,para){const k=1+dot(de,para);if(k<.05)return v;const s=add(de,para),c=dot(s,v)/k;return add(sub(v,mul(s,c)),mul(para,2*dot(de,v)));}
const orto=(v,y,fb)=>{let z=sub(v,mul(y,dot(v,y)));if(len(z)<1e-4){z=sub(fb,mul(y,dot(fb,y)));if(len(z)<1e-4)z=Math.abs(y[1])<.9?cross(y,[0,1,0]):cross(y,[1,0,0]);}return norm(z);};
/* Matrizes de skinning (pose × bind⁻¹) de um boneco, 16 floats por osso, em colunas. */
function ossos(o,out){
 const put=(i,X,Y,Z,O)=>{const b=BIND[i].B,bo=BIND[i].O,m=i*16;
  /* R = [X Y Z]·[Xb Yb Zb]ᵀ */
  for(let r=0;r<3;r++)for(let c=0;c<3;c++)out[m+c*4+r]=X[r]*b[0][c]+Y[r]*b[1][c]+Z[r]*b[2][c];
  for(let r=0;r<3;r++)out[m+12+r]=O[r]-(out[m+r]*bo[0]+out[m+4+r]*bo[1]+out[m+8+r]*bo[2]);
  out[m+3]=out[m+7]=out[m+11]=0;out[m+15]=1;};
 const hip=o.hip;
 put(OSSO.tronco,o.r,o.u,o.f,hip);
 /* pelve acompanha um pouco as coxas e o peito é o tronco dos keyframes: a cintura dobra em vez de girar em bloco */
 const dR=norm(sub(o.legR.E,o.legR.root)),dL=norm(sub(o.legL.E,o.legL.root));
 let pu=norm(add(mul(o.u,1),mul(add(dR,dL),-.16)));const pf=orto(o.f,pu,o.f),pr=cross(pf,pu);
 put(OSSO.pelve,pr,pu,pf,hip);
 const pb=BIND[OSSO.peito].O;put(OSSO.peito,o.r,o.u,o.f,add(hip,mul(o.u,pb[1])));
 put(OSSO.cabeca,o.r,o.hu,o.hf,o.neck);
 for(const s of ['R','L']){
  for(const leg of [true,false]){const L=o[(leg?'leg':'arm')+s],root=L.root,E=L.E,H=L.H;
   const n=norm(sub(H,root)),re=sub(E,root),b=sub(re,mul(n,dot(re,n))),bl=len(b);
   const Y1=norm(re),Y2=norm(sub(H,E)),fb=transporta(o.f,mul(o.u,-1),Y1);
   const k=smooth(.008,.05,bl),ap=bl>1e-5?mul(b,(leg?1:-1)/bl):fb;
   const fr=norm(add(mul(fb,1-k),mul(ap,k)));
   const Z1=orto(fr,Y1,fb),Z2=orto(fr,Y2,fb);
   if(leg){put(OSSO['coxa'+s],cross(Z1,Y1),Y1,Z1,root);put(OSSO['canela'+s],cross(Z2,Y2),Y2,Z2,E);
    const Yp=norm(sub(L.toe,L.heel)),Zp=orto(add(mul(Y2,-1),mul(Z2,.3)),Yp,Z2);put(OSSO['pe'+s],cross(Zp,Yp),Yp,Zp,H);}
   else{put(OSSO['braco'+s],cross(Z1,Y1),Y1,Z1,root);put(OSSO['ante'+s],cross(Z2,Y2),Y2,Z2,E);put(OSSO['mao'+s],cross(Z2,Y2),Y2,Z2,H);}}}
 return out;}

/* ---------- malha ---------- */
const COR={gi:0,pele:1,cabelo:2,faixa:3,gola:4,sola:5,olho:6};
function construir(){
 const P=[],Nn=[],Bn=[],Cc=[],I=[];
 const vert=(p,b,c)=>{P.push(p[0],p[1],p[2]);Nn.push(0,0,0);Bn.push(b[0],b[1],b[2]);Cc.push(c);return P.length/3-1;};
 const se=(c,n)=>Math.sign(c)*Math.pow(Math.abs(c),2/n);
 /* Tubo: anéis {c,rx,rz,n,b:[osso0,osso1,peso1],col} no plano (ax,az). tampa: 'ini','fim','ambas'. */
 function tubo(aneis,o){o=o||{};const N=o.N||16,ax=o.ax||[1,0,0],az=o.az||[0,0,1],ini=P.length/3,tri=[];
  aneis.forEach(r=>{for(let k=0;k<N;k++){const t=k/N*2*Math.PI,e=r.n||2,x=se(Math.cos(t),e)*r.rx,z=se(Math.sin(t),e)*r.rz;
   vert([r.c[0]+ax[0]*x+az[0]*z,r.c[1]+ax[1]*x+az[1]*z,r.c[2]+ax[2]*x+az[2]*z],r.pesoDe?r.pesoDe(x,z,t):r.b,r.col!==undefined?r.col:o.col||0);}});
  for(let i=0;i<aneis.length-1;i++)for(let k=0;k<N;k++){const a=ini+i*N+k,b=ini+i*N+(k+1)%N,c=a+N,d=b+N;tri.push(a,b,c,b,d,c);}
  const tampa=(i,inv)=>{const r=aneis[i],c=vert(r.c,r.pesoDe?r.pesoDe(0,0,0):r.b,r.col!==undefined?r.col:o.col||0);
   for(let k=0;k<N;k++){const a=ini+i*N+k,b=ini+i*N+(k+1)%N;inv?tri.push(c,b,a):tri.push(c,a,b);}};
  if(o.tampa==='ini'||o.tampa==='ambas')tampa(0,true);
  if(o.tampa==='fim'||o.tampa==='ambas')tampa(aneis.length-1,false);
  /* orientação: normais para fora */
  let s=0;for(let i=0;i<tri.length&&i<N*6;i+=3){const a=tri[i]*3,b=tri[i+1]*3,c=tri[i+2]*3;
   const u=[P[b]-P[a],P[b+1]-P[a+1],P[b+2]-P[a+2]],v=[P[c]-P[a],P[c+1]-P[a+1],P[c+2]-P[a+2]],n=cross(u,v),m=aneis[0].c;
   s+=dot(n,[P[a]-lerp(m[0],aneis[1].c[0],.5),P[a+1]-lerp(m[1],aneis[1].c[1],.5),P[a+2]-lerp(m[2],aneis[1].c[2],.5)]);}
  for(let i=0;i<tri.length;i+=3)s<0?I.push(tri[i],tri[i+2],tri[i+1]):I.push(tri[i],tri[i+1],tri[i+2]);}
 /* Elipsoide centrado em c com raios (rx,ry,rz); eixo de construção ao longo de "ay". */
 function bola(c,r,b,col,o){o=o||{};const M=o.M||7,ay=o.ay||[0,1,0],ax=o.ax||[1,0,0],az=cross(ax,ay).map(v=>-v),an=[];
  const f0=o.de!==undefined?o.de:-Math.PI/2,f1=o.ate!==undefined?o.ate:Math.PI/2;
  for(let i=0;i<=M;i++){const f=lerp(f0,f1,i/M),cs=Math.max(Math.cos(f),.02),sn=Math.sin(f);
   an.push({c:add(c,mul(ay,sn*r[1])),rx:cs*r[0],rz:cs*r[2],b,col});}
  tubo(an,{N:o.N||12,ax,az,tampa:'ambas'});}

 const T=OSSO.tronco,PV=OSSO.pelve,PT=OSSO.peito;
 /* --- paletó: y, meia-largura, meia-profundidade, deslocamento à frente, expoente --- */
 const PAL=[[-.135,.186,.126,.004,2.7],[-.06,.184,.126,.005,2.6],[.03,.172,.118,.005,2.5],[.09,.164,.112,.005,2.4],[.18,.158,.108,.008,2.3],
  [.28,.170,.114,.012,2.3],[.36,.188,.121,.012,2.3],[.43,.200,.116,.008,2.5],[.485,.196,.098,.002,2.6],[.52,.150,.082,-.004,2.3],[.548,.092,.07,-.008,2.1],[.568,.06,.06,-.01,2]];
 const secao=y=>{let i=0;while(i<PAL.length-2&&y>PAL[i+1][0])i++;const a=PAL[i],b=PAL[i+1],k=clamp((y-a[0])/(b[0]-a[0]),0,1);return a.map((v,j)=>lerp(v,b[j],k));};
 const frente=(x,y)=>{const s=secao(y),q=clamp(Math.abs(x)/s[1],0,.98);return s[3]+s[2]*Math.pow(1-Math.pow(q,s[4]),1/s[4]);};
 /* peso do tronco por altura: pelve embaixo, peito em cima, mistura na cintura */
 const pesoTronco=y=>[PV,PT,smooth(.02,.26,y)];
 tubo(PAL.map(([y,rx,rz,zc,n])=>({c:[0,y,zc],rx,rz,n,
   /* a saia do paletó acompanha um pouco cada coxa para não ser furada quando a perna sobe */
   pesoDe:(x)=>{if(y<.0){const lado=x>.03?OSSO.coxaR:x<-.03?OSSO.coxaL:-1;if(lado>=0)return [PV,lado,clamp(-y/.135,0,1)*.55*smooth(.03,.1,Math.abs(x))];}return pesoTronco(y);}})),
  {N:24,tampa:'ambas',col:COR.gi});
 /* --- gola cruzada (esquerda por cima) --- */
 function fita(pts,larg,col,dz){const ini=P.length/3;
  pts.forEach((p,i)=>{const q=pts[Math.min(i+1,pts.length-1)],p0=pts[Math.max(i-1,0)],d=norm([q[0]-p0[0],q[1]-p0[1],0]),s=[d[1],-d[0],0];
   for(const k of [-1,0,1]){const x=p[0]+s[0]*larg*k,y=p[1]+s[1]*larg*k;vert([x,y,frente(x,y)+dz+(k===0?.006:0)],pesoTronco(y),col);}});
  for(let i=0;i<pts.length-1;i++)for(let k=0;k<2;k++){const a=ini+i*3+k,b=a+1,c=a+3,d=c+1;
   const n=cross([P[b*3]-P[a*3],P[b*3+1]-P[a*3+1],P[b*3+2]-P[a*3+2]],[P[c*3]-P[a*3],P[c*3+1]-P[a*3+1],P[c*3+2]-P[a*3+2]]);
   n[2]>0?I.push(a,b,c,b,d,c):I.push(a,c,b,b,c,d);}}
 const caminho=(sx,dz,ate)=>{const pts=[];for(let i=0;i<=10;i++){const k=i/10*ate,y=lerp(.552,.115,k);pts.push([sx*lerp(.062,-.075,Math.pow(k,1.15)),y]);}fita(pts,.021,COR.gola,dz);};
 caminho(1,.004,.5);caminho(-1,.009,1);   /* a de baixo some atrás da de cima no cruzamento */
 /* --- faixa com nó e pontas --- */
 {const s=secao(.09),an=[[.064,.99],[.07,1.06],[.11,1.06],[.116,.99]].map(([y,k])=>({c:[0,y,s[3]],rx:s[1]*k,rz:s[2]*k,n:s[4],b:pesoTronco(y)}));
  tubo(an,{N:24,col:COR.faixa,tampa:'ambas'});
  bola([0,.09,frente(0,.09)+.016],[.032,.024,.02],pesoTronco(.09),COR.faixa);
  for(const sx of [1,-1]){const a=[.012*sx,.085,frente(0,.09)+.018],b=[.06*sx,-.04,frente(.06,-.03)+.02];
   tubo([0,.5,1].map(k=>({c:lerp3(a,b,k),rx:.014,rz:.008,b:[PV,PV,0]})),{N:6,col:COR.faixa,tampa:'ambas'});}}
 /* --- pescoço e cabeça --- */
 const CB=OSSO.cabeca;
 tubo([[.5,.052,0],[.56,.05,0],[.6,.048,.5],[.64,.05,1]].map(([y,r,w])=>({c:[0,y,-.004],rx:r,rz:r,b:[PT,CB,w]})),{N:12,col:COR.pele});
 {const cy=.70,cab=[[-.119,.018,.02,.036],[-.108,.042,.048,.03],[-.085,.064,.074,.02],[-.05,.078,.094,.01],[-.01,.087,.105,.004],[.035,.09,.108,0],[.072,.083,.1,-.004],[.098,.064,.08,-.006],[.113,.034,.044,-.006],[.119,.008,.01,-.006]];
  tubo(cab.map(([dy,rx,rz,zc])=>({c:[0,cy+dy,zc],rx,rz,n:2.15,b:[CB,CB,0]})),{N:20,col:COR.pele,tampa:'ambas'});
  /* cabelo: meia casca inclinada para trás (testa alta, nuca baixa), folgada para não brigar com o crânio */
  const inc=40*Math.PI/180,ay=[0,Math.cos(inc),-Math.sin(inc)],an=[];
  for(let i=0;i<=8;i++){const f=lerp(-.22,Math.PI/2,i/8),cs=Math.max(Math.cos(f),.03),sn=Math.sin(f);
   an.push({c:add([0,cy+.004,-.012],mul(ay,sn*.128)),rx:cs*.103,rz:cs*.124,b:[CB,CB,0]});}
  tubo(an,{N:20,ax:[1,0,0],az:[0,Math.sin(inc),Math.cos(inc)],col:COR.cabelo,tampa:'ambas'});
  bola([0,cy-.024,.104],[.012,.02,.02],[CB,CB,0],COR.pele,{M:4,N:8});                     /* nariz */
  for(const sx of [1,-1]){bola([.088*sx,cy-.014,-.004],[.012,.027,.018],[CB,CB,0],COR.pele,{M:4,N:8});   /* orelha */
   bola([.033*sx,cy+.006,.0935],[.0075,.009,.006],[CB,CB,0],COR.olho,{M:4,N:8});}}              /* olho */
 /* --- pernas, pés, braços e mãos --- */
 for(const s of ['R','L']){const x=SX[s],hx=.1*x,CX=OSSO['coxa'+s],CN=OSSO['canela'+s],PEo=OSSO['pe'+s];
  const calca=[[.05,.086,.096,[PV,CX,.35]],[0,.09,.1,[PV,CX,.75]],[-.08,.088,.096,[CX,CX,0]],[-.2,.08,.086,[CX,CX,0]],[-.32,.071,.076,[CX,CX,0]],
   [-.39,.067,.07,[CX,CN,.15]],[-.44,.066,.069,[CX,CN,.5]],[-.49,.064,.066,[CX,CN,.85]],[-.57,.062,.066,[CN,CN,0]],[-.68,.057,.059,[CN,CN,0]],[-.775,.055,.055,[CN,CN,0]],[-.78,.04,.04,[CN,CN,0]]];
  tubo(calca.map(([y,rx,rz,b])=>({c:[hx,y,y<-.5&&y>-.7?-.006:0],rx,rz,b})),{N:14,col:COR.gi,tampa:'ini'});
  bola([hx,-.44,.004],[.064,.066,.068],[CN,CX,.5],COR.gi,{M:6,N:12});                        /* joelho: preenche a dobra */
  tubo([[-.76,.037,0],[-.83,.033,0],[-.875,.035,.4],[-.9,.036,1]].map(([y,r,w])=>({c:[hx,y,0],rx:r,rz:r*1.1,b:[CN,PEo,w]})),{N:10,col:COR.pele});
  const pe=[[-.06,.004,.004,-.925],[-.05,.026,.028,-.918],[-.012,.034,.036,-.914],[.04,.038,.033,-.917],[.09,.046,.024,-.926],[.135,.045,.017,-.933],[.168,.034,.012,-.938],[.176,.006,.004,-.94]];
  tubo(pe.map(([z,w,h,cy])=>({c:[hx,cy,z],rx:w,rz:h,n:2.6,b:[PEo,PEo,0]})),{N:12,ax:[1,0,0],az:[0,1,0],col:COR.pele,tampa:'ambas'});
  const ox=.19*x,BR=OSSO['braco'+s],AN=OSSO['ante'+s],MA=OSSO['mao'+s];
  bola([ox,.478,0],[.07,.072,.072],[PT,BR,.6],COR.gi,{M:6,N:12});                             /* ombro */
  const manga=[[.5,.064,[PT,BR,.6]],[.44,.066,[BR,BR,0]],[.34,.06,[BR,BR,0]],[.25,.057,[BR,AN,.12]],[.19,.056,[BR,AN,.5]],[.13,.055,[BR,AN,.88]],[.06,.055,[AN,AN,0]],[.002,.058,[AN,AN,0]],[-.002,.036,[AN,AN,0]]];
  tubo(manga.map(([y,r,b])=>({c:[ox,y,0],rx:r,rz:r,b})),{N:12,col:COR.gi,tampa:'ini'});
  bola([ox,.19,-.004],[.054,.055,.056],[AN,BR,.5],COR.gi,{M:6,N:12});                         /* cotovelo */
  tubo([[.02,.034,0],[-.03,.03,0],[-.055,.028,.5]].map(([y,r,w])=>({c:[ox,y,0],rx:r*.9,rz:r*1.1,b:[AN,MA,w]})),{N:10,col:COR.pele});
  bola([ox,-.088,.004],[.026,.052,.042],[MA,MA,0],COR.pele,{M:6,N:10});                       /* mão fechada */
  bola([ox-.012*x,-.07,.04],[.014,.03,.017],[MA,MA,0],COR.pele,{M:4,N:8});}                   /* polegar */
 /* normais suaves */
 for(let i=0;i<I.length;i+=3){const a=I[i]*3,b=I[i+1]*3,c=I[i+2]*3;
  const n=cross([P[b]-P[a],P[b+1]-P[a+1],P[b+2]-P[a+2]],[P[c]-P[a],P[c+1]-P[a+1],P[c+2]-P[a+2]]);
  for(const k of [a,b,c]){Nn[k]+=n[0];Nn[k+1]+=n[1];Nn[k+2]+=n[2];}}
 for(let i=0;i<Nn.length;i+=3){const l=Math.hypot(Nn[i],Nn[i+1],Nn[i+2])||1;Nn[i]/=l;Nn[i+1]/=l;Nn[i+2]/=l;}
 return {P:new Float32Array(P),N:new Float32Array(Nn),B:new Float32Array(Bn),C:new Float32Array(Cc),I:new Uint16Array(I)};}

/* ---------- WebGL ---------- */
const VS=`#version 300 es
in vec3 aP;in vec3 aN;in vec3 aB;in float aC;
uniform mat4 uM[${NB}];uniform vec4 uT[${NB}];uniform mat4 uVP;uniform float uO;uniform int uModo;
out vec3 vN;flat out int vC;out vec4 vT;
void main(){int i=int(aB.x),j=int(aB.y);float w=aB.z;vec4 p=vec4(aP,1.);
 vec3 q=mix((uM[i]*p).xyz,(uM[j]*p).xyz,w);vec3 n=normalize(mix(mat3(uM[i])*aN,mat3(uM[j])*aN,w));
 q+=n*uO;if(uModo==2){q.x+=q.y*.12;q.z-=q.y*.1;q.y=.0;}
 vN=n;vC=int(aC);vT=w<.5?uT[i]:uT[j];gl_Position=uVP*vec4(q,1.);}`;
const FS=`#version 300 es
precision highp float;precision highp int;
in vec3 vN;flat in int vC;in vec4 vT;
uniform vec3 uPal[7];uniform vec3 uSom[7];uniform vec3 uL;uniform vec3 uTinta;uniform int uModo;uniform float uAlfa;
out vec4 o;
void main(){
 if(vT.a<0.){ivec2 q=ivec2(gl_FragCoord.xy)/2;if(((q.x+q.y)&1)==0)discard;}
 if(uModo==2){o=vec4(0.,0.,0.,uAlfa);return;}
 if(uModo==1){o=vec4(uTinta,1.);return;}
 float d=dot(normalize(vN),uL);float t=smoothstep(-.06,.06,d+.18);
 vec3 c=mix(uSom[vC],uPal[vC],t);
 if(vT.a>0.&&vC==0)c=mix(c,vT.rgb,vT.a*.62);
 o=vec4(c,1.);}`;

let G=null,falhou=false;
function iniciar(){
 if(G||falhou)return G;
 try{
  const cv=document.createElement('canvas');cv.width=cv.height=16;
  const gl=cv.getContext('webgl2',{alpha:true,antialias:true,stencil:true,depth:true,premultipliedAlpha:true,preserveDrawingBuffer:false});
  if(!gl)throw new Error('sem webgl2');
  const sh=(t,src)=>{const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
  const M=construir(),vao=gl.createVertexArray();gl.bindVertexArray(vao);
  const buf=(nome,dados,n)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,dados,gl.STATIC_DRAW);
   const l=gl.getAttribLocation(pr,nome);if(l>=0){gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,n,gl.FLOAT,false,0,0);}};
  buf('aP',M.P,3);buf('aN',M.N,3);buf('aB',M.B,3);buf('aC',M.C,1);
  const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,M.I,gl.STATIC_DRAW);
  const U={};for(const n of ['uM','uT','uVP','uO','uModo','uPal','uSom','uL','uTinta','uAlfa'])U[n]=gl.getUniformLocation(pr,n);
  cv.addEventListener('webglcontextlost',e=>{e.preventDefault();G=null;});
  G={cv,gl,pr,vao,U,n:M.I.length,mesh:M,mats:{tori:new Float32Array(NB*16),uke:new Float32Array(NB*16)},tint:new Float32Array(NB*4),cores:null,tema:''};
 }catch(e){falhou=true;G=null;if(window.console)console.warn('Judo.gl indisponível:',e.message);}
 return G;}

/* cor CSS -> [r,g,b] 0..1 */
let cx1=null;
function rgb(css){if(!cx1){const c=document.createElement('canvas');c.width=c.height=1;cx1=c.getContext('2d',{willReadFrequently:true});}
 cx1.clearRect(0,0,1,1);cx1.fillStyle='#000';cx1.fillStyle=css||'#888';cx1.fillRect(0,0,1,1);const d=cx1.getImageData(0,0,1,1).data;return [d[0]/255,d[1]/255,d[2]/255];}
const escuro=(c,k)=>[c[0]*k,c[1]*k,c[2]*k];
function paleta(C){
 const key=['uke','uke-2','uke-line','tori','tori-2','tori-line','skin','hair','belt'].map(k=>C[k]).join('|');
 if(G.tema===key)return G.cores;G.tema=key;
 const pele=rgb(C.skin),cab=rgb(C.hair),fx=rgb(C.belt),mk=(gi,gi2,line)=>{const a=rgb(C[gi]),b=rgb(C[gi2]);
  return {pal:new Float32Array([...a,...pele,...cab,...fx,...b,...b,...escuro(cab,.8)]),
   som:new Float32Array([...b,...escuro(pele,.8),...escuro(cab,.72),...escuro(fx,.7),...escuro(b,.86),...escuro(b,.8),...escuro(cab,.7)]),tinta:rgb(C[line])};};
 return G.cores={tori:mk('tori','tori-2','tori-line'),uke:mk('uke','uke-2','uke-line')};}

const GRUPO={'R.leg':['coxaR','canelaR','peR'],'L.leg':['coxaL','canelaL','peL'],'R.arm':['bracoR','anteR','maoR'],'L.arm':['bracoL','anteL','maoL']};
/* Desenha os dois bonecos no canvas 2D ctx, com a vista V (makeView). opts: {glow:{limbs,ga}, xray:'T.R.leg', xa} */
function desenhar(ctx,V,F,C,opts){
 if(!iniciar())return false;const {gl,cv,U}=G,tr=ctx.getTransform(),dpr=Math.max(.5,Math.hypot(tr.a,tr.b));
 const pw=Math.max(2,Math.round(V.w*dpr)),ph=Math.max(2,Math.round(V.h*dpr));
 if(cv.width<pw||cv.height<ph){cv.width=Math.max(cv.width,pw);cv.height=Math.max(cv.height,ph);}
 if(gl.isContextLost())return false;
 gl.viewport(0,0,pw,ph);gl.enable(gl.SCISSOR_TEST);gl.scissor(0,0,pw,ph);
 gl.clearColor(0,0,0,0);gl.clearStencil(0);gl.clearDepth(1);gl.depthMask(true);gl.stencilMask(255);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
 gl.useProgram(G.pr);gl.bindVertexArray(G.vao);
 /* câmera ortográfica igual à do motor: tela = (p·R, p·U), profundidade = p·c */
 const cam=V.cam,sx=2*V.sc/V.w,sy=2*V.sc/V.h,cR=V.S([0,0,0]),ox=cR[0]/V.w*2-1,oy=1-cR[1]/V.h*2,k=-1/12;
 gl.uniformMatrix4fv(U.uVP,false,new Float32Array([cam.R[0]*sx,cam.U[0]*sy,cam.c[0]*k,0,cam.R[1]*sx,cam.U[1]*sy,cam.c[1]*k,0,cam.R[2]*sx,cam.U[2]*sy,cam.c[2]*k,0,ox,oy,0,1]));
 const L=norm(add(add(mul(cam.R,-.38),mul(cam.U,.62)),mul(cam.c,.68)));gl.uniform3fv(U.uL,L);
 const cores=paleta(C),quem=[['tori','T'],['uke','U']];
 for(const [w] of quem)ossos(F[w],G.mats[w]);
 const tinta=(w,letra)=>{const t=G.tint;t.fill(0);const g=opts.glow;
  if(g&&g.ga>0&&g.limbs)for(const key in g.limbs){if(key[0]!==letra)continue;const c=rgb(C[g.limbs[key]]);
   for(const b of GRUPO[key.slice(2)]||[]){const i=OSSO[b]*4;t[i]=c[0];t[i+1]=c[1];t[i+2]=c[2];t[i+3]=g.ga;}}
  if(opts.xray&&opts.xray[0]===letra)for(const b of GRUPO[opts.xray.slice(2)]||[])t[OSSO[b]*4+3]=-1;
  gl.uniform4fv(U.uT,t);};
 const corpo=(w,letra)=>{gl.uniformMatrix4fv(U.uM,false,G.mats[w]);tinta(w,letra);
  gl.uniform3fv(U.uPal,cores[w].pal);gl.uniform3fv(U.uSom,cores[w].som);gl.uniform3fv(U.uTinta,cores[w].tinta);
  gl.drawElements(gl.TRIANGLES,G.n,gl.UNSIGNED_SHORT,0);};
 /* sombra no tatame: cada pixel escurece uma vez só (estêncil) */
 gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 gl.enable(gl.STENCIL_TEST);gl.stencilFunc(gl.NOTEQUAL,1,255);gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);
 gl.uniform1i(U.uModo,2);gl.uniform1f(U.uO,0);gl.uniform1f(U.uAlfa,.2);for(const [w,l] of quem)corpo(w,l);
 gl.disable(gl.STENCIL_TEST);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);
 /* a malha chega espelhada (referencial do corpo é canhoto): a frente é o sentido horário */
 gl.frontFace(gl.CW);
 gl.uniform1i(U.uModo,0);gl.uniform1f(U.uO,0);gl.cullFace(gl.BACK);for(const [w,l] of quem)corpo(w,l);
 gl.uniform1i(U.uModo,1);gl.uniform1f(U.uO,Math.max(.8*V.lw,1.1/dpr)/V.sc);gl.cullFace(gl.FRONT);for(const [w,l] of quem)corpo(w,l);
 gl.disable(gl.SCISSOR_TEST);
 ctx.drawImage(cv,0,cv.height-ph,pw,ph,0,0,V.w,V.h);
 return true;}

J.gl={desenhar,ossos,construir,OSSO,BIND,get ok(){return !!iniciar();}};
})();
