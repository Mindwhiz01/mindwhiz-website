import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteUrl = "https://graphite-teal-template.vercel.app";
const siteName = "MindWhiz";
const siteDescription =
  "Hybrid staffing, staff augmentation, and BPO across IT, security, and business operations. Build scalable teams with flexible global talent from the US, UK, and Pakistan.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MindWhiz - Flexible Talent, Scalable Teams, Global Impact",
    template: "%s | MindWhiz",
  },
  description: siteDescription,
  keywords: [
    "staff augmentation",
    "hybrid staffing",
    "BPO services",
    "IT helpdesk outsourcing",
    "NOC monitoring",
    "cybersecurity services",
    "remote teams",
    "talent solutions",
    "business process outsourcing",
    "MindWhiz",
  ],
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
    title: "MindWhiz - Flexible Talent, Scalable Teams, Global Impact",
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
    title: "MindWhiz - Flexible Talent, Scalable Teams, Global Impact",
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
    "https://x.com/mindwhizco",
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
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
