import { route } from "@/lib/route";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const canonical = route("cicle");

  return {
    title: t("concertSeries"),
    description: t("concertSeriesDescription"),
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
