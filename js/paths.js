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
      practiceHint: 'Heute magisch und leicht: Trommelpuls, Spurlesen oder Rauchbrücke — der Körper führt dich.',
      teachingTip: 'Drei Atemzüge auf der Erde — dann darf die Trommel dich sanft mitnehmen.',
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
      practiceHint: 'Heute magisch: Ringwort, Thing-Pause oder Gastgabe — Ehre mit einem Augenzwinkern.',
      teachingTip: 'Ein Wort, das du hältst, leuchtet ruhig — mehr als zehn Runen ohne Eid.',
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
      practiceHint: 'Heute magisch: Schwellenwasser, Hofkehren oder Weißes Licht — Hauszauber, weich und respektvoll.',
      teachingTip: 'Hauspraxis beginnt weich: Wasser und Licht reichen oft schon.',
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
      practiceHint: 'Heute magisch: Haus-Aché, Weißes Tuch oder Drei Danke — Licht im Haus, ohne Initiation.',
      teachingTip: 'Aché wächst im Dank — nenne drei Dinge, die dich schon tragen.',
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
      practiceHint: 'Heute magisch: Operator-Stunde, Vier-Tafel oder Solve et Coagula — Alchemie zum Anfassen.',
      teachingTip: 'Erst schauen, dann bewegen — prüfe das Maß, bevor das Symbol tanzt.',
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
      practiceHint: 'Heute Hexerei zum Ausprobieren: Schutz, Reinigung, Anziehen oder Loslassen — liebevoll, ohne Schaden.',
      teachingTip: 'Hexerei hier: freundliche Hauspraxis im Kreis — Absicht, Grenze, Gabe, Schweigen. Nahbar, ohne Spektakel.',
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
      practiceHint: 'Heute magisch: Gnosis-Schnitt, Modell-Wechsel oder Vergiss-Schnitt — spielerisch laden und loslassen.',
      teachingTip: 'Gnosis ist kurz und klar — lade voll, dann lass los. Loslassen macht den Sigil leicht.',
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
      practiceHint: 'Heute magisch: Feldlicht-Schwelle, Mondfenster oder Zahlen-Klarheit — still, klar, einladend.',
      teachingTip: 'Feldlicht begleitet still — eine klare Intention reicht oft schon.',
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
      { day: 1, title: 'Füße & Atem', text: 'Füße fest auf dem Boden. Drei ruhige Atemzüge. Der Körper ist das Instrument — Spektakel wartet draußen. Notiere ein Wort: hier.' },
      { day: 2, title: 'Körper-Check', text: 'Hand auf Brust und Bauch. Was meldet der Körper — Wärme, Enge, Hunger — ohne Drama zu erzählen? Eine Minute reichen.' },
      { day: 3, title: 'Trommel-Atem kurz', text: 'Eine Minute rhythmisch atmen oder sanft auf den Oberschenkel klopfen. Danach Wasser trinken und stehen. Puls vor Reise.' },
      { day: 4, title: 'Erdung im Alltag', text: 'Bewusst gehen oder sitzen: mit dem Feld, nicht dagegen. Eine Alltagshandlung (Tür, Tasse, Schritt) als Anker wählen.' },
      { day: 5, title: 'Ahnenlicht still', text: 'Ein Satz Dank an Linie oder Lehrer — Erinnerung, keine Geistermessung, keine Forderung. Licht oder nur Atem genügt.' },
      { day: 6, title: 'Grenze halten', text: 'Wo war Überforderung heute? Ein klares Nein als Praxis — freundlich, fest, ohne Theater. Körper zuerst.' },
      { day: 7, title: 'Rückkehr', text: 'Schultern sinken. „Ich bin hier.“ Woche schließen: was bleibt als Haltung, nicht als Geschichte?' }
    ],
    nordisch: [
      { day: 1, title: 'Grenze nennen', text: 'Ein Wort für deine Grenze heute. Ohne Pathos, ohne Rechtfertigung. Grenze hält den Ring — nicht der Lärm.' },
      { day: 2, title: 'Eid prüfen', text: 'Welchen Eid hältst du schon — und welchen schuldest du noch? Nur was haltbar und ethisch ist, zählt als Wort.' },
      { day: 3, title: 'Kleine Gabe', text: 'Ordnung, Hilfe oder Stille als Gabe. Maß statt Drama. Niemanden verpflichten, nichts erzwingen.' },
      { day: 4, title: 'Wort = Tat', text: 'Einen Satz sagen, den du heute halten kannst. Wort und Tat sollen denselben Ring tragen — sonst schweigen.' },
      { day: 5, title: 'Sippe / Selbst', text: 'Beides braucht Maß. Wo warst du einseitig — zu viel für andere, zu wenig für dich, oder umgekehrt?' },
      { day: 6, title: 'Ahnenlicht', text: 'Kurzer Dank an Linie oder Lehrer — ohne Forderung an Tote oder Lebende. Stein, Ring oder nur Atem.' },
      { day: 7, title: 'Ring schließen', text: 'Woche ehren. Was bleibt als Haltung? Frith im Haus und in dir — kein Fluch, kein Pathos.' }
    ],
    voodoo: [
      { day: 1, title: 'Haus ansehen', text: 'Einen Raum ruhig betrachten. Nur Hauspraxis — keine Lwa-Anrufung als Medium, keine Initiation hier.' },
      { day: 2, title: 'Wasser', text: 'Wasser bereithalten oder Raum feucht abwischen. Respekt beginnt im Sichtbaren. Frisch, schlicht, sicher.' },
      { day: 3, title: 'Licht', text: 'Kerze oder Lampe: Klarheit im Haus, kein Medium. Brandsicherheit zuerst. Dienst am Raum, nicht am Spektakel.' },
      { day: 4, title: 'Reinheit kurz', text: 'Eine Ecke ordnen. Reinheit beginnt im Sichtbaren — Staub, Geruch, Unordnung. Ein Handgriff genügt.' },
      { day: 5, title: 'Respekt-Satz', text: '„Nur Hauspraxis, keine Initiation.“ Laut oder still. Tradition ehren, ohne sie hier zu besitzen.' },
      { day: 6, title: 'Stille im Haus', text: 'Zwei Minuten Stille am Hausplatz. Kein Spektakel, kein Messen. Atem und Raum.' },
      { day: 7, title: 'Schließen', text: 'Licht aus / Wasser wegräumen. Alltag nimmt Raum. Was dem Haus dient, bleibt Haltung.' }
    ],
    santeria: [
      { day: 1, title: 'Hausraum', text: 'Einen Ort im Haus klären. Ile bleibt Tradition — hier nur öffentliche Hauspraxis ohne Einweihung.' },
      { day: 2, title: 'Wasser & Ordnung', text: 'Frischwasser oder saubere Fläche. Respekt ohne Initiation. Weniger Gegenstände, mehr Klarheit.' },
      { day: 3, title: 'Licht halten', text: 'Ruhiges Licht. Keine Orisha-Ansprüche hier. Brandsicherheit. Dank vor Wunsch.' },
      { day: 4, title: 'Reinheit prüfen', text: 'Was stört den Raum? Ein kleines Aufräumen. Weißes Tuch oder klare Fläche als Symbol.' },
      { day: 5, title: 'Grenze sprechen', text: '„Hauspraxis. Keine Einweihung hier.“ Respekt vor geschlossener Tradition — ohne Besitz.' },
      { day: 6, title: 'Dank ohne Forderung', text: 'Ein stiller Dank — ohne Medium, ohne Besitz, ohne Arbeit gegen Personen.' },
      { day: 7, title: 'Alltag siegeln', text: 'Praxis schließen. Verantwortung im Alltag. Licht aus, Wasser achten, Raum freigeben.' }
    ],
    hermetik: [
      { day: 1, title: 'Stunde notieren', text: 'Welche Planetenstunde ungefähr? Ein Wort dazu (Näherung) — kein Orakel-Zwang, nur Orientierung für den Operator.' },
      { day: 2, title: 'Entsprechung', text: 'Ein Paar: oben/unten oder innen/außen — kurz beobachten. As above, so below: Haltung, nicht Magie-Show.' },
      { day: 3, title: 'Atem der Klarheit', text: 'Vier ruhige Züge. Geist vor Spektakel. Der Operator bleibt Mensch — nüchtern und klar.' },
      { day: 4, title: 'Maß der Absicht', text: 'Eine Absicht prüfen: haltbar, proportioniert, ohne Schaden an Personen? Sonst streichen.' },
      { day: 5, title: 'Studium kurz', text: 'Einen Satz lesen oder erinnern. Verdauen, nicht sammeln. Wissen ohne Ethik ist leerer Glanz.' },
      { day: 6, title: 'Arbeit & Ruhe', text: 'Wo war Ungleichgewicht? Eine Korrektur wählen — Solve oder Coagula im Kleinen.' },
      { day: 7, title: 'Siegel der Woche', text: 'Was bleibt als Haltung? Notieren, Symbol lösen, schließen. Maß hält.' }
    ],
    wicca: [
      { day: 1, title: 'Schutz', text: 'Kleine Grenze: Hand am Türrahmen oder Blickkreis. „Hier halte ich.“ An es harm none beginnt hier.' },
      { day: 2, title: 'Reinigung', text: 'Wasser an den Händen oder frische Luft — was nicht dient, darf gehen. Ohne Drama, mit Maß.' },
      { day: 3, title: 'Anziehen', text: 'Eine ethische Gabe oder Absicht setzen — klein, gegen niemanden, ohne Besitzanspruch.' },
      { day: 4, title: 'Loslassen', text: 'Einen Satz entlassen. Ergebnis nicht jagen. Schweigen als Praxis — Kreis hält ohne Zwang.' },
      { day: 5, title: 'Kreis-Mini', text: 'Raum markieren. Vier Elemente kurz grüßen. Kreis halten, dann bewusst öffnen.' },
      { day: 6, title: 'Jahresrad-Atem', text: 'Welches Fest-Ton ist nah? Ein Satz Praxis — nicht nur Datum im Kalender.' },
      { day: 7, title: 'Schließen', text: 'Elemente danken. Kreis öffnen. Alltag frei. Was bleibt, ist Haltung, nicht Theater.' }
    ],
    chaosmagie: [
      { day: 1, title: 'Modell wählen', text: 'Welches Modell dient heute — und darf wieder weg? Eins genügt. Dogma stapeln schwächt.' },
      { day: 2, title: 'Sigil-Keim', text: 'Eine ethische Absicht skizzieren (noch nicht laden). Gegen niemanden. Klein und klar.' },
      { day: 3, title: 'Gnosis-Mini', text: '30–60 Sekunden Fokus oder Atem — dann lockern. Kein Zwang, kein Drama.' },
      { day: 4, title: 'Ergebnis-Jagd stoppen', text: 'Bewusst ablenken. Nicht nachchecken. Vergessen ist Teil der Technik.' },
      { day: 5, title: 'Ethik-Check', text: 'Hält die Absicht ohne Schaden an Personen — auch nicht „zum Spaß“? Sonst streichen.' },
      { day: 6, title: 'Vergessen als Praxis', text: 'Absicht ablegen. Alltag vor Modell. Banishing-Punkt: klarer Schnitt.' },
      { day: 7, title: 'Woche reset', text: 'Modelle stapeln? Eins behalten, Rest streichen. Labor aufräumen — ethisch und schlicht.' }
    ],
    esoterik: [
      { day: 1, title: 'Schwelle', text: 'Ankommen. Daten bleiben bei dir. Ein Handy misst keine Geister. Ein Atemzug an der Schwelle genügt.' },
      { day: 2, title: 'Atem 4/6', text: 'Kurz 4 ein — 6 aus. Feldlicht begleiten. Praxiswerkzeug, kein Schaukasten.' },
      { day: 3, title: 'Intention', text: 'Ein klarer Satz in Gegenwart. Ethisch, klein, ohne Schaden. Ergebnis nicht erzwingen.' },
      { day: 4, title: 'Ausgleich', text: 'Was gibst du dem Tag zurück? Ruhe, Ordnung oder ein ehrliches Wort. Grenze und Ausgleich.' },
      { day: 5, title: 'Mond-Achtung', text: 'Phase wahrnehmen (Näherung). Ohne Astro-Anspruch — Fenster zur Praxis, kein Orakel-Zwang.' },
      { day: 6, title: 'Notiz lokal', text: 'Einen Satz ins Magie-Buch oder Notizen — nur auf diesem Gerät. Kein Upload, kein Sync.' },
      { day: 7, title: 'Durchgehen', text: 'Schwelle halten und öffnen. Woche schließen. Was bleibt, bleibt Haltung — still und klar.' }
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
    chaosmagie: { id: 'labor-check', title: 'Labor-Check', kind: 'checks', fields: [
      { id: 'ethik', label: 'Ethik geprüft' }, { id: 'statement', label: 'Statement positiv' },
      { id: 'gnosis', label: 'Gnosis kurz' }, { id: 'vergessen', label: 'Vergessen geplant' }
    ]},
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
    esoterik: { id: 'klarheit-check', title: 'Klarheit-Check', kind: 'checks', fields: [
      { id: 'absicht', label: 'Absicht klar' }, { id: 'grenze', label: 'Grenze geprüft' },
      { id: 'ausgleich', label: 'Ausgleich bedacht' }, { id: 'alltag', label: 'Alltag ehren' }
    ]}
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
      { kind: 'ritual', title: 'Trommelpuls', text: '≈ 11 Min · Körper zuerst — Puls, Atem, ohne Spektakel.', ritualId: 'trommel-atem', cta: 'Trommelpuls starten' },
      { kind: 'ritual', title: 'Spurlesen', text: '≈ 11 Min · Drei Spuren achtsam lesen — eine Deutung reicht.', ritualId: 'spurlesen', cta: 'Spurlesen starten' },
      { kind: 'ritual', title: 'Knochenlicht', text: '≈ 11 Min · Ahnenlicht ehren — still, ohne zu messen.', ritualId: 'ahnenlicht-schaman', cta: 'Knochenlicht starten' },
      { kind: 'ritual', title: 'Rauchbrücke', text: '≈ 11 Min · Raum klären mit Atem oder Rauch — Symbol.', ritualId: 'rauchbruecke', cta: 'Rauchbrücke starten' },
      { kind: 'ritual', title: 'Rückkehrband', text: '≈ 3 Min · Sanft zurück in den Körper — die Reise darf enden.', ritualId: 'rueckkehrband', cta: 'Rückkehrband' }
    ],
    nordisch: [
      { kind: 'ritual', title: 'Ringwort', text: '≈ 11 Min · Ein Wort, das du hältst — ruhig und mit Maß.', ritualId: 'mass-eid', cta: 'Ringwort starten' },
      { kind: 'ritual', title: 'Thing-Pause', text: '≈ 11 Min · Erst schweigen, dann sprechen — wägen wie im Thing.', ritualId: 'thing-pause', cta: 'Thing-Pause starten' },
      { kind: 'ritual', title: 'Gastgabe', text: '≈ 11 Min · Geben ohne Forderung — Ausgleich mit Wärme.', ritualId: 'gabe', cta: 'Gastgabe starten' },
      { kind: 'ritual', title: 'Frith-Grenze', text: '≈ 11 Min · Friedensraum halten — Grenze ohne Angriff.', ritualId: 'frith-grenze', cta: 'Frith-Grenze' },
      { kind: 'ritual', title: 'Ahnenstein', text: '≈ 3 Min · Stein als Gedächtnis — tragen, nicht beschwören.', ritualId: 'ahnenstein', cta: 'Ahnenstein' }
    ],
    voodoo: [
      { kind: 'ritual', title: 'Schwellenwasser', text: '≈ 11 Min · Hauspraxis weich: Schwelle, Wasser, Licht — kein Medium.', ritualId: 'hausreinigung-voodoo', cta: 'Schwellenwasser starten' },
      { kind: 'ritual', title: 'Hofkehren', text: '≈ 11 Min · Fegen als Praxis — Bewegung klärt den Hof sanft.', ritualId: 'hofkehren', cta: 'Hofkehren starten' },
      { kind: 'ritual', title: 'Weißes Licht', text: '≈ 11 Min · Licht und Wasser — danken, schließen.', ritualId: 'licht-wasser', cta: 'Weißes Licht starten' },
      { kind: 'ritual', title: 'Dienst-Licht', text: '≈ 21 Min · Licht als Dienst am Haus — unter Aufsicht.', ritualId: 'dienst-licht', cta: 'Dienst-Licht' },
      { kind: 'ritual', title: 'Stiller Altar', text: '≈ 3 Min · Hausecke prüfen — Ordnung, ohne Anrufung.', ritualId: 'stiller-altar', cta: 'Stiller Altar' }
    ],
    santeria: [
      { kind: 'ritual', title: 'Drei Danke', text: '≈ 3 Min · Dank vor Forderung — kurz, warm, geschlossen.', ritualId: 'dank-ache', cta: 'Drei Danke starten' },
      { kind: 'ritual', title: 'Haus-Aché', text: '≈ 11 Min · Reinheit und Dank — Hauspraxis ohne Ile-Anspruch.', ritualId: 'reinigung-ache', cta: 'Haus-Aché starten' },
      { kind: 'ritual', title: 'Weißes Tuch', text: '≈ 11 Min · Klare Fläche legen — Reinheit sichtbar.', ritualId: 'weisses-tuch', cta: 'Weißes Tuch starten' },
      { kind: 'ritual', title: 'Obstgabe Haus', text: '≈ 11 Min · Obst oder Wasser als Dankgabe — teilen.', ritualId: 'obstgabe-haus', cta: 'Obstgabe starten' },
      { kind: 'ritual', title: 'Morgenwasser', text: '≈ 3 Min · Hände oder Gesicht — Aché als Frische.', ritualId: 'morgenwasser', cta: 'Morgenwasser' }
    ],
    hermetik: [
      { kind: 'ritual', title: 'Operator-Stunde', text: '≈ 11 Min · Stunde halten — erst schauen, dann bewegen.', ritualId: 'stunden-halten', cta: 'Operator-Stunde' },
      { kind: 'ritual', title: 'Vier-Tafel', text: '≈ 11 Min · Vier Entsprechungen ordnen — Maß statt Orakelzwang.', ritualId: 'vier-tafel', cta: 'Vier-Tafel starten' },
      { kind: 'ritual', title: 'Solve et Coagula', text: '≈ 11 Min · Lösen und binden im Atem — ein kleines Labor.', ritualId: 'solve-coagula', cta: 'Solve et Coagula' },
      { kind: 'ritual', title: 'Siegel der Proportion', text: '≈ 11 Min · Werkzeug weihen — klar, begrenzt.', ritualId: 'weihe-hermetik', cta: 'Siegel starten' },
      { kind: 'ritual', title: 'Labor-Notiz', text: '≈ 3 Min · Eine Beobachtung — neugierig, ohne Deutung.', ritualId: 'labor-notiz', cta: 'Labor-Notiz' }
    ],
    wicca: [
      { kind: 'ritual', title: 'Vier-Wege', text: '≈ 11 Min · Erde, Luft, Feuer, Wasser — Schutz und Rede zuerst.', ritualId: 'elemente', cta: 'Vier-Wege starten' },
      { kind: 'ritual', title: 'Mondkreis', text: '≈ 11 Min · Mondphase als Fenster — setzen, klären oder lösen.', ritualId: 'mondkreis-klein', cta: 'Mondkreis starten' },
      { kind: 'ritual', title: 'Schutz & Reinigung', text: '≈ 11 Min · Grenze halten, Raum klären — freundlich, ohne Angriff.', ritualId: 'schutz-reinigung', cta: 'Schutz starten' },
      { kind: 'ritual', title: 'Anziehen / Loslassen', text: '≈ 11 Min · Ethisch anziehen oder bewusst, weich entlassen.', ritualId: 'anziehen-loslassen', cta: 'Werk starten' },
      { kind: 'ritual', title: 'Rede-Check', text: '≈ 3 Min · Schadet es jemandem? Kurz, ehrlich, klar.', ritualId: 'rede-check', cta: 'Rede-Check' }
    ],
    chaosmagie: [
      { kind: 'ritual', title: 'Vergiss-Schnitt', text: '≈ 3 Min · Was geladen ist, darf leicht gehen.', ritualId: 'vergessen', cta: 'Vergiss-Schnitt' },
      { kind: 'ritual', title: 'Gnosis-Schnitt', text: '≈ 11 Min · Laden, schneiden, vergessen — Ethik zuerst, spielerisch.', ritualId: 'sigil-gnosis', cta: 'Gnosis-Schnitt' },
      { kind: 'ritual', title: 'Modell-Wechsel', text: '≈ 11 Min · Modell wählen — und wieder ablegen dürfen.', ritualId: 'modell-wechsel', cta: 'Modell-Wechsel' },
      { kind: 'ritual', title: '369-Labor', text: '≈ 11 Min · Ethischer Satz · 3 / 6 / 9 — dann loslassen.', ritualId: '369', cta: '369-Labor' },
      { kind: 'ritual', title: 'Banishing-Punkt', text: '≈ 3 Min · Kurzer Reset — Raum klären, ohne Theater.', ritualId: 'banishing-punkt', cta: 'Banishing-Punkt' }
    ],
    esoterik: [
      { kind: 'ritual', title: 'Lostag-Stille', text: '≈ 3 Min · Achtung ohne Orakel-Zwang — still und klar.', ritualId: 'lostag-achtung', cta: 'Lostag-Stille' },
      { kind: 'ritual', title: 'Feldlicht-Schwelle', text: '≈ 11 Min · Eine klare Schwelle — Praxis, weich und klar.', ritualId: 'schwelle', cta: 'Schwelle starten' },
      { kind: 'ritual', title: 'Mondfenster', text: '≈ 11 Min · Setzen oder lösen — mit Grenze, Ausgleich, Wärme.', ritualId: 'mondarbeit', cta: 'Mondfenster starten' },
      { kind: 'ritual', title: 'Zahlen-Klarheit', text: '≈ 11 Min · Eine Zahl als Fokus — klar, ohne Schicksalsglaube.', ritualId: 'zahlen-klarheit', cta: 'Zahlen-Klarheit' },
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
   * Kategorien: herbs, kitchen, offerings (Opfergaben), stones, colors, tools, links (Bezüge/Hilfsmittel).
   * Jeder Eintrag: { name, description } — Symbolik/Hauspraxis, kein Heilversprechen,
   * keine Anleitung zu Schaden oder illegalem Handeln.
   */
  const CORRESPONDENCES = {
    schamanismus: {
      herbs: [
        { name: "Beifuß", description: "Klassisches Räucher-Symbol für Schwelle und Reise — Raum klären, ohne Geister zu fordern.", ico: "🌾" },
        { name: "Wacholder", description: "Harziger Duft als Raum- und Grenzzeichen. Hauspraxis: frische Luft und Maß statt Spektakel.", ico: "🌲" },
        { name: "Birke", description: "Neubeginn und weiches Licht nach der Dunkelheit — Blatt oder Zweig als Gabe an den Alltag.", ico: "🌳" },
        { name: "Weide", description: "Biegsamkeit und Fluss: was weicht, bricht nicht. Symbol für Loslassen ohne Drama.", ico: "🎋" },
        { name: "Fichte", description: "Harz und Nadel als Wald-Anker — Stand spüren, Körper zuerst, bevor die Reise beginnt.", ico: "🎄" },
        { name: "Salbei", description: "Klarheit im Raum als Haltung — Duft und Absicht", ico: "🍃" },
        { name: "Tabak (symbolisch)", description: "Gabe und Respekt in manchen Linien — hier nur als Symbol, nie als Rauchzwang oder Initiation.", ico: "🍂" },
      ],
      kitchen: [
        { name: "Salz", description: "Hausmittel: Kreis und Grenze am Herd — Prise als Merkzeichen", ico: "🧂" },
        { name: "Honig", description: "Hausmittel: süße Gabe an den Alltag — teilen statt fordern, Symbol für Wärme ohne Spektakel.", ico: "🍯" },
        { name: "Öl", description: "Hausmittel: Salbung als Haltung — Tropfen am Blickfang, nicht als Heilsalbe.", ico: "🫒" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit am Tisch — Fokus-Symbol, kein Rezept und", ico: "🌶️" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen.", ico: "🍬" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
        { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Tabak (Symbol)", description: "Opfergabe: Respekt-Gabe in manchen Linien — hier nur Symbol; Körper zuerst, nie Rauchzwang, nie Geister fordern, keine Initiation.", ico: "🍂" },
        { name: "Wasser", description: "Opfergabe: Fluss und Atem — Schale ablegen; Haltung vor Spektakel.", ico: "💧" },
        { name: "Rauch", description: "Opfergabe: sichtbare Schwelle — Räucherwerk mit Maß und frischer Luft.", ico: "💨" },
        { name: "Obst", description: "Opfergabe: Frucht an den Alltag — ablegen, später teilen oder zurückgeben.", ico: "🍇" },
        { name: "Dankgabe", description: "Opfergabe: Wort und Atem als Dank — ohne Geister zu fordern.", ico: "🙏" },
        { name: "Alkohol", description: "Opfergabe: Tropfen oder Becher nur als Symbol — Körper zuerst; Maß und Ethik, kein Trinkzwang, kein Missbrauch.", ico: "🥂" },
      ],
      stones: [
        { name: "Obsidian", description: "Blickfang für Schutz-Grenze — dunkler Schnitt als Symbol", ico: "🌑" },
        { name: "Rauchquarz", description: "Altarstein für Klarheit im Raum — Haltung und Atem, kein Messversprechen.", ico: "🌁" },
        { name: "Hämatit", description: "Erdungs-Blickfang: schwer und nah am Boden — Körper zuerst, bevor die Reise beginnt.", ico: "⚓" },
        { name: "Flint", description: "Funke und Feuerstein-Symbol — Herd und Stand, ohne Spektakel.", ico: "💥" },
        { name: "Holzperle", description: "Wald-Anker aus dem Alltag — Gabe, die man berühren kann, kein Amulettzwang.", ico: "📿" },
        { name: "Knochenweiß-Stein", description: "Schlichtes Merkzeichen für Ahnenachtung — Symbolik, keine Geisterforderung.", ico: "⬜" },
      ],
      colors: [
        { name: "Erdbraun", description: "Altarfarbe / Tuch: Stand und Boden — Alltag ehren statt Pathos.", ico: "🟫" },
        { name: "Waldgrün", description: "Altarfarbe: Wachstum mit Maß — Blickfang für den Kreis", ico: "🥜" },
        { name: "Knochenweiß", description: "Altarfarbe / Kerze: Schlichtheit und Gabe — rein als Symbol.", ico: "🦴" },
        { name: "Rauchgrau", description: "Altarfarbe: Schwelle und Atem — Raum klären als Haltung.", ico: "🌬️" },
        { name: "Herbstrot", description: "Kerze oder Tuch: Wärme am Herd — teilen, nicht greifen.", ico: "🍁" },
        { name: "Nachtblau", description: "Altarfarbe für stille Reise — nur geerdet, ohne Drama.", ico: "🌌" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: kleines Herdlicht — Schwelle markieren, ohne Geister zu fordern.", ico: "🕯️" },
        { name: "Trommel (Symbol)", description: "Werkzeug: Rhythmus und Atem — Körper zuerst, Reise nur geerdet.", ico: "🥁" },
        { name: "Becher", description: "Werkzeug: Gabe und Wasser — teilen, nicht spekulieren.", ico: "🏺" },
        { name: "Faden", description: "Werkzeug: Verbindung und Maß — knüpfen als Haltung, nicht als Fesselung anderer.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Blick zurück auf den eigenen Stand — kein Orakelzwang.", ico: "🪞" },
        { name: "Besen", description: "Werkzeug: Raum kehren als Ordnung — Alltag ehren", ico: "🧹" },
        { name: "Kreide", description: "Werkzeug: Kreis und Grenze zeichnen — Symbolik, kein Bann gegen Personen.", ico: "✏️" },
        { name: "Räucherschale", description: "Werkzeug: Duft und Atem im Raum — Maß statt Spektakel.", ico: "⚪" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Wald- und Schwellen-Ton: Körper zuerst, keine Geister fordern.", ico: "🪙" },
      ],
      elements: ["Erde (Stand)", "Luft (Atem)", "Feuer (Herd)", "Wasser (Fluss)"],
      note: "Hauspraxis und Symbolik — kein medizinischer Rat, kein Heilversprechen."
    },
    nordisch: {
      herbs: [
        { name: "Eichenblatt", description: "Maß und Stand im Ring — Stärke ohne Prahlerei, Wort und Tat im selben Kreis.", ico: "🌰" },
        { name: "Wermut", description: "Bittere Grenze: was nicht dient, bleibt draußen. Symbol für Frith und klare Haltung.", ico: "🍸" },
        { name: "Thymian", description: "Haus und Herd — kleine Gabe auf dem Tisch, Alltag ehren statt Pathos.", ico: "☘️" },
        { name: "Wacholder", description: "Nordischer Raumduft: Reinigung als Ordnung im Haus, nicht als Heilmittel.", ico: "🌲" },
        { name: "Birke", description: "Frühlicht und Neubeginn — Yule-/Ostara-Ton: Keim mit Maß setzen.", ico: "🌳" },
        { name: "Beifuß", description: "Räucher- und Traum-Symbol mit Vorsicht — Reise nur geerdet, Eid vor Spektakel.", ico: "🌾" },
        { name: "Angelika", description: "Schutz- und Wege-Kraut in der Volkspraxis — hier als Haltung: klar gehen, nichts erzwingen.", ico: "💚" },
      ],
      kitchen: [
        { name: "Salz", description: "Hausmittel: Frith und Grenze am Tisch — Prise als Eid-Symbol", ico: "🧂" },
        { name: "Honig", description: "Hausmittel: süße Gabe im Ring — teilen, Wort halten", ico: "🍯" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Maß und Atem", ico: "⭐" },
        { name: "Öl", description: "Hausmittel: Tropfen am Blickfang oder Brot — Haltung der Versorgung, keine Salbung als Heilspruch.", ico: "🫒" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen.", ico: "🍬" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit — Fokus-Symbol am Tisch", ico: "🌶️" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
        { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
      ],
      offerings: [
        { name: "Met", description: "Opfergabe: Honigwein als Gabe und Eid im Ring — teilen, Wort halten; Maß und Ethik, kein Trinkzwang, kein Missbrauch.", ico: "🐝" },
        { name: "Bier", description: "Opfergabe: Herd und Gemeinschaft — Becher als Alltagseid; Maß vor Pathos, kein Rauschzwang.", ico: "🍺" },
        { name: "Brot", description: "Opfergabe: Versorgung im Ring — Stück teilen, Wort halten.", ico: "🍞" },
        { name: "Honig", description: "Opfergabe: süße Gabe — teilen statt fordern.", ico: "🍯" },
        { name: "Dankgabe", description: "Opfergabe: Ehre und schlichter Dank — Frith vor Pathos.", ico: "🙏" },
        { name: "Münze", description: "Opfergabe: Ausgleich und Gabe — kein Kauf von Willen.", ico: "🪙" },
      ],
      stones: [
        { name: "Bernstein", description: "Wärme-Blickfang — Honigton am Altar, Symbol nicht Therapie.", ico: "🟠" },
        { name: "Flint", description: "Funke und Feuerstein — Herd und Stand im Ring.", ico: "💥" },
        { name: "Granit", description: "Schwerer Stand-Stein — Maß ohne Prahlerei. Erdung nach der Praxis.", ico: "🗻" },
        { name: "Kiesel vom Weg", description: "Alltags-Blickfang: klar gehen, nichts erzwingen.", ico: "🪨" },
        { name: "Eisengrau-Stein", description: "Grenze und Frith — kühler Merkstein, kein Amulettzwang.", ico: "⛓️" },
        { name: "Quarzader", description: "Heller Schnitt im Gestein — Klarheit des Worts als Symbol.", ico: "〰️" },
      ],
      colors: [
        { name: "Nordblau", description: "Altarfarbe: Weite und kühle Klarheit — Tuch oder Kerze.", ico: "🥶" },
        { name: "Eisengrau", description: "Altarfarbe: Stand und Werkzeugton — Alltag ehren.", ico: "⚙️" },
        { name: "Honiggold", description: "Altarfarbe / Kerze: Wärme und Gabe im Ring.", ico: "🟨" },
        { name: "Tannengrün", description: "Altarfarbe: Yule- und Waldton — Keim mit Maß.", ico: "🌽" },
        { name: "Knochenweiß", description: "Altarfarbe: schlichte Reinheit als Symbol", ico: "🦴" },
        { name: "Blutrot (mit Maß)", description: "Kerze nur mit Ethik — Kraft-Symbol, nie gegen den Willen anderer.", ico: "❣️" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Herdlicht im Ring — Wort und Tat im selben Kreis.", ico: "🕯️" },
        { name: "Horn / Becher", description: "Werkzeug: Gabe und Eid-Symbol — teilen, Frith halten.", ico: "📯" },
        { name: "Kreide", description: "Werkzeug: Grenze markieren — was nicht dient, bleibt draußen.", ico: "✏️" },
        { name: "Faden", description: "Werkzeug: Band und Maß — knüpfen ohne fremden Willen zu binden.", ico: "🧵" },
        { name: "Besen", description: "Werkzeug: Haus kehren vor dem Blót-Ton — Ordnung, kein Spektakel.", ico: "🧹" },
        { name: "Spiegel", description: "Werkzeug: Klarheit des Worts — sich selbst prüfen.", ico: "🪞" },
        { name: "Messer (Haus)", description: "Werkzeug: Schnitt und Versorgung — ethisch, nie gegen Personen gerichtet.", ico: "🔪" },
        { name: "Schlüssel", description: "Werkzeug: Hof und Schwelle — öffnen und schließen mit Maß.", ico: "🔑" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Ring- und Frith-Ton: Wort halten, Maß im Kreis.", ico: "🪙" },
      ],
      elements: ["Erde (Ring)", "Wasser (Klarheit)", "Feuer (Herd)", "Luft (Wort)"],
      note: "Symbole für Haltung und Haus — keine medizinischen Aussagen."
    },
    voodoo: {
      herbs: [
        { name: "Basilikum", description: "Hausfrieden und Frische — Topfpflanze oder Blatt als Zeichen von Ordnung, keine Initiation.", ico: "🥬" },
        { name: "Lorbeer", description: "Klarheit und Würde im Haus — Blatt als Merkzeichen, nicht als Orakelzwang.", ico: "🎖️" },
        { name: "Minze", description: "Frisch und hell: Schwelle und Atem. Wasser und Duft reichen oft für den Alltag.", ico: "🌱" },
        { name: "Petersilie", description: "Einfache Gabe und Grün am Tisch — Respekt im Haus, ohne Medium zu spielen.", ico: "🍩" },
        { name: "Rosmarin", description: "Erinnerung und Hausgrenze — Räucher- oder Hausmittel-Symbol mit klarer Ethik.", ico: "🌿" },
        { name: "Salbei", description: "Raumklarheit am Hof — Duft und Ordnung, keine Initiation.", ico: "🍃" },
        { name: "Thymian", description: "Hauskraft am Tisch — Alltag ehren, kein Medium spielen.", ico: "☘️" },
      ],
      kitchen: [
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Symbol am Eingang — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
        { name: "Zimt", description: "Hausmittel: Wärme und Willkommen — Duft für den Hof, nicht für Spektakel oder Heilversprechen.", ico: "🟤" },
        { name: "Salz", description: "Hausmittel: Schwelle und Ordnung — Prise als Merkzeichen, keine Initiation.", ico: "🧂" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Willkommen — teilen statt binden, Symbolik ohne Heilversprechen.", ico: "🍬" },
        { name: "Öl", description: "Hausmittel: Licht und Pflege am Blickfang — Tropfen als Haltung, nicht als Heilsalbe.", ico: "🫒" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze — Symbol am Eingang, kein medizinischer Claim und kein Zwang.", ico: "🧄" },
        { name: "Honig", description: "Hausmittel: Wärme und Gabe — Tropfen oder Schälchen als Symbol", ico: "🍯" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit — Fokus-Symbol am Tisch", ico: "🌶️" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Rum", description: "Opfergabe: klassische Willkommens-Gabe am Hof — Schälchen oder Tropfen; öffentliche Hauspraxis nur, Maß und Ethik, kein Trinkzwang, kein Missbrauch, keine Initiation.", ico: "🧉" },
        { name: "Wasser", description: "Opfergabe: Reinheit und Schwelle am Hof — Schale ablegen, Ordnung ohne Medium.", ico: "💧" },
        { name: "Obst", description: "Opfergabe: frische Frucht ablegen — teilen oder später ehren; öffentliche Praxis nur.", ico: "🍇" },
        { name: "Süßes", description: "Opfergabe: Willkommen und Wärme — Schälchen ablegen, teilen statt binden.", ico: "🍭" },
        { name: "Kerze", description: "Opfergabe: Licht am Hof — zünden und löschen; keine Initiation.", ico: "🕯️" },
        { name: "Blumen", description: "Opfergabe: Farbe und Respekt — ethisch gewählt, öffentliche Praxis.", ico: "💐" },
        { name: "Wein", description: "Opfergabe: Gabe und Respekt — Tropfen oder Becher; Maß, kein Medium, kein Missbrauch.", ico: "🍷" },
        { name: "Tabak (Symbol)", description: "Opfergabe: Respekt-Symbol — nie Rauchzwang, nie Initiation.", ico: "🍂" },
      ],
      stones: [
        { name: "Muschel", description: "Wasser-Blickfang — Schwelle und Atem, öffentliche Hauspraxis nur.", ico: "🐚" },
        { name: "Quarz", description: "Licht-Stein am Altar — Klarheit ohne Medium zu spielen.", ico: "🟦" },
        { name: "Lava", description: "Boden und Wärme — Stand im Hof, kein Spektakel.", ico: "🌋" },
        { name: "Korallenstück (Symbol)", description: "Meer-Ton als Blickfang — Respekt, keine Initiation.", ico: "🏝️" },
        { name: "Flusskiesel", description: "Schlichtes Merkzeichen für Fluss und Maß — vom Weg, ohne Mythos-Zwang.", ico: "🌊" },
        { name: "Tonperle", description: "Hausgemachter Blickfang — Ordnung und Gabe, nicht Orakelzwang.", ico: "🥠" },
      ],
      colors: [
        { name: "Weiß", description: "Altarfarbe / Kerze: Reinheit-Symbol — Haltung", ico: "🍄" },
        { name: "Blau", description: "Altarfarbe: Ruhe und Wasser-Ton am Hof.", ico: "🎍" },
        { name: "Rot (mit Maß)", description: "Kerze: Kraft-Symbol — Ethik zuerst, nie fremden Willen binden.", ico: "❤️‍🔥" },
        { name: "Grün", description: "Altarfarbe: Wachstum und Hausfrieden.", ico: "🟩" },
        { name: "Gelb", description: "Altarfarbe: Willkommen und Licht — teilen statt fordern.", ico: "🍜" },
        { name: "Schwarz", description: "Altarfarbe: Grenze und Schweigen — öffentliche Praxis nur.", ico: "⬛" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Licht am Hof — öffentliche Hauspraxis, keine Initiation.", ico: "🕯️" },
        { name: "Becher", description: "Werkzeug: Wasser und Gabe — Respekt im Haus.", ico: "🏺" },
        { name: "Kreide", description: "Werkzeug: Markierung am Boden als Symbol — kein Medium spielen.", ico: "✏️" },
        { name: "Faden", description: "Werkzeug: Verbindung knüpfen — Ethik: keinen fremden Willen binden.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Klarheit und Grenze — Blickfang, kein Orakelzwang.", ico: "🪞" },
        { name: "Besen", description: "Werkzeug: Schwelle kehren — Ordnung und Willkommen.", ico: "🧹" },
        { name: "Glocke", description: "Werkzeug: Ruf und Maß — Ton setzen, nicht zwingen.", ico: "🔔" },
        { name: "Schale", description: "Werkzeug: Opfergabe teilen — öffentliche Praxis nur.", ico: "🍽️" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Hof-Ton: nur öffentliche Praxis, keine Initiation.", ico: "🪙" },
      ],
      elements: ["Wasser (Schwelle)", "Erde (Hof)", "Feuer (Licht)", "Luft (Atem)"],
      note: "Nur öffentliche Hauspraxis. Keine Initiation, keine medizinischen Claims."
    },
    santeria: {
      herbs: [
        { name: "Rosmarin", description: "Hausklarheit und Schutz-Ton — Duft und Ordnung, ohne Ile-Anspruch.", ico: "🌿" },
        { name: "Orange", description: "Dank und Frische — Schale oder Duft als Gabe, teilen statt fordern.", ico: "🧡" },
        { name: "Lavendel", description: "Ruhe-Symbol für den Raum — sanft, ethisch, ohne Betäubungsversprechen.", ico: "🪻" },
        { name: "Basilikum", description: "Grünes Haus-Aché im Alltag — Topf am Fenster als Haltung, nicht als Ritus der Einweihung.", ico: "🥬" },
        { name: "Minze", description: "Reinheit und Frische — Wasser und Blatt als Alltagspraxis.", ico: "🌱" },
        { name: "Lorbeer", description: "Klarheit und Würde — Blatt als Merkzeichen für Dank und Haltung.", ico: "🎖️" },
      ],
      kitchen: [
        { name: "Nelke", description: "Hausmittel / Würze: würzige Grenze und Wärme — Symbol am Altarlicht, mit Respekt und Maß.", ico: "🌺" },
        { name: "Salz", description: "Hausmittel: Reinheit-Symbol am Haus — Prise als Haltung, ohne Ile-Anspruch.", ico: "🧂" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Dank — teilen, nicht fordern.", ico: "🍬" },
        { name: "Honig", description: "Hausmittel: Wärme und Willkommen — Tropfen oder Schälchen als Symbol", ico: "🍯" },
        { name: "Öl", description: "Hausmittel: Lichtpflege und Gabe — Tropfen am Blickfang, keine Heilsalbung.", ico: "🫒" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit — Fokus-Symbol am Tisch", ico: "🌶️" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Rum", description: "Opfergabe: warme Gabe und Dank am Hausaltar — Schälchen ablegen; ohne Ile-Anspruch, Maß und Ethik, kein Trinkzwang, kein Missbrauch.", ico: "🧉" },
        { name: "Wasser", description: "Opfergabe: Reinheit und Fluss — Schale als Haltung, keine Initiation.", ico: "💧" },
        { name: "Obst", description: "Opfergabe: frische Frucht und Dank — ablegen und teilen; Respekt ohne Ile-Anspruch.", ico: "🍇" },
        { name: "Honig", description: "Opfergabe: süße Wärme — Tropfen oder Schälchen, teilen statt fordern.", ico: "🍯" },
        { name: "Blumen", description: "Opfergabe: Farbe und Würde — ethisch gewählt.", ico: "💐" },
        { name: "Kerze", description: "Opfergabe: Licht und Dank — Brandschutz achten, keine Initiation.", ico: "🕯️" },
        { name: "Wein", description: "Opfergabe: Bund-Symbol — Tropfen ehren; Respekt und Maß, kein Missbrauch.", ico: "🍷" },
        { name: "Süßes", description: "Opfergabe: Willkommen — teilen mit Maß, ohne Trinkzwang und ohne Forderung.", ico: "🍭" },
      ],
      stones: [
        { name: "Koralle", description: "Meer-Blickfang — Symbol für Fluss und Haus, kein Ile-Anspruch.", ico: "🪸" },
        { name: "Citrin", description: "Licht-Stein am Altar — Dank und Frische als Haltung.", ico: "🔆" },
        { name: "Mondstein", description: "Zyklus-Blickfang — Phase achten, nichts erzwingen.", ico: "🌙" },
        { name: "Muschelweiß", description: "Schlichter Wasser-Ton — Reinheit als Symbol", ico: "🤍" },
        { name: "Bergkristall", description: "Klarer Fokus-Stein — Haltung, nicht Messung.", ico: "💎" },
        { name: "Grüner Achat", description: "Wachstums-Blickfang — Alltag und Haus ehren.", ico: "🟢" },
      ],
      colors: [
        { name: "Weiß", description: "Altarfarbe / Kerze: Reinheit-Symbol und Dank.", ico: "🍄" },
        { name: "Gelb", description: "Altarfarbe: Dank und Licht — teilen statt fordern.", ico: "🍜" },
        { name: "Grün", description: "Altarfarbe: Wachstum-Symbol mit Maß.", ico: "🟩" },
        { name: "Blau", description: "Altarfarbe: Ruhe und Wasser-Ton — kühlen, nicht erstarren. Symbolik, kein Rat.", ico: "🎍" },
        { name: "Rosa", description: "Altarfarbe: sanfte Nähe ohne Besitzanspruch.", ico: "🩷" },
        { name: "Goldton", description: "Kerze oder Tuch: Würde und Gabe am Hausaltar.", ico: "🏆" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Altarlicht und Dank — ohne Ile-Anspruch.", ico: "🕯️" },
        { name: "Becher", description: "Werkzeug: Wasser und Reinheit-Symbol — Haltung", ico: "🏺" },
        { name: "Kreide", description: "Werkzeug: Markierung als Merkzeichen — Respekt und Maß.", ico: "✏️" },
        { name: "Faden", description: "Werkzeug: Band der Absicht — knüpfen ohne Besitzanspruch.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Klarheit und Würde — Blickfang am Hausaltar.", ico: "🪞" },
        { name: "Besen", description: "Werkzeug: Haus kehren vor der Gabe — Ordnung ehren.", ico: "🧹" },
        { name: "Schale", description: "Werkzeug: Früchte und Dank ablegen — teilen statt fordern.", ico: "🍽️" },
        { name: "Schlüssel", description: "Werkzeug: Haus und Schwelle — öffnen mit Respekt.", ico: "🔑" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Hausaltar-Ton: ohne Ile-Anspruch, Dank vor Forderung.", ico: "🪙" },
      ],
      elements: ["Wasser (Reinheit-Symbol)", "Erde (Haus)", "Feuer (Kerze)", "Luft (Gebet-Symbol)"],
      note: "Hauspraxis ohne Ile-Anspruch. Symbolik, kein Heilversprechen."
    },
    hermetik: {
      herbs: [
        { name: "Salbei", description: "Klarheit und Labor-Haltung — Duft als Fokus, keine alchemistischen Heilsversprechen.", ico: "🍃" },
        { name: "Rosmarin", description: "Gedächtnis und Maß — Notiz und Absicht knapper halten.", ico: "🌿" },
        { name: "Myrte", description: "Grenze und Bund — Symbol für Operationen mit klarem Anfang und Ende.", ico: "💍" },
        { name: "Lorbeer", description: "Sieg nur als Klarheit der Frage — Beobachtung vor Eingriff.", ico: "🎖️" },
        { name: "Wermut", description: "Bittere Prüfung: Hypothesen verwerfen, Ballast lösen.", ico: "🍸" },
        { name: "Minze", description: "Frisch starten — Tisch aufräumen, Atem, dann die Stunde notieren.", ico: "🌱" },
        { name: "Lavendel", description: "Ruhe im Denken — Pause zwischen Operationen, kein Spektakel.", ico: "🪻" },
      ],
      kitchen: [
        { name: "Salz", description: "Hausmittel / Labor-Symbol: Fixierung und Maß — Prise als Merkzeichen (Salz-Prinzip)", ico: "🧂" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe der Frage — Fokus-Symbol vor dem Eingriff.", ico: "🌶️" },
        { name: "Öl", description: "Hausmittel / Labor: Lösung und Träger — Tropfen als Metapher, keine alchemistische Heilsalbe.", ico: "🫒" },
        { name: "Zucker", description: "Hausmittel: lösliche Klarheit — Ballast süß lösen, Hypothese prüfen, nicht spekulieren.", ico: "🍬" },
        { name: "Honig", description: "Hausmittel: Wärme und Gabe — Tropfen oder Schälchen als Symbol", ico: "🍯" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
        { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Wein", description: "Opfergabe / Labor-Symbol: Bund der Operation — Tropfen oder Becher als Merkzeichen; Operator bleibt nüchtern klar, Maß und Ethik, kein Rausch als Praxisziel.", ico: "🍷" },
        { name: "Weihrauch", description: "Opfergabe: Harzduft für Fokus und Stunde — Maß statt Spektakel.", ico: "🪔" },
        { name: "Öl", description: "Opfergabe: Tropfen als Träger-Symbol — keine alchemistische Heilsalbe.", ico: "🫒" },
        { name: "Kerze", description: "Opfergabe: Laborlicht — Stunde notieren, Anfang und Ende markieren.", ico: "🕯️" },
        { name: "Wasser", description: "Opfergabe: Lösung und Klarheit — Schale als Merkzeichen.", ico: "💧" },
        { name: "Dankgabe", description: "Opfergabe: Abschluss der Operation — danken und siegeln.", ico: "🙏" },
      ],
      stones: [
        { name: "Lapis", description: "Denken-Blickfang — Königsblau am Labor-Tisch, Symbol nicht Orakel.", ico: "🔹" },
        { name: "Bergkristall", description: "Fokus-Stein — Beobachtung vor Eingriff. Klarheit ohne Zwang, ethisch prüfen.", ico: "💎" },
        { name: "Zinnober-Ton", description: "Labor-Symbol (Farbe/Ton) — Operation mit Anfang und Ende, keine Heilsversprechen.", ico: "🍌" },
        { name: "Hämatit", description: "Erdungs-Blickfang nach der Stunde — Körper zurückholen.", ico: "⚓" },
        { name: "Schiefer", description: "Schreib- und Grenzstein — Notiz knapper halten.", ico: "📑" },
        { name: "Pyrit", description: "Funke und Prüfung — Hypothesen schärfen, nicht glänzen wollen.", ico: "✨" },
      ],
      colors: [
        { name: "Königsblau", description: "Altarfarbe / Tuch: Denken und Maß — klar ohne leeren Glanz.", ico: "🔷" },
        { name: "Gold", description: "Altarfarbe / Kerze: Klarheit der Frage — Sieg nur als Erkenntnis.", ico: "🥇" },
        { name: "Schwarz", description: "Altarfarbe: Grenze der Operation — Anfang und Ende markieren.", ico: "⬛" },
        { name: "Weiß", description: "Altarfarbe: leere Tafel — frisch starten.", ico: "🍄" },
        { name: "Zinnoberrot", description: "Akzentfarbe: Labor-Ton mit Vorsicht und Ethik.", ico: "🔴" },
        { name: "Grau", description: "Altarfarbe: Neutralität — Beobachtung vor Spektakel.", ico: "🩶" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Laborlicht — Stunde notieren, Beobachtung vor Eingriff.", ico: "🕯️" },
        { name: "Kreide", description: "Werkzeug: Diagramm und Grenze der Operation — Anfang und Ende markieren.", ico: "✏️" },
        { name: "Becher", description: "Werkzeug: Lösung und Maß — Metapher, keine alchemistische Heilsalbe.", ico: "🏺" },
        { name: "Faden", description: "Werkzeug: Verbindung der Faktoren — knüpfen als Denkhilfe.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Reflexion der Hypothese — sich selbst prüfen.", ico: "🪞" },
        { name: "Feder / Stift", description: "Werkzeug: Protokoll — Absicht knapper halten.", ico: "✍️" },
        { name: "Waage (Symbol)", description: "Werkzeug: Ausgleich prüfen — Ethik vor Spektakel.", ico: "⚖️" },
        { name: "Schale", description: "Werkzeug: Stoffe trennen und ordnen — Laborhaltung.", ico: "🍽️" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Labor-Ton: beobachten, protokollieren, Ethik vor Eingriff.", ico: "🪙" },
      ],
      elements: ["Feuer (Schwefel-Symbol)", "Wasser (Lösung)", "Luft (Merkur-Symbol)", "Erde (Salz-Symbol)"],
      note: "Labor- und Haltungssymbole — keine alchemistischen Heilsversprechen."
    },
    wicca: {
      herbs: [
        { name: "Rosmarin", description: "Schutz-Symbol am Eingang oder Altar — Grenze ohne Angriff, an niemandem Schaden.", ico: "🌿" },
        { name: "Lavendel", description: "Sanfte Reinigung und Ruhe im Raum — Duft und Absicht", ico: "🪻" },
        { name: "Beifuß", description: "Mond- und Traum-Symbol — mit Maß; Reise nur ethisch und geerdet.", ico: "🌾" },
        { name: "Salbei", description: "Klarheit im Kreis — Raum achten, nicht Personen „reinigen“.", ico: "🍃" },
        { name: "Thymian", description: "Mut und Hauskraft als Symbol — kleine Gabe, Alltag ehren.", ico: "☘️" },
        { name: "Eisenkraut", description: "Klassisches Schutz- und Schwellenkraut in der Hexerei — Haltung, nicht Rezept.", ico: "✝️" },
        { name: "Kamille", description: "Sanfter Frieden im Raum — Tee oder Duft als Symbol", ico: "🥙" },
        { name: "Rose", description: "Anziehen mit Maß — Liebe und Dank ohne Besitzanspruch.", ico: "🌹" },
      ],
      kitchen: [
        { name: "Salz", description: "Hausmittel: Kreis und Schutz-Grenze — Prise als Symbol, an niemandem Schaden.", ico: "🧂" },
        { name: "Honig", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen, kein Besitzanspruch.", ico: "🍯" },
        { name: "Zimt", description: "Hausmittel: Wärme und Willkommen am Altar — Duft-Symbol", ico: "🟤" },
        { name: "Öl", description: "Hausmittel: Salbung als Haltung — Tropfen am Blickfang, keine Heilsalbe.", ico: "🫒" },
        { name: "Nelke", description: "Hausmittel: würzige Grenze — Schutz-Ton ohne Angriff.", ico: "🌺" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen.", ico: "🍬" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit — Fokus-Symbol am Tisch", ico: "🌶️" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Wein", description: "Opfergabe: Kelch-Gabe im Kreis — teilen mit Maß, an niemandem Schaden; kein Trinkzwang, kein Missbrauch.", ico: "🍷" },
        { name: "Met", description: "Opfergabe: Honigwein als süße Kreis-Gabe — teilen, Wort halten; Ethik vor Rausch.", ico: "🐝" },
        { name: "Kuchen", description: "Opfergabe: Fest und Teilen nach dem Kreis — Stück ablegen und teilen.", ico: "🧁" },
        { name: "Milch", description: "Opfergabe: sanfte Mond-Gabe — Schälchen ablegen.", ico: "🥛" },
        { name: "Blumen", description: "Opfergabe: Farbe und Jahresrad — ethisch gewählt.", ico: "💐" },
        { name: "Kerze", description: "Opfergabe: Element Feuer als Gabe — an niemandem Schaden.", ico: "🕯️" },
        { name: "Wasser", description: "Opfergabe: Loslassen und Kelch — Absicht entlassen.", ico: "💧" },
        { name: "Honig", description: "Opfergabe: süße Gabe — teilen, kein Besitzanspruch.", ico: "🍯" },
      ],
      stones: [
        { name: "Obsidian", description: "Grenze-Blickfang — Schutz ohne Angriff, an niemandem Schaden.", ico: "🌑" },
        { name: "Mondstein", description: "Zyklus-Stein — Phase als Arbeitsfenster achten.", ico: "🌙" },
        { name: "Moosachat", description: "Erde / Ankern — Stand nach dem Kreis. Stein bleibt Stein, Haltung bleibt Haltung.", ico: "🍀" },
        { name: "Bergkristall", description: "Klarer Fokus am Altar — Haltung, nicht Messung.", ico: "💎" },
        { name: "Rosenquarz", description: "Sanftes Anziehen-Symbol — Dank ohne Besitzanspruch.", ico: "💗" },
        { name: "Schwarzer Turmalin (Symbol)", description: "Schutz-Blickfang — Grenze ehren, kein Angriff.", ico: "🖤" },
      ],
      colors: [
        { name: "Schwarz", description: "Altarfarbe: Schutz-Grenze — Kerze oder Tuch ohne Angriff.", ico: "⬛" },
        { name: "Silber", description: "Altarfarbe: Mond-Ton — Phase achten, nichts erzwingen.", ico: "🥈" },
        { name: "Grün", description: "Altarfarbe: Wachstum mit Maß — Blickfang für Haltung, kein Besitzanspruch.", ico: "🟩" },
        { name: "Weiß", description: "Altarfarbe / Kerze: Klarheit im Kreis — schlicht, sicher, ohne Drama.", ico: "🍄" },
        { name: "Violett", description: "Altarfarbe: stille Absicht — Ethik vor Spektakel.", ico: "🟣" },
        { name: "Rosa", description: "Altarfarbe: Anziehen mit Maß — Liebe ohne Besitz.", ico: "🩷" },
        { name: "Goldton", description: "Kerze: Sonne und Dank im Jahresrad.", ico: "🏆" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: Absicht und Element Feuer — an niemandem Schaden.", ico: "🕯️" },
        { name: "Kreide", description: "Werkzeug: Kreis ziehen als Symbol — Grenze ohne Angriff.", ico: "✏️" },
        { name: "Besen", description: "Werkzeug: Raum kehren vor dem Kreis — Ordnung, kein Reinigungsversprechen an Personen.", ico: "🧹" },
        { name: "Becher", description: "Werkzeug: Wasser und Loslassen — Absicht entlassen.", ico: "🏺" },
        { name: "Faden", description: "Werkzeug: Knoten-Arbeit mit Maß — binden nur ethisch, nie gegen Willen.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Mond- und Selbstblick — Phase achten.", ico: "🪞" },
        { name: "Athame (Symbol)", description: "Werkzeug: Schnitt der Absicht — Symbolklinge, nie gegen Personen.", ico: "🗡️" },
        { name: "Räucherschale", description: "Werkzeug: Duft im Kreis — Haltung halten, Raum achten, fertig ist fertig.", ico: "⚪" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Kreis-Ton: an niemandem Schaden, Einwilligung achten.", ico: "🪙" },
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
        { name: "Minze", description: "Reset und Frische — Banishing-Punkt: altes Modell ablegen.", ico: "🌱" },
        { name: "Rosmarin", description: "Anker im Alltag — nach dem Labor zurück in den Körper.", ico: "🌿" },
        { name: "Salbei", description: "Raum klären als mentaler Reset — Theater optional, Ethik Pflicht.", ico: "🍃" },
        { name: "Beifuß", description: "Räucher- und Reset-Symbol — Banishing-Ton mit Maß, Ethik Pflicht.", ico: "🌾" },
        { name: "Thymian", description: "Alltags-Anker nach dem Labor — kleine Praxis statt Identitätsdrama.", ico: "☘️" },
        { name: "Lavendel", description: "Ruhe zwischen Operationen — Pause, kein Spektakel.", ico: "🪻" },
        { name: "Wacholder", description: "Raumduft als mentaler Schnitt — Theater optional.", ico: "🌲" },
      ],
      kitchen: [
        { name: "Kaffee", description: "Hausmittel / Wachheit als Gnosis-Werkzeug — scharf starten, Ethik behalten, Ergebnis nicht jagen.", ico: "☕" },
        { name: "Pfeffer", description: "Hausmittel: Schnitt und Fokus — Schärfe als Metapher für knappe Absicht.", ico: "🌶️" },
        { name: "Ingwer", description: "Hausmittel: Funke und Wärme — Labor-Energie ohne Identitätsdrama.", ico: "🫚" },
        { name: "Zitrone", description: "Hausmittel: Säure als Klarheit — unbrauchbare Sigils entsorgen, neu formulieren.", ico: "🍋" },
        { name: "Salz", description: "Hausmittel: Banishing und Schnitt — Prise als Reset-Symbol", ico: "🧂" },
        { name: "Zucker", description: "Hausmittel: schnelle Gnosis-Metapher — kurz süß, dann Modell wechseln.", ico: "🍬" },
        { name: "Öl", description: "Hausmittel: Träger und Labor-Tropfen — Werkzeug, keine Heilsalbung.", ico: "🫒" },
        { name: "Knoblauch", description: "Hausmittel: scharfer Schnitt am Eingang — Symbol für Banishing, nicht Medizin.", ico: "🧄" },
        { name: "Honig", description: "Hausmittel: Wärme und Gabe — Tropfen oder Schälchen als Symbol", ico: "🍯" },
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
        { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
        { name: "Anis", description: "Hausmittel: würzige Klarheit — Hausmittel-Symbol für Atem und Maß", ico: "⭐" },
      ],
      offerings: [
        { name: "Kaffee", description: "Opfergabe: Wachheit als Anker — Tasse ablegen oder trinken mit Maß; Ethik behalten, Ergebnis nicht jagen.", ico: "☕" },
        { name: "Alkohol", description: "Opfergabe: optionale Gnosis-Metapher — nur mit klarem Maß; kein Missbrauch, kein Trinkzwang.", ico: "🥂" },
        { name: "Rauch", description: "Opfergabe: Banishing-Ton — Schnitt und Reset mit Maß.", ico: "💨" },
        { name: "Kerze", description: "Opfergabe: kurzer Fokus — zünden, halten, löschen.", ico: "🕯️" },
        { name: "Münze", description: "Opfergabe: Zufall und Ausgleich — kein Kauf von Willen.", ico: "🪙" },
        { name: "Dankgabe", description: "Opfergabe: Labor schließen — danken und vergessen.", ico: "🙏" },
      ],
      stones: [
        { name: "Obsidian", description: "Schnitt-Blickfang — altes Modell ablegen, Ethik behalten.", ico: "🌑" },
        { name: "Pyrit", description: "Funke-Symbol — Labor-Start ohne Identitätsdrama.", ico: "✨" },
        { name: "Klarer Quarz", description: "Leinwand-Stein — Absicht knapper halten. Beobachten vor Eingriff, ethisch prüfen.", ico: "🧊" },
        { name: "Schiefer", description: "Neutrale Schreibfläche — Sigil notieren und entsorgen.", ico: "📑" },
        { name: "Glasbruch (sicher)", description: "Metapher für Schnitt — nur als Symbol, vorsichtig handhaben.", ico: "🪟" },
        { name: "Betonstück", description: "Alltags-Anker — nach dem Labor zurück in den Körper.", ico: "🧱" },
      ],
      colors: [
        { name: "Schwarz", description: "Altarfarbe: Reset und Leere — Banishing-Ton.", ico: "⬛" },
        { name: "Neon-Akzent", description: "Labor-Farbe: knapper Funke, kein Spektakelzwang.", ico: "✢" },
        { name: "Grau", description: "Altarfarbe: Neutral — Paradigma beliebig, Ethik Pflicht.", ico: "🩶" },
        { name: "Weiß", description: "Altarfarbe: leere Tafel nach dem Schnitt.", ico: "🍄" },
        { name: "Blutrot (Akzent)", description: "Kurzer Fokus-Akzent — Absicht scharf, Ergebnis nicht jagen.", ico: "🍊" },
        { name: "Elektrisches Blau", description: "Labor-Akzent: Wachheit ohne Drama — Operator bleibt nüchtern und menschlich.", ico: "⚡" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: kurzer Fokus — Gnosis starten, Ethik behalten.", ico: "🕯️" },
        { name: "Kreide", description: "Werkzeug: Sigil-Fläche und Banishing-Markierung — Modell wechseln.", ico: "✏️" },
        { name: "Stift", description: "Werkzeug: Sigil zeichnen und entsorgen — Ergebnis nicht jagen.", ico: "🖊️" },
        { name: "Faden", description: "Werkzeug: knüpfen und lösen — Metapher für Absicht, nicht Fesselung.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: Feedback auf das eigene Modell — kein Orakelzwang.", ico: "🪞" },
        { name: "Becher", description: "Werkzeug: Kaffee oder Wasser als Anker — zurück in den Körper.", ico: "🏺" },
        { name: "Würfel / Münze", description: "Werkzeug: Zufall als Orakel-Metapher — Entscheidungshilfe, kein Zwang.", ico: "🎲" },
        { name: "Besen", description: "Werkzeug: Banishing kehren — altes Modell ablegen.", ico: "🧹" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Labor/Banishing-Ton: Modell wählen, Ergebnis nicht jagen, Ethik Pflicht.", ico: "🪙" },
      ],
      elements: ["Beliebig (Paradigma)", "Leer (Reset)", "Funke (Gnosis)", "Alltag (Anker)"],
      note: "Werkzeug-Metaphern für Gnosis und Labor — keine medizinischen Claims."
    },
    esoterik: {
      herbs: [
        { name: "Lavendel", description: "Ruhe und sanfte Reinigung — Duft für den Raum", ico: "🪻" },
        { name: "Kamille", description: "Weiches Friedens-Symbol — Tee oder Blüte als Haltung, nicht als Therapie.", ico: "🥙" },
        { name: "Rosmarin", description: "Klarheit und Schutz-Ton am Alltagstisch — Absicht klein halten.", ico: "🌿" },
        { name: "Salbei", description: "Raum klären als Symbol — Fenster auf, Atem, Schweigen.", ico: "🍃" },
        { name: "Rose", description: "Sanftes Anziehen — Dank und Nähe ohne Besitzanspruch.", ico: "🌹" },
        { name: "Minze", description: "Frisch starten — drei bewusste Züge oft die beste Schwelle.", ico: "🌱" },
        { name: "Thymian", description: "Hauskraft und Mut-Symbol — kleine Praxis statt großem Spektakel.", ico: "☘️" },
      ],
      kitchen: [
        { name: "Salz", description: "Hausmittel: schlichte Grenze am Tisch — Prise als Merkzeichen", ico: "🧂" },
        { name: "Honig", description: "Hausmittel: süße Gabe und Sanftheit — teilen", ico: "🍯" },
        { name: "Zimt", description: "Hausmittel: Wärme und Willkommen — Duft-Symbol für den Alltagstisch.", ico: "🟤" },
        { name: "Öl", description: "Hausmittel: Tropfen am Blickfang — Haltung der Pflege, keine Heilsalbe.", ico: "🫒" },
        { name: "Anis", description: "Hausmittel: würzige Ruhe — Hausmittel-Symbol für Atem und Maß.", ico: "⭐" },
        { name: "Zucker", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen statt binden, Symbolik ohne Heilversprechen.", ico: "🍬" },
        { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit — Fokus-Symbol am Tisch", ico: "🌶️" },
        { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
        { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
      ],
      offerings: [
        { name: "Wein", description: "Opfergabe: sanfte Gabe und Bund am Alltagstisch — Tropfen als Symbol; Maß, kein Trinkzwang, kein Missbrauch.", ico: "🍷" },
        { name: "Blumen", description: "Opfergabe: Farbe und Ruhe — schlichter Blickfang.", ico: "💐" },
        { name: "Kerze", description: "Opfergabe: Licht und Absicht klein halten.", ico: "🕯️" },
        { name: "Tee", description: "Opfergabe: Pause und Atem — Tasse als Schwelle.", ico: "🍵" },
        { name: "Wasser", description: "Opfergabe: Klarheit — Glas oder Schale. Frisch, schlicht, respektvoll entsorgen.", ico: "💧" },
        { name: "Dankgabe", description: "Opfergabe: schlichter Dank — Wort oder Atem.", ico: "🙏" },
        { name: "Honig", description: "Opfergabe: süße Sanftheit — teilen mit Maß.", ico: "🍯" },
      ],
      stones: [
        { name: "Rosenquarz", description: "Sanft-Blickfang — Nähe ohne Besitzanspruch", ico: "💗" },
        { name: "Amethyst", description: "Stille und Schweigen am Altar — Haltung, nicht Messung.", ico: "💜" },
        { name: "Bergkristall", description: "Klarer Fokus — drei bewusste Züge oft die beste Schwelle.", ico: "💎" },
        { name: "Mondstein", description: "Zyklus-Symbol — Mond ehren ohne Orakel-Zwang.", ico: "🌙" },
        { name: "Raucherquarz", description: "Weiches Klarheits-Symbol — Raum und Atem. Näherung zur Haltung, kein Orakel.", ico: "🌪️" },
        { name: "Flusskiesel", description: "Schlichter Alltags-Blickfang — kleine Praxis statt Spektakel.", ico: "🌊" },
      ],
      colors: [
        { name: "Violett", description: "Altarfarbe: stille Absicht und Sanftheit.", ico: "🟣" },
        { name: "Silber", description: "Altarfarbe: Mond und Schweigen — ohne Orakel-Zwang.", ico: "🥈" },
        { name: "Nachtblau", description: "Altarfarbe: Ruhe und Tiefe als Tuch oder Kerze.", ico: "🌌" },
        { name: "Weiß", description: "Altarfarbe / Kerze: schlichte Klarheit.", ico: "🍄" },
        { name: "Rosa", description: "Altarfarbe: sanftes Anziehen ohne Besitz.", ico: "🩷" },
        { name: "Mintgrün", description: "Altarfarbe: frischer Start und Atem.", ico: "🧆" },
      ],
      tools: [
        { name: "Kerze", description: "Werkzeug: sanftes Licht — Absicht klein halten.", ico: "🕯️" },
        { name: "Kreide", description: "Werkzeug: schlichte Markierung — Symbolik ohne Spektakel.", ico: "✏️" },
        { name: "Becher", description: "Werkzeug: Wasser und Atem — drei bewusste Züge.", ico: "🏺" },
        { name: "Faden", description: "Werkzeug: weiches Band — Verbindung mit Maß.", ico: "🧵" },
        { name: "Spiegel", description: "Werkzeug: stille Selbstschau — kein Medium.", ico: "🪞" },
        { name: "Besen", description: "Werkzeug: Raum kehren — Alltagspraxis. Reinheit beginnt im Sichtbaren.", ico: "🧹" },
        { name: "Schale", description: "Werkzeug: Gabe ablegen — teilen statt fordern.", ico: "🍽️" },
        { name: "Räucherschale", description: "Werkzeug: Duft für den Raum — Haltung klären, nicht betäuben. Brandschutz und Maß.", ico: "⚪" },
      ],
      links: [
        { name: "Nagel (Eisen)", description: "Bezug / Hilfsmittel: Eisen-Nagel als Grenz- und Festigungs-Symbol in der Hauspraxis — fixieren von Absicht am Ort, nie gegen Personen und nie illegal. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🔩" },
        { name: "Nadel", description: "Bezug / Hilfsmittel: Nadel und Stich als Merkzeichen für Fokus und Naht — Symbolarbeit am Tuch/Faden, keine Verletzung, kein Schaden an anderen. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🪡" },
        { name: "Haare (eigene)", description: "Bezug / Hilfsmittel: eigenes Haar als persönlicher Bezug in manchen Traditionen — nur mit Einwilligung und Maß; fremdes Haar ohne Zustimmung ist tabu. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "💇" },
        { name: "Faden / Knoten", description: "Bezug / Hilfsmittel: knüpfen und lösen als klassische Symbolik — Absicht binden oder freigeben; nie fremden Willen fesseln. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🪢" },
        { name: "Tuch / Fetzen", description: "Bezug / Hilfsmittel: Tuch als Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🧣" },
        { name: "Erde / Staub", description: "Bezug / Hilfsmittel: Erde vom eigenen Ort als Anker — Stand und Zugehörigkeit; fremde Erde nicht stehlen, Respekt vor Ort. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🪴" },
        { name: "Wachs", description: "Bezug / Hilfsmittel: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🟡" },
        { name: "Asche", description: "Bezug / Hilfsmittel: Asche als Rest und Abschluss — was verbrannt/beendet ist; Symbol für Loslassen, kein Angriff. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🌫️" },
        { name: "Knochen (Symbol)", description: "Bezug / Hilfsmittel: nur ethisches Symbol (Nachbildung/Fund mit Respekt) — Ahnen- und Stand-Ton, kein Wildfang, kein illegaler Besitz. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🍉" },
        { name: "Foto / Name-Zettel", description: "Bezug / Hilfsmittel: Name oder Bild als Bezug auf eine Person — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "📷" },
        { name: "Schlüssel", description: "Bezug / Hilfsmittel: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbolik der Entscheidung. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🔑" },
        { name: "Münze", description: "Bezug / Hilfsmittel: Gabe, Ausgleich und Tausch-Symbol — opfern/teilen mit Maß, kein Kauf von Willen. Sanfter Alltagston: Absicht klein, kein Medium.", ico: "🪙" },
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
      const out = {
        name: String(h.name || '').trim(),
        description: String(h.description || h.desc || '').trim()
      };
      const mapped = icoForLexikonName(out.name, h.ico ? String(h.ico) : '');
      if (mapped) out.ico = mapped;
      else if (h.ico) out.ico = String(h.ico);
      return out;
    }
    const raw = String(h || '').trim();
    if (!raw) return { name: '', description: '' };
    const m = raw.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (m) {
      const name = m[1].trim();
      const out = { name: name, description: m[2].trim() + ' — Haltung und Gabe.' };
      const mapped = icoForLexikonName(name, '');
      if (mapped) out.ico = mapped;
      return out;
    }
    const out = { name: raw, description: 'Hauspraxis-Symbolik — Haltung und Gabe.' };
    const mapped = icoForLexikonName(raw, '');
    if (mapped) out.ico = mapped;
    return out;
  }

  /** Steine/Farben/Hausmittel/Werkzeuge/Bezüge: gleiche Form; Fallback aus Alt-Strings. */
  function normalizeNamedItem(item, kind) {
    const fallbacks = {
      color: 'Altarfarbe / Blickfang.',
      stone: 'Altarstein / Blickfang.',
      kitchen: 'Hausmittel — Symbolik der Hauspraxis.',
      tool: 'Werkzeug der Hauspraxis — Symbolik und Maß.',
      link: 'Bezug / Hilfsmittel — traditionelle Symbolik mit Ethik und Einwilligung.',
      offering: 'Opfergabe — Symbolik und Maß; Ethik, kein Trinkzwang, keine Initiation.'
    };
    const fallback = fallbacks[kind] || 'Hauspraxis-Symbolik — Haltung und Gabe.';
    if (item && typeof item === 'object') {
      const out = {
        name: String(item.name || '').trim(),
        description: String(item.description || item.desc || '').trim() || fallback
      };
      const mapped = icoForLexikonName(out.name, item.ico ? String(item.ico) : '');
      if (mapped) out.ico = mapped;
      else if (item.ico) out.ico = String(item.ico);
      return out;
    }
    const raw = String(item || '').trim();
    if (!raw) return { name: '', description: '' };
    const m = raw.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (m) {
      const name = m[1].trim();
      const out = { name: name, description: m[2].trim() + '.' };
      const mapped = icoForLexikonName(name, '');
      if (mapped) out.ico = mapped;
      return out;
    }
    const out = { name: raw, description: fallback };
    const mapped = icoForLexikonName(raw, '');
    if (mapped) out.ico = mapped;
    return out;
  }

  function normalizeStone(s) { return normalizeNamedItem(s, 'stone'); }
  function normalizeColor(c) { return normalizeNamedItem(c, 'color'); }
  function normalizeKitchen(k) { return normalizeNamedItem(k, 'kitchen'); }
  function normalizeTool(t) { return normalizeNamedItem(t, 'tool'); }
  function normalizeLink(l) { return normalizeNamedItem(l, 'link'); }
  function normalizeOffering(o) { return normalizeNamedItem(o, 'offering'); }

  function herbDisplayName(h) {
    return normalizeHerb(h).name;
  }

  function itemDisplayName(item, kind) {
    if (kind === 'stone') return normalizeStone(item).name;
    if (kind === 'color') return normalizeColor(item).name;
    if (kind === 'kitchen') return normalizeKitchen(item).name;
    if (kind === 'tool') return normalizeTool(item).name;
    if (kind === 'link') return normalizeLink(item).name;
    if (kind === 'offering') return normalizeOffering(item).name;
    return normalizeHerb(item).name;
  }

  const ICON_BY_NAME = {
    "Salbei": "🍃",
    "Rosmarin": "🌿",
    "Lavendel": "🪻",
    "Thymian": "☘️",
    "Minze": "🌱",
    "Kamille": "🥙",
    "Rose": "🌹",
    "Basilikum": "🥬",
    "Lorbeer": "🎖️",
    "Beifuß": "🌾",
    "Wacholder": "🌲",
    "Wermut": "🍸",
    "Eisenkraut": "✝️",
    "Melisse": "🍈",
    "Johanniskraut": "☀️",
    "Holunder": "🫐",
    "Brennnessel": "🌵",
    "Löwenzahn": "🥐",
    "Schafgarbe": "🥧",
    "Ringelblume": "🏵️",
    "Lindenblüte": "🌼",
    "Fenchel": "🫛",
    "Dill": "🥦",
    "Majoran": "🥗",
    "Oregano": "🍕",
    "Petersilie": "🍩",
    "Frauenmantel": "🌂",
    "Gänseblümchen": "💮",
    "Ysop": "💙",
    "Weihrauch": "🪔",
    "Myrrhe": "🪵",
    "Zeder": "🧃",
    "Angelika": "💚",
    "Hopfen": "🍻",
    "Baldrian": "😴",
    "Eibisch": "🌸",
    "Birke": "🌳",
    "Weide": "🎋",
    "Fichte": "🎄",
    "Eichenblatt": "🌰",
    "Myrte": "💍",
    "Tabak (symbolisch)": "🍂",
    "Salz": "🧂",
    "Zucker": "🍬",
    "Zimt": "🟤",
    "Honig": "🍯",
    "Öl": "🫒",
    "Essig": "🍶",
    "Milch": "🥛",
    "Ei": "🥚",
    "Brot": "🍞",
    "Pfeffer": "🌶️",
    "Knoblauch": "🧄",
    "Nelke": "🌺",
    "Anis": "⭐",
    "Kardamom": "🫘",
    "Vanille": "🍦",
    "Senf": "🌭",
    "Kaffee": "☕",
    "Tee": "🍵",
    "Mehl": "🥖",
    "Reis": "🍚",
    "Butter": "🧈",
    "Seife": "🧼",
    "Wasser": "💧",
    "Zitrone": "🍋",
    "Ingwer": "🫚",
    "Zwiebel": "🧅",
    "Hafer": "🥣",
    "Apfel": "🍎",
    "Dankgabe": "🙏",
    "Obst": "🍇",
    "Blumen": "💐",
    "Kuchen": "🧁",
    "Süßes": "🍭",
    "Kerze": "🕯️",
    "Licht": "💡",
    "Rauch": "💨",
    "Münze": "🪙",
    "Tabak (Symbol)": "🍂",
    "Alkohol": "🥂",
    "Rum": "🧉",
    "Wein": "🍷",
    "Rotwein": "🍪",
    "Weißwein": "🧀",
    "Bier": "🍺",
    "Met": "🐝",
    "Schnaps": "🫗",
    "Branntwein": "🫙",
    "Whisky": "🥃",
    "Cognac": "🥕",
    "Likör": "🍹",
    "Champagner": "🍾",
    "Sekt": "🥓",
    "Bergkristall": "💎",
    "Rosenquarz": "💗",
    "Rauchquarz": "🌁",
    "Amethyst": "💜",
    "Citrin": "🔆",
    "Milchquarz": "☁️",
    "Aventurin": "🥟",
    "Obsidian": "🌑",
    "Schwarzer Turmalin": "🖤",
    "Schwarzer Turmalin (Symbol)": "🖤",
    "Hämatit": "⚓",
    "Onyx": "⚫",
    "Labradorit": "💠",
    "Mondstein": "🌙",
    "Selenit": "🍫",
    "Jaspis": "🟧",
    "Achat": "🥔",
    "Moosachat": "🍀",
    "Tigerauge": "👁️",
    "Karneol": "🔶",
    "Lapis": "🔹",
    "Fluorit": "🌈",
    "Pyrit": "✨",
    "Bernstein": "🟠",
    "Jade": "🍮",
    "Türkis": "🩵",
    "Malachit": "🦚",
    "Granat": "♦️",
    "Flint": "💥",
    "Flusskiesel": "🌊",
    "Sodalith": "🔵",
    "Holzperle": "📿",
    "Knochenweiß-Stein": "⬜",
    "Eisengrau-Stein": "⛓️",
    "Granit": "🗻",
    "Kiesel vom Weg": "🪨",
    "Tonperle": "🥠",
    "Schiefer": "📑",
    "Quarz": "🟦",
    "Quarzader": "〰️",
    "Klarer Quarz": "🧊",
    "Raucherquarz": "🌪️",
    "Grüner Achat": "🟢",
    "Lava": "🌋",
    "Koralle": "🪸",
    "Korallenstück (Symbol)": "🏝️",
    "Muschel": "🐚",
    "Betonstück": "🧱",
    "Glasbruch (sicher)": "🪟",
    "Weiß": "🍄",
    "Schwarz": "⬛",
    "Grau": "🩶",
    "Silber": "🥈",
    "Gold": "🥇",
    "Rot": "❤️",
    "Weinrot": "🟥",
    "Orange": "🧡",
    "Gelb": "🍜",
    "Grün": "🟩",
    "Erdbraun": "🟫",
    "Blau": "🎍",
    "Nachtblau": "🌌",
    "Indigo": "🧿",
    "Violett": "🟣",
    "Rosa": "🩷",
    "Kupfer": "🥉",
    "Knochenweiß": "🦴",
    "Mintgrün": "🧆",
    "Purpur": "👑",
    "Waldgrün": "🥜",
    "Rauchgrau": "🌬️",
    "Herbstrot": "🍁",
    "Eisengrau": "⚙️",
    "Elektrisches Blau": "⚡",
    "Blutrot (mit Maß)": "❣️",
    "Blutrot (Akzent)": "🍊",
    "Rot (mit Maß)": "❤️‍🔥",
    "Zinnober-Ton": "🍌",
    "Zinnoberrot": "🔴",
    "Nordblau": "🥶",
    "Königsblau": "🔷",
    "Tannengrün": "🌽",
    "Honiggold": "🟨",
    "Goldton": "🏆",
    "Muschelweiß": "🤍",
    "Neon-Akzent": "✢",
    "Kreide": "✏️",
    "Besen": "🧹",
    "Becher": "🏺",
    "Faden": "🧵",
    "Spiegel": "🪞",
    "Schale": "🍽️",
    "Glocke": "🔔",
    "Athame (Symbol)": "🗡️",
    "Beutel": "👝",
    "Altar-Tuch": "🧺",
    "Weihrauchhalter": "🔥",
    "Mörser": "⚗️",
    "Pendel": "🔮",
    "Stab / Wand": "🪄",
    "Kessel": "🫕",
    "Karten": "🃏",
    "Trommel": "🥁",
    "Trommel (Symbol)": "🥁",
    "Rassel": "🪇",
    "Feder": "🪶",
    "Messer (Haus)": "🔪",
    "Schere": "✂️",
    "Nadelkissen": "📌",
    "Schlüssel": "🔑",
    "Waage (Symbol)": "⚖️",
    "Streichhölzer": "🧨",
    "Buch": "📖",
    "Räucherschale": "⚪",
    "Horn / Becher": "📯",
    "Feder / Stift": "✍️",
    "Stift": "🖊️",
    "Würfel / Münze": "🎲",
    "Nagel (Eisen)": "🔩",
    "Nadel": "🪡",
    "Haare (eigene)": "💇",
    "Faden / Knoten": "🪢",
    "Tuch / Fetzen": "🧣",
    "Erde / Staub": "🪴",
    "Wachs": "🟡",
    "Asche": "🌫️",
    "Knochen (Symbol)": "🍉",
    "Foto / Name-Zettel": "📷",
    "Blut (Symbol)": "🩸",
    "Speichel (Symbol)": "💦",
    "Fußabdruck (Symbol)": "👣",
    "Grab-Erde (Symbol)": "🪦",
    "Rost": "🌷",
    "Schwefel (Symbol)": "💛",
    "Quecksilber (Symbol)": "🍐"
  };

  function icoForLexikonName(name, fallback) {
    const key = String(name || '').trim();
    if (key && ICON_BY_NAME[key]) return ICON_BY_NAME[key];
    return fallback || '';
  }

  /** Slug for assets/lexikon/{slug}.svg — must match scripts/generate-lexikon-icons.mjs */
  function lexikonIconSlug(name) {
    return String(name || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[()]/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }

  function hasLexikonIcon(name) {
    const key = String(name || '').trim();
    return !!(key && ICON_BY_NAME[key]);
  }

  function lexikonIconSrc(name) {
    if (!hasLexikonIcon(name)) return '';
    const slug = lexikonIconSlug(name);
    return slug ? ('assets/lexikon/' + slug + '.svg') : '';
  }

  /** Category default SVG — never letters/monograms. */
  function lexikonCategoryIconSrc(kind) {
    const map = {
      herb: 'fallback-herb.svg',
      kitchen: 'fallback-kitchen.svg',
      stone: 'fallback-stone.svg',
      color: 'fallback-color.svg',
      tool: 'fallback-tool.svg',
      link: 'fallback-link.svg',
      offering: 'fallback-offering.svg'
    };
    const file = map[kind] || 'fallback-blank.svg';
    return 'assets/lexikon/' + file;
  }

  /** Soft blank glyph when even category is unknown. */
  function lexikonBlankIconSrc() {
    return 'assets/lexikon/fallback-blank.svg';
  }

  /** Resolve display SVG: named icon → category default → blank. Never abbreviations. */
  function lexikonDisplayIconSrc(name, kind) {
    return lexikonIconSrc(name) || lexikonCategoryIconSrc(kind) || lexikonBlankIconSrc();
  }

  /** Gemeinsamer Lexikon-Kern — erscheint auf jedem Pfad (Pfad-Einträge bleiben vorn und gewinnen bei Namenskollision). */
  const LEXIKON_CORE = {
    herbs: [
      { name: "Salbei", description: "Klarheit im Raum als Haltung — Duft und Absicht", ico: "🍃" },
      { name: "Rosmarin", description: "Erinnerung und Hausgrenze — Räucher- oder Hausmittel-Symbol mit klarer Ethik", ico: "🌿" },
      { name: "Lavendel", description: "Ruhe-Symbol für den Raum — sanft, ethisch, ohne Betäubungsversprechen.", ico: "🪻" },
      { name: "Thymian", description: "Hauskraft am Tisch — kleine Gabe, Alltag ehren", ico: "☘️" },
      { name: "Minze", description: "Frisch starten — Schwelle und Atem, oft reicht ein bewusster Zug.", ico: "🌱" },
      { name: "Kamille", description: "Sanfter Frieden im Raum — Blüte als Haltung", ico: "🥙" },
      { name: "Rose", description: "Anziehen mit Maß — Dank und Nähe ohne Besitzanspruch.", ico: "🌹" },
      { name: "Basilikum", description: "Hausfrieden und Frische — Topf oder Blatt als Ordnung, keine Initiation.", ico: "🥬" },
      { name: "Lorbeer", description: "Klarheit und Würde — Blatt als Merkzeichen, nicht als Orakelzwang.", ico: "🎖️" },
      { name: "Beifuß", description: "Räucher- und Schwellen-Symbol — Reise nur geerdet, keine Geister fordern.", ico: "🌾" },
      { name: "Wacholder", description: "Harziger Raum- und Grenzduft — frische Luft und Maß statt Spektakel.", ico: "🌲" },
      { name: "Wermut", description: "Bittere Grenze: was nicht dient, bleibt draußen — Haltung, kein Heilmittel.", ico: "🍸" },
      { name: "Eisenkraut", description: "Klassisches Schutz- und Schwellenkraut — Symbolik", ico: "✝️" },
      { name: "Melisse", description: "Sanfte Ruhe am Tisch — Duft-Symbol für Abend und Atem, kein Heilversprechen.", ico: "🍈" },
      { name: "Johanniskraut", description: "Licht- und Sonnenwende-Symbol — Haltung für Wärme mit Maß, kein Heilanspruch.", ico: "☀️" },
      { name: "Holunder", description: "Schwelle und Jahreskreis — Blüte oder Zweig als Gabe, respektvoll", ico: "🫐" },
      { name: "Brennnessel", description: "Kraft und Stand — Alltagsgrün als Anker. Symbolik, kein medizinischer Rat.", ico: "🌵" },
      { name: "Löwenzahn", description: "Sonne und Loslassen — Pusteblume als Symbol, was fliegt, darf gehen.", ico: "🥐" },
      { name: "Schafgarbe", description: "Grenze und Ausgleich — Wiesenkraut als Merkzeichen", ico: "🥧" },
      { name: "Ringelblume", description: "Wärme und Sonnenblick am Altar — Farbe als Haltung, keine Salbe-Claims.", ico: "🏵️" },
      { name: "Lindenblüte", description: "Sanftheit und Atem-Raum — Duft-Symbol für Pause, ohne zu betäuben.", ico: "🌼" },
      { name: "Fenchel", description: "Klarheit und Maß — Samen als Hausmittel-Symbol", ico: "🫛" },
      { name: "Dill", description: "Schutz-Ton am Tisch — schlichte Würze als Grenze", ico: "🥦" },
      { name: "Majoran", description: "Haus und Geborgenheit — Würzkraut als Alltagssymbol.", ico: "🥗" },
      { name: "Oregano", description: "Wärme und Alltagskraft — Herd-Symbol für den Tisch, ethisch und schlicht.", ico: "🍕" },
      { name: "Petersilie", description: "Einfache Gabe und Grün am Tisch — Respekt im Haus.", ico: "🍩" },
      { name: "Frauenmantel", description: "Kreis und Behütung — Blatt als Symbol für Schutz ohne Besitz.", ico: "🌂" },
      { name: "Gänseblümchen", description: "Schlichte Freude — Wiesenblüte als kleiner Blickfang.", ico: "💮" },
      { name: "Ysop", description: "Reinheit-Symbol im Raum — Duft und Absicht", ico: "💙" },
      { name: "Weihrauch", description: "Gebet- und Harzduft — Raum ehren, Maß statt Spektakel", ico: "🪔" },
      { name: "Myrrhe", description: "Abschluss und Würde — Harz-Symbol für Ende und Dank", ico: "🪵" },
      { name: "Zeder", description: "Stand und Dauer — Holz- oder Nadelsymbol, Wald-Anker ohne Drama.", ico: "🧃" },
      { name: "Angelika", description: "Wege-Kraut in der Volkspraxis — klar gehen, nichts erzwingen", ico: "💚" },
      { name: "Hopfen", description: "Ruhe und Traum-Ton — Zapfen als Symbol, keine Schlafmittel-Claims.", ico: "🍻" },
      { name: "Baldrian", description: "Stille-Symbol für den Abend — Haltung vor Spektakel, Maß vor Menge.", ico: "😴" },
      { name: "Eibisch", description: "Weiche Grenze — Schleimkraut als Sanftheit-Symbol", ico: "🌸" }
    ],
    kitchen: [
      { name: "Salz", description: "Hausmittel: Kreis und Grenze — Prise als Merkzeichen", ico: "🧂" },
      { name: "Zucker", description: "Hausmittel: süße Gabe und Anziehen mit Maß — teilen statt binden", ico: "🍬" },
      { name: "Zimt", description: "Hausmittel: Willkommen und Wärme — Duft-Symbol, kein Spektakel.", ico: "🟤" },
      { name: "Honig", description: "Hausmittel: süße Gabe an den Alltag — teilen statt fordern, Wärme ohne Spektakel.", ico: "🍯" },
      { name: "Öl", description: "Hausmittel: Tropfen am Blickfang — Haltung der Pflege, keine Heilsalbe.", ico: "🫒" },
      { name: "Essig", description: "Hausmittel: Säure als Schnitt und Klarheit — Symbol zum Loslassen, kein Reinigungsmittel-Mythos.", ico: "🍶" },
      { name: "Milch", description: "Hausmittel: sanfte Gabe und Mond-Ton — Schälchen als Symbol", ico: "🥛" },
      { name: "Ei", description: "Hausmittel: Keim und Ganzheit — Schale als Kreis-Symbol, nicht als Orakelzwang.", ico: "🥚" },
      { name: "Brot", description: "Hausmittel: Versorgung und Teilen — Laib als Alltagseid, kein Opferzwang.", ico: "🍞" },
      { name: "Pfeffer", description: "Hausmittel: Schärfe und Wachheit am Tisch — Fokus-Symbol", ico: "🌶️" },
      { name: "Knoblauch", description: "Hausmittel: scharfe Hausgrenze am Eingang — Symbol, kein Heilversprechen und kein Zwang.", ico: "🧄" },
      { name: "Nelke", description: "Hausmittel / Würze: Schutz-Ton und Wärme — Maß halten, keinen fremden Willen binden.", ico: "🌺" },
      { name: "Anis", description: "Hausmittel: würzige Klarheit — Symbol für Atem und Maß", ico: "⭐" },
      { name: "Kardamom", description: "Hausmittel: Wärme und weite Wege — Duft-Symbol für Gastfreundschaft.", ico: "🫘" },
      { name: "Vanille", description: "Hausmittel: weiche Süße — Anziehen mit Maß, teilen statt binden.", ico: "🍦" },
      { name: "Senf", description: "Hausmittel: scharfer Funke — Wachheit und Schnitt, kein Angriff.", ico: "🌭" },
      { name: "Kaffee", description: "Hausmittel: Wachheit als Werkzeug — scharf starten, Ethik behalten, Ergebnis nicht jagen.", ico: "☕" },
      { name: "Tee", description: "Hausmittel: Pause und Atem — Tasse als Schwelle", ico: "🍵" },
      { name: "Mehl", description: "Hausmittel: Stoff und Form — Kreis streuen als Symbol, Alltag ehren.", ico: "🥖" },
      { name: "Reis", description: "Hausmittel: Fülle und Geduld — Körner als Gabe, teilen statt fordern.", ico: "🍚" },
      { name: "Butter", description: "Hausmittel: Weichheit und Versorgung — Schmelz als Wärme-Symbol, keine Heilsalbe.", ico: "🧈" },
      { name: "Seife", description: "Hausmittel: Schwelle waschen — Hände und Alltag, kein Reinigungsversprechen an Personen.", ico: "🧼" },
      { name: "Wasser", description: "Hausmittel: Fluss, Atem, Loslassen — Glas oder Schale, Haltung statt Magie-Claim.", ico: "💧" },
      { name: "Zitrone", description: "Hausmittel: Säure als Klarheit — unbrauchbares entlassen, neu formulieren.", ico: "🍋" },
      { name: "Ingwer", description: "Hausmittel: Funke und Wärme — Labor-Energie ohne Drama", ico: "🫚" },
      { name: "Zwiebel", description: "Hausmittel: Schichten und Tränen — Schnitt als Loslassen-Symbol, kein Zwang.", ico: "🧅" },
      { name: "Hafer", description: "Hausmittel: schlichte Nahrung — Stand und Alltag, teilen statt Spektakel.", ico: "🥣" },
      { name: "Apfel", description: "Hausmittel: Jahreskreis und Wahl — Frucht als Gabe, Kern als Keim-Symbol.", ico: "🍎" }
    ],
    offerings: [
      { name: "Dankgabe", description: "Opfergabe: schlichter Dank ablegen — Wort, Atem oder kleine Gabe; teilen statt fordern, kein Zwang und keine Initiation.", ico: "🙏" },
      { name: "Wasser", description: "Opfergabe: Klarheit und Fluss — Schale oder Glas ablegen; Haltung der Reinheit, kein Reinigungsversprechen an Personen.", ico: "💧" },
      { name: "Milch", description: "Opfergabe: sanfte Mond- und Nährungs-Gabe — Schälchen ablegen, teilen mit Maß.", ico: "🥛" },
      { name: "Honig", description: "Opfergabe: süße Wärme und Willkommen — Tropfen oder Schälchen; teilen statt binden.", ico: "🍯" },
      { name: "Öl", description: "Opfergabe: Pflege und Salbung als Haltung — Tropfen am Blickfang, keine Heilsalbe.", ico: "🫒" },
      { name: "Brot", description: "Opfergabe: Versorgung und Teilen — Stück oder Laib ablegen, Alltagseid ohne Opferzwang.", ico: "🍞" },
      { name: "Obst", description: "Opfergabe: Frucht und Jahreskreis — frisch ablegen, später teilen oder kompostieren; Respekt vor dem Ort.", ico: "🍇" },
      { name: "Blumen", description: "Opfergabe: Farbe und Duft — Strauß oder einzelne Blüte; ethisch gepflückt oder gekauft, kein Wildfang-Zwang.", ico: "💐" },
      { name: "Kuchen", description: "Opfergabe: Fest und Teilen (u. a. Kreis-Ton) — Stück ablegen und teilen, Maß vor Pathos.", ico: "🧁" },
      { name: "Süßes", description: "Opfergabe: Willkommen und Anziehen mit Maß — Schälchen Zucker, Bonbon oder Frucht; teilen statt binden.", ico: "🍭" },
      { name: "Kerze", description: "Opfergabe: Licht als Gabe — zünden, halten, löschen; Brandschutz achten, keine Initiation.", ico: "🕯️" },
      { name: "Licht", description: "Opfergabe: helles Merkzeichen — Kerze, Lampe oder Tageslicht ehren; Maß statt Spektakel.", ico: "💡" },
      { name: "Weihrauch", description: "Opfergabe: Harzduft und Atem — Raum ehren, Maß statt Spektakel, Brandschutz achten.", ico: "🪔" },
      { name: "Rauch", description: "Opfergabe: sichtbarer Atem und Schwelle — Räucherwerk mit Maß; frische Luft, kein Zwang.", ico: "💨" },
      { name: "Münze", description: "Opfergabe: Ausgleich und Tausch — kleine Münze ablegen oder spenden; kein Kauf von Willen.", ico: "🪙" },
      { name: "Tabak (Symbol)", description: "Opfergabe: Respekt-Gabe in manchen Linien — hier nur Symbolik; nie Rauchzwang, nie Initiation, Ethik und Maß.", ico: "🍂" },
      { name: "Kaffee", description: "Opfergabe: Wachheit und Alltagseid — Tasse oder Schälchen ablegen; Ethik behalten, kein Missbrauch.", ico: "☕" },
      { name: "Tee", description: "Opfergabe: Pause und Atem — Tasse als Schwelle und Dank", ico: "🍵" },
      { name: "Alkohol", description: "Opfergabe: Gabe, Bund und Schwelle — Tropfen oder Becher als Symbolik; Maß und Ethik, kein Trinkzwang, kein Missbrauch, kein Rausch als Praxisziel.", ico: "🥂" },
      { name: "Rum", description: "Opfergabe: warme Opfer- und Willkommens-Gabe (u. a. Hof-/Karibik-Ton) — Schälchen oder Tropfen ablegen; öffentliche Hauspraxis, Maß, kein Trinkzwang, kein Missbrauch, keine Initiation.", ico: "🧉" },
      { name: "Wein", description: "Opfergabe: Gabe und Bund — Schluck oder Tropfen (Hermetik, Wicca, Hof); Maß halten, kein Rauschzwang, kein Missbrauch.", ico: "🍷" },
      { name: "Rotwein", description: "Opfergabe: tiefe Wärme und Bund — Tropfen ethisch ablegen; Maß, kein Trinkzwang.", ico: "🍪" },
      { name: "Weißwein", description: "Opfergabe: hellere Gabe und Klarheit — teilen mit Maß, kein Rausch als Ziel.", ico: "🧀" },
      { name: "Bier", description: "Opfergabe: Herd und Gemeinschaft — Becher als Alltagseid (u. a. nordischer Ton); Maß vor Pathos, kein Trinkzwang.", ico: "🍺" },
      { name: "Met", description: "Opfergabe: Honigwein als Gabe und Ring-Symbol — teilen, Wort halten; Maß und Ethik, kein Missbrauch.", ico: "🐝" },
      { name: "Schnaps", description: "Opfergabe: scharfer Tropfen als Gabe oder Schnitt — winzig ablegen oder ehren; Maß, kein Trinkzwang, kein Missbrauch.", ico: "🫗" },
      { name: "Branntwein", description: "Opfergabe: klarer Geist als Opfer- und Grenz-Symbol — Tropfen mit Respekt; Ethik vor Rausch, kein Missbrauch.", ico: "🫙" },
      { name: "Whisky", description: "Opfergabe: warme Gabe und Feuer-Ton — Becher oder Tropfen als Symbol; Maß halten, kein Trinkzwang.", ico: "🥃" },
      { name: "Cognac", description: "Opfergabe: würdige Gabe und Abschluss — Tropfen ehren, teilen mit Maß, kein Missbrauch.", ico: "🥕" },
      { name: "Likör", description: "Opfergabe: süße Gabe und Willkommen — Schälchen als Symbol; Anziehen mit Maß, kein Trinkzwang.", ico: "🍹" },
      { name: "Champagner", description: "Opfergabe: Fest und Dank — Perlen als Freude-Symbol; teilen statt fordern, Maß, kein Missbrauch.", ico: "🍾" },
      { name: "Sekt", description: "Opfergabe: leichter Festton — Anstoßen als Alltagseid; Maß vor Pathos, kein Trinkzwang.", ico: "🥓" }
    ],
    stones: [
      { name: "Bergkristall", description: "Klarer Fokus-Stein — Haltung und Atem, keine Kristallheilung und keine Messung.", ico: "💎" },
      { name: "Rosenquarz", description: "Sanftes Anziehen-Symbol — Nähe ohne Besitzanspruch", ico: "💗" },
      { name: "Rauchquarz", description: "Weiches Klarheits-Symbol — Raum und Atem, kein Messversprechen.", ico: "🌁" },
      { name: "Amethyst", description: "Stille und Schweigen am Altar — Haltung, nicht Therapie.", ico: "💜" },
      { name: "Citrin", description: "Licht-Stein — Dank und Frische als Haltung, keine Reichtumsgarantie.", ico: "🔆" },
      { name: "Milchquarz", description: "Sanfter Quarz — weicher Blickfang für den Alltagstisch.", ico: "☁️" },
      { name: "Aventurin", description: "Grünes Maß — Wachstum-Blickfang, kein Glücksversprechen.", ico: "🥟" },
      { name: "Obsidian", description: "Dunkler Schnitt als Schutz-Grenze — Symbol", ico: "🌑" },
      { name: "Schwarzer Turmalin", description: "Schutz-Blickfang — Grenze ehren, kein Angriff und", ico: "🖤" },
      { name: "Hämatit", description: "Erdungs-Blickfang: schwer und nah am Boden — Körper zuerst.", ico: "⚓" },
      { name: "Onyx", description: "Nacht-Grenze — schlichter Halt-Stein, kein Angriff.", ico: "⚫" },
      { name: "Labradorit", description: "Schimmer-Stein — Schwelle und Blickwechsel, kein Orakelzwang.", ico: "💠" },
      { name: "Mondstein", description: "Zyklus-Blickfang — Phase achten, nichts erzwingen", ico: "🌙" },
      { name: "Selenit", description: "Mond- und Lichtton — schlichte Klarheit, vorsichtig handhaben", ico: "🍫" },
      { name: "Jaspis", description: "Erd-Stein — Stand und Farbe, Alltag ehren.", ico: "🟧" },
      { name: "Achat", description: "Schichten-Stein — Geduld und Band, Blickfang ohne Therapie-Claim.", ico: "🥔" },
      { name: "Moosachat", description: "Erde und Ankern — Stand nach dem Kreis, Wachstum mit Maß.", ico: "🍀" },
      { name: "Tigerauge", description: "Wachheit und Sonne — Blickfang für klaren Schnitt, kein Mut-Zauber.", ico: "👁️" },
      { name: "Karneol", description: "Wärme und Herdton — Funke als Symbol für Mut mit Maß, nicht für Aggression.", ico: "🔶" },
      { name: "Lapis", description: "Denken-Blickfang — Königsblau am Tisch, Symbol nicht Orakel.", ico: "🔹" },
      { name: "Fluorit", description: "Ordnung der Gedanken — Farbe als Merkzeichen, keine Heilung.", ico: "🌈" },
      { name: "Pyrit", description: "Funke und Prüfung — Hypothesen schärfen, nicht glänzen wollen.", ico: "✨" },
      { name: "Bernstein", description: "Wärme-Blickfang — Honigton am Altar, Symbol nicht Therapie.", ico: "🟠" },
      { name: "Jade", description: "Maß und Dauer — stiller Stein, kein Glücksversprechen.", ico: "🍮" },
      { name: "Türkis", description: "Weg und Himmelston — Reise-Blickfang, respektvoll, keine Heilung.", ico: "🩵" },
      { name: "Malachit", description: "Tiefgrünes Wandel-Symbol — vorsichtig handhaben", ico: "🦚" },
      { name: "Granat", description: "Wurzel und Glut — kleine Wärme, kein Blut- oder Zwangssymbol gegen andere.", ico: "♦️" },
      { name: "Flint", description: "Funke und Feuerstein — Herd und Stand, ohne Spektakel.", ico: "💥" },
      { name: "Flusskiesel", description: "Schlichter Alltags-Blickfang — kleine Praxis statt Spektakel.", ico: "🌊" },
      { name: "Sodalith", description: "Nachtblaues Denk-Symbol — Wort knapper halten, kein Orakelzwang.", ico: "🔵" }
    ],
    colors: [
      { name: "Weiß", description: "Altarfarbe / Kerze: Klarheit und leere Tafel — Haltung", ico: "🍄" },
      { name: "Schwarz", description: "Altarfarbe: Schutz-Grenze, Reset, Schweigen — ohne Angriff.", ico: "⬛" },
      { name: "Grau", description: "Altarfarbe: Neutralität — Beobachtung vor Spektakel.", ico: "🩶" },
      { name: "Silber", description: "Altarfarbe: Mond-Ton — Phase achten, nichts erzwingen.", ico: "🥈" },
      { name: "Gold", description: "Altarfarbe / Kerze: Sonne, Dank, Klarheit der Frage — kein Reichtumszauber.", ico: "🥇" },
      { name: "Rot", description: "Kerze: Kraft-Symbol — Ethik zuerst, nie fremden Willen binden.", ico: "❤️" },
      { name: "Weinrot", description: "Altarfarbe: tiefe Wärme und Bund — teilen, nicht greifen.", ico: "🟥" },
      { name: "Orange", description: "Altarfarbe: Herd und Ermutigung — Funke ohne Drama.", ico: "🧡" },
      { name: "Gelb", description: "Altarfarbe: Willkommen und Licht — teilen statt fordern.", ico: "🍜" },
      { name: "Grün", description: "Altarfarbe: Wachstum mit Maß — Blickfang", ico: "🟩" },
      { name: "Erdbraun", description: "Altarfarbe / Tuch: Stand und Boden — Alltag ehren statt Pathos.", ico: "🟫" },
      { name: "Blau", description: "Altarfarbe: Ruhe und Wasser-Ton — kühlen, nicht erstarren. Symbolik, kein Rat.", ico: "🎍" },
      { name: "Nachtblau", description: "Altarfarbe: stille Tiefe — nur geerdet, ohne Drama.", ico: "🌌" },
      { name: "Indigo", description: "Altarfarbe: Schwelle der Nacht — Schweigen vor dem Wort.", ico: "🧿" },
      { name: "Violett", description: "Altarfarbe: stille Absicht — Ethik vor Spektakel.", ico: "🟣" },
      { name: "Rosa", description: "Altarfarbe: sanfte Nähe ohne Besitzanspruch.", ico: "🩷" },
      { name: "Türkis", description: "Altarfarbe: frischer Fluss — Weg und Atem.", ico: "🩵" },
      { name: "Kupfer", description: "Altarfarbe / Metallton: Leitung und Alltagswärme — Symbol, kein Laborgift.", ico: "🥉" },
      { name: "Knochenweiß", description: "Altarfarbe: Schlichtheit und Gabe — rein als Symbol.", ico: "🦴" },
      { name: "Mintgrün", description: "Altarfarbe: frischer Start und Atem.", ico: "🧆" },
      { name: "Purpur", description: "Altarfarbe: Würde und Maß — kein Herrschaftsanspruch über andere.", ico: "👑" },
      { name: "Waldgrün", description: "Altarfarbe: Kreis im Grünen — Wachstum ohne Gier.", ico: "🥜" }
    ],
    tools: [
      { name: "Kerze", description: "Werkzeug: kleines Herdlicht — Schwelle markieren, Absicht klein halten.", ico: "🕯️" },
      { name: "Kreide", description: "Werkzeug: Kreis und Grenze zeichnen — Symbolik, kein Bann gegen Personen.", ico: "✏️" },
      { name: "Besen", description: "Werkzeug: Raum kehren als Ordnung — Alltag ehren, kein Reinigungsversprechen an Personen.", ico: "🧹" },
      { name: "Becher", description: "Werkzeug: Gabe und Wasser — teilen, nicht spekulieren.", ico: "🏺" },
      { name: "Faden", description: "Werkzeug: Verbindung und Maß — knüpfen als Haltung, nicht als Fesselung anderer.", ico: "🧵" },
      { name: "Spiegel", description: "Werkzeug: Blick zurück auf den eigenen Stand — kein Orakelzwang.", ico: "🪞" },
      { name: "Schale", description: "Werkzeug: Gabe ablegen — teilen statt fordern.", ico: "🍽️" },
      { name: "Glocke", description: "Werkzeug: Ruf und Maß — Ton setzen, nicht zwingen.", ico: "🔔" },
      { name: "Athame (Symbol)", description: "Werkzeug: Schnitt der Absicht — Symbolklinge, nie gegen Personen.", ico: "🗡️" },
      { name: "Beutel", description: "Werkzeug: klein tragen und schließen — Absicht sammeln, kein Zwangspäckchen gegen andere.", ico: "👝" },
      { name: "Altar-Tuch", description: "Werkzeug: Farbe und Grenze des Tisches — Raum ehren, waschen und neu legen.", ico: "🧺" },
      { name: "Weihrauchhalter", description: "Werkzeug: Duft sicher tragen — Maß statt Spektakel, Brandschutz achten.", ico: "🔥" },
      { name: "Mörser", description: "Werkzeug: Stoffe mischen als Haltung — Symbolik, keine Rezeptur und kein Gift.", ico: "⚗️" },
      { name: "Pendel", description: "Werkzeug: ja/nein als Denkhilfe — Feedback auf die eigene Frage, kein Orakelzwang.", ico: "🔮" },
      { name: "Stab / Wand", description: "Werkzeug: Richtung zeigen — Absicht lenken, nie gegen Personen.", ico: "🪄" },
      { name: "Kessel", description: "Werkzeug: Wandlung und Herd — mischen, wärmen, schließen; Alltag, kein Spektakel.", ico: "🫕" },
      { name: "Karten", description: "Werkzeug: Spiegel der Frage — ziehen als Denkhilfe, kein Schicksalszwang.", ico: "🃏" },
      { name: "Trommel", description: "Werkzeug: Rhythmus und Atem — Körper zuerst, Reise nur geerdet.", ico: "🥁" },
      { name: "Rassel", description: "Werkzeug: Rhythmus und Schnitt — Raum markieren, ohne Geister zu fordern.", ico: "🪇" },
      { name: "Feder", description: "Werkzeug: Luft und Protokoll — schreiben oder wehen, ethisch gefunden, kein Wildfang.", ico: "🪶" },
      { name: "Messer (Haus)", description: "Werkzeug: Schnitt und Versorgung — ethisch, nie gegen Personen gerichtet.", ico: "🔪" },
      { name: "Schere", description: "Werkzeug: lösen und kürzen — Faden trennen als Loslassen, kein Schaden.", ico: "✂️" },
      { name: "Nadelkissen", description: "Werkzeug: Nadeln ruhen lassen — Fokus parken, keine Verletzung.", ico: "📌" },
      { name: "Schlüssel", description: "Werkzeug: Hof und Schwelle — öffnen und schließen mit Maß.", ico: "🔑" },
      { name: "Waage (Symbol)", description: "Werkzeug: Ausgleich prüfen — Ethik vor Spektakel.", ico: "⚖️" },
      { name: "Streichhölzer", description: "Werkzeug: Funke setzen — Licht bewusst zünden und löschen.", ico: "🧨" },
      { name: "Buch", description: "Werkzeug: Wort halten — Notiz, Eid, Abschluss; lokal, kein Zwang.", ico: "📖" }
    ],
    links: [
      { name: "Nagel (Eisen)", description: "Bezug: Eisen-Nagel als Grenz- und Festigungs-Symbol — Absicht am Ort fixieren, nie gegen Personen und nie illegal.", ico: "🔩" },
      { name: "Nadel", description: "Bezug: Stich als Merkzeichen für Fokus und Naht — Arbeit am Tuch, keine Verletzung, kein Schaden an anderen.", ico: "🪡" },
      { name: "Haare (eigene)", description: "Bezug: eigenes Haar als persönliches Merkzeichen — nur mit Einwilligung; fremdes Haar ohne Zustimmung ist tabu.", ico: "💇" },
      { name: "Faden / Knoten", description: "Bezug: knüpfen und lösen — Absicht binden oder freigeben; nie fremden Willen fesseln.", ico: "🪢" },
      { name: "Tuch / Fetzen", description: "Bezug: Träger von Farbe und Absicht — einwickeln, ablegen, waschen; Symbolik, kein Zwang.", ico: "🧣" },
      { name: "Erde / Staub", description: "Bezug: Erde vom eigenen Ort als Anker — fremde Erde nicht stehlen, Respekt vor Ort.", ico: "🪴" },
      { name: "Wachs", description: "Bezug: Kerzenwachs formen oder versiegeln — Absicht sichtbar machen, ohne Schaden zu wollen.", ico: "🟡" },
      { name: "Asche", description: "Bezug: Rest und Abschluss — was beendet ist; Loslassen, kein Angriff.", ico: "🌫️" },
      { name: "Knochen (Symbol)", description: "Bezug: nur ethisches Symbol (Nachbildung oder Fund mit Respekt) — kein Wildfang, kein illegaler Besitz.", ico: "🍉" },
      { name: "Foto / Name-Zettel", description: "Bezug: Name oder Bild — nur mit Einwilligung oder für das eigene Selbst; nie heimlich gegen jemanden.", ico: "📷" },
      { name: "Schlüssel", description: "Bezug: öffnen und schließen von Schwellen — Haus, Kapitel, Thema; Symbol der Entscheidung.", ico: "🔑" },
      { name: "Münze", description: "Bezug: Gabe, Ausgleich und Tausch — opfern oder teilen mit Maß, kein Kauf von Willen.", ico: "🪙" },
      { name: "Blut (Symbol)", description: "Bezug: nur eigenes winziges Merkzeichen oder Ersatz (Tinte, Rotwein) — nie fremdes Blut, nie Verletzung, nie Schaden, nie illegal.", ico: "🩸" },
      { name: "Speichel (Symbol)", description: "Bezug: eigenes Merkzeichen auf Papier — intimer Selbstbezug; nie heimlich gegen andere.", ico: "💦" },
      { name: "Fußabdruck (Symbol)", description: "Bezug: eigene Spur als Weg-Symbol — fremde Spur nur mit Einwilligung; kein Nachstellen.", ico: "👣" },
      { name: "Grab-Erde (Symbol)", description: "Bezug: nur Denkbild — niemals Erde von Gräbern nehmen (Respekt, oft verboten). Platzhalter: eigene Gartenerde.", ico: "🪦" },
      { name: "Rost", description: "Bezug: Eisen das Zeit geworden ist — Verfall und Dauer als Blickfang, kein Schaden.", ico: "🌷" },
      { name: "Schwefel (Symbol)", description: "Bezug: Hermetik-Laborbild für Feuer und Schlacke — reines Denkbild, kein chemisches Experiment und kein Gift-Anraten.", ico: "💛" },
      { name: "Quecksilber (Symbol)", description: "Bezug: nur Hermetik-Labor-Symbolik (Flüchtigkeit, Geist) — niemals echtes Quecksilber beschaffen oder verwenden; giftig. Reines Denkbild.", ico: "🍐" }
    ]
  };

  var LEXIKON_KINDS = ['herb', 'kitchen', 'stone', 'color', 'tool', 'link', 'offering'];

  function mergeLexikonLists(pathList, coreList, normalizer) {
    const seen = Object.create(null);
    const out = [];
    function add(raw) {
      const n = normalizer(raw);
      if (!n.name) return;
      const key = n.name.toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      out.push(n);
    }
    (pathList || []).forEach(add);
    (coreList || []).forEach(add);
    return out;
  }

  function getCorrespondences(pathId) {
    const c = CORRESPONDENCES[pathId] || CORRESPONDENCES.esoterik;
    const core = LEXIKON_CORE;
    const out = Object.assign({}, c);
    out.herbs = mergeLexikonLists(c.herbs, core.herbs, normalizeHerb);
    out.kitchen = mergeLexikonLists(c.kitchen, core.kitchen, normalizeKitchen);
    out.offerings = mergeLexikonLists(c.offerings, core.offerings, normalizeOffering);
    out.stones = mergeLexikonLists(c.stones, core.stones, normalizeStone);
    out.colors = mergeLexikonLists(c.colors, core.colors, normalizeColor);
    out.tools = mergeLexikonLists(c.tools, core.tools, normalizeTool);
    out.links = mergeLexikonLists(c.links, core.links, normalizeLink);
    return out;
  }

  function mapPathItems(pathId, kind) {
    const pid = pathId || 'esoterik';
    const path = getPath(pid);
    const c = getCorrespondences(pid);
    const key = kind === 'stone' ? 'stones'
      : kind === 'color' ? 'colors'
      : kind === 'kitchen' ? 'kitchen'
      : kind === 'offering' ? 'offerings'
      : kind === 'tool' ? 'tools'
      : kind === 'link' ? 'links'
      : 'herbs';
    const list = c[key] || [];
    return list.map(function (h) {
      return {
        name: h.name,
        description: h.description,
        ico: h.ico || '',
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
  function getOfferingsForPath(pathId) { return mapPathItems(pathId, 'offering'); }

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
            ico: h.ico || '',
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
          if (!cur.ico && h.ico) cur.ico = h.ico;
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
  function getAllOfferingsDeduped() { return dedupeNamedItems(getOfferingsForPath); }

  function getLexikonForPath(pathId, kind) {
    const k = kind || 'herb';
    if (k === 'kitchen') return getKitchenForPath(pathId);
    if (k === 'offering') return getOfferingsForPath(pathId);
    if (k === 'stone') return getStonesForPath(pathId);
    if (k === 'color') return getColorsForPath(pathId);
    if (k === 'tool') return getToolsForPath(pathId);
    if (k === 'link') return getLinksForPath(pathId);
    return getHerbsForPath(pathId);
  }

  function getAllLexikonDeduped(kind) {
    const k = kind || 'herb';
    if (k === 'kitchen') return getAllKitchenDeduped();
    if (k === 'offering') return getAllOfferingsDeduped();
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


  /** Mond × Planetenstunde → 1–3 Lexikon-Vorschläge (Kräuter / Opfergaben / Farben). */
  var PLANET_LEXIKON = {
    Sonne: [
      { kind: 'offering', name: 'Kerze' },
      { kind: 'color', name: 'Gold' },
      { kind: 'herb', name: 'Rosmarin' }
    ],
    Mond: [
      { kind: 'offering', name: 'Milch' },
      { kind: 'color', name: 'Silber' },
      { kind: 'offering', name: 'Wasser' }
    ],
    Mars: [
      { kind: 'kitchen', name: 'Pfeffer' },
      { kind: 'color', name: 'Rot' },
      { kind: 'herb', name: 'Thymian' }
    ],
    Merkur: [
      { kind: 'offering', name: 'Tee' },
      { kind: 'herb', name: 'Lavendel' },
      { kind: 'tool', name: 'Buch' }
    ],
    Jupiter: [
      { kind: 'offering', name: 'Münze' },
      { kind: 'color', name: 'Blau' },
      { kind: 'offering', name: 'Wein' }
    ],
    Venus: [
      { kind: 'herb', name: 'Rose' },
      { kind: 'offering', name: 'Honig' },
      { kind: 'color', name: 'Rosa' }
    ],
    Saturn: [
      { kind: 'kitchen', name: 'Salz' },
      { kind: 'color', name: 'Schwarz' },
      { kind: 'stone', name: 'Obsidian' }
    ]
  };

  var MOON_LEXIKON = {
    neu: [
      { kind: 'kitchen', name: 'Salz' },
      { kind: 'color', name: 'Schwarz' },
      { kind: 'offering', name: 'Dankgabe' }
    ],
    zunehmend: [
      { kind: 'herb', name: 'Basilikum' },
      { kind: 'color', name: 'Grün' },
      { kind: 'offering', name: 'Obst' }
    ],
    voll: [
      { kind: 'offering', name: 'Wein' },
      { kind: 'offering', name: 'Blumen' },
      { kind: 'color', name: 'Gold' }
    ],
    abnehmend: [
      { kind: 'offering', name: 'Wasser' },
      { kind: 'herb', name: 'Beifuß' },
      { kind: 'link', name: 'Asche' }
    ]
  };

  function resolveLexikonSuggestion(pathId, hint) {
    if (!hint || !hint.name) return null;
    const kind = hint.kind || 'herb';
    const list = getLexikonForPath(pathId, kind) || [];
    const key = String(hint.name).toLowerCase();
    let hit = list.find(function (x) { return String(x.name || '').toLowerCase() === key; });
    if (!hit) {
      // Alle-Pfade fallback
      const all = getAllLexikonDeduped(kind) || [];
      hit = all.find(function (x) { return String(x.name || '').toLowerCase() === key; });
    }
    if (!hit) {
      return {
        name: hint.name,
        description: 'Symbolik der Hauspraxis — Maß und Ethik.',
        ico: hint.ico || '',
        kind: kind,
        pathId: pathId || 'esoterik'
      };
    }
    return {
      name: hit.name,
      description: hit.description,
      ico: hit.ico || '',
      kind: kind,
      pathId: hit.pathId || pathId || 'esoterik'
    };
  }

  function getLexikonHeuteSuggestions(pathId, moonName, planetName) {
    const pid = pathId || 'esoterik';
    const bucket = moonBucket(moonName);
    const planet = String(planetName || '').trim();
    const moonHints = MOON_LEXIKON[bucket] || MOON_LEXIKON.zunehmend;
    const planetAliases = {
      Sun: 'Sonne', Moon: 'Mond', Mercury: 'Merkur', Mars: 'Mars',
      Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn',
      Sonne: 'Sonne', Mond: 'Mond', Merkur: 'Merkur'
    };
    const planetNorm = planetAliases[planet] || planet;
    const planetKey = Object.keys(PLANET_LEXIKON).find(function (k) {
      return planetNorm.indexOf(k) === 0 || k.indexOf(planetNorm) === 0;
    });
    const planetHints = (planetKey && PLANET_LEXIKON[planetKey]) || PLANET_LEXIKON.Sonne;
    // Pick up to 3: 1 moon, 1 planet, 1 path-aware offering/herb
    const picks = [];
    const seen = Object.create(null);
    function add(hint, why) {
      if (!hint || picks.length >= 3) return;
      const key = (hint.kind || '') + ':' + String(hint.name || '').toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      const resolved = resolveLexikonSuggestion(pid, hint);
      if (!resolved) return;
      resolved.why = why;
      picks.push(resolved);
    }
    add(moonHints[0], 'Mondfenster · ' + (bucket === 'neu' ? 'Neumond' : bucket === 'voll' ? 'Vollmond' : bucket === 'abnehmend' ? 'abnehmend' : 'zunehmend'));
    add(planetHints[0], 'Planetenstunde · ' + (planetKey || planet || 'Sonne'));
    // Path flavor
    if (pid === 'nordisch') add({ kind: 'offering', name: 'Met' }, 'Pfad · nordisch');
    else if (pid === 'voodoo' || pid === 'santeria') add({ kind: 'offering', name: 'Rum' }, 'Pfad · Hof');
    else if (pid === 'wicca') add({ kind: 'offering', name: 'Wein' }, 'Pfad · Kreis');
    else if (pid === 'hermetik') add({ kind: 'offering', name: 'Weihrauch' }, 'Pfad · Labor');
    else if (pid === 'chaosmagie') add({ kind: 'offering', name: 'Kaffee' }, 'Pfad · Labor');
    else add(moonHints[1] || planetHints[1], 'Heute · Symbolik');
    // fill
    var i;
    for (i = 1; i < moonHints.length && picks.length < 3; i++) add(moonHints[i], 'Mondfenster');
    for (i = 1; i < planetHints.length && picks.length < 3; i++) add(planetHints[i], 'Planetenstunde');
    return {
      moonBucket: bucket,
      planet: planetKey || planet || '',
      items: picks
    };
  }

  /** Alle Katalog-Namen (längste zuerst) für Ritual-Text-Verlinkung. */
  function getLexikonNameIndex() {
    const kinds = LEXIKON_KINDS;
    const out = [];
    const seen = Object.create(null);
    kinds.forEach(function (kind) {
      (getAllLexikonDeduped(kind) || []).forEach(function (item) {
        const name = String(item.name || '').trim();
        if (!name || name.length < 3) return;
        const key = name.toLowerCase();
        if (seen[key]) return;
        // Skip very generic short words that cause false positives
        if (/^(öl|ei|tee)$/i.test(name)) return;
        seen[key] = true;
        out.push({ name: name, kind: kind, ico: item.ico || '' });
      });
    });
    out.sort(function (a, b) { return b.name.length - a.name.length; });
    return out;
  }

  function findLexikonByName(name, preferredKind) {
    const key = String(name || '').trim().toLowerCase();
    if (!key) return null;
    const order = preferredKind
      ? [preferredKind].concat(LEXIKON_KINDS.filter(function (k) { return k !== preferredKind; }))
      : LEXIKON_KINDS.slice();
    for (var i = 0; i < order.length; i++) {
      const kind = order[i];
      const list = getAllLexikonDeduped(kind) || [];
      const hit = list.find(function (x) { return String(x.name || '').toLowerCase() === key; });
      if (hit) return { name: hit.name, description: hit.description, ico: hit.ico || '', kind: kind, pathId: hit.pathId };
    }
    return null;
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
    ICON_BY_NAME,
    icoForLexikonName,
    lexikonIconSlug,
    hasLexikonIcon,
    lexikonIconSrc,
    lexikonCategoryIconSrc,
    lexikonBlankIconSrc,
    lexikonDisplayIconSrc,
    normalizeHerb,
    normalizeStone,
    normalizeColor,
    normalizeKitchen,
    normalizeTool,
    normalizeLink,
    normalizeOffering,
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
    getOfferingsForPath,
    getAllHerbsDeduped,
    getAllKitchenDeduped,
    getAllStonesDeduped,
    getAllColorsDeduped,
    getAllToolsDeduped,
    getAllLinksDeduped,
    getAllOfferingsDeduped,
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
    getHeuteResonanz,
    getLexikonHeuteSuggestions,
    getLexikonNameIndex,
    findLexikonByName,
    PLANET_LEXIKON,
    MOON_LEXIKON
  };
})(typeof window !== 'undefined' ? window : globalThis);
