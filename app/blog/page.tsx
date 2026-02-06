import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog-post-card";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Gig Economy Blog | Tips, Earnings Guides & Tax Advice",
  description:
    "Expert guides for gig economy drivers. Learn about Uber, Lyft, and DoorDash earnings, tax deductions, and how to maximize your true hourly wage.",
  openGraph: {
    title: "Gig Economy Blog | GigWageCalc",
    description:
      "Expert guides for gig economy drivers. Earnings tips, tax advice, and real numbers.",
    url: "https://gigwagecalc.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://gigwagecalc.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500/30">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <h1 className="text-center font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-50 mb-4">
            Gig Economy Blog
          </h1>
          <p className="text-center text-lg text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
            Guides, tips, and real numbers for gig drivers
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-zinc-800 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/50">
              <FileText className="h-6 w-6 text-zinc-500" />
            </div>
            <p className="text-zinc-500">
              Posts coming soon. Check back later.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
