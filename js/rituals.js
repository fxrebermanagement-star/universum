/**
 * UNIVERSUM — Geführte Rituale, 369, Sicherheit, Atembrücke, Kerzenwache
 * v3.2: Praxis-Sessions — Absicht → Körper (3–7) → Schließen · Dauer-Tags · Signaturen
 */
(function (global) {
  'use strict';

  const GUIDED = [
    /* ——— Shared (secondary when path filter is on) ——— */
    {
      id: 'erdung',
      name: 'Erdung',
      ico: '🌱',
      mins: 3,
      paths: null,
      breath: true,
      intention: 'Ich komme in den Körper — ohne Spektakel.',
      journal: 'Wo spürst du den Boden jetzt am klarsten?',
      steps: [
        { phase: 'intention', title: 'Absicht', text: 'Grenze und Ausgleich. Kein Schaden. Nur: hier sein.', sec: 25 },
        { phase: 'body', title: 'Stand', text: 'Füße fest. Schultern sinken. Drei bewusste Atemzüge.', sec: 45, breath: true },
        { phase: 'body', title: 'Wurzel', text: 'Gewicht an den Boden abgeben — Kraft bleibt bei dir.', sec: 60 },
        { phase: 'closing', title: 'Schließen', text: '„Ich bin hier.“ Augen öffnen. Schluck Wasser.', sec: 30 }
      ]
    },
    {
      id: 'atem46',
      name: 'Atembrücke 4/6',
      ico: '🌬️',
      mins: 3,
      paths: null,
      breath: true,
      intention: 'Atem als Brücke in den Alltag — nicht als Flucht.',
      journal: 'War der Ausatem länger und ruhiger?',
      steps: [
        { phase: 'intention', title: 'Absicht', text: 'Nur Atmen. Kein Orakel, keine Messung.', sec: 20 },
        { phase: 'body', title: 'Haltung', text: 'Bequem sitzen. Kiefer locker. Handy stumm.', sec: 25 },
        { phase: 'body', title: 'Rhythmus', text: 'Einatmen 4 — Ausatmen 6. Sanft durch die Nase wenn möglich.', sec: 90, breath: true, breathIn: 4, breathOut: 6 },
        { phase: 'closing', title: 'Rückkehr', text: 'Normal atmen. Augen öffnen. Bereit für den nächsten Schritt.', sec: 25 }
      ]
    },
    {
      id: 'intention',
      name: 'Intention setzen',
      ico: '🎯',
      mins: 3,
      paths: null,
      intention: 'Eine ethische Absicht — klar, klein, ohne Schaden.',
      journal: 'Welche eine Handlung folgt heute aus dem Satz?',
      steps: [
        { phase: 'intention', title: 'Prüfen', text: 'Klar? Ethisch? Ohne Schaden an Personen? Wenn nein — stoppen.', sec: 40 },
        { phase: 'body', title: 'Formulieren', text: 'Ein positiver Satz in Gegenwart: „Ich übe …“', sec: 50 },
        { phase: 'body', title: 'Verankern', text: 'Dreimal sagen. Eine kleine nächste Handlung wählen (heute machbar).', sec: 50 },
        { phase: 'closing', title: 'Loslassen des Zwangs', text: 'Absicht halten, Ergebnis nicht erzwingen. Schließen.', sec: 30 }
      ]
    },
    {
      id: 'schutzfeld',
      name: 'Schutzfeld',
      ico: '🛡️',
      mins: 11,
      paths: null,
      breath: true,
      intention: 'Schutz heißt Nein können — nicht angreifen.',
      journal: 'Welche Grenze hast du heute klarer gespürt?',
      steps: [
        { phase: 'intention', title: 'Absicht', text: 'Grenze und Ausgleich. Kein Fluch, kein Schaden.', sec: 40 },
        { phase: 'body', title: 'Atem', text: 'Einatmen: Klarheit. Ausatmen: Spannung abgeben. 4×.', sec: 90, breath: true },
        { phase: 'body', title: 'Feld', text: 'Ruhige Hülle um dich — durchlässig für Gutes, klar gegen Übergriff.', sec: 120 },
        { phase: 'body', title: 'Wort', text: '„Ich halte meine Grenze in Frieden.“', sec: 60 },
        { phase: 'closing', title: 'Alltag', text: 'Öffne sanft. Schutz bleibt Haltung, nicht Panik.', sec: 40 }
      ]
    },
    {
      id: 'loslassen',
      name: 'Loslassen',
      ico: '🍃',
      mins: 11,
      paths: null,
      breath: true,
      intention: 'Etwas darf gehen — ohne Schaden an Personen.',
      journal: 'Was hast du entlassen — und was darf an die Stelle?',
      steps: [
        { phase: 'intention', title: 'Benennen', text: 'Was darf gehen? Ein Wort oder Satz (mental oder Papier).', sec: 70 },
        { phase: 'body', title: 'Körper', text: 'Schultern, Kiefer, Bauch prüfen. Spannung anerkennen ohne Drama.', sec: 50 },
        { phase: 'body', title: 'Übergabe', text: 'Atem: ein — halten — aus und „ich lasse los“.', sec: 100, breath: true },
        { phase: 'body', title: 'Ersatz', text: 'Eine kleine, ethische Intention an die Stelle setzen.', sec: 70 },
        { phase: 'closing', title: 'Schluss', text: 'Papier entsorgen oder Satz streichen. Zurück in den Raum.', sec: 40 }
      ]
    },
    {
      id: 'kreis',
      name: 'Kreis ziehen',
      ico: '⭕',
      mins: 11,
      paths: null,
      intention: 'Raum halten — Symbol, du bleibst verantwortlich.',
      journal: 'Hat der Kreis Klarheit gegeben oder nur Theater?',
      steps: [
        { phase: 'intention', title: 'Vorbereitung', text: 'Raum lüften. Ethik: kein Schaden, klare Absicht.', sec: 50 },
        { phase: 'body', title: 'Mittelpunkt', text: 'Mittig stehen oder sitzen. Vier Richtungen oder „rundherum“ spüren.', sec: 50 },
        { phase: 'body', title: 'Kreis', text: 'Mit Hand oder Blick Kreis ziehen. „Dieser Raum hält.“', sec: 80 },
        { phase: 'body', title: 'Halten', text: 'Ruhig atmen. Der Kreis ist Symbol — keine Machtfantasie.', sec: 100, breath: true },
        { phase: 'closing', title: 'Öffnen', text: 'Kreis bewusst auflösen. „Der Raum ist frei.“ Danken.', sec: 50 }
      ]
    },
    {
      id: 'kerze15',
      name: 'Kerzenwache',
      ico: '🔥',
      mins: 21,
      paths: null,
      candle: true,
      intention: 'Wachsamkeit und Stille — kein Schaden, echte Sicherheit.',
      journal: 'Was ist in der Stille aufgetaucht — ohne es zu jagen?',
      steps: [
        { phase: 'intention', title: 'Sicherheit', text: 'Echte Kerze nur unter Aufsicht. Sonst LED. Kein Vorhang in Nähe.', sec: 45 },
        { phase: 'body', title: 'Zünden', text: 'Licht setzen. Absicht: Wachsamkeit — kein Fluch.', sec: 40 },
        { phase: 'body', title: 'Wache', text: 'Bei der Flamme bleiben. Gedanken kommen und gehen. Atmen.', sec: 1080, candle: true },
        { phase: 'closing', title: 'Löschen', text: 'Flamme löschen. Danken. Raum erst verlassen wenn sicher.', sec: 45 }
      ]
    },
    {
      id: '369',
      name: '369-Praxis',
      ico: '3️⃣',
      mins: 11,
      paths: ['chaosmagie', 'esoterik', 'hermetik'],
      practice369: true,
      intention: 'Ethischer Satz · laden ohne Willensbeugung · dann loslassen.',
      journal: 'Welchen Satz hast du gewählt — und hast du ihn wirklich losgelassen?',
      steps: [
        { phase: 'intention', title: 'Satz', text: 'Formuliere einen ethischen 369-Satz (kein Schaden, keine Willensbeugung).', sec: 60 },
        { phase: 'body', title: 'Morgen ×3', text: 'Schreibe oder sprich den Satz 3× (morgens gedacht).', sec: 70, slot369: 'morning', count369: 3 },
        { phase: 'body', title: 'Nachmittag ×6', text: '6× — fokussiert, ohne Zwang.', sec: 100, slot369: 'afternoon', count369: 6 },
        { phase: 'body', title: 'Abend ×9', text: '9× — dann loslassen wie beim Sigil.', sec: 120, slot369: 'evening', count369: 9 },
        { phase: 'closing', title: 'Schließen', text: 'Praxis beenden. Ergebnis nicht jagen. Alltag.', sec: 30 }
      ]
    },

    /* ——— Path-own: Schamanismus ——— */
    {
      id: 'trommel-atem',
      name: 'Trommelpuls',
      ico: '🥁',
      mins: 11,
      paths: ['schamanismus'],
      own: true,
      signature: true,
      breath: true,
      intention: 'Körper zuerst — Puls vor Spektakel. Keine erzwungene Geisterreise.',
      journal: 'Welche eine Alltagshandlung ehrt den Körper nach dem Puls?',
      steps: [
        { phase: 'intention', title: 'Absicht', text: 'Mit dem Feld gehen, nicht dagegen. Kein Medium, kein Drama.', sec: 40 },
        { phase: 'body', title: 'Boden', text: 'Setze dich. Füße oder Sitzbein. Körper zuerst.', sec: 45 },
        { phase: 'body', title: 'Puls', text: 'Sanft auf Oberschenkel klopfen oder Trommel vorstellen. Atem folgt dem Puls.', sec: 120, breath: true },
        { phase: 'body', title: 'Frage', text: 'Augen halb zu. Nur: „Was braucht der Alltag heute?“', sec: 100 },
        { phase: 'body', title: 'Rückkehr', text: 'Puls verlangsamen. Hände, Raum, Wasser. „Ich bin zurück.“', sec: 55 },
        { phase: 'closing', title: 'Ankern', text: 'Eine kleine Handlung: stehen, strecken, trinken. Schließen.', sec: 40 }
      ]
    },
    {
      id: 'ahnenlicht-schaman',
      name: 'Knochenlicht',
      ico: '🔥',
      mins: 11,
      paths: ['schamanismus'],
      own: true,
      signature: true,
      intention: 'Ahnen ehren als Kraft der Linie — ohne Geister zu messen oder zu fordern.',
      journal: 'Welchen Namen oder welche Haltung nimmst du heute mit?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Erinnerung und Dank. Ein Handy kann keine Geister messen.', sec: 40 },
        { phase: 'body', title: 'Licht', text: 'Kerze oder digitales Licht. Namen nennen, die tragen — ohne Forderung.', sec: 80 },
        { phase: 'body', title: 'Atem der Trommel', text: 'Drei lange Ausatmen. Mit dem Feld gehen.', sec: 80, breath: true },
        { phase: 'body', title: 'Dank', text: 'Dank für Leben und Widerstandskraft. Was du mitnimmst, dient dem Alltag.', sec: 100 },
        { phase: 'closing', title: 'Löschen', text: 'Licht aus. Boden spüren. Alltag nimmt Raum.', sec: 40 }
      ]
    },

    /* ——— Path-own: Nordisch ——— */
    {
      id: 'mass-eid',
      name: 'Ringwort',
      ico: '⚔️',
      mins: 11,
      paths: ['nordisch'],
      own: true,
      signature: true,
      intention: 'Wort und Tat im selben Ring — Maß, nicht Pathos. Kein Schaden.',
      journal: 'Welchen kleinen Eid hältst du heute wirklich?',
      steps: [
        { phase: 'intention', title: 'Maß', text: 'Was ist heute Maß — und was Übermaß? Ein klarer Satz genügt.', sec: 50 },
        { phase: 'body', title: 'Eid prüfen', text: 'Welchen Eid hältst du schon? Wort und Tat sollen denselben Ring tragen.', sec: 100 },
        { phase: 'body', title: 'Setzen', text: 'Kleiner Eid an dich selbst — haltbar heute, ethisch, ohne Schaden.', sec: 80 },
        { phase: 'body', title: 'Siegel', text: 'Hand auf Herz oder Tisch. „Ich halte das Maß.“ Stille.', sec: 80 },
        { phase: 'closing', title: 'Alltag', text: 'Eid als Haltung mitnehmen, nicht als Drama. Weiter.', sec: 35 }
      ]
    },
    {
      id: 'gabe',
      name: 'Gastgabe',
      ico: '🌾',
      mins: 11,
      paths: ['nordisch'],
      own: true,
      signature: true,
      intention: 'Geben ohne Forderung — Ausgleich und Grenze ehren.',
      journal: 'Was hast du gegeben — und was behältst du mit Maß?',
      steps: [
        { phase: 'intention', title: 'Empfangen', text: 'Was hast du schon erhalten — Sippe, Körper, Tag? Nenne drei Dinge.', sec: 55 },
        { phase: 'body', title: 'Wählen', text: 'Symbolische Gabe: Brotkrume, Wasser, Zeit, ehrliches Wort — kein Kaufzwang.', sec: 70 },
        { phase: 'body', title: 'Geben', text: 'Gabe hinlegen oder Tat setzen. Ohne Forderung an Götter oder Menschen.', sec: 100 },
        { phase: 'body', title: 'Maß', text: 'Ausgleich: was behältst du, was gibst du weiter?', sec: 55 },
        { phase: 'closing', title: 'Schließen', text: 'Danken. Raum in Klarheit verlassen.', sec: 35 }
      ]
    },

    /* ——— Path-own: Voodoo (Haus only) ——— */
    {
      id: 'hausreinigung-voodoo',
      name: 'Schwellenwasser',
      ico: '🏠',
      mins: 11,
      paths: ['voodoo'],
      own: true,
      signature: true,
      houseOnly: true,
      intention: 'Nur Hauspraxis — Reinheit an der Schwelle. Keine Initiation, kein Medium.',
      journal: 'Welche Ecke des Hauses fühlt sich klarer an?',
      steps: [
        { phase: 'intention', title: 'Disclaimer', text: 'Nur Hauspraxis. Keine Lwa-Anrufung als Medium. Respekt vor Tradition.', sec: 40 },
        { phase: 'body', title: 'Schwelle', text: 'Eingang oder Raumecke: Staub weg, Fenster Luft. Reinheit beginnt im Haus.', sec: 80 },
        { phase: 'body', title: 'Wasser und Licht', text: 'Schale Wasser und Kerze/LED. Absicht: Klarheit im Alltag — kein Schaden.', sec: 100 },
        { phase: 'body', title: 'Wort', text: '„Was dem Haus nicht dient, darf gehen.“ Kein Fluch auf Personen.', sec: 55 },
        { phase: 'closing', title: 'Schließen', text: 'Wasser entsorgen (Waschbecken/Erde wo erlaubt). Licht aus. Alltag.', sec: 45 }
      ]
    },
    {
      id: 'licht-wasser',
      name: 'Weißes Licht',
      ico: '💧',
      mins: 11,
      paths: ['voodoo'],
      own: true,
      signature: true,
      houseOnly: true,
      candle: true,
      intention: 'Licht und Wasser im Haus — Dank ohne Forderung an Lwa.',
      journal: 'Was braucht das Haus heute noch — praktisch, nicht spektakulär?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Öffentliche Hauspraxis. Kein Ile, keine Einweihung hier.', sec: 35 },
        { phase: 'body', title: 'Setzen', text: 'Wasser und Licht vor dich. Zweck: Reinheit und Dank — nicht Geistermessen.', sec: 55 },
        { phase: 'body', title: 'Halten', text: 'Bei Licht und Wasser bleiben. Atmen. Was braucht das Haus?', sec: 150, candle: true },
        { phase: 'body', title: 'Dank', text: 'Kurzer Dank. Keine Forderungen.', sec: 50 },
        { phase: 'closing', title: 'Ende', text: 'Licht löschen. Wasser achten. Schwelle zum Alltag.', sec: 35 }
      ]
    },

    /* ——— Path-own: Santería (Haus only) ——— */
    {
      id: 'reinigung-ache',
      name: 'Haus-Aché',
      ico: '✨',
      mins: 11,
      paths: ['santeria'],
      own: true,
      signature: true,
      houseOnly: true,
      intention: 'Aché im Alltag — Hauspraxis ohne Ile-Anspruch, ohne Initiation.',
      journal: 'Welche drei Dinge tragen dich schon — bevor du etwas wünschst?',
      steps: [
        { phase: 'intention', title: 'Disclaimer', text: 'Nur Hauspraxis. Kein Orisha-Priestertum hier. Respekt genügt.', sec: 40 },
        { phase: 'body', title: 'Raum', text: 'Tisch oder Ecke reinigen. Kerze/LED und klares Wasser wenn möglich.', sec: 75 },
        { phase: 'body', title: 'Reinigen', text: 'Hände waschen oder Atem als Abspülen. „Was nicht dient, darf gehen.“', sec: 75, breath: true },
        { phase: 'body', title: 'Dank vor Bitte', text: 'Drei Dinge nennen, die schon tragen — bevor du etwas wünschst.', sec: 100 },
        { phase: 'closing', title: 'Schließen', text: 'Licht achten. Alltag mit Aché im Kleinen fortsetzen.', sec: 40 }
      ]
    },
    {
      id: 'dank-ache',
      name: 'Drei Danke',
      ico: '🙏',
      mins: 3,
      paths: ['santeria'],
      own: true,
      signature: true,
      houseOnly: true,
      intention: 'Dank vor Forderung — kurz, ehrlich, geschlossen.',
      journal: 'Welches der drei Danke bleibt den Tag über spürbar?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Haus, nicht Ile. Kein Anspruch auf Weihe.', sec: 25 },
        { phase: 'body', title: 'Nennen', text: 'Drei Danke: Körper, Menschen oder Arbeit, Ruhe.', sec: 55 },
        { phase: 'body', title: 'Aché', text: 'Ein Satz: „Aché im Kleinen.“ Keine Willensbeugung anderer.', sec: 45 },
        { phase: 'closing', title: 'Ende', text: 'Mit Dank in den Tag. Schließen.', sec: 25 }
      ]
    },

    /* ——— Path-own: Hermetik ——— */
    {
      id: 'stunden-halten',
      name: 'Operator-Stunde',
      ico: '⏳',
      mins: 11,
      paths: ['hermetik'],
      own: true,
      signature: true,
      intention: 'Kontemplation vor Operation — Maß halten, Operator bleibt Mensch.',
      journal: 'Passte Absicht und Stunde — oder hast du gestoppt?',
      steps: [
        { phase: 'intention', title: 'Maß', text: 'Welche Stunde trägst du — und passt die Absicht? Ethik zuerst.', sec: 50 },
        { phase: 'body', title: 'Proportion', text: 'Oben und unten: ein Symbol wählen, das Maß hält. Kein leerer Glanz.', sec: 80 },
        { phase: 'body', title: 'Halten', text: 'Stille. Atem ruhig. Der Operator bleibt Mensch.', sec: 130, breath: true },
        { phase: 'body', title: 'Prüfen', text: 'Ist die nächste Handlung ethisch und proportioniert? Wenn nein — stoppen.', sec: 55 },
        { phase: 'closing', title: 'Schließen', text: 'Symbol ablegen. „Maß gehalten.“ Alltag.', sec: 35 }
      ]
    },
    {
      id: 'weihe-hermetik',
      name: 'Siegel der Proportion',
      ico: '🔮',
      mins: 11,
      paths: ['hermetik'],
      own: true,
      signature: true,
      intention: 'Werkzeug weihen mit Ethik — Symbol, nicht Spektakel.',
      journal: 'Welchem Zweck dient das Werkzeug jetzt klarer?',
      steps: [
        { phase: 'intention', title: 'Ethik', text: 'Zweck klar, ohne Schaden, ohne fremde Willensbeugung.', sec: 50 },
        { phase: 'body', title: 'Raum', text: 'Symbolisch Raum halten. „Dieser Raum dient der Klarheit.“', sec: 50 },
        { phase: 'body', title: 'Reinigen', text: 'Gegenstand reinigen (Tuch, Atem, Licht). Kontemplation.', sec: 80 },
        { phase: 'body', title: 'Widmen', text: 'Ein Satz der Widmung. Symbol mit Ethik.', sec: 100 },
        { phase: 'closing', title: 'Ablegen', text: 'Platz zuweisen. Raum öffnen. Wasser trinken.', sec: 40 }
      ]
    },

    /* ——— Path-own: Wicca ——— */
    {
      id: 'elemente',
      name: 'Vier-Wege',
      ico: '🜃',
      mins: 11,
      paths: ['wicca'],
      own: true,
      signature: true,
      intention: 'An es schadet niemandem — Elemente prüfen, Kreis halten.',
      journal: 'Welches Element fehlte — und was tust du praktisch dafür?',
      steps: [
        { phase: 'intention', title: 'Rede', text: 'Prüfe Absicht bevor du Elemente rufst. Kein Schaden.', sec: 40 },
        { phase: 'body', title: 'Erde', text: 'Körper und Boden. Was trägt dich heute?', sec: 50 },
        { phase: 'body', title: 'Luft', text: 'Atem und Klarheit. Ein Gedanke, der dienen darf.', sec: 50, breath: true },
        { phase: 'body', title: 'Feuer', text: 'Absicht als Wärme — nicht als Zorn gegen Personen.', sec: 50 },
        { phase: 'body', title: 'Wasser', text: 'Gefühl anerkennen, ohne es über andere zu gießen.', sec: 50 },
        { phase: 'closing', title: 'Kreis schließen', text: 'Elemente danken. Kreis öffnen. Alltag.', sec: 45 }
      ]
    },
    {
      id: 'sabbat-segen',
      name: 'Rede und Segen',
      ico: '🌙',
      mins: 11,
      paths: ['wicca'],
      own: true,
      signature: true,
      intention: 'Segen im Jahresatem — nie gegen jemanden. Ausgleich geben.',
      journal: 'Welchen Segen hast du gesprochen — und welchen Ausgleich setzt du?',
      steps: [
        { phase: 'intention', title: 'Rhythmus', text: 'Sabbat ist Atem des Jahres — auch außerhalb des Datums. Kein Pflichtzwang.', sec: 40 },
        { phase: 'body', title: 'Kreis', text: 'Kleinen Kreis ziehen. „Ich halte den Kreis in Frieden.“', sec: 55 },
        { phase: 'body', title: 'Segen', text: 'Segen für dich, Haus oder Gemeinschaft — nie gegen jemanden.', sec: 100 },
        { phase: 'body', title: 'Ausgleich', text: 'Eine kleine gute Tat oder Dank als Ausgleich.', sec: 55 },
        { phase: 'closing', title: 'Öffnen', text: 'Kreis öffnen. „Der Raum ist frei.“', sec: 35 }
      ]
    },

    /* ——— Path-own: Chaosmagie ——— */
    {
      id: 'sigil-gnosis',
      name: 'Gnosis-Schnitt',
      ico: '🔯',
      mins: 11,
      paths: ['chaosmagie'],
      own: true,
      signature: true,
      intention: 'Laden, schneiden, vergessen — Ethik vor Gnosis. Kein Schaden.',
      journal: 'Hast du wirklich vergessen — oder jagst du noch das Ergebnis?',
      steps: [
        { phase: 'intention', title: 'Ethik', text: 'Absicht ethisch? Kein Schaden, keine Willensbeugung. Sonst stoppen.', sec: 50 },
        { phase: 'body', title: 'Statement', text: 'Satz positiv. Dann zu Sigil verdichten (kürzen / zeichnen).', sec: 100 },
        { phase: 'body', title: 'Gnosis-kurz', text: 'Kurzer Fokus: Atem, Starren oder Bewegung — laden, nicht endlos halten.', sec: 120, breath: true },
        { phase: 'body', title: 'Schnitt', text: 'Sigil zur Seite. „Geladen. Vergessen.“ Ergebnis nicht jagen.', sec: 70 },
        { phase: 'closing', title: 'Alltag', text: 'Praxis zu. Nichts ist wahr — Ethik bleibt.', sec: 35 }
      ]
    },
    {
      id: 'vergessen',
      name: 'Vergiss-Schnitt',
      ico: '🌫️',
      mins: 3,
      paths: ['chaosmagie'],
      own: true,
      signature: true,
      intention: 'Was geladen ist, darf gehen — Modell ablegen.',
      journal: 'Welches Wort hast du entlassen?',
      steps: [
        { phase: 'intention', title: 'Benennen', text: 'Was hast du geladen und darfst jetzt loslassen? Ein Wort genügt.', sec: 30 },
        { phase: 'body', title: 'Ablenken', text: 'Kurze Ablenkung: zählen, dehnen, Raum ordnen — ohne Drama.', sec: 55 },
        { phase: 'body', title: 'Schnitt', text: '„Geladen. Vergessen.“ Ergebnis-Jagd stoppen. Ethik noch ok?', sec: 45 },
        { phase: 'closing', title: 'Fertig', text: 'Weiter im Alltag. Modell abgelegt.', sec: 25 }
      ]
    },

    /* ——— Path-own: Esoterik ——— */
    {
      id: 'schwelle',
      name: 'Feldlicht-Schwelle',
      ico: '🚪',
      mins: 11,
      paths: ['esoterik'],
      own: true,
      signature: true,
      breath: true,
      intention: 'Still üben — Praxiswerkzeug, kein Schaukasten. Daten bleiben bei dir.',
      journal: 'Welche Schwelle hast du gesetzt — und gehalten?',
      steps: [
        { phase: 'intention', title: 'Ankommen', text: 'Still üben. Ein Handy kann keine Geister messen.', sec: 35 },
        { phase: 'body', title: 'Atem', text: '4 ein — 6 aus. Feldlicht begleiten, nicht erzwingen.', sec: 100, breath: true, breathIn: 4, breathOut: 6 },
        { phase: 'body', title: 'Intention', text: 'Ein klarer Satz. Grenze und Ausgleich.', sec: 70 },
        { phase: 'body', title: 'Ausgleich', text: 'Was gibst du zurück an den Tag? Ruhe, Ordnung, Dank.', sec: 50 },
        { phase: 'closing', title: 'Durchgehen', text: 'Schwelle halten und öffnen. Alltag mit Klarheit.', sec: 35 }
      ]
    },
    {
      id: 'mondarbeit',
      name: 'Mondfenster',
      ico: '🌕',
      mins: 11,
      paths: ['esoterik'],
      own: true,
      signature: true,
      intention: 'Zum Mond passen: setzen oder lösen — Rhythmus, kein Befehl.',
      journal: 'Neu/Voll/dazwischen — welche Absicht war ehrlich klein genug?',
      steps: [
        { phase: 'intention', title: 'Phase', text: 'Neu: setzen. Voll: klären/lösen. Dazwischen: pflegen. Ohne Astro-Anspruch.', sec: 50 },
        { phase: 'body', title: 'Absicht', text: 'Passende, ethische Absicht — klein und ehrlich. Kein Schaden.', sec: 70 },
        { phase: 'body', title: 'Licht oder Dunkel', text: 'Kerze oder Stille. Atem. Kein Spektakel.', sec: 120 },
        { phase: 'body', title: 'Notieren', text: 'Ein Satz fürs Tagebuch (mental ok). Daten bleiben lokal.', sec: 50 },
        { phase: 'closing', title: 'Schließen', text: 'Danken. Mond ist Rhythmus, nicht Befehl.', sec: 35 }
      ]
    },
    {
      id: 'lostag-achtung',
      name: 'Lostag-Stille',
      ico: '📜',
      mins: 3,
      paths: ['esoterik'],
      own: true,
      intention: 'Achtung und Probe — kein Orakel-Zwang.',
      journal: 'Welchen Eindruck behältst du ohne ihn zu verkaufen?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Lostage und Rauhnächte: Achtung, Probe, Stille — kein Vorhersage-Zwang.', sec: 30 },
        { phase: 'body', title: 'Beobachten', text: 'Was zeigt der Tag ohne Drama? Ein Eindruck genügt.', sec: 50 },
        { phase: 'body', title: 'Halten', text: 'Keine große Operation. Still begleiten.', sec: 50, breath: true },
        { phase: 'closing', title: 'Ende', text: 'Achtung wahren. Alltag fortsetzen.', sec: 25 }
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

  function durLabel(mins) {
    const m = mins || 0;
    if (m <= 5) return '3 Min';
    if (m <= 15) return '11 Min';
    return '21 Min';
  }

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
      const aSig = a.signature && isOwnForPath(a, pathId) ? 0 : 1;
      const bSig = b.signature && isOwnForPath(b, pathId) ? 0 : 1;
      if (aSig !== bSig) return aSig - bSig;
      const aRec = recommended && a.id === recommended ? 0 : 1;
      const bRec = recommended && b.id === recommended ? 0 : 1;
      if (aRec !== bRec) return aRec - bRec;
      return (a.mins || 99) - (b.mins || 99);
    });
  }

  function getRitual(id) {
    return GUIDED.find(r => r.id === id);
  }

  function shortForPath(pathId) {
    return listForPath(pathId).filter(r => (r.mins || 99) <= 5);
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
    durLabel,
    shortForPath,
    vibrate
  };
})(typeof window !== 'undefined' ? window : globalThis);
