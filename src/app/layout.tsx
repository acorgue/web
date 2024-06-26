import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Associació Catalana de l’Orgue",
  description: "Associació Catalana de l’Orgue",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ca" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <header className="fixed w-full p-4 backdrop-blur-md bg-white/50 border-b">
          <Navbar />
        </header>
        <main className="container pt-32 mx-auto px-2 sm:px-4 prose">
          {children}
        </main>
      </body>
    </html>
  );
}
