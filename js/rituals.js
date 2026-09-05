/**
 * UNIVERSUM — Geführte Rituale, 369, Sicherheit, Atembrücke, Kerzenwache
 * v2.4: path-own guided rituals; shared secondary; Haltung-aware safety/closing helpers
 */
(function (global) {
  'use strict';

  const GUIDED = [
    /* ——— Shared (secondary when path filter is on) ——— */
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
    },

    /* ——— Path-own: Schamanismus ——— */
    {
      id: 'trommel-atem',
      name: 'Trommel-Atem',
      ico: '🥁',
      mins: 8,
      paths: ['schamanismus'],
      own: true,
      breath: true,
      steps: [
        { title: 'Boden', text: 'Setze dich. Füße oder Sitzbein spüren. Keine Geisterreise erzwingen — Körper zuerst.', sec: 45 },
        { title: 'Puls', text: 'Klopfe sanft auf Oberschenkel oder stelle Trommel vor: gleichmäßiger Puls. Atem folgt dem Puls.', sec: 120, breath: true },
        { title: 'Reise-Mini', text: 'Augen halb zu. Frage nur: „Was braucht der Alltag heute?“ Kein Spektakel.', sec: 150 },
        { title: 'Rückkehr', text: 'Puls verlangsamen. Hände, Raum, Wasser. „Ich bin zurück.“', sec: 60 },
        { title: 'Ankern', text: 'Eine kleine Handlung wählen, die den Körper ehrt — stehen, strecken, trinken.', sec: 45 }
      ]
    },
    {
      id: 'ahnenlicht-schaman',
      name: 'Ahnenlicht (Pfad)',
      ico: '🔥',
      mins: 9,
      paths: ['schamanismus'],
      own: true,
      steps: [
        { title: 'Rahmen', text: 'Erinnerung und Kraft der Linie — keine Messung, kein Medium. Handy bleibt Werkzeug, nicht Orakel.', sec: 45 },
        { title: 'Licht', text: 'Kerze oder digitales Licht. Namen nennen, die tragen — ohne Forderung.', sec: 90 },
        { title: 'Atem der Trommel', text: 'Drei lange Ausatmen. Mit dem Feld gehen, nicht dagegen.', sec: 90, breath: true },
        { title: 'Dank', text: 'Dank für Leben und Widerstandskraft. Was du mitnimmst, dient dem Alltag.', sec: 120 },
        { title: 'Löschen', text: 'Licht aus. Boden spüren. Alltag nimmt Raum.', sec: 45 }
      ]
    },

    /* ——— Path-own: Nordisch ——— */
    {
      id: 'mass-eid',
      name: 'Maß und Eid',
      ico: '⚔️',
      mins: 8,
      paths: ['nordisch'],
      own: true,
      steps: [
        { title: 'Grenze', text: 'Was ist heute Maß — und was Übermaß? Ein klarer Satz genügt.', sec: 60 },
        { title: 'Eid prüfen', text: 'Welchen Eid hältst du? Wort und Tat sollen denselben Ring tragen. Ohne Pathos.', sec: 120 },
        { title: 'Setzen', text: 'Formuliere einen kleinen Eid an dich selbst — haltbar heute, ethisch, ohne Schaden.', sec: 90 },
        { title: 'Siegel', text: 'Hand auf Herz oder Tisch. „Ich halte das Maß.“ Stille.', sec: 90 },
        { title: 'Alltag', text: 'Eid mitnehmen als Haltung, nicht als Drama. Weiter.', sec: 40 }
      ]
    },
    {
      id: 'gabe',
      name: 'Gabe',
      ico: '🌾',
      mins: 7,
      paths: ['nordisch'],
      own: true,
      steps: [
        { title: 'Empfangen', text: 'Was hast du schon erhalten — Sippe, Körper, Tag? Nenne drei Dinge.', sec: 60 },
        { title: 'Wählen', text: 'Eine symbolische Gabe: Brotkrume, Wasser, Zeit, ehrliches Wort — kein Kaufzwang.', sec: 90 },
        { title: 'Geben', text: 'Gabe hinlegen oder Tat setzen. Ohne Forderung an Götter oder Menschen.', sec: 120 },
        { title: 'Maß', text: 'Ausgleich: was behältst du, was gibst du weiter? Grenze ehren.', sec: 60 },
        { title: 'Schließen', text: 'Danken. Raum verlassen in Klarheit.', sec: 40 }
      ]
    },

    /* ——— Path-own: Voodoo (Haus only) ——— */
    {
      id: 'hausreinigung-voodoo',
      name: 'Hausreinigung',
      ico: '🏠',
      mins: 10,
      paths: ['voodoo'],
      own: true,
      houseOnly: true,
      steps: [
        { title: 'Disclaimer', text: 'Nur Hauspraxis. Keine Initiation, keine Lwa-Anrufung als Medium. Respekt vor Tradition.', sec: 45 },
        { title: 'Schwelle', text: 'Eingang oder Raumecke: Staub weg, Fenster Luft. Reinheit beginnt im Haus.', sec: 90 },
        { title: 'Wasser und Licht', text: 'Schale Wasser und Kerze/LED. Absicht: Klarheit im Alltag — kein Schaden.', sec: 120 },
        { title: 'Wort', text: '„Was dem Haus nicht dient, darf gehen.“ Kein Fluch auf Personen.', sec: 60 },
        { title: 'Schließen', text: 'Wasser entsorgen (Waschbecken/Erde wo erlaubt). Licht aus. Alltag.', sec: 50 }
      ]
    },
    {
      id: 'licht-wasser',
      name: 'Licht und Wasser',
      ico: '💧',
      mins: 7,
      paths: ['voodoo'],
      own: true,
      houseOnly: true,
      candle: true,
      steps: [
        { title: 'Rahmen', text: 'Öffentliche/Hauspraxis. Kein Ile, keine Einweihung hier. Respekt genügt oft.', sec: 40 },
        { title: 'Setzen', text: 'Wasser und Licht vor dich. Zweck: Reinheit und Dank — nicht Geistermessen.', sec: 60 },
        { title: 'Halten', text: 'Bei Licht und Wasser bleiben. Atmen. Was braucht das Haus heute?', sec: 180, candle: true },
        { title: 'Dank', text: 'Kurzer Dank. Keine Forderungen an Lwa.', sec: 60 },
        { title: 'Ende', text: 'Licht löschen. Wasser achten. Schwelle zum Alltag.', sec: 40 }
      ]
    },

    /* ——— Path-own: Santería (Haus only) ——— */
    {
      id: 'reinigung-ache',
      name: 'Reinigung und Aché',
      ico: '✨',
      mins: 9,
      paths: ['santeria'],
      own: true,
      houseOnly: true,
      steps: [
        { title: 'Disclaimer', text: 'Nur Hauspraxis. Keine Initiation, kein Orisha-Priestertum hier. Aché im Alltag.', sec: 45 },
        { title: 'Raum', text: 'Tisch oder Ecke reinigen. Kerze/LED und klares Wasser wenn möglich.', sec: 90 },
        { title: 'Reinigen', text: 'Hände waschen oder Atem als Abspülen. „Was nicht dient, darf gehen.“', sec: 90, breath: true },
        { title: 'Dank vor Bitte', text: 'Drei Dinge nennen, die schon tragen — bevor du etwas wünschst.', sec: 120 },
        { title: 'Schließen', text: 'Licht achten. Alltag mit Aché im Kleinen fortsetzen.', sec: 45 }
      ]
    },
    {
      id: 'dank-ache',
      name: 'Dank / Aché',
      ico: '🙏',
      mins: 6,
      paths: ['santeria'],
      own: true,
      houseOnly: true,
      steps: [
        { title: 'Rahmen', text: 'Haus, nicht Ile. Dank vor Forderung. Kein Anspruch auf Weihe.', sec: 40 },
        { title: 'Nennen', text: 'Was verdient Dank heute — Körper, Menschen, Arbeit, Ruhe?', sec: 90 },
        { title: 'Kerze der Klarheit', text: 'Licht setzen (oder vorstellen). Wärme ohne Spektakel.', sec: 90 },
        { title: 'Aché', text: 'Ein Satz: „Aché im Kleinen.“ Keine Willensbeugung anderer.', sec: 90 },
        { title: 'Ende', text: 'Licht aus. Mit Dank in den Tag.', sec: 35 }
      ]
    },

    /* ——— Path-own: Hermetik ——— */
    {
      id: 'stunden-halten',
      name: 'Stunden halten',
      ico: '⏳',
      mins: 8,
      paths: ['hermetik'],
      own: true,
      steps: [
        { title: 'Maß', text: 'Kontemplation vor Operation. Welche Stunde trägst du — und passt die Absicht?', sec: 60 },
        { title: 'Proportion', text: 'Oben und unten: ein Symbol wählen, das Maß hält. Kein leerer Glanz.', sec: 90 },
        { title: 'Halten', text: 'Stille. Der Operator bleibt Mensch. Atem ruhig.', sec: 150, breath: true },
        { title: 'Prüfen', text: 'Ist die nächste Handlung ethisch und proportioniert? Wenn nein — stoppen.', sec: 60 },
        { title: 'Schließen', text: 'Symbol ablegen. „Maß gehalten.“ Alltag.', sec: 40 }
      ]
    },
    {
      id: 'weihe-hermetik',
      name: 'Weihe (Maß)',
      ico: '🔮',
      mins: 10,
      paths: ['hermetik'],
      own: true,
      steps: [
        { title: 'Ethik', text: 'Zweck des Werkzeugs: klar, ohne Schaden, ohne fremde Willensbeugung.', sec: 60 },
        { title: 'Kreis-Mini', text: 'Symbolisch Raum halten. „Dieser Raum dient der Klarheit.“', sec: 60 },
        { title: 'Reinigen', text: 'Gegenstand reinigen (Tuch, Atem, Licht). Kontemplation.', sec: 90 },
        { title: 'Widmen', text: 'Ein Satz der Widmung. Symbol mit Ethik — nicht Spektakel.', sec: 120 },
        { title: 'Ablegen', text: 'Platz zuweisen. Kreis öffnen. Wasser trinken.', sec: 50 }
      ]
    },

    /* ——— Path-own: Wicca ——— */
    {
      id: 'elemente',
      name: 'Elemente',
      ico: '🜃',
      mins: 9,
      paths: ['wicca'],
      own: true,
      steps: [
        { title: 'Rede', text: 'An es schadet niemandem. Prüfe Absicht bevor du Elemente rufst.', sec: 45 },
        { title: 'Erde', text: 'Körper und Boden. Was trägt dich heute?', sec: 60 },
        { title: 'Luft', text: 'Atem und Klarheit. Ein Gedanke, der dienen darf.', sec: 60, breath: true },
        { title: 'Feuer', text: 'Absicht als Wärme — nicht als Zorn gegen Personen.', sec: 60 },
        { title: 'Wasser', text: 'Gefühl anerkennen, ohne es über andere zu gießen.', sec: 60 },
        { title: 'Kreis schließen', text: 'Elemente danken. Kreis halten und öffnen. Alltag.', sec: 50 }
      ]
    },
    {
      id: 'sabbat-segen',
      name: 'Sabbat-Segen',
      ico: '🌙',
      mins: 7,
      paths: ['wicca'],
      own: true,
      steps: [
        { title: 'Rhythmus', text: 'Sabbat ist Atem des Jahres — auch außerhalb des Datums spürbar. Kein Pflichtzwang.', sec: 45 },
        { title: 'Kreis', text: 'Kleinen Kreis ziehen. „Ich halte den Kreis in Frieden.“', sec: 60 },
        { title: 'Segen', text: 'Segen für dich, Haus oder Gemeinschaft — nie gegen jemanden.', sec: 120 },
        { title: 'Ausgleich', text: 'Eine kleine gute Tat oder Dank als Ausgleich.', sec: 60 },
        { title: 'Öffnen', text: 'Kreis öffnen. „Der Raum ist frei.“', sec: 40 }
      ]
    },

    /* ——— Path-own: Chaosmagie ——— */
    {
      id: 'sigil-gnosis',
      name: 'Sigil-Gnosis',
      ico: '🔯',
      mins: 10,
      paths: ['chaosmagie'],
      own: true,
      steps: [
        { title: 'Ethik', text: 'Absicht ethisch? Kein Schaden, keine Willensbeugung. Sonst stoppen.', sec: 60 },
        { title: 'Statement', text: 'Satz positiv formulieren. Dann zu Sigil verdichten (Buchstaben kürzen / zeichnen).', sec: 120 },
        { title: 'Gnosis-kurz', text: 'Kurzer Fokus: Atem, Starren oder Bewegung — laden, nicht endlos halten.', sec: 150, breath: true },
        { title: 'Vergessen-Ansatz', text: 'Sigil zur Seite. Ergebnis nicht jagen. Modell ablegen.', sec: 90 },
        { title: 'Alltag', text: 'Praxis zu. Nichts ist wahr — Ethik bleibt.', sec: 40 }
      ]
    },
    {
      id: 'vergessen',
      name: 'Vergessen',
      ico: '🌫️',
      mins: 6,
      paths: ['chaosmagie'],
      own: true,
      steps: [
        { title: 'Benennen', text: 'Was hast du geladen und darfst jetzt loslassen? Ein Wort genügt.', sec: 45 },
        { title: 'Ablenken', text: 'Kurze bewusste Ablenkung: zählen, dehnen, Raum ordnen — ohne Drama.', sec: 90 },
        { title: 'Schnitt', text: '„Geladen. Vergessen.“ Ergebnis-Jagd stoppen.', sec: 60 },
        { title: 'Ethik-Check', text: 'Hält die Absicht noch ohne Schaden? Wenn nein — korrigieren.', sec: 60 },
        { title: 'Fertig', text: 'Weiter im Alltag. Modell abgelegt.', sec: 30 }
      ]
    },

    /* ——— Path-own: Esoterik ——— */
    {
      id: 'schwelle',
      name: 'Schwelle',
      ico: '🚪',
      mins: 7,
      paths: ['esoterik'],
      own: true,
      breath: true,
      steps: [
        { title: 'Ankommen', text: 'Still üben. Daten bleiben bei dir. Ein Handy kann keine Geister messen.', sec: 40 },
        { title: 'Atem', text: '4 ein — 6 aus. Feldlicht begleiten, nicht erzwingen.', sec: 120, breath: true, breathIn: 4, breathOut: 6 },
        { title: 'Intention', text: 'Ein klarer Satz. Praxiswerkzeug, kein Schaukasten.', sec: 90 },
        { title: 'Ausgleich', text: 'Was gibst du zurück an den Tag? Ruhe, Ordnung, Dank.', sec: 60 },
        { title: 'Durchgehen', text: 'Schwelle halten und öffnen. Alltag mit Klarheit.', sec: 40 }
      ]
    },
    {
      id: 'mondarbeit',
      name: 'Mondarbeit',
      ico: '🌕',
      mins: 8,
      paths: ['esoterik'],
      own: true,
      steps: [
        { title: 'Phase spüren', text: 'Neu: setzen. Voll: klären/lösen. Dazwischen: pflegen. Ohne Astro-Anspruch.', sec: 60 },
        { title: 'Absicht', text: 'Passende, ethische Absicht wählen — klein und ehrlich.', sec: 90 },
        { title: 'Licht oder Dunkel', text: 'Kerze oder Stille. Atem. Kein Spektakel.', sec: 150 },
        { title: 'Notieren', text: 'Ein Satz fürs Tagebuch (mental ok). Daten bleiben lokal.', sec: 60 },
        { title: 'Schließen', text: 'Danken. Mond ist Rhythmus, nicht Befehl.', sec: 40 }
      ]
    },
    {
      id: 'lostag-achtung',
      name: 'Lostag-Achtung',
      ico: '📜',
      mins: 6,
      paths: ['esoterik'],
      own: true,
      steps: [
        { title: 'Rahmen', text: 'Lostage und Rauhnächte: Achtung, Probe, Stille — kein Orakel-Zwang.', sec: 45 },
        { title: 'Beobachten', text: 'Was zeigt der Tag ohne Drama? Ein Eindruck genügt.', sec: 90 },
        { title: 'Halten', text: 'Keine große Operation. Feldlicht still begleiten.', sec: 90, breath: true },
        { title: 'Merken', text: 'Optional: ein Wort notieren. Keine Vorhersage verkaufen.', sec: 60 },
        { title: 'Ende', text: 'Achtung wahren. Alltag fortsetzen.', sec: 35 }
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

  function isOwnForPath(r, pathId) {
    if (!r || !pathId) return false;
    if (r.own && r.paths && r.paths.includes(pathId)) return true;
    return false;
  }

  /** Path filter: include shared (paths null) + path-listed; sort own first, then recommended, then shared. */
  function listForPath(pathId, opts) {
    opts = opts || {};
    const recommended = opts.recommendedRitual || null;
    const list = GUIDED.filter(r => !r.paths || r.paths.includes(pathId));
    return list.slice().sort((a, b) => {
      const aOwn = isOwnForPath(a, pathId) ? 0 : 1;
      const bOwn = isOwnForPath(b, pathId) ? 0 : 1;
      if (aOwn !== bOwn) return aOwn - bOwn;
      const aRec = recommended && a.id === recommended ? 0 : 1;
      const bRec = recommended && b.id === recommended ? 0 : 1;
      if (aRec !== bRec) return aRec - bRec;
      return 0;
    });
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
    isOwnForPath,
    vibrate
  };
})(typeof window !== 'undefined' ? window : globalThis);
