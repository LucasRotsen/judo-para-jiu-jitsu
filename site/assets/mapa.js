/* Mapa de posições: escolha onde você está (posição + lado) e veja as saídas, com animação, gatilho e destino.
   Dados em assets/grafo.js. Estado na URL: #pos=guarda-fechada&lado=baixo */
(function(){
'use strict';
const J=window.Judo,G=window.JUDO_GRAFO;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const POS=Object.fromEntries(G.posicoes.map(p=>[p.id,p]));
const TIPOS=[['finalizacao','Finalizações'],['raspagem','Raspagens'],['passagem','Passagens'],['projecao','Projeções'],
 ['transicao','Transições'],['fuga','Fugas'],['puxar','Puxar para a guarda']];
const NOME_TIPO=Object.fromEntries(TIPOS);
const OPOSTO={cima:'baixo',baixo:'cima'};
const nomeAresta=a=>a.tec&&J.techs[a.tec]?J.techs[a.tec].name:a.nome;
const ladoTxt=([p,l])=>POS[p].lados[l]||POS[p].nome;
/* posições no diagrama (viewBox 1100×600) */
const XY={'em-pe':[550,50],'guarda-fechada':[150,175],'guarda-aberta':[410,175],'borboleta':[690,175],'meia-guarda':[950,175],
 'kesa':[110,320],'controle-lateral':[350,320],'norte-sul':[590,320],'joelho-na-barriga':[830,320],'tartaruga':[1010,440],
 'montada':[350,450],'costas':[730,450],'finalizado':[550,565]};

function mount(){
 J.readTheme();const root=document.getElementById('app');
 root.innerHTML=`
 <header><p class="eyebrow">Mapa de posições</p><h1>De onde você está, para onde dá para ir.</h1>
  <p class="lede">Escolha a posição e o seu lado. Aparecem as técnicas que saem dali, o que o oponente precisa fazer para cada uma abrir e onde você termina. Toque no destino para continuar o caminho.</p></header>
 <section class="mapa-sel" aria-label="Onde você está">
  <h2 class="mapa-h">Onde você está</h2>
  <div class="chips" role="group" aria-label="Posição" id="mpos"></div>
  <div class="chips" role="group" aria-label="Seu lado" id="mlado"></div>
 </section>
 <section class="mapa-dia" aria-label="Diagrama das posições">
  <div class="mapa-svg" id="mdia"></div>
  <p class="mapa-leg" id="mleg"></p>
 </section>
 <section class="mapa-ops" aria-live="polite"><h2 id="mtit"></h2><a class="ph-tec" id="mpostec" hidden></a><div id="mops"></div></section>
 <section class="mapa-ops mapa-contra" id="mcontra-s"><h2 id="mctit"></h2><p class="mapa-sub">O que o oponente pode fazer a partir daqui. Aqui ele é Tori e Uke é você: o gatilho é o que você não pode entregar.</p><div id="mcontra"></div></section>`;
 const $=s=>root.querySelector(s);
 let pos='guarda-fechada',lado='baixo';
 const ler=()=>{const q=new URLSearchParams(location.hash.slice(1));const p=q.get('pos');
  if(p&&POS[p]){pos=p;const l=q.get('lado');lado=POS[p].lados[l]?l:Object.keys(POS[p].lados)[0];}
  else{pos='guarda-fechada';lado='baixo';}};
 const ir=(p,l,push=true)=>{pos=p;lado=POS[p].lados[l]?l:Object.keys(POS[p].lados)[0];
  const h=`#pos=${pos}&lado=${lado}`;if(push&&location.hash!==h)history.pushState(null,'',h);desenhar();};

 /* chips de posição */
 for(const p of G.posicoes){const b=document.createElement('button');b.className='chip';b.type='button';b.dataset.p=p.id;b.textContent=p.nome;
  b.onclick=()=>ir(p.id,lado);$('#mpos').appendChild(b);}

 /* diagrama: uma seta por par de posições (as duas direções contam separado) */
 const pares=new Map();for(const a of G.arestas){if(a.de[0]===a.para[0])continue;const k=a.de[0]+'>'+a.para[0];
  if(!pares.has(k))pares.set(k,{de:a.de[0],para:a.para[0],ar:[]});pares.get(k).ar.push(a);}
 const W=1100,H=600,R={w:150,h:44};
 const borda=(c,d)=>{const dx=d[0]-c[0],dy=d[1]-c[1],k=Math.min(R.w/2/Math.abs(dx||1e-9),R.h/2/Math.abs(dy||1e-9));return [c[0]+dx*k,c[1]+dy*k];};
 let svg=`<svg viewBox="0 0 ${W} ${H}" role="group" aria-label="Diagrama: cada caixa é uma posição; as setas são técnicas que levam de uma posição a outra."><defs>`;
 for(const t of ['on','off'])svg+=`<marker id="mk-${t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="mk-${t}"/></marker>`;
 svg+='</defs>';
 for(const [k,e] of pares){const a=XY[e.de],b=XY[e.para],back=pares.has(e.para+'>'+e.de);
  /* ida e volta entre as mesmas posições: as duas setas se afastam um pouco para não se sobrepor */
  const n=[-(b[1]-a[1]),b[0]-a[0]],nl=Math.hypot(n[0],n[1])||1,o=back?9:0,off=[n[0]/nl*o,n[1]/nl*o];
  const p0=borda(a,b),p1=borda(b,a);
  svg+=`<line class="m-ar" data-k="${k}" x1="${p0[0]+off[0]}" y1="${p0[1]+off[1]}" x2="${p1[0]+off[0]}" y2="${p1[1]+off[1]}"/>`;}
 for(const p of G.posicoes){const [x,y]=XY[p.id];
  svg+=`<g class="m-no${p.terminal?' fim':''}" data-p="${p.id}" tabindex="0" role="button" aria-label="${esc(p.nome)}"><rect x="${x-R.w/2}" y="${y-R.h/2}" width="${R.w}" height="${R.h}"/><text x="${x}" y="${y+5}">${esc(p.nome.replace(/ \(.*\)/,''))}</text></g>`;}
 $('#mdia').innerHTML=svg+'</svg>';
 root.querySelectorAll('.m-no').forEach(g=>{const go=()=>ir(g.dataset.p,lado);g.addEventListener('click',go);
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
 $('#mleg').innerHTML='<span class="lg on"></span> saídas do seu lado, a partir da posição escolhida <span class="lg off"></span> outras ligações';

 function cartao(a,contra){const d=a.tec&&J.techs[a.tec];
  const el=document.createElement('article');el.className='m-op'+(d?'':' sem');el.dataset.tipo=a.tipo;
  const dest=a.para[0]==='finalizado'?'<span class="m-dest fim">Finaliza</span>'
   :`<button type="button" class="m-dest" data-p="${a.para[0]}" data-l="${a.para[1]}">→ ${esc(ladoTxt(a.para))}</button>`;
  el.innerHTML=`${d?`<a class="m-cv" href="${a.tec}.html" tabindex="-1" aria-hidden="true"><canvas></canvas></a>`:'<div class="m-cv vazio" aria-hidden="true">sem animação ainda</div>'}
   <div class="m-body">
   <h3>${d?`<a href="${a.tec}.html">${esc(d.name)}</a>`:esc(a.nome)}</h3>
   ${a.gatilho?`<p class="m-gat"><b>${contra?'Abre quando':'Quando'}:</b> ${esc(a.gatilho)}</p>`:''}
   ${a.nota?`<p class="m-nota">${esc(a.nota)}</p>`:''}
   ${contra?'':dest}</div>`;
  const b=el.querySelector('.m-dest[data-p]');if(b)b.onclick=()=>{ir(b.dataset.p,b.dataset.l);$('#mtit').scrollIntoView({behavior:'smooth',block:'start'});};
  if(d)requestAnimationFrame(()=>J.renderTo(el.querySelector('canvas'),d,d.cover||0));
  return el;}
 function lista(box,ar,contra){box.innerHTML='';
  for(const [t,nome] of TIPOS){const xs=ar.filter(a=>a.tipo===t);if(!xs.length)continue;
   const sec=document.createElement('div');sec.className='m-grupo';sec.innerHTML=`<h3 class="mapa-h">${esc(nome)} <span>${xs.length}</span></h3><div class="m-grid"></div>`;
   /* com animação primeiro */
   xs.sort((a,b)=>(!a.tec)-(!b.tec)).forEach(a=>sec.querySelector('.m-grid').appendChild(cartao(a,contra)));box.appendChild(sec);}}

 function desenhar(){
  root.querySelectorAll('#mpos .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===pos));
  const P=POS[pos];$('#mlado').innerHTML='';
  for(const [l,txt] of Object.entries(P.lados)){const b=document.createElement('button');b.className='chip';b.type='button';b.textContent=txt;
   b.setAttribute('aria-pressed',l===lado);b.onclick=()=>ir(pos,l);$('#mlado').appendChild(b);}
  $('#mlado').hidden=Object.keys(P.lados).length<2;
  root.querySelectorAll('.m-no').forEach(g=>g.classList.toggle('sel',g.dataset.p===pos));
  const minhas=G.arestas.filter(a=>a.de[0]===pos&&a.de[1]===lado);
  const sai=new Set(minhas.map(a=>a.de[0]+'>'+a.para[0]));
  root.querySelectorAll('.m-ar').forEach(l=>{const on=sai.has(l.dataset.k);l.classList.toggle('on',on);l.setAttribute('marker-end',`url(#mk-${on?'on':'off'})`);});
  const tit=P.terminal?'Uke bateu':ladoTxt([pos,lado]);
  $('#mtit').textContent=tit;
  {const a=$('#mpostec'),d=P.tec&&J.techs[P.tec];a.hidden=!d;if(d){a.href=P.tec+'.html';a.textContent=`Ver a posição: ${d.name} →`;}}
  const box=$('#mops');
  if(P.terminal){box.innerHTML='<p class="mapa-sub">Fim do caminho. Solte na hora e recomece.</p><button type="button" class="chip" id="mre">Recomeçar em pé</button>';
   $('#mre').onclick=()=>ir('em-pe','pe');}
  else{lista(box,minhas,false);
   const seqs=(G.sequencias||[]).filter(s=>s.de[0]===pos&&s.de[1]===lado&&J.techs[s.tec]);
   if(seqs.length){const sec=document.createElement('div');sec.className='m-grupo';sec.innerHTML='<h3 class="mapa-h">Drills daqui</h3><div class="m-grid"></div>';
    for(const s of seqs)sec.querySelector('.m-grid').appendChild(cartao({tec:s.tec,tipo:'drill',para:['finalizado','fim'],gatilho:s.passos.map(id=>J.techs[id]?J.techs[id].name:id).join(' → ')},false));
    box.appendChild(sec);}
   if(!minhas.length&&!seqs.length)box.innerHTML='<p class="mapa-sub">Ainda não há técnicas a partir daqui.</p>';}
  /* o outro lado da mesma posição */
  const ol=OPOSTO[lado],contra=ol?G.arestas.filter(a=>a.de[0]===pos&&a.de[1]===ol):[];
  $('#mcontra-s').hidden=!contra.length;
  if(contra.length){$('#mctit').textContent='Cuidado: o que o oponente faz daqui';lista($('#mcontra'),contra,true);}
  document.title=`Mapa: ${tit} · Judô para Jiu-Jitsu`;}
 window.addEventListener('popstate',()=>{ler();desenhar();});
 ler();desenhar();}
window.JudoMapa={mount};
})();
