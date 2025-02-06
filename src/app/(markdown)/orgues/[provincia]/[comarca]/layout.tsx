import orgues from "@/database/orgues.json" with { type: "json" };
import { PropsWithChildren } from "react";
import { OrguesProvinciaParams } from "../page";

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

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
