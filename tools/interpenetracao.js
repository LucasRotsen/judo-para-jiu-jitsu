/* Mede quanto um membro de um boneco entra no tronco/cabeça do outro, em todas as técnicas 3D.
   Uso: node tools/interpenetracao.js [id ...]  (com ids, lista cada instante acima do limite)   (precisa de `npm run serve` ou usa servidor próprio)
   Saída: pior penetração por técnica, com tempo e membro. Contato (até LIMITE) é permitido. */
const { chromium } = require('@playwright/test');
const http = require('http');
const path = require('path');
const fs = require('fs');

const LIMITE = Number(process.env.LIMITE || 0.06);
const SITE = path.join(__dirname, '..', 'site');

function serve() {
  return new Promise((ok) => {
    const srv = http.createServer((req, res) => {
      const f = path.join(SITE, decodeURIComponent(req.url.split('?')[0].split('#')[0]));
      fs.readFile(f.endsWith('/') ? f + 'index.html' : f, (e, d) => { if (e) { res.writeHead(404); return res.end(); }
        res.writeHead(200, { 'content-type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); res.end(d); });
    }).listen(0, '127.0.0.1', () => ok(srv));
  });
}

(async () => {
  const srv = await serve();
  const b = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  const p = await b.newPage();
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
  const only = process.argv.slice(2);
  p.on('console', (m) => console.log(m.text()));
  const out = await p.evaluate(({ only, LIMITE }) => {
    const J = window.Judo;
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
    const lerp = (a, b, k) => add(a, mul(sub(b, a), k));
    const bp = (o, f, u, r) => add(o.hip, add(mul(o.f, f), add(mul(o.u, u), mul(o.r, r))));
    function segDist(p1, q1, p2, q2) {
      const d1 = sub(q1, p1), d2 = sub(q2, p2), r = sub(p1, p2), a = dot(d1, d1), e = dot(d2, d2), f = dot(d2, r);
      let s, t; const c = dot(d1, r), bb = dot(d1, d2), den = a * e - bb * bb;
      s = den > 1e-9 ? Math.min(1, Math.max(0, (bb * f - c * e) / den)) : 0;
      t = (bb * s + f) / e; if (t < 0) { t = 0; s = Math.min(1, Math.max(0, -c / a)); } else if (t > 1) { t = 1; s = Math.min(1, Math.max(0, (bb - c) / a)); }
      const v = sub(add(p1, mul(d1, s)), add(p2, mul(d2, t))); return Math.sqrt(dot(v, v));
    }
    const limbs = (o) => ['R', 'L'].flatMap((s) => {
      const L = o['leg' + s], A = o['arm' + s];
      return [[`perna ${s} (coxa)`, L.root, L.E, .072], [`perna ${s} (canela)`, L.E, L.H, .064],
        [`braço ${s}`, A.root, A.E, .06], [`antebraço ${s}`, A.E, A.H, .055]];
    });
    const body = (o) => [['tronco', bp(o, 0, .12, .07), bp(o, 0, .42, .07), .125], ['tronco', bp(o, 0, .12, -.07), bp(o, 0, .42, -.07), .125],
      ['cabeça', o.head, o.head, .115]];
    const res = [];
    for (const c of J.CATALOG) {
      const def = J.techs[c.id]; if (!def || !def.is3d || (only.length && !only.includes(c.id))) continue;
      let worst = { pen: -1 }; const linha = [];
      for (let t = 0; t <= def.end; t += 0.05) {
        const F = J.pose3(def, t);
        for (const [a, b, an, bn] of [[F.tori, F.uke, 'Tori', 'Uke'], [F.uke, F.tori, 'Uke', 'Tori']])
          for (const [ln, p1, q1, r1] of limbs(a)) for (const [bnm, p2, q2, r2] of body(b)) {
            const pen = r1 + r2 - segDist(p1, q1, p2, q2);
            if (pen > worst.pen) worst = { pen, t: +t.toFixed(2), what: `${ln} de ${an} dentro do ${bnm} de ${bn}` };
            if (pen > LIMITE && only.length) linha.push(`${t.toFixed(2)}s ${pen.toFixed(3)} ${ln} de ${an} → ${bnm} de ${bn}`);
          }
      }
      if (linha.length) console.log(linha.join('\n'));
      res.push({ id: c.id, pen: +worst.pen.toFixed(3), t: worst.t, what: worst.what, ok: worst.pen <= LIMITE });
    }
    return res;
  }, { only, LIMITE });
  for (const r of out.sort((a, b) => b.pen - a.pen)) console.log(`${r.ok ? 'ok  ' : 'FURA'} ${r.id.padEnd(20)} ${r.pen.toFixed(3)} @${r.t}s  ${r.what}`);
  await b.close(); srv.close();
  process.exit(out.some((r) => !r.ok) ? 1 : 0);
})();
