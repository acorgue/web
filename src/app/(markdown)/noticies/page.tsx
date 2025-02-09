import { ArticleCard } from "@/components/article-card";
import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Noticies from "./noticies.mdx";
import { sortedPosts } from "./posts";

export default async function Page() {
  const t = await getTranslations("metadata");

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { label: t("news"), position: 2 },
      ]}
      aside={<TOC headings={findMDXHeadings(Noticies({}))} />}
    >
      <Noticies />
      <LatestPosts />
    </Scaffold>
  );
}

function LatestPosts() {
  return (
    <ul className="not-prose flex flex-col gap-4">
      {sortedPosts.map((post) => (
        <Link key={post.slug} href={route("post", { slug: post.slug })}>
          <ArticleCard key={post.slug} post={post} />
        </Link>
      ))}
    </ul>
  );
}
