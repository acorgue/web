import { CookieToast } from "@/components/cookie/cookie-toast";
import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/main-header";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerWrapper } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { baseURL, route } from "@/lib/route";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "../globals.css";

const fontSans = localFont({
  src: [
    { path: "../../../public/fonts/InterVariable.ttf", style: "normal" },
    { path: "../../../public/fonts/InterVariable-Italic.ttf", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "organization" });
  const canonical = route("home") as string;

  return {
    title: {
      template: `%s · ${t("name")}`,
      default: t("name"),
    },
    description: t("description"),
    metadataBase: baseURL,
    icons: {
      icon: "/favicons/favicon180x180.png",
    },
    alternates: {
      canonical,
    },
    verification: {
      google: "6gM0wXu4-PfRs-mHaxZXSCSSnY9EZdpUnTgEUAth_jY",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: Promise<{ locale: string }> }>>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("scroll-smooth", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <SpeedInsights />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider delayDuration={100}>
              <DrawerWrapper>
                <MainHeader nav={<Navbar />} />
                {children}
                <Footer className="mt-24" />
                <Toaster />
                <CookieToast />
              </DrawerWrapper>
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
