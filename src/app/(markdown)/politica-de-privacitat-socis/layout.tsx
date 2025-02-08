import { Scaffold } from "@/components/scaffold";
import { TOC } from "@/components/toc";
import { route } from "@/lib/route";
import { findMDXHeadings } from "@/mdx-components";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const canonical = route("politica-de-privacitat-socis");

  return {
    title: t("privacyPolicyMembers"),
    description: t("privacyPolicyMembersDescription"),
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
  const headings = findMDXHeadings(
    (await import(`./politica-de-privacitat-socis.mdx`)).default,
  );

  return (
    <Scaffold
      breadcrumbFragments={[
        { href: route("home"), label: t("home"), position: 1 },
        { label: t("privacyPolicyMembers"), position: 2 },
      ]}
      aside={<TOC headings={headings} />}
    >
      {children}
    </Scaffold>
  );
}
