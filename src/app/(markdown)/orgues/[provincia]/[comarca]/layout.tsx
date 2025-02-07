import orgues from "@/database/orgues.json" with { type: "json" };
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
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

  return {
    title: `Orgues ${comarca.de}${comarca.nom}`,
    alternates: {
      canonical: `${provincia.link}/${comarca.link}`,
      languages: { "x-default": `${provincia.link}/${comarca.link}` },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
