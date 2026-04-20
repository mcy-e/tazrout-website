# Tazrout Website

Public-facing website for the Tazrout smart irrigation system.
Built with Next.js 14 + TypeScript + Tailwind CSS + Three.js + Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production |
| `beta` | Active development (current) |

## For the Team — Adding Content

1. **Team members** → add JSON to `content/team/[name].json`
2. **Partner projects** → add JSON to `content/partners/[name].json`
3. **Documentation** → add MDX to `content/docs/[slug].mdx`
4. **Screenshots** → place in `_references/dashboard-ui/` (dark/ + light/)
5. **Design system files** → place in `_references/design-system/`
6. **Amazigh SVGs** → place in `_references/amazigh/` (patterns/ symbols/ tifinagh/)
7. **Technical docs** → place in `_references/technical-docs/`

See `AGENT_CONTEXT.md` for full agent instructions.
See `BETA_SCOPE.md` for what ships in beta.
See `GIT_WORKFLOW.md` for commit conventions.

## Deployment

Hosted on Vercel. See `HANDOFF.md` (generated after build) for deployment steps.
