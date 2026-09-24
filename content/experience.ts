export type Role = {
  org: string;
  role: string;
  period: string;
  summary: string;
  current?: boolean;
};

export const experience: Role[] = [
  {
    org: "SA Data Sub",
    role: "Product Designer & Flutter Developer",
    period: "Shipped Aug 2026",
    summary:
      "Designed and built a Naira utility wallet from idea to Google Play. Double-entry ledger, Paystack rails, biometric auth, built to survive unreliable mobile data.",
    current: true,
  },
  {
    org: "Sabi Wallet",
    role: "Lead Designer & Flutter Developer",
    period: "2025 — Present",
    summary:
      "Nigeria's first non-custodial Bitcoin + Lightning + Nostr wallet. Full ownership of UX and Flutter implementation — onboarding, payments, social recovery, low-data interfaces, five languages.",
    current: true,
  },
  {
    org: "Geyser.fund",
    role: "UI Designer",
    period: "2022 — 2023",
    summary:
      "Lightning payment flows and user research for a Bitcoin crowdfunding platform. Designed contribution and payout journeys used by open-source projects raising in sats.",
  },
  {
    org: "Synonym",
    role: "Product Designer — Bitkit Wallet",
    period: "2022",
    summary:
      "Wallet UX for Bitkit. Self-custody flows, backup models and the interface language for Lightning-first mobile payments.",
  },
  {
    org: "Bitcoin Design Community / Alby",
    role: "Open-Source Contributor",
    period: "2021 — Present",
    summary:
      "Ongoing contributions to open-source Bitcoin design — wallet patterns, payment UX guidance and interface work across community projects including GetAlby.",
    current: true,
  },
];

export const capabilities = [
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "Riverpod", "Clean Architecture", "Hive", "Firebase"],
  },
  {
    group: "Design",
    items: ["Figma", "Design systems", "Wallet & fintech UX", "Prototyping", "Design-to-code handoff"],
  },
  {
    group: "Bitcoin & payments",
    items: ["Breez SDK (Nodeless)", "Lightning Network", "Nostr", "Paystack", "Double-entry ledgers"],
  },
  {
    group: "Web & backend",
    items: ["React", "Next.js", "Tailwind", "Neon / Postgres", "SQL", "Rust", "REST APIs"],
  },
  {
    group: "AI-native workflow",
    items: ["Claude Code", "Grok", "GPT", "Prompt engineering", "AI-assisted design"],
  },
];

export const processSteps = [
  { n: "01", title: "Idea", body: "Problem framing with real users in mind — who loses money, where, and why." },
  { n: "02", title: "Prompt engineering", body: "Grok and GPT for product thinking, edge cases and competitive teardown before anything is drawn." },
  { n: "03", title: "UX / UI", body: "Figma with AI assistance. Flows first, then a component library that maps 1:1 to widgets." },
  { n: "04", title: "Architecture", body: "Clean Architecture, feature modules and Riverpod state boundaries decided before the first screen is built." },
  { n: "05", title: "Implementation", body: "Claude Code for high-quality Flutter. I review every line — the architecture is mine, the velocity is shared." },
  { n: "06", title: "Backend", body: "Neon / Postgres, SQL, REST APIs. Ledgers, idempotency and reconciliation designed to be correct under failure." },
  { n: "07", title: "Landing page", body: "React or Next.js marketing site, shipped with the app, not after it." },
  { n: "08", title: "Production", body: "Play Store release, monitoring, and iteration on what real usage exposes." },
];
