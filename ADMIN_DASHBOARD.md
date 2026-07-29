# Admin Dashboard

A password-protected admin area at **`/admin`** where the site owner can publish
and manage:

- **Blog posts** — shown on `/blog` and `/blog/[slug]`
- **Case studies** — shown on `/case-studies` and `/case-studies/[slug]`
- **Newsletter subscribers** — everyone who signs up via the site form
- **Analytics** — page views (Google Analytics 4) and keyword rankings (Google Search Console)

Content is stored in **Supabase** (Postgres). Login uses a **single admin
password** kept in an environment variable. Everything degrades gracefully: if
Supabase or the password isn't configured, the public site still builds and
renders the built-in seed content — only the dashboard's save actions are
disabled.

---

## 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) (free tier is fine) and
   create a new project.
2. Open **SQL Editor**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql),
   and click **Run**. This creates the `blog_posts`, `case_studies`, and
   `newsletter_subscribers` tables with Row Level Security enabled.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** secret key → `SUPABASE_SERVICE_ROLE_KEY`
     (⚠️ secret — this is only ever used server-side, never sent to the browser.)

## 2. Set environment variables

Copy [`.env.example`](.env.example) into `.env.local` and fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=$(openssl rand -hex 32)
```

Add the **same four variables** in Vercel → **Project → Settings → Environment
Variables**, then redeploy so they take effect in production.

## 3. Use it

- Visit **`/admin`** → you'll be redirected to `/admin/login`.
- Enter `ADMIN_PASSWORD`. A signed, HTTP-only session cookie is set (valid 12h).
- Manage **Blog posts**, **Case studies**, and **Newsletter** from the sidebar.
- Newly published content appears on the public site within ~60 seconds
  (pages use `revalidate = 60`).

## 4. Analytics tab (page views + keyword rankings)

The **Analytics** tab reads two Google products. Both are powered by a single
Google Cloud **service account** that you grant access to each property. The GA4
tag (`G-KELVNBGDRP`) is already on the site, so page views are already being
collected — this just pulls them (and Search Console keywords) into the dashboard.

**a. Create the service account**

1. In [Google Cloud Console](https://console.cloud.google.com/) pick (or create)
   a project → **APIs & Services → Enable APIs** → enable
   **Google Analytics Data API** and **Google Search Console API**.
2. **IAM & Admin → Service Accounts → Create service account**. Give it any
   name; no roles needed. Open it → **Keys → Add key → JSON** and download.
3. From that JSON, copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
   `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (keep the `\n` sequences,
   wrap in double quotes).

**b. Grant it access**

- **GA4**: Analytics → **Admin → Property Access Management → +** → add the
  service-account email as **Viewer**. Copy the numeric **Property ID**
  (Admin → Property Settings) → `GA4_PROPERTY_ID`.
- **Search Console**: open your property → **Settings → Users and permissions →
  Add user** → the service-account email, permission **Full** (or Restricted).
  Set `GSC_SITE_URL` to `sc-domain:mindwhiz.com` (domain property) or the exact
  URL-prefix (e.g. `https://www.mindwhiz.com/`).

**c. Set the four env vars** (locally + in Vercel) — see [`.env.example`](.env.example).

Ranges: 7 / 28 / 90 days. Search Console data lags ~2–3 days, so the keyword
window ends a couple days back for stable numbers.

---

## How it works

| Area | File(s) |
| --- | --- |
| Auth (password → signed cookie) | [`src/lib/auth.ts`](src/lib/auth.ts) |
| Route protection | [`src/middleware.ts`](src/middleware.ts) — guards `/admin/*` and `/api/admin/*` |
| Supabase client (service role) | [`src/lib/supabase.ts`](src/lib/supabase.ts) |
| Admin API (CRUD) | [`src/app/api/admin/…`](src/app/api/admin) |
| Google auth + analytics | [`src/lib/googleAuth.ts`](src/lib/googleAuth.ts) · [`src/lib/analytics.ts`](src/lib/analytics.ts) |
| Public subscribe endpoint | [`src/app/api/newsletter/subscribe/route.ts`](src/app/api/newsletter/subscribe/route.ts) |
| Dashboard UI | [`src/app/admin`](src/app/admin) |
| Merged data (Supabase + seeds) | [`src/lib/blog.ts`](src/lib/blog.ts) · [`src/lib/caseStudies.ts`](src/lib/caseStudies.ts) |

**Security notes**

- The `service_role` key and `ADMIN_PASSWORD` are server-only; they are never
  bundled into client code.
- The session cookie is `httpOnly`, `sameSite=lax`, `secure` in production, and
  HMAC-signed with `ADMIN_SESSION_SECRET` — it can't be forged or reused past
  its 12-hour expiry.
- Supabase tables have RLS enabled with no public policies, so the only way in
  is through the server-side admin API (which sits behind the login).
- The static seed content (`src/lib/blog.ts`, `src/lib/content.ts`) remains the
  fallback. Admin content is merged in *ahead of* seeds; a seed item is hidden
  only if an admin item reuses its slug.

**Single admin only.** This uses one shared password with no user accounts. If
you later need multiple named users, password reset, or Google login, switch the
auth layer to Supabase Auth or NextAuth — the data layer stays the same.
