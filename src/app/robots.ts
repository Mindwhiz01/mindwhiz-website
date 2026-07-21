import type { MetadataRoute } from "next";

const siteUrl = "https://graphite-teal-template.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/samples/"],
      },
      // Explicitly allow AI/answer-engine crawlers (GEO) - being citable in
      // ChatGPT, Perplexity, and Google AI Overviews requires these bots to
      // be able to fetch the site, unlike a general-purpose scraper block.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
