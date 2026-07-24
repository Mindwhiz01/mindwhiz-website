export type LocationContent = {
  slug: "us" | "uk" | "pk";
  code: string;
  country: string;
  city: string;
  flag: string;
  heroImage: string;
  tagline: string;
  intro: string;
  address?: string;
  timezone: string;
  highlights: { title: string; desc: string; image: string }[];
  services: string[]; // subset of service names from content.ts, emphasized locally
};

export const locations: LocationContent[] = [
  {
    slug: "us",
    code: "US",
    country: "United States",
    city: "Houston, Texas",
    flag: "https://flagcdn.com/w80/us.png",
    heroImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=80",
    tagline: "Our headquarters and North American delivery hub.",
    intro:
      "MindWhiz is headquartered in Houston, Texas, serving clients across the United States and Canada with onshore account management and round the clock delivery.",
    address: "2313 W Sam Houston Pkwy N #147, Houston, TX 77043, United States",
    timezone: "America/Chicago",
    highlights: [
      {
        title: "Headquarters",
        desc: "Executive leadership and client success teams based in Houston.",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "Onshore accountability",
        desc: "US based account managers who own delivery end to end.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "Compliance ready",
        desc: "SOC 2-aligned practices built for US regulatory expectations.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=2000&q=80",
      },
    ],
    services: ["IT Helpdesk 24/7", "Cybersecurity Monitoring", "Staff Augmentation", "Digital Marketing"],
  },
  {
    slug: "uk",
    code: "UK",
    country: "United Kingdom",
    city: "London",
    flag: "https://flagcdn.com/w80/gb.png",
    heroImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80",
    tagline: "Our European delivery hub and client success base.",
    intro:
      "From London, MindWhiz supports clients across the United Kingdom and Europe with GDPR aware delivery, local account management, and overlapping hours with our global teams.",
    timezone: "Europe/London",
    highlights: [
      {
        title: "European coverage",
        desc: "Local account management for UK and EU based clients.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "GDPR aware delivery",
        desc: "Data handling practices built around UK and EU requirements.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "Overlapping hours",
        desc: "Business hours coverage that bridges US and APAC teams.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
      },
    ],
    services: ["Finance & Accounting", "HR Services", "Cloud Infrastructure", "Construction Estimation"],
  },
  {
    slug: "pk",
    code: "PK",
    country: "Pakistan",
    city: "Lahore",
    flag: "https://flagcdn.com/w80/pk.png",
    heroImage:
      "https://images.unsplash.com/photo-1595426496987-37c7113b24a6?auto=format&fit=crop&w=1800&q=80",
    tagline: "Our largest engineering and delivery hub.",
    intro:
      "Lahore is home to the majority of our technical talent, engineers, analysts, and specialists delivering IT, security, and business operations support around the clock.",
    timezone: "Asia/Karachi",
    highlights: [
      {
        title: "Engineering depth",
        desc: "The largest concentration of vetted technical talent in our network.",
        image: "https://images.unsplash.com/photo-1595426496987-37c7113b24a6?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "24/7 operations",
        desc: "NOC, SOC, and helpdesk coverage that never sleeps.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
      },
      {
        title: "Rapid scaling",
        desc: "Fast, vetted hiring pipelines to grow your team in days, not months.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
      },
    ],
    services: ["NOC Monitoring", "DevOps & Automation", "Server & Network Administration", "Endpoint Security"],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

const SITE_URL = "https://graphite-teal-template.vercel.app";

// Shared metadata + LocalBusiness builder so the three region pages
// (/locations/us|uk|pk) don't hand-roll the same local-SEO boilerplate.
export function locationMetadata(loc: LocationContent) {
  const title = `${loc.city}, ${loc.country} Team`;
  const description = `${loc.tagline} ${loc.intro}`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title: `${title} | MindWhiz`,
      description,
      images: [{ url: loc.heroImage }],
    },
  };
}

export function locationJsonLd(loc: LocationContent) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `MindWhiz, ${loc.city}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/locations/${loc.slug}`,
    description: loc.intro,
    ...(loc.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.city,
            addressCountry: loc.code,
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressLocality: loc.city,
            addressCountry: loc.code,
          },
        }),
    areaServed: { "@type": "Country", name: loc.country },
    knowsAbout: loc.services,
  };
}
