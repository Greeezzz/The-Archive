# DESIGN.md — Industrial HUD design system

Concept: **a field terminal that stores operator dossiers.** Every page is a console screen; every character is a file. Calm, dark, precise; the art provides the color, the UI provides structure.

## 1. Tokens

Put all tokens in a new `src/styles/tokens.css`, imported once from `src/index.css`. Remove the old neon tokens (`--accent` pink, `--accent-alt`, `--accent-cyan`, `*-glow`).

```css
:root {
  /* surfaces */
  --bg:        #0a0b0d;
  --panel:     #111316;
  --panel-2:   #171a1e;
  --line:      #2a2e34;   /* 1px default borders */
  --line-hi:   #3d434b;   /* hover / active borders */

  /* text */
  --text:      #e9ecef;
  --text-dim:  #8a9099;
  --text-mute: #555b63;

  /* signal colors (tune by eye, keep the roles) */
  --signal:    #ffe500;   /* primary accent: hazard yellow. CTAs, active, key labels */
  --signal-ink:#0a0b0d;   /* text on top of --signal */
  --data:      #3de0ff;   /* secondary: small data readouts only, never big fills */
  --alert:     #ff4d3d;   /* errors / 404 only */

  /* per-entry color. Set inline from characters.json `color` */
  --entry: #ffffff;

  /* type */
  --font-display: 'Chakra Petch', 'Rajdhani', sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'DM Mono', monospace;

  /* geometry */
  --cut: 14px;            /* chamfer size, large panels */
  --cut-sm: 8px;          /* chamfer size, buttons/tags */
  --gap: 8px;             /* base spacing unit; use multiples */
  --frame: clamp(16px, 3vw, 40px); /* page side padding */
}
```

Rules:
- `--signal` appears on at most ~5% of any screen. It marks what matters (primary CTA, active nav item, focus ring, entry number).
- `--entry` is the only per-item color. It replaces the old per-card `--accent` override (rename to avoid colliding with any global accent). It may tint borders, corner brackets, an underline, and a thin glow strip, not whole backgrounds.
- No gradients between two hues. Gradients are only allowed as dark-to-transparent scrims over art.

## 2. Typography

Load via the existing Google Fonts `@import` in `index.css` (replace the family list): **Chakra Petch** (600/700), **Inter** (400/500/600), **JetBrains Mono** (400/500). Remove **Playfair Display** and **Orbitron**.

| Role | Font | Style |
|---|---|---|
| Hero / page titles | Display | 700, uppercase, `letter-spacing: 0.02em`, tight line-height (0.95–1.0), `clamp()` sizes |
| Section labels, nav, buttons, tags | Mono | 11–12px, uppercase, `letter-spacing: 0.14em` |
| Body copy | Body | 15–16px, line-height 1.6, `--text-dim` |
| Numbers / codes | Mono, tabular-nums | e.g. `ENTRY-007`, `SEC-03`, `0023` |

Hierarchy trick to reuse: giant display word + tiny mono caption next to it (`ARCHIVE` / `// 23 ENTRIES`).

## 3. Geometry & linework

- **No `border-radius`** (0). **No soft shadows, no neon glow.**
- Panels use chamfered corners via `clip-path`, 1px borders drawn with an inner pseudo-element or an SVG/gradient (clip-path cuts borders, so draw the border as a second clipped layer):

```css
.panel {
  position: relative;
  background: var(--panel);
  clip-path: polygon(
    var(--cut) 0, 100% 0,
    100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%,
    0 100%, 0 var(--cut)
  );
}
.panel::before { /* the 1px border, one pixel inset layer */
  content: ''; position: absolute; inset: 0;
  background: var(--line);
  clip-path: inherit; z-index: -1;
}
.panel > .panel__inner { margin: 1px; background: var(--panel); clip-path: inherit; }
```

- Corner brackets (already exist as `.card__bracket`, `.modal__bracket`, `.about__bracket`) stay, but become 12–16px L-shaped, 1px, `--line-hi`, turning `--signal`/`--entry` on hover.
- Dividers: 1px lines with a small notch or tick marks every 8px (use a repeating-linear-gradient). Section labels sit on a line: `SEC-02 ─────── CHARACTER ENTRIES`.
- Page frame: thin 1px frame inset `--frame` from viewport edges on desktop, with a top status bar (`THE ARCHIVE // SYS.ONLINE // 2026`) and optional side coordinates. Hidden/simplified under 768px.

