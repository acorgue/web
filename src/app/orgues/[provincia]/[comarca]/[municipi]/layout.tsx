import orgues from "@/database/orgues.json" with { type: "json" };
import { PropsWithChildren } from "react";
import { OrguesComarcaParams } from "../page";

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

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
