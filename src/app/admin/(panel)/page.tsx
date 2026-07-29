"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Briefcase, Mail, ArrowRight } from "lucide-react";
import { api, type BlogRow, type CaseStudyRow, type SubscriberRow } from "../_lib/api";
import { PageHeader, SetupBanner } from "../_lib/ui";

export default function OverviewPage() {
  const [counts, setCounts] = useState({ blog: 0, cs: 0, subs: 0 });
  const [notConfigured, setNotConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [b, c, n] = await Promise.all([
          api<{ posts: BlogRow[] }>("/api/admin/blog"),
          api<{ caseStudies: CaseStudyRow[] }>("/api/admin/case-studies"),
          api<{ subscribers: SubscriberRow[] }>("/api/admin/newsletter"),
        ]);
        setCounts({ blog: b.posts.length, cs: c.caseStudies.length, subs: n.subscribers.length });
      } catch (err) {
        if ((err as { status?: number }).status === 503) setNotConfigured(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    { href: "/admin/blog", label: "Blog posts", icon: FileText, value: counts.blog },
    { href: "/admin/case-studies", label: "Case studies", icon: Briefcase, value: counts.cs },
    { href: "/admin/newsletter", label: "Subscribers", icon: Mail, value: counts.subs },
  ];

  return (
    <div>
      <PageHeader title="Overview" subtitle="Manage your blog, case studies, and newsletter." />
      {notConfigured && <SetupBanner />}

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ href, label, icon: Icon, value }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Icon size={18} />
              </span>
              <ArrowRight size={16} className="text-slate-300 transition group-hover:text-slate-600" />
            </div>
            <p className="mt-4 text-2xl font-semibold text-slate-900">
              {loading ? "—" : value}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
