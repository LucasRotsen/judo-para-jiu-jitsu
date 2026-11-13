/* Foto de uma página do site servido localmente. Uso: node tools/foto.js <caminho#hash> <saida.png> [largura] [altura] [t] [dark] */
const { chromium } = require('@playwright/test');
const http = require('http'), path = require('path'), fs = require('fs');
const SITE = path.join(__dirname, '..', 'site');
const TYPES = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/json' };
(async () => {
  const [url, out, w = 1280, h = 900, t, dark] = process.argv.slice(2);
  const srv = http.createServer((q, r) => { let f = path.join(SITE, decodeURIComponent(q.url.split('?')[0])); if (f.endsWith('/')) f += 'index.html';
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
  const b = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome', args: process.env.SEM_GL ? [] : ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2, colorScheme: dark ? 'dark' : 'light', serviceWorkers: 'block' });
  p.on('console', (m) => { if (!/GPU stall|fonts/.test(m.text())) console.log('[console]', m.text()); }); p.on('pageerror', (e) => console.log('[erro]', e.message));
  await p.goto(`http://127.0.0.1:${srv.address().port}/${url}`); await p.waitForTimeout(700);
  if (t !== undefined && t !== '') { await p.evaluate((x) => window.JudoPlayer && window.JudoPlayer.seek(x), +t); await p.waitForTimeout(200); }
  console.log('gl:', await p.evaluate(() => !!(window.Judo && Judo.gl && Judo.gl.ok)));
  await p.screenshot({ path: out }); await b.close(); srv.close(); console.log(out);
})();
