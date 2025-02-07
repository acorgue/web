import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("aboutUs"),
    description: t("aboutUsDescription"),
    alternates: {
      canonical: "qui-som",
      languages: { "x-default": "qui-som" },
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
          { href: "/", label: t("home"), position: 1 },
          { label: t("aboutUs"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
