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
        { id: 'boundaries', label: 'Grenzen: Ich ehre Orisha-Tradition, ohne Priestertum hier zu praktizieren.' },
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
      haltung: 'Kreis halten — Schutz, Reinigung, Anziehen, Loslassen ohne Schaden.',
      saying: 'An es schadet niemandem — tue, was du willst.',
      sayings: [
        'An es schadet niemandem — tue, was du willst.',
        'Der Kreis hält, weil du ihn hältst.',
        'Sabbat ist Rhythmus, nicht Pflicht.',
        'Schutz zuerst, dann Reinigung, dann Anziehen — Loslassen schließt.',
        'Elemente erinnern: Körper, Atem, Feuer der Absicht, Wasser der Emotion.'
      ],
      emphasis: [
        'Imbolc', 'Ostara', 'Beltane', 'Litha', 'Lughnasadh', 'Mabon', 'Samhain', 'Yule',
        'Vollmond-Achtung', 'Neumond-Setzen'
      ],
      ritualFlavor: 'Vier-Wege · Mondkreis · Schutz/Reinigung · Anziehen/Loslassen · Rede-Check — nur dieser Pfad.',
      greeting: 'Wicca-Hexerei: Kreis, Sabbat-Atem, kurze Werke ohne Schaden.',
      calendarNote: 'Jahresrad als Praxis — Sabbats und Mond als Arbeitsfenster, nicht als Pflichtkalender.',
      recommendedRitual: 'elemente',
      practiceHint: 'Heute: ein kurzes Werk — Schutz, Reinigung, Anziehen oder Loslassen — an niemandem Schaden.',
      teachingTip: 'Hexerei hier heißt Hauspraxis im Kreis: klare Absicht, Grenze, Gabe, Schweigen — kein Spektakel.',
      diaryPrompts: [
        'Welches Werk war es heute: Schutz, Reinigung, Anziehen oder Loslassen?',
        'Hat deine Absicht jemandem geschadet — auch subtil?',
        'Welches Element fehlte: Erde, Luft, Feuer, Wasser?',
        'Welcher Sabbat-Ton (auch außerhalb des Datums) trug dich?'
      ],
      stepIntro: 'An es schadet niemandem. Kreis halten. Werk klein halten.',
      safetyLead: 'Vor dem Kreis — Rede, Grenze und Ausgleich prüfen.',
      safetyItems: [
        { id: 'body', label: 'Körper: Ich bin stabil genug, den Kreis ruhig zu halten.' },
        { id: 'purpose', label: 'Zweck: Meine Absicht schadet niemandem — auch nicht subtil.' },
        { id: 'boundaries', label: 'Grenzen: Ich halte den Kreis und respektiere fremde Willen.' },
        { id: 'noharm', label: 'Kein Schaden: An es harm none — keine Arbeit gegen Personen.' },
        { id: 'closing', label: 'Abschluss: Ich öffne den Kreis bewusst, danke und kehre in den Alltag.' }
      ],
      closing: {
        danken: 'Dank den Elementen, dem Mond und dem Kreis — Gabe ohne Pflichtzwang.',
        atmen: 'Atem wie Sabbat-Rhythmus: kommen, halten, gehen lassen.',
        erden: 'Erde unter den Füßen. Was gebunden war, darf jetzt schweigen.',
        siegeln: '„Der Kreis ist geöffnet.“ Niemandem geschadet. Alltag frei.'
      },
      closingToast: 'Kreis geöffnet — Werk ethisch geschlossen.'
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
        erden: 'Ablenkung erlauben: dehnen, ordnen, trinken. Vergessen als Praxis.',
        siegeln: '„Geladen. Vergessen.“ Ethik bleibt. Alltag.'
      },
      closingToast: 'Vergessen als Praxis — Ethik gehalten.'
    },
    {
      id: 'esoterik',
      name: 'Esoterik',
      symbol: '✦',
      symbolLabel: 'Stern',
      accent: '#8b6fd0',
      accentSoft: 'rgba(139, 111, 208, 0.22)',
      accentDeep: '#6a4fb0',
      haltung: 'Stille Praxis — Daten bleiben bei dir.',
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
      stepIntro: 'Stille Praxis. Feldlicht begleiten — nicht erzwingen.',
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
      closingToast: 'Schwelle gehalten — stille Praxis.'
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
    return path.closingToast || 'Schwelle gehalten — gute Praxis.';
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
      { day: 6, title: 'Grenze halten', text: 'Wo war Überforderung? Ein klares Nein als Praxis.' },
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
      { day: 1, title: 'Schutz', text: 'Kleine Grenze: Hand am Türrahmen oder Blickkreis. „Hier halte ich.“' },
      { day: 2, title: 'Reinigung', text: 'Wasser an den Händen oder frische Luft — was nicht dient, darf gehen.' },
      { day: 3, title: 'Anziehen', text: 'Eine ethische Gabe/Absicht setzen — klein, gegen niemanden.' },
      { day: 4, title: 'Loslassen', text: 'Einen Satz entlassen. Ergebnis nicht jagen. Schweigen als Praxis.' },
      { day: 5, title: 'Kreis-Mini', text: 'Raum markieren. Vier Elemente kurz grüßen. Kreis halten.' },
      { day: 6, title: 'Jahresrad-Atem', text: 'Welches Fest-Ton ist nah? Ein Satz Praxis — nicht nur Datum.' },
      { day: 7, title: 'Schließen', text: 'Elemente danken. Kreis öffnen. Alltag frei.' }
    ],
    chaosmagie: [
      { day: 1, title: 'Modell wählen', text: 'Welches Modell dient heute — und darf wieder weg?' },
      { day: 2, title: 'Sigil-Keim', text: 'Eine ethische Absicht skizzieren (noch nicht laden).' },
      { day: 3, title: 'Gnosis-Mini', text: '30 Sekunden Fokus oder Atem — dann lockern.' },
      { day: 4, title: 'Ergebnis-Jagd stoppen', text: 'Bewusst ablenken. Nicht nachchecken.' },
      { day: 5, title: 'Ethik-Check', text: 'Hält die Absicht ohne Schaden an Personen?' },
      { day: 6, title: 'Vergessen als Praxis', text: 'Absicht ablegen. Alltag vor Modell.' },
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
      { kind: 'ritual', title: 'Vier-Wege', text: '≈ 11 Min · Erde, Luft, Feuer, Wasser — Schutz und Rede zuerst.', ritualId: 'elemente', cta: 'Vier-Wege starten' },
      { kind: 'ritual', title: 'Mondkreis', text: '≈ 11 Min · Phase als Arbeitsfenster — setzen, klären oder lösen.', ritualId: 'mondkreis-klein', cta: 'Mondkreis starten' },
      { kind: 'ritual', title: 'Schutz & Reinigung', text: '≈ 11 Min · Grenze halten, Raum klären — ohne Angriff.', ritualId: 'schutz-reinigung', cta: 'Schutz starten' },
      { kind: 'ritual', title: 'Anziehen / Loslassen', text: '≈ 11 Min · Ethisch anziehen oder bewusst entlassen.', ritualId: 'anziehen-loslassen', cta: 'Werk starten' },
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
      { kind: 'ritual', title: 'Stille-Feld', text: '≈ 21 Min · Längere Stille — Praxis ohne zu messen.', ritualId: 'stille-feld', cta: 'Stille-Feld' }
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

  /** Hauspraxis-Korrespondenzen — Lexikon für Magier.
   * Kategorien: herbs, kitchen, stones, colors, tools, links (Bezüge/Hilfsmittel).
   * Jeder Eintrag: { name, description } — Symbolik/Hauspraxis, kein Heilversprechen,
   * keine Anleitung zu Schaden oder illegalem Handeln.
   */
  const CORRESPONDENCES = {
    schamanismus: {
      herbs: [
        { name: "Beifuß", description: "Klassisches Räucher-Symbol für Schwelle und Reise — Raum klären, ohne Geister zu fordern." },
        { name: "Wacholder", description: "Harziger Duft als Raum- und Grenzzeichen. Hauspraxis: frische Luft und Maß statt Spektakel." },
        { name: "Birke", description: "Neubeginn und weiches Licht nach der Dunkelheit — Blatt oder Zweig als Gabe an den Alltag." },
        { name: "Weide", description: "Biegsamkeit und Fluss: was weicht, bricht nicht. Symbol für Loslassen ohne Drama." },
        { name: "Fichte", description: "Harz und Nadel als Wald-Anker — Stand spüren, Körper zuerst, bevor die Reise beginnt." },
        { name: "Salbei", description: "Klarheit im Raum als Haltung — Duft und Absicht, kein Reinigungsversprechen am Körper." },
        { name: "Tabak (symbolisch)", description: "Gabe und Respekt in manchen Linien — hier nur als Symbol, nie als Rauchzwang oder Initiation." },
      ],
      kitchen: [
        { name: "Salz", description: "Küche / Hausmittel: Kreis und Grenze am Herd — Prise als Merkzeichen, kein Reinigungsversprechen." },
        { name: "Honig", description: "Küche: süße Gabe an den Alltag — teilen statt fordern, Symbol für Wärme ohne Spektakel." },
        { name: "Öl", description: "Küche / Hausmittel: Salbung als Haltung — Tropfen am Blickfang, nicht als Heilsalbe." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit am Tisch — Fokus-Symbol, kein Rezept und kein Heilversprechen." },
        { name: "Zucker", description: "Küche: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Nelke", description: "Küche / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden." },
        { name: "Zimt", description: "Küche: Willkommen und Wärme — Duft-Symbol, kein Spektakel." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Obsidian", description: "Blickfang für Schutz-Grenze — dunkler Schnitt als Symbol, keine Kristallheilung." },
        { name: "Rauchquarz", description: "Altarstein für Klarheit im Raum — Haltung und Atem, kein Messversprechen." },
        { name: "Hämatit", description: "Erdungs-Blickfang: schwer und nah am Boden — Körper zuerst, bevor die Reise beginnt." },
        { name: "Flint", description: "Funke und Feuerstein-Symbol — Herd und Stand, ohne Spektakel." },
        { name: "Holzperle", description: "Wald-Anker aus dem Alltag — Gabe, die man berühren kann, kein Amulettzwang." },
        { name: "Knochenweiß-Stein", description: "Schlichtes Merkzeichen für Ahnenachtung — Symbolik, keine Geisterforderung." },
      ],
      colors: [
        { name: "Erdbraun", description: "Altarfarbe / Tuch: Stand und Boden — Alltag ehren statt Pathos." },
        { name: "Waldgrün", description: "Altarfarbe: Wachstum mit Maß — Blickfang für den Kreis, kein Heilversprechen." },
        { name: "Knochenweiß", description: "Altarfarbe / Kerze: Schlichtheit und Gabe — rein als Symbol." },
        { name: "Rauchgrau", description: "Altarfarbe: Schwelle und Atem — Raum klären als Haltung." },
        { name: "Herbstrot", description: "Kerze oder Tuch: Wärme am Herd — teilen, nicht greifen." },
        { name: "Nachtblau", description: "Altarfarbe für stille Reise — nur geerdet, ohne Drama." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: kleines Herdlicht — Schwelle markieren, ohne Geister zu fordern." },
        { name: "Trommel (Symbol)", description: "Werkzeug: Rhythmus und Atem — Körper zuerst, Reise nur geerdet." },
        { name: "Becher", description: "Werkzeug: Gabe und Wasser — teilen, nicht spekulieren." },
        { name: "Faden", description: "Werkzeug: Verbindung und Maß — knüpfen als Haltung, nicht als Fesselung anderer." },
        { name: "Spiegel", description: "Werkzeug: Blick zurück auf den eigenen Stand — kein Orakelzwang." },
        { name: "Besen", description: "Werkzeug: Raum kehren als Ordnung — Alltag ehren, kein Reinigungsversprechen am Körper." },
        { name: "Kreide", description: "Werkzeug: Kreis und Grenze zeichnen — Symbolik, kein Bann gegen Personen." },
        { name: "Räucherschale", description: "Werkzeug: Duft und Atem im Raum — Maß statt Spektakel." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern." },
      ],
      elements: ["Erde (Stand)", "Luft (Atem)", "Feuer (Herd)", "Wasser (Fluss)"],
      note: "Hauspraxis und Symbolik — kein medizinischer Rat, kein Heilversprechen."
    },
    nordisch: {
      herbs: [
        { name: "Eichenblatt", description: "Maß und Stand im Ring — Stärke ohne Prahlerei, Wort und Tat im selben Kreis." },
        { name: "Wermut", description: "Bittere Grenze: was nicht dient, bleibt draußen. Symbol für Frith und klare Haltung." },
        { name: "Thymian", description: "Haus und Herd — kleine Gabe auf dem Tisch, Alltag ehren statt Pathos." },
        { name: "Wacholder", description: "Nordischer Raumduft: Reinigung als Ordnung im Haus, nicht als Heilmittel." },
        { name: "Birke", description: "Frühlicht und Neubeginn — Yule-/Ostara-Ton: Keim mit Maß setzen." },
        { name: "Beifuß", description: "Räucher- und Traum-Symbol mit Vorsicht — Reise nur geerdet, Eid vor Spektakel." },
        { name: "Angelika", description: "Schutz- und Wege-Kraut in der Volkspraxis — hier als Haltung: klar gehen, nichts erzwingen." },
      ],
      kitchen: [
        { name: "Salz", description: "Küche / Hausmittel: Frith und Grenze am Tisch — Prise als Eid-Symbol, kein Reinigungsversprechen." },
        { name: "Honig", description: "Küche: süße Gabe im Ring — teilen, Wort halten, kein Heilversprechen." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Maß und Atem, nicht als Medizin." },
        { name: "Öl", description: "Küche: Tropfen am Blickfang oder Brot — Haltung der Versorgung, keine Salbung als Heilspruch." },
        { name: "Zucker", description: "Küche: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit — Fokus-Symbol am Tisch, kein Rezept." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Nelke", description: "Küche / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden." },
        { name: "Zimt", description: "Küche: Willkommen und Wärme — Duft-Symbol, kein Spektakel." },
      ],
      stones: [
        { name: "Bernstein", description: "Wärme-Blickfang — Honigton am Altar, Symbol nicht Therapie." },
        { name: "Flint", description: "Funke und Feuerstein — Herd und Stand im Ring." },
        { name: "Granit", description: "Schwerer Stand-Stein — Maß ohne Prahlerei." },
        { name: "Kiesel vom Weg", description: "Alltags-Blickfang: klar gehen, nichts erzwingen." },
        { name: "Eisengrau-Stein", description: "Grenze und Frith — kühler Merkstein, kein Amulettzwang." },
        { name: "Quarzader", description: "Heller Schnitt im Gestein — Klarheit des Worts als Symbol." },
      ],
      colors: [
        { name: "Nordblau", description: "Altarfarbe: Weite und kühle Klarheit — Tuch oder Kerze." },
        { name: "Eisengrau", description: "Altarfarbe: Stand und Werkzeugton — Alltag ehren." },
        { name: "Honiggold", description: "Altarfarbe / Kerze: Wärme und Gabe im Ring." },
        { name: "Tannengrün", description: "Altarfarbe: Yule- und Waldton — Keim mit Maß." },
        { name: "Knochenweiß", description: "Altarfarbe: schlichte Reinheit als Symbol, kein Reinigungsversprechen." },
        { name: "Blutrot (mit Maß)", description: "Kerze nur mit Ethik — Kraft-Symbol, nie gegen den Willen anderer." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Herdlicht im Ring — Wort und Tat im selben Kreis." },
        { name: "Horn / Becher", description: "Werkzeug: Gabe und Eid-Symbol — teilen, Frith halten." },
        { name: "Kreide", description: "Werkzeug: Grenze markieren — was nicht dient, bleibt draußen." },
        { name: "Faden", description: "Werkzeug: Band und Maß — knüpfen ohne fremden Willen zu binden." },
        { name: "Besen", description: "Werkzeug: Haus kehren vor dem Blót-Ton — Ordnung, kein Spektakel." },
        { name: "Spiegel", description: "Werkzeug: Klarheit des Worts — sich selbst prüfen." },
        { name: "Messer (Küche)", description: "Werkzeug: Schnitt und Versorgung — ethisch, nie gegen Personen gerichtet." },
        { name: "Schlüssel", description: "Werkzeug: Hof und Schwelle — öffnen und schließen mit Maß." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Ring- und Frith-Ton: Wort halten, Maß im Kreis." },
      ],
      elements: ["Erde (Ring)", "Eis (Klarheit)", "Feuer (Herd)", "Luft (Wort)"],
      note: "Symbole für Haltung und Haus — keine medizinischen Aussagen."
    },
    voodoo: {
      herbs: [
        { name: "Basilikum", description: "Hausfrieden und Frische — Topfpflanze oder Blatt als Zeichen von Ordnung, keine Initiation." },
        { name: "Lorbeer", description: "Klarheit und Würde im Haus — Blatt als Merkzeichen, nicht als Orakelzwang." },
        { name: "Minze", description: "Frisch und hell: Schwelle und Atem. Wasser und Duft reichen oft für den Alltag." },
        { name: "Petersilie", description: "Einfache Gabe und Grün am Tisch — Respekt im Haus, ohne Medium zu spielen." },
        { name: "Rosmarin", description: "Erinnerung und Hausgrenze — Räucher- oder Küchensymbol mit klarer Ethik." },
        { name: "Salbei", description: "Raumklarheit am Hof — Duft und Ordnung, keine Initiation." },
        { name: "Thymian", description: "Hauskraft am Tisch — Alltag ehren, kein Medium spielen." },
      ],
      kitchen: [
        { name: "Nelke", description: "Küche / Würze: Schutz-Symbol am Eingang — Maß halten, keinen fremden Willen binden." },
        { name: "Zimt", description: "Küche: Wärme und Willkommen — Duft für den Hof, nicht für Spektakel oder Heilversprechen." },
        { name: "Salz", description: "Küche / Hausmittel: Schwelle und Ordnung — Prise als Merkzeichen, keine Initiation." },
        { name: "Zucker", description: "Küche: süße Gabe und Willkommen — teilen statt binden, Symbolik ohne Heilversprechen." },
        { name: "Öl", description: "Küche / Hausmittel: Licht und Pflege am Blickfang — Tropfen als Haltung, nicht als Heilsalbe." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze — Symbol am Eingang, kein medizinischer Claim und kein Zwang." },
        { name: "Honig", description: "Küche: Wärme und Gabe — Tropfen oder Schälchen als Symbol, kein medizinischer Claim." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit — Fokus-Symbol am Tisch, kein Rezept." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Muschel", description: "Wasser-Blickfang — Schwelle und Atem, öffentliche Hauspraxis nur." },
        { name: "Quarz", description: "Licht-Stein am Altar — Klarheit ohne Medium zu spielen." },
        { name: "Lava", description: "Boden und Wärme — Stand im Hof, kein Spektakel." },
        { name: "Korallenstück (Symbol)", description: "Meer-Ton als Blickfang — Respekt, keine Initiation." },
        { name: "Flusskiesel", description: "Schlichtes Merkzeichen für Fluss und Maß." },
        { name: "Tonperle", description: "Hausgemachter Blickfang — Ordnung und Gabe, nicht Orakelzwang." },
      ],
      colors: [
        { name: "Weiß", description: "Altarfarbe / Kerze: Reinheit-Symbol — Haltung, kein Reinigungsversprechen." },
        { name: "Blau", description: "Altarfarbe: Ruhe und Wasser-Ton am Hof." },
        { name: "Rot (mit Maß)", description: "Kerze: Kraft-Symbol — Ethik zuerst, nie fremden Willen binden." },
        { name: "Grün", description: "Altarfarbe: Wachstum und Hausfrieden." },
        { name: "Gelb", description: "Altarfarbe: Willkommen und Licht — teilen statt fordern." },
        { name: "Schwarz", description: "Altarfarbe: Grenze und Schweigen — öffentliche Praxis nur." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Licht am Hof — öffentliche Hauspraxis, keine Initiation." },
        { name: "Becher", description: "Werkzeug: Wasser und Gabe — Respekt im Haus." },
        { name: "Kreide", description: "Werkzeug: Markierung am Boden als Symbol — kein Medium spielen." },
        { name: "Faden", description: "Werkzeug: Verbindung knüpfen — Ethik: keinen fremden Willen binden." },
        { name: "Spiegel", description: "Werkzeug: Klarheit und Grenze — Blickfang, kein Orakelzwang." },
        { name: "Besen", description: "Werkzeug: Schwelle kehren — Ordnung und Willkommen." },
        { name: "Glocke", description: "Werkzeug: Ruf und Maß — Ton setzen, nicht zwingen." },
        { name: "Schale", description: "Werkzeug: Opfergabe teilen — öffentliche Praxis nur." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Hof-Ton: nur öffentliche Praxis, keine Initiation." },
      ],
      elements: ["Wasser (Schwelle)", "Erde (Hof)", "Feuer (Licht)", "Luft (Atem)"],
      note: "Nur öffentliche Hauspraxis. Keine Initiation, keine medizinischen Claims."
    },
    santeria: {
      herbs: [
        { name: "Rosmarin", description: "Hausklarheit und Schutz-Ton — Duft und Ordnung, ohne Ile-Anspruch." },
        { name: "Orange", description: "Dank und Frische — Schale oder Duft als Gabe, teilen statt fordern." },
        { name: "Lavendel", description: "Ruhe-Symbol für den Raum — sanft, ethisch, kein Heilversprechen." },
        { name: "Basilikum", description: "Grünes Haus-Aché im Alltag — Topf am Fenster als Haltung, nicht als Ritus der Einweihung." },
        { name: "Minze", description: "Reinheit und Frische — Wasser und Blatt als Alltagspraxis." },
        { name: "Lorbeer", description: "Klarheit und Würde — Blatt als Merkzeichen für Dank und Haltung." },
      ],
      kitchen: [
        { name: "Nelke", description: "Küche / Würze: würzige Grenze und Wärme — Symbol am Altarlicht, mit Respekt und Maß." },
        { name: "Salz", description: "Küche / Hausmittel: Reinheit-Symbol am Haus — Prise als Haltung, ohne Ile-Anspruch." },
        { name: "Zucker", description: "Küche: süße Gabe und Dank — teilen, nicht fordern." },
        { name: "Honig", description: "Küche: Wärme und Willkommen — Tropfen oder Schälchen als Symbol, kein Heilversprechen." },
        { name: "Öl", description: "Küche / Hausmittel: Lichtpflege und Gabe — Tropfen am Blickfang, keine Heilsalbung." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit — Fokus-Symbol am Tisch, kein Rezept." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Zimt", description: "Küche: Willkommen und Wärme — Duft-Symbol, kein Spektakel." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Koralle", description: "Meer-Blickfang — Symbol für Fluss und Haus, kein Ile-Anspruch." },
        { name: "Citrin", description: "Licht-Stein am Altar — Dank und Frische als Haltung." },
        { name: "Mondstein", description: "Zyklus-Blickfang — Phase achten, nichts erzwingen." },
        { name: "Muschelweiß", description: "Schlichter Wasser-Ton — Reinheit als Symbol, kein Reinigungsversprechen." },
        { name: "Bergkristall", description: "Klarer Fokus-Stein — Haltung, nicht Messung." },
        { name: "Grüner Achat", description: "Wachstums-Blickfang — Alltag und Haus ehren." },
      ],
      colors: [
        { name: "Weiß", description: "Altarfarbe / Kerze: Reinheit-Symbol und Dank." },
        { name: "Gelb", description: "Altarfarbe: Dank und Licht — teilen statt fordern." },
        { name: "Grün", description: "Altarfarbe: Wachstum-Symbol mit Maß." },
        { name: "Blau", description: "Altarfarbe: Ruhe und Wasser-Ton." },
        { name: "Rosa", description: "Altarfarbe: sanfte Nähe ohne Besitzanspruch." },
        { name: "Goldton", description: "Kerze oder Tuch: Würde und Gabe am Hausaltar." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Altarlicht und Dank — ohne Ile-Anspruch." },
        { name: "Becher", description: "Werkzeug: Wasser und Reinheit-Symbol — Haltung, kein Reinigungsversprechen." },
        { name: "Kreide", description: "Werkzeug: Markierung als Merkzeichen — Respekt und Maß." },
        { name: "Faden", description: "Werkzeug: Band der Absicht — knüpfen ohne Besitzanspruch." },
        { name: "Spiegel", description: "Werkzeug: Klarheit und Würde — Blickfang am Hausaltar." },
        { name: "Besen", description: "Werkzeug: Haus kehren vor der Gabe — Ordnung ehren." },
        { name: "Schale", description: "Werkzeug: Früchte und Dank ablegen — teilen statt fordern." },
        { name: "Schlüssel", description: "Werkzeug: Haus und Schwelle — öffnen mit Respekt." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung." },
      ],
      elements: ["Wasser (Reinheit-Symbol)", "Erde (Haus)", "Feuer (Kerze)", "Luft (Gebet-Symbol)"],
      note: "Hauspraxis ohne Ile-Anspruch. Symbolik, kein Heilversprechen."
    },
    hermetik: {
      herbs: [
        { name: "Salbei", description: "Klarheit und Labor-Haltung — Duft als Fokus, keine alchemistischen Heilsversprechen." },
        { name: "Rosmarin", description: "Gedächtnis und Maß — Notiz und Absicht knapper halten." },
        { name: "Myrte", description: "Grenze und Bund — Symbol für Operationen mit klarem Anfang und Ende." },
        { name: "Lorbeer", description: "Sieg nur als Klarheit der Frage — Beobachtung vor Eingriff." },
        { name: "Wermut", description: "Bittere Prüfung: Hypothesen verwerfen, Ballast lösen." },
        { name: "Minze", description: "Frisch starten — Tisch aufräumen, Atem, dann die Stunde notieren." },
        { name: "Lavendel", description: "Ruhe im Denken — Pause zwischen Operationen, kein Spektakel." },
      ],
      kitchen: [
        { name: "Salz", description: "Küche / Labor-Symbol: Fixierung und Maß — Prise als Merkzeichen (Salz-Prinzip), kein Heilversprechen." },
        { name: "Pfeffer", description: "Küche: Schärfe der Frage — Fokus-Symbol vor dem Eingriff." },
        { name: "Öl", description: "Küche / Labor: Lösung und Träger — Tropfen als Metapher, keine alchemistische Heilsalbe." },
        { name: "Zucker", description: "Küche: lösliche Klarheit — Ballast süß lösen, Hypothese prüfen, nicht spekulieren." },
        { name: "Honig", description: "Küche: Wärme und Gabe — Tropfen oder Schälchen als Symbol, kein medizinischer Claim." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Nelke", description: "Küche / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden." },
        { name: "Zimt", description: "Küche: Willkommen und Wärme — Duft-Symbol, kein Spektakel." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Lapis", description: "Denken-Blickfang — Königsblau am Labor-Tisch, Symbol nicht Orakel." },
        { name: "Bergkristall", description: "Fokus-Stein — Beobachtung vor Eingriff." },
        { name: "Zinnober-Ton", description: "Labor-Symbol (Farbe/Ton) — Operation mit Anfang und Ende, keine Heilsversprechen." },
        { name: "Hämatit", description: "Erdungs-Blickfang nach der Stunde — Körper zurückholen." },
        { name: "Schiefer", description: "Schreib- und Grenzstein — Notiz knapper halten." },
        { name: "Pyrit", description: "Funke und Prüfung — Hypothesen schärfen, nicht glänzen wollen." },
      ],
      colors: [
        { name: "Königsblau", description: "Altarfarbe / Tuch: Denken und Maß." },
        { name: "Gold", description: "Altarfarbe / Kerze: Klarheit der Frage — Sieg nur als Erkenntnis." },
        { name: "Schwarz", description: "Altarfarbe: Grenze der Operation — Anfang und Ende markieren." },
        { name: "Weiß", description: "Altarfarbe: leere Tafel — frisch starten." },
        { name: "Zinnoberrot", description: "Akzentfarbe: Labor-Ton mit Vorsicht und Ethik." },
        { name: "Grau", description: "Altarfarbe: Neutralität — Beobachtung vor Spektakel." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Laborlicht — Stunde notieren, Beobachtung vor Eingriff." },
        { name: "Kreide", description: "Werkzeug: Diagramm und Grenze der Operation — Anfang und Ende markieren." },
        { name: "Becher", description: "Werkzeug: Lösung und Maß — Metapher, keine alchemistische Heilsalbe." },
        { name: "Faden", description: "Werkzeug: Verbindung der Faktoren — knüpfen als Denkhilfe." },
        { name: "Spiegel", description: "Werkzeug: Reflexion der Hypothese — sich selbst prüfen." },
        { name: "Feder / Stift", description: "Werkzeug: Protokoll — Absicht knapper halten." },
        { name: "Waage (Symbol)", description: "Werkzeug: Ausgleich prüfen — Ethik vor Spektakel." },
        { name: "Schale", description: "Werkzeug: Stoffe trennen und ordnen — Laborhaltung." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff." },
      ],
      elements: ["Feuer (Schwefel-Symbol)", "Wasser (Lösung)", "Luft (Merkur-Symbol)", "Erde (Salz-Symbol)"],
      note: "Labor- und Haltungssymbole — keine alchemistischen Heilsversprechen."
    },
    wicca: {
      herbs: [
        { name: "Rosmarin", description: "Schutz-Symbol am Eingang oder Altar — Grenze ohne Angriff, an niemandem Schaden." },
        { name: "Lavendel", description: "Sanfte Reinigung und Ruhe im Raum — Duft und Absicht, kein Heilversprechen." },
        { name: "Beifuß", description: "Mond- und Traum-Symbol — mit Maß; Reise nur ethisch und geerdet." },
        { name: "Salbei", description: "Klarheit im Kreis — Raum achten, nicht Personen „reinigen“." },
        { name: "Thymian", description: "Mut und Hauskraft als Symbol — kleine Gabe, Alltag ehren." },
        { name: "Eisenkraut", description: "Klassisches Schutz- und Schwellenkraut in der Hexerei — Haltung, nicht Rezept." },
        { name: "Kamille", description: "Sanfter Frieden im Raum — Tee oder Duft als Symbol, keine medizinischen Claims." },
        { name: "Rose", description: "Anziehen mit Maß — Liebe und Dank ohne Besitzanspruch." },
      ],
      kitchen: [
        { name: "Salz", description: "Küche / Hausmittel: Kreis und Schutz-Grenze — Prise als Symbol, an niemandem Schaden." },
        { name: "Honig", description: "Küche: süße Gabe und Anziehen mit Maß — teilen, kein Besitzanspruch." },
        { name: "Zimt", description: "Küche: Wärme und Willkommen am Altar — Duft-Symbol, kein Heilversprechen." },
        { name: "Öl", description: "Küche / Hausmittel: Salbung als Haltung — Tropfen am Blickfang, keine Heilsalbe." },
        { name: "Nelke", description: "Küche: würzige Grenze — Schutz-Ton ohne Angriff." },
        { name: "Zucker", description: "Küche: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit — Fokus-Symbol am Tisch, kein Rezept." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Obsidian", description: "Grenze-Blickfang — Schutz ohne Angriff, an niemandem Schaden." },
        { name: "Mondstein", description: "Zyklus-Stein — Phase als Arbeitsfenster achten." },
        { name: "Moosachat", description: "Erde / Ankern — Stand nach dem Kreis." },
        { name: "Bergkristall", description: "Klarer Fokus am Altar — Haltung, nicht Messung." },
        { name: "Rosenquarz", description: "Sanftes Anziehen-Symbol — Dank ohne Besitzanspruch." },
        { name: "Schwarzer Turmalin (Symbol)", description: "Schutz-Blickfang — Grenze ehren, kein Angriff." },
      ],
      colors: [
        { name: "Schwarz", description: "Altarfarbe: Schutz-Grenze — Kerze oder Tuch ohne Angriff." },
        { name: "Silber", description: "Altarfarbe: Mond-Ton — Phase achten, nichts erzwingen." },
        { name: "Grün", description: "Altarfarbe: Wachstum mit Maß." },
        { name: "Weiß", description: "Altarfarbe / Kerze: Klarheit im Kreis." },
        { name: "Violett", description: "Altarfarbe: stille Absicht — Ethik vor Spektakel." },
        { name: "Rosa", description: "Altarfarbe: Anziehen mit Maß — Liebe ohne Besitz." },
        { name: "Goldton", description: "Kerze: Sonne und Dank im Jahresrad." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Absicht und Element Feuer — an niemandem Schaden." },
        { name: "Kreide", description: "Werkzeug: Kreis ziehen als Symbol — Grenze ohne Angriff." },
        { name: "Besen", description: "Werkzeug: Raum kehren vor dem Kreis — Ordnung, kein Reinigungsversprechen an Personen." },
        { name: "Becher", description: "Werkzeug: Wasser und Loslassen — Absicht entlassen." },
        { name: "Faden", description: "Werkzeug: Knoten-Arbeit mit Maß — binden nur ethisch, nie gegen Willen." },
        { name: "Spiegel", description: "Werkzeug: Mond- und Selbstblick — Phase achten." },
        { name: "Athame (Symbol)", description: "Werkzeug: Schnitt der Absicht — Symbolklinge, nie gegen Personen." },
        { name: "Räucherschale", description: "Werkzeug: Duft im Kreis — Haltung, kein Heilversprechen." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Kreis-Ton: an niemandem Schaden, Einwilligung achten." },
      ],
      elements: ["Erde (Stand)", "Luft (Rede)", "Feuer (Absicht)", "Wasser (Loslassen)"],
      note: "Hausaltar-Symbolik für Schutz, Reinigung, Anziehen, Loslassen. Kein medizinischer Rat. An niemandem Schaden.",
      heute: [
        { item: "Rosmarin", why: "als Schutz-Symbol am Eingang oder Altar — Grenze ohne Angriff." },
        { item: "Lavendel", why: "für sanfte Reinigung und Ruhe im Raum — Duft, kein Heilversprechen." },
        { item: "Silber / Mondlicht", why: "um die Phase als Arbeitsfenster zu achten, nicht zu erzwingen." },
        { item: "Wasser", why: "zum Loslassen: Hände waschen, Absicht entlassen, schweigen." },
      ]
    },
    chaosmagie: {
      herbs: [
        { name: "Minze", description: "Reset und Frische — Banishing-Punkt: altes Modell ablegen." },
        { name: "Rosmarin", description: "Anker im Alltag — nach dem Labor zurück in den Körper." },
        { name: "Salbei", description: "Raum klären als mentaler Reset — Theater optional, Ethik Pflicht." },
        { name: "Beifuß", description: "Räucher- und Reset-Symbol — Banishing-Ton mit Maß, Ethik Pflicht." },
        { name: "Thymian", description: "Alltags-Anker nach dem Labor — kleine Praxis statt Identitätsdrama." },
        { name: "Lavendel", description: "Ruhe zwischen Operationen — Pause, kein Spektakel." },
        { name: "Wacholder", description: "Raumduft als mentaler Schnitt — Theater optional." },
      ],
      kitchen: [
        { name: "Kaffee", description: "Küche / Wachheit als Gnosis-Werkzeug — scharf starten, Ethik behalten, Ergebnis nicht jagen." },
        { name: "Pfeffer", description: "Küche: Schnitt und Fokus — Schärfe als Metapher für knappe Absicht." },
        { name: "Ingwer", description: "Küche: Funke und Wärme — Labor-Energie ohne Identitätsdrama." },
        { name: "Zitrone", description: "Küche: Säure als Klarheit — unbrauchbare Sigils entsorgen, neu formulieren." },
        { name: "Salz", description: "Küche / Hausmittel: Banishing und Schnitt — Prise als Reset-Symbol, kein Heilversprechen." },
        { name: "Zucker", description: "Küche: schnelle Gnosis-Metapher — kurz süß, dann Modell wechseln." },
        { name: "Öl", description: "Küche: Träger und Labor-Tropfen — Werkzeug, keine Heilsalbung." },
        { name: "Knoblauch", description: "Küche: scharfer Schnitt am Eingang — Symbol für Banishing, nicht Medizin." },
        { name: "Honig", description: "Küche: Wärme und Gabe — Tropfen oder Schälchen als Symbol, kein medizinischer Claim." },
        { name: "Nelke", description: "Küche / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden." },
        { name: "Zimt", description: "Küche: Willkommen und Wärme — Duft-Symbol, kein Spektakel." },
        { name: "Anis", description: "Küche: würzige Klarheit — Hausmittel-Symbol für Atem und Maß, nicht als Medizin." },
      ],
      stones: [
        { name: "Obsidian", description: "Schnitt-Blickfang — altes Modell ablegen, Ethik behalten." },
        { name: "Pyrit", description: "Funke-Symbol — Labor-Start ohne Identitätsdrama." },
        { name: "Klarer Quarz", description: "Leinwand-Stein — Absicht knapper halten." },
        { name: "Schiefer", description: "Neutrale Schreibfläche — Sigil notieren und entsorgen." },
        { name: "Glasbruch (sicher)", description: "Metapher für Schnitt — nur als Symbol, vorsichtig handhaben." },
        { name: "Betonstück", description: "Alltags-Anker — nach dem Labor zurück in den Körper." },
      ],
      colors: [
        { name: "Schwarz", description: "Altarfarbe: Reset und Leere — Banishing-Ton." },
        { name: "Neon-Akzent", description: "Labor-Farbe: knapper Funke, kein Spektakelzwang." },
        { name: "Grau", description: "Altarfarbe: Neutral — Paradigma beliebig, Ethik Pflicht." },
        { name: "Weiß", description: "Altarfarbe: leere Tafel nach dem Schnitt." },
        { name: "Blutrot (Akzent)", description: "Kurzer Fokus-Akzent — Absicht scharf, Ergebnis nicht jagen." },
        { name: "Elektrisches Blau", description: "Labor-Akzent: Wachheit ohne Drama." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: kurzer Fokus — Gnosis starten, Ethik behalten." },
        { name: "Kreide", description: "Werkzeug: Sigil-Fläche und Banishing-Markierung — Modell wechseln." },
        { name: "Stift", description: "Werkzeug: Sigil zeichnen und entsorgen — Ergebnis nicht jagen." },
        { name: "Faden", description: "Werkzeug: knüpfen und lösen — Metapher für Absicht, nicht Fesselung." },
        { name: "Spiegel", description: "Werkzeug: Feedback auf das eigene Modell — kein Orakelzwang." },
        { name: "Becher", description: "Werkzeug: Kaffee oder Wasser als Anker — zurück in den Körper." },
        { name: "Würfel / Münze", description: "Werkzeug: Zufall als Orakel-Metapher — Entscheidungshilfe, kein Zwang." },
        { name: "Besen", description: "Werkzeug: Banishing kehren — altes Modell ablegen." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht." },
      ],
      elements: ["Beliebig (Paradigma)", "Leer (Reset)", "Funke (Gnosis)", "Alltag (Anker)"],
      note: "Werkzeug-Metaphern für Gnosis und Labor — keine medizinischen Claims."
    },
    esoterik: {
      herbs: [
        { name: "Lavendel", description: "Ruhe und sanfte Reinigung — Duft für den Raum, kein Heilversprechen." },
        { name: "Kamille", description: "Weiches Friedens-Symbol — Tee oder Blüte als Haltung, nicht als Therapie." },
        { name: "Rosmarin", description: "Klarheit und Schutz-Ton am Alltagstisch — Absicht klein halten." },
        { name: "Salbei", description: "Raum klären als Symbol — Fenster auf, Atem, Schweigen." },
        { name: "Rose", description: "Sanftes Anziehen — Dank und Nähe ohne Besitzanspruch." },
        { name: "Minze", description: "Frisch starten — drei bewusste Züge oft die beste Schwelle." },
        { name: "Thymian", description: "Hauskraft und Mut-Symbol — kleine Praxis statt großem Spektakel." },
      ],
      kitchen: [
        { name: "Salz", description: "Küche / Hausmittel: schlichte Grenze am Tisch — Prise als Merkzeichen, kein Reinigungsversprechen." },
        { name: "Honig", description: "Küche: süße Gabe und Sanftheit — teilen, kein Heilversprechen." },
        { name: "Zimt", description: "Küche: Wärme und Willkommen — Duft-Symbol für den Alltagstisch." },
        { name: "Öl", description: "Küche / Hausmittel: Tropfen am Blickfang — Haltung der Pflege, keine Heilsalbe." },
        { name: "Anis", description: "Küche: würzige Ruhe — Hausmittel-Symbol für Atem und Maß." },
        { name: "Zucker", description: "Küche: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen." },
        { name: "Pfeffer", description: "Küche: Schärfe und Wachheit — Fokus-Symbol am Tisch, kein Rezept." },
        { name: "Knoblauch", description: "Küche: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang." },
        { name: "Nelke", description: "Küche / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden." },
      ],
      stones: [
        { name: "Rosenquarz", description: "Sanft-Blickfang — Nähe ohne Besitzanspruch, keine Kristallheilung." },
        { name: "Amethyst", description: "Stille und Schweigen am Altar — Haltung, nicht Messung." },
        { name: "Bergkristall", description: "Klarer Fokus — drei bewusste Züge oft die beste Schwelle." },
        { name: "Mondstein", description: "Zyklus-Symbol — Mond ehren ohne Orakel-Zwang." },
        { name: "Raucherquarz", description: "Weiches Klarheits-Symbol — Raum und Atem." },
        { name: "Flusskiesel", description: "Schlichter Alltags-Blickfang — kleine Praxis statt Spektakel." },
      ],
      colors: [
        { name: "Violett", description: "Altarfarbe: stille Absicht und Sanftheit." },
        { name: "Silber", description: "Altarfarbe: Mond und Schweigen — ohne Orakel-Zwang." },
        { name: "Nachtblau", description: "Altarfarbe: Ruhe und Tiefe als Tuch oder Kerze." },
        { name: "Weiß", description: "Altarfarbe / Kerze: schlichte Klarheit." },
        { name: "Rosa", description: "Altarfarbe: sanftes Anziehen ohne Besitz." },
        { name: "Mintgrün", description: "Altarfarbe: frischer Start und Atem." },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: sanftes Licht — Absicht klein halten." },
        { name: "Kreide", description: "Werkzeug: schlichte Markierung — Symbolik ohne Spektakel." },
        { name: "Becher", description: "Werkzeug: Wasser und Atem — drei bewusste Züge." },
        { name: "Faden", description: "Werkzeug: weiches Band — Verbindung mit Maß." },
        { name: "Spiegel", description: "Werkzeug: stille Selbstschau — kein Medium." },
        { name: "Besen", description: "Werkzeug: Raum kehren — Alltagspraxis." },
        { name: "Schale", description: "Werkzeug: Gabe ablegen — teilen statt fordern." },
        { name: "Räucherschale", description: "Werkzeug: Duft für den Raum — kein Heilversprechen." },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Sanfter Alltagston: Absicht klein, kein Medium." },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Sanfter Alltagston: Absicht klein, kein Medium." },
      ],
      elements: ["Erde (Stand)", "Luft (Atem)", "Feuer (Licht)", "Wasser (Ruhe)"],
      note: "Sanfte Hauspraxis-Symbolik. Kein Heilversprechen, kein Medium.",
      heute: [
        { item: "Lavendel", why: "für Ruhe und sanfte Reinigung — Duft, kein Heilversprechen." },
        { item: "Silber", why: "um Mond und Schweigen zu ehren, ohne Orakel-Zwang." },
        { item: "Bergkristall", why: "als klarer Fokus — Haltung, nicht Messung." },
        { item: "Atem", why: "weil drei bewusste Züge oft die beste Schwelle sind." },
      ]
    }
  };


  function normalizeHerb(h) {
    if (h && typeof h === 'object') {
      return {
        name: String(h.name || '').trim(),
        description: String(h.description || h.desc || '').trim()
      };
    }
    const raw = String(h || '').trim();
    if (!raw) return { name: '', description: '' };
    const m = raw.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (m) {
      return { name: m[1].trim(), description: m[2].trim() + ' — Hauspraxis-Symbolik, kein Heilversprechen.' };
    }
    return { name: raw, description: 'Hauspraxis-Symbolik — Haltung und Gabe, kein medizinischer Rat.' };
  }

  /** Steine/Farben/Küche/Werkzeuge/Bezüge: gleiche Form; Fallback aus Alt-Strings. */
  function normalizeNamedItem(item, kind) {
    const fallbacks = {
      color: 'Altarfarbe / Blickfang — Symbolik, kein Heilversprechen.',
      stone: 'Altarstein / Blickfang — Symbolik, keine Kristallheilung.',
      kitchen: 'Küche / Hausmittel — Symbolik der Hauspraxis, kein Heilversprechen.',
      tool: 'Werkzeug der Hauspraxis — Symbolik und Maß, kein Zwang.',
      link: 'Bezug / Hilfsmittel — traditionelle Symbolik mit Ethik und Einwilligung; kein Schaden.'
    };
    const fallback = fallbacks[kind] || 'Hauspraxis-Symbolik — Haltung und Gabe, kein medizinischer Rat.';
    if (item && typeof item === 'object') {
      return {
        name: String(item.name || '').trim(),
        description: String(item.description || item.desc || '').trim() || fallback
      };
    }
    const raw = String(item || '').trim();
    if (!raw) return { name: '', description: '' };
    const m = raw.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (m) {
      return { name: m[1].trim(), description: m[2].trim() + ' — Symbolik, kein Heilversprechen.' };
    }
    return { name: raw, description: fallback };
  }

  function normalizeStone(s) { return normalizeNamedItem(s, 'stone'); }
  function normalizeColor(c) { return normalizeNamedItem(c, 'color'); }
  function normalizeKitchen(k) { return normalizeNamedItem(k, 'kitchen'); }
  function normalizeTool(t) { return normalizeNamedItem(t, 'tool'); }
  function normalizeLink(l) { return normalizeNamedItem(l, 'link'); }

  function herbDisplayName(h) {
    return normalizeHerb(h).name;
  }

  function itemDisplayName(item, kind) {
    if (kind === 'stone') return normalizeStone(item).name;
    if (kind === 'color') return normalizeColor(item).name;
    if (kind === 'kitchen') return normalizeKitchen(item).name;
    if (kind === 'tool') return normalizeTool(item).name;
    if (kind === 'link') return normalizeLink(item).name;
    return normalizeHerb(item).name;
  }

  var LEXIKON_KINDS = ['herb', 'kitchen', 'stone', 'color', 'tool', 'link'];

  function getCorrespondences(pathId) {
    const c = CORRESPONDENCES[pathId] || CORRESPONDENCES.esoterik;
    const out = Object.assign({}, c);
    out.herbs = (c.herbs || []).map(normalizeHerb).filter(function (h) { return h.name; });
    out.kitchen = (c.kitchen || []).map(normalizeKitchen).filter(function (h) { return h.name; });
    out.stones = (c.stones || []).map(normalizeStone).filter(function (s) { return s.name; });
    out.colors = (c.colors || []).map(normalizeColor).filter(function (col) { return col.name; });
    out.tools = (c.tools || []).map(normalizeTool).filter(function (t) { return t.name; });
    out.links = (c.links || []).map(normalizeLink).filter(function (l) { return l.name; });
    return out;
  }

  function mapPathItems(pathId, kind) {
    const pid = pathId || 'esoterik';
    const path = getPath(pid);
    const c = getCorrespondences(pid);
    const key = kind === 'stone' ? 'stones'
      : kind === 'color' ? 'colors'
      : kind === 'kitchen' ? 'kitchen'
      : kind === 'tool' ? 'tools'
      : kind === 'link' ? 'links'
      : 'herbs';
    const list = c[key] || [];
    return list.map(function (h) {
      return {
        name: h.name,
        description: h.description,
        pathId: pid,
        pathName: path.name,
        paths: [pid],
        pathNames: [path.name],
        symbol: path.symbol || '✦',
        kind: kind || 'herb'
      };
    });
  }

  function getHerbsForPath(pathId) { return mapPathItems(pathId, 'herb'); }
  function getKitchenForPath(pathId) { return mapPathItems(pathId, 'kitchen'); }
  function getStonesForPath(pathId) { return mapPathItems(pathId, 'stone'); }
  function getColorsForPath(pathId) { return mapPathItems(pathId, 'color'); }
  function getToolsForPath(pathId) { return mapPathItems(pathId, 'tool'); }
  function getLinksForPath(pathId) { return mapPathItems(pathId, 'link'); }

  function dedupeNamedItems(getter) {
    const map = Object.create(null);
    const order = [];
    PATHS.forEach(function (p) {
      getter(p.id).forEach(function (h) {
        const key = h.name.toLowerCase();
        if (!map[key]) {
          map[key] = {
            name: h.name,
            description: h.description,
            pathId: h.pathId,
            pathName: h.pathName,
            paths: [h.pathId],
            pathNames: [h.pathName],
            symbol: h.symbol,
            kind: h.kind
          };
          order.push(key);
        } else {
          const cur = map[key];
          if (cur.paths.indexOf(h.pathId) === -1) {
            cur.paths.push(h.pathId);
            cur.pathNames.push(h.pathName);
          }
          if ((h.description || '').length > (cur.description || '').length) {
            cur.description = h.description;
          }
        }
      });
    });
    return order.map(function (k) { return map[k]; });
  }

  function getAllHerbsDeduped() { return dedupeNamedItems(getHerbsForPath); }
  function getAllKitchenDeduped() { return dedupeNamedItems(getKitchenForPath); }
  function getAllStonesDeduped() { return dedupeNamedItems(getStonesForPath); }
  function getAllColorsDeduped() { return dedupeNamedItems(getColorsForPath); }
  function getAllToolsDeduped() { return dedupeNamedItems(getToolsForPath); }
  function getAllLinksDeduped() { return dedupeNamedItems(getLinksForPath); }

  function getLexikonForPath(pathId, kind) {
    const k = kind || 'herb';
    if (k === 'kitchen') return getKitchenForPath(pathId);
    if (k === 'stone') return getStonesForPath(pathId);
    if (k === 'color') return getColorsForPath(pathId);
    if (k === 'tool') return getToolsForPath(pathId);
    if (k === 'link') return getLinksForPath(pathId);
    return getHerbsForPath(pathId);
  }

  function getAllLexikonDeduped(kind) {
    const k = kind || 'herb';
    if (k === 'kitchen') return getAllKitchenDeduped();
    if (k === 'stone') return getAllStonesDeduped();
    if (k === 'color') return getAllColorsDeduped();
    if (k === 'tool') return getAllToolsDeduped();
    if (k === 'link') return getAllLinksDeduped();
    return getAllHerbsDeduped();
  }

  /** Alle Kräuter gruppiert nach Pfad (für Listen-Darstellung). */
  function getAllHerbsGrouped() {
    return PATHS.map(function (p) {
      return {
        pathId: p.id,
        pathName: p.name,
        symbol: p.symbol || '✦',
        herbs: getHerbsForPath(p.id)
      };
    });
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
      neu: 'Gut für: Absicht setzen und Schutz um den Keim — an niemandem Schaden.',
      zunehmend: 'Gut für: Anziehen mit Maß — Elemente und Symbole nähren, was ethisch wachsen darf.',
      voll: 'Gut für: Segen, Klarheit, Dank — Kreis halten und bewusst öffnen.',
      abnehmend: 'Gut für: Reinigung und Loslassen — was nicht dient, entlassen und schweigen.'
    },
    chaosmagie: {
      neu: 'Gut für: Sigil laden und Absicht knapper formulieren.',
      zunehmend: 'Gut für: Gnosis-Praxis, 369, Labor-Notizen.',
      voll: 'Gut für: Ergebnis beobachten — ohne Identitätsdrama.',
      abnehmend: 'Gut für: Vergessen, Reset, unbrauchbare Sigils entsorgen.'
    },
    esoterik: {
      neu: 'Gut für: Intention setzen, Schwelle markieren, still starten.',
      zunehmend: 'Gut für: Klarheit in der Praxis, Mondarbeit vorbereiten.',
      voll: 'Gut für: Danken, Licht halten, Tagebuch-Satz.',
      abnehmend: 'Gut für: Loslassen, Lostage achten, Ruhe gönnen.'
    }
  };


  /** Kurze Werke: Schutz, Reinigung, Anziehen, Loslassen — pfadbezogen, ethisch */
  const CRAFT_WORKS = {
    wicca: [
      { kind: 'Schutz', text: 'Blickkreis oder Hand am Türrahmen. „Hier halte ich — ohne Angriff.“' },
      { kind: 'Reinigung', text: 'Fenster auf oder Hände waschen. Was nicht dient, darf gehen.' },
      { kind: 'Anziehen', text: 'Eine ethische Absicht flüstern oder notieren — Gabe, nicht Besitzanspruch.' },
      { kind: 'Loslassen', text: 'Satz zerreissen oder ausatmen. Ergebnis nicht jagen. Schweigen.' }
    ],
    esoterik: [
      { kind: 'Schutz', text: 'Schwelle achten: ein Nein, das den Raum hält.' },
      { kind: 'Reinigung', text: 'Drei Atemzüge. Unnötiges ablegen — ohne Drama.' },
      { kind: 'Anziehen', text: 'Eine klare Intention in der Gegenwart — klein und haltbar.' },
      { kind: 'Loslassen', text: 'Lostag-Stille: nicht nachdrücken. Schweigen als Praxis.' }
    ],
    schamanismus: [
      { kind: 'Schutz', text: 'Füße spüren. Körpergrenze — Reise nur mit Maß.' },
      { kind: 'Reinigung', text: 'Rauch oder frische Luft als Symbol — Raum klären, nicht Geister fordern.' },
      { kind: 'Anziehen', text: 'Eine kraftvolle, ethische Absicht im Körper verankern.' },
      { kind: 'Loslassen', text: 'Unruhe abgeben an Erde. Zurückkommen. Schließen.' }
    ],
    nordisch: [
      { kind: 'Schutz', text: 'Ring/Grenze nennen. Frith halten — kein Schaden.' },
      { kind: 'Reinigung', text: 'Haus oder Tisch ordnen. Altes Wort lösen, wenn unhaltbar.' },
      { kind: 'Anziehen', text: 'Kleine Gabe oder haltbaren Vorsatz setzen.' },
      { kind: 'Loslassen', text: 'Unhaltbares entlassen. Maß vor Pathos.' }
    ],
    voodoo: [
      { kind: 'Schutz', text: 'Haus-Schwelle ehren — öffentliche Hauspraxis, keine Initiation.' },
      { kind: 'Reinigung', text: 'Wasser und Licht im Haus — Ordnung ohne Medium.' },
      { kind: 'Anziehen', text: 'Respektvolle Absicht klein halten — kein fremder Wille.' },
      { kind: 'Loslassen', text: 'Altes aus dem Haus bringen. Schwelle schließen.' }
    ],
    santeria: [
      { kind: 'Schutz', text: 'Weiße Klarheit im Haus — Reinheit als Haltung, kein Ile-Anspruch.' },
      { kind: 'Reinigung', text: 'Wasser, Tuch, Ordnung — Aché als Frische.' },
      { kind: 'Anziehen', text: 'Dank und Gabe (Obst/Wasser) — teilen, nicht fordern.' },
      { kind: 'Loslassen', text: 'Was nicht dient, entlassen. Alltag segnen und schließen.' }
    ],
    hermetik: [
      { kind: 'Schutz', text: 'Maß und Grenze der Operation nennen — zeitlich begrenzt.' },
      { kind: 'Reinigung', text: 'Labor/Tisch aufräumen. Hypothese prüfen, Ballast verwerfen.' },
      { kind: 'Anziehen', text: 'Eine präzise Frage setzen — Beobachten vor Eingriff.' },
      { kind: 'Loslassen', text: 'Ergebnis nicht erzwingen. Siegel und Alltag.' }
    ],
    chaosmagie: [
      { kind: 'Schutz', text: 'Banishing-Punkt: mentaler Reset — Raum klären ohne Theater.' },
      { kind: 'Reinigung', text: 'Unbrauchbares Modell ablegen. Ethik behalten.' },
      { kind: 'Anziehen', text: 'Sigil knapper formulieren — laden mit Ethik.' },
      { kind: 'Loslassen', text: 'Vergessen als Praxis. Ergebnis-Jagd stoppen.' }
    ]
  };

  function getCraftWorks(pathId) {
    const list = CRAFT_WORKS[pathId] || CRAFT_WORKS.esoterik;
    return list.map(function (w) { return Object.assign({}, w); });
  }

  function getTodayCraft(pathId, date) {
    const list = getCraftWorks(pathId);
    const idx = seedIndex(dayKeyLocal(date), pathId || 'esoterik', 'craft', list.length);
    return list[idx];
  }

  /** Jahresrad: Praxis-Ton pro Sabbat (nicht nur Datum) */
  const SABBAT_PRAXIS = {
    Imbolc: 'Keim und Licht im Haus — Reinigung, neuer Schutz um den Keim.',
    Ostara: 'Gleichgewicht in der Praxis — Anziehen mit Maß, Saat ethisch setzen.',
    Beltane: 'Freude und Grenze — Feuer der Absicht ohne Besitzanspruch.',
    Litha: 'Fülle achten — danken, nicht greifen; Schutz der Klarheit.',
    Lughnasadh: 'Erste Ernte — Gabe teilen, Stolz mit Maß.',
    Mabon: 'Ausgleich und Dank — was bleibt, was Loslassen will.',
    Samhain: 'Ahnenachtung und Schweigen — Grenze zum Unsichtbaren halten.',
    Yule: 'Rückkehr des Lichts — Schutz, Ruhe, kleiner Keim fürs Neue.'
  };

  function getSabbatPraxis(name) {
    return SABBAT_PRAXIS[name] || 'Jahresatem achten — Praxis, nicht Pflicht.';
  }

  function getHeuteResonanz(pathId, date) {
    const c = getCorrespondences(pathId);
    const pid = pathId || 'esoterik';
    if (c.heute && c.heute.length) {
      const idx = seedIndex(dayKeyLocal(date), pid, 'heute-res', c.heute.length);
      const h = c.heute[idx];
      return {
        line: 'Heute passt ' + h.item + ' — ' + h.why,
        item: h.item,
        why: h.why
      };
    }
    // Fallback: seeded herb from path catalog + soft why / description
    const herbs = c.herbs || [];
    if (herbs.length) {
      const hi = seedIndex(dayKeyLocal(date), pid, 'heute-res-herb', herbs.length);
      const herb = herbs[hi];
      const item = herb.name || 'eine stille Farbe';
      const why = herb.description
        || 'als leise Erinnerung an Haltung und Grenze.';
      // Keep lead line readable: first clause of description
      const shortWhy = why.split('—')[0].trim().replace(/\.$/, '') || why;
      return {
        line: 'Heute passt ' + item + ' — ' + shortWhy + '.',
        item: item,
        why: why
      };
    }
    const whys = [
      'als leise Erinnerung an Haltung und Grenze.',
      'weil Symbolik heute den Kreis trägt — ohne Anspruch.',
      'als Gabe an den Alltag, nicht als Rezept.',
      'um Schutz und Klarheit im Haus zu ehren.'
    ];
    const wi = seedIndex(dayKeyLocal(date), pid, 'heute-res-why', whys.length);
    return {
      line: 'Heute passt eine stille Haltung — ' + whys[wi],
      item: 'eine stille Haltung',
      why: whys[wi]
    };
  }

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
    normalizeHerb,
    normalizeStone,
    normalizeColor,
    normalizeKitchen,
    normalizeTool,
    normalizeLink,
    normalizeNamedItem,
    herbDisplayName,
    itemDisplayName,
    LEXIKON_KINDS,
    getHerbsForPath,
    getKitchenForPath,
    getStonesForPath,
    getColorsForPath,
    getToolsForPath,
    getLinksForPath,
    getAllHerbsDeduped,
    getAllKitchenDeduped,
    getAllStonesDeduped,
    getAllColorsDeduped,
    getAllToolsDeduped,
    getAllLinksDeduped,
    getLexikonForPath,
    getAllLexikonDeduped,
    getAllHerbsGrouped,
    moonBucket,
    getMondFenster,
    CRAFT_WORKS,
    SABBAT_PRAXIS,
    getCraftWorks,
    getTodayCraft,
    getSabbatPraxis,
    getHeuteResonanz
  };
})(typeof window !== 'undefined' ? window : globalThis);
