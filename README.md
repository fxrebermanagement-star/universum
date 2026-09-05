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
- Unruhe = abgeleitet aus Mondphase, VoC-Hinweis, Retrograd-Näherung, Maya-Ton, optionalem Check-in
- Schumann = optionale **Live-Stationsdaten** (Tomsk via ResonanceOne + NOAA Kp/Solar) plus 7,83-Hz-Puls-Visualisierung als Offline-Fallback (optional leiser 136-Hz-Web-Audio-Träger); kein Magnetometer, keine Körper-/Geister-Messung
- Erststart: Ethik-Bestätigung im Onboarding (gespeichert in `feldlicht-v15`)

## Funktionen

1. **Cockpit** — **Tagesbriefing** (Mond + Stunde + Unruhe + empfohlene Praxis + nächstes Fest), Mond, **Mond-Arbeit** (Neu/Voll), Planetenstunde (Zürich-Standard), Maya, Unruhe, VoC-Banner, Empfehlungen, Schumann, **369-Tracker**, globale Suche, Pfad-Chip, Streak-Hinweis
2. **Kalender** — Monatsnavigation, Tagesdetails (Mond/Sonne/Maya/Feste), **pfadabhängige Betonung** und Kalender-Notizen
3. **Kosmos** — Planeten-Radar mit klareren Labels, **Legende**, aktuelle **Planetenstunde hervorgehoben**, Tap/Klick für Detail, Schumann Live-Station
4. **Rituale** — Sicherheitscheck, geführte Timed-Rituale (Atembrücke, Kerzenwache), **Praxis-Helfer** (Fokus-Timer), sanfte Streak, Sigil, 22 Feldkarten + Dreierlege, eigene Rituale + **3 Vorlagen**, pfadbezogene Ritual-Auswahl/Flavor
5. **Magie-Tagebuch** — **pfadbezogene Impuls-Vorschläge**, Tags & Stimmung, Export/Import `universum-buch.json`
6. **Notizen** — lokal, optionaler Tag, **ein Tippen → Tagebuch**, leere Zustände mit nächstem Schritt
7. **Netzwerk/Kreis** — ohne Login leer; Talker = knappe Schnittstelle, kein Medium

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
- **Astronomie-Vertrauen** — Badge „Näherung“ an Mond/Stunde/Maya/VoC; Hinweis in Mehr & Einstellungen; kein Ephemeriden-Anspruch
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

**Zusätzlich**

- **First-run Onboarding (Erste Minute)** — Pfad → Praxis-Einladung → fertig; Ethik als eine Zeile; optional Überspringen; Standort Zürich-Default (Einstellungen)
- **Einstellungen (⚙)** — Standort, Haptik, Live-Stationsdaten (Schumann/NOAA, Standard an), Schumann-Audio, sanfter Ambient-Ton (separat, Standard aus), reduzierte Bewegung, Planetenstunde-Wecker (Standard aus), Stiller Modus bei Ritual, Suche, Onboarding/Starter zurücksetzen, Tipp des Tages
- **Toasts** — kurze Bestätigungen; Escape schließt Drawer/Modal/Ritual-Runner; bessere Labels/a11y
- **Feldkarten** — Flip-/Reveal-Animation, Verlauf der letzten Züge in `feldlicht-v15`
- **Ritual-Bibliothek** — Suche und Filter nach Dauer und Pfad (aktuell/alle)
- **Jahresrad** — Sabbat-Ring im Kalender (Tipp springt zum Fest)
- **Abschluss-Mikrofluss** — nach geführten Ritualen: Danken → Erden → Siegeln
- **Export/Import** — Metadaten (App-Version, Pfad); Import-Wahl Zusammenführen oder Ersetzen

**Pfadwahl:** Schamanismus, Nordisch, Voodoo, Santería, Hermetik, Wicca-Hexerei, Chaosmagie, Esoterik — jeweils mit eigenen Sprüchen, Praxis-Hinweisen, Tagebuch-Impulsen, Kalender-Notizen, pfadeigenen Ritualen und Haltung (Sicherheit/Abschluss).

## Astronomie (Näherungen)

Mond, Planetenstunde, Maya, Sonne und VoC sind **Näherungen** für die Praxis — klar gekennzeichnet (Badge „Näherung“ im Cockpit, Hinweis in Mehr/Einstellungen). **Kein professionelles Ephemeris.**

Dokumentiert in `js/astronomy.js`:

| Thema | Methode |
|--------|---------|
| Mondphase | Synodischer Monat ab JD 2451550.1; Feinsuche Neu/Voll |
| Sonne tropisch | Ekliptikale Länge (Meeus-ähnlich) → Zeichen |
| Planetenstunden | Sonnenauf-/untergang, chaldäische Reihe, Default Zürich |
| Maya | GMT-Korrelation JD 584283 → Tzolkin + Haab |
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
- Service Worker: Offline-Shell (`universum-shell-v16`), Scope relativ für GitHub Pages `/universum/`
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
