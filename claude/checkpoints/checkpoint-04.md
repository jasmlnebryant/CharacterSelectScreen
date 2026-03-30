# Checkpoint 04 — Carousel Polish: Card & Info Panel
**Date:** 2026-03-29
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Carousel visually tuned. Ready to commit.

---

## 1. Context Resume

The 3D turntable carousel is functional and visually refined. This checkpoint covers all visual polish applied to the center card and the info panel beneath it.

**What changed since Checkpoint 03:**

- **Center card:** Card info (name/subject) hidden on highlighted card — info lives in panel below instead. Placeholder image centered in card with 10px margin on all sides. Letter initial horizontally corrected for Press Start 2P font offset (`left: 2px`).
- **Card anchoring:** All cards anchored with `left: calc(50% - 65px)` and `top: 50%` so they are truly centered in the stage. `translateY(-50%)` added to all position transforms to maintain vertical center.
- **Stage position:** `top: 327px` — centers cards on the horizontal grid line at 422px (844 ÷ 2).
- **Info panel:** Repositioned to `top: 500px` (10px below card bottom). Name matches header size (16px Press Start 2P). Quote enlarged 20% (10px → 12px). Equal spacing (14px) between name, subject block, and quote. Subject and sub-subjects tighter together (4px internal gap).

**Current layout reference (grid values):**
- Horizontal center line: 422px — cards centered here
- Info panel top: 500px
- Stage: top 327px, height 190px

---

## 2. Human Directions

Steps to reproduce from Checkpoint 03:

1. **CompanionCard.css:**
   - Hide `.position-center .card-info` (`display: none`)
   - Add `justify-content: center` to `.position-center`
   - Add `margin: 10px; width: calc(100% - 20px)` to `.position-center .card-image-wrap`
   - Add `left: calc(50% - 65px); top: 50%` to `.companion-card` base
   - Add `translateY(-50%)` to all three position transforms
   - Fix font offset: `.card-initial { position: relative; left: 2px; line-height: 0; display: block }`

2. **App.css:**
   - Move `.carousel-stage` top to `327px`
   - Move `.info-panel` top to `500px`, set `gap: 0`
   - `.info-name`: `font-size: 16px`, `margin-bottom: 14px`
   - `.info-subject`: `margin-bottom: 4px`
   - `.info-sub-subjects`: `margin-bottom: 14px`
   - `.info-flavor`: `font-size: 12px`

---

## 3. Records of Resistance

**R1 — 0.5px nudge didn't render**
- Attempted `transform: translateX(0.5px)` on `.card-initial` — sub-pixel rendering snapped it back, no visible change
- Switched to `position: relative; left: Xpx` which respects sub-pixel layout better
- Final value: `left: 2px` (confirmed by student against grid center line)

**R2 — Card not horizontally centered in stage**
- Cards were `position: absolute` inside a flex container — they don't participate in flex layout
- Fix: explicit `left: calc(50% - 65px)` anchors the card to the stage's horizontal center
- Same issue existed vertically: fixed with `top: 50%` + `translateY(-50%)` in each position transform

---

## 4. Successes

**S1 — Grid as pixel-precise communication**
- Student used the grid center crosshairs to confirm card centering, letter centering, and info panel placement — no ambiguity in back-and-forth

**S2 — Info panel hierarchy**
- Equal spacing (14px) between the three major elements (name / subject block / quote), with tighter internal spacing (4px) between main subject and sub-subjects — creates clear visual grouping without extra markup
