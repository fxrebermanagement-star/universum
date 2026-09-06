/**
 * UNIVERSUM — Sigil: Ethikfilter → Reduktion → Canvas → Atem-Aufladung → Vergessen
 * v5.21: path-tinted stroke/fill/background + optional path watermark + preset gallery
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

  /** Visual language per path — public-house tones, no sacred cult copies. */
  const PATH_STYLES = {
    schamanismus: {
      bg0: '#2a1c10', bg1: '#080604',
      ring: 'rgba(196, 137, 58, 0.55)', ringDim: 'rgba(196, 137, 58, 0.3)',
      dash: 'rgba(107, 143, 90, 0.35)',
      stroke: '#e0b060', strokeGlow: '#f0d090',
      chord: 'rgba(107, 143, 90, 0.4)',
      node: '#6b8f5a', node0: '#e0b060',
      center: 'rgba(224, 176, 96, 0.55)',
      shadow: 'rgba(196, 137, 58, 0.65)',
      watermark: 'drum', label: 'Schamanismus'
    },
    nordisch: {
      bg0: '#0e1a24', bg1: '#04080e',
      ring: 'rgba(122, 168, 201, 0.55)', ringDim: 'rgba(122, 168, 201, 0.28)',
      dash: 'rgba(142, 200, 224, 0.3)',
      stroke: '#a8c8d8', strokeGlow: '#d0e8f4',
      chord: 'rgba(90, 136, 168, 0.4)',
      node: '#7aa8c9', node0: '#c8d8e8',
      center: 'rgba(168, 200, 216, 0.5)',
      shadow: 'rgba(122, 168, 201, 0.65)',
      watermark: 'rune', label: 'Nordisch'
    },
    voodoo: {
      bg0: '#1a0c18', bg1: '#060408',
      ring: 'rgba(232, 224, 240, 0.45)', ringDim: 'rgba(184, 74, 106, 0.35)',
      dash: 'rgba(58, 42, 128, 0.4)',
      stroke: '#e8e0f0', strokeGlow: '#ffffff',
      chord: 'rgba(184, 74, 106, 0.4)',
      node: '#b84a6a', node0: '#f0e8f8',
      center: 'rgba(208, 96, 128, 0.55)',
      shadow: 'rgba(184, 74, 106, 0.7)',
      watermark: 'veve', label: 'Voodoo'
    },
    santeria: {
      bg0: '#1a2010', bg1: '#080a04',
      ring: 'rgba(201, 160, 58, 0.5)', ringDim: 'rgba(90, 176, 200, 0.35)',
      dash: 'rgba(110, 200, 160, 0.35)',
      stroke: '#e8c860', strokeGlow: '#fff0a8',
      chord: 'rgba(90, 176, 200, 0.4)',
      node: '#5ab0c8', node0: '#f0d878',
      center: 'rgba(201, 160, 58, 0.5)',
      shadow: 'rgba(201, 160, 58, 0.65)',
      watermark: 'fruit', label: 'Santería'
    },
    hermetik: {
      bg0: '#181428', bg1: '#060410',
      ring: 'rgba(232, 197, 71, 0.5)', ringDim: 'rgba(154, 143, 212, 0.35)',
      dash: 'rgba(154, 143, 212, 0.35)',
      stroke: '#e8c547', strokeGlow: '#f8e090',
      chord: 'rgba(154, 143, 212, 0.4)',
      node: '#9a8fd4', node0: '#e8c547',
      center: 'rgba(232, 197, 71, 0.55)',
      shadow: 'rgba(154, 143, 212, 0.7)',
      watermark: 'geometry', label: 'Hermetik'
    },
    wicca: {
      bg0: '#101818', bg1: '#060808',
      ring: 'rgba(90, 171, 122, 0.5)', ringDim: 'rgba(122, 136, 192, 0.35)',
      dash: 'rgba(144, 184, 224, 0.3)',
      stroke: '#a8d0b8', strokeGlow: '#d0f0d8',
      chord: 'rgba(122, 136, 192, 0.4)',
      node: '#5aab7a', node0: '#d0e8c0',
      center: 'rgba(168, 208, 184, 0.5)',
      shadow: 'rgba(90, 171, 122, 0.65)',
      watermark: 'moon', label: 'Wicca'
    },
    chaosmagie: {
      bg0: '#100818', bg1: '#040208',
      ring: 'rgba(196, 94, 200, 0.6)', ringDim: 'rgba(62, 224, 255, 0.4)',
      dash: 'rgba(62, 224, 255, 0.35)',
      stroke: '#e060f0', strokeGlow: '#ff90ff',
      chord: 'rgba(64, 232, 255, 0.45)',
      node: '#40e8ff', node0: '#ff60e8',
      center: 'rgba(224, 96, 240, 0.55)',
      shadow: 'rgba(196, 94, 200, 0.75)',
      watermark: 'chaos', label: 'Chaosmagie'
    },
    esoterik: {
      bg0: '#1c1430', bg1: '#080610',
      ring: 'rgba(155, 126, 217, 0.55)', ringDim: 'rgba(124, 92, 191, 0.35)',
      dash: 'rgba(62, 207, 191, 0.25)',
      stroke: '#c4b0e8', strokeGlow: '#e0d0f8',
      chord: 'rgba(110, 181, 255, 0.35)',
      node: '#6eb5ff', node0: '#e8c547',
      center: 'rgba(232, 197, 71, 0.5)',
      shadow: 'rgba(155, 126, 217, 0.7)',
      watermark: 'star', label: 'Esoterik'
    }
  };

  /** Example letter-sets for path preset gallery (no intention text stored). */
  const PATH_PRESETS = {
    schamanismus: [
      { letters: 'TRM', label: 'Trommel' },
      { letters: 'WRZ', label: 'Wurzel' },
      { letters: 'ATM', label: 'Atem' }
    ],
    nordisch: [
      { letters: 'RDN', label: 'Runen' },
      { letters: 'HLT', label: 'Halt' },
      { letters: 'STF', label: 'Stab' }
    ],
    voodoo: [
      { letters: 'LS', label: 'Licht' },
      { letters: 'WSR', label: 'Wasser' },
      { letters: 'HS', label: 'Haus' }
    ],
    santeria: [
      { letters: 'GB', label: 'Gabe' },
      { letters: 'FR', label: 'Frucht' },
      { letters: 'KL', label: 'Klar' }
    ],
    hermetik: [
      { letters: 'MRK', label: 'Merkur' },
      { letters: 'ZRK', label: 'Zirkel' },
      { letters: 'GLD', label: 'Gold' }
    ],
    wicca: [
      { letters: 'MND', label: 'Mond' },
      { letters: 'KRS', label: 'Kreis' },
      { letters: 'ELM', label: 'Element' }
    ],
    chaosmagie: [
      { letters: 'GNS', label: 'Gnosis' },
      { letters: 'LDN', label: 'Laden' },
      { letters: 'VGS', label: 'Vergessen' }
    ],
    esoterik: [
      { letters: 'STN', label: 'Stern' },
      { letters: 'FLD', label: 'Feld' },
      { letters: 'STL', label: 'Still' }
    ]
  };

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

  function getPathStyle(pathId) {
    const id = (pathId || 'esoterik').toLowerCase();
    return PATH_STYLES[id] || PATH_STYLES.esoterik;
  }

  function getPresets(pathId) {
    const id = (pathId || 'esoterik').toLowerCase();
    return (PATH_PRESETS[id] || PATH_PRESETS.esoterik).slice();
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

  function drawWatermark(ctx, kind, w, h, color) {
    ctx.save();
    ctx.translate(w - 36, 28);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (kind === 'drum') {
      ctx.beginPath(); ctx.ellipse(0, -4, 10, 4, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-10, -4); ctx.lineTo(-10, 8); ctx.quadraticCurveTo(-10, 14, 0, 14); ctx.quadraticCurveTo(10, 14, 10, 8); ctx.lineTo(10, -4); ctx.stroke();
    } else if (kind === 'rune') {
      ctx.beginPath(); ctx.moveTo(-4, -10); ctx.lineTo(-4, 10); ctx.moveTo(-4, -10); ctx.lineTo(6, 0); ctx.moveTo(-4, 0); ctx.lineTo(6, 10); ctx.stroke();
    } else if (kind === 'veve') {
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 10); ctx.moveTo(-8, -4); ctx.lineTo(8, -4); ctx.moveTo(-8, 4); ctx.lineTo(8, 4); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill();
    } else if (kind === 'fruit') {
      ctx.beginPath(); ctx.arc(-3, 0, 5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(4, -2, 4, 0, Math.PI * 2); ctx.stroke();
    } else if (kind === 'geometry') {
      ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(7.8, 4.5); ctx.lineTo(-7.8, 4.5); ctx.closePath(); ctx.stroke();
    } else if (kind === 'moon') {
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0.3, Math.PI * 2 - 0.3);
      ctx.arc(3, 0, 6, Math.PI * 2 - 0.5, 0.5, true);
      ctx.closePath();
      ctx.stroke();
    } else if (kind === 'chaos') {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 === 0 ? 10 : 4;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.stroke();
    } else {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
        const x = Math.cos(a) * 9;
        const y = Math.sin(a) * 9;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.stroke();
    }
    ctx.restore();
  }

  function drawSigil(canvas, letters, opts) {
    opts = opts || {};
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const glow = !!opts.glow;
    const charge = opts.charge || 0;
    const style = getPathStyle(opts.pathId);

    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7);
    bg.addColorStop(0, glow ? style.bg0 : style.bg1);
    bg.addColorStop(1, '#040208');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if (opts.watermark !== false) {
      drawWatermark(ctx, style.watermark, w, h, style.stroke);
    }

    if (!letters || !letters.length) return;

    const pts = letterPoints(letters, w, h, 40);
    const cx = w / 2;
    const cy = h / 2;

    ctx.beginPath();
    ctx.strokeStyle = glow ? style.ring : style.ringDim;
    ctx.lineWidth = glow ? 2.5 : 1.2;
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 16, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.strokeStyle = style.dash;
    ctx.lineWidth = 1;
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    if (pts.length >= 2) {
      if (glow) {
        ctx.shadowColor = style.shadow;
        ctx.shadowBlur = 12 + charge * 4;
      }
      ctx.beginPath();
      ctx.strokeStyle = glow ? style.strokeGlow : style.stroke;
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

    if (pts.length > 3) {
      ctx.beginPath();
      ctx.strokeStyle = style.chord;
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const j = (i + Math.max(2, Math.floor(pts.length / 3))) % pts.length;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
      }
      ctx.stroke();
    }

    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.fillStyle = i === 0 ? style.node0 : (glow ? style.stroke : style.node);
      ctx.arc(p.x, p.y, i === 0 ? 5.5 : 3.2, 0, Math.PI * 2);
      ctx.fill();
      if (opts.showLetters) {
        ctx.fillStyle = 'rgba(232, 228, 240, 0.45)';
        ctx.font = '9px Manrope, sans-serif';
        ctx.fillText(p.ch, p.x + 6, p.y - 6);
      }
    });

    ctx.beginPath();
    ctx.strokeStyle = style.center;
    ctx.lineWidth = 1;
    ctx.moveTo(cx - 6, cy);
    ctx.lineTo(cx + 6, cy);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx, cy + 6);
    ctx.stroke();
  }

  /** Render a small preset thumbnail into a canvas (for gallery examples). */
  function drawPresetThumb(canvas, letters, pathId) {
    drawSigil(canvas, letters, { pathId: pathId, glow: false, watermark: true });
  }

  global.UniversumSigil = {
    isHarmful,
    reduceStatement,
    drawSigil,
    drawPresetThumb,
    getPathStyle,
    getPresets,
    PATH_STYLES,
    PATH_PRESETS
  };
})(typeof window !== 'undefined' ? window : globalThis);
