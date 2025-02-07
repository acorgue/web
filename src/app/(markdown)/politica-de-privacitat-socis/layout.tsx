import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("privacyPolicyMembers"),
    description: t("privacyPolicyMembersDescription"),
    alternates: {
      canonical: "politica-de-privacitat-socis",
      languages: { "x-default": "politica-de-privacitat-socis" },
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
          { label: t("privacyPolicyMembers"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
