#!/usr/bin/env python3
"""Generate warmer, cuter kids-app path figures (neon-glow humor, not scary)."""
from PIL import Image, ImageDraw, ImageFilter
import math
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'path-figures')
SIZE = 512
CX, CY = 256, 270

def soft_glow(img, color, radius=28, strength=0.55):
    """Add soft outer glow from alpha silhouette."""
    alpha = img.split()[-1]
    glow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    mask = alpha.point(lambda a: 255 if a > 20 else 0)
    colored = Image.new('RGBA', img.size, color + (0,))
    colored.putalpha(mask)
    for r in (radius, max(8, radius // 2), max(4, radius // 4)):
        blur = colored.filter(ImageFilter.GaussianBlur(r))
        # scale alpha
        ba = blur.split()[-1].point(lambda a: int(a * strength))
        layer = Image.merge('RGBA', (*blur.split()[:3], ba))
        glow = Image.alpha_composite(glow, layer)
    return Image.alpha_composite(glow, img)

def face(draw, x, y, r=52, skin=(255, 214, 190), blush=(255, 160, 170), brow=(60, 45, 55)):
    # head
    draw.ellipse([x - r, y - r, x + r, y + r], fill=skin, outline=(45, 35, 50), width=4)
    # eyes big cute
    for ex in (-18, 18):
        draw.ellipse([x + ex - 14, y - 10, x + ex + 14, y + 16], fill=(255, 255, 255), outline=(40, 30, 45), width=3)
        draw.ellipse([x + ex - 5, y - 1, x + ex + 5, y + 9], fill=(35, 28, 40))
        draw.ellipse([x + ex - 2, y + 1, x + ex + 1, y + 4], fill=(255, 255, 255))
    # blush
    for bx in (-28, 28):
        draw.ellipse([x + bx - 10, y + 16, x + bx + 10, y + 28], fill=blush + (180,))
    # smile
    draw.arc([x - 16, y + 10, x + 16, y + 30], 15, 165, fill=(55, 40, 50), width=3)
    # brows soft
    draw.arc([x - 30, y - 28, x - 8, y - 10], 200, 340, fill=brow, width=3)
    draw.arc([x + 8, y - 28, x + 30, y - 10], 200, 340, fill=brow, width=3)

def limb(draw, box, fill, outline=(45, 35, 50), w=4):
    draw.rounded_rectangle(box, radius=18, fill=fill, outline=outline, width=w)

def base_canvas():
    return Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))

def make_esoterik():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 214, 198); body = (168, 140, 230)
    limb(d, [CX - 70, CY + 10, CX + 70, CY + 130], body)
    limb(d, [CX - 100, CY + 35, CX - 55, CY + 70], skin)  # arms
    limb(d, [CX + 55, CY + 35, CX + 100, CY + 70], skin)
    limb(d, [CX - 48, CY + 120, CX - 12, CY + 175], skin)
    limb(d, [CX + 12, CY + 120, CX + 48, CY + 175], skin)
    face(d, CX, CY - 20, 58, skin)
    # star hat
    star = [(CX, CY - 105), (CX + 12, CY - 78), (CX + 40, CY - 78), (CX + 18, CY - 60),
            (CX + 26, CY - 34), (CX, CY - 48), (CX - 26, CY - 34), (CX - 18, CY - 60),
            (CX - 40, CY - 78), (CX - 12, CY - 78)]
    d.polygon(star, fill=(255, 214, 110), outline=(45, 35, 50))
    # sparkles
    for sx, sy in [(CX - 90, CY - 40), (CX + 95, CY - 20), (CX + 80, CY + 90)]:
        d.ellipse([sx - 4, sy - 4, sx + 4, sy + 4], fill=(255, 220, 140, 200))
    return soft_glow(im, (190, 150, 255), 32, 0.5)

