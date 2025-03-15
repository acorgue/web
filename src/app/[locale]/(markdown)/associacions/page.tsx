import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");
  const Content = await localizedMDX(locale);

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: "Inici", position: 1 },
        { label: t("associations"), position: 2 },
      ]}
      aside={<TOC headings={findMDXHeadings(Content({}))} />}
    >
      <Content />
    </Scaffold>
  );
}

async function localizedMDX(locale: string) {
  try {
    return (await import(`./${locale}.mdx`)).default;
  } catch (error) {
    notFound();
  }
}
