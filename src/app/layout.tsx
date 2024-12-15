import { CookieToast } from "@/components/cookie/cookie-toast";
import { MainHeader } from "@/components/main-header";
import { DesktopNavigationMenu } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainHeader nav={<DesktopNavigationMenu />} />
            <main className="container pt-8 mx-auto px-4 prose">
              {children}
            </main>
            <Toaster />
            <CookieToast />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
