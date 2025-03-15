import { orgueNavigation } from "@/app/[locale]/(markdown)/orgues/orgueNavigation";
import { slugs } from "@/app/[locale]/(markdown)/orgues/redirects";
import { CopyButton } from "@/components/copy-button";
import { Scaffold } from "@/components/scaffold";
import { route } from "@/lib/route";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OrguesEdificiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesEdificiParams & { locale: string }>;
}) {
  const { locale, ...navigation } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi, edifici } = orgueNavigation(navigation);

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { href: route("orgues"), label: t("pipeOrgans"), position: 2 },
        {
          collapsed: [
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
            {
              href: route("municipi", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
              }),
              label: municipi.nom,
              position: 5,
            },
          ],
        },
        { label: edifici.nom, position: 6 },
      ]}
    >
      <h1>{edifici.nom}</h1>
      <div className="not-prose flex justify-between items-baseline">
        <p>
          {municipi.nom} ({comarca.nom})
        </p>
        <CopyButton
          slug={
            slugs[
              route("edifici", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
              }) as string
            ]
          }
        />
      </div>
    </Scaffold>
  );
}
