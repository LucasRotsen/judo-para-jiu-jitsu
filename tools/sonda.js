/* Sonda de articulações: posição de mãos, cotovelos, joelhos e pés de cada boneco no
   referencial do corpo do OUTRO (f = frente, u = cima a partir do quadril, r = direita dele).
   Uso: node tools/sonda.js <id> <t1,t2,...>
   Leitura rápida: tronco do outro ocupa u 0,12–0,42; gola ≈ (0,13; 0,42; ±0,06); quadril ≈ (0; 0; ±0,1). */
const { chromium } = require('@playwright/test');
const http = require('http'); const path = require('path'); const fs = require('fs');
const SITE = path.join(__dirname, '..', 'site');
const [id, ts] = [process.argv[2], (process.argv[3] || '0').split(',').map(Number)];
const srv = http.createServer((q, r) => { const f = path.join(SITE, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(d); }); });
srv.listen(0, '127.0.0.1', async () => {
  const b = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' }); const p = await b.newPage();
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
  const out = await p.evaluate(({ id, ts }) => {
    const J = window.Judo, def = J.techs[id];
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const loc = (o, p) => { const d = sub(p, o.hip); return [dot(d, o.f), dot(d, o.u), dot(d, o.r)].map((v) => v.toFixed(2).padStart(5)).join(' '); };
    const lines = [];
    for (const t of ts) { const F = J.pose3(def, t); lines.push(`t=${t}`);
      for (const [w, ow, nm, onm] of [['tori', 'uke', 'Tori', 'Uke'], ['uke', 'tori', 'Uke', 'Tori']]) {
        const o = F[w], x = F[ow];
        lines.push(`  ${nm} quadril:  ${loc(x, o.hip)}   ombro D: ${loc(x, o.shR)}   ombro E: ${loc(x, o.shL)}`);
        for (const s of ['R', 'L']) {
          lines.push(`  ${nm} mão ${s}:   ${loc(x, o['arm' + s].H)}   cotovelo: ${loc(x, o['arm' + s].E)}   (no corpo de ${onm})`);
          lines.push(`  ${nm} joelho ${s}: ${loc(x, o['leg' + s].E)}   pé:       ${loc(x, o['leg' + s].H)}`);
        } } }
    return lines.join('\n');
  }, { id, ts });
  console.log(out); await b.close(); srv.close();
});
