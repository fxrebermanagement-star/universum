#!/usr/bin/env node
/**
 * Generate cohesive custom SVG lexicon icons for UNIVERSUM.
 * Motifs: recognizable per herb/kitchen/stone/color/tool/link/offering.
 * Style: warm mystical — gold/cream/earth on dark, ~28–36px readable, tiny files.
 * v5.19.0: Distinct silhouettes per entry · stones with cut cues · color hue swatches ·
 *          thicker strokes for 28–36px · warm Universum palette · no monograms/emoji primary.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'lexikon');
const PATHS_JS = path.join(ROOT, 'js', 'paths.js');

const GOLD = '#e8c547';
const CREAM = '#f5e6c8';
const EARTH = '#c4a574';
const GREEN = '#8fb88a';
const SAGE = '#6a9a78';
const PURPLE = '#9b7ed9';
const ROSE = '#d4a0b0';
const TEAL = '#3ed4c4';
const STROKE = '#f0d878';
const DARK = '#1a1424';

function slugify(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae').replace(/ø/g, 'oe')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function wrap(inner, aria) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="${esc(aria)}">${inner}</svg>\n`;
}
function esc(t) {
  return String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function frameCircle(stroke = STROKE, opacity = 0.48) {
  return `<circle cx="16" cy="16" r="14.2" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1.35"/>`;
}
function frameSquare(stroke = STROKE, opacity = 0.35) {
  return `<rect x="2.2" y="2.2" width="27.6" height="27.6" rx="6" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1.2"/>`;
}

/* ——— Motif builders ——— */
function leafSimple(cx, cy, rot = -25, fill = GREEN, len = 9) {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})">
    <path d="M0 ${len} C${len * 0.58} ${len * 0.38} ${len * 0.55} ${-len * 0.32} 0 ${-len} C${-len * 0.55} ${-len * 0.32} ${-len * 0.58} ${len * 0.38} 0 ${len}Z" fill="${fill}" fill-opacity="0.92"/>
    <path d="M0 ${len * 0.72} V${-len * 0.65}" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.75" fill="none"/>
  </g>`;
}

function spikeFlower(fill = PURPLE) {
  // lavender / yarrow-like vertical spike — readable at 28–36px
  let buds = '';
  for (let i = 0; i < 7; i++) {
    const y = +(23 - i * 2.15).toFixed(2);
    const w = +(2.55 + (i % 2) * 0.45).toFixed(2);
    const op = +(0.58 + i * 0.06).toFixed(2);
    const rw = +(w * 0.72).toFixed(2);
    buds += `<ellipse cx="16" cy="${y}" rx="${w}" ry="1.65" fill="${fill}" fill-opacity="${op}"/>`;
    buds += `<ellipse cx="${+(16 - w - 0.15).toFixed(2)}" cy="${+(y + 0.25).toFixed(2)}" rx="${rw}" ry="1.3" fill="${fill}" fill-opacity="0.5"/>`;
    buds += `<ellipse cx="${+(16 + w + 0.15).toFixed(2)}" cy="${+(y + 0.25).toFixed(2)}" rx="${rw}" ry="1.3" fill="${fill}" fill-opacity="0.5"/>`;
  }
  return `${frameCircle()}
    <line x1="16" y1="27" x2="16" y2="9" stroke="${SAGE}" stroke-width="1.45"/>
    ${buds}
    <circle cx="16" cy="7.8" r="1.55" fill="${GOLD}" fill-opacity="0.75"/>`;
}

function roseBloom() {
  let petals = '';
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 - 90) * Math.PI / 180;
    const x = 16 + Math.cos(a) * 4.2;
    const y = 14.5 + Math.sin(a) * 4.2;
    petals += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.4" ry="4.6" transform="rotate(${i * 60} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${ROSE}" fill-opacity="0.72"/>`;
  }
  return `${frameCircle()}
    ${petals}
    <circle cx="16" cy="14.5" r="3.2" fill="${ROSE}" fill-opacity="0.9" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.8"/>
    <circle cx="16" cy="14.5" r="1.5" fill="${GOLD}" fill-opacity="0.8"/>
    <path d="M16 19.5 V25" stroke="${SAGE}" stroke-width="1.3"/>
    ${leafSimple(11.5, 22.5, -55, GREEN, 5.2)}
    ${leafSimple(20.5, 22.5, 55, GREEN, 5.2)}`;
}

function sageLeaf() {
  return `${frameCircle()}
    <path d="M16 26 C10 20 9 12 16 6 C23 12 22 20 16 26Z" fill="${SAGE}" fill-opacity="0.85"/>
    <path d="M16 24 V8" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.7"/>
    <path d="M16 14 Q12 16 11 18 M16 12 Q20 14 21 16 M16 18 Q13 19 12 21" fill="none" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.55"/>`;
}

function daisy() {
  let petals = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * 45) * Math.PI / 180;
    const x = 16 + Math.cos(a) * 6;
    const y = 16 + Math.sin(a) * 6;
    petals += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.2" ry="3.4" transform="rotate(${i * 45} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${CREAM}" fill-opacity="0.85"/>`;
  }
  return `${frameCircle()}${petals}<circle cx="16" cy="16" r="2.8" fill="${GOLD}"/>`;
}

function thistleLike(fill = PURPLE) {
  return `${frameCircle()}
    <path d="M16 26 V14" stroke="${SAGE}" stroke-width="1.3"/>
    <path d="M16 14 L10 8 M16 14 L16 6 M16 14 L22 8 M16 12 L12 6 M16 12 L20 6" stroke="${fill}" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="16" cy="14" r="2.5" fill="${fill}" fill-opacity="0.7"/>`;
}

function berryCluster(fill = '#6b4a8a') {
  return `${frameCircle()}
    <circle cx="13" cy="14" r="3.2" fill="${fill}" fill-opacity="0.85"/>
    <circle cx="19" cy="14" r="3.2" fill="${fill}" fill-opacity="0.85"/>
    <circle cx="16" cy="19" r="3.2" fill="${fill}" fill-opacity="0.9"/>
    <circle cx="16" cy="11" r="2.4" fill="${PURPLE}" fill-opacity="0.7"/>
    <path d="M16 8 V5" stroke="${GREEN}" stroke-width="1.2"/>
    ${leafSimple(12, 7, -40, GREEN, 4)}`;
}

function treeNeedle() {
  return `${frameCircle()}
    <path d="M16 27 L16 10" stroke="${EARTH}" stroke-width="1.5"/>
    <path d="M16 12 L10 18 M16 12 L22 18 M16 16 L9 22 M16 16 L23 22 M16 20 L11 26 M16 20 L21 26" stroke="${GREEN}" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="16" cy="9" r="1.5" fill="${GOLD}" fill-opacity="0.6"/>`;
}

function sunHerb() {
  let rays = '';
  for (let i = 0; i < 8; i++) {
    const a = i * 45 * Math.PI / 180;
    const x1 = 16 + Math.cos(a) * 5;
    const y1 = 16 + Math.sin(a) * 5;
    const x2 = 16 + Math.cos(a) * 10;
    const y2 = 16 + Math.sin(a) * 10;
    rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${GOLD}" stroke-width="1.3" stroke-linecap="round"/>`;
  }
  return `${frameCircle()}${rays}<circle cx="16" cy="16" r="4" fill="${GOLD}" fill-opacity="0.85"/>`;
}

function fernLeaf() {
  let fronds = '';
  for (let i = 0; i < 5; i++) {
    const y = 10 + i * 3.2;
    const w = 5 + i * 0.6;
    fronds += `<path d="M16 ${y} Q${16 - w} ${y + 1} ${16 - w - 1} ${y + 2.5} M16 ${y} Q${16 + w} ${y + 1} ${16 + w + 1} ${y + 2.5}" fill="none" stroke="${GREEN}" stroke-width="1.1"/>`;
  }
  return `${frameCircle()}<line x1="16" y1="8" x2="16" y2="26" stroke="${SAGE}" stroke-width="1.2"/>${fronds}`;
}

function mushroomSoft() {
  return `${frameCircle()}
    <ellipse cx="16" cy="14" rx="8" ry="5" fill="${ROSE}" fill-opacity="0.75"/>
    <path d="M8 14 Q16 20 24 14" fill="${ROSE}" fill-opacity="0.55"/>
    <rect x="13.5" y="14" width="5" height="9" rx="1.5" fill="${CREAM}" fill-opacity="0.7"/>`;
}

function droplet(fill) {
  return `${frameSquare()}
    <path d="M16 6 C16 6 8 16 8 20.5 A8 8 0 0 0 24 20.5 C24 16 16 6 16 6Z" fill="${fill}" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.8"/>
    <ellipse cx="13.5" cy="17" rx="2" ry="2.8" fill="#fff" fill-opacity="0.25"/>`;
}

function swatch(fill) {
  return `${frameCircle()}
    <rect x="7.5" y="7.5" width="17" height="17" rx="4" fill="${fill}" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="1.15"/>
    <rect x="9.5" y="9.5" width="7" height="4.5" rx="1.4" fill="#fff" fill-opacity="0.22"/>
    <circle cx="16" cy="16" r="14.2" fill="none" stroke="${STROKE}" stroke-opacity="0.12" stroke-width="0.6"/>`;
}

function crystal(fill = TEAL, facets = true) {
  return `${frameCircle()}
    <path d="M16 4.5 L24.5 14 L16 27.5 L7.5 14Z" fill="${fill}" fill-opacity="0.62" stroke="${STROKE}" stroke-width="1.25"/>
    ${facets ? `<path d="M16 4.5 L16 27.5 M16 4.5 L11.5 14 M16 4.5 L20.5 14 M11.5 14 H20.5" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.8"/>` : ''}`;
}

function tumbledStone(fill, rx = 9, ry = 7) {
  return `${frameCircle()}
    <ellipse cx="16" cy="16.5" rx="${rx}" ry="${ry}" fill="${fill}" fill-opacity="0.72" stroke="${STROKE}" stroke-width="1.2"/>
    <ellipse cx="13" cy="13.5" rx="3.2" ry="2.2" fill="#fff" fill-opacity="0.18"/>`;
}

