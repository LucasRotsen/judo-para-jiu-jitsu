/* Detector de pegadas que não chegam: quando o alvo de uma mão ou pé está no corpo do OUTRO
   boneco (B('o',…) ou SL(...)), o IK pode não alcançar e o membro fica "segurando o ar".
   Mede, ao longo da técnica, a distância entre o membro e o alvo pedido. Acima de LIMITE, falha.
   Uso: node tools/pegadas.js [id ...]   (com ids, lista os instantes ruins) */
const { chromium } = require('@playwright/test');
const http = require('http'); const path = require('path'); const fs = require('fs');
const LIMITE = Number(process.env.LIMITE || 0.08);
const SITE = path.join(__dirname, '..', 'site');
const srv = http.createServer((q, r) => { const f = path.join(SITE, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(d); }); });
srv.listen(0, '127.0.0.1', async () => {
  const b = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' }); const p = await b.newPage();
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
  const only = process.argv.slice(2);
  const res = await p.evaluate(({ only, LIMITE }) => {
    const J = window.Judo, out = [];
    const add = (a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
    const lerp = (a, c, k) => add(a, mul([c[0] - a[0], c[1] - a[1], c[2] - a[2]], k));
    const bp = (o, f, u, r) => add(o.hip, add(mul(o.f, f), add(mul(o.u, u), mul(o.r, r))));
    const dist = (a, c) => Math.hypot(a[0] - c[0], a[1] - c[1], a[2] - c[2]);
    for (const c of J.CATALOG) {
      const def = J.techs[c.id]; if (!def || !def.is3d || (only.length && !only.includes(c.id))) continue;
      let worst = { d: 0 }; const lines = [];
      const K = def.K;
      for (let t = 0; t <= def.end; t += 0.05) {
        // só avalia trechos em que o alvo de pegada é o mesmo nos dois keyframes vizinhos (pegada mantida)
        let i = 0; while (i < K.length - 2 && t >= K[i + 1].t) i++;
        const F = J.pose3(def, t);
        for (const [w, ow, nm] of [['tori', 'uke', 'Tori'], ['uke', 'tori', 'Uke']]) for (const g of ['arm', 'leg']) for (const s of ['R', 'L']) {
          const a = K[i][w][g][s], z = K[i + 1][w][g][s];
          if (!a || JSON.stringify(a) !== JSON.stringify(z)) continue;
          let target = null;
          if (a[0] === 'b' && a[1] === 'o') target = bp(F[ow], a[2], a[3], a[4]);
          else if (a[0] === 's') {
            const R = F[ow][a[1]]; if (R) target = lerp(R.E, R.H, a[2]); }
          if (!target) continue;
          const d = dist(F[w][g + s].H, target);
          if (d > worst.d) worst = { d, t: +t.toFixed(2), what: `${g === 'arm' ? 'mão' : 'pé'} ${s} de ${nm}` };
          if (d > LIMITE && only.length) lines.push(`${t.toFixed(2)}s ${d.toFixed(3)} ${g === 'arm' ? 'mão' : 'pé'} ${s} de ${nm}`);
        }
      }
      out.push({ id: c.id, d: worst.d, t: worst.t, what: worst.what, lines });
    }
    return out;
  }, { only, LIMITE });
  for (const r of res.sort((a, c) => c.d - a.d)) {
    for (const l of r.lines) console.log(l);
    console.log(`${r.d <= LIMITE ? 'ok  ' : 'LONGE'} ${r.id.padEnd(20)} ${r.d.toFixed(3)} @${r.t}s  ${r.what || ''}`);
  }
  await b.close(); srv.close(); process.exit(res.some((r) => r.d > LIMITE) ? 1 : 0);
});
