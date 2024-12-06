import { orgueNavigation } from "@/app/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { OrguesOrgueParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesOrgueParams>;
}) {
  const { provincia, comarca, municipi, edifici, orgue } = orgueNavigation(
    await params,
  );

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { href: "/orgues", label: "Orgues", position: 2 },
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
    </>
  );
}
