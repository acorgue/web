"use client";

import { Button } from "@/components/ui/button";

export function ButtonLink({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <Button variant="outline" asChild className={className}>
      <a className="no-underline" {...rest} />
    </Button>
  );
}
