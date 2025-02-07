import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { slugs } from "@/app/(markdown)/orgues/redirects";
import { CopyButton } from "@/components/copy-button";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { route } from "@/lib/route";
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
          {
            href: route("edifici", {
              provincia: provincia.link,
              comarca: comarca.link,
              municipi: municipi.link,
              edifici: edifici.link,
            }),
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
              route("orgue", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
                orgue: orgue.link,
              })
            ]
          }
        />
      </div>
    </>
  );
}
