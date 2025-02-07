import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { OrguesEdificiParams } from "../layout";

export const dynamicParams = false;

export interface OrguesOrgueParams extends OrguesEdificiParams {
  orgue: string;
}

export async function generateStaticParams({
  params,
}: {
  params: OrguesEdificiParams;
}) {
  const { edifici } = orgueNavigation(params);

  return edifici.orgues?.map(({ link }) => ({ orgue: link })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesOrgueParams>;
}): Promise<Metadata> {
  const { provincia, comarca, municipi, edifici, orgue } = orgueNavigation(
    await params,
  );

  return {
    title: `${orgue.nom} ${edifici.de ?? "de "}${edifici.nom} ${municipi.de_nom ?? `de ${municipi.nom}`}`,
    alternates: {
      canonical: `${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgue.link}`,
      languages: {
        "x-default": `${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgue.link}`,
      },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
