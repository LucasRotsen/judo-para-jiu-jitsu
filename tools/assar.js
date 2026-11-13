/* Resolve cada técnica de antemão (pose física, site/assets/fisica.js) e grava o resultado em
   site/assets/assado/<id>.js, mais site/assets/assado/capas.js com o quadro de capa de todas (índice).
   No navegador, resolver uma técnica inteira custa de 1 a 3 s; assim a página abre pronta.
   Uso: node tools/assar.js            regrava tudo
        node tools/assar.js --check    falha se algum arquivo estiver desatualizado (CI) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), SITE = path.join(ROOT, 'site', 'assets'), OUT = path.join(SITE, 'assado');
function carregar() {
  const ctx = { window: {}, console, atob: (s) => Buffer.from(s, 'base64').toString('binary') }; ctx.window.window = ctx.window; vm.createContext(ctx);
  const run = (f) => vm.runInContext(fs.readFileSync(path.join(SITE, f), 'utf8'), ctx, { filename: f });
  vm.runInContext('var Judo;', ctx); run('catalog.js'); vm.runInContext('var JUDO_CATALOG=window.JUDO_CATALOG;', ctx);
  run('engine.js'); vm.runInContext('Judo=window.Judo;', ctx); run('engine3d.js'); run('fisica.js');
  for (const f of fs.readdirSync(path.join(SITE, 'tecnicas'))) if (f.endsWith('.js')) run('tecnicas/' + f);
  return ctx.window.Judo;
}
const q16 = (v) => Math.max(-32768, Math.min(32767, Math.round(v * 2000)));
function main() {
  const check = process.argv.includes('--check'), only = process.argv.slice(2).filter((a) => a[0] !== '-');
  const J = carregar(); fs.mkdirSync(OUT, { recursive: true });
  const capas = {}; let velhos = 0;
  for (const c of J.CATALOG) {
    const def = J.techs[c.id]; if (!def || !def.is3d) continue;
    const file = path.join(OUT, c.id + '.js');
    if (only.length && !only.includes(c.id)) { /* mantém a capa antiga */
      continue; }
    const B = J.fisica.assar(def), q = Int16Array.from(B.D, q16);
    const src = `Judo.assado(${JSON.stringify(c.id)},${B.fps},"${Buffer.from(q.buffer).toString('base64')}");\n`;
    /* capa: resolve no instante exato da capa (interpola o que acabou de assar) */
    def._assado = B; const F = J.solve(def, def.cover || 0), D = new Float32Array(J.fisica.POR_QUADRO);
    const loc = (o, p) => { const d = [p[0] - o.hip[0], p[1] - o.hip[1], p[2] - o.hip[2]]; return [0, 1, 2].map((i) => d[0] * [o.f, o.u, o.r][i][0] + d[1] * [o.f, o.u, o.r][i][1] + d[2] * [o.f, o.u, o.r][i][2]); };
    const R0 = J.pose3(def, def.cover || 0), dotv = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const st = {}; for (const w of J.fisica.ORDEM) { const o = F[w]; st[w] = { raiz: [0, 1, 2].map((i) => o.hip[i] - R0[w].hip[i]), cab: [dotv(o.hu, o.f), dotv(o.hu, o.u), dotv(o.hu, o.r)] };
      for (const k of ['legR', 'legL', 'armR', 'armL']) st[w][k] = { Es: loc(o, o[k].E), H: o[k].H }; }
    J.fisica.grava(st, D, 0); capas[c.id] = [def.cover || 0, ...Array.from(D, q16)];
    if (check) {
      const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      const m = old.match(/"([^"]*)"\);/); let ok = !!m;
      if (ok) { const b = Buffer.from(m[1], 'base64'), o = new Int16Array(b.buffer, b.byteOffset, b.length / 2); ok = o.length === q.length; for (let i = 0; ok && i < q.length; i++) if (Math.abs(o[i] - q[i]) > 4) ok = false; }
      if (!ok) { velhos++; console.log('desatualizado:', c.id); }
    } else { fs.writeFileSync(file, src); console.log(c.id.padEnd(22), (src.length / 1024).toFixed(0) + ' KB'); }
  }
  if (check) { if (velhos) { console.error(`${velhos} técnica(s) com pose assada desatualizada: rode "npm run build".`); process.exit(1); } console.log('poses assadas em dia'); return; }
  const file = path.join(OUT, 'capas.js');
  let all = capas;
  if (only.length && fs.existsSync(file)) { const old = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^Judo\.capa\(/, '').replace(/\);\s*$/, '')); all = Object.assign(old, capas); }
  fs.writeFileSync(file, 'Judo.capa(' + JSON.stringify(all) + ');\n');
}
main();
