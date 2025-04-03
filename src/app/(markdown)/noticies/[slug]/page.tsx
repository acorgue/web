import { ArticleCard } from "@/components/article-card";
import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { route } from "@/lib/route";
import { anchorClassName, findMDXHeadings } from "@/mdx-components";
import { CalendarIcon, UserIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { type PostData, posts, sortedPosts } from "../posts";
import type { PublicacioParams } from "./layout";

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
  const headings = findMDXHeadings(Body({}));

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { href: route("noticies"), label: t("news"), position: 2 },
        { label: post.title, position: 3 },
      ]}
      aside={headings.length ? <TOC headings={headings} /> : null}
    >
      <article itemScope itemType="https://schema.org/NewsArticle">
        <header className="space-y-4 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h1 itemProp="headline" className="text-4xl tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 dark:text-gray-400">
            {post.author ? (
              <address
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
                className="flex gap-1 items-center not-italic"
              >
                <UserIcon className="size-4 shrink-0" />
                <span itemProp="name">{post.author}</span>
              </address>
            ) : null}

            <span className="flex gap-1 items-center">
              <CalendarIcon className="size-4 shrink-0" />
              <time
                itemProp="datePublished"
                content={post.date.toISOString()}
                dateTime={post.date.toISOString()}
              >
                {dateFormat.format(post.date)}
              </time>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <section className="leading-relaxed text-md">
          {post.subtitle && (
            <h2 className="text-lg text-aco">{post.subtitle}</h2>
          )}
          <Body />
        </section>
        <AuthorSection post={post} />
      </article>
      <section>
        <h2>Últimes notícies</h2>
        <ul className="not-prose flex flex-col gap-4">
          {sortedPosts
            .filter((latest) => latest.slug !== post.slug)
            .slice(0, 3)
            .map((post) => (
              <Link key={post.slug} href={route("post", { slug: post.slug })}>
                <ArticleCard key={post.slug} post={post} />
              </Link>
            ))}
        </ul>
      </section>
    </Scaffold>
  );
}

function AuthorSection({ post }: { post: PostData }) {
  const authorPosts = sortedPosts.filter(
    ({ slug, author }) => slug !== post.slug && author === post.author,
  );
  return (
    <Card className="mt-4 border-none bg-muted">
      <CardHeader>{post.author}</CardHeader>
      {authorPosts.length > 0 ? (
        <CardContent className="pb-4">
          <h2 className="mt-2 text-sm uppercase tracking-wide">
            Més notícies de l’autor
          </h2>
          <ul className="mb-0">
            {authorPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/noticies/${post.slug}`}
                  className={anchorClassName}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      ) : null}
    </Card>
  );
}
