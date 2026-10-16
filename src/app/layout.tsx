import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DeferredTags from "@/components/DeferredTags";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { PwaInstall } from "@/components/PwaInstall";
import { DEFAULT_SHARE_IMAGE, SEO_MAP } from "@/seo.config";
import { jsonLdScript } from "@/lib/jsonLd";

const GTM_ID = "GTM-WNJXTS4Z";
const META_PIXEL_ID = "1270428855061399";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });

const siteUrl = "https://www.mindwhiz.com";
const siteName = "MindWhiz";
// Home (/) title + description are the hand-tuned entries from the SEO map, so
// the homepage and its shared-link previews match the rest of the site. Child
// routes set their own absolute title/description via buildMetadata().
const homeSeo = SEO_MAP["/"];
const siteDescription = homeSeo.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // default (home) already carries the brand suffix; template brands children
    // that pass a bare string (none currently do - they use title.absolute).
    default: homeSeo.title,
    template: "%s | MindWhiz",
  },
  description: siteDescription,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: homeSeo.title,
    description: siteDescription,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: siteDescription,
    images: [DEFAULT_SHARE_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/mindwhiz-mark.png",
    apple: "/mindwhiz-mark.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
};

// LocalBusiness + ProfessionalService double-typed so both local-pack SEO
// (address/geo/hours) and B2B service intent (areaServed, serviceType) are
// covered from a single entity - this is the node every page's JSON-LD
// (FAQPage, Service, BreadcrumbList) points back to via "provider"/"publisher".
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  // Brand spelling variants people search for ("mindwiz", "mind whiz").
  alternateName: ["Mind Whiz", "MindWhiz Solutions", "Mindwiz"],
  foundingDate: "2020",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 65 },
  url: siteUrl,
  logo: `${siteUrl}/mindwhiz-mark.png`,
  image: `${siteUrl}/mindwhiz-mark.png`,
  description: siteDescription,
  slogan: "Flexible Talent, Scalable Teams, Global Impact",
  email: "info@mindwhiz.com",
  // Primary phone matches the verified Google Business Profile (Lahore) so the
  // site NAP and the GBP stay consistent - the strongest local-ranking signal.
  telephone: "+92 321 1116451",
  priceRange: "$$",
  // Head office and delivery hub (matches the Lahore Google Business Profile).
  // The US and UK offices are listed under `location` below.
  address: {
    "@type": "PostalAddress",
    streetAddress: "Block E2, WAPDA Town Phase 1",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.4697,
    longitude: 74.2728,
  },
  location: [
    {
      "@type": "Place",
      name: "MindWhiz US office",
      telephone: "+1 (832) 900-4608",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2313 W Sam Houston Pkwy N #147",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77043",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      name: "MindWhiz UK office",
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    },
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=MindWhiz+Block+E2+WAPDA+Town+Phase+1+Lahore",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Where we deliver services - this is what ties us to US buyer intent without
  // claiming a US storefront. US organic/paid ranking comes from these plus the
  // US-targeted page content, not from a local-pack listing.
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Pakistan" },
  ],
  knowsAbout: [
    "IT staff augmentation",
    "Offshore staff augmentation",
    "Managed SOC and MDR",
    "NOC monitoring",
    "IT helpdesk outsourcing",
    "Cloud security consulting",
    "Accounting staff augmentation",
    "Construction estimating",
  ],
  // Every real third-party profile belongs here (audit A2/U4). Add Clutch,
  // GoodFirms, G2, Crunchbase and the Google Business Profile URL as each
  // profile goes live - only URLs that actually resolve.
  sameAs: [
    "https://www.linkedin.com/company/mindwhiz",
    "https://www.instagram.com/mindwhiz2.0/",
    "https://www.instagram.com/mindwhizpakistan/",
    "https://www.facebook.com/mindwhizofficial/",
  ],
  contactPoint: [
    {
      // US sales line for American clients - a contact channel, not a location.
      "@type": "ContactPoint",
      telephone: "+1 (832) 900-4608",
      contactType: "sales",
      email: "info@mindwhiz.com",
      areaServed: ["US", "GB"],
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+92 321 1116451",
      contactType: "customer support",
      email: "info@mindwhiz.com",
      areaServed: ["PK", "US", "GB"],
      availableLanguage: ["English"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect for the tag scripts DeferredTags loads on first interaction. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
        />
        <DeferredTags />
        <PwaInstall />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
