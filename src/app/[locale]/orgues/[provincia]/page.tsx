import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import { orgueNavigation } from "../orgueNavigation";

export interface OrguesProvinciaParams {
  provincia: string;
}

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
          { href: "/", label: t("home"), position: 1 },
          { href: "/orgues", label: t("pipeOrgans"), position: 2 },
          { label: provincia.nom, position: 3 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
