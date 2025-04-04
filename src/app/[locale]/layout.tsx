import { CookieToast } from "@/components/cookie/cookie-toast";
import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/main-header";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DrawerWrapper } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { routing } from "@/i18n/routing";
import { baseURL, route } from "@/lib/route";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

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

export default async function Layout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: Promise<{ locale: string }> }>>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
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
  );
}
