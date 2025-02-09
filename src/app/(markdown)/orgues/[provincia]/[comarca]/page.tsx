import { Scaffold } from "@/components/scaffold";
import { route } from "@/lib/route";
import { getTranslations } from "next-intl/server";
import { orgueNavigation } from "../../orgueNavigation";
import { OrguesComarcaParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesComarcaParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca } = orgueNavigation(await params);

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { href: route("orgues"), label: t("pipeOrgans"), position: 2 },
        {
          href: route("provincia", { provincia: provincia.link }),
          label: provincia.nom,
          position: 3,
        },
        { label: comarca.nom, position: 4 },
      ]}
    />
  );
}
