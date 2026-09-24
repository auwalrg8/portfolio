import type { Screen } from "@/content/projects";

/**
 * Device frame around a screen image.
 *
 * The image is the SCREEN ONLY at a 390×844 ratio — the bezel lives here.
 * To swap in a real screenshot, drop a PNG into /public/screens/ with the
 * same filename as the placeholder SVG and update the path in
 * content/projects.ts. Nothing else needs to change.
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
          height={844}
          loading="lazy"
          className="block w-full rounded-[1.6rem]"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{screen.caption}</figcaption>
    </figure>
  );
}
