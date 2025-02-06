import type { PropsWithChildren } from "react";
import { posts } from "../posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.values(posts).map(({ id }) => ({ id: id.split("/") }));
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
