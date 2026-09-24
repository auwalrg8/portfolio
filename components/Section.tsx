import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className = "" }: Props) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-6 py-16 sm:py-20 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-10">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
