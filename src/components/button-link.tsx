"use client";

import { Button } from "@/components/ui/button";
import { JSX, PropsWithChildren } from "react";

export function ButtonLink({
  className,
  ...rest
}: PropsWithChildren<
  JSX.IntrinsicElements["a"] & { target?: string; className?: string }
>) {
  return (
    <Button variant="outline" asChild className={className}>
      <a className="no-underline" {...rest} />
    </Button>
  );
}
