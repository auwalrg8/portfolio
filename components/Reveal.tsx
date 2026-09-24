"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fade-and-lift on scroll into view — progressively enhanced.
 *
 * The hidden state is applied by CSS only under `html.js`, which the head
 * script sets before first paint. So the server HTML is fully visible: no JS,
 * no IntersectionObserver, or a crawler that does not run scripts still sees
 * every word. Nothing here can make content permanently invisible.
 */
export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("reveal-in");

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
