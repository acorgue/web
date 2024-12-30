import { orgueNavigation } from "@/app/[locale]/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import { OrguesEdificiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesEdificiParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi, edifici } = orgueNavigation(
    await params,
  );

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { href: "/orgues", label: t("pipeOrgans"), position: 2 },
          {
            collapsed: [
              {
                href: `/orgues/${provincia.link}`,
                label: provincia.nom,
                position: 3,
              },
              {
                href: `/orgues/${provincia.link}/${comarca.link}`,
                label: comarca.nom,
                position: 4,
              },
              {
                href: `/orgues/${provincia.link}/${comarca.link}/${municipi.link}`,
                label: municipi.nom,
                position: 5,
              },
            ],
          },
          { label: edifici.nom, position: 6 },
        ]}
        className="not-prose mb-8"
      />
      <h1>{edifici.nom}</h1>
      <p>
        {municipi.nom} ({comarca.nom})
      </p>
    </>
  );
}
