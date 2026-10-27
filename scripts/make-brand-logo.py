"""
make-brand-logo.py — rebuild the FinanceQuizPulse brand raster from the supplied
logo art so every surface (header, footer, splash, favicon, OG card) shares one
source of truth.

The delivered logo (financequizpulse.com.svg) is a rounded navy gradient tile
with a transparent glossy mark laid on top. Browsers don't rasterise SVG for us
here, so we re-composite the two layers with Pillow and emit PNGs:

    public/images/brand/logo-512.png   header / footer / splash / OG script
    public/images/brand/logo-128.png   small-size brand touchpoints
    public/favicon.svg                 64px mark wrapped for the browser tab

The glossy mark is pulled straight out of the delivered SVG kept in
scripts/brand-src/, so that file is the single source of truth. Drop a newer
logo there and re-run:

    python scripts/make-brand-logo.py
"""
import base64
import os
import re
from io import BytesIO
from PIL import Image, ImageDraw

root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
logo_svg = os.path.join(root, 'scripts', 'brand-src', 'smartfinancequiz.site.svg')
brand_dir = os.path.join(root, 'public', 'images', 'brand')
favicon_path = os.path.join(root, 'public', 'favicon.svg')

SIZE = 512
RADIUS = 80
# Inner mark is inset 12px on every side (488x488) exactly as in the source SVG.
INSET = 12

# Gradient tile: userSpaceOnUse from (459,0) to (0,460), three stops.
P0 = (459.0, 0.0)
P1 = (0.0, 460.0)
STOPS = [(0.0, (17, 42, 72)), (0.4375, (11, 23, 47)), (1.0, (21, 30, 67))]


def grad_color(t):
    for i in range(1, len(STOPS)):
        if t <= STOPS[i][0]:
            t0, c0 = STOPS[i - 1]
            t1, c1 = STOPS[i]
            f = 0.0 if t1 == t0 else (t - t0) / (t1 - t0)
            return tuple(round(c0[k] + (c1[k] - c0[k]) * f) for k in range(3))
    return STOPS[-1][1]


def build_tile():
    vx = P1[0] - P0[0]
    vy = P1[1] - P0[1]
    vlen2 = vx * vx + vy * vy
    img = Image.new('RGBA', (SIZE, SIZE))
    px = img.load()
    for y in range(SIZE):
        for x in range(SIZE):
            t = ((x - P0[0]) * vx + (y - P0[1]) * vy) / vlen2
            t = 0.0 if t < 0 else (1.0 if t > 1 else t)
            r, g, b = grad_color(t)
            px[x, y] = (r, g, b, 255)
    # Round the corners.
    mask = Image.new('L', (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=RADIUS, fill=255)
    img.putalpha(mask)
    return img


def load_mark():
    """Extract the embedded base64 PNG artwork from the delivered logo SVG."""
    with open(logo_svg, encoding='utf-8') as fh:
        svg = fh.read()
    m = re.search(r'base64,([A-Za-z0-9+/=]+)', svg)
    if not m:
        raise SystemExit(f'no embedded base64 image found in {logo_svg}')
    return Image.open(BytesIO(base64.b64decode(m.group(1)))).convert('RGBA')


def compose():
    tile = build_tile()
    mark = load_mark()
    inner = SIZE - 2 * INSET
    mark = mark.resize((inner, inner), Image.LANCZOS)
    tile.alpha_composite(mark, (INSET, INSET))
    return tile


def main():
    if not os.path.exists(logo_svg):
        raise SystemExit(f'logo source not found at {logo_svg}')
    os.makedirs(brand_dir, exist_ok=True)
    logo = compose()

    logo.save(os.path.join(brand_dir, 'logo-512.png'), optimize=True)
    logo.resize((128, 128), Image.LANCZOS).save(os.path.join(brand_dir, 'logo-128.png'), optimize=True)

    fav = logo.resize((64, 64), Image.LANCZOS)
    fav_buf = os.path.join(brand_dir, '_fav_tmp.png')
    fav.save(fav_buf, optimize=True)
    with open(fav_buf, 'rb') as fh:
        b64 = base64.b64encode(fh.read()).decode('ascii')
    os.remove(fav_buf)
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" '
        'aria-label="FinanceQuizPulse">'
        f'<image width="512" height="512" href="data:image/png;base64,{b64}"/></svg>'
    )
    with open(favicon_path, 'w', encoding='utf-8') as fh:
        fh.write(svg)

    print('wrote logo-512.png, logo-128.png, favicon.svg')


if __name__ == '__main__':
    main()
