/**
 * Generates placeholder app screens into /public/screens.
 *
 * These stand in until real screenshots exist. To replace one, drop a PNG
 * into public/screens/ and point content/projects.ts at it — the device
 * frame lives in components/PhoneMock.tsx, so the swap is one line.
 *
 * Run:  node scripts/gen-screens.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "screens");
mkdirSync(OUT, { recursive: true });

const W = 390;
const H = 844;

/* ------------------------------ themes ------------------------------ */

const sabi = {
  bg: "#0D0D0F",
  card: "#17171A",
  line: "#26262B",
  text: "#FAFAF9",
  muted: "#8A8A93",
  accent: "#F7931A",
  onAccent: "#0D0D0F",
};

const sadata = {
  bg: "#FFFFFF",
  card: "#F6F7F6",
  line: "#E6E8E6",
  text: "#0B1F14",
  muted: "#6B7A70",
  accent: "#16A34A",
  onAccent: "#FFFFFF",
};

/* ------------------------------ helpers ----------------------------- */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const txt = (x, y, s, { size = 14, fill, weight = 400, anchor = "start", opacity = 1 } = {}) =>
  `<text x="${x}" y="${y}" font-family="Inter, system-ui, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${opacity}">${esc(s)}</text>`;

const rect = (x, y, w, h, { r = 0, fill = "none", stroke, sw = 1, opacity = 1 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""} opacity="${opacity}"/>`;

const circ = (cx, cy, r, { fill = "none", stroke, sw = 1, opacity = 1 } = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""} opacity="${opacity}"/>`;

const line = (x1, y1, x2, y2, { stroke, sw = 1, opacity = 1 } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}" stroke-linecap="round"/>`;

/** Status bar + home indicator, shared by every screen. */
const chrome = (t) => [
  txt(28, 42, "9:41", { size: 14, fill: t.text, weight: 600 }),
  rect(300, 32, 18, 11, { r: 2, fill: t.text, opacity: 0.9 }),
  rect(322, 30, 26, 14, { r: 4, fill: "none", stroke: t.text, sw: 1.5, opacity: 0.6 }),
  rect(324, 32, 20, 10, { r: 2, fill: t.text, opacity: 0.9 }),
  rect(145, 812, 100, 5, { r: 2.5, fill: t.text, opacity: 0.35 }),
];

const svg = (t, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
${rect(0, 0, W, H, { fill: t.bg })}
${chrome(t).join("\n")}
${body.filter(Boolean).join("\n")}
</svg>
`;

const write = (name, content) => {
  writeFileSync(join(OUT, name), content);
  console.log("  ✓", name);
};

/** Back arrow + screen title. */
const header = (t, title) => [
  line(30, 88, 44, 88, { stroke: t.text, sw: 2 }),
  line(30, 88, 36, 82, { stroke: t.text, sw: 2 }),
  line(30, 88, 36, 94, { stroke: t.text, sw: 2 }),
  txt(62, 94, title, { size: 17, fill: t.text, weight: 600 }),
];

const pill = (x, y, w, h, label, t, active) => [
  rect(x, y, w, h, { r: h / 2, fill: active ? t.accent : t.card, stroke: active ? undefined : t.line }),
  txt(x + w / 2, y + h / 2 + 5, label, {
    size: 13,
    fill: active ? t.onAccent : t.muted,
    weight: 600,
    anchor: "middle",
  }),
];

const button = (x, y, w, h, label, t) => [
  rect(x, y, w, h, { r: 14, fill: t.accent }),
  txt(x + w / 2, y + h / 2 + 6, label, { size: 16, fill: t.onAccent, weight: 600, anchor: "middle" }),
];

/** Rows of a list: [title, sub, right]. */
const listRows = (t, startY, rows, gap = 62) =>
  rows.flatMap(([title, sub, right, tone], i) => {
    const y = startY + i * gap;
    return [
      circ(46, y, 17, { fill: t.card }),
      circ(46, y, 6, { fill: tone || t.muted, opacity: 0.9 }),
      txt(76, y - 2, title, { size: 14, fill: t.text, weight: 500 }),
      txt(76, y + 16, sub, { size: 12, fill: t.muted }),
      right ? txt(358, y + 4, right, { size: 14, fill: tone || t.text, weight: 600, anchor: "end" }) : "",
    ];
  });

const keypad = (t, startY) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  return keys.flatMap((k, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 65 + col * 130;
    const y = startY + row * 62;
    return [txt(x, y, k, { size: 24, fill: t.text, weight: 500, anchor: "middle" })];
  });
};

/* --------------------------- Sabi Wallet ---------------------------- */

console.log("Sabi Wallet:");

write(
  "sabi-home.svg",
  svg(sabi, [
    txt(28, 120, "Good evening", { size: 14, fill: sabi.muted }),
    txt(28, 146, "Auwal", { size: 20, fill: sabi.text, weight: 600 }),
    circ(348, 130, 20, { fill: sabi.card }),

    rect(24, 178, 342, 150, { r: 22, fill: sabi.card }),
    txt(48, 216, "Total balance", { size: 12, fill: sabi.muted }),
    txt(48, 262, "₦ 184,250", { size: 38, fill: sabi.text, weight: 700 }),
    txt(48, 290, "≈ 412,900 sats", { size: 13, fill: sabi.accent, weight: 500 }),
    rect(250, 274, 96, 26, { r: 13, fill: sabi.accent, opacity: 0.14 }),
    txt(298, 291, "tap to switch", { size: 10, fill: sabi.accent, weight: 600, anchor: "middle" }),

    ...[
      ["Send", 44],
      ["Receive", 128],
      ["Buy", 212],
      ["P2P", 296],
    ].flatMap(([label, x]) => [
      rect(x, 356, 58, 58, { r: 18, fill: sabi.card }),
      circ(x + 29, 385, 9, { fill: "none", stroke: sabi.accent, sw: 2 }),
      txt(x + 29, 434, label, { size: 12, fill: sabi.muted, anchor: "middle" }),
    ]),

    txt(28, 494, "Recent", { size: 15, fill: sabi.text, weight: 600 }),
    txt(362, 494, "See all", { size: 12, fill: sabi.accent, anchor: "end" }),

    ...listRows(sabi, 534, [
      ["Received", "Lightning · 2m ago", "+12,000", "#22C55E"],
      ["Musa Ibrahim", "Zap · 1h ago", "-2,100", sabi.text],
      ["Airtime — MTN", "Bill · Yesterday", "-500", sabi.text],
      ["Bought BTC", "P2P · Tue", "+45,000", "#22C55E"],
    ]),

    rect(24, 762, 342, 1, { fill: sabi.line }),
  ])
);

write(
  "sabi-send.svg",
  svg(sabi, [
    ...header(sabi, "Send"),

    txt(195, 210, "₦ 5,000", { size: 44, fill: sabi.text, weight: 700, anchor: "middle" }),
    txt(195, 242, "11,200 sats", { size: 14, fill: sabi.muted, anchor: "middle" }),

    rect(24, 282, 342, 74, { r: 18, fill: sabi.card }),
    txt(48, 312, "To", { size: 12, fill: sabi.muted }),
    txt(48, 336, "musa@getalby.com", { size: 15, fill: sabi.text, weight: 500 }),

    rect(24, 372, 342, 96, { r: 18, fill: sabi.card }),
    txt(48, 404, "Network fee", { size: 13, fill: sabi.muted }),
    txt(342, 404, "₦ 2", { size: 13, fill: sabi.text, weight: 500, anchor: "end" }),
    txt(48, 440, "Arrives", { size: 13, fill: sabi.muted }),
    txt(342, 440, "Instantly", { size: 13, fill: "#22C55E", weight: 500, anchor: "end" }),

    ...keypad(sabi, 528),
    ...button(24, 716, 342, 56, "Confirm send", sabi),
  ])
);

write(
  "sabi-receive.svg",
  svg(sabi, [
    ...header(sabi, "Receive"),

    ...pill(60, 128, 130, 38, "Lightning", sabi, true),
    ...pill(200, 128, 130, 38, "On-chain", sabi, false),

    rect(75, 206, 240, 240, { r: 24, fill: "#FFFFFF" }),
    ...Array.from({ length: 64 }, (_, i) => {
      const c = i % 8;
      const r = Math.floor(i / 8);
      return (c * 7 + r * 5) % 3 === 0
        ? rect(100 + c * 25, 231 + r * 25, 19, 19, { r: 3, fill: "#0D0D0F" })
        : "";
    }),
    rect(170, 301, 50, 50, { r: 12, fill: "#FFFFFF" }),
    rect(180, 311, 30, 30, { r: 8, fill: sabi.accent }),

    txt(195, 496, "Your Lightning address", { size: 12, fill: sabi.muted, anchor: "middle" }),
    txt(195, 526, "auwal@sabi.wallet", { size: 19, fill: sabi.text, weight: 600, anchor: "middle" }),

    rect(24, 566, 166, 52, { r: 14, fill: sabi.card }),
    txt(107, 598, "Copy", { size: 15, fill: sabi.text, weight: 500, anchor: "middle" }),
    rect(200, 566, 166, 52, { r: 14, fill: sabi.card }),
    txt(283, 598, "Share", { size: 15, fill: sabi.text, weight: 500, anchor: "middle" }),

    ...button(24, 700, 342, 56, "Request an amount", sabi),
  ])
);

write(
  "sabi-p2p.svg",
  svg(sabi, [
    ...header(sabi, "P2P trading"),

    ...pill(24, 126, 100, 36, "Buy", sabi, true),
    ...pill(134, 126, 100, 36, "Sell", sabi, false),

    rect(24, 184, 342, 44, { r: 12, fill: sabi.card }),
    txt(48, 212, "Naira → Bitcoin", { size: 13, fill: sabi.muted }),
    txt(342, 212, "Filter", { size: 13, fill: sabi.accent, anchor: "end" }),

    ...[0, 1, 2, 3].flatMap((i) => {
      const y = 254 + i * 122;
      const names = ["Aisha K.", "Chidi O.", "Bala M.", "Ngozi A."];
      const rates = ["₦ 1,742", "₦ 1,738", "₦ 1,735", "₦ 1,731"];
      const limits = ["₦ 5k – 200k", "₦ 10k – 500k", "₦ 2k – 80k", "₦ 20k – 1M"];
      return [
        rect(24, y, 342, 106, { r: 18, fill: sabi.card }),
        circ(56, y + 34, 16, { fill: sabi.accent, opacity: 0.2 }),
        txt(56, y + 39, names[i][0], { size: 14, fill: sabi.accent, weight: 700, anchor: "middle" }),
        txt(84, y + 30, names[i], { size: 14, fill: sabi.text, weight: 600 }),
        txt(84, y + 50, "128 trades · 99% done", { size: 11, fill: sabi.muted }),
        txt(342, y + 36, rates[i], { size: 17, fill: sabi.text, weight: 700, anchor: "end" }),
        txt(342, y + 54, "per 1,000 sats", { size: 10, fill: sabi.muted, anchor: "end" }),
        rect(24, y + 68, 342, 1, { fill: sabi.line }),
        circ(60, y + 87, 5, { fill: "#22C55E" }),
        txt(74, y + 92, "Escrow protected", { size: 11, fill: sabi.muted }),
        rect(286, y + 74, 60, 26, { r: 13, fill: sabi.accent }),
        txt(316, y + 91, "Buy", { size: 12, fill: sabi.onAccent, weight: 700, anchor: "middle" }),
      ];
    }),
  ])
);

write(
  "sabi-recovery.svg",
  svg(sabi, [
    ...header(sabi, "Social recovery"),

    txt(28, 152, "No seed phrase.", { size: 26, fill: sabi.text, weight: 700 }),
    txt(28, 184, "Three people you trust.", { size: 26, fill: sabi.accent, weight: 700 }),
    txt(28, 224, "Any two of them can help you restore", { size: 14, fill: sabi.muted }),
    txt(28, 246, "this wallet. None of them can open it.", { size: 14, fill: sabi.muted }),

    ...[0, 1, 2].flatMap((i) => {
      const y = 300 + i * 104;
      const names = ["Musa Ibrahim", "Fatima Sani", "Yusuf Bello"];
      const states = ["Confirmed", "Confirmed", "Invite sent"];
      const tones = ["#22C55E", "#22C55E", sabi.accent];
      return [
        rect(24, y, 342, 84, { r: 18, fill: sabi.card }),
        circ(62, y + 42, 22, { fill: sabi.accent, opacity: 0.18 }),
        txt(62, y + 49, names[i][0], { size: 17, fill: sabi.accent, weight: 700, anchor: "middle" }),
        txt(100, y + 37, names[i], { size: 15, fill: sabi.text, weight: 600 }),
        circ(106, y + 55, 4, { fill: tones[i] }),
        txt(118, y + 60, states[i], { size: 12, fill: tones[i] }),
        txt(342, y + 48, "⋯", { size: 20, fill: sabi.muted, anchor: "end" }),
      ];
    }),

    rect(24, 622, 342, 58, { r: 16, fill: sabi.accent, opacity: 0.12 }),
    txt(48, 648, "2 of 3 confirmed", { size: 14, fill: sabi.accent, weight: 600 }),
    txt(48, 668, "Your wallet is recoverable", { size: 12, fill: sabi.muted }),

    ...button(24, 706, 342, 56, "Add another contact", sabi),
  ])
);

write(
  "sabi-onboarding.svg",
  svg(sabi, [
    txt(28, 150, "Choose your", { size: 30, fill: sabi.text, weight: 700 }),
    txt(28, 188, "language", { size: 30, fill: sabi.accent, weight: 700 }),
    txt(28, 226, "You can change this any time.", { size: 14, fill: sabi.muted }),

    ...["English", "Hausa", "Nigerian Pidgin", "Yorùbá", "Igbo"].flatMap((lang, i) => {
      const y = 274 + i * 76;
      const active = i === 1;
      return [
        rect(24, y, 342, 62, {
          r: 16,
          fill: active ? sabi.accent : sabi.card,
          opacity: active ? 0.14 : 1,
        }),
        active ? rect(24, y, 342, 62, { r: 16, fill: "none", stroke: sabi.accent, sw: 1.5 }) : "",
        txt(52, y + 38, lang, { size: 16, fill: active ? sabi.accent : sabi.text, weight: active ? 600 : 400 }),
        active ? circ(334, y + 31, 10, { fill: sabi.accent }) : circ(334, y + 31, 9, { fill: "none", stroke: sabi.line, sw: 1.5 }),
        active ? line(330, y + 31, 333, y + 35, { stroke: sabi.onAccent, sw: 2 }) : "",
        active ? line(333, y + 35, 339, y + 27, { stroke: sabi.onAccent, sw: 2 }) : "",
      ];
    }),

    ...button(24, 700, 342, 56, "Continue", sabi),
  ])
);

/* ---------------------------- SA Data Sub --------------------------- */

console.log("SA Data Sub:");

write(
  "sadata-home.svg",
  svg(sadata, [
    txt(28, 122, "Welcome back", { size: 13, fill: sadata.muted }),
    txt(28, 146, "Auwal", { size: 20, fill: sadata.text, weight: 600 }),
    circ(348, 132, 20, { fill: sadata.card }),

    rect(24, 176, 342, 136, { r: 22, fill: sadata.accent }),
    txt(48, 212, "Wallet balance", { size: 12, fill: "#FFFFFF", opacity: 0.85 }),
    txt(48, 256, "₦ 12,480.00", { size: 34, fill: "#FFFFFF", weight: 700 }),
    rect(48, 274, 92, 30, { r: 15, fill: "#FFFFFF", opacity: 0.18 }),
    txt(94, 294, "+ Fund", { size: 13, fill: "#FFFFFF", weight: 600, anchor: "middle" }),
    rect(150, 274, 100, 30, { r: 15, fill: "#FFFFFF", opacity: 0.18 }),
    txt(200, 294, "History", { size: 13, fill: "#FFFFFF", weight: 600, anchor: "middle" }),

    ...[
      ["Airtime", 24],
      ["Data", 114],
      ["Electricity", 204],
      ["Cable TV", 294],
    ].flatMap(([label, x]) => [
      rect(x, 340, 72, 82, { r: 18, fill: sadata.card }),
      rect(x + 24, 362, 24, 24, { r: 7, fill: "none", stroke: sadata.accent, sw: 2 }),
      txt(x + 36, 408, label, { size: 11, fill: sadata.muted, anchor: "middle" }),
    ]),

    rect(24, 444, 342, 66, { r: 16, fill: sadata.card }),
    txt(48, 474, "Refer a friend", { size: 14, fill: sadata.text, weight: 600 }),
    txt(48, 494, "Earn ₦ 20 per signup", { size: 12, fill: sadata.muted }),
    txt(342, 484, "→", { size: 18, fill: sadata.accent, anchor: "end" }),

    txt(28, 556, "Recent", { size: 15, fill: sadata.text, weight: 600 }),
    txt(362, 556, "See all", { size: 12, fill: sadata.accent, anchor: "end" }),

    ...listRows(sadata, 596, [
      ["MTN 2GB", "0803···4471 · 12:04", "-₦ 750", sadata.text],
      ["Wallet funded", "Paystack · 11:58", "+₦ 5,000", sadata.accent],
      ["Ikeja Electric", "Meter 4410·· · Tue", "-₦ 2,000", sadata.text],
    ]),
  ])
);

write(
  "sadata-buy.svg",
  svg(sadata, [
    ...header(sadata, "Buy data"),

    txt(28, 146, "Phone number", { size: 12, fill: sadata.muted }),
    rect(24, 158, 342, 62, { r: 16, fill: sadata.card, stroke: sadata.accent, sw: 1.5 }),
    txt(48, 196, "0803 447 1120", { size: 17, fill: sadata.text, weight: 500 }),
    rect(286, 174, 56, 30, { r: 15, fill: sadata.accent, opacity: 0.14 }),
    txt(314, 194, "MTN", { size: 11, fill: sadata.accent, weight: 700, anchor: "middle" }),

    txt(28, 254, "Network detected automatically", { size: 11, fill: sadata.muted }),

    txt(28, 300, "Choose a bundle", { size: 15, fill: sadata.text, weight: 600 }),

    ...[
      ["500 MB", "30 days", "₦ 350", false],
      ["1 GB", "30 days", "₦ 550", false],
      ["2 GB", "30 days", "₦ 750", true],
      ["5 GB", "30 days", "₦ 1,800", false],
      ["10 GB", "30 days", "₦ 3,200", false],
    ].flatMap(([size, days, price, active], i) => {
      const y = 326 + i * 74;
      return [
        rect(24, y, 342, 62, {
          r: 16,
          fill: active ? sadata.accent : sadata.card,
          opacity: active ? 0.1 : 1,
        }),
        active ? rect(24, y, 342, 62, { r: 16, fill: "none", stroke: sadata.accent, sw: 1.5 }) : "",
        txt(48, y + 29, size, { size: 16, fill: sadata.text, weight: 600 }),
        txt(48, y + 48, days, { size: 11, fill: sadata.muted }),
        txt(342, y + 38, price, {
          size: 16,
          fill: active ? sadata.accent : sadata.text,
          weight: 700,
          anchor: "end",
        }),
      ];
    }),

    ...button(24, 712, 342, 56, "Pay ₦ 750 from wallet", sadata),
  ])
);

write(
  "sadata-fund.svg",
  svg(sadata, [
    ...header(sadata, "Fund wallet"),

    txt(195, 196, "₦ 5,000", { size: 44, fill: sadata.text, weight: 700, anchor: "middle" }),
    txt(195, 226, "Minimum ₦ 100", { size: 12, fill: sadata.muted, anchor: "middle" }),

    ...["₦ 1,000", "₦ 2,000", "₦ 5,000", "₦ 10,000"].flatMap((amt, i) => {
      const x = 24 + (i % 4) * 88;
      return pill(x, 262, 78, 36, amt, sadata, i === 2);
    }),

    txt(28, 348, "How do you want to pay?", { size: 15, fill: sadata.text, weight: 600 }),

    ...[
      ["Card", "Visa, Mastercard, Verve", true],
      ["Bank transfer", "Dedicated account number", false],
      ["USSD", "Works without data", false],
    ].flatMap(([title, sub, active], i) => {
      const y = 378 + i * 92;
      return [
        rect(24, y, 342, 78, {
          r: 18,
          fill: active ? sadata.accent : sadata.card,
          opacity: active ? 0.1 : 1,
        }),
        active ? rect(24, y, 342, 78, { r: 18, fill: "none", stroke: sadata.accent, sw: 1.5 }) : "",
        rect(48, y + 22, 34, 34, { r: 10, fill: sadata.accent, opacity: 0.18 }),
        txt(98, y + 36, title, { size: 15, fill: sadata.text, weight: 600 }),
        txt(98, y + 56, sub, { size: 11, fill: sadata.muted }),
        active ? circ(336, y + 39, 10, { fill: sadata.accent }) : circ(336, y + 39, 9, { fill: "none", stroke: sadata.line, sw: 1.5 }),
        active ? line(332, y + 39, 335, y + 43, { stroke: "#FFFFFF", sw: 2 }) : "",
        active ? line(335, y + 43, 341, y + 35, { stroke: "#FFFFFF", sw: 2 }) : "",
      ];
    }),

    txt(195, 686, "Secured by Paystack · PCI-DSS", { size: 11, fill: sadata.muted, anchor: "middle" }),
    ...button(24, 706, 342, 56, "Continue", sadata),
  ])
);

write(
  "sadata-receipt.svg",
  svg(sadata, [
    circ(195, 176, 44, { fill: sadata.accent, opacity: 0.12 }),
    circ(195, 176, 32, { fill: sadata.accent }),
    line(182, 176, 191, 186, { stroke: "#FFFFFF", sw: 3.5 }),
    line(191, 186, 209, 166, { stroke: "#FFFFFF", sw: 3.5 }),

    txt(195, 258, "Delivered", { size: 24, fill: sadata.text, weight: 700, anchor: "middle" }),
    txt(195, 286, "2GB MTN sent to 0803 447 1120", { size: 13, fill: sadata.muted, anchor: "middle" }),
    txt(195, 330, "₦ 750.00", { size: 34, fill: sadata.text, weight: 700, anchor: "middle" }),

    rect(24, 376, 342, 268, { r: 20, fill: sadata.card }),
    ...[
      ["Reference", "SAD-8H42-QX19"],
      ["Bundle", "2 GB · 30 days"],
      ["Network", "MTN"],
      ["Paid from", "Wallet balance"],
      ["Balance after", "₦ 11,730.00"],
      ["Date", "24 Sep 2026, 12:04"],
    ].flatMap(([k, v], i) => {
      const y = 412 + i * 40;
      return [
        txt(48, y, k, { size: 13, fill: sadata.muted }),
        txt(342, y, v, { size: 13, fill: sadata.text, weight: 500, anchor: "end" }),
        i < 5 ? rect(48, y + 14, 294, 1, { fill: sadata.line }) : "",
      ];
    }),

    rect(24, 668, 166, 52, { r: 14, fill: sadata.card }),
    txt(107, 700, "Share", { size: 15, fill: sadata.text, weight: 500, anchor: "middle" }),
    rect(200, 668, 166, 52, { r: 14, fill: sadata.card }),
    txt(283, 700, "Buy again", { size: 15, fill: sadata.text, weight: 500, anchor: "middle" }),

    ...button(24, 732, 342, 52, "Done", sadata),
  ])
);

console.log("\nDone —", OUT);
