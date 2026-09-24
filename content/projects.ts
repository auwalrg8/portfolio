import { sabiMetrics, sadataMetrics, type Metric } from "./metrics";

export type Screen = { src: string; caption: string };

export type CaseSection = { heading: string; body: string[] };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  blurb: string;
  /** Tight, outcome-first lines for /resume — deliberately not the case-study prose. */
  resumeBullets: string[];
  accent: string;
  stack: string[];
  links: { label: string; href: string }[];
  metrics: Metric[];
  screens: Screen[];
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "sabi-wallet",
    name: "Sabi Wallet",
    tagline: "Nigeria's first non-custodial Bitcoin + Lightning + Nostr wallet",
    role: "Lead Designer & Flutter Developer",
    period: "2025 — Present",
    blurb:
      "Self-custody Bitcoin that a first-time user in Kaduna can actually hold onto — balances in Naira, recovery without a seed phrase, and Lightning payments that clear on a 3G connection.",
    resumeBullets: [
      "Designed and built the full Flutter app — onboarding, Lightning payments, P2P trading, bill payments and recovery — on Breez SDK in nodeless mode.",
      "Replaced seed-phrase backup with social recovery across three trusted contacts, removing the most common way first-time users lose funds.",
      "Architected in Clean Architecture feature modules with Riverpod; shipped in five languages with a Naira-first balance and offline-tolerant sync.",
    ],
    accent: "#F7931A",
    stack: ["Flutter", "Dart", "Riverpod", "Breez SDK (Nodeless)", "Nostr", "Hive", "Firebase", "Rust"],
    links: [
      { label: "Live site", href: "https://sabiwallet.online" },
      { label: "Source", href: "https://github.com/auwalrg8/Sabi" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sabi.app" },
    ],
    metrics: sabiMetrics,
    screens: [
      { src: "/screens/sabi-home.svg", caption: "Balance in Naira. Tap to toggle sats." },
      { src: "/screens/sabi-send.svg", caption: "Send — amount first, fee disclosed before confirm." },
      { src: "/screens/sabi-receive.svg", caption: "Receive via Lightning address or QR." },
      { src: "/screens/sabi-p2p.svg", caption: "P2P trading with escrow protection." },
      { src: "/screens/sabi-recovery.svg", caption: "Social recovery — three trusted contacts, no seed phrase." },
      { src: "/screens/sabi-onboarding.svg", caption: "Onboarding in five languages." },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Self-custody asks a first-time user to write down twelve words and never lose them. If they do, the money is gone — no support line, no reset, no recourse. In practice that is how most people in Nigeria lose their first Bitcoin.",
          "The second problem is denomination. A balance shown in sats is a number nobody shops in. If someone cannot tell at a glance whether they can afford a bag of rice, the wallet has failed before any transaction starts.",
        ],
      },
      {
        heading: "The constraint",
        body: [
          "Non-custodial by definition: I never hold the keys, so there is no team who can reset anything. Every recovery path has to work without me in it.",
          "It also has to run on an entry-level Android device over intermittent 3G. That rules out chatty protocols, heavy sync on launch, and any flow that assumes a request will come back.",
        ],
      },
      {
        heading: "The architecture decision",
        body: [
          "Clean Architecture with feature modules — each of wallet, p2p, nostr, recovery, vtu and zaps owns its own data, domain, presentation, providers and services layer. Features can be built and reasoned about in isolation, which is what makes a solo build of this size tractable.",
          "Riverpod for state, with boundaries drawn before the first screen. Breez SDK in nodeless mode so there is no channel management to expose to the user. Hive for local persistence so the app opens with data already on screen instead of a spinner.",
        ],
      },
      {
        heading: "The design decision",
        body: [
          "Naira first, sats on tap. The primary balance reads in the currency people think in; the sat denomination is one tap away for users who want it. This one inversion did more for comprehension than any amount of onboarding copy.",
          "Social recovery instead of a seed phrase. The user picks three trusted contacts at setup; any two can help restore the wallet. It trades an abstract security ritual for a social one people already understand — and it removes the single most common way this money gets lost.",
          "Five languages at launch — Hausa, Pidgin, Yoruba, Igbo and English — because a financial interface in a second language is a friction tax on exactly the users this is for.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Shipped to Google Play and fully open source under MIT. The Lightning address, bill payments, Nostr zaps and escrow-protected P2P trading all run in production.",
        ],
      },
    ],
  },
  {
    slug: "sa-data-sub",
    name: "SA Data Sub",
    tagline: "One wallet for every top-up you make",
    role: "Product Designer & Flutter Developer",
    period: "Shipped Aug 2026",
    blurb:
      "A Naira utility wallet for airtime, data, electricity and cable TV. Fund once, then buy in two taps — with a double-entry ledger underneath that stays correct when the network does not.",
    resumeBullets: [
      "Took a Naira utility wallet from idea to Google Play solo — airtime, data, electricity, cable TV and recharge PINs.",
      "Built a double-entry ledger with idempotent, connection-aware transactions so dropped requests never double-charge or silently lose a purchase.",
      "Integrated Paystack card rails to keep the app out of PCI-DSS scope; added biometric and PIN auth, per-transaction receipts and a referral programme.",
    ],
    accent: "#16A34A",
    stack: ["Flutter", "Dart", "Riverpod", "Paystack", "Double-entry ledger", "Biometrics", "REST APIs"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sadatasub.app" },
      { label: "Landing page", href: "https://sadatasub.netlify.app" },
    ],
    metrics: sadataMetrics,
    screens: [
      { src: "/screens/sadata-home.svg", caption: "One wallet, four services, two taps to buy." },
      { src: "/screens/sadata-buy.svg", caption: "Buy data — network detected from the number." },
      { src: "/screens/sadata-fund.svg", caption: "Fund by card, transfer or USSD." },
      { src: "/screens/sadata-receipt.svg", caption: "A receipt for every transaction." },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Buying ₦200 of airtime in Nigeria means entering full card details, again, for the fifth time this week. The payment ceremony costs more attention than the purchase is worth.",
          "The apps that solve it bundle top-ups with crypto trading, social feeds and data harvesting. Most people want the utility without the rest of it.",
        ],
      },
      {
        heading: "The constraint",
        body: [
          "Money must never be wrong. Nigerian mobile data drops mid-request constantly, and every one of those drops is a chance to double-charge a user or take their money and deliver nothing.",
          "That is a correctness problem, not a UI problem, and it decided most of the build.",
        ],
      },
      {
        heading: "The architecture decision",
        body: [
          "A double-entry ledger with the server as the single source of truth for balance. The client never computes what someone has — it displays what the ledger says. Every movement is two matching entries, so the books can be reconciled and any discrepancy is visible rather than silent.",
          "Idempotent transactions keyed per purchase, so a retry after a dropped connection resolves to the same result instead of charging twice. A connection-aware queue holds intent locally and settles when signal returns.",
          "Paystack handles the card rails, which keeps the app out of PCI-DSS scope entirely — no card data ever touches my code.",
        ],
      },
      {
        heading: "The design decision",
        body: [
          "Fund the wallet once, then every purchase after it is two taps. The card ceremony happens on a schedule the user chooses, not on every ₦200 purchase.",
          "A receipt for every transaction, always retrievable. When a payment is ambiguous — and on these networks it sometimes is — the user needs proof more than they need an animation.",
          "Deliberately excluded: crypto, trading, social feeds, ads, data resale. Small app, serious plumbing.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Live on Google Play. Airtime, data, electricity, cable TV and recharge PINs all delivering in production, with biometric and PIN auth and a referral programme running on the same ledger.",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
