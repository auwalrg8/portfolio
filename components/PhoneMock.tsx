import type { Screen } from "@/content/projects";

/**
 * Device frame around a screen image.
 *
 * The image is the SCREEN ONLY — the bezel lives here. The shipped captures in
 * /public/screens are 390×867, which is what the width/height below reserve; a
 * capture at a different ratio will jump on load unless those are updated too.
 */
export function PhoneMock({ screen, className = "" }: { screen: Screen; className?: string }) {
  return (
    <figure className={`group ${className}`}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-raised p-[3px] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screen.src}
          alt={screen.caption}
          width={390}
          height={867}
          loading="lazy"
          className="block w-full rounded-[1.6rem]"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{screen.caption}</figcaption>
    </figure>
  );
}
