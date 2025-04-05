"use client";

import { cn } from "@/lib/utils";
import type { HeadingElement } from "@/mdx-components";
import type { ReactNode } from "react";
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
  function tocList(items: TOCItem[], className?: string) {
    return (
      <ol className={cn("flex flex-col gap-2", className)}>
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
      <nav className="not-prose sticky top-24 text-sm">
        <header className="font-bold uppercase tracking-wide text-primary/60 mb-4">
          Taula de continguts
        </header>
        {tocList(headings)}
      </nav>
    </ScrollSpy>
  );
}
