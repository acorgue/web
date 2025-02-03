import orgues from "@/database/orgues.json" with { type: "json" };
import { PropsWithChildren } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return orgues.provincies.map(({ link }) => ({ provincia: link }));
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