def make_wicca():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 220, 200); robe = (110, 150, 230); hat = (100, 140, 220)
    # robe
    d.polygon([(CX - 70, CY + 150), (CX - 55, CY + 20), (CX + 55, CY + 20), (CX + 70, CY + 150)],
              fill=robe, outline=(40, 35, 55))
    d.line([(CX - 55, CY + 20), (CX + 55, CY + 20)], fill=(40, 35, 55), width=4)
    # stars on robe
    for sx, sy in [(CX - 25, CY + 60), (CX + 20, CY + 90), (CX, CY + 120)]:
        d.ellipse([sx - 5, sy - 5, sx + 5, sy + 5], fill=(255, 230, 120))
    # hat triangle
    d.polygon([(CX - 55, CY - 35), (CX + 55, CY - 35), (CX, CY - 150)], fill=hat, outline=(40, 35, 55))
    d.ellipse([CX - 58, CY - 48, CX + 58, CY - 22], fill=hat, outline=(40, 35, 55), width=3)
    for sx, sy in [(CX - 15, CY - 90), (CX + 10, CY - 110), (CX + 5, CY - 70)]:
        d.ellipse([sx - 4, sy - 4, sx + 4, sy + 4], fill=(255, 230, 120))
    # hands + wand
    limb(d, [CX - 85, CY + 40, CX - 50, CY + 72], skin)
    limb(d, [CX + 50, CY + 40, CX + 85, CY + 72], skin)
    d.line([(CX + 70, CY + 45), (CX + 115, CY - 10)], fill=(160, 110, 70), width=5)
    d.ellipse([CX + 110, CY - 18, CX + 124, CY - 4], fill=(255, 230, 120))
    # tiny book
    d.rounded_rectangle([CX - 95, CY + 48, CX - 70, CY + 78], 4, fill=(50, 45, 70), outline=(40, 35, 55), width=2)
    # beard
    d.ellipse([CX - 28, CY + 5, CX + 28, CY + 42], fill=(245, 245, 250), outline=(40, 35, 55), width=3)
    face(d, CX, CY - 25, 48, skin, blush=(255, 170, 180))
    return soft_glow(im, (170, 140, 255), 30, 0.48)

def make_hermetik():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 216, 198); robe = (150, 110, 210)
    d.polygon([(CX - 75, CY + 155), (CX - 60, CY + 25), (CX + 60, CY + 25), (CX + 75, CY + 155)],
              fill=robe, outline=(45, 35, 55))
    # golden triangle
    d.polygon([(CX, CY + 45), (CX - 28, CY + 100), (CX + 28, CY + 100)], outline=(255, 210, 90), width=4)
    limb(d, [CX - 95, CY + 45, CX - 55, CY + 78], skin)
    limb(d, [CX + 55, CY + 45, CX + 95, CY + 78], skin)
    # tablet
    d.rounded_rectangle([CX + 62, CY + 40, CX + 98, CY + 95], 6, fill=(140, 210, 230), outline=(40, 35, 55), width=3)
    d.ellipse([CX + 72, CY + 55, CX + 88, CY + 72], fill=(255, 160, 190))
    face(d, CX, CY - 15, 54, skin, blush=(230, 150, 200), brow=(120, 80, 160))
    return soft_glow(im, (200, 140, 255), 30, 0.5)

def make_nordisch():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 218, 190); armor = (90, 110, 140); cape = (255, 170, 120)
    # cape
    d.polygon([(CX - 20, CY + 10), (CX - 95, CY + 150), (CX + 30, CY + 40)], fill=cape, outline=(45, 35, 50))
    limb(d, [CX - 55, CY + 30, CX + 55, CY + 130], armor)
    limb(d, [CX - 42, CY + 120, CX - 10, CY + 175], skin)
    limb(d, [CX + 10, CY + 120, CX + 42, CY + 175], skin)
    limb(d, [CX - 95, CY + 50, CX - 55, CY + 82], skin)
    limb(d, [CX + 55, CY + 50, CX + 95, CY + 82], skin)
    # hammer
    d.rounded_rectangle([CX - 115, CY + 35, CX - 80, CY + 70], 4, fill=(170, 175, 185), outline=(40, 35, 50), width=3)
    d.rectangle([CX - 100, CY + 68, CX - 92, CY + 105], fill=(140, 110, 80), outline=(40, 35, 50), width=2)
    # shield
    d.ellipse([CX + 70, CY + 45, CX + 110, CY + 85], fill=(255, 190, 80), outline=(40, 35, 50), width=3)
    d.ellipse([CX + 82, CY + 57, CX + 98, CY + 73], fill=(255, 220, 140))
    face(d, CX, CY - 10, 50, skin, blush=(255, 150, 140))
    # helmet
    d.rounded_rectangle([CX - 48, CY - 55, CX + 48, CY - 5], 10, fill=(150, 160, 175), outline=(40, 35, 50), width=3)
    # horns
    d.polygon([(CX - 48, CY - 35), (CX - 78, CY - 95), (CX - 35, CY - 45)], fill=(255, 230, 200), outline=(40, 35, 50))
    d.polygon([(CX + 48, CY - 35), (CX + 78, CY - 95), (CX + 35, CY - 45)], fill=(255, 230, 200), outline=(40, 35, 50))
    # big friendly nose/snout hint
    d.ellipse([CX - 18, CY + 2, CX + 18, CY + 28], fill=(255, 190, 150), outline=(40, 35, 50), width=2)
    d.arc([CX - 10, CY + 10, CX + 10, CY + 24], 20, 160, fill=(55, 40, 50), width=2)
    return soft_glow(im, (255, 160, 90), 32, 0.5)

