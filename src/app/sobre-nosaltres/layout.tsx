import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import MDXLayout from "../components/mdx-layout";

export const metadata: Metadata = {
  title: "Sobre nosaltres · Associació Catalana de l’Orgue",
  description: "Associació Catalana de l’Orgue",
};

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <MDXLayout>{children}</MDXLayout>;
}
