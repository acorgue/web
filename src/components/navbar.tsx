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
import Link from "next/link";
import { Fragment } from "react";
import { DrawerClose } from "./ui/drawer";

const menuItems = [
  { href: "/qui-som", label: "Qui som" },
  {
    label: "Publicacions",
    items: [
      {
        href: "/full",
        label: "Full informatiu",
        description:
          "La publicació trimestral amb les últimes notícies exclusives per als socis.",
        icon: <ReaderIcon className="h-6 w-6" aria-hidden="true" />,
      },
      {
        href: "/publicacions",
        label: "Notícies i articles",
        description: "Les darreres notes d’actualitat en format blog.",
        icon: <BookmarkIcon className="h-6 w-6" aria-hidden="true" />,
      },
    ],
  },
  { href: "/orgues", label: "Orgues" },
  { href: "/bibliografia", label: "Bibliografia" },
  { href: "/associacions", label: "Associacions" },
  { href: "/formacio", label: "Formació" },
  { href: "/cicle", label: "Cicle «Els orgues de Catalunya»" },
];

export function DesktopNavigationMenu({
  className,
}: Readonly<{ className?: string }>) {
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

export function MobileNavigationMenu() {
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
