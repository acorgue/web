import { Scaffold } from "@/components/scaffold";
import { route } from "@/lib/route";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { orgueNavigation } from "../orgueNavigation";
import { OrguesProvinciaParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesProvinciaParams & { locale: string }>;
}) {
  const { locale, ...navigation } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");
  const { provincia } = orgueNavigation(navigation);

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { href: route("orgues"), label: t("pipeOrgans"), position: 2 },
        { label: provincia.nom, position: 3 },
      ]}
    />
  );
}
