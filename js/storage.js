/**
 * UNIVERSUM — localStorage (key MUST remain feldlicht-v15)
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'feldlicht-v15';

  const DEFAULTS = {
    version: 15,
    path: 'esoterik',
    lat: 47.37,
    lon: 8.54,
    diary: [],
    notes: [],
    customLexikon: [],
    customRituals: [],
    checkIn: null,
    practice369: {},
    dailyIntention: { text: '', date: null, link369: false },
    ritualFavorites: [],
    lexikonFavorites: [],
    briefingPins: ['moon', 'hour', 'unrest'],
    sigilGallery: [],
    intentionHistory: [],
    practiceLog: [],
    kreisNotes: [],
    lastSeenDay: null,
    dayBanner: { date: null, dismissed: false },
    dailyCard: { date: null, n: null, name: '', theme: '', prompt: '' },
    backupReminder: { lastRemindCount: 0, lastExportAt: null },
    ritualTemplates: [],
    installHint: { dismissed: false, seenAt: null },
    starterFlow: { done: false, completedAt: null, dismissed: false },
    onboarding: {
      done: false,
      ethicsAck: false,
      completedAt: null
    },
    streaks: {
      count: 0,
      lastDate: null,
      lastKind: null
    },
    cardDrawHistory: [],
    pathWeekDone: {},
    initiationAck: {},
    pathWerkzeug: {},
    ritualJournal: [],
    lastActivity: {
      lastResonanzId: null,
      lastResonanzLabel: null,
      lastResonanzPath: null,
      lastResonanzKind: null,
      lastResonanzAt: null,
      lastCalendarDay: null,
      lastCalendarLabel: null,
      lastCalendarAt: null,
      lastKosmosKind: null,
      lastKosmosLabel: null,
      lastKosmosAt: null,
      lastRitualId: null,
      lastRitualLabel: null,
      lastRitualAt: null,
      lastBuchId: null,
      lastBuchLabel: null,
      lastBuchAt: null
    },
    settings: {
      schumannAudio: false,
      ambientTone: false,
      ritualKlang: false,
      haptics: true,
      reducedMotion: false,
      mondnacht: false,
      mondnachtAuto: false,
      hourAlert: false,
      quietDuringRitual: true,
      stilleModus: false,
      schumannLiveEnabled: true,
      schumannLive: null,
      calendarPathOnly: true,
      resonanzPathOnly: true,
      lang: 'de',
      plusPreviewSeen: false,
      reminders: {
        enabled: false,
        mondfenster: true,
        pathFest: true,
        daily3min: false,
        daily3minHour: 9,
        daily3minMinute: 0,
        permission: 'default',
        lastFired: {}
      },
      firstSessionTipShown: false
    }
  };

  const BRIEFING_PIN_OPTIONS = [
    { id: 'moon', label: 'Mond' },
    { id: 'hour', label: 'Planetenstunde' },
    { id: 'unrest', label: 'Unruhe' },
    { id: 'sun', label: 'Sonne' },
    { id: 'fest', label: 'Nächstes Fest' }
  ];

  function todayKey(d) {
    const x = d || new Date();
    return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  }

  function yesterdayKey(d) {
    const x = d ? new Date(d.getTime()) : new Date();
    x.setDate(x.getDate() - 1);
    return todayKey(x);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULTS);
      const data = JSON.parse(raw);
      return Object.assign(structuredClone(DEFAULTS), data, {
        diary: Array.isArray(data.diary) ? data.diary : [],
        notes: Array.isArray(data.notes) ? data.notes : [],
        customLexikon: Array.isArray(data.customLexikon) ? data.customLexikon.slice(0, 200) : [],
        customRituals: Array.isArray(data.customRituals) ? data.customRituals : [],
        practice369: data.practice369 && typeof data.practice369 === 'object' ? data.practice369 : {},
        dailyIntention: Object.assign({}, DEFAULTS.dailyIntention, data.dailyIntention || {}),
        ritualFavorites: Array.isArray(data.ritualFavorites) ? data.ritualFavorites.slice(0, 24) : [],
        lexikonFavorites: Array.isArray(data.lexikonFavorites) ? data.lexikonFavorites.slice(0, 200) : [],
        briefingPins: normalizePins(data.briefingPins),
        sigilGallery: Array.isArray(data.sigilGallery) ? data.sigilGallery.slice(0, 8) : [],
        intentionHistory: Array.isArray(data.intentionHistory) ? data.intentionHistory.slice(0, 14) : [],
        practiceLog: Array.isArray(data.practiceLog) ? data.practiceLog.slice(0, 80) : [],
        kreisNotes: Array.isArray(data.kreisNotes) ? data.kreisNotes.slice(0, 40) : [],
        lastSeenDay: data.lastSeenDay || null,
        dayBanner: Object.assign({}, DEFAULTS.dayBanner, data.dayBanner || {}),
        dailyCard: Object.assign({}, DEFAULTS.dailyCard, data.dailyCard || {}),
        backupReminder: Object.assign({}, DEFAULTS.backupReminder, data.backupReminder || {}),
        ritualTemplates: normalizeTemplates(data.ritualTemplates),
        installHint: Object.assign({}, DEFAULTS.installHint, data.installHint || {}),
        starterFlow: Object.assign({}, DEFAULTS.starterFlow, data.starterFlow || {}),
        onboarding: Object.assign({}, DEFAULTS.onboarding, data.onboarding || {}),
        streaks: Object.assign({}, DEFAULTS.streaks, data.streaks || {}),
        cardDrawHistory: Array.isArray(data.cardDrawHistory) ? data.cardDrawHistory : [],
        pathWeekDone: data.pathWeekDone && typeof data.pathWeekDone === 'object' ? data.pathWeekDone : {},
        initiationAck: data.initiationAck && typeof data.initiationAck === 'object' ? data.initiationAck : {},
        pathWerkzeug: data.pathWerkzeug && typeof data.pathWerkzeug === 'object' ? data.pathWerkzeug : {},
        ritualJournal: Array.isArray(data.ritualJournal) ? data.ritualJournal.slice(0, 80) : [],
        lastActivity: Object.assign({}, DEFAULTS.lastActivity, data.lastActivity || {}),
        settings: Object.assign({}, DEFAULTS.settings, data.settings || {})
      });
    } catch (e) {
      console.warn('Universum storage load failed', e);
      return structuredClone(DEFAULTS);
    }
  }

  let lastSaveResult = { ok: true, quota: false, message: '' };

  function isQuotaError(e) {
    if (!e) return false;
    const name = e.name || '';
    const code = e.code;
    return name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014;
  }

  function getLastSaveResult() {
    return Object.assign({}, lastSaveResult);
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      lastSaveResult = { ok: true, quota: false, message: '' };
      return true;
    } catch (e) {
      console.warn('Universum storage save failed', e);
      const quota = isQuotaError(e);
      lastSaveResult = {
        ok: false,
        quota: quota,
        message: quota
          ? 'Speicher voll (Quota). Bitte exportieren und Einträge ausdünnen.'
          : 'Speichern fehlgeschlagen. Lokal prüfen oder Export versuchen.'
      };
      return false;
    }
  }

  function update(mutator) {
    const data = load();
    mutator(data);
    data.version = 15;
    save(data);
    return data;
  }

  function get369(date) {
    const data = load();
    const key = todayKey(date);
    const entry = data.practice369[key] || { morning: 0, afternoon: 0, evening: 0, phrase: '' };
    return Object.assign({ key: key }, entry);
  }

  function set369(partial, date) {
    return update(d => {
      const key = todayKey(date);
      const cur = d.practice369[key] || { morning: 0, afternoon: 0, evening: 0, phrase: '' };
      d.practice369[key] = Object.assign({}, cur, partial);
      const keys = Object.keys(d.practice369).sort();
      while (keys.length > 60) {
        delete d.practice369[keys.shift()];
      }
    });
  }

  /** Record a completed practice day for gentle streak (369 full or ritual done). */
  function recordPractice(kind) {
    return update(d => {
      const today = todayKey();
      const streaks = d.streaks || Object.assign({}, DEFAULTS.streaks);
      if (streaks.lastDate === today) {
        streaks.lastKind = kind || streaks.lastKind;
      } else if (streaks.lastDate === yesterdayKey()) {
        streaks.count = (streaks.count || 0) + 1;
        streaks.lastDate = today;
        streaks.lastKind = kind || 'praxis';
      } else {
        streaks.count = 1;
        streaks.lastDate = today;
        streaks.lastKind = kind || 'praxis';
      }
      d.streaks = streaks;
    });
  }

  function getStreak() {
    const d = load();
    const s = d.streaks || DEFAULTS.streaks;
    const today = todayKey();
    const yest = yesterdayKey();
    // Streak still "alive" if last practice was today or yesterday
    if (s.lastDate === today || s.lastDate === yest) {
      return { count: s.count || 0, lastDate: s.lastDate, lastKind: s.lastKind, alive: true, doneToday: s.lastDate === today };
    }
    return { count: 0, lastDate: s.lastDate, lastKind: s.lastKind, alive: false, doneToday: false };
  }

  function resetOnboarding() {
    return update(d => {
      d.onboarding = { done: false, ethicsAck: false, completedAt: null };
    });
  }

  function completeOnboarding(opts) {
    opts = opts || {};
    return update(d => {
      if (opts.path) d.path = opts.path;
      if (opts.lat != null) d.lat = opts.lat;
      if (opts.lon != null) d.lon = opts.lon;
      d.onboarding = {
        done: true,
        ethicsAck: !!opts.ethicsAck,
        completedAt: new Date().toISOString()
      };
    });
  }

  const APP_VERSION = '5.33.4';

  function buildExportMeta(data) {
    const pathId = data.path || 'esoterik';
    let pathName = pathId;
    try {
      if (global.UniversumPaths && global.UniversumPaths.getPath) {
        pathName = global.UniversumPaths.getPath(pathId).name || pathId;
      }
    } catch (_) { /* ignore */ }
    const week = getWeeklyPracticeSummary(7);
    const streak = getStreak();
    return {
      path: pathId,
      pathName: pathName,
      diaryCount: (data.diary || []).length,
      notesCount: (data.notes || []).length,
      customLexikonCount: (data.customLexikon || []).length,
      customRitualsCount: (data.customRituals || []).length,
      ritualTemplatesCount: (data.ritualTemplates || []).length,
      cardDrawsCount: (data.cardDrawHistory || []).length,
      practiceLogCount: (data.practiceLog || []).length,
      weekPracticeTotal: week.total,
      weekActiveDays: week.activeDays,
      streakCount: streak.count || 0,
      intentionToday: !!(data.dailyIntention && data.dailyIntention.text && data.dailyIntention.date === todayKey())
    };
  }

  function collectDiaryPhotoIds(data) {
    const ids = [];
    (data.diary || []).forEach(e => {
      if (e && e.photoId) ids.push(e.photoId);
    });
    (data.ritualJournal || []).forEach(e => {
      if (e && e.photoId) ids.push(e.photoId);
    });
    return ids;
  }

  function downloadJsonPayload(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'universum-magie-buch.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  /** Sync fallback (photo ids only, no blobs). Prefer exportBuchAsync. */
  function exportBuch() {
    const data = load();
    const meta = buildExportMeta(data);
    const photoIds = collectDiaryPhotoIds(data);
    const payload = {
      app: 'UNIVERSUM',
      formerly: 'Feldlicht Ritualbegleiter',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      format: 'universum-buch-v3',
      meta: Object.assign({}, meta, {
        photoCount: photoIds.length,
        mediaNote: photoIds.length
          ? 'Foto-IDs im Tagebuch; Blobs in IndexedDB (universum-media). Für volles Backup exportBuchAsync / ZIP nutzen.'
          : null
      }),
      data
    };
    downloadJsonPayload(payload, 'universum-magie-buch.json');
    return true;
  }

  /** Full backup: embeds compressed photos (data URLs) under media{} — still local download. */
  async function exportBuchAsync() {
    const data = load();
    const meta = buildExportMeta(data);
    const photoIds = collectDiaryPhotoIds(data);
    let media = {};
    const Media = global.UniversumMedia;
    if (Media && photoIds.length) {
      try {
        media = await Media.collectMediaMap(photoIds);
      } catch (e) {
        console.warn('media collect failed', e);
      }
    }
    const embedded = Object.keys(media).length;
    const payload = {
      app: 'UNIVERSUM',
      formerly: 'Feldlicht Ritualbegleiter',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      format: 'universum-buch-v3',
      meta: Object.assign({}, meta, {
        photoCount: photoIds.length,
        mediaEmbedded: embedded,
        mediaNote: embedded
          ? 'Komprimierte Fotos unter media{} eingebettet (Backup).'
          : (photoIds.length
            ? 'Foto-IDs vorhanden, aber keine Blobs geladen — IndexedDB prüfen.'
            : null)
      }),
      media: media,
      data
    };
    downloadJsonPayload(payload, 'universum-magie-buch.json');
    return { ok: true, embedded: embedded, photoIds: photoIds.length };
  }

  /** Plain-text practice summary for coaches / supervision (no full diary bodies). */
  function exportPracticeSummary() {
    const data = load();
    const meta = buildExportMeta(data);
    const week = getWeeklyPracticeSummary(14);
    const streak = getStreak();
    const log = (data.practiceLog || []).slice(0, 20);
    const intentions = (data.intentionHistory || []).slice(0, 7);
    const lines = [];
    lines.push('UNIVERSUM · Praxis-Zusammenfassung');
    lines.push('Für Coach / Supervision · ohne volle Tagebuchtexte');
    lines.push('App v' + APP_VERSION + ' · Export ' + new Date().toISOString());
    lines.push('Pfad: ' + meta.pathName + ' (' + meta.path + ')');
    lines.push('');
    lines.push('— Überblick —');
    lines.push('Tagebuch-Einträge: ' + meta.diaryCount);
    lines.push('Notizen: ' + meta.notesCount);
    lines.push('Praxis-Log gesamt (gespeichert): ' + meta.practiceLogCount);
    lines.push('Streak (sanft): ' + (streak.count || 0) + (streak.doneToday ? ' · heute Praxis' : ''));
    lines.push('Intention heute: ' + (meta.intentionToday ? 'ja' : 'nein'));
    lines.push('');
    lines.push('— 14 Tage Praxis —');
    lines.push('Einträge: ' + week.total + ' · aktive Tage: ' + week.activeDays);
    const kinds = week.byKind || {};
    Object.keys(kinds).sort().forEach(k => {
      lines.push('  · ' + k + ': ' + kinds[k]);
    });
    if (week.highlights && week.highlights.length) {
      lines.push('Highlights: ' + week.highlights.join(', '));
    }
    lines.push('');
    lines.push('— Letzte Praxis (max. 20) —');
    if (!log.length) {
      lines.push('(keine Einträge)');
    } else {
      log.forEach(e => {
        const when = e.at || '';
        lines.push((when ? when.slice(0, 16).replace('T', ' ') : '—') +
          ' · ' + (e.kind || 'praxis') + ' · ' + (e.label || '') +
          (e.detail ? ' — ' + e.detail : ''));
      });
    }
    lines.push('');
    lines.push('— Intentionen (Historie) —');
    if (!intentions.length) {
      lines.push('(keine)');
    } else {
      intentions.forEach(it => {
        lines.push((it.date || '—') + ' · ' + (it.text || ''));
      });
    }
    lines.push('');
    lines.push('Ethik: Grenze und Ausgleich. Kein Schaden an Personen.');
    lines.push('Hinweis: Zusammenfassung enthält keine vollständigen Tagebuchtexte.');
    lines.push('Vollbackup: universum-magie-buch.json');
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'universum-praxis-zusammenfassung.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  }

  function shouldShowStarterFlow() {
    const d = load();
    if (!(d.onboarding && d.onboarding.done)) return false;
    const s = d.starterFlow || {};
    if (s.done || s.dismissed) return false;
    return true;
  }

  function markStarterDone() {
    return update(d => {
      d.starterFlow = {
        done: true,
        dismissed: false,
        completedAt: new Date().toISOString()
      };
    });
  }

  function dismissStarterFlow() {
    return update(d => {
      d.starterFlow = Object.assign({}, d.starterFlow || {}, {
        dismissed: true,
        completedAt: (d.starterFlow && d.starterFlow.completedAt) || null
      });
    });
  }

  function resetStarterFlow() {
    return update(d => {
      d.starterFlow = { done: false, completedAt: null, dismissed: false };
    });
  }

  function normalizePins(pins) {
    const allowed = new Set(BRIEFING_PIN_OPTIONS.map(p => p.id));
    const list = Array.isArray(pins) ? pins.filter(id => allowed.has(id)) : [];
    const uniq = [];
    list.forEach(id => { if (!uniq.includes(id)) uniq.push(id); });
    while (uniq.length < 2) {
      for (const d of DEFAULTS.briefingPins) {
        if (!uniq.includes(d)) { uniq.push(d); break; }
      }
      if (uniq.length >= 2) break;
      break;
    }
    return uniq.slice(0, 3);
  }

  function hashIntention(text) {
    const s = String(text || '').trim().toLowerCase();
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ('00000000' + (h >>> 0).toString(16)).slice(-8);
  }

  function normalizeIncoming(incoming) {
    return Object.assign(structuredClone(DEFAULTS), incoming, {
      diary: Array.isArray(incoming.diary) ? incoming.diary : [],
      notes: Array.isArray(incoming.notes) ? incoming.notes : [],
      customLexikon: Array.isArray(incoming.customLexikon) ? incoming.customLexikon : [],
      customRituals: Array.isArray(incoming.customRituals) ? incoming.customRituals : [],
      practice369: incoming.practice369 && typeof incoming.practice369 === 'object'
        ? incoming.practice369 : {},
      dailyIntention: Object.assign({}, DEFAULTS.dailyIntention, incoming.dailyIntention || {}),
      ritualFavorites: Array.isArray(incoming.ritualFavorites) ? incoming.ritualFavorites.slice(0, 24) : [],
      lexikonFavorites: Array.isArray(incoming.lexikonFavorites) ? incoming.lexikonFavorites.slice(0, 200) : [],
      briefingPins: normalizePins(incoming.briefingPins),
      sigilGallery: Array.isArray(incoming.sigilGallery) ? incoming.sigilGallery.slice(0, 8) : [],
      intentionHistory: Array.isArray(incoming.intentionHistory) ? incoming.intentionHistory.slice(0, 14) : [],
      practiceLog: Array.isArray(incoming.practiceLog) ? incoming.practiceLog.slice(0, 80) : [],
      ritualJournal: Array.isArray(incoming.ritualJournal) ? incoming.ritualJournal.slice(0, 80) : [],
      kreisNotes: Array.isArray(incoming.kreisNotes) ? incoming.kreisNotes.slice(0, 40) : [],
      lastSeenDay: incoming.lastSeenDay || null,
      dayBanner: Object.assign({}, DEFAULTS.dayBanner, incoming.dayBanner || {}),
      dailyCard: Object.assign({}, DEFAULTS.dailyCard, incoming.dailyCard || {}),
      backupReminder: Object.assign({}, DEFAULTS.backupReminder, incoming.backupReminder || {}),
      ritualTemplates: normalizeTemplates(incoming.ritualTemplates),
      installHint: Object.assign({}, DEFAULTS.installHint, incoming.installHint || {}),
      starterFlow: Object.assign({}, DEFAULTS.starterFlow, incoming.starterFlow || {}),
      cardDrawHistory: Array.isArray(incoming.cardDrawHistory) ? incoming.cardDrawHistory : [],
      onboarding: Object.assign({}, DEFAULTS.onboarding, incoming.onboarding || {}),
      streaks: Object.assign({}, DEFAULTS.streaks, incoming.streaks || {}),
      settings: Object.assign({}, DEFAULTS.settings, incoming.settings || {})
    });
  }

  function mergeById(localArr, incomingArr) {
    const map = new Map();
    (localArr || []).forEach(x => { if (x && x.id) map.set(x.id, x); });
    (incomingArr || []).forEach(x => {
      if (!x || !x.id) {
        const nid = uid();
        map.set(nid, Object.assign({}, x, { id: nid }));
        return;
      }
      const prev = map.get(x.id);
      if (!prev) map.set(x.id, x);
      else {
        const pt = prev.updated || prev.created || '';
        const it = x.updated || x.created || '';
        map.set(x.id, it >= pt ? Object.assign({}, prev, x) : Object.assign({}, x, prev));
      }
    });
    return Array.from(map.values());
  }

  /** mode: 'replace' | 'merge' (default replace for backward compat) */
  function importBuch(file, mode) {
    mode = mode === 'merge' ? 'merge' : 'replace';
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const incoming = parsed.data || parsed;
          if (!incoming || typeof incoming !== 'object') throw new Error('Ungültiges Format');
          let result;
          if (mode === 'merge') {
            const local = load();
            const norm = normalizeIncoming(incoming);
            result = Object.assign(structuredClone(local), {
              path: norm.path || local.path,
              lat: norm.lat != null ? norm.lat : local.lat,
              lon: norm.lon != null ? norm.lon : local.lon,
              diary: mergeById(local.diary, norm.diary),
              notes: mergeById(local.notes, norm.notes),
              customLexikon: mergeById(local.customLexikon || [], norm.customLexikon || []),
              customRituals: mergeById(local.customRituals, norm.customRituals),
              practice369: Object.assign({}, local.practice369 || {}, norm.practice369 || {}),
              cardDrawHistory: (norm.cardDrawHistory || []).concat(local.cardDrawHistory || []).slice(0, 40),
              ritualFavorites: Array.from(new Set([].concat(local.ritualFavorites || [], norm.ritualFavorites || []))).slice(0, 24),
              lexikonFavorites: Array.from(new Set([].concat(local.lexikonFavorites || [], norm.lexikonFavorites || []))).slice(0, 200),
              sigilGallery: (norm.sigilGallery || []).concat(local.sigilGallery || []).slice(0, 8),
              intentionHistory: mergeById(local.intentionHistory || [], norm.intentionHistory || []).slice(0, 14),
              practiceLog: mergeById(local.practiceLog || [], norm.practiceLog || []).slice(0, 80),
              ritualJournal: mergeById(local.ritualJournal || [], norm.ritualJournal || []).slice(0, 80),
              kreisNotes: mergeById(local.kreisNotes || [], norm.kreisNotes || []).slice(0, 40),
              briefingPins: normalizePins(norm.briefingPins && norm.briefingPins.length ? norm.briefingPins : local.briefingPins),
              dailyIntention: (norm.dailyIntention && norm.dailyIntention.date === todayKey())
                ? norm.dailyIntention
                : (local.dailyIntention || DEFAULTS.dailyIntention),
              dailyCard: (norm.dailyCard && norm.dailyCard.date === todayKey())
                ? norm.dailyCard
                : (local.dailyCard || DEFAULTS.dailyCard),
              dayBanner: local.dayBanner || DEFAULTS.dayBanner,
              lastSeenDay: local.lastSeenDay || norm.lastSeenDay || null,
              backupReminder: Object.assign({}, local.backupReminder || {}, norm.backupReminder || {}),
              ritualTemplates: normalizeTemplates(
                mergeById(local.ritualTemplates || [], norm.ritualTemplates || []).slice(0, 3)
              ),
              settings: Object.assign({}, local.settings || {}, norm.settings || {}),
              onboarding: Object.assign({}, local.onboarding || {}, norm.onboarding || {}),
              streaks: (norm.streaks && (norm.streaks.count || 0) >= (local.streaks && local.streaks.count || 0))
                ? norm.streaks : (local.streaks || DEFAULTS.streaks)
            });
          } else {
            result = normalizeIncoming(incoming);
          }
          // ritualJournal merge if missing from merge branch
          if (mode === 'merge' && Array.isArray(incoming.ritualJournal)) {
            result.ritualJournal = mergeById(result.ritualJournal || [], incoming.ritualJournal).slice(0, 80);
          }
          result.version = 15;
          save(result);
          const mediaMap = parsed.media && typeof parsed.media === 'object' ? parsed.media : null;
          const Media = global.UniversumMedia;
          const finish = (mediaRestored) => {
            resolve({
              data: result,
              mode: mode,
              meta: parsed.meta || null,
              appVersion: parsed.appVersion || null,
              mediaRestored: mediaRestored || 0
            });
          };
          if (mediaMap && Media && Media.restoreMediaMap) {
            Media.restoreMediaMap(mediaMap).then(n => finish(n)).catch(() => finish(0));
          } else {
            finish(0);
          }
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = () => reject(reader.error || new Error('Lesefehler'));
      reader.readAsText(file);
    });
  }

  function recordCardDraw(entry) {
    return update(d => {
      const hist = Array.isArray(d.cardDrawHistory) ? d.cardDrawHistory : [];
      hist.unshift({
        id: uid(),
        at: new Date().toISOString(),
        kind: entry.kind || 'one',
        cards: entry.cards || [],
        path: d.path || null
      });
      d.cardDrawHistory = hist.slice(0, 24);
    });
  }

  function getCardDrawHistory(limit) {
    const d = load();
    const hist = Array.isArray(d.cardDrawHistory) ? d.cardDrawHistory : [];
    return hist.slice(0, limit || 12);
  }

  function uid() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }


  function getDailyIntention() {
    const d = load();
    const di = d.dailyIntention || DEFAULTS.dailyIntention;
    if (di.date && di.date !== todayKey()) {
      return { text: '', date: null, link369: !!di.link369 };
    }
    return Object.assign({}, DEFAULTS.dailyIntention, di);
  }

  function setDailyIntention(partial) {
    return update(d => {
      const cur = Object.assign({}, DEFAULTS.dailyIntention, d.dailyIntention || {});
      const next = Object.assign({}, cur, partial || {});
      if (next.text && String(next.text).trim()) {
        next.date = todayKey();
        next.text = String(next.text).trim().slice(0, 140);
        // Keep rolling 7-day local history (one entry per date, newest first)
        const hist = Array.isArray(d.intentionHistory) ? d.intentionHistory.slice() : [];
        const filtered = hist.filter(h => h && h.date !== next.date);
        filtered.unshift({
          id: uid(),
          date: next.date,
          text: next.text,
          link369: !!next.link369,
          at: new Date().toISOString()
        });
        d.intentionHistory = filtered.slice(0, 14);
      } else {
        next.text = '';
        next.date = null;
      }
      d.dailyIntention = next;
    });
  }

  function getIntentionHistory(days) {
    const limit = days == null ? 7 : days;
    const list = (load().intentionHistory || []).slice();
    list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const seen = new Set();
    const out = [];
    for (const item of list) {
      if (!item || !item.date || seen.has(item.date)) continue;
      seen.add(item.date);
      out.push(item);
      if (out.length >= limit) break;
    }
    return out;
  }

  function clearIntentionHistory() {
    return update(d => { d.intentionHistory = []; });
  }

  function addPracticeLog(entry) {
    return update(d => {
      const list = Array.isArray(d.practiceLog) ? d.practiceLog.slice() : [];
      list.unshift({
        id: uid(),
        at: new Date().toISOString(),
        kind: (entry && entry.kind) || 'praxis',
        label: (entry && entry.label) ? String(entry.label).slice(0, 120) : 'Praxis',
        detail: (entry && entry.detail) ? String(entry.detail).slice(0, 200) : '',
        ritualId: (entry && entry.ritualId) ? String(entry.ritualId).slice(0, 80) : null
      });
      d.practiceLog = list.slice(0, 60);
    });
  }

  function removePracticeLog(id) {
    return update(d => {
      d.practiceLog = (d.practiceLog || []).filter(x => x.id !== id);
    });
  }

  function getPracticeLog(limit) {
    return (load().practiceLog || []).slice(0, limit || 30);
  }

  function addKreisNote(text) {
    const t = String(text || '').trim().slice(0, 400);
    if (!t) return load();
    return update(d => {
      const list = Array.isArray(d.kreisNotes) ? d.kreisNotes.slice() : [];
      list.unshift({
        id: uid(),
        text: t,
        at: new Date().toISOString(),
        updated: new Date().toISOString()
      });
      d.kreisNotes = list.slice(0, 30);
    });
  }

  function removeKreisNote(id) {
    return update(d => {
      d.kreisNotes = (d.kreisNotes || []).filter(x => x.id !== id);
    });
  }

  function getKreisNotes() {
    return (load().kreisNotes || []).slice(0, 30);
  }

  function toggleRitualFavorite(id) {
    if (!id) return load();
    return update(d => {
      const favs = Array.isArray(d.ritualFavorites) ? d.ritualFavorites.slice() : [];
      const i = favs.indexOf(id);
      if (i >= 0) favs.splice(i, 1);
      else favs.unshift(id);
      d.ritualFavorites = favs.slice(0, 24);
    });
  }

  function isRitualFavorite(id) {
    const d = load();
    return (d.ritualFavorites || []).indexOf(id) >= 0;
  }

  function getBriefingPins() {
    return normalizePins(load().briefingPins);
  }

  function setBriefingPins(pins) {
    return update(d => { d.briefingPins = normalizePins(pins); });
  }

  function addSigilGalleryEntry(entry) {
    return update(d => {
      const list = Array.isArray(d.sigilGallery) ? d.sigilGallery.slice() : [];
      list.unshift({
        id: uid(),
        at: new Date().toISOString(),
        hash: entry.hash || '',
        letters: entry.letters || '',
        dataURL: entry.dataURL || null
      });
      d.sigilGallery = list.slice(0, 6);
    });
  }

  function removeSigilGalleryEntry(id) {
    return update(d => {
      d.sigilGallery = (d.sigilGallery || []).filter(x => x.id !== id);
    });
  }

  function clearSigilGallery() {
    return update(d => { d.sigilGallery = []; });
  }

  function getSigilGallery() {
    return (load().sigilGallery || []).slice(0, 6);
  }



  function normalizeTemplates(list) {
    const arr = Array.isArray(list) ? list : [];
    return arr.filter(t => t && t.id && t.name).slice(0, 3).map(t => ({
      id: t.id,
      name: String(t.name || '').slice(0, 80),
      steps: Array.isArray(t.steps) ? t.steps.slice(0, 24).map(s => ({
        title: String((s && s.title) || 'Schritt').slice(0, 80),
        text: String((s && s.text) || '').slice(0, 400),
        sec: Math.max(15, Math.min(900, Number((s && s.sec) || 60) || 60))
      })) : [],
      mins: t.mins != null ? Number(t.mins) : null,
      updated: t.updated || t.created || null
    }));
  }

  function getRitualTemplates() {
    return normalizeTemplates(load().ritualTemplates);
  }

  function saveRitualTemplate(tpl) {
    if (!tpl || !tpl.name) return load();
    return update(d => {
      const list = normalizeTemplates(d.ritualTemplates);
      const steps = Array.isArray(tpl.steps) ? tpl.steps : [];
      const entry = {
        id: tpl.id || uid(),
        name: String(tpl.name).trim().slice(0, 80),
        steps: steps.slice(0, 24),
        mins: tpl.mins != null ? tpl.mins : Math.max(1, Math.round(steps.reduce((a, s) => a + (s.sec || 60), 0) / 60)),
        updated: new Date().toISOString()
      };
      const idx = list.findIndex(x => x.id === entry.id);
      if (idx >= 0) list[idx] = entry;
      else {
        if (list.length >= 3) list.pop();
        list.unshift(entry);
      }
      d.ritualTemplates = list.slice(0, 3);
    });
  }

  function removeRitualTemplate(id) {
    return update(d => {
      d.ritualTemplates = normalizeTemplates(d.ritualTemplates).filter(x => x.id !== id);
    });
  }

  const BACKUP_EVERY_N = 15;

  function entryCount(d) {
    const data = d || load();
    return (data.diary || []).length + (data.notes || []).length;
  }

  /** Soft day rollover: no data wipe. Returns whether a greeting banner should show. */
  function checkDayRollover() {
    const today = todayKey();
    const data = load();
    const prev = data.lastSeenDay || null;
    if (prev === today) {
      const ban = data.dayBanner || DEFAULTS.dayBanner;
      return !!(ban.date === today && !ban.dismissed);
    }
    const first = !prev;
    update(d => {
      d.lastSeenDay = today;
      if (!first) {
        d.dayBanner = { date: today, dismissed: false };
      } else if (!d.dayBanner) {
        d.dayBanner = { date: null, dismissed: false };
      }
    });
    return !first;
  }

  function dismissDayBanner() {
    return update(d => {
      const today = todayKey();
      d.dayBanner = { date: today, dismissed: true };
      d.lastSeenDay = today;
    });
  }

  function shouldShowDayBanner() {
    const d = load();
    const ban = d.dayBanner || DEFAULTS.dayBanner;
    return !!(ban.date === todayKey() && !ban.dismissed);
  }

  function getDailyCard() {
    const d = load().dailyCard || DEFAULTS.dailyCard;
    if (!d.date || d.date !== todayKey() || d.n == null) return null;
    return Object.assign({}, d);
  }

  function setDailyCard(card) {
    if (!card || card.n == null) return load();
    const existing = getDailyCard();
    if (existing) return load();
    return update(d => {
      d.dailyCard = {
        date: todayKey(),
        n: card.n,
        name: card.name || '',
        theme: card.theme || '',
        prompt: card.prompt || ''
      };
    });
  }

  function clearDailyCardIfStale() {
    return update(d => {
      const dc = d.dailyCard || DEFAULTS.dailyCard;
      if (dc.date && dc.date !== todayKey()) {
        d.dailyCard = Object.assign({}, DEFAULTS.dailyCard);
      }
    });
  }

  function shouldRemindBackup() {
    const d = load();
    const count = entryCount(d);
    const br = d.backupReminder || DEFAULTS.backupReminder;
    if (count < BACKUP_EVERY_N) return false;
    const last = br.lastRemindCount || 0;
    // Remind each time we cross another multiple of N since last remind
    return count >= last + BACKUP_EVERY_N;
  }

  function markBackupReminded() {
    return update(d => {
      d.backupReminder = Object.assign({}, d.backupReminder || {}, {
        lastRemindCount: entryCount(d)
      });
    });
  }

  function markBackupExported() {
    return update(d => {
      d.backupReminder = {
        lastRemindCount: entryCount(d),
        lastExportAt: new Date().toISOString()
      };
    });
  }


  function getWeeklyPracticeSummary(days) {
    const n = days || 7;
    const log = load().practiceLog || [];
    const cutoff = Date.now() - n * 86400000;
    const week = log.filter(e => {
      if (!e || !e.at) return false;
      const t = Date.parse(e.at);
      return !isNaN(t) && t >= cutoff;
    });
    const byKind = {};
    week.forEach(e => {
      const k = e.kind || 'praxis';
      byKind[k] = (byKind[k] || 0) + 1;
    });
    const daySet = new Set();
    week.forEach(e => {
      try {
        const d = new Date(e.at);
        daySet.add(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'));
      } catch (_) {}
    });
    const labels = week.slice(0, 5).map(e => e.label || 'Praxis');
    return {
      days: n,
      total: week.length,
      activeDays: daySet.size,
      byKind,
      highlights: labels,
      empty: week.length === 0
    };
  }

  function shouldShowInstallHint() {
    const d = load();
    if (d.installHint && d.installHint.dismissed) return false;
    return !!(d.onboarding && d.onboarding.done);
  }

  function dismissInstallHint() {
    return update(d => {
      d.installHint = { dismissed: true, seenAt: new Date().toISOString() };
    });
  }


  function weekKeyNow() {
    try {
      if (global.UniversumPaths && global.UniversumPaths.isoWeekKey) {
        return global.UniversumPaths.isoWeekKey(new Date());
      }
    } catch (_) {}
    const x = new Date();
    return x.getFullYear() + '-Wxx';
  }

  function getPathWeekDone(pathId) {
    const d = load();
    const wk = weekKeyNow();
    const byPath = (d.pathWeekDone && d.pathWeekDone[pathId]) || {};
    const done = byPath[wk] && typeof byPath[wk] === 'object' ? byPath[wk] : {};
    return { weekKey: wk, done: Object.assign({}, done) };
  }

  function markPathWeekDay(pathId, day, value) {
    return update(d => {
      const wk = weekKeyNow();
      if (!d.pathWeekDone || typeof d.pathWeekDone !== 'object') d.pathWeekDone = {};
      if (!d.pathWeekDone[pathId] || typeof d.pathWeekDone[pathId] !== 'object') d.pathWeekDone[pathId] = {};
      if (!d.pathWeekDone[pathId][wk] || typeof d.pathWeekDone[pathId][wk] !== 'object') {
        d.pathWeekDone[pathId][wk] = {};
      }
      const dayKey = String(day);
      if (value === false) delete d.pathWeekDone[pathId][wk][dayKey];
      else d.pathWeekDone[pathId][wk][dayKey] = true;
      // prune old weeks for this path (keep current + previous)
      const keys = Object.keys(d.pathWeekDone[pathId]).sort();
      while (keys.length > 3) {
        const old = keys.shift();
        if (old !== wk) delete d.pathWeekDone[pathId][old];
      }
    });
  }

  function isPathWeekDayDone(pathId, day) {
    const st = getPathWeekDone(pathId);
    return !!st.done[String(day)];
  }

  function hasInitiationAck(pathId) {
    const d = load();
    return !!(d.initiationAck && d.initiationAck[pathId]);
  }

  function setInitiationAck(pathId, value) {
    return update(d => {
      if (!d.initiationAck || typeof d.initiationAck !== 'object') d.initiationAck = {};
      if (value) d.initiationAck[pathId] = { at: new Date().toISOString() };
      else delete d.initiationAck[pathId];
    });
  }

  function getPathWerkzeugState(pathId) {
    const d = load();
    const raw = (d.pathWerkzeug && d.pathWerkzeug[pathId]) || {};
    return Object.assign({}, raw);
  }

  function setPathWerkzeugState(pathId, partial) {
    return update(d => {
      if (!d.pathWerkzeug || typeof d.pathWerkzeug !== 'object') d.pathWerkzeug = {};
      const cur = d.pathWerkzeug[pathId] && typeof d.pathWerkzeug[pathId] === 'object'
        ? d.pathWerkzeug[pathId] : {};
      d.pathWerkzeug[pathId] = Object.assign({}, cur, partial || {});
    });
  }


  function addRitualJournalEntry(entry) {
    return update(d => {
      const list = Array.isArray(d.ritualJournal) ? d.ritualJournal.slice() : [];
      const text = String((entry && entry.text) || '').trim().slice(0, 280);
      const photoId = (entry && entry.photoId) || null;
      list.unshift({
        id: uid(),
        at: new Date().toISOString(),
        ritualId: entry && entry.ritualId || null,
        ritualName: (entry && entry.ritualName) || 'Praxis',
        pathId: (entry && entry.pathId) || null,
        text: text,
        mood: (entry && entry.mood) || null,
        photoId: photoId
      });
      // keep entries that have text OR a photo
      d.ritualJournal = list.filter(x => x.text || x.photoId).slice(0, 60);
    });
  }

  function getRitualJournal(limit) {
    return (load().ritualJournal || []).slice(0, limit || 30);
  }

  function removeRitualJournalEntry(id) {
    return update(d => {
      d.ritualJournal = (d.ritualJournal || []).filter(x => x.id !== id);
    });
  }



  function getCustomLexikon() {
    const d = load();
    return Array.isArray(d.customLexikon) ? d.customLexikon.slice() : [];
  }

  function upsertCustomLexikon(entry) {
    if (!entry || !entry.name) return getCustomLexikon();
    const kind = String(entry.kind || 'herb');
    const name = String(entry.name || '').trim().slice(0, 80);
    const description = String(entry.description || entry.desc || '').trim().slice(0, 400);
    const ico = String(entry.ico || '✦').trim().slice(0, 8) || '✦';
    if (!name || !description) return getCustomLexikon();
    return update(d => {
      if (!Array.isArray(d.customLexikon)) d.customLexikon = [];
      const now = new Date().toISOString();
      let id = entry.id ? String(entry.id) : '';
      const list = d.customLexikon;
      if (id) {
        const i = list.findIndex(x => x && x.id === id);
        if (i >= 0) {
          list[i] = Object.assign({}, list[i], { kind, name, description, ico, updated: now });
          return;
        }
      }
      id = id || uid();
      list.unshift({ id, kind, name, description, ico, created: now, updated: now, custom: true });
      d.customLexikon = list.slice(0, 200);
    });
  }

  function removeCustomLexikon(id) {
    if (!id) return getCustomLexikon();
    return update(d => {
      d.customLexikon = (d.customLexikon || []).filter(x => x && x.id !== id);
    });
  }

  function lexikonFavKey(kind, name) {
    return String(kind || 'herb') + '::' + String(name || '').trim().toLowerCase();
  }

  function getLexikonFavorites() {
    const d = load();
    return Array.isArray(d.lexikonFavorites) ? d.lexikonFavorites.slice() : [];
  }

  function isLexikonFavorite(kind, name) {
    const key = lexikonFavKey(kind, name);
    if (!key.endsWith('::') && key.indexOf('::') > 0) {
      return getLexikonFavorites().indexOf(key) >= 0;
    }
    return false;
  }

  function toggleLexikonFavorite(kind, name) {
    const key = lexikonFavKey(kind, name);
    if (!name || key.endsWith('::')) return getLexikonFavorites();
    return update(d => {
      if (!Array.isArray(d.lexikonFavorites)) d.lexikonFavorites = [];
      const favs = d.lexikonFavorites.slice();
      const i = favs.indexOf(key);
      if (i >= 0) favs.splice(i, 1);
      else favs.unshift(key);
      d.lexikonFavorites = favs.slice(0, 200);
    });
  }

  /** Local download: eigene Lexikon-Einträge + optional Favoriten-Liste (Buch-Export-Stil). */
  function exportLexikon(opts) {
    const data = load();
    const includeFavs = !opts || opts.favorites !== false;
    const payload = {
      app: 'UNIVERSUM',
      formerly: 'Feldlicht Ritualbegleiter',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      format: 'universum-lexikon-v1',
      meta: {
        customCount: (data.customLexikon || []).length,
        favoriteCount: includeFavs ? (data.lexikonFavorites || []).length : 0
      },
      customLexikon: (data.customLexikon || []).slice(),
      lexikonFavorites: includeFavs ? (data.lexikonFavorites || []).slice() : []
    };
    downloadJsonPayload(payload, 'universum-lexikon.json');
    return true;
  }

  function exportLexikonText() {
    const data = load();
    const lines = [];
    lines.push('UNIVERSUM · Lexikon-Export');
    lines.push('App v' + APP_VERSION + ' · ' + new Date().toISOString());
    lines.push('');
    lines.push('— Eigene Einträge —');
    (data.customLexikon || []).forEach(e => {
      if (!e) return;
      lines.push((e.ico || '✦') + ' ' + (e.name || '') + ' [' + (e.kind || '') + ']');
      lines.push(String(e.description || ''));
      lines.push('');
    });
    lines.push('— Favoriten (Keys) —');
    (data.lexikonFavorites || []).forEach(k => lines.push(String(k)));
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'universum-lexikon.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  }


  function getLastActivity() {
    const d = load();
    return Object.assign({}, DEFAULTS.lastActivity, d.lastActivity || {});
  }

  /** Touch last-used glance fields (Resonanz, Kalender, Kosmos, Ritual, Buch). */
  function touchLastActivity(partial) {
    if (!partial || typeof partial !== 'object') return getLastActivity();
    return update(d => {
      const cur = Object.assign({}, DEFAULTS.lastActivity, d.lastActivity || {});
      const now = new Date().toISOString();
      const next = Object.assign({}, cur, partial);
      // stamp matching *At keys when caller sets a primary field without At
      if (partial.lastResonanzId != null || partial.lastResonanzLabel != null) {
        if (partial.lastResonanzAt == null) next.lastResonanzAt = now;
      }
      if (partial.lastCalendarDay != null || partial.lastCalendarLabel != null) {
        if (partial.lastCalendarAt == null) next.lastCalendarAt = now;
      }
      if (partial.lastKosmosKind != null || partial.lastKosmosLabel != null) {
        if (partial.lastKosmosAt == null) next.lastKosmosAt = now;
      }
      if (partial.lastRitualId != null || partial.lastRitualLabel != null) {
        if (partial.lastRitualAt == null) next.lastRitualAt = now;
      }
      if (partial.lastBuchId != null || partial.lastBuchLabel != null) {
        if (partial.lastBuchAt == null) next.lastBuchAt = now;
      }
      d.lastActivity = next;
    });
  }


  function getReminders() {
    const d = load();
    const base = (DEFAULTS.settings && DEFAULTS.settings.reminders) || {};
    const cur = (d.settings && d.settings.reminders) || {};
    return Object.assign({}, base, cur, {
      lastFired: Object.assign({}, base.lastFired || {}, cur.lastFired || {})
    });
  }

  function setReminders(partial) {
    return update(d => {
      if (!d.settings) d.settings = Object.assign({}, DEFAULTS.settings);
      const prev = Object.assign({}, (DEFAULTS.settings.reminders || {}), d.settings.reminders || {});
      const next = Object.assign({}, prev, partial || {});
      if (partial && partial.lastFired) {
        next.lastFired = Object.assign({}, prev.lastFired || {}, partial.lastFired);
      }
      d.settings.reminders = next;
    });
  }

  function markReminderFired(kind, dayKeyStr) {
    return setReminders({
      lastFired: Object.assign({}, getReminders().lastFired || {}, {
        [kind]: dayKeyStr || todayKey()
      })
    });
  }

  function wasReminderFired(kind, dayKeyStr) {
    const r = getReminders();
    const key = dayKeyStr || todayKey();
    return !!(r.lastFired && r.lastFired[kind] === key);
  }

  function getFirstSessionTipShown() {
    const d = load();
    return !!(d.settings && d.settings.firstSessionTipShown);
  }

  function markFirstSessionTipShown() {
    return update(d => {
      if (!d.settings) d.settings = Object.assign({}, DEFAULTS.settings);
      d.settings.firstSessionTipShown = true;
    });
  }

  /** Build portable backup payload (no secrets) — Magie-Buch, Lexikon, Favoriten, Schlüssel-Settings. */
  function buildBackupPayload(opts) {
    opts = opts || {};
    const data = load();
    const meta = buildExportMeta(data);
    const settings = data.settings || {};
    const keySettings = {
      path: data.path,
      lat: data.lat,
      lon: data.lon,
      calendarPathOnly: settings.calendarPathOnly,
      resonanzPathOnly: settings.resonanzPathOnly,
      quietDuringRitual: settings.quietDuringRitual,
      stilleModus: settings.stilleModus,
      reducedMotion: settings.reducedMotion,
      mondnacht: settings.mondnacht,
      mondnachtAuto: settings.mondnachtAuto,
      haptics: settings.haptics,
      hourAlert: settings.hourAlert,
      lang: settings.lang === 'en' ? 'en' : 'de',
      plusPreviewSeen: !!settings.plusPreviewSeen,
      reminders: settings.reminders || null,
      briefingPins: data.briefingPins || []
    };
    return {
      app: 'UNIVERSUM',
      formerly: 'Feldlicht Ritualbegleiter',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      format: 'universum-backup-v1',
      meta: Object.assign({}, meta, { kind: 'local-backup', secrets: false }),
      data: {
        path: data.path,
        lat: data.lat,
        lon: data.lon,
        diary: data.diary || [],
        notes: data.notes || [],
        customLexikon: data.customLexikon || [],
        customRituals: data.customRituals || [],
        ritualFavorites: data.ritualFavorites || [],
        lexikonFavorites: data.lexikonFavorites || [],
        ritualTemplates: data.ritualTemplates || [],
        ritualJournal: opts.includeJournal === false ? [] : (data.ritualJournal || []),
        practiceLog: opts.includePracticeLog === false ? [] : (data.practiceLog || []),
        intentionHistory: data.intentionHistory || [],
        dailyIntention: data.dailyIntention || null,
        kreisNotes: data.kreisNotes || [],
        sigilGallery: data.sigilGallery || [],
        pathWeekDone: data.pathWeekDone || {},
        pathWerkzeug: data.pathWerkzeug || {},
        briefingPins: data.briefingPins || [],
        settings: Object.assign({}, keySettings),
        onboarding: data.onboarding || {},
        streaks: data.streaks || {}
      },
      keySettings: keySettings
    };
  }

  global.UniversumStorage = {
    STORAGE_KEY,
    DEFAULTS,
    APP_VERSION,
    BRIEFING_PIN_OPTIONS,
    load,
    save,
    update,
    exportBuch,
    exportBuchAsync,
    collectDiaryPhotoIds,
    exportPracticeSummary,
    buildExportMeta,
    importBuch,
    uid,
    todayKey,
    get369,
    set369,
    recordPractice,
    getStreak,
    resetOnboarding,
    completeOnboarding,
    recordCardDraw,
    getCardDrawHistory,
    hashIntention,
    getDailyIntention,
    setDailyIntention,
    toggleRitualFavorite,
    isRitualFavorite,
    getBriefingPins,
    setBriefingPins,
    addSigilGalleryEntry,
    removeSigilGalleryEntry,
    clearSigilGallery,
    getSigilGallery,
    getIntentionHistory,
    clearIntentionHistory,
    addPracticeLog,
    removePracticeLog,
    getPracticeLog,
    getWeeklyPracticeSummary,
    shouldShowInstallHint,
    dismissInstallHint,
    shouldShowStarterFlow,
    markStarterDone,
    dismissStarterFlow,
    resetStarterFlow,
    addKreisNote,
    removeKreisNote,
    getKreisNotes,
    normalizePins,
    getLastSaveResult,
    entryCount,
    BACKUP_EVERY_N,
    checkDayRollover,
    dismissDayBanner,
    shouldShowDayBanner,
    getDailyCard,
    setDailyCard,
    clearDailyCardIfStale,
    shouldRemindBackup,
    markBackupReminded,
    markBackupExported,
    normalizeTemplates,
    getRitualTemplates,
    saveRitualTemplate,
    removeRitualTemplate,
    getPathWeekDone,
    markPathWeekDay,
    isPathWeekDayDone,
    hasInitiationAck,
    setInitiationAck,
    getPathWerkzeugState,
    setPathWerkzeugState,
    addRitualJournalEntry,
    getRitualJournal,
    removeRitualJournalEntry,
    getCustomLexikon,
    upsertCustomLexikon,
    removeCustomLexikon,
    lexikonFavKey,
    getLexikonFavorites,
    isLexikonFavorite,
    toggleLexikonFavorite,
    exportLexikon,
    exportLexikonText,
    getLastActivity,
    touchLastActivity,
    getReminders,
    setReminders,
    markReminderFired,
    wasReminderFired,
    getFirstSessionTipShown,
    markFirstSessionTipShown,
    buildBackupPayload
  };
})(typeof window !== 'undefined' ? window : globalThis);
