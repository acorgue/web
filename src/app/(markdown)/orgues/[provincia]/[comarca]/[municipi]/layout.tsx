import orgues from "@/database/orgues.json" with { type: "json" };
import { route } from "@/lib/route";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { orgueNavigation } from "../../../orgueNavigation";
import { OrguesComarcaParams } from "../layout";

export const dynamicParams = false;

export interface OrguesMunicipiParams extends OrguesComarcaParams {
  municipi: string;
}

export async function generateStaticParams({
  params: { provincia, comarca },
}: {
  params: OrguesComarcaParams;
}) {
  return (
    orgues.orgues
      .find(({ link }) => link === provincia)
      ?.comarques.find(({ link }) => link === comarca)
      ?.poblacions?.map(({ link }) => ({ municipi: link })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesMunicipiParams>;
}): Promise<Metadata> {
  const { provincia, comarca, municipi } = orgueNavigation(await params);
  const canonical = route("municipi", {
    provincia: provincia.link,
    comarca: comarca.link,
    municipi: municipi.link,
  });

  return {
    title: `Orgues ${municipi.de_nom ?? `de ${municipi.nom}`}`,
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
