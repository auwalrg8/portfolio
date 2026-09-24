import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile, bios } from "@/content/profile";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://auwalabubakar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: bios.medium,
  keywords: [
    "Flutter developer",
    "Product designer",
    "Fintech",
    "Bitcoin",
    "Lightning Network",
    "Riverpod",
    "Mobile wallet",
    "Nigeria",
    "AI-native",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: bios.medium,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: bios.medium,
    creator: "@AuwalRG8",
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint.
 *  - `js`   tells CSS that scripting is on, which arms the scroll-reveal
 *           hidden state. Without it every .reveal block stays visible.
 *  - `dark` applies the stored theme with no flash.
 */
const bootScript = `
(function () {
  var r = document.documentElement;
  r.classList.add("js");
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) r.classList.add("dark");
  } catch (e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: bios.long,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Kaduna", addressCountry: "NG" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.figma, profile.links.x],
  knowsAbout: ["Flutter", "Dart", "Riverpod", "Product Design", "Bitcoin", "Lightning Network", "Fintech"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
