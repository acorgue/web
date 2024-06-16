"use client";

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

export function Navbar() {
  const className = navigationMenuTriggerStyle();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={className}>Inici</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/qui-som" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Qui som
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Publicacions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuListItem
                href="/full"
                title="Full informatiu"
                icon={<ReaderIcon className="h-6 w-6" aria-hidden="true" />}
              >
                La publicació trimestral amb les últimes notícies exclusives per
                als socis.
              </NavigationMenuListItem>
              <NavigationMenuListItem
                href="/publicacions"
                title="Notícies i articles"
                icon={<BookmarkIcon className="h-6 w-6" aria-hidden="true" />}
              >
                Les darreres notes d’actualitat en format blog.
              </NavigationMenuListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/orgues" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Orgues
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/bibliografia" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Bibliografia
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/associacions" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Associacions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/formacio" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Formació
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/cicle" legacyBehavior passHref>
            <NavigationMenuLink className={className}>
              Cicle «Els orgues de Catalunya»
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
