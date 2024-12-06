import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { orgueNavigation } from "../orgueNavigation";

export interface OrguesProvinciaParams {
  provincia: string;
}

export default async function Page({
  params,
}: {
  params: Promise<OrguesProvinciaParams>;
}) {
  const { provincia } = orgueNavigation(await params);

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { href: "/orgues", label: "Orgues", position: 2 },
          { label: provincia.nom, position: 3 },
        ]}
        className="not-prose mb-8"
      />
    </>
  );
}
