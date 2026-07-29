"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, TrendingUp, Search, Eye, Users, AlertTriangle } from "lucide-react";
import { api, type TrafficResponse, type KeywordResponse } from "../../_lib/api";
import { PageHeader } from "../../_lib/ui";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 28, label: "28 days" },
  { days: 90, label: "90 days" },
];

type Tab = "traffic" | "keywords";

export default function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>("traffic");
  const [days, setDays] = useState(28);

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Traffic from Google Analytics and keyword rankings from Search Console."
        action={
          <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  days === r.days ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        <TabButton active={tab === "traffic"} onClick={() => setTab("traffic")} icon={<TrendingUp size={16} />}>
          Page traffic
        </TabButton>
        <TabButton active={tab === "keywords"} onClick={() => setTab("keywords")} icon={<Search size={16} />}>
          Keyword rankings
        </TabButton>
      </div>

      {tab === "traffic" ? <TrafficTab days={days} /> : <KeywordsTab days={days} />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "border-slate-900 text-slate-900"
          : "border-transparent text-slate-500 hover:text-slate-800"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function TrafficTab({ days }: { days: number }) {
  const [data, setData] = useState<TrafficResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await api<TrafficResponse>(`/api/admin/analytics/pageviews?days=${days}`));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [days]);
  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loading />;
  if (error) return <NotConnected what="Google Analytics" detail={error} />;
  if (!data) return null;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Stat icon={<Eye size={18} />} value={data.totalViews.toLocaleString()} label="Page views" />
        <Stat icon={<Users size={18} />} value={data.totalUsers.toLocaleString()} label="Users" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Page</th>
              <th className="px-4 py-3 text-right font-medium">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.pages.map((p) => (
              <tr key={p.path}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{p.title || p.path}</p>
                  <p className="text-xs text-slate-400">{p.path}</p>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">
                  {p.views.toLocaleString()}
                </td>
              </tr>
            ))}
            {data.pages.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-slate-400">
                  No page views in this period yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KeywordsTab({ days }: { days: number }) {
  const [data, setData] = useState<KeywordResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await api<KeywordResponse>(`/api/admin/analytics/keywords?days=${days}`));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [days]);
  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loading />;
  if (error) return <NotConnected what="Google Search Console" detail={error} />;
  if (!data) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Keyword</th>
            <th className="px-4 py-3 text-right font-medium">Rank</th>
            <th className="px-4 py-3 text-right font-medium">Clicks</th>
            <th className="px-4 py-3 text-right font-medium">Impressions</th>
            <th className="px-4 py-3 text-right font-medium">CTR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.keywords.map((k) => (
            <tr key={k.query}>
              <td className="px-4 py-3 font-medium text-slate-900">{k.query}</td>
              <td className="px-4 py-3 text-right">
                <span className="inline-flex min-w-[2.5rem] justify-center rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                  {k.position.toFixed(1)}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-slate-700">{k.clicks.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-slate-500">{k.impressions.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-slate-500">{(k.ctr * 100).toFixed(1)}%</td>
            </tr>
          ))}
          {data.keywords.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                No keyword data yet. Search Console needs a few days to collect it.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
        {icon}
      </span>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-slate-400">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
}

function NotConnected({ what, detail }: { what: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-medium">{what} isn&apos;t connected yet</p>
        <p className="mt-1 text-amber-700">
          Add the Google service-account credentials and property IDs to your environment. See{" "}
          <code className="rounded bg-amber-100 px-1">ADMIN_DASHBOARD.md</code> for the exact steps.
        </p>
        <p className="mt-2 text-xs text-amber-600">{detail}</p>
      </div>
    </div>
  );
}
