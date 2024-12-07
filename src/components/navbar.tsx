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
import {
  BarChartIcon,
  BookmarkIcon,
  FileTextIcon,
  GlobeIcon,
  Pencil1Icon,
  ReaderIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Fragment } from "react";
import { DrawerClose } from "./ui/drawer";

const dateTimeFormat = Intl.DateTimeFormat("ca", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const menuItems = [
  { href: "/qui-som", label: "Qui som" },
  {
    label: "Publicacions",
    items: [
      {
        href: "/publicacions",
        label: "Notícies i articles",
        description: "Les darreres notes d’actualitat en format blog.",
        icon: <BookmarkIcon className="h-6 w-6" aria-hidden="true" />,
        items: [
          {
            href: "/publicacions/2024/07/03/presentacio-43e-cicle.html",
            label:
              "Presentació de la 44a edició del cicle «Els Orgues de Catalunya»",
            date: new Date("2024-07-03"),
            icon: undefined,
          },
          {
            href: "/publicacions/2023/07/06/nou-orgue-a-cabrera-de-mar.html",
            label: "Nou orgue de tubs a l'ermita de Santa Elena d’Agell",
            date: new Date("2023-07-06"),
            icon: undefined,
          },
          {
            href: "/publicacions/2023/02/01/carta-vanguardia.html",
            label: "Parafonies a la sala Oval",
            date: new Date("2023-02-01"),
            icon: undefined,
          },
        ],
      },
      {
        href: "/full",
        label: "Full informatiu",
        description:
          "La publicació trimestral amb les últimes notícies exclusives per als socis.",
        icon: <ReaderIcon className="h-6 w-6" aria-hidden="true" />,
        items: [
          {
            href: "https://nextcloud.acorgue.cat/s/FXAytnxJC5XyBfr/download",
            label: "Full 40",
            description: "Tardor de 2021",
            isExternal: true,
            icon: undefined,
          },
          {
            href: "https://nextcloud.acorgue.cat/s/mEqSWAr9WX7bHGJ/download",
            label: "Full 39",
            description: "Estiu de 2021",
            isExternal: true,
            icon: undefined,
          },
          {
            href: "https://nextcloud.acorgue.cat/s/kbjcGppdKL6TEFm/download",
            label: "Full 38",
            description: "Primavera de 2021",
            isExternal: true,
            icon: undefined,
          },
        ],
      },
    ],
  },
  {
    label: "Orgues",
    items: [
      {
        href: "/orgues",
        label: "Inventari d’orgues",
        description: "Mapa dels orgues del principat en constant creixement.",
        icon: <BarChartIcon className="h-6 w-6" aria-hidden="true" />,
      },
      {
        href: "/cicle",
        label: "Cicle «Els orgues de Catalunya»",
        description: "Concerts d’estiu amb història.",
        icon: <SewingPinIcon className="h-6 w-6" aria-hidden="true" />,
      },
    ],
  },
  {
    label: "Recursos",
    items: [
      {
        href: "/bibliografia",
        label: "Bibliografia",
        description:
          "Història, llibrets, bibliografia i música d’orgues catalans.",
        icon: <FileTextIcon className="h-6 w-6" aria-hidden="true" />,
      },
      {
        href: "/associacions",
        label: "Associacions",
        description:
          "Amics dels orgues: associacions per preservar i difondre.",
        icon: <GlobeIcon className="h-6 w-6" aria-hidden="true" />,
      },
      {
        href: "/formacio",
        label: "Formació",
        description: "Centres i recursos per a la formació organística.",
        icon: <Pencil1Icon className="h-6 w-6" aria-hidden="true" />,
      },
    ],
  },
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
                    {"items" in menuItem.items[0] ? (
                      <HighlightedMenuItems items={menuItem.items} />
                    ) : (
                      <NavigationMenuItems items={menuItem.items} />
                    )}
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

export interface NavigationMenuItemsProps {
  items: NonNullable<(typeof menuItems)[number]["items"]>;
}

export function NavigationMenuItems({
  items,
}: Readonly<NavigationMenuItemsProps>) {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {items.map((item) => (
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
  );
}

export interface HighlightedMenuItemsProps {
  items: NonNullable<(typeof menuItems)[number]["items"]>;
}

export function HighlightedMenuItems({
  items,
}: Readonly<HighlightedMenuItemsProps>) {
  return (
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      {items.map((item) => (
        <Fragment key={item.href}>
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href={item.href}
              >
                {item.icon}
                <div className="mb-2 mt-4 text-lg font-medium">
                  {item.label}
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  {item.description}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {"items" in item
            ? item.items.map((item) => (
                <NavigationMenuListItem
                  key={item.href}
                  href={item.href}
                  title={item.label}
                >
                  {"description" in item ? item.description : null}
                  {"date" in item ? (
                    <time dateTime={item.date.toISOString()}>
                      {dateTimeFormat.format(item.date)}
                    </time>
                  ) : null}
                </NavigationMenuListItem>
              ))
            : null}
        </Fragment>
      ))}
    </ul>
  );
}
