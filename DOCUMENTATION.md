# MindWhiz Website — Technical Documentation

_Last generated: 2026-07-25_

A single-source technical reference for the MindWhiz marketing website: the stack,
packages, routing, page inventory, content model, forms, integrations, styling
system, SEO, and deployment.

---

## 1. Overview

**MindWhiz** is a B2B staffing / staff-augmentation / BPO company. This repository is
its public marketing website — a content-driven, animation-heavy single site built on
**Next.js (App Router)**.

| | |
|---|---|
| **Product** | MindWhiz corporate + services website |
| **Type** | Statically-rendered marketing site (Next.js App Router, mostly client components) |
| **Repo package name** | `mindwhiz` |
| **Company tagline** | _Flexible Talent, Scalable Teams, Global Impact_ |
| **Regions served** | United States (HQ, Houston TX), United Kingdom (London), Pakistan (Lahore) |
| **Contact** | info@mindwhiz.com · +1 (832) 900-4608 |
| **Hosting** | Vercel |

---

## 2. Tech Stack

### Runtime / framework
| Layer | Choice | Version |
|---|---|---|
| Framework | **Next.js** (App Router, `src/app`) | 14.2.15 |
| UI library | **React** / React DOM | 18.3.1 |
| Language | **TypeScript** (strict) | 5.6.3 |
| Styling | **Tailwind CSS** (+ PostCSS, Autoprefixer) | 3.4.14 |
| Rendering | React Strict Mode on; per-page `generateStaticParams` for dynamic routes | — |

### Motion / interaction
| Purpose | Library | Version |
|---|---|---|
| Component/scroll-reveal animation | **framer-motion** | 11.11.17 |
| Pinned / scroll-timeline animation | **gsap** + **ScrollTrigger** | 3.15.0 |
| React helper for GSAP | **@gsap/react** | 2.1.2 |
| Smooth scrolling | **lenis** | 1.3.25 |
| Icons | **lucide-react** | 0.454.0 |

### Tooling (dev dependencies)
| Purpose | Package | Version |
|---|---|---|
| Types | `@types/node`, `@types/react`, `@types/react-dom` | 20.16.11 / 18.3.11 / 18.3.0 |
| CSS pipeline | `tailwindcss`, `postcss`, `autoprefixer` | 3.4.14 / 8.4.47 / 10.4.20 |
| Browser automation (local scripts/testing) | `playwright` | 1.61.1 |
| Compiler | `typescript` | 5.6.3 |

> There is **no runtime data layer** (no database, no API routes, no CMS SDK). All
> content is authored as typed TypeScript data in `src/lib/*` and rendered at build time.

---

## 3. Packages (full dependency list)

**dependencies**
```
@gsap/react ^2.1.2
framer-motion 11.11.17
gsap ^3.15.0
lenis ^1.3.25
lucide-react 0.454.0
next 14.2.15
react 18.3.1
react-dom 18.3.1
```

**devDependencies**
```
@types/node 20.16.11
@types/react 18.3.11
@types/react-dom 18.3.0
autoprefixer 10.4.20
playwright ^1.61.1
postcss 8.4.47
tailwindcss 3.4.14
typescript 5.6.3
```

### npm scripts
| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Local dev server |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve production build |
| `lint` | `next lint` | ESLint (next/core-web-vitals) |

