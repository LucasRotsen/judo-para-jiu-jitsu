/* Diagnóstico de movimento das técnicas 3D, sem navegador.
   Mede, ao longo de cada técnica:
   - CRUZA: qualquer parte de um boneco dentro de qualquer parte do outro (membro×membro incluído);
   - PROPRIO: membro dentro do próprio tronco/cabeça ou perna×perna do mesmo boneco;
   - SALTO: articulação (joelho/cotovelo) que anda rápido demais sem a ponta andar (troca de lado);
   - JOELHO/COTOVELO: dobra para o lado errado em relação ao corpo.
   Uso: node tools/diagnostico.js [-v] [id ...] */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.join(__dirname, '..', 'site', 'assets');
function carregar() {
  const ctx = { window: {}, console }; ctx.window.window = ctx.window; vm.createContext(ctx);
  const run = (f) => vm.runInContext(fs.readFileSync(path.join(SITE, f), 'utf8'), ctx, { filename: f });
  ctx.matchMedia = () => ({ matches: false }); ctx.document = {}; ctx.location = { hash: '' };
  vm.runInContext('var Judo;', ctx);
  run('catalog.js'); vm.runInContext('var JUDO_CATALOG=window.JUDO_CATALOG;', ctx);
  run('engine.js'); vm.runInContext('Judo=window.Judo;', ctx); run('engine3d.js');
  run('fisica.js');
  for (const f of fs.readdirSync(path.join(SITE, 'tecnicas'))) run('tecnicas/' + f);
  return ctx.window.Judo;
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const bp = (o, f, u, r) => add(o.hip, add(mul(o.f, f), add(mul(o.u, u), mul(o.r, r))));
function segDist(p1, q1, p2, q2) {
  const d1 = sub(q1, p1), d2 = sub(q2, p2), r = sub(p1, p2), a = dot(d1, d1), e = dot(d2, d2), f = dot(d2, r);
  if (a < 1e-12 && e < 1e-12) return len(r);
  let s, t; const c = dot(d1, r), bb = dot(d1, d2), den = a * e - bb * bb;
  if (a < 1e-12) { s = 0; t = Math.min(1, Math.max(0, f / e)); }
  else if (e < 1e-12) { t = 0; s = Math.min(1, Math.max(0, -c / a)); }
  else { s = den > 1e-9 ? Math.min(1, Math.max(0, (bb * f - c * e) / den)) : 0;
    t = (bb * s + f) / e; if (t < 0) { t = 0; s = Math.min(1, Math.max(0, -c / a)); } else if (t > 1) { t = 1; s = Math.min(1, Math.max(0, (bb - c) / a)); } }
  return len(sub(add(p1, mul(d1, s)), add(p2, mul(d2, t))));
}
const J = carregar();
const NOME = { leg: ['coxa', 'canela', 'pé'], arm: ['braço', 'antebraço'] };
const caps = (o) => J.fisica.capsulas(o).map((c) => [c.g === 'tronco' ? 'tronco' : c.g === 'cabeca' ? 'cabeça' : NOME[c.g.slice(0, 3)][c.s] + ' ' + c.g[3], c.a, c.b, c.r, c.g === 'cabeca' ? 'cabeça' : c.g]);
const ORC = path.join(__dirname, 'orcamento.json');
const args = process.argv.slice(2), portao = args.includes('--portao'), gravar = args.includes('--gravar'), verbose = args.includes('-v'), cru = args.includes('--cru'), only = args.filter((a) => a[0] !== '-');
const pose = (def, t) => (cru ? J.pose3(def, t) : J.solve(def, t));
const LIM = { cruza: Number(process.env.CRUZA || .035), proprio: .05, salto: 6, erro: .12 };
let total = { cruza: 0, proprio: 0, salto: 0, dobra: 0, erro: 0, treme: 0 };
const medido = {};
/* JUDO_EXTRA=id1,id2: mede técnicas ainda fora do catálogo (em construção) */
for (const id of (process.env.JUDO_EXTRA || '').split(',').filter(Boolean)) if (!J.CATALOG.some((c) => c.id === id)) J.CATALOG.push({ id });
for (const c of J.CATALOG) {
  const def = J.techs[c.id]; if (!def || !def.is3d || (only.length && !only.includes(c.id))) continue;
  const ev = { cruza: new Map(), proprio: new Map(), salto: new Map(), dobra: new Map(), erro: new Map(), treme: new Map() };
  const note = (k, key, t, v) => { const m = ev[k], e = m.get(key) || { n: 0, worst: 0, t0: t, t1: t, tw: t }; e.n++; e.t1 = t; if (v > e.worst) { e.worst = v; e.tw = t; } m.set(key, e); };
  let prev = null; const dt = .02;
  for (let t = 0; t <= def.end + 1e-9; t += dt) {
    const F = pose(def, t), RAW = cru ? F : J.pose3(def, t), T = caps(F.tori), U = caps(F.uke);
    /* mão que está pegando (alvo no corpo/membro do outro) envolve o que pega: a ponta do antebraço pode entrar 5 cm a mais */
    const pega = (w, c) => { if (!/^arm/.test(c[4]) || !/^ante/.test(c[0])) return false; const tp = J._3d.tipoAlvo(F, w, 'arm', c[4][3]); return tp === 's' || tp === 'bo'; };
    const pg = (w, c) => (/^(arm|leg)/.test(c[4]) ? J._3d.pegando(F, w, c[4].slice(0, 3), c[4][3]) : null);
    for (const a of T) for (const b of U) { if (pg('tori', a) === b[4] || pg('uke', b) === a[4]) continue; let pen = a[3] + b[3] - segDist(a[1], a[2], b[1], b[2]);
      if (pen > LIM.cruza && pega('tori', a)) { J.fisica.seg(a[1], a[2], b[1], b[2]); if (J.fisica.Q.s > .7) pen -= .05; }
      if (pen > LIM.cruza && pega('uke', b)) { J.fisica.seg(b[1], b[2], a[1], a[2]); if (J.fisica.Q.s > .7) pen -= .05; }
      /* aperto declarado pela técnica (def.aperto): a perna que estrangula afunda de propósito no tronco/cabeça do outro */
      const mb = (c) => /^(arm|leg)/.test(c[4]);
      if (pen > LIM.cruza && mb(a)) pen -= J.fisica.aperto(def, t, 'tori', a[4], b[4]);
      if (pen > LIM.cruza && mb(b)) pen -= J.fisica.aperto(def, t, 'uke', b[4], a[4]);
      if (pen > LIM.cruza) note('cruza', `${a[0]} de Tori × ${b[0]} de Uke`, t, pen); }
    for (const [nm, X] of [['Tori', T], ['Uke', U]]) for (let i = 0; i < X.length; i++) for (let j = i + 1; j < X.length; j++) {
      const a = X[i], b = X[j]; if (a[4] === b[4]) continue;
      const limbA = /leg|arm/.test(a[4]), limbB = /leg|arm/.test(b[4]);
      /* vizinhos na raiz se tocam por construção: coxa/braço × tronco */
      if ((a[4] === 'tronco' && /coxa|braço/.test(b[0]) && !/ante/.test(b[0])) || (a[4] === 'tronco' && b[4] === 'cabeça')) continue;
      if (limbA && limbB && /coxa/.test(a[0]) && /coxa/.test(b[0])) continue;
      if (limbA && limbB && /^braço/.test(a[0]) && /^braço/.test(b[0])) continue;
      const pen = a[3] + b[3] - segDist(a[1], a[2], b[1], b[2]); if (pen > LIM.proprio) note('proprio', `${nm}: ${a[0]} × ${b[0]}`, t, pen); }
    for (const [nm, o] of [['Tori', F.tori], ['Uke', F.uke]]) for (const s of ['R', 'L']) {
      const L = o['leg' + s], A = o['arm' + s];
      for (const [g, X, l1, l2] of [['leg', L, .44, .44], ['arm', A, .29, .27]]) {
        const an = J.fisica.anatomia(o, g === 'leg', s, X.root, X.E, X.H, l1, l2);
        if (an > .25) note('dobra', `${nm}: ${g === 'leg' ? 'joelho' : 'cotovelo'} ${s} dobra para o lado errado`, t, an);
        /* erro: quanto a ponta ficou longe do que o keyframe pediu (só faz sentido na pose resolvida) */
        if (!cru) { const alvo = J._3d.alvo(F, nm === 'Tori' ? 'tori' : 'uke', g, s), al = len(sub(alvo, X.root)), mx = (l1 + l2) * .999, ref = al > mx ? add(X.root, mul(sub(alvo, X.root), mx / al)) : alvo, e = len(sub(ref, X.H)); if (e > LIM.erro) note('erro', `${nm}: ${g === 'leg' ? 'pé' : 'mão'} ${s} longe do alvo`, t, e); } }
      if (prev) { const po = prev[nm === 'Tori' ? 'tori' : 'uke'];
        for (const [g, X, PX] of [['joelho', L, po['leg' + s]], ['cotovelo', A, po['arm' + s]]]) {
          /* velocidade da articulação do meio descontada a das pontas, no referencial do tronco */
          const loc = (oo, p) => { const d = sub(p, oo.hip); return [dot(d, oo.f), dot(d, oo.u), dot(d, oo.r)]; };
          const vE = len(sub(loc(o, X.E), loc(po, PX.E))) / dt, vH = len(sub(loc(o, X.H), loc(po, PX.H))) / dt;
          if (vE - vH > LIM.salto) note('salto', `${nm}: ${g} ${s} salta`, t, vE - vH); } }
    }
    prev = F;
  }
  /* TREME: ponta ou dobra que vai e volta (aceleração alta com velocidade baixa), a 30 quadros/s */
  { const h = 1 / 30, hist = [];
    for (let t = 0; t <= def.end + 1e-9; t += h) { const F = pose(def, t), row = {};
      for (const [nm, o] of [['Tori', F.tori], ['Uke', F.uke]]) { row[nm + ' cabeça'] = o.head; row[nm + ' quadril'] = o.hip;
        for (const s of ['R', 'L']) { row[`${nm} mão ${s}`] = o['arm' + s].H; row[`${nm} cotovelo ${s}`] = o['arm' + s].E; row[`${nm} pé ${s}`] = o['leg' + s].H; row[`${nm} joelho ${s}`] = o['leg' + s].E; } }
      hist.push(row);
      if (hist.length >= 3) { const [a, b, c] = hist.slice(-3);
        for (const k in c) { const acc = len(add(sub(c[k], mul(b[k], 2)), a[k])), vel = Math.max(len(sub(c[k], b[k])), len(sub(b[k], a[k])));
          if (acc > .004 && acc > vel * .8) note('treme', k, t, acc); } } }
    for (const e of ev.treme.values()) e.n *= h / dt; }
  const n = (k) => [...ev[k].values()].reduce((x, e) => x + e.n * dt, 0); for (const k in total) total[k] += n(k);
  medido[c.id] = Object.fromEntries(Object.keys(ev).map((k) => [k, +n(k).toFixed(2)]));
  console.log(`${c.id.padEnd(22)}` + Object.keys(ev).map((k) => ` ${k} ${n(k).toFixed(1).padStart(5)}s`).join(' '));
  if (verbose || only.length) for (const k of Object.keys(ev)) for (const [key, e] of [...ev[k]].sort((a, b) => b[1].worst - a[1].worst))
    console.log(`   ${k.padEnd(8)} ${key.padEnd(46)} ${e.t0.toFixed(2)}–${e.t1.toFixed(2)}s  pior ${e.worst.toFixed(3)} @${e.tw.toFixed(2)}  (${(e.n * dt).toFixed(2)}s)`);
}
console.log('TOTAL (segundos somados)', Object.entries(total).map(([k, v]) => `${k} ${v.toFixed(1)}`).join('  '));
/* Portão de regressão: cada técnica tem um orçamento (segundos somados por categoria) em tools/orcamento.json.
   --gravar regrava o orçamento com o estado atual; --portao falha se alguma técnica piorou além da folga. */
/* com ids na linha de comando, grava só esses e mantém o resto do orçamento (antes apagava as outras técnicas) */
if (gravar) { const base = only.length && fs.existsSync(ORC) ? JSON.parse(fs.readFileSync(ORC, 'utf8')) : {};
  fs.writeFileSync(ORC, JSON.stringify({ ...base, ...medido }, null, 1) + '\n'); console.log('orçamento gravado em', ORC); }
if (portao) {
  const orc = JSON.parse(fs.readFileSync(ORC, 'utf8')); let ruim = 0;
  for (const [id, m] of Object.entries(medido)) for (const k of ['cruza', 'proprio', 'salto', 'erro', 'treme']) {
    const lim = ((orc[id] || {})[k] || 0) * 1.15 + .25;
    if (m[k] > lim) { ruim++; console.error(`PIOROU ${id}: ${k} ${m[k]}s (orçamento ${(orc[id] || {})[k] || 0}s)`); } }
  if (ruim) process.exit(1); console.log('movimento dentro do orçamento');
}
