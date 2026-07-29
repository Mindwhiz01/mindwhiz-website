"use client";

// Small typed fetch helper for the admin client pages. Throws with the server's
// error message so forms can surface it.
export async function api<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data as { error?: string }).error || `Request failed (${res.status})`);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return data as T;
}

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  image: string;
  featured: boolean;
  published: boolean;
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string }
    | { type: "list"; items: string[] }
  >;
};

export type CaseStudyRow = {
  id: string;
  slug: string;
  client: string;
  category: string;
  result: string;
  highlights: string[];
  img: string;
  logo: string;
  services: string[];
  challenge: string;
  approach: string[];
  outcomes: string[];
  metrics: { value: string; label: string }[];
  quote_text: string;
  quote_author: string;
  published: boolean;
};

export type SubscriberRow = {
  id: string;
  email: string;
  status: string;
  source: string;
  created_at: string;
};

export type TrafficResponse = {
  range: number;
  totalViews: number;
  totalUsers: number;
  pages: { path: string; title: string; views: number }[];
};

export type KeywordResponse = {
  range: number;
  keywords: {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[];
};
