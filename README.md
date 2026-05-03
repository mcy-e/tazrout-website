# Tazrout website

Public site for the Tazrout smart irrigation project. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requests without a locale prefix redirect to the default (`ar`).

## Layout

| Path | Role |
|------|------|
| `src/app/[locale]/` | Pages and layout |
| `src/components/` | Shared UI |
| `messages/` | `ar` / `en` / `fr` copy |
| `content/technical-docs/` | Markdown for `/docs/[slug]` |
| `public/` | Static assets |
| `docs/` | Internal project notes (deploy, scope, git style, checklist) |

## Contributing

- **Strings:** keep `messages/ar.json`, `en.json`, and `fr.json` in sync.
- **Team / partners:** `content/team/` and `content/partners/` (see README files there).
- **Long docs:** edit files under `content/technical-docs/` and register slugs in `src/lib/docs/doc-registry.ts`.
- **Images:** `public/assets/`.

## Internal docs

See **`docs/README.md`** for links to handoff, beta scope, git workflow, and the placeholders checklist.

## Deploy

Use **`docs/vercel-deployment.md`** for a full Vercel beta guide (settings, branches, common errors). **`docs/handoff.md`** has a short summary and post-launch checklist.
