import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: Promise<{ locale: string }> }>>) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={cn("scroll-smooth", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
