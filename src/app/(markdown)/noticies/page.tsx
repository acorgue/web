import { ArticleCard } from "@/components/article-card";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { route } from "@/lib/route";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Noticies from "./noticies.mdx";
import { sortedPosts } from "./posts";

export default async function Page() {
  const t = await getTranslations("metadata");

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { label: t("news"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      <Noticies />

      <ul className="not-prose flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <Link key={post.slug} href={route("post", { slug: post.slug })}>
            <ArticleCard key={post.slug} post={post} />
          </Link>
        ))}
      </ul>
    </>
  );
}
