import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import { PhoneMock } from "@/components/PhoneMock";
import { MetricRow } from "@/components/MetricTile";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.blurb,
    openGraph: { title: project.name, description: project.blurb },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const other = projects.find((p) => p.slug !== project.slug);

  return (
    <article className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <Link
        href="/#work"
        className="font-mono text-xs text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        ← All work
      </Link>

      {/* ---- header ---- */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: project.accent }}
            aria-hidden="true"
          />
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
        </div>

        <p className="mt-3 max-w-2xl text-lg text-muted">{project.tagline}</p>

        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-faint">Role</dt>
            <dd className="mt-1.5 text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-faint">Timeline</dt>
            <dd className="mt-1.5 text-sm">{project.period}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-faint">Links</dt>
            <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-accent underline-offset-4 hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {/* ---- metrics ---- */}
      <Reveal className="mt-12">
        <MetricRow metrics={project.metrics} />
      </Reveal>

      {/* ---- narrative ---- */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <div className="space-y-12">
          {project.sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.03}>
              <section>
                <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((para, j) => (
                    <p key={j} className="max-w-2xl leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* ---- sticky stack panel ---- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-faint">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ---- screens ---- */}
      <section className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Screens</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {project.screens.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 0.04}>
              <PhoneMock screen={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- next ---- */}
      {other && (
        <nav className="mt-20 border-t border-line pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint">Next</p>
          <Link
            href={`/work/${other.slug}`}
            className="mt-2 inline-block text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
          >
            {other.name} →
          </Link>
          <p className="mt-1 text-sm text-muted">{other.tagline}</p>
        </nav>
      )}
    </article>
  );
}
