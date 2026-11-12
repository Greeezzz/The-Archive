# DESIGN.md — v2 (Light industrial console + poster mode)

> **v2 supersedes v1.** The reference screenshots show a **light** base (white / pale gray) with **black + hazard yellow**, dashed hairlines, halftone/checker/topographic textures, square corner handles, giant ghost numerals, and a dark vertical side rail. A second reference shows a loud **poster** treatment: heavy bracket labels, yellow/black blocks, neon yellow→lime swooshes, tiny RGB glitch slivers. The v1 dark palette (`#0a0b0d` etc.) is retired. Line/motion details live in `LINES.md`.

Concept: **an exhibition terminal.** Calm light pages with precise dashed linework (console mode) that can burst into loud yellow/black poster frames (poster mode) at key moments.

## 0. Two modes

| Mode | Used on | Feel |
|---|---|---|
| **Console** (light) | Archive, About, Projects, NotFound, modals/stage | Quiet, dense, hairline dashed grid, tiny mono labels, art is the hero |
| **Poster** (loud) | Home hero, section openers, page transitions, 404 | Yellow/black slabs, `[ BRACKET ]` titles, huge type, gradient swooshes, glitch slivers |

Don't mix at full intensity on one screen: console pages may borrow one poster element (e.g. one bracket title or one yellow slab).

## 1. Tokens (`src/styles/tokens.css`)

```css
:root {
  /* paper */
  --paper:   #ffffff;
  --paper-2: #f3f3f2;   /* panels, checker light */
  --paper-3: #e7e7e5;   /* ghost numerals, hatch, checker dark */

  /* ink */
  --ink:     #111111;
  --ink-2:   #3a3a3c;
  --ink-dim: #6f6f73;   /* verify >= 4.5:1 on --paper before using for text */
  --ink-mute:#a4a4a8;   /* decoration only, never essential text */

  /* lines */
  --hair:    #cfcfd2;   /* dashed rules */
  --hair-hi: #9a9aa0;   /* handles, active rules */

  /* dark rail (right sidebar, buttons) */
  --rail:    #333437;

  /* signal */
  --signal:    #ffe500; /* hazard yellow */
  --signal-ink:#111111; /* text on yellow, always */
  --lime:      #b6ff2e; /* end stop of swoosh gradients only */

  /* glitch slivers (1–4px blocks, max 3 per screen) */
  --glitch-m: #ff2bd6;
  --glitch-c: #00e5ff;
  --glitch-g: #7dff3a;

  --alert: #ff3b2f;     /* 404 / errors only */

  /* per-entry color, set inline from characters.json */
  --entry: #111111;

  --font-display: 'Archivo', 'Arial Narrow', sans-serif; /* variable: width + weight */
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --cut: 14px;  --cut-sm: 8px;
  --gap: 8px;
  --frame: clamp(16px, 3vw, 40px);
  --ease-out: cubic-bezier(.16,1,.3,1);
  --ease-io:  cubic-bezier(.76,0,.24,1);
}
```

Color rules (important, learned from `characters.json`):
- **`--entry` colors include `#FFFFFF`, `#FFEE6B`, `#B6B6B6`: they vanish on a white page.** Never use `--entry` as a text color or hairline on `--paper`. Use it only as a **fill behind/under art**, a small chip with `--ink` text, or an edge strip on top of art. Lines/handles stay `--ink`/`--hair-hi`.
- **Yellow is a fill, never text on white** (fails contrast). Text on yellow is always `--ink`.
- Console mode: yellow <= ~10% of the screen. Poster mode: yellow may dominate.
- Glitch colors only as tiny slivers on edges/art, never as fills or text.

## 2. Typography

Google Fonts: `Archivo` (variable `wdth` 62–125, `wght` 100–900), `Inter`, `JetBrains Mono`. Remove Chakra Petch if v1 added it. (Font choice is my pick for a similar bold geometric feel; swap if Chelo prefers.)

| Role | Spec |
|---|---|
| Poster titles | Archivo 800–900, uppercase, tight leading (0.9–1.0), can go very wide or condensed via `font-stretch`; `clamp()` up to ~12vw |
| Page / section titles | Archivo 800, uppercase |
| Labels | JetBrains Mono 10–11px, uppercase, `letter-spacing: .14em`, `--ink-dim` |
| Field pattern | `//Label` in small mono dim, value below in bold body/display (e.g. `//Entry` → `Chisato Nishikigi`). Use your own field names |
| Body | Inter 15–16px, line-height 1.6, `--ink-2` |
| Ghost numerals | Archivo 900, 200–320px, `--paper-3` fading to transparent downward (mask gradient), decorative, `aria-hidden` |
| Counters | Mono tabular-nums: `01 / 23` |

## 3. Textures (all pure CSS/SVG, all low contrast)

- **Halftone dots**: `radial-gradient(circle, var(--hair) 1px, transparent 1.3px) 0 0 / 8px 8px`, opacity .5, on page background.
- **Checker**: two-tone pale squares (`--paper-2` / `--paper-3`), large (48–96px), only in side zones, fading out with a mask.
- **Hatch**: `repeating-linear-gradient(135deg, var(--paper-3) 0 6px, transparent 6px 12px)` for ghost letters/blocks (clip to text via `background-clip:text` or SVG pattern).
- **Topographic contours**: faint SVG contour lines (3–6 paths) in the header and poster corners; drawn by us, not traced from any game asset.

## 4. Console page skeleton

