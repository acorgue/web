"use client";

import { Button } from "@/components/ui/button";
import { CookieIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import { useCookie } from "./use-cookie";

export function CookieSettingsButton({
  children,
}: Readonly<PropsWithChildren>) {
  const t = useTranslations("cookieBanner");
  const { showMessage } = useCookie();

  return (
    <Button onClick={() => showMessage(t)}>
      <CookieIcon className="size-4 me-2" aria-hidden="true" />
      {children}
    </Button>
  );
}
