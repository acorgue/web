"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useCookie } from "./use-cookie";

export function CookieToast() {
  const t = useTranslations("cookieBanner");
  const { alreadyAnswered, showMessage } = useCookie();

  useEffect(() => {
    let timer: Timer | undefined;
    if (!alreadyAnswered()) timer = setTimeout(() => showMessage(t));
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alreadyAnswered, showMessage, t]);

  return null;
}
