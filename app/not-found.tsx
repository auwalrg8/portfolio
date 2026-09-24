import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <Link
        href="/"
        className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}
