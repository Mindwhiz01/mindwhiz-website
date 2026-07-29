"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Download } from "lucide-react";
import { api, type SubscriberRow } from "../../_lib/api";
import { PageHeader, SetupBanner } from "../../_lib/ui";

export default function NewsletterAdminPage() {
  const [subs, setSubs] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { subscribers } = await api<{ subscribers: SubscriberRow[] }>("/api/admin/newsletter");
      setSubs(subscribers);
      setNotConfigured(false);
    } catch (err) {
      if ((err as { status?: number }).status === 503) setNotConfigured(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(s: SubscriberRow) {
    if (!confirm(`Remove ${s.email} from the list?`)) return;
    await api(`/api/admin/newsletter/${s.id}`, { method: "DELETE" });
    load();
  }

  function exportCsv() {
    const rows = [
      ["email", "status", "source", "subscribed_at"],
      ...subs.map((s) => [s.email, s.status, s.source, s.created_at]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Newsletter"
        subtitle="Everyone who has subscribed through the site."
        action={
          subs.length > 0 ? (
            <button
              onClick={exportCsv}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download size={16} /> Export CSV
            </button>
          ) : undefined
        }
      />
      {notConfigured && <SetupBanner />}

      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : subs.length === 0 && !notConfigured ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-400">
          No subscribers yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Subscribed</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subs.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(s.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(s)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50" aria-label="Remove">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
