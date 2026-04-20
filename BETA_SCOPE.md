# Beta Release Scope

This document defines what ships in the `beta` branch / first public release.
The agent works **only on items marked ✅ BETA**.

---

## ✅ BETA — Build these now

| Item | Priority | Notes |
|---|---|---|
| Project setup (Next.js 14 + TS + Tailwind + deps) | P0 | Must work on Vercel |
| Design tokens in tailwind.config.ts + globals.css | P0 | From _references/design-system/ |
| Root layout: Navbar + Footer + PageTransition | P0 | Frosted glass navbar, mobile drawer |
| `/help` — full page | P0 | **Primary beta deliverable** |
| `/` Home — Hero section | P1 | Three.js particles + cursor glow |
| `/` Home — Features Grid | P1 | 6 cards, Amazigh icon placeholders |
| `/` Home — Stats Bar | P2 | Placeholders — ask team for real numbers |
| `/` Home — Architecture Overview | P2 | Animated SVG diagram |
| `/` Home — Team Teaser | P2 | Placeholder cards only |
| `/system` page | P2 | Step flow + tech stack grid |
| `/about` page | P3 | Placeholder content |
| `/dashboard` page | P3 | Placeholder gallery |
| `/docs` page + MDX routing | P3 | Index only, no MDX yet |

## 🔒 POST-BETA — Do not build yet

- Real team bios (waiting on content/team/*.json)
- Real partner projects (waiting on content/partners/*.json)
- Real documentation MDX (waiting on content/docs/*.mdx)
- Dashboard screenshot gallery (waiting on _references/dashboard-ui/)
- Contact QR code (waiting on team)
- Real statistics (waiting on field testing data)

---

## Help Page — Full Spec

The `/help` page is the **priority beta deliverable**. It must be complete,
responsive, and polished. Content mirrors the dashboard help screen.

### Sections to build:
1. **Hero banner** — "Help & Support" with Tazrout green gradient
2. **FAQ Accordion** — expand/collapse answers (Framer Motion animated)
   - What sensors does Tazrout use?
   - How does the irrigation decision engine work?
   - What happens when the connection is lost?
   - How do I add a new irrigation zone?
   - What do the emergency alert colors mean?
   - Is the system usable without internet?
   - How often does sensor data update?
   - Where is data stored?
3. **Quick Start Guide** — numbered steps with icons
4. **Contact / Support card** — email, GitHub, QR code placeholder
5. **Amazigh pattern dividers** between sections
