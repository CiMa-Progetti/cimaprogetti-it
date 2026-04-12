# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CiMa Progetti marketing website — Italian digital services company. Frontend-only, no backend.

## Commands

All commands run from `frontend/`:

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint (eslint-config-next with core-web-vitals)
```

No test framework is configured.

## Architecture

**Stack**: Next.js 16.2.2 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS 4, GSAP 3.14.2

**Performance-critical pattern**: The homepage (`src/app/page.tsx`) is a **Server Component**. Only `HeroSection` renders server-side for fast FCP/LCP. All other sections are dynamically imported with `ssr: false` via `HomeSections.tsx` (client component), so GSAP and section code only load after initial paint.

**GSAP ScrollTrigger** is registered once in `useGsapScrollTrigger.ts` hook. Individual section components must NOT call `gsap.registerPlugin(ScrollTrigger)` — they rely on the parent `HomeSections` calling the hook before they mount.

**HeroSection uses CSS animations, not GSAP** — the headline uses `hero-slide-up` (transform only, no opacity) so LCP fires immediately. CTA buttons use `hero-fade-up` with staggered delays. These keyframes are in `globals.css`.

**Material Symbols font** is NOT in `<head>`. It's loaded lazily via `MaterialSymbolsFont.tsx` component (useEffect injection) — included in `HomeSections.tsx` and `contatti/page.tsx` only.

**Lazy loading**: `LazySection` component wraps content with IntersectionObserver (threshold 0.1, rootMargin 50px) and shows `SkeletonWave` placeholders until visible.

## Design System

Tailwind theme tokens are defined inline in `globals.css` via `@theme`. Primary color: `#0001bb`. Material Design 3-inspired color tokens (background, surface, primary, secondary, error + on-* variants).

Custom utility class `text-huge` uses `clamp(2rem, 8vw, 8rem)` for responsive headlines.

Scroll snap: `.snap-container` (y proximity) + `.snap-section` (align start) on homepage sections.

## Navbar

**Responsive breakpoints**: The navbar uses `lg` (1024px) as the mobile/desktop toggle. Between `lg` and `xl` (1280px), text sizes, gaps, and padding scale down to prevent overflow. Mobile (<1024px) has compact padding and logo.

