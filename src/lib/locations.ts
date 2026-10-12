import type { Faq } from "@/components/FaqSection";
import { claims } from "@/lib/claims";

export type LocationContent = {
  slug: "us" | "uk" | "pk";
  /** Keyword statement rendered as the page's <h1>. */
  h1: string;
  /** True only where we have a real, staffed office. */
  hasOffice: boolean;
  code: string;
  country: string;
  city: string;
  flag: string;
  heroImage: string;
  tagline: string;
  intro: string;
  address?: string;
  /** Structured address for LocalBusiness schema (preferred over `address`). */
  postal?: { streetAddress: string; addressLocality: string; addressRegion?: string; postalCode?: string };
  phone?: string;
  timezone: string;
  highlights: { title: string; desc: string; image: string }[];
  services: string[]; // subset of service names from content.ts, emphasized locally
  faqs?: Faq[];
};

export const locations: LocationContent[] = [
  {
    slug: "us",
    h1: "IT Staff Augmentation and Outsourcing for US Companies",
    hasOffice: true,
    code: "US",
    country: "United States",
    city: "Houston, TX",
    flag: "https://flagcdn.com/w80/us.png",
    heroImage:
      "/images/stock/staff-augmentation-outsourcing-us-companies.webp",
    tagline: "Our US office in Houston, with delivery teams working your hours.",
    intro:
      "MindWhiz serves companies across the United States from our Houston, Texas office, backed by our delivery center in Lahore, Pakistan. Engineers, analysts and specialists work dedicated US-hours shifts, and every client gets a named account manager on a US phone line and email.",
    address: "2313 W Sam Houston Pkwy N #147, Houston, TX 77043, United States",
    postal: { streetAddress: "2313 W Sam Houston Pkwy N #147", addressLocality: "Houston", addressRegion: "TX", postalCode: "77043" },
    phone: "+1 (832) 900-4608",
    timezone: "America/Chicago",
    highlights: [
      {
        title: "US-hours coverage",
        desc: "Dedicated evening and night shifts in Lahore line up with Eastern, Central, Mountain and Pacific business hours, with 24/7 rotating cover where you need it.",
        image: "/images/stock/us-hours-coverage.webp",
      },
      {
        title: "Named account manager",
        desc: "One person who owns delivery for your team, reachable on a US phone number during your business day.",
        image: "/images/stock/seamless-scalability.webp",
      },
      {
        title: "Compliance ready",
        desc: "SOC 2-aligned practices built for US regulatory expectations.",
        image: "/images/stock/compliance-ready.webp",
      },
    ],
    services: ["IT Helpdesk 24/7", "Cybersecurity Monitoring", "Staff Augmentation", "Digital Marketing"],
    faqs: [
      {
        q: "Does MindWhiz have an office in the United States?",
        a: "Yes. Our US office is at 2313 W Sam Houston Pkwy N #147, Houston, TX 77043, phone +1 (832) 900-4608. Most delivery staff work from our Lahore delivery center on dedicated US-hours shifts.",
      },
      {
        q: "Where does the delivery team work?",
        a: "Client relationships for US accounts are managed from Houston. Most engineers, analysts and specialists work from our Lahore delivery center on dedicated US-hours shifts, so they are online during your business day.",
      },
      {
        q: "What time do your teams work for US clients?",
        a: "US-facing staff work an evening or night shift in Lahore. For example, 8 am to 5 pm Eastern is 5 pm to 2 am in Lahore, and 8 am to 5 pm Pacific is 8 pm to 5 am. 24/7 services run on rotating shifts.",
      },
      {
        q: "How much can a US company save?",
        a: `Typically ${claims.savingsRangeWords} compared with hiring the same role in house in the US, once salary, benefits and overhead are counted. We quote a fixed monthly rate per role before you commit.`,
      },
      {
        q: "How quickly can a team start?",
        a: `A shortlist typically arrives in ${claims.shortlistTime} and a selected specialist starts in ${claims.deployTime}. Managed services such as NOC or helpdesk typically go live in two to four weeks.`,
      },
      {
        q: "Do you sign US contracts and invoice in US dollars?",
        a: "Yes. We use a master services agreement and statements of work, invoice monthly in US dollars, and can work with your procurement and vendor onboarding process.",
      },
      {
        q: "Can you sign a HIPAA business associate agreement?",
        a: "Yes, for healthcare engagements where our team handles protected health information, we sign a BAA and apply HIPAA-aware access and handling controls.",
      },
      {
        q: "Are your staff employees or freelancers?",
        a: "They are full-time MindWhiz staff, background checked, working on company-managed devices from our Lahore delivery center. They are dedicated to your account, not shared across clients.",
      },
      {
        q: "Which US states do you serve?",
        a: "We serve clients in any US state. Because delivery is remote, the only practical difference between states is which time zone your team's shift is aligned to.",
      },
    ],
  },
  {
    slug: "uk",
    h1: "IT Staff Augmentation and Outsourcing for UK Businesses",
    hasOffice: true,
    code: "UK",
    country: "United Kingdom",
    city: "London",
    flag: "https://flagcdn.com/w80/gb.png",
    heroImage:
      "/images/stock/staff-augmentation-outsourcing-uk-businesses.webp",
    tagline: "Our UK office, with delivery teams working UK hours.",
    intro:
      "From our London office, MindWhiz supports clients across the United Kingdom and Europe with GDPR-aware delivery and a named account manager, backed by our delivery center in Lahore, which is only 4 to 5 hours ahead of the UK.",
    timezone: "Europe/London",
    highlights: [
      {
        title: "UK-hours overlap",
        desc: "Lahore is 4 to 5 hours ahead of the UK, so teams cover your full working day on a late shift.",
        image: "/images/stock/uk-hours-overlap.webp",
      },
      {
        title: "GDPR aware delivery",
        desc: "Data handling practices built around UK and EU requirements.",
        image: "/images/stock/global-delivery.webp",
      },
      {
        title: "Overlapping hours",
        desc: "Business hours coverage that bridges US and APAC teams.",
        image: "/images/stock/compliant-workforce.webp",
      },
    ],
    services: ["Finance & Accounting", "HR Services", "Cloud Infrastructure", "Construction Estimation"],
  },
  {
    slug: "pk",
    h1: "MindWhiz Lahore: IT Outsourcing and Delivery Center in Pakistan",
    hasOffice: true,
    code: "PK",
    country: "Pakistan",
    city: "Lahore",
    flag: "https://flagcdn.com/w80/pk.png",
    heroImage:
      "/images/stock/mindwhiz-lahore-outsourcing-delivery-center-pakistan.webp",
    tagline: "Our head office and largest engineering hub.",
    intro:
      "Lahore is our head office and home to the majority of our technical talent, engineers, analysts, and specialists delivering IT, security, and business operations support around the clock.",
    address: "Block E2, WAPDA Town Phase 1, Lahore, Punjab, Pakistan",
    timezone: "Asia/Karachi",
    highlights: [
      {
        title: "Engineering depth",
        desc: "The largest concentration of vetted technical talent in our network.",
        image: "/images/stock/engineering-depth.webp",
      },
      {
        title: "24/7 operations",
        desc: "NOC, SOC, and helpdesk coverage that never sleeps.",
        image: "/images/stock/scale-sustain.webp",
      },
      {
        title: "Rapid scaling",
        desc: "Fast, vetted hiring pipelines to grow your team in days, not months.",
        image: "/images/stock/rapid-scaling.webp",
      },
    ],
    services: ["NOC Monitoring", "DevOps & Automation", "Server & Network Administration", "Endpoint Security"],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

// Must match siteUrl in seo.config.ts / layout.tsx so the LocalBusiness
// parentOrganization @id resolves to the same org node graph-wide.
const SITE_URL = "https://www.mindwhiz.com";

// Shared metadata + LocalBusiness builder so the three region pages
// (/locations/us|uk|pk) don't hand-roll the same local-SEO boilerplate.
export function locationMetadata(loc: LocationContent) {
  const title = `${loc.city}, ${loc.country} Team`;
  const description = `${loc.tagline} ${loc.intro}`;

  // Build hreflang map: each location points to itself + other locations
  const hreflangs = {
    "en-US": `${SITE_URL}/locations/us`,
    "en-GB": `${SITE_URL}/locations/uk`,
    "en-PK": `${SITE_URL}/locations/pk`,
    "x-default": `${SITE_URL}/locations/us`, // Default to US for international visitors
  };

  return {
    title,
    description,
    alternates: {
      canonical: `/locations/${loc.slug}`,
      languages: hreflangs,
    },
    openGraph: {
      title: `${title} | MindWhiz`,
      description,
      images: [{ url: loc.heroImage }],
      url: `/locations/${loc.slug}`,
    },
  };
}

export function locationJsonLd(loc: LocationContent) {
  // Markets without a staffed office get a Service node, not a LocalBusiness.
  if (!loc.hasOffice) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `IT staff augmentation and outsourcing for ${loc.country}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/locations/${loc.slug}`,
      description: loc.intro,
      areaServed: { "@type": "Country", name: loc.country },
      serviceType: loc.services,
    };
  }
  const baseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `MindWhiz, ${loc.city}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/locations/${loc.slug}`,
    description: loc.intro,
    areaServed: { "@type": "Country", name: loc.country },
    knowsAbout: loc.services,
  };

  // Add address if present
  if (loc.postal) {
    baseSchema.address = { "@type": "PostalAddress", ...loc.postal, addressCountry: loc.code === "UK" ? "GB" : loc.code };
  } else if (loc.address) {
    baseSchema.address = {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city.split(",")[0], // Extract city name before comma
      addressCountry: loc.code,
    };
  } else {
    baseSchema.address = {
      "@type": "PostalAddress",
      addressLocality: loc.city,
      addressCountry: loc.code,
    };
  }

  // Add phone if present
  if (loc.phone) {
    baseSchema.telephone = loc.phone;
  }

  return baseSchema;
}
