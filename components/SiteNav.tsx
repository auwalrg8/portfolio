import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Résumé", href: "/resume" },
];

export function SiteNav() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="mr-1 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:hidden"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
