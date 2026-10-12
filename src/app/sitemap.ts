import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";
import { industryPages } from "@/lib/industryPages";
import { getAllPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/content";
import { siteUrl } from "@/seo.config";

// lastmod must be the date the page's CONTENT last changed (SEO audit T4).
// The old sitemap stamped every URL with the build time, so Google learned to
// ignore it. Bump a date here when you materially edit that page; blog posts use
// updated/date.
const PAGE_UPDATED: Record<string, string> = {
  "": "2026-10-12",
  "/services/digital-marketing": "2026-07-29",
  "/web-services": "2026-10-05",
  "/services/hr-services": "2026-10-12",
  "/services/finance-accounting": "2026-10-12",
  "/services/construction-estimation": "2026-10-12",
  "/why-mindwhiz": "2026-10-12",
  "/case-studies": "2026-09-03",
  "/contact": "2026-10-12",
  "/locations/us": "2026-10-12",
  "/locations/uk": "2026-10-12",
  "/about": "2026-10-12",
  "/blog": "2026-10-12",
  "/locations/pk": "2026-10-05",
  "/careers": "2026-07-25",
  "/newsletter": "2026-07-29",
  "/privacy": "2026-10-12",
  "/terms": "2026-10-12",
};
const SERVICE_PAGES_UPDATED = "2026-10-12";
const CASE_STUDIES_UPDATED = "2026-09-02";

export const revalidate = 3600;

// Priority tiers follow the keyword map: 1.0 home, 0.9 high-intent commercial
// pages, 0.7 medium, 0.4 low (legal/utility).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    { path: "/services/digital-marketing", priority: 0.9 },
    { path: "/web-services", priority: 0.9 },
    { path: "/services/hr-services", priority: 0.9 },
    { path: "/services/finance-accounting", priority: 0.9 },
    { path: "/services/construction-estimation", priority: 0.9 },
    { path: "/why-mindwhiz", priority: 0.9 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/locations/us", priority: 0.9 },
    { path: "/locations/uk", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/locations/pk", priority: 0.5 },
    { path: "/careers", priority: 0.4 },
    { path: "/newsletter", priority: 0.4 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(PAGE_UPDATED[path]),
    changeFrequency: changeFrequency ?? ("monthly" as const),
    priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${siteUrl}/services/${page.slug}`,
    lastModified: new Date(SERVICE_PAGES_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industryPages.map((page) => ({
    url: `${siteUrl}/industries/${page.slug}`,
    lastModified: new Date(SERVICE_PAGES_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Includes admin-published (Supabase) posts, not just the static seeds.
  const blogRoutes: MetadataRoute.Sitemap = (await getAllPosts()).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(CASE_STUDIES_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes, ...caseStudyRoutes];
}