> **Local dev note (from project memory):** run the Next binary directly from an
> uppercase `C:\` path and keep one process per `.next` — `npm run dev` and lowercase
> paths have caused hydration/ActionQueueContext issues on this machine.

---

## 4. Project Structure

```
Noumaassadullah/
├── src/
│   ├── app/                    # Next.js App Router (routes + layouts)
│   │   ├── layout.tsx          # Root layout: fonts, global CSS, Org/WebSite JSON-LD, SmoothScroll
│   │   ├── globals.css         # Tailwind layers + viewport-var / zoom / Lenis CSS
│   │   ├── page.tsx            # Home page
│   │   ├── sitemap.ts          # Dynamic sitemap.xml
│   │   ├── robots.ts           # robots.txt (+ AI-crawler allow-list)
│   │   ├── about/ agency/ culture/ careers/ contact/ ...
│   │   ├── services/           # /services/[slug] + 4 standalone service pages
│   │   ├── industries/[slug]/  # Industry detail pages
│   │   ├── locations/{us,uk,pk}/
│   │   ├── blog/ + blog/[slug]/
│   │   ├── case-studies/ + case-studies/[slug]/
│   │   ├── web-services/
│   │   ├── newsletter/ privacy/ terms/ why-mindwhiz/
│   │   └── samples/clients/    # internal showcase (noindex)
│   ├── components/             # 22 shared UI components
│   ├── lib/                    # 11 content + animation-hook modules
│   └── seo.config.ts           # Per-page SEO map + metadata builder
├── public/                     # Images, videos, banners, llms.txt, mindwhiz-mark.png
├── next.config.mjs             # Images, compression, 301 redirects
├── tailwind.config.ts          # Brand colors, screen breakpoints, keyframes
├── tsconfig.json               # Strict TS, @/* → ./src/*
├── postcss.config.mjs
├── .vercelignore               # Excludes screenshots / zips from deploy
└── package.json
```

**Path alias:** `@/*` → `./src/*` (configured in `tsconfig.json`).

---

## 5. Routing & Page Inventory

All routes live under `src/app`. Dynamic segments generate static params from typed
data at build time.

### Core
| Route | Source file | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home (hero, stats, services, industries, case studies, FAQ, contact) |
| `/contact` | `app/contact/…` | Contact page + embedded lead form |
| `/about` | `app/about/…` | Company story |
| `/why-mindwhiz` | `app/why-mindwhiz/…` | Positioning / comparison |
| `/agency` | `app/agency/…` | Agency page (client component) |
| `/culture` | `app/culture/…` | Culture page |
| `/careers` | `app/careers/…` | Careers + embedded application form |

### Services (13 total)
**9 dynamic** — `app/services/[slug]/page.tsx`, data from `lib/servicePages.ts`, rendered via `ServiceDetailPage`:
`it-helpdesk-24-7`, `noc-monitoring`, `cybersecurity-monitoring`, `cloud-infrastructure`, `devops-automation`, `endpoint-security`, `server-network-administration`, `remote-desktop-assets`, `staff-augmentation`

**4 standalone** — hard-coded routes with their own layout/client:
`/services/hr-services`, `/services/finance-accounting`, `/services/digital-marketing`, `/services/construction-estimation`

Plus **`/web-services`** — a separate web-development landing page (custom tech-stack showcase, portfolio slider, SEO/AEO/GEO section).

### Industries (9 dynamic)
`app/industries/[slug]/page.tsx`, data from `lib/industryPages.ts`, rendered via `ServiceDetailPage`:
`information-technology`, `ecommerce-retail`, `startups-smbs`, `construction-engineering`, `industrial-manufacturing`, `accounting-finance`, `professional-services`, `logistics-supply-chain`, `healthcare-healthtech`

### Locations (3)
`/locations/us`, `/locations/uk`, `/locations/pk` — data from `lib/locations.ts`, rendered via `LocationPage`, each with its own `LocalBusiness` JSON-LD.

### Content
| Route | Source | Notes |
|---|---|---|
| `/blog` | `lib/blog.ts` → `BlogListPage` | 6 posts, category filters |
| `/blog/[slug]` | `lib/blog.ts` → `BlogPostPage` | Block-based article body |
| `/case-studies` | `lib/content.ts` | 3 case studies (Alpha Bravo, Villa Tech, Inovatiqa) |
| `/case-studies/[slug]` | `lib/content.ts` → `CaseStudyDetail` | Challenge / approach / outcomes / metrics |

### Utility / legal
| Route | Notes |
|---|---|
| `/newsletter` | Subscribe landing (client-side form — see §7) |
| `/privacy`, `/terms` | Legal pages via `LegalPage` |
| `/samples/clients` | Internal showcase — **noindex** (blocked in `robots.ts`) |
| `/sitemap.xml` | Generated from all typed data |
| `/robots.txt` | Generated (allows AI crawlers, disallows `/samples/`) |

### Legacy redirects (301, in `next.config.mjs`)
```
/hr                      → /services/hr-services
/finance                 → /services/finance-accounting
/service                 → /services/digital-marketing
/construction-estimation → /services/construction-estimation
```

---

## 6. Content Model (data-driven)

Content is authored as typed data — no CMS. Key modules in `src/lib`:

| Module | Exports | Drives |
|---|---|---|
| `content.ts` | `company`, `nav`, `hero`, `stats`, `services` (13), `differentiators`, `comparison`, `process`, `industries`, `caseStudies` (3), `testimonials`, `clients`, `certifications`, `footerGroups` | Home page, footer, case studies |
| `servicePages.ts` | `servicePages[]` (9) + `getServicePage()` — typed `ServicePageContent` | `/services/[slug]` |
| `industryPages.ts` | `industryPages[]` (9) + `getIndustryPage()` — reuses `ServicePageContent` shape | `/industries/[slug]` |
| `locations.ts` | `locations[]` (3), `getLocation()`, `locationMetadata()`, `locationJsonLd()` | `/locations/*` |
| `blog.ts` | `posts[]` (6), `blogCategories`, `getPost()`, `formatDate()` | `/blog`, `/blog/[slug]` |

Each `ServicePageContent` entry defines a full page: hero (with rotating highlight
words), intro, proof stats, optional problems grid, capabilities deck, benefits,
process steps, FAQs, and final CTA — so services and industries share one renderer
(`ServiceDetailPage`).

---

## 7. Forms & Integrations

Lead capture is handled by **GoHighLevel / LeadConnector (HighLevel)** — embedded
iframes + the `form_embed.js` script (`link.msgsndr.com`). There is no custom backend.

| Location | Type | Provider / ID |
|---|---|---|
| **Contact form** (`ContactFormSection.tsx`, `/contact`) | Embedded iframe lead form | LeadConnector form `OyGF6Yyhw5QmxIveuuln` — "Get Your Free Consultation - Inbound Lead Form" |
| **Careers application** (`CareersPageClient.tsx`) | Embedded iframe form | LeadConnector form `CCAqC31eYUNM2RuEgODF` |
| **"Book a consultation" CTAs** (Footer, `ServiceDetailPage`, `PageBanner`, `web-services`) | Booking widget link | LeadConnector booking `I1hzuNe9sXdClDrIUCe3` |
| **Newsletter** (`NewsletterPageClient.tsx`, `/newsletter`) | **Client-side only** — validates email + shows success state | ⚠️ Not wired to any ESP yet (`// TODO: POST to your email provider`) |
| Email links | `mailto:` | `info@mindwhiz.com` (footer, contact, legal, agency) |

> **Loading pattern:** the HighLevel embed script is injected on mount (`useEffect`)
> or via `next/script` with `strategy="lazyOnload"`.

---

## 8. Components & Utilities

### Components (`src/components`, 22)
Layout & chrome: `SiteHeader`, `Footer`, `PageBanner`, `Cta`, `CardCornerArrow`.
Page renderers: `ServiceDetailPage` (services + industries), `LocationPage`,
`BlogListPage`, `BlogPostPage`, `CaseStudyDetail`, `LegalPage`.
Sections: `ContactFormSection`, `FaqSection`, `GrowSection`, `ProcessScroll`,
`ProcessIntroBanner`, `ClientsSection`, `TrustedByClients`,
`DigitalMarketingStackSection`, `ParticleBackground`.
Infra: `SmoothScroll` (mounts Lenis), `JsonLd` (structured-data helper).

### Animation / layout hooks (`src/lib`)
| Module | Purpose |
|---|---|
| `lenis.ts` | Singleton handle to the app-wide Lenis instance (so pinned sections scroll _through_ Lenis instead of fighting `window.scrollTo`) |
| `useCapabilitiesRide.ts` | GSAP ScrollTrigger "ride" for the capabilities carousel |
| `usePinnedActive.ts` | Tracks the active panel in a pinned scroll deck |
| `useSlideSnap.ts` | Slide/snap behavior |
| `panelMotion.ts` | Shared panel motion config |
| `useBelowSm.ts` | Small-viewport detection hook |

> **Scroll-animation gotchas (project memory):** per-card reveals use framer
> `whileInView` (not a section-wide `useScroll` slice); pinned carousels use GSAP
> ScrollTrigger sized proportionally to overflow; test scroll animations with
> `page.mouse.wheel` + settle-polling (not `window.scrollTo`, which fights Lenis).

---

## 9. Styling System

- **Tailwind CSS** with a small custom theme (`tailwind.config.ts`):
  - Brand colors: `brand.green #9CCC3C`, `brand.greenDark #7DB022`,
    `brand.magenta #F00C60`, `brand.magentaDark #C40A4E`, `brand.ink #0F1B2D`.
    (Accent pink `#ed1164` is also used inline across pages.)
  - Custom breakpoint `nav: 1200px` (header switches hamburger ↔ full nav).
  - `glow-pulse` keyframe/animation for the footer "Hiring" badge.
- **Fonts** via `next/font/google`: **Inter** (`--font-sans`, root layout) and
  **Plus Jakarta Sans** (`--font-display`, loaded per client page).
- **Viewport-unit strategy** (`globals.css`): all full-bleed/full-height sizes use
  `--vh`/`--vw` vars. On short laptops (`min-width:1024px` + `max-height:800px` +
  fine pointer) the root applies `zoom: 0.8` and scales the vars to `1.25vh/vw` so
  full-screen sections still fill the screen. `*-screen` Tailwind utilities are
  remapped to `calc(var(--vh)*100)` etc.
- **Smooth scrolling**: `SmoothScroll` mounts **Lenis** (duration 1.1, custom
  easing, smooth wheel) in the root layout and re-anchors hash links (`/#services`,
  `/#contact`) after layout settles. `overflow-x: clip` (not `hidden`) protects
  sticky/pinned scroll decks.

---

## 10. SEO, AEO & GEO Implementation

The site is built for three overlapping discovery channels: **SEO** (classic search
ranking), **AEO** (Answer Engine Optimization — being lifted into Google AI Overviews,
featured snippets, voice answers), and **GEO** (Generative Engine Optimization — being
cited inside ChatGPT / Perplexity / Gemini answers). Each is implemented in code, not
just marketed on the web-services page.

> **Note — two brand names on the SEO offering.** `/web-services` also renders a
> customer-facing **SEO / AEO / GEO** marketing section (the `optimizations` array:
> "Search Engine Optimization", "Answer Engine Optimization", "Generative Engine
> Optimization"). That is a *service MindWhiz sells*. The implementation below is the
> site's *own* on-page technical SEO — the two are separate.

### 10.1 SEO (classic search)

- **`src/seo.config.ts` — single source of truth for metadata.** `SEO_MAP` holds a
  hand-tuned `{title, description}` for every route (titles ~50–60 chars, descriptions
  ~150–160 chars). `buildMetadata(path, fallback)` returns a full Next.js `Metadata`
  object with:
  - `title.absolute` (titles already carry `| MindWhiz`, so the root
    `%s | MindWhiz` template is bypassed to avoid double-branding),
  - `description`,
  - self-referencing **canonical** (`alternates.canonical`),
  - **OpenGraph** (`type`, `url`, `siteName`, title/description),
  - **Twitter** (`summary_large_image` card).
- **Root metadata** (`app/layout.tsx`): `metadataBase`, title template, default
  OG/Twitter, `icons` (`/mindwhiz-mark.png`), and an explicit `robots` block
  (`index/follow`, `max-image-preview: large`, `max-snippet: -1`,
  `max-video-preview: -1`).
- **Dynamic routes** read the same map: `services/[slug]` and `industries/[slug]` call
  `buildMetadata()` in `generateMetadata`, falling back to the page's own
  name/subtitle for any new slug so it still gets a unique title + canonical.
- **`sitemap.ts`** — `sitemap.xml` generated from all typed data with priority tiers
  (1.0 home · 0.9 high-intent commercial · 0.7 medium · 0.4 legal/utility) and
  `changeFrequency` (weekly for blog, monthly elsewhere).
- **`robots.ts`** — allows general crawl, **disallows `/samples/`** (internal
  showcase), and points to the sitemap.
- **`next.config.mjs`** — 301 redirects consolidate legacy service URLs so ranking
  signal carries over; AVIF/WebP image optimization for Core Web Vitals.

### 10.2 Structured data (JSON-LD) — powers SEO + AEO + GEO

All JSON-LD is **server-rendered into the initial HTML** (the `JsonLd` component and
inline `<script type="application/ld+json">` tags are server-safe), so crawlers and
answer engines see it without executing JS. A single **`@id` entity graph** ties every
page back to one organization node.

| Schema type | Where emitted | Role |
|---|---|---|
| `Organization` + `ProfessionalService` + `LocalBusiness` | Root `app/layout.tsx` — `@id: /#organization` | Master entity: name, address, geo, hours, `priceRange`, `areaServed` (US/UK/PK), `sameAs` (LinkedIn/Instagram/Facebook), `contactPoint`, `slogan` |
| `WebSite` | Root `app/layout.tsx` — `@id: /#website` | Site node, `publisher` → `/#organization` |
| `Service` + `BreadcrumbList` | `ServiceDetailPage` (9 services + 9 industries) and `serviceJsonLd()` in the 4 standalone service layouts + `/web-services` | `provider` → `/#organization`, `areaServed`, `serviceType`, plus Home → Section → Page breadcrumb trail |
| `FAQPage` (`Question` / `acceptedAnswer`) | `FaqSection` — co-located with the rendered accordion | **The core AEO surface** (see 10.3) |
| `LocalBusiness` (per region) | `locationJsonLd()` on `/locations/{us,uk,pk}` | `parentOrganization` → `/#organization`, `areaServed`, `knowsAbout` |
| `BlogPosting` | `BlogPostPage` (`/blog/[slug]`) | headline/author/dates, `publisher` → `/#organization` |
| `Article` (Case Study) + `BreadcrumbList` | `CaseStudyDetail` (`/case-studies/[slug]`) | `about` (client org), `articleSection`, breadcrumb |

Helpers: `JsonLd` + `serviceJsonLd(path, crumb)` in `src/components/JsonLd.tsx` (pull
name/description straight from `SEO_MAP` so schema stays in sync with page metadata).

### 10.3 AEO (Answer Engine Optimization)

- **`FAQPage` schema on every service, industry, and the home page.** `FaqSection`
  maps each `{q, a}` to a `Question` → `acceptedAnswer` node so answer engines can lift
  the Q&A directly into AI Overviews, snippets, and voice results. The code comment is
  explicit: _"lets answer engines (Google AI Overviews, ChatGPT, Perplexity) lift these
  Q&As directly into generated answers."_
- **Question-first content authored for extraction.** Each entry in `servicePages.ts` /
  `industryPages.ts` ships ~5 FAQs written as real buyer questions with self-contained,
  quotable answers (e.g. _"Is the helpdesk really staffed 24/7…"_), plus a
  `capabilitiesHook` (audience + a hook question) per page.
- **FAQPage is emitted once, at the accordion.** `ServiceDetailPage` intentionally does
  **not** duplicate FAQ schema — it is co-located inside `FaqSection` to avoid double
  markup.
- **Concise, answer-shaped metadata** (150–160 char descriptions) and a dedicated
  "Frequently asked" block in `llms.txt` reinforce the same Q&A signals.

### 10.4 GEO (Generative Engine Optimization)

- **AI-crawler allow-list in `robots.ts`.** Rather than a blanket scraper block, the
  generative/answer bots are explicitly allowed so the site is *citable*:
  `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `PerplexityBot`, `Perplexity-User`,
  `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `Google-Extended`,
  `Applebot-Extended`, `Bingbot`, `CCBot`.
- **`public/llms.txt`** — a purpose-built, citation-oriented brief for LLMs: a one-line
  company summary, a **"Key facts for citation"** block (name, HQ address, hubs,
  contact, model, markets), the full services list with URLs, industries, locations,
  case studies, a "Frequently asked" section, and a link to the sitemap.
- **Stable entity graph** — the shared `/#organization` `@id` referenced by every
  page's `provider`/`publisher` gives generative engines one consistent, resolvable
  entity to attribute facts to.
- **Server-rendered structured data + self-referencing canonicals** ensure the machine-
  readable facts are present in the raw HTML an LLM fetches.

### 10.5 SEO/GEO base URL

- **Base URL is normalized to the production domain.** `seo.config.ts`,
  `app/layout.tsx`, `lib/locations.ts`, `robots.ts`, `ServiceDetailPage.tsx`,
  `BlogPostPage.tsx`, `CaseStudyDetail.tsx`, and `public/llms.txt` all use
  `https://mindwhiz.com`. The `publisher`/`@id` references in blog & case-study schema
  resolve to the same node as the Organization defined in the root layout, and
  canonicals/OG/sitemap point at the production domain.
- Social profiles referenced in `sameAs`: LinkedIn `company/mindwhiz`, Instagram
  `mindwhiz2.0`, Facebook `mindwhizofficial`. (X/Twitter was intentionally dropped.)

---

## 11. Deployment

- **Platform: Vercel.** Evidenced by `.vercelignore`, `.vercel` in `.gitignore`, and
  the configured site URL.
- **`next.config.mjs`:**
  - `reactStrictMode: true`, `compress: true`.
  - Image optimization: formats `webp`/`avif`; custom `deviceSizes` and `imageSizes`.
  - 301 redirects for legacy root-level service URLs (see §5).
- **`.vercelignore`** keeps large local assets out of the deploy: `Screenshot *.png`,
  `Service Coverage*`, `*.zip`.
- **Assets** live in `public/` (banners, `service-coverage/`, `industries/`,
  `clients/`, `leadership/`, `portfolio/`, `stack/`, `certs/`, hero videos in
  `.mp4`/`.webm`, `mindwhiz-mark.png` logo/OG image).

> The canonical/site URL is set to the production domain **`https://mindwhiz.com`**
> (hard-coded in `seo.config.ts`, `app/layout.tsx`, `lib/locations.ts`, `robots.ts`,
> and the JSON-LD components), so canonicals, OG URLs, sitemap, and JSON-LD all
> reference the real domain. (`mindwhiz.com` also appears as `sourceUrl`
> back-references to the old WordPress site.)

---

## 12. Notes & Open Items

- **Package/repo name** is `mindwhiz`.
- **Newsletter form** validates client-side only; needs to be wired to an ESP.
- **`README.md`** currently contains an unrelated freelancer bio placeholder — not
  project documentation (this file supersedes it for technical reference).
- **No analytics is wired in code** — the privacy policy and the web-services page
  mention analytics (Google Analytics etc.) as offerings/plans, but no tracking
  script is installed on the site itself.
- **No tests** beyond Playwright being available as a dev dependency for local
  scripting; there is no test suite in the repo.
- Repo working-tree artifacts (`.tmp-verify-pin.js`, `dev-*.log`) are local-only and
  ignored/untracked.

---

## 13. Quick Reference

| Question | Answer |
|---|---|
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animation | framer-motion + GSAP/ScrollTrigger + Lenis smooth scroll |
| Icons | lucide-react |
| Content source | Typed data in `src/lib/*` (no CMS/DB/API routes) |
| Forms | GoHighLevel / LeadConnector embeds (contact + careers + booking) |
| Total routes | Home + 13 services + web-services + 9 industries + 3 locations + blog + case studies + company/legal/utility pages |
| Hosting | Vercel |
| Logo / OG image | `/public/mindwhiz-mark.png` |
```
