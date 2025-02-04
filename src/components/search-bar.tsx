"use client";

import { findOrgues } from "@/app/actions";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { DialogDescription, DialogTitle } from "./ui/dialog";

export function SearchBar() {
  const t = useTranslations("searchBar");

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof findOrgues>>
  >({ orgues: [] });

  const [query, setQuery] = useState("");

  async function handleChangeSearch(query: string) {
    setQuery(query);
    if (!query) return setResults({ orgues: [] });

    setResults(await findOrgues(query));
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        onClick={() => setOpen(true)}
      >
        <span>{t("search")}</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">{t("search")}</DialogTitle>
        <DialogDescription className="sr-only">{t("search")}</DialogDescription>
        <CommandInput
          placeholder={t("search")}
          onChangeCapture={(event) => {
            const input = event.target as HTMLInputElement;
            handleChangeSearch(input.value);
          }}
        />
        <CommandList>
          <CommandEmpty>Sense resultats</CommandEmpty>
          {results.orgues.length ? (
            <CommandGroup heading={`Orgues (${results.orgues.length})`}>
              {results.orgues.map(
                ({ link, orgue, edifici, municipi, comarca }) => (
                  <CommandItem
                    key={link}
                    value={link}
                    onSelect={() => (window.location.href = link)}
                  >
                    <div className="w-full">
                      <p className="line-clamp-2">
                        <HighlightedText text={edifici.nom} query={query} />
                        {orgue && (
                          <>
                            <span className="text-muted-foreground px-2">
                              ›
                            </span>
                            <HighlightedText text={orgue.nom} query={query} />
                          </>
                        )}
                      </p>
                      <p className="truncate text-muted-foreground">
                        <HighlightedText
                          text={`${municipi.nom} (${comarca?.nom})`}
                          query={query}
                        />
                      </p>
                    </div>
                  </CommandItem>
                ),
              )}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (query.length < 3) return text;
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
