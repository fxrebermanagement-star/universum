/**
 * UNIVERSUM · ALTAR — main UI controller (practice companion · Feld-Klarheit · v2.7)
 */
(function () {
  'use strict';

  const Astro = window.UniversumAstro;
  const Store = window.UniversumStorage;
  const Media = window.UniversumMedia;
  const Paths = window.UniversumPaths;
  const Rituals = window.UniversumRituals;
  const Sigil = window.UniversumSigil;
  const Cards = window.UniversumCards;
  const Schumann = window.UniversumSchumann;

  function schumannLiveEnabledFromState(st) {
    const s = (st && st.settings) || {};
    return s.schumannLiveEnabled !== false;
  }

  function persistSchumannLiveCache(reading) {
    Store.update(d => {
      d.settings = d.settings || {};
      d.settings.schumannLive = reading || null;
    });
  }

  function badgeLabelForStatus(status) {
    if (status === 'live') return 'Tomsk erreichbar';
    if (status === 'loading') return 'Verbinde leise …';
    if (status === 'disabled') return 'Lokal · 7,83 Hz';
    if (status === 'error') return 'Lokal · 7,83 Hz';
    return 'Lokal · 7,83 Hz';
  }

  function sourceLineFromReading(r) {
    if (!r) return '—';
    const parts = [];
    const src = r.data_source ? String(r.data_source) : '';
    if (src.toLowerCase() === 'tomsk') parts.push('Tomsk (ResonanceOne)');
    else if (src) parts.push(src);
    else parts.push('ResonanceOne');
    const attr = r.attribution || {};
    if (attr.kp || attr.solar) parts.push('NOAA Kp/Solar');
    if (r.data_quality) parts.push('Qualität ' + r.data_quality);
    if (r.confidence_score != null && isFinite(r.confidence_score)) {
      parts.push('Konfidenz ' + r.confidence_score);
    }
    return parts.join(' · ');
  }

  function renderSchumannLiveUI(snap) {
    if (!Schumann) return;
    snap = snap || (Schumann.getLiveState && Schumann.getLiveState()) || {};
    const reading = snap.reading || null;
    const status = snap.status || 'offline';
    const badgeText = badgeLabelForStatus(status);
    $$('[data-sch-badge]').forEach(el => {
      el.dataset.state = status;
      el.textContent = badgeText;
    });
    const hz = reading && reading.schumann_frequency_hz != null
      ? Schumann.formatHz(reading.schumann_frequency_hz)
      : (status === 'live' ? Schumann.formatHz(snap.freqHz) : '—');
    const idx = reading && reading.schumann_index != null && isFinite(reading.schumann_index)
      ? String(Math.round(reading.schumann_index))
      : '—';
    const kp = reading && reading.kp_index != null && isFinite(reading.kp_index)
      ? String(reading.kp_index)
      : '—';
    const geo = reading && reading.geomagnetic_status
      ? Schumann.geoLabelDe(reading.geomagnetic_status)
      : '—';
    const updated = reading && reading.updated_at
      ? Schumann.formatUpdatedLocal(reading.updated_at)
      : (status === 'loading' ? '…' : '—');
    const source = sourceLineFromReading(reading);
    $$('[data-sch-hz]').forEach(el => { el.textContent = hz; });
    $$('[data-sch-index]').forEach(el => { el.textContent = idx; });
    $$('[data-sch-kp]').forEach(el => { el.textContent = kp; });
    $$('[data-sch-geo]').forEach(el => { el.textContent = geo; });
    $$('[data-sch-updated]').forEach(el => { el.textContent = updated; });
    $$('[data-sch-source]').forEach(el => { el.textContent = source; });
    const honesty = (status === 'live')
      ? 'Tomsk-Daten (via ResonanceOne) — leise und optional, kein Messgerät am Handy.'
      : (status === 'loading')
        ? 'Kurz verbinden … lokal 7,83 Hz bleibt.'
        : 'Lokal 7,83 Hz — optional und leise. Kein Wahrheitsmesser.';
    $$('[data-sch-honesty]').forEach(el => { el.textContent = honesty; });
  }

  function bootSchumannLive() {
    if (!Schumann || !Schumann.startLive) return;
    const enabled = schumannLiveEnabledFromState(state);
    const cached = state.settings && state.settings.schumannLive ? state.settings.schumannLive : null;
    Schumann.onLiveUpdate(renderSchumannLiveUI);
    Schumann.startLive({
      enabled: enabled,
      cached: cached,
      persist: persistSchumannLiveCache
    }).then(renderSchumannLiveUI).catch(() => renderSchumannLiveUI());
    renderSchumannLiveUI(Schumann.getLiveState());
    if (Schumann.startSpectrogram) Schumann.startSpectrogram();
  }


  let state = Store.load();
  let calYear, calMonth;
  let selectedDay = null;
  let ritualTimer = null;
  let breathTimer = null;
  let checkInVal = state.checkIn;
  let diaryMood = null;
  /** Pending diary photo before save: { id, dataUrl, blob, w, h } */
  let diaryPendingPhoto = null;
  /** Pending photo in ritual closing seed step */
  let closingPendingPhoto = null;
  let diaryFilters = { path: '', moon: '', ritual: '', tag: '' };
  let focusTimer = null;
  let focusRemaining = 300;
  let focusSelectedMins = 5;
  let radarHits = [];
  let onboardStep = 0;
  let onboardPath = null;
  const LIMITS_369 = { morning: 3, afternoon: 6, evening: 9 };
  let ritualSearch = '';
  let ritualDurFilter = 'all';
  let ritualPathFilter = 'current';
  let drawAnimating = false;
  let breathSoloTimer = null;
  let breathSoloMode = '46';
  let breathSoloRunning = false;
  let lastSigilLetters = '';
  let lastSigilOk = false;
  let lastSigilReview = false;
  let activeSection = null;
  let breathSoloCycles = 0;
  let breathSoloReviewTimer = null;
  let lastHourPlanetKey = null;
  let hourAlertBootstrapped = false;
  let mondArbeitRitualId = 'intention';

  const SABBATS = [
    { name: 'Imbolc', m: 2, d: 1, ico: '🕯️' },
    { name: 'Ostara', m: 3, d: 20, ico: '🌱' },
    { name: 'Beltane', m: 5, d: 1, ico: '🔥' },
    { name: 'Litha', m: 6, d: 21, ico: '☀️' },
    { name: 'Lughnasadh', m: 8, d: 1, ico: '🌾' },
    { name: 'Mabon', m: 9, d: 22, ico: '🍂' },
    { name: 'Samhain', m: 10, d: 31, ico: '🌙' },
    { name: 'Yule', m: 12, d: 21, ico: '❄️' }
  ];

  const TIPS = [
    'Drei bewusste Atemzüge reichen oft als Schwelle in die Praxis.',
    'Schließe jede Arbeit bewusst — Atem, Körper, Siegel, optional ein Tagebuch-Keim.',
    'Ein Handy kann keine Geister messen. Respekt bleibt Haltung.',
    'Grenze und Ausgleich: kein Schaden an Personen.',
    'Lieber eine kurze klare Praxis als ein langes Zögern.',
    'Schreibe Absichten positiv und in der Gegenwart.',
    'Wasser trinken nach dem Ritual — Körper zuerst.',
    'Sigil: laden, dann vergessen. Ergebnis nicht jagen.',
    'VoC-Phasen eignen sich besser zum Lauschen als zum Starten.',
    'Der Jahreskreis atmet — Sabbats sind Rhythmus, nicht Pflicht.',
    'Notiere einen Satz im Magie-Tagebuch, bevor der Tag verwischt.',
    'Schutz heißt Nein können — nicht angreifen.',
    'Reduzierte Bewegung schont, wenn das Nervensystem eng ist.',
    'Pfadwahl ändert Flavor, nicht deine Verantwortung.',
    'Kerze nur unter Aufsicht — LED ist ethisch und sicher genug.',
    'Feldkarten fragen — sie befehlen nicht.',
    'Streak ist sanft: ein Ritual oder 369 hält den Faden.',
    'Standort Zürich ist Default — passe ihn an, wenn du woanders übst.',
    'Unruhe ist abgeleitet, kein Orakel und kein Diagnosegerät.',
    'Exportiere dein Buch gelegentlich — lokal bleibt lokal.',
    'Mondnacht-Modus dämpft das Licht für abendliche Praxis.',
    'Sterne deine Lieblingsrituale — Favoriten erscheinen zuerst.',
    'Eine Intention des Tages reicht oft als stiller Faden.',
    'Praxis-Log hält Ritual, 369 und Atem diskret fest — löschbar.',
    'Alles lokal: kein Sync, kein Konto — Daten bleiben auf dem Gerät.',
    'Tageskarte: einmal ziehen, bis Mitternacht gesiegelt — ohne Datenverlust.',
    'Mond-Arbeit: bei Neu- und Vollmond erscheint ein stiller Praxis-Impuls am Altar.',
    'Planetenstunde-Wecker: optional sanfte Erinnerung beim Stundenwechsel (Standard aus).',
    'Notizen wandern mit einem Tippen ins Magie-Tagebuch.',
    'Ritual-Vorlagen: bis zu drei eigene Schablonen unter Eigene Rituale.',
    'Globale Suche findet Rituale, Feldkarten und Tagebuch-Titel.',
    'Exportiere dein Buch alle paar Einträge — Quota-Fehler vermeiden.',
    'Schnellzugriff zeigt Favoriten und letzte Praxis am Altar.',
    'Wochenrückblick im Tagebuch: sieben Tage Praxis auf einen Blick — ohne Vergleich.',
    'Zum Home-Bildschirm hinzufügen: UNIVERSUM fühlt sich an wie eine App, bleibt aber lokal.',
    'Warum UNIVERSUM: lokal, ethisch, pfadstark — Praxiswerkzeug, kein Feed.',
    'Tagesbriefing teilen: klarer Text oder Link — Praxis weitergeben ohne Druck.',
    'Weitergeben: sanfte Einladung mit Pages-URL — für Menschen im Feld, ohne Hype.',
    'Pfad-Lehre: ein Lehrsatz pro Pfad am Altar — Tiefe ohne Dogma.',
    'Erste Praxis in 3 Minuten: Intention, Atem, Erdung — klarer Einstieg für Neue.',
    'Stiller Modus blendet Chrome aus — Fokus aufs Ritual, Esc bringt alles zurück.',
    'Export-Paket: universum-buch.json plus Praxis-Zusammenfassung für Coaches.',
    'Fest-Countdown: wenn der nächste Sabbat unter 14 Tagen liegt, zeigt der Altar einen Chip.',
    'Kalender „Nur mein Pfad“: standardmäßig nur pfadrelevante Feste — Umschalter auf Alle Feste.',
    'Pfad-Woche: sieben kurze Schritte Mo–So — erledigt speichert lokal.',
    'Werkzeug-Set: Mini-Modul pro Pfad (Eid, Sigil, Elemente, Haus-Reinheit).',
    'Pfad-Symbole: jedes Symbol steht für eine Haltung — Chip, Rituale, Kalender.',
    'Heute: ein Tip genügt — Ritual oder Haltung, stabil für Datum und Pfad.',
    'Resonanzen sind Hauspraxis-Symbolik — kein medizinischer Rat.',
    'Mondfenster: «gut für …» zur Phase, angepasst an deinen Pfad.',
    'Kurze Werke: Schutz, Reinigung, Anziehen, Loslassen — pfadbezogen und ethisch.',
    'Altar zeigt Mond und Stunde als Arbeitsfenster — nicht als Mess-Dashboard.',
    'Jahresrad ist Praxis-Atem, nicht nur ein Kalenderdatum.',
    'Ritual-Journal: nach dem Schließen optional einen Satz speichern (Mehr).',
    'Empfehlen: teilen oder Link kopieren — lokal, ohne Konto.',
  ];

  function tipOfDay(date) {
    const d = date || new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    const day = Math.floor((d - start) / 86400000);
    return TIPS[day % TIPS.length];
  }

  function renderTipOfDay() {
    const tip = tipOfDay();
    const a = $('#tip-of-day');
    const b = $('#settings-tip-of-day');
    if (a) a.textContent = tip;
    if (b) b.textContent = tip;
    const ver = $('#settings-app-version');
    if (ver && Store.APP_VERSION) ver.textContent = Store.APP_VERSION;
  }

  const PLANET_BLURBS = {
    Sonne: 'Zentrum und Klarheit — Tageslicht der Absicht.',
    Mond: 'Gefühl und Rhythmus — Nähe zum Körper.',
    Merkur: 'Worte und Wege — Austausch mit Maß.',
    Venus: 'Bindung und Wert — Schönheit ohne Besitzanspruch.',
    Mars: 'Antrieb und Grenze — Kraft ohne Schaden.',
    Jupiter: 'Weite und Sinn — Wachstum mit Ethik.',
    Saturn: 'Struktur und Zeit — Verantwortung halten.'
  };
  const PLANET_COLORS = {
    Sonne: '#e8c547', Mond: '#6eb5ff', Merkur: '#b0b8c8', Venus: '#f0a0c0',
    Mars: '#e05060', Jupiter: '#c4a060', Saturn: '#9a8fb0'
  };

  /** User-facing labels — swap here if renamed via chat; route ids stay stable */

  const HOUR_GUT_FUER = {
    Sonne: 'Klarheit und Gabe — Absicht mit Licht, ohne Druck.',
    Mond: 'Gefühl und Schweigen — Nähe zum Körper.',
    Merkur: 'Worte mit Maß — Wege klären, nicht hetzen.',
    Venus: 'Bindung und Schönheit — ohne Besitzanspruch.',
    Mars: 'Antrieb und Grenze — Kraft ohne Schaden.',
    Jupiter: 'Weite und Sinn — Wachstum mit Ethik.',
    Saturn: 'Struktur und Zeit — Verantwortung halten.'
  };

  function softHourInvite(hour) {
    const p = hour && hour.planet ? hour.planet : '—';
    const gut = HOUR_GUT_FUER[p] || 'Ruhige Praxis mit Maß.';
    return { planet: p, gut: gut };
  }

  function softUnrestInvite(unrest) {
    const label = unrest && unrest.label ? unrest.label : '';
    if (label === 'Hoch') {
      return { word: 'Bewegt', meta: 'Gut für: Grenze halten, Atem, Schweigen — kein Spektakel.' };
    }
    if (label === 'Bewegt') {
      return { word: 'Lebendig', meta: 'Gut für: kurze Praxis, Klarheit, nicht alles auf einmal.' };
    }
    return { word: 'Ruhig', meta: 'Gut für: Gabe setzen oder einfach schweigen.' };
  }

  const ALTAR_LABEL = { name: 'Altar', ico: '🪔' };
  const RESONANZ_LABEL = { name: 'Resonanzen', short: 'Resonanz', ico: '🌿' };

  const SECTIONS = [
    { id: 'cockpit', name: ALTAR_LABEL.name, ico: ALTAR_LABEL.ico },
    { id: 'kalender', name: 'Kalender', ico: '📅' },
    { id: 'kosmos', name: 'Kosmos', ico: '🪐' },
    { id: 'rituale', name: 'Rituale', ico: '🕯️' },
    { id: 'korrespondenzen', name: RESONANZ_LABEL.short, ico: RESONANZ_LABEL.ico },
    { id: 'buch', name: 'Buch', ico: '📖' }
  ];
  /** Magie-Buch compose mode: notiz | eintrag */
  let buchMode = 'notiz';
  const BUCH_ALIASES = { tagebuch: 'buch', notizen: 'buch', diary: 'buch', notes: 'buch' };
  /** Legacy hashes → aktuelle Sektionen */
  const SECTION_REDIRECTS = {
    netzwerk: 'cockpit',
    kreis: 'cockpit',
    altar: 'cockpit',
    korrespondenz: 'korrespondenzen',
    korresp: 'korrespondenzen',
    resonanzen: 'korrespondenzen',
    resonanz: 'korrespondenzen',
    entsprechungen: 'korrespondenzen',
    entsprechung: 'korrespondenzen'
  };
  /** Sitzung A–Z: heute → ritual → schliessen → buch */
  let sitzung = { phase: 'idle', ritualId: null, ritualName: null, savedToBuch: false, visible: false };


  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function fmtTime(d) {
    if (!d) return '—';
    return d.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
  }
  function fmtDate(d) {
    return d.toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }

  const PAGES_URL = 'https://fxrebermanagement-star.github.io/universum/';
  const BRIEFING_SHARE_URL = PAGES_URL + 'cockpit.html#briefing';

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (!ok) throw new Error('copy failed');
    return true;
  }

  function refreshState() { state = Store.load(); }

  function toast(msg, ms, kind) {
    const host = $('#toast-host');
    if (!host || !msg) return;
    const el = document.createElement('div');
    el.className = 'toast' + (kind === 'error' ? ' error' : kind === 'warn' ? ' warn' : '');
    el.textContent = msg;
    host.appendChild(el);
    const hold = ms != null ? ms : (kind === 'error' ? 4200 : kind === 'warn' ? 3600 : 2400);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 240);
    }, hold);
  }

  /** After Store mutations: surface quota failures; optional success toast. */
  function afterPersist(successMsg, opts) {
    opts = opts || {};
    const r = Store.getLastSaveResult ? Store.getLastSaveResult() : { ok: true };
    if (r && r.ok === false) {
      toast(r.message || 'Speichern fehlgeschlagen.', opts.errorMs || 4500, 'error');
      return false;
    }
    if (successMsg) toast(successMsg, opts.ms, opts.kind);
    if (opts.checkBackup !== false) maybeBackupReminder();
    return true;
  }

  function maybeBackupReminder() {
    if (!Store.shouldRemindBackup || !Store.shouldRemindBackup()) return;
    const n = Store.entryCount ? Store.entryCount() : 0;
    const every = Store.BACKUP_EVERY_N || 15;
    toast('Backup-Tipp: ' + n + ' Einträge · Export unter Tagebuch empfohlen (alle ≈' + every + ').', 4800, 'warn');
    Store.markBackupReminded();
    refreshState();
  }

  function dayGreetingWord() {
    const h = new Date().getHours();
    if (h < 11) return 'Guten Morgen';
    if (h < 17) return 'Guten Tag';
    return 'Guten Abend';
  }

  function renderDayBanner() {
    const ban = $('#day-banner');
    if (!ban) return;
    const show = Store.shouldShowDayBanner && Store.shouldShowDayBanner();
    ban.hidden = !show;
    if (!show) return;
    const title = $('#day-banner-title');
    const body = $('#day-banner-text');
    if (title) title.textContent = dayGreetingWord() + ' — neuer Tag';
    if (body) {
      body.textContent = 'Deine Einträge, Notizen und Streaks bleiben. Intention und Tageskarte sind frisch für heute.';
    }
  }

  function onLocalDayChange() {
    const show = Store.checkDayRollover ? Store.checkDayRollover() : false;
    refreshState();
    if (Store.clearDailyCardIfStale) Store.clearDailyCardIfStale();
    refreshState();
    renderDayBanner();
    renderDailyCardPanel();
    renderDailyIntention();
    if (show) {
      toast(dayGreetingWord() + ' — stiller Neustart ohne Datenverlust.', 3200);
      if ($('#sec-cockpit') && $('#sec-cockpit').classList.contains('active')) {
        renderCockpit();
      }
    }
  }

  function scheduleMidnightWatch() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 3, 0);
    let wait = next.getTime() - now.getTime();
    if (wait < 1000) wait = 1000;
    if (wait > 86400000) wait = 86400000;
    setTimeout(() => {
      onLocalDayChange();
      scheduleMidnightWatch();
    }, wait);
  }

  function buildBriefingShareText(opts) {
    opts = opts || {};
    const withLink = opts.withLink !== false;
    const lead = ($('#briefing-lead') && $('#briefing-lead').textContent) || '';
    const chips = $$('#briefing-meta li').map(li => '· ' + li.textContent.trim()).join('\n');
    const practice = ($('#briefing-practice') && $('#briefing-practice').textContent) || '';
    const pathNote = ($('#briefing-path-note') && $('#briefing-path-note').textContent) || '';
    const teach = ($('#path-teach-text') && $('#path-teach-text').textContent) || '';
    const streak = $('#briefing-streak');
    const streakTxt = streak && !streak.hidden ? streak.textContent : '';
    const di = Store.getDailyIntention ? Store.getDailyIntention() : null;
    const intention = di && di.text ? 'Intention: ' + di.text : '';
    const daily = Store.getDailyCard ? Store.getDailyCard() : null;
    const cardLine = daily ? 'Tageskarte: Feld ' + daily.n + ' · ' + daily.name + (daily.theme ? ' — ' + daily.theme : '') : '';
    const when = fmtDate(new Date());
    const path = currentPath();
    const lines = [
      '✦ UNIVERSUM · Tagesbriefing',
      when + (path && path.name ? ' · ' + path.name : ''),
      streakTxt ? 'Praxis-Faden: ' + streakTxt : '',
      '',
      lead,
      chips ? chips : '',
      '',
      practice ? 'Empfohlene Praxis\n' + practice : '',
      teach ? 'Pfad-Lehre\n' + teach : '',
      pathNote ? pathNote : '',
      intention ? intention : '',
      cardLine ? cardLine : '',
      '',
      '———',
      'Stiller Ritualbegleiter für die Praxis · lokal · ethisch',
      'Grenze und Ausgleich. Kein Schaden an Personen.'
    ];
    if (withLink) {
      lines.push('Praxis öffnen: ' + BRIEFING_SHARE_URL);
    }
    return lines.filter((line, i, arr) => {
      if (line !== '') return true;
      return i > 0 && arr[i - 1] !== '';
    }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function buildInviteText() {
    const path = currentPath();
    return [
      'Einladung zu UNIVERSUM · ALTAR',
      '',
      'Hier übe ich mit UNIVERSUM — einem stillen Praxiswerkzeug (kein Hype, kein Konto).',
      'Tagesbriefing, Rituale, Magie-Tagebuch: Daten bleiben auf dem Gerät.',
      path && path.name ? 'Aktuelle Haltung: ' + path.name + '.' : '',
      '',
      'Öffnen: ' + PAGES_URL,
      '',
      'Grenze und Ausgleich. Kein Schaden an Personen.',
      'Ein Handy kann keine Geister messen.'
    ].filter(Boolean).join('\n');
  }

  async function copyBriefingText() {
    const text = buildBriefingShareText({ withLink: true });
    try {
      await copyToClipboard(text);
      toast('Tagesbriefing kopiert');
      Rituals.vibrate(12);
    } catch (e) {
      toast('Kopieren nicht möglich — Text manuell markieren.', 3600, 'warn');
    }
  }

  async function copyBriefingLink() {
    try {
      await copyToClipboard(BRIEFING_SHARE_URL);
      toast('Briefing-Link kopiert');
      Rituals.vibrate(10);
    } catch (e) {
      toast('Link-Kopieren nicht möglich', 3200, 'warn');
    }
  }

  async function shareBriefing() {
    const text = buildBriefingShareText({ withLink: true });
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'UNIVERSUM · Tagesbriefing',
          text: text,
          url: BRIEFING_SHARE_URL
        });
        toast('Briefing geteilt');
        Rituals.vibrate(14);
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    await copyBriefingText();
  }

  async function copyInviteText() {
    const text = buildInviteText();
    try {
      await copyToClipboard(text);
      toast('Einladung kopiert');
      Rituals.vibrate(12);
    } catch (e) {
      toast('Kopieren nicht möglich', 3200, 'warn');
    }
  }

  async function shareInvite() {
    const text = buildInviteText();
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'UNIVERSUM · Einladung',
          text: text,
          url: PAGES_URL
        });
        toast('Einladung geteilt');
        Rituals.vibrate(14);
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    await copyInviteText();
  }

  function renderInvitePreview() {
    const el = $('#invite-preview');
    if (!el) return;
    const preview = buildInviteText().split('\n').slice(0, 4).join(' · ');
    el.textContent = preview.length > 160 ? preview.slice(0, 157) + '…' : preview;
  }

  function renderPathTeachingTip() {
    const textEl = $('#path-teach-text');
    const chip = $('#path-teach-chip');
    if (!textEl) return;
    const path = currentPath();
    const tip = (path && path.teachingTip) || (path && path.practiceHint) || 'Praxis vor Spektakel — mit Grenze und Ausgleich.';
    textEl.textContent = tip;
    if (chip) chip.textContent = path && path.name ? path.name : 'Pfad';
  }

  function focusBriefingFromShare() {
    navigate('cockpit');
    const card = $('#tagesbriefing');
    if (!card) return;
    card.classList.add('briefing-share-focus');
    try {
      card.scrollIntoView({
        behavior: (state.settings && state.settings.reducedMotion) ? 'auto' : 'smooth',
        block: 'start'
      });
    } catch (_) {}
    setTimeout(() => card.classList.remove('briefing-share-focus'), 3200);
  }

  function printBriefing() {
    try {
      window.print();
    } catch (_) {
      toast('Druckansicht nicht verfügbar', 2800, 'warn');
    }
  }

  function renderQuickPraxis() {
    const row = $('#quick-praxis-row');
    const empty = $('#quick-praxis-empty');
    if (!row) return;
    refreshState();
    const favs = (state.ritualFavorites || []).slice(0, 4);
    const recent = (Store.getPracticeLog ? Store.getPracticeLog(6) : []).slice(0, 4);
    const parts = [];
    favs.forEach(id => {
      let r = Rituals.getRitual(id);
      if (!r) {
        r = (state.customRituals || []).find(x => x.id === id);
        if (r) r = Object.assign({ ico: '✦' }, r);
      }
      if (!r) return;
      parts.push({
        kind: 'fav',
        id: r.id,
        ico: r.ico || '★',
        label: r.name,
        tag: 'Favorit'
      });
    });
    const seen = new Set(parts.map(p => p.id));
    recent.forEach(p => {
      const key = (p.kind || '') + ':' + (p.label || '');
      if (seen.has(key)) return;
      seen.add(key);
      // Prefer linking ritual by label match
      let ritualId = null;
      if (p.kind === 'ritual' && Rituals.GUIDED) {
        const hit = Rituals.GUIDED.find(x => x.name === p.label);
        if (hit) ritualId = hit.id;
      }
      parts.push({
        kind: 'recent',
        id: ritualId || p.id,
        ritualId: ritualId,
        logKind: p.kind,
        ico: p.kind === '369' ? '3️⃣' : p.kind === 'atem' ? '🌬️' : p.kind === 'fokus' ? '🎯' : '✨',
        label: p.label || 'Praxis',
        tag: 'Zuletzt'
      });
    });
    const limited = parts.slice(0, 6);
    if (!limited.length) {
      row.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    row.innerHTML = limited.map(p =>
      '<button type="button" class="quick-chip' + (p.kind === 'recent' ? ' recent' : '') +
      '" role="listitem" data-quick-kind="' + escapeHtml(p.kind) +
      '" data-quick-id="' + escapeHtml(p.id || '') +
      '"' + (p.ritualId ? ' data-ritual-id="' + escapeHtml(p.ritualId) + '"' : '') +
      (p.logKind ? ' data-log-kind="' + escapeHtml(p.logKind) + '"' : '') +
      '><span class="qc-ico" aria-hidden="true">' + escapeHtml(p.ico) +
      '</span><span class="qc-label">' + escapeHtml(p.label) +
      '</span><span class="qc-tag">' + escapeHtml(p.tag) + '</span></button>'
    ).join('');
    $$('#quick-praxis-row [data-quick-kind]').forEach(btn => {
      btn.addEventListener('click', () => {
        const kind = btn.dataset.quickKind;
        if (kind === 'fav') {
          let r = Rituals.getRitual(btn.dataset.quickId);
          if (!r) r = (state.customRituals || []).find(x => x.id === btn.dataset.quickId);
          if (r) { navigate('rituale', { force: true }); openRitual(r); }
          else toast('Ritual nicht gefunden', 2400, 'warn');
          return;
        }
        const rid = btn.dataset.ritualId;
        if (rid) {
          const r = Rituals.getRitual(rid);
          if (r) { navigate('rituale', { force: true }); openRitual(r); return; }
        }
        const lk = btn.dataset.logKind;
        if (lk === '369') {
          navigate('cockpit', { force: true });
          const el = $('#phrase-369');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast('369 am Altar');
          return;
        }
        if (lk === 'atem') {
          navigate('rituale', { force: true });
          const breath = $('.breath-standalone') || $('#breath-start');
          if (breath) breath.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast('Atem');
          return;
        }
        navigate('buch', { force: true });
        toast('Praxis-Log im Magie-Buch');
      });
    });
  }

  function renderDailyCardPanel() {
    const result = $('#daily-card-result');
    const lock = $('#daily-card-lock');
    const btn = $('#draw-daily');
    if (!result && !btn) return;
    const card = Store.getDailyCard ? Store.getDailyCard() : null;
    if (card) {
      if (btn) { btn.disabled = true; btn.textContent = 'Tageskarte gehalten'; }
      if (lock) lock.hidden = false;
      if (result) {
        result.hidden = false;
        const full = resolveCardArt(card);
        result.innerHTML =
          (Cards.artImgHtml ? Cards.artImgHtml(full, 'fk-art fk-art-daily') : '') +
          '<div class="fk-num">Feld ' + full.n + ' · heute</div>' +
          '<div class="fk-name">' + escapeHtml(full.name || '') + '</div>' +
          '<div class="fk-theme">' + escapeHtml(full.theme || '') + '</div>' +
          (full.prompt ? '<div class="sp-prompt">' + escapeHtml(full.prompt) + '</div>' : '');
      }
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Tageskarte ziehen'; }
      if (lock) lock.hidden = true;
      if (result) { result.hidden = true; result.innerHTML = ''; }
    }
  }

  function drawDailyCard() {
    if (drawAnimating) return;
    const existing = Store.getDailyCard && Store.getDailyCard();
    if (existing) {
      toast('Tageskarte ist bis morgen gesiegelt.', 2800, 'warn');
      renderDailyCardPanel();
      return;
    }
    const card = Cards.drawOne();
    if (!card) return;
    Store.setDailyCard(card);
    if (!afterPersist(null, { checkBackup: false })) {
      toast('Tageskarte konnte nicht gespeichert werden.', 4000, 'error');
      return;
    }
    refreshState();
    Store.recordCardDraw({
      kind: 'daily',
      cards: [{ n: card.n, name: card.name, theme: card.theme }]
    });
    afterPersist(null, { checkBackup: false });
    refreshState();
    renderDailyCardPanel();
    renderDrawHistory();
    playDrawReveal([card], true);
    $('#drawn-result').textContent = 'Tageskarte: ' + card.name + ' — ' + card.theme +
      (card.prompt ? '\n' + card.prompt : '');
    toast('Tageskarte gezogen · bis morgen gesiegelt');
    Rituals.vibrate(28);
  }

  function applyMotionPref() {
    const reduced = !!(state.settings && state.settings.reducedMotion);
    document.body.classList.toggle('reduced-motion', reduced);
  }

  function isEveningHours(d) {
    const h = (d || new Date()).getHours();
    return h >= 19 || h < 6;
  }

  function applyMondnachtPref() {
    const manual = !!(state.settings && state.settings.mondnacht);
    const auto = !!(state.settings && state.settings.mondnachtAuto);
    const evening = auto && isEveningHours();
    const on = manual || evening;
    document.body.classList.toggle('mondnacht', on);
    document.body.classList.toggle('mondnacht-auto', !manual && evening);
    try {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', on ? '#07060c' : '#0c0814');
    } catch (_) { /* ignore */ }
  }

  let quietManual = false;
  let quietRitual = false;

  function syncQuietUi() {
    const on = quietManual || quietRitual;
    document.body.classList.toggle('quiet-mode', on);
    const exit = $('#quiet-exit-chip');
    if (exit) exit.hidden = !on;
    const hint = $('#rr-quiet-hint');
    if (hint) hint.hidden = !quietRitual;
  }

  function setQuietManual(on) {
    quietManual = !!on;
    syncQuietUi();
  }

  function setQuietRitual(on) {
    const allow = !(state.settings && state.settings.quietDuringRitual === false);
    quietRitual = !!(on && allow);
    syncQuietUi();
  }

  function applyStilleModus() {
    const on = !!(state.settings && state.settings.stilleModus);
    document.body.classList.toggle('stille-modus', on);
    const btn = $('#quiet-mode-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('active', on);
      btn.title = on ? 'Stille-Modus beenden' : 'Stille-Modus';
    }
    const exit = $('#stille-exit-chip');
    if (exit) exit.hidden = !on;
    const slot = $('#stille-ritual-slot');
    if (slot) slot.hidden = !on;
    if (on) {
      navigate('cockpit', { force: true, keepScroll: true });
      renderStilleRitualSlot();
    }
  }

  function setStilleModus(on) {
    Store.update(d => { d.settings.stilleModus = !!on; });
    refreshState();
    applyStilleModus();
    const setEl = $('#set-stille-modus');
    if (setEl) setEl.checked = !!on;
  }

  function toggleStilleModus() {
    const next = !(state.settings && state.settings.stilleModus);
    setStilleModus(next);
    toast(next ? 'Stille — nur Heute und ein Ritual' : 'Stille verlassen — alles wieder da');
    Rituals.vibrate(12);
  }

  function toggleQuietManual() {
    // Header ◉ is Stille-Modus (persisted); ritual chrome quiet stays automatic
    toggleStilleModus();
  }

  /* ——— v5.2 Threshold veil ——— */
  function setThreshold(mode) {
    // mode: null | 'open' | 'draw'
    const veil = $('#threshold-veil');
    document.body.classList.toggle('threshold-open', mode === 'open');
    document.body.classList.toggle('threshold-draw', mode === 'draw');
    if (!veil) return;
    veil.classList.toggle('on', !!mode);
    veil.classList.toggle('reveal-soft', mode === 'draw');
    veil.setAttribute('aria-hidden', mode ? 'false' : 'true');
  }

  function prefersReducedMotionNow() {
    if (state.settings && state.settings.reducedMotion) return true;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (_) { return false; }
  }

  /* ——— v5.4 Ritual Klang ——— */
  function ritualKlangEnabled() {
    if (!(state.settings && state.settings.ritualKlang)) return false;
    try {
      if (document.hidden) return false;
    } catch (_) { /* ignore */ }
    return true;
  }

  function playRitualKlang(kind) {
    if (!ritualKlangEnabled() || !Schumann) return;
    try {
      if (kind === 'open' && Schumann.playRitualOpenChime) Schumann.playRitualOpenChime();
      if (kind === 'close' && Schumann.playRitualCloseChime) Schumann.playRitualCloseChime();
    } catch (_) { /* ignore */ }
  }

  function renderStilleRitualSlot() {
    const title = $('#stille-ritual-title');
    const text = $('#stille-ritual-text');
    const sym = $('#stille-ritual-sym');
    const go = $('#stille-ritual-go');
    const path = currentPath();
    if (sym) sym.textContent = pathSymbol(path);
    // Prefer today's tip ritual if any
    let ritual = null;
    try {
      const tipBtn = $('#jetzt-start');
      if (tipBtn && tipBtn.dataset && tipBtn.dataset.ritual) {
        ritual = Rituals.getRitual(tipBtn.dataset.ritual) || null;
      }
      if (!ritual && Rituals.listOwnForPath) {
        const own = Rituals.listOwnForPath(state.path) || [];
        ritual = own[0] || null;
      }
      if (!ritual && Rituals.listForPath) {
        const all = Rituals.listForPath(state.path) || [];
        ritual = all[0] || null;
      }
    } catch (_) { /* ignore */ }
    if (title) title.textContent = (ritual && ritual.name) || 'Ein Ritual';
    if (text) {
      text.textContent = ritual
        ? ((ritual.mins ? '≈ ' + ritual.mins + ' Min · ' : '') + 'In der Stille genügt eines.')
        : 'Wähle am Altar ein Ritual — oder verlasse die Stille.';
    }
    if (go) {
      go.onclick = () => {
        if (ritual) openRitual(ritual);
        else { navigate('rituale', { force: true }); toast('Wähle ein Ritual'); }
      };
    }
  }

  function nextSabbatInfo(fromDate) {
    const start = fromDate ? new Date(fromDate.getTime()) : new Date();
    start.setHours(0, 0, 0, 0);
    const y = start.getFullYear();
    let best = null;
    for (let yy = y; yy <= y + 1; yy++) {
      for (const sab of SABBATS) {
        const dt = new Date(yy, sab.m - 1, sab.d, 12, 0, 0, 0);
        const day = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (day >= start) {
          const days = Math.round((day - start) / 86400000);
          const cand = { name: sab.name, ico: sab.ico, date: dt, days: days };
          if (!best || cand.days < best.days) best = cand;
        }
      }
    }
    return best;
  }

  function renderFestCountdown() {
    const chip = $('#fest-countdown-chip');
    if (!chip) return;
    const pathOnly = isCalendarPathOnly();
    let next = null;
    if (pathOnly) {
      const nf = Paths.nextFestival(new Date(), state.path, { pathOnly: true });
      if (nf && nf.date) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const day = new Date(nf.date.getFullYear(), nf.date.getMonth(), nf.date.getDate());
        const days = Math.round((day - start) / 86400000);
        const sab = SABBATS.find(s => s.name === nf.name);
        next = { name: nf.name, ico: sab ? sab.ico : '✦', date: nf.date, days: days, pathOnly: true };
      }
    } else {
      next = nextSabbatInfo(new Date());
    }
    if (!next || next.days > 14) {
      chip.hidden = true;
      chip.textContent = '';
      return;
    }
    const when = next.days <= 0 ? 'heute' : next.days === 1 ? 'morgen' : 'in ' + next.days + ' Tagen';
    chip.hidden = false;
    chip.innerHTML = '<span class="fest-ico" aria-hidden="true">' + (next.ico || '✦') + '</span> ' +
      '<strong>' + escapeHtml(next.name) + '</strong> · ' + when;
    chip.setAttribute('aria-label', (pathOnly ? 'Nächstes Pfad-Fest: ' : 'Nächster Sabbat: ') + next.name + ', ' + when);
  }

  function renderStarterCard() {
    const card = $('#starter-card');
    if (!card) return;
    const show = Store.shouldShowStarterFlow && Store.shouldShowStarterFlow();
    card.hidden = !show;
    // Keep "Jetzt" in sync when starter visibility changes
    if (!show && typeof renderJetztCard === 'function') renderJetztCard();
  }

  /* ——— Erste Praxis in 3 Minuten ——— */
  let starterStep = 0;
  let starterIntention = '';
  let starterBreathTimer = null;

  function clearStarterBreath() {
    if (starterBreathTimer) {
      clearTimeout(starterBreathTimer);
      starterBreathTimer = null;
    }
  }

  function openStarterFlow() {
    const ov = $('#starter-overlay');
    if (!ov) return;
    starterStep = 0;
    starterIntention = '';
    clearStarterBreath();
    ov.hidden = false;
    paintStarterStep();
    Rituals.vibrate(20);
  }

  function closeStarterFlow() {
    clearStarterBreath();
    const ov = $('#starter-overlay');
    if (ov) ov.hidden = true;
  }

  function paintStarterStep() {
    const body = $('#starter-flow-body');
    const next = $('#starter-flow-next');
    const back = $('#starter-flow-back');
    const lead = $('#starter-flow-lead');
    const title = $('#starter-flow-title');
    if (!body) return;
    $$('#starter-progress [data-sp]').forEach(dot => {
      const i = Number(dot.getAttribute('data-sp'));
      dot.classList.toggle('on', i === starterStep);
      dot.classList.toggle('done', i < starterStep);
    });
    if (back) back.hidden = starterStep === 0;
    if (starterStep === 0) {
      if (title) title.textContent = 'Intention';
      if (lead) lead.textContent = 'Eine Zeile reicht. Positiv, Gegenwart.';
      if (next) next.textContent = 'Weiter · Atem';
      body.innerHTML =
        '<p class="hint">Was willst du in diesen drei Minuten halten?</p>' +
        '<div class="form-row" style="margin-bottom:0.4rem">' +
        '<label class="sr-only" for="starter-intention">Intention</label>' +
        '<input id="starter-intention" maxlength="140" placeholder="z. B. Ich übe ruhige Klarheit" autocomplete="off" />' +
        '</div>' +
        '<p class="hint-sm">Wird als Intention des Tages gespeichert — lokal, nur hier.</p>';
      const inp = $('#starter-intention');
      if (inp) {
        inp.value = starterIntention;
        setTimeout(() => inp.focus(), 40);
      }
    } else if (starterStep === 1) {
      if (title) title.textContent = 'Atem';
      if (lead) lead.textContent = 'Vier ein, sechs aus — ca. eine Minute.';
      if (next) next.textContent = 'Weiter · Erdung';
      body.innerHTML =
        '<div class="breath-circle breath-standalone-circle" id="starter-breath" aria-live="polite" role="status">Bereit</div>' +
        '<p class="hint" style="text-align:center;margin-top:0.75rem">Folge dem Kreis. Du kannst jederzeit weitergehen.</p>' +
        '<p class="meta-line" id="starter-breath-meta" style="text-align:center">4 / 6</p>';
      const el = $('#starter-breath');
      function cycle(phase) {
        if (!el || ($('#starter-overlay') && $('#starter-overlay').hidden)) return;
        if (phase === 'in') {
          el.textContent = 'Einatmen';
          el.classList.remove('exhale');
          el.classList.add('inhale');
          el.style.transitionDuration = '4s';
          starterBreathTimer = setTimeout(() => cycle('out'), 4000);
        } else {
          el.textContent = 'Ausatmen';
          el.classList.remove('inhale');
          el.classList.add('exhale');
          el.style.transitionDuration = '6s';
          starterBreathTimer = setTimeout(() => cycle('in'), 6000);
        }
      }
      cycle('in');
    } else {
      if (title) title.textContent = 'Erdung';
      if (lead) lead.textContent = 'Kurz im Körper ankommen — dann Alltag.';
      if (next) next.textContent = 'Abschließen';
      body.innerHTML =
        '<p class="hint">Füße, Sitzknochen, Atem. Grenze und Ausgleich.</p>' +
        '<ul class="starter-ground-list">' +
        '<li>Spüre den Boden unter den Füßen.</li>' +
        '<li>Atme einmal bewusst aus — abgeben, was nicht gehört.</li>' +
        '<li>Sag innerlich: „Die Arbeit ist gehalten.“</li>' +
        '</ul>' +
        '<p class="hint-sm">Optional danach: volles Erdungs-Ritual in der Bibliothek.</p>' +
        '<div class="btn-row" style="justify-content:center;margin-top:0.75rem">' +
        '<button type="button" class="ghost" id="starter-open-erdung">Erdung öffnen</button></div>';
      const go = $('#starter-open-erdung');
      if (go) {
        go.addEventListener('click', () => {
          finishStarterFlow(true);
        });
      }
    }
  }

  function advanceStarterFlow() {
    if (starterStep === 0) {
      const inp = $('#starter-intention');
      starterIntention = inp ? String(inp.value || '').trim() : '';
      if (starterIntention) {
        Store.setDailyIntention({ text: starterIntention, link369: false });
        refreshState();
      }
      clearStarterBreath();
      starterStep = 1;
      paintStarterStep();
      return;
    }
    if (starterStep === 1) {
      clearStarterBreath();
      starterStep = 2;
      paintStarterStep();
      return;
    }
    finishStarterFlow(false);
  }

  function finishStarterFlow(openErdung) {
    clearStarterBreath();
    Store.recordPractice('starter');
    Store.addPracticeLog({
      kind: 'starter',
      label: 'Erste Praxis (3 Min)',
      detail: starterIntention ? ('Intention: ' + starterIntention.slice(0, 80)) : 'Intention · Atem · Erdung'
    });
    if (Store.markStarterDone) Store.markStarterDone();
    refreshState();
    closeStarterFlow();
    renderStarterCard();
    renderJetztCard();
    Rituals.vibrate([40, 30, 60]);
    if (openErdung) {
      const id = pathOwnRitualId() || 'erdung';
      const r = Rituals.getRitual(id) || Rituals.getRitual('erdung');
      if (r) {
        navigate('rituale', { force: true });
        openRitual(r);
      }
      return;
    }
    showClosingFlow({ name: 'Erste Praxis (3 Min)' }, { label: 'Erste Praxis (3 Min)' });
  }

  function syncHiddenLocControls() {
    const lat = $('#loc-lat'); const lon = $('#loc-lon');
    if (lat) lat.value = state.lat;
    if (lon) lon.value = state.lon;
    const hap = $('#haptics-toggle');
    if (hap) hap.checked = !(state.settings && state.settings.haptics === false);
    const aud = $('#schumann-audio');
    if (aud) aud.checked = !!(state.settings && state.settings.schumannAudio);
  }

  function resolveSectionId(id) {
    if (!id) return 'cockpit';
    if (BUCH_ALIASES[id]) return BUCH_ALIASES[id];
    if (SECTION_REDIRECTS[id]) return SECTION_REDIRECTS[id];
    return id;
  }

  function navigate(id, opts) {
    opts = opts || {};
    id = resolveSectionId(id);
    if (opts.buchMode === 'notiz' || opts.buchMode === 'eintrag') {
      buchMode = opts.buchMode;
    } else if (opts.fromAlias === 'notizen') {
      buchMode = 'notiz';
    } else if (opts.fromAlias === 'tagebuch') {
      buchMode = 'eintrag';
    }
    const same = activeSection === id && !opts.force;
    $$('.section-view').forEach(el => el.classList.toggle('active', el.id === 'sec-' + id));
    $$('.bottom-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.nav === id));
    activeSection = id;
    // Skip heavy full re-renders when already on the same section (easy win)
    if (!same) {
      if (id === 'cockpit') renderCockpit();
      if (id === 'kalender') renderCalendar();
      if (id === 'kosmos') renderKosmos();
      if (id === 'rituale') {
        renderRituale();
        if (!opts.keepRitualTab) {
          const target = opts.ritualTab || 'werkzeug';
          $$('[data-rtab]').forEach(b => {
            const on = b.dataset.rtab === target;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== target));
          if (target === 'werkzeug') {
            if (typeof renderPathWerkzeug === 'function') renderPathWerkzeug();
            if (typeof renderSigilGallery === 'function') renderSigilGallery();
          }
          if (target === 'guided') renderPathWeek();
        }
      }
      if (id === 'buch') renderBuch();
      if (id === 'korrespondenzen') renderKorrespondenzenSection();
    } else if (id === 'buch' && opts.force) {
      renderBuch();
    }
    try { history.replaceState(null, '', '#' + id); } catch (_) { /* ignore */ }
    if (!opts.keepScroll) {
      // After section show + possible re-render, wait one frame for layout
      try {
        requestAnimationFrame(function () { scrollSectionToContent(id); });
      } catch (_) {
        scrollSectionToContent(id);
      }
    }
  }

  /** Instant scroll when user/settings prefer reduced motion. */
  function navScrollBehavior() {
    if (state.settings && state.settings.reducedMotion) return 'auto';
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'auto';
    } catch (_) { /* ignore */ }
    return 'smooth';
  }

  function stickyHeaderOffset() {
    const h = document.querySelector('.app-header');
    if (!h) return 64;
    try {
      return Math.ceil(h.getBoundingClientRect().height) + 6;
    } catch (_) {
      return 64;
    }
  }

  /**
   * After bottom-nav navigate: bring first useful UI under the sticky header
   * (not just the huge section title block at scrollY=0).
   */
  function firstSectionContent(sec) {
    if (!sec) return null;
    const selectors = [
      '.cockpit-top',
      '.cal-path-toggle',
      '.cal-nav',
      '.kosmos-praxis',
      '.tabs[role="tablist"]',
      '.korrespondenz-full-card',
      '.export-pack',
      '.week-review-card',
      '.buch-mode-row',
      '.card',
      '[role="tablist"]'
    ];
    for (let i = 0; i < selectors.length; i++) {
      const el = sec.querySelector(selectors[i]);
      if (!el || el.hidden) continue;
      try {
        const r = el.getBoundingClientRect();
        if (r.width > 0 || r.height > 0) return el;
      } catch (_) { return el; }
    }
    return sec;
  }

  function scrollSectionToContent(sectionId) {
    const sec = document.getElementById('sec-' + sectionId);
    const target = firstSectionContent(sec);
    if (!target) {
      try { window.scrollTo(0, 0); } catch (_) { /* ignore */ }
      return;
    }
    const behavior = navScrollBehavior();
    const pad = stickyHeaderOffset();
    try {
      const top = target.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0) - pad;
      window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: behavior });
    } catch (_) {
      try {
        target.scrollIntoView({ behavior: behavior, block: 'start' });
      } catch (__) {
        try { window.scrollTo(0, 0); } catch (___) { /* ignore */ }
      }
    }
  }

  function currentPath() {
    return Paths.getPath(state.path || 'esoterik');
  }

  function pathSymbol(path) {
    const p = path || currentPath();
    return (p && p.symbol) || '✦';
  }

  function pathDisplayName(path) {
    const p = path || currentPath();
    if (!p) return 'Pfad';
    return pathSymbol(p) + ' ' + (p.name || 'Pfad');
  }

  /** Path as Haltung: CSS data-path + accent vars + cockpit line. */
  function applyPathTheme() {
    const path = currentPath();
    const id = (path && path.id) || 'esoterik';
    try {
      document.documentElement.setAttribute('data-path', id);
      document.body.setAttribute('data-path', id);
    } catch (_) { /* ignore */ }
    const root = document.documentElement;
    if (path && path.accent) {
      root.style.setProperty('--accent', path.accent);
      if (path.accentDeep) root.style.setProperty('--accent-deep', path.accentDeep);
      if (path.accentSoft) root.style.setProperty('--accent-soft', path.accentSoft);
    }
    const sym = pathSymbol(path);
    const h = $('#path-haltung');
    if (h) {
      const text = (path && (path.haltung || path.saying)) || 'Stille Praxis — Daten bleiben bei dir.';
      h.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(sym) + '</span> ' +
        '<span class="path-haltung-text">' + escapeHtml(text) + '</span>';
    }
    const artOrb = $('#path-art-orb');
    if (artOrb) artOrb.textContent = sym || '✦';
    const chip = $('#path-chip');
    if (chip && path) {
      chip.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(pathSymbol(path)) + '</span> ' +
        '<span class="path-chip-name">' + escapeHtml(path.name) + '</span>';
      chip.setAttribute('aria-label', 'Pfad: ' + path.name);
    }
  }


  function setSitzungPhase(phase, extra) {
    extra = extra || {};
    sitzung.phase = phase || 'idle';
    if (extra.ritualId != null) sitzung.ritualId = extra.ritualId;
    if (extra.ritualName != null) sitzung.ritualName = extra.ritualName;
    if (extra.savedToBuch != null) sitzung.savedToBuch = !!extra.savedToBuch;
    if (phase && phase !== 'idle') sitzung.visible = true;
    renderSitzungBar();
    if (phase === 'buch' && !sitzung._recommendShown) {
      sitzung._recommendShown = true;
      setTimeout(() => {
        const card = $('#empfehlen-card');
        if (card) {
          try { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (_) {}
          toast('Sitzung rund — wenn es stimmt: weiterempfehlen', 3200);
        }
      }, 1200);
    }
  }

  function renderSitzungBar() {
    const bar = $('#sitzung-bar');
    if (!bar) return;
    const order = ['heute', 'ritual', 'schliessen', 'buch'];
    const phase = sitzung.phase;
    const show = sitzung.visible && phase && phase !== 'idle';
    bar.hidden = !show;
    if (!show) return;
    $$('#sitzung-bar [data-sitzung]').forEach(el => {
      const p = el.dataset.sitzung;
      const idx = order.indexOf(p);
      const cur = order.indexOf(phase);
      el.classList.toggle('active', p === phase);
      el.classList.toggle('done', idx >= 0 && cur >= 0 && idx < cur);
    });
    const lead = $('#sitzung-lead');
    const cta = $('#sitzung-cta');
    const copy = {
      heute: {
        lead: 'Heute gewählt — öffne den Kreis ohne Menü-Hopping.',
        cta: '② Kreis öffnen',
        action: 'ritual'
      },
      ritual: {
        lead: (sitzung.ritualName ? ('Ritual «' + sitzung.ritualName + '» läuft.') : 'Ritual läuft.') + ' Danach kommt das Schließen.',
        cta: 'Zur Schwelle',
        action: 'open-ritual'
      },
      schliessen: {
        lead: 'Schwelle: Danken → Atmen → Erden → Siegeln → optional Buch + Foto.',
        cta: 'Weiter im Abschluss',
        action: 'noop'
      },
      buch: {
        lead: sitzung.savedToBuch
          ? 'Eintrag liegt im Magie-Buch — Sitzung A–Z geschlossen.'
          : 'Optional: Satz oder Foto ins Magie-Buch — Sitzung abrunden.',
        cta: sitzung.savedToBuch ? '📖 Magie-Buch öffnen' : '📖 Ins Magie-Buch',
        action: 'buch'
      }
    };
    const c = copy[phase] || copy.heute;
    if (lead) lead.textContent = c.lead;
    if (cta) {
      cta.textContent = c.cta;
      cta.dataset.sitzungAction = c.action;
      cta.hidden = c.action === 'noop';
    }
  }

  function sitzungCtaAction() {
    const cta = $('#sitzung-cta');
    const action = (cta && cta.dataset.sitzungAction) || '';
    if (action === 'ritual' || action === 'open-ritual') {
      const id = sitzung.ritualId || ($('#jetzt-start') && $('#jetzt-start').dataset.ritual);
      const r = id ? Rituals.getRitual(id) : null;
      if (r) {
        setSitzungPhase('ritual', { ritualId: r.id, ritualName: r.name });
        openRitual(r);
      } else {
        navigate('rituale', { force: true });
        toast('Ritual wählen');
      }
      return;
    }
    if (action === 'buch') {
      navigate('buch', { force: true, buchMode: 'eintrag' });
      setSitzungPhase('buch');
    }
  }

  function renderJetztCard() {
    const card = $('#jetzt-card');
    if (!card) return;
    const path = currentPath();
    const showStarter = Store.shouldShowStarterFlow && Store.shouldShowStarterFlow();
    const starterCard = $('#starter-card');
    const jetztStart = $('#jetzt-start');
    const jetztStarter = $('#jetzt-starter');
    const title = $('#jetzt-title');
    const chip = $('#jetzt-chip');
    const kindEl = $('#jetzt-kind');
    const lead = $('#jetzt-lead');
    const meta = $('#jetzt-meta');

    // Prefer ONE invitation above the fold: starter OR seeded daily tip
    if (showStarter) {
      card.hidden = true;
      if (starterCard) starterCard.hidden = false;
      renderPathWeek();
      renderKorrespondenzen();
      renderMondfenster();
      renderRitualJournal();
      return;
    }
    if (starterCard) starterCard.hidden = true;
    card.hidden = false;

    const tip = (Paths.getDailyTip && Paths.getDailyTip(state.path, new Date())) || null;
    function firstOwnRitualId() {
      const own = (Rituals.listOwnForPath && Rituals.listOwnForPath(state.path)) || [];
      const rec = path && path.recommendedRitual;
      if (rec && Rituals.isOwnForPath && Rituals.getRitual(rec) && Rituals.isOwnForPath(Rituals.getRitual(rec), state.path)) return rec;
      return own.length ? own[0].id : (rec || null);
    }
    let ritualId = (tip && tip.ritualId) || firstOwnRitualId();
    let ritual = ritualId ? Rituals.getRitual(ritualId) : null;
    // Heute: never promote shared Grundlagen (erdung etc.) as primary
    if (!ritual || (Rituals.isShared && Rituals.isShared(ritual)) || !(Rituals.isOwnForPath && Rituals.isOwnForPath(ritual, state.path))) {
      ritualId = firstOwnRitualId();
      ritual = ritualId ? Rituals.getRitual(ritualId) : null;
    }
    if (title) title.textContent = 'Heute';
    if (chip) {
      chip.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(pathSymbol(path)) + '</span> ' +
        escapeHtml((path && path.name) || 'Praxis');
    }
    if (kindEl) {
      kindEl.textContent = tip && tip.kind === 'haltung' ? 'Haltung' : 'Ritual';
    }
    if (lead) {
      lead.textContent = (tip && tip.text) || (path && path.practiceHint) || 'Eine ruhige Praxis reicht.';
    }
    if (meta) {
      const tipTitle = tip && tip.title ? tip.title : (ritual ? ritual.name : 'Praxis');
      meta.textContent = tipTitle +
        (ritual ? (' · ' + ((Rituals.durLabel && Rituals.durLabel(ritual.mins)) || ('≈ ' + ritual.mins + ' Min'))) : '') +
        ' · stabil für heute';
    }
    if (jetztStart) {
      jetztStart.textContent = (tip && tip.cta) || (ritual ? ('Kreis öffnen · ' + ritual.name) : 'Kreis öffnen');
      jetztStart.dataset.ritual = ritualId;
    }
    if (jetztStarter) jetztStarter.hidden = true;
    renderPathWeek();
    renderKorrespondenzen();
    renderMondfenster();
    renderRitualJournal();
    updateOfflineHonesty();
    if (state.settings && state.settings.stilleModus) renderStilleRitualSlot();
  }

  function correspondenceRows(c) {
    const rows = [
      ['🌿 Kräuter', (c.herbs || []).join(' · ')],
      ['💎 Steine', (c.stones || []).join(' · ')],
      ['🎨 Farben', (c.colors || []).join(' · ')]
    ];
    if (c.elements && c.elements.length) {
      rows.push(['🜃 Elemente', (c.elements || []).join(' · ')]);
    }
    return rows;
  }

  /** Short cockpit peek → full section */
  function renderKorrespondenzen() {
    const peek = $('#korrespondenz-peek-text');
    const chip = $('#korrespondenz-chip');
    if (!Paths.getCorrespondences) return;
    const path = currentPath();
    const c = Paths.getCorrespondences(state.path);
    const heute = Paths.getHeuteResonanz
      ? Paths.getHeuteResonanz(state.path, new Date())
      : null;
    if (chip) chip.textContent = 'heute passt';
    if (peek) {
      peek.textContent = (heute && heute.line)
        || (c.note || 'Hauspraxis-Symbolik — kein medizinischer Rat.');
    }
    renderCraftPeek();
    // Legacy list id (if still present)
    const list = $('#korrespondenz-list');
    const note = $('#korrespondenz-note');
    if (list) {
      if (note) note.textContent = c.note || 'Hauspraxis — kein medizinischer Rat.';
      list.innerHTML = correspondenceRows(c).map(function (r) {
        return '<li class="resonanz-motif"><strong>' + escapeHtml(r[0]) + '</strong><span>' + escapeHtml(r[1]) + '</span></li>';
      }).join('');
    }
  }

  function renderCraftPeek() {
    const text = $('#craft-peek-text');
    const chip = $('#craft-peek-chip');
    if (!Paths.getTodayCraft) return;
    const craft = Paths.getTodayCraft(state.path, new Date());
    if (!craft) return;
    if (chip) chip.textContent = craft.kind || 'Werk';
    if (text) text.textContent = (craft.kind ? craft.kind + ': ' : '') + (craft.text || '');
  }

  function renderKorrespondenzenSection() {
    refreshState();
    if (!Paths.getCorrespondences) return;
    const path = currentPath();
    const c = Paths.getCorrespondences(state.path);
    const titlePath = $('#korresp-path-name');
    const chip = $('#korresp-chip');
    const note = $('#korresp-note');
    const list = $('#korresp-list');
    const lead = $('#korresp-lead');
    const heuteEl = $('#korresp-heute-passt');
    const heute = Paths.getHeuteResonanz
      ? Paths.getHeuteResonanz(state.path, new Date())
      : null;
    if (titlePath) titlePath.textContent = (path && path.name) || 'Pfad';
    if (chip) chip.textContent = (path && path.name) || 'Pfad';
    if (lead) {
      lead.textContent = 'Heute passt … — kurze Einladung mit Warum für ' +
        ((path && path.name) || 'diesen Pfad') + '. Darunter die Symbolik. Kein medizinischer Rat.';
    }
    if (heuteEl) heuteEl.textContent = (heute && heute.line) || 'Heute passt eine stille Haltung — Grenze und Gabe.';
    if (note) note.textContent = c.note || 'Hauspraxis — kein medizinischer Rat.';
    if (list) {
      list.innerHTML = correspondenceRows(c).map(function (r) {
        return '<li class="resonanz-motif"><strong>' + escapeHtml(r[0]) + '</strong><span>' + escapeHtml(r[1]) + '</span></li>';
      }).join('');
    }
    const craftList = $('#craft-works-list');
    const craftLead = $('#craft-works-lead');
    if (craftList && Paths.getCraftWorks) {
      const works = Paths.getCraftWorks(state.path);
      if (craftLead) {
        craftLead.textContent = 'Pfadbezogene Mini-Arbeiten für ' +
          ((path && path.name) || 'diesen Pfad') + ' — ethisch, ohne Spektakel.';
      }
      craftList.innerHTML = works.map(function (w) {
        return '<li class="resonanz-motif craft-motif"><strong>' + escapeHtml(w.kind) + '</strong><span>' + escapeHtml(w.text) + '</span></li>';
      }).join('');
    }
    renderKorrespondenzen();
  }

  function renderMondfenster(moon) {
    const lead = $('#mondfenster-lead');
    const chip = $('#mondfenster-chip');
    const meta = $('#mondfenster-meta');
    if (!lead || !Paths.getMondFenster) return;
    const m = moon || (Astro.moonPhase && Astro.moonPhase(new Date())) || {};
    const fen = Paths.getMondFenster(state.path, m.name);
    if (chip) chip.textContent = fen.label || m.name || 'Mond';
    lead.textContent = fen.text || 'Gut für ruhige Praxis mit Maß.';
    const orb = $('#mondfenster-emoji');
    if (orb) orb.textContent = m.emoji || '🌕';
    if (meta) {
      meta.textContent = (m.emoji || '☾') + ' ' + (m.name || '—') +
        ' · Arbeitsfenster · pfadbezogen';
    }
  }

  function renderRitualJournal() {
    const host = $('#ritual-journal-list');
    const empty = $('#ritual-journal-empty');
    if (!host || !Store.getRitualJournal) return;
    const items = Store.getRitualJournal(12);
    if (!items.length) {
      host.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    host.innerHTML = items.map(function (it) {
      const when = it.at ? new Date(it.at).toLocaleString('de-CH', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      }) : '';
      return '<div class="ritual-journal-item" data-rj-id="' + escapeHtml(it.id) + '">' +
        '<div class="rj-top"><strong>' + escapeHtml(it.ritualName || 'Praxis') + '</strong>' +
        '<span class="rj-when">' + escapeHtml(when) + '</span></div>' +
        '<p class="rj-text">' + escapeHtml(it.text || '') + '</p>' +
        (it.photoId ? '<button type="button" class="ghost tiny" data-rj-photo="' + escapeHtml(it.photoId) + '">📷 Foto</button>' : '') +
        '<button type="button" class="ghost tiny rj-del" data-rj-del="' + escapeHtml(it.id) + '">Löschen</button>' +
        '</div>';
    }).join('');
    host.querySelectorAll('[data-rj-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-rj-del');
        if (id && Store.removeRitualJournalEntry) {
          Store.removeRitualJournalEntry(id);
          renderRitualJournal();
          toast('Journal-Eintrag entfernt');
        }
      });
    });
    host.querySelectorAll('[data-rj-photo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPhotoLightbox(btn.getAttribute('data-rj-photo'));
      });
    });
  }

  function updateOfflineHonesty() {
    const el = $('#offline-honesty');
    if (!el) return;
    const online = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
    const swOk = !!(navigator.serviceWorker && navigator.serviceWorker.controller);
    if (online) {
      el.textContent = swOk
        ? 'Online · Offline-Shell aktiv — Praxis, Buch und Rituale bleiben lokal auch ohne Netz.'
        : 'Online · lokal auf diesem Gerät · einmal laden, dann offline Praxis (PWA/Home-Bildschirm).';
      el.dataset.state = 'online';
    } else {
      el.textContent = swOk
        ? 'Offline · Shell aus dem Cache. Rituale, Magie-Buch und Fokus laufen lokal. Station Tomsk pausiert.'
        : 'Offline · ohne Cache ggf. eingeschränkt. Installiere die App / lade einmal online neu.';
      el.dataset.state = 'offline';
    }
    const chip = $('#offline-chip');
    if (chip) {
      chip.hidden = online;
      chip.textContent = '📴 Offline · lokale Praxis';
    }
  }

  function updateClock() {
    const el = $('#live-clock');
    if (!el) return;
    const n = new Date();
    el.textContent = n.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
  }


  /* ——— Mond-Arbeit (Neu-/Vollmond) ——— */
  function isPeakMoon(moon) {
    if (!moon || !moon.name) return null;
    if (moon.name === 'Neumond') return 'new';
    if (moon.name === 'Vollmond') return 'full';
    // Soft window near peak by phase fraction
    if (moon.phase != null) {
      if (moon.phase < 0.03 || moon.phase > 0.97) return 'new';
      if (moon.phase >= 0.47 && moon.phase < 0.53) return 'full';
    }
    return null;
  }

  function mondArbeitCopy(kind) {
    const ownId = pathOwnRitualId();
    const ownR = ownId ? Rituals.getRitual(ownId) : null;
    const ownName = ownR ? ownR.name : 'Pfad-Ritual';
    if (kind === 'new') {
      return {
        title: 'Mond-Arbeit · Neumond',
        phase: 'Neumond',
        lead: 'Stiller Keim. Absicht setzen, ohne zu erzwingen — Grenze und Ausgleich.',
        practice: 'Vorschlag: ' + ownName + ' (Pfad) · ethischer Satz · dann loslassen.',
        ritualId: ownId
      };
    }
    return {
      title: 'Mond-Arbeit · Vollmond',
      phase: 'Vollmond',
      lead: 'Licht und Klarheit. Danken, lösen, was nicht dient — ohne Schaden an Personen.',
      practice: 'Vorschlag: ' + ownName + ' (Pfad) · Wasser trinken · einen Satz ins Tagebuch.',
      ritualId: ownId
    };
  }

  function renderMondArbeit(moon) {
    const card = $('#mond-arbeit');
    if (!card) return;
    const kind = isPeakMoon(moon);
    if (!kind) {
      card.hidden = true;
      card.classList.remove('show', 'neu', 'voll');
      return;
    }
    const copy = mondArbeitCopy(kind);
    mondArbeitRitualId = copy.ritualId;
    card.hidden = false;
    card.classList.add('show');
    card.classList.toggle('neu', kind === 'new');
    card.classList.toggle('voll', kind === 'full');
    const t = $('#mond-arbeit-title');
    const p = $('#mond-arbeit-phase');
    const lead = $('#mond-arbeit-lead');
    const pr = $('#mond-arbeit-practice');
    if (t) t.textContent = copy.title;
    if (p) p.textContent = copy.phase;
    if (lead) lead.textContent = copy.lead;
    if (pr) pr.textContent = copy.practice;
  }

  /* ——— Planetenstunde-Wecker ——— */
  function hourAlertEnabled() {
    return !!(state.settings && state.settings.hourAlert);
  }

  function checkPlanetaryHourAlert(forceSilent) {
    const hour = Astro.planetaryHour(new Date(), state.lat, state.lon);
    if (!hour || !hour.planet) return;
    const key = hour.planet + '|' + (hour.isDay ? 'd' : 'n') + '|' + hour.hourIndex;
    if (!hourAlertBootstrapped) {
      lastHourPlanetKey = key;
      hourAlertBootstrapped = true;
      return;
    }
    if (key === lastHourPlanetKey) return;
    lastHourPlanetKey = key;
    if (forceSilent || !hourAlertEnabled()) return;
    const label = hour.planet + ' · ' + (hour.isDay ? 'Tag' : 'Nacht') + ' Std ' + hour.hourIndex;
    toast('Planetenstunde: ' + label, 4200);
    Rituals.vibrate([18, 40, 18]);
  }

  /* ——— Globale Suche ——— */
  function collectSearchIndex() {
    const items = [];
    const path = currentPath();
    const guided = Rituals.listForPath(state.path, { recommendedRitual: (currentPath() && currentPath().recommendedRitual) }) || [];
    guided.forEach(r => {
      items.push({
        kind: 'ritual',
        id: r.id,
        title: r.name,
        hay: (r.name + ' ' + (r.steps || []).map(s => (s.title || '') + ' ' + (s.text || '')).join(' ')).toLowerCase(),
        meta: 'Ritual · ' + ((Rituals.durLabel && Rituals.durLabel(r.mins)) || ('≈ ' + r.mins + ' Min')),
        action: 'ritual:' + r.id
      });
    });
    (state.customRituals || []).forEach(r => {
      items.push({
        kind: 'ritual',
        id: r.id,
        title: r.name,
        hay: (r.name + ' custom').toLowerCase(),
        meta: 'Eigenes Ritual',
        action: 'custom:' + r.id
      });
    });
    if (Cards && Cards.FELDKARTEN) {
      Cards.FELDKARTEN.forEach(c => {
        items.push({
          kind: 'card',
          id: String(c.n),
          title: c.name,
          hay: (c.name + ' ' + (c.theme || '') + ' ' + (c.prompt || '')).toLowerCase(),
          meta: 'Feldkarte · ' + (c.theme || ''),
          action: 'card:' + c.n
        });
      });
    }
    (state.diary || []).forEach(e => {
      items.push({
        kind: 'diary',
        id: e.id,
        title: e.title || 'Ohne Titel',
        hay: ((e.title || '') + ' ' + (e.body || '') + ' ' + ((e.tags || []).join(' '))).toLowerCase(),
        meta: 'Eintrag' + (e.ritualName ? ' · Ritual' : '') + (e.created ? ' · ' + new Date(e.created).toLocaleDateString('de-CH') : ''),
        action: 'diary:' + e.id
      });
    });
    (state.notes || []).forEach(n => {
      items.push({
        kind: 'note',
        id: n.id,
        title: (n.text || 'Notiz').split('\n')[0].slice(0, 60) || 'Notiz',
        hay: ((n.text || '') + ' ' + (n.tag || '')).toLowerCase(),
        meta: 'Notiz' + (n.updated ? ' · ' + new Date(n.updated).toLocaleDateString('de-CH') : ''),
        action: 'note:' + n.id
      });
    });
    if (Paths.getCorrespondences) {
      const c = Paths.getCorrespondences(state.path);
      const path = currentPath();
      const blob = [
        'resonanzen resonanz korrespondenzen korrespondenz entsprechungen kräuter steine farben elemente hauspraxis',
        (c.herbs || []).join(' '),
        (c.stones || []).join(' '),
        (c.colors || []).join(' '),
        (c.elements || []).join(' '),
        c.note || ''
      ].join(' ').toLowerCase();
      items.push({
        kind: 'section',
        id: 'korrespondenzen',
        title: RESONANZ_LABEL.name + ' · ' + ((path && path.name) || 'Pfad'),
        hay: blob,
        meta: 'Hauspraxis-Symbolik',
        action: 'section:korrespondenzen'
      });
    }
    return items;
  }

  function runGlobalSearch(query, resultsEl, emptyEl) {
    const q = String(query || '').trim().toLowerCase();
    if (!resultsEl) return;
    if (q.length < 2) {
      resultsEl.innerHTML = '';
      resultsEl.hidden = true;
      if (emptyEl) {
        emptyEl.hidden = false;
        emptyEl.textContent = 'Tippe einen Begriff — mind. 2 Zeichen.';
      }
      return;
    }
    const hits = collectSearchIndex().filter(it => it.hay.indexOf(q) >= 0).slice(0, 24);
    if (emptyEl) {
      emptyEl.hidden = hits.length > 0;
      emptyEl.textContent = hits.length ? '' : 'Nichts gefunden für „' + query.trim() + '“.';
    }
    if (!hits.length) {
      resultsEl.innerHTML = '';
      resultsEl.hidden = true;
      return;
    }
    resultsEl.hidden = false;
    resultsEl.innerHTML = hits.map(h =>
      '<button type="button" class="search-hit" role="option" data-search-action="' + escapeHtml(h.action) + '">' +
      '<span class="search-hit-title">' + escapeHtml(h.title) + '</span>' +
      '<span class="search-hit-meta">' + escapeHtml(h.meta) + '</span></button>'
    ).join('');
    $$('#' + resultsEl.id + ' [data-search-action]').forEach(btn => {
      btn.addEventListener('click', () => applySearchAction(btn.dataset.searchAction));
    });
  }

  function applySearchAction(action) {
    if (!action) return;
    closeGlobalSearch();
    closeSettings();
    const [kind, id] = action.split(':');
    if (kind === 'ritual') {
      navigate('rituale', { force: true });
      const r = Rituals.getRitual(id);
      if (r) openRitual(r);
      else toast('Ritual nicht gefunden', 2400, 'warn');
      return;
    }
    if (kind === 'custom') {
      navigate('rituale', { force: true });
      $$('[data-rtab]').forEach(b => {
        const on = b.dataset.rtab === 'custom';
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== 'custom'));
      const r = (state.customRituals || []).find(x => x.id === id);
      if (r) openRitual(r);
      else toast('Eigenes Ritual nicht gefunden', 2400, 'warn');
      return;
    }
    if (kind === 'card') {
      openRitualTab('karten', { scroll: 'werkzeug-karten' });
      const card = (Cards.FELDKARTEN || []).find(c => String(c.n) === String(id));
      if (card) {
        toast(card.name + ' · ' + (card.theme || 'Feldkarte'), 3600);
        const gridCard = document.querySelector('.feldkarte[data-card="' + card.n + '"]');
        if (gridCard) {
          gridCard.classList.add('search-flash');
          setTimeout(() => gridCard.classList.remove('search-flash'), 1600);
          try { gridCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
        }
      }
      return;
    }
    if (kind === 'diary') {
      navigate('buch', { force: true, buchMode: 'eintrag' });
      const el = document.querySelector('#diary-list [data-id="' + id + '"]');
      if (el) {
        el.classList.add('search-flash');
        setTimeout(() => el.classList.remove('search-flash'), 1600);
        try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
      }
      toast('Magie-Buch · Eintrag');
      return;
    }
    if (kind === 'note') {
      navigate('buch', { force: true, buchMode: 'notiz' });
      const el = document.querySelector('#diary-list [data-note-id="' + id + '"]');
      if (el) {
        el.classList.add('search-flash');
        setTimeout(() => el.classList.remove('search-flash'), 1600);
        try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
      }
      toast('Magie-Buch · Notiz');
      return;
    }
    if (kind === 'section') {
      navigate(id || 'cockpit', { force: true });
    }
  }

  function openGlobalSearch() {
    const modal = $('#global-search-modal');
    if (!modal) return;
    modal.classList.add('open');
    const inp = $('#global-search-input-modal');
    if (inp) {
      setTimeout(() => inp.focus(), 30);
      runGlobalSearch(inp.value, $('#global-search-results-modal'), $('#global-search-empty'));
    }
  }

  function closeGlobalSearch() {
    const modal = $('#global-search-modal');
    if (modal) modal.classList.remove('open');
  }

  /* ——— Notiz → Eintrag (gleiches Magie-Buch) ——— */
  function noteToDiary(noteId) {
    refreshState();
    const note = (state.notes || []).find(n => n.id === noteId);
    if (!note) { toast('Notiz nicht gefunden', 2400, 'warn'); return; }
    const text = String(note.text || '').trim();
    if (!text) { toast('Notiz ist leer', 2400, 'warn'); return; }
    const check = Sigil.isHarmful(text);
    if (!check.ok) { toast(check.reason); return; }
    const firstLine = text.split('\n')[0].trim().slice(0, 80);
    const title = firstLine.length > 2 ? firstLine : 'Aus Notiz';
    const body = text;
    const tags = note.tag ? [String(note.tag).slice(0, 40)] : ['notiz'];
    const moon = diaryMoonMeta(new Date());
    Store.update(d => {
      d.diary.push({
        id: Store.uid(),
        title: title,
        body: body,
        tags: tags,
        mood: null,
        created: new Date().toISOString(),
        fromNoteId: noteId,
        photoId: null,
        pathId: state.path || null,
        ritualId: null,
        ritualName: null,
        moonPhase: moon.moonPhase,
        moonBucket: moon.moonBucket,
        moonEmoji: moon.moonEmoji
      });
      d.notes = (d.notes || []).filter(x => x.id !== noteId);
    });
    if (!afterPersist('Notiz → Eintrag')) return;
    Rituals.vibrate(22);
    refreshState();
    buchMode = 'eintrag';
    navigate('buch', { force: true, buchMode: 'eintrag' });
    toast('Als Eintrag im Magie-Buch');
  }

  /* ——— Ritual-Vorlagen ——— */
  function parseCustomStepsFromForm() {
    const raw = ($('#custom-ritual-steps') && $('#custom-ritual-steps').value.trim()) || '';
    if (!raw) return [];
    return raw.split('\n').filter(Boolean).map((line, i) => {
      const parts = line.split('|');
      return {
        title: (parts[0] || ('Schritt ' + (i + 1))).trim().slice(0, 80),
        text: (parts[1] || parts[0] || '').trim().slice(0, 400),
        sec: Number(parts[2]) || 60
      };
    });
  }

  function stepsToFormText(steps) {
    return (steps || []).map(s =>
      (s.title || 'Schritt') + '|' + (s.text || '') + '|' + (s.sec || 60)
    ).join('\n');
  }

  function renderRitualTemplates() {
    const listEl = $('#ritual-templates-list');
    const empty = $('#ritual-templates-empty');
    if (!listEl) return;
    const tpls = Store.getRitualTemplates ? Store.getRitualTemplates() : [];
    if (!tpls.length) {
      listEl.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    listEl.innerHTML = tpls.map(t =>
      '<div class="ritual-template-item">' +
      '<div class="rt-info"><strong>' + escapeHtml(t.name) + '</strong>' +
      '<span class="meta-line">' + (t.steps || []).length + ' Schritte' +
      (t.mins != null ? ' · ≈ ' + t.mins + ' Min' : '') + '</span></div>' +
      '<div class="btn-row tight">' +
      '<button type="button" class="ghost tiny" data-tpl-load="' + escapeHtml(t.id) + '">Laden</button>' +
      '<button type="button" class="ghost tiny" data-tpl-del="' + escapeHtml(t.id) + '">Löschen</button>' +
      '</div></div>'
    ).join('');
    $$('[data-tpl-load]').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = (Store.getRitualTemplates() || []).find(x => x.id === btn.dataset.tplLoad);
        if (!t) return;
        if ($('#custom-ritual-name')) $('#custom-ritual-name').value = t.name;
        if ($('#custom-ritual-steps')) $('#custom-ritual-steps').value = stepsToFormText(t.steps);
        toast('Vorlage geladen — bei Bedarf speichern');
        Rituals.vibrate(12);
      });
    });
    $$('[data-tpl-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.removeRitualTemplate(btn.dataset.tplDel);
        refreshState();
        renderRitualTemplates();
        toast('Vorlage entfernt');
      });
    });
  }

  function saveCurrentAsTemplate() {
    const name = ($('#custom-ritual-name') && $('#custom-ritual-name').value.trim()) || '';
    const steps = parseCustomStepsFromForm();
    if (!name || !steps.length) {
      toast('Name und Schritte nötig für Vorlage', 3200, 'warn');
      return;
    }
    const check = Sigil.isHarmful(name + ' ' + steps.map(s => s.text).join(' '));
    if (!check.ok) { toast(check.reason); return; }
    const existing = Store.getRitualTemplates() || [];
    if (existing.length >= 3) {
      toast('Max. 3 Vorlagen — bitte eine löschen', 3600, 'warn');
      return;
    }
    Store.saveRitualTemplate({ name: name, steps: steps });
    if (!afterPersist('Vorlage gespeichert', { checkBackup: false })) return;
    refreshState();
    renderRitualTemplates();
    Rituals.vibrate(18);
  }

  /* ——— Cockpit ——— */
  function renderCockpit() {
    const now = new Date();
    const moon = Astro.moonPhase(now);
    const hour = Astro.planetaryHour(now, state.lat, state.lon);
    const unrest = Astro.computeUnrest(now, checkInVal);
    const voidW = Astro.moonVoidWarning(now);
    const sunSign = Astro.tropicalSunSign(now);
    const moonInfo = Astro.moonSignInfo(now);
    const nextNew = Astro.nextMoonEvent(now, 0);
    const nextFull = Astro.nextMoonEvent(now, 0.5);
    const recs = Astro.recommendations(now, state.lat, state.lon, unrest);
    const path = currentPath();

    $('#dash-moon-val').innerHTML =
      '<span class="moon-emoji">' + moon.emoji + '</span>' + escapeHtml(moon.name);
    // Arbeitsfenster: «gut für …», kein %-Dashboard
    let moonGut = '';
    if (Paths.getMondFenster) {
      const fen = Paths.getMondFenster(state.path, moon.name);
      moonGut = fen && fen.text ? fen.text : '';
    }
    $('#dash-moon-meta').textContent = moonGut || ('Gut für ruhige Praxis · ' + (moonInfo.sign || ''));
    const hourInv = softHourInvite(hour);
    $('#dash-hour-val').textContent = hourInv.planet;
    $('#dash-hour-meta').textContent = 'Gut für: ' + hourInv.gut.replace(/^Gut für:\s*/i, '');
    const uInv = softUnrestInvite(unrest);
    $('#dash-unrest-val').textContent = uInv.word;
    $('#dash-unrest-val').style.color = unrest.color || '';
    const uMeta = $('#dash-unrest-meta');
    if (uMeta) uMeta.textContent = uInv.meta;
    const bar = $('#dash-unrest-bar');
    if (bar) {
      // Fortschrittsbalken bewusst still — kein Score-Feeling
      bar.style.width = '0%';
      bar.style.opacity = '0';
    }

    const voc = $('#voc-banner');
    if (voidW.active) {
      voc.classList.add('show');
      $('#voc-text').textContent = voidW.message;
    } else {
      voc.classList.remove('show');
    }

    const recEl = $('#dash-recs');
    recEl.innerHTML = recs.map(r => '<li>' + escapeHtml(r) + '</li>').join('');
    if (path.disclaimer) {
      recEl.innerHTML += '<li>' + escapeHtml(path.disclaimer) + '</li>';
    }
    recEl.innerHTML += '<li>' + escapeHtml(Paths.randomSaying(state.path)) + '</li>';

    $('#dash-next-moon').textContent =
      'Nächster Neumond ≈ ' + (nextNew ? fmtDate(nextNew) + ' ' + fmtTime(nextNew) : '—') +
      ' · Vollmond ≈ ' + (nextFull ? fmtDate(nextFull) + ' ' + fmtTime(nextFull) : '—');

    applyPathTheme();
    $('#cockpit-greeting').textContent = path.greeting || 'Hier übst du — Praxis vor Spektakel.';
    renderJetztCard();
    renderPathWeek();
    renderPathWerkzeug();
    const latEl = $('#loc-lat'); const lonEl = $('#loc-lon');
    if (latEl && document.activeElement !== latEl) latEl.value = state.lat;
    if (lonEl && document.activeElement !== lonEl) lonEl.value = state.lon;

    if (checkInVal != null) {
      $$('[data-checkin]').forEach(b => b.classList.toggle('picked', Number(b.dataset.checkin) === checkInVal));
    }

    render369();
    renderTagesbriefing(now, moon, hour, unrest, path);
    renderPathTeachingTip();
    renderInvitePreview();
    renderDailyIntention();
    renderBriefingPinsPanel();
    renderQuickPraxis();
    renderDayBanner();
    renderMondArbeit(moon);
    renderMondfenster(moon);
    renderKorrespondenzen();
    renderFestCountdown();
    renderStarterCard();
    checkPlanetaryHourAlert(false);
    syncHiddenLocControls();
    const locSum = $('#loc-summary');
    if (locSum) {
      locSum.textContent = 'Standort · ' + Number(state.lat).toFixed(2) + ' / ' + Number(state.lon).toFixed(2) +
        (Math.abs(state.lat - 47.37) < 0.02 && Math.abs(state.lon - 8.54) < 0.02 ? ' · Zürich' : '');
    }

    const canvas = $('#schumann-canvas');
    if (canvas) Schumann.startViz(canvas);
    renderSchumannLiveUI();
    renderTipOfDay();
  }

  function briefingChipText(id, ctx) {
    const { moon, hour, unrest, sunSign, nextFest, now } = ctx;
    const hourName = hour && hour.planet ? hour.planet : '—';
    if (id === 'moon') return moon.emoji + ' ' + moon.name;
    if (id === 'hour') return 'Stunde · ' + hourName;
    if (id === 'unrest') return 'Unruhe · ' + (unrest ? unrest.label : '—') + ' (Einladung)';
    if (id === 'sun') return 'Sonne · ' + (sunSign || '—');
    if (id === 'fest' && nextFest) {
      const festNoon = new Date(nextFest.date.getFullYear(), nextFest.date.getMonth(), nextFest.date.getDate(), 12, 0, 0, 0);
      const todayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
      const days = Math.round((festNoon - todayNoon) / 86400000);
      const when = days <= 0 ? 'heute' : days === 1 ? 'morgen' : 'in ' + days + ' Tagen';
      return 'Fest · ' + nextFest.name + ' (' + when + ')' + (nextFest.emphasized ? ' ★' : '');
    }
    return null;
  }

  function renderTagesbriefing(now, moon, hour, unrest, path) {
    const lead = $('#briefing-lead');
    const meta = $('#briefing-meta');
    const practice = $('#briefing-practice');
    const pathNote = $('#briefing-path-note');
    const streakEl = $('#briefing-streak');
    if (!lead || !meta) return;

    const saying = Paths.randomSaying(state.path);
    const hourName = hour && hour.planet ? hour.planet : '—';
    const unrestWord = unrest && unrest.label ? unrest.label.toLowerCase() : 'offen';
    const sunSign = Astro.tropicalSunSign(now);
    const nextFest = Paths.nextFestival(now, state.path, { pathOnly: isCalendarPathOnly() });
    lead.textContent =
      moon.emoji + ' ' + moon.name + ' · Stunde ' + hourName +
      ' · Unruhe ' + unrestWord + ' — mit Maß. ' + saying;

    const pins = Store.getBriefingPins();
    const ctx = { moon, hour, unrest, sunSign, nextFest, now };
    meta.innerHTML = '';
    pins.forEach(id => {
      const t = briefingChipText(id, ctx);
      if (!t) return;
      const li = document.createElement('li');
      li.textContent = t;
      li.className = 'pinned-soft';
      li.dataset.pin = id;
      meta.appendChild(li);
    });
    // Always surface fest if selected OR if no fest pin but fest is soon and space
    if (!pins.includes('fest') && nextFest && meta.children.length < 3) {
      const t = briefingChipText('fest', ctx);
      if (t) {
        const li = document.createElement('li');
        li.textContent = t;
        meta.appendChild(li);
      }
    }

    const ritualId = pathOwnRitualId(path) || path.recommendedRitual;
    const ritual = ritualId ? Rituals.getRitual(ritualId) : null;
    practice.textContent = (path.practiceHint || 'Hier übst du — eine ruhige Praxis reicht.') +
      (ritual ? ' Empfohlen: ' + ritual.name + '.' : '');
    practice.dataset.ritual = ritualId;

    if (pathNote) pathNote.textContent = path.calendarNote || path.ritualFlavor || '';

    const streak = Store.getStreak();
    if (streakEl) {
      if (streak.count > 0 && streak.alive) {
        streakEl.hidden = false;
        streakEl.textContent = streak.count + '·Tag' + (streak.count === 1 ? '' : 'e') +
          (streak.doneToday ? ' · heute' : '');
      } else {
        streakEl.hidden = true;
      }
    }
  }

  function renderBriefingPinsPanel() {
    const panel = $('#briefing-pins-panel');
    if (!panel) return;
    const pins = Store.getBriefingPins();
    const opts = Store.BRIEFING_PIN_OPTIONS || [];
    panel.innerHTML = opts.map(o =>
      '<button type="button" class="pin-chip' + (pins.includes(o.id) ? ' active' : '') +
      '" data-pin-id="' + o.id + '" aria-pressed="' + (pins.includes(o.id) ? 'true' : 'false') + '">' +
      escapeHtml(o.label) + '</button>'
    ).join('') +
      '<p class="hint-sm" style="flex-basis:100%;margin:0.25rem 0 0">2–3 Chips am Altar · Reihenfolge = Klick-Reihenfolge</p>';
    $$('#briefing-pins-panel [data-pin-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        let next = Store.getBriefingPins().slice();
        const id = btn.dataset.pinId;
        const ix = next.indexOf(id);
        if (ix >= 0) {
          if (next.length <= 2) { toast('Mindestens 2 Chips behalten'); return; }
          next.splice(ix, 1);
        } else {
          if (next.length >= 3) next.shift();
          next.push(id);
        }
        Store.setBriefingPins(next);
        refreshState();
        renderBriefingPinsPanel();
        renderCockpit();
        Rituals.vibrate(12);
      });
    });
  }

  function renderDailyIntention() {
    const di = Store.getDailyIntention();
    const input = $('#intention-input');
    const link = $('#intention-link369');
    const status = $('#intention-status');
    if (input && document.activeElement !== input) input.value = di.text || '';
    if (link) link.checked = !!di.link369;
    if (status) {
      status.textContent = di.text
        ? 'Heute aktiv' + (di.link369 ? ' · mit 369 verknüpft' : '')
        : 'Noch keine Intention für heute.';
    }
    renderIntentionHistory();
  }

  function renderIntentionHistory() {
    const host = $('#intention-history');
    const empty = $('#intention-history-empty');
    if (!host) return;
    const today = Store.todayKey();
    const all = Store.getIntentionHistory(7);
    if (!all.length) {
      host.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    host.innerHTML = '<p class="hint-sm intention-hist-label">Letzte 7 Tage</p>' + all.map(h => {
      const isToday = h.date === today;
      const when = h.date ? h.date.split('-').reverse().join('.') : '';
      return '<div class="intention-hist-item' + (isToday ? ' is-today' : '') + '">' +
        '<span class="ih-date">' + escapeHtml(isToday ? 'Heute' : when) + '</span>' +
        '<span class="ih-text">' + escapeHtml(h.text || '') + '</span>' +
        (h.link369 ? '<span class="ih-tag">369</span>' : '') +
        '</div>';
    }).join('');
  }

  function saveDailyIntention() {
    const textVal = ($('#intention-input') && $('#intention-input').value.trim()) || '';
    const linkEl = $('#intention-link369');
    const link369 = !!(linkEl && linkEl.checked);
    if (textVal) {
      const check = Sigil.isHarmful(textVal);
      if (!check.ok) { toast(check.reason); return; }
    }
    Store.setDailyIntention({ text: textVal, link369: link369 });
    if (!afterPersist(null, { checkBackup: false })) return;
    if (link369 && textVal) {
      Store.set369({ phrase: textVal });
      afterPersist(null, { checkBackup: false });
      render369();
    }
    refreshState();
    renderDailyIntention();
    toast(textVal ? 'Intention gehalten' : 'Intention geleert');
    Rituals.vibrate(18);
  }

  function render369() {
    const p = Store.get369();
    const phraseEl = $('#phrase-369');
    if (phraseEl && document.activeElement !== phraseEl) phraseEl.value = p.phrase || '';
    ['morning', 'afternoon', 'evening'].forEach(slot => {
      const max = LIMITS_369[slot];
      const val = Math.min(max, p[slot] || 0);
      const countEl = $('#count-' + slot);
      if (countEl) countEl.textContent = val + '/' + max;
      const box = $('[data-slot="' + slot + '"]');
      if (box) box.classList.toggle('done', val >= max);
    });
  }


  /** Calendar path filter: default ON (settings.calendarPathOnly !== false). */
  function isCalendarPathOnly() {
    return !(state.settings && state.settings.calendarPathOnly === false);
  }

  function setCalendarPathOnly(on) {
    Store.update(d => {
      if (!d.settings || typeof d.settings !== 'object') d.settings = {};
      d.settings.calendarPathOnly = !!on;
    });
    refreshState();
  }

  /* ——— Calendar ——— */
  function syncCalFilterUi() {
    const pathOnly = isCalendarPathOnly();
    const path = currentPath();
    const sym = pathSymbol(path);
    const btnPath = $('#cal-filter-path');
    const btnAll = $('#cal-filter-all');
    if (btnPath) {
      btnPath.classList.toggle('active', pathOnly);
      btnPath.setAttribute('aria-pressed', pathOnly ? 'true' : 'false');
      btnPath.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(sym) + '</span> Nur mein Pfad';
    }
    if (btnAll) {
      btnAll.classList.toggle('active', !pathOnly);
      btnAll.setAttribute('aria-pressed', !pathOnly ? 'true' : 'false');
    }
    const sub = $('#cal-section-sub');
    if (sub) {
      sub.textContent = pathOnly
        ? (sym + ' ' + ((path && path.name) || 'Pfad') + ' · nur Pfad-Feste')
        : (sym + ' · alle Feste · Mond');
    }
    const setEl = $('#set-calendar-path-only');
    if (setEl) setEl.checked = pathOnly;
  }

  function renderCalendar() {
    const now = new Date();
    if (calYear == null) { calYear = now.getFullYear(); calMonth = now.getMonth(); }
    syncCalFilterUi();
    const title = new Date(calYear, calMonth, 1).toLocaleDateString('de-CH', { month: 'long', year: 'numeric' });
    $('#cal-title').textContent = title.charAt(0).toUpperCase() + title.slice(1);

    const first = new Date(calYear, calMonth, 1);
    const startDow = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const prevDays = new Date(calYear, calMonth, 0).getDate();

    const grid = $('#cal-grid');
    grid.innerHTML = '';
    ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-dow';
      el.textContent = d;
      grid.appendChild(el);
    });

    const cells = [];
    for (let i = 0; i < startDow; i++) {
      cells.push({ day: prevDays - startDow + 1 + i, other: true, date: new Date(calYear, calMonth - 1, prevDays - startDow + 1 + i) });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, other: false, date: new Date(calYear, calMonth, d) });
    }
    while (cells.length % 7 !== 0) {
      const n = cells.length - startDow - daysInMonth + 1;
      cells.push({ day: n, other: true, date: new Date(calYear, calMonth + 1, n) });
    }

    cells.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day' + (c.other ? ' other' : '');
      const isToday = !c.other && c.date.toDateString() === now.toDateString();
      if (isToday) btn.classList.add('today');
      if (selectedDay && c.date.toDateString() === selectedDay.toDateString()) btn.classList.add('selected');
      btn.textContent = c.day;
      const pathOnly = isCalendarPathOnly();
      const fests = Paths.festivalsForPath(c.date, state.path, { pathOnly: pathOnly });
      if (fests.length) {
        const dot = document.createElement('span');
        dot.className = 'fest-dot' + (pathOnly || fests.some(f => f.emphasized) ? ' path' : '');
        btn.appendChild(dot);
      }
      btn.addEventListener('click', () => {
        selectedDay = c.date;
        // Soft update: selection classes only — skip full grid rebuild
        $$('#cal-grid .cal-day').forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        renderDayDetail(c.date);
        // Year-wheel active state without rebuilding month grid
        try { renderYearWheel(now); } catch (_) { /* ignore */ }
      });
      grid.appendChild(btn);
    });

    if (!selectedDay) selectedDay = now;
    renderDayDetail(selectedDay);
    renderYearWheel(now);
  }


  function sabbatDate(year, sab) {
    return new Date(year, sab.m - 1, sab.d, 12, 0, 0, 0);
  }

  function renderYearWheel(now) {
    const host = $('#year-wheel');
    const cap = $('#year-wheel-caption');
    if (!host) return;
    const y = calYear != null ? calYear : now.getFullYear();
    const path = currentPath();
    // Angle: Imbolc near NNE — map month/day to circle (0 = top = Yule/winter solstice feel)
    // Place sabbats evenly by calendar order around the ring
    host.innerHTML = SABBATS.map((sab, i) => {
      const angle = (i / SABBATS.length) * 360 - 90;
      const rad = angle * Math.PI / 180;
      const cx = 50 + Math.cos(rad) * 38;
      const cy = 50 + Math.sin(rad) * 38;
      const dt = sabbatDate(y, sab);
      const emph = Paths.isEmphasized(sab.name, state.path);
      const pathOnly = isCalendarPathOnly();
      const isNear = selectedDay && selectedDay.getMonth() === sab.m - 1 && selectedDay.getDate() === sab.d;
      const todayMatch = now.getFullYear() === y && now.getMonth() === sab.m - 1 && now.getDate() === sab.d;
      const cls = 'yw-node' + (emph ? ' emph' : '') + (pathOnly && !emph ? ' dim' : '') +
        (isNear || todayMatch ? ' active' : '');
      return '<button type="button" class="' + cls + '" style="left:' + cx + '%;top:' + cy + '%" data-sabbat="' + i + '" role="listitem" title="' + escapeHtml(sab.name) + '">' +
        '<span class="yw-ico">' + sab.ico + '</span><span class="yw-name">' + escapeHtml(sab.name) + '</span></button>';
    }).join('') + '<div class="yw-hub" aria-hidden="true">☉</div>';

    $$('#year-wheel [data-sabbat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sab = SABBATS[Number(btn.dataset.sabbat)];
        if (!sab) return;
        calYear = y;
        calMonth = sab.m - 1;
        selectedDay = sabbatDate(y, sab);
        renderCalendar();
        Rituals.vibrate(15);
      });
    });

    // Next sabbat caption (path-only prefers emphasized)
    let next = null;
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const pathOnlyCap = isCalendarPathOnly();
    for (let pass = 0; pass < 2 && !next; pass++) {
      const yy = now.getFullYear() + pass;
      for (const sab of SABBATS) {
        if (pathOnlyCap && !Paths.isEmphasized(sab.name, state.path)) continue;
        const dt = sabbatDate(yy, sab);
        if (dt >= start) { next = { sab: sab, date: dt }; break; }
      }
    }
    if (!next && pathOnlyCap) {
      const nf = Paths.nextFestival(now, state.path, { pathOnly: true });
      if (nf) {
        const sab = SABBATS.find(s => s.name === nf.name) || { name: nf.name, ico: '✦', m: nf.date.getMonth() + 1, d: nf.date.getDate() };
        next = { sab: sab, date: nf.date };
      }
    }
    if (cap) {
      if (next) {
        const days = Math.round((next.date - start) / 86400000);
        const when = days <= 0 ? 'heute' : days === 1 ? 'morgen' : 'in ' + days + ' Tagen';
        const label = pathOnlyCap ? 'Nächstes Pfad-Fest' : 'Nächster Sabbat';
        cap.textContent = label + ' · ' + next.sab.name + ' (' + when + ')' +
          (Paths.isEmphasized(next.sab.name, state.path) ? ' ★ ' + path.name : '');
      } else {
        cap.textContent = 'Jahresrad · ' + y;
      }
    }
    const praxisEl = $('#year-wheel-praxis');
    if (praxisEl && Paths.getSabbatPraxis) {
      const focusName = next && next.sab ? next.sab.name : null;
      // Near sabbat practice, else today's seasonal feel via closest
      let praxisName = focusName;
      if (!praxisName) {
        let best = null;
        let bestAbs = Infinity;
        for (const sab of SABBATS) {
          const dt = sabbatDate(y, sab);
          const abs = Math.abs(dt - start);
          if (abs < bestAbs) { bestAbs = abs; best = sab; }
        }
        praxisName = best ? best.name : 'Yule';
      }
      praxisEl.textContent = 'Praxis: ' + Paths.getSabbatPraxis(praxisName);
    }
  }

  function renderDayDetail(date) {
    const moon = Astro.moonPhase(date);
    const sunSign = Astro.tropicalSunSign(date);
    const moonInfo = Astro.moonSignInfo(date);
    const hour = Astro.planetaryHour(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
      state.lat, state.lon
    );
    const voidW = Astro.moonVoidWarning(date);
    const pathOnly = isCalendarPathOnly();
    const split = Paths.festivalsSplit(date, state.path);
    const pathFests = split.path;
    const otherFests = split.other;
    const path = currentPath();
    const ritualId = pathOwnRitualId(path) || path.recommendedRitual;
    const ritual = Rituals.getRitual(ritualId);
    const box = $('#cal-detail');
    function festPills(list) {
      return list.map(f =>
        '<span class="pill" style="' + (f.emphasized ? 'border-color:var(--gold);color:var(--gold)' : '') + '">' +
        escapeHtml(f.name) + (f.emphasized ? ' ★' : '') + '</span>'
      ).join(' ');
    }
    let festHtml = '';
    if (pathFests.length) {
      festHtml += '<p class="cal-path-fests" style="margin-top:0.75rem">' + festPills(pathFests) + '</p>';
    }
    if (otherFests.length) {
      if (pathOnly) {
        festHtml += '<details class="andere-feste-acc"><summary>Andere Feste</summary>' +
          '<p class="hint-sm">Andere Traditionen — nicht Schwerpunkt deines Pfads.</p>' +
          '<p>' + festPills(otherFests) + '</p></details>';
      } else {
        festHtml += '<p class="cal-other-fests" style="margin-top:0.45rem">' + festPills(otherFests) + '</p>';
      }
    }
    if (!pathFests.length && !otherFests.length) {
      festHtml = '<p class="meta" style="margin-top:0.75rem;color:var(--muted);font-size:0.8rem">Keine Festtage an diesem Datum.</p>';
    } else if (!pathFests.length && pathOnly && otherFests.length) {
      festHtml = '<p class="meta" style="margin-top:0.75rem;color:var(--muted);font-size:0.8rem">Kein Pfad-Fest an diesem Datum.</p>' + festHtml;
    }
    box.innerHTML =
      '<h3>' + escapeHtml(fmtDate(date)) + '</h3>' +
      '<div>' +
      pill(moon.emoji + ' ' + moon.name + ' · ' + moon.percent + '%') +
      pill('Mond in ' + moonInfo.sign) +
      pill('Sonne: ' + sunSign) +
      pill('Tagesplanet ≈ ' + hour.dayRuler) +
      pill(voidW.message) +
      '</div>' +
      festHtml +
      '<div class="day-quick-actions" role="group" aria-label="Schnellaktionen">' +
      '<button type="button" class="primary" id="day-set-intention">Intention setzen</button>' +
      '<button type="button" class="ghost" id="day-start-ritual" data-ritual="' + escapeHtml(ritualId) + '">' +
      'Ritual: ' + escapeHtml(ritual ? ritual.name : 'Empfohlen') + '</button>' +
      '</div>' +
      '<p class="hint-sm day-quick-hint">Intention öffnet den Altar · Ritual startet die pfadbezogene Empfehlung.</p>';

    const setInt = $('#day-set-intention');
    if (setInt) {
      setInt.addEventListener('click', () => {
        navigate('cockpit', { force: true });
        const inp = $('#intention-input');
        if (inp) {
          setTimeout(() => { inp.focus(); inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60);
        }
        toast('Intention des Tages');
      });
    }
    const startR = $('#day-start-ritual');
    if (startR) {
      startR.addEventListener('click', () => {
        const id = startR.dataset.ritual || ritualId;
        const r = Rituals.getRitual(id);
        if (r) { navigate('rituale', { force: true }); openRitual(r); }
        else { navigate('rituale', { force: true }); toast('Ritual nicht gefunden'); }
      });
    }
  }

  function pill(t) {
    return '<span class="pill">' + escapeHtml(t) + '</span>';
  }

  /* ——— Kosmos ——— */

  /* ——— v3.5 Kosmos-Praxis: Stunde → Pfad-Ritual ——— */
  const HOUR_RITUAL_PREF = {
    Sonne: {
      schamanismus: 'ahnenlicht-schaman', nordisch: 'mass-eid', voodoo: 'licht-wasser',
      santeria: 'morgenwasser', hermetik: 'stunden-halten', wicca: 'anziehen-loslassen',
      chaosmagie: 'sigil-gnosis', esoterik: 'schwelle'
    },
    Mond: {
      schamanismus: 'rauchbruecke', nordisch: 'ahnenstein', voodoo: 'stiller-altar',
      santeria: 'weisses-tuch', hermetik: 'labor-notiz', wicca: 'mondkreis-klein',
      chaosmagie: 'vergessen', esoterik: 'mondarbeit'
    },
    Mars: {
      schamanismus: 'spurlesen', nordisch: 'frith-grenze', voodoo: 'hausreinigung-voodoo',
      santeria: 'reinigung-ache', hermetik: 'weihe-hermetik', wicca: 'schutz-reinigung',
      chaosmagie: 'banishing-punkt', esoterik: 'schwelle'
    },
    Merkur: {
      schamanismus: 'spurlesen', nordisch: 'thing-pause', voodoo: 'dienst-licht',
      santeria: 'dank-ache', hermetik: 'labor-notiz', wicca: 'rede-check',
      chaosmagie: '369', esoterik: 'zahlen-klarheit'
    },
    Jupiter: {
      schamanismus: 'ahnenlicht-schaman', nordisch: 'gabe', voodoo: 'dienst-licht',
      santeria: 'obstgabe-haus', hermetik: 'vier-tafel', wicca: 'anziehen-loslassen',
      chaosmagie: 'modell-wechsel', esoterik: 'stille-feld'
    },
    Venus: {
      schamanismus: 'rueckkehrband', nordisch: 'gabe', voodoo: 'hofkehren',
      santeria: 'dank-ache', hermetik: 'solve-coagula', wicca: 'schutz-reinigung',
      chaosmagie: 'vergessen', esoterik: 'mondarbeit'
    },
    Saturn: {
      schamanismus: 'rueckkehrband', nordisch: 'frith-grenze', voodoo: 'stiller-altar',
      santeria: 'reinigung-ache', hermetik: 'stunden-halten', wicca: 'elemente',
      chaosmagie: 'banishing-punkt', esoterik: 'lostag-achtung'
    }
  };

  function ritualForHourPlanet(planet, pathId) {
    const map = HOUR_RITUAL_PREF[planet] || {};
    const prefer = map[pathId];
    if (prefer) {
      const r = Rituals.getRitual(prefer);
      if (r && Rituals.isOwnForPath(r, pathId)) return r;
    }
    const own = Rituals.listOwnForPath(pathId) || [];
    const sig = own.find(x => x.signature);
    return sig || own[0] || Rituals.listGrundlagen()[0] || null;
  }

  function fmtHourClock(d) {
    if (!d) return '—';
    return new Date(d).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
  }

  function renderKosmosPraxis(hourNow) {
    const chip = $('#kosmos-hour-chip');
    const meta = $('#kosmos-hour-meta');
    const gut = $('#kosmos-gut-fuer');
    const tip = $('#kosmos-hour-tip');
    const cta = $('#kosmos-ritual-cta');
    if (!hourNow || !hourNow.planet) {
      if (chip) chip.textContent = '—';
      if (meta) meta.textContent = 'Keine Stundenberechnung';
      if (gut) gut.innerHTML = '<span class="label-soft">Gut für</span> —';
      if (tip) tip.textContent = '';
      if (cta) { cta.hidden = true; cta.dataset.ritual = ''; }
      return null;
    }
    const planet = hourNow.planet;
    const pathId = state.path || 'esoterik';
    const gutTxt = Astro.hourGutFuer ? Astro.hourGutFuer(planet) : planet;
    const tipTxt = Astro.hourTip ? Astro.hourTip(planet) : '';
    if (chip) chip.textContent = planet;
    if (meta) {
      meta.textContent = (hourNow.isDay ? 'Tag' : 'Nacht') + ' · Stunde ' + hourNow.hourIndex +
        ' · ' + fmtHourClock(hourNow.start) + '–' + fmtHourClock(hourNow.end) +
        (hourNow.remainMin != null ? ' · noch ' + hourNow.remainMin + ' Min' : '');
    }
    if (gut) gut.innerHTML = '<span class="label-soft">Gut für</span> ' + escapeHtml(gutTxt);
    if (tip) tip.textContent = tipTxt;
    const ritual = ritualForHourPlanet(planet, pathId);
    if (cta) {
      if (ritual) {
        cta.hidden = false;
        cta.dataset.ritual = ritual.id;
        cta.textContent = 'Ritual: ' + ritual.name;
      } else {
        cta.hidden = true;
        cta.dataset.ritual = '';
      }
    }
    return ritual;
  }

  function renderKosmosTimeline(now) {
    const el = $('#kosmos-timeline');
    if (!el || !Astro.upcomingPlanetaryHours) return;
    const hours = Astro.upcomingPlanetaryHours(now, state.lat, state.lon, 4);
    el.innerHTML = hours.map(h => {
      const cls = h.current ? ' is-current' : '';
      return '<li class="kosmos-tl-item' + cls + '">' +
        '<span class="tl-planet">' + escapeHtml(h.planet) + '</span>' +
        '<span class="tl-time">' + fmtHourClock(h.start) + '–' + fmtHourClock(h.end) + '</span>' +
        '<span class="tl-flag">' + (h.current ? 'jetzt' : (h.isDay ? 'Tag' : 'Nacht')) + '</span>' +
        '</li>';
    }).join('');
  }

  function syncKosmosLocFields() {
    const la = $('#kosmos-lat');
    const lo = $('#kosmos-lon');
    const sum = $('#kosmos-loc-summary');
    if (la && document.activeElement !== la) la.value = state.lat;
    if (lo && document.activeElement !== lo) lo.value = state.lon;
    if (sum) {
      const zurich = Math.abs(state.lat - 47.37) < 0.02 && Math.abs(state.lon - 8.54) < 0.02;
      sum.textContent = Number(state.lat).toFixed(2) + ' / ' + Number(state.lon).toFixed(2) +
        (zurich ? ' · Zürich (Standard)' : ' · lokal gespeichert');
    }
  }

  function saveKosmosLocation() {
    const lat = parseFloat(($('#kosmos-lat') || {}).value);
    const lon = parseFloat(($('#kosmos-lon') || {}).value);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      toast('Koordinaten prüfen', 2800, 'warn');
      return;
    }
    Store.update(d => { d.lat = lat; d.lon = lon; });
    refreshState();
    syncHiddenLocControls();
    syncKosmosLocFields();
    renderKosmos();
    renderCockpit();
    toast('Ort am Altar gemerkt');
  }

  function renderKosmos() {
    const canvas = $('#radar-canvas');
    if (!canvas) return;
    const now = new Date();
    const planets = Astro.planetLongitudes(now);
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(360, canvas.parentElement.clientWidth || 300);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = size / 2, cy = size / 2, r = size / 2 - 28;
    radarHits = [];

    const bg = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    bg.addColorStop(0, '#14101f');
    bg.addColorStop(1, '#0a0612');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    [0.33, 0.66, 1].forEach(f => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(124,92,191,0.35)';
      ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
      ctx.stroke();
    });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(154,143,176,0.18)';
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.stroke();
      const signs = Astro.ZODIAC || [];
      if (signs[i]) {
        const lx = cx + Math.cos(a) * (r + 14);
        const ly = cy + Math.sin(a) * (r + 14);
        ctx.fillStyle = 'rgba(154,143,176,0.7)';
        ctx.font = '600 9px Manrope, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(signs[i].slice(0, 3), lx, ly + 3);
      }
    }

    const hourNow = Astro.planetaryHour(now, state.lat, state.lon);
    const hourPlanet = hourNow && hourNow.planet ? hourNow.planet : null;
    renderKosmosPraxis(hourNow);
    renderKosmosTimeline(now);
    syncKosmosLocFields();

    const colors = PLANET_COLORS;
    Object.keys(planets).forEach(name => {
      const lon = planets[name];
      const a = (lon / 360) * Math.PI * 2 - Math.PI / 2;
      const rad = name === 'Sonne' ? r * 0.55 : name === 'Mond' ? r * 0.7 : r * 0.88;
      const x = cx + Math.cos(a) * rad;
      const y = cy + Math.sin(a) * rad;
      const isHour = hourPlanet && name === hourPlanet;
      const pr = name === 'Sonne' ? 8 : name === 'Mond' ? 6 : 5;
      if (isHour) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(232, 197, 71, 0.85)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.arc(x, y, pr + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(232, 197, 71, 0.18)';
        ctx.arc(x, y, pr + 7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.fillStyle = colors[name] || '#fff';
      ctx.shadowColor = isHour ? '#e8c547' : (colors[name] || '#fff');
      ctx.shadowBlur = isHour ? 18 : (name === 'Sonne' ? 12 : 6);
      ctx.arc(x, y, isHour ? pr + 1.5 : pr, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = isHour ? '#ffe9a8' : '#e8e0f4';
      ctx.font = (isHour ? '700 12px' : '600 11px') + ' Manrope, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(name + (isHour ? ' · Std' : ''), x + 9, y + 4);
      const signIdx = Math.floor(normalizeLon(lon) / 30) % 12;
      const sign = (Astro.ZODIAC || [])[signIdx] || '—';
      radarHits.push({ name: name, x: x, y: y, r: pr + (isHour ? 14 : 10), lon: lon, sign: sign, hour: !!isHour });
    });

    renderKosmosLegend(planets, hourPlanet);
    const sc = $('#schumann-canvas-kosmos');
    if (sc) Schumann.startViz(sc);
    renderSchumannLiveUI();
  }

  function normalizeLon(lon) {
    lon = lon % 360;
    return lon < 0 ? lon + 360 : lon;
  }

  function renderKosmosLegend(planets, hourPlanet) {
    const el = $('#kosmos-legend');
    if (!el) return;
    el.innerHTML = Object.keys(planets).map(name => {
      const isHour = hourPlanet && name === hourPlanet;
      return '<button type="button" data-planet="' + name + '" class="' + (isHour ? 'is-hour-planet' : '') +
        '" aria-label="' + name + (isHour ? ' · aktuelle Planetenstunde' : '') + ' Details">' +
        '<span class="dot" style="background:' + (PLANET_COLORS[name] || '#fff') + ';color:' + (PLANET_COLORS[name] || '#fff') + '"></span>' +
        escapeHtml(name) + (isHour ? ' <span class="hour-badge">Std</span>' : '') + '</button>';
    }).join('');
    $$('#kosmos-legend [data-planet]').forEach(btn => {
      btn.addEventListener('click', () => showPlanetDetail(btn.dataset.planet));
    });
  }

  function showPlanetDetail(name) {
    const hit = radarHits.find(h => h.name === name);
    const box = $('#kosmos-detail');
    if (!box) return;
    const lon = hit ? hit.lon : null;
    const sign = hit ? hit.sign : '—';
    const deg = lon != null ? (normalizeLon(lon) % 30).toFixed(1) : '—';
    $('#kosmos-detail-title').textContent = name;
    const hourP = Astro.planetaryHour(new Date(), state.lat, state.lon);
    const hourNote = (hourP && hourP.planet === name)
      ? ' Das ist die aktuelle Planetenstunde (' + (hourP.isDay ? 'Tag' : 'Nacht') + ' Std ' + hourP.hourIndex + ').'
      : '';
    $('#kosmos-detail-body').textContent =
      (PLANET_BLURBS[name] || 'Luminar/Planet in Näherung.') +
      ' Aktuell ≈ ' + sign + ' ' + deg + '° (tropische Näherung, kein Ephemeriden-Ersatz).' + hourNote;
    box.hidden = false;
    Rituals.vibrate(15);
  }


  /* ——— Pfad-Woche (Mo=1…So=7) ——— */
  const PATH_WEEK_DAY_LABELS = ['', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  function renderPathWeek() {
    const path = currentPath();
    const pathId = state.path || 'esoterik';
    const step = Paths.getTodayWeekStep
      ? Paths.getTodayWeekStep(pathId)
      : { day: 1, title: 'Praxis', text: 'Eine ruhige Mikro-Praxis.' };
    const day = step.day || (Paths.weekdayMon1 ? Paths.weekdayMon1() : 1);
    const done = Store.isPathWeekDayDone ? Store.isPathWeekDayDone(pathId, day) : false;
    const dayLabel = PATH_WEEK_DAY_LABELS[day] || ('Tag ' + day);

    function fill(prefix) {
      const chip = $(prefix === 'r' ? '#path-week-chip-r' : '#path-week-chip');
      const lead = $(prefix === 'r' ? '#path-week-lead-r' : '#path-week-lead');
      const status = $(prefix === 'r' ? '#path-week-status-r' : '#path-week-status');
      const doneBtn = $(prefix === 'r' ? '#path-week-done-r' : '#path-week-done');
      const undoBtn = $(prefix === 'r' ? '#path-week-undo-r' : '#path-week-undo');
      if (chip) chip.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(pathSymbol(path)) + '</span> ' + escapeHtml(dayLabel);
      if (lead) lead.textContent = (step.title || 'Heute') + ' — ' + (step.text || '');
      if (status) status.textContent = done ? 'Heute erledigt.' : 'Noch offen — kurz und ruhig.';
      if (doneBtn) {
        doneBtn.disabled = !!done;
        doneBtn.textContent = done ? 'Erledigt' : 'Erledigt markieren';
      }
      if (undoBtn) undoBtn.hidden = !done;
    }
    fill('');
    fill('r');
  }

  function bindPathWeekButtons() {
    function mark(done) {
      const pathId = state.path || 'esoterik';
      const step = Paths.getTodayWeekStep ? Paths.getTodayWeekStep(pathId) : { day: Paths.weekdayMon1() };
      const day = step.day || 1;
      if (Store.markPathWeekDay) Store.markPathWeekDay(pathId, day, done);
      refreshState();
      if (done && Store.recordPractice) Store.recordPractice('path-week');
      if (done && Store.addPracticeLog) {
        Store.addPracticeLog({ kind: 'path-week', label: 'Pfad-Woche · Tag ' + day, detail: step.title || '' });
      }
      afterPersist(done ? 'Pfad-Woche: Tag erledigt' : 'Markierung zurückgenommen', { checkBackup: false });
      renderPathWeek();
      renderStreakLine();
      Rituals.vibrate(done ? 20 : 10);
    }
    [['#path-week-done', true], ['#path-week-done-r', true],
     ['#path-week-undo', false], ['#path-week-undo-r', false]].forEach(([sel, val]) => {
      const el = $(sel);
      if (el && !el.dataset.boundWeek) {
        el.dataset.boundWeek = '1';
        el.addEventListener('click', () => mark(val));
      }
    });
  }

  /* ——— Werkzeug-Set pro Pfad ——— */
  function renderPathWerkzeug() {
    const pathId = state.path || 'esoterik';
    const path = currentPath();
    const tool = Paths.getPathWerkzeug ? Paths.getPathWerkzeug(pathId) : null;
    const st = Store.getPathWerkzeugState ? Store.getPathWerkzeugState(pathId) : {};

    function paint(bodySel, chipSel, titleSel) {
      const body = $(bodySel);
      const chip = $(chipSel);
      const title = $(titleSel);
      if (chip) chip.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(pathSymbol(path)) + '</span> ' + escapeHtml((path && path.name) || 'Pfad');
      if (title && tool) title.textContent = 'Werkzeug · ' + tool.title;
      if (!body || !tool) return;

      if (tool.kind === 'shortcut') {
        body.innerHTML = '<p class="hint-sm">Kurz zum Sigil-Labor — ethische Absicht, dann vergessen.</p>' +
          '<button type="button" class="primary" data-werkzeug-sigil>Sigil öffnen</button>' +
          (tool.houseOnly ? '<p class="notice ethics-line">Nur Hauspraxis.</p>' : '');
      } else if (tool.kind === 'note') {
        const val = st[tool.field] || '';
        body.innerHTML = (tool.houseOnly ? '<p class="notice ethics-line">Nur Hauspraxis, keine Initiation.</p>' : '') +
          '<div class="form-row" style="margin-bottom:0.45rem">' +
          '<label class="sr-only" for="werkzeug-note-' + bodySel.replace('#','') + '">' + escapeHtml(tool.title) + '</label>' +
          '<input id="werkzeug-note-' + bodySel.replace('#','') + '" maxlength="160" data-werkzeug-note="' + escapeHtml(tool.field) + '" ' +
          'placeholder="' + escapeHtml(tool.placeholder || '') + '" value="' + escapeHtml(val) + '" autocomplete="off" /></div>' +
          '<button type="button" class="primary" data-werkzeug-save-note>Speichern</button>';
      } else if (tool.kind === 'checks') {
        const checks = st.checks && typeof st.checks === 'object' ? st.checks : {};
        const items = (tool.fields || []).map(f => {
          const on = !!checks[f.id];
          return '<label class="inline-check"><input type="checkbox" data-werkzeug-check="' + escapeHtml(f.id) + '"' +
            (on ? ' checked' : '') + '> ' + escapeHtml(f.label) + '</label>';
        }).join('');
        body.innerHTML = (tool.houseOnly ? '<p class="notice ethics-line">Nur Haus — keine Initiation.</p>' : '') +
          '<div class="werkzeug-checks">' + items + '</div>' +
          '<p class="meta-line">Tippen speichert lokal.</p>';
      } else {
        body.innerHTML = '<p class="hint-sm">Kein Werkzeug für diesen Pfad.</p>';
      }

      body.querySelectorAll('[data-werkzeug-sigil]').forEach(btn => {
        btn.addEventListener('click', () => {
          openRitualTab('sigil', { scroll: 'werkzeug-sigil' });
          toast('Sigil-Labor');
        });
      });
      body.querySelectorAll('[data-werkzeug-save-note]').forEach(btn => {
        btn.addEventListener('click', () => {
          const inp = body.querySelector('[data-werkzeug-note]');
          if (!inp || !Store.setPathWerkzeugState) return;
          const field = inp.getAttribute('data-werkzeug-note');
          const payload = {};
          payload[field] = (inp.value || '').trim().slice(0, 160);
          Store.setPathWerkzeugState(pathId, payload);
          afterPersist('Werkzeug gespeichert', { checkBackup: false });
          refreshState();
          Rituals.vibrate(12);
        });
      });
      body.querySelectorAll('[data-werkzeug-check]').forEach(box => {
        box.addEventListener('change', () => {
          const checks = Object.assign({}, (Store.getPathWerkzeugState(pathId).checks) || {});
          checks[box.getAttribute('data-werkzeug-check')] = !!box.checked;
          Store.setPathWerkzeugState(pathId, { checks: checks });
          refreshState();
          Rituals.vibrate(8);
        });
      });
    }

    paint('#path-werkzeug-body', '#path-werkzeug-chip', '#path-werkzeug-title');
    paint('#path-werkzeug-body-r', '#path-werkzeug-chip-r', '#path-werkzeug-title-r');
  }

  /* ——— Initiations-Grenze ——— */
  let pendingInitiationRitual = null;

  function openInitiationGate(ritual) {
    pendingInitiationRitual = ritual;
    const gate = $('#initiation-gate');
    const check = $('#initiation-gate-check');
    const accept = $('#initiation-gate-accept');
    if (check) check.checked = false;
    if (accept) accept.disabled = true;
    if (gate) gate.classList.add('open');
  }

  function closeInitiationGate() {
    const gate = $('#initiation-gate');
    if (gate) gate.classList.remove('open');
    pendingInitiationRitual = null;
  }

  function bindInitiationGate() {
    const check = $('#initiation-gate-check');
    const accept = $('#initiation-gate-accept');
    const cancel = $('#initiation-gate-cancel');
    if (check && !check.dataset.boundGate) {
      check.dataset.boundGate = '1';
      check.addEventListener('change', () => {
        if (accept) accept.disabled = !check.checked;
      });
    }
    if (accept && !accept.dataset.boundGate) {
      accept.dataset.boundGate = '1';
      accept.addEventListener('click', () => {
        if (!check || !check.checked) return;
        const pathId = state.path || '';
        if (Store.setInitiationAck) Store.setInitiationAck(pathId, true);
        refreshState();
        const ritual = pendingInitiationRitual;
        closeInitiationGate();
        if (ritual) openRitualDirect(ritual);
        toast('Grenze bestätigt — nur Hauspraxis');
      });
    }
    if (cancel && !cancel.dataset.boundGate) {
      cancel.dataset.boundGate = '1';
      cancel.addEventListener('click', () => {
        closeInitiationGate();
        toast('Abgebrochen', 2200, 'warn');
      });
    }
  }

  function ritualNeedsInitiationGate(ritual) {
    const pathId = state.path || '';
    if (!(Paths.needsInitiationGate && Paths.needsInitiationGate(pathId))) return false;
    if (Store.hasInitiationAck && Store.hasInitiationAck(pathId)) return false;
    if (!ritual) return false;
    // First start of a path ritual (own or houseOnly) on Voodoo/Santería
    if (ritual.houseOnly) return true;
    if (Rituals.isOwnForPath && Rituals.isOwnForPath(ritual, pathId)) return true;
    return false;
  }

  /* ——— Rituale ——— */
  /** Prefer path-own ritual id; never fall back to shared Grundlagen as primary. */
  function pathOwnRitualId(fallbackPath) {
    const path = fallbackPath || currentPath();
    const pid = (path && path.id) || state.path;
    const rec = path && path.recommendedRitual;
    if (rec) {
      const rr = Rituals.getRitual(rec);
      if (rr && Rituals.isOwnForPath && Rituals.isOwnForPath(rr, pid)) return rec;
    }
    const own = (Rituals.listOwnForPath && Rituals.listOwnForPath(pid)) || [];
    if (own.length) return own[0].id;
    return rec || null;
  }

  function ritualMatchesFilters(r, path) {
    const q = (ritualSearch || '').trim().toLowerCase();
    if (q) {
      const hay = (r.name + ' ' + (r.ico || '') + ' ' + (r.steps || []).map(s => s.title + ' ' + s.text).join(' ') +
        (r.breath ? ' atem' : '') + (r.candle ? ' kerze' : '')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    const mins = r.mins || 0;
    if (ritualDurFilter === 'short' && mins > 5) return false;
    if (ritualDurFilter === 'mid' && (mins < 6 || mins > 15)) return false;
    if (ritualDurFilter === 'long' && mins <= 15) return false;
    return true;
  }

  function renderRituale() {
    const path = currentPath();
    const sym = pathSymbol(path);
    const label = $('#ritual-section-label');
    if (label) {
      label.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(sym) + '</span> ' +
        escapeHtml(path.name) + ' · Pfad-Rituale';
    }
    const flavor = $('#ritual-path-flavor');
    if (flavor) {
      flavor.innerHTML = '<span class="path-sym" aria-hidden="true">' + escapeHtml(sym) + '</span> ' +
        '<strong>' + escapeHtml(path.name) + '</strong>: ' + escapeHtml(path.ritualFlavor || '') +
        (path.disclaimer ? ' — ' + escapeHtml(path.disclaimer) : '');
    }
    renderStreakLine();

    const favs = state.ritualFavorites || [];
    // Default: ONLY path-own. "all" = full library. Grundlagen always from shared list.
    const base = ritualPathFilter === 'all'
      ? (Rituals.GUIDED || [])
      : (Rituals.listOwnForPath
          ? Rituals.listOwnForPath(state.path, { recommendedRitual: path.recommendedRitual })
          : Rituals.listForPath(state.path, { recommendedRitual: path.recommendedRitual, ownOnly: true }));
    let list = base.filter(r => ritualMatchesFilters(r, path));
    list = list.slice().sort((a, b) => {
      const af = favs.indexOf(a.id);
      const bf = favs.indexOf(b.id);
      const aFav = af >= 0;
      const bFav = bf >= 0;
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      if (aFav && bFav) return af - bf;
      if (ritualPathFilter !== 'all') {
        const aOwn = Rituals.isOwnForPath && Rituals.isOwnForPath(a, state.path) ? 0 : 1;
        const bOwn = Rituals.isOwnForPath && Rituals.isOwnForPath(b, state.path) ? 0 : 1;
        if (aOwn !== bOwn) return aOwn - bOwn;
        const aRec = path.recommendedRitual === a.id ? 0 : 1;
        const bRec = path.recommendedRitual === b.id ? 0 : 1;
        if (aRec !== bRec) return aRec - bRec;
      }
      return 0;
    });
    function ritualItemHtml(r) {
      const isFav = favs.includes(r.id);
      const isOwn = Rituals.isOwnForPath && Rituals.isOwnForPath(r, state.path);
      const dur = (Rituals.durLabel && Rituals.durLabel(r.mins)) || (('≈ ' + (r.mins || '?') + ' Min'));
      const durClass = (r.mins || 0) <= 5 ? 'dur-short' : ((r.mins || 0) <= 15 ? 'dur-mid' : 'dur-long');
      return '<div class="ritual-item' + (isFav ? ' is-fav' : '') + (path.recommendedRitual === r.id || isOwn ? ' path-emphasized' : '') + (isOwn ? ' path-own' : '') + (r.signature ? ' is-signature' : '') + '" data-ritual-wrap="' + r.id + '">' +
        '<button type="button" class="ritual-item-main" data-ritual="' + r.id + '">' +
        '<span class="r-ico" aria-hidden="true">' + (isOwn ? escapeHtml(pathSymbol(path)) : r.ico) + '</span>' +
        '<span><div class="r-name">' +
        (isOwn ? '<span class="r-path-sym" aria-hidden="true">' + escapeHtml(pathSymbol(path)) + '</span>' : '') +
        escapeHtml(r.name) +
        '<span class="dur-badge ' + durClass + '" title="Dauer-Tag">' + escapeHtml(dur) + '</span>' +
        (r.signature ? '<span class="fav-badge signature-badge">Signatur</span>' : '') +
        (isOwn ? '<span class="fav-badge path-own-badge">Pfad</span>' : '') +
        (isFav ? '<span class="fav-badge">Favorit</span>' : '') + '</div>' +
        '<div class="r-meta">' + r.steps.length + ' Schritte' +
        (r.breath ? ' · Atem' : '') + (r.candle ? ' · Kerze' : '') +
        (r.houseOnly ? ' · Haus' : '') +
        (path.recommendedRitual === r.id ? ' · empfohlen' : '') +
        (r.intention ? (' · ' + escapeHtml(String(r.intention).slice(0, 72)) + (String(r.intention).length > 72 ? '…' : '')) : '') +
        '</div></span></button>' +
        '<button type="button" class="fav-btn" data-fav="' + r.id + '" aria-label="' +
        (isFav ? 'Favorit entfernen' : 'Als Favorit markieren') + '" aria-pressed="' +
        (isFav ? 'true' : 'false') + '">' + (isFav ? '★' : '☆') + '</button></div>';
    }

    const ownList = list; // already path-own when filter=current
    const grundlagenRaw = (Rituals.listGrundlagen && Rituals.listGrundlagen()) ||
      (Rituals.GUIDED || []).filter(r => !r.paths);
    const sharedList = grundlagenRaw.filter(r => ritualMatchesFilters(r, path));
    // Default: ONLY path-own in main list; Grundlagen (closed accordion) secondary
    const showSplit = ritualPathFilter !== 'all';
    const elOwn = $('#ritual-list-own');
    const elShared = $('#ritual-list-shared');
    const elLegacy = $('#ritual-list');
    const acc = $('#shared-rituals-accordion');
    const countEl = $('#ritual-filter-count');
    if (countEl) {
      const favCount = list.filter(r => favs.includes(r.id)).length;
      const ownN = list.length;
      countEl.textContent = (showSplit
        ? (ownN + ' · ' + path.name + ' (nur dieser Pfad)' +
           (sharedList.length ? ' · Grundlagen separat' : ''))
        : (list.length + ' Ritual' + (list.length === 1 ? '' : 'e') + ' · gesamte Bibliothek')) +
        (favCount ? ' · ' + favCount + ' Favorit' + (favCount === 1 ? '' : 'en') : '');
    }

    function emptyHtml() {
      return '<div class="empty-state convert"><strong>Keine Rituale für diesen Pfad</strong>' +
        '<p>' + escapeHtml((currentPath() && currentPath().haltung) || 'Filter lockern oder empfohlenes Ritual starten — hier übst du.') + '</p>' +
        '<div class="empty-cta">' +
        '<button type="button" class="primary" id="empty-start-recommended">Empfohlenes starten</button>' +
        '<button type="button" class="ghost" id="ritual-filter-reset">Filter zurücksetzen</button>' +
        '<button type="button" class="ghost" id="empty-goto-custom-from-filter">Eigenes anlegen</button></div></div>';
    }

    if (showSplit) {
      if (elLegacy) { elLegacy.hidden = true; elLegacy.innerHTML = ''; }
      if (elOwn) {
        elOwn.hidden = false;
        if (!ownList.length) {
          elOwn.innerHTML = emptyHtml();
        } else elOwn.innerHTML = ownList.map(ritualItemHtml).join('');
      }
      if (acc) {
        acc.hidden = false;
        // stay closed unless user opened; do not force-open
      }
      if (elShared) {
        elShared.innerHTML = sharedList.length
          ? sharedList.map(ritualItemHtml).join('')
          : '<p class="hint-sm">Keine Grundlagen in diesem Filter.</p>';
      }
    } else {
      if (acc) acc.hidden = true;
      if (elOwn) { elOwn.hidden = true; elOwn.innerHTML = ''; }
      if (elShared) elShared.innerHTML = '';
      if (elLegacy) {
        elLegacy.hidden = false;
        elLegacy.innerHTML = list.length ? list.map(ritualItemHtml).join('') : emptyHtml();
      }
    }

    const reset = $('#ritual-filter-reset');
    if (reset) reset.addEventListener('click', () => {
      ritualSearch = ''; ritualDurFilter = 'all'; ritualPathFilter = 'current';
      const s = $('#ritual-search'); if (s) s.value = '';
      const d = $('#ritual-filter-duration'); if (d) d.value = 'all';
      const pf = $('#ritual-filter-path'); if (pf) pf.value = 'current';
      renderRituale();
    });
    const go = $('#empty-goto-custom-from-filter');
    if (go) go.addEventListener('click', () => {
      $$('[data-rtab]').forEach(b => {
        const on = b.dataset.rtab === 'custom';
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== 'custom'));
    });
    const startRec = $('#empty-start-recommended');
    if (startRec) startRec.addEventListener('click', () => {
      let id = path && path.recommendedRitual;
      let r = id ? Rituals.getRitual(id) : null;
      if (!r || !(Rituals.isOwnForPath && Rituals.isOwnForPath(r, state.path))) {
        const own = (Rituals.listOwnForPath && Rituals.listOwnForPath(state.path)) || [];
        r = own[0] || null;
        id = r && r.id;
      }
      if (r) openRitual(r);
      else toast('Empfohlenes Ritual nicht gefunden', 2800, 'warn');
    });

    renderRitualTemplates();

    const customs = state.customRituals || [];
    const customEl = $('#custom-ritual-list');
    if (!customEl) { /* panel missing */ }
    else if (!customs.length) {
      customEl.innerHTML = '<div class="empty-state convert"><strong>Noch keine eigenen Rituale</strong>' +
        '<p>Lege Schritte als Titel|Text|Sekunden an — dein Tempo, deine Ethik. Oder starte zuerst ein Ritual aus deinem Pfad.</p>' +
        '<div class="empty-cta">' +
        '<button type="button" class="primary" id="empty-goto-custom">Oben anlegen</button>' +
        '<button type="button" class="ghost" id="empty-goto-library">Zur Bibliothek</button></div></div>';
      const go = $('#empty-goto-custom');
      if (go) go.addEventListener('click', () => {
        $$('[data-rtab]').forEach(b => {
          const on = b.dataset.rtab === 'custom';
          b.classList.toggle('active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== 'custom'));
        const name = $('#custom-ritual-name'); if (name) name.focus();
      });
      const lib = $('#empty-goto-library');
      if (lib) lib.addEventListener('click', () => {
        $$('[data-rtab]').forEach(b => {
          const on = b.dataset.rtab === 'guided';
          b.classList.toggle('active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== 'guided'));
      });
    } else {
      customEl.innerHTML = customs.map(r =>
        '<div class="ritual-item custom-ritual-row">' +
        '<button type="button" class="ritual-item-main" data-custom="' + escapeHtml(r.id) + '">' +
        '<span class="r-ico">✦</span><span><div class="r-name">' + escapeHtml(r.name) + '</div>' +
        '<div class="r-meta">' + (r.steps || []).length + ' Schritte</div></span></button>' +
        '<button type="button" class="ghost tiny" data-del-custom="' + escapeHtml(r.id) + '" aria-label="Eigenes Ritual löschen">Löschen</button>' +
        '</div>'
      ).join('');
    }

    const ritualRoots = '#ritual-list [data-ritual], #ritual-list-own [data-ritual], #ritual-list-shared [data-ritual]';
    const favRoots = '#ritual-list [data-fav], #ritual-list-own [data-fav], #ritual-list-shared [data-fav]';
    $$(ritualRoots).forEach(btn => {
      btn.addEventListener('click', () => openRitual(Rituals.getRitual(btn.dataset.ritual)));
    });
    $$(favRoots).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        Store.toggleRitualFavorite(btn.dataset.fav);
        refreshState();
        const nowFav = Store.isRitualFavorite(btn.dataset.fav);
        toast(nowFav ? 'Favorit gesetzt' : 'Favorit entfernt');
        Rituals.vibrate(15);
        renderRituale();
      });
    });
    $$('#custom-ritual-list [data-custom]').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = (state.customRituals || []).find(x => x.id === btn.dataset.custom);
        if (r) openRitual(r);
      });
    });
    $$('#custom-ritual-list [data-del-custom]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        Store.update(d => {
          d.customRituals = (d.customRituals || []).filter(x => x.id !== btn.dataset.delCustom);
        });
        afterPersist('Eigenes Ritual gelöscht', { checkBackup: false });
        refreshState();
        renderRituale();
      });
    });

    const activePanel = $$('[data-rpanel]:not(.hidden)')[0];
    const panel = activePanel && activePanel.getAttribute('data-rpanel');
    if (!panel || panel === 'karten') renderFeldkarten();
    if (!panel || panel === 'sigil') renderSigilGallery();
    renderPathWeek();
    renderPathWerkzeug();
  }

  function clearBreath() {
    if (breathTimer) { clearTimeout(breathTimer); clearInterval(breathTimer); breathTimer = null; }
  }


  /** Open Rituale tab; aliases sigil/karten → werkzeug + optional scroll. */
  function openRitualTab(tab, opts) {
    opts = opts || {};
    const alias = { sigil: 'werkzeug', karten: 'werkzeug', cards: 'werkzeug', tools: 'werkzeug' };
    const target = alias[tab] || tab || 'werkzeug';
    navigate('rituale', { force: true, keepRitualTab: true });
    $$('[data-rtab]').forEach(b => {
      const on = b.dataset.rtab === target;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== target));
    if (target === 'werkzeug') {
      if (typeof renderPathWerkzeug === 'function') renderPathWerkzeug();
      if (typeof renderSigilGallery === 'function') renderSigilGallery();
      if (typeof renderFeldkartenGrid === 'function') {
        try { renderFeldkartenGrid(); } catch (_) {}
      }
      const scrollId = opts.scroll || (tab === 'sigil' ? 'werkzeug-sigil' : tab === 'karten' ? 'werkzeug-karten' : null);
      if (scrollId) {
        setTimeout(() => {
          const el = document.getElementById(scrollId);
          if (el) try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
        }, 80);
      }
    }
    if (target === 'guided') {
      renderPathWeek();
      renderPathWerkzeug();
    }
  }

  function openRitual(ritual) {
    if (!ritual) return;
    if (ritualNeedsInitiationGate(ritual)) {
      openInitiationGate(ritual);
      return;
    }
    openRitualDirect(ritual);
  }

  function openRitualDirect(ritual) {
    if (ritual) setSitzungPhase('ritual', { ritualId: ritual.id, ritualName: ritual.name });
    if (!ritual) return;
    const runner = $('#ritual-runner');
    runner.classList.add('open');
    setThreshold(prefersReducedMotionNow() ? null : 'open');
    playRitualKlang('open');
    setQuietRitual(true);
    let stepIdx = 0;
    let remaining = 0;

    function showSafety() {
      const pathNow = currentPath();
      const pathSafe = (Paths.safetyItems && Paths.safetyItems(state.path)) || Rituals.SAFETY_ITEMS;
      const lead = (Paths.safetyLead && Paths.safetyLead(state.path)) || 'Vor der Arbeit — Grenze und Ausgleich.';
      const houseNote = ritual.houseOnly
        ? '<p class="notice ethics-line">Nur Hauspraxis — keine Initiation.</p>'
        : '';
      const items = pathSafe.map(s =>
        '<label><input type="checkbox" data-safe="' + s.id + '"> ' + escapeHtml(s.label) + '</label>'
      ).join('');
      $('#rr-content').innerHTML =
        '<div class="rr-step"><h2>Sicherheitscheck</h2>' +
        '<p class="section-sub">' + escapeHtml(lead) + '</p>' +
        (pathNow && pathNow.haltung ? '<p class="notice ethics-line">' + escapeHtml(pathNow.haltung) + '</p>' : '') +
        houseNote +
        '<div class="safety-check" style="text-align:left;width:100%">' + items + '</div>' +
        '<div class="rr-actions"><button type="button" class="primary" id="rr-safety-go" disabled>Schwelle betreten</button>' +
        '<button type="button" id="rr-cancel">Verlassen</button></div></div>';
      const boxes = $$('#rr-content [data-safe]');
      const go = $('#rr-safety-go');
      function sync() { go.disabled = !boxes.every(b => b.checked); }
      boxes.forEach(b => b.addEventListener('change', sync));
      go.addEventListener('click', () => { Rituals.vibrate(30); showStep(0); });
      $('#rr-cancel').addEventListener('click', closeRunner);
    }

    function startBreath(el, breathIn, breathOut) {
      clearBreath();
      if (!el) return;
      const tin = (breathIn || 4) * 1000;
      const tout = (breathOut || 6) * 1000;
      function cycle(next) {
        if (next === 'in') {
          el.textContent = 'Einatmen';
          el.classList.remove('exhale');
          el.classList.add('inhale');
          el.style.transitionDuration = (breathIn || 4) + 's';
          breathTimer = setTimeout(() => cycle('out'), tin);
        } else {
          el.textContent = 'Ausatmen';
          el.classList.remove('inhale');
          el.classList.add('exhale');
          el.style.transitionDuration = (breathOut || 6) + 's';
          breathTimer = setTimeout(() => cycle('in'), tout);
        }
      }
      cycle('in');
    }

    function showStep(i) {
      clearInterval(ritualTimer);
      clearBreath();
      stepIdx = i;
      const progress = Math.round((i / Math.max(ritual.steps.length, 1)) * 100);

      if (i >= ritual.steps.length) {
        const kind = ritual.practice369 ? '369' : 'ritual';
        Store.recordPractice(kind);
        Store.addPracticeLog({
          kind: kind,
          label: ritual.name || 'Ritual',
          detail: 'Geführtes Ritual abgeschlossen'
        });
        refreshState();
        showClosingFlow(ritual);
        return;
      }

      const step = ritual.steps[i];
      remaining = step.sec || 60;
      let extras = '';
      if (step.breath || ritual.breath) {
        extras += '<div class="breath-circle" id="rr-breath">Einatmen</div>';
      }
      if (step.candle || ritual.candle) {
        extras += '<div class="candle-flame" aria-hidden="true"><div class="flame"></div><div class="wick"></div></div>';
      }

      const intro = (Paths.stepIntro && Paths.stepIntro(state.path)) || '';
      const phase = step.phase || (i === 0 ? 'intention' : (i >= ritual.steps.length - 1 ? 'closing' : 'body'));
      const phaseLabel = phase === 'intention' ? 'Absicht' : (phase === 'closing' ? 'Schließen' : 'Praxis');
      const dur = (Rituals.durLabel && Rituals.durLabel(ritual.mins)) || ((ritual.mins || '?') + ' Min');
      const intentLine = (i === 0 && ritual.intention)
        ? '<p class="ritual-intention-line">' + escapeHtml(ritual.intention) + '</p>'
        : '';
      $('#rr-content').innerHTML =
        '<div class="rr-step">' +
        '<div class="rr-progress"><i style="width:' + progress + '%"></i></div>' +
        '<p class="section-sub"><span class="phase-chip phase-' + phase + '">' + phaseLabel + '</span> · Schritt ' + (i + 1) + ' / ' + ritual.steps.length +
        ' · ' + escapeHtml(dur) +
        (intro ? ' · ' + escapeHtml(intro) : '') + '</p>' +
        intentLine +
        '<h2>' + escapeHtml(step.title) + '</h2>' +
        extras +
        '<div class="rr-timer" id="rr-timer">' + formatSec(remaining) + '</div>' +
        '<p class="rr-text">' + escapeHtml(step.text) + '</p>' +
        '<div class="rr-actions">' +
        '<button type="button" class="primary" id="rr-next">Weiter im Kreis</button>' +
        '<button type="button" id="rr-skip-timer">Zeit lassen</button>' +
        '<button type="button" id="rr-cancel2">Verlassen</button></div></div>';

      if (step.breath || (ritual.breath && step.breath !== false && (step.breathIn || i === 0 || step.breath))) {
        const br = $('#rr-breath');
        if (br) startBreath(br, step.breathIn || 4, step.breathOut || 6);
      }

      if (step.slot369 && step.count369) {
        Store.set369({ [step.slot369]: step.count369 });
      }

      Rituals.vibrate(30);
      ritualTimer = setInterval(() => {
        remaining--;
        const t = $('#rr-timer');
        if (t) t.textContent = formatSec(Math.max(0, remaining));
        if (remaining <= 0) {
          clearInterval(ritualTimer);
          Rituals.vibrate([50, 30, 50]);
          showStep(i + 1);
        }
      }, 1000);
      $('#rr-next').addEventListener('click', () => { clearInterval(ritualTimer); showStep(i + 1); });
      $('#rr-skip-timer').addEventListener('click', () => { clearInterval(ritualTimer); showStep(i + 1); });
      $('#rr-cancel2').addEventListener('click', closeRunner);
    }

    $('#rr-title').textContent = ritual.name;
    showSafety();
  }

  let closingBreathTimer = null;
  function clearClosingBreath() {
    if (closingBreathTimer) {
      clearTimeout(closingBreathTimer);
      closingBreathTimer = null;
    }
  }

  /**
   * Fuller body-felt closing: Danken → Atmen → Erden → Siegeln → optional diary seed.
   * Used after guided rituals, 3-min starter, and focus sessions.
   */
  function showClosingFlow(ritual, opts) {
    opts = opts || {};
    clearInterval(ritualTimer);
    clearBreath();
    clearClosingBreath();
    const label = (ritual && ritual.name) || opts.label || 'Praxis';
    setSitzungPhase('schliessen', {
      ritualId: ritual && ritual.id || sitzung.ritualId,
      ritualName: label
    });
    const path = currentPath();
    const embodied = (path && path.haltung)
      ? ('Spüre: ' + path.haltung)
      : 'Füße auf dem Boden. Schultern sinken. Ein Atemzug länger aus als ein.';

    const runner = $('#ritual-runner');
    if (runner && !runner.classList.contains('open')) {
      runner.classList.add('open');
      setThreshold(prefersReducedMotionNow() ? null : 'open');
      setQuietRitual(true);
    }
    const titleEl = $('#rr-title');
    if (titleEl) titleEl.textContent = 'Abschluss · ' + label;

    const cw = (Paths.closingWords && Paths.closingWords(state.path)) || {};
    const CLOSING = [
      {
        id: 'danken',
        title: 'Danken',
        text: cw.danken || 'Danke dem Raum, dem Atem und der Absicht — ohne Forderung. Ein kurzer innerer Dank genügt.',
        ico: '🙏'
      },
      {
        id: 'atmen',
        title: 'Atmen',
        text: cw.atmen || 'Drei ruhige Züge: vier zählen ein, sechs aus. Der Kreis folgt dem Atem — Schwelle, kein Timer-Zwang.',
        ico: '🌬️',
        breath: true
      },
      {
        id: 'erden',
        title: 'Erden',
        text: (cw.erden || (embodied + ' Hände, Gesicht, ein Schluck Wasser wenn möglich. Du bist wieder im Körper.')),
        ico: '🌱'
      },
      {
        id: 'siegeln',
        title: 'Siegeln',
        text: cw.siegeln || '„Die Arbeit ist geschlossen.“ Grenze und Ausgleich. Kein Schaden an Personen. Schwelle gehalten.',
        ico: '🔒'
      },
      {
        id: 'seed',
        title: 'Ins Buch (optional)',
        text: 'Ein kurzer Satz und optional ein Foto — mit Ritualname und Pfad ins Magie-Buch. Kein Zwang.',
        ico: '📖',
        diary: true
      }
    ];
    let ci = 0;

    function finishClosing(msg, optsFinish) {
      optsFinish = optsFinish || {};
      clearClosingBreath();
      toast(msg || 'Schwelle gehalten — gute Praxis.');
      closeRunner();
      renderStreakLine();
      if (typeof renderJetztCard === 'function') renderJetztCard();
      const wentToBuch = !!optsFinish.goBuch;
      setSitzungPhase('buch', { savedToBuch: !!optsFinish.savedToBuch || wentToBuch });
      if (wentToBuch) {
        navigate('buch', { force: true, buchMode: 'eintrag' });
      } else {
        navigate('cockpit', { force: true, keepScroll: true });
        renderSitzungBar();
      }
    }

    function paint() {
      clearClosingBreath();
      const step = CLOSING[ci];
      const prog = Math.round(((ci + 1) / CLOSING.length) * 100);
      let extra = '';
      if (step.breath) {
        extra = '<div class="breath-circle closing-breath" id="rr-closing-breath" aria-live="polite" role="status">Bereit</div>' +
          '<p class="meta-line" style="text-align:center">4 / 6 · Schwelle</p>';
      }
      if (step.diary) {
        const jPrompt = (ritual && ritual.journal) || 'Kurze Reflexion: Was bleibt nach der Praxis…';
        extra = '<div class="form-row closing-seed-row">' +
          '<label class="sr-only" for="rr-closing-seed">Ritual-Reflexion (optional)</label>' +
          '<p class="hint-sm journal-prompt">' + escapeHtml(jPrompt) + '</p>' +
          '<textarea id="rr-closing-seed" maxlength="280" rows="3" placeholder="Dein Satz…"></textarea>' +
          '<div class="closing-photo-row">' +
          '<label class="btn ghost tiny">📷 Foto' +
          '<input type="file" id="rr-closing-photo" accept="image/*" capture="environment" hidden /></label>' +
          '<label class="btn ghost tiny">🖼️ Galerie' +
          '<input type="file" id="rr-closing-photo-gal" accept="image/*" hidden /></label>' +
          '<button type="button" class="ghost tiny" id="rr-closing-photo-clear" hidden>Entfernen</button>' +
          '<div class="diary-photo-preview closing-photo-preview" id="rr-closing-photo-preview" hidden>' +
          '<img id="rr-closing-photo-img" alt="Vorschau" /></div>' +
          '<p class="hint-sm honesty-photo">Fotos bleiben auf diesem Gerät, kein Upload.</p></div>' +
          '<p class="hint-sm">Optional · speichert direkt ins Magie-Buch mit Ritual + Pfad.</p></div>';
      }
      const isLast = ci >= CLOSING.length - 1;
      $('#rr-content').innerHTML =
        '<div class="rr-step closing-flow">' +
        '<div class="rr-progress"><i style="width:' + prog + '%"></i></div>' +
        '<p class="section-sub">Schwelle · ' + (ci + 1) + ' / ' + CLOSING.length + '</p>' +
        '<div class="closing-ico" aria-hidden="true">' + step.ico + '</div>' +
        '<h2>' + escapeHtml(step.title) + '</h2>' +
        '<p class="rr-text">' + escapeHtml(step.text) + '</p>' +
        extra +
        '<p class="notice ethics-line">Nach ' + escapeHtml(label) + '</p>' +
        '<div class="rr-actions">' +
        (step.diary
          ? '<button type="button" class="primary" id="rr-close-seed-save">📖 Ins Buch legen</button>' +
            '<button type="button" class="ghost" id="rr-done">Kreis schließen</button>'
          : (isLast
            ? '<button type="button" class="primary" id="rr-done">Kreis schließen</button>'
            : '<button type="button" class="primary" id="rr-close-next">Weiter im Kreis</button>')) +
        '<button type="button" class="ghost" id="rr-close-skip">Schwelle lassen</button></div></div>';

      Rituals.vibrate(ci === 0 ? [40, 40, 80] : 25);

      if (step.breath) {
        const el = $('#rr-closing-breath');
        function cycle(phase) {
          if (!el || !$('#ritual-runner').classList.contains('open')) return;
          if (phase === 'in') {
            el.textContent = 'Ein';
            el.classList.add('in');
            el.classList.remove('out');
            closingBreathTimer = setTimeout(() => cycle('out'), 4000);
          } else {
            el.textContent = 'Aus';
            el.classList.add('out');
            el.classList.remove('in');
            closingBreathTimer = setTimeout(() => cycle('in'), 6000);
          }
        }
        if (el) cycle('in');
      }

      const next = $('#rr-close-next');
      if (next) next.addEventListener('click', () => { ci++; paint(); });
      const done = $('#rr-done');
      if (done) done.addEventListener('click', () => finishClosing((Paths.closingToast && Paths.closingToast(state.path)) || 'Praxis gesiegelt — Schwelle gehalten.'));
      closingPendingPhoto = null;
      async function handleClosingPhoto(file) {
        if (!file || !Media) return;
        try {
          const packed = await Media.compressImage(file);
          closingPendingPhoto = {
            id: Media.uid('ph'),
            dataUrl: packed.dataUrl,
            blob: packed.blob,
            w: packed.w,
            h: packed.h
          };
          const prev = $('#rr-closing-photo-preview');
          const img = $('#rr-closing-photo-img');
          const clr = $('#rr-closing-photo-clear');
          if (img) img.src = packed.dataUrl;
          if (prev) prev.hidden = false;
          if (clr) clr.hidden = false;
          toast('📷 Vorschau');
        } catch (_) {
          toast('Foto fehlgeschlagen', 2800, 'warn');
        }
      }
      const cCam = $('#rr-closing-photo');
      const cGal = $('#rr-closing-photo-gal');
      if (cCam) cCam.addEventListener('change', e => {
        const f = e.target.files && e.target.files[0];
        if (f) handleClosingPhoto(f);
      });
      if (cGal) cGal.addEventListener('change', e => {
        const f = e.target.files && e.target.files[0];
        if (f) handleClosingPhoto(f);
      });
      const cClr = $('#rr-closing-photo-clear');
      if (cClr) cClr.addEventListener('click', () => {
        closingPendingPhoto = null;
        const prev = $('#rr-closing-photo-preview');
        const img = $('#rr-closing-photo-img');
        if (prev) prev.hidden = true;
        if (img) img.removeAttribute('src');
        cClr.hidden = true;
        if (cCam) cCam.value = '';
        if (cGal) cGal.value = '';
      });

      const seedSave = $('#rr-close-seed-save');
      if (seedSave) seedSave.addEventListener('click', async () => {
        const ta = $('#rr-closing-seed');
        const seed = ta ? String(ta.value || '').trim() : '';
        if (!seed && !closingPendingPhoto) {
          finishClosing('Schwelle gehalten — gute Praxis.');
          return;
        }
        try {
          let photoId = null;
          if (closingPendingPhoto && Media) {
            await Media.putPhoto(closingPendingPhoto.id, closingPendingPhoto.blob, {
              w: closingPendingPhoto.w, h: closingPendingPhoto.h, mime: 'image/jpeg'
            });
            photoId = closingPendingPhoto.id;
          }
          const moon = diaryMoonMeta(new Date());
          const bodyText = seed || (photoId ? '(Foto zur Praxis)' : '');
          if (Store.addRitualJournalEntry) {
            Store.addRitualJournalEntry({
              ritualId: ritual && ritual.id || null,
              ritualName: label,
              pathId: state.path,
              text: bodyText.slice(0, 280),
              photoId: photoId
            });
          }
          Store.update(d => {
            d.diary = d.diary || [];
            d.diary.push({
              id: Store.uid(),
              title: 'Nach ' + label,
              body: bodyText,
              tags: ['abschluss', 'ritual'],
              mood: null,
              created: new Date().toISOString(),
              photoId: photoId,
              pathId: state.path || null,
              ritualId: ritual && ritual.id || null,
              ritualName: label,
              moonPhase: moon.moonPhase,
              moonBucket: moon.moonBucket,
              moonEmoji: moon.moonEmoji
            });
          });
          closingPendingPhoto = null;
          toast('📖 Ins Buch gelegt');
          if (typeof renderRitualJournal === 'function') renderRitualJournal();
          finishClosing('Im Buch · Schwelle gehalten.', { goBuch: true, savedToBuch: true });
        } catch (_) {
          toast('Eintrag konnte nicht gespeichert werden', 3200, 'warn');
          finishClosing('Schwelle gehalten — gute Praxis.');
        }
      });
      const skip = $('#rr-close-skip');
      if (skip) skip.addEventListener('click', () => {
        finishClosing('Abschluss übersprungen — kehre bewusst zurück.');
      });
    }
    paint();
  }

  function closeRunner() {
    clearInterval(ritualTimer);
    clearBreath();
    clearClosingBreath();
    $('#ritual-runner').classList.remove('open');
    playRitualKlang('close');
    setThreshold(null);
    setQuietRitual(false);
  }

  function formatSec(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ':' + String(r).padStart(2, '0');
  }

  /* ——— Sigil ——— */
  function runSigil() {
    const intention = $('#sigil-input').value;
    const warn = $('#sigil-warn');
    const check = Sigil.isHarmful(intention);
    lastSigilOk = false;
    lastSigilLetters = '';
    const saveBtn = $('#sigil-save-gallery');
    if (saveBtn) saveBtn.classList.add('hidden');
    if (!check.ok) {
      warn.textContent = check.reason;
      warn.classList.add('show');
      $('#sigil-reduced').textContent = '';
      Rituals.vibrate([30, 40, 30]);
      return;
    }
    warn.classList.remove('show');
    const letters = Sigil.reduceStatement(intention);
    lastSigilLetters = letters;
    lastSigilOk = true;
    $('#sigil-reduced').textContent = 'Reduktion: ' + letters;
    const canvas = $('#sigil-canvas');
    Sigil.drawSigil(canvas, letters, { glow: false });
    $('#sigil-charge').classList.remove('hidden');
    $('#sigil-forget').classList.add('hidden');
    Rituals.vibrate(25);
  }

  function chargeSigil() {
    const canvas = $('#sigil-canvas');
    const letters = lastSigilLetters || $('#sigil-reduced').textContent.replace(/^Reduktion:\s*/, '');
    let n = 0;
    $('#sigil-charge').disabled = true;
    const iv = setInterval(() => {
      Sigil.drawSigil(canvas, letters, { glow: true, charge: n });
      n++;
      if (n > 10) {
        clearInterval(iv);
        Sigil.drawSigil(canvas, letters, { glow: true, charge: 3 });
        $('#sigil-charge').classList.add('hidden');
        $('#sigil-charge').disabled = false;
        $('#sigil-forget').classList.remove('hidden');
        const saveBtn = $('#sigil-save-gallery');
        if (saveBtn && lastSigilOk) saveBtn.classList.remove('hidden');
        Rituals.vibrate([40, 60, 40]);
      }
    }, 350);
  }

  function forgetSigil() {
    $('#sigil-input').value = '';
    $('#sigil-reduced').textContent = 'Absicht vergessen — Sigil bleibt als Form.';
    $('#sigil-forget').classList.add('hidden');
    const saveBtn = $('#sigil-save-gallery');
    if (saveBtn) saveBtn.classList.add('hidden');
  }

  function saveSigilToGallery() {
    if (!lastSigilOk || !lastSigilLetters) {
      toast('Erst ethisches Sigil erzeugen und laden');
      return;
    }
    const intention = ($('#sigil-input') && $('#sigil-input').value) || '';
    // Re-check ethics; never persist harmful intents (hash of blocked text also skipped)
    if (intention) {
      const check = Sigil.isHarmful(intention);
      if (!check.ok) { toast(check.reason); return; }
    }
    const canvas = $('#sigil-canvas');
    let dataURL = null;
    try {
      if (canvas) dataURL = canvas.toDataURL('image/png');
    } catch (_) { dataURL = null; }
    const hash = intention ? Store.hashIntention(intention) : Store.hashIntention(lastSigilLetters);
    Store.addSigilGalleryEntry({
      hash: hash,
      letters: lastSigilLetters,
      dataURL: dataURL
    });
    refreshState();
    renderSigilGallery();
    toast('Glyph in Galerie · nur Hash');
    Rituals.vibrate(20);
  }

  function clearSigilReviewBreath() {
    if (breathSoloReviewTimer) { clearTimeout(breathSoloReviewTimer); breathSoloReviewTimer = null; }
  }

  function restoreSigilFromGallery(item) {
    if (!item || !item.letters) {
      toast('Kein Glyph zum Ansehen');
      return;
    }
    clearSigilReviewBreath();
    lastSigilLetters = item.letters;
    lastSigilOk = false; // review-only — no re-save of forgotten intention
    lastSigilReview = true;
    const canvas = $('#sigil-canvas');
    if (canvas) Sigil.drawSigil(canvas, item.letters, { glow: false });
    const reduced = $('#sigil-reduced');
    if (reduced) reduced.textContent = 'Ansicht · Reduktion: ' + item.letters + ' · #' + (item.hash || '····');
    // Do not restore intention plaintext (never stored)
    const input = $('#sigil-input');
    if (input) input.value = '';
    const warn = $('#sigil-warn');
    if (warn) { warn.classList.remove('show'); warn.textContent = ''; }
    $('#sigil-charge').classList.add('hidden');
    $('#sigil-forget').classList.add('hidden');
    const saveBtn = $('#sigil-save-gallery');
    if (saveBtn) saveBtn.classList.add('hidden');
    const bar = $('#sigil-review-bar');
    if (bar) bar.hidden = false;
    const label = $('#sigil-review-label');
    if (label) label.textContent = 'Glyph zur Ansicht · #' + (item.hash || '····') + ' · nur lesen';
    openRitualTab('sigil', { scroll: 'werkzeug-sigil' });
    toast('Glyph auf Canvas · Ansicht');
    Rituals.vibrate(12);
  }

  function startSigilReviewBreath() {
    if (!lastSigilLetters) { toast('Zuerst Glyph ansehen'); return; }
    clearSigilReviewBreath();
    const canvas = $('#sigil-canvas');
    const letters = lastSigilLetters;
    let n = 0;
    const label = $('#sigil-review-label');
    if (label) label.textContent = 'Stiller Atem · nur lesen — Absicht bleibt vergessen';
    toast('Stiller Atem (Lesen)');
    Rituals.vibrate(15);
    function tick() {
      Sigil.drawSigil(canvas, letters, { glow: true, charge: Math.min(3, n / 3) });
      n++;
      if (n > 8) {
        Sigil.drawSigil(canvas, letters, { glow: true, charge: 2 });
        if (label) label.textContent = 'Atem gehalten · Glyph bleibt Ansicht';
        breathSoloReviewTimer = null;
        return;
      }
      breathSoloReviewTimer = setTimeout(tick, 400);
    }
    tick();
  }

  function closeSigilReview() {
    clearSigilReviewBreath();
    lastSigilReview = false;
    const bar = $('#sigil-review-bar');
    if (bar) bar.hidden = true;
    const canvas = $('#sigil-canvas');
    if (canvas && lastSigilLetters) Sigil.drawSigil(canvas, lastSigilLetters, { glow: false });
  }

  function renderSigilGallery() {
    const host = $('#sigil-gallery');
    const empty = $('#sigil-gallery-empty');
    if (!host) return;
    const list = Store.getSigilGallery();
    if (!list.length) {
      host.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    host.innerHTML = list.map(item => {
      const img = item.dataURL
        ? '<img src="' + item.dataURL + '" alt="Sigil ' + escapeHtml(item.letters || '') + '" />'
        : '<div class="sigil-gal-meta" style="min-height:90px;display:grid;place-items:center;font-family:var(--font-title)">' +
          escapeHtml(item.letters || '·') + '</div>';
      const when = item.at ? new Date(item.at).toLocaleString('de-CH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
      return '<div class="sigil-gal-item" data-sigil-id="' + escapeHtml(item.id) + '">' + img +
        '<div class="sigil-gal-meta">#' + escapeHtml(item.hash || '····') +
        (item.letters ? ' · ' + escapeHtml(item.letters) : '') +
        (when ? '<br />' + escapeHtml(when) : '') + '</div>' +
        '<div class="sigil-gal-actions">' +
        '<button type="button" class="ghost tiny" data-view-sigil="' + escapeHtml(item.id) + '">Ansehen</button>' +
        '<button type="button" class="ghost tiny forget-sigil" data-forget-sigil="' + escapeHtml(item.id) + '">Vergessen</button>' +
        '</div></div>';
    }).join('');
    $$('#sigil-gallery [data-forget-sigil]').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.removeSigilGalleryEntry(btn.dataset.forgetSigil);
        refreshState();
        renderSigilGallery();
        toast('Glyph vergessen');
      });
    });
    $$('#sigil-gallery [data-view-sigil]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = Store.getSigilGallery().find(x => x.id === btn.dataset.viewSigil);
        restoreSigilFromGallery(item);
      });
    });
  }

  /* ——— Standalone Atem ——— */
  function stopBreathSolo(silent) {
    const completedCycles = breathSoloCycles;
    breathSoloRunning = false;
    if (breathSoloTimer) { clearTimeout(breathSoloTimer); breathSoloTimer = null; }
    const stop = $('#breath-stop');
    const start = $('#breath-start');
    if (stop) stop.hidden = true;
    if (start) start.hidden = false;
    const circle = $('#breath-circle-solo');
    if (circle) {
      circle.classList.remove('inhale', 'exhale', 'hold');
      circle.textContent = 'Bereit';
    }
    if (completedCycles >= 1) {
      const modeLabel = breathSoloMode === 'box' ? 'Box 4–4–4–4' : '4/6';
      Store.recordPractice('atem');
      Store.addPracticeLog({
        kind: 'atem',
        label: 'Atem',
        detail: modeLabel + ' · ' + completedCycles + ' Zyklus' + (completedCycles === 1 ? '' : 'se')
      });
      refreshState();
      renderStreakLine();
      if (!silent) toast('Atem gehalten · ' + completedCycles + '×');
    } else if (!silent) {
      toast('Atem beendet');
    }
    breathSoloCycles = 0;
  }

  function startBreathSolo() {
    breathSoloRunning = false;
    if (breathSoloTimer) { clearTimeout(breathSoloTimer); breathSoloTimer = null; }
    breathSoloCycles = 0;
    breathSoloRunning = true;
    const stop = $('#breath-stop');
    const start = $('#breath-start');
    if (stop) stop.hidden = false;
    if (start) start.hidden = true;
    const circle = $('#breath-circle-solo');
    const label = $('#breath-phase-label');
    const mode = breathSoloMode === 'box' ? 'box' : '46';
    toast(mode === 'box' ? 'Box-Atmung 4–4–4–4' : 'Atembrücke 4/6');
    Rituals.vibrate(18);

    function setPhase(name, cls, sec, next) {
      if (!breathSoloRunning) return;
      if (circle) {
        circle.classList.remove('inhale', 'exhale', 'hold');
        circle.classList.add(cls);
        circle.style.transitionDuration = sec + 's';
        circle.textContent = name;
      }
      if (label) label.textContent = name + ' · ' + sec + 's · Zyklus ' + (breathSoloCycles + 1);
      breathSoloTimer = setTimeout(next, sec * 1000);
    }

    function cycle46() {
      setPhase('Einatmen', 'inhale', 4, () => {
        setPhase('Ausatmen', 'exhale', 6, () => {
          breathSoloCycles++;
          cycle46();
        });
      });
    }
    function cycleBox() {
      setPhase('Einatmen', 'inhale', 4, () => {
        setPhase('Halten', 'hold', 4, () => {
          setPhase('Ausatmen', 'exhale', 4, () => {
            setPhase('Halten', 'hold', 4, () => {
              breathSoloCycles++;
              cycleBox();
            });
          });
        });
      });
    }
    if (mode === 'box') cycleBox();
    else cycle46();
  }

  /* ——— Feldkarten ——— */
  function renderFeldkarten() {
    const grid = $('#feldkarten-grid');
    if (!grid) return;
    grid.innerHTML = Cards.FELDKARTEN.map(c =>
      '<button type="button" class="feldkarte" data-card="' + c.n + '">' +
      (Cards.artImgHtml ? Cards.artImgHtml(c, 'fk-art fk-art-grid') : '') +
      '<div class="fk-num">Feld ' + c.n + '</div>' +
      '<div class="fk-name">' + escapeHtml(c.name) + '</div>' +
      '<div class="fk-theme">' + escapeHtml(c.theme) + '</div></button>'
    ).join('');
    $$('.feldkarte').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = Cards.getCard(Number(btn.dataset.card));
        if (!card) return;
        revealCards([card], 'peek');
      });
    });
    renderDrawHistory();
    renderDailyCardPanel();
  }

  function renderDrawHistory() {
    const host = $('#draw-history');
    const empty = $('#draw-history-empty');
    if (!host) return;
    const hist = Store.getCardDrawHistory(8);
    if (!hist.length) {
      host.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    host.innerHTML = hist.map(h => {
      const names = (h.cards || []).map(c => c.name).join(' · ');
      const when = h.at ? new Date(h.at).toLocaleString('de-CH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
      const kind = h.kind === 'three' ? 'Dreierlege' : h.kind === 'daily' ? 'Tageskarte' : h.kind === 'peek' ? 'Blick' : 'Einzelzug';
      return '<button type="button" class="draw-hist-item" data-hist="' + escapeHtml(h.id) + '">' +
        '<span class="dh-kind">' + escapeHtml(kind) + '</span>' +
        '<span class="dh-names">' + escapeHtml(names) + '</span>' +
        '<span class="dh-when">' + escapeHtml(when) + '</span></button>';
    }).join('');
    $$('#draw-history [data-hist]').forEach(btn => {
      btn.addEventListener('click', () => {
        const h = Store.getCardDrawHistory(24).find(x => x.id === btn.dataset.hist);
        if (!h || !h.cards || !h.cards.length) return;
        if (h.kind === 'three' && h.cards.length >= 3) {
          const enriched = h.cards.map((c, i) => Object.assign({}, Cards.getCard(c.n) || c, {
            position: Cards.SPREAD_THREE[i]
          }));
          showSpread(enriched, true);
          $('#drawn-result').textContent = 'Aus Verlauf: ' + enriched.map(c => c.position.label + ' → ' + c.name).join(' · ');
        } else {
          const card = Cards.getCard(h.cards[0].n) || h.cards[0];
          playDrawReveal([card], true);
          $('#drawn-result').textContent = 'Aus Verlauf: ' + card.name + ' — ' + (card.theme || '');
        }
      });
    });
  }

  function resolveCardArt(card) {
    const full = Cards.getCard(card && card.n) || card || {};
    return Object.assign({}, full, card || {});
  }

  function cardFaceHtml(card, posLabel) {
    const c = resolveCardArt(card);
    return '<div class="draw-card-face">' +
      (posLabel ? '<div class="sp-pos">' + escapeHtml(posLabel) + '</div>' : '') +
      (Cards.artImgHtml ? Cards.artImgHtml(c, 'fk-art fk-art-face') : '') +
      '<div class="fk-num">Feld ' + c.n + '</div>' +
      '<div class="fk-name">' + escapeHtml(c.name) + '</div>' +
      '<div class="fk-theme">' + escapeHtml(c.theme || '') + '</div>' +
      (c.prompt ? '<div class="sp-prompt">' + escapeHtml(c.prompt) + '</div>' : '') +
      '</div>';
  }

  function playDrawReveal(cards, skipSave) {
    const stage = $('#draw-stage');
    const reduced = prefersReducedMotionNow();
    if (!stage) {
      finishReveal(cards, skipSave);
      return;
    }
    drawAnimating = true;
    if (!reduced) setThreshold('draw');
    stage.hidden = false;
    stage.classList.add('threshold-reveal');
    stage.innerHTML = cards.map((c, i) =>
      '<div class="draw-flip' + (reduced ? ' revealed' : '') + '" style="animation-delay:' + (i * 0.18) + 's">' +
      '<div class="draw-flip-inner">' +
      '<div class="draw-flip-back" aria-hidden="true"><span>◈</span></div>' +
      '<div class="draw-flip-front">' + cardFaceHtml(c, c.position && c.position.label) + '</div>' +
      '</div></div>'
    ).join('');
    Rituals.vibrate(cards.length > 1 ? [20, 30, 20, 30, 40] : 30);
    const delay = reduced ? 80 : 720 + cards.length * 180;
    setTimeout(() => {
      $$('#draw-stage .draw-flip').forEach(el => el.classList.add('revealed'));
      finishReveal(cards, skipSave);
      drawAnimating = false;
      setTimeout(() => {
        setThreshold(null);
        if (stage) stage.classList.remove('threshold-reveal');
      }, reduced ? 40 : 900);
    }, delay);
  }

  function finishReveal(cards, skipSave) {
    $$('.feldkarte').forEach(el => {
      el.classList.toggle('drawn', cards.some(c => c.n === Number(el.dataset.card)));
    });
    if (cards.length === 1) {
      $('#spread-area').classList.remove('show');
      $('#spread-area').innerHTML = '';
      const card = cards[0];
      $('#drawn-result').textContent = 'Enthüllt: ' + card.name + ' — ' + card.theme +
        (card.prompt ? '\n' + card.prompt : '');
      const el = $('[data-card="' + card.n + '"]');
      if (el) el.scrollIntoView({ behavior: (state.settings && state.settings.reducedMotion) ? 'auto' : 'smooth', block: 'nearest' });
    } else {
      // After flip animation, keep stage briefly then rely on spread-area
      setTimeout(() => {
        const stage = $('#draw-stage');
        if (stage && cards.length > 1) { stage.hidden = true; }
      }, 1200);
    }
    if (!skipSave) {
      const kind = cards.length >= 3 ? 'three' : 'one';
      Store.recordCardDraw({
        kind: kind,
        cards: cards.map(c => ({ n: c.n, name: c.name, theme: c.theme }))
      });
      refreshState();
      renderDrawHistory();
    }
  }

  function revealCards(cards, kind) {
    if (drawAnimating) return;
    if (kind === 'peek') {
      // Manual tap: highlight without writing history as a "draw"
      $$('.feldkarte').forEach(c => c.classList.remove('drawn'));
      const card = cards[0];
      const btn = $('[data-card="' + card.n + '"]');
      if (btn) btn.classList.add('drawn');
      $('#spread-area').classList.remove('show');
      $('#spread-area').innerHTML = '';
      const stage = $('#draw-stage');
      if (stage) { stage.hidden = true; stage.innerHTML = ''; }
      $('#drawn-result').textContent = card.name + ' — ' + card.theme + (card.prompt ? ' · ' + card.prompt : '');
      Rituals.vibrate(20);
      return;
    }
    if (cards.length >= 3) {
      playDrawReveal(cards, false);
      setTimeout(() => showSpread(cards, true), (state.settings && state.settings.reducedMotion) ? 100 : 900);
      $('#drawn-result').textContent = 'Dreierlege: ' + cards.map(c => c.position.label + ' → ' + c.name).join(' · ');
    } else {
      playDrawReveal(cards, false);
    }
  }

  function showSpread(cards, alreadySaved) {
    const area = $('#spread-area');
    area.innerHTML = cards.map((c, idx) => {
      const full = resolveCardArt(c);
      return '<div class="spread-card" style="animation-delay:' + (idx * 0.12) + 's">' +
      '<div class="sp-pos">' + escapeHtml(c.position.label) + '</div>' +
      (Cards.artImgHtml ? Cards.artImgHtml(full, 'fk-art fk-art-spread') : '') +
      '<div class="sp-name">' + escapeHtml(full.name) + '</div>' +
      '<div class="sp-theme">' + escapeHtml(full.theme) + '</div>' +
      '<div class="sp-prompt">' + escapeHtml(full.prompt || c.position.hint) + '</div>' +
      '</div>';
    }).join('');
    area.classList.add('show');
    $$('.feldkarte').forEach(el => {
      el.classList.toggle('drawn', cards.some(c => c.n === Number(el.dataset.card)));
    });
  }

  /* ——— Tagebuch ——— */
  function renderDiaryPrompts() {
    const host = $('#diary-prompts');
    if (!host) return;
    const prompts = Paths.diaryPrompts(state.path);
    host.innerHTML = prompts.map((p, i) =>
      '<button type="button" data-prompt="' + i + '">' + escapeHtml(p) + '</button>'
    ).join('');
    $$('#diary-prompts [data-prompt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = prompts[Number(btn.dataset.prompt)];
        const body = $('#diary-body');
        const title = $('#diary-title');
        if (body && !body.value.trim()) body.value = text;
        else if (body) body.value = (body.value.trim() + '\n\n' + text).trim();
        if (title && !title.value.trim()) title.value = 'Impuls';
        $$('#diary-prompts [data-prompt]').forEach(b => b.classList.toggle('picked', b === btn));
        toast('Impuls eingefügt');
      });
    });
  }

  function kindLabel(kind) {
    const map = { ritual: 'Ritual', '369': '369', atem: 'Atem', fokus: 'Fokus', praxis: 'Praxis', mond: 'Mond', sigil: 'Sigil', karte: 'Karte' };
    return map[kind] || (kind || 'Praxis');
  }


  function renderWeekReview() {
    const body = $('#week-review-body');
    const empty = $('#week-review-empty');
    if (!body || !Store.getWeeklyPracticeSummary) return;
    const sum = Store.getWeeklyPracticeSummary(7);
    if (!sum || sum.empty) {
      body.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    const kindOrder = ['ritual', '369', 'atem', 'fokus', 'mond', 'sigil', 'karte', 'praxis'];
    const chips = kindOrder
      .filter(k => sum.byKind[k])
      .map(k => '<span class="week-chip"><em>' + escapeHtml(kindLabel(k)) + '</em> ' + sum.byKind[k] + '</span>')
      .join('');
    const extra = Object.keys(sum.byKind).filter(k => kindOrder.indexOf(k) < 0);
    const extraChips = extra.map(k => '<span class="week-chip"><em>' + escapeHtml(kindLabel(k)) + '</em> ' + sum.byKind[k] + '</span>').join('');
    const hi = (sum.highlights || []).slice(0, 3).map(h => '<li>' + escapeHtml(h) + '</li>').join('');
    const tone = sum.total >= 7
      ? 'Stetige Praxis — die Woche trägt dich.'
      : sum.total >= 3
        ? 'Guter Rhythmus — weiter in Ruhe.'
        : 'Ein Anfang zählt — Qualität vor Menge.';
    body.innerHTML =
      '<div class="week-stats">' +
      '<div class="week-stat"><span class="week-n">' + sum.total + '</span><span class="week-l">Praxis</span></div>' +
      '<div class="week-stat"><span class="week-n">' + sum.activeDays + '</span><span class="week-l">Tage aktiv</span></div>' +
      '</div>' +
      '<div class="week-chips">' + chips + extraChips + '</div>' +
      (hi ? '<ul class="week-highlights">' + hi + '</ul>' : '') +
      '<p class="week-tone">' + escapeHtml(tone) + '</p>';
  }

  let deferredInstallPrompt = null;

  function appShareUrl() {
    try {
      return new URL('./', location.href).href;
    } catch (_) {
      return 'https://fxrebermanagement-star.github.io/universum/';
    }
  }

  async function shareAppRecommend() {
    const url = appShareUrl();
    const title = 'UNIVERSUM · Praxiswerkzeug';
    const text = 'UNIVERSUM: in 3 Minuten ernsthafte Praxis — lokal, ethisch, ohne Konto. Praxiswerkzeug zum Empfehlen.';
    const status = $('#empfehlen-status');
    try {
      if (navigator.share) {
        await navigator.share({ title: title, text: text, url: url });
        if (status) status.textContent = 'Geteilt — danke.';
        toast('Empfehlung geteilt');
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        if (status) status.textContent = 'Link kopiert.';
        toast('Link kopiert');
        return;
      }
    } catch (_) {}
    window.prompt('Link kopieren:', url);
  }

  async function copyAppLink() {
    const url = appShareUrl();
    const status = $('#empfehlen-status');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        if (status) status.textContent = 'Link kopiert.';
        toast('Link kopiert');
        return;
      }
    } catch (_) {}
    window.prompt('Link kopieren:', url);
  }

  async function promptPwaInstall() {
    const status = $('#empfehlen-status');
    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          toast('App wird installiert');
          if (status) status.textContent = 'Installiert — lokal auf dem Gerät.';
          dismissInstallBanner(true);
        } else if (status) {
          status.textContent = 'Installation abgebrochen — jederzeit über Browser-Menü.';
        }
      } catch (_) {
        showInstallBanner(true);
      }
      deferredInstallPrompt = null;
      const bp = $('#install-banner-prompt');
      if (bp) bp.hidden = true;
      return;
    }
    showInstallBanner(true);
    if (status) status.textContent = 'Siehe Installationshinweis — oder Browser-Menü „App installieren“.';
  }

    function isStandaloneDisplay() {
    try {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
      if (window.matchMedia && window.matchMedia('(display-mode: minimal-ui)').matches) return true;
      if (navigator.standalone === true) return true;
    } catch (_) {}
    return false;
  }

  function detectMobileInstallPlatform() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const isMobile = isIOS || isAndroid || /Mobile/i.test(ua);
    return { isIOS, isAndroid, isMobile };
  }

  function showInstallBanner(force) {
    const ban = $('#install-banner');
    if (!ban) return;
    if (isStandaloneDisplay()) {
      ban.hidden = true;
      return;
    }
    const plat = detectMobileInstallPlatform();
    if (!plat.isMobile && !force) {
      ban.hidden = true;
      return;
    }
    if (!force && Store.shouldShowInstallHint && !Store.shouldShowInstallHint()) {
      ban.hidden = true;
      return;
    }
    if (!force && !(state.onboarding && state.onboarding.done)) {
      ban.hidden = true;
      return;
    }
    const steps = $('#install-steps');
    const title = $('#install-banner-title');
    const text = $('#install-banner-text');
    // Offline-zuerst: Banner auch auf Desktop bei force; Copy betont Cache
    if (plat.isIOS) {
      if (title) title.textContent = 'Auf dem iPhone / iPad';
      if (text) text.textContent = 'Safari → Teilen → „Zum Home-Bildschirm“. Dann öffnet UNIVERSUM wie eine App — offline-fähig, lokal.';
      if (steps) {
        steps.innerHTML =
          '<li>Tippe auf <strong>Teilen</strong> (Quadrat mit Pfeil).</li>' +
          '<li>Wähle <strong>Zum Home-Bildschirm</strong>.</li>' +
          '<li>Bestätige „Hinzufügen“ — fertig.</li>';
      }
    } else if (plat.isAndroid) {
      if (title) title.textContent = 'Auf dem Android-Handy';
      if (text) text.textContent = 'Chrome-Menü → „App installieren“ oder „Zum Startbildschirm“. UNIVERSUM bleibt lokal auf dem Gerät.';
      if (steps) {
        steps.innerHTML =
          '<li>Öffne das <strong>Menü</strong> (⋮) im Browser.</li>' +
          '<li>Tippe <strong>App installieren</strong> / Zum Startbildschirm.</li>' +
          '<li>Bestätigen — Icon erscheint neben deinen Apps.</li>';
      }
    } else {
      if (title) title.textContent = 'Als App nutzen';
      if (text) text.textContent = 'Über das Browser-Menü „Zum Home-Bildschirm“ / Installieren — ideal auf dem Handy.';
      if (steps) {
        steps.innerHTML =
          '<li>Browser-Menü öffnen.</li>' +
          '<li>„Installieren“ oder „Zum Home-Bildschirm“ wählen.</li>';
      }
    }
    const promptBtn = $('#install-banner-prompt');
    if (promptBtn) promptBtn.hidden = !deferredInstallPrompt;
    ban.hidden = false;
  }

  function dismissInstallBanner(persist) {
    const ban = $('#install-banner');
    if (ban) ban.hidden = true;
    if (persist && Store.dismissInstallHint) {
      Store.dismissInstallHint();
      refreshState();
    }
  }

  function renderPracticeLog() {
    const host = $('#practice-log-timeline');
    const empty = $('#practice-log-empty');
    if (!host) return;
    const log = Store.getPracticeLog(24);
    if (!log.length) {
      host.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    host.innerHTML = log.map(item => {
      const when = item.at ? new Date(item.at).toLocaleString('de-CH', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      }) : '';
      return '<div class="plog-item" data-plog="' + escapeHtml(item.id) + '">' +
        '<div class="plog-rail" aria-hidden="true"></div>' +
        '<div class="plog-body">' +
        '<div class="plog-top"><span class="plog-kind">' + escapeHtml(kindLabel(item.kind)) + '</span>' +
        '<span class="plog-when">' + escapeHtml(when) + '</span></div>' +
        '<div class="plog-label">' + escapeHtml(item.label || 'Praxis') + '</div>' +
        (item.detail ? '<div class="plog-detail">' + escapeHtml(item.detail) + '</div>' : '') +
        '<button type="button" class="ghost tiny" data-del-plog="' + escapeHtml(item.id) + '">Löschen</button>' +
        '</div></div>';
    }).join('');
    $$('#practice-log-timeline [data-del-plog]').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.removePracticeLog(btn.dataset.delPlog);
        refreshState();
        renderPracticeLog();
        toast('Log-Eintrag gelöscht');
      });
    });
  }


  /* ——— Tagebuch-Fotos / Filter / Export (lokal) ——— */
  function diaryMoonMeta(date) {
    const moon = Astro.moonPhase ? Astro.moonPhase(date || new Date()) : null;
    if (!moon) return { moonPhase: null, moonBucket: null, moonEmoji: '' };
    const bucket = Paths.moonBucket ? Paths.moonBucket(moon.name) : null;
    return {
      moonPhase: moon.name || null,
      moonBucket: bucket,
      moonEmoji: moon.emoji || ''
    };
  }

  function clearDiaryPendingPhoto() {
    diaryPendingPhoto = null;
    const prev = $('#diary-photo-preview');
    const img = $('#diary-photo-preview-img');
    const clr = $('#diary-photo-clear');
    if (prev) prev.hidden = true;
    if (img) { img.removeAttribute('src'); }
    if (clr) clr.hidden = true;
    const cam = $('#diary-photo-camera');
    const gal = $('#diary-photo-gallery');
    if (cam) cam.value = '';
    if (gal) gal.value = '';
  }

  function setDiaryPendingPreview(dataUrl) {
    const prev = $('#diary-photo-preview');
    const img = $('#diary-photo-preview-img');
    const clr = $('#diary-photo-clear');
    if (img && dataUrl) img.src = dataUrl;
    if (prev) prev.hidden = !dataUrl;
    if (clr) clr.hidden = !dataUrl;
  }

  async function handleDiaryPhotoFile(file) {
    if (!file || !Media) return;
    try {
      toast('Foto wird komprimiert…', 1600);
      const packed = await Media.compressImage(file);
      const id = Media.uid('ph');
      diaryPendingPhoto = {
        id: id,
        dataUrl: packed.dataUrl,
        blob: packed.blob,
        w: packed.w,
        h: packed.h
      };
      setDiaryPendingPreview(packed.dataUrl);
      toast('📷 Vorschau bereit');
    } catch (e) {
      toast('Foto konnte nicht geladen werden', 3200, 'warn');
    }
  }

  async function openPhotoLightbox(photoId) {
    if (!photoId || !Media) return;
    const overlay = $('#photo-lightbox');
    const img = $('#photo-lightbox-img');
    if (!overlay || !img) return;
    try {
      const url = await Media.getDataUrl(photoId);
      if (!url) { toast('Foto nicht gefunden', 2400, 'warn'); return; }
      img.src = url;
      overlay.hidden = false;
      overlay.classList.add('open');
    } catch (_) {
      toast('Foto nicht lesbar', 2400, 'warn');
    }
  }

  function closePhotoLightbox() {
    const overlay = $('#photo-lightbox');
    const img = $('#photo-lightbox-img');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.hidden = true;
    }
    if (img) img.removeAttribute('src');
  }

  function populateDiaryFilterOptions() {
    refreshState();
    const entries = state.diary || [];
    const pathSel = $('#diary-filter-path');
    const ritSel = $('#diary-filter-ritual');
    const tagSel = $('#diary-filter-tag');
    if (pathSel) {
      const cur = diaryFilters.path || '';
      const paths = (Paths.PATHS || []).map(p => ({ id: p.id, name: p.name }));
      pathSel.innerHTML = '<option value="">Alle Pfade</option>' +
        paths.map(p => '<option value="' + escapeHtml(p.id) + '"' +
          (p.id === cur ? ' selected' : '') + '>' + escapeHtml(p.name) + '</option>').join('');
    }
    if (ritSel) {
      const cur = diaryFilters.ritual || '';
      const names = [];
      entries.forEach(e => {
        const n = (e.ritualName || '').trim();
        if (n && names.indexOf(n) < 0) names.push(n);
      });
      names.sort((a, b) => a.localeCompare(b, 'de'));
      ritSel.innerHTML = '<option value="">Alle Rituale</option>' +
        names.map(n => '<option value="' + escapeHtml(n) + '"' +
          (n === cur ? ' selected' : '') + '>' + escapeHtml(n) + '</option>').join('');
    }
    if (tagSel) {
      const cur = diaryFilters.tag || '';
      const tags = [];
      entries.forEach(e => {
        (e.tags || []).forEach(t => {
          const x = String(t).trim();
          if (x && tags.indexOf(x) < 0) tags.push(x);
        });
      });
      tags.sort((a, b) => a.localeCompare(b, 'de'));
      tagSel.innerHTML = '<option value="">Alle Tags</option>' +
        tags.map(t => '<option value="' + escapeHtml(t) + '"' +
          (t === cur ? ' selected' : '') + '>' + escapeHtml(t) + '</option>').join('');
    }
    const moonSel = $('#diary-filter-moon');
    if (moonSel) moonSel.value = diaryFilters.moon || '';
  }

  function filteredDiaryEntries() {
    const entries = (state.diary || []).slice().sort((a, b) => (b.created || '').localeCompare(a.created || ''));
    return entries.filter(e => {
      if (diaryFilters.path && e.pathId !== diaryFilters.path) return false;
      if (diaryFilters.moon) {
        const b = e.moonBucket || (e.moonPhase && Paths.moonBucket ? Paths.moonBucket(e.moonPhase) : '');
        if (b !== diaryFilters.moon) return false;
      }
      if (diaryFilters.ritual && (e.ritualName || '') !== diaryFilters.ritual) return false;
      if (diaryFilters.tag) {
        const tags = e.tags || [];
        if (tags.indexOf(diaryFilters.tag) < 0) return false;
      }
      return true;
    });
  }

  async function exportDiaryZip() {
    if (!Media) { toast('Medienmodul fehlt', 2400, 'warn'); return; }
    refreshState();
    const entries = (state.diary || []).slice().sort((a, b) => (b.created || '').localeCompare(a.created || ''));
    const files = [];
    const indexLines = [
      'UNIVERSUM · Magie-Buch ZIP',
      'App v' + (Store.APP_VERSION || '') + ' · ' + new Date().toISOString(),
      'Fotos bleiben lokal — kein Upload.',
      ''
    ];
    const photoIds = [];
    entries.forEach((e, i) => {
      const n = String(i + 1).padStart(3, '0');
      indexLines.push('--- ' + n + ' ---');
      indexLines.push((e.created || '') + ' · ' + (e.title || 'Ohne Titel'));
      if (e.pathId) indexLines.push('Pfad: ' + e.pathId);
      if (e.ritualName) indexLines.push('Ritual: ' + e.ritualName);
      if (e.moonPhase) indexLines.push('Mond: ' + e.moonPhase);
      if (e.tags && e.tags.length) indexLines.push('Tags: ' + e.tags.join(', '));
      indexLines.push(e.body || '');
      if (e.photoId) {
        indexLines.push('Foto: photos/' + e.photoId + '.jpg');
        photoIds.push(e.photoId);
      }
      indexLines.push('');
      files.push({
        name: 'eintraege/' + n + '.txt',
        data: [
          e.title || 'Ohne Titel',
          e.created || '',
          e.pathId ? 'Pfad: ' + e.pathId : '',
          e.ritualName ? 'Ritual: ' + e.ritualName : '',
          e.moonPhase ? 'Mond: ' + e.moonPhase : '',
          (e.tags || []).join(', '),
          '',
          e.body || ''
        ].filter((line, idx, arr) => line || idx === arr.length - 1).join('\n')
      });
    });
    files.unshift({ name: 'INHALT.txt', data: indexLines.join('\n') });
    // meta json without blobs
    files.push({
      name: 'buch-meta.json',
      data: JSON.stringify({
        app: 'UNIVERSUM',
        appVersion: Store.APP_VERSION,
        exportedAt: new Date().toISOString(),
        diary: entries.map(e => ({
          id: e.id, title: e.title, body: e.body, tags: e.tags, mood: e.mood,
          created: e.created, photoId: e.photoId || null, pathId: e.pathId || null,
          ritualId: e.ritualId || null, ritualName: e.ritualName || null,
          moonPhase: e.moonPhase || null, moonBucket: e.moonBucket || null
        }))
      }, null, 2)
    });
    toast('ZIP wird gebaut…', 2000);
    for (let i = 0; i < photoIds.length; i++) {
      const id = photoIds[i];
      try {
        const rec = await Media.getPhoto(id);
        if (rec && rec.blob) {
          files.push({ name: 'photos/' + id + '.jpg', data: rec.blob });
        }
      } catch (_) { /* skip */ }
    }
    const zip = await Media.buildZip(files);
    Media.downloadBlob(zip, 'universum-magie-buch.zip');
    toast('📦 ZIP gespeichert · lokal');
  }

  async function exportDiaryPrintable() {
    refreshState();
    const entries = (state.diary || []).slice().sort((a, b) => (b.created || '').localeCompare(a.created || ''));
    if (!entries.length) { toast('Buch ist leer', 2400, 'warn'); return; }
    toast('Druckansicht wird vorbereitet…', 1800);
    const blocks = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      let imgHtml = '';
      if (e.photoId && Media) {
        try {
          const du = await Media.getDataUrl(e.photoId);
          if (du) imgHtml = '<img class="print-photo" src="' + du + '" alt="" />';
        } catch (_) {}
      }
      const meta = [];
      if (e.pathId) {
        try { meta.push(Paths.getPath(e.pathId).name || e.pathId); } catch (_) { meta.push(e.pathId); }
      }
      if (e.ritualName) meta.push(e.ritualName);
      if (e.moonPhase) meta.push(e.moonPhase);
      if (e.mood) meta.push(e.mood);
      blocks.push(
        '<article class="pe">' +
        '<h2>' + escapeHtml(e.title || 'Ohne Titel') + '</h2>' +
        '<p class="pm">' + escapeHtml(e.created ? new Date(e.created).toLocaleString('de-CH') : '') +
        (meta.length ? ' · ' + escapeHtml(meta.join(' · ')) : '') + '</p>' +
        '<p class="pb">' + escapeHtml(e.body || '').replace(/\n/g, '<br/>') + '</p>' +
        (e.tags && e.tags.length ? '<p class="pt">' + escapeHtml(e.tags.join(', ')) + '</p>' : '') +
        imgHtml + '</article>'
      );
    }
    const html = '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"/><title>Magie-Buch</title>' +
      '<style>body{font-family:Georgia,serif;max-width:720px;margin:1.5rem auto;padding:0 1rem;color:#1a1220;background:#faf6f0}' +
      'h1{font-size:1.4rem}h2{font-size:1.1rem;margin:0 0 .25rem}.pm{color:#666;font-size:.85rem}' +
      '.pb{white-space:pre-wrap;line-height:1.45}.pt{font-size:.8rem;color:#555}.pe{border-bottom:1px solid #ddd;padding:1rem 0;break-inside:avoid}' +
      '.print-photo{max-width:100%;max-height:360px;border-radius:8px;margin-top:.6rem}' +
      '.note{font-size:.8rem;color:#666;margin-bottom:1.5rem}@media print{body{background:#fff}}</style></head><body>' +
      '<h1>📖 Magie-Buch · UNIVERSUM</h1>' +
      '<p class="note">Lokal auf diesem Gerät · kein Upload · App v' + escapeHtml(Store.APP_VERSION || '') +
      ' · ' + escapeHtml(new Date().toLocaleString('de-CH')) + '</p>' +
      blocks.join('') +
      '<script>setTimeout(function(){window.print()},400)</script></body></html>';
    const w = window.open('', '_blank');
    if (!w) { toast('Popup blockiert — bitte erlauben', 3600, 'warn'); return; }
    w.document.write(html);
    w.document.close();
  }

  function setBuchMode(mode) {
    buchMode = mode === 'eintrag' ? 'eintrag' : 'notiz';
    $$('[data-buch-mode]').forEach(btn => {
      const on = btn.dataset.buchMode === buchMode;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    $$('[data-buch-panel]').forEach(el => {
      el.hidden = el.dataset.buchPanel !== buchMode;
    });
  }

  function renderBuch() {
    refreshState();
    setBuchMode(buchMode);
    renderDiaryPrompts();
    renderWeekReview();
    renderPracticeLog();
    populateDiaryFilterOptions();
    renderBuchTimeline();
  }

  /** Alias for older call sites */
  function renderTagebuch() { renderBuch(); }
  function renderNotizen() { renderBuch(); }

  function renderBuchTimeline() {
    const list = $('#diary-list');
    if (!list) return;
    const diaryAll = state.diary || [];
    const notesAll = state.notes || [];
    const filteredDiary = filteredDiaryEntries();
    const filtersOn = !!(diaryFilters.path || diaryFilters.moon || diaryFilters.ritual || diaryFilters.tag);
    const countEl = $('#diary-filter-count');
    if (countEl) {
      const nNotes = notesAll.length;
      const nDiary = diaryAll.length;
      if (filtersOn) {
        countEl.textContent = filteredDiary.length + ' von ' + nDiary + ' Einträgen' +
          (nNotes ? ' · ' + nNotes + ' Notizen (ungefiltert)' : '');
      } else {
        const parts = [];
        if (nDiary) parts.push(nDiary + ' Einträge');
        if (nNotes) parts.push(nNotes + ' Notizen');
        countEl.textContent = parts.length ? parts.join(' · ') : '';
      }
    }

    const items = [];
    filteredDiary.forEach(e => {
      items.push({
        kind: e.ritualName ? 'ritual' : 'eintrag',
        sort: e.created || '',
        diary: e
      });
    });
    // Notes always visible (quick slips); filters apply to entries only
    if (!filtersOn || buchMode === 'notiz') {
      notesAll.forEach(n => {
        items.push({ kind: 'notiz', sort: n.updated || '', note: n });
      });
    } else {
      notesAll.forEach(n => {
        items.push({ kind: 'notiz', sort: n.updated || '', note: n });
      });
    }
    items.sort((a, b) => (b.sort || '').localeCompare(a.sort || ''));

    if (!diaryAll.length && !notesAll.length) {
      list.innerHTML = '<div class="empty-state"><strong>📖 Dein Magie-Buch ist noch leer</strong>' +
        '<p>Schreib eine schnelle Notiz oder einen vollen Eintrag mit Foto — lokal, nur hier.</p>' +
        '<div class="empty-cta">' +
        '<button type="button" class="primary" id="empty-buch-notiz">📝 Notiz</button>' +
        '<button type="button" class="ghost" id="empty-buch-eintrag">📖 Eintrag</button>' +
        '</div></div>';
      const bn = $('#empty-buch-notiz');
      const be = $('#empty-buch-eintrag');
      if (bn) bn.addEventListener('click', () => { setBuchMode('notiz'); const n = $('#note-input'); if (n) n.focus(); });
      if (be) be.addEventListener('click', () => {
        setBuchMode('eintrag');
        const first = $('#diary-prompts button');
        if (first) first.click();
        const t = $('#diary-title'); if (t) t.focus();
      });
      return;
    }

    if (filtersOn && !filteredDiary.length && !notesAll.length) {
      list.innerHTML = '<div class="empty-state compact"><strong>Keine Treffer</strong>' +
        '<p>Filter lockern oder zurücksetzen.</p></div>';
      return;
    }

    list.innerHTML = items.map(it => {
      if (it.kind === 'notiz') {
        const n = it.note;
        return '<div class="entry-card buch-notiz" data-note-id="' + escapeHtml(n.id) + '">' +
          '<div class="e-main">' +
          '<div class="e-date">' +
          '<span class="buch-badge notiz">Notiz</span> ' +
          escapeHtml(n.updated ? new Date(n.updated).toLocaleString('de-CH') : '') + '</div>' +
          '<div class="e-body">' + escapeHtml(n.text || '') + '</div>' +
          (n.tag ? '<div class="e-tags"><span class="e-tag">' + escapeHtml(n.tag) + '</span></div>' : '') +
          '<div class="e-actions">' +
          '<button type="button" class="primary tiny" data-note-to-diary="' + escapeHtml(n.id) + '">Als Eintrag</button>' +
          '<button type="button" data-del-note="' + escapeHtml(n.id) + '">Löschen</button></div>' +
          '</div></div>';
      }
      const e = it.diary;
      const badge = e.ritualName
        ? '<span class="buch-badge ritual">Ritual</span>'
        : '<span class="buch-badge eintrag">Eintrag</span>';
      const tags = (e.tags || []).map(t => '<span class="e-tag">' + escapeHtml(t) + '</span>').join('');
      const metaBits = [];
      if (e.ritualName) metaBits.push('🕯️ ' + e.ritualName);
      if (e.moonPhase) metaBits.push((e.moonEmoji || '🌙') + ' ' + e.moonPhase);
      if (e.pathId) {
        try {
          const pn = Paths.getPath(e.pathId);
          metaBits.push((pn.symbol || '✦') + ' ' + (pn.name || e.pathId));
        } catch (_) {}
      }
      const thumb = e.photoId
        ? '<button type="button" class="e-thumb" data-photo-id="' + escapeHtml(e.photoId) + '" aria-label="Foto vergrößern">' +
          '<img alt="" data-photo-src="' + escapeHtml(e.photoId) + '" /></button>'
        : '';
      return '<div class="entry-card' + (e.photoId ? ' has-photo' : '') + '" data-id="' + escapeHtml(e.id) + '">' +
        '<div class="e-main">' +
        '<div class="e-date">' + badge + ' ' +
        escapeHtml(e.created ? new Date(e.created).toLocaleString('de-CH') : '') +
        (e.mood ? '<span class="e-mood">· ' + escapeHtml(e.mood) + '</span>' : '') + '</div>' +
        '<div class="e-title">' + escapeHtml(e.title || 'Ohne Titel') + '</div>' +
        (metaBits.length ? '<div class="e-meta">' + escapeHtml(metaBits.join(' · ')) + '</div>' : '') +
        '<div class="e-body">' + escapeHtml(e.body || '') + '</div>' +
        (tags ? '<div class="e-tags">' + tags + '</div>' : '') +
        '<div class="e-actions"><button type="button" data-del-diary="' + escapeHtml(e.id) + '">Löschen</button></div>' +
        '</div>' + thumb + '</div>';
    }).join('');

    $$('[data-del-diary]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.delDiary;
        const entry = (state.diary || []).find(x => x.id === id);
        const photoId = entry && entry.photoId;
        Store.update(d => { d.diary = d.diary.filter(x => x.id !== id); });
        if (photoId && Media) {
          try { await Media.removePhoto(photoId); } catch (_) {}
        }
        renderBuch();
      });
    });
    $$('[data-note-to-diary]').forEach(btn => {
      btn.addEventListener('click', () => noteToDiary(btn.dataset.noteToDiary));
    });
    $$('[data-del-note]').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.update(d => { d.notes = d.notes.filter(x => x.id !== btn.dataset.delNote); });
        afterPersist('Notiz gelöscht', { checkBackup: false });
        refreshState();
        renderBuch();
      });
    });
    $$('[data-photo-id]').forEach(btn => {
      btn.addEventListener('click', () => openPhotoLightbox(btn.getAttribute('data-photo-id')));
    });
    $$('img[data-photo-src]').forEach(async img => {
      const pid = img.getAttribute('data-photo-src');
      if (!pid || !Media) return;
      try {
        const url = await Media.getDataUrl(pid);
        if (url) img.src = url;
      } catch (_) {}
    });
  }

  async function addDiary() {
    const title = $('#diary-title').value.trim();
    const body = $('#diary-body').value.trim();
    const tagsRaw = ($('#diary-tags').value || '').trim();
    if (!title && !body && !diaryPendingPhoto) return;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean).slice(0, 8) : [];
    const moon = diaryMoonMeta(new Date());
    let photoId = null;
    if (diaryPendingPhoto && Media) {
      try {
        await Media.putPhoto(diaryPendingPhoto.id, diaryPendingPhoto.blob, {
          w: diaryPendingPhoto.w, h: diaryPendingPhoto.h, mime: 'image/jpeg'
        });
        photoId = diaryPendingPhoto.id;
      } catch (e) {
        toast('Foto konnte nicht gespeichert werden', 3200, 'warn');
        return;
      }
    }
    Store.update(d => {
      d.diary.push({
        id: Store.uid(),
        title: title || (photoId ? 'Foto-Eintrag' : 'Eintrag'),
        body,
        tags,
        mood: diaryMood || null,
        created: new Date().toISOString(),
        photoId: photoId,
        pathId: state.path || null,
        ritualId: null,
        ritualName: null,
        moonPhase: moon.moonPhase,
        moonBucket: moon.moonBucket,
        moonEmoji: moon.moonEmoji
      });
    });
    if (!afterPersist('Eintrag im Magie-Buch')) {
      return;
    }
    $('#diary-title').value = '';
    $('#diary-body').value = '';
    $('#diary-tags').value = '';
    diaryMood = null;
    $$('#diary-mood-row [data-mood]').forEach(b => b.classList.remove('picked'));
    clearDiaryPendingPhoto();
    Rituals.vibrate(25);
    renderBuch();
  }

  function addNote() {
    const text = $('#note-input').value.trim();
    const tag = ($('#note-tag') && $('#note-tag').value.trim()) || '';
    if (!text) return;
    Store.update(d => {
      d.notes.push({ id: Store.uid(), text, tag: tag || null, updated: new Date().toISOString() });
    });
    if (!afterPersist('Notiz im Magie-Buch')) return;
    $('#note-input').value = '';
    if ($('#note-tag')) $('#note-tag').value = '';
    Rituals.vibrate(20);
    renderBuch();
  }

  function renderStreakLine() {
    const el = $('#streak-line');
    if (!el) return;
    const s = Store.getStreak();
    if (s.doneToday) {
      el.textContent = 'Streak: ' + s.count + ' Tag' + (s.count === 1 ? '' : 'e') + ' · heute schon Praxis.';
    } else if (s.alive && s.count > 0) {
      el.textContent = 'Streak: ' + s.count + ' Tag' + (s.count === 1 ? '' : 'e') + ' · heute noch offen.';
    } else {
      el.textContent = 'Streak: noch keine Praxis heute — ein Ritual oder 369 reicht.';
    }
  }

  /* ——— Focus timer ——— */
  function setFocusDisplay() {
    const el = $('#focus-timer');
    if (!el) return;
    const m = Math.floor(focusRemaining / 60);
    const s = focusRemaining % 60;
    el.textContent = m + ':' + String(s).padStart(2, '0');
  }

  function stopFocusTimer(silent) {
    if (focusTimer) { clearInterval(focusTimer); focusTimer = null; }
    setQuietRitual(false);
    const stop = $('#focus-stop');
    const start = $('#focus-start');
    if (stop) stop.hidden = true;
    if (start) start.hidden = false;
    if (!silent) toast('Stille beendet');
  }

  function startFocusTimer() {
    stopFocusTimer(true);
    focusRemaining = focusSelectedMins * 60;
    setFocusDisplay();
    const stop = $('#focus-stop');
    const start = $('#focus-start');
    if (stop) stop.hidden = false;
    if (start) start.hidden = true;
    setQuietRitual(true);
    toast('Stille · ' + focusSelectedMins + ' Min');
    Rituals.vibrate(20);
    focusTimer = setInterval(() => {
      focusRemaining--;
      setFocusDisplay();
      if (focusRemaining <= 0) {
        stopFocusTimer(true);
        Rituals.vibrate([40, 40, 80]);
        Store.recordPractice('fokus');
        Store.addPracticeLog({
          kind: 'fokus',
          label: 'Praxis-Helfer',
          detail: focusSelectedMins + ' Min Stille'
        });
        refreshState();
        renderStreakLine();
        focusRemaining = focusSelectedMins * 60;
        setFocusDisplay();
        showClosingFlow({ name: 'Fokus · ' + focusSelectedMins + ' Min' }, { label: 'Fokus · ' + focusSelectedMins + ' Min' });
      }
    }, 1000);
  }

  /* ——— Path modal ——— */
  function openPathModal() {
    const modal = $('#path-modal');
    modal.classList.add('open');
    const grid = $('#path-grid');
    grid.innerHTML = Paths.PATHS.map(p =>
      '<button type="button" class="path-btn' + (p.id === state.path ? ' active' : '') + '" data-path="' + p.id + '" aria-label="' + escapeHtml(p.name) + '">' +
      '<span class="path-btn-sym" aria-hidden="true">' + escapeHtml(p.symbol || '✦') + '</span>' +
      '<span class="path-btn-name">' + escapeHtml(p.name) + '</span>' +
      (p.haltung ? '<span class="path-btn-haltung">' + escapeHtml(p.haltung) + '</span>' : '') +
      '</button>'
    ).join('');
    $$('#path-grid [data-path]').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.update(d => { d.path = btn.dataset.path; });
        refreshState();
        applyPathTheme();
        ritualPathFilter = 'current';
        ritualSearch = '';
        ritualDurFilter = 'all';
        const s = $('#ritual-search'); if (s) s.value = '';
        const d = $('#ritual-filter-duration'); if (d) d.value = 'all';
        const pf = $('#ritual-filter-path'); if (pf) pf.value = 'current';
        const acc = $('#shared-rituals-accordion'); if (acc) acc.open = false;
        modal.classList.remove('open');
        Rituals.vibrate(25);
        toast('Haltung: ' + pathDisplayName() + ' — Rituale gewechselt');
        renderRituale();
        const active = $$('.section-view.active')[0];
        if (active) navigate(active.id.replace('sec-', ''), { force: true });
      });
    });
  }

  /* ——— Settings drawer ——— */
  function openSettings() {
    refreshState();
    const drawer = $('#settings-drawer');
    if (!drawer) return;
    drawer.hidden = false;
    const lat = $('#set-lat'); const lon = $('#set-lon');
    if (lat) lat.value = state.lat;
    if (lon) lon.value = state.lon;
    const hap = $('#set-haptics');
    if (hap) hap.checked = !(state.settings && state.settings.haptics === false);
    const live = $('#set-schumann-live');
    if (live) live.checked = schumannLiveEnabledFromState(state);
    const aud = $('#set-schumann-audio');
    if (aud) aud.checked = !!(state.settings && state.settings.schumannAudio);
    const amb = $('#set-ambient-tone');
    if (amb) amb.checked = !!(state.settings && state.settings.ambientTone);
    const klang = $('#set-ritual-klang');
    if (klang) klang.checked = !!(state.settings && state.settings.ritualKlang);
    const mot = $('#set-reduced-motion');
    if (mot) mot.checked = !!(state.settings && state.settings.reducedMotion);
    const moon = $('#set-mondnacht');
    if (moon) moon.checked = !!(state.settings && state.settings.mondnacht);
    const moonAuto = $('#set-mondnacht-auto');
    if (moonAuto) moonAuto.checked = !!(state.settings && state.settings.mondnachtAuto);
    const hourAl = $('#set-hour-alert');
    if (hourAl) hourAl.checked = !!(state.settings && state.settings.hourAlert);
    const quietR = $('#set-quiet-ritual');
    if (quietR) quietR.checked = !(state.settings && state.settings.quietDuringRitual === false);
    const stille = $('#set-stille-modus');
    if (stille) stille.checked = !!(state.settings && state.settings.stilleModus);
    const calPath = $('#set-calendar-path-only');
    if (calPath) calPath.checked = isCalendarPathOnly();
  }

  function closeSettings() {
    const drawer = $('#settings-drawer');
    if (drawer) drawer.hidden = true;
  }

  /* ——— Onboarding ——— */
  function showOnboardStep(n) {
    onboardStep = n;
    $$('[data-onboard-step]').forEach(el => {
      el.classList.toggle('hidden', Number(el.dataset.onboardStep) !== n);
    });
    const back = $('#onboard-back');
    const next = $('#onboard-next');
    const skip = $('#onboard-skip');
    if (back) back.hidden = n === 0;
    if (next) next.textContent = n >= 2 ? 'Praxis öffnen' : 'Weiter';
    if (skip) skip.hidden = false;
    $$('#onboard-progress [data-op]').forEach(dot => {
      const i = Number(dot.getAttribute('data-op'));
      dot.classList.toggle('on', i === n);
      dot.classList.toggle('done', i < n);
    });
    const lead = $('#onboard-lead');
    const titles = [
      'Dein Pfad',
      'In 3 Minuten',
      'Weiterempfehlen'
    ];
    const leads = [
      'Symbol tippen · Ethik bestätigen.',
      'Heute → Ritual → Schließen → Buch — ernsthaft, lokal.',
      'Wenn es stimmt: einem Kollegen zeigen. Dann Praxis.'
    ];
    const title = $('#onboard-title');
    if (title && titles[n]) title.textContent = titles[n];
    if (lead && leads[n]) lead.textContent = leads[n];
  }

  function openOnboarding() {
    const overlay = $('#onboard-overlay');
    if (!overlay) return;
    refreshState();
    onboardPath = state.path || 'esoterik';
    const grid = $('#onboard-paths');
    if (grid) {
      grid.innerHTML = Paths.PATHS.map(p =>
        '<button type="button" class="path-btn' + (p.id === onboardPath ? ' active' : '') + '" data-onboard-path="' + p.id + '" aria-label="' + escapeHtml(p.name) + '">' +
        '<span class="path-btn-sym" aria-hidden="true">' + escapeHtml(p.symbol || '✦') + '</span>' +
        '<span class="path-btn-name">' + escapeHtml(p.name) + '</span>' +
        '</button>'
      ).join('');
      $$('#onboard-paths [data-onboard-path]').forEach(btn => {
        btn.addEventListener('click', () => {
          onboardPath = btn.dataset.onboardPath;
          $$('#onboard-paths [data-onboard-path]').forEach(b => b.classList.toggle('active', b === btn));
        });
      });
    }
    const la = $('#onboard-lat'); const lo = $('#onboard-lon');
    if (la) la.value = state.lat;
    if (lo) lo.value = state.lon;
    const eth = $('#onboard-ethics');
    if (eth) eth.checked = false;
    overlay.hidden = false;
    showOnboardStep(0);
  }

  function closeOnboarding() {
    const overlay = $('#onboard-overlay');
    if (overlay) overlay.hidden = true;
  }

  function finishOnboarding() {
    const eth = $('#onboard-ethics');
    if (!eth || !eth.checked) {
      toast('Bitte Ethik bestätigen');
      showOnboardStep(0);
      return false;
    }
    const lat = parseFloat(($('#onboard-lat') && $('#onboard-lat').value) || '47.37');
    const lon = parseFloat(($('#onboard-lon') && $('#onboard-lon').value) || '8.54');
    Store.completeOnboarding({
      path: onboardPath || 'esoterik',
      lat: isNaN(lat) ? 47.37 : lat,
      lon: isNaN(lon) ? 8.54 : lon,
      ethicsAck: true
    });
    // Erste Minute: land with Jetzt ready (starter optional later via settings)
    try { if (Store.dismissStarterFlow) Store.dismissStarterFlow(); } catch (_) {}
    refreshState();
    applyMotionPref();
    applyPathTheme();
    closeOnboarding();
    toast('Bereit — Heute starten. Optional weiterempfehlen.');
    navigate('cockpit');
    renderStarterCard();
    renderJetztCard();
    setSitzungPhase('heute');
    setTimeout(() => {
      try {
        const card = $('#jetzt-card');
        if (card && !card.hidden) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (_) {}
    }, 350);
    setTimeout(() => { try { showInstallBanner(true); } catch (_) {} }, 900);
    return true;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildNav() {
    const nav = $('#bottom-nav');
    nav.innerHTML = SECTIONS.map(s =>
      '<button type="button" data-nav="' + s.id + '"><span class="ico">' + s.ico + '</span>' + s.name + '</button>'
    ).join('');
    $$('#bottom-nav [data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
  }

  function init() {
    buildNav();
    const now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();
    updateClock();
    setInterval(updateClock, 15000);
    applyMotionPref();
    applyMondnachtPref();
    applyStilleModus();
    // Re-check evening Mondnacht occasionally (local clock)
    setInterval(function () {
      try { applyMondnachtPref(); } catch (_) { /* ignore */ }
    }, 15 * 60 * 1000);
    applyPathTheme();
    syncQuietUi();
    setFocusDisplay();

    $('#path-chip').addEventListener('click', openPathModal);
    const settingsOpen = $('#settings-open');
    if (settingsOpen) settingsOpen.addEventListener('click', openSettings);
    const settingsFromCockpit = $('#open-settings-from-cockpit');
    if (settingsFromCockpit) settingsFromCockpit.addEventListener('click', openSettings);
    const settingsClose = $('#settings-close');
    if (settingsClose) settingsClose.addEventListener('click', closeSettings);

    const searchOpen = $('#global-search-open');
    if (searchOpen) searchOpen.addEventListener('click', openGlobalSearch);
    const searchClose = $('#global-search-close');
    if (searchClose) searchClose.addEventListener('click', closeGlobalSearch);
    const searchModal = $('#global-search-modal');
    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target.id === 'global-search-modal') closeGlobalSearch();
      });
    }
    function wireSearchPair(inputId, goId, resultsId, emptyId) {
      const inp = $(inputId);
      const go = $(goId);
      const res = $(resultsId);
      const empty = emptyId ? $(emptyId) : null;
      const run = () => runGlobalSearch(inp ? inp.value : '', res, empty);
      if (inp) {
        inp.addEventListener('input', run);
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); run(); }
        });
      }
      if (go) go.addEventListener('click', run);
    }
    wireSearchPair('#global-search-input-modal', '#global-search-go-modal', '#global-search-results-modal', '#global-search-empty');
    wireSearchPair('#global-search-input-cockpit', '#global-search-go-cockpit', '#global-search-results-cockpit', null);
    wireSearchPair('#global-search-input-settings', '#global-search-go-settings', '#global-search-results-settings', null);

    const mondStart = $('#mond-arbeit-start');
    if (mondStart) {
      mondStart.addEventListener('click', () => {
        const r = Rituals.getRitual(mondArbeitRitualId || 'intention');
        if (r) openRitual(r);
        else { navigate('rituale', { force: true }); toast('Ritual öffnen'); }
      });
    }
    const mondDiary = $('#mond-arbeit-diary');
    if (mondDiary) {
      mondDiary.addEventListener('click', () => {
        navigate('buch', { force: true });
        const moon = Astro.moonPhase(new Date());
        const kind = isPeakMoon(moon);
        const copy = mondArbeitCopy(kind || 'full');
        if ($('#diary-title')) $('#diary-title').value = copy.phase + ' · Mond-Arbeit';
        if ($('#diary-body')) $('#diary-body').value = copy.lead + '\n\n' + copy.practice;
        if ($('#diary-tags')) $('#diary-tags').value = 'Mond, ' + copy.phase;
        toast('Tagebuch vorbereitet');
      });
    }

    const tplSave = $('#custom-ritual-save-template');
    if (tplSave) tplSave.addEventListener('click', saveCurrentAsTemplate);
    const settingsDrawer = $('#settings-drawer');
    if (settingsDrawer) {
      settingsDrawer.addEventListener('click', (e) => {
        if (e.target.id === 'settings-drawer') closeSettings();
      });
    }
    $('#path-modal-close').addEventListener('click', () => $('#path-modal').classList.remove('open'));
    $('#path-modal').addEventListener('click', (e) => {
      if (e.target.id === 'path-modal') e.target.classList.remove('open');
    });

    $('#cal-prev').addEventListener('click', () => {
      calMonth--;
      if (calMonth < 0) { calMonth = 11; calYear--; }
      renderCalendar();
    });
    $('#cal-next').addEventListener('click', () => {
      calMonth++;
      if (calMonth > 11) { calMonth = 0; calYear++; }
      renderCalendar();
    });
    $('#cal-today').addEventListener('click', () => {
      const n = new Date();
      calYear = n.getFullYear();
      calMonth = n.getMonth();
      selectedDay = n;
      renderCalendar();
    });

    const calFilterPath = $('#cal-filter-path');
    const calFilterAll = $('#cal-filter-all');
    if (calFilterPath) {
      calFilterPath.addEventListener('click', () => {
        setCalendarPathOnly(true);
        renderCalendar();
        renderFestCountdown();
        try { renderCockpit(); } catch (_) { /* ignore */ }
        toast('Kalender: nur mein Pfad');
        Rituals.vibrate(12);
      });
    }
    if (calFilterAll) {
      calFilterAll.addEventListener('click', () => {
        setCalendarPathOnly(false);
        renderCalendar();
        renderFestCountdown();
        try { renderCockpit(); } catch (_) { /* ignore */ }
        toast('Kalender: alle Feste');
        Rituals.vibrate(12);
      });
    }

    $$('[data-tile]').forEach(t => t.addEventListener('click', () => navigate(t.dataset.tile)));

    $$('[data-checkin]').forEach(btn => {
      btn.addEventListener('click', () => {
        checkInVal = Number(btn.dataset.checkin);
        Store.update(d => { d.checkIn = checkInVal; });
        $$('[data-checkin]').forEach(b => b.classList.toggle('picked', b === btn));
        Rituals.vibrate(15);
        renderCockpit();
      });
    });

    // 369 tracker
    $$('[data-inc369]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slot = btn.dataset.inc369;
        const max = LIMITS_369[slot];
        const cur = Store.get369();
        const phrase = ($('#phrase-369') && $('#phrase-369').value.trim()) || cur.phrase || '';
        const next = Math.min(max, (cur[slot] || 0) + 1);
        Store.set369({ [slot]: next, phrase: phrase });
        const after = Store.get369();
        if ((after.morning || 0) >= 3 && (after.afternoon || 0) >= 6 && (after.evening || 0) >= 9) {
          Store.recordPractice('369');
          Store.addPracticeLog({ kind: '369', label: '369-Praxis', detail: '3 / 6 / 9 für heute voll' });
          refreshState();
          renderStreakLine();
          toast('369 für heute voll — Streak gehalten');
        }
        Rituals.vibrate(20);
        render369();
      });
    });
    const phraseEl = $('#phrase-369');
    if (phraseEl) {
      phraseEl.addEventListener('change', () => {
        Store.set369({ phrase: phraseEl.value.trim() });
      });
    }

    function applySchumannAudio(on) {
      Store.update(d => { d.settings.schumannAudio = !!on; });
      refreshState();
      Schumann.toggleAudio(!!on);
      const hidden = $('#schumann-audio');
      if (hidden) hidden.checked = !!on;
      const setAud = $('#set-schumann-audio');
      if (setAud) setAud.checked = !!on;
    }
    function applyHaptics(on) {
      Store.update(d => { d.settings.haptics = !!on; });
      refreshState();
      const hidden = $('#haptics-toggle');
      if (hidden) hidden.checked = !!on;
      const setH = $('#set-haptics');
      if (setH) setH.checked = !!on;
    }

    const audioToggle = $('#schumann-audio');
    if (audioToggle) {
      audioToggle.checked = !!(state.settings && state.settings.schumannAudio);
      audioToggle.addEventListener('change', () => applySchumannAudio(audioToggle.checked));
      if (audioToggle.checked) Schumann.toggleAudio(true);
    }
    const hap = $('#haptics-toggle');
    if (hap) {
      hap.checked = !(state.settings && state.settings.haptics === false);
      hap.addEventListener('change', () => applyHaptics(hap.checked));
    }

    const setLive = $('#set-schumann-live');
    if (setLive) {
      setLive.checked = schumannLiveEnabledFromState(state);
      setLive.addEventListener('change', () => {
        const on = !!setLive.checked;
        Store.update(d => {
          d.settings = d.settings || {};
          d.settings.schumannLiveEnabled = on;
        });
        refreshState();
        if (Schumann && Schumann.setLiveEnabled) {
          Schumann.setLiveEnabled(on).then(renderSchumannLiveUI);
        }
        toast(on ? 'Live-Stationsdaten an' : 'Live-Stationsdaten aus — lokale Visualisierung');
      });
    }
    const setAud = $('#set-schumann-audio');
    if (setAud) {
      setAud.checked = !!(state.settings && state.settings.schumannAudio);
      setAud.addEventListener('change', () => {
        applySchumannAudio(setAud.checked);
        toast(setAud.checked ? 'Schumann-Audio an' : 'Schumann-Audio aus');
      });
    }
    $$('[data-sch-refresh]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!Schumann || !Schumann.fetchNow) return;
        if (Schumann.refreshSpectrogram) Schumann.refreshSpectrogram();
        if (!schumannLiveEnabledFromState(state)) {
          toast('Live-Stationsdaten sind aus — unter Einstellungen einschalten');
          return;
        }
        btn.disabled = true;
        Schumann.fetchNow().then(snap => {
          renderSchumannLiveUI(snap);
          toast(snap && snap.status === 'live' ? 'Stationsdaten aktualisiert' : 'Offline — lokale Visualisierung');
        }).finally(() => { btn.disabled = false; });
      });
    });
    const setHap = $('#set-haptics');
    if (setHap) {
      setHap.checked = !(state.settings && state.settings.haptics === false);
      setHap.addEventListener('change', () => {
        applyHaptics(setHap.checked);
        toast(setHap.checked ? 'Haptik an' : 'Haptik aus');
      });
    }
    const setMot = $('#set-reduced-motion');
    if (setMot) {
      setMot.checked = !!(state.settings && state.settings.reducedMotion);
      setMot.addEventListener('change', () => {
        Store.update(d => { d.settings.reducedMotion = setMot.checked; });
        refreshState();
        applyMotionPref();
        toast(setMot.checked ? 'Bewegung reduziert' : 'Bewegung normal');
      });
    }
    const setMoon = $('#set-mondnacht');
    if (setMoon) {
      setMoon.checked = !!(state.settings && state.settings.mondnacht);
      setMoon.addEventListener('change', () => {
        Store.update(d => { d.settings.mondnacht = setMoon.checked; });
        refreshState();
        applyMondnachtPref();
        toast(setMoon.checked ? 'Mondnacht an — sanftes Licht' : 'Mondnacht aus');
        Rituals.vibrate(12);
      });
    }
    const setMoonAuto = $('#set-mondnacht-auto');
    if (setMoonAuto) {
      setMoonAuto.checked = !!(state.settings && state.settings.mondnachtAuto);
      setMoonAuto.addEventListener('change', () => {
        Store.update(d => { d.settings.mondnachtAuto = !!setMoonAuto.checked; });
        refreshState();
        applyMondnachtPref();
        toast(setMoonAuto.checked ? 'Mondnacht abends automatisch' : 'Mondnacht-Auto aus');
        Rituals.vibrate(12);
      });
    }
    const setHourAlert = $('#set-hour-alert');
    if (setHourAlert) {
      setHourAlert.checked = !!(state.settings && state.settings.hourAlert);
      setHourAlert.addEventListener('change', () => {
        Store.update(d => { d.settings.hourAlert = !!setHourAlert.checked; });
        refreshState();
        if (setHourAlert.checked) {
          hourAlertBootstrapped = false;
          checkPlanetaryHourAlert(true);
          toast('Planetenstunde-Wecker an — sanfte Erinnerung');
        } else {
          toast('Planetenstunde-Wecker aus');
        }
        Rituals.vibrate(12);
      });
    }

    function applyAmbientTone(on) {
      Store.update(d => { d.settings.ambientTone = !!on; });
      refreshState();
      Schumann.toggleAmbient(!!on);
      const setA = $('#set-ambient-tone');
      if (setA) setA.checked = !!on;
    }
    const setAmb = $('#set-ambient-tone');
    if (setAmb) {
      setAmb.checked = !!(state.settings && state.settings.ambientTone);
      setAmb.addEventListener('change', () => {
        applyAmbientTone(setAmb.checked);
        toast(setAmb.checked ? 'Ambient-Ton an (sehr leise)' : 'Ambient-Ton aus');
      });
      if (setAmb.checked) Schumann.toggleAmbient(true);
    }
    const setKlang = $('#set-ritual-klang');
    if (setKlang) {
      setKlang.checked = !!(state.settings && state.settings.ritualKlang);
      setKlang.addEventListener('change', () => {
        Store.update(d => { d.settings.ritualKlang = !!setKlang.checked; });
        refreshState();
        toast(setKlang.checked ? 'Ritual-Klang an (sehr leise)' : 'Ritual-Klang aus');
        if (setKlang.checked) playRitualKlang('open');
      });
    }

    bootSchumannLive();

    // Ritual library filters
    const rSearch = $('#ritual-search');
    if (rSearch) {
      rSearch.addEventListener('input', () => {
        ritualSearch = rSearch.value || '';
        renderRituale();
      });
    }
    const rDur = $('#ritual-filter-duration');
    if (rDur) {
      rDur.addEventListener('change', () => {
        ritualDurFilter = rDur.value || 'all';
        renderRituale();
      });
    }
    const rPath = $('#ritual-filter-path');
    if (rPath) {
      rPath.addEventListener('change', () => {
        ritualPathFilter = rPath.value || 'current';
        renderRituale();
      });
    }
    const setLocSave = $('#set-loc-save');
    if (setLocSave) {
      setLocSave.addEventListener('click', () => {
        const lat = parseFloat($('#set-lat').value);
        const lon = parseFloat($('#set-lon').value);
        if (isNaN(lat) || isNaN(lon)) { toast('Koordinaten prüfen'); return; }
        Store.update(d => { d.lat = lat; d.lon = lon; });
        refreshState();
        syncHiddenLocControls();
        renderCockpit();
        if ($('#sec-kosmos') && !$('#sec-kosmos').hidden) renderKosmos();
        toast('Ort am Altar gemerkt');
      });
    }
    const setZurich = $('#set-loc-zurich');
    if (setZurich) {
      setZurich.addEventListener('click', () => {
        if ($('#set-lat')) $('#set-lat').value = '47.37';
        if ($('#set-lon')) $('#set-lon').value = '8.54';
      });
    }
    const resetOnb = $('#set-reset-onboarding');
    if (resetOnb) {
      resetOnb.addEventListener('click', () => {
        Store.resetOnboarding();
        refreshState();
        closeSettings();
        openOnboarding();
        toast('Onboarding zurückgesetzt');
      });
    }
    const resetStarter = $('#set-reset-starter');
    if (resetStarter) {
      resetStarter.addEventListener('click', () => {
        if (Store.resetStarterFlow) Store.resetStarterFlow();
        refreshState();
        renderStarterCard();
        closeSettings();
        navigate('cockpit');
        toast('Erste Praxis wieder angeboten');
      });
    }
    const setQuietRitualEl = $('#set-quiet-ritual');
    if (setQuietRitualEl) {
      setQuietRitualEl.checked = !(state.settings && state.settings.quietDuringRitual === false);
      setQuietRitualEl.addEventListener('change', () => {
        Store.update(d => { d.settings.quietDuringRitual = !!setQuietRitualEl.checked; });
        refreshState();
        if (!setQuietRitualEl.checked) setQuietRitual(false);
        toast(setQuietRitualEl.checked ? 'Chrome bei Ritual aus' : 'Chrome bei Ritual bleibt');
      });
    }
    const setStilleEl = $('#set-stille-modus');
    if (setStilleEl) {
      setStilleEl.checked = !!(state.settings && state.settings.stilleModus);
      setStilleEl.addEventListener('change', () => {
        setStilleModus(!!setStilleEl.checked);
        toast(setStilleEl.checked ? 'Stille — nur Heute und ein Ritual' : 'Stille verlassen');
      });
    }
    const setCalPathOnly = $('#set-calendar-path-only');
    if (setCalPathOnly) {
      setCalPathOnly.checked = isCalendarPathOnly();
      setCalPathOnly.addEventListener('change', () => {
        setCalendarPathOnly(!!setCalPathOnly.checked);
        try { renderCalendar(); } catch (_) { /* ignore */ }
        renderFestCountdown();
        try { renderCockpit(); } catch (_) { /* ignore */ }
        toast(setCalPathOnly.checked ? 'Kalender: nur mein Pfad' : 'Kalender: alle Feste');
      });
    }
    const quietToggle = $('#quiet-mode-toggle');
    if (quietToggle) quietToggle.addEventListener('click', toggleQuietManual);
    const quietExit = $('#quiet-exit-chip');
    if (quietExit) quietExit.addEventListener('click', () => {
      quietManual = false;
      quietRitual = false;
      syncQuietUi();
      toast('Chrome wieder sichtbar');
    });
    const stilleExit = $('#stille-exit-chip');
    if (stilleExit) stilleExit.addEventListener('click', () => {
      setStilleModus(false);
      toast('Stille verlassen — alles wieder da');
    });
    const festChip = $('#fest-countdown-chip');
    if (festChip) {
      festChip.addEventListener('click', () => {
        const next = nextSabbatInfo(new Date());
        if (next && next.date) {
          calYear = next.date.getFullYear();
          calMonth = next.date.getMonth();
          selectedDay = next.date;
        }
        navigate('kalender');
      });
    }
    const starterStart = $('#starter-start');
    if (starterStart) starterStart.addEventListener('click', openStarterFlow);
    const starterDismiss = $('#starter-dismiss');
    if (starterDismiss) {
      starterDismiss.addEventListener('click', () => {
        if (Store.dismissStarterFlow) Store.dismissStarterFlow();
        refreshState();
        renderStarterCard();
        renderJetztCard();
        toast('Später — Karte ausgeblendet');
      });
    }
    const jetztStart = $('#jetzt-start');
    if (jetztStart) {
      jetztStart.addEventListener('click', () => {
        const id = jetztStart.dataset.ritual || ($('#briefing-practice') && $('#briefing-practice').dataset.ritual) || pathOwnRitualId() || currentPath().recommendedRitual;
        const r = Rituals.getRitual(id);
        setSitzungPhase('heute', { ritualId: id || null, ritualName: r ? r.name : null, savedToBuch: false });
        if (r) {
          setSitzungPhase('ritual', { ritualId: r.id, ritualName: r.name });
          navigate('rituale');
          openRitual(r);
        } else {
          navigate('rituale');
          toast('Ritual wählen — Sitzung wartet');
        }
      });
    }
    const sitzungCta = $('#sitzung-cta');
    if (sitzungCta) sitzungCta.addEventListener('click', () => sitzungCtaAction());
    const sitzungDismiss = $('#sitzung-dismiss');
    if (sitzungDismiss) sitzungDismiss.addEventListener('click', () => {
      sitzung.visible = false;
      sitzung.phase = 'idle';
      renderSitzungBar();
    });
    const jetztStarter = $('#jetzt-starter');
    if (jetztStarter) jetztStarter.addEventListener('click', openStarterFlow);
    const starterNext = $('#starter-flow-next');
    if (starterNext) starterNext.addEventListener('click', advanceStarterFlow);
    const starterBack = $('#starter-flow-back');
    if (starterBack) {
      starterBack.addEventListener('click', () => {
        if (starterStep > 0) {
          clearStarterBreath();
          starterStep -= 1;
          paintStarterStep();
        }
      });
    }
    const starterCancel = $('#starter-flow-cancel');
    if (starterCancel) starterCancel.addEventListener('click', () => {
      closeStarterFlow();
      toast('Einstieg geschlossen');
    });

    // Focus timer
    $$('[data-focus-mins]').forEach(btn => {
      btn.addEventListener('click', () => {
        focusSelectedMins = Number(btn.dataset.focusMins) || 5;
        $$('[data-focus-mins]').forEach(b => b.classList.toggle('picked', b === btn));
        if (!focusTimer) {
          focusRemaining = focusSelectedMins * 60;
          setFocusDisplay();
        }
      });
    });
    const focusStart = $('#focus-start');
    if (focusStart) focusStart.addEventListener('click', startFocusTimer);
    const focusStop = $('#focus-stop');
    if (focusStop) focusStop.addEventListener('click', () => stopFocusTimer(false));

    // Briefing actions
    const brStart = $('#briefing-start-practice');
    if (brStart) {
      brStart.addEventListener('click', () => {
        const id = ($('#briefing-practice') && $('#briefing-practice').dataset.ritual) || pathOwnRitualId() || currentPath().recommendedRitual;
        const r = Rituals.getRitual(id);
        if (r) { navigate('rituale'); openRitual(r); }
        else navigate('rituale');
      });
    }
    const brCal = $('#briefing-open-kalender');
    if (brCal) {
      brCal.addEventListener('click', () => {
        const next = Paths.nextFestival(new Date(), state.path);
        if (next && next.date) {
          calYear = next.date.getFullYear();
          calMonth = next.date.getMonth();
          selectedDay = next.date;
        }
        navigate('kalender');
      });
    }

    // Kosmos tap
    const radar = $('#radar-canvas');
    if (radar) {
      radar.addEventListener('click', (e) => {
        const rect = radar.getBoundingClientRect();
        const scaleX = (radar.width / (window.devicePixelRatio || 1)) / rect.width;
        const scaleY = (radar.height / (window.devicePixelRatio || 1)) / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        let best = null; let bestDist = 22;
        radarHits.forEach(h => {
          const d = Math.hypot(h.x - x, h.y - y);
          if (d < bestDist) { bestDist = d; best = h; }
        });
        if (best) showPlanetDetail(best.name);
      });
    }
    const kosmosCta = $('#kosmos-ritual-cta');
    if (kosmosCta) {
      kosmosCta.addEventListener('click', () => {
        const id = kosmosCta.dataset.ritual;
        const r = id && Rituals.getRitual(id);
        if (r) { navigate('rituale', { force: true }); openRitual(r); }
        else { navigate('rituale', { force: true }); toast('Rituale öffnen'); }
      });
    }
    const kosmosToR = $('#kosmos-to-rituale');
    if (kosmosToR) kosmosToR.addEventListener('click', () => navigate('rituale', { force: true }));
    const kosmosLocSave = $('#kosmos-loc-save');
    if (kosmosLocSave) kosmosLocSave.addEventListener('click', saveKosmosLocation);
    const kosmosZurich = $('#kosmos-loc-zurich');
    if (kosmosZurich) {
      kosmosZurich.addEventListener('click', () => {
        if ($('#kosmos-lat')) $('#kosmos-lat').value = '47.37';
        if ($('#kosmos-lon')) $('#kosmos-lon').value = '8.54';
      });
    }
    const kosmosOpenSet = $('#kosmos-open-settings');
    if (kosmosOpenSet) kosmosOpenSet.addEventListener('click', () => openSettings());

    const kosmosClose = $('#kosmos-detail-close');
    if (kosmosClose) kosmosClose.addEventListener('click', () => {
      const box = $('#kosmos-detail');
      if (box) box.hidden = true;
    });

    // Onboarding controls · Erste Minute (Pfad → Einladung → fertig)
    const onbNext = $('#onboard-next');
    if (onbNext) {
      onbNext.addEventListener('click', () => {
        if (onboardStep === 0) {
          const eth = $('#onboard-ethics');
          if (!eth || !eth.checked) {
            toast('Bitte Ethik bestätigen');
            return;
          }
          if (!onboardPath) onboardPath = 'esoterik';
          showOnboardStep(1);
          return;
        }
        if (onboardStep === 1) {
          showOnboardStep(2);
          return;
        }
        finishOnboarding();
      });
    }
    const onbBack = $('#onboard-back');
    if (onbBack) {
      onbBack.addEventListener('click', () => {
        if (onboardStep > 0) showOnboardStep(onboardStep - 1);
      });
    }
    const onbSkip = $('#onboard-skip');
    if (onbSkip) {
      onbSkip.addEventListener('click', () => {
        const eth = $('#onboard-ethics');
        if (!eth || !eth.checked) {
          toast('Bitte Ethik bestätigen, dann Überspringen');
          showOnboardStep(0);
          return;
        }
        if (!onboardPath) onboardPath = 'esoterik';
        finishOnboarding();
      });
    }
    const onbZurich = $('#onboard-zurich');
    if (onbZurich) {
      onbZurich.addEventListener('click', () => {
        if ($('#onboard-lat')) $('#onboard-lat').value = '47.37';
        if ($('#onboard-lon')) $('#onboard-lon').value = '8.54';
        toast('Zürich gesetzt');
      });
    }
    const onbShare = $('#onboard-share');
    if (onbShare) onbShare.addEventListener('click', async () => {
      await shareAppRecommend();
      const st = $('#onboard-share-status');
      if (st) st.textContent = 'Danke — Link geteilt oder kopiert.';
    });
    const onbCopy = $('#onboard-copy');
    if (onbCopy) onbCopy.addEventListener('click', async () => {
      await copyAppLink();
      const st = $('#onboard-share-status');
      if (st) st.textContent = 'Link kopiert — einem Kollegen schicken.';
    });


    // Install hint (mobile Pages / PWA coach) + Empfehlen
    const instOk = $('#install-banner-ok');
    if (instOk) instOk.addEventListener('click', () => dismissInstallBanner(true));
    const instLater = $('#install-banner-later');
    if (instLater) instLater.addEventListener('click', () => dismissInstallBanner(false));
    const instPrompt = $('#install-banner-prompt');
    if (instPrompt) instPrompt.addEventListener('click', () => { promptPwaInstall(); });

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      const bp = $('#install-banner-prompt');
      if (bp) bp.hidden = false;
      const empInst = $('#empfehlen-install');
      if (empInst) empInst.classList.add('has-prompt');
      setTimeout(() => { try { showInstallBanner(false); } catch (_) {} }, 400);
    });
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      dismissInstallBanner(true);
      const st = $('#empfehlen-status');
      if (st) st.textContent = 'Installiert — öffnet wie eine App, Daten bleiben lokal.';
      toast('UNIVERSUM installiert');
    });

    const empShare = $('#empfehlen-share');
    if (empShare) empShare.addEventListener('click', () => { shareAppRecommend(); });
    const empCopy = $('#empfehlen-copy');
    if (empCopy) empCopy.addEventListener('click', () => { copyAppLink(); });
    const empInstBtn = $('#empfehlen-install');
    if (empInstBtn) empInstBtn.addEventListener('click', () => { promptPwaInstall(); });

    window.addEventListener('online', updateOfflineHonesty);
    window.addEventListener('offline', updateOfflineHonesty);
    updateOfflineHonesty();
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(() => updateOfflineHonesty()).catch(() => {});
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        updateOfflineHonesty();
        toast('Offline-Shell aktualisiert', 2200);
      });
    }

    const setInst = $('#set-install-app');
    if (setInst) setInst.addEventListener('click', () => { promptPwaInstall(); });
    const setShare = $('#set-share-app');
    if (setShare) setShare.addEventListener('click', () => { shareAppRecommend(); });

    // Diary mood
    $$('#diary-mood-row [data-mood]').forEach(btn => {
      btn.addEventListener('click', () => {
        diaryMood = diaryMood === btn.dataset.mood ? null : btn.dataset.mood;
        $$('#diary-mood-row [data-mood]').forEach(b => b.classList.toggle('picked', b.dataset.mood === diaryMood));
      });
    });

    $('#diary-add').addEventListener('click', () => { addDiary(); });
    const dCam = $('#diary-photo-camera');
    const dGal = $('#diary-photo-gallery');
    if (dCam) dCam.addEventListener('change', e => {
      const f = e.target.files && e.target.files[0];
      if (f) handleDiaryPhotoFile(f);
    });
    if (dGal) dGal.addEventListener('change', e => {
      const f = e.target.files && e.target.files[0];
      if (f) handleDiaryPhotoFile(f);
    });
    const dClr = $('#diary-photo-clear');
    if (dClr) dClr.addEventListener('click', () => clearDiaryPendingPhoto());
    const lbClose = $('#photo-lightbox-close');
    if (lbClose) lbClose.addEventListener('click', closePhotoLightbox);
    const lb = $('#photo-lightbox');
    if (lb) lb.addEventListener('click', e => { if (e.target === lb) closePhotoLightbox(); });

    function bindDiaryFilter(selId, key) {
      const el = $(selId);
      if (!el) return;
      el.addEventListener('change', () => {
        diaryFilters[key] = el.value || '';
        renderTagebuch();
      });
    }
    bindDiaryFilter('#diary-filter-path', 'path');
    bindDiaryFilter('#diary-filter-moon', 'moon');
    bindDiaryFilter('#diary-filter-ritual', 'ritual');
    bindDiaryFilter('#diary-filter-tag', 'tag');
    const fReset = $('#diary-filter-reset');
    if (fReset) fReset.addEventListener('click', () => {
      diaryFilters = { path: '', moon: '', ritual: '', tag: '' };
      ['#diary-filter-path', '#diary-filter-moon', '#diary-filter-ritual', '#diary-filter-tag'].forEach(id => {
        const el = $(id); if (el) el.value = '';
      });
      renderTagebuch();
    });

    const zipBtn = $('#diary-export-zip');
    if (zipBtn) zipBtn.addEventListener('click', () => { exportDiaryZip(); });
    const printBtn = $('#diary-export-print');
    if (printBtn) printBtn.addEventListener('click', () => { exportDiaryPrintable(); });

    $('#diary-export').addEventListener('click', async () => {
      let embedded = 0;
      try {
        if (Store.exportBuchAsync) {
          const r = await Store.exportBuchAsync();
          embedded = (r && r.embedded) || 0;
        } else {
          Store.exportBuch();
        }
      } catch (_) {
        Store.exportBuch();
      }
      if (Store.markBackupExported) {
        Store.markBackupExported();
        refreshState();
      }
      const st = $('#import-status');
      const ver = Store.APP_VERSION || '';
      const pathName = currentPath().name;
      if (st) {
        st.textContent = 'Export: universum-buch.json · v' + ver + ' · Pfad ' + pathName +
          (embedded ? ' · ' + embedded + ' Fotos eingebettet' : '');
        st.classList.add('show');
        setTimeout(() => st.classList.remove('show'), 4500);
      }
      toast('Buch exportiert · v' + ver + (embedded ? ' · mit Fotos' : ''));
    });
    const exportSum = $('#diary-export-summary');
    if (exportSum) {
      exportSum.addEventListener('click', () => {
        if (Store.exportPracticeSummary) Store.exportPracticeSummary();
        const st = $('#import-status');
        if (st) {
          st.textContent = 'Praxis-Zusammenfassung.txt · ohne volle Tagebuchtexte · für Coach/Supervision';
          st.classList.add('show');
          setTimeout(() => st.classList.remove('show'), 4500);
        }
        toast('Zusammenfassung exportiert');
      });
    }
    $('#diary-import').addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const st = $('#import-status');
      const modeEl = document.querySelector('input[name="import-mode"]:checked');
      const mode = modeEl ? modeEl.value : 'merge';
      try {
        const result = await Store.importBuch(file, mode);
        refreshState();
        applyMotionPref();
        applyMondnachtPref();
        applyStilleModus();
        if (state.settings && state.settings.ambientTone) Schumann.toggleAmbient(true);
        else Schumann.toggleAmbient(false);
        renderBuch();
        renderRituale();
        applyPathTheme();
        const meta = result && result.meta;
        const ver = result && result.appVersion;
        let msg = 'Import (' + (result && result.mode === 'merge' ? 'Zusammenführen' : 'Ersetzen') + ') erfolgreich.';
        if (ver) msg += ' Quelle v' + ver + '.';
        if (meta && meta.pathName) msg += ' Pfad: ' + meta.pathName + '.';
        if (result && result.mediaRestored) msg += ' · ' + result.mediaRestored + ' Fotos wiederhergestellt.';
        if (st) {
          st.textContent = msg;
          st.classList.add('show');
        }
        toast(result && result.mode === 'merge' ? 'Import zusammengeführt' : 'Import ersetzt lokal');
      } catch (err) {
        if (st) {
          st.textContent = 'Import fehlgeschlagen: ' + err.message;
          st.classList.add('show');
        } else {
          alert('Import fehlgeschlagen: ' + err.message);
        }
      }
      e.target.value = '';
    });

    $('#note-add').addEventListener('click', addNote);
    $$('[data-buch-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        setBuchMode(btn.dataset.buchMode);
        Rituals.vibrate(10);
      });
    });

    $('#sigil-make').addEventListener('click', runSigil);
    $('#sigil-charge').addEventListener('click', chargeSigil);
    $('#sigil-forget').addEventListener('click', forgetSigil);

    $('#draw-card').addEventListener('click', () => {
      if (drawAnimating) return;
      const stage = $('#draw-stage');
      if (stage) { stage.hidden = false; }
      $('#spread-area').classList.remove('show');
      $('#spread-area').innerHTML = '';
      const card = Cards.drawOne();
      if (!card) return;
      revealCards([card], 'one');
    });
    $('#draw-three').addEventListener('click', () => {
      if (drawAnimating) return;
      const three = Cards.drawThree();
      revealCards(three, 'three');
    });
    const clearBtn = $('#draw-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        drawAnimating = false;
        $$('.feldkarte').forEach(c => c.classList.remove('drawn'));
        $('#spread-area').classList.remove('show');
        $('#spread-area').innerHTML = '';
        $('#drawn-result').textContent = '';
        const stage = $('#draw-stage');
        if (stage) { stage.hidden = true; stage.innerHTML = ''; }
      });
    }

    $('#custom-ritual-save').addEventListener('click', () => {
      const name = $('#custom-ritual-name').value.trim();
      const raw = $('#custom-ritual-steps').value.trim();
      if (!name || !raw) return;
      const steps = raw.split('\n').filter(Boolean).map((line, i) => {
        const parts = line.split('|');
        return {
          title: (parts[0] || ('Schritt ' + (i + 1))).trim(),
          text: (parts[1] || parts[0] || '').trim(),
          sec: Number(parts[2]) || 60
        };
      });
      Store.update(d => {
        d.customRituals.push({
          id: Store.uid(),
          name,
          steps,
          mins: Math.round(steps.reduce((a, s) => a + s.sec, 0) / 60)
        });
      });
      if (!afterPersist('Eigenes Ritual gespeichert', { checkBackup: false })) return;
      refreshState();
      $('#custom-ritual-name').value = '';
      $('#custom-ritual-steps').value = '';
      renderRituale();
    });

    $('#loc-save').addEventListener('click', () => {
      const lat = parseFloat($('#loc-lat').value);
      const lon = parseFloat($('#loc-lon').value);
      if (isNaN(lat) || isNaN(lon)) return;
      Store.update(d => { d.lat = lat; d.lon = lon; });
      refreshState();
      renderCockpit();
      toast('Ort am Altar gemerkt');
    });

    // Intention des Tages
    const intSave = $('#intention-save');
    if (intSave) intSave.addEventListener('click', saveDailyIntention);
    const intClear = $('#intention-clear');
    if (intClear) intClear.addEventListener('click', () => {
      if ($('#intention-input')) $('#intention-input').value = '';
      if ($('#intention-link369')) $('#intention-link369').checked = false;
      Store.setDailyIntention({ text: '', link369: false });
      refreshState();
      renderDailyIntention();
      toast('Intention gelöscht');
    });
    const intInput = $('#intention-input');
    if (intInput) {
      intInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); saveDailyIntention(); }
      });
    }

    // Day banner dismiss
    const dayDismiss = $('#day-banner-dismiss');
    if (dayDismiss) {
      dayDismiss.addEventListener('click', () => {
        Store.dismissDayBanner();
        refreshState();
        renderDayBanner();
        toast('Willkommen im neuen Tag');
      });
    }

    // Briefing share / print / invite
    const brCopy = $('#briefing-copy');
    if (brCopy) brCopy.addEventListener('click', () => { copyBriefingText(); });
    const brShare = $('#briefing-share');
    if (brShare) brShare.addEventListener('click', () => { shareBriefing(); });
    const brLink = $('#briefing-copy-link');
    if (brLink) brLink.addEventListener('click', () => { copyBriefingLink(); });
    const brPrint = $('#briefing-print');
    if (brPrint) brPrint.addEventListener('click', () => { printBriefing(); });
    const invCopy = $('#invite-copy');
    if (invCopy) invCopy.addEventListener('click', () => { copyInviteText(); });
    const invShare = $('#invite-share');
    if (invShare) invShare.addEventListener('click', () => { shareInvite(); });
    document.addEventListener('click', (e) => {
      const tbtn = e.target && e.target.closest ? e.target.closest('#empty-draw-one, #empty-draw-daily, #empty-goto-rituals') : null;
      if (!tbtn) return;
      if (tbtn.id === 'empty-draw-one') {
        const b = $('#draw-card');
        if (b) b.click();
      } else if (tbtn.id === 'empty-draw-daily') {
        const b = $('#draw-daily');
        if (b) b.click();
      } else if (tbtn.id === 'empty-goto-rituals') {
        navigate('rituale');
      }
    });

    // Daily Feldkarte
    const drawDailyBtn = $('#draw-daily');
    if (drawDailyBtn) drawDailyBtn.addEventListener('click', () => drawDailyCard());

    // Briefing pins toggle
    const pinToggle = $('#briefing-pins-toggle');
    if (pinToggle) {
      pinToggle.addEventListener('click', () => {
        const panel = $('#briefing-pins-panel');
        if (!panel) return;
        const open = panel.hidden;
        panel.hidden = !open;
        pinToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) renderBriefingPinsPanel();
      });
    }

    // Atem standalone
    $$('[data-breath-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextMode = btn.dataset.breathMode || '46';
        if (breathSoloRunning && breathSoloCycles >= 1 && nextMode !== breathSoloMode) {
          const modeLabel = breathSoloMode === 'box' ? 'Box 4–4–4–4' : '4/6';
          Store.recordPractice('atem');
          Store.addPracticeLog({
            kind: 'atem',
            label: 'Atem',
            detail: modeLabel + ' · ' + breathSoloCycles + ' Zyklus' + (breathSoloCycles === 1 ? '' : 'se')
          });
          refreshState();
          breathSoloCycles = 0;
        }
        breathSoloMode = nextMode;
        $$('[data-breath-mode]').forEach(b => {
          const on = b === btn;
          b.classList.toggle('picked', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (breathSoloRunning) startBreathSolo();
      });
    });
    const breathStart = $('#breath-start');
    if (breathStart) breathStart.addEventListener('click', startBreathSolo);
    const breathStop = $('#breath-stop');
    if (breathStop) breathStop.addEventListener('click', () => stopBreathSolo(false));

    // Sigil gallery
    const sigSave = $('#sigil-save-gallery');
    if (sigSave) sigSave.addEventListener('click', saveSigilToGallery);
    const sigClear = $('#sigil-gallery-clear');
    if (sigClear) sigClear.addEventListener('click', () => {
      Store.clearSigilGallery();
      refreshState();
      renderSigilGallery();
      toast('Galerie geleert');
    });
    const sigReviewBreath = $('#sigil-review-breath');
    if (sigReviewBreath) sigReviewBreath.addEventListener('click', startSigilReviewBreath);
    const sigReviewClear = $('#sigil-review-clear');
    if (sigReviewClear) sigReviewClear.addEventListener('click', () => {
      closeSigilReview();
      toast('Ansicht geschlossen');
    });

    // Korrespondenzen peek → section
    const korrespOpen = $('#korrespondenz-open');
    if (korrespOpen) {
      korrespOpen.addEventListener('click', () => navigate('korrespondenzen', { force: true }));
    }
    const craftOpen = $('#craft-peek-open');
    if (craftOpen) {
      craftOpen.addEventListener('click', () => navigate('korrespondenzen', { force: true }));
    }

    // Skip link focus target
    const skip = document.querySelector('.skip-link');
    if (skip) {
      skip.addEventListener('click', () => {
        const main = $('#main-content');
        if (main) setTimeout(() => main.focus(), 0);
      });
    }

    bindPathWeekButtons();
    bindInitiationGate();

    $$('[data-rtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('[data-rtab]').forEach(b => {
          const on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        $$('[data-rpanel]').forEach(p => p.classList.toggle('hidden', p.dataset.rpanel !== btn.dataset.rtab));
        if (btn.dataset.rtab === 'werkzeug') {
          renderPathWerkzeug();
          renderSigilGallery();
        }
        if (btn.dataset.rtab === 'guided') {
          renderPathWeek();
        }
      });
    });

    const gtw = $('#guided-to-werkzeug');
    if (gtw) gtw.addEventListener('click', () => openRitualTab('werkzeug', { scroll: 'path-werkzeug-card-ritual' }));

    $('#rr-close').addEventListener('click', closeRunner);

    const rawHash = (location.hash || '#cockpit').replace('#', '');
    const hash = rawHash.split('?')[0];
    if (hash === 'briefing' || hash === 'tagesbriefing') {
      navigate('cockpit');
      setTimeout(focusBriefingFromShare, 120);
    } else {
      const resolved = resolveSectionId(hash);
      const fromAlias = (hash === 'notizen' || hash === 'tagebuch') ? hash : undefined;
      if (SECTIONS.some(s => s.id === resolved)) navigate(resolved, { fromAlias: fromAlias });
      else navigate('cockpit');
    }
    window.addEventListener('hashchange', () => {
      const h = (location.hash || '').replace('#', '').split('?')[0];
      if (h === 'briefing' || h === 'tagesbriefing') focusBriefingFromShare();
      else {
        const resolved = resolveSectionId(h);
        const fromAlias = (h === 'notizen' || h === 'tagebuch') ? h : undefined;
        if (SECTIONS.some(s => s.id === resolved)) navigate(resolved, { fromAlias: fromAlias });
      }
    });

    if (!(state.onboarding && state.onboarding.done)) {
      openOnboarding();
    } else {
      setTimeout(() => showInstallBanner(false), 600);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const starterOv = $('#starter-overlay');
        if (starterOv && !starterOv.hidden) {
          closeStarterFlow();
          return;
        }
        const lb = $('#photo-lightbox');
        if (lb && lb.classList.contains('open')) {
          closePhotoLightbox();
          return;
        }
        closeSettings();
        closeGlobalSearch();
        const pm = $('#path-modal');
        if (pm) pm.classList.remove('open');
        const box = $('#kosmos-detail');
        if (box) box.hidden = true;
        const runner = $('#ritual-runner');
        if (runner && runner.classList.contains('open')) closeRunner();
        if (breathSoloRunning) stopBreathSolo(true);
        const pinPanel = $('#briefing-pins-panel');
        if (pinPanel && !pinPanel.hidden) {
          pinPanel.hidden = true;
          const tg = $('#briefing-pins-toggle');
          if (tg) tg.setAttribute('aria-expanded', 'false');
        }
        if (quietManual) {
          quietManual = false;
          syncQuietUi();
        }
        if (state.settings && state.settings.stilleModus) {
          setStilleModus(false);
          toast('Stille verlassen');
        }
      }
    });

    renderTipOfDay();

    // Soft daily reset (no data wipe) + midnight watch
    if (Store.checkDayRollover) Store.checkDayRollover();
    refreshState();
    if (Store.clearDailyCardIfStale) Store.clearDailyCardIfStale();
    refreshState();
    renderDayBanner();
    renderDailyCardPanel();
    scheduleMidnightWatch();

    setInterval(() => {
      const today = Store.todayKey();
      if (state.lastSeenDay && state.lastSeenDay !== today) {
        onLocalDayChange();
      }
      checkPlanetaryHourAlert(false);
      if ($('#sec-cockpit') && $('#sec-cockpit').classList.contains('active')) renderCockpit();
      else if ($('#sec-kosmos') && $('#sec-kosmos').classList.contains('active')) renderKosmos();
    }, 30000);
    checkPlanetaryHourAlert(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
