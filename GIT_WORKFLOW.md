# Git Workflow — Tazrout Website

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — only merge from beta when release is ready |
| `beta` | Active development — **all agent work goes here** |
| `feature/*` | Optional: isolated features before merging to beta |

## Commit Convention

Always use this format: `[TAG] scope: description`

| Tag | When to use |
|---|---|
| `[INIT]` | Initial project/feature setup |
| `[ADDED]` | New file, component, page, or feature |
| `[UPDATED]` | Modify existing functionality |
| `[FIXED]` | Bug fix |
| `[DOCUMENTED]` | README, MDX, comments, HANDOFF |
| `[REFACTORED]` | Code restructure without behavior change |
| `[CONFIGURED]` | Config files: next.config, tailwind, tsconfig |
| `[IGNORED]` | .gitignore changes |
| `[MERGING]` | Merge commits |
| `[MISSED]` | File that belonged in the previous commit |
| `[DELETED]` | File deletion |

## Examples

```
[INIT] project: Next.js 14 + TypeScript + Tailwind scaffolding
[ADDED] components/ui: AmazighDivider SVG pattern strip component
[ADDED] app/help: full help page with FAQ accordion
[UPDATED] tailwind.config: add brand color tokens from design system
[FIXED] Navbar: mobile drawer z-index overlap with Three.js canvas
[CONFIGURED] next.config: SVG import support + security headers
[DOCUMENTED] content/docs: system architecture MDX placeholder
[ADDED] _references/design-system: app_colors.dart + token export
[REFACTORED] Hero: extract Three.js scene into HeroScene component
```

## Agent Staging Rules

The agent must commit after **every logical unit of work**:
- After completing each page
- After completing each major component
- After adding any reference materials
- After any config change

Never commit broken builds. Run `npm run build` before committing a page.
