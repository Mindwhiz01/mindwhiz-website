import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SEO_MAP } from "@/seo.config";
import { jsonLdScript } from "@/lib/jsonLd";

const GA_MEASUREMENT_ID = "G-KELVNBGDRP";
const GOOGLE_ADS_ID = "AW-18340987821";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

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
    images: [
      {
        url: "/mindwhiz-mark.png",
        width: 512,
        height: 512,
        alt: "MindWhiz logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: siteDescription,
    images: ["/mindwhiz-mark.png"],
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
  alternateName: "MindWhiz Solutions",
  url: siteUrl,
  logo: `${siteUrl}/mindwhiz-mark.png`,
  image: `${siteUrl}/mindwhiz-mark.png`,
  description: siteDescription,
  slogan: "Flexible Talent, Scalable Teams, Global Impact",
  email: "info@mindwhiz.com",
  telephone: "+1 (832) 900-4608",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2313 W Sam Houston Pkwy N #147",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77043",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.8016,
    longitude: -95.5788,
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=2313+W+Sam+Houston+Pkwy+N+%23147+Houston+TX+77043",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Pakistan" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/mindwhiz",
    "https://www.instagram.com/mindwhiz2.0/",
    "https://www.facebook.com/mindwhizofficial/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1 (832) 900-4608",
      contactType: "sales",
      email: "info@mindwhiz.com",
      areaServed: ["US", "GB", "PK"],
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
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
