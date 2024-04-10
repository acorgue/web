import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Associació Catalana de l’Orgue",
  description: "Associació Catalana de l’Orgue",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ca">
      <body className={inter.className}>
        <main className="container mx-auto px-2 sm:px-4 prose">{children}</main>
      </body>
    </html>
  );
}
