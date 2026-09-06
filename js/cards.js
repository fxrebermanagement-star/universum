/**
 * UNIVERSUM — 22 originale Feldkarten (kein Tarot-Klon)
 * v5.21: path-specific art under assets/feldkarten/{path}/
 * Spread: Einzelzug · Dreierlege (Vergangenheit / Gegenwart / Zukunft)
 */
(function (global) {
  'use strict';

  const ART_BASE = 'assets/feldkarten/';
  const PATH_IDS = [
    'schamanismus', 'nordisch', 'voodoo', 'santeria',
    'hermetik', 'wicca', 'chaosmagie', 'esoterik'
  ];

  /** Glyph-Fallback wenn SVG nicht lädt (offline / Pfadbruch). */
  const ART_GLYPH = {
    1: '🚪', 2: '🌿', 3: '💨', 4: '🪨', 5: '⚖️', 6: '🏮',
    7: '🌙', 8: '☀️', 9: '🌫️', 10: '🔗', 11: '🕯️', 12: '🔨',
    13: '⭕', 14: '⏳', 15: '✨', 16: '🌧️', 17: '🌱', 18: '〰️',
    19: '🤲', 20: '🔥', 21: '⭐', 22: '🏠'
  };

  const CARD_META = [
    { n: 1, name: 'Schwelle', theme: 'Übergang, Eintritt, respektvolles Öffnen', prompt: 'Welche Tür steht dir offen — und mit welchem Respekt trittst du ein?', file: '01-schwelle.svg' },
    { n: 2, name: 'Wurzelband', theme: 'Erdung, Herkunft, Halt im Körper', prompt: 'Wo spürst du Halt? Was verbindet dich mit dem Boden?', file: '02-wurzelband.svg' },
    { n: 3, name: 'Atembrücke', theme: 'Verbindung Innen–Außen, Rhythmus', prompt: 'Welcher Atemrhythmus bringt dich zurück in die Mitte?', file: '03-atembruecke.svg' },
    { n: 4, name: 'Grenzstein', theme: 'Schutz, Nein, klare Linie', prompt: 'Wo braucht es heute ein klares, friedliches Nein?', file: '04-grenzstein.svg' },
    { n: 5, name: 'Ausgleich', theme: 'Geben und Nehmen, Harmonie', prompt: 'Was hast du gegeben — was darfst du empfangen?', file: '05-ausgleich.svg' },
    { n: 6, name: 'Feldlicht', theme: 'Präsenz, stille Begleitung, Klarheit', prompt: 'Was wird klar, wenn du still bleibst und nur wahrnimmst?', file: '06-feldlicht.svg' },
    { n: 7, name: 'Mondspiegel', theme: 'Gefühl, Reflexion, Zyklus', prompt: 'Welches Gefühl spiegelt sich — ohne dass du es ändern musst?', file: '07-mondspiegel.svg' },
    { n: 8, name: 'Sonnenkern', theme: 'Wille, Wärme, sichtbare Kraft', prompt: 'Welche Wärme darfst du zeigen, ohne zu verbrennen?', file: '08-sonnenkern.svg' },
    { n: 9, name: 'Nebelpfad', theme: 'Unklarheit aushalten, nicht erzwingen', prompt: 'Was darf unklar bleiben, bis der Nebel von selbst weicht?', file: '09-nebelpfad.svg' },
    { n: 10, name: 'Knotenlösen', theme: 'Loslassen, Entwirren, Freigabe', prompt: 'Welchen Knoten löst du — ohne ihn zu zerschneiden?', file: '10-knotenloesen.svg' },
    { n: 11, name: 'Ahnenruf', theme: 'Erinnerung, Linie, Dank ohne Forderung', prompt: 'Wem danke ich — ohne etwas zu fordern?', file: '11-ahnenruf.svg' },
    { n: 12, name: 'Werkzeugweihe', theme: 'Widmung, Sorgfalt, Zweck', prompt: 'Wofür widmest du deine Werkzeuge und Worte?', file: '12-werkzeugweihe.svg' },
    { n: 13, name: 'Kreisziehen', theme: 'Raum schaffen, halten, schließen', prompt: 'Welchen Raum hältst du — und wann schließt du ihn?', file: '13-kreisziehen.svg' },
    { n: 14, name: 'Stille Stunde', theme: 'Pause, Lauschen, Nicht-Tun', prompt: 'Was hörst du, wenn du eine Stunde nichts tust?', file: '14-stille-stunde.svg' },
    { n: 15, name: 'Funkenwahl', theme: 'Entscheidung, Fokus, eine Flamme', prompt: 'Welche eine Flamme wählst du heute — und welche lässt du aus?', file: '15-funkenwahl.svg' },
    { n: 16, name: 'Regenwaschen', theme: 'Reinigung, Abspülen, Neu', prompt: 'Was darf abgespült werden, damit Neues Raum hat?', file: '16-regenwaschen.svg' },
    { n: 17, name: 'Samenwort', theme: 'Intention pflanzen, geduldig warten', prompt: 'Welches Wort pflanzt du — und wie geduldig wartest du?', file: '17-samenwort.svg' },
    { n: 18, name: 'Echo der Tat', theme: 'Folge, Verantwortung, Lernen', prompt: 'Welche Tat hallt nach — und was lernst du daraus?', file: '18-echo-der-tat.svg' },
    { n: 19, name: 'Hand der Gabe', theme: 'Opfer ohne Schaden, Teilen', prompt: 'Was gibst du freiwillig — ohne Schaden, ohne Zwang?', file: '19-hand-der-gabe.svg' },
    { n: 20, name: 'Nachtwache', theme: 'Durchhalten, sanfte Wachsamkeit', prompt: 'Wo bleibst du wachsam — sanft, ohne Panik?', file: '20-nachtwache.svg' },
    { n: 21, name: 'Sternennadel', theme: 'Richtung, Orientierung, Hoffnung', prompt: 'Welcher Stern gibt dir Richtung, wenn der Weg dunkel wirkt?', file: '21-sternennadel.svg' },
    { n: 22, name: 'Heimkehr', theme: 'Abschluss, Integration, Frieden', prompt: 'Was kehrt heim in dich — und was darf Frieden finden?', file: '22-heimkehr.svg' }
  ];

  function normalizePath(pathId) {
    const id = (pathId || 'esoterik').toLowerCase();
    return PATH_IDS.indexOf(id) >= 0 ? id : 'esoterik';
  }

  function artPath(file, pathId) {
    return ART_BASE + normalizePath(pathId) + '/' + file;
  }

  function makeDeck(pathId) {
    const pid = normalizePath(pathId);
    return CARD_META.map(function (c) {
      return {
        n: c.n,
        name: c.name,
        theme: c.theme,
        prompt: c.prompt,
        file: c.file,
        pathId: pid,
        art: artPath(c.file, pid)
      };
    });
  }

  /** Default deck (esoterik) for legacy callers of FELDKARTEN. */
  const FELDKARTEN = makeDeck('esoterik');

  const SPREAD_THREE = [
    { id: 'past', label: 'Vergangenheit', hint: 'Was wirkt nach?' },
    { id: 'present', label: 'Gegenwart', hint: 'Was ist jetzt?' },
    { id: 'future', label: 'Ausblick', hint: 'Wohin öffnet sich der Pfad?' }
  ];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function deckFor(pathId) {
    return makeDeck(pathId);
  }

  function drawOne(exclude, pathId) {
    const deck = deckFor(pathId);
    const pool = exclude && exclude.length
      ? deck.filter(c => !exclude.includes(c.n))
      : deck.slice();
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function drawThree(pathId) {
    const shuffled = shuffle(deckFor(pathId));
    return shuffled.slice(0, 3).map((c, i) => Object.assign({}, c, {
      position: SPREAD_THREE[i]
    }));
  }

  function getCard(n, pathId) {
    const deck = deckFor(pathId);
    return deck.find(c => c.n === n) || null;
  }

  /** Relativen Art-Pfad absolut gegen location.href auflösen. */
  function artUrl(card, pathId) {
    if (!card) return '';
    let rel = card.art;
    if (!rel || pathId) {
      const full = getCard(card.n, pathId || card.pathId);
      rel = (full && full.art) || rel || '';
    }
    if (!rel && card.file) {
      rel = artPath(card.file, pathId || card.pathId);
    }
    if (!rel) return '';
    try {
      if (typeof location !== 'undefined' && location.href) {
        return new URL(rel, location.href).href;
      }
    } catch (_) { /* fall through */ }
    return rel;
  }

  function artFallbackHtml(card) {
    const n = (card && card.n) || 0;
    const glyph = ART_GLYPH[n] || '✦';
    const name = (card && card.name) || 'Motif';
    return '<span class="fk-art-fallback" role="img" aria-label="' + name + ' · Motif geladen">' +
      '<span class="fk-art-fallback-glyph" aria-hidden="true">' + glyph + '</span>' +
      '<span class="fk-art-fallback-label">Motif geladen</span></span>';
  }

  function artImgHtml(card, cls, pathId) {
    const src = artUrl(card, pathId);
    if (!src) return artFallbackHtml(card);
    const name = (card && card.name) || '';
    const n = (card && card.n) || '';
    const glyph = ART_GLYPH[n] || '✦';
    const onerr =
      "this.onerror=null;this.replaceWith((function(g,n){var s=document.createElement('span');s.className='fk-art-fallback';s.setAttribute('role','img');s.setAttribute('aria-label',n+' · Motif geladen');s.innerHTML='<span class=\\'fk-art-fallback-glyph\\' aria-hidden=\\'true\\'>'+g+'</span><span class=\\'fk-art-fallback-label\\'>Motif geladen</span>';return s;})('" +
      glyph + "','" + String(name).replace(/'/g, '') + "'))";
    return '<img class="' + (cls || 'fk-art') + '" src="' + src + '" alt="' +
      String(name).replace(/"/g, '&quot;') + '" width="120" height="140" loading="lazy" decoding="async" data-card-art="' +
      n + '" data-path-art="' + normalizePath(pathId || card.pathId) + '" onerror="' + onerr + '"/>';
  }

  global.UniversumCards = {
    FELDKARTEN,
    CARD_META,
    PATH_IDS,
    SPREAD_THREE,
    ART_BASE,
    ART_GLYPH,
    normalizePath,
    artPath,
    deckFor,
    drawOne,
    drawThree,
    getCard,
    shuffle,
    artUrl,
    artImgHtml,
    artFallbackHtml
  };
})(typeof window !== 'undefined' ? window : globalThis);
