/**
 * UNIVERSUM — Geführte Rituale, 369, Sicherheit, Atembrücke, Kerzenwache
 */
(function (global) {
  'use strict';

  const GUIDED = [
    {
      id: 'erdung',
      name: 'Erdung',
      ico: '🌱',
      mins: 5,
      paths: null,
      breath: true,
      steps: [
        { title: 'Stand', text: 'Füße fest auf dem Boden. Schultern sinken lassen. Drei bewusste Atemzüge.', sec: 45, breath: true },
        { title: 'Wurzel', text: 'Stell dir Wurzeln von den Fußsohlen in die Erde vor. Gewicht abgeben — ohne Kraftverlust.', sec: 90 },
        { title: 'Rückkehr', text: 'Fühle Hände, Gesicht, Raum. Sage leise: „Ich bin hier.“', sec: 60 },
        { title: 'Schluss', text: 'Danke dem Boden. Öffne die Augen vollständig. Trink einen Schluck Wasser.', sec: 45 }
      ]
    },
    {
      id: 'kreis',
      name: 'Kreis ziehen',
      ico: '⭕',
      mins: 8,
      paths: null,
      steps: [
        { title: 'Vorbereitung', text: 'Raum lüften. Störquellen beiseite. Ethik: kein Schaden, klare Absicht.', sec: 60 },
        { title: 'Mittelpunkt', text: 'Stehe oder sitze mittig. Spüre die vier Richtungen oder einfach „rundherum“.', sec: 60 },
        { title: 'Kreis', text: 'Mit der Hand oder dem Blick einen Kreis um dich ziehen. „Dieser Raum hält.“', sec: 90 },
        { title: 'Halten', text: 'Atme ruhig. Der Kreis ist Symbol — du bleibst verantwortlich.', sec: 120, breath: true },
        { title: 'Schließen', text: 'Kreis bewusst öffnen/auflösen. „Der Raum ist frei.“ Danken.', sec: 60 }
      ]
    },
    {
      id: 'schutzfeld',
      name: 'Schutzfeld',
      ico: '🛡️',
      mins: 7,
      paths: null,
      steps: [
        { title: 'Grenze', text: 'Erinnere: Grenze und Ausgleich. Schutz heißt Nein können — nicht angreifen.', sec: 45 },
        { title: 'Atem', text: 'Einatmen: Klarheit. Ausatmen: Spannung abgeben. 4×.', sec: 90, breath: true },
        { title: 'Feld', text: 'Stelle dir eine ruhige Hülle um dich vor — durchlässig für Gutes, klar gegen Übergriff.', sec: 120 },
        { title: 'Wort', text: '„Ich halte meine Grenze in Frieden.“ Kein Fluch, kein Schaden.', sec: 60 },
        { title: 'Alltag', text: 'Öffne sanft. Schutz bleibt als Haltung, nicht als Panik.', sec: 45 }
      ]
    },
    {
      id: 'weihe',
      name: 'Werkzeug weihen',
      ico: '✨',
      mins: 10,
      paths: null,
      steps: [
        { title: 'Gegenstand', text: 'Lege das Werkzeug vor dich. Zweck benennen — ehrlich und ohne Schaden.', sec: 60 },
        { title: 'Reinigen', text: 'Abwischen, über Räucherwerk/Kerze halten oder mit Atem streichen (symbolisch).', sec: 90 },
        { title: 'Widmen', text: '„Du dienest zu …“ — ein Satz. Keine fremde Willensbeugung.', sec: 90 },
        { title: 'Halten', text: 'Stille. Spüre Gewicht und Form. Zustimmung des Körpers prüfen.', sec: 120 },
        { title: 'Ablegen', text: 'Werkzeug an seinen Platz. Ritual schließen. Wasser trinken.', sec: 45 }
      ]
    },
    {
      id: 'ahnenlicht',
      name: 'Ahnenlicht',
      ico: '🕯️',
      mins: 8,
      paths: ['schamanismus', 'nordisch', 'voodoo', 'santeria', 'wicca', 'esoterik'],
      steps: [
        { title: 'Rahmen', text: 'Nur Erinnerung und Dank — keine Geistermessung. Ein Handy kann keine Geister messen.', sec: 45 },
        { title: 'Licht', text: 'Kerze oder digitales Licht. Namen oder Linie nennen, die du ehren willst.', sec: 90 },
        { title: 'Dank', text: 'Kurzer Dank für Leben, Lehre, Widerstandskraft. Keine Forderungen.', sec: 120 },
        { title: 'Stille', text: 'Schweigen. Gefühle kommen und gehen dürfen.', sec: 90 },
        { title: 'Löschen', text: 'Licht löschen/aus. „Der Alltag nimmt wieder Raum.“', sec: 45 }
      ]
    },
    {
      id: 'loslassen',
      name: 'Loslassen',
      ico: '🍃',
      mins: 9,
      paths: null,
      steps: [
        { title: 'Benennen', text: 'Was darf gehen? Ein Wort oder Satz aufschreiben (mental oder Papier).', sec: 90 },
        { title: 'Körper', text: 'Schultern, Kiefer, Bauch prüfen. Spannung anerkennen ohne Drama.', sec: 60 },
        { title: 'Übergabe', text: 'Atem: ein — halten — aus und „ich lasse los“ (ohne Schaden an Personen).', sec: 120, breath: true },
        { title: 'Ersatz', text: 'Was darf an die Stelle? Eine kleine, ethische Intention.', sec: 90 },
        { title: 'Schluss', text: 'Papier entsorgen oder Satz streichen. Zurück in den Raum.', sec: 45 }
      ]
    },
    {
      id: 'segen',
      name: 'Segen',
      ico: '🙏',
      mins: 6,
      paths: null,
      steps: [
        { title: 'Absicht', text: 'Segen für dich, einen Ort oder eine Situation — nie gegen jemanden.', sec: 45 },
        { title: 'Hände', text: 'Hände öffnen oder über Herz. Wärme vorstellen.', sec: 60 },
        { title: 'Worte', text: '„Möge … in Frieden und Klarheit sein.“ Kurz und ehrlich.', sec: 90 },
        { title: 'Ausgleich', text: 'Was gibst du zurück? Dank, Geduld, eine kleine gute Tat.', sec: 60 },
        { title: 'Ende', text: 'Hände senken. Alltag fortsetzen.', sec: 30 }
      ]
    },
    {
      id: 'reinigung',
      name: 'Reinigung',
      ico: '💧',
      mins: 8,
      paths: null,
      steps: [
        { title: 'Raum', text: 'Fenster öffnen oder symbolisch „Luft“ einladen. Staub wegwischen.', sec: 60 },
        { title: 'Wasser/Atem', text: 'Hände waschen oder drei klare Atemzüge als Abspülen.', sec: 90, breath: true },
        { title: 'Wort', text: '„Was nicht dient, darf gehen.“ Ohne Fluch auf Personen.', sec: 60 },
        { title: 'Neu setzen', text: 'Eine frische Absicht für den Raum: Ruhe, Arbeit, Gastfreundschaft.', sec: 90 },
        { title: 'Schließen', text: 'Danken. Fenster nach Bedarf. Weiter.', sec: 40 }
      ]
    },
    {
      id: 'intention',
      name: 'Intention setzen',
      ico: '🎯',
      mins: 7,
      paths: null,
      steps: [
        { title: 'Prüfen', text: 'Ist die Absicht klar, ethisch, ohne Schaden? Wenn nein — stoppen.', sec: 60 },
        { title: 'Formulieren', text: 'Ein positiver Satz in Gegenwart („Ich übe …“).', sec: 90 },
        { title: 'Körper', text: 'Satz dreimal sagen. Spüren: ja, nein, oder zu groß?', sec: 90 },
        { title: 'Verankern', text: 'Kleine nächste Handlung wählen (heute noch machbar).', sec: 60 },
        { title: 'Loslassen des Zwangs', text: 'Absicht halten, Ergebnis nicht erzwingen. Schließen.', sec: 45 }
      ]
    },
    {
      id: 'atem46',
      name: 'Atembrücke 4/6',
      ico: '🌬️',
      mins: 5,
      paths: null,
      breath: true,
      steps: [
        { title: 'Haltung', text: 'Bequem sitzen. Kiefer locker. Handy stumm.', sec: 30 },
        { title: 'Rhythmus', text: 'Einatmen 4 — Ausatmen 6. Sanft durch die Nase wenn möglich.', sec: 180, breath: true, breathIn: 4, breathOut: 6 },
        { title: 'Brücke', text: 'Mit dem Ausatmen Spannung abgeben. Mit dem Einatmen Präsenz.', sec: 60, breath: true },
        { title: 'Rückkehr', text: 'Normal atmen. Augen öffnen. Bereit für den nächsten Schritt.', sec: 30 }
      ]
    },
    {
      id: 'kerze15',
      name: 'Kerzenwache (15 Min)',
      ico: '🔥',
      mins: 15,
      paths: null,
      candle: true,
      steps: [
        { title: 'Sicherheit', text: 'Echte Kerze nur unter Aufsicht. Sonst LED. Kein Vorhang in Nähe.', sec: 45 },
        { title: 'Zünden', text: 'Licht setzen. Absicht: Wachsamkeit und Stille — kein Schaden.', sec: 30 },
        { title: 'Wache', text: 'Bei der Flamme bleiben. Gedanken kommen und gehen. Atmen.', sec: 720, candle: true },
        { title: 'Löschen', text: 'Flamme löschen. Danken. Raum verlassen erst wenn sicher.', sec: 45 }
      ]
    },
    {
      id: '369',
      name: '369-Praxis',
      ico: '3️⃣',
      mins: 6,
      paths: ['chaosmagie', 'esoterik', 'hermetik'],
      practice369: true,
      steps: [
        { title: 'Satz', text: 'Formuliere einen ethischen 369-Satz (kein Schaden, keine Willensbeugung).', sec: 60 },
        { title: 'Morgen ×3', text: 'Schreibe oder sprich den Satz 3× (morgens gedacht).', sec: 90, slot369: 'morning', count369: 3 },
        { title: 'Nachmittag ×6', text: '6× — fokussiert, ohne Zwang.', sec: 120, slot369: 'afternoon', count369: 6 },
        { title: 'Abend ×9', text: '9× — dann loslassen und „vergessen“ wie beim Sigil.', sec: 150, slot369: 'evening', count369: 9 },
        { title: 'Schließen', text: 'Praxis beenden. Ergebnis nicht jagen. Alltag.', sec: 30 }
      ]
    }
  ];

  const SAFETY_ITEMS = [
    { id: 'body', label: 'Körper: Ich bin nüchtern genug und fühle mich stabil genug für diese Praxis.' },
    { id: 'purpose', label: 'Zweck: Meine Absicht ist klar und ehrlich formuliert.' },
    { id: 'boundaries', label: 'Grenzen: Ich respektiere meine und fremde Grenzen.' },
    { id: 'noharm', label: 'Kein Schaden: Ich richte diese Arbeit nicht gegen Personen und will niemandem schaden.' },
    { id: 'closing', label: 'Abschluss: Ich werde die Praxis bewusst schließen und in den Alltag zurückkehren.' }
  ];

  function listForPath(pathId) {
    return GUIDED.filter(r => !r.paths || r.paths.includes(pathId));
  }

  function getRitual(id) {
    return GUIDED.find(r => r.id === id);
  }

  function vibrate(pattern) {
    try {
      const data = global.UniversumStorage && global.UniversumStorage.load();
      if (data && data.settings && data.settings.haptics === false) return;
      if (navigator.vibrate) navigator.vibrate(pattern || 40);
    } catch (_) { /* ignore */ }
  }

  global.UniversumRituals = {
    GUIDED,
    SAFETY_ITEMS,
    listForPath,
    getRitual,
    vibrate
  };
})(typeof window !== 'undefined' ? window : globalThis);
