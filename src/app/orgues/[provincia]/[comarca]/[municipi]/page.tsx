import { orgueNavigation } from "@/app/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { OrguesMunicipiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesMunicipiParams>;
}) {
  const { provincia, comarca, municipi } = orgueNavigation(await params);
  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { href: "/orgues", label: "Orgues", position: 2 },
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
          { label: municipi.nom, position: 5 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
