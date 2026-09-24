export const profile = {
  name: "Auwal Abubakar",
  title: "Flutter Developer & Product Designer",
  valueLine: "I design and build mobile money apps, then ship them myself.",
  location: "Kaduna, Nigeria",
  email: "auwalrg8@gmail.com",
  intro:
    "I've spent about five years on Bitcoin and fintech products. I started as a designer, got tired of handing specs over the wall, and learned to build the apps instead. Two of them are live right now and moving real money for real people.",
  about:
    "I came into this through Bitcoin design: payment flows at Geyser.fund, wallet UX at Synonym, and a lot of open-source work with the Bitcoin Design community along the way.\n\nThese days I lean on AI tools pretty heavily. Grok and GPT when I'm thinking a product through, Figma with AI for interface work, Claude Code for most of the Flutter. It made me much faster. It didn't change what I actually care about, which is that people here keep losing money to things that are fixable — confusing recovery, apps that fall over the moment the signal drops, fees nobody warned them about.\n\nI live in Kaduna, Nigeria. Open to full-time work, and I take on contract projects when they're a good fit.",
  /** One paragraph for the top of /resume. Keep it tight; the page is a one-pager. */
  resumeSummary:
    "Flutter developer and product designer, five years in Bitcoin and fintech. I work solo across the whole build: research and UX, Figma design system, Flutter app in Clean Architecture with Riverpod, backend and ledger, landing page, and the store release. Two apps in production, both handling live payments.",
  links: {
    github: "https://github.com/auwalrg8",
    figma: "https://www.figma.com/@auwalrg",
    linkedin: "https://linkedin.com/in/auwal-abubakar",
    x: "https://x.com/AuwalRG8",
  },
} as const;

/**
 * Identity kit - keep every profile saying the same thing.
 * Paste these into GitHub, LinkedIn and Figma so they match the site.
 */
export const bios = {
  short:
    "Flutter developer and product designer. I build wallet and fintech apps, design included, and ship them myself.",
  medium:
    "Flutter developer and product designer with five years in Bitcoin and fintech. I handle the design, the Flutter code, the backend and the launch. Two apps live: Sabi Wallet and SA Data Sub.",
  long:
    "Flutter developer and product designer with five years in Bitcoin and fintech. I work solo across the whole build: UX and design system in Figma, Flutter app in Clean Architecture with Riverpod, backend and ledger, and the store release. Shipped Sabi Wallet, a non-custodial Bitcoin, Lightning and Nostr wallet built for Nigeria, and SA Data Sub, a Naira utility wallet on Google Play. Before that I designed Lightning payment flows at Geyser.fund and wallet UX at Synonym. Based in Kaduna, Nigeria.",
} as const;
