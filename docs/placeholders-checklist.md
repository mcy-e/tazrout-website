# Verification notes and placeholders

Living checklist for env, forms, and launch tasks. Update dates or rows as you complete items.

---

## Automated checks

Run locally before merges:

- `npm run build`
- `npm run lint`

---

## Forms (not wired to a backend yet)

Project request (home) and technical support (`/help/contact`) still finish with a short delay and no server call. Replace that with `fetch`, a Route Handler, or a provider (Formspree, Resend, etc.), plus validation and spam protection where you need it.

| Flow | File |
|------|------|
| Project inquiry | `src/components/sections/InstallationCTA.tsx` |
| Support ticket | `src/app/[locale]/help/contact/page.tsx` |

Example env names (rename to match your stack):

```env
NEXT_PUBLIC_FORM_PROJECT_ENDPOINT=
NEXT_PUBLIC_FORM_SUPPORT_ENDPOINT=
RESEND_API_KEY=
PROJECT_INBOX_EMAIL=
SUPPORT_INBOX_EMAIL=
```

---

## URLs and SEO

| Item | Notes |
|------|--------|
| `metadataBase` | In `src/app/[locale]/layout.tsx`; set to the real production URL. |
| Open Graph image | Optional `openGraph.images` for link previews. |
| Per-locale metadata | Optional if you care about localized snippets. |

---

## Copy and legal

Review with the team, especially:

- Pricing-related strings under `Install.*` in `messages/en.json` (and `fr.json`, `ar.json`).
- Beta and support timing copy (`Install.beta`, `Support.beta_note`, `Help.phone_beta`).
- Product claims in FAQ, Features, Hero, Docs.

---

## Example form placeholders

Illustrative only; change in JSON if you want branded examples:

- `Install.form_email_placeholder`, wilaya example (e.g. Annaba).
- `Support.*_placeholder` fields.

---

## Team and links

- `TeamSection.tsx`: replace `github: '#'` for any member without a profile, or hide the icon.
- LinkedIn URLs: strip tracking query params if you prefer clean links.
- Team photos: `public/assets/team/`.

---

## External links

- `src/app/[locale]/docs/page.tsx`: GitHub links to dashboard and ESP32 repos should stay accurate.

---

## Misc

- `public/data/stats.json` was removed while unused; add back only if you read it from code.
- Footer: stray unused imports should stay cleaned up in PR review.

---

## Launch checklist

- [ ] Wire both forms to real endpoints or email.
- [ ] Set `metadataBase` (and OG image if desired).
- [ ] Align pricing and beta strings across locales.
- [ ] Fix placeholder GitHub links on the team card.
- [ ] Confirm public repo URLs on the docs hub.
- [ ] Add monitoring or analytics if required.
- [ ] Set Vercel (or host) environment variables for any new API routes.

---

## Quick map

| Topic | Where |
|-------|--------|
| Project form | `src/components/sections/InstallationCTA.tsx` |
| Support form | `src/app/[locale]/help/contact/page.tsx` |
| UI strings | `messages/*.json` |
| Site metadata | `src/app/[locale]/layout.tsx` |
| Floating shapes | `src/components/ui/DecorativeShapes.tsx`, `about/page.tsx` |
| Team | `src/components/sections/TeamSection.tsx`, `public/assets/team/` |
