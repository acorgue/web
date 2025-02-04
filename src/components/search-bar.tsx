"use client";

import { findOrgues } from "@/app/actions";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";

export function SearchBar() {
  const t = useTranslations("searchBar");

  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof findOrgues>>
  >([]);

  const [query, setQuery] = useState("");

  async function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    if (e.target.value) {
      commandRef.current?.showPopover();
      commandRef.current?.focus();
      setResults(await findOrgues(e.target.value));
    } else {
      commandRef.current?.hidePopover();
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div id="search-bar" className="relative flex-1 md:flex-none">
      <input
        ref={inputRef}
        type="search"
        className="inline-flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64 transition-[width] focus:w-[300px]"
        placeholder={t("search")}
        value={query}
        onChange={handleChangeSearch}
      />
      <kbd className="pointer-events-none absolute right-[0.35rem] top-[0.35rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
      <div
        ref={commandRef}
        id="search-popover"
        popover="auto"
        className="w-auto"
      >
        <Command className="border" shouldFilter={false} loop>
          <CommandList>
            <CommandEmpty>Sense resultats</CommandEmpty>
            {results.length ? (
              <CommandGroup heading="Orgues">
                {results.map(({ link, orgue, edifici, municipi, comarca }) => {
                  return (
                    <CommandItem
                      key={link}
                      value={link}
                      onSelect={() => (window.location.href = link)}
                    >
                      <div className="w-full">
                        <p className="line-clamp-2">
                          <HighlightedText
                            text={`${edifici.nom} ${orgue ? `(${orgue.nom})` : ""}`}
                            query={query}
                          />
                        </p>
                        <p className="truncate text-muted-foreground">
                          <HighlightedText
                            text={`${municipi.nom} (${comarca?.nom})`}
                            query={query}
                          />
                        </p>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  return text.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
