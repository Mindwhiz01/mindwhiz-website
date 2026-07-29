// ---------------------------------------------------------------------------
// Read Google Analytics 4 (traffic) and Google Search Console (keyword rank)
// data for the admin dashboard. Server-only.
//
// Both use the same service account (see googleAuth.ts). The service account's
// email must be granted access to:
//   • the GA4 property   (GA Admin → Property Access Management → Viewer)
//   • the GSC property   (Search Console → Settings → Users and permissions)
// ---------------------------------------------------------------------------

import { getAccessToken, isGoogleConfigured } from "@/lib/googleAuth";

const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export type ConfigState =
  | { ok: true }
  | { ok: false; reason: string };

export function ga4Config(): ConfigState {
  if (!isGoogleConfigured())
    return { ok: false, reason: "Google service account not configured." };
  if (!process.env.GA4_PROPERTY_ID)
    return { ok: false, reason: "GA4_PROPERTY_ID not set." };
  return { ok: true };
}

export function gscConfig(): ConfigState {
  if (!isGoogleConfigured())
    return { ok: false, reason: "Google service account not configured." };
  if (!process.env.GSC_SITE_URL)
    return { ok: false, reason: "GSC_SITE_URL not set." };
  return { ok: true };
}

// ---- Google Analytics 4 -----------------------------------------------------

export type PageViewRow = { path: string; title: string; views: number };
export type TrafficReport = {
  totalViews: number;
  totalUsers: number;
  pages: PageViewRow[];
};

/** Page views + users for the last `days` days, plus a per-page breakdown. */
export async function getTrafficReport(days: number): Promise<TrafficReport> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const token = await getAccessToken(GA_SCOPE);

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 100,
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GA4 request failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    rows?: Array<{
      dimensionValues: { value: string }[];
      metricValues: { value: string }[];
    }>;
  };

  const pages: PageViewRow[] = (data.rows ?? []).map((r) => ({
    path: r.dimensionValues[0]?.value ?? "",
    title: r.dimensionValues[1]?.value ?? "",
    views: Number(r.metricValues[0]?.value ?? 0),
  }));

  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);
  // totalUsers is summed per row (approx unique across pages); good enough for a
  // dashboard headline. For an exact figure GA4 would need a separate report.
  const totalUsers = (data.rows ?? []).reduce(
    (sum, r) => sum + Number(r.metricValues[1]?.value ?? 0),
    0,
  );

  return { totalViews, totalUsers, pages };
}

// ---- Google Search Console --------------------------------------------------

export type KeywordRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number; // average rank
};

/** Top search queries (keywords) with clicks, impressions, CTR, avg position. */
export async function getKeywordReport(days: number): Promise<KeywordRow[]> {
  const siteUrl = process.env.GSC_SITE_URL!;
  const token = await getAccessToken(GSC_SCOPE);

  // GSC data lags ~2-3 days; end the window a couple days back for stable data.
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      siteUrl,
    )}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["query"],
        rowLimit: 100,
        dataState: "all",
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Search Console request failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    rows?: Array<{
      keys: string[];
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };

  return (data.rows ?? []).map((r) => ({
    query: r.keys[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}
