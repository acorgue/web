import { orgueNavigation } from "@/app/orgues/orgueNavigation";
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

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
