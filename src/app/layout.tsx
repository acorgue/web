import { CookieToast } from "@/components/cookie/cookie-toast";
import { MainHeader } from "@/components/main-header";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerWrapper } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";

import Footer from "@/components/footer";
import "./globals.css";

const fontSans = localFont({
  src: [
    { path: "../../public/fonts/InterVariable.ttf", style: "normal" },
    { path: "../../public/fonts/InterVariable-Italic.ttf", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("organization");

  return {
    title: {
      template: `%s · ${t("name")}`,
      default: t("name"),
    },
    description: t("description"),
    metadataBase: new URL("https://www.acorgue.cat"),
    alternates: {
      canonical: "./",
      languages: { "x-default": "./" },
    },
    verification: {
      google: "6gM0wXu4-PfRs-mHaxZXSCSSnY9EZdpUnTgEUAth_jY",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("scroll-smooth", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <SpeedInsights />
        <NextIntlClientProvider messages={messages}>
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
