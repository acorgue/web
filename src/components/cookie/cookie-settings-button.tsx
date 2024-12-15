"use client";

import { CookieIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useCookie } from "./use-cookie";

export function CookieSettingsButton({
  children,
}: Readonly<PropsWithChildren>) {
  const t = useTranslations();
  const { showMessage } = useCookie();

  return (
    <Button onClick={() => showMessage(t)}>
      <CookieIcon className="h-4 w-4 me-2" aria-hidden="true" />
      {children}
    </Button>
  );
}
