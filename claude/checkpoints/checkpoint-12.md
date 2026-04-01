# Checkpoint 12 — Customize Layout Fix + Ready Screen + Alternate Companion Art
**Date:** 2026-04-01
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Three features added this session. Dev server running at localhost:5173.

---

## 1. Context Resume

Three things changed this session, building on the Stage 4 confirmation + customize flow from Checkpoint 11:

### A. Customize screen — companion + slider vertically centered
Previously the customize screen flowed top-down: title at 80px, companion below it, slider below that. The companion and slider were pushed toward the top half of the screen.

Fix: `.customize-screen` now uses `justify-content: center` so the flex children (companion wrap, name, slider) sit in the true vertical center of the phone screen. The title was pulled out of the flex flow with `position: absolute; top: 80px` so it stays anchored at the top without affecting the centering. The `margin-top: 36px` was removed from `.customize-companion-wrap`.

### B. Customize screen — SELECT button locks the color
A new `SELECT` button (`.color-select-btn`) was added above the BACK button on the customize screen. Pressing it:
- Saves `companionHue` into a new `lockedHue` state
- Advances `gameScreen` to `'ready'`

The BACK button still returns to select and resets both `companionHue` and `lockedHue` to 0.

### C. New "ready" screen
A fourth game screen state (`'ready'`) shows after the user locks their color. Layout:
- Same background (`.screen-bg` is always rendered inside `.screen`)
- Absolute-positioned header: `"YOUR COMPANION IS READY."` (Press Start 2P, 14px, top: 72px)
- Absolute-positioned subtitle: `"Time to start learning."` (italic system font, top: 182px)
- Centered companion image at 300×300 (larger than customize screen's 240×240), with locked hue filter applied
- Companion name below the image
- `START` button at the bottom (currently wires back to select screen as placeholder)

### D. Alternate companion art for ready screen
Each companion now has a `readyImage` field in `companions.js` pointing to a second, alternate art asset:
- Vexor → `vexor_seated.png`
- Atomix → `atomix_excited.png`
- Archaeon → `archaeon_reading.png`

Source files were in `claude/companion art/` — copied to `src/assets/` and imported in `companions.js`. The ready screen uses `selectedCompanion.readyImage` instead of `selectedCompanion.image`. Locked hue filter applies to the ready image as well.

**State machine now has four states:** `select` → `confirm` → `customize` → `ready` → (START) → `select`

---

## 2. Human Directions

Steps to reproduce from Checkpoint 11:

1. Add `lockedHue` state to App.jsx: `const [lockedHue, setLockedHue] = useState(0)`
2. Add `handleColorSelect` handler: sets `lockedHue(companionHue)`, sets `gameScreen('ready')`
3. Update `handleBackToSelect` to also reset `lockedHue` to 0
4. In the customize screen JSX, add `<button className="color-select-btn" onClick={handleColorSelect}>SELECT</button>` above the BACK button
5. Add ready screen JSX block: conditional on `gameScreen === 'ready'`, containing title, subtitle, companion image using `selectedCompanion.readyImage` with locked hue filter, name, and START button
6. Update select screen condition from `gameScreen !== 'customize'` to `gameScreen !== 'customize' && gameScreen !== 'ready'`
7. In App.css, update `.customize-screen` to add `justify-content: center`
8. In App.css, update `.customize-title` to `position: absolute; top: 80px; left: 0; right: 0; margin: 0`
9. In App.css, remove `margin-top: 36px` from `.customize-companion-wrap`
10. In App.css, add `.color-select-btn` styles (white bg, dark text, full-width, bottom: 100px absolute)
11. In App.css, add all `.ready-screen`, `.ready-title`, `.ready-subtitle`, `.ready-companion-wrap`, `.ready-companion-img`, `.ready-name`, `.ready-start-btn` styles
12. Copy `vexor_seated.png`, `atomix_excited.png`, `archaeon_reading.png` from `claude/companion art/` to `src/assets/`
13. In `companions.js`, import the three ready images and add `readyImage` field to each companion

---

## 3. Records of Resistance

None this session. All three features were implemented cleanly on the first pass without pushback or reversals.

---

## 4. Successes

**S1 — Centering via absolute title extraction**
Pulling `.customize-title` out of the flex flow with `position: absolute` (rather than adding spacers or padding hacks) cleanly solved the centering problem while keeping the title visually anchored at the top.

**S2 — `readyImage` field on companion data**
Adding `readyImage` directly to the companion data object (rather than a separate lookup map or conditional logic in the component) kept the ready screen JSX simple: just `selectedCompanion.readyImage`.

**S3 — Locked hue carries through to ready screen**
`lockedHue` state is set at the moment SELECT is pressed on the customize screen, then used for the hue filter on both the ready screen image and any future screens — clean separation from the live slider value `companionHue`.
