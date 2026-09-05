/**
 * UNIVERSUM — 8 practice paths (path-aware rituals/sayings/calendar/diary)
 * v2.4: richer calendar emphasis, Haltung in safety/closing/step intros
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
      emphasis: [
        'Samhain', 'Yule', 'Rauhnächte Beginn', 'Rauhnächte Ende', 'Imbolc',
        'Lostage (Probe)', 'Ahnen-Gedenken'
      ],
      ritualFlavor: 'Trommel-Atem, Ahnenlicht, Erdung — Körper vor Spektakel.',
      greeting: 'Der Weg der Trommel und der Geisterreise — achtsam, geerdet.',
      calendarNote: 'Rauhnächte, Samhain, Ahnen-Gedenken und Lostage: still, geerdet, ohne Spektakel. Körper zuerst.',
      recommendedRitual: 'trommel-atem',
      practiceHint: 'Heute: Trommel-Atem oder Ahnenlicht — Körper zuerst.',
      teachingTip: 'Die Trommel bringt dich zurück — drei Atemzüge auf der Erde, bevor du reist.',
      diaryPrompts: [
        'Was hat der Körper heute gesagt, bevor der Kopf antwortete?',
        'Welche Spur der Ahnen fühlst du als Kraft — ohne sie zu beschwören?',
        'Wo warst du mit dem Feld, und wo hast du dagegen gearbeitet?'
      ],
      stepIntro: 'Körper zuerst. Mit dem Feld gehen.',
      safetyLead: 'Vor der Trommel und dem Atem — Boden und Grenze.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin geerdet genug — nüchtern und stabil für diese Praxis.' },
        { id: 'purpose', label: 'Zweck: Die Reise dient dem Alltag, nicht dem Spektakel.' },
        { id: 'boundaries', label: 'Grenzen: Ich ehre Ahnenlicht ohne Geister zu messen oder zu fordern.' },
        { id: 'noharm', label: 'Kein Schaden: Keine Arbeit gegen Personen, kein erzwungenes Medium.' },
        { id: 'closing', label: 'Abschluss: Ich kehre bewusst in den Körper und den Alltag zurück.' }
      ],
      closing: {
        danken: 'Danke dem Boden, dem Atem und dem Feld — ohne Forderung an Geister.',
        atmen: 'Drei ruhige Züge. Puls verlangsamen. Der Körper führt zurück.',
        erden: 'Füße, Sitzbein, Hände, Wasser. „Ich bin hier.“',
        siegeln: '„Die Reise ist geschlossen.“ Alltag nimmt Raum. Kein Schaden.'
      },
      closingToast: 'Geerdet — mit dem Feld, nicht dagegen.'
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
      emphasis: [
        'Yule', 'Ostara', 'Mabon', 'Michaelis', 'Rauhnächte Beginn',
        'Rauhnächte Ende', 'Ahnen-Gedenken', 'Mittsommer-Achtung'
      ],
      ritualFlavor: 'Maß/Eid, Gabe, Ahnenlicht — Wort und Tat im Ring.',
      greeting: 'Nordischer Pfad: Ehre, Sippe, Jahreskreis.',
      calendarNote: 'Yule, Ostara, Mabon, Michaelis, Rauhnächte und Ahnen-Gedenken — Knoten der Ehre und des Maßes.',
      recommendedRitual: 'mass-eid',
      practiceHint: 'Heute: Maß/Eid oder Gabe — ohne Pathos.',
      teachingTip: 'Ein Wort, das du hältst, wiegt mehr als zehn Runen ohne Eid.',
      diaryPrompts: [
        'Welchen Eid hast du heute gehalten — und welchen schuldest du noch?',
        'Wo war Grenze nötig, und wie hast du sie in Frieden gesetzt?',
        'Was würdest du der Sippe (oder dir) als ehrliche Gabe bringen?'
      ],
      stepIntro: 'Ehre die Grenze. Halte den Eid.',
      safetyLead: 'Vor dem Ring — Maß prüfen, Eid prüfen.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin klar und stabil genug, Wort und Tat zu tragen.' },
        { id: 'purpose', label: 'Zweck: Mein Eid oder meine Gabe ist ehrlich und haltbar.' },
        { id: 'boundaries', label: 'Grenzen: Ich ehre Sippe und Selbst — beides braucht Maß.' },
        { id: 'noharm', label: 'Kein Schaden: Kein Fluch, keine Schande über andere legen.' },
        { id: 'closing', label: 'Abschluss: Ich schließe den Ring bewusst und kehre in den Alltag.' }
      ],
      closing: {
        danken: 'Dank an Sippe, Boden und das Maß, das dich hält — ohne Pathos.',
        atmen: 'Ruhig atmen. Wort und Tat im selben Ring spüren.',
        erden: 'Stand fest. Schultern sinken. Der Eid bleibt Haltung, nicht Drama.',
        siegeln: '„Der Ring ist gehalten.“ Grenze und Ausgleich. Weiter in Ehre.'
      },
      closingToast: 'Maß gehalten — Eid im Alltag.'
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
      emphasis: [
        'Samhain', 'Allerheiligen', 'Fetene Gede (Erinnerung)',
        'Hausaltar-Tag', 'Lostage (Probe)'
      ],
      ritualFlavor: 'Hausreinigung, Licht/Wasser — öffentlich/Haus, nicht Initiation. Lwa-Respekt ohne Medium.',
      greeting: 'Voodoo-Hauspraxis: Respekt, Reinheit, keine Einweihung hier.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, keine Lwa-Anrufung als Medium. Fetene Gede hier nur als respektvolle Erinnerung — kein Ritus der Einweihung.',
      calendarNote: 'Samhain, Allerheiligen, Fetene Gede (Erinnerung) und Hausaltar-Tag: Respekt und Reinheit im Haus — ausdrücklich keine Initiation und kein Medium.',
      recommendedRitual: 'hausreinigung-voodoo',
      practiceHint: 'Heute: Hausreinigung oder Licht/Wasser — Respekt, kein Medium.',
      teachingTip: 'Hauspraxis beginnt mit Reinheit des Raums — Wasser und Licht reichen oft.',
      diaryPrompts: [
        'Was hast du heute mit Respekt getan — ohne Anspruch auf Initiation?',
        'Welcher Ort in deinem Haus braucht Reinheit oder Licht?',
        'Wo endet Hauspraxis, und wo beginnt Verantwortung für Grenzen?'
      ],
      stepIntro: 'Hauspraxis. Respekt. Keine Initiation.',
      safetyLead: 'Vor Hausarbeit — Respekt und klare Grenze zur Tradition.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin stabil genug für ruhige Hauspraxis.' },
        { id: 'purpose', label: 'Zweck: Reinheit und Respekt im Haus — kein Medium, keine Initiation.' },
        { id: 'boundaries', label: 'Grenzen: Ich ehre Lwa-Tradition, ohne sie hier zu beanspruchen.' },
        { id: 'noharm', label: 'Kein Schaden: Kein Fluch, keine Arbeit gegen Personen.' },
        { id: 'closing', label: 'Abschluss: Ich schließe Licht/Wasser und kehre klar in den Alltag.' }
      ],
      closing: {
        danken: 'Dank dem Haus, dem Wasser und dem Licht — Respekt ohne Forderung.',
        atmen: 'Drei ruhige Atemzüge. Reinheit bleibt Haltung.',
        erden: 'Hände waschen oder Raum spüren. Du bleibst im Alltag, nicht im Ile.',
        siegeln: '„Hauspraxis geschlossen.“ Keine Initiation beansprucht. Grenze gehalten.'
      },
      closingToast: 'Haus in Respekt — Praxis geschlossen.'
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
      emphasis: [
        'Ostara', 'Beltane', 'Samhain', 'Allerheiligen',
        'Día de las Madres (Haus-Dank)', 'Hausaltar-Tag'
      ],
      ritualFlavor: 'Reinigung und Aché, Dank/Kerze — Hauspraxis. Orisha-Respekt ohne Priestertum hier.',
      greeting: 'Santería-Hauspraxis: Achtung, Reinigung, Dank.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, kein Orisha-Priestertum, kein Ile hier. Dank und Reinigung im Alltag — Aché ohne Anspruch.',
      calendarNote: 'Ostara, Beltane, Samhain, Allerheiligen und Haus-Dank-Tage: Reinigung und Aché im Haus — klar getrennt von Ile und Einweihung. Anders als Voodoo-Hauspraxis: Fokus Dank/Aché, nicht Lwa/Fetene-Gede-Ton.',
      recommendedRitual: 'reinigung-ache',
      practiceHint: 'Heute: Reinigung und Aché oder Dank — ohne Initiation.',
      teachingTip: 'Aché wächst im Dank — bevor du bittest, nenne drei Dinge, die schon tragen.',
      diaryPrompts: [
        'Wo hast du heute Aché gespürt — im Alltag, nicht im Tempel?',
        'Was verdient Dank, bevor du etwas forderst?',
        'Welche Reinigung (Raum, Hand, Absicht) wäre jetzt ethisch und einfach?'
      ],
      stepIntro: 'Aché im Kleinen. Dank vor Bitte. Haus, nicht Ile.',
      safetyLead: 'Vor der Hausarbeit — Dank und Grenze zur Initiation.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin ruhig und klar genug für Hauspraxis.' },
        { id: 'purpose', label: 'Zweck: Reinigung und Dank — Aché ohne Anspruch auf Ile.' },
        { id: 'boundaries', label: 'Grenzen: Ich ehre Orisha-Tradition, ohne Priestertum hier zu üben.' },
        { id: 'noharm', label: 'Kein Schaden: Keine Arbeit gegen Personen, keine Willensbeugung.' },
        { id: 'closing', label: 'Abschluss: Ich schließe Kerze und Raum und kehre in den Alltag.' }
      ],
      closing: {
        danken: 'Dank für Aché im Kleinen — bevor jede Bitte. Haus, nicht Ile.',
        atmen: 'Ruhiger Atem. Klarheit statt Spektakel.',
        erden: 'Hände, Tisch, Wasser. Alltag trägt weiter.',
        siegeln: '„Hauspraxis geschlossen.“ Keine Initiation. Aché ohne Anspruch.'
      },
      closingToast: 'Dank gehalten — Aché im Alltag.'
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
      emphasis: [
        'Ostara', 'Mabon', 'Litha', 'Yule',
        'Merkur-Tag (Achtung)', 'Equinox-Achse'
      ],
      ritualFlavor: 'Kreis, Stunden halten, Weihe — Kontemplation vor Operation.',
      greeting: 'Hermetischer Weg: Maß, Symbol, innere Alchemie.',
      calendarNote: 'Equinoxe, Solstitien und Merkur-Achtung: Achsen der Proportion — Ostara, Litha, Mabon, Yule.',
      recommendedRitual: 'stunden-halten',
      practiceHint: 'Heute: Stunden halten oder Weihe mit Maß.',
      teachingTip: 'Kontemplation vor Operation — prüfe das Maß, bevor du das Symbol bewegst.',
      diaryPrompts: [
        'Welches Symbol hat heute oben und unten verbunden — und mit welchem Maß?',
        'Was war Operation, was war nur Wunsch?',
        'Wo hast du Maß gehalten, wo Übermaß riskiert?'
      ],
      stepIntro: 'Kontemplation vor Operation. Maß halten.',
      safetyLead: 'Vor dem Symbol — Ethik und Proportion prüfen.',
      safetyItems: [
        { id: 'body', label: 'Körper: Der Operator bleibt Mensch — ich bin nüchtern und klar.' },
        { id: 'purpose', label: 'Zweck: Symbol mit Ethik; keine Operation ohne Maß.' },
        { id: 'boundaries', label: 'Grenzen: Ich überschreite weder mein noch fremdes Maß.' },
        { id: 'noharm', label: 'Kein Schaden: Keine Willensbeugung, kein leerer Glanz gegen Personen.' },
        { id: 'closing', label: 'Abschluss: Ich löse das Symbol und kehre proportioniert zurück.' }
      ],
      closing: {
        danken: 'Dank dem Maß und dem Symbol — ohne Anspruch auf Allmacht.',
        atmen: 'Gleichmäßiger Atem. Oben und unten in Ruhe lassen.',
        erden: 'Hände, Gewicht, Raum. Der Operator bleibt Mensch.',
        siegeln: '„Operation geschlossen.“ Proportion gehalten. Ethik bleibt.'
      },
      closingToast: 'Maß gehalten — Symbol zur Ruhe.'
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
      emphasis: [
        'Imbolc', 'Ostara', 'Beltane', 'Litha', 'Lughnasadh', 'Mabon', 'Samhain', 'Yule',
        'Vollmond-Achtung', 'Neumond-Setzen'
      ],
      ritualFlavor: 'Kreis, Elemente, Sabbat-Segen — Schadensfreiheit zuerst.',
      greeting: 'Wicca & Hexerei: Sabbat, Kreis, Schadensfreiheit.',
      calendarNote: 'Alle acht Sabbats plus Mond-Achtung — der Jahreskreis als Atem, nicht als Pflicht.',
      recommendedRitual: 'elemente',
      practiceHint: 'Heute: Elemente oder Sabbat-Segen — und das Rede an niemandem Schaden.',
      teachingTip: 'Der Kreis hält, weil du ihn hältst — schließe ihn bewusst, auch nach kurzer Praxis.',
      diaryPrompts: [
        'Hat deine Absicht heute jemandem geschadet — auch subtil?',
        'Welches Element fehlte in deinem Tag: Erde, Luft, Feuer, Wasser?',
        'Welcher Sabbat-Ton (auch außerhalb des Datums) spürst du gerade?'
      ],
      stepIntro: 'An es schadet niemandem. Kreis halten.',
      safetyLead: 'Vor dem Kreis — Rede und Grenze prüfen.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin stabil genug, den Kreis ruhig zu halten.' },
        { id: 'purpose', label: 'Zweck: Meine Absicht schadet niemandem — auch nicht subtil.' },
        { id: 'boundaries', label: 'Grenzen: Ich halte den Kreis und respektiere fremde Willen.' },
        { id: 'noharm', label: 'Kein Schaden: An es harm none — keine Arbeit gegen Personen.' },
        { id: 'closing', label: 'Abschluss: Ich öffne den Kreis bewusst und kehre in den Alltag.' }
      ],
      closing: {
        danken: 'Dank den Elementen und dem Kreis — ohne Pflichtzwang.',
        atmen: 'Atem wie Sabbat-Rhythmus: kommen und gehen lassen.',
        erden: 'Erde unter den Füßen. Kreis noch spüren, dann öffnen.',
        siegeln: '„Der Kreis ist geöffnet.“ Niemandem geschadet. Alltag frei.'
      },
      closingToast: 'Kreis geöffnet — schadensfrei.'
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
      emphasis: [
        'Tor 3 (Gnosis)', 'Tor 6 (Laden)', 'Tor 9 (Vergessen)',
        'Labor-Tag', 'Sigil-Freitag'
      ],
      ritualFlavor: 'Sigil-Gnosis, 369, Vergessen — laden, dann loslassen.',
      greeting: 'Chaosmagie: Modell-Agnostik, Praxis vor Dogma.',
      calendarNote: 'Tore 3/6/9, Labor-Tag und Sigil-Freitag: jeder Tag kann Labor sein — Ethik hält, Ergebnis-Jagd nicht.',
      recommendedRitual: 'sigil-gnosis',
      practiceHint: 'Heute: Sigil-Gnosis, 369 oder Vergessen — laden, dann loslassen.',
      teachingTip: 'Gnosis ist kurz — lade voll, dann lass los. Ergebnis-Jagd schwächt den Sigil.',
      diaryPrompts: [
        'Welches Modell hast du heute benutzt — und hast du es danach wieder abgelegt?',
        'Was hast du geladen und bewusst vergessen?',
        'Wo war Ergebnis-Jagd stärker als ethische Klarheit?'
      ],
      stepIntro: 'Laden. Dann vergessen. Ethik zuerst.',
      safetyLead: 'Vor Gnosis — Ethik-Check, kein Schaden.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin klar genug für kurze Gnosis — ohne Zwang.' },
        { id: 'purpose', label: 'Zweck: Absicht ethisch; Modell dient, Dogma nicht.' },
        { id: 'boundaries', label: 'Grenzen: Ich beuge keinen fremden Willen — auch nicht „zum Spaß“.' },
        { id: 'noharm', label: 'Kein Schaden: Ergebnis-Magie ohne Angriff auf Personen.' },
        { id: 'closing', label: 'Abschluss: Ich vergesse bewusst und kehre in den Alltag.' }
      ],
      closing: {
        danken: 'Dank dem Modell — und Ablegen desselben. Nichts festhalten.',
        atmen: 'Kurzer Atem. Gnosis zu. Ergebnis nicht jagen.',
        erden: 'Ablenkung erlauben: dehnen, ordnen, trinken. Vergessen üben.',
        siegeln: '„Geladen. Vergessen.“ Ethik bleibt. Alltag.'
      },
      closingToast: 'Vergessen geübt — Ethik gehalten.'
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
      emphasis: [
        'Imbolc', 'Ostara', 'Samhain', 'Yule', 'Rauhnächte Beginn',
        'Rauhnächte Ende', 'Lostage (Probe)', 'Vollmond-Achtung', 'Neumond-Setzen'
      ],
      ritualFlavor: 'Schwelle, Mondarbeit, Lostag-Achtung — still und klar.',
      greeting: 'Offene Esoterik: Praxiswerkzeug, kein Schaukasten.',
      calendarNote: 'Imbolc, Ostara, Samhain, Yule, Rauhnächte, Lostage und Mond-Achtung — sanfte Jahresmarker ohne Orakel-Zwang.',
      recommendedRitual: 'schwelle',
      practiceHint: 'Heute: Schwelle, Mondarbeit oder Lostag-Achtung — still und klar.',
      teachingTip: 'Feldlicht begleitet still — eine klare Intention ersetzt zehn laute Rituale.',
      diaryPrompts: [
        'Was hat das Feldlicht heute leise gezeigt?',
        'Welche Praxis war Werkzeug — und welche wäre Schau gewesen?',
        'Wo brauchst du Ausgleich, bevor du weitermachst?'
      ],
      stepIntro: 'Still üben. Feldlicht begleiten — nicht erzwingen.',
      safetyLead: 'Vor der Schwelle — Klarheit und ethische Absicht.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin ruhig genug für stille Praxis.' },
        { id: 'purpose', label: 'Zweck: Praxiswerkzeug, kein Schaukasten — Absicht ehrlich.' },
        { id: 'boundaries', label: 'Grenzen: Daten bleiben bei mir; kein Geistermessen per Handy.' },
        { id: 'noharm', label: 'Kein Schaden: Ich richte nichts gegen Personen.' },
        { id: 'closing', label: 'Abschluss: Ich halte die Schwelle und kehre bewusst zurück.' }
      ],
      closing: {
        danken: 'Dank dem Feldlicht und dem Atem — still, ohne Schau.',
        atmen: '4 ein, 6 aus. Schwelle, kein Timer-Zwang.',
        erden: 'Füße, Schultern, ein Schluck Wasser. Du bist im Körper.',
        siegeln: '„Schwelle gehalten.“ Daten bei dir. Alltag klar.'
      },
      closingToast: 'Schwelle gehalten — still geübt.'
    }
  ];

  /** Path-specific calendar markers (month/day). Chaos gates rotate by day-of-month heuristics in isEmphasized. */
  const PATH_FESTIVALS = [
    { name: 'Michaelis', m: 9, d: 29, paths: ['nordisch', 'esoterik'] },
    { name: 'Allerheiligen', m: 11, d: 1, paths: ['voodoo', 'santeria', 'wicca'] },
    { name: 'Ahnen-Gedenken', m: 11, d: 2, paths: ['schamanismus', 'nordisch'] },
    { name: 'Fetene Gede (Erinnerung)', m: 11, d: 2, paths: ['voodoo'] },
    { name: 'Hausaltar-Tag', m: 1, d: 6, paths: ['voodoo', 'santeria'] },
    { name: 'Día de las Madres (Haus-Dank)', m: 5, d: 10, paths: ['santeria'] },
    { name: 'Mittsommer-Achtung', m: 6, d: 21, paths: ['nordisch'] },
    { name: 'Merkur-Tag (Achtung)', m: 5, d: 15, paths: ['hermetik'] },
    { name: 'Equinox-Achse', m: 3, d: 20, paths: ['hermetik'] },
    { name: 'Vollmond-Achtung', m: 0, d: 0, paths: ['wicca', 'esoterik'], dynamic: 'fullmoon' },
    { name: 'Neumond-Setzen', m: 0, d: 0, paths: ['wicca', 'esoterik'], dynamic: 'newmoon' },
    { name: 'Tor 3 (Gnosis)', m: 0, d: 3, paths: ['chaosmagie'], monthly: true },
    { name: 'Tor 6 (Laden)', m: 0, d: 6, paths: ['chaosmagie'], monthly: true },
    { name: 'Tor 9 (Vergessen)', m: 0, d: 9, paths: ['chaosmagie'], monthly: true },
    { name: 'Labor-Tag', m: 0, d: 0, paths: ['chaosmagie'], dynamic: 'lab' },
    { name: 'Sigil-Freitag', m: 0, d: 0, paths: ['chaosmagie'], dynamic: 'friday' }
  ];

  function getPath(id) {
    return PATHS.find(p => p.id === id) || PATHS[PATHS.length - 1];
  }

  function moonIllum(date) {
    const Astro = global.UniversumAstro;
    if (Astro && Astro.moonPhase) {
      try {
        const ph = Astro.moonPhase(date);
        if (ph && typeof ph.illumination === 'number') return ph.illumination;
        if (typeof ph === 'number') return ph;
      } catch (_) { /* ignore */ }
    }
    return null;
  }

  function dynamicFestivalsOn(date, pathId) {
    const d = date || new Date();
    const day = d.getDate();
    const dow = d.getDay(); // 0 Sun … 5 Fri
    const out = [];
    PATH_FESTIVALS.forEach(f => {
      if (!f.paths.includes(pathId)) return;
      if (f.monthly && f.d === day) {
        out.push({ name: f.name, m: d.getMonth() + 1, d: day });
        return;
      }
      if (f.dynamic === 'friday' && dow === 5) {
        out.push({ name: f.name, m: d.getMonth() + 1, d: day });
        return;
      }
      if (f.dynamic === 'lab' && (day % 9 === 0 || day === 27)) {
        out.push({ name: f.name, m: d.getMonth() + 1, d: day });
        return;
      }
      if (f.dynamic === 'fullmoon' || f.dynamic === 'newmoon') {
        const ill = moonIllum(d);
        if (ill == null) return;
        if (f.dynamic === 'fullmoon' && ill >= 0.92) {
          out.push({ name: f.name, m: d.getMonth() + 1, d: day });
        }
        if (f.dynamic === 'newmoon' && ill <= 0.08) {
          out.push({ name: f.name, m: d.getMonth() + 1, d: day });
        }
      }
    });
    return out;
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
      if (f.dynamic || f.monthly) return;
      if (f.m === m && f.d === day && f.paths.includes(pathId)) {
        list = list.concat([{ name: f.name, m: f.m, d: f.d }]);
      }
    });
    list = list.concat(dynamicFestivalsOn(d, pathId));
    // de-dupe by name
    const seen = {};
    list = list.filter(f => {
      if (seen[f.name]) return false;
      seen[f.name] = true;
      return true;
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

  function safetyItems(pathId) {
    const path = getPath(pathId);
    return (path.safetyItems && path.safetyItems.length) ? path.safetyItems : null;
  }

  function safetyLead(pathId) {
    const path = getPath(pathId);
    return path.safetyLead || 'Vor der Arbeit — Grenze und Ausgleich.';
  }

  function stepIntro(pathId) {
    const path = getPath(pathId);
    return path.stepIntro || path.haltung || '';
  }

  function closingWords(pathId) {
    const path = getPath(pathId);
    return path.closing || null;
  }

  function closingToast(pathId) {
    const path = getPath(pathId);
    return path.closingToast || 'Schwelle gehalten — gut geübt.';
  }

  /** Next festival from today (inclusive), preferring path-emphasized ones in note. */
  function nextFestival(fromDate, pathId) {
    const Astro = global.UniversumAstro;
    const start = fromDate ? new Date(fromDate.getTime()) : new Date();
    start.setHours(12, 0, 0, 0);
    const all = [];
    if (Astro && Astro.FESTIVALS) {
      Astro.FESTIVALS.forEach(f => all.push(f));
    }
    PATH_FESTIVALS.forEach(f => {
      if (f.dynamic || f.monthly) return;
      if (!all.some(x => x.name === f.name && x.m === f.m && x.d === f.d)) {
        all.push({ name: f.name, m: f.m, d: f.d });
      }
    });
    // Chaos monthly gates: next 3/6/9 day
    if (pathId === 'chaosmagie') {
      const y = start.getFullYear();
      const mo = start.getMonth();
      [3, 6, 9].forEach(gateDay => {
        const names = { 3: 'Tor 3 (Gnosis)', 6: 'Tor 6 (Laden)', 9: 'Tor 9 (Vergessen)' };
        // this month and next
        [0, 1].forEach(add => {
          const dt = new Date(y, mo + add, gateDay, 12, 0, 0, 0);
          if (dt >= new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)) {
            all.push({ name: names[gateDay], m: dt.getMonth() + 1, d: gateDay, _date: dt });
          }
        });
      });
    }
    const y = start.getFullYear();
    const candidates = [];
    [y, y + 1].forEach(year => {
      all.forEach(f => {
        const dt = f._date || new Date(year, f.m - 1, f.d, 12, 0, 0, 0);
        if (f._date && year !== f._date.getFullYear()) return;
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
    nextFestival,
    safetyItems,
    safetyLead,
    stepIntro,
    closingWords,
    closingToast
  };
})(typeof window !== 'undefined' ? window : globalThis);
