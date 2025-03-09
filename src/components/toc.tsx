"use client";

import { ReactNode } from "react";
import ScrollSpy from "react-scrollspy-navigation";

export function TOC({
  headings,
}: Readonly<{ headings: { id: string; label: ReactNode }[] }>) {
  return (
    <ScrollSpy
      activeAttr
      rootMargin="180px"
      onClickEach={(e) => {
        const heading = (e.target as HTMLElement).getAttribute("href");
        if (!heading || !/^#[a-z-]+$/.test(heading)) return;
        window.location.href = heading;
      }}
    >
      <nav className="not-prose sticky top-24 text-sm">
        <header className="font-bold uppercase tracking-wide text-primary/60 mb-4">
          Taula de continguts
        </header>
        <ul className="flex flex-col gap-2">
          {headings.map(({ label, id }) => (
            <li key={id} className="leading-tight">
              <a
                href={`#${id}`}
                className="text-primary/80 hover:text-primary data-[active=true]:text-aco data-[active=true]:font-bold"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollSpy>
  );
}
