# TAZROUT WEBSITE — AGENT CONTEXT
> **Read this entire file before executing any task.**
> You are Antigravity, working on the `beta` branch of the Tazrout website.

---

## WHAT THIS WEBSITE IS

The Tazrout website is the **public-facing project website** for a smart irrigation system
built by a student team at the National School of Cyber Security, Algeria.

It is **not** the Flutter dashboard — it is the presentation layer: a modern, animated,
3D-accented site that introduces the project, showcases the system, and serves as the
team's professional face for evaluators, professors, collaborators, and the public.

Think: GitHub Pages × Linear.app × Luma AI.

**Hosted on Vercel (free tier). Beta branch = beta deployment.**

---

## READ THIS FIRST — YOUR REFERENCE MATERIALS

Before writing a single line of code, read the following folders.
They contain everything you need to make faithful, accurate decisions.

```
_references/
├── design-system/         ← Color tokens, typography scale, spacing, shadows (Flutter source files)
├── dashboard-ui/
│   ├── dark/              ← Dashboard screenshots — dark theme (all screens)
│   └── light/             ← Dashboard screenshots — light theme (all screens)
├── amazigh/
│   ├── patterns/          ← SVG strip patterns (use as section dividers)
│   ├── symbols/           ← Berber symbol SVGs (Wisdom, Balance, Eye, Unity, Life, Fertility)
│   └── tifinagh/          ← Tifinagh glyph SVGs (T, A, Z, R, O, U, T)
└── technical-docs/
    ├── architecture/      ← Full system architecture reports
    ├── backend/           ← Spring Boot API docs, DB schema
    ├── frontend/          ← Flutter screen flow docs
    ├── mqtt/              ← MQTT broker config, topic tree, payload schemas
    ├── hardware/          ← ESP32 firmware docs, LoRa specs, Raspberry Pi setup
    └── readme-files/      ← README files from firmware, backend, and mobile repos
```

### How to use these references:

- **design-system/** → Extract exact color hex values, font sizes, spacing units into `tailwind.config.ts` and `globals.css`. Do not guess or approximate brand colors.
- **dashboard-ui/** → Use screenshots for the `/dashboard` gallery, hero 3D mockup reference, and system preview section. Use them to understand the visual language.
- **amazigh/** → Use SVG patterns as `<AmazighDivider>` section separators. Use symbols as feature card icons. Use tifinagh glyphs in the hero.
- **technical-docs/** → Read architecture docs before writing `/system` page content. Read MQTT docs before writing protocol descriptions. Read hardware docs before writing sensor descriptions. Use real component names, real protocols, real specs — not generic placeholders.
- **readme-files/** → Extract real project descriptions for partner cards and documentation stubs.

### If reference files are missing:
List exactly what is missing in your session report. Use accurate placeholders
(e.g. `/* COLOR: check _references/design-system/app_colors.dart */`)
and leave `<!-- TODO: team to provide -->` comments in content. **Never invent specs.**

---

## BETA SCOPE — READ BEFORE BUILDING

See `BETA_SCOPE.md` for the full priority list.

**P0 — Must ship in beta:**
- Full `/help` page (this is the primary deliverable)
- Core layout (Navbar, Footer, PageTransition)
- Design token system (tailwind + CSS vars)

**P1 — Ship in beta:**
- Home Hero (Three.js particles + cursor glow)
- Home Features Grid

**P2/P3 — Best effort, placeholder-ok:**
- Remaining home sections, /system, /about, /dashboard, /docs

Do not spend time on post-beta content (real bios, real screenshots, real docs).
Focus on architecture, polish, and the help page.

---

## TECH STACK

| Layer | Technology |
|---|---|
| Framework | **Next.js 14** (App Router) + **TypeScript** — `.ts`/`.tsx` only, no `.js` files |
| Styling | **Tailwind CSS** (utility-first) |
| Animations | **Framer Motion** (scroll reveals, page transitions) + **GSAP** (magnetic buttons, timelines) |
| 3D | **React Three Fiber** + **@react-three/drei** |
| Icons | Lucide React + inline SVG from `_references/amazigh/` |
| Fonts | Inter (body) + Poppins (headings) via `next/font/google` |
| Content | MDX via `next-mdx-remote`, data via JSON files in `/content/` |
| Deployment | Vercel |

---

## DESIGN DIRECTION

### Visual Identity — Non-negotiable

The website must feel **native to Tazrout**. Draw from the design system in `_references/design-system/`.

**Color baseline (override with exact values from design system files):**
- Background deep: `#141C16`
- Background mid: `#182319`
- Card surface: `#243128`
- Primary green: `#4CAF50`
- Accent green: `#258439`
- Error/alert: `#E94E31`
- Chart blue: `#549DF6`
- Chart amber: `#FFB74D`

