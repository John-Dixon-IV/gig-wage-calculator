import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { format } from "date-fns";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { useMDXComponents } from "@/mdx-components";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.description,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        url: `https://gigwagecalc.com/blog/${post.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
      alternates: {
        canonical: `https://gigwagecalc.com/blog/${post.slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const components = useMDXComponents({});
  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");

  const breadcrumbs = [
    { name: "Home", url: "https://gigwagecalc.com" },
    { name: "Blog", url: "https://gigwagecalc.com/blog" },
    { name: post.title, url: `https://gigwagecalc.com/blog/${post.slug}` },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-zinc-500"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li className="text-zinc-400 truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-50 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500 font-light">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>{post.readingTime}</span>
            {post.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>{post.author}</span>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose-custom">
          <MDXRemote
            source={post.content}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Back to blog */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </main>
  );
}
