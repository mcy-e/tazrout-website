# Beta release scope

What we aimed to ship on the `beta` branch and first public-facing release versus what we intentionally left for later. Use this as historical context; update it if your priorities change.

---

## In scope for beta (build and ship)

| Item | Priority | Notes |
|------|----------|--------|
| Project setup (Next.js 14, TypeScript, Tailwind, dependencies) | P0 | Must run on Vercel |
| Design tokens in `tailwind.config.ts` and `globals.css` | P0 | From the agreed design system |
| Root layout: navbar, footer, page transitions | P0 | Frosted navbar, mobile drawer |
| `/help` full page | P0 | Main support entry point |
| Home: hero | P1 | Three.js accent, interaction |
| Home: features grid | P1 | Six cards, Amazigh-style icons |
| Home: stats bar | P2 | Placeholder figures until real data exists |
| Home: architecture / system preview | P2 | Diagram or preview as designed |
| Home: team teaser | P2 | Can stay lightweight until bios are final |
| `/system` | P2 | Steps and tech overview |
| `/about` | P3 | Can start as lighter content |
| `/dashboard` | P3 | Gallery or placeholder |
| `/docs` hub and per-topic pages | P3 | Wired to `content/technical-docs` |

---

## Post-beta (do not block launch on these)

- Full team bios driven only from `content/team/*.json` (if not already).
- Partner cards from `content/partners/*.json` only.
- Extra long-form docs beyond what is already in `content/technical-docs/`.
- Full dashboard screenshot gallery if assets are still on a shared drive.
- Contact QR code asset when marketing supplies it.
- Field-tested statistics replacing placeholder percentages.

---

## Help page (reference spec)

The `/help` page was treated as the main support surface: responsive, on-brand, aligned with dashboard help where it makes sense.

Intended blocks:

1. Hero — clear “Help / support” title and short intro.
2. FAQ — accordion items (sensors, decisions, offline behaviour, zones, alerts, internet, refresh cadence, data location, etc.).
3. Quick start — short numbered steps with icons.
4. Contact — email, repo links, QR when available.
5. Visual separators using Amazigh-style patterns where it fits the rest of the site.

Adjust copy and sections as the product evolves.
