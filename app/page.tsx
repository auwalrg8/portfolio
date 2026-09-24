import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience, capabilities, processSteps } from "@/content/experience";
import { headlineStats } from "@/content/metrics";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { MetricTile } from "@/components/MetricTile";
import { PhoneMock } from "@/components/PhoneMock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Process />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  const social = [
    { label: "GitHub", href: profile.links.github },
    { label: "Figma", href: profile.links.figma },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "X", href: profile.links.x },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{profile.title}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          {profile.valueLine}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#work"
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            View work
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-xl border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
          <Link
            href="/resume"
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            Résumé →
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-14 grid grid-cols-3 gap-3">
          {headlineStats.map((m) => (
            <MetricTile key={m.label} metric={m} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Two apps, both live.">
      <div className="space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40">
              <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: p.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    <span className="font-mono text-xs text-faint">{p.period}</span>
                  </div>

                  <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted">{p.blurb}</p>

                  <p className="mt-4 font-mono text-xs text-faint">{p.role}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((s) => (
                      <li
                        key={s}
                        className="rounded-md bg-raised px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/work/${p.slug}`}
                      className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      Read the case study →
                    </Link>
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-faint underline-offset-4 transition-colors hover:text-text hover:underline"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-[190px] justify-self-center md:justify-self-end">
                  <PhoneMock screen={p.screens[0]} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I have worked.">
      <ol className="relative border-l border-line pl-6 sm:pl-8">
        {experience.map((r, i) => (
          <Reveal key={`${r.org}-${r.period}`} delay={i * 0.04}>
            <li className="relative pb-9 last:pb-0">
              <span
                className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full sm:-left-[39px] ${
                  r.current ? "bg-accent" : "bg-line"
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-semibold tracking-tight">{r.org}</h3>
                <span className="font-mono text-xs text-faint">{r.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-accent">{r.role}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{r.summary}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Process() {
  return (
    <Section id="process" eyebrow="How I work" title="How a project actually goes.">
      <Reveal>
        <p className="-mt-4 mb-10 max-w-2xl leading-relaxed text-muted">
          The AI tooling gets me through the work at roughly the pace of a small team. What it does not
          do is make the calls. I still decide the architecture, and I still read everything that ships.
        </p>
      </Reveal>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 4) * 0.04}>
            <div className="border-t border-line pt-4">
              <span className="font-mono text-xs text-accent">{s.n}</span>
              <h3 className="mt-2 font-medium tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Capabilities() {
  return (
    <Section id="capabilities" eyebrow="Capabilities" title="What I work with.">
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.group} delay={(i % 3) * 0.04}>
            <div>
              <h3 className="text-sm font-semibold tracking-tight">{c.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me.">
      <div className="max-w-2xl space-y-4">
        {profile.about.split("\n\n").map((para, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <p className="leading-relaxed text-muted">{para}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
          <h2 className="max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Working on something that moves money?
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            I am open to full-time roles, and I take contract work when it is a good fit. Email gets to
            me fastest.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              {profile.email}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
