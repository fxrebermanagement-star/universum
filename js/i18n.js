/**
 * UNIVERSUM — UI chrome i18n (DE default, EN optional).
 * Lexikon / path content stays German. No Gendersprache.
 */
(function (global) {
  'use strict';

  var DICT = {
    de: {
      'nav.altar': 'Altar',
      'nav.kalender': 'Kalender',
      'nav.kosmos': 'Kosmos',
      'nav.rituale': 'Rituale',
      'nav.resonanzen': 'Resonanzen',
      'nav.resonanz': 'Resonanz',
      'nav.buch': 'Buch',
      'nav.main': 'Hauptnavigation',
      'nav.altarApps': 'Altar Apps',

      'common.save': 'Speichern',
      'common.close': 'Schließen',
      'common.later': 'Später',
      'common.understood': 'Verstanden',
      'common.cancel': 'Abbrechen',
      'common.search': 'Suchen',
      'common.settings': 'Einstellungen',
      'common.comingSoon': 'Bald verfügbar',
      'common.share': 'Teilen',
      'common.copyLink': 'Link kopieren',
      'common.recommend': 'Empfehlen',
      'common.local': 'lokal',
      'common.trust': 'Vertrauen',

      'settings.title': 'Einstellungen',
      'settings.closeAria': 'Einstellungen schließen',
      'settings.openAria': 'Einstellungen öffnen',
      'settings.lang': 'Sprache',
      'settings.langHint': 'Deutsch ist die Grundlage. English für die Oberfläche.',
      'settings.location': 'Standort',
      'settings.locationHint': 'Für Sonnenzeiten und Planetenstunden',
      'settings.lat': 'Breite',
      'settings.lon': 'Länge',
      'settings.locSave': 'Ort am Altar merken',
      'settings.zurich': 'Zürich',
      'settings.perception': 'Wahrnehmung',
      'settings.search': 'Suche',
      'settings.searchHint': 'Rituale, Feldkarten-Namen, Magie-Buch',
      'settings.searchPlaceholder': 'Begriff eingeben…',
      'settings.appShare': 'App & Teilen',
      'settings.appShareHint': 'PWA auf den Home-Bildschirm · offline-fähig · Daten nur lokal, kein Konto.',
      'settings.trustCard': 'Vertrauen · lokal · kein Sync',
      'settings.trustCardBody': 'Kein Login, kein Online-Kreis, kein Backend. Praxis und Magie-Buch bleiben auf diesem Gerät.',
      'settings.install': 'Zum Homescreen / Hinweis',
      'settings.reminders': 'Lokale Erinnerungen',
      'settings.backup': 'Backup & Import',
      'settings.backupHint': 'Lokal: Magie-Buch, eigenes Lexikon, Favoriten, Schlüssel-Settings — ohne Geheimnisse, ohne Upload.',
      'settings.trust': 'Vertrauen',
      'settings.trustHint': 'Ethik, Privatsphäre (lokal), kein medizinischer Rat, Maß, geschlossene Traditionen.',
      'settings.tip': 'Tipp des Tages',
      'settings.astro': 'Astronomie',
      'settings.onboarding': 'Onboarding',
      'settings.footer': 'Daten bleiben lokal auf diesem Gerät',
      'settings.openFromCockpit': '⚙ Einstellungen',

      'install.title': 'Einladung · auf den Homescreen',
      'install.text': 'Leg UNIVERSUM sanft auf den Homescreen — Rituale und Magie-Buch auch offline. Privat, lokal, ohne Konto und ohne Store. Ganz freiwillig.',
      'install.prompt': 'Zum Homescreen',
      'install.ok': 'Verstanden',
      'install.later': 'Später',

      'empfehlen.title': 'Empfehlen',
      'empfehlen.lead': 'Magst du UNIVERSUM weitergeben? Teilen, Link kopieren oder auf den Homescreen — alles bleibt lokal, ohne Konto.',
      'empfehlen.share': 'Teilen',
      'empfehlen.copy': 'Link kopieren',
      'empfehlen.install': 'Zum Homescreen',
      'empfehlen.plusSoft': 'Bald: UNIVERSUM+ — 1 Monat gratis, danach CHF 5 / Monat.',

      'plus.title': 'UNIVERSUM+',
      'plus.copy': '1 Monat gratis testen — danach CHF 5 pro Monat. Jederzeit kündbar. Praxis-Daten bleiben lokal.',
      'plus.btn': 'Bald verfügbar',

      'sec.kalender': 'Kalender',
      'sec.kosmos': 'Kosmos',
      'sec.rituale': 'Rituale',
      'sec.resonanzen': 'Resonanzen',
      'sec.buch': 'Magie-Buch',

      'landing.eyebrow': 'PRAXIS · LOKAL · STILL',
      'landing.mark': 'Dein magisches Home',
      'landing.tagline': 'Dein magischer Begleiter — warm, spielerisch, ganz bei dir.',
      'landing.value': 'Alle haben Angst vor Magie — wir nehmen ihnen das. In ein paar Minuten: Altar → kleines Ritual → Magie-Buch. Kein Feed, kein Konto — nur du und freundliche Praxis.',
      'landing.forWhom': 'Für wen',
      'landing.forWhomBody': 'Wer Praxis hält · Haltung statt Show',
      'landing.local': 'Lokal',
      'landing.localBody': 'Alles bleibt auf diesem Gerät',
      'landing.ethical': 'Ethisch',
      'landing.ethicalBody': 'Grenze & Ausgleich · kein Schaden',
      'landing.ethics': 'Grenze und Ausgleich. Kein Schaden an Personen. Ein Handy kann keine Geister messen.',
      'landing.enter': 'Altar öffnen — lass dich einladen',
      'landing.share': 'Empfehlen · Teilen',
      'landing.copy': 'Link kopieren',
      'landing.localHint': 'Lokal auf dem Gerät · kein Konto · kein Tracking',
      'landing.install': 'Gerne auf den Homescreen legen — offline-fähig, lokal, ohne Store und ohne Konto.',
      'landing.foot': 'Früher: Feldlicht Ritualbegleiter · Daten bleiben lokal auf dem Gerät',

      'toast.langDe': 'Sprache: Deutsch',
      'toast.langEn': 'Language: English'
    },
    en: {
      'nav.altar': 'Altar',
      'nav.kalender': 'Calendar',
      'nav.kosmos': 'Cosmos',
      'nav.rituale': 'Rituals',
      'nav.resonanzen': 'Resonances',
      'nav.resonanz': 'Resonance',
      'nav.buch': 'Book',
      'nav.main': 'Main navigation',
      'nav.altarApps': 'Altar apps',

      'common.save': 'Save',
      'common.close': 'Close',
      'common.later': 'Later',
      'common.understood': 'Got it',
      'common.cancel': 'Cancel',
      'common.search': 'Search',
      'common.settings': 'Settings',
      'common.comingSoon': 'Coming soon',
      'common.share': 'Share',
      'common.copyLink': 'Copy link',
      'common.recommend': 'Recommend',
      'common.local': 'local',
      'common.trust': 'Trust',

      'settings.title': 'Settings',
      'settings.closeAria': 'Close settings',
      'settings.openAria': 'Open settings',
      'settings.lang': 'Language',
      'settings.langHint': 'German is the baseline. English covers the chrome.',
      'settings.location': 'Location',
      'settings.locationHint': 'For sun times and planetary hours',
      'settings.lat': 'Latitude',
      'settings.lon': 'Longitude',
      'settings.locSave': 'Remember place at Altar',
      'settings.zurich': 'Zurich',
      'settings.perception': 'Senses',
      'settings.search': 'Search',
      'settings.searchHint': 'Rituals, field-card names, Magie-Buch',
      'settings.searchPlaceholder': 'Type a word…',
      'settings.appShare': 'App & share',
      'settings.appShareHint': 'PWA to the home screen · works offline · data stays local, no account.',
      'settings.trustCard': 'Trust · local · no sync',
      'settings.trustCardBody': 'No login, no online circle, no backend. Practice and Magie-Buch stay on this device.',
      'settings.install': 'Home screen / tip',
      'settings.reminders': 'Local reminders',
      'settings.backup': 'Backup & import',
      'settings.backupHint': 'Local: Magie-Buch, your lexicon, favorites, key settings — no secrets, no upload.',
      'settings.trust': 'Trust',
      'settings.trustHint': 'Ethics, privacy (local), no medical advice, measure, closed traditions.',
      'settings.tip': 'Tip of the day',
      'settings.astro': 'Astronomy',
      'settings.onboarding': 'Onboarding',
      'settings.footer': 'Data stays local on this device',
      'settings.openFromCockpit': '⚙ Settings',

      'install.title': 'Invitation · home screen',
      'install.text': 'Set UNIVERSUM gently on your home screen — rituals and Magie-Buch offline too. Private, local, no account, no store. Entirely optional.',
      'install.prompt': 'Add to home screen',
      'install.ok': 'Got it',
      'install.later': 'Later',

      'empfehlen.title': 'Recommend',
      'empfehlen.lead': 'Like UNIVERSUM? Share, copy the link, or pin it to the home screen — everything stays local, no account.',
      'empfehlen.share': 'Share',
      'empfehlen.copy': 'Copy link',
      'empfehlen.install': 'Home screen',
      'empfehlen.plusSoft': 'Soon: UNIVERSUM+ — 1 month free, then CHF 5 / month.',

      'plus.title': 'UNIVERSUM+',
      'plus.copy': 'Try 1 month free — then CHF 5 per month. Cancel anytime. Practice data stays local.',
      'plus.btn': 'Coming soon',

      'sec.kalender': 'Calendar',
      'sec.kosmos': 'Cosmos',
      'sec.rituale': 'Rituals',
      'sec.resonanzen': 'Resonances',
      'sec.buch': 'Magie-Buch',

      'landing.eyebrow': 'PRACTICE · LOCAL · QUIET',
      'landing.mark': 'Your magical home',
      'landing.tagline': 'Your magical companion — warm, playful, wholly yours.',
      'landing.value': 'Many fear magic — we ease that. In a few minutes: Altar → small ritual → Magie-Buch. No feed, no account — just you and friendly practice.',
      'landing.forWhom': 'For whom',
      'landing.forWhomBody': 'Who keeps a practice · stance over show',
      'landing.local': 'Local',
      'landing.localBody': 'Everything stays on this device',
      'landing.ethical': 'Ethical',
      'landing.ethicalBody': 'Boundary & balance · no harm',
      'landing.ethics': 'Boundary and balance. No harm to people. A phone cannot measure spirits.',
      'landing.enter': 'Open Altar — you’re invited',
      'landing.share': 'Recommend · Share',
      'landing.copy': 'Copy link',
      'landing.localHint': 'Local on device · no account · no tracking',
      'landing.install': 'Gladly pin to the home screen — offline-ready, local, no store, no account.',
      'landing.foot': 'Formerly: Feldlicht Ritualbegleiter · data stays local on the device',

      'toast.langDe': 'Sprache: Deutsch',
      'toast.langEn': 'Language: English'
    }
  };

  var current = 'de';

  function normalize(lang) {
    return lang === 'en' ? 'en' : 'de';
  }

  function t(key, fallback) {
    var pack = DICT[current] || DICT.de;
    if (pack && pack[key] != null) return pack[key];
    if (DICT.de && DICT.de[key] != null) return DICT.de[key];
    return fallback != null ? fallback : key;
  }

  function getLang() {
    return current;
  }

  function setLang(lang) {
    current = normalize(lang);
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = current;
      }
    } catch (_) { /* ignore */ }
    return current;
  }

  function readStoredLang() {
    try {
      var raw = localStorage.getItem('feldlicht-v15');
      if (!raw) return 'de';
      var data = JSON.parse(raw);
      var lang = data && data.settings && data.settings.lang;
      return normalize(lang);
    } catch (_) {
      return 'de';
    }
  }

  function apply(root) {
    var scope = root || (typeof document !== 'undefined' ? document : null);
    if (!scope || !scope.querySelectorAll) return;
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = current;
      }
    } catch (_) { /* ignore */ }

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n]'), function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var val = t(key);
      if (el.childElementCount && el.getAttribute('data-i18n-keep-children') === '1') {
        // leave structure; only update a dedicated text node if present
        var textNode = null;
        for (var i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === 3 && String(el.childNodes[i].textContent).trim()) {
            textNode = el.childNodes[i];
            break;
          }
        }
        if (textNode) textNode.textContent = ' ' + val;
        else el.appendChild(document.createTextNode(' ' + val));
        return;
      }
      el.textContent = val;
    });

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-html]'), function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!key) return;
      el.innerHTML = t(key);
    });

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-placeholder]'), function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      el.setAttribute('placeholder', t(key));
    });

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-aria]'), function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (!key) return;
      el.setAttribute('aria-label', t(key));
    });

    Array.prototype.forEach.call(scope.querySelectorAll('[data-i18n-title]'), function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (!key) return;
      el.setAttribute('title', t(key));
    });
  }

  function bootFromStorage() {
    setLang(readStoredLang());
    apply();
  }

  global.UniversumI18n = {
    DICT: DICT,
    t: t,
    getLang: getLang,
    setLang: setLang,
    apply: apply,
    readStoredLang: readStoredLang,
    bootFromStorage: bootFromStorage
  };
  global.t = t;

  if (typeof document !== 'undefined') {
    function bootI18n() {
      try { bootFromStorage(); } catch (_) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootI18n);
    else bootI18n();
  }
})(typeof window !== 'undefined' ? window : this);
