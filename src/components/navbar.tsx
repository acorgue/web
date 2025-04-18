import { sortedPosts } from "@/app/[locale]/(markdown)/noticies/posts";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
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
import { route } from "@/lib/route";
import {
  BookmarkIcon,
  FileTextIcon,
  GlobeIcon,
  NewspaperIcon,
  PencilIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentProps, Fragment, type ReactNode } from "react";
import { ExternalLink } from "./external-link";

export interface NavigationMenuProps {
  isMobile?: boolean;
}

export type MenuItem = {
  label: string;
  items?: (MenuItem & {
    description?: string;
    icon?: ReactNode;
    date?: Date;
    isExternal?: boolean;
  })[];
} & Pick<ComponentProps<typeof Link>, "href">;

export function Navbar({ isMobile }: Readonly<NavigationMenuProps>) {
  const t = useTranslations();

  const menuItems = [
    { href: route("qui-som"), label: t("metadata.aboutUs") },
    {
      label: t("metadata.news"),
      items: [
        {
          href: route("noticies"),
          label: t("navbar.news"),
          description: t("navbar.newsDescription"),
          icon: <BookmarkIcon className="size-6" aria-hidden="true" />,
          items: sortedPosts.slice(0, 3).map((post) => ({
            href: route("post", { slug: post.slug }),
            label: post.title,
            date: post.date,
          })),
        },
        {
          href: route("full"),
          label: t("metadata.factSheet"),
          description: t("navbar.factSheetDescription"),
          icon: <NewspaperIcon className="size-6" aria-hidden="true" />,
          items: [
            {
              href: "https://nextcloud.acorgue.cat/s/FXAytnxJC5XyBfr/download",
              label: "Full 40",
              description: "Tardor de 2021",
              isExternal: true,
            },
            {
              href: "https://nextcloud.acorgue.cat/s/mEqSWAr9WX7bHGJ/download",
              label: "Full 39",
              description: "Estiu de 2021",
              isExternal: true,
            },
            {
              href: "https://nextcloud.acorgue.cat/s/kbjcGppdKL6TEFm/download",
              label: "Full 38",
              description: "Primavera de 2021",
              isExternal: true,
            },
          ],
        },
      ],
    },
    {
      href: route("orgues"),
      label: t("metadata.pipeOrgans"),
    },
    {
      href: route("cicle"),
      label: t("metadata.concertSeriesShort"),
    },
    {
      label: t("navbar.resources"),
      items: [
        {
          href: route("bibliografia"),
          label: t("metadata.references"),
          description: t("navbar.referencesDescription"),
          icon: <FileTextIcon className="size-6" aria-hidden="true" />,
        },
        {
          href: route("associacions"),
          label: t("metadata.associations"),
          description: t("navbar.associationsDescription"),
          icon: <GlobeIcon className="size-6" aria-hidden="true" />,
        },
        {
          href: route("formacio"),
          label: t("metadata.education"),
          description: t("navbar.educationDescription"),
          icon: <PencilIcon className="size-6" aria-hidden="true" />,
        },
      ],
    },
  ] as MenuItem[];

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
                    {"items" in menuItem.items[0] ? (
                      <HighlightedMenuItems items={menuItem.items} />
                    ) : (
                      <NavigationMenuItems items={menuItem.items} />
                    )}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild className={triggerClassName}>
                  <Link href={menuItem.href!}>{menuItem.label}</Link>
                </NavigationMenuLink>
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
        <Button
          asChild
          className="block whitespace-normal my-1 mx-4"
          variant="ghost"
        >
          <Link href={item.href} prefetch>
            {item.label}
          </Link>
        </Button>
      </DrawerClose>
    )),
  );
}

export interface NavigationMenuItemsProps {
  items: NonNullable<MenuItem["items"]>;
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
          className="text-aco"
        >
          {item.description}
        </NavigationMenuListItem>
      ))}
    </ul>
  );
}

export interface HighlightedMenuItemsProps {
  items: NonNullable<MenuItem["items"]>;
}

export function HighlightedMenuItems({
  items,
}: Readonly<HighlightedMenuItemsProps>) {
  const locale = useLocale();

  const dateTimeFormat = Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] max-h-[calc(100vh-10rem)] overflow-y-auto">
      {items.map((item) => (
        <Fragment key={item.href as string}>
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden hover:opacity-80 transition-opacity text-aco"
                href={item.href}
                prefetch
              >
                {item.icon}
                <div className="mb-2 mt-4 text-lg font-medium">
                  {item.label}
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          {"items" in item
            ? item.items?.map((item) => (
                <NavigationMenuListItem
                  key={item.href as string}
                  href={item.href}
                  title={item.label}
                  iconEnd={
                    item.isExternal ? (
                      <ExternalLink tooltip="Enllaç extern" />
                    ) : undefined
                  }
                >
                  {"description" in item ? item.description : null}
                  {"date" in item ? (
                    <time dateTime={item.date?.toISOString()}>
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
