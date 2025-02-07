import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { OrguesMunicipiParams } from "../layout";

export const dynamicParams = false;

export interface OrguesEdificiParams extends OrguesMunicipiParams {
  edifici: string;
}

export async function generateStaticParams({
  params,
}: {
  params: OrguesMunicipiParams;
}) {
  const { municipi } = orgueNavigation(params);

  return municipi?.edificis?.map(({ link }) => ({ edifici: link })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesEdificiParams>;
}): Promise<Metadata> {
  const { provincia, comarca, municipi, edifici } = orgueNavigation(
    await params,
  );

  return {
    title: `${edifici.orgues ? "Orgues" : "Orgue"} ${edifici.de ?? "de "}${edifici.nom} ${municipi.de_nom ?? `de ${municipi.nom}`}`,
    alternates: {
      canonical: `${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`,
      languages: {
        "x-default": `${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`,
      },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
