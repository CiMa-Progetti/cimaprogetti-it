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
