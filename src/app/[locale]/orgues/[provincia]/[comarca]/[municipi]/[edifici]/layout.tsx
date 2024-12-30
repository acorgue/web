import { orgueNavigation } from "@/app/[locale]/orgues/orgueNavigation";
import type { PropsWithChildren } from "react";
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

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
