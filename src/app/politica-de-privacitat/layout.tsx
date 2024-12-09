import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Política de privacitat · Associació Catalana de l’Orgue",
  description: "Política de privacitat per utilitzar la pàgina web",
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { label: "Política de privacitat", position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
