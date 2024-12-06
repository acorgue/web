import { PageBreadcrumb } from "@/components/page-breadcrumb";
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
  const { provincia, comarca } = orgueNavigation(await params);

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
          { label: comarca.nom, position: 4 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
