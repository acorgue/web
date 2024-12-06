import orgues from "@/database/orgues.json" with { type: "json" };
import { PropsWithChildren } from "react";
import { OrguesEdificiParams } from "../layout";

export const dynamicParams = false;

export interface OrguesOrgueParams extends OrguesEdificiParams {
  orgue: string;
}

export async function generateStaticParams({
  params: { provincia, comarca, municipi, edifici },
}: {
  params: OrguesEdificiParams;
}) {
  const detallsEdifici = orgues.orgues
    .find(({ link }) => link === provincia)
    ?.comarques.find(({ link }) => link === comarca)
    ?.poblacions?.find(({ link }) => link === municipi)
    ?.edificis?.find(({ link }) => link === edifici);

  if (!detallsEdifici) return null;

  return (
    ("orgues" in detallsEdifici
      ? (detallsEdifici?.orgues as { link: string }[])?.map(({ link }) => ({
          orgue: link,
        }))
      : null) ?? []
  );
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
