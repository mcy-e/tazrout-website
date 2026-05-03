# Git workflow — Tazrout website

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production; merge from `beta` when a release is ready |
| `beta` | Day-to-day development |
| `feature/*` | Optional short-lived branches for larger changes |

## Commit messages

Format: `[TAG] scope: short description`

| Tag | Use when |
|-----|----------|
| `[INIT]` | First setup of a feature or repo slice |
| `[ADDED]` | New file, page, or feature |
| `[UPDATED]` | Behaviour or UI change on existing code |
| `[FIXED]` | Bug fix |
| `[DOCUMENTED]` | README, docs in `docs/`, comments worth calling out |
| `[REFACTORED]` | Internal structure change, same outward behaviour |
| `[CONFIGURED]` | `next.config`, Tailwind, TypeScript config, etc. |
| `[IGNORED]` | `.gitignore` |
| `[MERGING]` | Merge commits |
| `[MISSED]` | Follow-up commit for something that belonged with the last one |
| `[DELETED]` | Removing files or dead code |

## Examples

```
[INIT] project: Next.js 14 + TypeScript + Tailwind
[ADDED] components/ui: divider component
[ADDED] app/help: help page with FAQ accordion
[UPDATED] tailwind: brand colour tokens
[FIXED] Navbar: mobile drawer z-index over canvas
[CONFIGURED] next.config: security headers
[DOCUMENTED] docs: deployment handoff
[ADDED] content/technical-docs: architecture guide
[REFACTORED] Hero: extract Three.js scene to HeroScene
```

## Habit

Small commits are easier to review and to revert. Run `npm run build` before pushing anything that should land on `main` or `beta`.
