/**
 * UNIVERSUM — generate path-specific Feldkarten SVGs
 * Motifs: respectful public-house visual tones (not sacred cult copies).
 * Output: assets/feldkarten/{path}/{NN-slug}.svg + manifest.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'feldkarten');
const OUT = SRC;

const PATHS = {
  schamanismus: {
    name: 'Schamanismus',
    bg0: '#2a1c10', bg1: '#141008', bg2: '#080604',
    glow: '#c4893a', glow2: '#8a6230',
    frame: '#d4a574', frame2: '#6b8f5a',
    gold: '#e0b060', gold2: '#b07830',
    accent: '#6b8f5a', fill: '#1a2410',
    watermark: 'drum',
    frameStyle: 'organic'
  },
  nordisch: {
    name: 'Nordisch',
    bg0: '#0e1a24', bg1: '#081018', bg2: '#04080e',
    glow: '#7aa8c9', glow2: '#4a7088',
    frame: '#a8c8d8', frame2: '#5a88a8',
    gold: '#c8d8e8', gold2: '#7aa8c9',
    accent: '#8ec8e0', fill: '#102028',
    watermark: 'rune',
    frameStyle: 'runestone'
  },
  voodoo: {
    name: 'Voodoo',
    bg0: '#1a0c18', bg1: '#0e0610', bg2: '#060408',
    glow: '#3a2a80', glow2: '#b84a6a',
    frame: '#e8e0f0', frame2: '#b84a6a',
    gold: '#f0e8f8', gold2: '#c05070',
    accent: '#d06080', fill: '#1a1028',
    watermark: 'veve',
    frameStyle: 'veve'
  },
  santeria: {
    name: 'Santería',
    bg0: '#1a2010', bg1: '#101408', bg2: '#080a04',
    glow: '#c9a03a', glow2: '#4a90a8',
    frame: '#e8c860', frame2: '#5ab0c8',
    gold: '#f0d878', gold2: '#c9a03a',
    accent: '#6ec8a0', fill: '#182418',
    watermark: 'fruit',
    frameStyle: 'soft'
  },
  hermetik: {
    name: 'Hermetik',
    bg0: '#181428', bg1: '#0c0a18', bg2: '#060410',
    glow: '#9a8fd4', glow2: '#c9a030',
    frame: '#e8c547', frame2: '#9a8fd4',
    gold: '#f0d878', gold2: '#c9a030',
    accent: '#b0a8e0', fill: '#1a1830',
    watermark: 'geometry',
    frameStyle: 'geometric'
  },
  wicca: {
    name: 'Wicca',
    bg0: '#101818', bg1: '#0a1010', bg2: '#060808',
    glow: '#5aab7a', glow2: '#8a90c0',
    frame: '#a8d0b8', frame2: '#7a88c0',
    gold: '#d0e8c0', gold2: '#5aab7a',
    accent: '#90b8e0', fill: '#142018',
    watermark: 'moon',
    frameStyle: 'soft'
  },
  chaosmagie: {
    name: 'Chaosmagie',
    bg0: '#100818', bg1: '#080410', bg2: '#040208',
    glow: '#c45ec8', glow2: '#3ee0ff',
    frame: '#e060f0', frame2: '#40e0ff',
    gold: '#ff60e8', gold2: '#c45ec8',
    accent: '#40e8ff', fill: '#180820',
    watermark: 'chaos',
    frameStyle: 'neon'
  },
  esoterik: {
    name: 'Esoterik',
    bg0: '#1c1430', bg1: '#100c1c', bg2: '#080610',
    glow: '#8b6fd0', glow2: '#e8c547',
    frame: '#c4b0e8', frame2: '#8b6fd0',
    gold: '#e8c547', gold2: '#c9a030',
    accent: '#3ed4c4', fill: '#1a1830',
    watermark: 'star',
    frameStyle: 'classic'
  }
};

const GENERIC_COLORS = [
  ['#241836', 'BG0'],
  ['#120c1c', 'BG1'],
  ['#080610', 'BG2'],
  ['#7c5cbf', 'GLOW'],
  ['#e8c547', 'GOLD'],
  ['#f0d878', 'GOLD_LT'],
  ['#c9a030', 'GOLD_DK'],
  ['#3ed4c4', 'ACCENT'],
  ['#1a2840', 'FILL'],
  ['#a890d8', 'GLOW2'],
  ['#9b7ed9', 'GLOW3'],
  ['#6eb5ff', 'BLUE']
];

function watermarkSvg(kind, p) {
  const s = p.frame;
  const a = p.accent;
  switch (kind) {
    case 'drum':
      return `<g opacity="0.35" transform="translate(92 18) scale(0.55)">
        <ellipse cx="16" cy="14" rx="12" ry="5" fill="none" stroke="${s}" stroke-width="1.6"/>
        <path d="M4 14 V26 Q4 32 16 32 Q28 32 28 26 V14" fill="none" stroke="${s}" stroke-width="1.5"/>
        <line x1="10" y1="18" x2="10" y2="26" stroke="${a}" stroke-width="1"/>
        <line x1="22" y1="18" x2="22" y2="26" stroke="${a}" stroke-width="1"/>
      </g>`;
    case 'rune':
      return `<g opacity="0.4" transform="translate(94 16)" fill="none" stroke="${s}" stroke-width="1.8" stroke-linecap="round">
        <path d="M6 4 V24 M6 4 L16 14 M6 14 L16 24"/>
      </g>`;
    case 'veve':
      // Original abstract geometric (NOT a copied sacred veve)
      return `<g opacity="0.38" transform="translate(90 14)" fill="none" stroke="${s}" stroke-width="1.3">
        <path d="M14 2 V26 M6 8 H22 M6 20 H22 M10 8 V14 H18 V8 M10 20 V14"/>
        <circle cx="14" cy="14" r="2.2" fill="${a}" fill-opacity="0.5" stroke="none"/>
      </g>`;
    case 'fruit':
      return `<g opacity="0.4" transform="translate(94 16)">
        <circle cx="8" cy="12" r="6" fill="none" stroke="${s}" stroke-width="1.5"/>
        <circle cx="14" cy="10" r="5" fill="none" stroke="${a}" stroke-width="1.3"/>
        <path d="M10 6 Q12 2 14 5" fill="none" stroke="${s}" stroke-width="1.2"/>
      </g>`;
    case 'geometry':
      return `<g opacity="0.4" transform="translate(90 14)" fill="none" stroke="${s}" stroke-width="1.3">
        <circle cx="14" cy="14" r="10"/>
        <circle cx="14" cy="14" r="5"/>
        <path d="M14 4 L22.6 19 L5.4 19 Z"/>
      </g>`;
    case 'moon':
      return `<g opacity="0.4" transform="translate(92 14)">
        <path d="M18 8 A9 9 0 1 0 18 22 A7 7 0 1 1 18 8Z" fill="none" stroke="${s}" stroke-width="1.5"/>
        <circle cx="8" cy="6" r="1.2" fill="${a}"/>
        <circle cx="22" cy="18" r="0.9" fill="${a}"/>
      </g>`;
    case 'chaos':
      return `<g opacity="0.42" transform="translate(90 14)" fill="none" stroke="${s}" stroke-width="1.4">
        <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z"/>
        <circle cx="14" cy="14" r="3" stroke="${a}"/>
      </g>`;
    case 'star':
    default:
      return `<g opacity="0.38" transform="translate(92 14)" fill="none" stroke="${s}" stroke-width="1.4">
        <path d="M14 4 L16.2 11 L24 11.5 L18 16 L19.8 24 L14 19.5 L8.2 24 L10 16 L4 11.5 L11.8 11 Z"/>
      </g>`;
  }
}

function frameSvg(style, p) {
  const f = p.frame;
  const f2 = p.frame2;
  switch (style) {
    case 'organic':
      return `<rect x="3.5" y="3.5" width="113" height="133" rx="18" fill="none" stroke="${f}" stroke-opacity="0.5" stroke-width="1.5"/>
  <rect x="8" y="8" width="104" height="124" rx="14" fill="none" stroke="${f2}" stroke-opacity="0.3" stroke-width="0.9"/>`;
    case 'runestone':
      return `<rect x="4" y="4" width="112" height="132" rx="4" fill="none" stroke="${f}" stroke-opacity="0.55" stroke-width="1.6"/>
  <rect x="8" y="8" width="104" height="124" rx="2" fill="none" stroke="${f2}" stroke-opacity="0.35" stroke-width="0.9"/>
  <path d="M20 4 L20 8 M100 4 L100 8 M20 136 L20 132 M100 136 L100 132" stroke="${f}" stroke-opacity="0.5" stroke-width="1.2"/>`;
    case 'veve':
      return `<rect x="3.5" y="3.5" width="113" height="133" rx="6" fill="none" stroke="${f}" stroke-opacity="0.45" stroke-width="1.3"/>
  <rect x="7" y="7" width="106" height="126" rx="4" fill="none" stroke="${f2}" stroke-opacity="0.4" stroke-width="0.9"/>
  <path d="M14 10 H30 M90 10 H106 M14 130 H30 M90 130 H106" stroke="${f2}" stroke-opacity="0.55" stroke-width="1.2"/>`;
    case 'geometric':
      return `<rect x="3" y="3" width="114" height="134" rx="2" fill="none" stroke="${f}" stroke-opacity="0.55" stroke-width="1.5"/>
  <rect x="7" y="7" width="106" height="126" rx="1" fill="none" stroke="${f2}" stroke-opacity="0.35" stroke-width="0.8"/>
  <path d="M10 10 L16 10 L10 16 Z M110 10 L104 10 L110 16 Z M10 130 L16 130 L10 124 Z M110 130 L104 130 L110 124 Z" fill="${f}" fill-opacity="0.45"/>`;
    case 'neon':
      return `<rect x="3" y="3" width="114" height="134" rx="8" fill="none" stroke="${f}" stroke-opacity="0.65" stroke-width="1.8"/>
  <rect x="7" y="7" width="106" height="126" rx="5" fill="none" stroke="${f2}" stroke-opacity="0.45" stroke-width="1"/>
  <rect x="11" y="11" width="98" height="118" rx="3" fill="none" stroke="${f}" stroke-opacity="0.2" stroke-width="0.6"/>`;
    case 'soft':
      return `<rect x="3.5" y="3.5" width="113" height="133" rx="16" fill="none" stroke="${f}" stroke-opacity="0.48" stroke-width="1.4"/>
  <rect x="8" y="8" width="104" height="124" rx="12" fill="none" stroke="${f2}" stroke-opacity="0.32" stroke-width="0.85"/>`;
    case 'classic':
    default:
      return `<rect x="3.5" y="3.5" width="113" height="133" rx="10" fill="none" stroke="${f}" stroke-opacity="0.45" stroke-width="1.4"/>
  <rect x="7" y="7" width="106" height="126" rx="8" fill="none" stroke="${f2}" stroke-opacity="0.35" stroke-width="0.9"/>`;
  }
}

function recolorMotif(motif, p) {
  let out = motif;
  const map = [
    ['#241836', p.bg0],
    ['#120c1c', p.bg1],
    ['#080610', p.bg2],
    ['#7c5cbf', p.glow],
    ['#e8c547', p.gold],
    ['#f0d878', p.gold],
    ['#c9a030', p.gold2],
    ['#3ed4c4', p.accent],
    ['#1a2840', p.fill],
    ['#a890d8', p.glow],
    ['#9b7ed9', p.glow],
    ['#6eb5ff', p.accent],
    ['#c4b0e8', p.frame]
  ];
  // longest first to avoid partial collisions (none here but safe)
  for (const [from, to] of map) {
    out = out.split(from).join(to);
    out = out.split(from.toLowerCase()).join(to);
    out = out.split(from.toUpperCase()).join(to);
  }
  return out;
}

function buildSvg(card, pathId, p) {
  const id = `${pathId}${card.n}`;
  const motif = recolorMotif(card.motif, p);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" role="img" aria-label="${card.name} · ${p.name}">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.bg0}"/>
      <stop offset="55%" stop-color="${p.bg1}"/>
      <stop offset="100%" stop-color="${p.bg2}"/>
    </linearGradient>
    <radialGradient id="glow${id}" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="${p.glow}" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="${p.gold}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.gold}"/>
      <stop offset="100%" stop-color="${p.gold2}"/>
    </linearGradient>
  </defs>
  <rect width="120" height="140" rx="12" fill="url(#bg${id})"/>
  ${frameSvg(p.frameStyle, p)}
  <circle cx="60" cy="58" r="46" fill="url(#glow${id})"/>
  ${motif.replace(/url\(#gold\d+\)/g, `url(#gold${id})`).replace(/url\(#bg\d+\)/g, `url(#bg${id})`).replace(/url\(#glow\d+\)/g, `url(#glow${id})`)}
  ${watermarkSvg(p.watermark, p)}
</svg>
`;
}

function loadSourceCards() {
  const files = fs.readdirSync(SRC).filter((f) => /^\d{2}-.+\.svg$/.test(f)).sort();
  return files.map((file) => {
    const text = fs.readFileSync(path.join(SRC, file), 'utf8');
    const nameMatch = text.match(/aria-label="([^"]+)"/);
    const motifMatch = text.match(/<circle cx="60" cy="58" r="46"[^/]*\/>\s*([\s\S]*?)<\/svg>/);
    let motif = motifMatch ? motifMatch[1].trim() : '';
    // Normalize gold gradient refs in motif to generic pattern for replace
    motif = motif.replace(/url\(#gold\d+\)/g, 'url(#goldX)');
    return {
      file,
      n: parseInt(file.slice(0, 2), 10),
      name: nameMatch ? nameMatch[1] : file,
      motif: motif.replace(/url\(#goldX\)/g, 'url(#gold1)') // temporary; buildSvg remaps
    };
  });
}

function main() {
  const cards = loadSourceCards();
  if (cards.length !== 22) {
    console.warn('Expected 22 source cards, got', cards.length);
  }
  const manifest = [];
  for (const [pathId, palette] of Object.entries(PATHS)) {
    const dir = path.join(OUT, pathId);
    fs.mkdirSync(dir, { recursive: true });
    for (const card of cards) {
      // Fix gold url placeholder in motif for this card
      const cardForBuild = {
        ...card,
        motif: card.motif.replace(/url\(#gold\d+\)/g, `url(#goldTMP)`)
      };
      let svg = buildSvg(cardForBuild, pathId, palette);
      svg = svg.replace(/url\(#goldTMP\)/g, `url(#gold${pathId}${card.n})`);
      const outFile = path.join(dir, card.file);
      fs.writeFileSync(outFile, svg);
      manifest.push({ path: pathId, file: card.file, n: card.n, name: card.name });
    }
    console.log('✓', pathId, cards.length, 'cards');
  }
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({
    version: '5.21.1',
    paths: Object.keys(PATHS),
    cardsPerPath: cards.length,
    total: manifest.length,
    items: manifest.map((m) => ({
      path: m.path,
      file: m.path + '/' + m.file,
      n: m.n,
      name: m.name
    }))
  }, null, 2));
  console.log('Wrote', manifest.length, 'SVGs + manifest.json');
}

main();
