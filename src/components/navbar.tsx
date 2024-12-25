"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BookmarkIcon, ReaderIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { DrawerClose } from "./ui/drawer";

export interface NavigationMenuProps {
  isMobile?: boolean;
}

export interface MenuItem {
  label: string;
  href: string;
  items?: (MenuItem & {
    description?: string;
    icon?: ReactNode;
  })[];
}

export function Navbar({ isMobile }: Readonly<NavigationMenuProps>) {
  const t = useTranslations("metadata");

  const menuItems = [
    { href: "/qui-som", label: t("aboutUs") },
    {
      href: "#",
      label: t("articles"),
      items: [
        {
          href: "/full",
          label: t("factSheet"),
          description: t("factSheetDescription"),
          icon: <ReaderIcon className="h-6 w-6" aria-hidden="true" />,
        },
        {
          href: "/publicacions",
          label: t("newsAndArticles"),
          description: t("newsAndArticlesDescription"),
          icon: <BookmarkIcon className="h-6 w-6" aria-hidden="true" />,
        },
      ],
    },
    { href: "/orgues", label: t("pipeOrgans") },
    { href: "/bibliografia", label: t("references") },
    { href: "/associacions", label: t("associations") },
    { href: "/formacio", label: t("education") },
    { href: "/cicle", label: t("concertSeries") },
  ] satisfies MenuItem[];

  return isMobile ? (
    <MobileNavigationMenu menuItems={menuItems} />
  ) : (
    <DesktopNavigationMenu menuItems={menuItems} />
  );
}

interface DesktopNavigationMenuProps {
  menuItems: MenuItem[];
  className?: string;
}

function DesktopNavigationMenu({
  className,
  menuItems,
}: Readonly<DesktopNavigationMenuProps>) {
  const triggerClassName = navigationMenuTriggerStyle();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {menuItems.map((menuItem) => (
          <Fragment key={menuItem.label}>
            <NavigationMenuItem>
              {menuItem.items ? (
                <>
                  <NavigationMenuTrigger>
                    {menuItem.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {menuItem.items.map((item) => (
                        <NavigationMenuListItem
                          key={item.label}
                          href={item.href}
                          title={item.label}
                          icon={item.icon}
                        >
                          {item.description}
                        </NavigationMenuListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={menuItem.href!} legacyBehavior passHref>
                  <NavigationMenuLink className={triggerClassName}>
                    {menuItem.label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          </Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface MobileNavigationMenuProps {
  menuItems: MenuItem[];
}

export function MobileNavigationMenu({
  menuItems,
}: Readonly<MobileNavigationMenuProps>) {
  return menuItems.flatMap((menuItem) =>
    (menuItem.items ?? [menuItem]).map((item) => (
      <DrawerClose key={item.label} asChild>
        <Button className="block whitespace-normal" variant="link" asChild>
          <Link href={item.href}>{item.label}</Link>
        </Button>
      </DrawerClose>
    )),
  );
}
