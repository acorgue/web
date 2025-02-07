import orgues from "@/database/orgues.json" with { type: "json" };
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { orgueNavigation } from "../orgueNavigation";

export interface OrguesProvinciaParams {
  provincia: string;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return orgues.provincies.map(({ link }) => ({ provincia: link }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesProvinciaParams>;
}): Promise<Metadata> {
  const { provincia } = orgueNavigation(await params);

  return {
    title: `Orgues de ${provincia.nom}`,
    alternates: {
      canonical: `${provincia.link}`,
      languages: { "x-default": `${provincia.link}` },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return children;
}
