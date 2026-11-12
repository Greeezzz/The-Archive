# TASKS-V2.md — Migration plan (light industrial + line system)

Use this **instead of** `TASKS.md` Phases 1–5. `TASKS.md` Phase 0 (bug fixes) and the manual regression checklist still apply. The agent has already done some v1 work: **first audit what exists**, don't rebuild what's reusable.

Read order: `AGENTS.md` → `PRD.md` → `DESIGN.md` (v2) → `LINES.md` → `MOTION.md` → this file.

## Phase A — Audit (no code changes)

- [ ] List what v1 implemented: tokens file, fonts, `Panel/Button/Tag`, `DecodeText/Reveal/DrawLine`, `AnimatePresence` page transition, cursor, etc.
- [ ] Mark each as **keep / restyle / delete** against `DESIGN.md` v2.
- [ ] Report back to Chelo. Wait for OK.

## Phase B — Flip to light tokens

- [ ] Replace `src/styles/tokens.css` with the v2 tokens (`DESIGN.md` §1). Remove dark values and unused names.
- [ ] Fonts: Archivo (variable), Inter, JetBrains Mono. Remove unused families.
- [ ] Global background = `--paper` + halftone; remove dark/neon leftovers and blur orbs.
- [ ] Fix every place that assumed dark (white text, dark panels). Check `--entry` usage: never as text/line on paper (`DESIGN.md` §1).

Acceptance: all pages render light, readable, no dark remnants. Lint + build pass.

## Phase C — Line system components

- [ ] `src/components/lines/`: `DashRule`, `DrawLine`, `Frame` (dashed outline + 4 handles), `ScanLine`, `GhostText`, `Crosshair`, `TopoLines` (original SVG).
- [ ] Shared CSS in `src/styles/lines.css` (see `LINES.md` code).
- [ ] Reduced-motion variants for each.

## Phase D — Shell (console)

- [ ] Header with tabs + dashed vertical dividers + active yellow highlight (replaces `Navbar` styling; keep mobile menu behavior).
- [ ] Right rail (crosshairs, rotated section label, yellow button) with mobile collapse into bottom bar.
- [ ] Bottom bar with credit + pager slot.
- [ ] Page-level build-in timeline (`LINES.md` §4) wired into `PageTransition`.

## Phase E — Archive stage viewer

- [ ] Index grid cards restyled (paper-2, dashed border, handles on hover).
- [ ] Stage viewer replaces `CharacterModal` (and banner equivalent): meta column, framed art, ghost numeral, pager `‹ 01 / 23 ›`, ←/→/Esc, focus management, scroll lock.
- [ ] Optional deep link `?entry=007`.
- [ ] Entry-change transition (wipe + scan + decode).

## Phase F — Poster mode

- [ ] Home hero (bracket title, swoosh, slab, micro-text bands, ghost hatched word, CTAs).
- [ ] 404 in poster mode.
- [ ] Page-transition slab wipe (yellow/black) between routes.

## Phase G — About & Projects

- [ ] Console skeleton, frames with handles, dashed dividers, tags.

## Phase H — Polish

- [ ] Reduced motion pass, 360/390/768 widths, 4x CPU throttle check.
- [ ] Contrast check (esp. `--ink-dim`), focus rings on light and yellow.
- [ ] Lighthouse mobile on `/` and `/archive`; bundle size.
- [ ] Update `README.md`.

## Decisions Chelo must confirm

1. Archive viewer replaces the modal with a full-screen stage + pager (matches reference #1). Default: yes.
2. Dark mode: not planned. Tokens make it possible later. Default: skip.
3. Fonts: Archivo as display. Default: yes.

## Kickoff prompt for the AI agent

> Read `docs/AGENTS.md`, `docs/PRD.md`, `docs/DESIGN.md` (v2), `docs/LINES.md`, `docs/MOTION.md`, `docs/TASKS-V2.md`. Do **Phase A only** (audit, no code changes) and report what to keep/restyle/delete. Don't start Phase B until I say so.