function pointCluster(fill) {
  return `${frameCircle()}
    <path d="M16 6 L19 14 L16 13 L13 14Z" fill="${fill}" fill-opacity="0.85" stroke="${STROKE}" stroke-width="0.9"/>
    <path d="M10 10 L13 18 L10 17 L7 18Z" fill="${fill}" fill-opacity="0.7" stroke="${STROKE}" stroke-width="0.85"/>
    <path d="M22 10 L25 18 L22 17 L19 18Z" fill="${fill}" fill-opacity="0.7" stroke="${STROKE}" stroke-width="0.85"/>
    <path d="M13 16 L16 26 L13 24 L10 26Z" fill="${fill}" fill-opacity="0.65" stroke="${STROKE}" stroke-width="0.85"/>
    <path d="M19 16 L22 26 L19 24 L16 26Z" fill="${fill}" fill-opacity="0.65" stroke="${STROKE}" stroke-width="0.85"/>`;
}

function cabochon(fill) {
  return `${frameCircle()}
    <ellipse cx="16" cy="17" rx="8.5" ry="7" fill="${fill}" fill-opacity="0.75" stroke="${STROKE}" stroke-width="1.2"/>
    <ellipse cx="13.5" cy="14" rx="3" ry="2.4" fill="#fff" fill-opacity="0.22"/>
    <path d="M9 20 Q16 24 23 20" fill="none" stroke="${CREAM}" stroke-opacity="0.25" stroke-width="0.8"/>`;
}

function crystalDark(fill = '#3a3a48') {
  return crystal(fill);
}

function saltPile() {
  return `${frameCircle()}
    <ellipse cx="16" cy="22" rx="9" ry="3.5" fill="${CREAM}" fill-opacity="0.35"/>
    <circle cx="12" cy="18" r="2" fill="${CREAM}" fill-opacity="0.85"/>
    <circle cx="16" cy="16" r="2.3" fill="${CREAM}" fill-opacity="0.9"/>
    <circle cx="20" cy="18" r="2" fill="${CREAM}" fill-opacity="0.8"/>
    <circle cx="14" cy="20" r="1.5" fill="${CREAM}" fill-opacity="0.7"/>
    <circle cx="18" cy="20" r="1.5" fill="${CREAM}" fill-opacity="0.7"/>`;
}

function jar() {
  return `${frameCircle()}
    <rect x="11" y="8" width="10" height="3" rx="1" fill="${EARTH}" fill-opacity="0.8"/>
    <path d="M10 11 H22 L21 24 Q16 27 11 24Z" fill="${TEAL}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="1"/>
    <ellipse cx="16" cy="17" rx="3" ry="4" fill="${GOLD}" fill-opacity="0.25"/>`;
}

function flame() {
  return `${frameCircle()}
    <path d="M16 26 C10 20 11 14 16 6 C21 14 22 20 16 26Z" fill="${GOLD}" fill-opacity="0.85"/>
    <path d="M16 24 C13 20 13.5 16 16 11 C18.5 16 19 20 16 24Z" fill="${CREAM}" fill-opacity="0.55"/>`;
}

function bowl() {
  return `${frameCircle()}
    <path d="M7 14 H25 Q23 24 16 25 Q9 24 7 14Z" fill="${EARTH}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.1"/>
    <ellipse cx="16" cy="14" rx="9" ry="2.5" fill="${CREAM}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="0.8"/>`;
}

function keyTool() {
  return `${frameCircle()}
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="1.8" fill="${DARK}" stroke="${GOLD}" stroke-width="0.8"/>
    <path d="M16 14 L26 22 M22 20 L26 18 M23 21 L25 24" stroke="${GOLD}" stroke-width="1.5" stroke-linecap="round"/>`;
}

function book() {
  return `${frameCircle()}
    <path d="M8 8 H15 V24 H8 Q10 20 8 16 Q10 12 8 8Z" fill="${PURPLE}" fill-opacity="0.5" stroke="${GOLD}" stroke-width="0.9"/>
    <path d="M24 8 H17 V24 H24 Q22 20 24 16 Q22 12 24 8Z" fill="${PURPLE}" fill-opacity="0.5" stroke="${GOLD}" stroke-width="0.9"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="${GOLD}" stroke-width="1.2"/>`;
}

function thread() {
  return `${frameCircle()}
    <circle cx="16" cy="16" r="7" fill="none" stroke="${EARTH}" stroke-width="2.2"/>
    <circle cx="16" cy="16" r="3.5" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
    <path d="M23 16 Q26 10 28 14" fill="none" stroke="${CREAM}" stroke-width="1.2" stroke-linecap="round"/>`;
}

function linkChain() {
  return `${frameCircle()}
    <rect x="7" y="11" width="10" height="6" rx="3" fill="none" stroke="${GOLD}" stroke-width="1.6" transform="rotate(-35 12 14)"/>
    <rect x="15" y="11" width="10" height="6" rx="3" fill="none" stroke="${TEAL}" stroke-width="1.6" transform="rotate(35 20 14)"/>`;
}

function feather() {
  return `${frameCircle()}
    <path d="M10 24 Q14 10 22 6" fill="none" stroke="${CREAM}" stroke-width="1.4"/>
    <path d="M12 20 Q16 14 20 10 M13 17 Q17 12 21 9 M14 14 Q18 10 21 8" fill="none" stroke="${EARTH}" stroke-width="0.9"/>
    <path d="M11 22 Q9 18 12 16 M12 19 Q10 15 14 14" fill="none" stroke="${CREAM}" stroke-opacity="0.6" stroke-width="0.8"/>`;
}

function coin() {
  return `${frameCircle()}
    <circle cx="16" cy="16" r="8" fill="${GOLD}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.3"/>
    <circle cx="16" cy="16" r="5" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.9"/>
    <text x="16" y="19" text-anchor="middle" font-size="8" fill="${CREAM}" font-family="serif">✦</text>`;
}

function bread() {
  return `${frameCircle()}
    <ellipse cx="16" cy="18" rx="10" ry="6" fill="${EARTH}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="0.9"/>
    <path d="M8 16 Q12 12 16 15 Q20 12 24 16" fill="none" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="1"/>
    <ellipse cx="16" cy="15" rx="8" ry="3.5" fill="${GOLD}" fill-opacity="0.25"/>`;
}

function apple() {
  return `${frameCircle()}
    <path d="M16 10 C10 10 8 16 9 21 C10 26 14 27 16 27 C18 27 22 26 23 21 C24 16 22 10 16 10Z" fill="#c45c5c" fill-opacity="0.85"/>
    <path d="M16 10 Q18 6 21 7" fill="none" stroke="${GREEN}" stroke-width="1.3"/>
    ${leafSimple(18, 8, 20, GREEN, 4)}`;
}

function lemon() {
  return `${frameCircle()}
    <ellipse cx="16" cy="17" rx="7" ry="9" fill="#e8d060" fill-opacity="0.85" stroke="${GOLD}" stroke-width="0.8" transform="rotate(-20 16 17)"/>
    <path d="M16 9 Q18 7 17 5" fill="none" stroke="${GREEN}" stroke-width="1.1"/>`;
}

function garlic() {
  return `${frameCircle()}
    <path d="M16 8 C20 10 24 14 23 20 C22 25 10 25 9 20 C8 14 12 10 16 8Z" fill="${CREAM}" fill-opacity="0.85" stroke="${EARTH}" stroke-width="0.9"/>
    <path d="M16 10 V23 M12 14 Q16 16 20 14" fill="none" stroke="${EARTH}" stroke-opacity="0.5" stroke-width="0.7"/>`;
}

function coffee() {
  return `${frameCircle()}
    <path d="M9 12 H20 V22 Q16 25 12 22Z" fill="${EARTH}" fill-opacity="0.7" stroke="${GOLD}" stroke-width="1"/>
    <path d="M20 14 H23 Q25 17 23 20 H20" fill="none" stroke="${GOLD}" stroke-width="1.2"/>
    <path d="M12 9 Q13 7 12 5 M15 9 Q16 6 15 4" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.9"/>`;
}

function wineGlass(fill = '#8b2a3a') {
  return `${frameCircle()}
    <path d="M11 8 H21 L18 16 H14Z" fill="${fill}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="0.9"/>
    <line x1="16" y1="16" x2="16" y2="23" stroke="${CREAM}" stroke-width="1.2"/>
    <line x1="12" y1="24" x2="20" y2="24" stroke="${CREAM}" stroke-width="1.3" stroke-linecap="round"/>`;
}

function beerMug() {
  return `${frameCircle()}
    <rect x="9" y="10" width="12" height="14" rx="2" fill="${GOLD}" fill-opacity="0.45" stroke="${GOLD}" stroke-width="1"/>
    <path d="M21 13 H24 Q26 17 24 21 H21" fill="none" stroke="${GOLD}" stroke-width="1.3"/>
    <ellipse cx="15" cy="11" rx="5" ry="2" fill="${CREAM}" fill-opacity="0.7"/>`;
}

function mortar() {
  return `${frameCircle()}
    <path d="M8 14 H24 L22 22 Q16 25 10 22Z" fill="${EARTH}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.1"/>
    <line x1="20" y1="6" x2="12" y2="20" stroke="${CREAM}" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="20" cy="6" r="1.5" fill="${GOLD}"/>`;
}

function pendulum() {
  return `${frameCircle()}
    <line x1="16" y1="5" x2="16" y2="18" stroke="${CREAM}" stroke-width="1.1"/>
    <path d="M16 18 L12 26 L16 24 L20 26Z" fill="${PURPLE}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="0.9"/>`;
}

function mirror() {
  return `${frameCircle()}
    <ellipse cx="16" cy="16" rx="8" ry="10" fill="${TEAL}" fill-opacity="0.25" stroke="${GOLD}" stroke-width="1.4"/>
    <ellipse cx="14" cy="13" rx="3" ry="4" fill="#fff" fill-opacity="0.2"/>`;
}

