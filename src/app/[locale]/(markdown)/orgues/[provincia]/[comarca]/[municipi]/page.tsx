import { orgueNavigation } from "@/app/[locale]/(markdown)/orgues/orgueNavigation";
import { PipeOrganCard } from "@/components/pipe-organ-card";
import { Scaffold } from "@/components/scaffold";
import { orgues } from "@/database/orgues-repository";
import { route } from "@/lib/route";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OrguesMunicipiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesMunicipiParams & { locale: string }>;
}) {
  const { locale, ...navigation } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi } = orgueNavigation(navigation);
  const { de_nom, nom, edificis } = orgues(navigation);

  return (
    <Scaffold
      breadcrumbFragments={[
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
    >
      <h1>Orgues {de_nom ?? `de ${nom}`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {edificis.flatMap((edifici) =>
          "orgues" in edifici ? (
            edifici.orgues?.map((orgue) => (
              <PipeOrganCard
                key={`${edifici.link}-${orgue.link}`}
                params={{
                  provincia: provincia.link,
                  comarca: comarca.link,
                  municipi: municipi.link,
                  edifici: edifici.link,
                  orgue: orgue.link,
                }}
              />
            ))
          ) : (
            <PipeOrganCard
              key={edifici.link}
              params={{
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
              }}
            />
          ),
        )}
      </div>
    </Scaffold>
  );
}
