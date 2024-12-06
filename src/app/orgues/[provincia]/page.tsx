import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { useOrgue } from "../useOrgue";

export interface OrguesProvinciaParams {
  provincia: string;
}

export default async function Page({
  params,
}: {
  params: Promise<OrguesProvinciaParams>;
}) {
  const { provincia } = useOrgue(await params);

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
