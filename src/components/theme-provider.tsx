"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentPropsWithoutRef } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
