import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("pipeOrgans"),
    description: t("pipeOrgansDescription"),
  };
}

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return children;
}
