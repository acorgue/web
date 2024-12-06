import orgues from "@/database/orgues.json" with { type: "json" };
import { PropsWithChildren } from "react";
import { OrguesMunicipiParams } from "../layout";

export const dynamicParams = false;

export interface OrguesEdificiParams extends OrguesMunicipiParams {
  edifici: string;
}

export async function generateStaticParams({
  params: { provincia, comarca, municipi },
}: {
  params: OrguesMunicipiParams;
}) {
  return (
    orgues.orgues
      .find(({ link }) => link === provincia)
      ?.comarques.find(({ link }) => link === comarca)
      ?.poblacions?.find(({ link }) => link === municipi)
      ?.edificis?.map(({ link }) => ({ edifici: link })) ?? []
  );
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
