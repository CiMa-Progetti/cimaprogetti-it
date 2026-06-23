# CiMa Progetti — Design System

A living design system for **CiMa Progetti S.r.l.s.** — a young Italian digital studio
(Rome) working at the intersection of humans and AI. Their positioning: *"a fair
integration between humans & AI, without substitution."* Work spans from low-level
cutting-edge engineering (AI-driven kernels & operating systems — *CiMa OS* underway)
through to AI chatbots, agents, and websites. The bread-and-butter product today is
**digital architecture for MSMEs & professionals**: websites, e-commerce, dashboards,
automations, and cybersecurity.

Founders: **Nicola Leone Ciardi** (Co-Founder & CEO) and **Valentina Madaudo**
(Co-Founder & CFO). The brand name itself encodes them — **Ci**ardi + **Ma**daudo = **CiMa**.

This system distills their real, shipped brand: the electric-blue-on-paper marketing
site and the architectural, monospace-driven visual language behind it.

---

## Sources (what this was built from)

All sources were provided as read-only mounts. Listed so a future maintainer can
re-derive or extend the system.

| Source | What it is | Role here |
|---|---|---|
| `cima.it/` codebase | Next.js 16 + React 19 + Tailwind v4 marketing site (the live product) | **Canonical source of truth** for tokens, components & the UI kit |
| `CiMa Progetti.fig` (Figma) | Full site design file — light ("chiara") + dark ("scuro") variants, error pages, palette | Visual cross-reference; light variants match the live site |
| `design-system/` codebase | Prince XML **PDF document** boilerplates (preventivi, documenti, verbali, contratti) | Print/document side of the brand; token parity confirmation |

Key files referenced: `cima.it/frontend/src/app/globals.css` (the `@theme` tokens),
`src/components/sections/*` (Hero, Services, Approccio, About, Faq, Cta, Quote),
`src/components/{Navbar,Footer}.tsx`, `src/app/contatti/page.tsx`. Brand assets
(logo, wordmark, favicons, team/architecture/contatti photos, paper texture) were
copied verbatim from `cima.it/frontend/public/` into `assets/`.

> **Note on fonts.** The site uses **Helvetica Neue** (a licensed system face) for body,
> with the native `Helvetica → Arial` fallback — so no webfont is shipped for it; on
> machines without Helvetica Neue the Arial fallback renders, exactly as production
> intends. **IBM Plex Mono** (the display/heading face) and **Material Symbols Outlined**
> (icons) are loaded from Google Fonts. If you want pixel-exact Helvetica Neue everywhere,
> supply a licensed webfont and add an `@font-face` to `tokens/fonts.css`.

---

## Content fundamentals — how CiMa writes

- **Language: Italian.** All product copy is `it`. UI labels, headings, CTAs — Italian.
  Job titles and a few technical bios appear in English ("Co-Founder & CEO",
  "Jr Engineer & economist for sustainable development").
- **Address: informal "tu" to the client, "noi" for CiMa.** "Porta in cima il tuo
  business", "Progettiamo insieme il prossimo tassello digitale **della tua** azienda",
  "Trasformiamo **le tue** idee". The studio speaks as a confident partner, not a vendor.
- **Tone: architectural, structural, technical-but-warm.** The governing metaphor is
  *building/architecture*: "infrastrutture digitali portanti", "ogni riga di codice è
  un pilastro", "La forma segue la funzione. La struttura la rende duratura",
  "precisione millimetrica", "Solido come cemento armato, fluido come un open-space".
- **AI framed as leverage, never replacement.** "Usiamo l'IA come leva per accelerare…
  senza sostituire il valore umano." Human judgement stays in charge.
- **Casing is a deliberate device.**
  - *lowercase* mono for calm section headers: "ecosistema integrato", "servizi essenziali".
  - *UPPERCASE BLACK* sans for loud statements & big nouns: "SYSTEM UPGRADE", "CONTATTI",
    "POTENZIA I TUOI PROCESSI", "PRIMA / DOPO".
- **Punchy, fragmentary rhythm.** Short declaratives, frequent line breaks, em-stops:
  "Dall'idea ai processi. Dalla visione al sistema." "Servizi essenziali. Impatto concreto."
- **Brand wordplay.** A surname's first two letters are highlighted blue — Ni­cola Leone
  **Ci**ardi, Valentina **Ma**daudo — reinforcing **CiMa**. The wordmark renders "cima_"
  with a trailing terminal underscore (a nod to the CLI / engineering roots).
- **No emoji.** The brand never uses emoji. Iconography is Material Symbols only.
- **Marketing claims** lean on the "transizione 5.0" framing, "garanzia completa",
  partner language ("partner tecnico e strategico").

---

## Visual foundations

**Palette.** A high-contrast, almost monochrome base — warm off-white **paper**
(`#fcf9f8`), near-black **ink** (`#1b1c1c`) — punctuated by a single unapologetic
**electric blue** (`#0000ff`) and a "concrete" **dark** (`#282828`) for inverted
sections. A warm-gray Material surface ramp carries cards and dividers. **Maroon**
(`#720001`) is reserved for the print/document side (seals, contract accents). Error
red `#ba1a1a`. Blue is used confidently and at full saturation — for CTAs, accent
words inside headings, the under-heading rule, full-bleed banner/CTA sections, and
link hovers. See `tokens/colors.css`.

