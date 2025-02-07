import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { route } from "@/lib/route";
import { getTranslations } from "next-intl/server";
import { orgueNavigation } from "../orgueNavigation";
import { OrguesProvinciaParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesProvinciaParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia } = orgueNavigation(await params);

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { href: route("orgues"), label: t("pipeOrgans"), position: 2 },
          { label: provincia.nom, position: 3 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
