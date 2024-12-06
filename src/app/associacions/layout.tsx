import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Associacions · Associació Catalana de l’Orgue",
  description: "Associació Catalana de l’Orgue",
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { label: "Associacions", position: 2 },
        ]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
