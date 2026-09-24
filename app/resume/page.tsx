import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience, capabilities } from "@/content/experience";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé — ${profile.name}, ${profile.title}.`,
};

/** Roles that belong under "Selected work" on the résumé, by org name. */
const PROJECT_ORGS = new Set(["Sabi Wallet", "SA Data Sub"]);

/** github.com/auwalrg8 rather than https://github.com/auwalrg8 */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function ResumePage() {
  const priorRoles = experience.filter((r) => !PROJECT_ORGS.has(r.org));

  const contact = [
    { text: profile.email, href: `mailto:${profile.email}` },
    { text: bare(profile.links.github), href: profile.links.github },
    { text: bare(profile.links.linkedin), href: profile.links.linkedin },
    { text: bare(profile.links.figma), href: profile.links.figma },
  ];

  return (
    <div className="resume mx-auto max-w-4xl px-6 py-10 sm:py-14 print:max-w-none print:px-0 print:py-0">
      {/* ---- action bar (screen only) ---- */}
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <p className="text-sm text-muted">
          Prints to a single clean page. Use Print, then choose “Save as PDF”.
        </p>
        <PrintButton />
      </div>

      {/* ---- header ---- */}
      <header>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="text-[2rem] font-semibold leading-none tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-accent">{profile.title}</p>
          </div>
          <p className="font-mono text-xs text-faint">{profile.location}</p>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{profile.valueLine}</p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {contact.map((c) => (
            <li key={c.text}>
              <a
                href={c.href}
                className="text-xs text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {c.text}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {/* ---- body: main column + rail ---- */}
      <div className="mt-9 grid gap-x-12 gap-y-9 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_13rem] print:mt-4 print:grid print:grid-cols-[minmax(0,1fr)_9rem] print:gap-x-6 print:gap-y-0 print:pt-3">
        {/* ---------- main ---------- */}
        <div className="space-y-8">
          <Block title="Profile">
            <p className="text-sm leading-relaxed text-muted">{profile.resumeSummary}</p>
          </Block>

          <Block title="Selected work">
            <div className="space-y-6">
              {projects.map((p) => (
                <article key={p.slug}>
                  <EntryHead
                    accent={p.accent}
                    title={p.name}
                    meta={p.role}
                    period={p.period}
                  />
                  <p className="mt-1 text-xs leading-relaxed text-accent">{p.tagline}</p>

                  <ul className="mt-2.5 space-y-1.5">
                    {p.resumeBullets.map((line, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span
                          className="mt-[0.62em] h-px w-2 shrink-0 bg-faint"
                          aria-hidden="true"
                        />
                        <span className="min-w-0">{line}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Labels rather than raw URLs — a Play Store link is unreadable
                      spelled out, and the anchor survives into the printed PDF. */}
                  <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          className="font-mono text-[11px] text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Block>

          <Block title="Experience">
            <div className="space-y-4">
              {priorRoles.map((r) => (
                <article key={`${r.org}-${r.period}`}>
                  <EntryHead title={r.org} meta={r.role} period={r.period} />
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.summary}</p>
                </article>
              ))}
            </div>
          </Block>
        </div>

        {/* ---------- rail ---------- */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start print:static">
          <Block title="Skills">
            <dl className="space-y-3">
              {capabilities.map((c) => (
                <div key={c.group}>
                  <dt className="text-xs font-semibold tracking-tight">{c.group}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted">{c.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Availability">
            <p className="text-xs leading-relaxed text-muted">
              Open to full-time roles. Contract work when it is a good fit. Remote, or relocating for
              the right team.
            </p>
          </Block>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
        {title}
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </h2>
      {children}
    </section>
  );
}

function EntryHead({
  title,
  meta,
  period,
  accent,
}: {
  title: string;
  meta: string;
  period: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
      <h3 className="flex items-baseline gap-2 text-sm font-semibold tracking-tight">
        {accent && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full print:hidden"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
        )}
        {title}
        <span className="font-normal text-muted">· {meta}</span>
      </h3>
      <span className="font-mono text-[11px] text-faint">{period}</span>
    </div>
  );
}