```
┌──────────────────────────────────────────────────────────────┐
│ logo │ TAB 01 ┆ TAB 02 ┆ TAB 03 ┆ TAB 04                   │ ← header, dashed vertical dividers
├──────┬──────────────────────────────────────────┬──────────┤
│ meta │  ▪ STAGE (framed art, corner handles) ▪  │ dark rail │
│ col  │                                          │ crosshairs│
│ ghost│                                          │ rotated   │
│ 01   │                                          │ text      │
├──────┴──────────────────────────────────────────┴──────────┤
│ credit · tiny chips                      pager  ‹ 01 / 23 › │ ← bottom bar
└──────────────────────────────────────────────────────────────┘
```
- Header tabs: each has a thin vertical bar at its left (gray; yellow when active), bold title, small subtitle; active subtitle gets a yellow highlight.
- Stage: art inside a dashed frame with **4 square corner handles** (10px, `--hair-hi`; turn `--signal` on hover/focus).
- Left meta column: yellow square icon tile, small progress bar `01/23`, `//Field` pairs, ghost numeral at the bottom, two square black buttons with yellow icons (share, fullscreen).
- Right rail (`--rail`, ~64px): crosshair circle icons, vertical rotated text (site section name), yellow square button at bottom, tiny 4-color bar on top (glitch colors).
- Bottom bar: © line, tiny chips, pager `‹ 01 / 23 ›` with a black center cell and gray arrow cells.
- < 900px: rail collapses into the bottom bar; meta column stacks above the stage; ghost numerals hidden; handles stay.

## 5. Poster mode vocabulary

- **Bracket title**: heavy black L-brackets (6px, ~40px arms) around a display title: `[ THE ARCHIVE ]`.
- **Tag line**: `ENTRY [07.] ↘` small mono + boxed arrow glyph.
- **Black label bar**: white text on `--ink`, thin yellow outline offset by 4px.
- **Swooshes**: thick rounded arrow/curve shapes in SVG with `--signal` → `--lime` gradient (the only allowed gradient besides scrims).
- **Repeated micro text**: rows of tiny mono text (`THE ARCHIVE · GALLERY · THE ARCHIVE …`) as texture bands.
- **Glitch slivers**: 2–4px magenta/cyan/green blocks at edges of slabs/art.
- **Ghost hatched letters** huge at the bottom edge of the viewport.
- **Stripe/checker slabs** in yellow/black.

## 6. Component mapping (current repo → v2)

| Current | v2 treatment |
|---|---|
| `Navbar` | Becomes the console header: logo left, 4 tabs (Home / Archive / About / Projects) with dashed dividers, active = yellow highlight. Mobile: full-screen yellow/black menu panel |
| `Home` | **Poster mode** hero: bracket title, huge `A curated Archive` type, yellow/black slab, swoosh, art cutout area, micro-text bands, 3 CTAs as square black buttons with yellow arrows. Entry count readout from `characters.json` |
| `Archive` | Index grid (cards) + **Stage viewer** (see below). Search = mono input with `//Search` label, dashed underline |
| `CharacterCard` | Paper-2 panel, dashed border, 4 handles; art; bottom bar `ENTRY 07` + name; hover = handles turn yellow + glitch scan sweep |
| `CharacterModal` | **Replace with the Stage viewer** (console skeleton §4, prev/next pager, keyboard ←/→/Esc). Keep portal/focus trap/scroll lock. This is the closest match to reference #1. Decision for Chelo: confirm the modal becomes a full-screen viewer |
| `BannerCard/Modal` | Same family, wide aspect |
| `About` | Console skeleton: bio as text slab, socials as rows with arrow tiles, photo in dashed frame + handles, stats as 2×2 mono readout |
| `Projects` | Panels with `sysRef` chip, `env` tag (`PROD_CLOUD` yellow fill + ink text, `LOCAL_DEV` hatch), tech chips mono |
| `NotFound` | Poster mode, `--alert` accent, big `404` ghost |
| `Cursor` | Small square crosshair; locks to element bounds; ink on light, fine pointers only |
| Scroll progress | 2px `--ink` bar with a `--signal` head |
| Globals | Remove v1 dark tokens, neon, blur orbs. Page background = `--paper` + halftone |

## 7. Imagery

Art is never filtered/recolored. Allowed: dark bottom scrim for text on art, `--entry` fill behind transparent art, thin glitch scan line sweep, corner handles. Keep `loading="lazy"`, fallback block, explicit `aspect-ratio`.

## 8. Accessibility

- Contrast >= 4.5:1 for all essential text; ink on paper/yellow passes; verify `--ink-dim`.
- `:focus-visible`: 2px solid `--ink` + 2px `--signal` outer ring (works on light and yellow), offset 3px.
- Stage viewer: `role="dialog"` or route-based page with logical order; ←/→ keys; pager buttons labelled.
- Decoration (`ghost`, textures, rail icons, micro-text) is `aria-hidden`.
- Motion rules in `LINES.md` / `MOTION.md`; reduced motion honored.

## 9. Originality & IP

The reference game's look is *inspiration only*. Don't use its logo, wordmark, name, Chinese titles/copy, icons, illustrations, or UI screenshots. Don't reproduce its layout pixel-for-pixel: keep the vocabulary (light paper, dashed grid, handles, rail, brackets) but use your own labels, shapes, proportions, and glyphs. Site identity remains "The Archive by Chelo".

## 10. Don'ts

Dark base, neon glow, rounded corners, soft shadows, blur orbs, yellow text on white, `--entry` color as text/line on paper, gradient text, stock icon packs, more than 3 glitch slivers per screen, copying game assets.
