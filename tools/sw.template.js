/* Gerado por tools/build.py. Não edite site/sw.js à mão. */
const VERSION = '__VERSION__';
const PRECACHE = __FILES__;
const FONT_CACHE = 'fonts-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.open(FONT_CACHE).then(async (c) => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then((r) => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; });
      e.waitUntil(net.catch(() => {}));
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
