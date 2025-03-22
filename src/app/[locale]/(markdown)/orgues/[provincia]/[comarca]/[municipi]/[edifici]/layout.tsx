import { orgueNavigation } from "@/app/[locale]/(markdown)/orgues/orgueNavigation";
import { route } from "@/lib/route";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<OrguesEdificiParams>;
}): Promise<Metadata> {
  const { provincia, comarca, municipi, edifici } = orgueNavigation(
    await params,
  );
  const canonical = route("edifici", {
    provincia: provincia.link,
    comarca: comarca.link,
    municipi: municipi.link,
    edifici: edifici.link,
  }) as string;

  return {
    title: `${edifici.orgues ? "Orgues" : "Orgue"} ${edifici.de ?? "de "}${edifici.nom} ${municipi.de_nom ?? `de ${municipi.nom}`}`,
    alternates: {
      canonical,
    },
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: Promise<{ locale: string }> }>>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
