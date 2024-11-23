import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Full informatiu · Associació Catalana de l’Orgue",
  description: "Associació Catalana de l’Orgue",
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <PageBreadcrumb
        crumbs={[{ href: "/", label: "Inici" }, { label: "Full informatiu" }]}
        className="not-prose mb-8"
      />
      {children}
    </>
  );
}