function broom() {
  return `${frameCircle()}
    <line x1="10" y1="6" x2="18" y2="20" stroke="${EARTH}" stroke-width="1.5"/>
    <path d="M16 18 L22 28 M18 19 L24 27 M17 17 L26 26 M19 20 L23 28" stroke="${GOLD}" stroke-width="1.2" stroke-linecap="round"/>`;
}

function bell() {
  return `${frameCircle()}
    <path d="M10 18 Q10 10 16 8 Q22 10 22 18Z" fill="${GOLD}" fill-opacity="0.7" stroke="${GOLD}" stroke-width="1"/>
    <rect x="9" y="18" width="14" height="2.5" rx="1" fill="${EARTH}"/>
    <circle cx="16" cy="23" r="1.8" fill="${CREAM}"/>
    <line x1="16" y1="5" x2="16" y2="8" stroke="${CREAM}" stroke-width="1.1"/>`;
}

function knife() {
  return `${frameCircle()}
    <path d="M8 20 L20 8 L22 10 L10 22Z" fill="${CREAM}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="0.8"/>
    <path d="M8 20 L6 24 L10 22" fill="${EARTH}" stroke="${EARTH}" stroke-width="0.5"/>`;
}

function scissors() {
  return `${frameCircle()}
    <circle cx="11" cy="22" r="3" fill="none" stroke="${GOLD}" stroke-width="1.3"/>
    <circle cx="21" cy="22" r="3" fill="none" stroke="${GOLD}" stroke-width="1.3"/>
    <path d="M13 20 L22 8 M19 20 L10 8" stroke="${CREAM}" stroke-width="1.4" stroke-linecap="round"/>`;
}

function scales() {
  return `${frameCircle()}
    <line x1="16" y1="7" x2="16" y2="24" stroke="${GOLD}" stroke-width="1.3"/>
    <line x1="8" y1="12" x2="24" y2="12" stroke="${GOLD}" stroke-width="1.3"/>
    <path d="M8 12 L5 18 H11Z" fill="${EARTH}" fill-opacity="0.6" stroke="${GOLD}" stroke-width="0.8"/>
    <path d="M24 12 L21 18 H27Z" fill="${EARTH}" fill-opacity="0.6" stroke="${GOLD}" stroke-width="0.8"/>
    <circle cx="16" cy="7" r="1.5" fill="${GOLD}"/>`;
}

function drum() {
  return `${frameCircle()}
    <ellipse cx="16" cy="12" rx="9" ry="4" fill="${EARTH}" fill-opacity="0.5" stroke="${GOLD}" stroke-width="1"/>
    <path d="M7 12 V20 Q16 24 25 20 V12" fill="${EARTH}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="1"/>
    <ellipse cx="16" cy="20" rx="9" ry="4" fill="none" stroke="${GOLD}" stroke-width="1"/>`;
}

function wand() {
  return `${frameCircle()}
    <line x1="9" y1="24" x2="22" y2="8" stroke="${EARTH}" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="23" cy="7" r="2.5" fill="${GOLD}" fill-opacity="0.85"/>
    <path d="M20 6 L22 3 M24 5 L27 4 M24 9 L27 10" stroke="${CREAM}" stroke-width="0.9" stroke-linecap="round"/>`;
}

function cauldron() {
  return `${frameCircle()}
    <path d="M8 14 H24 Q25 16 24 22 Q16 27 8 22 Q7 16 8 14Z" fill="${PURPLE}" fill-opacity="0.45" stroke="${GOLD}" stroke-width="1.1"/>
    <line x1="7" y1="14" x2="25" y2="14" stroke="${GOLD}" stroke-width="1.4"/>
    <path d="M12 10 Q14 7 13 5 M16 10 Q17 6 16 4 M20 10 Q19 7 20 5" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.9"/>`;
}

function cards() {
  return `${frameCircle()}
    <rect x="9" y="7" width="11" height="16" rx="1.5" fill="${PURPLE}" fill-opacity="0.4" stroke="${GOLD}" stroke-width="1" transform="rotate(-12 14.5 15)"/>
    <rect x="12" y="8" width="11" height="16" rx="1.5" fill="${DARK}" stroke="${GOLD}" stroke-width="1" transform="rotate(8 17.5 16)"/>
    <text x="18" y="18" text-anchor="middle" font-size="7" fill="${GOLD}">✦</text>`;
}

function chalk() {
  return `${frameCircle()}
    <rect x="8" y="14" width="16" height="4" rx="1.5" fill="${CREAM}" fill-opacity="0.85" transform="rotate(-25 16 16)"/>
    <circle cx="20" cy="11" r="1.5" fill="${GOLD}" fill-opacity="0.5"/>`;
}

function ash() {
  return `${frameCircle()}
    <ellipse cx="16" cy="20" rx="8" ry="3" fill="${CREAM}" fill-opacity="0.25"/>
    <circle cx="12" cy="16" r="1.5" fill="${CREAM}" fill-opacity="0.5"/>
    <circle cx="17" cy="14" r="2" fill="${CREAM}" fill-opacity="0.4"/>
    <circle cx="20" cy="17" r="1.3" fill="${CREAM}" fill-opacity="0.45"/>
    <circle cx="14" cy="18" r="1.1" fill="${EARTH}" fill-opacity="0.5"/>`;
}

function earthDust() {
  return `${frameCircle()}
    <ellipse cx="16" cy="20" rx="9" ry="4" fill="${EARTH}" fill-opacity="0.55"/>
    <path d="M8 18 Q16 10 24 18" fill="${EARTH}" fill-opacity="0.35"/>
    <circle cx="13" cy="14" r="1.5" fill="${GOLD}" fill-opacity="0.4"/>`;
}

function bone() {
  return `${frameCircle()}
    <rect x="10" y="14" width="12" height="4" rx="1" fill="${CREAM}" fill-opacity="0.8"/>
    <circle cx="9" cy="13" r="2.5" fill="${CREAM}" fill-opacity="0.85"/>
    <circle cx="9" cy="19" r="2.5" fill="${CREAM}" fill-opacity="0.85"/>
    <circle cx="23" cy="13" r="2.5" fill="${CREAM}" fill-opacity="0.85"/>
    <circle cx="23" cy="19" r="2.5" fill="${CREAM}" fill-opacity="0.85"/>`;
}

function footprint() {
  return `${frameCircle()}
    <ellipse cx="15" cy="12" rx="4" ry="5.5" fill="${EARTH}" fill-opacity="0.7"/>
    <circle cx="11" cy="20" r="1.6" fill="${EARTH}" fill-opacity="0.65"/>
    <circle cx="14" cy="21.5" r="1.6" fill="${EARTH}" fill-opacity="0.65"/>
    <circle cx="17.5" cy="21" r="1.6" fill="${EARTH}" fill-opacity="0.65"/>
    <circle cx="20" cy="19" r="1.5" fill="${EARTH}" fill-opacity="0.65"/>`;
}

function photo() {
  return `${frameCircle()}
    <rect x="7" y="9" width="18" height="14" rx="2" fill="none" stroke="${GOLD}" stroke-width="1.3"/>
    <circle cx="12" cy="14" r="2" fill="${GOLD}" fill-opacity="0.6"/>
    <path d="M8 20 L13 15 L17 18 L20 14 L24 20Z" fill="${EARTH}" fill-opacity="0.5"/>`;
}

function hair() {
  return `${frameCircle()}
    <path d="M10 8 Q16 14 12 26 M14 7 Q18 14 16 26 M18 8 Q20 14 20 26 M22 9 Q22 15 23 25" fill="none" stroke="${EARTH}" stroke-width="1.3" stroke-linecap="round"/>`;
}

function spit() {
  return droplet('#7eb8d4');
}

function blood() {
  return droplet('#a83a3a');
}

function grave() {
  return `${frameCircle()}
    <path d="M11 26 V14 Q11 8 16 8 Q21 8 21 14 V26" fill="none" stroke="${CREAM}" stroke-width="1.4"/>
    <line x1="13" y1="16" x2="19" y2="16" stroke="${GOLD}" stroke-width="1"/>
    <line x1="16" y1="13" x2="16" y2="19" stroke="${GOLD}" stroke-width="1"/>`;
}

function rust() {
  return `${frameCircle()}
    <rect x="10" y="10" width="12" height="12" rx="2" fill="#8a4a2a" fill-opacity="0.7" stroke="${EARTH}" stroke-width="1"/>
    <circle cx="14" cy="14" r="2" fill="#c47a3a" fill-opacity="0.6"/>
    <circle cx="19" cy="18" r="2.5" fill="#a85a2a" fill-opacity="0.5"/>`;
}

function sulfur() {
  return `${frameCircle()}
    <polygon points="16,5.5 26.5,25 5.5,25" fill="${GOLD}" fill-opacity="0.72" stroke="${GOLD}" stroke-width="1.2"/>
    <line x1="16" y1="12" x2="16" y2="22" stroke="${DARK}" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="16" cy="19.5" r="1.6" fill="${DARK}" fill-opacity="0.85"/>`;
}

function mercury() {
  return `${frameCircle()}
    <circle cx="16" cy="12" r="5" fill="none" stroke="${TEAL}" stroke-width="1.5"/>
    <line x1="16" y1="17" x2="16" y2="24" stroke="${TEAL}" stroke-width="1.5"/>
    <line x1="12" y1="21" x2="20" y2="21" stroke="${TEAL}" stroke-width="1.4"/>
    <circle cx="16" cy="12" r="2" fill="${TEAL}" fill-opacity="0.5"/>`;
}

function offeringHands() {
  return `${frameCircle()}
    <path d="M6 18 Q10 14 16 16 Q22 14 26 18" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
    <path d="M8 20 Q12 24 16 22 Q20 24 24 20" fill="none" stroke="${EARTH}" stroke-width="1.2"/>
    <circle cx="16" cy="12" r="3" fill="${GOLD}" fill-opacity="0.7"/>`;
}

function smoke() {
  return `${frameCircle()}
    <path d="M12 24 Q10 18 14 14 Q18 10 14 6" fill="none" stroke="${CREAM}" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M16 24 Q18 17 15 12 Q12 8 18 5" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="1.3"/>
    <path d="M20 24 Q22 19 19 15" fill="none" stroke="${EARTH}" stroke-opacity="0.5" stroke-width="1.2"/>`;
}

