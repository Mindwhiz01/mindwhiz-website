import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { PwaInstall } from "@/components/PwaInstall";
import { SEO_MAP } from "@/seo.config";
import { jsonLdScript } from "@/lib/jsonLd";

const GTM_ID = "GTM-WNJXTS4Z";
const META_PIXEL_ID = "1270428855061399";

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
  alternateName: "MindWhiz Solutions",
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
  // The one real, staffed location: our Lahore head office and delivery hub.
  // We serve US/UK clients (see areaServed) but do NOT claim a physical office
  // we cannot staff, which would risk a Google Business Profile suspension.
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
  sameAs: [
    "https://www.linkedin.com/company/mindwhiz",
    "https://www.instagram.com/mindwhiz2.0/",
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* End Meta Pixel Code */}
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
        <PwaInstall />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
