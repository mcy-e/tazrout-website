# Deploy the Tazrout website on Vercel (beta)

This guide is meant to be enough on its own: follow it in order. You do not need another tool or tutorial unless Vercel changes its UI (names of buttons may shift slightly).

---

## 1. Is the site ready to deploy?

**Yes, for a beta / preview website on Vercel**, if:

- The code on the branch you deploy **passes** `npm run build` on your computer.
- You accept that **contact forms do not send email or save data yet** (they show a success state after a delay). The site still works for visitors; only form backends are unfinished.

**Not required for the first deploy:** environment variables, database, or a custom domain.

**You should plan soon after deploy:** set `metadataBase` in code to your real Vercel URL or custom domain (Section 8).

---

## 2. What you need before starting

| Requirement | Why |
|-------------|-----|
| A **GitHub** (or GitLab / Bitbucket) account | Vercel pulls code from git |
| This repository **pushed** to that host | Vercel cannot deploy from only your laptop |
| A **Vercel** account | Sign up at [vercel.com](https://vercel.com) (free tier is enough for beta) |
| **Node.js 18.17+** locally (optional but recommended) | To run `npm run build` before you push and catch errors early |

Recommended: install Node with [nodejs.org](https://nodejs.org) LTS, then in the project folder run:

```bash
npm install
npm run build
```

If that finishes with **“Compiled successfully”** and **“Generating static pages”** without errors, Vercel is very likely to build the same way.

---

## 3. Connect the repo to Vercel (first time)

1. Log in to **Vercel**.
2. Click **Add New…** → **Project** (or **Import**).
3. **Import Git Repository:** choose **GitHub** (or your provider) and authorize Vercel if asked.
4. Find **tazrout-website** (or your repo name) and click **Import**.

---

## 4. Project settings (important)

Vercel usually **auto-detects Next.js**. Confirm the following on the import / settings screen:

| Setting | Value |
|---------|--------|
| **Framework Preset** | Next.js |
| **Root Directory** | `.` (repository root — leave default unless your app lives in a subfolder) |
| **Build Command** | `npm run build` (default for Next.js — only change if you customized it) |
| **Output Directory** | Leave **empty** / default. Next.js uses `.next` internally; do **not** set Output to `.next` manually unless Vercel docs tell you to for your setup. |
| **Install Command** | `npm install` (default) |

Click **Deploy**.

**First build:** wait until the dashboard shows **Ready** or **Error**. If Ready, open the **Visit** link.

---

## 5. Beta branch vs production branch

By default Vercel deploys **the branch you selected** (often `main`).

**If your work is on `beta`:**

1. After the project exists, open the project on Vercel → **Settings** → **Git**.
2. Under **Production Branch**, you can set **`beta`** if you want every production deploy to track `beta`, **or** keep `main` and use **Preview Deployments** for `beta`.

**Typical beta setup:**

- Push `beta` → Vercel creates a **Preview** URL (unique per commit or branch).
- Keep **Production** on `main` if `main` is stable; merge `beta` → `main` when you want the main site URL updated.

**Where to see URLs:** Project → **Deployments** — each row has a URL (production vs preview).

---

## 6. What URL will visitors use?

- **Production:** `https://your-project-name.vercel.app` (exact name is on the Vercel dashboard).
- **Previews:** `https://your-branch-xxx.vercel.app` style links (shown per deployment).

Your app uses **locale prefixes**: the middleware sends people who visit `/` to **`/ar`** by default. Valid entry paths include:

- `https://YOUR_DOMAIN/ar`
- `https://YOUR_DOMAIN/en`
- `https://YOUR_DOMAIN/fr`

If someone opens only `https://YOUR_DOMAIN/`, they should be **redirected** to `/ar` (or `/ar/`). That is expected.

---

## 7. Custom domain (optional)

1. Vercel → your project → **Settings** → **Domains**.
2. Add your domain (e.g. `www.example.com`).
3. Vercel shows **DNS records** (A, AAAA, or CNAME). Add those at your **registrar** (where you bought the domain). Propagation can take minutes to hours.
4. After it works, update **`metadataBase`** in `src/app/[locale]/layout.tsx` to `https://your-real-domain` (see Section 8).

---

## 8. After deploy: update `metadataBase` (recommended)

Open `src/app/[locale]/layout.tsx`. You will see:

```ts
metadataBase: new URL('https://tazrout.vercel.app'),
```

Replace that URL with:

- Your real **Vercel production URL**, or  
- Your **custom domain** (with `https://`).

Commit and push; Vercel will redeploy. This helps correct **canonical URLs** and **Open Graph** links when people share the site.

---

## 9. Environment variables

**Current project:** no env vars are **required** for build or for the marketing site to load.

**Later**, when you wire forms or analytics, add variables in:

**Vercel → Project → Settings → Environment Variables**

Choose **Production**, **Preview**, and/or **Development** as needed. Redeploy after changing variables (Vercel usually offers **Redeploy** on the latest deployment).

---

## 10. Expected issues and what to do

### Build fails on Vercel but worked locally

1. Open the failed deployment → **Building** log. Scroll to the **first red error**.
2. Common causes:
   - **Different Node version:** Vercel → Settings → General → **Node.js Version** → set **20.x** or **18.x**.
   - **Case-sensitive paths:** Windows ignores case; Linux (Vercel) does not. If the error says `Cannot find module './Foo'`, check the real filename is `Foo.tsx` not `foo.tsx`.
   - **Uncommitted files:** you only pushed part of the repo. Run `git status`, commit missing files, push again.

### “Module not found” or import error

- Fix the import path (use `@/...` from `src/` as in the rest of the project).
- Run `npm run build` locally; fix until green, then push.

### Site shows 404 on every page

- Confirm you are not opening a wrong deployment URL.
- Confirm **Root Directory** in Vercel is the folder that contains `package.json` and `next.config.mjs`.

### Blank page or “Application error” in the browser

1. Open **browser DevTools** (F12) → **Console** tab. Note the error.
2. Often: a **client** component throws at runtime. Reproduce locally with `npm run dev` and the same URL path.

### Images broken

- Static files must live under **`public/`** and be referenced with paths like `/assets/...` (leading slash).
- If you used wrong extensions (e.g. `.png` but file is `.svg`), fix paths in code.

### Redirect loop or wrong language

- Middleware only adds a locale if the path does not start with `/ar`, `/en`, or `/fr`. Clear cookies rarely needed; try an incognito window.

### Build timeout or “out of memory”

- Rare for this stack. Try again; upgrade to a Vercel plan with longer builds if it persists.

### “Sharp” or image optimization warnings

- Next.js may mention optional `sharp` for faster image optimization. The site usually still builds; installing `sharp` is optional optimization, not required for first beta.

---

## 11. How to redeploy

- **Automatic:** every `git push` to the tracked branch creates a new deployment (depending on your Git integration settings).
- **Manual:** Vercel → **Deployments** → **…** on a deployment → **Redeploy**.

---

## 12. Roll back

Vercel → **Deployments** → find an older **Ready** deployment → **Promote to Production** (wording may be “Assign to domain” / make production). That restores the previous working version without git revert.

---

## 13. Checklist right after first successful deploy

- [ ] Open production URL, then `/ar`, `/en`, `/fr`.
- [ ] Click main nav links (home, docs, help, about, etc.).
- [ ] Open at least one **docs** article (e.g. `/en/docs/architecture`).
- [ ] Submit a form: you should see **success UI** — remember data is **not** stored until you add a backend.
- [ ] Update `metadataBase` in `layout.tsx` to this deployment’s URL or your domain, commit, push.

---

## 14. Security note (beta)

Do **not** put secrets in the client bundle. If you add API keys later, use **server-only** Route Handlers or Vercel serverless functions and store keys in **Environment Variables**, not in `messages/*.json` or React components.

---

## 15. If you are completely stuck

1. Run **`npm run build`** in the project on your machine and fix until it passes.
2. Copy the **full first error block** from the Vercel build log (not a screenshot of the summary line).
3. Compare your Vercel **Build & Development Settings** with Section 4 of this file.

That sequence resolves most first-time deploy problems without needing external help.
