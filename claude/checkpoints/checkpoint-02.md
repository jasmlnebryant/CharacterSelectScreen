# Checkpoint 02 — Design Intent Locked
**Date:** 2026-03-29
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Design Intent written and confirmed. Ready to build.

---

## 1. Context Resume

The student has written and submitted their Design Intent (PRD) for the Edumon character select screen. This is the creative spec that all AI output will be evaluated against. No design or component code has been written yet.

**The project:** Edumon is a gamified educational app for American high school students. This screen is where players choose their learning companion before the experience begins.

**Design Intent summary:**
- **Screen title:** "Choose who will you learn with"
- **Mood:** Cool, snappy, game-like. Gen-Z — meme culture, sports, social connection. Never sluggish.
- **3 companions (horizontal row):**
  - Vexor — Math (Algebra, Geometry, Calculus) — Fierce — *"Precision is power."*
  - Atomix — Science (Biology, Chemistry, Physics) — Bubbly/Playful — *"Every answer is an experiment."*
  - Archaeon — History (World History, US History, Government) — Steampunk — *"The past is a puzzle waiting to be solved."*
- **Typography:** 8-bit pixel font for headers/titles; legible sans-serif for body. Header centered at top, body copy at 60% of header size.
- **Color:** Monochromatic only (30–70% value range) until character art is finalized.
- **Layout:** Three companions side by side horizontally. Single page. No routing. No backend.
- **Images:** Placeholder 1:1 aspect ratio for now — student will provide final character art later.
- **Hover behavior:** Hovered hero expands + takes focus. Unhovered heroes slide partially off-screen. Background: 40% blur on hover. Transitions: snappy and instant.
- **Selection behavior:** Selected hero dominates screen. Unselected heroes disappear.
- **Non-negotiables:** 8-bit identity consistent throughout. Transitions never sluggish. Each hero feels distinctly different in personality.
- **Form factor:** Looks and feels like a mobile iOS screen — portrait orientation, phone dimensions, rendered in browser.

**What is pending:**
- Build React components from Design Intent
- Source or generate 8-bit pixel font
- Create placeholder 1:1 images for each companion
- Wire up hover and selection state in React

---

## 2. Human Directions

Steps to reproduce this exact state from scratch:

1. Complete all steps from Checkpoint 01 (scaffold, npm install, GitHub Desktop push, Pages → GitHub Actions)
2. Add `claude/docs/Edumon PRD - CharacterSelectScreen.md` to the repo
3. Read the PRD — Design Intent is locked, no design code written yet
4. Confirmed with student: the screen should look and feel like a mobile iOS screen (portrait, phone dimensions) rendered in the browser
5. No components or styles have been written — next step is building from the spec

---

## 3. Records of Resistance

**R1 — iOS screen clarification**
- Proposed (implicit): The PRD said "iOS app screen" which could mean many things
- Resistance: Claude asked for clarification before assuming responsive web vs. fixed phone dimensions
- Decided: Portrait orientation, phone dimensions, rendered in browser — like holding a phone

*(See also Checkpoint 01 for earlier resistance records)*

---

## 4. Successes

**S1 — PRD quality**
- The student wrote a complete, specific Design Intent before any design code was written — exact colors (30–70% monochromatic), specific hover behavior (40% blur, slide off-screen), non-negotiables listed. This is the standard the assignment is graded against.

**S2 — Clarifying question before building**
- Prompt: Claude asked "iOS app feel in browser, or fixed phone dimensions?"
- Result: Student confirmed portrait/phone dimensions — saved us from building the wrong layout entirely.
