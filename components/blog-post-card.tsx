import Link from "next/link";
import { format } from "date-fns";

interface BlogPostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export function BlogPostCard({
  slug,
  title,
  description,
  date,
  readingTime,
}: BlogPostCardProps) {
  const formattedDate = format(new Date(date), "MMM d, yyyy");

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="rounded-2xl bg-zinc-900/50 ring-1 ring-zinc-800/50 p-6 h-full transition-all duration-200 hover:ring-amber-500/30 hover:bg-zinc-900/80">
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-light mb-3">
          <time dateTime={date}>{formattedDate}</time>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>{readingTime}</span>
        </div>
        <h2 className="font-display text-xl font-bold text-zinc-50 mb-2 group-hover:text-amber-400 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </article>
    </Link>
  );
}
