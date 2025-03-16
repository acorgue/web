import { route } from "@/lib/route";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const canonical = route("cicle") as string;

  return {
    title: t("concertSeries"),
    description: t("concertSeriesDescription"),
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
