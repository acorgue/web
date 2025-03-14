import { route } from "@/lib/route";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const canonical = route("avis-legal");

  return {
    title: t("legalNotice"),
    description: t("legalNoticeDescription"),
    alternates: {
      canonical,
      languages: { "x-default": canonical },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
