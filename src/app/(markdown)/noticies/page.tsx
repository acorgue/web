import { ArticleCard } from "@/components/article-card";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import Noticies from "./noticies.mdx";
import { sortedPosts } from "./posts";

export default async function Page() {
  const t = await getTranslations("metadata");

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { label: t("news"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      <Noticies />

      <ul className="not-prose flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <a key={post.slug} href={`/noticies/${post.slug}`}>
            <ArticleCard key={post.slug} post={post} />
          </a>
        ))}
      </ul>
    </>
  );
}
