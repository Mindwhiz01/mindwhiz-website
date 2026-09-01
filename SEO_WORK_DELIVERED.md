# MindWhiz — SEO Work Delivered

**Site:** https://www.mindwhiz.com
**Stack:** Next.js 14 (App Router), React 18, Tailwind, deployed on Vercel
**Scope:** On-Page SEO · Technical SEO · Structured Data · AEO · GEO · Conversion tracking
**Companion spreadsheet:** `MindWhiz-SEO-Work-Delivered-Detailed.xlsx`

---

## 1. Executive summary

The MindWhiz site has been taken from a generic marketing build to a fully search- and
answer-engine-optimised property. Every indexable URL now carries hand-written, non-duplicated
metadata; the site emits a complete structured-data entity graph; the legacy URL set has been
mapped forward with permanent redirects so no ranking equity is lost; and the site is explicitly
built to be *cited* by AI answer engines, not just ranked by Google.

| Workstream | Status |
|---|---|
| On-Page SEO | Complete |
| Technical SEO | Complete (CSP still in Report-Only by design) |
| Structured data / schema | Complete |
| AEO — Answer Engine Optimisation | Complete |
| GEO — Geographic & Generative Engine Optimisation | Complete |
| Analytics & conversion tracking | Complete |

**Key numbers**

| Metric | Count |
|---|---|
| Indexable pages with unique title + description | 36 |
| Service pages (Service schema + FAQ schema) | 14 |
| Industry pages | 9 |
| Location pages (GEO) | 3 |
| Blog posts with Article schema | 8 |
| Case studies | 3 |
| 301 redirects mapped from the legacy site | 25 |
| Schema.org types deployed | 17 |
| AI / answer-engine crawlers explicitly allowed | 12 |

---

## 2. On-Page SEO

### 2.1 Metadata architecture

All page metadata lives in one file — [`src/seo.config.ts`](src/seo.config.ts) — as a `SEO_MAP` of
route → `{ title, description }`. Layouts and `generateMetadata()` read from that map, so a page can
be retitled in exactly one place and every downstream tag (title, description, canonical, Open
Graph, Twitter Card) updates together.

- **36 unique titles**, 50–60 characters, primary keyword first, brand suffix `| MindWhiz`.
  They are emitted through `title.absolute` so the root `%s | MindWhiz` template can never
  double-brand them.
- **36 unique meta descriptions**, 150–160 characters, each ending in an explicit CTA
  (*"Free quote."*, *"Book a free review."*, *"Get NOC pricing."*) to lift SERP click-through, not
  just impressions.
- **Zero duplicate titles or descriptions** across the site.

### 2.2 Canonicalisation

`buildMetadata()` returns a self-referencing canonical for every route. Dynamic routes that have no
entry in the map still get a canonical pinned to their own path, so a new slug can never end up
competing with an existing URL for the same query.

### 2.3 Keyword strategy

Targets are **winnable, high-intent long-tail commercial terms** rather than head terms already owned
by the large staffing brands — for example:

| Page | Target intent |
|---|---|
| `/services/noc-monitoring` | *outsourced 24/7 NOC monitoring services USA* |
| `/services/it-helpdesk-24-7` | *white-label 24/7 IT helpdesk services USA* |
| `/services/cybersecurity-monitoring` | *managed SOC & MDR monitoring services USA* |
| `/services/construction-estimation` | *outsourced construction estimating & takeoffs USA* |
| `/services/finance-accounting` | *finance & accounting outsourcing USA, AP & AR* |

Every commercial page is geo-qualified ("USA") because that is how the buyer actually phrases the
query — this is where on-page and GEO work overlap deliberately.

### 2.4 Content and structure

- One `H1` per page carrying the primary keyword; `H2`/`H3` structured around sub-intents and FAQ
  questions.
- Long-form service pages built to satisfy commercial-investigation intent in a single visit:
  problem framing → deliverables → process → proof → pricing signals → FAQ.
- Internal linking across service → industry → location → case study, plus contextual in-body links
  from blog posts into the money pages.
- Descriptive `alt` text on content imagery.
- Real Google Business Profile reviews rendered on the home and web-services pages, linking out to
  the live profile.

