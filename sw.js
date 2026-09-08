const CACHE = 'universum-shell-v120';
const SHELL = [
  './',
  './index.html',
  './cockpit.html',
  './css/styles.css',
  './js/astronomy.js',
  './js/storage.js',
  './js/media.js',
  './js/paths.js',
  './js/rituals.js',
  './js/sigil.js',
  './js/cards.js',
  './js/schumann.js',
  './js/i18n.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => Promise.all(SHELL.map((u) => cache.add(u).catch(() => null)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const path = url.pathname || '';
  if (path.indexOf('/rr25') !== -1 || /ritual/i.test(path)) return;
  if (req.mode === 'navigate' || path.endsWith('.html') || path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.webmanifest') || path.endsWith('/')) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => null);
        }
        return res;
      }).catch(() => caches.match(req).then((cached) => cached || caches.match('./cockpit.html') || caches.match('./index.html')))
    );
  }
});
