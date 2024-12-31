import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("education"),
    description: t("educationDescription"),
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
          { label: t("education"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
