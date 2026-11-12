# The Archive

> Industrial exhibition-terminal portfolio by Chelo (Greeezzz).
> Live: [https://www.cheloarchive.my.id/](https://www.cheloarchive.my.id/)

---

## Overview

**The Archive** is a personal portfolio of original and fan character designs, banner
graphics, and software projects. It is presented as an exhibition terminal: calm paper-white
console pages with precise dashed linework, and a loud yellow/black poster mode at key
moments (home hero, 404, route transitions).

## Tech stack

- **Framework:** React 19
- **Build:** Vite 8
- **Routing:** React Router 7
- **Styling:** plain CSS, one file per component, tokens in `src/styles/tokens.css`
- **Motion:** `motion/react`
- **Type:** Archivo (variable display), Inter (body), JetBrains Mono (labels/code)

## Two visual modes

| Mode | Where | Feel |
|---|---|---|
| **Console** | Archive, About, Projects, stage viewer | Quiet, hairline dashed grid, tiny mono labels, art is the hero |
| **Poster** | Home hero, 404, page transitions | Yellow/black slabs, bracket titles, giant type, swoosh, glitch slivers |

## Project structure

```
src/
  components/
    lines/          DashRule, Frame, ScanLine, GhostText, Crosshair, TopoLines, DrawLine
    poster/         BracketTitle, Swoosh, MicroTextBand, SlabLabel, GlitchSlivers
    motion/         DecodeText, Reveal
    ui/             Button, Tag
    Navbar          console header (tabs + dashed dividers)
    PageFrame       right rail + bottom status bar
    StageViewer     full-screen entry viewer with pager
    CharacterCard, BannerCard, Cursor, PageTransition, BackToTop, ScrollProgress
  data/             characters.json, banners.json
  lib/              color.js, motion.js
  pages/            Home, Archive, About, Projects, NotFound
  styles/           tokens.css, lines.css, poster.css
public/             characters/, banners/, projects/, profile/
docs/               PRD, DESIGN, LINES, MOTION, TASKS-V2, AGENTS
```

## Scripts

```bash
npm install      # install
npm run dev      # dev server
npm run lint     # eslint
npm run build    # production build
npm run preview  # preview the build
```

## Adding a character

1. Drop the artwork in `public/characters/` as `.webp`.
2. Run `bash scripts/optimize-images.sh` — it resizes anything wider than 900px and
   re-encodes at quality 82. Skipping this is how the repo once shipped 16MB of art.
3. Append an entry to `src/data/characters.json`:

```json
{
  "id": 32,
  "number": "032",
  "name": "CHARACTER NAME",
  "quote": "Character voice line.",
  "image": "/characters/archive_32.webp",
  "color": "#E5A93C",
  "category": "archive",
  "isWiderDesign": false
}
```

The grid, search, pager, and ghost numerals all read from that file. Nothing else to edit.

## Colour rule worth knowing

`color` from the JSON becomes `--entry`. It is **never** used as text or as a hairline:
several entries are `#FFFFFF` or `#B6B6B6` and would vanish on paper. It only ever appears
as a fill behind art, an edge strip, or a small chip next to ink text. Yellow follows the
same rule — fill only, always with ink text on top.

## Docs

Read in this order: `docs/AGENTS.md` → `docs/PRD.md` → `docs/DESIGN.md` → `docs/LINES.md`
→ `docs/MOTION.md` → `docs/TASKS-V2.md`. The v1 design docs are kept in `docs/v1-archive/`.
