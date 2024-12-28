"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
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

  const [query, setQuery] = useState("");

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    if (e.target.value) commandRef.current?.showPopover();
    else commandRef.current?.hidePopover();
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
      <div ref={commandRef} id="search-popover" popover="auto">
        <Command className="border">
          <CommandList>
            <CommandEmpty>Sense resultats.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="1">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                {query}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
