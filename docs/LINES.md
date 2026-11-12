# LINES.md — Line & motion-graphic system

The "alive" feeling comes from **lines that build the interface in front of the viewer**: dividers draw on, frames snap into place, handles pop, a scan line sweeps the art, giant ghost type slides in. This file is the spec. It complements `MOTION.md` (global tokens, perf budget, reduced motion) and `DESIGN.md` v2 (colors/layout).

> Caveat: this is derived from **static reference screenshots**, not recorded motion. Timings below are sensible defaults; if Chelo supplies a screen recording, tune the numbers in §4 to match.

## 1. Primitives

| ID | Primitive | How |
|---|---|---|
| L1 | **Dashed hairline** (static) | `border: 1px dashed var(--hair)` or `repeating-linear-gradient(90deg, var(--hair) 0 4px, transparent 4px 8px)` for crisp 1px lines |
| L2 | **Dashed reveal** | Reveal a dashed line with `clip-path: inset(0 100% 0 0)` → `inset(0)` (horizontal) or `inset(0 0 100% 0)` → `inset(0)` (vertical). Don't use `pathLength` on a dashed stroke: it overrides `stroke-dasharray` |
| L3 | **Solid draw-on** | SVG path + `pathLength` 0→1 (`motion`). `vector-effect: non-scaling-stroke` so 1px stays 1px |
| L4 | **Marching dashes** | `stroke-dasharray: 6 6; animation: march 1s linear infinite` with `@keyframes march { to { stroke-dashoffset: -12 } }`. Max 3 on screen, small paths only |
| L5 | **Corner handles** | 4 squares 10px at frame corners, `scale(0→1)` staggered, turn `--signal` on hover/focus |
| L6 | **Topographic contours** | 3–6 hand-made SVG paths, 1px, `--hair`, opacity .5–.8; draw on slowly (1.4s) + tiny scroll parallax (<= 20px) |
| L7 | **Scan / glitch line** | 1px horizontal line crossing the art once; a magenta and a cyan copy offset by 1–2px; sweeps with `transform: translateY` |
| L8 | **Ghost type** | Huge numerals/letters in `--paper-3`, mask-fade downward; slides in 40px + fades; optional hatch fill |
| L9 | **Crosshair** | Circle + cross glyph; rotates 90° on route change; used in the right rail |
| L10 | **Scroll-linked line** | One long vertical line down the page whose `pathLength` follows `scrollYProgress` |
| L11 | **Swoosh** (poster) | Thick SVG curve/arrow, `--signal`→`--lime` gradient, draws on via mask/`clip-path` then settles |
| L12 | **Bracket build** | Poster brackets: each of 4 L-corners grows from the corner (scale from `transform-origin` at the corner) before the title decodes in |

## 2. Reference code

### Solid draw-on (L3)

```jsx
// src/components/lines/DrawLine.jsx
import { motion, useReducedMotion } from 'motion/react';

export default function DrawLine({ d, viewBox = '0 0 100 1', delay = 0, dur = 0.8, className }) {
  const reduce = useReducedMotion();
  return (
    <svg className={className} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: dur, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}
```

### Dashed reveal (L1 + L2)

```jsx
// src/components/lines/DashRule.jsx
import { motion, useReducedMotion } from 'motion/react';

export default function DashRule({ vertical = false, delay = 0 }) {
  const reduce = useReducedMotion();
  const from = vertical ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';
  return (
    <motion.span
      className={`dash-rule ${vertical ? 'dash-rule--v' : ''}`}
      aria-hidden="true"
      initial={reduce ? false : { clipPath: from }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
```
```css
.dash-rule { display:block; height:1px; width:100%;
  background: repeating-linear-gradient(90deg, var(--hair) 0 4px, transparent 4px 8px); }
.dash-rule--v { width:1px; height:100%;
  background: repeating-linear-gradient(180deg, var(--hair) 0 4px, transparent 4px 8px); }
```

### Corner handles + frame (L5)

