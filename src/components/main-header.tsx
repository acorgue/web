import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { ProfileMenu } from "./profile-menu";
import { SearchBar } from "./search-bar";
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

export async function MainHeader({ nav }: Readonly<MainHeaderProps>) {
  const t = await getTranslations();

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
              {t("organization.name")}
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm xl:gap-6">{nav}</nav>
        </div>
        <Drawer>
          <DrawerTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground py-2 -ms-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent md:hidden">
            <HamburgerMenuIcon />
            <span className="sr-only">{t("navbar.toggleMenu")}</span>
          </DrawerTrigger>
          <DrawerContent className="h-[500px] max-h-[calc(100vh-4rem)]">
            <DrawerHeader>
              <DrawerTitle className="text-center">
                {t("organization.name")}
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto">
              <Navbar isMobile />
            </div>
          </DrawerContent>
        </Drawer>
        <div className="flex flex-1 items-center gap-2 justify-end">
          <SearchBar />
          <nav className="flex items-center gap-0.5 -me-2">
            <ProfileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}
