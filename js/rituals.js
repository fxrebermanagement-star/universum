/**
 * UNIVERSUM — Geführte Rituale, 369, Sicherheit, Atembrücke
 * v3.3: Unmistakable path difference — 4–5 unique own rituals per path;
 *       Grundlagen (shared) secondary; Heute = path-own only.
 */
(function (global) {
  'use strict';

  const GUIDED = [
    /* ——— Grundlagen (shared, secondary / accordion only) ——— */
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

    /* ——— Path-own: Schamanismus — Puls, Spur, Rauch, Ahnen, Rückkehr ——— */
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
        { phase: 'intention', title: 'Rahmen', text: 'Mit dem Feld gehen, nicht dagegen. Kein Medium, kein Drama.', sec: 40 },
        { phase: 'body', title: 'Boden setzen', text: 'Sitzbein oder Füße. Handflächen auf Oberschenkel. Körper ist das Instrument.', sec: 45 },
        { phase: 'body', title: 'Puls finden', text: 'Sanft klopfen (Oberschenkel oder Trommel). Atem folgt dem Puls — nicht umgekehrt.', sec: 130, breath: true },
        { phase: 'body', title: 'Alltagsfrage', text: 'Augen halb zu. Nur: „Was braucht der Körper heute im Alltag?“ Keine Reise erzwingen.', sec: 90 },
        { phase: 'body', title: 'Puls drosseln', text: 'Klopfen langsamer. Hände, Raum, Wasser. „Ich bin im Körper.“', sec: 55 },
        { phase: 'closing', title: 'Ankern', text: 'Stehen, strecken, trinken. Die Trommel bleibt Werkzeug — fertig.', sec: 40 }
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
        { phase: 'body', title: 'Licht setzen', text: 'Kerze oder digitales Licht. Einen Namen nennen, der trägt — ohne Forderung.', sec: 80 },
        { phase: 'body', title: 'Drei lange Ausatmen', text: 'Mit dem Feld gehen. Kein Rufen, kein Messen.', sec: 80, breath: true },
        { phase: 'body', title: 'Kraft mitnehmen', text: 'Dank für Leben und Widerstandskraft. Was du mitnimmst, dient dem Alltag.', sec: 100 },
        { phase: 'closing', title: 'Löschen', text: 'Licht aus. Boden spüren. Alltag nimmt Raum.', sec: 40 }
      ]
    },
    {
      id: 'spurlesen',
      name: 'Spurlesen',
      ico: '🦶',
      mins: 11,
      paths: ['schamanismus'],
      own: true,
      signature: true,
      intention: 'Wahrnehmen statt jagen — Spur im Alltag, nicht Orakel.',
      journal: 'Welche eine Spur (Ton, Geruch, Gefühl) hast du wirklich bemerkt?',
      steps: [
        { phase: 'intention', title: 'Jäger-Ethik', text: 'Spuren lesen heißt achten — nicht erzwingen. Kein Schaden, kein Spektakel.', sec: 40 },
        { phase: 'body', title: 'Standort', text: 'Steh oder geh langsam im Raum (oder draußen). Füße zuerst, Augen weich.', sec: 60 },
        { phase: 'body', title: 'Drei Spuren', text: 'Nenne drei Dinge, die der Körper schon weiß: Laut, Temperatur, Spannung.', sec: 120 },
        { phase: 'body', title: 'Eine Deutung', text: 'Nur eine: Was braucht dein Alltag von dieser Spur? Klein und praktisch.', sec: 90 },
        { phase: 'closing', title: 'Spur lassen', text: 'Nicht weiter jagen. Wasser. Zurück in den Tag.', sec: 40 }
      ]
    },
    {
      id: 'rauchbruecke',
      name: 'Rauchbrücke',
      ico: '💨',
      mins: 11,
      paths: ['schamanismus'],
      own: true,
      breath: true,
      intention: 'Raum klären mit Atem oder Räucherwerk — Symbol, kein Geisterdienst.',
      journal: 'Welche Ecke fühlt sich nach dem Durchzug klarer an?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Hauspraxis: klären, nicht beschwören. Fenster offen wenn möglich. Brandschutz.', sec: 45 },
        { phase: 'body', title: 'Werkzeug wählen', text: 'Rauch (Beifuß/Wacholder) oder nur Atem + Hand. Kein Zwang zu kaufen.', sec: 50 },
        { phase: 'body', title: 'Schwelle → Ecken', text: 'Von der Tür entlang der Wände. „Was dem Haus nicht dient, darf ziehen.“', sec: 140 },
        { phase: 'body', title: 'Atembrücke', text: 'Vier lange Ausatmen. Rauch oder Atem auslassen — fertig ist fertig.', sec: 80, breath: true },
        { phase: 'closing', title: 'Schließen', text: 'Werkzeug ablegen. Fenster zu wenn nötig. Alltag.', sec: 40 }
      ]
    },
    {
      id: 'rueckkehrband',
      name: 'Rückkehrband',
      ico: '🪢',
      mins: 3,
      paths: ['schamanismus'],
      own: true,
      intention: 'Jede innere Arbeit endet mit Rückkehr — Band in den Körper.',
      journal: 'Hast du wirklich geschlossen — oder bleibst du „unterwegs“?',
      steps: [
        { phase: 'intention', title: 'Band nennen', text: 'Was hat dich abgezogen? Ein Wort genügt.', sec: 25 },
        { phase: 'body', title: 'Ziehen', text: 'Hand auf Brust oder Bauch. Einatmen: hier. Ausatmen: zurück.', sec: 55, breath: true },
        { phase: 'body', title: 'Knoten', text: '„Ich bin zurück.“ Füße, Raum, Wasser.', sec: 40 },
        { phase: 'closing', title: 'Fertig', text: 'Keine Nachreise. Alltag hält das Band.', sec: 25 }
      ]
    },

    /* ——— Path-own: Nordisch — Eid, Gabe, Thing, Frith, Stein ——— */
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
        { phase: 'intention', title: 'Maß prüfen', text: 'Was ist heute Maß — und was Übermaß? Ein klarer Satz genügt.', sec: 50 },
        { phase: 'body', title: 'Eid wägen', text: 'Welchen Eid hältst du schon? Wort und Tat sollen denselben Ring tragen.', sec: 100 },
        { phase: 'body', title: 'Kleinen Eid setzen', text: 'Haltbar heute, ethisch, ohne Schaden an Personen.', sec: 80 },
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
        { phase: 'intention', title: 'Empfangen nennen', text: 'Was hast du schon erhalten — Sippe, Körper, Tag? Nenne drei Dinge.', sec: 55 },
        { phase: 'body', title: 'Gabe wählen', text: 'Brotkrume, Wasser, Zeit, ehrliches Wort — kein Kaufzwang.', sec: 70 },
        { phase: 'body', title: 'Geben', text: 'Gabe hinlegen oder Tat setzen. Ohne Forderung an Götter oder Menschen.', sec: 100 },
        { phase: 'body', title: 'Maß halten', text: 'Ausgleich: was behältst du, was gibst du weiter?', sec: 55 },
        { phase: 'closing', title: 'Schließen', text: 'Danken. Raum in Klarheit verlassen.', sec: 35 }
      ]
    },
    {
      id: 'thing-pause',
      name: 'Thing-Pause',
      ico: '⚖️',
      mins: 11,
      paths: ['nordisch'],
      own: true,
      signature: true,
      intention: 'Bevor du sprichst oder entscheidest — Pause wie im Thing: hören, wägen, dann Wort.',
      journal: 'Hast du die Pause gehalten — oder hast du dich übereilt?',
      steps: [
        { phase: 'intention', title: 'Streit oder Wahl', text: 'Was will entschieden werden? Ohne Pathos benennen. Kein Schaden.', sec: 50 },
        { phase: 'body', title: 'Kreis denken', text: 'Wer wäre betroffen? Dich selbst, Haus, andere — kurz listen.', sec: 80 },
        { phase: 'body', title: 'Schweigen', text: 'Drei Minuten still. Kein Argument, nur atmen. Maß vor Wort.', sec: 180, breath: true },
        { phase: 'body', title: 'Ein Satz', text: 'Ein einziger nächster Satz oder Schritt — ethisch und haltbar.', sec: 60 },
        { phase: 'closing', title: 'Thing schließen', text: 'Entscheidung oder Aufschub anerkennen. Weiter ohne Theater.', sec: 35 }
      ]
    },
    {
      id: 'frith-grenze',
      name: 'Frith-Grenze',
      ico: '🛡️',
      mins: 11,
      paths: ['nordisch'],
      own: true,
      intention: 'Frith ist Friedensraum — Grenze halten ohne Angriff.',
      journal: 'Welche Grenze hast du heute friedlich, aber klar gesetzt?',
      steps: [
        { phase: 'intention', title: 'Frith nennen', text: 'Frieden im Haus und in dir. Kein Fluch, kein Schaden.', sec: 40 },
        { phase: 'body', title: 'Grenze spüren', text: 'Körper: wo ist Spannung? Schultern, Kiefer, Bauch — anerkennen.', sec: 70 },
        { phase: 'body', title: 'Wort der Grenze', text: 'Ein Satz: „Bis hierher — in Frieden.“ Kein Angriff auf Personen.', sec: 90 },
        { phase: 'body', title: 'Raum halten', text: 'Atem ruhig. Frith bleibt Haltung, nicht Panik.', sec: 100, breath: true },
        { phase: 'closing', title: 'Alltag', text: 'Grenze mitnehmen. Sippe und Selbst brauchen dasselbe Maß.', sec: 35 }
      ]
    },
    {
      id: 'ahnenstein',
      name: 'Ahnenstein',
      ico: '🪨',
      mins: 3,
      paths: ['nordisch'],
      own: true,
      intention: 'Stein oder Gegenstand als Gedächtnis — tragen, nicht beschwören.',
      journal: 'Welche Haltung der Linie nimmst du heute mit Maß?',
      steps: [
        { phase: 'intention', title: 'Stein wählen', text: 'Stein, Ring oder Gegenstand. Symbol der Linie — keine Geistermessung.', sec: 25 },
        { phase: 'body', title: 'Gewicht spüren', text: 'In der Hand. Ein Name oder eine Tugend. Dank ohne Forderung.', sec: 50 },
        { phase: 'body', title: 'Ablegen', text: 'Platz zuweisen. „Getragen, nicht gefordert.“', sec: 40 },
        { phase: 'closing', title: 'Weiter', text: 'Alltag. Stein bleibt Stein.', sec: 20 }
      ]
    },

    /* ——— Path-own: Voodoo (Haus only) — Schwelle, Licht, Kehren, Dienst, Altar ——— */
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
    {
      id: 'hofkehren',
      name: 'Hofkehren',
      ico: '🧹',
      mins: 11,
      paths: ['voodoo'],
      own: true,
      signature: true,
      houseOnly: true,
      intention: 'Fegen als Praxis — Bewegung klärt den Hof, nicht die Geister.',
      journal: 'Welcher Bereich ist physisch klarer — und was folgt daraus?',
      steps: [
        { phase: 'intention', title: 'Disclaimer', text: 'Nur Haus. Kein Medium. Besen oder Tuch genügt.', sec: 30 },
        { phase: 'body', title: 'Richtung wählen', text: 'Von innen zur Schwelle oder Hofecke nach draußen — wo erlaubt.', sec: 40 },
        { phase: 'body', title: 'Kehren', text: 'Langsam fegen oder wischen. Atem mit der Bewegung. Staub ist Staub.', sec: 200 },
        { phase: 'body', title: 'Wort am Rand', text: '„Der Hof ist klar.“ Kein Fluch, keine Person nennen.', sec: 45 },
        { phase: 'closing', title: 'Werkzeug weg', text: 'Besen abstellen. Hände waschen. Alltag.', sec: 35 }
      ]
    },
    {
      id: 'dienst-licht',
      name: 'Dienst-Licht',
      ico: '🕯️',
      mins: 21,
      paths: ['voodoo'],
      own: true,
      houseOnly: true,
      candle: true,
      intention: 'Licht als Dienst am Haus — Wache ohne Spektakel, echte Brandsicherheit.',
      journal: 'Was hast du im stillen Dienst am Haus bemerkt?',
      steps: [
        { phase: 'intention', title: 'Sicherheit', text: 'Echte Kerze nur unter Aufsicht. Sonst LED. Kein Vorhang. Nur Hauspraxis.', sec: 45 },
        { phase: 'body', title: 'Dienst nennen', text: 'Wofür brennt das Licht? Reinheit, Dank, Wachsamkeit — kein Schaden.', sec: 50 },
        { phase: 'body', title: 'Wache', text: 'Bei der Flamme bleiben. Gedanken kommen und gehen. Haus zuerst.', sec: 1080, candle: true },
        { phase: 'closing', title: 'Löschen', text: 'Flamme löschen. Danken. Raum erst verlassen wenn sicher.', sec: 45 }
      ]
    },
    {
      id: 'stiller-altar',
      name: 'Stiller Altar',
      ico: '🪑',
      mins: 3,
      paths: ['voodoo'],
      own: true,
      houseOnly: true,
      intention: 'Hausecke prüfen — Ordnung und Respekt, keine Anrufung.',
      journal: 'Was fehlte auf dem Hausplatz — praktisch?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Keine Lwa-Anrufung. Nur: ist die Ecke würdig und sicher?', sec: 25 },
        { phase: 'body', title: 'Prüfen', text: 'Staub, Wasserfrischheit, Lichtsicherheit. Ein Handgriff genügt.', sec: 55 },
        { phase: 'body', title: 'Kurzer Dank', text: 'Ohne Forderung. Respekt vor Tradition.', sec: 35 },
        { phase: 'closing', title: 'Wegtreten', text: 'Alltag. Altar bleibt Haus, nicht Bühne.', sec: 20 }
      ]
    },

    /* ——— Path-own: Santería (Haus only) — Aché, Dank, Tuch, Gabe, Morgenwasser ——— */
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
    {
      id: 'weisses-tuch',
      name: 'Weißes Tuch',
      ico: '⬜',
      mins: 11,
      paths: ['santeria'],
      own: true,
      signature: true,
      houseOnly: true,
      intention: 'Weißes Tuch als klare Fläche — Reinheit sichtbar, ohne Tempelanspruch.',
      journal: 'Was hast du von der Fläche genommen — und was darf bleiben?',
      steps: [
        { phase: 'intention', title: 'Disclaimer', text: 'Hauspraxis. Kein Ile. Tuch waschen oder frisch legen.', sec: 35 },
        { phase: 'body', title: 'Fläche bereiten', text: 'Tisch oder Ecke: weißes Tuch glatt. Staub weg.', sec: 70 },
        { phase: 'body', title: 'Nur Nötiges', text: 'Wasser und Licht darauf — sonst nichts. Weniger ist klarer.', sec: 90 },
        { phase: 'body', title: 'Stille', text: 'Bei der weißen Fläche atmen. Dank vor Wunsch.', sec: 100, breath: true },
        { phase: 'closing', title: 'Belassen', text: 'Tuch darf liegen oder zusammengelegt werden. Alltag.', sec: 35 }
      ]
    },
    {
      id: 'obstgabe-haus',
      name: 'Obstgabe Haus',
      ico: '🍊',
      mins: 11,
      paths: ['santeria'],
      own: true,
      houseOnly: true,
      intention: 'Obst oder Wasser als Dankgabe im Haus — teilen, nicht fordern.',
      journal: 'Hast du die Gabe später wirklich geteilt oder selbst geachtet?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Gabe ist Dank, keine Bestechung. Kein Schaden, keine Initiation.', sec: 40 },
        { phase: 'body', title: 'Wählen', text: 'Obst, Wasser oder Tee — frisch, einfach. Kein Kaufzwang.', sec: 50 },
        { phase: 'body', title: 'Hinlegen', text: 'Auf saubere Fläche. „Dank für das, was trägt.“ Kurz bleiben.', sec: 100 },
        { phase: 'body', title: 'Zeit lassen', text: 'Stille. Später: selbst essen, teilen oder kompostieren — würdig.', sec: 90 },
        { phase: 'closing', title: 'Schließen', text: 'Fläche achten. Alltag mit Maß.', sec: 35 }
      ]
    },
    {
      id: 'morgenwasser',
      name: 'Morgenwasser',
      ico: '🚿',
      mins: 3,
      paths: ['santeria'],
      own: true,
      houseOnly: true,
      breath: true,
      intention: 'Hände oder Gesicht mit klarem Wasser — Aché als Frische, nicht Magie-Show.',
      journal: 'War die Frische spürbar — ohne Extra-Ritual?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Nur Wasser. Haus. Kein Priestertum.', sec: 20 },
        { phase: 'body', title: 'Waschen', text: 'Hände oder Gesicht. Kalt oder lauwarm. Bewusst.', sec: 50 },
        { phase: 'body', title: 'Atem', text: 'Einatmen Frische — ausatmen Schlafrest. „Aché im Kleinen.“', sec: 45, breath: true },
        { phase: 'closing', title: 'In den Tag', text: 'Fertig. Kein Nachhängen.', sec: 20 }
      ]
    },

    /* ——— Path-own: Hermetik — Stunde, Siegel, Tafel, Solve/Coagula, Labor ——— */
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
    {
      id: 'vier-tafel',
      name: 'Vier-Tafel',
      ico: '▦',
      mins: 11,
      paths: ['hermetik'],
      own: true,
      signature: true,
      intention: 'Vier Entsprechungen ordnen — Denken als Tafel, nicht als Orakel.',
      journal: 'Welche Entsprechung war ehrlich — und welche war Wunschdenken?',
      steps: [
        { phase: 'intention', title: 'Thema wählen', text: 'Ein Thema des Tages. Ethik: kein Schaden, keine Willensbeugung.', sec: 40 },
        { phase: 'body', title: 'Vier Felder', text: 'Mental oder Papier: Feuer / Luft / Wasser / Erde — je ein Stichwort.', sec: 120 },
        { phase: 'body', title: 'Proportion prüfen', text: 'Fehlt ein Feld? Überwiegt eines? Maß statt Fülle.', sec: 90 },
        { phase: 'body', title: 'Ein Schluss', text: 'Ein praktischer Satz aus der Tafel — klein und haltbar.', sec: 70 },
        { phase: 'closing', title: 'Tafel schließen', text: 'Papier weg oder mental streichen. Operator bleibt Mensch.', sec: 35 }
      ]
    },
    {
      id: 'solve-coagula',
      name: 'Solve et Coagula',
      ico: '⚗️',
      mins: 11,
      paths: ['hermetik'],
      own: true,
      breath: true,
      intention: 'Auflösen und binden im Atem — innere Arbeit, kein Labor-Mythos.',
      journal: 'Was hast du gelöst — und was bewusst wieder gebunden?',
      steps: [
        { phase: 'intention', title: 'Stoff nennen', text: 'Welche Spannung oder Idee darf gelöst werden? Ethisch prüfen.', sec: 45 },
        { phase: 'body', title: 'Solve', text: 'Einatmen weich, ausatmen lang: „lösen.“ Schultern sinken.', sec: 120, breath: true },
        { phase: 'body', title: 'Leere halten', text: 'Kurze Pause. Nichts erzwingen. Nur Klarheit.', sec: 60 },
        { phase: 'body', title: 'Coagula', text: 'Ein klarer Satz oder Handlung binden. Maß. Kein Größenwahn.', sec: 90 },
        { phase: 'closing', title: 'Labor zu', text: '„Gelöst und gebunden.“ Wasser. Alltag.', sec: 35 }
      ]
    },
    {
      id: 'labor-notiz',
      name: 'Labor-Notiz',
      ico: '📝',
      mins: 3,
      paths: ['hermetik'],
      own: true,
      intention: 'Eine Beobachtung notieren — Operator als Zeuge, nicht als Magier.',
      journal: 'Was hast du beobachtet, ohne es zu deuten?',
      steps: [
        { phase: 'intention', title: 'Nur beobachten', text: 'Kein Orakel. Ein Phänomen des Moments.', sec: 25 },
        { phase: 'body', title: 'Schreiben oder sagen', text: 'Ein Satz: was war — nicht was es „bedeutet“.', sec: 55 },
        { phase: 'body', title: 'Maß', text: 'Reicht das? Oft ja. Spekulation stoppen.', sec: 35 },
        { phase: 'closing', title: 'Notiz ablegen', text: 'Weiter. Labor bleibt Notizbuch.', sec: 20 }
      ]
    },

    /* ——— Path-own: Wicca — Elemente, Rede, Mondkreis, Kräuter, Rede-Check ——— */
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
    {
      id: 'mondkreis-klein',
      name: 'Mondkreis klein',
      ico: '🌕',
      mins: 11,
      paths: ['wicca'],
      own: true,
      signature: true,
      candle: true,
      intention: 'Kleiner Mondkreis — Phase achten, Rede halten, Kreis wieder öffnen.',
      journal: 'Neu, Voll oder dazwischen — was war die ehrliche Absicht?',
      steps: [
        { phase: 'intention', title: 'Phase und Rede', text: 'Neu setzen / Voll klären / dazwischen pflegen. An niemandem Schaden.', sec: 45 },
        { phase: 'body', title: 'Kreis ziehen', text: 'Hand oder Blick. Kerze/LED wenn sicher. „Kreis in Frieden.“', sec: 55 },
        { phase: 'body', title: 'Mondarbeit', text: 'Eine Absicht passend zur Phase — klein, ethisch.', sec: 120, candle: true },
        { phase: 'body', title: 'Danken', text: 'Mond und Elemente danken. Kein Spektakel.', sec: 50 },
        { phase: 'closing', title: 'Öffnen', text: 'Kreis öffnen. Licht achten. Alltag.', sec: 40 }
      ]
    },
    {
      id: 'kraeuter-bund',
      name: 'Kräuter-Bund',
      ico: '🌿',
      mins: 11,
      paths: ['wicca'],
      own: true,
      intention: 'Kräuter als Haus-Symbol binden — Duft und Ordnung, kein Heilversprechen.',
      journal: 'Welches Kraut (oder Symbol) hast du gewählt — und wofür im Haus?',
      steps: [
        { phase: 'intention', title: 'Kein Medizin-Claim', text: 'Symbol und Duft. Kein Heilversprechen. Rede: kein Schaden.', sec: 40 },
        { phase: 'body', title: 'Wählen', text: 'Lavendel, Rosmarin, getrocknetes Blatt oder nur Vorstellung.', sec: 50 },
        { phase: 'body', title: 'Binden', text: 'Faden oder Handgriff. Absicht: Klarheit im Haus — nicht gegen Personen.', sec: 100 },
        { phase: 'body', title: 'Platz', text: 'Bund hinlegen oder aufhängen wo sicher. Kurz danken.', sec: 70 },
        { phase: 'closing', title: 'Fertig', text: 'Werkzeug weg. Alltag. Kein medizinischer Rat.', sec: 35 }
      ]
    },
    {
      id: 'rede-check',
      name: 'Rede-Check',
      ico: '✓',
      mins: 3,
      paths: ['wicca'],
      own: true,
      intention: 'Bevor du handelst: schadet es jemandem? Kurz und ehrlich.',
      journal: 'Hast du gestoppt — oder angepasst?',
      steps: [
        { phase: 'intention', title: 'Vorhaben nennen', text: 'Was willst du tun? Ein Satz.', sec: 25 },
        { phase: 'body', title: 'Rede', text: 'Schadet es einer Person — auch subtil? Wenn ja: stoppen oder ändern.', sec: 50 },
        { phase: 'body', title: 'Ausgleich', text: 'Falls ja zum Handeln: welcher kleine Ausgleich?', sec: 40 },
        { phase: 'closing', title: 'Weiter oder stoppen', text: 'Entscheidung halten. Kreis im Kleinen geschlossen.', sec: 20 }
      ]
    },

    /* ——— Path-own: Chaosmagie — Gnosis, Vergessen, Modell, Banishing, Servitor-Skizze ——— */
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
    {
      id: '369',
      name: '369-Labor',
      ico: '3️⃣',
      mins: 11,
      paths: ['chaosmagie'],
      own: true,
      signature: true,
      practice369: true,
      intention: 'Ethischer Satz · laden ohne Willensbeugung · dann loslassen — Labor, kein Kult.',
      journal: 'Welchen Satz hast du gewählt — und hast du ihn wirklich losgelassen?',
      steps: [
        { phase: 'intention', title: 'Satz', text: 'Formuliere einen ethischen 369-Satz (kein Schaden, keine Willensbeugung).', sec: 60 },
        { phase: 'body', title: 'Morgen ×3', text: 'Schreibe oder sprich den Satz 3× (morgens gedacht).', sec: 70, slot369: 'morning', count369: 3 },
        { phase: 'body', title: 'Nachmittag ×6', text: '6× — fokussiert, ohne Zwang.', sec: 100, slot369: 'afternoon', count369: 6 },
        { phase: 'body', title: 'Abend ×9', text: '9× — dann loslassen wie beim Sigil.', sec: 120, slot369: 'evening', count369: 9 },
        { phase: 'closing', title: 'Schließen', text: 'Labor zu. Ergebnis nicht jagen. Alltag.', sec: 30 }
      ]
    },
    {
      id: 'modell-wechsel',
      name: 'Modell-Wechsel',
      ico: '🔄',
      mins: 11,
      paths: ['chaosmagie'],
      own: true,
      intention: 'Ein Modell bewusst wählen und wieder ablegen — Werkzeug, keine Identität.',
      journal: 'Welches Modell hast du benutzt — und hast du es danach wieder abgelegt?',
      steps: [
        { phase: 'intention', title: 'Ethik-Gate', text: 'Modell darf keinem schaden und niemandes Willen beugen. Sonst stoppen.', sec: 40 },
        { phase: 'body', title: 'Modell nennen', text: 'z. B. „als wäre X wahr für 10 Minuten“. Klar und befristet.', sec: 70 },
        { phase: 'body', title: 'Kurz leben', text: 'Handlung oder Haltung im Modell — ohne Drama, ohne Mission.', sec: 150 },
        { phase: 'body', title: 'Ablegen', text: '„Modell aus.“ Zurück in den neutralen Alltag. Ethik check.', sec: 70 },
        { phase: 'closing', title: 'Labor zu', text: 'Nichts ist wahr — Ethik bleibt. Weiter.', sec: 30 }
      ]
    },
    {
      id: 'banishing-punkt',
      name: 'Banishing-Punkt',
      ico: '✴️',
      mins: 3,
      paths: ['chaosmagie'],
      own: true,
      breath: true,
      intention: 'Mentaler Reset-Punkt — Raum klären ohne Theater.',
      journal: 'War der Reset spürbar — oder nur Geste?',
      steps: [
        { phase: 'intention', title: 'Reset', text: 'Nur klären. Kein Angriff auf Personen.', sec: 20 },
        { phase: 'body', title: 'Punkt setzen', text: 'Finger oder Blick: ein Punkt vor dir. Einatmen Klarheit.', sec: 40, breath: true },
        { phase: 'body', title: 'Abstreifen', text: 'Ausatmen: mentale Reste ab. „Raum klar.“', sec: 45 },
        { phase: 'closing', title: 'Fertig', text: 'Punkt vergessen. Alltag.', sec: 20 }
      ]
    },

    /* ——— Path-own: Esoterik — Schwelle, Mond, Lostag, Zahlenklar, Stille-Feld ——— */
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
      signature: true,
      intention: 'Achtung und Probe — kein Orakel-Zwang.',
      journal: 'Welchen Eindruck behältst du ohne ihn zu verkaufen?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Lostage und Rauhnächte: Achtung, Probe, Stille — kein Vorhersage-Zwang.', sec: 30 },
        { phase: 'body', title: 'Beobachten', text: 'Was zeigt der Tag ohne Drama? Ein Eindruck genügt.', sec: 50 },
        { phase: 'body', title: 'Halten', text: 'Keine große Operation. Still begleiten.', sec: 50, breath: true },
        { phase: 'closing', title: 'Ende', text: 'Achtung wahren. Alltag fortsetzen.', sec: 25 }
      ]
    },
    {
      id: 'zahlen-klarheit',
      name: 'Zahlen-Klarheit',
      ico: '🔢',
      mins: 11,
      paths: ['esoterik'],
      own: true,
      intention: 'Eine Zahl als Fokusrahmen — Klarheit, kein Schicksalsglaube.',
      journal: 'Welche Zahl und welcher ethische Satz haben sich gehalten?',
      steps: [
        { phase: 'intention', title: 'Zahl wählen', text: '3, 7, 9 oder eine andere — als Fokus, nicht als Orakel. Ethik zuerst.', sec: 40 },
        { phase: 'body', title: 'Satz', text: 'Ein ethischer Satz in Gegenwart. Kein Schaden, keine Willensbeugung.', sec: 70 },
        { phase: 'body', title: 'Wiederholen', text: 'Den Satz so oft wie die Zahl — ruhig, ohne Zwang.', sec: 120 },
        { phase: 'body', title: 'Loslassen', text: 'Zahl und Satz ablegen. Ergebnis nicht jagen.', sec: 60 },
        { phase: 'closing', title: 'Schließen', text: 'Still weiter. Daten bleiben bei dir.', sec: 30 }
      ]
    },
    {
      id: 'stille-feld',
      name: 'Stille-Feld',
      ico: '✦',
      mins: 21,
      paths: ['esoterik'],
      own: true,
      breath: true,
      intention: 'Längere Stille als Feld — üben ohne zu messen, ohne zu deuten.',
      journal: 'Was blieb nach der Stille — ohne es zu verkaufen?',
      steps: [
        { phase: 'intention', title: 'Rahmen', text: 'Stille ist Praxis. Kein EMF, keine Geister. Handy stumm.', sec: 40 },
        { phase: 'body', title: 'Setzen', text: 'Bequem. Atem natürlich. Augen weich oder zu.', sec: 50 },
        { phase: 'body', title: 'Feld halten', text: 'Gedanken kommen und gehen. Nicht jagen. Grenze und Ausgleich.', sec: 1080, breath: true },
        { phase: 'closing', title: 'Rückkehr', text: 'Augen öffnen. Wasser. Ein Satz reicht — oder keiner.', sec: 50 }
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

  function isShared(r) {
    return !!(r && r.paths == null);
  }

  /** Path filter. opts.ownOnly: only path-own. Default includes shared + path-listed. */
  function listForPath(pathId, opts) {
    opts = opts || {};
    const recommended = opts.recommendedRitual || null;
    let list;
    if (opts.ownOnly) {
      list = GUIDED.filter(r => isOwnForPath(r, pathId));
    } else {
      list = GUIDED.filter(r => !r.paths || r.paths.includes(pathId));
    }
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

  function listOwnForPath(pathId, opts) {
    return listForPath(pathId, Object.assign({}, opts || {}, { ownOnly: true }));
  }

  function listGrundlagen() {
    return GUIDED.filter(isShared).slice().sort((a, b) => (a.mins || 99) - (b.mins || 99));
  }

  function getRitual(id) {
    return GUIDED.find(r => r.id === id);
  }

  function shortForPath(pathId) {
    return listOwnForPath(pathId).filter(r => (r.mins || 99) <= 5);
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
    listOwnForPath,
    listGrundlagen,
    getRitual,
    isOwnForPath,
    isShared,
    durLabel,
    shortForPath,
    vibrate
  };
})(typeof window !== 'undefined' ? window : globalThis);
