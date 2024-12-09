"use client";

import { useEffect } from "react";
import { useCookie } from "./use-cookie";

export function CookieToast() {
  const { alreadyAnswered, showMessage } = useCookie();

  useEffect(() => {
    if (!alreadyAnswered()) showMessage();
  }, []);

  return <></>;
}
