import orgues from "@/database/orgues.json" with { type: "json" };
import { route } from "@/lib/route";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { orgueNavigation } from "../../orgueNavigation";
import { OrguesProvinciaParams } from "../layout";

export interface OrguesComarcaParams extends OrguesProvinciaParams {
  comarca: string;
}

export const dynamicParams = false;

export async function generateStaticParams({
  params: { provincia },
}: {
  params: OrguesProvinciaParams;
}) {
  return orgues.comarques
    .filter((comarca) => comarca.provincia === provincia)
    .map(({ link }) => ({ comarca: link }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesComarcaParams>;
}): Promise<Metadata> {
  const { provincia, comarca } = orgueNavigation(await params);
  const canonical = route("comarca", {
    provincia: provincia.link,
    comarca: comarca.link,
  }) as string;

  return {
    title: `Orgues ${comarca.de}${comarca.nom}`,
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
