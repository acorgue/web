import { route } from "@/lib/route";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { posts } from "../posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.values(posts).map(({ slug }) => ({ slug }));
}

export interface PublicacioParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PublicacioParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  const canonical = route("post", { slug: post.slug }) as string;

  return {
    title: post.title,
    description: post.subtitle,
    alternates: {
      canonical,
    },
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: Promise<{ locale: string }> }>>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
