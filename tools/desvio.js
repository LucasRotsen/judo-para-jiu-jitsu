/* Onde o corretor de colisões (fisica.js) mais se afasta da pose escrita nos keyframes.
   Desvio grande e demorado = ou o keyframe pede algo impossível, ou o corretor está desfazendo a técnica.
   Uso: node tools/desvio.js [limiar em m, padrão .15] */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.join(__dirname, '..', 'site', 'assets');
const ctx = { window: {}, console, atob: (s) => Buffer.from(s, 'base64').toString('binary') }; ctx.window.window = ctx.window; vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(SITE, f), 'utf8'), ctx, { filename: f });
vm.runInContext('var Judo;', ctx); run('catalog.js'); vm.runInContext('var JUDO_CATALOG=window.JUDO_CATALOG;', ctx);
run('engine.js'); vm.runInContext('Judo=window.Judo;', ctx); run('engine3d.js'); run('fisica.js');
for (const f of fs.readdirSync(path.join(SITE, 'tecnicas'))) if (f.endsWith('.js')) run('tecnicas/' + f);
const J = ctx.window.Judo, lim = Number(process.argv[2] || .15), NOME = { leg: ['joelho', 'pé'], arm: ['cotovelo', 'mão'] };
const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
for (const c of J.CATALOG) { const def = J.techs[c.id]; if (!def || !def.is3d) continue; const ev = new Map();
  for (let t = 0; t <= def.end; t += .04) { const A = J.pose3(def, t), B = J.solve(def, t);
    for (const w of ['tori', 'uke']) for (const g of ['leg', 'arm']) for (const s of ['R', 'L']) for (const [i, p] of ['E', 'H'].entries()) {
      const v = d(A[w][g + s][p], B[w][g + s][p]); if (v < lim) continue; const k = `${w === 'tori' ? 'Tori' : 'Uke'} ${NOME[g][i]} ${s}`, e = ev.get(k) || { n: 0, m: 0, t0: t, t1: t, tm: t };
      e.n++; e.t1 = t; if (v > e.m) { e.m = v; e.tm = t; } ev.set(k, e); } }
  const L = [...ev].filter(([, e]) => e.n * .04 >= .4).sort((a, b) => b[1].m * b[1].n - a[1].m * a[1].n);
  if (L.length) { console.log(c.id); for (const [k, e] of L.slice(0, 5)) console.log(`   ${k.padEnd(18)} ${e.t0.toFixed(1)}–${e.t1.toFixed(1)}s  pior ${e.m.toFixed(2)} m @${e.tm.toFixed(1)}  (${(e.n * .04).toFixed(1)}s)`); } }
