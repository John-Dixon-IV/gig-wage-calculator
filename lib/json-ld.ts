import { BlogPost } from "./blog";

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GigWageCalc",
      url: "https://gigwagecalc.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gigwagecalc.com/blog/${post.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GigWageCalc",
    url: "https://gigwagecalc.com",
    description:
      "Calculate your true hourly wage as a gig economy driver after gas, depreciation, and taxes.",
  };
}
