import { sortedPosts } from "@/app/(markdown)/noticies/posts";
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
import {
  BarChartIcon,
  BookmarkIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  NewspaperIcon,
  PencilIcon,
  PinIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

export interface NavigationMenuProps {
  isMobile?: boolean;
}

export interface MenuItem {
  label: string;
  href: string;
  items?: (MenuItem & {
    description?: string;
    icon?: ReactNode;
    date?: Date;
    isExternal?: boolean;
  })[];
}

export function Navbar({ isMobile }: Readonly<NavigationMenuProps>) {
  const t = useTranslations();

  const menuItems = [
    { href: "/qui-som", label: t("metadata.aboutUs") },
    {
      label: t("metadata.news"),
      items: [
        {
          href: "/noticies",
          label: t("navbar.newsAndArticles"),
          description: t("navbar.newsAndArticlesDescription"),
          icon: <BookmarkIcon className="h-6 w-6" aria-hidden="true" />,
          items: sortedPosts.slice(0, 3).map((post) => ({
            href: `/noticies/${post.slug}`,
            label: post.title,
            date: post.date,
          })),
        },
        {
          href: "/full",
          label: t("metadata.factSheet"),
          description: t("navbar.factSheetDescription"),
          icon: <NewspaperIcon className="h-6 w-6" aria-hidden="true" />,
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
      label: t("metadata.pipeOrgans"),
      items: [
        {
          href: "/orgues",
          label: t("metadata.pipeOrgans"),
          description: t("navbar.pipeOrgansDescription"),
          icon: <BarChartIcon className="h-6 w-6" aria-hidden="true" />,
        },
        {
          href: "/cicle",
          label: t("metadata.concertSeries"),
          description: t("navbar.concertSeriesDescription"),
          icon: <PinIcon className="h-6 w-6" aria-hidden="true" />,
        },
      ],
    },
    {
      label: t("navbar.resources"),
      items: [
        {
          href: "/bibliografia",
          label: t("metadata.references"),
          description: t("navbar.referencesDescription"),
          icon: <FileTextIcon className="h-6 w-6" aria-hidden="true" />,
        },
        {
          href: "/associacions",
          label: t("metadata.associations"),
          description: t("navbar.associationsDescription"),
          icon: <GlobeIcon className="h-6 w-6" aria-hidden="true" />,
        },
        {
          href: "/formacio",
          label: t("metadata.education"),
          description: t("navbar.educationDescription"),
          icon: <PencilIcon className="h-6 w-6" aria-hidden="true" />,
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
        <Fragment key={item.href}>
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
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
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  icon={
                    item.isExternal ? (
                      <ExternalLinkIcon className="w-4 h-4" />
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
