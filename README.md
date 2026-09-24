# auwalabubakar.com — portfolio

Portfolio, case studies and résumé for Auwal Abubakar.
Next.js 15 · TypeScript · Tailwind v4. No animation library — the scroll reveal is
a small IntersectionObserver in `components/Reveal.tsx`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Everything you will want to edit lives in `content/`

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, title, value line, intro, about text, social links, **identity kit bios** |
| `content/projects.ts` | Both case studies — problem, constraint, decisions, outcome, screens, stack |
| `content/experience.ts` | Timeline, capabilities, the 8-step process |
| `content/metrics.ts` | **All numbers — read the warning at the top of the file** |

The homepage, case study pages and the résumé all read from these. Change a fact once
and it updates everywhere, so the site and the résumé can never drift apart.

---

## ⚠️ Before you deploy: the placeholder numbers

`content/metrics.ts` contains invented figures marked `placeholder: true`.
They render with a visible amber **sample** badge so they cannot be shipped unnoticed.

For each one:

1. replace `value` with the real figure
2. set `placeholder: false`
3. the badge disappears

If a number will never be real, **delete the entry**. Three honest metrics beat four invented ones.

Currently flagged: Sabi downloads, Sabi median send time, SA Data Sub transaction count,
SA Data Sub ledger uptime.

---

## The screenshots

`public/screens/*.png` are real captures from the two apps, 390×867, screen only —
the device frame is drawn by `components/PhoneMock.tsx`, so do not include a bezel.

To swap one, overwrite the file and check its caption in `content/projects.ts` still
describes what is on screen. If a capture is not 390×867, update `width`/`height` in
`PhoneMock.tsx` to match, or the image will jump as it loads.

Note that a few filenames no longer describe their contents: `sabi-onboarding.png` is
the Profile screen, `sadata-fund.png` is wallet history with a transaction open, and
`sadata-receipt.png` is Invite & earn. The captions match the images, not the names.

`scripts/gen-screens.mjs` still generates the old SVG placeholders. Nothing references
them any more; it is kept only in case a new screen needs a stand-in before it is built.

---

## The identity kit

`content/profile.ts` exports `bios.short`, `bios.medium` and `bios.long`.
Paste them into GitHub, LinkedIn and Figma so every profile says the same thing.

> Your GitHub bio currently reads "UX UI Designer / Bitcoin design contributor" — update it,
> it is the first thing a recruiter following your link will read.

---

## Deploying

**Vercel** — import the repo, accept the defaults, done.

**Netlify** — build `npm run build`, and add `@netlify/plugin-nextjs`.

Then update `SITE_URL` in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` to the real domain.

---

## Notes

- Light-first with a dark toggle; theme is set before first paint, so no flash.
- `/resume` is a two-column layout: work and experience on the left, skills and
  availability in the right rail. It prints to a single A4 page (verified at
  794×1123px with print media emulated); the print sizing lives in the `@media print`
  block at the bottom of `app/globals.css`. If you add entries, re-check the fit.
- Every page is statically rendered, so crawlers and ATS parsers see the full text.
- Accent colour is one line: `--accent` in `app/globals.css` (and its dark-mode pair).