function honey() {
  return `${frameCircle()}
    <path d="M12 8 H20 L22 14 H10Z" fill="${GOLD}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="0.9"/>
    <path d="M10 14 H22 L20 24 Q16 26 12 24Z" fill="${GOLD}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="0.9"/>
    <line x1="13" y1="17" x2="19" y2="17" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.7"/>`;
}

function oilDrop() {
  return droplet('#c9a84a');
}

function milk() {
  return droplet('#efe8d8');
}

function egg() {
  return `${frameCircle()}
    <ellipse cx="16" cy="17" rx="7" ry="9" fill="${CREAM}" fill-opacity="0.85" stroke="${EARTH}" stroke-width="0.9"/>
    <ellipse cx="14" cy="14" rx="2" ry="3" fill="#fff" fill-opacity="0.3"/>`;
}

function soap() {
  return `${frameCircle()}
    <rect x="8" y="12" width="16" height="10" rx="3" fill="${TEAL}" fill-opacity="0.45" stroke="${CREAM}" stroke-width="1"/>
    <circle cx="20" cy="10" r="2" fill="${CREAM}" fill-opacity="0.4"/>
    <circle cx="23" cy="12" r="1.3" fill="${CREAM}" fill-opacity="0.35"/>`;
}

function water() {
  return droplet('#5a9fd4');
}

function incense() {
  return `${frameCircle()}
    <rect x="14.5" y="16" width="3" height="10" rx="1" fill="${EARTH}"/>
    <path d="M16 16 Q14 10 16 6 Q18 10 16 16" fill="${CREAM}" fill-opacity="0.4" stroke="${CREAM}" stroke-width="0.8"/>
    <circle cx="16" cy="15" r="1.5" fill="${GOLD}"/>`;
}

function hopCone() {
  return `${frameCircle()}
    <ellipse cx="16" cy="12" rx="5" ry="3" fill="${GREEN}" fill-opacity="0.7"/>
    <ellipse cx="16" cy="16" rx="6" ry="3.2" fill="${GREEN}" fill-opacity="0.75"/>
    <ellipse cx="16" cy="20" rx="5" ry="3" fill="${SAGE}" fill-opacity="0.8"/>
    <line x1="16" y1="8" x2="16" y2="6" stroke="${SAGE}" stroke-width="1"/>`;
}

function nettle() {
  return `${frameCircle()}
    <path d="M16 26 V8" stroke="${GREEN}" stroke-width="1.3"/>
    <path d="M16 12 L8 8 M16 12 L24 8 M16 16 L7 14 M16 16 L25 14 M16 20 L9 20 M16 20 L23 20" stroke="${GREEN}" stroke-width="1.1" stroke-linecap="round"/>
    <circle cx="8" cy="8" r="0.8" fill="${GOLD}"/><circle cx="24" cy="8" r="0.8" fill="${GOLD}"/>`;
}

function dandelion() {
  return `${frameCircle()}
    <line x1="16" y1="26" x2="16" y2="16" stroke="${GREEN}" stroke-width="1.2"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const a = i * 30 * Math.PI / 180;
      return `<line x1="16" y1="14" x2="${(16 + Math.cos(a) * 8).toFixed(1)}" y2="${(14 + Math.sin(a) * 8).toFixed(1)}" stroke="${CREAM}" stroke-width="0.9"/>`;
    }).join('')}
    <circle cx="16" cy="14" r="2" fill="${GOLD}" fill-opacity="0.6"/>`;
}

