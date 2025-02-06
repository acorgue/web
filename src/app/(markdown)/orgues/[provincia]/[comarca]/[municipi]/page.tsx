import { orgueNavigation } from "@/app/(markdown)/orgues/orgueNavigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orgues } from "@/database/orgues-repository";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { OrguesMunicipiParams } from "./layout";

export default async function Page({
  params,
}: {
  params: Promise<OrguesMunicipiParams>;
}) {
  const t = await getTranslations("metadata");
  const { provincia, comarca, municipi } = orgueNavigation(await params);
  const { de, nom, edificis } = orgues(await params);

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { href: "/orgues", label: t("pipeOrgans"), position: 2 },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {edificis.flatMap((edifici) =>
          "orgues" in edifici ? (
            edifici.orgues?.map((orgue) => (
              <PipeOrganCard
                key={`${edifici.link}-${orgue.link}`}
                href={`/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgue.link}`}
                title={`${edifici.nom} (${orgue.nom})`}
                description={edifici.adreca}
              />
            ))
          ) : (
            <PipeOrganCard
              key={edifici.link}
              href={`/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`}
              title={edifici.nom}
              description={edifici.adreca}
            />
          ),
        )}
      </div>
    </>
  );
}

interface PipeOrganCardProps {
  href: string;
  title: string;
  description: string;
}

function PipeOrganCard({
  href,
  title,
  description,
}: Readonly<PipeOrganCardProps>) {
  return (
    <article className="not-prose">
      <Link href={href}>
        <Card className="hover:bg-slate-500/5">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </article>
  );
}
