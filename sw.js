/**
 * UNIVERSUM · Service Worker — offline shell caching
 * Cache-first for app shell; network fallback.
 */
const CACHE = 'universum-shell-v8';
const SHELL = [
  './',
  './index.html',
  './cockpit.html',
  './css/styles.css',
  './js/astronomy.js',
  './js/storage.js',
  './js/paths.js',
  './js/rituals.js',
  './js/sigil.js',
  './js/cards.js',
  './js/schumann.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only same-origin; skip Google Fonts (network)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req).then((res) => {
        if (res && res.ok && (url.pathname.endsWith('.html') || url.pathname.endsWith('.css') ||
            url.pathname.endsWith('.js') || url.pathname.endsWith('.svg') ||
            url.pathname.endsWith('.png') || url.pathname.endsWith('.webmanifest') ||
            url.pathname.endsWith('/'))) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