function marigold() {
  let p = '';
  for (let i = 0; i < 10; i++) {
    const a = i * 36 * Math.PI / 180;
    const x = 16 + Math.cos(a) * 5.5;
    const y = 16 + Math.sin(a) * 5.5;
    p += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2" ry="3.5" transform="rotate(${i * 36} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${GOLD}" fill-opacity="0.8"/>`;
  }
  return `${frameCircle()}${p}<circle cx="16" cy="16" r="3" fill="#c4782a"/>`;
}

function oakLeaf() {
  return `${frameCircle()}
    <path d="M16 26 C12 22 8 20 9 16 C6 14 8 10 12 11 C12 7 16 5 16 5 C16 5 20 7 20 11 C24 10 26 14 23 16 C24 20 20 22 16 26Z" fill="${GREEN}" fill-opacity="0.8" stroke="${SAGE}" stroke-width="0.7"/>
    <path d="M16 24 V7" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.6"/>`;
}

function birch() {
  return `${frameCircle()}
    <rect x="13" y="6" width="6" height="20" rx="1" fill="${CREAM}" fill-opacity="0.75" stroke="${EARTH}" stroke-width="0.8"/>
    <line x1="13" y1="10" x2="19" y2="11" stroke="${EARTH}" stroke-width="1"/>
    <line x1="13" y1="15" x2="19" y2="14" stroke="${EARTH}" stroke-width="1"/>
    <line x1="13" y1="20" x2="19" y2="21" stroke="${EARTH}" stroke-width="0.9"/>`;
}

function shell() {
  return `${frameCircle()}
    <path d="M8 20 Q16 6 24 20 Q16 26 8 20Z" fill="${ROSE}" fill-opacity="0.55" stroke="${CREAM}" stroke-width="1"/>
    <path d="M16 10 Q16 20 16 22 M12 14 Q16 18 20 14 M10 18 Q16 22 22 18" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.7"/>`;
}

function coral() {
  return `${frameCircle()}
    <path d="M16 26 V14 M16 18 L10 10 M16 16 L22 8 M16 20 L12 14 M16 14 L20 12" stroke="#d47878" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="10" r="1.5" fill="#d47878"/><circle cx="22" cy="8" r="1.5" fill="#d47878"/>`;
}

function lava() {
  return `${frameCircle()}
    <path d="M6 22 Q10 10 16 14 Q22 8 26 20 Q20 26 6 22Z" fill="#c45c2a" fill-opacity="0.75" stroke="#e87840" stroke-width="1"/>
    <circle cx="14" cy="16" r="1.5" fill="${GOLD}" fill-opacity="0.7"/>
    <circle cx="19" cy="18" r="1.2" fill="${GOLD}" fill-opacity="0.5"/>`;
}

function muschel() { return shell(); }

function nail() {
  return `${frameCircle()}
    <line x1="16" y1="6" x2="16" y2="24" stroke="${CREAM}" stroke-width="2" stroke-linecap="round"/>
    <rect x="12" y="5" width="8" height="3" rx="1" fill="${EARTH}"/>`;
}

function needle() {
  return `${frameCircle()}
    <line x1="10" y1="24" x2="22" y2="8" stroke="${CREAM}" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="22" cy="8" r="2" fill="none" stroke="${GOLD}" stroke-width="1.2"/>`;
}

function wax() {
  return `${frameCircle()}
    <rect x="12" y="10" width="8" height="14" rx="1" fill="${GOLD}" fill-opacity="0.65" stroke="${GOLD}" stroke-width="0.8"/>
    <ellipse cx="16" cy="10" rx="4" ry="1.5" fill="${CREAM}" fill-opacity="0.5"/>
    <path d="M16 10 V6" stroke="${CREAM}" stroke-width="1"/><circle cx="16" cy="5" r="1.5" fill="${GOLD}"/>`;
}



function obsidianShard() {
  return `${frameCircle()}
    <path d="M9 7 L23 5 L27 16 L20 27 L6 22 L9 7Z" fill="#101018" fill-opacity="0.95" stroke="${STROKE}" stroke-width="1.35"/>
    <path d="M9 7 L17 15 L23 5 M17 15 L27 16 M17 15 L20 27 M17 15 L6 22" fill="none" stroke="${CREAM}" stroke-opacity="0.32" stroke-width="0.9"/>
    <path d="M12 11 L15 19" stroke="#4a4a58" stroke-width="1.2" stroke-opacity="0.65" stroke-linecap="round"/>`;
}

function quartzPoint(fill = '#c8e4f0') {
  return `${frameCircle()}
    <path d="M16 4.5 L22.5 14.5 L19.5 27 L12.5 27 L9.5 14.5Z" fill="${fill}" fill-opacity="0.72" stroke="${STROKE}" stroke-width="1.35"/>
    <path d="M16 4.5 L16 27 M16 4.5 L12.5 14.5 M16 4.5 L19.5 14.5 M12.5 14.5 H19.5" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.85"/>
    <path d="M14 10 L16 8 L18 10" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="0.8"/>`;
}

function moonstoneRound() {
  return `${frameCircle()}
    <circle cx="16" cy="16.5" r="9" fill="#c8d0e0" fill-opacity="0.78" stroke="${STROKE}" stroke-width="1.3"/>
    <ellipse cx="13" cy="13.5" rx="3.5" ry="2.6" fill="#fff" fill-opacity="0.35"/>
    <path d="M9 19 Q16 23 23 19" fill="none" stroke="#a8b8d8" stroke-opacity="0.55" stroke-width="1"/>
    <circle cx="19.5" cy="17" r="2.2" fill="#e8eef8" fill-opacity="0.45"/>`;
}

function sageOvalLeaf() {
  return `${frameCircle()}
    <path d="M16 27 C9.5 21 8 13.5 16 5 C24 13.5 22.5 21 16 27Z" fill="${SAGE}" fill-opacity="0.88" stroke="${GREEN}" stroke-width="0.85"/>
    <path d="M16 25 V7" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="0.85"/>
    <path d="M16 12 Q11.5 14 10.5 17 M16 11 Q20.5 13 21.5 16 M16 17 Q12.5 18.5 11.5 21 M16 16 Q19.5 17.5 20.5 20" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.65"/>`;
}

function rosemarySprig() {
  return `${frameCircle()}
    <line x1="16" y1="27" x2="16" y2="6.5" stroke="${SAGE}" stroke-width="1.55"/>
    ${Array.from({length: 8}, (_, i) => {
      const y = 8.2 + i * 2.15;
      const w = 6.2 - i * 0.28;
      return `<line x1="${16 - w}" y1="${y - 0.6}" x2="${16 - 0.6}" y2="${y + 0.4}" stroke="${GREEN}" stroke-width="1.35" stroke-linecap="round"/>` +
        `<line x1="${16 + w}" y1="${y - 0.6}" x2="${16 + 0.6}" y2="${y + 0.4}" stroke="${GREEN}" stroke-width="1.35" stroke-linecap="round"/>`;
    }).join('')}
    <circle cx="16" cy="5.8" r="1.25" fill="${GOLD}" fill-opacity="0.6"/>`;
}

function mugwortLeaf() {
  return `${frameCircle()}
    <path d="M16 27 C12 23 7 21 8 16 C5 15 6 10 10 11 C8 7 12 4 16 4 C20 4 24 7 22 11 C26 10 27 15 24 16 C25 21 20 23 16 27Z" fill="${SAGE}" fill-opacity="0.86" stroke="${GREEN}" stroke-width="0.9"/>
    <path d="M16 25.5 V5.5" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="0.85"/>
    <path d="M16 10 Q11 11 9.5 14 M16 14 Q21 15 22.5 18 M16 18 Q12 19 10.5 22" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.7"/>
    <path d="M10 12 Q8 14 9 16 M22 12 Q24 14 23 16" fill="none" stroke="${GREEN}" stroke-opacity="0.55" stroke-width="0.75"/>`;
}

function dillUmbrella() {
  return `${frameCircle()}
    <line x1="16" y1="26" x2="16" y2="14" stroke="${SAGE}" stroke-width="1.3"/>
    ${Array.from({length: 8}, (_, i) => {
      const a = (i * 45 - 90) * Math.PI / 180;
      const x = 16 + Math.cos(a) * 8;
      const y = 12 + Math.sin(a) * 7;
      return `<line x1="16" y1="14" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${GREEN}" stroke-width="1.05" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.15" fill="${CREAM}" fill-opacity="0.75"/>`;
    }).join('')}`;
}

function oreganoCluster() {
  return `${frameCircle()}
    <line x1="16" y1="26" x2="16" y2="11" stroke="${SAGE}" stroke-width="1.25"/>
    ${leafSimple(12, 13, -55, GREEN, 5.5)}
    ${leafSimple(20, 13, 55, GREEN, 5.5)}
    ${leafSimple(12, 18, -50, SAGE, 5)}
    ${leafSimple(20, 18, 50, SAGE, 5)}
    ${leafSimple(16, 15, 0, GREEN, 6)}
    <circle cx="16" cy="9.5" r="1.3" fill="${GOLD}" fill-opacity="0.5"/>`;
}

function marjoramCluster() {
  return `${frameCircle()}
    <line x1="16" y1="26" x2="16" y2="10" stroke="${SAGE}" stroke-width="1.2"/>
    <ellipse cx="16" cy="12" rx="2.2" ry="3.2" fill="${GREEN}" fill-opacity="0.85"/>
    <ellipse cx="12.5" cy="15" rx="2" ry="2.8" fill="${SAGE}" fill-opacity="0.8"/>
    <ellipse cx="19.5" cy="15" rx="2" ry="2.8" fill="${SAGE}" fill-opacity="0.8"/>
    <ellipse cx="14" cy="19" rx="1.8" ry="2.5" fill="${GREEN}" fill-opacity="0.75"/>
    <ellipse cx="18" cy="19" rx="1.8" ry="2.5" fill="${GREEN}" fill-opacity="0.75"/>
    <circle cx="16" cy="8.5" r="1.2" fill="${GOLD}" fill-opacity="0.55"/>`;
}

function softBlankGlyph() {
  return `${frameCircle(STROKE, 0.28)}
    <circle cx="16" cy="16" r="5.5" fill="none" stroke="${STROKE}" stroke-opacity="0.35" stroke-width="1.1"/>
    <circle cx="16" cy="16" r="2" fill="${GOLD}" fill-opacity="0.35"/>`;
}

function defaultHerb() {
  return `${frameCircle()}
    ${leafSimple(16, 15, -22, GREEN, 10)}
    ${leafSimple(16, 17, 28, SAGE, 8)}
    <line x1="16" y1="26" x2="16" y2="11" stroke="${SAGE}" stroke-width="1.3"/>`;
}

function defaultKitchen() {
  return jar();
}

function defaultStone() {
  return tumbledStone(TEAL, 8.5, 7);
}

function defaultTool() {
  return `${frameCircle()}
    <circle cx="16" cy="16" r="6.5" fill="none" stroke="${GOLD}" stroke-width="1.55"/>
    <path d="M16 10 V22 M10 16 H22" stroke="${CREAM}" stroke-width="1.25" stroke-linecap="round"/>`;
}

function defaultLink() {
  return linkChain();
}

function defaultOffering() {
  return offeringHands();
}

function defaultColor() {
  return swatch('#9b7ed9');
}

/* Color name → hex */
const COLOR_HEX = {
  'Weiß': '#f2efe6', 'Schwarz': '#2a2a32', 'Grau': '#8a8a96', 'Silber': '#c0c6ce',
  'Gold': '#e8c547', 'Rot': '#c43c3c', 'Weinrot': '#7a1e2e', 'Orange': '#d4782a',
  'Gelb': '#e8d060', 'Grün': '#4a9a5a', 'Erdbraun': '#8a5a32', 'Blau': '#3a6aaa',
  'Nachtblau': '#1a2a4a', 'Indigo': '#3a2a7a', 'Violett': '#7a4aaa', 'Rosa': '#d490a8',
  'Kupfer': '#b87333', 'Knochenweiß': '#e8e0d0', 'Mintgrün': '#6aba9a', 'Purpur': '#6a2a6a',
  'Waldgrün': '#2a5a3a', 'Rauchgrau': '#6a6a72', 'Herbstrot': '#a83a2a', 'Eisengrau': '#5a5a62',
  'Elektrisches Blau': '#3a8ae8', 'Blutrot (mit Maß)': '#8a1a1a', 'Blutrot (Akzent)': '#a82a2a',
  'Rot (mit Maß)': '#b83a3a', 'Zinnober-Ton': '#c45a3a', 'Zinnoberrot': '#d43020',
  'Nordblau': '#2a4a7a', 'Königsblau': '#2a3a8a', 'Tannengrün': '#1a4a2a',
  'Honiggold': '#d4a830', 'Goldton': '#c9a030', 'Muschelweiß': '#f0ebe0', 'Neon-Akzent': '#40e0c0'
};

/* Per-name overrides */
const NAME_MOTIF = {
  'Lavendel': () => spikeFlower(PURPLE),
  'Rose': () => roseBloom(),
  'Salbei': () => sageOvalLeaf(),
  'Rosmarin': () => rosemarySprig(),
  'Thymian': () => `${frameCircle()}<line x1="16" y1="25" x2="16" y2="9" stroke="${SAGE}" stroke-width="1.2"/>${Array.from({length:5},(_,i)=>`<ellipse cx="13" cy="${10+i*2.8}" rx="2.4" ry="1.5" fill="${GREEN}" fill-opacity="0.85"/><ellipse cx="19" cy="${11+i*2.8}" rx="2.4" ry="1.5" fill="${SAGE}" fill-opacity="0.85"/>`).join('')}`,
  'Minze': () => `${frameCircle()}${leafSimple(12, 16, -40, GREEN, 8)}${leafSimple(20, 16, 40, GREEN, 8)}<line x1="16" y1="24" x2="16" y2="10" stroke="${SAGE}" stroke-width="1.2"/>`,
  'Kamille': () => daisy(),
  'Basilikum': () => `${frameCircle()}${leafSimple(16, 15, 0, GREEN, 11)}`,
  'Lorbeer': () => `${frameCircle()}${leafSimple(12, 16, -35, SAGE, 9)}${leafSimple(20, 16, 35, SAGE, 9)}<circle cx="16" cy="16" r="2" fill="${GOLD}" fill-opacity="0.5"/>`,
  'Beifuß': () => mugwortLeaf(),
  'Wacholder': () => treeNeedle(),
  'Wermut': () => thistleLike(SAGE),
  'Eisenkraut': () => spikeFlower('#7a8ac8'),
  'Melisse': () => `${frameCircle()}<path d="M16 26 C10 20 8 14 16 7 C24 14 22 20 16 26Z" fill="${GREEN}" fill-opacity="0.85"/><path d="M16 24 V9" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="0.75"/><path d="M16 14 Q12 16 11 18 M16 12 Q20 14 21 16" fill="none" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.6"/><circle cx="16" cy="11" r="1.2" fill="${GOLD}" fill-opacity="0.45"/>`,
  'Johanniskraut': () => sunHerb(),
  'Holunder': () => berryCluster('#5a3a7a'),
  'Brennnessel': () => nettle(),
  'Löwenzahn': () => dandelion(),
  'Schafgarbe': () => `${frameCircle()}<line x1="16" y1="26" x2="16" y2="10" stroke="${GREEN}" stroke-width="1.2"/>${Array.from({length:5},(_,i)=>`<circle cx="${12+i*2}" cy="10" r="1.8" fill="${CREAM}" fill-opacity="0.8"/>`).join('')}${leafSimple(12,18,-40,GREEN,5)}${leafSimple(20,18,40,GREEN,5)}`,
  'Ringelblume': () => marigold(),
  'Lindenblüte': () => `${frameCircle()}${leafSimple(16, 18, 0, GREEN, 9)}<circle cx="16" cy="10" r="3" fill="${GOLD}" fill-opacity="0.7"/><circle cx="12" cy="12" r="2" fill="${GOLD}" fill-opacity="0.5"/><circle cx="20" cy="12" r="2" fill="${GOLD}" fill-opacity="0.5"/>`,
  'Fenchel': () => `${frameCircle()}<line x1="16" y1="26" x2="16" y2="14" stroke="${GREEN}" stroke-width="1.2"/>${Array.from({length:7},(_,i)=>{const a=(i*25-75)*Math.PI/180;return `<line x1="16" y1="14" x2="${(16+Math.cos(a)*10).toFixed(1)}" y2="${(14+Math.sin(a)*10).toFixed(1)}" stroke="${GREEN}" stroke-width="1"/>`;}).join('')}`,
  'Dill': () => dillUmbrella(),
  'Majoran': () => marjoramCluster(),
  'Oregano': () => oreganoCluster(),
  'Petersilie': () => `${frameCircle()}${leafSimple(11,14,-40,GREEN,6)}${leafSimple(16,12,0,GREEN,7)}${leafSimple(21,14,40,GREEN,6)}<line x1="16" y1="26" x2="16" y2="14" stroke="${SAGE}" stroke-width="1.1"/>`,
  'Frauenmantel': () => `${frameCircle()}<path d="M8 14 Q16 8 24 14 Q22 24 16 26 Q10 24 8 14Z" fill="${GREEN}" fill-opacity="0.7" stroke="${SAGE}" stroke-width="0.9"/><circle cx="16" cy="16" r="2" fill="${TEAL}" fill-opacity="0.5"/>`,
  'Gänseblümchen': () => daisy(),
  'Ysop': () => spikeFlower('#6a8ad4'),
  'Weihrauch': () => incense(),
  'Myrrhe': () => `${frameCircle()}<rect x="11" y="10" width="10" height="12" rx="2" fill="${EARTH}" fill-opacity="0.65" stroke="${GOLD}" stroke-width="0.9"/>${smoke().replace(frameCircle(),'')}`,
  'Zeder': () => treeNeedle(),
  'Angelika': () => `${frameCircle()}<line x1="16" y1="26" x2="16" y2="12" stroke="${GREEN}" stroke-width="1.3"/><circle cx="16" cy="10" r="5" fill="none" stroke="${GREEN}" stroke-width="1.2"/>${Array.from({length:6},(_,i)=>{const a=i*60*Math.PI/180;return `<circle cx="${(16+Math.cos(a)*5).toFixed(1)}" cy="${(10+Math.sin(a)*5).toFixed(1)}" r="1.5" fill="${CREAM}" fill-opacity="0.7"/>`;}).join('')}`,
  'Hopfen': () => hopCone(),
  'Baldrian': () => `${frameCircle()}${leafSimple(16,14,0,PURPLE,9)}<path d="M16 24 Q12 20 16 16 Q20 20 16 24" fill="${PURPLE}" fill-opacity="0.4"/>`,
  'Eibisch': () => `${frameCircle()}<path d="M16 26 C10 18 10 12 16 6 C22 12 22 18 16 26Z" fill="${ROSE}" fill-opacity="0.7"/>${leafSimple(10,20,-50,GREEN,5)}`,
  'Birke': () => birch(),
  'Weide': () => `${frameCircle()}<path d="M16 6 V12 M10 10 Q16 14 16 26 M22 10 Q16 14 16 26 M13 12 Q16 16 16 24 M19 12 Q16 16 16 24" fill="none" stroke="${GREEN}" stroke-width="1.2"/>`,
  'Fichte': () => treeNeedle(),
  'Eichenblatt': () => oakLeaf(),
  'Myrte': () => `${frameCircle()}${leafSimple(13,14,-30,GREEN,7)}${leafSimple(19,14,30,GREEN,7)}<circle cx="16" cy="20" r="2.5" fill="${CREAM}" fill-opacity="0.6"/>`,
  'Tabak (symbolisch)': () => `${frameCircle()}${leafSimple(16,15,10,'#8a6a3a',10)}`,
  'Tabak (Symbol)': () => `${frameCircle()}${leafSimple(16,15,10,'#8a6a3a',10)}`,

  // Kitchen
  'Salz': () => saltPile(),
  'Zucker': () => saltPile().replace(new RegExp(CREAM,'g'), '#fff8e8'),
  'Zimt': () => `${frameCircle()}<rect x="10" y="8" width="5" height="16" rx="2" fill="#8a4a28" fill-opacity="0.85"/><rect x="17" y="8" width="5" height="16" rx="2" fill="#a05a30" fill-opacity="0.85"/>`,
  'Honig': () => honey(),
  'Öl': () => oilDrop(),
  'Essig': () => jar(),
  'Milch': () => milk(),
  'Ei': () => egg(),
  'Brot': () => bread(),
  'Pfeffer': () => `${frameCircle()}<circle cx="13" cy="14" r="2.2" fill="#3a2a20"/><circle cx="19" cy="14" r="2" fill="#4a3020"/><circle cx="16" cy="19" r="2.3" fill="#2a1a10"/><circle cx="12" cy="20" r="1.5" fill="#3a2a18"/>`,
  'Knoblauch': () => garlic(),
  'Nelke': () => `${frameCircle()}<circle cx="16" cy="14" r="3" fill="#5a2a2a"/><path d="M16 17 V24 M13 12 L10 8 M19 12 L22 8 M16 11 V7" stroke="#5a2a2a" stroke-width="1.3" stroke-linecap="round"/>`,
  'Anis': () => `${frameCircle()}<circle cx="16" cy="16" r="3" fill="${CREAM}" fill-opacity="0.7"/>${Array.from({length:8},(_,i)=>{const a=i*45*Math.PI/180;return `<ellipse cx="${(16+Math.cos(a)*6).toFixed(1)}" cy="${(16+Math.sin(a)*6).toFixed(1)}" rx="2" ry="3" transform="rotate(${i*45} ${(16+Math.cos(a)*6).toFixed(1)} ${(16+Math.sin(a)*6).toFixed(1)})" fill="${CREAM}" fill-opacity="0.75"/>`;}).join('')}`,
  'Kardamom': () => `${frameCircle()}<ellipse cx="16" cy="16" rx="5" ry="8" fill="${GREEN}" fill-opacity="0.65" stroke="${SAGE}" stroke-width="0.9"/><ellipse cx="16" cy="16" rx="2" ry="4" fill="${CREAM}" fill-opacity="0.3"/>`,
  'Vanille': () => `${frameCircle()}<rect x="13" y="6" width="3" height="20" rx="1.5" fill="#5a3a18" transform="rotate(-15 16 16)"/><rect x="16" y="6" width="3" height="20" rx="1.5" fill="#6a4a22" transform="rotate(12 16 16)"/>`,
  'Senf': () => `${frameCircle()}<circle cx="13" cy="15" r="2" fill="${GOLD}"/><circle cx="18" cy="14" r="2.2" fill="#d4a020"/><circle cx="15" cy="19" r="1.8" fill="${GOLD}"/><circle cx="20" cy="19" r="1.5" fill="#c49018"/>`,
  'Kaffee': () => coffee(),
  'Tee': () => `${frameCircle()}<path d="M9 12 H20 V22 Q15 25 11 22Z" fill="${GREEN}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="1"/><path d="M20 14 H23.5 Q25 17 23.5 20 H20" fill="none" stroke="${GOLD}" stroke-width="1.2"/><ellipse cx="14.5" cy="12" rx="5" ry="1.5" fill="${CREAM}" fill-opacity="0.3"/>`,
  'Mehl': () => saltPile(),
  'Reis': () => `${frameCircle()}${Array.from({length:9},(_,i)=>`<ellipse cx="${10+(i%3)*6}" cy="${12+Math.floor(i/3)*5}" rx="2.2" ry="1.3" fill="${CREAM}" fill-opacity="0.8" transform="rotate(${-20+i*8} ${10+(i%3)*6} ${12+Math.floor(i/3)*5})"/>`).join('')}`,
  'Butter': () => `${frameCircle()}<rect x="8" y="12" width="16" height="10" rx="2" fill="${GOLD}" fill-opacity="0.7" stroke="${CREAM}" stroke-width="0.8"/>`,
  'Seife': () => soap(),
  'Wasser': () => water(),
  'Zitrone': () => lemon(),
  'Ingwer': () => `${frameCircle()}<path d="M8 18 Q10 10 16 12 Q18 8 22 10 Q26 14 24 20 Q18 24 12 22 Q6 22 8 18Z" fill="#d4a060" fill-opacity="0.8" stroke="${EARTH}" stroke-width="0.9"/>`,
  'Zwiebel': () => `${frameCircle()}<ellipse cx="16" cy="18" rx="8" ry="7" fill="#d4b878" fill-opacity="0.75" stroke="${EARTH}" stroke-width="0.9"/><path d="M16 11 V6 M13 8 L16 6 L19 8" fill="none" stroke="${GREEN}" stroke-width="1.1"/>`,
  'Hafer': () => `${frameCircle()}<line x1="16" y1="26" x2="16" y2="8" stroke="${GREEN}" stroke-width="1.1"/>${Array.from({length:6},(_,i)=>`<ellipse cx="${14-(i%2)}" cy="${10+i*2.5}" rx="3" ry="1.4" fill="${GOLD}" fill-opacity="0.75"/><ellipse cx="${18+(i%2)}" cy="${11+i*2.5}" rx="3" ry="1.4" fill="${GOLD}" fill-opacity="0.75"/>`).join('')}`,
  'Apfel': () => apple(),

  // Offerings / drinks
  'Dankgabe': () => offeringHands(),
  'Obst': () => `${frameCircle()}<circle cx="12" cy="16" r="4" fill="#c45c5c" fill-opacity="0.8"/><circle cx="20" cy="15" r="4" fill="#d4a020" fill-opacity="0.8"/><circle cx="16" cy="21" r="3.5" fill="#6aaa4a" fill-opacity="0.75"/>`,
  'Blumen': () => daisy(),
  'Kuchen': () => `${frameCircle()}<path d="M6 18 H26 L24 24 H8Z" fill="${EARTH}" fill-opacity="0.6" stroke="${GOLD}" stroke-width="0.9"/><ellipse cx="16" cy="18" rx="10" ry="3" fill="${ROSE}" fill-opacity="0.55"/><circle cx="16" cy="14" r="2" fill="${CREAM}" fill-opacity="0.5"/>`,
  'Süßes': () => `${frameCircle()}<circle cx="16" cy="16" r="7" fill="${ROSE}" fill-opacity="0.6" stroke="${GOLD}" stroke-width="1"/><circle cx="16" cy="16" r="3" fill="${GOLD}" fill-opacity="0.5"/>`,
  'Kerze': () => wax(),
  'Licht': () => sunHerb(),
  'Rauch': () => smoke(),
  'Münze': () => coin(),
  'Alkohol': () => wineGlass('#6a4a8a'),
  'Rum': () => `${frameCircle()}<path d="M12 8 H20 V12 L19 24 Q16 26 13 24Z" fill="#8a4a18" fill-opacity="0.7" stroke="${GOLD}" stroke-width="1"/><rect x="13" y="6" width="6" height="3" fill="${EARTH}"/>`,
  'Wein': () => wineGlass('#6a1a2a'),
  'Rotwein': () => wineGlass('#7a1e2e'),
  'Weißwein': () => wineGlass('#e8d890'),
  'Bier': () => beerMug(),
  'Met': () => `${frameCircle()}<path d="M10 10 H22 L20 24 Q16 26 12 24Z" fill="${GOLD}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1"/><circle cx="16" cy="8" r="2" fill="${GOLD}"/>`,
  'Schnaps': () => `${frameCircle()}<path d="M13 8 H19 V14 L18 24 H14Z" fill="${TEAL}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="1"/>`,
  'Branntwein': () => jar(),
  'Whisky': () => `${frameCircle()}<path d="M11 8 H21 L20 24 Q16 26 12 24Z" fill="#a06a28" fill-opacity="0.65" stroke="${GOLD}" stroke-width="1"/>`,
  'Cognac': () => wineGlass('#a05a20'),
  'Likör': () => wineGlass('#8a3a6a'),
  'Champagner': () => `${frameCircle()}<path d="M13 8 H19 L18 18 H14Z" fill="${CREAM}" fill-opacity="0.45" stroke="${GOLD}" stroke-width="0.9"/><line x1="16" y1="18" x2="16" y2="24" stroke="${CREAM}" stroke-width="1.1"/><line x1="12" y1="25" x2="20" y2="25" stroke="${CREAM}" stroke-width="1.2"/><circle cx="18" cy="10" r="1" fill="${CREAM}" fill-opacity="0.6"/><circle cx="15" cy="12" r="0.8" fill="${CREAM}" fill-opacity="0.5"/>`,
  'Sekt': () => `${frameCircle()}<path d="M13 8 H19 L18 18 H14Z" fill="${TEAL}" fill-opacity="0.3" stroke="${GOLD}" stroke-width="0.9"/><line x1="16" y1="18" x2="16" y2="24" stroke="${CREAM}" stroke-width="1.1"/><line x1="12" y1="25" x2="20" y2="25" stroke="${CREAM}" stroke-width="1.2"/>`,

  // Stones
  'Bergkristall': () => quartzPoint('#a8d4e8'),
  'Rosenquarz': () => cabochon(ROSE),
  'Rauchquarz': () => quartzPoint('#6a5a58'),
  'Raucherquarz': () => quartzPoint('#6a5a58'),
  'Amethyst': () => pointCluster(PURPLE),
  'Citrin': () => crystal(GOLD),
  'Milchquarz': () => tumbledStone('#e8e4dc', 9, 7.2),
  'Aventurin': () => cabochon('#5a9a6a'),
  'Obsidian': () => obsidianShard(),
  'Schwarzer Turmalin': () => crystalDark('#2a2a35'),
  'Schwarzer Turmalin (Symbol)': () => crystalDark('#2a2a35'),
  'Hämatit': () => cabochon('#5a5a68'),
  'Onyx': () => tumbledStone('#22222a', 8.5, 7.5),
  'Labradorit': () => `${frameCircle()}<path d="M8 18 L16 6 L24 18 L16 26Z" fill="#3a6a7a" fill-opacity="0.7" stroke="${STROKE}" stroke-width="1.2"/><path d="M12 16 L20 14" stroke="${TEAL}" stroke-width="1.4" stroke-opacity="0.7"/><path d="M11 19 L19 17" stroke="#80d0e8" stroke-width="1" stroke-opacity="0.55"/>`,
  'Mondstein': () => moonstoneRound(),
  'Selenit': () => `${frameCircle()}<rect x="11" y="6" width="10" height="20" rx="1.5" fill="#e8e8f0" fill-opacity="0.7" stroke="${STROKE}" stroke-width="1.1"/><path d="M11 12 H21 M11 16 H21 M11 20 H21" stroke="${CREAM}" stroke-opacity="0.45" stroke-width="0.7"/>`,
  'Jaspis': () => tumbledStone('#c45a3a', 9, 7),
  'Achat': () => `${frameCircle()}<circle cx="16" cy="16" r="9" fill="#8a6a4a" fill-opacity="0.5" stroke="${GOLD}" stroke-width="1"/><circle cx="16" cy="16" r="6" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="1"/><circle cx="16" cy="16" r="3" fill="${EARTH}" fill-opacity="0.5"/>`,
  'Moosachat': () => `${frameCircle()}<circle cx="16" cy="16" r="9" fill="#4a7a5a" fill-opacity="0.45" stroke="${GREEN}" stroke-width="1"/>${leafSimple(14,14,-20,GREEN,5)}${leafSimple(19,17,30,SAGE,4)}`,
  'Tigerauge': () => `${frameCircle()}<ellipse cx="16" cy="16" rx="9" ry="7" fill="#8a6a28" fill-opacity="0.7" stroke="${GOLD}" stroke-width="1"/><ellipse cx="16" cy="16" rx="4" ry="7" fill="#3a2a10" fill-opacity="0.6"/><ellipse cx="16" cy="16" rx="1.5" ry="7" fill="${GOLD}" fill-opacity="0.5"/>`,
  'Karneol': () => cabochon('#d4683a'),
  'Lapis': () => `${frameCircle()}<circle cx="16" cy="16" r="9" fill="#2a4a8a" fill-opacity="0.75" stroke="${STROKE}" stroke-width="1.2"/><circle cx="12" cy="13" r="1.3" fill="${GOLD}" fill-opacity="0.7"/><circle cx="19" cy="18" r="1" fill="${GOLD}" fill-opacity="0.55"/><circle cx="17" cy="12" r="0.8" fill="${CREAM}" fill-opacity="0.45"/>`,
  'Fluorit': () => `${frameCircle()}<path d="M16 6 L24 12 L24 20 L16 26 L8 20 L8 12Z" fill="#6a8a6a" fill-opacity="0.65" stroke="${STROKE}" stroke-width="1.2"/><path d="M16 6 V26 M8 12 L24 20 M24 12 L8 20" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.7"/>`,
  'Pyrit': () => `${frameCircle()}<rect x="9" y="9" width="14" height="14" rx="1" fill="${GOLD}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.2"/><path d="M9 9 L16 5 L23 9 M9 23 L16 27 L23 23 M16 5 V27" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.7"/>`,
  'Bernstein': () => cabochon('#d49030'),
  'Jade': () => tumbledStone('#3a8a5a', 8.8, 7.2),
  'Türkis': () => cabochon('#3aa8a8'),
  'Malachit': () => `${frameCircle()}<circle cx="16" cy="16" r="9" fill="#2a7a4a" fill-opacity="0.6" stroke="${GREEN}" stroke-width="1"/><circle cx="16" cy="16" r="5" fill="none" stroke="#1a5a3a" stroke-width="2"/><circle cx="16" cy="16" r="2" fill="#1a5a3a"/>`,
  'Granat': () => `${frameCircle()}<path d="M16 6 L22 12 L20 22 L12 22 L10 12Z" fill="#8a1a2a" fill-opacity="0.8" stroke="${STROKE}" stroke-width="1.2"/><path d="M16 6 L16 22 M10 12 H22" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.7"/>`,
  'Flint': () => `${frameCircle()}<path d="M10 22 L14 8 L22 12 L18 24Z" fill="#5a5a62" fill-opacity="0.75" stroke="${CREAM}" stroke-width="0.9"/>`,
  'Flusskiesel': () => `${frameCircle()}<ellipse cx="14" cy="17" rx="6" ry="5" fill="#7a8a9a" fill-opacity="0.6"/><ellipse cx="20" cy="15" rx="5" ry="4" fill="#6a9aaa" fill-opacity="0.55"/>`,
  'Sodalith': () => tumbledStone('#2a3a7a', 9, 7),
  'Holzperle': () => `${frameCircle()}<circle cx="16" cy="16" r="8" fill="${EARTH}" fill-opacity="0.75" stroke="${GOLD}" stroke-width="1"/><circle cx="16" cy="16" r="2" fill="${DARK}"/><path d="M10 14 Q16 12 22 14" fill="none" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="0.7"/>`,
  'Knochenweiß-Stein': () => tumbledStone('#e8e0d0', 9, 6.5),
  'Eisengrau-Stein': () => tumbledStone('#5a5a62', 9, 7),
  'Granit': () => `${frameCircle()}<rect x="8" y="8" width="16" height="16" rx="2" fill="#5a5a62" fill-opacity="0.6" stroke="${CREAM}" stroke-width="0.9"/><circle cx="12" cy="13" r="1.2" fill="${CREAM}" fill-opacity="0.4"/><circle cx="18" cy="18" r="1.5" fill="#2a2a30" fill-opacity="0.5"/><circle cx="20" cy="12" r="1" fill="${CREAM}" fill-opacity="0.35"/>`,
  'Kiesel vom Weg': () => `${frameCircle()}<ellipse cx="16" cy="17" rx="8" ry="6" fill="#7a7060" fill-opacity="0.7" stroke="${EARTH}" stroke-width="0.9"/>`,
  'Tonperle': () => `${frameCircle()}<circle cx="16" cy="16" r="8" fill="#a07848" fill-opacity="0.75" stroke="${EARTH}" stroke-width="1"/><circle cx="16" cy="16" r="2" fill="${DARK}"/>`,
  'Schiefer': () => `${frameSquare()}<rect x="8" y="10" width="16" height="3" fill="#5a5a68" fill-opacity="0.7"/><rect x="8" y="14.5" width="16" height="3" fill="#4a4a55" fill-opacity="0.7"/><rect x="8" y="19" width="16" height="3" fill="#5a5a68" fill-opacity="0.7"/>`,
  'Quarz': () => quartzPoint('#a0c8e0'),
  'Quarzader': () => `${frameCircle()}<path d="M6 20 Q12 10 16 16 Q20 22 26 12" fill="none" stroke="${CREAM}" stroke-width="2"/><path d="M8 22 Q14 12 18 18" fill="none" stroke="${TEAL}" stroke-width="1.2" stroke-opacity="0.6"/>`,
  'Klarer Quarz': () => quartzPoint('#c8e4f0'),
  'Grüner Achat': () => `${frameCircle()}<circle cx="16" cy="16" r="9" fill="#4a8a5a" fill-opacity="0.55" stroke="${GREEN}" stroke-width="1.15"/><circle cx="16" cy="16" r="6" fill="none" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="1"/><circle cx="16" cy="16" r="3" fill="#2a5a3a" fill-opacity="0.55"/>`,
  'Lava': () => lava(),
  'Koralle': () => coral(),
  'Korallenstück (Symbol)': () => coral(),
  'Muschel': () => shell(),
  'Betonstück': () => `${frameCircle()}<rect x="8" y="10" width="16" height="12" rx="1" fill="#6a6a70" fill-opacity="0.65" stroke="${CREAM}" stroke-width="0.8"/><circle cx="12" cy="14" r="1" fill="${CREAM}" fill-opacity="0.3"/><circle cx="19" cy="18" r="1.3" fill="${CREAM}" fill-opacity="0.25"/>`,
  'Glasbruch (sicher)': () => `${frameCircle()}<path d="M10 22 L16 6 L22 22Z" fill="${TEAL}" fill-opacity="0.35" stroke="${CREAM}" stroke-width="1"/><path d="M16 6 L16 22" stroke="${CREAM}" stroke-opacity="0.4" stroke-width="0.7"/>`,

  // Tools
  'Kreide': () => chalk(),
  'Besen': () => broom(),
  'Becher': () => `${frameCircle()}<path d="M9 10 H23 L21 24 Q16 26 11 24Z" fill="${EARTH}" fill-opacity="0.45" stroke="${GOLD}" stroke-width="1.1"/>`,
  'Faden': () => thread(),
  'Spiegel': () => mirror(),
  'Schale': () => bowl(),
  'Glocke': () => bell(),
  'Athame (Symbol)': () => knife(),
  'Beutel': () => `${frameCircle()}<path d="M10 12 H22 L23 24 H9Z" fill="${PURPLE}" fill-opacity="0.5" stroke="${GOLD}" stroke-width="1"/><path d="M12 12 Q16 8 20 12" fill="none" stroke="${GOLD}" stroke-width="1.1"/>`,
  'Altar-Tuch': () => `${frameSquare()}<rect x="7" y="7" width="18" height="18" rx="2" fill="${PURPLE}" fill-opacity="0.35" stroke="${GOLD}" stroke-width="1"/><path d="M7 16 H25 M16 7 V25" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="0.7"/>`,
  'Weihrauchhalter': () => `${frameCircle()}<ellipse cx="16" cy="22" rx="8" ry="3" fill="${EARTH}" fill-opacity="0.6" stroke="${GOLD}" stroke-width="0.9"/><rect x="14.5" y="12" width="3" height="10" fill="${EARTH}"/>${smoke().replace(frameCircle(),'')}`,
  'Mörser': () => mortar(),
  'Pendel': () => pendulum(),
  'Stab / Wand': () => wand(),
  'Kessel': () => cauldron(),
  'Karten': () => cards(),
  'Trommel': () => drum(),
  'Trommel (Symbol)': () => drum(),
  'Rassel': () => `${frameCircle()}<circle cx="16" cy="12" r="6" fill="${EARTH}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1"/><line x1="16" y1="18" x2="16" y2="26" stroke="${EARTH}" stroke-width="1.5"/><circle cx="13" cy="11" r="1.2" fill="${GOLD}"/><circle cx="18" cy="13" r="1" fill="${CREAM}"/>`,
  'Feder': () => feather(),
  'Messer (Haus)': () => knife(),
  'Schere': () => scissors(),
  'Nadelkissen': () => `${frameCircle()}<circle cx="16" cy="17" r="8" fill="${ROSE}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1"/><line x1="12" y1="8" x2="14" y2="16" stroke="${CREAM}" stroke-width="1"/><line x1="20" y1="7" x2="18" y2="15" stroke="${CREAM}" stroke-width="1"/>`,
  'Schlüssel': () => keyTool(),
  'Waage (Symbol)': () => scales(),
  'Streichhölzer': () => `${frameCircle()}<line x1="12" y1="24" x2="12" y2="10" stroke="${EARTH}" stroke-width="1.5"/><line x1="16" y1="24" x2="16" y2="10" stroke="${EARTH}" stroke-width="1.5"/><line x1="20" y1="24" x2="20" y2="10" stroke="${EARTH}" stroke-width="1.5"/><circle cx="12" cy="9" r="1.5" fill="#c45c2a"/><circle cx="16" cy="9" r="1.5" fill="#c45c2a"/><circle cx="20" cy="9" r="1.5" fill="${GOLD}"/>`,
  'Buch': () => book(),
  'Räucherschale': () => `${frameCircle()}${bowl().replace(frameCircle(),'')}${smoke().replace(frameCircle(),'')}`,
  'Horn / Becher': () => `${frameCircle()}<path d="M10 8 Q8 16 12 24 Q16 26 18 22 Q22 12 24 8 Q18 10 10 8Z" fill="${EARTH}" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1"/>`,
  'Feder / Stift': () => feather(),
  'Stift': () => `${frameCircle()}<rect x="14" y="6" width="4" height="16" rx="1" fill="${EARTH}" fill-opacity="0.7"/><path d="M14 22 L16 27 L18 22Z" fill="${CREAM}" stroke="${GOLD}" stroke-width="0.6"/>`,
  'Würfel / Münze': () => `${frameCircle()}<rect x="9" y="9" width="14" height="14" rx="2" fill="${PURPLE}" fill-opacity="0.4" stroke="${GOLD}" stroke-width="1.2"/><circle cx="13" cy="13" r="1.3" fill="${GOLD}"/><circle cx="19" cy="19" r="1.3" fill="${GOLD}"/><circle cx="16" cy="16" r="1.3" fill="${CREAM}"/>`,
  'Nagel (Eisen)': () => nail(),
  'Nadel': () => needle(),

  // Links
  'Haare (eigene)': () => hair(),
  'Faden / Knoten': () => `${frameCircle()}<path d="M8 16 Q12 8 16 16 Q20 24 24 16" fill="none" stroke="${GOLD}" stroke-width="1.8"/><circle cx="16" cy="16" r="3" fill="none" stroke="${EARTH}" stroke-width="1.4"/>`,
  'Tuch / Fetzen': () => `${frameSquare()}<path d="M8 10 Q16 8 24 12 L22 24 Q14 22 8 20Z" fill="${PURPLE}" fill-opacity="0.4" stroke="${GOLD}" stroke-width="1"/>`,
  'Erde / Staub': () => earthDust(),
  'Wachs': () => wax(),
  'Asche': () => ash(),
  'Knochen (Symbol)': () => bone(),
  'Foto / Name-Zettel': () => photo(),
  'Blut (Symbol)': () => blood(),
  'Speichel (Symbol)': () => spit(),
  'Fußabdruck (Symbol)': () => footprint(),
  'Grab-Erde (Symbol)': () => grave(),
  'Rost': () => rust(),
  'Schwefel (Symbol)': () => sulfur(),
  'Quecksilber (Symbol)': () => mercury(),
  'Muschelweiß': () => swatch('#f0ebe0'),
  'Zinnober-Ton': () => swatch('#c45a3a'),
};


function motifFor(name, kind) {
  if (NAME_MOTIF[name]) return NAME_MOTIF[name]();
  if (kind === 'color' || COLOR_HEX[name]) {
    const hex = COLOR_HEX[name] || '#9b7ed9';
    return swatch(hex);
  }
  if (kind === 'herb') return defaultHerb();
  if (kind === 'kitchen') return defaultKitchen();
  if (kind === 'stone') return defaultStone();
  if (kind === 'tool') return defaultTool();
  if (kind === 'link') return defaultLink();
  if (kind === 'offering') return defaultOffering();
  return defaultHerb();
}

// ——— main ———
const data = JSON.parse(fs.readFileSync('/tmp/lex-names.json', 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

const slugToName = {};
const collisions = [];
const manifest = [];

for (const name of data.names) {
  const slug = slugify(name);
  if (slugToName[slug] && slugToName[slug] !== name) {
    collisions.push([slug, slugToName[slug], name]);
  }
  slugToName[slug] = name;
  const kind = data.kindOf[name] || 'herb';
  const svg = wrap(motifFor(name, kind), name);
  const file = slug + '.svg';
  fs.writeFileSync(path.join(OUT, file), svg);
  manifest.push({ name, slug, file, kind });
}

if (collisions.length) {
  console.error('SLUG COLLISIONS:', collisions);
  process.exit(1);
}

manifest.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const categoryDefaults = {
  'fallback-herb.svg': defaultHerb(),
  'fallback-kitchen.svg': defaultKitchen(),
  'fallback-stone.svg': defaultStone(),
  'fallback-tool.svg': defaultTool(),
  'fallback-link.svg': defaultLink(),
  'fallback-offering.svg': defaultOffering(),
  'fallback-color.svg': defaultColor(),
  'fallback-blank.svg': softBlankGlyph(),
};
for (const [file, inner] of Object.entries(categoryDefaults)) {
  const label = file.replace('.svg', '').replace(/^_cat-/, 'Kategorie ').replace('_blank', 'Symbol');
  fs.writeFileSync(path.join(OUT, file), wrap(inner, label));
}

console.log('Generated', manifest.length, 'SVGs →', OUT);
console.log('Category defaults + blank:', Object.keys(categoryDefaults).join(', '));
console.log('Sample slugs:', manifest.slice(0, 8).map(m => m.slug).join(', '));
console.log('beifuss?', fs.existsSync(path.join(OUT, 'beifuss.svg')));
console.log('obsidian?', fs.existsSync(path.join(OUT, 'obsidian.svg')));
console.log('rum?', fs.existsSync(path.join(OUT, 'rum.svg')));
