"use client";

import { cn } from "@/lib/utils";
import type { HeadingElement } from "@/mdx-components";
import type { ComponentProps, ReactNode } from "react";
import ScrollSpy from "react-scrollspy-navigation";

export interface TOCItem {
  id: string;
  heading: HeadingElement;
  headings?: TOCItem[];
  label: ReactNode;
}

export interface TOCProps {
  headings: TOCItem[];
}

export function TOC({ headings }: Readonly<TOCProps>) {
  return (
    <ScrollSpy
      activeAttr
      rootMargin="180px"
      onClickEach={(e) => {
        const heading = (e.target as HTMLElement).getAttribute("href");
        if (!heading || !/^#[0-9a-z-]+$/.test(heading)) return;
        window.location.href = heading;
      }}
    >
      <nav className="not-prose sticky top-24 ">
        <AsideHeading>Taula de continguts</AsideHeading>
        {tocList(headings)}
      </nav>
    </ScrollSpy>
  );

  function tocList(items: TOCItem[], className?: string) {
    return (
      <ol className={cn("flex flex-col gap-2 text-sm", className)}>
        {items.map((item) => tocListItem(item))}
      </ol>
    );
  }

  function tocListItem(item: TOCItem) {
    return (
      <li key={item.id} className="leading-tight flex flex-col gap-2">
        <a
          href={`#${item.id}`}
          className="text-primary/80 hover:text-primary data-[active=true]:text-aco data-[active=true]:font-bold"
        >
          {item.label}
        </a>
        {item.headings?.length ? tocList(item.headings, "ps-4") : <></>}
      </li>
    );
  }
}

export function AsideHeading(props: ComponentProps<"header">) {
  return (
    <header
      className="font-bold uppercase tracking-wide text-primary/60 mb-4 text-sm"
      {...props}
    />
  );
}