**Active section indicator**: Scroll-based detection (not IntersectionObserver — sections are dynamically imported with `ssr: false` so they don't exist at mount time). A sliding `h-1 bg-primary` bar under the desktop nav links animates between sections using CSS transitions. Only visible on homepage (`pathname === "/"`). Recalculates position on scroll state change and window resize.

## Custom Cursor (`CustomCursor.tsx`)

A GSAP-powered custom cursor rendered in `layout.tsx` (direct import, not `next/dynamic` — `ssr: false` is not allowed in Server Component layouts in Next.js 16). Desktop-only (`pointer: fine`), disabled for `prefers-reduced-motion`.

**Default shape**: Terminal-style block (22×22px, 5px radius), white fill + 2px outline ring with 1px gap. Uses `mix-blend-mode: difference` for automatic color inversion against any background.

**Mouse tracking**: Uses `gsap.to` with `overwrite: "auto"` for all positioning. Does NOT use `gsap.quickTo` — it conflicts with `gsap.to` on the same x/y properties during morph transitions (causes "not eligible for reset" errors).

**Three interaction modes** (opt-in via `data-cursor` attribute):

### `data-cursor="hug"` — Hug mode
- Cursor morphs into a transparent outline frame around the element with 6px padding
- Element scales to 1.05 with glow (`box-shadow` via `.cursor-hugged` class in `globals.css`)
- Click bounce: mousedown → scale(0.95), mouseup → scale(1.08) → scale(1.05) spring
- Border-radius resolved from element, then first child (for wrapper divs like the About photo), fallback to pill (`100px`)
- Used on: hero CTAs, navbar desktop links + Contattaci button, CtaSection button, contatti page phone/email links, footer social icons, About section photo

### `data-cursor="underline"` — Underline mode
- Cursor morphs into a 3px-tall bar under the `<h3>` question text
- Used on: FAQ section question items

### FAQ split/merge (underline + block cursor)
- When a FAQ accordion opens (`data-faq-open` attribute detected via MutationObserver):
  1. A phantom div takes over the underline position (stays as visual anchor)
  2. Main cursor pulses (thickens to 6px), then peels off as a block cursor
  3. Block cursor is free to follow the mouse through the answer text
- When the FAQ closes: block cursor flies back up to the underline, phantom fades out, cursor becomes the underline again
- Switching FAQs: block cursor flies directly to the new question's underline

### Shared behaviors
- **Rubber-band pull**: While morphed (hug or underline), cursor applies 15% of mouse-to-element-center distance as pull offset. Gives an elastic "trying to follow" feel.
- **Scroll tracking**: `scroll` event recalculates morph position from `getBoundingClientRect()`. Both the main cursor and phantom underline update on scroll.
- **Z-index**: Walks the full ancestor chain and uses the highest explicit z-index + 1. Navbar elements get z-51 (above backdrop blur). Body content gets z-1 (below navbar). Default circle mode stays at z-9999.
- **Edge cases**: Cursor hidden until first mousemove. Fades out when mouse leaves window. Event delegation via `closest()` — no cached DOM refs (SPA-safe).

### Files involved
- `src/components/CustomCursor.tsx` — All cursor logic (self-contained client component)
- `src/app/globals.css` — `cursor: none` media query, `.cursor-hugged` glow class
- `src/app/layout.tsx` — Renders `<CustomCursor />` as last child in `<body>`
- `src/components/sections/FaqSection.tsx` — `data-cursor="underline"`, `data-faq-open` attribute

## Key Conventions

- Path alias: `@/*` maps to `./src/*`
- Language: Italian (`lang="it"`) — all UI copy is in Italian
- Inter font loaded via `next/font/google` (self-hosted, auto-subsetted)
- Images use `next/image` with AVIF/WebP formats, 1-year cache TTL
- `prefers-reduced-motion` is respected globally in CSS
- Pages: `/` (homepage), `/contatti` (contact page)

## Agents

This project uses specialized subagents (defined in `.claude/agents/` and `frontend/.claude/agents/`). Each has persistent memory and a focused role. The user expects you to delegate to these agents rather than doing everything inline.

### Typical workflow

1. **brainstormer** — Launched first when a feature request is vague or has gaps. Asks the user 3-5 targeted questions to clarify requirements, edge cases, mobile behavior, and data flow. Produces a structured spec. Does not write code.

2. **task-planner** — Takes a clarified feature (from brainstormer or a clear user request) and analyzes the codebase to produce a detailed task breakdown: file paths, dependencies, acceptance criteria. Runs on Opus. Does not write code.

3. **frontend-dev** — Executes well-defined frontend tasks from the planner. Reads existing code first, then implements. Next.js App Router, TypeScript, Tailwind. Runs on Haiku for speed. No planning, no extras.

4. **aspnet-backend-dev** — Same as frontend-dev but for C# ASP.NET backend tasks. Implements endpoints, services, repos, middleware. Follows existing DI/pattern conventions. Runs on Haiku. (Backend not yet present in this repo.)

5. **commands-master** — Handles package management: installing, removing, updating dependencies, resolving conflicts, auditing vulnerabilities. Lives in `frontend/.claude/agents/`. Runs on Haiku. Does not write application code.

6. **validation-tester** — Final step after any coding work. Runs `npm run build`, checks for TypeScript errors, runs tests if they exist, and produces a structured error report if anything fails. Runs on Opus. Never modifies production code.

7. **git-master** — Commits, pushes, resolves merge conflicts, fixes detached HEAD / rebase issues. Uses conventional commit format `type(scope): description`. Runs on Haiku. Never force-pushes without explicit instruction.

### When to use which

- Ambiguous request -> **brainstormer** -> **task-planner** -> **frontend-dev** / **aspnet-backend-dev** -> **validation-tester** -> **git-master**
- Clear implementation task -> **frontend-dev** or **aspnet-backend-dev** directly -> **validation-tester**
- Need a new package -> **commands-master**
- Commit and push -> **git-master**
- Build broke after changes -> **validation-tester** to diagnose