**Typography:**
- Body: Inter
- Headings: Poppins
- Decorative: Tifinagh SVG glyphs (not a font — use SVG files from `_references/amazigh/tifinagh/`)

**Amazigh elements — mandatory, not optional:**
- SVG strip patterns as `<AmazighDivider>` between every major section
- Berber symbol SVGs as feature card icons (read from `_references/amazigh/symbols/`)
- Tifinagh glyphs in the hero section (T A Z R O U T, staggered fade-in)

### 3D + Animation Requirements

The site must feel **premium and alive**. Reference: Linear.app, Vercel.com, Luma AI.

| Effect | Implementation | Where |
|---|---|---|
| Floating Amazigh particles | Three.js `Points` geometry, Amazigh-geometric shapes | Hero |
| Cursor-following glow | Radial gradient tracking `mousemove` | Hero, dark sections |
| Dashboard 3D float | `@react-three/drei` `Float` + perspective tilt | Hero |
| Scroll-triggered reveals | Framer Motion `whileInView` + stagger | All sections |
| Parallax layers | Framer Motion `useScroll` + `useTransform` | Hero bg layers |
| Magnetic CTA buttons | GSAP `mousemove` attraction effect | All primary CTAs |
| Number count-up | Framer Motion animate on viewport enter | Stats bar |
| Page transitions | Framer Motion `AnimatePresence` | Route changes |
| Frosted glass navbar | `backdrop-blur-md` + `bg-brand-deep/70` | Navbar |

---

## SITE STRUCTURE

```
/          → Hero + Features + Stats + System Preview + Architecture + Team Teaser
/about     → Project origin + Full team grid + Partner projects
/system    → How it works (step flow) + Tech stack visual + Architecture diagram
/dashboard → Screenshot gallery + Feature walkthrough
/docs      → MDX documentation hub
/help      → FAQ accordion + Quick start + Contact card  ← BETA PRIORITY
```

### Navigation
- Fixed top navbar, frosted glass (`backdrop-blur-md bg-brand-deep/70`)
- Logo: Tazrout wordmark + Tifinagh glyphs (SVG from `_references/amazigh/tifinagh/`)
- Links: Home · About · System · Dashboard · Docs · Help
- Active state: `brand-primary` underline
- Mobile: hamburger → slide-in drawer (Framer Motion)

---

## PAGE SPECS

### /help — BETA PRIORITY (build first, build completely)

1. **Page hero** — dark gradient banner, "Help & Support" heading, Tifinagh accent
2. **FAQ Accordion** — animated expand/collapse (Framer Motion `AnimatePresence`)
   - Mirror the dashboard help screen FAQ content exactly
   - Categories: Getting Started · System & Sensors · Irrigation Control · Alerts · Connectivity
   - Each item: question + detailed answer + optional icon
3. **Quick Start Guide** — numbered steps, each with an icon and short description
   - Steps: Connect to LAN → Open Dashboard → Configure Zones → Set Schedules → Monitor
4. **Contact & Support card** — card with: support email placeholder, GitHub repo link, QR code placeholder
   - Add `<!-- TODO: team provides QR URL and contact info -->` comment
5. **Amazigh pattern dividers** between every section
6. **Mobile-first** — accordion works perfectly on 375px viewport

### / (Home)

**Hero** — full-height, `#141C16` bg:
- Three.js `HeroScene`: Amazigh-geometric floating particles + subtle dashboard 3D mockup
- Cursor glow: `radial-gradient` tracking `mousemove`, `brand-primary` tinted
- Tifinagh glyphs T·A·Z·R·O·U·T fading in with stagger (0.1s each)
- Headline: "Smart Irrigation. Ancient Roots. Modern Intelligence."
- Sub: one-liner about the system
- CTAs: "Explore the System" → /system | "View Dashboard" → /dashboard
- Magnetic hover on CTAs (GSAP)

**Stats Bar** — animated count-up on viewport enter:
- ⚠ LEAVE AS PLACEHOLDERS: ask team for real values before filling
- Template: `[X] Irrigation Zones · [X] Sensors · [X]% Water Saved · Real-Time AI`

**Features Grid** — 6 cards, stagger reveal:
- Real-Time Monitoring · AI Decision Engine · Emergency Alerts
- Multi-Zone Control · Offline LAN Operation · Amazigh Heritage UI
- Icons: use Berber symbol SVGs from `_references/amazigh/symbols/`

**System Preview** — dashboard screenshot parallax:
- Use `_references/dashboard-ui/dark/home.png` if available, else placeholder
- Amazigh pattern divider above and below

