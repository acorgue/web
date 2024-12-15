"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useCookie } from "./use-cookie";

export function CookieToast() {
  const t = useTranslations();
  const { alreadyAnswered, showMessage } = useCookie();

  useEffect(() => {
    if (!alreadyAnswered()) showMessage(t);
  }, []);

  return <></>;
}
