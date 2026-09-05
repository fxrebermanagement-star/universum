/**
 * UNIVERSUM — Astronomie & Kalender (JS-Näherungen für die Praxis)
 * Standardort: Europa/Zürich 47,37°N · 8,54°E
 *
 * Dokumentierte Methoden (kein Ephemeriden-Ersatz):
 * - Mondphase: synodischer Monat ab JD 2451550.1 (Neumond 2000-01-06),
 *   Beleuchtung = 0,5·(1−cos(2π·phase)); Feinsuche für Neu-/Vollmond ±0,5 d.
 * - Sonne tropisch: ekliptikale Länge (Meeus-ähnlich, mittlere Anomalie + Gleichung
 *   der Mitte) → Zeichen = floor(λ/30).
 * - Planetenstunden: Sonnenauf-/untergang (NOAA-ähnlich, Refraktion −0,83°),
 *   12 Tag- + 12 Nachtstunden, chaldäische Reihe ab Tagesregent (So=Sonne…).
 * - VoC-Stil: Mond nahe Zeichenende (>27°) oder frisch im Zeichen (<2°) —
 *   keine Aspekt-Tabelle, nur Grenzhinweis.
 * - Retrograd: grobe Zyklen (Merkur ~116 d, Venus ~584 d), nur Indikator.
 */