**Architecture Overview** — animated SVG flow diagram:
- Nodes: Field Sensor → LoRa → Raspberry Pi → MQTT Broker → Spring Boot → PostgreSQL → Dashboard
- Read `_references/technical-docs/architecture/` for accurate component names
- Nodes animate in sequentially (Framer Motion stagger)

**Team Teaser** — 3 placeholder cards:
- ⚠ Placeholders only — real data comes from `content/team/*.json`

### /system

- Step-by-step visual flow: sensor → LoRa → gateway → MQTT → backend → dashboard
- Tech stack grid: Flutter · Spring Boot · MQTT · PostgreSQL · Raspberry Pi · LoRa · ESP32
- Interactive SVG architecture diagram (hover tooltips per node)
- ⚠ Read `_references/technical-docs/` for all specs before writing content

### /about

- Project origin: NSCS Algeria, irrigation problem, Amazigh identity
- Full team grid from `content/team/*.json`
- Partner projects from `content/partners/*.json`
- ⚠ Use placeholders if JSON files are empty — do not invent bios

### /dashboard

- Screenshot gallery (dark/light theme toggle)
- Screens: Home · Zones · Analytics · Emergency · Settings · Help
- ⚠ Screenshots from `_references/dashboard-ui/` → copy to `public/assets/dashboard/`
- Feature walkthrough: tabbed, each tab shows a screen + feature list

### /docs

- Grid of doc cards by category: Architecture · API · MQTT · Setup · Hardware
- Dynamic `[slug]` routing for MDX files in `content/docs/`
- Render MDX with syntax highlighting
- ⚠ MDX files in `content/docs/` must be seeded from `_references/technical-docs/`

---

## REPO STRUCTURE

```
tazrout-website/
├── _references/                   ← TEAM FILLS — AGENT READS
│   ├── design-system/             ← PUT: Flutter design system files (.dart + token exports)
│   ├── dashboard-ui/dark/         ← PUT: dark theme screenshots (home.png, zones.png, etc.)
│   ├── dashboard-ui/light/        ← PUT: light theme screenshots
│   ├── amazigh/patterns/          ← PUT: SVG strip patterns
│   ├── amazigh/symbols/           ← PUT: Berber symbol SVGs
│   ├── amazigh/tifinagh/          ← PUT: Tifinagh glyph SVGs
│   └── technical-docs/            ← PUT: all PDF/MD reports and README files
│       ├── architecture/
│       ├── backend/
│       ├── frontend/
│       ├── mqtt/
│       ├── hardware/
│       └── readme-files/
├── public/
│   ├── assets/
│   │   ├── dashboard/dark/        ← Copied from _references for Next.js serving
│   │   ├── dashboard/light/
│   │   ├── amazigh/patterns/
│   │   ├── amazigh/symbols/
│   │   ├── amazigh/tifinagh/
│   │   └── team/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← root layout, fonts, metadata
│   │   ├── page.tsx               ← home page
│   │   ├── about/page.tsx
│   │   ├── system/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── docs/page.tsx          ← docs index
│   │   ├── docs/[slug]/page.tsx   ← dynamic MDX doc page
│   │   └── help/page.tsx          ← BETA PRIORITY
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── MobileDrawer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── SystemPreview.tsx
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   └── TeamSection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx         ← magnetic hover variant
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Accordion.tsx      ← animated, used by /help FAQ
│   │   │   ├── Tooltip.tsx
│   │   │   └── AmazighDivider.tsx ← SVG pattern strip separator
│   │   └── three/
│   │       ├── HeroScene.tsx      ← particles + dashboard 3D float
│   │       ├── DashboardFloat.tsx ← isolated dashboard mockup 3D
│   │       └── ArchScene.tsx      ← optional 3D arch diagram
│   ├── lib/
│   │   ├── fonts.ts               ← next/font Inter + Poppins
│   │   ├── animations.ts          ← shared Framer Motion variants
│   │   ├── mdx.ts                 ← MDX parsing utils
│   │   └── utils.ts               ← cn() + misc helpers
│   ├── styles/
│   │   └── globals.css            ← Tailwind base + CSS variables
│   └── types/
│       ├── team.ts
│       ├── partner.ts
│       └── docs.ts
├── content/
│   ├── team/                      ← PUT: [name].json team member files
│   ├── partners/                  ← PUT: [name].json partner project files
│   └── docs/                      ← PUT: [slug].mdx documentation articles
├── AGENT_CONTEXT.md               ← this file
├── BETA_SCOPE.md                  ← what ships in beta vs later
├── GIT_WORKFLOW.md                ← commit conventions
├── HANDOFF.md                     ← generated by agent at end of build
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── package.json
└── .gitignore
```

---

## CONTENT FILE SCHEMAS

### `content/team/[name].json`
```json
{
  "name": "Full Name",
  "role": "Role in Project",
  "specialization": "Backend | Flutter | AI | Hardware | Design",
  "photo": "/assets/team/name.jpg",
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "description": "One or two sentences about their contribution."
}
```

