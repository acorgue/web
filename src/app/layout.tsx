import { CookieToast } from "@/components/cookie/cookie-toast";
import { MainHeader } from "@/components/main-header";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerWrapper } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("organization");

  return {
    title: t("name"),
    description: t("description"),
  };
}

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