(function (global) {
  'use strict';

  const DEFAULT_LAT = 47.37;
  const DEFAULT_LON = 8.54;
  const SYNODIC = 29.530588853;
  const KNOWN_NEW = 2451550.1; // 2000-01-06 approx new moon JD
  const OBLIQUITY = 23.4392911;

  const PLANETS_HOUR_SEQ = ['Saturn', 'Jupiter', 'Mars', 'Sonne', 'Venus', 'Merkur', 'Mond'];
  // Chaldean start index by weekday (0=Sonntag → Sonne = Index 3 in PLANETS_HOUR_SEQ)
  const DAY_RULER_IDX = [3, 6, 2, 5, 1, 4, 0];

  const ZODIAC = ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
    'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische'];

  const FESTIVALS = [
    { name: 'Imbolc', m: 2, d: 1 },
    { name: 'Ostara', m: 3, d: 20 },
    { name: 'Beltane', m: 5, d: 1 },
    { name: 'Litha', m: 6, d: 21 },
    { name: 'Lughnasadh', m: 8, d: 1 },
    { name: 'Mabon', m: 9, d: 22 },
    { name: 'Samhain', m: 10, d: 31 },
    { name: 'Yule', m: 12, d: 21 },
    { name: 'Lostage (Probe)', m: 12, d: 25 },
    { name: 'Rauhnächte Beginn', m: 12, d: 25 },
    { name: 'Rauhnächte Ende', m: 1, d: 6 }
  ];

  function toJulian(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  function fromJulian(jd) {
    return new Date((jd - 2440587.5) * 86400000);
  }

  function normalizeAngle(a) {
    a = a % 360;
    return a < 0 ? a + 360 : a;
  }

  /** Approximate moon illumination 0–1 and age in days */
  function moonPhase(date) {
    const jd = toJulian(date || new Date());
    const age = ((jd - KNOWN_NEW) % SYNODIC + SYNODIC) % SYNODIC;
    const phase = age / SYNODIC; // 0=new, 0.5=full
    const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * phase));
    let name;
    if (phase < 0.02 || phase >= 0.98) name = 'Neumond';
    else if (phase < 0.22) name = 'Zunehmende Sichel';
    else if (phase < 0.28) name = 'Zunehmender Halbmond';
    else if (phase < 0.47) name = 'Zunehmender Mond';
    else if (phase < 0.53) name = 'Vollmond';
    else if (phase < 0.72) name = 'Abnehmender Mond';
    else if (phase < 0.78) name = 'Abnehmender Halbmond';
    else name = 'Abnehmende Sichel';
    const waxing = phase < 0.5;
    return {
      age: Math.round(age * 100) / 100,
      phase,
      illumination,
      name,
      percent: Math.round(illumination * 100),
      waxing,
      emoji: phase < 0.03 || phase > 0.97 ? '🌑'
        : phase < 0.22 ? '🌒' : phase < 0.28 ? '🌓' : phase < 0.47 ? '🌔'
        : phase < 0.53 ? '🌕' : phase < 0.72 ? '🌖' : phase < 0.78 ? '🌗' : '🌘'
    };
  }

  /** Fine search for next new (0) or full (0.5) moon */
  function nextMoonEvent(date, targetPhase) {
    const start = date || new Date();
    const startJd = toJulian(start);
    let bestJd = null;
    let bestDist = 1;
    // Coarse: 1-hour steps for ~35 days
    for (let h = 0; h < 35 * 24; h++) {
      const jd = startJd + h / 24;
      const age = ((jd - KNOWN_NEW) % SYNODIC + SYNODIC) % SYNODIC;
      const phase = age / SYNODIC;
      let dist = Math.abs(phase - targetPhase);
      dist = Math.min(dist, 1 - dist);
      if (dist < bestDist && jd > startJd + 0.02) {
        bestDist = dist;
        bestJd = jd;
        if (dist < 0.0008) break;
      }
    }
    if (bestJd == null) return null;
    // Refine ±2h in 2-min steps
    let refined = bestJd;
    let refinedDist = bestDist;
    for (let m = -120; m <= 120; m += 2) {
      const jd = bestJd + m / (24 * 60);
      if (jd <= startJd) continue;
      const age = ((jd - KNOWN_NEW) % SYNODIC + SYNODIC) % SYNODIC;
      const phase = age / SYNODIC;
      let dist = Math.abs(phase - targetPhase);
      dist = Math.min(dist, 1 - dist);
      if (dist < refinedDist) {
        refinedDist = dist;
        refined = jd;
      }
    }
    return fromJulian(refined);
  }

  /** Tropical sun sign from ecliptic longitude (more accurate than calendar bounds) */
  function tropicalSunSign(date) {
    const lon = sunLongitude(date);
    return ZODIAC[Math.floor(lon / 30) % 12];
  }

  function sunLongitude(date) {
    const jd = toJulian(date || new Date());
    const T = (jd - 2451545.0) / 36525;
    const L0 = normalizeAngle(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = normalizeAngle(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const Mr = M * Math.PI / 180;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
      + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
      + 0.000289 * Math.sin(3 * Mr);
    return normalizeAngle(L0 + C);
  }

  function moonLongitude(date) {
    const jd = toJulian(date || new Date());
    const T = (jd - 2451545.0) / 36525;
    const L = normalizeAngle(218.3164477 + 481267.88123421 * T);
    const M = normalizeAngle(134.9633964 + 477198.8675055 * T) * Math.PI / 180;
    const Mm = normalizeAngle(357.5291092 + 35999.0502909 * T) * Math.PI / 180;
    const F = normalizeAngle(93.2720950 + 483202.0175233 * T) * Math.PI / 180;
    const D = normalizeAngle(297.8501921 + 445267.1114034 * T) * Math.PI / 180;
    const lon = L
      + 6.289 * Math.sin(M)
      - 1.274 * Math.sin(2 * D - M)
      + 0.658 * Math.sin(2 * D)
      - 0.186 * Math.sin(Mm)
      - 0.059 * Math.sin(2 * M)
      - 0.114 * Math.sin(2 * F)
      + 0.214 * Math.sin(2 * M)
      - 0.059 * Math.sin(2 * D - 2 * M);
    return normalizeAngle(lon);
  }

  function moonSignInfo(date) {
    const lon = moonLongitude(date);
    const idx = Math.floor(lon / 30) % 12;
    const deg = lon % 30;
    return { sign: ZODIAC[idx], degrees: Math.round(deg * 10) / 10, longitude: lon };
  }

  function planetLongitudes(date) {
    const jd = toJulian(date || new Date());
    const T = (jd - 2451545.0) / 36525;
    return {
      Sonne: sunLongitude(date),
      Mond: moonLongitude(date),
      Merkur: normalizeAngle(252.250906 + 149472.6746358 * T),
      Venus: normalizeAngle(181.979801 + 58517.8156760 * T),
      Mars: normalizeAngle(355.433 + 19140.2993313 * T),
      Jupiter: normalizeAngle(34.351519 + 3034.9056606 * T),
      Saturn: normalizeAngle(50.077444 + 1222.1138488 * T)
    };
  }

  /** Sunrise/sunset for lat/lon (approx., civil −0.83°) */
  function sunTimes(date, lat, lon) {
    lat = lat != null ? lat : DEFAULT_LAT;
    lon = lon != null ? lon : DEFAULT_LON;
    const d = date || new Date();
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
    const jd = toJulian(day);
    const n = Math.round(jd - 2451545.0 + 0.0008);
    const Jstar = n - lon / 360;
    const M = normalizeAngle(357.5291 + 0.98560028 * Jstar) * Math.PI / 180;
    const C = 1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M);
    const lambda = normalizeAngle(280.47 + 0.9856474 * Jstar + C) * Math.PI / 180;
    const decl = Math.asin(Math.sin(lambda) * Math.sin(OBLIQUITY * Math.PI / 180));
    const latR = lat * Math.PI / 180;
    const cosHa = (Math.sin(-0.83 * Math.PI / 180) - Math.sin(latR) * Math.sin(decl)) /
      (Math.cos(latR) * Math.cos(decl));
    let ha;
    if (cosHa >= 1) ha = 0;
    else if (cosHa <= -1) ha = Math.PI;
    else ha = Math.acos(cosHa);
    const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * lambda);
    const Jrise = Jtransit - ha / (2 * Math.PI);
    const Jset = Jtransit + ha / (2 * Math.PI);
    const rise = fromJulian(Jrise);
    const set = fromJulian(Jset);
    return { rise, set, dayLengthMs: Math.max(0, set - rise), transit: fromJulian(Jtransit) };
  }

  function planetaryHour(date, lat, lon) {
    const now = date || new Date();
    const { rise, set } = sunTimes(now, lat, lon);
    const weekday = now.getDay();
    const dayStartIdx = DAY_RULER_IDX[weekday];
    let isDay, hourIndex, segmentStart, segmentLen;

    if (now >= rise && now < set) {
      isDay = true;
      segmentLen = (set - rise) / 12;
      hourIndex = Math.min(11, Math.max(0, Math.floor((now - rise) / segmentLen)));
      segmentStart = new Date(rise.getTime() + hourIndex * segmentLen);
    } else {
      isDay = false;
      let nightStart = set;
      let nextRise = rise;
      if (now < rise) {
        const yest = new Date(now.getTime() - 86400000);
        const yt = sunTimes(yest, lat, lon);
        nightStart = yt.set;
        nextRise = rise;
      } else {
        const tom = new Date(now.getTime() + 86400000);
        nextRise = sunTimes(tom, lat, lon).rise;
      }
      segmentLen = (nextRise - nightStart) / 12;
      hourIndex = Math.min(11, Math.max(0, Math.floor((now - nightStart) / segmentLen)));
      segmentStart = new Date(nightStart.getTime() + hourIndex * segmentLen);
    }

    const absoluteHour = isDay ? hourIndex : 12 + hourIndex;
    const planetIdx = (dayStartIdx + absoluteHour) % 7;
    const planet = PLANETS_HOUR_SEQ[planetIdx];
    const segmentEnd = new Date(segmentStart.getTime() + segmentLen);
    const remainMs = Math.max(0, segmentEnd - now);
    return {
      planet,
      isDay,
      hourIndex: hourIndex + 1,
      absoluteHour: absoluteHour + 1,
      start: segmentStart,
      end: segmentEnd,
      dayRuler: PLANETS_HOUR_SEQ[dayStartIdx],
      remainMin: Math.round(remainMs / 60000),
      sunrise: rise,
      sunset: set
    };
  }

  function planetaryHoursTable(date, lat, lon) {
    const d = date || new Date();
    const { rise, set } = sunTimes(d, lat, lon);
    const tom = new Date(d.getTime() + 86400000);
    const nextRise = sunTimes(tom, lat, lon).rise;
    const weekday = d.getDay();
    const dayStartIdx = DAY_RULER_IDX[weekday];
    const daySeg = (set - rise) / 12;
    const nightSeg = (nextRise - set) / 12;
    const hours = [];
    for (let i = 0; i < 12; i++) {
      hours.push({
        n: i + 1,
        planet: PLANETS_HOUR_SEQ[(dayStartIdx + i) % 7],
        start: new Date(rise.getTime() + i * daySeg),
        end: new Date(rise.getTime() + (i + 1) * daySeg),
        isDay: true
      });
    }
    for (let i = 0; i < 12; i++) {
      hours.push({
        n: i + 13,
        planet: PLANETS_HOUR_SEQ[(dayStartIdx + 12 + i) % 7],
        start: new Date(set.getTime() + i * nightSeg),
        end: new Date(set.getTime() + (i + 1) * nightSeg),
        isDay: false
      });
    }
    return hours;
  }

  function festivalsOn(date) {
    const d = date || new Date();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return FESTIVALS.filter(f => f.m === m && f.d === day);
  }

  function festivalsInMonth(year, month) {
    return FESTIVALS.filter(f => f.m === month + 1).map(f => ({
      ...f,
      date: new Date(year, month, f.d)
    }));
  }

  /**
   * Void-of-course style warning (approximation):
   * Moon in last ~3° of sign ≈ classic VoC feel (no major aspects before egress).
   * Fresh ingress (<2°) = settle, don't force.
   */
  function moonVoidWarning(date) {
    const info = moonSignInfo(date);
    const inSign = info.degrees;
    const nearEnd = inSign > 27;
    const nearStart = inSign < 2;
    const idx = ZODIAC.indexOf(info.sign);
    return {
      active: nearEnd,
      soft: nearStart,
      moonSign: info.sign,
      degreesInSign: inSign,
      message: nearEnd
        ? 'VoC-Hinweis: Mond in den letzten Graden von ' + info.sign +
          ' (→ ' + ZODIAC[(idx + 1) % 12] + ') — neue Vorhaben zurückhalten.'
        : nearStart
          ? 'Mond frisch in ' + info.sign + ' (' + inSign.toFixed(1) + '°) — Impulse setzen, festigen.'
          : 'Mond in ' + info.sign + ' · ' + inSign.toFixed(1) + '°'
    };
  }

  function retrogradesApprox(date) {
    const jd = toJulian(date || new Date());
    const mercCycle = ((jd - 2451545) % 116 + 116) % 116;
    const mercRx = mercCycle > 90 && mercCycle < 111;
    const venCycle = ((jd - 2451545) % 584 + 584) % 584;
    const venRx = venCycle > 540 && venCycle < 580;
    const list = [];
    if (mercRx) list.push('Merkur');
    if (venRx) list.push('Venus');
    return list;
  }

  function computeUnrest(date, checkIn) {
    const moon = moonPhase(date);
    const phaseStress = Math.abs(moon.illumination - 0.5) < 0.15
      ? 35 + (0.5 - Math.abs(moon.illumination - 0.5)) * 80
      : moon.illumination > 0.85 || moon.illumination < 0.15 ? 40 : 15;
    const rx = retrogradesApprox(date);
    const rxStress = rx.length * 18;
    const voidW = moonVoidWarning(date);
    const voidStress = voidW.active ? 12 : 0;
    const check = checkIn != null ? Math.max(0, Math.min(40, checkIn * 8)) : 10;
    const raw = Math.min(100, phaseStress + rxStress + voidStress + check);
    let level, color, label;
    if (raw < 35) { level = 'ruhig'; color = 'var(--unrest-green)'; label = 'Ruhig'; }
    else if (raw < 65) { level = 'bewegt'; color = 'var(--unrest-yellow)'; label = 'Bewegt'; }
    else { level = 'hoch'; color = 'var(--unrest-red)'; label = 'Hoch'; }
    return {
      value: Math.round(raw),
      level,
      color,
      label,
      factors: { moon: moon.name, rx, voc: voidW.active }
    };
  }

  function recommendations(date, lat, lon, unrest) {
    const moon = moonPhase(date);
    const hour = planetaryHour(date, lat, lon);
    const u = unrest || computeUnrest(date);
    const voidW = moonVoidWarning(date);
    const recs = [];
    if (moon.phase < 0.08) recs.push('Neumond: Intention setzen, nicht erzwingen.');
    else if (moon.phase > 0.45 && moon.phase < 0.55) recs.push('Vollmond: Loslassen, danken, nicht neu beginnen.');
    else if (moon.phase < 0.5) recs.push('Zunehmend: aufbauen, üben, festigen.');
    else recs.push('Abnehmend: reinigen, abschließen, ruhen.');

    const hourTips = {
      Sonne: 'Sonnenstunde: Klarheit, Präsenz, kurze Anrufung.',
      Mond: 'Mondstunde: Gefühl, Traum, sanfte Pflege.',
      Mars: 'Marsstunde: Schutz, Grenzen, mutige Schritte — ohne Schaden.',
      Merkur: 'Merkurstunde: Schreiben, Sigil, klare Worte.',
      Jupiter: 'Jupiterstunde: Segen, Erweiterung, Studium.',
      Venus: 'Venusstunde: Harmonie, Schönheit, Ausgleich.',
      Saturn: 'Saturnstunde: Struktur, Grenze, ernsthafte Arbeit.'
    };
    recs.push(hourTips[hour.planet] || '');
    if (voidW.active) recs.push(voidW.message);
    if (u.level === 'hoch') recs.push('Unruhe hoch: Erdung vor Magie, Kreis klein halten.');
    else if (u.level === 'ruhig') recs.push('Feld ruhig: gute Zeit für feine Arbeit und Atembrücke.');
    return recs.filter(Boolean);
  }

  global.UniversumAstro = {
    DEFAULT_LAT,
    DEFAULT_LON,
    PLANETS_HOUR_SEQ,
    ZODIAC,
    FESTIVALS,
    moonPhase,
    nextMoonEvent,
    tropicalSunSign,
    sunLongitude,
    moonLongitude,
    moonSignInfo,
    planetLongitudes,
    sunTimes,
    planetaryHour,
    planetaryHoursTable,
    festivalsOn,
    festivalsInMonth,
    moonVoidWarning,
    retrogradesApprox,
    computeUnrest,
    recommendations
  };
})(typeof window !== 'undefined' ? window : globalThis);
