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
      "Built a Naira utility wallet on my own and put it on Google Play. Double-entry ledger, Paystack for cards, biometric login, and a transaction flow that holds up when mobile data cuts out halfway through.",
    current: true,
  },
  {
    org: "Sabi Wallet",
    role: "Lead Designer & Flutter Developer",
    period: "2025 — Present",
    summary:
      "A non-custodial Bitcoin, Lightning and Nostr wallet made for Nigeria. I own the UX and the Flutter build: onboarding, payments, social recovery, low-data screens, and five languages.",
    current: true,
  },
  {
    org: "Geyser.fund",
    role: "UI Designer",
    period: "2022 — 2023",
    summary:
      "Designed the Lightning payment flows and ran user research for a Bitcoin crowdfunding platform. The contribution and payout journeys I worked on are what open-source projects use to raise in sats.",
  },
  {
    org: "Synonym",
    role: "Product Designer — Bitkit Wallet",
    period: "2022",
    summary:
      "Wallet UX for Bitkit. Self-custody flows, backup models, and the interface language for a Lightning-first mobile wallet.",
  },
  {
    org: "Bitcoin Design Community / Alby",
    role: "Open-Source Contributor",
    period: "2021 — Present",
    summary:
      "Still contributing to open-source Bitcoin design: wallet patterns, payment UX reviews and interface work across community projects, including GetAlby.",
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
    group: "AI-assisted workflow",
    items: ["Claude Code", "Grok", "GPT", "Prompt engineering", "AI-assisted design"],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Framing the problem",
    body: "Who is losing money, where in the flow, and why. If I can't answer that, I don't start.",
  },
  {
    n: "02",
    title: "Thinking it through with AI",
    body: "Grok and GPT to pull apart edge cases and look at what competitors got wrong, before anything gets drawn.",
  },
  {
    n: "03",
    title: "UX and UI",
    body: "Figma, with AI helping. Flows first, then a component library that maps one-to-one onto widgets.",
  },
  {
    n: "04",
    title: "Architecture",
    body: "Feature modules and Riverpod state boundaries get decided before I build the first screen. Retrofitting those is painful.",
  },
  {
    n: "05",
    title: "Building",
    body: "Claude Code writes most of the Flutter. I read every line of it, and the architecture decisions stay mine.",
  },
  {
    n: "06",
    title: "Backend",
    body: "Neon and Postgres, SQL, REST APIs. Ledgers and idempotency designed for the case where the request never comes back.",
  },
  {
    n: "07",
    title: "Landing page",
    body: "A React or Next.js site that goes up with the app, not three weeks after it.",
  },
  {
    n: "08",
    title: "Release",
    body: "Play Store, monitoring, then fixing whatever real usage turns up. That part never really ends.",
  },
];
