# Checkpoint 05 — Background, Contrast, Phone Scaling
**Date:** 2026-03-30
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Visual polish pass complete. Ready to commit.

---

## 1. Context Resume

This checkpoint covers a full visual pass: phone scaling fix, pixel landscape background added, contrast improvements across text and cards, and header copy corrected.

**What changed since Checkpoint 04:**

- **Header copy:** "Choose who will you learn with" → "Choose who you will learn with" (grammar fix)
- **Phone scaling:** Added `transform: scale(min(1, calc(95vh / 844px), calc(95vw / 390px)))` to `.phone-frame` — phone now scales down to fit any screen without cutting off, all internal pixel positions stay intact
- **Pixel background:** `claude/references/background.png` copied to `src/assets/background.png`, imported in App.jsx, applied to `.screen-bg` via inline style. CSS: `filter: grayscale(100%) opacity(25%); background-size: cover; background-position: calc(50% + 50px) center`
- **Info panel spacing:** Header moved to `top: 344px` (10px above card top at 354px). Info panel moved to `top: 510px` (10px below card bottom)
- **Text contrast bump:** Subject `#888→#aaa`, sub-subjects `#555→#888`, quote `#666→#999`, side card subject `#888→#aaa`
- **Card darkness:** Background `rgba(255,255,255,0.04)` → `rgba(0,0,0,0.6)`
- **Placeholder darkness:** `filter: brightness(0.7)` added to `.card-image-placeholder`
- **Letter opacity:** `rgba(255,255,255,0.3)` → `rgba(255,255,255,0.8)`

**Current layout reference (grid values):**
- Header bottom: 344px (10px above card top)
- Card center: 422px (horizontal center line)
- Card top: ~354px, card bottom: ~490px
- Info panel top: 510px (10px below card bottom)
- Background: 25% opacity, grayscale, shifted 50px right

---

## 2. Human Directions

Steps to reproduce from Checkpoint 04:

1. Fix header copy in `src/App.jsx`: "Choose who you will learn with"
2. Add phone scaling to `.phone-frame` in `App.css`: `transform: scale(min(1, calc(95vh / 844px), calc(95vw / 390px))); transform-origin: center center`
3. Copy `claude/references/background.png` → `src/assets/background.png`
4. Import in `App.jsx`: `import bgImage from './assets/background.png'`
5. Apply to `screen-bg` div: `style={{ backgroundImage: \`url(${bgImage})\` }}`
6. Update `.screen-bg` in `App.css`: add `background-size: cover; background-position: calc(50% + 50px) center; filter: grayscale(100%) opacity(25%)`
7. Move `.screen-header` top from `360px` to `344px`
8. Move `.info-panel` top from `500px` to `510px`
9. Bump text colors: subject `#aaa`, sub-subjects `#888`, quote `#999`
10. Card background: `rgba(0,0,0,0.6)`
11. Placeholder: `filter: brightness(0.7)`
12. Letter: `rgba(255,255,255,0.8)`

---

## 3. Records of Resistance

**R1 — Background image path and base path**
- Placing the image in `public/` would break on GitHub Pages due to the `/CharacterSelectScreen/` base path
- Fix: used `src/assets/` with an ES module import — Vite handles the base path correctly in both local dev and production

**R2 — Text vs. background contrast tradeoff**
- Option A: lower background opacity further
- Option B: bump text values up
- Decided: bump text values (subject, sub-subjects, quote) — preserves the type hierarchy that was already calibrated, background opacity is a single lever with no hierarchy implications
- Background stayed at 25% opacity

**R3 — Card darkness increments**
- "30% darker" applied twice in sequence: first pass `rgba(0,0,0,0.3)`, second pass `rgba(0,0,0,0.6)`
- Placeholders darkened separately via `filter: brightness(0.7)` since their colors are defined in data (inline styles), not CSS

---

## 4. Successes

**S1 — Phone scaling with no layout breakage**
- CSS `min()` inside `transform: scale()` scales the entire phone as a unit — all internal absolute pixel positions remain correct at any viewport size. Zero layout changes needed inside the phone.

**S2 — Reference analysis**
- Reviewed all three reference images (`tutorial start.png`, `quiz screens.png`, `background.png`) and produced a prioritized list of visual gaps vs. current screen
- Key findings: references use floating character art (no card boxes), light warm panels, top/bottom chrome bars, and a seamlessly tiling world map background
- Student is aware — next steps include top/bottom chrome, reducing side card opacity, and eventually removing center card container when real art arrives

**S3 — Monochromatic background**
- Single CSS filter `grayscale(100%) opacity(25%)` desaturates and dims the pixel landscape in one line — no image editing required, easy to adjust
