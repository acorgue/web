import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { PropsWithChildren } from "react";

import "./globals.css";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<PropsWithChildren<{ params: { locale: string } }>>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
