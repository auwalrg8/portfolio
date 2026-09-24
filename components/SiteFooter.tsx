import { profile } from "@/content/profile";

const social = [
  { label: "GitHub", href: profile.links.github },
  { label: "Figma", href: profile.links.figma },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "X", href: profile.links.x },
];

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faint">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
