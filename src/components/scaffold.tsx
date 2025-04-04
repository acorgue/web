import { cn } from "@/lib/utils";
import type { PropsWithChildren, ReactNode } from "react";
import { PageBreadcrumb, PageBreadcrumbProps } from "./page-breadcrumb";

export function Scaffold({
  breadcrumbFragments,
  aside,
  children,
}: Readonly<
  PropsWithChildren<{
    breadcrumbFragments: PageBreadcrumbProps["fragments"];
    aside?: ReactNode;
  }>
>) {
  return (
    <>
      <main className="flex flex-col-reverse lg:flex-row flex-1">
        <div
          className={cn(
            "prose dark:prose-invert col-span-2 pt-8 mx-auto sm:max-md:px-8 px-4 md:px-0",
            aside && "lg:ms-auto lg:me-0",
          )}
        >
          <PageBreadcrumb
            fragments={breadcrumbFragments}
            className="not-prose mb-8"
          />
          {children}
        </div>
        {aside ? (
          // TODO(albertms10): mostra la TOC a la versió mòbil
          <aside className="container prose hidden lg:block sm:max-md:px-8 md:px-0 w-full lg:max-w-[14rem] lg:pt-20 mx-auto lg:ms-10 lg:me-auto lg:pb-32">
            {aside}
          </aside>
        ) : null}
      </main>
    </>
  );
}
