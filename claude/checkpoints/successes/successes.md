# Successes
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Last updated:** Checkpoint 12 (2026-04-01)

All success entries are recorded chronologically. Each entry captures what was prompted or decided, and why it worked.

---

## CP01 — Scaffold

**S1 — Test page request**
- Prompt: *"please build me a very quick test page with a single button action that keeps a record of clicks and celebrates each click"*
- Result: User accepted the implementation without revision — dark monospace click counter with rotating celebration messages. Confirmed React useState was working.

**S2 — Checkpoint system proposal**
- Prompt: *"moving forward lets define checkpoints before we commit..."*
- Result: User approved the 4-section checkpoint format (Context Resume, Human Directions, Records of Resistance, Successes) and asked to generate checkpoint-01 immediately.

---

## CP02 — Design Intent

**S1 — PRD quality**
- The student wrote a complete, specific Design Intent before any design code was written — exact colors (30–70% monochromatic), specific hover behavior (40% blur, slide off-screen), non-negotiables listed. This is the standard the assignment is graded against.

**S2 — Clarifying question before building**
- Prompt: Claude asked "iOS app feel in browser, or fixed phone dimensions?"
- Result: Student confirmed portrait/phone dimensions — saved us from building the wrong layout entirely.

---

## CP03 — 3D Turntable Carousel

**S1 — Grid as shared language**
- The toggleable grid overlay (G key) became the primary communication tool for pixel-precise positioning. Instead of vague descriptions ("lower it a bit"), both student and Claude referenced exact pixel values. This eliminated ambiguity and reduced back-and-forth.

**S2 — Carousel direction confirmed before build**
- Before writing any carousel code, Claude confirmed 3D vs. flat with the student. The student said "3D" then "confirm." No wasted implementation.

**S3 — Clean architecture for carousel**
- `position` prop (`'center'` / `'left'` / `'right'`) is the single source of truth for each card's visual state. CSS does the rest. No JavaScript style calculations, no inline transforms — all handled by class selectors. Easy to tune visually without touching logic.

---

## CP04 — Carousel Polish

**S1 — Grid as pixel-precise communication**
- Student used the grid center crosshairs to confirm card centering, letter centering, and info panel placement — no ambiguity in back-and-forth.

**S2 — Info panel hierarchy**
- Equal spacing (14px) between the three major elements (name / subject block / quote), with tighter internal spacing (4px) between main subject and sub-subjects — creates clear visual grouping without extra markup.

---

## CP05 — Background, Contrast, Phone Scaling

**S1 — Phone scaling with no layout breakage**
- CSS `min()` inside `transform: scale()` scales the entire phone as a unit — all internal absolute pixel positions remain correct at any viewport size. Zero layout changes needed inside the phone.

**S2 — Reference analysis**
- Reviewed all three reference images and produced a prioritized list of visual gaps vs. current screen. Key findings informed direction for Stage 2 and beyond.

**S3 — Monochromatic background**
- Single CSS filter `grayscale(100%) opacity(25%)` desaturates and dims the pixel landscape in one line — no image editing required, easy to adjust.

---

## CP06 — Layout Centering & Typography

**S1 — Unified card aspect ratio**
- All three cards look identical in shape (just different sizes) — removing card-info from side cards eliminated the taller/shorter mismatch between center and side cards.

**S2 — Typography hierarchy maintained through changes**
- After multiple font size passes (5% increase, quote font swap, revert, +10%), the visual hierarchy remains intact: name (bright, large, pixel) → subject (mid, bold, sans) → sub-subjects (dim, small, sans) → quote (60% white, italic, sans).

---

## CP07 — End of Stage 1

**S1 — Stage 1 complete**
- All Stage 1 goals met: carousel rotates smoothly, monochromatic values only, composition centered, text hierarchy clear, pixel background adds world context without competing with UI. Screen is ready to receive character artwork.

**S2 — Production pipeline established**
- Student added a formal 5-stage pipeline to the PRD. This gives clear scope for future sessions: Stage 2 (character art + color), Stage 3 (idle animation), Stage 4 (color customization), Stage 5 (naming + personality).

---

## CP08 — Stage 2: Companion Art, Color System, Dev Toggles

**S1 — Companion art quality**
- All three Gemini-generated pixel art companions matched the reference style exactly: white background, centered, full body, pixel resolution. Dropped in with zero resizing needed.

