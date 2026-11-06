/* Gerado por tools/build.py. Não edite site/sw.js à mão. */
const VERSION = 'jpj-86b4f3076d77';
const PRECACHE = [
 "./",
 "assets/engine.js",
 "assets/engine3d.js",
 "assets/pwa.js",
 "assets/site.css",
 "assets/tecnicas/de-ashi-barai.js",
 "assets/tecnicas/hadaka-jime.js",
 "assets/tecnicas/ippon-seoi-nage.js",
 "assets/tecnicas/kami-shiho-gatame.js",
 "assets/tecnicas/morote-gari.js",
 "assets/tecnicas/o-goshi.js",
 "assets/tecnicas/o-soto-gari.js",
 "assets/tecnicas/sankaku-jime.js",
 "assets/tecnicas/tate-shiho-gatame.js",
 "assets/tecnicas/tomoe-nage.js",
 "de-ashi-barai.html",
 "hadaka-jime.html",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon.svg",
 "icons/maskable-512.png",
 "index.html",
 "ippon-seoi-nage.html",
 "kami-shiho-gatame.html",
 "manifest.webmanifest",
 "morote-gari.html",
 "o-goshi.html",
 "o-soto-gari.html",
 "sankaku-jime.html",
 "tate-shiho-gatame.html",
 "tomoe-nage.html"
];
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
