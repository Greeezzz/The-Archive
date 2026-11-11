# MOTION.md — Motion design spec

Feel: **mechanical, precise, fast-in / settled-out.** Things slice, wipe, lock, and decode. Nothing bounces, wobbles, or floats.

## 1. Tokens (put in `src/lib/motion.js`)

```js
export const ease = {
  out:   [0.16, 1, 0.3, 1],    // default entrance (expo-out feel)
  inOut: [0.76, 0, 0.24, 1],   // wipes / transitions
  snap:  [0.2, 0, 0, 1],       // UI feedback
};
export const dur = { micro: 0.15, ui: 0.28, panel: 0.5, page: 0.7, hero: 1.0 };
export const stagger = { tight: 0.03, base: 0.06, loose: 0.1 };
```

Same tokens as CSS variables for CSS-only effects: `--ease-out`, `--ease-in-out`, `--dur-ui`, `--dur-panel`.

## 2. Motion catalog

| # | Name | Where | Spec |
|---|---|---|---|
| M1 | Page transition | Route change (`PageTransition.jsx`) | Exit: content fades/slides 8px while a full-screen `--signal`-edged panel wipes across (clip-path, left→right, `dur.page`, `ease.inOut`). Enter: content reveals with M3 stagger. Today it only remounts by `key`; it needs `AnimatePresence` + `useLocation` to get real exit animations |
| M2 | Text decode | Hero title, page titles, nav on first load | Characters scramble through `A–Z0–9#/` then resolve left→right, ~600ms for a title, ~300ms for labels. Plain JS (rAF/interval) in a `<DecodeText>` component; keep the real text in `aria-label`/visually hidden node so screen readers read it once |
| M3 | Panel reveal stagger | Cards, project panels, stats, footer strip | Each panel: clip-path from `inset(0 100% 0 0)` → `inset(0)` plus 12px translate-up + opacity, `stagger.base`, trigger on viewport enter (`whileInView`, `once: true`) |
| M4 | Line draw | Section dividers, frames, brackets | SVG/`pathLength` 0→1 or `transform: scaleX(0→1)` with `transform-origin: left`, `dur.panel` |
| M5 | Card lock-on hover | `CharacterCard`, `BannerCard`, project panels | Corner brackets expand outward 6px and switch to `--entry`; a thin scan line sweeps top→bottom once (`dur.panel`); info label slides 4px. Remove the existing `isHovered` JS state; do it with CSS `:hover` and `:focus-visible` |
| M6 | Modal open/close | `CharacterModal`, `BannerModal` | Backdrop fades; panel opens with clip-path wipe from center line (`inset(50% 0)` → `inset(0)`), content stagger `tight`. Close = reverse, faster (`dur.ui`). Needs `AnimatePresence`; the modals are currently conditionally rendered in `Archive.jsx` |
| M7 | Tab switch | Archive tabs | Active indicator slides between tabs (shared `layoutId`), grid cross-fades with M3 re-stagger |
| M8 | Search filter | Archive search | Cards animate layout on filter (`layout` prop) without flashing; empty state fades in |
| M9 | Cursor | `Cursor.jsx` | Crosshair follows with no lag; ring lerp (keep ~0.1–0.15); on interactive elements ring shrinks and locks to element bounds or gets signal color. Use event delegation (`mouseover`/`mouseout` on `document`) because the current code only binds elements present at mount, so cards rendered later never get the hover state |
| M10 | Scroll progress | Global | 2px `--signal` bar, `transform: scaleX`. Update with `useScroll`/`useSpring` from `motion` or a rAF-throttled listener; avoid setting React state on every scroll event as `App.jsx` does now |
| M11 | Ambient | Background | Static 1px grid at very low opacity. At most one slow, subtle element (e.g. a faint scan band, 12s+ loop). No blur orbs |
| M12 | Boot intro | Home, first visit per session | 1.2–1.8s sequence: frame lines draw → status text decodes (`SYS.ONLINE`) → title decodes → CTAs reveal. Gate with `sessionStorage`; always skippable (click/Esc), never blocks navigation |

## 3. Implementation notes

- Install: `npm i motion` (import from `motion/react`). `lenis` and `gsap` only if needed (see PRD §7).
- Router: React Router v7 `BrowserRouter` + `Routes`. For exit animations use:
  ```jsx
  const location = useLocation();
  <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>…</Routes>
  </AnimatePresence>
  ```
  `useLocation` must be called inside the router, so move the route tree into a child component of `<BrowserRouter>`.
- Shared helpers: `src/components/motion/` → `DecodeText.jsx`, `Reveal.jsx` (wrapper for M3), `DrawLine.jsx` (M4), `useReducedMotionSafe.js`.
- Prefer CSS for hover/focus effects (M5), `motion` for mount/unmount/layout/scroll-triggered effects.

## 4. Performance budget

- Animate only `transform`, `opacity`, `clip-path`. Never animate `width/height/top/left`, `box-shadow`, or `filter: blur`.
- No full-viewport `filter: blur()` layers (the current `.ambient-glow` uses 60–100px blur on 400–800px elements: remove).
- Infinite animations: max 2 on screen at once, all tiny or very low frequency.
- `will-change` only on the element while it animates; don't leave it on permanently.
- Images: `loading="lazy"`, `decoding="async"`, explicit dimensions.
- Test with CPU 4x slowdown in DevTools; scrolling the Archive grid must stay smooth.

## 5. Reduced motion

Under `@media (prefers-reduced-motion: reduce)` and `useReducedMotion()`:
- M1/M6: simple opacity fade, <= 150ms.
- M2/M12: skipped (final text shown immediately).
- M3/M4: elements appear instantly or with a very short opacity fade.
- M5: static state change (color only).
- M9/M11: off.
- Lenis (if used): disabled; `scroll-behavior: auto`.

## 6. Done criteria for any motion work

- Looks right at 60fps on desktop and at 4x CPU throttle.
- Works with keyboard only (no motion depends on hover alone).
- Reduced-motion behavior verified by toggling the OS/DevTools setting.
- No layout shift caused by animation.
