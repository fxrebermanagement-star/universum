/**
 * UNIVERSUM — Schumann 7,83 Hz Puls-Visualisierung
 * Optional: leiser 136-Hz-Träger (Web Audio)
 * Explizit: kein Magnetometer, keine Geister-/EMF-Messung
 */
(function (global) {
  'use strict';

  const FREQ = 7.83;
  let raf = null;
  let audioCtx = null;
  let carrier = null;
  let lfoOsc = null;
  let master = null;
  let runningAudio = false;
  let activeCanvas = null;

  // Soft ambient (separate from Schumann) — very quiet, off by default
  let ambientCtx = null;
  let ambientOsc = null;
  let ambientOsc2 = null;
  let ambientGain = null;
  let ambientRunning = false;

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

    const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 * FREQ * Math.PI * 2);
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
      const phase = (x / w) * Math.PI * 4 + t * 0.001 * FREQ * Math.PI * 2;
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
      const phase = (x / w) * Math.PI * 4 + t * 0.001 * FREQ * Math.PI * 2;
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
      const phase = (x / w) * Math.PI * 8 + t * 0.001 * FREQ * Math.PI * 2 * 1.5;
      const y = mid + Math.sin(phase) * (4 + pulse * 6);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Pulse bar
    ctx.fillStyle = 'rgba(232, 197, 71, ' + (0.25 + pulse * 0.55) + ')';
    ctx.fillRect(0, h - 3, w * pulse, 3);

    // Label
    ctx.fillStyle = 'rgba(154, 143, 176, 0.85)';
    ctx.font = '600 10px Manrope, sans-serif';
    ctx.fillText('7,83 Hz · Visualisierung · kein Sensor', 10, 14);
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
      lfoOsc.frequency.value = FREQ;

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

  global.UniversumSchumann = {
    FREQ,
    startViz,
    stopViz,
    toggleAudio,
    isAudioRunning: () => runningAudio,
    toggleAmbient,
    isAmbientRunning: () => ambientRunning
  };
})(typeof window !== 'undefined' ? window : globalThis);
