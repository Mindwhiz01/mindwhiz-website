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
    default: "MindWhiz — Flexible Talent, Scalable Teams, Global Impact",
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
    title: "MindWhiz — Flexible Talent, Scalable Teams, Global Impact",
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
    title: "MindWhiz — Flexible Talent, Scalable Teams, Global Impact",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/mindwhiz-mark.png`,
  description: siteDescription,
  email: "info@mindwhiz.com",
  telephone: "+1 (832) 900-4608",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2313 W Sam Houston Pkwy N #147",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77043",
    addressCountry: "US",
  },
  areaServed: ["United States", "United Kingdom", "Pakistan"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 (832) 900-4608",
    contactType: "sales",
    email: "info@mindwhiz.com",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
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
