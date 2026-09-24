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

export default function ResumePage() {
  const priorRoles = experience.filter((r) => !PROJECT_ORGS.has(r.org));

  return (
    <div className="resume mx-auto max-w-3xl px-6 py-12 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-raised px-5 py-4">
        <p className="text-sm text-muted">
          This page prints to a clean one-pager — use Print, then “Save as PDF”.
        </p>
        <PrintButton />
      </div>

      {/* ---- header ---- */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight print:text-2xl">{profile.name}</h1>
        <p className="mt-1 text-accent print:text-sm">{profile.title}</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{profile.valueLine}</p>

        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span>{profile.location}</span>
          <span className="text-faint">·</span>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            {profile.email}
          </a>
          <span className="text-faint">·</span>
          <a href={profile.links.github} className="hover:text-accent">
            github.com/auwalrg8
          </a>
          <span className="text-faint">·</span>
          <a href={profile.links.linkedin} className="hover:text-accent">
            linkedin.com/in/auwal-abubakar
          </a>
          <span className="text-faint">·</span>
          <a href={profile.links.figma} className="hover:text-accent">
            figma.com/@auwalrg
          </a>
        </p>
      </header>

      {/* ---- summary ---- */}
      <ResumeSection title="Summary">
        <p className="text-sm leading-relaxed text-muted">
          AI-native Flutter developer and product designer with 5+ years in Bitcoin and fintech. I take
          products from idea → prompt engineering → UX/UI design → clean Flutter architecture (Riverpod)
          → backend → production launch. I own the full stack: design system, state management, APIs,
          backend and landing pages.
        </p>
      </ResumeSection>

      {/* ---- selected work ---- */}
      <ResumeSection title="Selected work">
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-semibold">
                  {p.name} <span className="font-normal text-muted">— {p.role}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{p.period}</span>
              </div>
              <p className="mt-1 text-xs text-accent">{p.tagline}</p>
              <ul className="mt-2 space-y-1">
                {p.resumeBullets.map((line, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-faint">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} className="hover:text-accent">
                    {l.href.replace(/^https?:\/\//, "")}
                  </a>
                ))}
              </p>
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* ---- experience ---- */}
      <ResumeSection title="Experience">
        <div className="space-y-4">
          {priorRoles.map((r) => (
            <div key={`${r.org}-${r.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-semibold">
                  {r.org} <span className="font-normal text-muted">— {r.role}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{r.period}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.summary}</p>
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* ---- skills ---- */}
      <ResumeSection title="Skills">
        <dl className="space-y-1.5">
          {capabilities.map((c) => (
            <div key={c.group} className="flex flex-wrap gap-x-2 text-sm">
              <dt className="font-medium">{c.group}:</dt>
              <dd className="text-muted">{c.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-line pt-5 print:mt-5 print:pt-3">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{title}</h2>
      {children}
    </section>
  );
}
