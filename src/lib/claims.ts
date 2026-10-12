// ---------------------------------------------------------------------------
// Single source of truth for every public, numeric marketing claim.
//
// Before this file existed the site said "500+ professionals" in one place and
// "65 engineers" in another, and quoted savings as 60%, 50-60%, 40-60%,
// 30-60% and 30% depending on the page. Inconsistent numbers cost trust with
// buyers and make AI answer engines less willing to cite the site.
//
// Rules:
//  - Every number shown on the site, in metadata or in schema comes from here.
//  - Only keep a claim that can be backed up if a client or journalist asks.
//    Unverifiable stats ($2.4M average savings, 99.8% retention, 34% CAGR,
//    "5/5 from 1,200 customers") were removed rather than softened.
//  - Ranges are phrased with "typically" because results vary by role.
// ---------------------------------------------------------------------------

export const claims = {
  /** Headcount of the Lahore delivery team. */
  teamSize: "65+",
  teamSizeWords: "more than 65",
  /** Year the company started delivering. */
  foundedYear: "2020",
  /** Cost versus an equivalent full-time US in-house hire (salary + benefits + overhead). */
  savingsRange: "30-60%",
  savingsRangeWords: "30 to 60 percent",
  /** Time from signed brief to a specialist starting work. */
  deployTime: "about 10 business days",
  deployTimeShort: "~10 business days",
  /** Time to a candidate shortlist. */
  shortlistTime: "3-5 business days",
  /** Typical time to fill a direct technical hire in the US, for comparison. */
  usHireTime: "8-14 weeks",
} as const;
