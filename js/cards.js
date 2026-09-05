/**
 * UNIVERSUM — 22 originale Feldkarten (kein Tarot-Klon)
 * Spread: Einzelzug · Dreierlege (Vergangenheit / Gegenwart / Zukunft)
 */
(function (global) {
  'use strict';

  const FELDKARTEN = [
    { n: 1, name: 'Schwelle', theme: 'Übergang, Eintritt, respektvolles Öffnen', prompt: 'Welche Tür steht dir offen — und mit welchem Respekt trittst du ein?' },
    { n: 2, name: 'Wurzelband', theme: 'Erdung, Herkunft, Halt im Körper', prompt: 'Wo spürst du Halt? Was verbindet dich mit dem Boden?' },
    { n: 3, name: 'Atembrücke', theme: 'Verbindung Innen–Außen, Rhythmus', prompt: 'Welcher Atemrhythmus bringt dich zurück in die Mitte?' },
    { n: 4, name: 'Grenzstein', theme: 'Schutz, Nein, klare Linie', prompt: 'Wo braucht es heute ein klares, friedliches Nein?' },
    { n: 5, name: 'Ausgleich', theme: 'Geben und Nehmen, Harmonie', prompt: 'Was hast du gegeben — was darfst du empfangen?' },
    { n: 6, name: 'Feldlicht', theme: 'Präsenz, stille Begleitung, Klarheit', prompt: 'Was wird klar, wenn du still bleibst und nur wahrnimmst?' },
    { n: 7, name: 'Mondspiegel', theme: 'Gefühl, Reflexion, Zyklus', prompt: 'Welches Gefühl spiegelt sich — ohne dass du es ändern musst?' },
    { n: 8, name: 'Sonnenkern', theme: 'Wille, Wärme, sichtbare Kraft', prompt: 'Welche Wärme darfst du zeigen, ohne zu verbrennen?' },
    { n: 9, name: 'Nebelpfad', theme: 'Unklarheit aushalten, nicht erzwingen', prompt: 'Was darf unklar bleiben, bis der Nebel von selbst weicht?' },
    { n: 10, name: 'Knotenlösen', theme: 'Loslassen, Entwirren, Freigabe', prompt: 'Welchen Knoten löst du — ohne ihn zu zerschneiden?' },
    { n: 11, name: 'Ahnenruf', theme: 'Erinnerung, Linie, Dank ohne Forderung', prompt: 'Wem danke ich — ohne etwas zu fordern?' },
    { n: 12, name: 'Werkzeugweihe', theme: 'Widmung, Sorgfalt, Zweck', prompt: 'Wofür widmest du deine Werkzeuge und Worte?' },
    { n: 13, name: 'Kreisziehen', theme: 'Raum schaffen, halten, schließen', prompt: 'Welchen Raum hältst du — und wann schließt du ihn?' },
    { n: 14, name: 'Stille Stunde', theme: 'Pause, Lauschen, Nicht-Tun', prompt: 'Was hörst du, wenn du eine Stunde nichts tust?' },
    { n: 15, name: 'Funkenwahl', theme: 'Entscheidung, Fokus, eine Flamme', prompt: 'Welche eine Flamme wählst du heute — und welche lässt du aus?' },
    { n: 16, name: 'Regenwaschen', theme: 'Reinigung, Abspülen, Neu', prompt: 'Was darf abgespült werden, damit Neues Raum hat?' },
    { n: 17, name: 'Samenwort', theme: 'Intention pflanzen, geduldig warten', prompt: 'Welches Wort pflanzt du — und wie geduldig wartest du?' },
    { n: 18, name: 'Echo der Tat', theme: 'Folge, Verantwortung, Lernen', prompt: 'Welche Tat hallt nach — und was lernst du daraus?' },
    { n: 19, name: 'Hand der Gabe', theme: 'Opfer ohne Schaden, Teilen', prompt: 'Was gibst du freiwillig — ohne Schaden, ohne Zwang?' },
    { n: 20, name: 'Nachtwache', theme: 'Durchhalten, sanfte Wachsamkeit', prompt: 'Wo bleibst du wachsam — sanft, ohne Panik?' },
    { n: 21, name: 'Sternennadel', theme: 'Richtung, Orientierung, Hoffnung', prompt: 'Welcher Stern gibt dir Richtung, wenn der Weg dunkel wirkt?' },
    { n: 22, name: 'Heimkehr', theme: 'Abschluss, Integration, Frieden', prompt: 'Was kehrt heim in dich — und was darf Frieden finden?' }
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

  global.UniversumCards = {
    FELDKARTEN,
    SPREAD_THREE,
    drawOne,
    drawThree,
    getCard,
    shuffle
  };
})(typeof window !== 'undefined' ? window : globalThis);
