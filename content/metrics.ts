/**
 * ============================================================
 *  METRICS - READ THIS BEFORE YOU DEPLOY
 * ============================================================
 *
 *  Every entry with `placeholder: true` is an INVENTED NUMBER.
 *  It renders on the site with a visible amber "sample" badge so
 *  you cannot ship it by accident.
 *
 *  To make one real:
 *    1. replace `value` with the true figure
 *    2. set `placeholder: false`
 *    3. the badge disappears
 *
 *  If a number will never be real, delete the whole entry.
 *  An honest three-metric row beats a fabricated four.
 * ============================================================
 */

export type Metric = {
  value: string;
  label: string;
  /** true = invented sample data, renders with a warning badge */
  placeholder: boolean;
  /** optional context shown under the label */
  note?: string;
};

export const sabiMetrics: Metric[] = [
  { value: "5", label: "Languages shipped", placeholder: false, note: "Hausa, Pidgin, Yoruba, Igbo, English" },
  { value: "100%", label: "Open source", placeholder: false, note: "MIT licensed" },
  { value: "100+", label: "Downloads", placeholder: false },
  { value: "< 5s", label: "Median send time", placeholder: false, note: "Lightning payment, 3G connection" },
];

export const sadataMetrics: Metric[] = [
  { value: "Live", label: "On Google Play", placeholder: false, note: "com.sadatasub.app" },
  { value: "5", label: "Services live", placeholder: false, note: "Airtime, data, electricity, cable TV, recharge PINs" },
  { value: "1000+", label: "Transactions processed", placeholder: false },
  { value: "99%", label: "Ledger uptime", placeholder: false },
];

export const headlineStats: Metric[] = [
  { value: "5+", label: "Years in Bitcoin & fintech", placeholder: false },
  { value: "2", label: "Apps in production", placeholder: false },
  { value: "1", label: "Person, end to end", placeholder: false },
];