def make_voodoo():
    """Cute plush doll — stitches are playful, heart warm, no scary pins."""
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    pink = (255, 130, 175); skin = pink
    limb(d, [CX - 55, CY + 15, CX + 55, CY + 125], pink)
    limb(d, [CX - 90, CY + 40, CX - 50, CY + 72], pink)
    limb(d, [CX + 50, CY + 40, CX + 90, CY + 72], pink)
    limb(d, [CX - 42, CY + 115, CX - 8, CY + 170], pink)
    limb(d, [CX + 8, CY + 115, CX + 42, CY + 170], pink)
    # heart
    d.ellipse([CX - 22, CY + 45, CX - 2, CY + 65], fill=(255, 90, 130))
    d.ellipse([CX + 2, CY + 45, CX + 22, CY + 65], fill=(255, 90, 130))
    d.polygon([(CX - 22, CY + 58), (CX + 22, CY + 58), (CX, CY + 82)], fill=(255, 90, 130))
    # soft X stitches (toy-like)
    for px, py in [(CX - 48, CY + 35), (CX + 48, CY + 35), (CX - 25, CY + 130), (CX + 25, CY + 130)]:
        d.line([(px - 6, py - 6), (px + 6, py + 6)], fill=(200, 70, 120), width=3)
        d.line([(px - 6, py + 6), (px + 6, py - 6)], fill=(200, 70, 120), width=3)
    face(d, CX, CY - 25, 56, (255, 170, 195), blush=(255, 110, 150), brow=(80, 40, 60))
    # playful hair tuft
    d.ellipse([CX - 50, CY - 85, CX + 50, CY - 35], fill=(55, 40, 60), outline=(35, 25, 45), width=3)
    d.ellipse([CX - 8, CY - 115, CX + 8, CY - 75], fill=(55, 40, 60))
    d.ellipse([CX - 10, CY - 122, CX + 10, CY - 102], fill=(255, 140, 190))
    return soft_glow(im, (255, 110, 190), 34, 0.52)

def make_santeria():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 214, 185); white = (250, 248, 245)
    limb(d, [CX - 60, CY + 20, CX + 60, CY + 135], white)
    # peach shoulders
    d.rounded_rectangle([CX - 60, CY + 20, CX + 60, CY + 50], 12, fill=skin, outline=(45, 35, 50), width=3)
    limb(d, [CX - 95, CY + 45, CX - 55, CY + 78], skin)
    limb(d, [CX + 55, CY + 45, CX + 95, CY + 78], skin)
    limb(d, [CX - 40, CY + 125, CX - 8, CY + 175], skin)
    limb(d, [CX + 8, CY + 125, CX + 40, CY + 175], skin)
    face(d, CX, CY - 15, 52, skin)
    # candle on head — friendly flame
    d.rounded_rectangle([CX - 12, CY - 95, CX + 12, CY - 55], 6, fill=(255, 255, 250), outline=(45, 35, 50), width=3)
    d.ellipse([CX - 14, CY - 125, CX + 14, CY - 90], fill=(255, 200, 80, 120))
    d.ellipse([CX - 8, CY - 118, CX + 8, CY - 95], fill=(255, 170, 60))
    d.ellipse([CX - 4, CY - 112, CX + 4, CY - 100], fill=(255, 240, 180))
    return soft_glow(im, (255, 170, 90), 32, 0.5)

