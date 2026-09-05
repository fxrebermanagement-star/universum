/**
 * UNIVERSUM — Sigil: Ethikfilter → Reduktion → Canvas → Atem-Aufladung → Vergessen
 */
(function (global) {
  'use strict';

  const BLOCK_PATTERNS = [
    /fluch/i, /verfluch/i, /verdam+t/i, /hexen?\s*gegen/i,
    /schaden\s*(an|für|gegen)/i, /töten/i, /mord/i, /hass\s*auf/i,
    /rache/i, /ruinier/i, /zerstör(e|en)?\s*(ihn|sie|dich|den|die|das)?/i,
    /krank\s*machen/i, /verfluchen/i, /ban+en?\s*gegen/i,
    /curse/i, /hex\s+against/i, /kill\b/i, /harm\s+(him|her|them)/i,
    /willensbeugung/i, /zwang\s*gegen/i, /liebe\s*erzwingen/i,
    /bindungszauber\s*gegen/i, /tod\s*(für|über|an)/i,
    /bestrafen/i, /bestrafung/i, /unglück\s*(bringen|wünschen)/i,
    /vernichten/i, /zerstöre\s+(ihn|sie|die\s+person)/i
  ];

  const VOWELS = /[aeiouäöüAEIOUÄÖÜ\s.,;:!?\-'„“"()/\\0-9]/g;

  function isHarmful(intention) {
    const t = (intention || '').trim();
    if (!t) return { ok: false, reason: 'Bitte eine Absicht eingeben.' };
    if (t.length < 4) return { ok: false, reason: 'Absicht zu kurz — formuliere klar und ethisch.' };
    for (const re of BLOCK_PATTERNS) {
      if (re.test(t)) {
        return {
          ok: false,
          reason: 'Abgelehnt: Grenze und Ausgleich — kein Schaden an Personen. Formuliere eine ethische Absicht für dich selbst oder einen neutralen Raum.'
        };
      }
    }
    return { ok: true };
  }

  function reduceStatement(text) {
    let s = text.toUpperCase().replace(VOWELS, '');
    s = s.replace(/[^A-Zß]/g, '');
    s = s.replace(/ß/g, 'S');
    let out = '';
    const seen = new Set();
    for (const ch of s) {
      if (!seen.has(ch)) {
        seen.add(ch);
        out += ch;
      }
    }
    return out || 'X';
  }

  function letterPoints(letters, w, h, pad) {
    const n = letters.length;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2 - pad;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i / Math.max(n, 1)) * Math.PI * 2;
      const jitter = ((letters.charCodeAt(i) % 7) - 3) * 2.5;
      const rr = r * (0.72 + (letters.charCodeAt(i) % 5) * 0.05);
      pts.push({
        x: cx + Math.cos(a) * (rr + jitter * 0.25),
        y: cy + Math.sin(a) * (rr + jitter * 0.25),
        ch: letters[i]
      });
    }
    return pts;
  }

  function drawSigil(canvas, letters, opts) {
    opts = opts || {};
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const glow = !!opts.glow;
    const charge = opts.charge || 0;

    ctx.clearRect(0, 0, w, h);

    // Background radial
    const bg = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7);
    bg.addColorStop(0, glow ? '#1a1230' : '#0c0814');
    bg.addColorStop(1, '#06040a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if (!letters || !letters.length) return;

    const pts = letterPoints(letters, w, h, 40);
    const cx = w / 2;
    const cy = h / 2;

    // Soft outer glow ring
    ctx.beginPath();
    ctx.strokeStyle = glow ? 'rgba(155, 126, 217, 0.55)' : 'rgba(124, 92, 191, 0.35)';
    ctx.lineWidth = glow ? 2.5 : 1.2;
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 16, 0, Math.PI * 2);
    ctx.stroke();

    // Inner dashed ring
    ctx.save();
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(62, 207, 191, 0.25)';
    ctx.lineWidth = 1;
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Bezier path through points
    if (pts.length >= 2) {
      if (glow) {
        ctx.shadowColor = 'rgba(155, 126, 217, 0.7)';
        ctx.shadowBlur = 12 + charge * 4;
      }
      ctx.beginPath();
      ctx.strokeStyle = glow ? '#c4b0e8' : '#a890d8';
      ctx.lineWidth = 2.4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const mx = (prev.x + cur.x) / 2;
        const my = (prev.y + cur.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      if (pts.length > 2) {
        const last = pts[pts.length - 1];
        const first = pts[0];
        const mx = (last.x + first.x) / 2;
        const my = (last.y + first.y) / 2;
        ctx.quadraticCurveTo(last.x, last.y, mx, my);
        ctx.lineTo(first.x, first.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Cross chords
    if (pts.length > 3) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(110, 181, 255, 0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const j = (i + Math.max(2, Math.floor(pts.length / 3))) % pts.length;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
      }
      ctx.stroke();
    }

    // Nodes + tiny letter marks
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.fillStyle = i === 0 ? '#e8c547' : (glow ? '#9b7ed9' : '#6eb5ff');
      ctx.arc(p.x, p.y, i === 0 ? 5.5 : 3.2, 0, Math.PI * 2);
      ctx.fill();
      if (opts.showLetters) {
        ctx.fillStyle = 'rgba(232, 228, 240, 0.45)';
        ctx.font = '9px Manrope, sans-serif';
        ctx.fillText(p.ch, p.x + 6, p.y - 6);
      }
    });

    // Center mark
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(232, 197, 71, 0.5)';
    ctx.lineWidth = 1;
    ctx.moveTo(cx - 6, cy);
    ctx.lineTo(cx + 6, cy);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx, cy + 6);
    ctx.stroke();
  }

  global.UniversumSigil = {
    isHarmful,
    reduceStatement,
    drawSigil
  };
})(typeof window !== 'undefined' ? window : globalThis);
