/**
 * UNIVERSUM · Service Worker — offline shell caching
 * Relative URLs so GitHub Pages /universum/ subpath works.
 * Cache-first for app shell; network-first navigations; offline fallback to cockpit.
 * v24: ritual practice sessions 3.2 — path signatures & duration tags.
 */
const CACHE = 'universum-shell-v24';
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

function isShellPath(pathname) {
  return (
    pathname.endsWith('.html') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.webmanifest') ||
    pathname.endsWith('/') ||
    pathname.endsWith('/universum')
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only same-origin; skip Google Fonts (network)
  if (url.origin !== self.location.origin) return;

  // Navigations: prefer network, fall back to cached cockpit/index under subpath
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) =>
            cached ||
            caches.match('./cockpit.html') ||
            caches.match('./index.html') ||
            caches.match('./')
          )
        )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((res) => {
          if (res && res.ok && isShellPath(url.pathname)) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
