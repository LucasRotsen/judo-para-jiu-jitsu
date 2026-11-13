/* Sonda de articulações: posição de mãos, cotovelos, joelhos e pés de cada boneco no
   referencial do corpo do OUTRO (f = frente, u = cima a partir do quadril, r = direita dele),
   na pose física (ou crua com --cru). Uso: node tools/sonda.js <id> <t1,t2,...> [--cru]
   Leitura rápida: tronco do outro ocupa u 0,12–0,42 com raio 0,125 em r ±0,07; gola ≈ (0,13; 0,42; ±0,06). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.join(__dirname, '..', 'site', 'assets');
const ctx = { window: {}, console }; ctx.window.window = ctx.window; vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(SITE, f), 'utf8'), ctx, { filename: f });
vm.runInContext('var Judo;', ctx); run('catalog.js'); vm.runInContext('var JUDO_CATALOG=window.JUDO_CATALOG;', ctx);
run('engine.js'); vm.runInContext('Judo=window.Judo;', ctx); run('engine3d.js'); run('fisica.js');
const [id, ts] = [process.argv[2], (process.argv[3] || '0').split(',').map(Number)], cru = process.argv.includes('--cru');
run('tecnicas/' + id + '.js');
const J = ctx.window.Judo, def = J.techs[id];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const loc = (o, p) => { const d = sub(p, o.hip); return [dot(d, o.f), dot(d, o.u), dot(d, o.r)].map((v) => v.toFixed(2).padStart(5)).join(' '); };
const w3 = (p) => p.map((v) => v.toFixed(2).padStart(5)).join(' ');
for (const t of ts) { const F = cru ? J.pose3(def, t) : J.solve(def, t); console.log(`t=${t}`);
  for (const [w, ow, nm, onm] of [['tori', 'uke', 'Tori', 'Uke'], ['uke', 'tori', 'Uke', 'Tori']]) {
    const o = F[w], x = F[ow];
    console.log(`  ${nm} quadril:  ${loc(x, o.hip)}   ombro D: ${loc(x, o.shR)}   ombro E: ${loc(x, o.shL)}   cabeça: ${loc(x, o.head)}   | mundo quadril ${w3(o.hip)}`);
    for (const s of ['R', 'L']) {
      console.log(`  ${nm} mão ${s}:   ${loc(x, o['arm' + s].H)}   cotovelo: ${loc(x, o['arm' + s].E)}   (no corpo de ${onm})   | mundo mão ${w3(o['arm' + s].H)}`);
      console.log(`  ${nm} joelho ${s}: ${loc(x, o['leg' + s].E)}   pé:       ${loc(x, o['leg' + s].H)}   | mundo pé ${w3(o['leg' + s].H)}`);
    } } }
