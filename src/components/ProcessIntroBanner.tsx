import { ArrowRight, Star } from "lucide-react";

// Shared "How it works" style intro banner used above every pinned process
// deck (ServiceDetailPage, ProcessScroll, and the web-services page): a
// brand-pink gradient card with the heading + optional line on the left and
// the CTA + customer social proof on the right.
//
// PLACEHOLDER social proof - swap these avatar photos and the rating/count
// for real customer data before relying on them as factual claims.
const CUSTOMER_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=3&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=facearea&facepad=3&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=3&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=3&w=96&h=96&q=80",
];
const CUSTOMER_RATING = "5/5";
const CUSTOMER_COUNT = "1,200 customers";

export function ProcessIntroBanner({
  title,
  description,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
}: {
  title: React.ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="px-6 py-[25px] sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ed1164] to-[#c50e53] px-7 py-10 text-white sm:px-12 sm:py-12">
        {/* soft decorative circles */}
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 right-16 h-72 w-72 rounded-full bg-white/[0.08]" />
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#9CCC3C]/25 blur-2xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2
              className="text-[clamp(1.9rem,4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                {description}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#ed1164] shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-0.5 sm:text-base"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* customer social proof - avatar cluster + rating */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {CUSTOMER_AVATARS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <Star className="h-3.5 w-3.5 fill-[#9CCC3C] text-[#9CCC3C]" />
                <span className="font-bold">{CUSTOMER_RATING}</span>
                <span className="text-white/70">({CUSTOMER_COUNT})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
