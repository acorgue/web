import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { route } from "@/lib/route";
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
  const canonical = route("orgue", {
    provincia: provincia.link,
    comarca: comarca.link,
    municipi: municipi.link,
    edifici: edifici.link,
    orgue: orgue.link,
  });

  return {
    title: `${orgue.nom} ${edifici.de ?? "de "}${edifici.nom} ${municipi.de_nom ?? `de ${municipi.nom}`}`,
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
