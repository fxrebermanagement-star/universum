/**
 * UNIVERSUM — 22 originale Feldkarten (kein Tarot-Klon)
 * v3.4: eigene SVG-Illustrationen unter assets/feldkarten/
 * Spread: Einzelzug · Dreierlege (Vergangenheit / Gegenwart / Zukunft)
 */
(function (global) {
  'use strict';

  const ART_BASE = 'assets/feldkarten/';

  const FELDKARTEN = [
    { n: 1, name: 'Schwelle', theme: 'Übergang, Eintritt, respektvolles Öffnen', prompt: 'Welche Tür steht dir offen — und mit welchem Respekt trittst du ein?', art: ART_BASE + '01-schwelle.svg' },
    { n: 2, name: 'Wurzelband', theme: 'Erdung, Herkunft, Halt im Körper', prompt: 'Wo spürst du Halt? Was verbindet dich mit dem Boden?', art: ART_BASE + '02-wurzelband.svg' },
    { n: 3, name: 'Atembrücke', theme: 'Verbindung Innen–Außen, Rhythmus', prompt: 'Welcher Atemrhythmus bringt dich zurück in die Mitte?', art: ART_BASE + '03-atembruecke.svg' },
    { n: 4, name: 'Grenzstein', theme: 'Schutz, Nein, klare Linie', prompt: 'Wo braucht es heute ein klares, friedliches Nein?', art: ART_BASE + '04-grenzstein.svg' },
    { n: 5, name: 'Ausgleich', theme: 'Geben und Nehmen, Harmonie', prompt: 'Was hast du gegeben — was darfst du empfangen?', art: ART_BASE + '05-ausgleich.svg' },
    { n: 6, name: 'Feldlicht', theme: 'Präsenz, stille Begleitung, Klarheit', prompt: 'Was wird klar, wenn du still bleibst und nur wahrnimmst?', art: ART_BASE + '06-feldlicht.svg' },
    { n: 7, name: 'Mondspiegel', theme: 'Gefühl, Reflexion, Zyklus', prompt: 'Welches Gefühl spiegelt sich — ohne dass du es ändern musst?', art: ART_BASE + '07-mondspiegel.svg' },
    { n: 8, name: 'Sonnenkern', theme: 'Wille, Wärme, sichtbare Kraft', prompt: 'Welche Wärme darfst du zeigen, ohne zu verbrennen?', art: ART_BASE + '08-sonnenkern.svg' },
    { n: 9, name: 'Nebelpfad', theme: 'Unklarheit aushalten, nicht erzwingen', prompt: 'Was darf unklar bleiben, bis der Nebel von selbst weicht?', art: ART_BASE + '09-nebelpfad.svg' },
    { n: 10, name: 'Knotenlösen', theme: 'Loslassen, Entwirren, Freigabe', prompt: 'Welchen Knoten löst du — ohne ihn zu zerschneiden?', art: ART_BASE + '10-knotenloesen.svg' },
    { n: 11, name: 'Ahnenruf', theme: 'Erinnerung, Linie, Dank ohne Forderung', prompt: 'Wem danke ich — ohne etwas zu fordern?', art: ART_BASE + '11-ahnenruf.svg' },
    { n: 12, name: 'Werkzeugweihe', theme: 'Widmung, Sorgfalt, Zweck', prompt: 'Wofür widmest du deine Werkzeuge und Worte?', art: ART_BASE + '12-werkzeugweihe.svg' },
    { n: 13, name: 'Kreisziehen', theme: 'Raum schaffen, halten, schließen', prompt: 'Welchen Raum hältst du — und wann schließt du ihn?', art: ART_BASE + '13-kreisziehen.svg' },
    { n: 14, name: 'Stille Stunde', theme: 'Pause, Lauschen, Nicht-Tun', prompt: 'Was hörst du, wenn du eine Stunde nichts tust?', art: ART_BASE + '14-stille-stunde.svg' },
    { n: 15, name: 'Funkenwahl', theme: 'Entscheidung, Fokus, eine Flamme', prompt: 'Welche eine Flamme wählst du heute — und welche lässt du aus?', art: ART_BASE + '15-funkenwahl.svg' },
    { n: 16, name: 'Regenwaschen', theme: 'Reinigung, Abspülen, Neu', prompt: 'Was darf abgespült werden, damit Neues Raum hat?', art: ART_BASE + '16-regenwaschen.svg' },
    { n: 17, name: 'Samenwort', theme: 'Intention pflanzen, geduldig warten', prompt: 'Welches Wort pflanzt du — und wie geduldig wartest du?', art: ART_BASE + '17-samenwort.svg' },
    { n: 18, name: 'Echo der Tat', theme: 'Folge, Verantwortung, Lernen', prompt: 'Welche Tat hallt nach — und was lernst du daraus?', art: ART_BASE + '18-echo-der-tat.svg' },
    { n: 19, name: 'Hand der Gabe', theme: 'Opfer ohne Schaden, Teilen', prompt: 'Was gibst du freiwillig — ohne Schaden, ohne Zwang?', art: ART_BASE + '19-hand-der-gabe.svg' },
    { n: 20, name: 'Nachtwache', theme: 'Durchhalten, sanfte Wachsamkeit', prompt: 'Wo bleibst du wachsam — sanft, ohne Panik?', art: ART_BASE + '20-nachtwache.svg' },
    { n: 21, name: 'Sternennadel', theme: 'Richtung, Orientierung, Hoffnung', prompt: 'Welcher Stern gibt dir Richtung, wenn der Weg dunkel wirkt?', art: ART_BASE + '21-sternennadel.svg' },
    { n: 22, name: 'Heimkehr', theme: 'Abschluss, Integration, Frieden', prompt: 'Was kehrt heim in dich — und was darf Frieden finden?', art: ART_BASE + '22-heimkehr.svg' }
  ];

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

  function drawOne(exclude) {
    const pool = exclude && exclude.length
      ? FELDKARTEN.filter(c => !exclude.includes(c.n))
      : FELDKARTEN.slice();
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function drawThree() {
    const shuffled = shuffle(FELDKARTEN);
    return shuffled.slice(0, 3).map((c, i) => Object.assign({}, c, {
      position: SPREAD_THREE[i]
    }));
  }

  function getCard(n) {
    return FELDKARTEN.find(c => c.n === n) || null;
  }

  function artUrl(card) {
    if (!card) return '';
    if (card.art) return card.art;
    const full = getCard(card.n);
    return (full && full.art) || '';
  }

  function artImgHtml(card, cls) {
    const src = artUrl(card);
    if (!src) return '';
    const name = (card && card.name) || '';
    return '<img class="' + (cls || 'fk-art') + '" src="' + src + '" alt="" width="120" height="140" loading="lazy" decoding="async" data-card-art="' + (card.n || '') + '"/>';
  }

  global.UniversumCards = {
    FELDKARTEN,
    SPREAD_THREE,
    ART_BASE,
    drawOne,
    drawThree,
    getCard,
    shuffle,
    artUrl,
    artImgHtml
  };
})(typeof window !== 'undefined' ? window : globalThis);