def make_schamanismus():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 214, 185); tunic = (180, 140, 100)
    limb(d, [CX - 58, CY + 20, CX + 58, CY + 130], tunic)
    limb(d, [CX - 95, CY + 45, CX - 55, CY + 78], skin)
    limb(d, [CX + 55, CY + 45, CX + 95, CY + 78], skin)
    limb(d, [CX - 40, CY + 120, CX - 8, CY + 175], skin)
    limb(d, [CX + 8, CY + 120, CX + 40, CY + 175], skin)
    # drum / rattle (friendly, not pin)
    d.ellipse([CX + 70, CY + 40, CX + 110, CY + 80], fill=(120, 190, 170), outline=(40, 35, 50), width=3)
    d.line([(CX + 90, CY + 80), (CX + 90, CY + 115)], fill=(140, 100, 70), width=4)
    # feather
    d.polygon([(CX - 20, CY - 95), (CX - 5, CY - 55), (CX - 35, CY - 55)], fill=(255, 160, 90), outline=(40, 35, 50))
    d.line([(CX - 20, CY - 95), (CX - 20, CY - 50)], fill=(140, 100, 70), width=3)
    face(d, CX, CY - 15, 54, skin, blush=(255, 160, 130))
    return soft_glow(im, (255, 150, 80), 32, 0.5)

def make_chaosmagie():
    im = base_canvas(); d = ImageDraw.Draw(im, 'RGBA')
    skin = (255, 170, 200); robe = (70, 55, 95)
    # soft robe (not pure black)
    d.polygon([(CX - 70, CY + 155), (CX - 50, CY + 25), (CX + 50, CY + 25), (CX + 70, CY + 155)],
              fill=robe, outline=(40, 30, 50))
    limb(d, [CX - 90, CY + 50, CX - 55, CY + 82], skin)
    limb(d, [CX + 55, CY + 50, CX + 90, CY + 82], skin)
    limb(d, [CX - 40, CY + 145, CX - 8, CY + 185], skin)
    limb(d, [CX + 8, CY + 145, CX + 40, CY + 185], skin)
    # leaf cuffs
    for lx in (CX - 78, CX + 62):
        d.ellipse([lx, CY + 70, lx + 16, CY + 86], fill=(140, 210, 140))
    face(d, CX, CY - 10, 52, skin, blush=(255, 120, 160), brow=(120, 180, 220))
    # playful hood with soft orbs (chaos stars as candy lights)
    d.polygon([(CX - 55, CY - 40), (CX + 55, CY - 40), (CX + 70, CY + 10), (CX - 70, CY + 10)],
              fill=(55, 45, 75), outline=(35, 28, 50))
    for i, (ox, oy) in enumerate([(CX, CY - 95), (CX - 45, CY - 70), (CX + 45, CY - 70), (CX - 60, CY - 20), (CX + 60, CY - 20)]):
        d.ellipse([ox - 10, oy - 10, ox + 10, oy + 10], fill=(255, 120, 200))
        d.ellipse([ox - 5, oy - 5, ox + 5, oy + 5], fill=(255, 210, 240))
    return soft_glow(im, (255, 100, 200), 34, 0.52)

FIGURES = {
    'esoterik': make_esoterik,
    'wicca': make_wicca,
    'hermetik': make_hermetik,
    'nordisch': make_nordisch,
    'voodoo': make_voodoo,
    'santeria': make_santeria,
    'schamanismus': make_schamanismus,
    'chaosmagie': make_chaosmagie,
}

def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in FIGURES.items():
        im = fn()
        path = os.path.join(OUT, name + '.png')
        im.save(path, 'PNG', optimize=True)
        print('wrote', path, im.size)
    # also write matching simple SVG placeholders (fallback)
    for name in FIGURES:
        svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="g" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#fff6"/>
      <stop offset="100%" stop-color="#0000"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <circle cx="64" cy="64" r="50" fill="url(#g)"/>
  <g filter="url(#glow)">
    <circle cx="64" cy="48" r="22" fill="#ffd7be" stroke="#2d2433" stroke-width="3"/>
    <circle cx="56" cy="46" r="4" fill="#2d2433"/>
    <circle cx="72" cy="46" r="4" fill="#2d2433"/>
    <path d="M56 56 Q64 62 72 56" fill="none" stroke="#2d2433" stroke-width="2" stroke-linecap="round"/>
    <rect x="42" y="70" width="44" height="36" rx="14" fill="#b39adf" stroke="#2d2433" stroke-width="3"/>
  </g>
  <text x="64" y="122" text-anchor="middle" font-size="9" fill="#c8b8ff" font-family="sans-serif">{name}</text>
</svg>'''
        with open(os.path.join(OUT, name + '.svg'), 'w') as f:
            f.write(svg)
        print('wrote svg', name)

if __name__ == '__main__':
    main()
