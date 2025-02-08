import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { PipeOrganCard } from "@/components/pipe-organ-card";
import { orgues } from "@/database/orgues-repository";
import { route } from "@/lib/route";
import { getTranslations } from "next-intl/server";
import { OrguesMunicipiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesMunicipiParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi } = orgueNavigation(await params);
  const { de_nom, nom, edificis } = orgues(await params);

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { href: route("orgues"), label: t("pipeOrgans"), position: 2 },
          {
            href: route("provincia", { provincia: provincia.link }),
            label: provincia.nom,
            position: 3,
          },
          {
            href: route("comarca", {
              provincia: provincia.link,
              comarca: comarca.link,
            }),
            label: comarca.nom,
            position: 4,
          },
          { label: municipi.nom, position: 5 },
        ]}
        className="not-prose mb-8"
      />
      <h1>Orgues {de_nom ?? `de ${nom}`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {edificis.flatMap((edifici) =>
          "orgues" in edifici ? (
            edifici.orgues?.map((orgue) => (
              <PipeOrganCard
                key={`${edifici.link}-${orgue.link}`}
                href={route("orgue", {
                  provincia: provincia.link,
                  comarca: comarca.link,
                  municipi: municipi.link,
                  edifici: edifici.link,
                  orgue: orgue.link,
                })}
                title={`${edifici.nom} (${orgue.nom})`}
                description={edifici.adreca}
              />
            ))
          ) : (
            <PipeOrganCard
              key={edifici.link}
              href={route("edifici", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
              })}
              title={edifici.nom}
              description={edifici.adreca}
            />
          ),
        )}
      </div>
    </>
  );
}
