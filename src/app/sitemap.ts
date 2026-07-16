import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";
import { industryPages } from "@/lib/industryPages";

const siteUrl = "https://graphite-teal-template.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    { path: "/service", priority: 0.9 },
    { path: "/web-services", priority: 0.9 },
    { path: "/why-mindwhiz", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/agency", priority: 0.7 },
    { path: "/finance", priority: 0.7 },
    { path: "/hr", priority: 0.7 },
    { path: "/construction-estimation", priority: 0.7 },
    { path: "/locations/us", priority: 0.6 },
    { path: "/locations/uk", priority: 0.6 },
    { path: "/locations/pk", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${siteUrl}/services/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industryPages.map((page) => ({
    url: `${siteUrl}/industries/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes];
}
