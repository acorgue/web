import type { Metadata } from "next";
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

  return { title: post.title, description: post.subtitle };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
