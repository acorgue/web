import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Content from "./ca.mdx";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { label: t("legalNotice"), position: 2 },
      ]}
      aside={<TOC headings={findMDXHeadings(Content({}))} />}
    >
      <Content />
    </Scaffold>
  );
}
