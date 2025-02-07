import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { route } from "@/lib/route";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

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

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: route("home"), label: t("home"), position: 1 },
          { label: t("aboutUs"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
