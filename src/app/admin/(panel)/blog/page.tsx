"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Star } from "lucide-react";
import { api, type BlogRow } from "../../_lib/api";
import {
  PageHeader,
  SetupBanner,
  Field,
  Input,
  Textarea,
  Select,
  StringListEditor,
} from "../../_lib/ui";

type Block = BlogRow["body"][number];

const CATEGORIES = ["Staffing", "IT & Security", "Operations", "Culture"];

const emptyPost = (): BlogRow => ({
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Operations",
  date: new Date().toISOString().slice(0, 10),
  read_time: "5 min read",
  author_name: "MindWhiz Team",
  author_role: "Editorial",
  author_avatar: "",
  image: "",
  featured: false,
  published: true,
  body: [{ type: "p", text: "" }],
});

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);
  const [editing, setEditing] = useState<BlogRow | null>(null);

  async function load() {
    setLoading(true);
    try {
      const { posts } = await api<{ posts: BlogRow[] }>("/api/admin/blog");
      setPosts(posts);
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

  async function remove(post: BlogRow) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await api(`/api/admin/blog/${post.id}`, { method: "DELETE" });
    load();
  }

  if (editing) {
    return (
      <BlogEditor
        post={editing}
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
        title="Blog posts"
        subtitle="Create and manage articles shown on /blog."
        action={
          <button
            onClick={() => setEditing(emptyPost())}
            disabled={notConfigured}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            <Plus size={16} /> New post
          </button>
        }
      />
      {notConfigured && <SetupBanner />}

      {loading ? (
        <Loading />
      ) : posts.length === 0 && !notConfigured ? (
        <Empty label="No posts yet. Create your first article." />
      ) : (
        <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-slate-900">{p.title}</p>
                  {p.featured && <Star size={13} className="shrink-0 text-amber-500" fill="currentColor" />}
                  {!p.published && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">Draft</span>
                  )}
                </div>
                <p className="truncate text-xs text-slate-400">
                  {p.category} · {p.date} · /blog/{p.slug}
                </p>
              </div>
              <button
                onClick={() => setEditing(p)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => remove(p)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogEditor({
  post,
  onCancel,
  onSaved,
}: {
  post: BlogRow;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<BlogRow>(post);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isNew = !post.id;

  const set = <K extends keyof BlogRow>(k: K, v: BlogRow[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    setError("");
    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      date: form.date,
      readTime: form.read_time,
      authorName: form.author_name,
      authorRole: form.author_role,
      authorAvatar: form.author_avatar,
      image: form.image,
      featured: form.featured,
      published: form.published,
      body: form.body,
    };
    try {
      if (isNew) {
        await api("/api/admin/blog", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/blog/${form.id}`, { method: "PUT", body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  return (
    <div>
      <button onClick={onCancel} className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft size={15} /> Back to posts
      </button>
      <PageHeader title={isNew ? "New blog post" : "Edit blog post"} />

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        <Field label="Title">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="The hybrid staffing playbook" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" hint="Leave blank to auto-generate from the title.">
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="hybrid-staffing-playbook" />
          </Field>
          <Field label="Category">
            <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Excerpt" hint="One or two sentences shown on the blog listing.">
          <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </Field>

        <Field label="Cover image URL">
          <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://… or /path.png" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Date">
            <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Read time">
            <Input value={form.read_time} onChange={(e) => set("read_time", e.target.value)} />
          </Field>
          <Field label="Author name">
            <Input value={form.author_name} onChange={(e) => set("author_name", e.target.value)} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Author role">
            <Input value={form.author_role} onChange={(e) => set("author_role", e.target.value)} />
          </Field>
          <Field label="Author avatar URL">
            <Input value={form.author_avatar} onChange={(e) => set("author_avatar", e.target.value)} />
          </Field>
        </div>

        <BodyEditor body={form.body} onChange={(b) => set("body", b)} />

        <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
            Featured post
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
            Published (visible on the site)
          </label>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving || !form.title}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isNew ? "Create post" : "Save changes"}
          </button>
          <button onClick={onCancel} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const BLOCK_TYPES: Block["type"][] = ["p", "h2", "quote", "list"];
const BLOCK_LABELS: Record<Block["type"], string> = {
  p: "Paragraph",
  h2: "Heading",
  quote: "Quote",
  list: "Bullet list",
};

function BodyEditor({ body, onChange }: { body: Block[]; onChange: (b: Block[]) => void }) {
  const update = (i: number, next: Block) => onChange(body.map((b, j) => (j === i ? next : b)));
  const removeAt = (i: number) => onChange(body.filter((_, j) => j !== i));
  const add = (type: Block["type"]) => {
    const block: Block = type === "list" ? { type, items: [""] } : { type, text: "" };
    onChange([...body, block]);
  };

  return (
    <Field label="Body">
      <div className="space-y-3">
        {body.map((block, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {BLOCK_LABELS[block.type]}
              </span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-slate-400 hover:text-red-500"
                aria-label="Remove block"
              >
                <Trash2 size={14} />
              </button>
            </div>
            {block.type === "list" ? (
              <StringListEditor
                label=""
                items={block.items}
                placeholder="List item"
                onChange={(items) => update(i, { type: "list", items })}
              />
            ) : (
              <Textarea
                value={block.text}
                placeholder={BLOCK_LABELS[block.type]}
                onChange={(e) => update(i, { ...block, text: e.target.value } as Block)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {BLOCK_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => add(t)}
            className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Plus size={13} /> {BLOCK_LABELS[t]}
          </button>
        ))}
      </div>
    </Field>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-slate-400">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-400">
      {label}
    </div>
  );
}
