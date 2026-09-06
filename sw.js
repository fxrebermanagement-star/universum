/**
 * UNIVERSUM · Service Worker — offline shell caching
 * Relative URLs so GitHub Pages /universum/ subpath works.
 * Cache-first for app shell; network-first navigations; offline fallback to cockpit.
 * v68: 5.21.1 — Pfad ≠ Sigil · exclusive Werkzeug panels
 */
const CACHE = 'universum-shell-v68';
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
  './js/app.js',
  './assets/feldkarten/manifest.json',
  './assets/feldkarten/01-schwelle.svg',
  './assets/feldkarten/02-wurzelband.svg',
  './assets/feldkarten/03-atembruecke.svg',
  './assets/feldkarten/04-grenzstein.svg',
  './assets/feldkarten/05-ausgleich.svg',
  './assets/feldkarten/06-feldlicht.svg',
  './assets/feldkarten/07-mondspiegel.svg',
  './assets/feldkarten/08-sonnenkern.svg',
  './assets/feldkarten/09-nebelpfad.svg',
  './assets/feldkarten/10-knotenloesen.svg',
  './assets/feldkarten/11-ahnenruf.svg',
  './assets/feldkarten/12-werkzeugweihe.svg',
  './assets/feldkarten/13-kreisziehen.svg',
  './assets/feldkarten/14-stille-stunde.svg',
  './assets/feldkarten/15-funkenwahl.svg',
  './assets/feldkarten/16-regenwaschen.svg',
  './assets/feldkarten/17-samenwort.svg',
  './assets/feldkarten/18-echo-der-tat.svg',
  './assets/feldkarten/19-hand-der-gabe.svg',
  './assets/feldkarten/20-nachtwache.svg',
  './assets/feldkarten/21-sternennadel.svg',
  './assets/feldkarten/22-heimkehr.svg',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './assets/lexikon/manifest.json',
  './assets/lexikon/fallback-blank.svg',
  './assets/lexikon/fallback-herb.svg',
  './assets/lexikon/fallback-kitchen.svg',
  './assets/lexikon/fallback-stone.svg',
  './assets/lexikon/fallback-color.svg',
  './assets/lexikon/fallback-tool.svg',
  './assets/lexikon/fallback-link.svg',
  './assets/lexikon/fallback-offering.svg'
];

function cacheUrl(cache, url) {
  return cache.add(url).catch(() => fetch(url, { cache: 'reload' }).then((res) => {
    if (res && res.ok) return cache.put(url, res);
  }).catch(() => null));
}

function precacheLexikonIcons(cache) {
  return fetch('./assets/lexikon/manifest.json', { cache: 'reload' })
    .then((res) => (res && res.ok ? res.json() : []))
    .then((list) => {
      const items = Array.isArray(list) ? list : [];
      return Promise.all(
        items.map((item) => {
          const file = item && (item.file || ((item.slug || '') + '.svg'));
          if (!file) return null;
          return cacheUrl(cache, './assets/lexikon/' + file);
        })
      );
    })
    .catch(() => null);
}

function precacheFeldkartenPaths(cache) {
  return fetch('./assets/feldkarten/manifest.json', { cache: 'reload' })
    .then((res) => (res && res.ok ? res.json() : null))
    .then((data) => {
      const items = data && Array.isArray(data.items) ? data.items : [];
      return Promise.all(
        items.map((item) => {
          const file = item && item.file;
          if (!file) return null;
          return cacheUrl(cache, './assets/feldkarten/' + file);
        })
      );
    })
    .catch(() => null);
}

function precacheShell(cache) {
  return Promise.all(SHELL.map((url) => cacheUrl(cache, url)))
    .then(() => precacheLexikonIcons(cache))
    .then(() => precacheFeldkartenPaths(cache));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => precacheShell(cache)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event && event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
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
  if (url.origin !== self.location.origin) return;

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
