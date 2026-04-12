---
name: Custom Cursor Feature Implementation
description: Custom cursor with hug behavior and click bounce animations using GSAP
type: project
---

**Feature**: Custom cursor with smooth tracking, element hug behavior, and click animations

**Implementation details**:
- Component: `/frontend/src/components/CustomCursor.tsx` — "use client" component
- Styling: CSS rules added to `/frontend/src/app/globals.css`
- Layout integration: Loaded via `next/dynamic` with `ssr: false` in `/frontend/src/app/layout.tsx`

**How it works**:
- 35px white donut ring cursor (white fill + 2px outline with 1px gap)
- Smooth tracking with `gsap.quickTo` (0.15s duration, power2.out easing)
- Device detection: requires `(pointer: fine)` and `prefers-reduced-motion: no-preference`
- Event delegation (no DOM caching) — uses `closest('[data-cursor="hug"]')` for element detection

**Hug behavior** (on elements with `data-cursor="hug"`):
- Element with transparent background: cursor fills element (opacity 0.15 as fill), applies blue glow to element
- Element with visible background: cursor becomes oversized glow border around element
- Both: scale element to 1.05 during hover, restore on leave
- All animations use GSAP timelines (0.3s duration, power3.out easing)

**Click bounce**:
- `mousedown`: scale 0.95 (0.1s, power2.in)
- `mouseup`: scale 1.08 (0.15s, back.out(2)), then scale 1.05 (0.3s, power2.out)

**Elements with hug behavior** (data-cursor="hug" added to):
- HeroSection: both CTA links
- Navbar: desktop nav links + desktop "Contattaci" button (NOT mobile menu)
- CtaSection: "Contattaci" button
- contatti/page.tsx: phone number and email links (prominent ones only)

**Styling rules**:
- Native cursor hidden on desktop via media query (pointer: fine)
- `.cursor-hugged` class applies `box-shadow: 0 0 25px rgba(0, 1, 187, 0.25)` during hug state
