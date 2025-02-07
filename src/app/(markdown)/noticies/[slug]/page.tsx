import { ArticleCard } from "@/components/article-card";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { route } from "@/lib/route";
import { UserIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { posts, sortedPosts } from "../posts";
import { PublicacioParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<PublicacioParams>;
}) {
  const locale = await getLocale();
  const dateFormat = Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const t = await getTranslations("metadata");
  const { slug } = await params;
  const post = posts[slug];
  const Body = (await import(`../_posts/${post.fileName}`)).default;

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { href: route("noticies"), label: t("news"), position: 2 },
          { label: post.title, position: 3 },
        ]}
        className="not-prose mb-8"
      />
      <article itemScope itemType="https://schema.org/NewsArticle">
        <header className="space-y-4 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h1
            itemProp="headline"
            className="text-4xl font-extrabold tracking-tight leading-tight"
          >
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <address
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
              className="flex gap-1 items-center not-italic"
            >
              <UserIcon className="w-4 h-4" /> {post.author}
            </address>
            <time
              itemProp="datePublished"
              content={post.date.toISOString()}
              dateTime={post.date.toISOString()}
              className="uppercase tracking-wide"
            >
              {dateFormat.format(post.date)}
            </time>
          </div>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <section className="leading-relaxed text-md">
          {post.subtitle && (
            <h2 className="text-lg text-gray-600 dark:text-gray-400">
              {post.subtitle}
            </h2>
          )}
          <Body />
        </section>
      </article>
      <section>
        <h2>Últimes notícies</h2>
        <ul className="not-prose flex flex-col gap-4">
          {sortedPosts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={route("post", { slug: post.slug })}>
              <ArticleCard key={post.slug} post={post} />
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}
