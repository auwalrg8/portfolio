import type { Metric } from "@/content/metrics";

/**
 * Renders a metric. Anything still flagged `placeholder: true` in
 * content/metrics.ts carries a visible amber badge, so invented
 * numbers cannot reach a recruiter unnoticed.
 */
export function MetricTile({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</span>
        {metric.placeholder && <SampleBadge />}
      </div>
      <p className="mt-2 text-sm font-medium text-text">{metric.label}</p>
      {metric.note && <p className="mt-1 text-xs leading-relaxed text-faint">{metric.note}</p>}
    </div>
  );
}

function SampleBadge() {
  return (
    <span
      title="Placeholder value — replace in content/metrics.ts and set placeholder: false"
      className="shrink-0 rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warn"
    >
      sample
    </span>
  );
}

export function MetricRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {metrics.map((m) => (
        <MetricTile key={m.label} metric={m} />
      ))}
    </div>
  );
}
