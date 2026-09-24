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
    tagline: "A non-custodial Bitcoin, Lightning and Nostr wallet built for Nigeria",
    role: "Lead Designer & Flutter Developer",
    period: "2025 — Present",
    blurb:
      "Self-custody Bitcoin that someone in Kaduna can use without losing it in the first week. Balances read in Naira, recovery no longer depends on a seed phrase, and Lightning payments still go through on 3G.",
    resumeBullets: [
      "Designed and built the whole Flutter app on my own: onboarding, Lightning payments, P2P trading, bill payments and recovery, running on the Breez SDK in nodeless mode.",
      "Built social recovery as the recommended backup: 3 of 5 trusted contacts, shares end-to-end encrypted over Nostr, with the seed phrase still there for anyone who wants it.",
      "Structured it as Clean Architecture feature modules with Riverpod, and shipped in five languages with Naira conversion throughout and sync that tolerates dropped connections.",
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
      { src: "/screens/sabi-home.png", caption: "Home. Tap the balance to switch between sats and Naira." },
      { src: "/screens/sabi-send.png", caption: "Send, in three steps. Amount in sats, Naira equivalent underneath." },
      { src: "/screens/sabi-receive.png", caption: "Receive over Lightning or on-chain, with a reusable Lightning address." },
      { src: "/screens/sabi-p2p.png", caption: "P2P trading in Naira, non-custodial, built on Hodl Hodl. Still in beta." },
      { src: "/screens/sabi-recovery.png", caption: "Social recovery needs 3 of 5 trusted contacts. The seed phrase stays available." },
      { src: "/screens/sabi-onboarding.png", caption: "Profile. Set up a Nostr identity, or import keys you already have." },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Self-custody asks someone to write down twelve words and never lose them. When they do lose them the money is gone, and there is nobody to call. That is how most people I know in Nigeria lost their first Bitcoin.",
          "Then there is the denomination problem. A balance in sats is a number nobody shops with. If you cannot glance at your wallet and tell whether you can afford a bag of rice, the app has already failed you, before you have even sent anything.",
        ],
      },
      {
        heading: "What I had to work around",
        body: [
          "Non-custodial means I never hold the keys, so there is no support team who can reset anything. Every recovery path has to work without me in it.",
          "It also has to run on a cheap Android phone over 3G that comes and goes. So no chatty protocols, no heavy sync on launch, and no flow that assumes a request is going to come back.",
        ],
      },
      {
        heading: "How it is built",
        body: [
          "Clean Architecture with feature modules. Wallet, p2p, nostr, recovery, vtu and zaps each own their data, domain, presentation, providers and services layers. Being able to build them in isolation is the only reason a project this size was tractable for one person.",
          "Riverpod handles state, with the boundaries drawn before I built a single screen. Breez SDK runs in nodeless mode so there is no channel management to explain to anyone. Hive keeps data locally so the app opens with something on screen instead of a spinner.",
        ],
      },
      {
        heading: "The design calls",
        body: [
          "Naira and sats, one tap apart. Every amount carries its Naira equivalent, and the whole app changes denomination from a tap on the balance. Letting people read their money in the currency they actually shop in did more for comprehension than any onboarding copy I could have written.",
          "Social recovery as the recommended path, not the only one. You nominate five trusted contacts and any three of them can restore the wallet, with the shares encrypted end to end over Nostr. The seed phrase is still there under Manual Backup for people who want it, but it is no longer the only thing standing between a new user and their money.",
          "Five languages at launch: Hausa, Pidgin, Yoruba, Igbo and English. Making someone read a financial interface in their second language is a tax on exactly the people this is built for.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "On Google Play and fully open source under MIT. Lightning addresses, bill payments and Nostr zaps are running in production. P2P trading is in beta, built on Hodl Hodl so that escrow and disputes are not mine to get wrong.",
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
      "A Naira wallet for airtime, data, electricity and cable TV. Fund it once, then buy in two taps, with a double-entry ledger underneath that stays correct even when the network does not cooperate.",
    resumeBullets: [
      "Took a Naira utility wallet from idea to Google Play solo, covering airtime, data, electricity, cable TV and recharge PINs.",
      "Built a double-entry ledger with idempotent, connection-aware transactions, so a dropped request never double-charges anyone or quietly swallows a purchase.",
      "Used Paystack for card rails to stay out of PCI-DSS scope, and added biometric and PIN login, per-transaction receipts and a referral programme.",
    ],
    accent: "#16A34A",
    stack: ["Flutter", "Dart", "Riverpod", "Paystack", "Double-entry ledger", "Biometrics", "REST APIs"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sadatasub.app" },
      { label: "Landing page", href: "https://sadatasub.netlify.app" },
    ],
    metrics: sadataMetrics,
    screens: [
      { src: "/screens/sadata-home.png", caption: "One wallet, then airtime, data, electricity, cable TV or a recharge PIN." },
      { src: "/screens/sadata-buy.png", caption: "Buying data. Pick the network, enter the number, choose a plan." },
      { src: "/screens/sadata-fund.png", caption: "Wallet history, with the full detail of any transaction one tap away." },
      { src: "/screens/sadata-receipt.png", caption: "Invite and earn. The referral only pays once your friend actually spends." },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Buying ₦200 of airtime in Nigeria means typing out your full card details again, for the fifth time this week. The payment ceremony costs more attention than the thing you are buying is worth.",
          "The apps that do fix it tend to bundle top-ups with crypto trading, a social feed, and whatever else they can do with your data. Most people just want the top-up.",
        ],
      },
      {
        heading: "What I had to work around",
        body: [
          "The money cannot be wrong. Nigerian mobile data drops mid-request all the time, and every one of those drops is a chance to charge someone twice, or take their money and deliver nothing.",
          "That is a correctness problem rather than a UI one, and it ended up deciding most of how the app is built.",
        ],
      },
      {
        heading: "How it is built",
        body: [
          "A double-entry ledger, with the server as the only source of truth for a balance. The client never works out what someone has; it shows what the ledger says. Every movement is two matching entries, so the books reconcile and a discrepancy shows up instead of hiding.",
          "Transactions are idempotent, keyed per purchase, so retrying after a dropped connection lands on the same result rather than charging again. A connection-aware queue holds the intent locally and settles it once there is signal.",
          "Paystack handles the card rails. That keeps the app out of PCI-DSS scope completely, since no card data ever touches my code.",
        ],
      },
      {
        heading: "The design calls",
        body: [
          "Fund the wallet once, and every purchase after that is two taps. The card ceremony happens on a schedule you choose instead of on every ₦200 airtime top-up.",
          "A receipt for every transaction, always there to pull up. Payments on these networks are sometimes genuinely ambiguous, and when that happens people need proof more than they need a nice animation.",
          "Things I left out on purpose: crypto, trading, social feeds, ads, selling data. It is a small app with serious plumbing under it.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "Live on Google Play. Airtime, data, electricity, cable TV and recharge PINs are all delivering in production, with biometric and PIN login and a referral programme running off the same ledger.",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
