import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";
import { industryPages } from "@/lib/industryPages";
import { posts } from "@/lib/blog";
import { caseStudies } from "@/lib/content";
import { siteUrl } from "@/seo.config";

// Priority tiers follow the keyword map: 1.0 home, 0.9 high-intent commercial
// pages, 0.7 medium, 0.4 low (legal/utility). changeFrequency is weekly for
// the blog and monthly everywhere else.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    // High-intent commercial service pages (standalone pages under /services)
    { path: "/services/digital-marketing", priority: 0.9 },
    { path: "/web-services", priority: 0.9 },
    { path: "/services/hr-services", priority: 0.9 },
    { path: "/services/finance-accounting", priority: 0.9 },
    { path: "/services/construction-estimation", priority: 0.9 },
    // High-intent company + local pages
    { path: "/why-mindwhiz", priority: 0.9 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/locations/us", priority: 0.9 },
    { path: "/locations/uk", priority: 0.9 },
    // Medium
    { path: "/about", priority: 0.7 },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/locations/pk", priority: 0.7 },
    // Low
    { path: "/careers", priority: 0.4 },
    { path: "/newsletter", priority: 0.4 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency ?? ("monthly" as const),
    priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${siteUrl}/services/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industryPages.map((page) => ({
    url: `${siteUrl}/industries/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ];
}
