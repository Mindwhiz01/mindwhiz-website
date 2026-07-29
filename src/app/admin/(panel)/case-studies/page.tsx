"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { api, type CaseStudyRow } from "../../_lib/api";
import {
  PageHeader,
  SetupBanner,
  Field,
  Input,
  Textarea,
  StringListEditor,
} from "../../_lib/ui";

const empty = (): CaseStudyRow => ({
  id: "",
  slug: "",
  client: "",
  category: "",
  result: "",
  highlights: ["", "", ""],
  img: "",
  logo: "",
  services: [""],
  challenge: "",
  approach: [""],
  outcomes: [""],
  metrics: [{ value: "", label: "" }],
  quote_text: "",
  quote_author: "",
  published: true,
});

export default function CaseStudyAdminPage() {
  const [items, setItems] = useState<CaseStudyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);
  const [editing, setEditing] = useState<CaseStudyRow | null>(null);

  async function load() {
    setLoading(true);
    try {
      const { caseStudies } = await api<{ caseStudies: CaseStudyRow[] }>("/api/admin/case-studies");
      setItems(caseStudies);
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

  async function remove(cs: CaseStudyRow) {
    if (!confirm(`Delete the "${cs.client}" case study? This cannot be undone.`)) return;
    await api(`/api/admin/case-studies/${cs.id}`, { method: "DELETE" });
    load();
  }

  if (editing) {
    return (
      <CaseStudyEditor
        cs={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Case studies"
        subtitle="Create and manage the stories shown on /case-studies."
        action={
          <button
            onClick={() => setEditing(empty())}
            disabled={notConfigured}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            <Plus size={16} /> New case study
          </button>
        }
      />
      {notConfigured && <SetupBanner />}

      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : items.length === 0 && !notConfigured ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-400">
          No case studies yet. Create your first story.
        </div>
      ) : (
        <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {items.map((c) => (
            <div key={c.id} className="flex items-center gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-slate-900">{c.client}</p>
                  {!c.published && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">Draft</span>
                  )}
                </div>
                <p className="truncate text-xs text-slate-400">
                  {c.category} · /case-studies/{c.slug}
                </p>
              </div>
              <button onClick={() => setEditing(c)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => remove(c)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudyEditor({
  cs,
  onCancel,
  onSaved,
}: {
  cs: CaseStudyRow;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CaseStudyRow>(cs);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isNew = !cs.id;

  const set = <K extends keyof CaseStudyRow>(k: K, v: CaseStudyRow[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    setError("");
    const payload = {
      slug: form.slug,
      client: form.client,
      category: form.category,
      result: form.result,
      highlights: form.highlights,
      img: form.img,
      logo: form.logo || form.img,
      services: form.services,
      challenge: form.challenge,
      approach: form.approach,
      outcomes: form.outcomes,
      metrics: form.metrics,
      quoteText: form.quote_text,
      quoteAuthor: form.quote_author,
      published: form.published,
    };
    try {
      if (isNew) {
        await api("/api/admin/case-studies", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/case-studies/${form.id}`, { method: "PUT", body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  const setMetric = (i: number, key: "value" | "label", val: string) =>
    set(
      "metrics",
      form.metrics.map((m, j) => (j === i ? { ...m, [key]: val } : m)),
    );

  return (
    <div>
      <button onClick={onCancel} className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft size={15} /> Back to case studies
      </button>
      <PageHeader title={isNew ? "New case study" : "Edit case study"} />

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Client name">
            <Input value={form.client} onChange={(e) => set("client", e.target.value)} placeholder="Alpha Bravo" />
          </Field>
          <Field label="Category">
            <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Construction" />
          </Field>
        </div>

        <Field label="Slug" hint="Leave blank to auto-generate from the client name.">
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="alpha-bravo" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Image URL">
            <Input value={form.img} onChange={(e) => set("img", e.target.value)} placeholder="/clients/alpha-bravo.png" />
          </Field>
          <Field label="Logo URL" hint="Defaults to the image URL if left blank.">
            <Input value={form.logo} onChange={(e) => set("logo", e.target.value)} />
          </Field>
        </div>

        <Field label="Result summary" hint="The headline outcome shown on the listing.">
          <Textarea value={form.result} onChange={(e) => set("result", e.target.value)} />
        </Field>

        <StringListEditor label="Highlights" items={form.highlights} placeholder="Faster delivery" onChange={(v) => set("highlights", v)} />
        <StringListEditor label="Services" items={form.services} placeholder="Staff Augmentation" onChange={(v) => set("services", v)} />

        <Field label="Challenge">
          <Textarea value={form.challenge} onChange={(e) => set("challenge", e.target.value)} />
        </Field>

        <StringListEditor label="Approach" items={form.approach} placeholder="What you did" onChange={(v) => set("approach", v)} />
        <StringListEditor label="Outcomes" items={form.outcomes} placeholder="What changed" onChange={(v) => set("outcomes", v)} />

        <Field label="Metrics" hint="Short value + label pairs, e.g. “2 wks” · “From kickoff to embedded”.">
          <div className="space-y-2">
            {form.metrics.map((m, i) => (
              <div key={i} className="flex gap-2">
                <Input value={m.value} placeholder="2 wks" onChange={(e) => setMetric(i, "value", e.target.value)} className="max-w-[130px]" />
                <Input value={m.label} placeholder="From kickoff to embedded" onChange={(e) => setMetric(i, "label", e.target.value)} />
                <button
                  type="button"
                  onClick={() => set("metrics", form.metrics.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-500 hover:bg-slate-50"
                  aria-label="Remove metric"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("metrics", [...form.metrics, { value: "", label: "" }])}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <Plus size={15} /> Add metric
            </button>
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Quote">
            <Textarea value={form.quote_text} onChange={(e) => set("quote_text", e.target.value)} />
          </Field>
          <Field label="Quote author">
            <Input value={form.quote_author} onChange={(e) => set("quote_author", e.target.value)} placeholder="CTO, Villa Tech" />
          </Field>
        </div>

        <label className="flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          Published (visible on the site)
        </label>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving || !form.client}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isNew ? "Create case study" : "Save changes"}
          </button>
          <button onClick={onCancel} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
