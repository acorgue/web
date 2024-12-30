import { CookieToast } from "@/components/cookie/cookie-toast";
import { MainHeader } from "@/components/main-header";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerWrapper } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

import "../globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("organization");

  return {
    title: t("name"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<PropsWithChildren<{ params: { locale: string } }>>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

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
            <DrawerWrapper>
              <MainHeader nav={<Navbar />} />
              <main className="container pt-8 mx-auto px-4 prose dark:prose-invert">
                {children}
              </main>
              <Toaster />
              <CookieToast />
            </DrawerWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
