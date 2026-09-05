/**
 * UNIVERSUM — Schumann Puls-Visualisierung + optionale Live-Stationsdaten
 * Live: ResonanceOne /api/now (Tomsk SR + NOAA Kp/Solar) — Stations-/Index-Daten
 * Spektrogramm: ResonanceOne /api/spectrogram (Tomsk SOS JPEG, ~5 Min Cache)
 * Explizit: kein Magnetometer, keine Geister-/EMF-Messung, kein Körper-Sensor
 */
(function (global) {
  'use strict';

  const FALLBACK_FREQ = 7.83;
  const API_URL = 'https://resonanceone.app/api/now';
  const REFRESH_MS = 5 * 60 * 1000; // match API cache-control max-age=300
  const SPECTROGRAM_URL = 'https://resonanceone.app/api/spectrogram';
  const SPECTROGRAM_REFRESH_MS = 5 * 60 * 1000;

  let raf = null;
  let audioCtx = null;
  let carrier = null;
  let lfoOsc = null;
  let master = null;
  let runningAudio = false;
  let activeCanvas = null;
  let liveFreqHz = FALLBACK_FREQ;
  let liveMode = false; // true when viz uses live station Hz

  // Soft ambient (separate from Schumann) — very quiet, off by default
  let ambientCtx = null;
  let ambientOsc = null;
  let ambientOsc2 = null;
  let ambientGain = null;
  let ambientRunning = false;

  // Live station fetch state
  let liveEnabled = true;
  let liveReading = null; // last good normalized reading
  let liveStatus = 'idle'; // idle | loading | live | offline | disabled
  let liveError = null;
  let liveTimer = null;
  let liveListeners = [];
  let persistFn = null;
  let spectrogramTimer = null;

  function formatHz(hz) {
    const n = Number(hz);
    if (!isFinite(n)) return '—';
    return String(n).replace('.', ',');
  }

  function drawFrame(canvas, t) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const freq = (liveMode && isFinite(liveFreqHz) && liveFreqHz > 0) ? liveFreqHz : FALLBACK_FREQ;
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 * freq * Math.PI * 2);
    const mid = h / 2;

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0a0612');
    grad.addColorStop(1, '#0e0a18');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Soft grid
    ctx.strokeStyle = 'rgba(62, 207, 191, 0.06)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Glow fill under wave
    ctx.beginPath();
    for (let x = 0; x <= w; x++) {
      const phase = (x / w) * Math.PI * 4 + t * 0.001 * freq * Math.PI * 2;
      const y = mid + Math.sin(phase) * (10 + pulse * 16);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const fillG = ctx.createLinearGradient(0, mid - 30, 0, h);
    fillG.addColorStop(0, 'rgba(62, 207, 191, ' + (0.08 + pulse * 0.1) + ')');
    fillG.addColorStop(1, 'rgba(62, 207, 191, 0)');
    ctx.fillStyle = fillG;
    ctx.fill();

    // Main wave
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(62, 207, 191, ' + (0.5 + pulse * 0.4) + ')';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(62, 207, 191, 0.45)';
    ctx.shadowBlur = 6 + pulse * 8;
    for (let x = 0; x <= w; x++) {
      const phase = (x / w) * Math.PI * 4 + t * 0.001 * freq * Math.PI * 2;
      const y = mid + Math.sin(phase) * (10 + pulse * 16);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Harmonic whisper (thin)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(155, 126, 217, ' + (0.2 + pulse * 0.2) + ')';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x++) {
      const phase = (x / w) * Math.PI * 8 + t * 0.001 * freq * Math.PI * 2 * 1.5;
      const y = mid + Math.sin(phase) * (4 + pulse * 6);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Pulse bar
    ctx.fillStyle = 'rgba(232, 197, 71, ' + (0.25 + pulse * 0.55) + ')';
    ctx.fillRect(0, h - 3, w * pulse, 3);

    // Label — honest about station vs local
    ctx.fillStyle = 'rgba(154, 143, 176, 0.85)';
    ctx.font = '600 10px Manrope, sans-serif';
    const label = liveMode
      ? (formatHz(freq) + ' Hz · Tomsk (kein Sensor)')
      : '7,83 Hz · lokale Visualisierung · kein Sensor';
    ctx.fillText(label, 10, 14);
  }

  function startViz(canvas) {
    if (!canvas) return;
    activeCanvas = canvas;
    if (raf) return; // already looping; will draw active canvas
    const loop = (t) => {
      if (activeCanvas) drawFrame(activeCanvas, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }

  function stopViz() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    activeCanvas = null;
  }

  function startAudio() {
    if (runningAudio) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      carrier = audioCtx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.value = 136;

      lfoOsc = audioCtx.createOscillator();
      lfoOsc.type = 'sine';
      lfoOsc.frequency.value = FALLBACK_FREQ;

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 0.012;

      master = audioCtx.createGain();
      master.gain.value = 0.035;

      lfoOsc.connect(lfoGain);
      lfoGain.connect(master.gain);
      carrier.connect(master);
      master.connect(audioCtx.destination);

      carrier.start();
      lfoOsc.start();
      runningAudio = true;
    } catch (e) {
      console.warn('Schumann audio unavailable', e);
    }
  }

  function stopAudio() {
    try {
      if (carrier) carrier.stop();
      if (lfoOsc) lfoOsc.stop();
      if (audioCtx) audioCtx.close();
    } catch (_) { /* ignore */ }
    carrier = null;
    lfoOsc = null;
    audioCtx = null;
    master = null;
    runningAudio = false;
  }

  function toggleAudio(on) {
    if (on) startAudio();
    else stopAudio();
  }

  function startAmbient() {
    if (ambientRunning) return;
    try {
      ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
      ambientOsc = ambientCtx.createOscillator();
      ambientOsc.type = 'sine';
      ambientOsc.frequency.value = 110; // A2 soft drone
      ambientOsc2 = ambientCtx.createOscillator();
      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.value = 165; // soft fifth whisper
      ambientGain = ambientCtx.createGain();
      ambientGain.gain.value = 0; // fade in quietly
      const filter = ambientCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 480;
      filter.Q.value = 0.7;
      ambientOsc.connect(filter);
      ambientOsc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(ambientCtx.destination);
      ambientOsc.start();
      ambientOsc2.start();
      const now = ambientCtx.currentTime;
      ambientGain.gain.linearRampToValueAtTime(0.012, now + 2.5); // very quiet
      ambientRunning = true;
    } catch (e) {
      console.warn('Ambient tone unavailable', e);
    }
  }

  function stopAmbient() {
    try {
      if (ambientGain && ambientCtx) {
        const now = ambientCtx.currentTime;
        ambientGain.gain.cancelScheduledValues(now);
        ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      }
      setTimeout(() => {
        try {
          if (ambientOsc) ambientOsc.stop();
          if (ambientOsc2) ambientOsc2.stop();
          if (ambientCtx) ambientCtx.close();
        } catch (_) { /* ignore */ }
        ambientOsc = null;
        ambientOsc2 = null;
        ambientGain = null;
        ambientCtx = null;
        ambientRunning = false;
      }, 700);
    } catch (_) {
      ambientOsc = null;
      ambientOsc2 = null;
      ambientGain = null;
      ambientCtx = null;
      ambientRunning = false;
    }
  }

  function toggleAmbient(on) {
    if (on) startAmbient();
    else stopAmbient();
  }

  /* ——— Optional ritual chime / soft close (v5.4) ——— */
  let chimeCtx = null;

  function prefersSilentAudio() {
    try {
      if (typeof document !== 'undefined' && document.hidden) return true;
      if (typeof navigator !== 'undefined' && navigator.userAgentData && false) return false;
      // Respect OS-level reduced motion as a soft preference for optional sound
      if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false; // still allow if user explicitly enabled ritualKlang; caller gates
      }
    } catch (_) { /* ignore */ }
    return false;
  }

  function ensureChimeCtx() {
    if (!chimeCtx || chimeCtx.state === 'closed') {
      chimeCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (chimeCtx.state === 'suspended') {
      try { chimeCtx.resume(); } catch (_) { /* ignore */ }
    }
    return chimeCtx;
  }

  /** Very quiet start chime (ascending soft fifth) */
  function playRitualOpenChime() {
    if (prefersSilentAudio() && document.hidden) return;
    try {
      const ctx = ensureChimeCtx();
      const now = ctx.currentTime;
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      g.connect(ctx.destination);
      const freqs = [392, 588]; // G4 · D5 soft
      freqs.forEach(function (f, i) {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        const filt = ctx.createBiquadFilter();
        filt.type = 'lowpass';
        filt.frequency.value = 1200;
        o.connect(filt);
        filt.connect(g);
        const t0 = now + i * 0.12;
        o.start(t0);
        o.stop(t0 + 0.55);
      });
      g.gain.linearRampToValueAtTime(0.018, now + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    } catch (e) {
      console.warn('Ritual open chime unavailable', e);
    }
  }

  /** Soft close drone fade (descending whisper) */
  function playRitualCloseChime() {
    if (document.hidden) return;
    try {
      const ctx = ensureChimeCtx();
      const now = ctx.currentTime;
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      g.connect(ctx.destination);
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(220, now);
      o.frequency.exponentialRampToValueAtTime(110, now + 1.1);
      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 600;
      o.connect(filt);
      filt.connect(g);
      o.start(now);
      o.stop(now + 1.25);
      g.gain.linearRampToValueAtTime(0.014, now + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    } catch (e) {
      console.warn('Ritual close chime unavailable', e);
    }
  }


  function normalizeReading(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const hz = Number(raw.schumann_frequency_hz);
    return {
      schumann_frequency_hz: isFinite(hz) ? hz : FALLBACK_FREQ,
      schumann_index: raw.schumann_index != null ? Number(raw.schumann_index) : null,
      activity_index: raw.activity_index != null ? Number(raw.activity_index) : null,
      kp_index: raw.kp_index != null ? Number(raw.kp_index) : null,
      kp_label: raw.kp_label || null,
      geomagnetic_status: raw.geomagnetic_status || null,
      solar_flare_class: raw.solar_flare_class || null,
      updated_at: raw.updated_at || null,
      data_source: raw.data_source || null,
      data_quality: raw.data_quality || null,
      confidence_score: raw.confidence_score != null ? Number(raw.confidence_score) : null,
      attribution: raw.attribution || null,
      citation: raw.citation || null,
      methodology_url: raw.methodology_url || null,
      cached_at: new Date().toISOString()
    };
  }

  function applyReading(reading, status) {
    liveReading = reading;
    liveStatus = status;
    if (reading && isFinite(reading.schumann_frequency_hz) && reading.schumann_frequency_hz > 0) {
      liveFreqHz = reading.schumann_frequency_hz;
      liveMode = (status === 'live');
    } else {
      liveFreqHz = FALLBACK_FREQ;
      liveMode = false;
    }
    // Keep LFO near live/fallback if audio running
    try {
      if (lfoOsc && lfoOsc.frequency) lfoOsc.frequency.value = liveMode ? liveFreqHz : FALLBACK_FREQ;
    } catch (_) { /* ignore */ }
    notify();
  }

  function notify() {
    const snap = getLiveState();
    liveListeners.forEach(fn => {
      try { fn(snap); } catch (e) { console.warn(e); }
    });
  }

  function persistCache() {
    if (typeof persistFn === 'function' && liveReading) {
      try { persistFn(liveReading); } catch (e) { console.warn(e); }
    }
  }

  function getLiveState() {
    return {
      enabled: liveEnabled,
      status: liveStatus,
      reading: liveReading,
      error: liveError,
      liveMode: liveMode,
      freqHz: liveMode ? liveFreqHz : FALLBACK_FREQ,
      fallbackHz: FALLBACK_FREQ
    };
  }

  async function fetchNow() {
    if (!liveEnabled) {
      liveStatus = 'disabled';
      liveMode = false;
      liveFreqHz = FALLBACK_FREQ;
      liveError = null;
      notify();
      return getLiveState();
    }
    liveStatus = 'loading';
    liveError = null;
    notify();
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      const reading = normalizeReading(json);
      if (!reading) throw new Error('Ungültige Antwort');
      applyReading(reading, 'live');
      persistCache();
      return getLiveState();
    } catch (e) {
      liveError = (e && e.message) ? e.message : 'Netzwerkfehler';
      if (liveReading) {
        // Keep last good as offline display; viz falls back to local pulse label
        liveStatus = 'offline';
        liveMode = false;
        liveFreqHz = FALLBACK_FREQ;
        notify();
      } else {
        applyReading(null, 'offline');
      }
      return getLiveState();
    }
  }

  function clearLiveTimer() {
    if (liveTimer) {
      clearInterval(liveTimer);
      liveTimer = null;
    }
  }

  function startLive(opts) {
    opts = opts || {};
    if (typeof opts.enabled === 'boolean') liveEnabled = opts.enabled;
    if (typeof opts.persist === 'function') persistFn = opts.persist;
    if (opts.cached) {
      const cached = normalizeReading(opts.cached);
      if (cached) {
        liveReading = cached;
        // Cached = not live until fresh fetch succeeds
        liveStatus = liveEnabled ? 'offline' : 'disabled';
        liveMode = false;
        liveFreqHz = FALLBACK_FREQ;
      }
    }
    clearLiveTimer();
    if (!liveEnabled) {
      liveStatus = 'disabled';
      liveMode = false;
      liveFreqHz = FALLBACK_FREQ;
      notify();
      return Promise.resolve(getLiveState());
    }
    const p = fetchNow();
    liveTimer = setInterval(function () { fetchNow(); }, REFRESH_MS);
    return p;
  }

  function stopLive() {
    clearLiveTimer();
  }

  function setLiveEnabled(on) {
    liveEnabled = !!on;
    if (!liveEnabled) {
      clearLiveTimer();
      liveStatus = 'disabled';
      liveMode = false;
      liveFreqHz = FALLBACK_FREQ;
      liveError = null;
      notify();
      return Promise.resolve(getLiveState());
    }
    clearLiveTimer();
    const p = fetchNow();
    liveTimer = setInterval(function () { fetchNow(); }, REFRESH_MS);
    return p;
  }

  function onLiveUpdate(fn) {
    if (typeof fn === 'function') liveListeners.push(fn);
    return function unsubscribe() {
      liveListeners = liveListeners.filter(f => f !== fn);
    };
  }

  function geoLabelDe(status) {
    const s = String(status || '').toLowerCase();
    if (s === 'quiet') return 'ruhig';
    if (s === 'unsettled') return 'unruhig';
    if (s === 'active') return 'aktiv';
    if (s === 'storm' || s === 'minor storm') return 'Sturm';
    if (s === 'moderate storm') return 'mäßiger Sturm';
    if (s === 'strong storm') return 'starker Sturm';
    return status || '—';
  }

  function formatUpdatedLocal(iso) {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return String(iso);
      return d.toLocaleString('de-CH', {
        timeZone: 'Europe/Zurich',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' MEZ/MESZ';
    } catch (_) {
      return String(iso);
    }
  }


  function spectrogramSrc() {
    return SPECTROGRAM_URL + '?t=' + Date.now();
  }

  function clearSpectrogramTimer() {
    if (spectrogramTimer) {
      clearInterval(spectrogramTimer);
      spectrogramTimer = null;
    }
  }

  function setSpectrogramError(wrap, img, errEl, on) {
    if (wrap) wrap.classList.toggle('is-error', !!on);
    if (img) img.hidden = !!on;
    if (errEl) errEl.hidden = !on;
  }

  function refreshSpectrogram() {
    if (typeof document === 'undefined') return;
    const wraps = document.querySelectorAll('[data-sch-spectrogram]');
    if (!wraps.length) return;
    const src = spectrogramSrc();
    wraps.forEach(function (wrap) {
      const img = wrap.querySelector('[data-sch-spectrogram-img]');
      const errEl = wrap.querySelector('[data-sch-spectrogram-err]');
      if (!img) return;
      const probe = new Image();
      probe.onload = function () {
        img.src = src;
        img.removeAttribute('hidden');
        setSpectrogramError(wrap, img, errEl, false);
      };
      probe.onerror = function () {
        setSpectrogramError(wrap, img, errEl, true);
      };
      probe.src = src;
    });
  }

  function startSpectrogram() {
    refreshSpectrogram();
    clearSpectrogramTimer();
    spectrogramTimer = setInterval(refreshSpectrogram, SPECTROGRAM_REFRESH_MS);
  }

  function stopSpectrogram() {
    clearSpectrogramTimer();
  }

  global.UniversumSchumann = {
    FREQ: FALLBACK_FREQ,
    API_URL,
    REFRESH_MS,
    SPECTROGRAM_URL,
    SPECTROGRAM_REFRESH_MS,
    startViz,
    stopViz,
    toggleAudio,
    isAudioRunning: () => runningAudio,
    toggleAmbient,
    isAmbientRunning: () => ambientRunning,
    playRitualOpenChime,
    playRitualCloseChime,
    startLive,
    stopLive,
    setLiveEnabled,
    fetchNow,
    getLiveState,
    onLiveUpdate,
    formatHz,
    geoLabelDe,
    formatUpdatedLocal,
    startSpectrogram,
    stopSpectrogram,
    refreshSpectrogram
  };
})(typeof window !== 'undefined' ? window : globalThis);
