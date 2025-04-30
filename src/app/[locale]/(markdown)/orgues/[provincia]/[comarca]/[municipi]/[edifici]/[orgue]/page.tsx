import { orgueNavigation } from "@/app/[locale]/(markdown)/orgues/orgueNavigation";
import { slugs } from "@/app/[locale]/(markdown)/orgues/redirects";
import { AsideOrgue } from "@/components/aside-orgue";
import { CopyButton } from "@/components/copy-button";
import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { normalizeOrgue } from "@/lib/normalize-orgue";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OrguesOrgueParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesOrgueParams & { locale: string }>;
}) {
  const { locale, ...navigation } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");
  const {
    provincia,
    comarca,
    municipi,
    edifici,
    orgue: orgueNav,
  } = orgueNavigation(navigation);

  const Content = (
    await import(
      `/src/content/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgueNav.link}.md`
    )
  ).default;
  const orgue = normalizeOrgue(
    (
      await import(
        `/src/database/disposicions/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgueNav.link}.yml`
      )
    ).default,
  );

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
        { label: orgueNav.nom, position: 7 },
      ]}
      aside={
        <AsideOrgue
          orgue={orgue}
          end={<TOC headings={findMDXHeadings(Content({}))} />}
        />
      }
    >
      <h1>
        {edifici.nom}
        <span className="block mt-2 text-2xl font-semibold">
          {orgueNav.nom}
        </span>
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
                orgue: orgueNav.link,
              }) as string
            ]
          }
        />
      </div>
      <Content />

      <details>
        <summary>Disposition</summary>
        <pre>{JSON.stringify(orgue, null, 2)}</pre>
      </details>
    </Scaffold>
  );
}
