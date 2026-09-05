# UNIVERSUM · COCKPIT

**Feld-Klarheit — hier übst du, Daten bleiben bei dir.**

Praxiswerkzeug zum Üben — klar, lokal, ohne Hype. Vanilla HTML/CSS/JS, kein Backend, kein Build. Früher: *Feldlicht Ritualbegleiter*.

## Lokal öffnen

```bash
cd /workspace/universum
python3 -m http.server 8765
```

Dann im Browser:

- Einstieg / Landing: [http://127.0.0.1:8765/](http://127.0.0.1:8765/) → **Üben öffnen** → Cockpit  
- Direkt: [http://127.0.0.1:8765/cockpit.html](http://127.0.0.1:8765/cockpit.html)

PWA: `manifest.webmanifest` + Service Worker (`sw.js`) cachen die App-Shell offline.  
„Zum Home-Bildschirm“ hinzufügen für Standalone-Darstellung.

## Ethik

- **Grenze und Ausgleich**, kein Schaden an Personen
- Sigil-Werkzeug lehnt Fluch-/Schadensabsichten ab
- Voodoo / Santería: nur öffentliche **Hauspraxis**, keine Initiation
- Explizit: *Ein Handy kann keine Geister messen.* Keine EMF-/Geister-Behauptungen
- Unruhe = abgeleitet aus Mondphase, VoC-Hinweis, Retrograd-Näherung, optionalem Check-in
- Schumann = optionale **Live-Stationsdaten** und **Tomsk-Spektrogramm** (via ResonanceOne + NOAA Kp/Solar) plus 7,83-Hz-Puls-Visualisierung als Offline-Fallback (optional leiser 136-Hz-Web-Audio-Träger); kein Magnetometer, keine Körper-/Geister-Messung
- Erststart: Ethik-Bestätigung im Onboarding (gespeichert in `feldlicht-v15`)

## Funktionen

1. **Cockpit** — **Above-the-fold**: Suche, Mond/Planetenstunde/Unruhe-Tiles (Näherung), Schumann-Station (Tomsk); darunter Heute-Tip, Pfad-Woche, Mondfenster, Korrespondenzen, Journal u. a.; Empfehlen/PWA; Pfad-Chip, Streak
2. **Kalender** — Monatsnavigation, Tagesdetails (Mond/Sonne/Feste), **standardmäßig nur Pfad-Feste** (Umschalter Alle Feste), Betonung und Kalender-Notizen
3. **Kosmos** — Planeten-Radar mit klareren Labels, **Legende**, aktuelle **Planetenstunde hervorgehoben**, Tap/Klick für Detail, Schumann Live-Station + Tomsk-Spektrogramm
4. **Rituale** — **nur aktueller Pfad** (4–5 einzigartige Own-Rituale); Grundlagen separat; Signaturen, Dauer-Tags 3/11/21, Sicherheitscheck, Timed-Rituale, Fokus-Timer, Sigil, illustrierte Feldkarten, eigene Rituale + Vorlagen
5. **Magie-Buch** — Notiz (schnell) · Eintrag (Ritual, Stimmung, Foto, Filter); gemeinsame Timeline; Fotos IndexedDB; ZIP/PDF; Export/Import `universum-buch.json` (`notes` + `diary` in `feldlicht-v15`)
6. **Netzwerk/Kreis** — ohne Login leer; Talker = knappe Schnittstelle, kein Medium

**Zusätzlich (v1.3–1.4)**

- **Mondnacht-Modus** — weicher Abend-Dimm (CSS + Einstellung)
- **Intention des Tages** — eine Zeile im Cockpit, optional in 369
- **Ritual-Favoriten** — Stern/Pin, Favoriten zuerst
- **Briefing-Chips** — 2–3 Kalender-Metriken wählen/reihen
- **Atem-Übung** — 4/6 und Box-Atmung mit Kreis, ohne volles Ritual
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
- **Landing** — `index.html` als ruhiges Produkt-Intro (für wen, lokal, Ethik, CTA «Üben öffnen», Empfehlen-Link)
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

- **Alles auf einer Seite** — Mehr-Akkordeon entfernt; Heute, Pfad-Woche, Mondfenster, Korrespondenzen, Astronomie, Schumann, Journal und Praxis-Karten als ruhiger Scroll-Flow
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

- **Korrespondenzen** — pfadbezogene Kräuter / Steine / Farben (Hauspraxis-Symbolik, keine medizinischen Claims)
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
  index.html          Landing / Produkt-Intro → Cockpit
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

Dritte Runde: **Mondnacht-Modus**, **Intention des Tages** (optional → 369), Ritual-**Favoriten**, Briefing-**Chip-Auswahl** (2–3), standalone **Atem-Übung** (4/6 & Box), **Sigil-Galerie** (nur Hash + Glyph, nie schädliche Absichten), Accessibility (Skip-Link, Fokusringe, ARIA), kleine Bug-Politur. App `1.3.0`, SW-Cache `universum-shell-v5`. Server unverändert Port **8765**.

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

Elfte Runde — **Drei Verbesserungen**: (1) Onboarding auf Erste Minute gekürzt (Pfad → Praxis-Einladung → fertig, Ethik eine Zeile, optional Überspringen, Jetzt-Karte bereit); (2) Astronomie-Vertrauen mit „Näherung“-Badges und ruhigem Hinweis in Mehr/Einstellungen; (3) Landing `index.html` als Produkt-Intro (für wen, lokal, Ethik-One-Liner, CTA «Üben öffnen», optional Empfehlen). App `2.1.0`, SW-Cache `universum-shell-v13`. Server Port **8765**.

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
