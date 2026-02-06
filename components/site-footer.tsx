import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800/50 py-8 mt-auto">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} GigWageCalc</p>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-zinc-300 transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/blog"
            className="hover:text-zinc-300 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/feed.xml"
            className="hover:text-zinc-300 transition-colors"
          >
            RSS
          </Link>
        </nav>
      </div>
    </footer>
  );
}
