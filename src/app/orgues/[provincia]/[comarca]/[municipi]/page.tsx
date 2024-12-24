import { orgueNavigation } from "@/app/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orgues } from "@/database/orgues-repository";
import { OrguesMunicipiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesMunicipiParams>;
}) {
  const { provincia, comarca, municipi } = orgueNavigation(await params);
  const { de, nom, edificis } = orgues(await params);

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
      <h1>Orgues {de ?? `de ${nom}`}</h1>
      <div className="grid grid-cols-2 gap-4">
        {edificis.map((edifici) => (
          <article className="not-prose">
            <a
              href={`/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{edifici.nom}</CardTitle>
                  <CardDescription>{edifici.adreca}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
