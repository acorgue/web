import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const { title } = await parent;

  return {
    title: `${t("legalNotice")} · ${title}`,
    description: t("legalNoticeDescription"),
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
          { label: t("legalNotice"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
