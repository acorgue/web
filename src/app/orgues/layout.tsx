import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const { title } = await parent;

  return {
    title: `${t("pipeOrgans")} · ${title}`,
    description: t("pipeOrgansDescription"),
  };
}

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return children;
}
