# Tazrout website — handoff

Deployment and content notes for the team.

---

## 1. Vercel

Full walkthrough (settings, branches, errors, checklist): **[vercel-deployment.md](vercel-deployment.md)**.

Short version: push the repo, import the project on Vercel as **Next.js**, use default build (`npm run build`), deploy. Optional: custom domain under project settings and DNS records from Vercel.

---

## 2. Content checklist (when you are ready)

- **Stats / numbers** — if a stats block is still placeholder-only, replace values in the relevant component and/or `messages/*.json`.
- **Team** — `TeamSection.tsx` may still use inline data; you can migrate to `content/team/*.json` using `content/team/README.md` as a guide.
- **Partners** — see `content/partners/README.md`.
- **Support contact** — emails and links in the Help area (`src/app/[locale]/help/`) and on the forms.
- **Technical documentation** — Markdown sources are in `content/technical-docs/`. Each article must be registered in `src/lib/docs/doc-registry.ts` with the correct file path.

---

## 3. Assets

- **Team photos** — `public/assets/team/` (paths must match what the code expects).
- **Dashboard previews** — `public/assets/dashboard/dark/` and `light/`.
- **Anything else** — under `public/assets/` as needed.

---

## 4. Design

Colour and typography tokens live in `tailwind.config.ts` and `src/styles/globals.css`, aligned with the project design system.

---

## 5. After launch

- Connect the project and support forms to real backends or email (see [placeholders-checklist.md](placeholders-checklist.md)).
- Set `metadataBase` in `src/app/[locale]/layout.tsx` to the final production URL.