### 2.5 Social / sharing tags

Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:image`,
`og:locale`) and Twitter `summary_large_image` cards are generated per page. Previously every shared
link fell back to the homepage pitch regardless of which page was shared.

### 2.6 Indexation control

- Site-wide `index, follow` with `max-image-preview:large`, `max-snippet:-1`,
  `max-video-preview:-1` — removing the caps on what Google may show in rich results and AI
  Overviews.
- `/thank-you` is set to `noindex, follow` on purpose: if it ranked, visitors could land on it
  without ever submitting a form, firing a phantom Lead conversion and poisoning ad optimisation.
- `/samples/` is disallowed in `robots.txt`.

---

## 3. Technical SEO

### 3.1 Crawlability and indexation

**Dynamic XML sitemap** — [`src/app/sitemap.ts`](src/app/sitemap.ts) generates `/sitemap.xml` from
the same content sources the pages render from, so it can never drift out of sync. Priority tiers
follow the keyword map:

| Tier | Priority | Examples |
|---|---|---|
| Home | 1.0 | `/` |
| High-intent commercial | 0.9 | all `/services/*`, `/web-services`, `/case-studies`, `/contact`, `/locations/us`, `/locations/uk` |
| Medium | 0.7 | `/about`, `/blog`, all `/industries/*`, blog posts, case studies, `/locations/pk` |
| Low / utility | 0.4 | `/careers`, `/newsletter`, `/privacy`, `/terms` |

`changeFrequency` is `weekly` for the blog and `monthly` elsewhere.

**robots.txt** — [`src/app/robots.ts`](src/app/robots.ts) allows the full site except `/samples/`,
declares the sitemap, and adds an explicit allow-list for answer-engine crawlers (see §5).

### 3.2 Redirect map and link-equity preservation

25 permanent (301) redirects in [`next.config.mjs`](next.config.mjs) map the legacy
cybersecurity-staffing URL set onto its closest topical equivalent — old HR, finance, cloud,
cybersecurity, construction, client and blog URLs all now land on a relevant live page instead of
404ing.

This also **eliminated a live soft-404 leak**: URLs such as `/top-cloud-security-consulting` were
still earning around 267 impressions per 28 days at an average position of 71.7, but were falling
through the catch-all and 307-ing to the home page. Each now 301s to the correct topical page, so
that authority is recovered rather than discarded.

### 3.3 Canonical host

The canonical host is locked to `https://www.mindwhiz.com` across `metadataBase`, the sitemap,
robots.txt and every schema `@id` — no www / non-www or http / https duplication anywhere.

### 3.4 Performance / Core Web Vitals

| Area | What was done |
|---|---|
| Fonts | Inter self-hosted via `next/font` with `display: swap` and a CSS variable — no render-blocking external font request, no FOIT layout shift |
| Images | `next.config.mjs` configured to serve WebP + AVIF with a responsive `deviceSizes` / `imageSizes` ladder from 16px to 3840px |
| Compression | gzip/brotli enabled at the framework level (`compress: true`) |
| Third-party scripts | GTM and Meta Pixel loaded with `strategy="afterInteractive"` so tag managers never block first paint |
| Rendering | App Router server components — content and schema ship in the initial HTML, not after hydration |
| Mobile | Tailwind mobile-first breakpoints across every template |

### 3.5 Security and trust signals

Shipped in [`next.config.mjs`](next.config.mjs) and documented in
[`SECURITY_AUDIT.md`](SECURITY_AUDIT.md):

- `Content-Security-Policy` — **currently Report-Only by design**, so the embedded LeadConnector
  contact and careers forms can be verified in production before enforcement.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`

Next.js is pinned to a patched 14.2.35.

### 3.6 Structured-data safety

`JSON.stringify` does not escape `<`, `>`, `&` or U+2028/U+2029 — a value containing `</script>`
would break out of the surrounding `<script>` element and execute as markup, a classic stored-XSS
sink. [`src/lib/jsonLd.ts`](src/lib/jsonLd.ts) escapes those to their `\uXXXX` forms, keeping the
payload inert while remaining byte-for-byte valid JSON that crawlers parse identically. Every
JSON-LD block on the site goes through it.

### 3.7 Search Console

Verified via the HTML file at `/google5ec07636be44d60c.html`. GA4 and Search Console are also read
through service-account APIs into the internal admin dashboard
([`src/lib/analytics.ts`](src/lib/analytics.ts)) for traffic and keyword-rank reporting.

---

## 4. Structured data (Schema.org)

All schema is **server-rendered into the initial HTML** — answer-engine crawlers largely do not
execute JavaScript, so client-rendered schema is invisible to them.

The design is a single **entity graph**: one `Organization` node at `@id = .../#organization` that
every other node references as `provider` or `publisher`. Machines therefore resolve one
unambiguous MindWhiz entity instead of a dozen loose mentions.

| Type | Where | Declares |
|---|---|---|
| `Organization` | Root layout (all pages) | Master entity node |
| `ProfessionalService` | Root layout | B2B service intent, `serviceType`, `areaServed` |
| `LocalBusiness` | Root layout | Address, geo, opening hours, `priceRange` |
| `PostalAddress` | Root + location pages | Lahore head-office NAP |
| `GeoCoordinates` | Root layout | 31.4697 / 74.2728 |
| `OpeningHoursSpecification` | Root layout | 24/7 coverage |
| `ContactPoint` ×2 | Root layout | US/UK sales line + customer support |
| `WebSite` | Root layout | Site entity, `publisher → Organization` |
| `Service` | Every service page | Name, description, `serviceType`, `areaServed`, `provider` |
| `OfferCatalog` / `Offer` | Service pages | Service line-up as structured offers |
| `BreadcrumbList` / `ListItem` | Service, location, case-study pages | Hierarchy + SERP breadcrumbs |
| `FAQPage` / `Question` / `Answer` | Every service + industry page | Direct source for AI Overviews |
| `Blog` | `/blog` | Editorial hub |
| `Article` / `BlogPosting` | Blog posts | Authored content with publisher attribution |
| `Country` (`areaServed`) | Root + every Service node | US / UK / PK targeting |

The root entity is deliberately **triple-typed** `Organization + ProfessionalService +
LocalBusiness` so a single node satisfies both local-pack signals (address, geo, hours) and B2B
service intent (`areaServed`, `serviceType`).

---

## 5. AEO — Answer Engine Optimisation

Work done specifically so MindWhiz is **retrievable and citable** in Google AI Overviews, ChatGPT
Search, Perplexity and Claude — a different problem from ranking a blue link.

### 5.1 AI crawler access

The default failure mode for a modern site is being invisible to AI answers because its crawlers
were never allowed in. `robots.txt` explicitly allows all twelve:

`GPTBot` · `ChatGPT-User` · `OAI-SearchBot` · `PerplexityBot` · `Perplexity-User` · `ClaudeBot` ·
`Claude-User` · `Claude-SearchBot` · `Google-Extended` · `Applebot-Extended` · `Bingbot` · `CCBot`

### 5.2 `/llms.txt` — a purpose-built citation file

[`public/llms.txt`](public/llms.txt) is a machine-readable company brief containing:

- a one-paragraph entity definition of what MindWhiz is;
- a **"Key facts for citation"** block — legal name, head office, markets served, contact numbers,
  operating model;
- the full service list, each with its canonical URL and a one-line description;
- industries served, location URLs, proof-of-work links;
- a pre-written FAQ set answering the questions buyers actually ask.

This gives a generative engine a single, correct, unambiguous source to quote rather than making it
infer the company from scattered marketing copy.

### 5.3 FAQPage schema everywhere it matters

[`src/components/FaqSection.tsx`](src/components/FaqSection.tsx) emits valid
`FAQPage → Question → acceptedAnswer → Answer` JSON-LD on every service and industry page. This is
the single highest-leverage format for being lifted verbatim into an AI answer or a featured
snippet.

### 5.4 Answer-first copy

Each FAQ answer is written to be **self-contained and quotable** — it makes sense with zero
surrounding context. That is the form an answer engine can cite without rewriting, and rewriting is
where attribution gets lost.

### 5.5 Entity disambiguation

`alternateName: "MindWhiz Solutions"`, a declared slogan, and `sameAs` links to LinkedIn, Instagram
and Facebook, so third-party profiles resolve back to the same entity node.

### 5.6 Attributable proof

Case studies are published with **named clients and concrete outcomes** — Alpha Bravo Construction,
Villa Tech, Inovatiqa. Specific, attributable claims are what language models quote; generic
marketing superlatives are not.

### 5.7 Snippet-permissive robots

`max-snippet:-1` and `max-image-preview:large` remove length caps on what Google may surface in AI
Overviews and featured snippets.

---

## 6. GEO — Geographic & Generative Engine Optimisation

### 6.1 Location landing pages

Three dedicated, indexable pages, each with its own hero, local intro, timezone and coverage detail,
market-specific highlights and an emphasised subset of services:

| Page | Positioning | Sitemap priority |
|---|---|---|
| `/locations/us` | Nationwide US, US-hours account management | 0.9 |
| `/locations/uk` | United Kingdom (London) | 0.9 |
| `/locations/pk` | Lahore — head office and delivery hub, 65+ engineers | 0.7 |

### 6.2 NAP consistency

Name, address and primary phone (`+92 321 1116451`) in schema match the **verified Google Business
Profile exactly**. NAP consistency is the strongest single local ranking signal and the one most
often broken by inconsistent listings. The same facts are repeated identically in `/llms.txt`, so
generative engines answering *"where is MindWhiz based"* return the correct, consistent answer.

### 6.3 Deliberate policy: no fabricated US address

The build **does not claim a US physical office**. Publishing an unstaffed US address is the fastest
route to a Google Business Profile suspension, which would cost the verified Lahore listing. This is
documented in-file in [`src/app/layout.tsx`](src/app/layout.tsx).

US and UK ranking is earned instead through:

- country-level `areaServed` on the Organization **and** on every `Service` node;
- a clearly-labelled US/UK sales `ContactPoint` (`+1 832 900 4608`) — a contact channel, not a
  location;
- geo-qualified titles, descriptions and page copy targeting US buyer intent;
- the dedicated `/locations/us` and `/locations/uk` pages.

### 6.4 Local signals

- Full `PostalAddress` (Block E2, WAPDA Town Phase 1, Lahore, Punjab, PK) with `GeoCoordinates`
  31.4697 / 74.2728 and a `hasMap` link to the Google Maps entry.
- `OpeningHoursSpecification` covering all seven days, 00:00–23:59, consistent with the 24/7
  delivery claim in the page copy.
- Real GBP reviews surfaced on-site with direct links to the profile and to the review form,
  feeding the review-velocity signal that drives local-pack ranking.

---

## 7. Analytics and conversion tracking

SEO results are only provable if the measurement layer is clean.

| Item | Detail |
|---|---|
| Google Tag Manager | `GTM-WNJXTS4Z`, loaded `afterInteractive` with a `noscript` iframe fallback |
| Meta Pixel | `1270428855061399` — `PageView` on load |
| Lead conversion integrity | [`src/lib/leadEvent.ts`](src/lib/leadEvent.ts) writes a one-time `sessionStorage` marker at the exact moment LeadConnector confirms the contact was saved; `/thank-you` consumes it once and deletes it. A 5-minute expiry means a stale tab loses a conversion rather than inventing one. This blocks phantom conversions from Submit clicks, direct `/thank-you` visits and page refreshes. |
| CAPI readiness | Each lead is issued a UUID event ID, ready for server-side Conversions API de-duplication |
| GA4 | Traffic and top-pages data pulled into the admin dashboard via service account |
| Search Console | Query, impression, click and average-position data in the same dashboard |

---

## 8. Recommended next steps

Not part of the delivered scope — the prioritised backlog for the next phase.

| Priority | Item | Why |
|---|---|---|
| High | Enforce CSP | Flip `CSP_ENFORCE` to `true` and re-add `upgrade-insecure-requests` in the same commit, once the embedded forms are confirmed working in production |
| High | Migrate `<img>` → `next/image` | Most templates still use raw `<img>`. Migrating unlocks automatic WebP/AVIF, lazy loading and explicit dimensions — the largest remaining LCP and CLS win |
| Medium | `Review` / `AggregateRating` schema | Real GBP reviews already render on-site but are not marked up, so no star rich result is possible today. Mark up only genuine, verifiable reviews |
| Medium | Return a real 404 | `not-found.tsx` currently redirects to home. Now that the 301 map covers the URLs that matter, a genuine 404 for truly dead URLs is cleaner for crawl budget than a soft 404 |
| Medium | E-E-A-T signals on the blog | Named authors with credentials, `Person` schema, and a published editorial policy — a direct trust input for both Google's quality systems and LLM citation |
| Medium | Expand the blog cluster | 8 posts live. Target 2–4 per month against the long-tail question set already mapped in `seo.config.ts`, each linking into its money page |
| Low | `hreflang` for US/UK | Worth adding if the US and UK copy diverges materially |
| Low | Sitemap `lastModified` accuracy | Static routes stamp build time; a real last-edited date per page is a more honest freshness signal |

---

*Prepared from the live codebase. Every claim in this document is traceable to the file referenced
beside it.*
