# MindWhiz Website

The public marketing website for **MindWhiz** — a hybrid staffing, staff-augmentation,
and BPO company (HQ Houston, TX; delivery hubs in London, UK and Lahore, Pakistan).

A content-driven, animation-heavy **Next.js (App Router)** site. All content is authored
as typed data — there is no CMS, database, or backend.

> 📖 **Full technical reference:** see [`DOCUMENTATION.md`](./DOCUMENTATION.md) for the
> complete stack, package list, route inventory, content model, forms, and
> SEO/AEO/GEO implementation.

---

## Tech stack

| Area | Tech |
|---|---|
| Framework | Next.js 14 (App Router) · React 18 · TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Animation | framer-motion · GSAP + ScrollTrigger · Lenis (smooth scroll) |
| Icons | lucide-react |
| Forms | GoHighLevel / LeadConnector embeds (contact, careers, booking) |
| Hosting | Vercel |

---

## Getting started

```bash
# install
npm install

# dev server (http://localhost:3000)
npm run dev

# production build + serve
npm run build
npm run start

# lint
npm run lint
```

> **Windows local-dev note:** on this machine, run the Next binary from an **uppercase
> `C:\`** path and keep **one dev process per `.next`** — `npm run dev` from a lowercase
> path has triggered a hydration / ActionQueueContext crash.

---

## Project structure

```
src/
├── app/            # Routes + layouts (App Router)
│   ├── layout.tsx  # Root: fonts, global CSS, Org/WebSite JSON-LD, SmoothScroll
│   ├── page.tsx    # Home
│   ├── services/   # /services/[slug] (9) + 4 standalone service pages
│   ├── industries/[slug]/   # 9 industry pages
│   ├── locations/{us,uk,pk}/
│   ├── blog/ + blog/[slug]/
│   ├── case-studies/ + case-studies/[slug]/
│   ├── sitemap.ts · robots.ts
│   └── (about, careers, contact, web-services, newsletter, privacy, terms, …)
├── components/     # 22 shared UI components (ServiceDetailPage, Footer, FaqSection, …)
├── lib/            # Typed content + animation hooks (content, servicePages, blog, …)
└── seo.config.ts   # Per-page SEO map + metadata builder
```

**Path alias:** `@/*` → `./src/*`.

---

## Content model

There is no CMS. Content lives in typed modules under `src/lib`:

| File | Drives |
|---|---|
| `content.ts` | Home page, nav, footer, stats, case studies, testimonials |
| `servicePages.ts` | `/services/[slug]` (9 services) |
| `industryPages.ts` | `/industries/[slug]` (9 industries) |
| `locations.ts` | `/locations/{us,uk,pk}` |
| `blog.ts` | `/blog` + `/blog/[slug]` |

To add or edit a page's copy, edit the corresponding data file — the shared renderers
(`ServiceDetailPage`, `LocationPage`, `BlogPostPage`, `CaseStudyDetail`) pick it up.
To change a page's title/description, edit `SEO_MAP` in `src/seo.config.ts`.

---

## Forms

Lead capture uses **GoHighLevel / LeadConnector** embeds (no custom backend):

- **Contact** and **Careers** — embedded iframe forms.
- **"Book a consultation"** CTAs — LeadConnector booking widget.
- **Newsletter** — client-side validation only; **not yet wired to an ESP** (`// TODO`).

---

## SEO / AEO / GEO

The site implements classic **SEO**, **Answer Engine Optimization** (FAQ schema,
question-first content), and **Generative Engine Optimization** (AI-crawler allow-list,
`public/llms.txt`, a stable JSON-LD entity graph). Full breakdown in
[`DOCUMENTATION.md` §10](./DOCUMENTATION.md#10-seo-aeo--geo-implementation).

---

## Deployment

Deployed on **Vercel**. `.vercelignore` keeps large local assets (screenshots, zips,
"Service Coverage" exports) out of the deploy.

> The canonical/site URL is set to the production domain `mindwhiz.com` across all
> files (canonicals, OG URLs, sitemap, robots, and blog/case-study schema). See
> [`DOCUMENTATION.md` §10.5](./DOCUMENTATION.md#105-seogeo-base-url).
