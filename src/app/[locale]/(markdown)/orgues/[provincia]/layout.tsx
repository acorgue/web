import orgues from "@/database/orgues.json" with { type: "json" };
import { route } from "@/lib/route";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PropsWithChildren } from "react";
import { orgueNavigation } from "../orgueNavigation";

export interface OrguesProvinciaParams {
  provincia: string;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return orgues.provincies.map(({ link }) => ({ provincia: link }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesProvinciaParams>;
}): Promise<Metadata> {
  const { provincia } = orgueNavigation(await params);
  const canonical = route("provincia", { provincia: provincia.link }) as string;

  return {
    title: `Orgues de ${provincia.nom}`,
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
