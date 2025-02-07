"use client";

import { quickSearch, SearchResultOrgue } from "@/app/_actions/quick-search";

import { normalizeString } from "@/lib/normalize-string";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const bisbatToClassName: Record<string, string> = {
  barcelona: "bg-red-300 dark:bg-red-700",
  girona: "bg-purple-300 dark:bg-purple-700",
  lleida: "bg-yellow-300 dark:bg-yellow-700",
  "sant-feliu": "bg-blue-300 dark:bg-blue-700",
  solsona: "bg-teal-300 dark:bg-teal-700",
  tarragona: "bg-green-300 dark:bg-green-700",
  terrassa: "bg-green-300 dark:bg-green-700",
  tortosa: "bg-blue-300 dark:bg-blue-700",
  urgell: "bg-violet-300 dark:bg-violet-700",
  vic: "bg-orange-300 dark:bg-orange-700",
  civil: "bg-gray-300 dark:bg-gray-700",
};

type SearchResults = Awaited<ReturnType<typeof quickSearch>>;

export function SearchBar() {
  const t = useTranslations("searchBar");

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>([]);

  useEffect(() => {
    if (!query) return setResults([]);
    // Debounce: evita consultes innecessàries mentre l’usuari escriu
    const handler = setTimeout(async () => {
      setResults(await quickSearch(query));
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

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

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        loop
      >
        <DialogTitle className="sr-only">{t("searchFull")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("searchFull")}
        </DialogDescription>
        <CommandInput
          placeholder={t("searchFull")}
          onChangeCapture={(event) => {
            const input = event.target as HTMLInputElement;
            setQuery(normalizeString(input.value));
          }}
        />
        <CommandList>
          {query && !results.length ? (
            <CommandEmpty>{t("noResults")}</CommandEmpty>
          ) : null}
          {results.map(({ group, label, items, total, moreLink }) => (
            <CommandGroup
              key={group}
              heading={`${label} (${items.length}${total > items.length ? "+" : ""})`}
            >
              {group === "orgues"
                ? items.map((item) => (
                    <SearchItemOrgue
                      key={item.link}
                      query={query}
                      orgue={item}
                    />
                  ))
                : items.map((item) => (
                    <SearchItem key={item.link} link={item.link}>
                      <p>
                        <HighlightedText text={item.label} query={query} />
                      </p>
                    </SearchItem>
                  ))}
              {total > items.length && (
                <SearchItem link={moreLink}>
                  <SearchIcon /> Mostra tots els resultats ({total})
                </SearchItem>
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function SearchItem({
  link,
  children,
}: Readonly<PropsWithChildren<{ link: string }>>) {
  return (
    <CommandItem value={link} onSelect={() => (window.location.href = link)}>
      {children}
    </CommandItem>
  );
}

function SearchItemOrgue({
  query,
  orgue,
}: {
  query: string;
  orgue: SearchResultOrgue;
}) {
  return (
    <SearchItem link={orgue.link}>
      <div className="w-full">
        <p className="line-clamp-2">
          <HighlightedText text={orgue.edifici.nom} query={query} />
          {orgue.orgue && (
            <>
              <span className="text-muted-foreground px-2">›</span>
              <HighlightedText text={orgue.orgue.nom} query={query} />
            </>
          )}
        </p>
        <p className="truncate text-muted-foreground">
          <HighlightedText
            text={`${orgue.municipi.nom} (${orgue.comarca?.nom})`}
            query={query}
          />
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="circle"
            className={cn(
              "flex-shrink-0",
              orgue.bisbat?.link
                ? bisbatToClassName[orgue.bisbat.link]
                : "bg-gray-500",
            )}
          >
            {orgue.bisbat?.caps}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {orgue.bisbat?.link === "civil"
            ? orgue.bisbat.nom
            : `Bisbat ${orgue.bisbat?.de}${orgue.bisbat?.nom}`}
        </TooltipContent>
      </Tooltip>
    </SearchItem>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (query.length < 2) return text;
  return text.split(new RegExp(`(${query})`, "gi")).map((part, i) => {
    if (normalizeString(part) !== query) return part;
    return (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">
        {part}
      </mark>
    );
  });
}
