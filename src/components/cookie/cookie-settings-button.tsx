"use client";

import { CookieIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useCookie } from "./use-cookie";

export function CookieSettingsButton({
  children,
}: Readonly<PropsWithChildren>) {
  const { showMessage } = useCookie();

  return (
    <Button onClick={showMessage}>
      <CookieIcon className="h-4 w-4 me-2" aria-hidden="true" />
      {children}
    </Button>
  );
}
