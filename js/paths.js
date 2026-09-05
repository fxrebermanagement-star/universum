/**
 * UNIVERSUM — 8 practice paths (path-aware rituals/sayings/calendar/diary)
 */
(function (global) {
  'use strict';

  const PATHS = [
    {
      id: 'schamanismus',
      name: 'Schamanismus',
      accent: '#c4893a',
      accentSoft: 'rgba(196, 137, 58, 0.22)',
      accentDeep: '#a06e2e',
      haltung: 'Körper zuerst — mit dem Feld gehen.',
      saying: 'Mit dem Feld gehen, nicht dagegen.',
      sayings: [
        'Mit dem Feld gehen, nicht dagegen.',
        'Trommel und Atem bringen dich zurück in den Körper.',
        'Die Reise dient dem Alltag — nicht dem Spektakel.',
        'Ahnenlicht ehren, ohne Geister zu messen.'
      ],
      emphasis: ['Samhain', 'Yule', 'Rauhnächte Beginn', 'Rauhnächte Ende', 'Imbolc'],
      ritualFlavor: 'Trommel, Atem, Ahnenlicht, Erdung.',
      greeting: 'Der Weg der Trommel und der Geisterreise — achtsam, geerdet.',
      calendarNote: 'Rauhnächte und Samhain tragen hier besonderes Gewicht — still, geerdet, ohne Spektakel.',
      recommendedRitual: 'erdung',
      practiceHint: 'Heute: kurze Erdung oder Ahnenlicht — Körper zuerst.',
      teachingTip: 'Die Trommel bringt dich zurück — drei Atemzüge auf der Erde, bevor du reist.',
      diaryPrompts: [
        'Was hat der Körper heute gesagt, bevor der Kopf antwortete?',
        'Welche Spur der Ahnen fühlst du als Kraft — ohne sie zu beschwören?',
        'Wo warst du mit dem Feld, und wo hast du dagegen gearbeitet?'
      ]
    },
    {
      id: 'nordisch',
      name: 'Nordisch',
      accent: '#7aa8c9',
      accentSoft: 'rgba(122, 168, 201, 0.22)',
      accentDeep: '#5a88a8',
      haltung: 'Ehre und Maß — Wort und Tat im Ring.',
      saying: 'Ehre die Grenze. Halte den Eid.',
      sayings: [
        'Ehre die Grenze. Halte den Eid.',
        'Sippe und Selbst: beides braucht Maß.',
        'Wort und Tat sollen denselben Ring tragen.',
        'Yule und Ostara erinnern: Kreislauf, nicht Eile.'
      ],
      emphasis: ['Yule', 'Ostara', 'Mabon', 'Michaelis', 'Rauhnächte Beginn'],
      ritualFlavor: 'Blót-ähnlich: Opfergabe symbolisch, Runen-Achtung, Ahnen.',
      greeting: 'Nordischer Pfad: Ehre, Sippe, Jahreskreis.',
      calendarNote: 'Yule, Ostara, Mabon und Michaelis — Jahresknoten der Ehre und des Maßes.',
      recommendedRitual: 'ahnenlicht',
      practiceHint: 'Heute: Ahnenlicht oder ein klarer Eid an dich selbst — ohne Pathos.',
      teachingTip: 'Ein Wort, das du hältst, wiegt mehr als zehn Runen ohne Eid.',
      diaryPrompts: [
        'Welchen Eid hast du heute gehalten — und welchen schuldest du noch?',
        'Wo war Grenze nötig, und wie hast du sie in Frieden gesetzt?',
        'Was würdest du der Sippe (oder dir) als ehrliche Gabe bringen?'
      ]
    },
    {
      id: 'voodoo',
      name: 'Voodoo',
      accent: '#b84a6a',
      accentSoft: 'rgba(184, 74, 106, 0.22)',
      accentDeep: '#943850',
      haltung: 'Respekt im Haus — keine Initiation hier.',
      saying: 'Respekt vor Lwa — nur Hauspraxis, keine Initiation.',
      sayings: [
        'Respekt vor Lwa — nur Hauspraxis, keine Initiation.',
        'Reinheit beginnt mit dem Haus und dem Herzen.',
        'Licht und Wasser reichen für den Alltag.',
        'Ein Handy kann keine Geister messen — Respekt bleibt.'
      ],
      emphasis: ['Samhain', 'Allerheiligen', 'Lostage (Probe)'],
      ritualFlavor: 'Hausaltar, Licht, Wasser, Respekt — öffentlich/Haus, nicht Initiation.',
      greeting: 'Voodoo-Hauspraxis: Respekt, Reinheit, keine Einweihung hier.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, keine Lwa-Anrufung als Medium.',
      calendarNote: 'Samhain und Allerheiligen: Respekt und Erinnerung — Hauspraxis, keine Initiation.',
      recommendedRitual: 'reinigung',
      practiceHint: 'Heute: Reinigung oder Licht am Hausaltar — Respekt, kein Medium.',
      teachingTip: 'Hauspraxis beginnt mit Reinheit des Raums — Wasser und Licht reichen oft.',
      diaryPrompts: [
        'Was hast du heute mit Respekt getan — ohne Anspruch auf Initiation?',
        'Welcher Ort in deinem Haus braucht Reinheit oder Licht?',
        'Wo endet Hauspraxis, und wo beginnt Verantwortung für Grenzen?'
      ]
    },
    {
      id: 'santeria',
      name: 'Santería',
      accent: '#c9a03a',
      accentSoft: 'rgba(201, 160, 58, 0.22)',
      accentDeep: '#a8822e',
      haltung: 'Aché im Alltag — Dank vor Forderung.',
      saying: 'Achè im Alltag — Haus, nicht Ile.',
      sayings: [
        'Achè im Alltag — Haus, nicht Ile.',
        'Reinigung und Dank vor allem Spektakel.',
        'Hauspraxis trägt — Initiation gehört nicht hierher.',
        'Kerze und Klarheit: Aché ohne Anspruch.'
      ],
      emphasis: ['Ostara', 'Beltane', 'Samhain', 'Allerheiligen'],
      ritualFlavor: 'Reinigung, Kerze, Dank — Hauspraxis, keine Initiation.',
      greeting: 'Santería-Hauspraxis: Achtung, Reinigung, Dank.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, kein Orisha-Priestertum hier.',
      calendarNote: 'Ostara, Beltane, Samhain: Reinigung und Dank im Haus — kein Ile.',
      recommendedRitual: 'reinigung',
      practiceHint: 'Heute: Reinigung oder Segen — Aché im Kleinen, ohne Initiation.',
      teachingTip: 'Aché wächst im Dank — bevor du bittest, nenne drei Dinge, die schon tragen.',
      diaryPrompts: [
        'Wo hast du heute Aché gespürt — im Alltag, nicht im Tempel?',
        'Was verdient Dank, bevor du etwas forderst?',
        'Welche Reinigung (Raum, Hand, Absicht) wäre jetzt ethisch und einfach?'
      ]
    },
    {
      id: 'hermetik',
      name: 'Hermetik',
      accent: '#9a8fd4',
      accentSoft: 'rgba(154, 143, 212, 0.22)',
      accentDeep: '#7a6fb4',
      haltung: 'Maß vor Operation — Symbol mit Ethik.',
      saying: 'Wie oben, so unten — mit Maß.',
      sayings: [
        'Wie oben, so unten — mit Maß.',
        'Symbol ohne Ethik ist leerer Glanz.',
        'Kontemplation vor Operation.',
        'Maß halten: der Operator bleibt Mensch.'
      ],
      emphasis: ['Ostara', 'Mabon', 'Litha', 'Yule'],
      ritualFlavor: 'Kreis, Weihe, Elementararbeit, Kontemplation.',
      greeting: 'Hermetischer Weg: Maß, Symbol, innere Alchemie.',
      calendarNote: 'Equinoxe und Solstitien: Achsen der Proportion — Ostara, Litha, Mabon, Yule.',
      recommendedRitual: 'kreis',
      practiceHint: 'Heute: Kreis ziehen oder Intention mit Maß prüfen.',
      teachingTip: 'Kontemplation vor Operation — prüfe das Maß, bevor du das Symbol bewegst.',
      diaryPrompts: [
        'Welches Symbol hat heute oben und unten verbunden — und mit welchem Maß?',
        'Was war Operation, was war nur Wunsch?',
        'Wo hast du Maß gehalten, wo Übermaß riskiert?'
      ]
    },
    {
      id: 'wicca',
      name: 'Wicca-Hexerei',
      accent: '#5aab7a',
      accentSoft: 'rgba(90, 171, 122, 0.22)',
      accentDeep: '#3f8a5a',
      haltung: 'Kreis halten — niemandem schaden.',
      saying: 'An es schadet niemandem — tue, was du willst.',
      sayings: [
        'An es schadet niemandem — tue, was du willst.',
        'Der Kreis hält, weil du ihn hältst.',
        'Sabbat ist Rhythmus, nicht Pflicht.',
        'Elemente erinnern: Körper, Atem, Feuer der Absicht, Wasser der Emotion.'
      ],
      emphasis: ['Imbolc', 'Ostara', 'Beltane', 'Litha', 'Lughnasadh', 'Mabon', 'Samhain', 'Yule'],
      ritualFlavor: 'Kreis, Elemente, Sabbat-Betonung, Weihe.',
      greeting: 'Wicca & Hexerei: Sabbat, Kreis, Schadensfreiheit.',
      calendarNote: 'Alle acht Sabbats sind hervorgehoben — der Jahreskreis als Atem.',
      recommendedRitual: 'kreis',
      practiceHint: 'Heute: Kreis oder Segen — und das Rede an niemandem Schaden.',
      teachingTip: 'Der Kreis hält, weil du ihn hältst — schließe ihn bewusst, auch nach kurzer Praxis.',
      diaryPrompts: [
        'Hat deine Absicht heute jemandem geschadet — auch subtil?',
        'Welches Element fehlte in deinem Tag: Erde, Luft, Feuer, Wasser?',
        'Welcher Sabbat-Ton (auch außerhalb des Datums) spürst du gerade?'
      ]
    },
    {
      id: 'chaosmagie',
      name: 'Chaosmagie',
      accent: '#c45ec8',
      accentSoft: 'rgba(196, 94, 200, 0.22)',
      accentDeep: '#a040a8',
      haltung: 'Laden, dann loslassen — ethisch klar.',
      saying: 'Nichts ist wahr. Alles ist erlaubt — mit Ethik.',
      sayings: [
        'Nichts ist wahr. Alles ist erlaubt — mit Ethik.',
        'Laden — dann vergessen. Ergebnis nicht jagen.',
        'Modell agnostisch, Praxis konkret.',
        'Gnosis ohne Schaden: der Trick bleibt ethisch.'
      ],
      emphasis: [],
      ritualFlavor: 'Sigil, Gnosis, vergessen, Ergebnis-Magie.',
      greeting: 'Chaosmagie: Modell-Agnostik, Praxis vor Dogma.',
      calendarNote: 'Keine feste Sabbat-Pflicht — jeder Tag kann Labor sein, wenn Ethik hält.',
      recommendedRitual: '369',
      practiceHint: 'Heute: Sigil oder 369 — laden, dann loslassen.',
      teachingTip: 'Gnosis ist kurz — lade voll, dann lass los. Ergebnis-Jagd schwächt den Sigil.',
      diaryPrompts: [
        'Welches Modell hast du heute benutzt — und hast du es danach wieder abgelegt?',
        'Was hast du geladen und bewusst vergessen?',
        'Wo war Ergebnis-Jagd stärker als ethische Klarheit?'
      ]
    },
    {
      id: 'esoterik',
      name: 'Esoterik',
      accent: '#8b6fd0',
      accentSoft: 'rgba(139, 111, 208, 0.22)',
      accentDeep: '#6a4fb0',
      haltung: 'Still üben — Daten bleiben bei dir.',
      saying: 'Feldlicht ist da — still begleiten.',
      sayings: [
        'Feldlicht ist da — still begleiten.',
        'Praxiswerkzeug, kein Schaukasten.',
        'Atem, Intention, Licht, Ausgleich.',
        'Ein Handy kann keine Geister messen.'
      ],
      emphasis: ['Imbolc', 'Ostara', 'Samhain', 'Yule', 'Rauhnächte Beginn'],
      ritualFlavor: 'Atem, Intention, Licht, Ausgleich.',
      greeting: 'Offene Esoterik: Praxiswerkzeug, kein Schaukasten.',
      calendarNote: 'Imbolc, Ostara, Samhain, Yule und Rauhnächte — sanfte Jahresmarker.',
      recommendedRitual: 'atem46',
      practiceHint: 'Heute: Atembrücke oder Intention — still und klar.',
      teachingTip: 'Feldlicht begleitet still — eine klare Intention ersetzt zehn laute Rituale.',
      diaryPrompts: [
        'Was hat das Feldlicht heute leise gezeigt?',
        'Welche Praxis war Werkzeug — und welche wäre Schau gewesen?',
        'Wo brauchst du Ausgleich, bevor du weitermachst?'
      ]
    }
  ];

  const PATH_FESTIVALS = [
    { name: 'Michaelis', m: 9, d: 29, paths: ['nordisch', 'esoterik'] },
    { name: 'Allerheiligen', m: 11, d: 1, paths: ['voodoo', 'santeria', 'wicca'] }
  ];

  function getPath(id) {
    return PATHS.find(p => p.id === id) || PATHS[PATHS.length - 1];
  }

  function isEmphasized(festivalName, pathId) {
    const path = getPath(pathId);
    if (path.emphasis.includes(festivalName)) return true;
    return PATH_FESTIVALS.some(f => f.name === festivalName && f.paths.includes(pathId));
  }

  function festivalsForPath(date, pathId) {
    const Astro = global.UniversumAstro;
    let list = Astro ? Astro.festivalsOn(date) : [];
    const d = date || new Date();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    PATH_FESTIVALS.forEach(f => {
      if (f.m === m && f.d === day && f.paths.includes(pathId)) {
        list = list.concat([{ name: f.name, m: f.m, d: f.d }]);
      }
    });
    return list.map(f => ({
      ...f,
      emphasized: isEmphasized(f.name, pathId)
    }));
  }

  function randomSaying(pathId) {
    const path = getPath(pathId);
    const list = path.sayings && path.sayings.length ? path.sayings : [path.saying];
    const day = new Date().getDate();
    return list[day % list.length];
  }

  function diaryPrompts(pathId) {
    const path = getPath(pathId);
    return path.diaryPrompts || [
      'Was bleibt von heute?',
      'Welche Absicht war ethisch klar?',
      'Wo brauchst du Ausgleich?'
    ];
  }

  /** Next festival from today (inclusive), preferring path-emphasized ones in note. */
  function nextFestival(fromDate, pathId) {
    const Astro = global.UniversumAstro;
    const start = fromDate ? new Date(fromDate.getTime()) : new Date();
    start.setHours(12, 0, 0, 0);
    const all = [];
    if (Astro && Astro.FESTIVALS) {
      Astro.FESTIVALS.forEach(f => all.push(f));
    } else if (Astro) {
      // fallback: scan a year via festivalsOn
    }
    PATH_FESTIVALS.forEach(f => {
      if (!all.some(x => x.name === f.name && x.m === f.m && x.d === f.d)) {
        all.push({ name: f.name, m: f.m, d: f.d });
      }
    });
    // Build candidates for this year and next
    const y = start.getFullYear();
    const candidates = [];
    [y, y + 1].forEach(year => {
      all.forEach(f => {
        const dt = new Date(year, f.m - 1, f.d, 12, 0, 0, 0);
        if (dt >= new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)) {
          candidates.push({
            name: f.name,
            date: dt,
            emphasized: isEmphasized(f.name, pathId)
          });
        }
      });
    });
    candidates.sort((a, b) => a.date - b.date || (b.emphasized ? 1 : 0) - (a.emphasized ? 1 : 0));
    // Prefer soonest; if same day multiple, prefer emphasized
    if (!candidates.length) return null;
    const firstDay = candidates[0].date.toDateString();
    const same = candidates.filter(c => c.date.toDateString() === firstDay);
    same.sort((a, b) => (b.emphasized ? 1 : 0) - (a.emphasized ? 1 : 0));
    return same[0];
  }

  global.UniversumPaths = {
    PATHS,
    PATH_FESTIVALS,
    getPath,
    isEmphasized,
    festivalsForPath,
    randomSaying,
    diaryPrompts,
    nextFestival
  };
})(typeof window !== 'undefined' ? window : globalThis);
