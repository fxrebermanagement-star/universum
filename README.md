# UNIVERSUM · COCKPIT

**Feldlicht ist da — ein stiller Ritualbegleiter für den Tag.**

Premium-Praxis-App für Magier:innen und spirituell Praktizierende. Vanilla HTML/CSS/JS, kein Backend, kein Build. Früher: *Feldlicht Ritualbegleiter*.

## Lokal öffnen

```bash
cd /workspace/universum
python3 -m http.server 8765
```

Dann im Browser:

- Einstieg: [http://127.0.0.1:8765/](http://127.0.0.1:8765/) → weiter zum Cockpit  
- Direkt: [http://127.0.0.1:8765/cockpit.html](http://127.0.0.1:8765/cockpit.html)

PWA: `manifest.webmanifest` + Service Worker (`sw.js`) cachen die App-Shell offline.  
„Zum Home-Bildschirm“ hinzufügen für Standalone-Darstellung.

## Ethik

- **Grenze und Ausgleich**, kein Schaden an Personen
- Sigil-Werkzeug lehnt Fluch-/Schadensabsichten ab
- Voodoo / Santería: nur öffentliche **Hauspraxis**, keine Initiation
- Explizit: *Ein Handy kann keine Geister messen.* Keine EMF-/Geister-Behauptungen
- Unruhe = abgeleitet aus Mondphase, VoC-Hinweis, Retrograd-Näherung, Maya-Ton, optionalem Check-in
- Schumann = 7,83-Hz-Puls-Visualisierung (optional leiser 136-Hz-Web-Audio-Träger), kein Magnetometer
- Erststart: Ethik-Bestätigung im Onboarding (gespeichert in `feldlicht-v15`)

## Funktionen

1. **Cockpit** — **Tagesbriefing** (Mond + Stunde + Unruhe + empfohlene Praxis + nächstes Fest), Mond, **Mond-Arbeit** (Neu/Voll), Planetenstunde (Zürich-Standard), Maya, Unruhe, VoC-Banner, Empfehlungen, Schumann, **369-Tracker**, globale Suche, Pfad-Chip, Streak-Hinweis
2. **Kalender** — Monatsnavigation, Tagesdetails (Mond/Sonne/Maya/Feste), **pfadabhängige Betonung** und Kalender-Notizen
3. **Kosmos** — Planeten-Radar mit klareren Labels, **Legende**, aktuelle **Planetenstunde hervorgehoben**, Tap/Klick für Detail, Schumann
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

- **Produkt-Splash & Onboarding** — klare Positionierung als Praxis-Cockpit für Magier:innen; 4 Schritte mit Nutzen, Pfad, Standort, Ethik
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

**Zusätzlich**

- **First-run Onboarding** — Willkommen, Pfadwahl, Standort (Zürich-Default), Ethik-Bestätigung
- **Einstellungen (⚙)** — Standort, Haptik, Schumann-Audio, sanfter Ambient-Ton (separat, Standard aus), reduzierte Bewegung, Planetenstunde-Wecker (Standard aus), Suche, Onboarding zurücksetzen, Tipp des Tages
- **Toasts** — kurze Bestätigungen; Escape schließt Drawer/Modal/Ritual-Runner; bessere Labels/a11y
- **Feldkarten** — Flip-/Reveal-Animation, Verlauf der letzten Züge in `feldlicht-v15`
- **Ritual-Bibliothek** — Suche und Filter nach Dauer und Pfad (aktuell/alle)
- **Jahresrad** — Sabbat-Ring im Kalender (Tipp springt zum Fest)
- **Abschluss-Mikrofluss** — nach geführten Ritualen: Danken → Erden → Siegeln
- **Export/Import** — Metadaten (App-Version, Pfad); Import-Wahl Zusammenführen oder Ersetzen

**Pfadwahl:** Schamanismus, Nordisch, Voodoo, Santería, Hermetik, Wicca-Hexerei, Chaosmagie, Esoterik — jeweils mit eigenen Sprüchen, Praxis-Hinweisen, Tagebuch-Impulsen und Kalender-Notizen.

## Astronomie (Näherungen)

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
- Export-Dateiname: `universum-buch.json`
- Standard-Koordinaten: 47,37 / 8,54 (Europa/Zürich), überschreibbar
- Zusätzliche Felder im selben Key: `onboarding`, `streaks`, `settings.*` (inkl. `hourAlert`), `dailyIntention`, `intentionHistory`, `ritualFavorites`, `briefingPins`, `sigilGallery`, `practiceLog`, `kreisNotes`, `cardDrawHistory`, `lastSeenDay`, `dayBanner`, `dailyCard`, `backupReminder`, `ritualTemplates`, 369-Tageszähler, Tagebuch-Tags/Stimmung
- Export-Format: `universum-buch-v2` (inkl. `appVersion`, `meta.path` / `pathName`)
- Weitere Felder (v1.5): `lastSeenDay`, `dayBanner`, `dailyCard`, `backupReminder`
- Weitere Felder (v1.6): `ritualTemplates`, `settings.hourAlert`
- Weitere Felder (v1.7): `installHint`

## Technik

- Schriften: **Syne** (Titel/Zahlen) + **Manrope** (Fließtext) via Google Fonts
- Dark-Violet Mystik-Cockpit, mobile-first, Micro-Interactions
- Service Worker: Offline-Shell (`universum-shell-v10`), Scope relativ für GitHub Pages `/universum/`
- Kein React, kein Bundler, kein Backend

## Dateien

```
universum/
  index.html          Einstieg / Splash
  cockpit.html        Haupt-App (7 Bereiche + Onboarding + Settings)
  sw.js               Service Worker
  manifest.webmanifest
  css/styles.css
  js/astronomy.js · storage.js · paths.js · rituals.js
     sigil.js · cards.js · schumann.js · app.js
  icons/
```

## Hinweis

Astronomie und Kalender sind **Näherungen** für die Praxis. Magie bleibt Verantwortung der Praktizierenden — mit Grenze und Ausgleich.

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