### `content/partners/[name].json`
```json
{
  "name": "Sub-Project Name",
  "owner": "Team Member Name",
  "repo": "https://github.com/username/repo",
  "description": "What this sub-project does and how it connects to Tazrout.",
  "status": "complete | in-progress | planned",
  "docPath": "/docs/partner-name"
}
```

### `content/docs/[slug].mdx`
```mdx
---
title: "Document Title"
category: "architecture | api | mqtt | setup | manual | hardware"
order: 1
lastUpdated: "2025-01-01"
---
Content here...
```

---

## IMPLEMENTATION ORDER (BETA)

Follow this exact order. Do not skip ahead.

1. **[INIT]** — Verify Next.js 14 setup, TypeScript strict mode, Tailwind, all deps installed
2. **[CONFIGURED]** — `tailwind.config.ts`: extract colors from `_references/design-system/`
3. **[CONFIGURED]** — `globals.css`: CSS variables, base styles, font loading
4. **[ADDED]** — `src/lib/`: fonts, animations variants, utils
5. **[ADDED]** — `src/types/`: all TypeScript interfaces
6. **[ADDED]** — `Navbar.tsx` + `Footer.tsx` + `PageTransition.tsx` + `MobileDrawer.tsx`
7. **[ADDED]** — `src/components/ui/`: Button, Card, Badge, Accordion, AmazighDivider, Tooltip
8. **[ADDED]** — `src/app/layout.tsx`: root layout wiring everything together
9. **[ADDED]** — `src/app/help/page.tsx`: **complete `/help` page** — FAQ, Quick Start, Contact
10. **[ADDED]** — `src/components/three/HeroScene.tsx`: Three.js scene (particles + 3D float)
11. **[ADDED]** — `src/components/sections/Hero.tsx`: full hero with Three.js + cursor glow
12. **[ADDED]** — `src/components/sections/FeaturesGrid.tsx`
13. **[ADDED]** — `src/components/sections/StatsBar.tsx` (placeholders)
14. **[ADDED]** — `src/components/sections/ArchitectureDiagram.tsx`
15. **[ADDED]** — `src/components/sections/SystemPreview.tsx`
16. **[ADDED]** — `src/app/page.tsx`: home page composing all sections
17. **[ADDED]** — `/system/page.tsx`
18. **[ADDED]** — `/about/page.tsx`
19. **[ADDED]** — `/dashboard/page.tsx`
20. **[ADDED]** — `/docs/page.tsx` + `/docs/[slug]/page.tsx` (MDX rendering)
21. **[UPDATED]** — Responsive polish pass (375px → 768px → 1440px)
22. **[DOCUMENTED]** — `HANDOFF.md` — deployment steps, content checklist, asset checklist

---

## CODE RULES

- **No `.js` files** — every file is `.ts` or `.tsx`
- **TypeScript strict mode** — no `any` types
- **`"use client"`** — only on components that use Three.js, GSAP, or browser APIs
- **React Server Components** — use for all static/data sections
- **`next/image`** — for all `<img>` elements
- **`rel="noopener noreferrer"`** — on all external links
- **`alt` text** — on all images
- **No secrets in client code** — all keys go in `.env.local`

---

## GIT RULES

See `GIT_WORKFLOW.md` for full convention.

- Commit after every logical unit (one page = one commit)
- Run `npm run build` before committing a page
- Always include scope: `[ADDED] app/help: complete help page with FAQ accordion`
- Work only on the `beta` branch

---

## WHAT TO ASK THE TEAM (DO NOT INVENT)

Before or during implementation, ask the project owner for:

- [ ] Real stats: irrigation zones count, sensor count, water savings %
- [ ] Team member names, roles, photos, GitHub/LinkedIn links
- [ ] Partner project names, repos, descriptions, status
- [ ] Contact info + QR code URL for `/help`
- [ ] Logo SVG (or confirm: Tifinagh wordmark only)
- [ ] Target public launch date
- [ ] Any docs ready to be added to `content/docs/`

---

## HANDOFF — WHAT TO GENERATE AT THE END

After completing all beta tasks, create `HANDOFF.md` containing:

1. **Vercel deployment steps** — from `beta` branch to preview URL
2. **Content checklist** — every JSON/MDX file that needs real content
3. **Asset checklist** — every image/SVG still using a placeholder
4. **Design decisions** — list any color/spacing/layout decision you made that the team should review
5. **Post-beta roadmap** — what to unlock once content arrives
6. **How to add a team member** — step by step
7. **How to add a doc page** — step by step
8. **How to update screenshots** — where to place, naming convention
9. **Custom domain setup** — Vercel DNS configuration guide
