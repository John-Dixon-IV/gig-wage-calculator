import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-4xl px-4 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-display font-extrabold text-lg text-zinc-50 hover:text-amber-400 transition-colors"
        >
          GigWageCalc
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
