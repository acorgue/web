import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { slugs } from "@/app/(markdown)/orgues/redirects";
import { CopyButton } from "@/components/copy-button";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import { OrguesOrgueParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesOrgueParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi, edifici, orgue } = orgueNavigation(
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
          {
            href: `/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`,
            label: edifici.nom,
            position: 6,
          },
          { label: orgue.nom, position: 7 },
        ]}
        className="not-prose mb-8"
      />
      <h1>
        {edifici.nom}
        <span className="block mt-2 text-2xl font-semibold">{orgue.nom}</span>
      </h1>
      <div className="not-prose flex justify-between items-baseline">
        <p>
          {municipi.nom} ({comarca.nom})
        </p>
        <CopyButton
          slug={
            slugs[
              `/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgue.link}`
            ]
          }
        />
      </div>
    </>
  );
}
