import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import { getTranslations } from "next-intl/server";
import PoliticaDePrivacitat from "./politica-de-privacitat.mdx";

export default async function Page() {
  const t = await getTranslations("metadata");

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { label: t("privacyPolicy"), position: 2 },
      ]}
      aside={<TOC headings={findMDXHeadings(PoliticaDePrivacitat({}))} />}
    >
      <PoliticaDePrivacitat />
    </Scaffold>
  );
}
