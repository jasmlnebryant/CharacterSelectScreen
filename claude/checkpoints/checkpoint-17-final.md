# Checkpoint 17 — Final
**Date:** 2026-04-06
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Stage 5 complete. All features implemented. Project ready for submission.

---

## 1. Context Resume

Stage 5 is complete. This checkpoint captures the full second half of Stage 5: interaction upgrades, ambient effects, and screen transitions. The app is feature-complete.

**What changed since Checkpoint 16:**

- **Hold-to-confirm SELECT button:** `onPointerDown` starts a 1.5s `setTimeout`. A color fill bar (`<span className="select-btn-fill">`) animates `width: 0 → 100%` over 1.5s. Shake animation (`@keyframes btnShake`) runs for the same 1.5s — starts at ±0.5px amplitude and builds to ±7px by the end. Both are one-shot `forwards` animations tied to the `.holding` class. Releasing early cancels both via `onPointerUp / onPointerLeave / onPointerCancel`.
- **Hold particles on SELECT button:** While holding, a recursive `setTimeout` spawns white dot particles (`<div className="hold-particle">`) at random positions along the button. Spawn interval decreases from 220ms → 55ms as hold progresses. Particle size grows with progress (2–6px). Each particle uses `@keyframes particleRise` (translateY –90px, fade out, 0.75s). Self-removes via `onAnimationEnd`.
- **BACK button removed from customize screen.**
- **START button pulsates on ready screen:** `@keyframes btnPulsate` scales `0.8 → 0.84 → 0.8` over 1.8s, `ease-in-out infinite`. Full base transform baked into keyframes.
- **Hue hint animation on customize screen:** On entering customize, a `useEffect` runs a `requestAnimationFrame` loop for 2s. Uses `Math.sin(progress * Math.PI)` to arc from 0° → 120° (green) → 0°. After completing, a `setTimeout(runHint, 20000)` re-queues the animation. Loop continues until user moves the slider. Slider `onChange` sets `userHasSlidRef.current = true`, cancels the RAF and clears the repeat timer.
- **Ambient particles on ready screen:** A `useEffect` runs while `gameScreen === 'ready'`, spawning particles inside `.ready-companion-wrap` at z-index 1 (between backdrop at z-index 0 and companion image at z-index 2). Spawn rate: randomized 80–180ms. Particles rise upward and escape the wrap bounds naturally. Self-remove via `onAnimationEnd`. Cleaned up on screen exit.
- **Smart animate screen transitions (View Transitions API):** All navigation now goes through a `navigate(action)` helper: `document.startViewTransition(() => flushSync(action))`. `flushSync` (from `react-dom`) forces React to commit state synchronously inside the transition callback. Three elements share `view-transition-name: companion-hero` (center card image, customize img, ready img) — the browser automatically FLIP-animates the companion between screens. Everything else crossfades at 0.35s. Companion transition at 0.45s with `cubic-bezier(0.4, 0, 0.2, 1)`. Graceful fallback: if API not available, `action()` fires directly.

**Production pipeline stage:** Stage 5 — Personality & Interaction ✓ — **PROJECT COMPLETE**

---

## 2. Human Directions

Steps to reproduce from Checkpoint 16:

### Hold-to-confirm SELECT button
1. In `App.jsx`, import `useRef` (already present), add `isHolding` state, `particles` state, `holdTimerRef`, `particleTimerRef`, `holdStartTimeRef` refs
2. Add `handleHoldStart`: sets `isHolding(true)`, spawns particles via recursive `setTimeout`, fires `handleSelectPress` after 1500ms
3. Add `handleHoldEnd`: clears both timers, sets `isHolding(false)`, clears particles
4. Replace `onClick` on select-btn with `onPointerDown / onPointerUp / onPointerLeave / onPointerCancel`
5. Add `.holding` class to select-btn when `isHolding` is true
6. Add `<span className="select-btn-fill" />` and `<span className="select-btn-label">SELECT</span>` inside button
7. In `App.css`, add `overflow: hidden; user-select: none` to `.select-btn`
8. Add `@keyframes btnFill` (width 0→100%), `@keyframes btnShake` (30-frame oscillation with growing amplitude 0.5px→7px over full keyframe span)
9. Add `.select-btn-fill` styles (position absolute, inset 0, z-index 0), per-companion fill colors at 0.55 opacity
10. Add `.select-btn-label` (position relative, z-index 1)
11. Add `.select-btn.holding` rule: `animation: btnShake 1.5s linear forwards`
12. Add `.select-btn.holding .select-btn-fill` rule: `animation: btnFill 1.5s linear forwards`

