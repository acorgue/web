"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { PropsWithChildren } from "react";

export function ButtonLink({
  className,
  ...rest
}: PropsWithChildren<{ href: string; target?: string; className?: string }>) {
  return (
    <Button variant="outline" asChild className={className}>
      <Link className="no-underline" {...rest} />
    </Button>
  );
}
