import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getLocale, getTranslations } from "next-intl/server";
import { posts } from "../posts";

export interface PublicacioParams {
  id: string;
}

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
  const { id } = await params;
  const post = posts[id[3]];
  const Body = (await import(`../posts/${post.fileName}`)).default;

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { href: "/publicacions", label: t("articles"), position: 2 },
          { label: post.title, position: 3 },
        ]}
        className="not-prose mb-8"
      />
      <h1>{post.title}</h1>
      <h2>{post.subtitle}</h2>
      <p>{post.author}</p>
      <p>
        <time dateTime={post.date.toISOString()}>
          {dateFormat.format(post.date)}
        </time>
      </p>
      <Body />
    </>
  );
}
