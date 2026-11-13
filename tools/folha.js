/* Folha de quadros de uma técnica (PNG), com console do navegador no terminal.
   Uso: node tools/folha.js <id> <t1,t2,...> <saida.png> [params de tools/sheet.html: annot=0&w=600&cols=3&vi=1&capsulas=1&cru=1] */
const { chromium } = require('@playwright/test');
const path = require('path');
(async () => {
  const [id, ts, out, extra = ''] = process.argv.slice(2);
  const q = new URLSearchParams(extra), W = +(q.get('w') || 600), cols = +(q.get('cols') || 3);
  const n = ts.split(',').length * (q.get('views') ? 3 : 1), rows = Math.ceil(n / cols);
  const b = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome', args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: W * cols, height: Math.round(rows * W / 1.5) }, deviceScaleFactor: 1 });
  p.on('console', (m) => console.log('[console]', m.text())); p.on('pageerror', (e) => console.log('[erro]', e.message));
  await p.goto('file://' + path.join(__dirname, 'sheet.html') + `#id=${id}&t=${ts}&${extra}`);
  await p.waitForTimeout(400);
  await p.screenshot({ path: out }); await b.close(); console.log(out);
})();
