# Checkpoint 14 — Small Tweaks
**Date:** 2026-04-01
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Visual polish pass. Ready to commit.

---

## 1. Context Resume

A batch of small visual tweaks applied to the select screen and companion flow.

**What changed since Checkpoint 13:**

- **Gaussian blur backdrop added:** A black blurred circle (`rgba(0,0,0,0.4)`, `filter: blur(32px)`, `border-radius: 50%`) sits behind the highlighted companion on all screens — carousel (select/confirm), customize, and ready. Improves contrast between companion art and the pixel background. Implemented as `.companion-backdrop` div; companion images lifted to `z-index: 1`. Carousel uses an additional `.carousel-backdrop` modifier class for sizing.
- **CARDS defaults to off:** `cardsVisible` initial state changed from `true` → `false` — card backgrounds and borders hidden on load.
- **Subject text 20% larger:** `.info-subject` 13px → 16px, `.info-sub-subjects span` 11px → 13px.
- **Quote color matches header:** `.info-flavor` color changed from `rgba(255,255,255,0.6)` → `#f0f0f0`.
- **Quote margin-top:** `margin-top: 40px` added to `.info-flavor` to push the quote down from the sub-subjects block.
- **`customize-companion-wrap` and `ready-companion-wrap`:** Added `position: relative` to both so the absolute-positioned backdrop sits correctly inside them.

---

## 2. Human Directions

Steps to reproduce from Checkpoint 13:

1. In `App.jsx`, change `cardsVisible` initial state from `true` → `false`
2. In `App.jsx`, add `<div className="companion-backdrop carousel-backdrop" />` as first child of `.carousel-stage`
3. In `App.jsx`, add `<div className="companion-backdrop" />` as first child of `.customize-companion-wrap` and `.ready-companion-wrap`
4. In `App.css`, add `position: relative` to `.customize-companion-wrap` and `.ready-companion-wrap`
5. In `App.css`, add `position: relative; z-index: 1` to `.customize-companion-img` and `.ready-companion-img`
6. In `App.css`, add `.companion-backdrop` styles: `position: absolute; top/left 50%; transform translate(-50%,-50%); width/height 100%; border-radius 50%; background rgba(0,0,0,0.4); filter blur(32px); z-index 0; pointer-events none`
7. In `App.css`, add `.carousel-backdrop` override: `position: absolute; top/left 50%; width 200px; height 200px`
8. In `App.css`, change `.info-subject` font-size 13px → 16px
9. In `App.css`, change `.info-sub-subjects span` font-size 11px → 13px
10. In `App.css`, change `.info-flavor` color from `rgba(255,255,255,0.6)` → `#f0f0f0`
11. In `App.css`, add `margin-top: 40px` to `.info-flavor`

---

## 3. Records of Resistance

**R1 — Text stroke tried and reverted**
- Added `1px black -webkit-text-stroke` to subject and sub-subjects text
- Student immediately asked to undo — stroke made the text feel heavy
- Lesson: text-stroke on small sans-serif body text tends to look chunky; skip unless the student explicitly wants to try it again

**R2 — Quote margin iteration**
- Quote lowered 50px (`margin-top: 50px`), then nudged up twice in 5px increments to land at 40px
- Final value: `margin-top: 40px`

---

## 4. Successes

**S1 — Backdrop blur contrast improvement**
- Single reusable `.companion-backdrop` class handles all three screens (carousel, customize, ready) — no per-screen special casing needed beyond sizing.

**S2 — Quote margin fine-tuning**
- Student used iterative 5px nudges to dial in spacing precisely — clean workflow for pixel-level adjustments.