**Typography.** Two voices (see `tokens/typography.css`):
- **IBM Plex Mono, Bold** — all display & section headings, the hero, the wordmark
  feel. Tracking is tight (`-0.02em`/`-0.04em`). Usually lowercase.
- **Helvetica Neue / Arial** — body, leads, UI, labels. The *Black 900* weight of the
  sans handles UPPERCASE statement headlines and big contact numbers.
- Eyebrows are tiny, bold, UPPERCASE, wide-tracked (`0.1em`–`0.4em`).
- Fluid `text-huge` = `clamp(2rem, 8vw, 8rem)` for page titles.

**Spacing & layout.** Generous architectural rhythm — sections `py-24`→`py-32`,
content capped at `max-w-7xl` (80rem), side padding `1.5rem`→`3rem`. Grids with
hairline gaps (`gap: 1px` over a divider color) create the "blueprint" panel look
(Before/After, people grid). See `tokens/spacing.css`.

**Corners, borders, shadows.** One brand radius: **10px** on cards, buttons, inputs,
images. Accent bars and image blocks stay **sharp (0)**. Borders are either fine
hairlines (`#e4e4e7` / `outline-variant`) or a confident **2px ink** outline (outline
buttons, name badges). Shadows are restrained: `shadow-lg` on the team photo, a soft
`shadow-sm` on the scrolled navbar, and a signature **blue glow**
(`0 0 25px rgba(0,1,187,0.25)`) on hovered interactive elements (the custom cursor's
"hug" state).

**Backgrounds.** The page canvas is the paper color overlaid with a subtle
**`body-texture.webp`** (a faint paper grain, `background-size: cover`, fixed). Dark
sections are flat `#282828`. Blue sections are flat `#0000ff`. No gradients as decoration.

**Imagery.** Architectural and human. Structural/building shots are rendered
**grayscale** with a barely-there blue multiply tint (`opacity ~0.05`); people/team
shots run in full color. Rounded 10px frames, often `shadow-lg`.

**Motion.** GSAP ScrollTrigger drives the live site; entrances are **fade-up + slide-up**
(`y: 30–80 → 0`, `opacity 0 → 1`) with `power3.out` easing
(≈ `cubic-bezier(0.33, 1, 0.68, 1)`) and ~0.15s staggers. The hero headline slides up
(transform only, for LCP). A scroll-down chevron loops gently. **Hover** = color
inversion (filled blue button → blue outline) or opacity drop; **press** = `scale(0.98)`.
A bespoke **block cursor** (terminal-style, `mix-blend-mode: difference`) morphs to
"hug" elements (`data-cursor="hug"`) or underline FAQ questions (`data-cursor="underline"`).
`prefers-reduced-motion` is fully respected.

---

## Iconography

- **Material Symbols Outlined** (Google) is the brand's **only** icon system — loaded
  lazily on the live site, here via Google Fonts in `tokens/fonts.css`. Default is the
  outlined (unfilled) style at weight 400, optical size 24. Use the
  [`<Icon>`](components/icons/) component (`<Icon name="memory" />`).
- Icons seen in production: `memory`, `schema`, `verified_user`, `hub`, `shopping_bag`
  (services); `architecture`, `domain` (before/after); `call`, `mail` (contatti); plus
  `add` for the FAQ "+" toggle and an arrow chevron for the scroll cue.
- **No emoji, ever.** **No hand-rolled SVG glyphs** for UI icons — only the social
  brand marks (Facebook / Instagram / LinkedIn / TikTok) are inline SVG, copied from
  the footer source.
- Logos are real SVGs in `assets/`: `logo.svg` (dark stacked mark), `logo-white.svg`
  (white), `inline-logo.svg` (the inline blue **cima_** wordmark with terminal
  underscore), `favicon-light.svg` / `favicon-dark.svg`.

---

## Index / manifest

**Global CSS** — link `styles.css` (it `@import`s everything below):
- `tokens/fonts.css` — IBM Plex Mono + Material Symbols, `.material-symbols-outlined`
- `tokens/colors.css` — brand core, surface scale, neutrals, semantic aliases
- `tokens/typography.css` — families, weights, scale, line-height, tracking
- `tokens/spacing.css` — spacing, radius, borders, shadows, layout, motion
- `tokens/base.css` — body texture, `.text-huge`, `.accent-bar`, brand keyframes
- `components/components.css` — class styling for the React primitives

**Components** (`components/<group>/` — React, `import` from the compiled bundle as
`window.CiMaProgettiDesignSystem_046b2a`):
- `buttons/` — **Button** (primary · outline · white · outline-light; sizes; caps toggle)
- `icons/` — **Icon** (Material Symbols wrapper)
- `typography/` — **Eyebrow**, **SectionHeading**
- `cards/` — **ServiceCard**, **NameBadge**
- `comparison/` — **BeforeAfter** (Prima / Dopo)
- `disclosure/` — **FaqItem** (accordion)
- `brand/` — **Logo** (dark · white · wordmark)

**UI kits** (`ui_kits/`):
- `website/` — interactive recreation of the **cima.it** marketing site (Home + Contatti,
  navbar, footer). Entry: `ui_kits/website/index.html`.

**Foundation cards** (`guidelines/`) — specimen cards that populate the Design System
tab (Colors, Type, Spacing, Brand).

**Assets** (`assets/`) — logos, favicons, wordmark, team/architecture/contatti photos,
paper texture.

**`SKILL.md`** — makes this folder usable as a downloadable Claude Agent Skill.
