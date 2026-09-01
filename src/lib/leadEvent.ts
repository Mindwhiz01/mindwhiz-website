// ---------------------------------------------------------------------------
// Handoff between "LeadConnector confirmed it saved the lead" and "fire the
// Meta Lead conversion".
//
// The conversion must NOT fire on a Submit click, on a direct visit to
// /thank-you, or on a page refresh - only on a real, saved lead. So the marker
// below is written at the one moment we know the contact exists (the iframe's
// set-sticky-contacts message, which is its post-save write) and is consumed
// exactly once by the thank-you page, then deleted.
//
// sessionStorage, not localStorage: the marker must not survive the tab, or a
// visitor returning tomorrow would fire a second phantom conversion.
// ---------------------------------------------------------------------------

const KEY = "mw_lead_event";

// A stale marker means the tab sat on the thank-you page or the navigation was
// interrupted; past this window we would rather lose a conversion than invent
// one.
const MAX_AGE_MS = 5 * 60 * 1000;

type LeadMarker = { id: string; ts: number };

function newEventId(): string {
  // Shared with the Conversions API payload if you ever send server-side, so
  // Meta can dedupe browser + server hits reporting the same lead.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Called once the lead is confirmed saved. Returns the event ID it stored. */
export function markLeadSaved(): string {
  const marker: LeadMarker = { id: newEventId(), ts: Date.now() };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(marker));
  } catch {
    // Private mode / storage disabled: the conversion is lost, which is the
    // correct failure direction.
  }
  return marker.id;
}

/**
 * Reads and clears the marker. Returns the event ID only if a genuine, recent
 * submission put it there - otherwise null, and no conversion should fire.
 */
export function consumeLeadEventId(): string | null {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const marker = JSON.parse(raw) as LeadMarker;
    if (!marker?.id || typeof marker.ts !== "number") return null;
    if (Date.now() - marker.ts > MAX_AGE_MS) return null;
    return marker.id;
  } catch {
    return null;
  }
}
