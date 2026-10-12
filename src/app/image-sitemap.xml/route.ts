import { servicePages } from "@/lib/servicePages";
import { industryPages } from "@/lib/industryPages";
import { getAllPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/content";
import { locations } from "@/lib/locations";
import { siteUrl } from "@/seo.config";

// Image sitemap (Google image extension). Next 14's sitemap.ts cannot emit
// <image:image>, so this route builds one from the same data the pages render:
// hero banners, capability cards, blog images and case-study screenshots.
// Listed in robots.txt next to /sitemap.xml.
export const revalidate = 3600;

const STATIC_PAGE_IMAGES: Record<string, string[]> = {
  "/about": ["/banners/about-us.png", "/leadership/muhammad-ali.png", "/leadership/muhammad-aftab-zafar.png"],
  "/why-mindwhiz": ["/banners/why-mindwhiz.png"],
  "/case-studies": ["/banners/case-studies.png"],
  "/services/hr-services": ["/banners/hr.png"],
  "/services/finance-accounting": ["/banners/finance.png"],
  "/services/construction-estimation": ["/banners/construction-estimation.png"],
  "/services/digital-marketing": ["/banners/digital-marketing.png"],
  "/web-services": ["/banners/web-services.png"],
};

const abs = (src: string) => (src.startsWith("http") ? src : `${siteUrl}${src}`);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const pages = new Map<string, Set<string>>();
  const add = (path: string, ...srcs: (string | undefined)[]) => {
    const set = pages.get(path) ?? new Set<string>();
    for (const s of srcs) if (s && !s.startsWith("data:")) set.add(abs(s));
    pages.set(path, set);
  };

  add("", "/og-default.jpg", "/hero-poster.jpg");
  for (const [path, imgs] of Object.entries(STATIC_PAGE_IMAGES)) add(path, ...imgs);
  for (const p of servicePages) {
    add(`/services/${p.slug}`, p.hero.image, p.intro.card?.image, ...p.capabilities.map((c) => c.image));
  }
  for (const p of industryPages) {
    add(`/industries/${p.slug}`, p.hero.image, p.intro.card?.image, ...p.capabilities.map((c) => c.image));
  }
  for (const loc of locations) add(`/locations/${loc.slug}`, loc.heroImage);
  for (const cs of caseStudies) add(`/case-studies/${cs.slug}`, cs.img);
  for (const post of await getAllPosts()) {
    add(
      `/blog/${post.slug}`,
      post.image,
      ...post.body.flatMap((b) => (b.type === "img" ? [b.src] : []))
    );
  }

  const urls = [...pages.entries()]
    .filter(([, imgs]) => imgs.size)
    .map(
      ([path, imgs]) =>
        `  <url>\n    <loc>${esc(`${siteUrl}${path}`)}</loc>\n` +
        [...imgs].map((src) => `    <image:image><image:loc>${esc(src)}</image:loc></image:image>`).join("\n") +
        `\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
