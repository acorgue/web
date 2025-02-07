import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { route } from "@/lib/route";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const canonical = route("bibliografia");

  return {
    title: t("references"),
    description: t("referencesDescription"),
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

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { label: t("references"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
