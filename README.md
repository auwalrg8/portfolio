# auwalabubakar.com — portfolio

Portfolio, case studies and résumé for Auwal Abubakar.
Next.js 15 · TypeScript · Tailwind v4 · Framer Motion.

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

## Replacing the placeholder screenshots

`public/screens/*.svg` are generated mockups drawn from your READMEs. To swap in a real one:

1. drop the image into `public/screens/` (a plain screen capture — no device frame,
   the frame is added by `components/PhoneMock.tsx`)
2. point at it in `content/projects.ts`, e.g. `src: "/screens/sabi-home.png"`

Regenerate the placeholders any time with `node scripts/gen-screens.mjs`.

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
- `/resume` prints to a clean one-pager — use the Print button, then "Save as PDF".
- Every page is statically rendered, so crawlers and ATS parsers see the full text.
- Accent colour is one line: `--accent` in `app/globals.css` (and its dark-mode pair).
