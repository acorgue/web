"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export function ButtonLink({
  className,
  ...rest
}: PropsWithChildren<LinkProps & { target?: string; className?: string }>) {
  return (
    <Button variant="outline" asChild className={className}>
      <Link className={cn("no-underline")} {...rest} />
    </Button>
  );
}
