# Security Audit — MindWhiz Website

**Scope:** Full source review of the Next.js marketing site (`src/`, `next.config.mjs`, dependencies, public assets).
**Date:** 2026-07-27
**Reviewer:** Defensive code review.

---

## 1. Executive summary

The site is a **static Next.js 14 marketing site**: no backend, no database, no
authentication, no API routes, and no user-generated content. Lead capture is
fully outsourced to a third party (GoHighLevel / LeadConnector) via embedded
iframes. As a result, the entire class of server-side web vulnerabilities — SQL
injection, authentication/authorization bypass, IDOR, SSRF, RCE, CSRF — **does
not apply to this codebase**.

**No malware, backdoor, data-exfiltration code, or obfuscated payload was found.**
Secrets are handled correctly (`.env*` and `*.pem` are gitignored; no API keys
appear in client code — the LeadConnector IDs are public embed identifiers by
design).

The real weaknesses are **defense-in-depth gaps**: missing HTTP security
headers, a mutable third-party script that runs on the origin, an outdated
framework version, and an XSS-fragile JSON-LD serialization pattern that is not
currently exploitable but would become so if content ever came from a CMS or a
form.

| # | Finding | Severity | Status |
|---|---------|----------|--------|
| 1 | No security headers / no Content-Security-Policy | 🟠 Medium | Fixed (CSP report-only) |
| 2 | Third-party form script runs with origin privileges | 🟠 Medium | Mitigated via CSP |
| 3 | Next.js 14.2.15 outdated (published CVEs) | 🟡 Low–Med | Fixed (→ 14.2.35) |
| 4 | JSON-LD XSS — defense-in-depth | 🟡 Low | Fixed (escape helper) |
| 5 | Untracked dev artifact using `eval()` | ⚪ Info | Fixed (gitignored) |
| 6 | Manual `<script>` injection without cleanup | ⚪ Info | Fixed (`next/script`) |

---

## 2. Threat model

- **Hosting:** static/SSG output (Vercel-style). No server code runs on request.
- **Trust boundaries:** the only runtime input the site accepts is what the user
  types into the embedded **LeadConnector** forms — and that data goes directly
  to the third party, never touching MindWhiz-controlled code.
- **Assets at risk:** brand reputation (defacement / clickjacking), and
  visitors (a compromised third-party script could run in their browser on the
  `mindwhiz.com` origin).

Because there is no server logic, the audit focuses on client-side execution,
third-party supply chain, transport/headers, and dependency hygiene.

---

## 3. Findings

### 🟠 Finding 1 — No security headers / no Content-Security-Policy
**File:** `next.config.mjs` (no `headers()` function)

The application shipped with **none** of the standard HTTP security headers:

- `Content-Security-Policy` — no restriction on where scripts, frames, styles,
  images, or connections may come from. Any injected or compromised script runs
  unrestricted.
- `X-Frame-Options` / CSP `frame-ancestors` — the site could be framed by any
  origin, enabling **clickjacking**.
- `X-Content-Type-Options: nosniff` — browsers may MIME-sniff responses.
- `Referrer-Policy` — full referrer URLs leak to third parties.
- `Strict-Transport-Security` — no enforced HTTPS pinning.
- `Permissions-Policy` — no restriction on camera/mic/geolocation APIs.

This is the **single highest-value fix**: the CSP is what contains the blast
radius of any XSS or a compromised third-party script (Findings 2 & 4).

**Remediation:** added a `headers()` function in `next.config.mjs` applying a
full header set to every route. The CSP allowlists only `self` plus the
LeadConnector / msgsndr hosts required by the forms, and is shipped in
**Report-Only** mode first (see §5) so the embedded forms can be verified before
enforcement.

---

### 🟠 Finding 2 — Third-party form script runs with origin privileges
**Files:** `src/components/ContactFormSection.tsx`, `src/app/careers/CareersPageClient.tsx`

Both the contact and careers pages load
`https://link.msgsndr.com/js/form_embed.js`, which executes with **full
privileges on the `mindwhiz.com` origin**. If HighLevel / LeadConnector were
ever compromised, attacker-controlled JavaScript would run on the site. This is
the closest thing to a "malware injection" vector in the codebase.

The script is *mutable* (it changes over time), so **Subresource Integrity
(SRI) cannot pin it**. The practical mitigation is a CSP `script-src` allowlist
(Finding 1) that limits which hosts may serve executable script, combined with
`frame-src` restricting the lead/booking iframes to the vendor's hosts.

**Risk rating:** Medium, but **low probability** — this is an inherent,
accepted risk of embedding any vendor form. It is documented here so it is a
*known* dependency, not a silent one.

**Remediation:** covered by the CSP in Finding 1; the embed script host is the
only external `script-src` entry.

---

### 🟡 Finding 3 — Outdated Next.js (14.2.15)
**File:** `package.json`

Version 14.2.15 predates several published Next.js security advisories
(middleware, cache, and image-optimizer classes). Direct impact on **this** site
is limited (no middleware, no auth, plain `<img>` tags rather than the remote
image optimizer), but running an outdated framework is a genuine weak point and
poor hygiene.

**Remediation:** upgraded to **14.2.35** (latest 14.2.x patch line).

