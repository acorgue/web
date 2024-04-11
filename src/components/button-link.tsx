"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { buttonVariants } from "./ui/button";

export function ButtonLink({
  className,
  ...rest
}: PropsWithChildren<LinkProps & { className?: string }>) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline" }),
        "no-underline",
        className
      )}
      {...rest}
    />
  );
}
