/**
 * UNIVERSUM — 8 practice paths (path-aware rituals/sayings/calendar/diary)
 * v3.3: Heute nur Pfad-eigene Rituale · 4–5 Signaturen pro Pfad · Grundlagen sekundär
 */
(function (global) {
  'use strict';

  const PATHS = [
    {
      id: 'schamanismus',
      name: 'Schamanismus',
      symbol: '◎',
      symbolLabel: 'Trommelkreis',
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
      ritualFlavor: 'Trommelpuls · Spurlesen · Rauchbrücke · Knochenlicht · Rückkehrband — nur dieser Pfad.',
      greeting: 'Der Weg der Trommel und der Geisterreise — achtsam, geerdet.',
      calendarNote: 'Rauhnächte, Samhain, Ahnen-Gedenken und Lostage: still, geerdet, ohne Spektakel. Körper zuerst.',
      recommendedRitual: 'trommel-atem',
      practiceHint: 'Heute nur Pfad: Trommelpuls, Spurlesen oder Rauchbrücke — Körper zuerst.',
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
      symbol: 'ᛟ',
      symbolLabel: 'Odal',
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
      ritualFlavor: 'Ringwort · Gastgabe · Thing-Pause · Frith-Grenze · Ahnenstein — nur dieser Pfad.',
      greeting: 'Nordischer Pfad: Ehre, Sippe, Jahreskreis.',
      calendarNote: 'Yule, Ostara, Mabon, Michaelis, Rauhnächte und Ahnen-Gedenken — Knoten der Ehre und des Maßes.',
      recommendedRitual: 'mass-eid',
      practiceHint: 'Heute nur Pfad: Ringwort, Thing-Pause oder Gastgabe — Maß ohne Pathos.',
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
      symbol: '✶',
      symbolLabel: 'Sternkreuz',
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
      ritualFlavor: 'Schwellenwasser · Hofkehren · Weißes Licht · Dienst-Licht · Stiller Altar — nur Hauspraxis.',
      greeting: 'Voodoo-Hauspraxis: Respekt, Reinheit, keine Einweihung hier.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, keine Lwa-Anrufung als Medium. Fetene Gede hier nur als respektvolle Erinnerung — kein Ritus der Einweihung.',
      calendarNote: 'Samhain, Allerheiligen, Fetene Gede (Erinnerung) und Hausaltar-Tag: Respekt und Reinheit im Haus — ausdrücklich keine Initiation und kein Medium.',
      recommendedRitual: 'hausreinigung-voodoo',
      practiceHint: 'Heute nur Pfad: Schwellenwasser, Hofkehren oder Weißes Licht — Respekt, kein Medium.',
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
      symbol: '◆',
      symbolLabel: 'Raute',
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
      ritualFlavor: 'Haus-Aché · Weißes Tuch · Obstgabe · Morgenwasser · Drei Danke — Hauspraxis.',
      greeting: 'Santería-Hauspraxis: Achtung, Reinigung, Dank.',
      disclaimer: 'Nur öffentliche/Hauspraxis. Keine Initiation, kein Orisha-Priestertum, kein Ile hier. Dank und Reinigung im Alltag — Aché ohne Anspruch.',
      calendarNote: 'Ostara, Beltane, Samhain, Allerheiligen und Haus-Dank-Tage: Reinigung und Aché im Haus — klar getrennt von Ile und Einweihung. Anders als Voodoo-Hauspraxis: Fokus Dank/Aché, nicht Lwa/Fetene-Gede-Ton.',
      recommendedRitual: 'reinigung-ache',
      practiceHint: 'Heute nur Pfad: Haus-Aché, Weißes Tuch oder Drei Danke — ohne Initiation.',
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
      symbol: '△',
      symbolLabel: 'Dreieck',
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
      ritualFlavor: 'Operator-Stunde · Vier-Tafel · Solve et Coagula · Siegel · Labor-Notiz — nur dieser Pfad.',
      greeting: 'Hermetischer Weg: Maß, Symbol, innere Alchemie.',
      calendarNote: 'Equinoxe, Solstitien und Merkur-Achtung: Achsen der Proportion — Ostara, Litha, Mabon, Yule.',
      recommendedRitual: 'stunden-halten',
      practiceHint: 'Heute nur Pfad: Operator-Stunde, Vier-Tafel oder Solve et Coagula — Maß.',
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
      symbol: '☽',
      symbolLabel: 'Mondsichel',
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
      ritualFlavor: 'Vier-Wege · Mondkreis klein · Kräuter-Bund · Rede und Segen · Rede-Check — nur dieser Pfad.',
      greeting: 'Wicca & Hexerei: Sabbat, Kreis, Schadensfreiheit.',
      calendarNote: 'Alle acht Sabbats plus Mond-Achtung — der Jahreskreis als Atem, nicht als Pflicht.',
      recommendedRitual: 'elemente',
      practiceHint: 'Heute nur Pfad: Vier-Wege, Mondkreis oder Rede-Check — an niemandem Schaden.',
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
      symbol: '↯',
      symbolLabel: 'Blitz',
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
      ritualFlavor: 'Gnosis-Schnitt · 369-Labor · Modell-Wechsel · Vergiss-Schnitt · Banishing-Punkt — nur dieser Pfad.',
      greeting: 'Chaosmagie: Modell-Agnostik, Praxis vor Dogma.',
      calendarNote: 'Tore 3/6/9, Labor-Tag und Sigil-Freitag: jeder Tag kann Labor sein — Ethik hält, Ergebnis-Jagd nicht.',
      recommendedRitual: 'sigil-gnosis',
      practiceHint: 'Heute nur Pfad: Gnosis-Schnitt, Modell-Wechsel oder Vergiss-Schnitt — laden, loslassen.',
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
      symbol: '✦',
      symbolLabel: 'Stern',
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
      ritualFlavor: 'Feldlicht-Schwelle · Mondfenster · Zahlen-Klarheit · Stille-Feld · Lostag-Stille — nur dieser Pfad.',
      greeting: 'Offene Esoterik: Praxiswerkzeug, kein Schaukasten.',
      calendarNote: 'Imbolc, Ostara, Samhain, Yule, Rauhnächte, Lostage und Mond-Achtung — sanfte Jahresmarker ohne Orakel-Zwang.',
      recommendedRitual: 'schwelle',
      practiceHint: 'Heute nur Pfad: Feldlicht-Schwelle, Mondfenster oder Zahlen-Klarheit — still und klar.',
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

  /**
   * Festivals for a date. opts.pathOnly (default false): only path-relevant
   * (emphasis + path-specific / dynamic gates).
   */
  function festivalsForPath(date, pathId, opts) {
    opts = opts || {};
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
    let out = list.map(f => ({
      ...f,
      emphasized: isEmphasized(f.name, pathId)
    }));
    if (opts.pathOnly) out = out.filter(f => f.emphasized);
    return out;
  }

  /** Split into path-relevant vs other traditions for day detail. */
  function festivalsSplit(date, pathId) {
    const all = festivalsForPath(date, pathId, { pathOnly: false });
    return {
      path: all.filter(f => f.emphasized),
      other: all.filter(f => !f.emphasized)
    };
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

  /** Next festival from today (inclusive). opts.pathOnly: only path-relevant. */
  function nextFestival(fromDate, pathId, opts) {
    opts = opts || {};
    const Astro = global.UniversumAstro;
    const start = fromDate ? new Date(fromDate.getTime()) : new Date();
    start.setHours(12, 0, 0, 0);
    const all = [];
    if (Astro && Astro.FESTIVALS) {
      Astro.FESTIVALS.forEach(f => all.push(f));
    }
    PATH_FESTIVALS.forEach(f => {
      if (f.dynamic || f.monthly) return;
      if (!f.paths.includes(pathId) && opts.pathOnly) return;
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
    let candidates = [];
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
    if (opts.pathOnly) {
      candidates = candidates.filter(c => c.emphasized);
    }
    candidates.sort((a, b) => a.date - b.date || (b.emphasized ? 1 : 0) - (a.emphasized ? 1 : 0));
    if (!candidates.length) return null;
    const firstDay = candidates[0].date.toDateString();
    const same = candidates.filter(c => c.date.toDateString() === firstDay);
    same.sort((a, b) => (b.emphasized ? 1 : 0) - (a.emphasized ? 1 : 0));
    return same[0];
  }


  /** 7-day micro-practice (Mon=1 … Sun=7). Calm, short, path-specific. */
  const PATH_WEEKS = {
    schamanismus: [
      { day: 1, title: 'Füße & Atem', text: 'Füße spüren. Drei ruhige Atemzüge. Körper zuerst.' },
      { day: 2, title: 'Körper-Check', text: 'Hand auf Brust und Bauch. Was meldet der Körper — ohne Drama?' },
      { day: 3, title: 'Trommel-Atem kurz', text: 'Eine Minute rhythmisch atmen (oder klopfen). Danach Wasser.' },
      { day: 4, title: 'Erdung im Alltag', text: 'Bewusst gehen oder sitzen. Mit dem Feld, nicht dagegen.' },
      { day: 5, title: 'Ahnenlicht still', text: 'Ein Satz Dank — Erinnerung, keine Geistermessung.' },
      { day: 6, title: 'Grenze halten', text: 'Wo war Überforderung? Ein klares Nein üben.' },
      { day: 7, title: 'Rückkehr', text: 'Schultern sinken. „Ich bin hier.“ Woche schließen.' }
    ],
    nordisch: [
      { day: 1, title: 'Grenze nennen', text: 'Ein Wort für deine Grenze heute. Ohne Pathos.' },
      { day: 2, title: 'Eid prüfen', text: 'Welchen Eid hältst du — und welchen schuldest du noch?' },
      { day: 3, title: 'Kleine Gabe', text: 'Ordnung, Hilfe oder Stille als Gabe. Maß statt Drama.' },
      { day: 4, title: 'Wort = Tat', text: 'Einen Satz sagen, den du heute halten kannst.' },
      { day: 5, title: 'Sippe / Selbst', text: 'Beides braucht Maß. Wo warst du einseitig?' },
      { day: 6, title: 'Ahnenlicht', text: 'Kurzer Dank an Linie oder Lehrer — ohne Forderung.' },
      { day: 7, title: 'Ring schließen', text: 'Woche ehren. Was bleibt als Haltung?' }
    ],
    voodoo: [
      { day: 1, title: 'Haus ansehen', text: 'Einen Raum ruhig betrachten. Nur Hauspraxis.' },
      { day: 2, title: 'Wasser', text: 'Wasser bereithalten oder Raum feucht abwischen — Respekt.' },
      { day: 3, title: 'Licht', text: 'Kerze oder Lampe: Klarheit im Haus, kein Medium.' },
      { day: 4, title: 'Reinheit kurz', text: 'Eine Ecke ordnen. Reinheit beginnt im Sichtbaren.' },
      { day: 5, title: 'Respekt-Satz', text: '„Nur Hauspraxis, keine Initiation.“ Laut oder still.' },
      { day: 6, title: 'Stille im Haus', text: 'Zwei Minuten Stille. Kein Spektakel.' },
      { day: 7, title: 'Schließen', text: 'Licht aus / Wasser wegräumen. Alltag nimmt Raum.' }
    ],
    santeria: [
      { day: 1, title: 'Hausraum', text: 'Einen Ort im Haus klären. Ile bleibt Tradition — hier nur Haus.' },
      { day: 2, title: 'Wasser & Ordnung', text: 'Frischwasser oder saubere Fläche. Respekt ohne Initiation.' },
      { day: 3, title: 'Licht halten', text: 'Ruhiges Licht. Keine Orisha-Ansprüche hier.' },
      { day: 4, title: 'Reinheit prüfen', text: 'Was stört den Raum? Ein kleines Aufräumen.' },
      { day: 5, title: 'Grenze sprechen', text: '„Hauspraxis. Keine Einweihung hier.“' },
      { day: 6, title: 'Dank ohne Forderung', text: 'Ein stiller Dank — ohne Medium, ohne Besitz.' },
      { day: 7, title: 'Alltag siegeln', text: 'Praxis schließen. Verantwortung im Alltag.' }
    ],
    hermetik: [
      { day: 1, title: 'Stunde notieren', text: 'Welche Planetenstunde ungefähr? Ein Wort dazu (Näherung).' },
      { day: 2, title: 'Entsprechung', text: 'Ein Paar: oben/unten oder innen/außen — kurz beobachten.' },
      { day: 3, title: 'Atem der Klarheit', text: 'Vier ruhige Züge. Geist vor Spektakel.' },
      { day: 4, title: 'Maß der Absicht', text: 'Eine Absicht prüfen: haltbar und ohne Schaden?' },
      { day: 5, title: 'Studium kurz', text: 'Einen Satz lesen oder erinnern. Verdauen, nicht sammeln.' },
      { day: 6, title: 'Arbeit & Ruhe', text: 'Wo war Ungleichgewicht? Eine Korrektur wählen.' },
      { day: 7, title: 'Siegel der Woche', text: 'Was bleibt als Haltung? Notieren, schließen.' }
    ],
    wicca: [
      { day: 1, title: 'Erde', text: 'Boden oder Gegenstand berühren. Element Erde spüren.' },
      { day: 2, title: 'Luft', text: 'Fenster oder Atem. Klarheit ohne Hetze.' },
      { day: 3, title: 'Feuer', text: 'Kerze oder Wärme-Idee. Wille mit Maß.' },
      { day: 4, title: 'Wasser', text: 'Trinken oder Hände waschen. Fließen lassen.' },
      { day: 5, title: 'Kreis-Mini', text: 'Raum markieren (Blick/Hand). „Dieser Raum hält.“' },
      { day: 6, title: 'Jahreskreis-Achtung', text: 'Welches Fest ist nah? Ein Satz Respekt.' },
      { day: 7, title: 'Elemente danken', text: 'Vier Richtungen kurz ehren. Alltag öffnen.' }
    ],
    chaosmagie: [
      { day: 1, title: 'Modell wählen', text: 'Welches Modell dient heute — und darf wieder weg?' },
      { day: 2, title: 'Sigil-Keim', text: 'Eine ethische Absicht skizzieren (noch nicht laden).' },
      { day: 3, title: 'Gnosis-Mini', text: '30 Sekunden Fokus oder Atem — dann lockern.' },
      { day: 4, title: 'Ergebnis-Jagd stoppen', text: 'Bewusst ablenken. Nicht nachchecken.' },
      { day: 5, title: 'Ethik-Check', text: 'Hält die Absicht ohne Schaden an Personen?' },
      { day: 6, title: 'Vergessen üben', text: 'Absicht ablegen. Alltag vor Modell.' },
      { day: 7, title: 'Woche reset', text: 'Modelle stapeln? Eins behalten, Rest streichen.' }
    ],
    esoterik: [
      { day: 1, title: 'Schwelle', text: 'Ankommen. Daten bleiben bei dir. Ein Handy misst keine Geister.' },
      { day: 2, title: 'Atem 4/6', text: 'Kurz 4 ein — 6 aus. Feldlicht begleiten.' },
      { day: 3, title: 'Intention', text: 'Ein klarer Satz. Praxiswerkzeug, kein Schaukasten.' },
      { day: 4, title: 'Ausgleich', text: 'Was gibst du dem Tag zurück? Ruhe oder Ordnung.' },
      { day: 5, title: 'Mond-Achtung', text: 'Phase wahrnehmen (Näherung). Ohne Astro-Anspruch.' },
      { day: 6, title: 'Notiz lokal', text: 'Einen Satz ins Tagebuch oder Notizen — lokal.' },
      { day: 7, title: 'Durchgehen', text: 'Schwelle halten und öffnen. Woche schließen.' }
    ]
  };

  function isoWeekKey(d) {
    const x = d ? new Date(d.getTime()) : new Date();
    // ISO week: Thursday-based
    const t = new Date(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()));
    const dayNum = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
    return t.getUTCFullYear() + '-W' + String(weekNo).padStart(2, '0');
  }

  /** Monday=1 … Sunday=7 (local) */
  function weekdayMon1(d) {
    const x = d || new Date();
    const wd = x.getDay(); // 0=Sun
    return wd === 0 ? 7 : wd;
  }

  function getPathWeek(pathId) {
    const days = PATH_WEEKS[pathId] || PATH_WEEKS.esoterik;
    return days.slice();
  }

  function getTodayWeekStep(pathId, date) {
    const day = weekdayMon1(date);
    const days = getPathWeek(pathId);
    return days.find(d => d.day === day) || days[0];
  }

  /** Mini toolkits per path (not full ritual duplicates). */
  const PATH_WERKZEUG = {
    nordisch: { id: 'eid-gabe', title: 'Eid / Gabe', kind: 'note', field: 'eidGabe', placeholder: 'Eid oder Gabe heute…' },
    chaosmagie: { id: 'sigil-labor', title: 'Sigil-Labor', kind: 'shortcut', target: 'sigil' },
    hermetik: { id: 'stunden-notiz', title: 'Stunden-Notiz', kind: 'note', field: 'stundenNotiz', placeholder: 'Stunde / Beobachtung…' },
    wicca: { id: 'element-check', title: 'Element-Check', kind: 'checks', fields: [
      { id: 'erde', label: 'Erde' }, { id: 'luft', label: 'Luft' },
      { id: 'feuer', label: 'Feuer' }, { id: 'wasser', label: 'Wasser' }
    ]},
    schamanismus: { id: 'koerper-check', title: 'Körper-Check', kind: 'checks', fields: [
      { id: 'atem', label: 'Atem' }, { id: 'fuesse', label: 'Füße' },
      { id: 'schultern', label: 'Schultern' }, { id: 'ruhe', label: 'Ruhe' }
    ]},
    voodoo: { id: 'haus-reinheit', title: 'Haus-Reinheit', kind: 'checks', houseOnly: true, fields: [
      { id: 'raum', label: 'Raum' }, { id: 'wasser', label: 'Wasser' }, { id: 'licht', label: 'Licht' }
    ]},
    santeria: { id: 'haus-reinheit', title: 'Haus-Reinheit', kind: 'checks', houseOnly: true, fields: [
      { id: 'raum', label: 'Raum' }, { id: 'wasser', label: 'Wasser' }, { id: 'licht', label: 'Licht' }
    ]},
    esoterik: { id: 'schwellen-notiz', title: 'Schwellen-Notiz', kind: 'note', field: 'schwellenNotiz', placeholder: 'Schwelle / Klarheit…' }
  };

  function getPathWerkzeug(pathId) {
    return PATH_WERKZEUG[pathId] || PATH_WERKZEUG.esoterik;
  }

  function needsInitiationGate(pathId) {
    return pathId === 'voodoo' || pathId === 'santeria';
  }


  /* ——— Seed helper (stable by date + path) ——— */
  function seedIndex(dateStr, pathId, salt, len) {
    const s = String(dateStr || '') + '|' + String(pathId || '') + '|' + String(salt || '');
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h) % Math.max(1, len);
  }

  /**
   * Path-specific daily invitations (ritual OR Haltung). Seeded by date+path.
   * kind: 'ritual' | 'haltung'
   */
  const DAILY_TIPS = {
    /* Heute: nur path-own Rituale (nie Grundlagen/erdung als Primär). */
    schamanismus: [
      { kind: 'ritual', title: 'Trommelpuls', text: '≈ 11 Min · Körper zuerst — Puls vor Spektakel.', ritualId: 'trommel-atem', cta: 'Trommelpuls starten' },
      { kind: 'ritual', title: 'Spurlesen', text: '≈ 11 Min · Drei Spuren achten — eine Deutung reicht.', ritualId: 'spurlesen', cta: 'Spurlesen starten' },
      { kind: 'ritual', title: 'Knochenlicht', text: '≈ 11 Min · Ahnen ehren — ohne Geister zu messen.', ritualId: 'ahnenlicht-schaman', cta: 'Knochenlicht starten' },
      { kind: 'ritual', title: 'Rauchbrücke', text: '≈ 11 Min · Raum klären mit Atem oder Rauch — Symbol.', ritualId: 'rauchbruecke', cta: 'Rauchbrücke starten' },
      { kind: 'ritual', title: 'Rückkehrband', text: '≈ 3 Min · Innere Arbeit endet mit Rückkehr in den Körper.', ritualId: 'rueckkehrband', cta: 'Rückkehrband' }
    ],
    nordisch: [
      { kind: 'ritual', title: 'Ringwort', text: '≈ 11 Min · Ein Wort, das du hältst — Maß ohne Pathos.', ritualId: 'mass-eid', cta: 'Ringwort starten' },
      { kind: 'ritual', title: 'Thing-Pause', text: '≈ 11 Min · Schweigen vor dem Wort — wägen wie im Thing.', ritualId: 'thing-pause', cta: 'Thing-Pause starten' },
      { kind: 'ritual', title: 'Gastgabe', text: '≈ 11 Min · Geben ohne Forderung — Ausgleich ehren.', ritualId: 'gabe', cta: 'Gastgabe starten' },
      { kind: 'ritual', title: 'Frith-Grenze', text: '≈ 11 Min · Friedensraum halten — Grenze ohne Angriff.', ritualId: 'frith-grenze', cta: 'Frith-Grenze' },
      { kind: 'ritual', title: 'Ahnenstein', text: '≈ 3 Min · Stein als Gedächtnis — tragen, nicht beschwören.', ritualId: 'ahnenstein', cta: 'Ahnenstein' }
    ],
    voodoo: [
      { kind: 'ritual', title: 'Schwellenwasser', text: '≈ 11 Min · Hauspraxis: Schwelle, Wasser, Licht — kein Medium.', ritualId: 'hausreinigung-voodoo', cta: 'Schwellenwasser starten' },
      { kind: 'ritual', title: 'Hofkehren', text: '≈ 11 Min · Fegen als Praxis — Bewegung klärt den Hof.', ritualId: 'hofkehren', cta: 'Hofkehren starten' },
      { kind: 'ritual', title: 'Weißes Licht', text: '≈ 11 Min · Licht und Wasser — danken, schließen.', ritualId: 'licht-wasser', cta: 'Weißes Licht starten' },
      { kind: 'ritual', title: 'Dienst-Licht', text: '≈ 21 Min · Licht als Dienst am Haus — unter Aufsicht.', ritualId: 'dienst-licht', cta: 'Dienst-Licht' },
      { kind: 'ritual', title: 'Stiller Altar', text: '≈ 3 Min · Hausecke prüfen — Ordnung, keine Anrufung.', ritualId: 'stiller-altar', cta: 'Stiller Altar' }
    ],
    santeria: [
      { kind: 'ritual', title: 'Drei Danke', text: '≈ 3 Min · Dank vor Forderung — kurz und geschlossen.', ritualId: 'dank-ache', cta: 'Drei Danke starten' },
      { kind: 'ritual', title: 'Haus-Aché', text: '≈ 11 Min · Reinheit und Dank — ohne Ile-Anspruch.', ritualId: 'reinigung-ache', cta: 'Haus-Aché starten' },
      { kind: 'ritual', title: 'Weißes Tuch', text: '≈ 11 Min · Klare Fläche legen — Reinheit sichtbar.', ritualId: 'weisses-tuch', cta: 'Weißes Tuch starten' },
      { kind: 'ritual', title: 'Obstgabe Haus', text: '≈ 11 Min · Obst oder Wasser als Dankgabe — teilen.', ritualId: 'obstgabe-haus', cta: 'Obstgabe starten' },
      { kind: 'ritual', title: 'Morgenwasser', text: '≈ 3 Min · Hände oder Gesicht — Aché als Frische.', ritualId: 'morgenwasser', cta: 'Morgenwasser' }
    ],
    hermetik: [
      { kind: 'ritual', title: 'Operator-Stunde', text: '≈ 11 Min · Stunde halten — Kontemplation vor Operation.', ritualId: 'stunden-halten', cta: 'Operator-Stunde' },
      { kind: 'ritual', title: 'Vier-Tafel', text: '≈ 11 Min · Vier Entsprechungen ordnen — Maß statt Orakel.', ritualId: 'vier-tafel', cta: 'Vier-Tafel starten' },
      { kind: 'ritual', title: 'Solve et Coagula', text: '≈ 11 Min · Lösen und binden im Atem — inneres Labor.', ritualId: 'solve-coagula', cta: 'Solve et Coagula' },
      { kind: 'ritual', title: 'Siegel der Proportion', text: '≈ 11 Min · Werkzeug weihen — klar, begrenzt.', ritualId: 'weihe-hermetik', cta: 'Siegel starten' },
      { kind: 'ritual', title: 'Labor-Notiz', text: '≈ 3 Min · Eine Beobachtung — ohne Deutung.', ritualId: 'labor-notiz', cta: 'Labor-Notiz' }
    ],
    wicca: [
      { kind: 'ritual', title: 'Vier-Wege', text: '≈ 11 Min · Erde, Luft, Feuer, Wasser — Rede zuerst.', ritualId: 'elemente', cta: 'Vier-Wege starten' },
      { kind: 'ritual', title: 'Mondkreis klein', text: '≈ 11 Min · Phase achten, Kreis ziehen und öffnen.', ritualId: 'mondkreis-klein', cta: 'Mondkreis starten' },
      { kind: 'ritual', title: 'Rede und Segen', text: '≈ 11 Min · Segen mit Ausgleich — nie gegen jemanden.', ritualId: 'sabbat-segen', cta: 'Segen starten' },
      { kind: 'ritual', title: 'Kräuter-Bund', text: '≈ 11 Min · Symbol binden — kein Heilversprechen.', ritualId: 'kraeuter-bund', cta: 'Kräuter-Bund' },
      { kind: 'ritual', title: 'Rede-Check', text: '≈ 3 Min · Schadet es jemandem? Kurz und ehrlich.', ritualId: 'rede-check', cta: 'Rede-Check' }
    ],
    chaosmagie: [
      { kind: 'ritual', title: 'Vergiss-Schnitt', text: '≈ 3 Min · Was geladen ist, darf gehen.', ritualId: 'vergessen', cta: 'Vergiss-Schnitt' },
      { kind: 'ritual', title: 'Gnosis-Schnitt', text: '≈ 11 Min · Laden, schneiden, vergessen — Ethik zuerst.', ritualId: 'sigil-gnosis', cta: 'Gnosis-Schnitt' },
      { kind: 'ritual', title: 'Modell-Wechsel', text: '≈ 11 Min · Modell wählen und wieder ablegen.', ritualId: 'modell-wechsel', cta: 'Modell-Wechsel' },
      { kind: 'ritual', title: '369-Labor', text: '≈ 11 Min · Ethischer Satz · 3 / 6 / 9 — dann loslassen.', ritualId: '369', cta: '369-Labor' },
      { kind: 'ritual', title: 'Banishing-Punkt', text: '≈ 3 Min · Mentaler Reset — Raum klären ohne Theater.', ritualId: 'banishing-punkt', cta: 'Banishing-Punkt' }
    ],
    esoterik: [
      { kind: 'ritual', title: 'Lostag-Stille', text: '≈ 3 Min · Achtung ohne Orakel-Zwang.', ritualId: 'lostag-achtung', cta: 'Lostag-Stille' },
      { kind: 'ritual', title: 'Feldlicht-Schwelle', text: '≈ 11 Min · Eine klare Schwelle — Praxiswerkzeug.', ritualId: 'schwelle', cta: 'Schwelle starten' },
      { kind: 'ritual', title: 'Mondfenster', text: '≈ 11 Min · Setzen oder lösen — mit Grenze und Ausgleich.', ritualId: 'mondarbeit', cta: 'Mondfenster starten' },
      { kind: 'ritual', title: 'Zahlen-Klarheit', text: '≈ 11 Min · Eine Zahl als Fokus — kein Schicksalsglaube.', ritualId: 'zahlen-klarheit', cta: 'Zahlen-Klarheit' },
      { kind: 'ritual', title: 'Stille-Feld', text: '≈ 21 Min · Längere Stille — üben ohne zu messen.', ritualId: 'stille-feld', cta: 'Stille-Feld' }
    ]
  };

  function dayKeyLocal(d) {
    const x = d || new Date();
    return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  }

  function getDailyTip(pathId, date) {
    const pid = pathId || 'esoterik';
    const list = DAILY_TIPS[pid] || DAILY_TIPS.esoterik;
    const idx = seedIndex(dayKeyLocal(date), pid, 'heute-tip', list.length);
    const tip = list[idx];
    const path = getPath(pid);
    return Object.assign({}, tip, {
      pathId: pid,
      pathName: path.name,
      symbol: path.symbol || '✦',
      dateKey: dayKeyLocal(date)
    });
  }

  /** Hauspraxis-Korrespondenzen — keine Heilversprechen, keine medizinischen Claims. */
  const CORRESPONDENCES = {
    schamanismus: {
      herbs: ['Beifuß (Räucherung)', 'Wacholder (Raum)', 'Birke (Neubeginn)'],
      stones: ['Obsidian (Schutz-Symbol)', 'Rauchquarz (Klarheit)', 'Hämatit (Erdung-Symbol)'],
      colors: ['Erdbraun', 'Waldgrün', 'Knochenweiß'],
      elements: ['Erde (Stand)', 'Luft (Atem)', 'Feuer (Herd)', 'Wasser (Fluss)'],
      note: 'Hauspraxis und Symbolik — kein medizinischer Rat, kein Heilversprechen.'
    },
    nordisch: {
      herbs: ['Eichenblatt (Maß)', 'Wermut (Grenze)', 'Thymian (Haus)'],
      stones: ['Bernstein (Wärme-Symbol)', 'Flint (Funke)', 'Granit (Stand)'],
      colors: ['Nordblau', 'Eisengrau', 'Honiggold'],
      elements: ['Erde (Ring)', 'Eis (Klarheit)', 'Feuer (Herd)', 'Luft (Wort)'],
      note: 'Symbole für Haltung und Haus — keine medizinischen Aussagen.'
    },
    voodoo: {
      herbs: ['Basilikum (Haus)', 'Lorbeer (Klarheit)', 'Minze (Frisch)'],
      stones: ['Muschel (Wasser-Symbol)', 'Quarz (Licht)', 'Lava (Boden)'],
      colors: ['Weiß (Reinheit-Symbol)', 'Blau (Ruhe)', 'Rot (Kraft-Symbol — mit Maß)'],
      elements: ['Wasser (Schwelle)', 'Erde (Hof)', 'Feuer (Licht)', 'Luft (Atem)'],
      note: 'Nur öffentliche Hauspraxis. Keine Initiation, keine medizinischen Claims.'
    },
    santeria: {
      herbs: ['Rosmarin (Haus)', 'Orange (Dank)', 'Lavendel (Ruhe-Symbol)'],
      stones: ['Koralle (Meer-Symbol)', 'Citrin (Licht)', 'Mondstein (Zyklus-Symbol)'],
      colors: ['Weiß', 'Gelb (Dank)', 'Grün (Wachstum-Symbol)'],
      elements: ['Wasser (Reinheit-Symbol)', 'Erde (Haus)', 'Feuer (Kerze)', 'Luft (Gebet-Symbol)'],
      note: 'Hauspraxis ohne Ile-Anspruch. Symbolik, kein Heilversprechen.'
    },
    hermetik: {
      herbs: ['Salbei (Klarheit-Symbol)', 'Rosmarin (Gedächtnis-Symbol)', 'Myrte (Maß)'],
      stones: ['Lapis (Denken-Symbol)', 'Bergkristall (Fokus)', 'Zinnober-Ton (Labor-Symbol)'],
      colors: ['Königsblau', 'Gold', 'Schwarz (Grenze)'],
      elements: ['Feuer (Schwefel-Symbol)', 'Wasser (Lösung)', 'Luft (Merkur-Symbol)', 'Erde (Salz-Symbol)'],
      note: 'Labor- und Haltungssymbole — keine alchemistischen Heilsversprechen.'
    },
    wicca: {
      herbs: ['Lavendel (Ruhe)', 'Mugwort / Beifuß (Mond-Symbol)', 'Rosmarin (Schutz-Symbol)'],
      stones: ['Mondstein', 'Amethyst (Ruhe-Symbol)', 'Moosachat (Erde)'],
      colors: ['Silber', 'Grün', 'Violett'],
      elements: ['Erde', 'Luft', 'Feuer', 'Wasser'],
      note: 'Elemente und Hausaltar-Symbolik. Kein medizinischer Rat. An niemandem Schaden.'
    },
    chaosmagie: {
      herbs: ['Kaffee (Wachheit-Symbol)', 'Pfeffer (Scharf / Fokus)', 'Minze (Reset)'],
      stones: ['Obsidian (Schnitt)', 'Pyrit (Funke-Symbol)', 'Klarer Quarz (Leinwand)'],
      colors: ['Schwarz', 'Neon-Akzent (Labor)', 'Grau (Neutral)'],
      elements: ['Beliebig (Paradigma)', 'Leer (Reset)', 'Funke (Gnosis)', 'Alltag (Anker)'],
      note: 'Werkzeug-Metaphern für Gnosis und Labor — keine medizinischen Claims.'
    },
    esoterik: {
      herbs: ['Lavendel', 'Kamille (Ruhe-Symbol)', 'Rosmarin'],
      stones: ['Rosenquarz (Sanft-Symbol)', 'Amethyst', 'Bergkristall'],
      colors: ['Violett', 'Silber', 'Nachtblau'],
      elements: ['Erde (Stand)', 'Luft (Atem)', 'Feuer (Licht)', 'Wasser (Ruhe)'],
      note: 'Sanfte Hauspraxis-Symbolik. Kein Heilversprechen, kein Medium.'
    }
  };

  function getCorrespondences(pathId) {
    const c = CORRESPONDENCES[pathId] || CORRESPONDENCES.esoterik;
    return Object.assign({}, c);
  }

  /** Mondfenster: actionable "gut für …" by coarse phase × path */
  function moonBucket(moonName) {
    const n = String(moonName || '');
    if (n === 'Neumond') return 'neu';
    if (n === 'Vollmond') return 'voll';
    if (n.indexOf('Zunehmend') === 0) return 'zunehmend';
    if (n.indexOf('Abnehmend') === 0) return 'abnehmend';
    return 'zunehmend';
  }

  const MOND_FENSTER = {
    schamanismus: {
      neu: 'Gut für: Keim setzen im Körper — kurze Erdung, keine weite Reise.',
      zunehmend: 'Gut für: Atem und Trommel-Rhythmus aufbauen — Maß halten.',
      voll: 'Gut für: Danken und Ahnenlicht — ohne Geister zu fordern.',
      abnehmend: 'Gut für: Loslassen von Unruhe, Körper zurückholen, schließen.'
    },
    nordisch: {
      neu: 'Gut für: einen haltbaren Eid oder eine kleine Gabe formulieren.',
      zunehmend: 'Gut für: Wort und Tat im Ring prüfen — Maß, nicht Pathos.',
      voll: 'Gut für: Ehre zeigen, Sippe/Selbst achten, Kreis klar halten.',
      abnehmend: 'Gut für: unhaltbare Vorsätze lösen, Grenze neu setzen.'
    },
    voodoo: {
      neu: 'Gut für: Haus reinigen, Absicht klein und respektvoll setzen.',
      zunehmend: 'Gut für: Licht/Wasser im Haus — Ordnung ohne Medium.',
      voll: 'Gut für: danken und Raum ehren — öffentliche Hauspraxis.',
      abnehmend: 'Gut für: Altes aus dem Haus bringen, Schwelle schließen.'
    },
    santeria: {
      neu: 'Gut für: Reinheit und Dank vorbereiten — ohne Initiation.',
      zunehmend: 'Gut für: Haus-Aché im Alltag (Ordnung, Wasser, Licht).',
      voll: 'Gut für: Dank aussprechen und den Alltag segnen (Hauspraxis).',
      abnehmend: 'Gut für: Reinigung abschließen, was nicht dient entlassen.'
    },
    hermetik: {
      neu: 'Gut für: eine Frage präzise stellen und die Stunde notieren.',
      zunehmend: 'Gut für: Studium und Stunden halten — Beobachten mit Maß.',
      voll: 'Gut für: Klarheit prüfen, Weihe zeitlich begrenzen.',
      abnehmend: 'Gut für: Labor aufräumen, Hypothesen verwerfen, siegeln.'
    },
    wicca: {
      neu: 'Gut für: Absicht im Kreis setzen — an niemandem Schaden.',
      zunehmend: 'Gut für: Elemente stärken, Kräuter/Steine als Symbol wählen.',
      voll: 'Gut für: Segen, Dank, Lichtarbeit — Kreis bewusst schließen.',
      abnehmend: 'Gut für: Loslassen, Reinigen, was nicht dient entlassen.'
    },
    chaosmagie: {
      neu: 'Gut für: Sigil laden und Absicht knapper formulieren.',
      zunehmend: 'Gut für: Gnosis-Übungen, 369, Labor-Notizen.',
      voll: 'Gut für: Ergebnis beobachten — ohne Identitätsdrama.',
      abnehmend: 'Gut für: Vergessen, Reset, unbrauchbare Sigils entsorgen.'
    },
    esoterik: {
      neu: 'Gut für: Intention setzen, Schwelle markieren, still starten.',
      zunehmend: 'Gut für: Klarheit üben, Mondarbeit vorbereiten.',
      voll: 'Gut für: Danken, Licht halten, Tagebuch-Satz.',
      abnehmend: 'Gut für: Loslassen, Lostage achten, Ruhe gönnen.'
    }
  };

  function getMondFenster(pathId, moonName) {
    const bucket = moonBucket(moonName);
    const block = MOND_FENSTER[pathId] || MOND_FENSTER.esoterik;
    return {
      bucket: bucket,
      moonName: moonName || '—',
      text: block[bucket] || block.zunehmend,
      label: bucket === 'neu' ? 'Neumond-Fenster'
        : bucket === 'voll' ? 'Vollmond-Fenster'
        : bucket === 'zunehmend' ? 'Zunehmendes Fenster'
        : 'Abnehmendes Fenster'
    };
  }


  global.UniversumPaths = {
    PATHS,
    PATH_FESTIVALS,
    PATH_WEEKS,
    PATH_WERKZEUG,
    DAILY_TIPS,
    CORRESPONDENCES,
    MOND_FENSTER,
    getPath,
    isEmphasized,
    festivalsForPath,
    festivalsSplit,
    randomSaying,
    diaryPrompts,
    nextFestival,
    safetyItems,
    safetyLead,
    stepIntro,
    closingWords,
    closingToast,
    getPathWeek,
    getTodayWeekStep,
    weekdayMon1,
    isoWeekKey,
    getPathWerkzeug,
    needsInitiationGate,
    seedIndex,
    getDailyTip,
    getCorrespondences,
    moonBucket,
    getMondFenster
  };
})(typeof window !== 'undefined' ? window : globalThis);
