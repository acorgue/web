import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import { orgueNavigation } from "../../orgueNavigation";
import { OrguesProvinciaParams } from "../page";

export interface OrguesComarcaParams extends OrguesProvinciaParams {
  comarca: string;
}

export default async function Page({
  params,
}: {
  params: Promise<OrguesComarcaParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca } = orgueNavigation(await params);

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { href: "/orgues", label: t("pipeOrgans"), position: 2 },
          {
            href: `/orgues/${provincia.link}`,
            label: provincia.nom,
            position: 3,
          },
          { label: comarca.nom, position: 4 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