```css
.frame { position: relative; outline: 1px dashed var(--hair-hi); outline-offset: -1px; }
.frame__h { position:absolute; width:10px; height:10px; background:var(--hair-hi);
  transform: scale(0); transition: transform .3s var(--ease-out), background .2s; }
.frame__h--tl{top:-5px;left:-5px} .frame__h--tr{top:-5px;right:-5px}
.frame__h--bl{bottom:-5px;left:-5px} .frame__h--br{bottom:-5px;right:-5px}
.frame.is-in .frame__h { transform: scale(1); }
.frame.is-in .frame__h--tr { transition-delay: .06s }
.frame.is-in .frame__h--br { transition-delay: .12s }
.frame.is-in .frame__h--bl { transition-delay: .18s }
.frame:hover .frame__h, .frame:focus-within .frame__h { background: var(--signal); }
```

### Scan / glitch line (L7)

```css
.scan { position:absolute; left:0; right:0; top:0; height:1px; pointer-events:none;
  background: rgba(255,255,255,.7); mix-blend-mode: screen; opacity:0; }
.scan::before, .scan::after { content:''; position:absolute; left:0; right:0; height:1px; }
.scan::before { top:-1px; background: var(--glitch-m); }
.scan::after  { top: 1px; background: var(--glitch-c); }
.is-in .scan { animation: scan 1.1s var(--ease-io) .5s 1 both; }
@keyframes scan { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(var(--stage-h,520px));opacity:0} }
```
Set `--stage-h` from the stage's measured height (ResizeObserver) or use `%`-based `top` animation with `transform: translateY(100cqh)` and `container-type: size` on the stage.

### Scroll-linked line (L10)

```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
<svg ref={ref} ...><motion.path d="M1 0V1000" style={{ pathLength: scrollYProgress }} /></svg>
```

## 3. Where each primitive goes

| Place | Uses |
|---|---|
| Header | L2 vertical dashed dividers between tabs (draw top→bottom, stagger .06s), L6 topo contours in the left, active-tab yellow highlight wipe |
| Stage (Archive viewer) | L1 frame + L5 handles, L7 scan line on every entry change, L8 ghost numeral = entry number, pager counter decode |
| Right rail | L9 crosshairs, rotated section label decode, yellow button pulse (single, on load) |
| Index grid cards | L5 handles on hover (no draw-on; too many items), reveal via clip-path stagger |
| Home (poster) | L12 bracket build, L11 swoosh, L8 hatched ghost word at bottom, L10 long line to next section |
| About / Projects | L2 section dividers, L5 on photo/project panels, L6 contours in corners |
| 404 | L7 repeated glitch sweeps (3 total, then still), alert color |

## 4. Build-in timeline (per page/stage, defaults)

| t (ms) | Event |
|---|---|
| 0 | Header dividers draw (L2), stagger 60 |
| 150 | Frame dashed outline reveals; handles pop (L5) |
| 300 | Art wipes in (`clip-path inset(0 0 0 100%)`→`0`, 500ms, `--ease-io`) |
| 450 | Labels decode (`DecodeText`, 300ms); progress bar fills |
| 500 | Scan line sweeps once (L7, 1100ms) |
| 600 | Ghost numeral slides in 40px + fades (L8, 600ms) |
| 700 | Rail items stagger in; crosshairs rotate 90° |

Entry change inside the viewer (←/→): art crossfade + horizontal wipe 350ms, scan line again, numeral count-up, meta fields re-decode. No full rebuild.

## 5. Performance & safety

- Only `transform`, `opacity`, `clip-path`. `stroke-dashoffset` marching (L4) and `pathLength` are allowed on a few small SVG paths only.
- Max 3 simultaneous infinite animations; none full-screen.
- Mask/blend effects (`mix-blend-mode`, `mask-image`) only on small areas; test with 4x CPU throttle.
- Textures (halftone/checker/hatch) are static backgrounds; never animate `background-position` on large areas. If a hatch must scroll, move a larger pseudo-element with `transform`.
- Reduced motion: lines/handles appear instantly, no scan, no marching, ghost type static, crosshair static; page transition = 150ms fade.

## 6. Done criteria

- Header, stage, and rail build themselves in order per §4 and look intentional on first load and on route change.
- No visible jank at 4x CPU throttle on `/archive`.
- All line effects are `aria-hidden` and absent/static with reduced motion.
- 360px width: no overflow; decorative lines simplified.
