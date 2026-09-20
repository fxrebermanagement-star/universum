const CACHE = 'universum-shell-v123';
const SHELL = [
  './',
  './index.html',
  './cockpit.html',
  './css/styles.css',
  './css/arbeitsaltar.css',
  './js/astronomy.js',
  './js/storage.js',
  './js/arbeitsaltar-version-hook.js',
  './js/media.js',
  './js/paths.js',
  './js/arbeitsaltar-soft.js',
  './js/arbeitsaltar-hard.js',
  './js/arbeitsaltar-feld.js',
  './js/arbeitsaltar.js',
  './js/rituals.js',
  './js/arbeitsaltar-rituals-hook.js',
  './js/sigil.js',
  './js/cards.js',
  './js/schumann.js',
  './js/i18n.js',
  './js/arbeitsaltar-ui.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

function injectArbeitsaltar(html) {
  if (!html || html.indexOf('arbeitsaltar-ui.js') !== -1) return html;
  if (html.indexOf('arbeitsaltar.css') === -1) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="css/arbeitsaltar.css?v=5343" />\n</head>');
  }
  if (html.indexOf('arbeitsaltar-list') === -1) {
    var panel =
      '        <div class="card arbeitsaltar-card" id="arbeitsaltar-card">\n' +
      '          <div class="intention-top"><h3>Arbeitsaltar · So sei es</h3><span class="chip-quiet">Eigene</span></div>\n' +
      '          <p class="hint-sm">Soft und Hard aus dem Arbeitsaltar — Ethik-Gate, Rückkehr und 24h nach Hard. Privat, lokal, Praxis.</p>\n' +
      '          <div id="arbeitsaltar-lock-banner" class="notice ethics-line" hidden></div>\n' +
      '          <div class="chip-row" id="arbeitsaltar-cats" role="group" aria-label="Arbeitsaltar Kategorien"></div>\n' +
      '          <div class="ritual-list" id="arbeitsaltar-list" aria-label="Arbeitsaltar Rituale"></div>\n' +
      '        </div>\n';
    html = html.replace(/(<div[^>]*data-rpanel="custom"[^>]*>)/, '$1\n' + panel);
  }
  function insertAfter(srcMarker, tags) {
    for (var i = 0; i < tags.length; i++) {
      if (html.indexOf(tags[i].split('?')[0]) !== -1) return;
    }
    var re = new RegExp('(<script defer src="' + srcMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^"]*"><\\/script>)');
    var add = tags.map(function (t) {
      return '\n  <script defer src="' + t + '"><\\/script>';
    }).join('');
    html = html.replace(re, '$1' + add);
  }
  insertAfter('js/storage.js', ['js/arbeitsaltar-version-hook.js?v=5343']);
  insertAfter('js/paths.js', [
    'js/arbeitsaltar-soft.js?v=5343',
    'js/arbeitsaltar-hard.js?v=5343',
    'js/arbeitsaltar-feld.js?v=5343',
    'js/arbeitsaltar.js?v=5343'
  ]);
  insertAfter('js/rituals.js', ['js/arbeitsaltar-rituals-hook.js?v=5343']);
  insertAfter('js/app.js', ['js/arbeitsaltar-ui.js?v=5343']);
  html = html.replace(
    '<p class="section-sub">Werkzeug · Eigene · Geführt (optional)</p>',
    '<p class="section-sub">Werkzeug · Eigene (Arbeitsaltar) · Geführt (optional)</p>'
  );
  return html;
}

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
  const isCockpit = /cockpit\.html$/.test(path);
  if (req.mode === 'navigate' || path.endsWith('.html') || path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.webmanifest') || path.endsWith('/')) {
    event.respondWith(
      fetch(req).then(async (res) => {
        if (!res || !res.ok) throw new Error('net');
        if (isCockpit) {
          const text = injectArbeitsaltar(await res.text());
          const out = new Response(text, { status: res.status, statusText: res.statusText, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
          caches.open(CACHE).then((c) => c.put(req, out.clone())).catch(() => null);
          return out;
        }
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => null);
        return res;
      }).catch(() => caches.match(req).then(async (cached) => {
        if (cached && isCockpit) {
          const text = injectArbeitsaltar(await cached.text());
          return new Response(text, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return cached || caches.match('./cockpit.html') || caches.match('./index.html');
      }))
    );
  }
});