> **Read this before acting on `npm audit`.** After the upgrade, `npm audit`
> still reports the entire Next.js line as "high severity" — because most of the
> ~20 advisories were only patched in **Next 15/16**, not backported to 14.x, so
> even the newest 14.x is flagged. The only `npm audit fix --force` path is
> `next@16.2.12`, a **breaking major upgrade** (requires React 19, App Router API
> changes) that risks breaking the live site and is a separate migration project
> — **do not run it blind.**
>
> Crucially, **almost every one of those advisories is Not Applicable to this
> site**, because they target features it doesn't use: Server Actions, Server
> Components streaming, middleware/proxy, rewrites, i18n, custom servers, CSP
> nonces, and the image optimizer's `remotePatterns` (this site has none —
> remote images use plain `<img>`). The residual **real** risk on 14.2.35 is
> effectively nil for the current static feature set.
>
> A transitive/`devDependencies` **postcss** advisory also shows as high, but
> postcss only runs at **build time** on the project's own trusted CSS — not a
> production/runtime exposure.

**Recommendation:** stay on 14.2.35 for now; treat a **Next 15/16 migration** as
a planned, separately-tested piece of work (do it before adding any server-side
features, which would make the N/A advisories suddenly apply). Enable Dependabot
and re-run `npm audit` after the migration.

---

### 🟡 Finding 4 — JSON-LD XSS (defense-in-depth, not currently exploitable)
**Files (≈13 sites):** `src/app/layout.tsx`, `src/components/JsonLd.tsx`,
`src/components/ServiceDetailPage.tsx`, `src/components/CaseStudyDetail.tsx`,
`src/components/BlogPostPage.tsx`, `src/components/FaqSection.tsx`,
`src/app/locations/{us,uk,pk}/page.tsx`

Structured data is emitted via
`dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}`. `JSON.stringify`
does **not** escape `<`, `>`, `&`, or the U+2028/U+2029 separators, so any string
containing the sequence `</script>` would **break out of the `<script>` tag** and
execute — a classic stored-XSS pattern.

**Current exploitability: none.** Every value fed into these blocks is
static, developer-authored content committed to the repo (`blog.ts`,
`servicePages.ts`, `locations.ts`, `seo.config.ts`). The risk is **latent**: the
day any of this content originates from a CMS, an API, or a form field, it
becomes a live stored-XSS sink.

**Remediation:** added `src/lib/jsonLd.ts` exporting `jsonLdScript()`, which
escapes `<`, `>`, `&`, ` `, ` ` to their `\uXXXX` forms (valid JSON,
inert markup). All call sites now serialize through it.

---

### ⚪ Finding 5 — Untracked dev artifact using `eval()`
**File:** `.tmp-verify-pin.js` (untracked)

A local Playwright scroll-verification script that calls `eval()`. Inspection
confirmed it only `eval`s its **own hardcoded constant string** — it is **not
malware**, is **not part of the build**, and is **not committed**. It is,
however, disposable test tooling that should never be committed (committing
`eval`-containing helpers is a code-hygiene red flag).

**Remediation:** added `.tmp-*` to `.gitignore` so it (and similar temp files)
can never be accidentally committed. The file may be deleted at will.

---

### ⚪ Finding 6 — Manual `<script>` injection without cleanup
**File:** `src/components/ContactFormSection.tsx`

The contact form appended the embed `<script>` via
`document.createElement("script")` inside a `useEffect` with **no cleanup**, so
the tag stacks on every mount (and doubles under React Strict Mode in dev). The
careers page already uses the framework-native `next/script` component.

**Remediation:** converted `ContactFormSection` to `next/script` with
`strategy="lazyOnload"`, matching the careers page.

---

## 4. Verified clean

- ✅ **No secrets in client code** — LeadConnector IDs are public embed IDs;
  `.env*` and `*.pem` are gitignored.
- ✅ **No malware / exfiltration / obfuscation** anywhere in the source.
- ✅ **All `target="_blank"` links** carry `rel="noreferrer"`/`noopener`
  (no reverse-tabnabbing).
- ✅ **No mixed content** — the only `http://` strings are SVG XML namespaces
  and `localhost` in the dev-only temp file.
- ✅ **No unsafe redirects** — the `redirects()` in `next.config.mjs` are static,
  hardcoded paths.

---

## 5. Enabling CSP enforcement (action required)

The Content-Security-Policy ships in **Report-Only** mode so it cannot break the
embedded forms on deploy. To turn on enforcement:

1. Deploy with the current config (Report-Only).
2. Open `/contact` and `/careers`; confirm both forms **load and submit**.
3. Check the browser console / CSP report endpoint for `Report-Only` violations.
   Add any missing legitimate host to the matching directive in
   `next.config.mjs`.
4. When clean, set **`CSP_ENFORCE = true`** at the top of `next.config.mjs` and
   redeploy. This swaps the header name from
   `Content-Security-Policy-Report-Only` to the enforcing
   `Content-Security-Policy`.

---

## 6. Ongoing recommendations

- Enable **Dependabot** (or `npm audit` in CI) to catch dependency CVEs.
- Re-run this review if a **backend, API route, CMS, or auth** is ever added —
  that changes the threat model entirely and re-opens the server-side vuln
  classes currently marked N/A.
- Keep the CSP allowlist **as tight as possible**; every host added widens the
  attack surface.
