import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { Scaffold } from "../../../components/scaffold";
import { TOC } from "../../../components/toc";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const canonical = route("qui-som");

  return {
    title: t("aboutUs"),
    description: t("aboutUsDescription"),
    alternates: {
      canonical,
      languages: { "x-default": canonical },
    },
  };
}

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  const t = await getTranslations("metadata");
  const headings = findMDXHeadings((await import(`./qui-som.mdx`)).default);

  return (
    <>
      <Scaffold
        breadcrumbFragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { label: t("aboutUs"), position: 2 },
        ]}
        aside={<TOC headings={headings} />}
      >
        {children}
      </Scaffold>
    </>
  );
}
