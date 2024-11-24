import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "./mode-toggle";
import { MobileNavigationMenu } from "./navbar";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export interface MainHeaderProps {
  nav: ReactNode;
}

export function MainHeader({ nav }: Readonly<MainHeaderProps>) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
            <Image
              src="/favicons/favicon180x180.png"
              alt="Logotip de l’Associació Catalana de l’Orgue"
              width={41}
              height={41}
            />
            <span className="hidden font-bold lg:inline-block text-sm">
              Associació Catalana de l’Orgue
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm xl:gap-6">{nav}</nav>
        </div>
        <Drawer>
          <DrawerTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground py-2 -ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <HamburgerMenuIcon />
            <span className="sr-only">Commuta el menú</span>
          </DrawerTrigger>
          <DrawerContent className="min-h-[500px]">
            <DrawerHeader>
              <DrawerTitle>Associació Catalana de l’Orgue</DrawerTitle>
            </DrawerHeader>
            <MobileNavigationMenu />
          </DrawerContent>
        </Drawer>
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="max-w-[300px] flex-1 md:w-auto md:flex-none">
            <Button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64">
              <span>Cerca…</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <nav className="flex items-center gap-0.5">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}