### Hold particles
13. In `App.jsx`, render `particles.map(...)` inside `.screen` (after status bar) as `.hold-particle` divs with `left`, `top`, `width`, `height`, `--tx` inline styles and `onAnimationEnd` self-removal
14. In `App.css`, add `@keyframes particleRise` (translateY –90px, translateX var(--tx), scale 0, opacity 0)
15. Add `.hold-particle` (position absolute, border-radius 50%, background white, z-index 15, animation: particleRise 0.75s ease-out forwards)

### BACK button
16. Remove `<button className="back-btn">BACK</button>` from customize screen JSX in `App.jsx`

### START button pulsate
17. In `App.css`, add `@keyframes btnPulsate` (scale 0.8 → 0.84 → 0.8, full transform baked in)
18. Add `animation: btnPulsate 1.8s ease-in-out infinite` to `.ready-start-btn`

### Hue hint animation
19. In `App.jsx`, add `hintRafRef`, `hintRepeatTimerRef`, `userHasSlidRef` refs
20. Add `useEffect([gameScreen])`: on `'customize'`, runs `runHint()` — RAF loop using `Math.sin(progress * Math.PI) * 120` over 2000ms, then queues repeat via `setTimeout(runHint, 20000)`
21. In slider `onChange`: set `userHasSlidRef.current = true`, cancel RAF, clear repeat timer, then `setCompanionHue`

### Ready screen ambient particles
22. In `App.jsx`, add `readyParticles` state, `readyParticleTimerRef` ref
23. Add `useEffect([gameScreen])`: on `'ready'`, spawn particles inside `.ready-companion-wrap` via recursive `setTimeout` (80–180ms random interval)
24. Add particle divs inside `.ready-companion-wrap`, between `.companion-backdrop` and `<img>`
25. In `App.css`, add `.ready-companion-img { z-index: 2 }` override
26. Add `.ready-particle` (position absolute, z-index 1, same animation as hold-particle)

### Smart animate transitions
27. In `App.jsx`, import `flushSync` from `'react-dom'`
28. Add `navigate(action)` helper: `document.startViewTransition(() => flushSync(action))` with fallback
29. Wrap `handleSelectPress`, `handleColorSelect`, `handleBackToSelect` bodies in `navigate(() => { ... })`
30. In `App.css`, add `view-transition-name: companion-hero` to `.position-center .card-image`, `.customize-companion-img`, `.ready-companion-img`
31. Add `::view-transition-old(root)` / `::view-transition-new(root)` at 0.35s
32. Add `::view-transition-group(companion-hero)` at 0.45s, `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 3. Records of Resistance

**R1 — Shake applied to label, not the full button (first attempt)**
- Initial shake implementation animated `.select-btn-label` only — too subtle to notice
- Fix: moved shake to `.select-btn.holding` with full base transform (`translateX(-50%) translateY(-50%) scale(0.8)`) baked into every keyframe so the button's positioning isn't overridden

**R2 — Constant shake amplitude replaced with building arc**
- First shake was `infinite` at constant ±4px — felt mechanical, not exciting
- Fix: single 1.5s keyframe animation with amplitude starting at ±0.5px and growing to ±7px — one arc that mirrors the fill duration

**R3 — Ready particles z-index layering**
- Particles initially rendered at `.screen` level with `z-index: 15` — appeared in front of the companion
- Fix: moved particle render inside `.ready-companion-wrap`, bumped `.ready-companion-img` to `z-index: 2`, particles sit at `z-index: 1` — truly behind the companion

---

## 4. Successes

**S1 — Hold-to-confirm as a unified system**
- Fill animation, shake animation, and particle spawning all run off the same `isHolding` state and `holdTimerRef` — one state flag drives the entire interaction.

**S2 — `Math.sin` hue hint arc**
- `Math.sin(progress * Math.PI)` naturally produces a 0→peak→0 curve with easing built in. Zero extra math needed for smoothing.

**S3 — View Transitions API with `flushSync`**
- `document.startViewTransition(() => flushSync(action))` is the correct React integration pattern. `flushSync` forces the DOM commit to happen synchronously inside the transition callback so the browser can diff before/after correctly. The companion morphs between all three screens with zero manual position math.