**S2 — Toggle system architecture**
- The companion ID class system (`companion-${id}`) on both card and info panel creates a clean, extensible color system. Adding a new companion's colors = 3 CSS rules. No JS logic changes needed.

**S3 — Stage 2 underway**
- Character art live. Color system built. Dev toggle suite active. Clean foundation for animation work in Stage 3.

---

## CP09 — End of Stage 2

**S1 — Full color system built before art finalization**
- Per-companion color tinting works across card, info panel text, and SELECT button simultaneously — all driven by a single `colorVisible` state and CSS class.

**S2 — Dev toggle suite**
- 4 toggles (GRID, COLOR, VISIBILITY, CARDS) give real-time design exploration without touching code — useful for Stage 3 decisions.

**S3 — SELECT button width decision**
- "Not what I meant, but I'm not mad at it" — `width: calc(100% - 60px)` was a happy accident the student approved, making the button feel grounded and intentional rather than floating.

---

## CP10 — End of Stage 3: Animation

**S1 — Lightweight animation**
- Pure CSS keyframe animation — zero JavaScript, zero libraries. Runs on GPU via transform, performant on mobile.

**S2 — Clean separation of always-on vs. toggle-dependent styles**
- `data-companion` attribute handles permanent per-companion rules (art scale, future art adjustments).
- `companion-${id}` class handles toggle-dependent rules (color tints).
- Two systems, clean separation, no conflicts.

---

## CP11 — End of Stage 4: Customization

**S1 — Target-hue slider formula**
- `(sliderValue - baseHue + 360) % 360` cleanly maps any slider position to the correct visual output hue, regardless of each companion's natural color. Works for all three companions without per-companion special casing.

**S2 — Clean screen state machine**
- Three-state `gameScreen` flag (`select` → `confirm` → `customize` → `select`) keeps screen transitions simple and predictable with no intermediate or broken states.

---

## CP12 — Ready Screen, Color Lock, Alternate Art

**S1 — Centering via absolute title extraction**
- Pulling `.customize-title` out of the flex flow with `position: absolute` (rather than adding spacers or padding hacks) cleanly solved the centering problem while keeping the title visually anchored at the top.

**S2 — readyImage field on companion data**
- Adding `readyImage` directly to the companion data object (rather than a separate lookup map or conditional logic in the component) kept the ready screen JSX simple: just `selectedCompanion.readyImage`.

**S3 — Locked hue carries through to ready screen**
- `lockedHue` state is set at the moment SELECT is pressed on the customize screen, then used for the hue filter on the ready screen image — clean separation from the live slider value `companionHue`.

---

## CP13 — End of Stage 4

**S1 — Resistances & Successes log system**
- Compiling all prior checkpoint entries into two running log files gives a single exportable document for the assignment's Records of Resistance and AI Direction Log deliverables — no manual copy-paste needed at submission time.

**S2 — Permissions whitelist**
- Applying the instructor's settings.json whitelist eliminates permission prompts for all routine operations, reducing friction for the rest of the project.

---

## CP14 — Small Tweaks

**S1 — Backdrop blur contrast improvement**
- Single reusable `.companion-backdrop` class handles all three screens (carousel, customize, ready) — no per-screen special casing needed beyond sizing.

**S2 — Quote margin fine-tuning**
- Student used iterative 5px nudges to dial in spacing precisely — clean workflow for pixel-level adjustments.

---

## CP15 — More Tweaks

**S1 — Hue-reactive buttons**
- SELECT and START buttons now reactively tint to the companion's chosen hue using `hsla()` inline styles — consistent visual language across all three screens.

**S2 — Accessibility color lift**
- All three companion accent colors were brightened to be legible on the dark background without changing the hue identity of each companion.

**S3 — Info panel space-between**
- Using a calculated fixed height (131px) for the info panel allowed `justify-content: space-between` to evenly distribute the three text groups while keeping name and quote exactly where they were.

---

## CP16 — Halfway Through Stage 5

**S1 — Unified button position across all screens**
- All three primary action buttons now sit at exactly the same position on every screen — muscle memory consistent, visually clean.

**S2 — Dynamic Island pill only**
- Transparent status bar + black pill only gives the iPhone illusion without blocking any screen content with a solid black bar.
