import type { Metadata } from "next";
import Link from "next/link";

// A real 404 (status 404, noindex). Previously every unknown URL was
// redirected to the home page, which Google treats as a soft 404 and which
// hid broken links. Legacy URLs that have a real successor are 301'd in
// middleware (src/lib/legacyRedirects.ts) before they ever reach this page.
export const metadata: Metadata = {
  title: { absolute: "Page not found | MindWhiz" },
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/services/staff-augmentation", label: "IT staff augmentation" },
  { href: "/services/offshore-staff-augmentation", label: "Offshore staff augmentation" },
  { href: "/services/cybersecurity-monitoring", label: "Managed SOC and MDR" },
  { href: "/services/noc-monitoring", label: "24/7 NOC monitoring" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-white px-6 py-24 text-black">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">This page does not exist</h1>
        <p className="mt-4 text-base leading-7 text-black/65">
          The link may be from our old website. These pages are a good place to continue:
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-2xl border border-slate-200 px-5 py-4 font-semibold transition-colors hover:border-[#ed1164]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
