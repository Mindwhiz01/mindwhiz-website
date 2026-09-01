"use client";

// ---------------------------------------------------------------------------
// Blog post detail, hero header, article body (rendered from typed blocks),
// author card, and a "more articles" rail. Brand-consistent with the site.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import FaqSection from "@/components/FaqSection";
import { posts, formatDate, type BlogPost } from "@/lib/blog";
import { jsonLdScript } from "@/lib/jsonLd";

// Stable anchor id for a heading, used by the right-side index links.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Headings drive the right-side index (table of contents).
  const headings = post.body
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ text: b.text, id: slugify(b.text) }));

  // Must match the canonical host and the Organization @id emitted in the root
  // layout, otherwise `publisher` is a dangling reference and mainEntityOfPage
  // points at a non-canonical URL.
  const siteUrl = "https://www.mindwhiz.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    // Posts carry a collective editorial byline, so the author is the
    // organisation itself, not a Person. Pointing at the Organization @id also
    // consolidates E-E-A-T signals onto the one brand entity.
    author: { "@type": "Organization", name: post.author.name, "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: "en",
    isPartOf: { "@type": "Blog", "@id": `${siteUrl}/blog`, name: "MindWhiz Blog" },
  };

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        {/* hero header */}
        <section
          data-header-dark
          className="relative overflow-hidden bg-[#383838] px-6 pb-16 pt-36 text-white sm:px-8"
        >
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-3xl"
          >
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </a>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/70">
              <span className="rounded-full bg-[#9CCC3C] px-3 py-1 font-semibold text-black">
                {post.category}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1
              className="mt-5 text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>
            <div className="mt-7 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="text-sm font-semibold">{post.author.name}</p>
                <p className="text-xs text-white/60">{post.author.role}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* body + right-side index */}
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0 max-w-3xl">
          <p className="text-lg leading-relaxed text-black/70">{post.excerpt}</p>
          <div className="mt-8 space-y-6">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    id={slugify(block.text)}
                    className="scroll-mt-28 pt-4 text-2xl font-bold text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-[#9CCC3C] pl-6 text-xl font-semibold italic leading-snug text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    “{block.text}”
                  </blockquote>
                );
              }
              if (block.type === "rp") {
                return (
                  <p key={i} className="text-[16px] leading-relaxed text-black/75">
                    {block.runs.map((run, j) =>
                      run.href ? (
                        <a
                          key={j}
                          href={run.href}
                          className="font-semibold text-[#ed1164] underline decoration-[#ed1164]/40 underline-offset-2 transition-colors hover:decoration-[#ed1164]"
                        >
                          {run.text}
                        </a>
                      ) : (
                        <span key={j}>{run.text}</span>
                      )
                    )}
                  </p>
                );
              }
              if (block.type === "img") {
                return (
                  <figure key={i} className="my-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.src}
                      alt={block.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-[1.5rem] border border-black/10 object-cover"
                    />
                    {block.caption && (
                      <figcaption className="mt-3 text-center text-sm italic text-black/50">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === "cta") {
                return (
                  <div
                    key={i}
                    className="my-4 flex flex-col gap-4 rounded-[1.5rem] border border-[#ed1164]/20 bg-[#FAF9F5] p-7 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="flex-1 text-[16px] font-semibold leading-relaxed text-black">
                      {block.text}
                    </p>
                    <a
                      href={block.href}
                      className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ed1164] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c50e53]"
                    >
                      {block.label}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[16px] leading-relaxed text-black/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ed1164]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[16px] leading-relaxed text-black/75">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* article CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-black/10 bg-[#FAF9F5] p-7">
            <div className="flex-1">
              <p
                className="text-lg font-bold text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Enjoyed this? Get the next one by email.
              </p>
              <p className="mt-1 text-sm text-black/60">One thoughtful edition a month. No spam.</p>
            </div>
            <a
              href="/newsletter"
              className="group inline-flex items-center gap-2 rounded-full bg-[#9CCC3C] px-4 py-2.5 text-sm font-semibold text-black"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          </article>

          {/* right-side index / table of contents — sticky on desktop, jumps
              to each section heading. Hidden on small screens. */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28 rounded-[1.5rem] border border-black/10 bg-[#FAF9F5] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ed1164]">
                  On this page
                </p>
                <ul className="mt-4 space-y-3 border-l border-black/10">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l-2 border-transparent pl-4 text-sm leading-snug text-black/60 transition-colors hover:border-[#ed1164] hover:text-[#ed1164]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* FAQ — shared, brand-consistent accordion used across the site.
            Emits its own FAQPage structured data for AEO/GEO. */}
        {post.faqs && post.faqs.length > 0 && <FaqSection faqs={post.faqs} />}

        {/* more articles */}
        <section className="bg-[#FAF9F5] py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              More articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <a
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white transition-colors hover:border-black/25"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold text-[#ed1164]">{p.category}</span>
                    <h3
                      className="mt-2 text-lg font-bold leading-snug text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4E7A22]">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
