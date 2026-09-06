# UNIVERSUM · COCKPIT

**Feld-Klarheit — hier übst du, Daten bleiben bei dir.**

Praxiswerkzeug — klar, lokal, ohne Hype. Vanilla HTML/CSS/JS, kein Backend, kein Build. Früher: *Feldlicht Ritualbegleiter*.

## Lokal öffnen

```bash
cd /workspace/universum
python3 -m http.server 8765
```

Dann im Browser:

- Einstieg / Landing: [http://127.0.0.1:8765/](http://127.0.0.1:8765/) → **Praxis öffnen** → Altar  
- Direkt: [http://127.0.0.1:8765/cockpit.html](http://127.0.0.1:8765/cockpit.html)

PWA: `manifest.webmanifest` + Service Worker (`sw.js`) cachen die App-Shell offline.  
„Zum Home-Bildschirm“ hinzufügen für Standalone-Darstellung.

## Ethik

- **Grenze und Ausgleich**, kein Schaden an Personen
- Sigil-Werkzeug lehnt Fluch-/Schadensabsichten ab
- Voodoo / Santería: nur öffentliche **Hauspraxis**, keine Initiation
- Explizit: *Ein Handy kann keine Geister messen.* Keine EMF-/Geister-Behauptungen
- Unruhe = abgeleitet aus Mondphase, VoC-Hinweis, Retrograd-Näherung, optionalem Check-in
- Schumann = optionale, **leise** Stationsdaten und Tomsk-Spektrogramm (via ResonanceOne + NOAA) plus lokale 7,83-Hz-Visualisierung; sekundär, kein Wahrheitsmesser, kein Magnetometer, keine Körper-/Geister-Messung
- Erststart: Ethik-Bestätigung im Onboarding (gespeichert in `feldlicht-v15`)

## Funktionen

1. **Altar** — **Phone-Home Bento**: kompakte Messpult-Widgets (Mond|Stunde, Unruhe, Schumann); Heute-Hero; Glance-Apps (Letztes Ritual, Letzter Buch, Letzte Resonanz, Kalender, Kosmos, Werkzeug) mit last-used in `feldlicht-v15`; warm & dicht; Altar-Nav 🪔
2. **Kalender** — Monatsnavigation, Tagesdetails (Mond/Sonne/Feste), **standardmäßig nur Pfad-Feste** (Umschalter Alle Feste), Betonung und Kalender-Notizen
3. **Kosmos** — Planeten-Radar mit klareren Labels, **Legende**, aktuelle **Planetenstunde hervorgehoben**, Tap/Klick für Detail, Schumann Live-Station + Tomsk-Spektrogramm
4. **Rituale** — **nur aktueller Pfad** (4–5 einzigartige Own-Rituale); Grundlagen separat; Signaturen, Dauer-Tags 3/11/21, Sicherheitscheck, Timed-Rituale, Fokus-Timer, Sigil, illustrierte Feldkarten, eigene Rituale + Vorlagen
5. **Magie-Buch** — Notiz (schnell) · Eintrag (Ritual, Stimmung, Foto, Filter); gemeinsame Timeline; Fotos IndexedDB; ZIP/PDF; Export/Import `universum-buch.json` (`notes` + `diary` in `feldlicht-v15`)
6. **Resonanzen** — «heute passt …»; **Lexikon** (Kräuter · Hausmittel · Steine · Farben · Werkzeuge · Bezüge · Opfergaben); Detail-Sheet, Favoriten, Export; Filter **Nur mein Pfad** / Alle Pfade; kurze Werke; Ethik einmal oben

**Zusätzlich (v1.3–1.4)**

- **Mondnacht-Modus** — weicher Abend-Dimm (CSS + Einstellung)
- **Intention des Tages** — eine Zeile im Cockpit, optional in 369
- **Ritual-Favoriten** — Stern/Pin, Favoriten zuerst
- **Briefing-Chips** — 2–3 Kalender-Metriken wählen/reihen
- **Atem** — 4/6 und Box-Atmung mit Kreis, ohne volles Ritual
- **Sigil-Galerie** — letzte Glyphs (Hash + optional dataURL), vergessen möglich
- **Barrierefreiheit** — Skip-to-content, Fokusringe, ARIA an Schlüsselkontrollen

**Zusätzlich (v1.4)**

- **Sigil-Galerie Ansehen** — Glyph zurück aufs Canvas; optional stiller Atem (nur lesen)
- **Intention-Historie** — letzte 7 Tage lokal
- **Kalender-Schnellaktionen** — Intention setzen, empfohlenes Ritual starten
- **Praxis-Log** — dezente Timeline im Tagebuch (Ritual / 369 / Atem), löschbar
- **Kreis-Notizen** — lokaler Pad mit ehrlicher Offline-Erklärung (kein Sync)
- Performance: gleiche Sektion ohne Full-Re-Render; Kalender-Tag ohne Grid-Rebuild
- App `1.4.0`, SW-Cache `universum-shell-v6`

**Zusätzlich (v1.5)**

- **Soft Daily Reset** — Banner zur lokalen Mitternacht / neuem Tag, ohne Daten zu löschen
- **Schnellzugriff** — Favoriten + letzte Praxis als Chip-Reihe auf dem Cockpit
- **Tageskarte** — optionaler 1-Karten-Zug, bis morgen gesperrt
- **Storage-Toasts** — klare Meldung bei Quota-Fehler; Backup-Erinnerung alle ≈15 Einträge
- **Tagesbriefing teilen** — Text kopieren + druckfreundliche Ansicht
- Leichte CSS/JS-Politur (u. a. Speichern bei Quota nicht leeren Formular verlieren)
- App `1.5.0`, SW-Cache `universum-shell-v7`

**Zusätzlich (v1.6)**

- **Mond-Arbeit** — bei Neu-/Vollmond Cockpit-Cue + kurze Praxis-Empfehlung
- **Planetenstunde-Wecker** — optional sanfte Vibration/Toast beim Stundenwechsel (Standard aus)
- **Notizen ↔ Tagebuch** — Notiz mit einem Tippen ins Magie-Tagebuch wandeln
- **Ritual-Vorlagen** — bis zu 3 speicherbare eigene Ritual-Templates
- **Kosmos** — aktuelle Planetenstunde auf dem Radar hervorgehoben
- **Globale Suche** — Rituale, Feldkarten-Namen, Tagebuch-Titel (Cockpit / ⚙ / ⌕)
- App `1.6.0`, SW-Cache `universum-shell-v8`

**Zusätzlich (v1.7)**

- **Produkt-Splash & Onboarding** — klare Positionierung als Praxis-Cockpit; 4 Schritte mit Nutzen, Pfad, Standort, Ethik
- **Warum UNIVERSUM** — Trust-Strip (lokal · ethisch · pfadstark) + Privacy-Zeile
- **Install-Coach** — Home-Bildschirm-Tipps für iOS/Android (erste Mobile-Besuche unter Pages)
- **Wochenrückblick** — 7-Tage-Zusammenfassung aus dem Praxis-Log im Tagebuch
- **Mobile / GitHub Pages** — relative Pfade, SW-Scope `./`, Cache `universum-shell-v9`, Navigation-Fallback
- Schnelleres First Paint (Font non-blocking, kritische Shell-CSS, Suche unter dem Fold)
- App `1.7.0`, SW-Cache `universum-shell-v9`

**Zusätzlich (v1.8)**

- **Sharebares Tagesbriefing** — professioneller Empfehlungstext, Web-Share, Text/Link kopieren, Deep-Link `#briefing`
- **Empfehlen-Karte** — sanfte Einladung mit Pages-URL `https://fxrebermanagement-star.github.io/universum/`
- **Pfad-Lehre** — ein Teaching-Tipp pro Pfad auf dem Cockpit
- **Leere Zustände** — Feldkarten- & Ritual-Empty-States mit klarer Erstaktion
- Accessibility & Mobile-Spacing-Politur; kleine Bugfixes (Tipp-Einrückung, Tab-ARIA bei Empty-CTAs)
- App `1.8.0`, SW-Cache `universum-shell-v10`

**Zusätzlich (v1.9)**

- **Erste Praxis in 3 Minuten** — geführter Starter (Intention → Atem → Erdung) für den Einstieg
- **Stiller Modus** — Chrome ausblenden während Ritual/Fokus; manueller Toggle; Esc / Exit-Chip
- **Export-Paket** — `universum-buch.json` plus optionale Praxis-Zusammenfassung (TXT) für Coaches
- **Fest-Countdown** — Chip im Cockpit, wenn nächster Sabbat &lt; 14 Tage
- Mikro-Copy: ruhige, klare Produktstimme; A11y an Starter, Quiet, Export, Festival-Chip
- App `1.9.0`, SW-Cache `universum-shell-v11`

**Zusätzlich (v2.0 · Feld-Klarheit)**

- **Weniger Cockpit** — Above the fold: eine klare „Jetzt“-Einladung; Empfehlen, Chips, dichte Panels im „Mehr“-Akkordeon
- **Tieferes Schließen** — nach Ritual, Starter und Fokus: Danken → Atmen → Erden → Siegeln → optionaler Tagebuch-Keim
- **Pfad als Haltung** — `data-path`-Theme (8 Akzente), Haltung-Zeile, Briefing/Empty-State-Ton
- **Vertrauen statt Versprechen** — Praxis-Stimme: hier übst du, Daten bleiben bei dir
- **Kreis ehrlich** — klar lokal, kein Sync; Kreis-Notizen nur auf dem Gerät
- App `2.0.0`, SW-Cache `universum-shell-v12`

**Zusätzlich (v2.1 · Erste Minute)**

- **Erste Minute** — Onboarding: Pfad → eine Praxis-Einladung → fertig; Ethik als kurze Bestätigungszeile; optional Überspringen; danach Cockpit mit Jetzt-Karte
- **Astronomie-Vertrauen** — Badge „Näherung“ an Mond/Stunde/VoC; Hinweis in Mehr & Einstellungen; kein Ephemeriden-Anspruch
- **Landing** — `index.html` als ruhiges Produkt-Intro (für wen, lokal, Ethik, CTA «Praxis öffnen», Empfehlen-Link)
- App `2.1.0`, SW-Cache `universum-shell-v13`

**Zusätzlich (v2.2 · Sprache & Erste Minute)**

- **Klare Sprache** — UI/README ohne Gendersprache (`:innen`, Doppelformen); klassisch/neutral («du», «Praxis», «Wer übt»)
- **Landing & Erste Minute** — straffere Produktstimme, ruhigere Onboarding-Texte, CTA-Politur
- Kleine Bug-Politur (u. a. Jetzt-Karten-Button-Zustand)
- App `2.2.0`, SW-Cache `universum-shell-v14`

**Zusätzlich (v2.3 · Live Schumann Station)**

- **Live-Stationsdaten** — `GET https://resonanceone.app/api/now` (CORS `*`, Cache ~5 Min): SR-Hz, Schumann-Index, Kp, geomagnetischer Status, Solar-Klasse
- **Ehrliche Kennzeichnung** — Stations-/Index-Daten (Tomsk Space Observing System via ResonanceOne + NOAA), kein Handy-Magnetometer, kein «Körper misst die Erde», keine EMF-/Geister-Behauptung
- Cockpit + Kosmos: Live-Badge («Live · Station» / «Offline · lokale Visualisierung»), Metriken, Quelle, Update-Zeit, Attribution-Links, manuelles Aktualisieren
- Einstellung **Live-Stationsdaten laden** (Standard an); letzter guter Stand in `feldlicht-v15` → `settings.schumannLive`; Toggle `settings.schumannLiveEnabled`
- Viz-Puls nutzt Live-Hz wenn verfügbar, sonst lokaler 7,83-Hz-Fallback
- App `2.3.0`, SW-Cache `universum-shell-v15`

**Zusätzlich (v2.4 · Pfadtiefe)**

- **Pfad-eigene Rituale** — jeder der 8 Pfade hat 2–3 geführte Eigenrituale (z. B. Trommel-Atem, Maß/Eid, Hausreinigung, Sigil-Gnosis, Schwelle); Pfadfilter zeigt Eigenes zuerst, Geteiltes danach
- **Kalender-Betonung** — reichere Emphasis-Listen; Chaos: Tore 3/6/9, Labor-Tag, Sigil-Freitag; Voodoo/Santería: respektvolle Erinnerungs-/Haus-Tage mit klaren Hauspraxis-Disclaimern (keine Initiation); starke Unterscheidung Voodoo vs Santería
- **Haltung in der Praxis** — pfadeigene Sicherheitscheck-Zeilen, Schritt-Intros und Abschlussworte (Danken/Atmen/Erden/Siegeln)
- App `2.4.0`, SW-Cache `universum-shell-v16`

**Zusätzlich (v2.5 · Tomsk-Spektrogramm)**

- **Live-Spektrogramm** — JPEG von `https://resonanceone.app/api/spectrogram` (Tomsk SOS / Tomsk State University, über ResonanceOne), als Hauptgrafik in Cockpit und Kosmos
- Auto-Refresh alle 5 Minuten mit Cache-Bust `?t=` + Date.now(); bei Fehler: Bild ausblenden/Hinweis, Metriken und lokale 7,83-Hz-Viz bleiben
- Ehrliche Attribution (deutsch): Spektrogramm der Station Tomsk (SOS / Tomsk State University), bereitgestellt über ResonanceOne — kein Handy-Sensor; Links zu Methodik / ResonanceOne / Tomsk SOS
- Bestehende Live-SR/Kp-Panels und lokale Puls-Viz bleiben (sekundär)
- App `2.5.0`, SW-Cache `universum-shell-v17`





**Zusätzlich (v3.9 · Liebliches Cockpit)**

- **Alles auf einer Seite** — Mehr-Akkordeon entfernt; Heute, Pfad-Woche, Mondfenster, Resonanzen, Astronomie, Schumann, Journal und Praxis-Karten als ruhiger Scroll-Flow
- **Mehr Effekte** — weiche Glows, Gradienten, Sternenstaub (respektiert `prefers-reduced-motion`), Karten-Hover, Atmungs-Orb am Pfad
- **Lieblicher mit Bildern** — Mond-Orb, Pfad-Kunst, bildhafte Emoji-Titel, wärmere Karten
- App `3.9.0`, SW-Cache `universum-shell-v30`

**Zusätzlich (v3.8 · Magie-Buch Tiefe)**

- **Ritual → Buch** — nach Abschluss direkt «Ins Buch» mit Ritualname, Pfad und optionalem Foto
- **Filter** — nach Pfad, Mondphase, Ritual und Tag
- **Lokaler Export** — ZIP-Backup mit Fotos; Drucken/PDF (on-device); Buch-JSON kann komprimierte Fotos einbetten
- Deutsch ohne Gendersprache; bildhafte UI-Labels (📷 📦 🖨️)

**Zusätzlich (v3.7 · Tagebuch-Fotos)**

- **Fotos im Magie-Buch** — Kamera + Galerie, Client-Kompression (max. Kante ~1280, JPEG ~0,7), Vorschau/Entfernen vor Speichern
- **IndexedDB** `universum-media` für Bild-Blobs; `feldlicht-v15` nur Metadaten + `photoId`
- **Thumbnails + Lightbox**; Ehrlichkeit: *Fotos bleiben auf diesem Gerät, kein Upload*
- App aufgegangen in `3.8` / `3.9`

**Zusätzlich (v3.6.1 · Bildhafte Icons)**

- **Bottom-Nav & Tiles** — farbige Emojis zurück (📅 🪐 🕯️ 📖 📝 🔮); enge Violett-Badge-Boxen entfernt, Icons größer (~1.4–1.55rem)
- **Sektions-Titel, Empty States, Onboarding, Landing** — gleiche bildhafte Sprache statt abstrakter Glyphen (☽✧⟡✎▤)
- **Schnell-Chips / Abschluss** — wärmere Praxis-Icons (🌬️ 🎯 ✨ …); Feldkarten-SVGs unverändert
- Ethik und deutsche UI sonst unverändert; kein Gendersprache
- App `3.6.1`, SW-Cache `universum-shell-v29`
- **Tipp:** Hard-Refresh oder Site-Daten löschen, damit der Service Worker den neuen Cache zieht

**Zusätzlich (v3.6 · Einladende Motive)**

- **Feldkarten sichtbar** — absolute Art-URLs, pictorial SVGs, onerror-Fallback «Motif geladen»
- Sektions-Motivstreifen, Ritual-Liste mit Pfad-Symbol, Dauer-Chips
- App `3.6.0`, SW-Cache `universum-shell-v28`

**Zusätzlich (v3.5 · Kosmos-Praxis)**


- **Jetzt · Stundenimpuls** — aktuelle Planetenstunde mit «Gut für …», Tip und CTA zum passenden Pfad-Ritual
- **Nächste Stunden** — Timeline der kommenden 3–4 Planetenstunden
- **Fokus statt Kopie** — Tageskreis + Stunde klar; Schumann nur optional zugeklappt (volle Station bleibt im Cockpit)
- **Eine Näherungszeile** — Ehrlichkeit ohne Badge-Wiederholung
- **Standort lokal** — Breite/Länge in Kosmos speichern (`feldlicht-v15`), Standard Zürich
- App `3.5.0`, SW-Cache `universum-shell-v27`

**Zusätzlich (v3.4 · Illustrierte Feldkarten)**

- **22 eigene SVG-Illustrationen** — unter `assets/feldkarten/`, mystisch-lineare Ikonografie (Schwelle, Wurzeln, Atem, Grenzstein, Mondspiegel …), kein Stockfoto, kein Tarot-Klon
- **UI** — große Kartenillustration in Deck-Browse, Tageskarte, Dreierlege und Flip-Reveal; Nummer, Name, Thema, Impuls bleiben
- Offline: SVGs im Service-Worker-Cache; App `3.4.0`, SW-Cache `universum-shell-v26`
- Deutsch ohne Gendersprache; Ethik-Hinweis bleibt

**Zusätzlich (v3.3 · Pfad-Rituale eindeutig)**

- **Nur dieser Pfad** — Rituale-Tab zeigt standardmäßig ausschließlich pfadeigene Rituale; bei Pfadwechsel wechselt die Bibliothek vollständig
- **Grundlagen** — Erdung / Atembrücke / Intention nur in geschlossenem Akkordeon (optional, sekundär)
- **4–5 einzigartige Rituale pro Pfad** — eigene Stimme, Werkzeuge, Metaphern, Schlüsse (nicht nur Nomen getauscht)
- **Heute** — wählt nur aus Pfad-eigenen Ritualen (nie gemeinsame Erdung als Primär)
- Signaturen, Dauer-Tags 3/11/21, Ethik, Hauspraxis Voodoo/Santería, kein Maya-Kalender, Deutsch ohne Gendersprache
- App `3.3.0`, SW-Cache `universum-shell-v25`

**Zusätzlich (v3.2 · Ritual-Praxis)**

- **Pfad-Signaturen** — jedes Pfad-Ritual neu geschrieben mit eigener Stimme; 1–2 Signatur-Rituale pro Pfad (z. B. Trommelpuls, Ringwort, Schwellenwasser, Haus-Aché, Operator-Stunde, Vier-Wege, Gnosis-Schnitt, Feldlicht-Schwelle)
- **Session-Struktur** — Absicht → Praxis (3–7 Schritte) → Schließen/Erden · optionaler Journal-Prompt
- **Dauer-Tags** — 3 / 11 / 21 Min (Badges + Filter); Heute-Tip bevorzugt kurze Pfad-Rituale
- **Gemeinsame Rituale** — weniger und klar sekundär hinter dem Pfad
- Ethik: Grenze/Ausgleich, Hauspraxis-Framing, keine medizinischen/EMF-Claims; Deutsch ohne Gendersprache
- App `3.2.0`, SW-Cache `universum-shell-v24`

**Zusätzlich (v3.1 · Vertrauen / Teilen)**

- **PWA entdecken** — Install-Hinweis, `beforeinstallprompt`, Einstellungen «App installieren», Empfehlen-Karte
- **Offline ehrlich** — SW-Cache `universum-shell-v23`, Statuszeile online/offline (Live-Schumann pausiert offline)
- **Empfehlen** — Web Share + Link kopieren; Vertrauen: lokal, kein Konto, `feldlicht-v15`
- App `3.1.0`, SW-Cache `universum-shell-v23`

**Zusätzlich (v3.0 · Hexerei-Tiefe)**

- **Resonanzen** — Lexikon zuerst (Tabs · Suche · A–Z-Sort); «heute passt …» und Mond×Stunden-Vorschläge danach; Filter **Nur mein Pfad** / Alle Pfade; kurze Werke; kein medizinischer Rat
- **Mondfenster** — actionable «gut für …» für aktuelle Phase × Pfad
- **Ritual-Journal** — optionale Kurzreflexion nach Ritual-Abschluss; Liste unter Mehr; `ritualJournal` in `feldlicht-v15`
- App `3.0.0` (Zwischenstand), aufgegangen in `3.1.0`

**Zusätzlich (v2.9 · Heute in einem Tip)**

- **Ein Tip oben** — eine tägliche, pfadspezifische Einladung (Ritual oder Haltung) + ein CTA; Seed aus Datum+Pfad (stabil über den Tag)
- **Weniger Chrome** — Pfad-Woche und dichte Panels unter Mehr; Cockpit bleibt klar
- App `2.9.0` (Zwischenstand), aufgegangen in `3.1.0`

**Zusätzlich (v2.8 · UX Klarheit & Pfad-Symbole)**

- **Modernes Cockpit** — klarere Typografie, mehr Luft, weichere Elevation, weniger gestapelte Karten
- **Pfad-Symbole** — einziges Symbol pro Pfad (◎ ᛟ ✶ ◆ △ ☽ ↯ ✦) in Chip, Haltung, Ritual-Badges, Kalender-Filter und Onboarding
- **Weniger auf einmal** — Cockpit zeigt Jetzt + Pfad-Woche (+ Fest-Chip); Briefing, VoC, Mond-Arbeit und Astronomie unter Mehr
- **Rituale & Onboarding** — klarere Abschnitte, kürzere Labels, weniger dichte Hinweise
- **Maya-Kalender entfernt** — kein Tzolkin/Haab mehr in Cockpit, Kalender oder Briefing-Pins (kein Maya-Praxispfad betroffen)
- Kalender „Nur mein Pfad“ bleibt (v2.7); Schumann-Live + Tomsk-Spektrogramm, Ethik, `feldlicht-v15` unverändert
- App `2.8.0`, SW-Cache `universum-shell-v20`

**Zusätzlich (v2.7 · Kalender pfadfokussiert)**

- **Nur mein Pfad** — Kalender zeigt standardmäßig nur pfadrelevante Feste/Betonung/Tore (aus `paths.js` Emphasis + Pfad-Listen / dynamische Gates)
- Umschalter im Kalender: „Nur mein Pfad“ (Standard an) vs „Alle Feste“; Einstellung `settings.calendarPathOnly` in `feldlicht-v15`
- Tagesdetail: Pfad-Feste zuerst; andere Traditionen hinter „Andere Feste“
- Cockpit-Briefing und Fest-Countdown folgen demselben Filter
- App `2.7.0`, SW-Cache `universum-shell-v19`

**Zusätzlich (v2.6 · Pfad-Woche & Werkzeug)**

- **Pfad-Woche** — 7-Tage-Mikroplan pro Pfad (Mo–So), erledigt in `feldlicht-v15`
- **Rituale-Default** — pfadeigene Rituale zuerst/allein; gemeinsame Übungen hinter Akkordeon
- **Werkzeug-Set** — Mini-Module pro Pfad (Eid/Gabe, Sigil-Labor, Stunden-Notiz, Element-/Körper-/Haus-Check, Schwellen-Notiz)
- **Initiations-Grenze** — Erststart Voodoo/Santería: Bestätigung „Nur Hauspraxis, keine Initiation“
- App `2.6.0`, SW-Cache `universum-shell-v18`

**Zusätzlich**

- **First-run Onboarding (Erste Minute)** — Pfad → Praxis-Einladung → fertig; Ethik als eine Zeile; optional Überspringen; Standort Zürich-Default (Einstellungen)
- **Einstellungen (⚙)** — Standort, Haptik, Live-Stationsdaten (Schumann/NOAA, Standard an), Schumann-Audio, sanfter Ambient-Ton (separat, Standard aus), reduzierte Bewegung, Planetenstunde-Wecker (Standard aus), Stiller Modus bei Ritual, Kalender nur mein Pfad (Standard an), Suche, Onboarding/Starter zurücksetzen, Tipp des Tages
- **Toasts** — kurze Bestätigungen; Escape schließt Drawer/Modal/Ritual-Runner; bessere Labels/a11y
- **Feldkarten** — Flip-/Reveal-Animation, Verlauf der letzten Züge in `feldlicht-v15`
- **Ritual-Bibliothek** — Suche und Filter nach Dauer und Pfad (aktuell/alle)
- **Jahresrad** — Sabbat-Ring im Kalender (Tipp springt zum Fest)
- **Abschluss-Mikrofluss** — nach geführten Ritualen: Danken → Erden → Siegeln
- **Export/Import** — Metadaten (App-Version, Pfad); Import-Wahl Zusammenführen oder Ersetzen

**Pfadwahl:** Schamanismus, Nordisch, Voodoo, Santería, Hermetik, Wicca-Hexerei, Chaosmagie, Esoterik — jeweils mit eigenen Sprüchen, Praxis-Hinweisen, Tagebuch-Impulsen, Kalender-Notizen, pfadeigenen Ritualen und Haltung (Sicherheit/Abschluss).

## Astronomie (Näherungen)

Mond, Planetenstunde, Sonne und VoC sind **Näherungen** für die Praxis — klar gekennzeichnet (Badge „Näherung“ im Cockpit, Hinweis in Mehr/Einstellungen). **Kein professionelles Ephemeris.**

Dokumentiert in `js/astronomy.js`:

| Thema | Methode |
|--------|---------|
| Mondphase | Synodischer Monat ab JD 2451550.1; Feinsuche Neu/Voll |
| Sonne tropisch | Ekliptikale Länge (Meeus-ähnlich) → Zeichen |
| Planetenstunden | Sonnenauf-/untergang, chaldäische Reihe, Default Zürich |
| VoC-Stil | Mond in letzten ~3° des Zeichens |

Kein Ersatz für Ephemeriden oder traditionelle Einweihung.

## Daten

- localStorage-Schlüssel: **`feldlicht-v15`** (unverändert)
- Export-Dateiname: `universum-buch.json` · optional `universum-praxis-zusammenfassung.txt`
- Standard-Koordinaten: 47,37 / 8,54 (Europa/Zürich), überschreibbar
- Zusätzliche Felder im selben Key: `onboarding`, `streaks`, `settings.*` (inkl. `hourAlert`, `schumannLiveEnabled`, `schumannLive` Cache), `dailyIntention`, `intentionHistory`, `ritualFavorites`, `briefingPins`, `sigilGallery`, `practiceLog`, `kreisNotes`, `cardDrawHistory`, `lastSeenDay`, `dayBanner`, `dailyCard`, `backupReminder`, `ritualTemplates`, 369-Tageszähler, Tagebuch-Tags/Stimmung
- Export-Format: `universum-buch-v2` (inkl. `appVersion`, `meta.path` / `pathName`)
- Weitere Felder (v1.5): `lastSeenDay`, `dayBanner`, `dailyCard`, `backupReminder`
- Weitere Felder (v1.6): `ritualTemplates`, `settings.hourAlert`
- Weitere Felder (v1.7): `installHint`
- Weitere Felder (v1.9): `starterFlow`, `settings.quietDuringRitual`

## Technik

- Schriften: **Syne** (Titel/Zahlen) + **Manrope** (Fließtext) via Google Fonts
- Dark-Violet Mystik-Cockpit, mobile-first, Micro-Interactions
- Service Worker: Offline-Shell (`universum-shell-v23`), Scope relativ für GitHub Pages `/universum/`
- Kein React, kein Bundler, kein Backend

## Dateien

```
universum/
  index.html          Landing / Produkt-Intro → Altar
  cockpit.html        Haupt-App (7 Bereiche + Onboarding + Settings)
  sw.js               Service Worker
  manifest.webmanifest
  css/styles.css
  js/astronomy.js · storage.js · paths.js · rituals.js
     sigil.js · cards.js · schumann.js · app.js
  icons/
```

## Hinweis

Astronomie und Kalender sind **Näherungen** für die Praxis. Magie bleibt deine Verantwortung — mit Grenze und Ausgleich.





## Craft-Pass (v5.12.0) · Großer Feinschliff

- **Visueller Rhythmus** — einheitliche Karten-Abstände Messpult → Heute → Bento; weichere Kanten; Widget-Höhen ausgerichtet; 375px ohne Enge/Overflow
- **Typografie** — klarere Hierarchie Titel / Fließtext / Meta; lesbarer Kontrast
- **Copy** — kürzere Hinweise, warmer Praxis-Ton; weniger Technik-Jargon in der UI
- **Leere Zustände** — Glance-Widgets mit einladenden Einzeilern statt Leerstellen
- **Interaktion** — Tap-Ziele ≥44px wo günstig; klarere Active-States; weniger Layout-Sprung bei Tab-Wechsel
- **Altar-Home** — Messpult/Heute/Bento als ein poliertes Phone-Home; Landing/Onboarding leicht angeglichen
- App `5.12.0`, SW-Cache `universum-shell-v51`

## Craft-Pass (v5.11.0) · Altar Messpult + Start = ein Home

- **Ein Altar-Scroll** — Session-Banner → **Messpult** (Mond|Planetenstunde, Unruhe·Impuls, Schumann Spektrogramm+Metriken) → **Heute/Starter**-Hero (eine CTA, 3-Min wenn offen) → **Bento Glance-Apps** 2-spaltig → Offline-Leiste → Mehr am Altar
- Kein konkurrierendes Willkommen/Start über dem Messpult; kein zweites Heute; kein leerer Altar
- Heute-Hero wie Startseite: Meta-Zeile + Ritual-Name als Primary; 3-Min-Starter sekundär
- Offline-Leiste gelb (lokale Praxis), immer sichtbar
- App `5.11.0`, SW-Cache `universum-shell-v49`

## Craft-Pass (v5.10.0) · Altar Phone-Home Bento

- **Dichteres Messpult** — Mond|Planetenstunde halbbreit; Unruhe volle Breite kompakt; Schumann enger (weniger Padding, kleineres Spektrogramm)
- **Glance-Apps** — Heute (Hero) + Grid: Letztes Ritual · Letzter Buch · **Letzte Resonanz** · Kalender · Kosmos · Werkzeug — tippen öffnet die Sektion
- **lastActivity in feldlicht-v15** — Resonanz öffnen, Kalender-Tag, Kosmos-Planet/Stunde, Ritual-Schluss, Buch speichern/öffnen
- Kalender-Widget: zuletzt angesehener Tag oder nächstes Fest; Kosmos: letzte Stunde/Planet oder Live-Stunde
- Messpult-Kacheln Mond/Stunde tippen → Kosmos
- App `5.10.0`, SW-Cache `universum-shell-v48`

## Craft-Pass (v5.9.0) · Altar Messpult + App-Home

- **Messpult** — Instrument-Anzeigen oben: Mond (Phase, %, Zeichen + Näherung), Planetenstunde (Planet + Zeitfenster), Unruhe/Impuls mit Level-Balken, Schumann Station + Spektrogramm sichtbar
- **App-Home Glance** — Heute (primär), nächstes Fest → Kalender, letztes Ritual, letzter Magie-Buch-Eintrag (+ Thumb), Werkzeug/Pfad
- Warm polierte App-UI, aber klar ein Dashboard aus Anzeigen — nicht leer, nicht alles in «Mehr»
- App `5.9.0`, SW-Cache `universum-shell-v47`

## Craft-Pass (v5.8.0) · Altar man soll ihn lieben

- **Gefühl** — Altar als warmer, stiller Ort zum Bleiben (kein Tech-Dashboard)
- **Herz** — Heute-Tip groß, schön, primär; Kerzen-/Mondlicht-Atmosphäre
- **Begleiter** — unter Heute: weicher Mond als Stimmung (ohne %-Balken), eine Resonanz «heute passt…», ein Werkzeug-Shortcut
- **Feld begraben** — Schumann / Unruhe / Planetenstunde in zugeklapptem «Mehr aus dem Feld»
- Suche bleibt dezent im Header; Altar-Nav 🪔; Stille-Modus & reduced-motion respektiert
- App `5.8.0`, SW-Cache `universum-shell-v46`

## Craft-Pass (v5.7.0) · Rituale für Kenner

- **Rituale-Tabs** — Reihenfolge **🛠️ Werkzeug · Eigene · Geführt**; Standard-Tab beim Öffnen = **Werkzeug**
- **Eigene** = selbst angelegte Rituale; **Geführt** = Pfad-Rituale + Grundlagen (geteilt) — Pfad-own-Logik unverändert
- **Geführt** sekundär (dezenter Tab-Stil); führt nicht mehr
- **Sprache** — user-facing «Üben/Übung» → **Praxis** (natürliches Deutsch, keine Gendersprache)
- App `5.7.0`, SW-Cache `universum-shell-v44`

## Craft-Pass (v5.6.0) · Mystische Atmosphäre

- **5.2 Licht & Schwellen** — weicheres Kerzen-/Mondlicht, sanftere Kartenkanten; Schwellen-Übergänge beim Ritual öffnen und Feldkarte enthüllen (dim/reveal); respektiert reduzierte Bewegung; Mondnacht leichter + abends automatisch (19–6)
- **5.3 Mystische Sprache** — Praxis statt Tech: Ins Buch legen, Kreis öffnen/schließen, Schwelle betreten; Altar / Rituale / Buch / Resonanzen; Deutsch ohne Gendersprache
- **5.4 Optional Klang** — sehr leiser Web-Audio-Chime/Drone beim Ritual-Start und -Schluss; Standard aus; Einstellung «Ritual-Klang»; respektiert stumm/versteckt
- **5.5 Sigille & Symbole** — größere Pfad-Symbole; Resonanzen und Feldkarten als lebendige Motive statt Listen-Gefühl
- **5.6 Stille-Modus** — ein Tipp (◉): nur Heute + ein Ritual; Rest ausgeblendet; leichter Exit (Chip / Esc / Einstellung); persistiert in `feldlicht-v15` → `settings.stilleModus`
- Ethik und Lokal-first unverändert; App `5.6.0`, SW-Cache `universum-shell-v43`

## Craft-Pass (v5.1.1) · Nav zeigt Inhalt sofort

- Beim Tippen der Bottom-Nav: Scroll zum **ersten nutzbaren Inhalt** unter dem Sticky-Header (nicht nur Titelblock)
- Kompaktere Section-Titel/Sub/Motif auf Mobile
- `prefers-reduced-motion` / Einstellung → sofortiger Scroll
- App `5.1.1`, SW-Cache `universum-shell-v42`


## Craft-Pass (v5.1.0) · Magie & Hexerei vertiefen

- **Kurze Werke** — Schutz, Reinigung, Anziehen, Loslassen (pfadbezogen) am Altar-Peek und in Resonanzen
- **Resonanzen** — «heute passt …» mit kurzem Warum statt steriler Listen zuerst
- **Jahresrad** — Sabbat als Praxis-Atem (nicht nur Datum); Mond als Arbeitsfenster
- **Wicca-Hexerei** — Rituale/Closing/Woche in Craft-Sprache; Ethik, Hauspraxis, keine Gendersprache, keine Medizin-/EMF-Claims
- App `5.1.0`, SW-Cache `universum-shell-v41`


## Craft-Pass (v5.0.0) · Altar enttechnisieren

- Mond / Stunde / Unruhe als **weiche Praxis-Einladungen** («gut für …»), nicht als Metrics-Dashboard
- Weniger %/Score/Fortschrittsbalken; Mond = Arbeitsfenster
- Schumann ehrlich, aber **leiser** (zugeklappt/sekundär) — nie Wahrheitsmesser
- Näherung-Spam visuell entschärft; Ehrlichkeit **einmal** (Kreis, Grenze, Gabe, Schweigen)
- Heute-Tip bleibt primär; Altar-Nav 🪔 bleibt
- Zwischenstand aufgegangen in `5.1.0`


## 5.28.3 — Figur-Assets freigestellt

- Dunkler Pinsel-/Kachelrahmen aus allen Pfad-Figur-PNGs entfernt
- Nur Figur + weicher Glow · SW `universum-shell-v86`

## 5.28.2 — Figur als Overlay · Status volle Breite

- Status-Kachel volle Breite (Platz rechts nur optisch für Figur)
- Pfad-Figur absolut oben rechts — keine eigene Grid-Kachel mehr
- SW `universum-shell-v85`

## 5.28.1 — Figur ohne Rahmenplatte

- Pfad-Figur-PNGs: goldener Kachel-Rahmen und dunkle Platte entfernt
- Figur-Chrome im CSS nochmals hart ausgeschaltet · SW `universum-shell-v84`

## 5.28.0 — Figur wirklich frei · Status bis Rand

- Hero neu: links Status + Mond/Sonne, rechts Figur von oben (kein 3-Kachel-Raster)
- Pfad-Figur-PNGs: dunkler Kachel-Hintergrund entfernt (transparent)
- Status näher am Bildschirmrand · SW `universum-shell-v83`

## 5.27.2 — Status bis Rand · Figur ohne Kachel

- Erste Status-Kachel (Zeit/Wetter/Heute) größer und näher am Rand
- Pfad-Figur: alte Kachel-Styles entfernt, frei oben rechts ohne Rahmen/Hintergrund
- SW `universum-shell-v82`

## 5.27.1 — Closer to sketch + full app dock

- Layout bleibt: **eine** Status-Box (Zeit/Datum+Wetter+Heute) · Figur frei · Mond|Sonne · Schumann vollbreit
- **Volles Homescreen-Dock** (Wrap/Grid, kein Side-Scroll): Kalender · Kosmos · Rituale · Resonanzen · Buch · Sigille · Karten
- Wie altes Bottom-Menü + Werkzeug; kein Bottom-Nav; Altar-Home-Button auf anderen Seiten
- Soft neon glass, lesbare Proportionen; SW-Cache `universum-shell-v81`

## 5.27.0 — Match user sketch literally

- **ONE Status-Box** oben links: Zeit/Datum + Wetter + Heute-Tipp (keine drei Einzelkacheln)
- **Figur frei** oben rechts, ohne Kachel — hoch neben Status + Mond|Sonne
- **Mond | Sonne** unter der Status-Box; Figur rechts daneben
- **Schumann** volle Breite darunter
- **Genau 4 Apps** in einer Reihe: Rituale · Resonanzen · Buch · Kosmos (Sigille/Karten/Kalender via Rituale-Langdruck / Mehr)
- Kein Sitzungs-Banner · keine zweite Dock-Reihe · Soft neon glass
- SW-Cache `universum-shell-v80`

## 5.26.2 — Altar soft neon glass · Magie ohne Angst

- **Layout (Skizze):** Zeit/Datum·Wetter·Heute links · **Pfad-Figur ohne Kachel** rechts · Mond|Sonne · Schumann · Apps-Dock
- **Sitzungs-Banner** (`#sitzung-bar`) dauerhaft aus am Altar
- **Soft neon glass:** Pink/Cyan-Glow, transparente Kacheln, Blur, leichte Shimmer/Breath-Animationen — freundlich, nie gruselig
- Mission: «Alle haben Angst vor Magie — wir nehmen ihnen das.»
- SW-Cache `universum-shell-v79`

## 5.26.1 — Magie & Hexerei einladen

- Copy/Onboarding/Heute: spielerisch, magisch, neugierig — nicht belehrend
- Ethik und Maß bleiben; App zum Lieben + Interesse an Praxis wecken
- SW-Cache `universum-shell-v78`

## 5.26.0 — Altar exact sketch + path figure (warm)

- **Layout:** Top-Leiste Zeit/Datum · Wetter · Heute · Mond | Sonne | **Pfad-Figur** · Schumann nur Grafik · Dock 4+3
- **Figur:** `assets/path-figures/{pathId}.png` — liebevolle Charakterfiguren, Foto-Override später möglich
- Warm, humorvoll, Kinder-App-Geborgenheit + Magie — kein Bottom-Nav
- SW-Cache `universum-shell-v77`

## 5.25.1 — Drop «Heute gewählt», hide bottom menu

- **Oben:** Phrase «Heute gewählt» entfernt (Sitzungs-Lead bereinigt)
- **Unten:** `#bottom-nav` versteckt (Altar-App-Dock ist der Hub); DOM bleibt für JS
- **Heimweg:** Auf jeder Nicht-Altar-Sektion klarer **🪔 Altar**-Button in der Top-Bar
- Content-Padding ohne Bottom-Nav-Höhe; Altar füllt Viewport unter dem Header
- SW-Cache `universum-shell-v76`

## 5.25.0 — Altar clean + homescreen hub

- **Homescreen:** Oben Status-Widgets (Datum·Zeit · Wetter | Mond | Sonne) · Schumann nur Grafik
- **Unten App-Dock** wie Bottom-Nav (Icon-Well + Label): Kosmos · Rituale · Resonanzen · Buch · Sigille · Karten · Kalender
- Kein «Kreis öffnen», kein Kalender-/Notiz-Kachel-Clutter, Offline winzig unter Mehr
- Eine feste Viewport-Seite (kein Altar-Scroll); Tippen öffnet nur die Ziel-Sektion oben
- Sigille → Rituale Werkzeug `sub=sigil`; Karten → `sub=karten`
- SW-Cache `universum-shell-v75`

## 5.24.0 — Altar layout from user sketch

- **Top:** Datum/Zeit (+ slim Heute) · Kalender · Wetter (höher) | Mond | Sonne
- **Schumann** volle Breite mit Mini-Spektro
- **Apps:** Kosmos · Ritual · Resonanz · Buch
- **Unten:** Sigil · Karten (~2×) · Notiz → Rituale-Panels / Magie-Buch
- Wetter via Open-Meteo (kein Key), Zürich-Default, Cache offline
- Impuls weiter vom Cockpit; kein separater Heute-Hero
- SW-Cache `universum-shell-v74`

## 5.23.0 — Altar prettier + readable

- **Impuls/Unruhe** vom One-Screen-Cockpit genommen (DOM bleibt versteckt für JS)
- Kacheln lesbarer: kleines Label, großer Wert, mehr Padding, weiche Rundungen, sanfter Glow
- Grid neu: Mond | Stunde | Schumann · Heute-Hero · Ritual/Buch/Resonanz/Kalender · Tageszeile · Kosmos/Werkzeug/Offline
- Tipp des Tages unter **Mehr am Altar**
- SW-Cache `universum-shell-v73`

## 5.22.0 — Altar Cockpit (ein Screen)

Hand-skizziertes **Cockpit**-Bento: alles Wesentliche auf einen Blick (~100dvh, kein Lang-Scroll).
Messpult + Heute + Glance-Apps in asymmetrischer Grid-Zeilenstruktur; kurze Copy; warmes Altar-Gefühl.

## 5.21.3 — Resonanz-Chips alle sichtbar

- **Kein Horizontal-Scroll** mehr bei Kategorie-Chips (Kräuter … Opfergaben): alle Menüpunkte auf einmal sichtbar
- **3×N-Grid** auf typischer Phone-Breite (ab ~420px: 4 Spalten); große Tap-Ziele, aktive/inaktive States, Exclusive-Panel unverändert
- Rituale-Werkzeug-Jump bleibt Grid (bereits ohne Seiten-Scroll)
- SW-Cache `universum-shell-v70`

## 5.21.2 — Resonanz-Menü wie Rituale

- **Kategorie-Chips** (Kräuter · Hausmittel · Steine · Farben · Werkzeuge · Bezüge · Opfergaben) im Stil der Rituale-Jump-Pills: große Tap-Ziele, Icon + Label, aktiv hervorgehoben / inaktiv gedämpft
- **Exklusiv**: nur eine Kategorie sichtbar (Lexikon-Liste); letzte Kategorie in `sessionStorage` (`universum-lexikon-tab`)
- Horizontal scroll auf schmalen Phones — Chips bleiben groß (keine Mini-Pills)
- Suche, A–Z-Sort, Pfadfilter, Detail-Sheet und Favoriten unverändert
- SW-Cache `universum-shell-v69`

## 5.21.1 — Pfad ≠ Sigil (exklusive Panels)

- **Werkzeug-Chips** steuern exklusive Panels: Grenze · Pfad · Sigil · Karten — nur ein Block sichtbar
- Aktiver Chip wie Modus-Tabs; `werkzeugSub` in `sessionStorage` (Default / zuletzt: **Pfad**)
- **Esoterik-Pfad**: Klarheit-Check (Checks), nicht nur Magie-Buch-Link; kein Pfad-Panel als «Sigil öffnen»
- Soft-Scroll nur im gezeigten Panel — kein Scroll, das Sigil unter Pfad freilegt
- SW-Cache `universum-shell-v68`

## 5.21.0 — Path-specific Feldkarten + Sigille

## 5.21.0 — Path-specific Feldkarten + Sigille

- **Feldkarten** je Pfad unter `assets/feldkarten/{path}/` (8×22 = 176 SVGs): Palette, Rahmen, Wassermarken — öffentliche Hauspraxis / symbolisch, keine kopierten heiligen Veves/Lwa/Orisha-Motive
- App lädt Karten nur für aktuellen `state.path`; Chip zeigt Pfadname bei Karten & Sigil
- **Sigil** pfad-getönt (Stroke/Fill/Hintergrund + Symbol-Wasserzeichen); Galerie-Beispiele je Pfad
- **Fix**: Jump «Pfad» vs «Sigil» — `#werkzeug-path` sitzt am echten Pfad-Werkzeug (nicht mehr leerer sr-only-Anker vor Sigil); Chaosmagie-Werkzeug = Labor-Check (nicht nur Sigil-Shortcut)
- Generator: `scripts/generate-feldkarten-paths.mjs`
- SW-Cache `universum-shell-v67` + Precache path-Feldkarten via Manifest

## 5.20.2 — Rituale Werkzeug redesign

- **Jump-Pills** (Grenze · Pfad · Sigil · Karten) deutlich größer: gleichmäßige Tap-Ziele (~48px), klare Labels — weiterhin sekundär zu Werkzeug/Eigene/Geführt
- **Schwellen-Notiz** aus dem Werkzeug-Default entfernt; optionaler Link «Im Magie-Buch notieren» statt leerem Notiz-Modul
- Werkzeug-Bereich ruhiger: weniger Fluff-Text, kompakte Grenze & Ausgleich, Sigil/Karten ohne Extra-Notice-Karten
- SW-Cache `universum-shell-v66`

## 5.20.1 — Rituale UI sizing

- **Modus-Tabs** (Werkzeug · Eigene · Geführt) größer: mehr Padding, höhere Tap-Ziele (~52px), klarere Untermenü-Hierarchie auf Mobile
- **Grenze & Ausgleich** kompakt: kurze Vorschau (2 Zeilen) + Aufklappen für die volle Ethik-Liste; weniger Karten-Padding — Ethik bleibt erreichbar, dominiert nicht
- Sprung-Pills (Grenze · Pfad · Sigil · Karten) leicht zurückgenommen
- SW-Cache `universum-shell-v65`

## 5.20.0 — Close the six product gaps

- **Praxis-Tiefe**: Pro Pfad längeres Ritual (~21–25 Min, multi-phase) klar als «Tiefe» · Wochenbögen mit reicheren Tagestexten · kurze Rituale bleiben
- **Lokale Erinnerungen**: Optional Notification API (Mondfenster, Pfad-Fest, «heute 3 Min») · nur lokal · graceful bei Deny
- **Backup / Import**: Vollbackup ZIP (Buch · Lexikon · Favoriten · Settings) · Import merge/replace · Einstellungen & Magie-Buch
- **PWA Feinschliff**: Stärkerer Homescreen-Hinweis · klarerer Offline-Status am Altar · First-Session-Tipp nach Onboarding · SW `universum-shell-v64`
- **Lexikon Qualität**: ~40 SVG-Motive + dünne Beschreibungen geschärft
- **Vertrauensseite**: Ethik · Privatsphäre lokal · kein medizinischer Rat · Maß · geschlossene Traditionen

## 5.19.0 — Major pass · SVG Motive · Ritual-Pack · Buch · Altar · Onboarding

- **Lexikon-SVGs** deutlich erkennbarer: distinkte Silhouetten (Lavendel-Ähre, Rose, Beifuß, Salbei, Rosmarin-Nadeln, …), Steine mit Schliff/Form (Obsidian-Scherbe, Quarz-Spitze, runder Mondstein), Farben als echte Hue-Swatches, konsistenter Kreisrahmen, stärkere Striche für 28–36px; Generator `scripts/generate-lexikon-icons.mjs` regeneriert
- **Ritual Lexikon-Pack**: nach Sicherheitscheck «Was du brauchst»-Checkliste aus verlinkten Lexikon-Einträgen; Tippen öffnet Detail
- **Ins Buch**: aus Lexikon-Detail Titel + kurzer Body vorgefüllt, Sprung in Magie-Buch-Eintrag
- **Altar-Tageszeile**: ruhige Zeile Mond · Planetenstunde · eine Gabe/Resonanz
- **Onboarding ≈60s**: Pfad wählen → ein Ritual-Tipp → Lexikon-Peek (ohne Gendersprache)
- SW-Cache `universum-shell-v63`

## 5.18.1 — Lexikon SVG Feinschliff · keine Abkürzungen

- Monogramm-/Buchstaben-Chips («Bf» etc.) entfernt — Liste + Detail nur noch SVG
- Jeder Eintrag mit echtem Motiv; Fallback nur `fallback-{kategorie|blank}.svg` — nie Buchstaben, kein Emoji als Primärsymbol; `.nojekyll` für Pages
- Feinschliff: klarere Silhouetten, bessere Unterscheidung Kräuter/Steine, konsistenter Kreisrahmen, lesbar ~28–36px
- SW-Cache `universum-shell-v62`

## 5.18.0 — Custom SVG Lexikon-Icons

- Eigenes SVG-Set für alle Lexikon-Namen (~229), warm-mystisch (Gold/Cream/Erde)
- Dateien unter `assets/lexikon/{slug}.svg` — gleicher Name → gleiches Icon
- Liste + Detail-Sheet: SVG bevorzugt, sonst Monogramm (2 Buchstaben), Emoji nur als letzte Reserve
- Service Worker cached Lexikon-SVGs offline (`universum-shell-v60`)
- Generator: `scripts/generate-lexikon-icons.mjs`

## 5.17.0 — Unique Icons · Opfergaben zuletzt · Detail · Favoriten · Export

- Lexikon-Icons: **226 unique** unter 229 Namen (vorher 117); gleiche Namen teilen Icons, verschiedene Namen nicht mehr generisch
- Tab-Reihenfolge: Kräuter · Hausmittel · Steine · Farben · Werkzeuge · Bezüge · **Opfergaben** (zuletzt)
- Tabs auf Mobile **horizontal scrollbar**, kompaktere Pills
- Eintrags-**Detail-Sheet** (große Erklärung, Symbol, Pfad-Chips, Favorit, Ins Buch, Schließen); Liste bleibt kurz
- **Favoriten** lokal (`lexikonFavorites`), Filter «★ Favoriten», Stern in Liste + Detail
- **Export** eigene Einträge + Favoriten als JSON/Text (Buch-Export-Stil)
- Ethik **einmal** oben; Boilerplate in Eintrags-Texten gekürzt
- SW-Cache `universum-shell-v59`

## 5.16.1 — Resonanzen UI · Lexikon-Icons · keine Buchstabenleiste

- «Heute passt …» nicht mehr zuerst — nach Lexikon als ruhige Nebenkarte
- Buchstaben-Tastatur (A B C …) entfernt; Suche und **A–Z-Sortierung** bleiben
- Heute-Vorschläge (1–3) unter der Liste, dezent
- Lexikon-Icons treffender und namensgleich über alle Pfade (z. B. Wasser 💧, Rum 🥃, Asche 🌫️, Obsidian ⬛)
- SW-Cache `universum-shell-v58`

## 5.16.0 — Opfergaben · Lexikon-Suche · Heute-Brücke · Ritual↔Lexikon · Eigene

- Neuer Lexikon-Tab **Opfergaben** (Alkohol, Rum, Wein, Met, Bier, Wasser, Obst, Kerze, …) — Symbolik/Gabe, Maß, Ethik, kein Trinkzwang, keine Initiation
- Hausmittel bleibt Speise/Würze; klare Gaben in Opfergaben (Doppelungen mit anderem Kontext ok)
- Lexikon-**Suche** + **A–Z**-Leiste / Sortierung
- **Heute-Brücke**: Mond × Planetenstunde → 1–3 Vorschläge (Altar + Resonanzen)
- Ritual-Schritte verlinken passende Lexikon-Namen (Tap → Tab + Hervorhebung)
- **Eigene Lexikon-Einträge** lokal (Speicher wie Buch), immer sichtbar
- Altar-Zuletzt-Kachel: Chip für alle Tabs inkl. Opfergaben
- SW-Cache `universum-shell-v57`

## 5.15.0 — Lexikon stark erweitert · Tab Hausmittel

- Tab-Label **Küche → Hausmittel** (interne Id `kitchen` unverändert)
- Lexikon-Kern auf jedem Pfad: Kräuter, Hausmittel, Steine, Farben, Werkzeuge, Bezüge — Name + Erklärung + Icon
- Pfad-Einträge bleiben vorn; Filter **Nur mein Pfad / Alle Pfade** unverändert (Deduplizierung)
- Symbolik/Hauspraxis, kein Heilversprechen, kein Schaden
- SW-Cache `universum-shell-v56`

## 5.14.2 — Lexikon-Tab Hausmittel

Lexikon-Tab-Label **Küche → Hausmittel** (interne Id `kitchen` unverändert). Leads, Empty States, Toasts und Section-Copy angepasst. SW-Cache `universum-shell-v55`.


## 5.14.1 — Lexikon-Icons · Element Wasser

Kleine Emoji-Icons (Menü-Stil) bei **allen** Lexikon-Einträgen (Kräuter · Hausmittel · Steine · Farben · Werkzeuge · Bezüge). Nordisch: Element **Wasser (Klarheit)** statt irreführendem «Eis». SW-Cache `universum-shell-v54`.

## 5.14.0 — Resonanzen als Lexikon

- Lexikon-Tabs: **Kräuter · Hausmittel · Steine · Farben · Werkzeuge · Bezüge**
- Jeder Eintrag mit Name + Erklärung (Hauspraxis/Symbolik, kein Heilversprechen)
- Hausmittel-Staples (Salz, Zucker, Honig, Öl, Pfeffer, Knoblauch, Nelke, Zimt, Anis …)
- Bezüge/Hilfsmittel (Nagel, Nadel, Haare, Faden/Knoten, Tuch, Erde, Wachs, Asche, Knochen-Symbol, Foto/Name-Zettel, Schlüssel, Münze) — Ethik & Einwilligung
- Pfadfilter «Nur mein Pfad / Alle Pfade» für alle Kategorien (dedupe + Pfad-Chips)
- Tippen → Altar-Glance (`touchResonanzActivity`)

## 5.13.0 — Resonanzen als Kräuter-Liste

- Primär: scrollbare **Kräuter-Referenz** mit Name + Hauspraxis-Beschreibung (kein Heilversprechen)
- Filter wie Kalender: **Nur mein Pfad** (Standard) · **Alle Pfade** (dedupliziert, Pfad-Chips)
- «Heute passt …» bleibt Lead-Karte; Steine/Farben sekundär; Tippen merkt lastActivity für Altar-Glance
- Katalog erweitert (ca. 7 Kräuter pro Pfad)

## Craft-Pass (v4.9.0) · Altar + Resonanzen

- **Bottom-Nav** — **Altar** 🪔 · Kalender · Kosmos · Rituale · **Resonanz** 🌿 · Buch
- User-facing **Altar** (Route bleibt `cockpit`, Alias `#altar`); Stack-Logo UNIVERSUM · ALTAR
- User-facing **Resonanzen** (kurz: Resonanz); interne ids bleiben `korrespondenzen`
- Labels zentral: `ALTAR_LABEL` / `RESONANZ_LABEL` — per Chat leicht austauschbar
- App `4.9.0`, SW-Cache `universum-shell-v40`


## Craft-Pass (v4.8.0) · Korrespondenzen in der Nav

Pfadbezogene Korrespondenzen als eigener Menüpunkt:

- **Bottom-Nav** — Cockpit · Kalender · Kosmos · Rituale · Buch · **Korresp.** 🌿
- Eigene Sektion mit Kräutern, Steinen, Farben, Elementen (pro Pfad)
- Cockpit behält kurzen Peek mit Sprung zur Sektion
- App `4.8.0`, SW-Cache `universum-shell-v39`


## Craft-Pass (v4.7.0) · Netzwerk/Kreis aus der Nav

- **Kreis/Netzwerk** aus Bottom-Nav und Tiles entfernt
- Redirects `#netzwerk` / `#kreis` → Cockpit
- Vertrauen / lokal / kein Sync in Einstellungen und Empfehlen-Karte
- App `4.7.0` (Zwischenstand), SW folgte in 4.8.0


## Craft-Pass (v4.6.0) · 3-Minuten empfehlenswert

Damit ein Kollege die App in drei Minuten ernst nimmt und weitergeben kann:

- **Onboarding** — 3 Schritte: Pfad+Ethik → Was du in 3 Min kannst → Empfehlen
- **Landing** — klare 3-Minuten-Kette + Empfehlungs-Ton
- Nach **Sitzung A–Z** sanfter Hinweis auf Empfehlen
- App `4.6.0`, SW-Cache `universum-shell-v37`


## Craft-Pass (v4.5.0) · Weniger Theorie-Dashboards

- **Unruhe** → **Impuls (abgeleitet)** — Label ohne Prozent-Wahrheit, weiche Leiste
- **Schumann** — im Cockpit eingeklappt als optionaler Impuls, klar «kein Messgerät»
- Briefing/Empfehlungen sprechen von Impuls, nicht von Messwerten
- App `4.5.0`, SW-Cache `universum-shell-v36`


## Craft-Pass (v4.4.0) · Offline zuerst

- **SW** — resilienter Shell-Precache (Einzel-URLs), `SKIP_WAITING`, Cache `universum-shell-v35`
- **Install** — Copy «Offline zuerst»; Banner betont einmal laden → lokal üben
- **Ehrlichkeit** — Offline-Chip, klarere Honesty-Zeile, Station-fehlt → lokal 7,83 Hz (kein Wahrheitsmesser)
- App `4.4.0`, SW-Cache `universum-shell-v35`


## Craft-Pass (v4.3.0) · Pfad-Werkzeugkasten

Ritual-Tabs entzerrt — Werkzeuge nicht mehr gleichgewichtet:

- **Tabs** — Geführt · **🛠️ Werkzeug** · Eigene (Sigil/Karten keine eigenen Haupt-Tabs)
- **Werkzeugkasten** — Grenze/Ethik, Pfad-Modul, Sigil, Feldkarten mit Sprungmarken
- App `4.3.0`, SW-Cache `universum-shell-v34`


## Craft-Pass (v4.2.0) · Sitzung A–Z

Nahtlose Praxis-Kette ohne Menü-Hopping:

- **Sticky Sitzungsleiste** — ① Heute → ② Ritual → ③ Schließen → ④ Buch
- **Heute-CTA** startet die Sitzung und öffnet das Pfad-Ritual direkt
- **Abschluss** führt optional mit Foto ins Magie-Buch; sonst bleibt die Leiste mit «Ins Magie-Buch»
- App `4.2.0`, SW-Cache `universum-shell-v33`


## Craft-Pass (v4.1.0) · Magie-Buch vereint

Notizen und Tagebuch sind ein **Magie-Buch** mit zwei Modi:

- **Bottom-Nav** — 6 Einträge: Cockpit, Kalender, Kosmos, Rituale, **Buch** 📖, Kreis 🔮 (kein separates Notizen)
- **Modi** — «Notiz» (Zettel) · «Eintrag» (Impuls, Stimmung, Tags, Foto, Filter)
- **Timeline** — beide Arten mit Badges Notiz / Eintrag / Ritual; «Als Eintrag» wandelt Notiz um
- **Daten** — `feldlicht-v15` unverändert: Arrays `notes` + `diary` bleiben; Redirects `#notizen` / `#tagebuch` → `#buch`
- App `4.1.0`, SW-Cache `universum-shell-v32`


## Craft-Pass (v4.0.0) · Cockpit Reference Layout

Erste Bildschirmseite am Referenz-Screenshot ausgerichtet:

- **Header** — UNIVERSUM + COCKPIT gestapelt, kompakte Rund-Icons
- **Suche** — sichtbare Pill «Suche · Rituale, Karten, Tagebuch»
- **Dashboard** — Mond / Planetenstunde / Unruhe (abgeleitet) mit Näherung-Badges und weichen Glows
- **Eine Näherungszeile** — ehrlich, ohne Spam
- **Schumann · Station** — Live-Badge, Tomsk-Spektrogramm, lokal 7,83-Hz sekundär
- **Bottom-Nav** — bildhafte Emojis, aktives Cockpit mit Diamant-Unterstreichung
- Heute-Tip und Praxis-Karten **darunter**; `feldlicht-v15` unverändert
- App `4.0.0`, SW-Cache `universum-shell-v31`


## Craft-Pass (v1.2)

Zweite autonome Verbesserungsrunde: reichere Feldkarten-Animation mit Zug-Verlauf, Ritual-Suche/Filter, Sabbat-Jahresrad, optionaler Ambient-Ton (aus), Ritual-Abschlussfluss, Tipps & leere Zustände, Export-Metadaten und Import Zusammenführen/Ersetzen.

## Craft-Pass (v1.3)

Dritte Runde: **Mondnacht-Modus**, **Intention des Tages** (optional → 369), Ritual-**Favoriten**, Briefing-**Chip-Auswahl** (2–3), standalone **Atem** (4/6 & Box), **Sigil-Galerie** (nur Hash + Glyph, nie schädliche Absichten), Accessibility (Skip-Link, Fokusringe, ARIA), kleine Bug-Politur. App `1.3.0`, SW-Cache `universum-shell-v5`. Server unverändert Port **8765**.

## Craft-Pass (v1.4)

Vierte Runde: Sigil-Galerie **Ansehen** (Canvas + optional stiller Atem), Intention-Historie 7 Tage, Kalender-Schnellaktionen, Praxis-Log im Tagebuch, reichere Offline-Kreis-Erklärung + lokale Kreis-Notizen, leichte Render-Optimierungen, visuelle Angleichung der v1.3-Panels. App `1.4.0`, SW-Cache `universum-shell-v6`. Server Port **8765**.

## Craft-Pass (v1.5)

Fünfte Runde: Soft-Daily-Reset-Banner (Mitternacht lokal, ohne Wipe), Cockpit-Schnellzugriff (Favoriten + zuletzt), Feldkarten-**Tageskarte** mit Lock-until-tomorrow, Quota-Error-Toasts + Backup-Reminder, Tagesbriefing **Text kopieren** / Druckansicht, kleine Bugfixes (u. a. Formular bei Speichern-Fehler behalten). App `1.5.0`, SW-Cache `universum-shell-v7`. Server Port **8765**.

## Craft-Pass (v1.6)

Sechste Runde: **Mond-Arbeit** (Neu/Voll), optionaler **Planetenstunde-Wecker**, Notiz→Tagebuch, **3 Ritual-Vorlagen**, Kosmos-Highlight der Stundenplanet, **globale Suche**, CSS-Politur. App `1.6.0`, SW-Cache `universum-shell-v8`. Server Port **8765**.

## Craft-Pass (v1.7)

Siebte Runde — **Produktqualität**: Splash & Onboarding verkaufen den Ritualbegleiter klar; Trust-Strip und Privacy-Messaging für Fremde; Install-Coach für Mobile/Pages; Wochenrückblick; Pages/SW-Subpath-Härte; First-Paint-Politur. App `1.7.0`, SW-Cache `universum-shell-v9`. Server Port **8765**.

## Craft-Pass (v1.8)

Achte Runde — **Anbieten & Tiefe**: sharebares Tagesbriefing (Text/Link/Web-Share + `#briefing`), soft Empfehlen-Einladung mit Pages-URL, Pfad-Lehre (ein Tip pro Pfad), konvertierende Empty-States für Feldkarten/Rituale, A11y/Mobile-Spacing, Bugfixes. App `1.8.0`, SW-Cache `universum-shell-v10`. Server Port **8765**.

## Craft-Pass (v1.9)

Neunte Runde — **Angebot & Fokus**: geführte Erste Praxis (3 Min), Stiller Modus / Focus-Overlay, Export-Paket mit Coach-Zusammenfassung, Sabbat-Countdown-Chip (&lt; 14 Tage), Mikro-Copy und A11y-Politur. App `1.9.0`, SW-Cache `universum-shell-v11`. Server Port **8765**.

## Craft-Pass (v2.0) · Feld-Klarheit

Zehnte Runde — **Feld-Klarheit**: weniger Cockpit auf einmal (eine klare „Jetzt“-Einladung, Sekundäres im ruhigen „Mehr“-Akkordeon); tieferes Schließen nach Ritual, 3-Min-Starter und Fokus (Atem + verkörperte Zeile + optionaler Tagebuch-Keim); Pfad als Haltung (CSS `data-path`-Akzente, Begrüßung, Briefing-Ton, Empty-States, Ritual-Betonung); Vertrauen statt Versprechen (Praxis-Stimme, ehrlicher Trust-Strip); Kreis ehrlich lokal (kein Sync-Versprechen). App `2.0.0`, SW-Cache `universum-shell-v12`. Server Port **8765**.

## Craft-Pass (v2.1) · Erste Minute · Vertrauen · Anbieten

Elfte Runde — **Drei Verbesserungen**: (1) Onboarding auf Erste Minute gekürzt (Pfad → Praxis-Einladung → fertig, Ethik eine Zeile, optional Überspringen, Jetzt-Karte bereit); (2) Astronomie-Vertrauen mit „Näherung“-Badges und ruhigem Hinweis in Mehr/Einstellungen; (3) Landing `index.html` als Produkt-Intro (für wen, lokal, Ethik-One-Liner, CTA «Praxis öffnen», optional Empfehlen). App `2.1.0`, SW-Cache `universum-shell-v13`. Server Port **8765**.

## Craft-Pass (v2.2) · Sprache · Erste Minute

Zwölfte Runde — **Klare Sprache & Feinschliff**: Gendersprache aus UI/README entfernt (klassisch/neutrales Deutsch); Landing und Erste Minute gestrafft; kleine UX-/Bug-Politur. App `2.2.0`, SW-Cache `universum-shell-v14`. Server Port **8765**.

## Craft-Pass (v2.3) · Live Schumann Station

Dreizehnte Runde — **Ehrliche Live-Stationsdaten**: ResonanceOne `/api/now` (Tomsk SR + NOAA Kp/Solar) in Cockpit/Kosmos mit klarer Quellen-/Update-Kennzeichnung; Offline-Fallback 7,83-Hz-Viz; Einstellung und localStorage-Cache unter `feldlicht-v15` (`settings.schumannLive*`). App `2.3.0`, SW-Cache `universum-shell-v15`. Server Port **8765**.

## Craft-Pass (v2.4) · Pfadtiefe

Vierzehnte Runde — **Pfad-Tiefe**: jedes der 8 Pfade erhält eigene geführte Rituale (Filter: Eigenes zuerst); reichere Kalender-Betonung inkl. Chaos-Tore 3/6/9 und klar getrennte Voodoo-/Santería-Haus-Erinnerungstage mit Disclaimern; Haltung schreibt Sicherheitscheck, Schritt-Intro und Abschluss (Danken/Atmen/Erden/Siegeln). Schumann-Live aus v2.3 bleibt. App `2.4.0`, SW-Cache `universum-shell-v16`. Server Port **8765**.

## Craft-Pass (v2.5) · Tomsk-Spektrogramm

Fünfzehnte Runde — **Live Tomsk-Spektrogramm**: ResonanceOne `/api/spectrogram` als sonogramm-artige Hauptgrafik in Cockpit/Kosmos (5-Min-Refresh, ehrliche Attribution, Fehlerfall ohne Metrik-/Viz-Verlust). Pfadtiefe aus v2.4 und Live-Metriken aus v2.3 bleiben. App `2.5.0`, SW-Cache `universum-shell-v17`

**Zusätzlich (v2.6 · Pfad-Woche & Werkzeug)**

- **Pfad-Woche** — 7-Tage-Mikroplan pro Pfad (Mo–So), erledigt in `feldlicht-v15`
- **Rituale-Default** — pfadeigene Rituale zuerst/allein; gemeinsame Übungen hinter Akkordeon
- **Werkzeug-Set** — Mini-Module pro Pfad (Eid/Gabe, Sigil-Labor, Stunden-Notiz, Element-/Körper-/Haus-Check, Schwellen-Notiz)
- **Initiations-Grenze** — Erststart Voodoo/Santería: Bestätigung „Nur Hauspraxis, keine Initiation“
- App `2.6.0`, SW-Cache `universum-shell-v18`. Server Port **8765**.
## Craft-Pass (v2.7) · Kalender pfadfokussiert

Sechzehnte Runde — **Kalender nur mein Pfad**: Standardfilter auf pfadrelevante Feste; Umschalter Alle Feste; Tagesdetail mit „Andere Feste“; Briefing/Countdown respektieren `settings.calendarPathOnly`. App `2.7.0`, SW-Cache `universum-shell-v19`. Server Port **8765**.

## Craft-Pass (v2.8)

Siebzehnte Runde — **UX Klarheit**: modernes dunkles UI mit mehr Weißraum und weicher Elevation; eindeutige Pfad-Symbole in Chip/Haltung/Rituale/Kalender; Cockpit auf Jetzt + Pfad-Woche verdichtet (Rest unter Mehr); Rituale und Onboarding gestrafft; **Maya-Kalender (Tzolkin/Haab) ganz entfernt**. Kalender pfadfokussiert (v2.7), Live-Schumann/Tomsk und Ethik bleiben. App `2.8.0`, SW-Cache `universum-shell-v20`. Server Port **8765**.