## 4. Decorative vocabulary (use sparingly)

Barcodes, hazard stripes (45° yellow/black, only on 1–2 small elements per page), crosshair `+` marks, tick rulers, coded labels (`ID-007`, `REF: GACHA_001`), progress ticks, "signal bars". Total decoration <= ~10% of visual weight. Never put decorative text in the way of real content, and hide it < 768px if it risks overflow.

Original-details rule: invent your own labels and glyphs (Archive-specific codes such as `OPERATOR FILE`, `ENTRY-007`, `SECTOR: ARCHIVE`). Do not reproduce any game's exact icons, logos, or layouts.

## 5. Component mapping (current → new)

| Current file | New treatment |
|---|---|
| `Navbar.jsx/.css` | Slim top bar, mono uppercase links with `[ ]`-style bracket on active, signal underline wipe on hover, mobile menu = full-height panel sliding in with staggered links. Logo `[THE ARCHIVE]` stays as text |
| `Home.jsx/.css` | Remove serif title lines, floating orbs, `home__watermark`, bg-lines. New: display-type hero with decode-in, HUD frame, status strip footer, 3 chamfered CTA buttons (primary filled `--signal`, others outlined) |
| `Archive.jsx/.css` | Header becomes a "console header": giant title, count readout, tabs as segmented control with chamfered active state, search as terminal-style input (`> search_`), grid of dossier cards |
| `CharacterCard.jsx/.css` | Chamfered panel; art top; bottom info bar with `ENTRY-NN` + name; `--entry` color for brackets/underline; hover = lock-on (brackets expand, scan line sweeps, label slides) |
| `CharacterModal.jsx/.css` | Two-panel dossier: art left, data right (number, name, quote as "transcript"), chamfered, opens with clip-path wipe. Keep focus trap, Esc, scroll lock, portal |
| `BannerCard`, `BannerModal` | Same family as the character versions, wide aspect |
| `About.jsx/.css` | Bio in a text panel, socials as list rows with arrow, photo in framed panel with brackets and caption bar, stats as 2x2 readout grid |
| `Projects.jsx/.css` | Each project = panel with `sysRef`, `env` status tag (`PROD_CLOUD` signal-colored, `LOCAL_DEV` dim), tech chips as mono tags |
| `NotFound.jsx/.css` | "SIGNAL LOST" in `--alert`, glitch-free, with a link back |
| `Cursor.jsx/.css` | Small square crosshair + thin ring; fine pointers only; scales/locks onto interactive elements |
| `BackToTop`, scroll progress | Thin 2px `--signal` bar (no gradient/glow), square back-to-top button |
| `src/index.css` globals | Delete `.grain`, `.ambient-glow*`, neon utility classes, hexagon, data-stream, gradient scrollbar/selection. Keep skip-link, focus-visible (restyle) |
| `App.css` | Review; remove anything unused after the migration |

## 6. Layout

- Mobile-first. Breakpoints: `480`, `768`, `1024`, `1440`.
- Archive grid: 1 col < 480, 2 cols < 1024, 3–4 cols above; `card--wide` spans 2 cols where there is room, falls back to 1 on small screens.
- Max content width ~1360px, centered, side padding `--frame`.
- Keep real text content selectable and in DOM order for screen readers (decoration is `aria-hidden`).

## 7. Imagery

- Character art (`/characters/*.webp`) is never recolored, filtered, or blurred by the UI. Allowed: a dark bottom scrim for text, a thin `--entry` tint strip, a scan-line sweep on hover.
- Keep `loading="lazy"` and the existing fallback block when an image errors.
- Always set width/height or `aspect-ratio` to prevent layout shift.

## 8. Accessibility

- Text contrast >= 4.5:1 (check `--text-mute` on `--panel`; don't use it for essential text).
- `:focus-visible`: 2px solid `--signal`, offset 3px, no glow.
- Everything interactive reachable by keyboard; cards keep `role="button"`, `tabIndex=0`, Enter handler (also add Space).
- All motion respects `prefers-reduced-motion` (see `MOTION.md`).
- Custom cursor only when `(pointer: fine)`; never hide the native cursor on touch.

## 9. Don'ts

Neon glows, gradient text, rounded corners, drop shadows, floating blur orbs, serif display type, emoji as UI, stock icon packs, more than one accent color per screen, infinite animations on more than a few small elements.
