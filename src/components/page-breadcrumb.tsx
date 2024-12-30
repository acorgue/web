import { Link } from "@/i18n/routing";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BreadcrumbFragment {
  href?: string;
  label: string;
  position: number;
}

export interface PageBreadcrumbProps {
  fragments: (BreadcrumbFragment | { collapsed: BreadcrumbFragment[] })[];
  className?: string;
}

export function PageBreadcrumb({
  fragments,
  className,
}: Readonly<PageBreadcrumbProps>) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList itemScope itemType="https://schema.org/BreadcrumbList">
        {fragments.map((fragment, index) => (
          <Fragment key={index}>
            {!!index && <BreadcrumbSeparator />}
            {"collapsed" in fragment ? (
              <BreadcrumbCollapsedFragments fragments={fragment.collapsed} />
            ) : (
              <BreadcrumbFragment fragment={fragment} />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export interface BreadcrumbFragmentProps {
  fragment: BreadcrumbFragment;
}

export function BreadcrumbFragment({
  fragment,
}: Readonly<BreadcrumbFragmentProps>) {
  return (
    <BreadcrumbItem
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      {fragment.href ? (
        <BreadcrumbLink href={fragment.href} itemProp="item">
          <span itemProp="name">{fragment.label}</span>
        </BreadcrumbLink>
      ) : (
        <BreadcrumbPage itemProp="name">{fragment.label}</BreadcrumbPage>
      )}
      <meta itemProp="position" content={`${fragment.position}`} />
    </BreadcrumbItem>
  );
}

export interface BreadcrumbCollapsedFragmentsProps {
  fragments: BreadcrumbFragment[];
}

export function BreadcrumbCollapsedFragments({
  fragments,
}: Readonly<BreadcrumbCollapsedFragmentsProps>) {
  return (
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <BreadcrumbEllipsis className="h-4 w-4" />
          <span className="sr-only">Mostra els elements amagats</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {fragments.map((fragment) => (
            <DropdownMenuItem
              key={fragment.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link href={fragment.href!} itemProp="item">
                <span itemProp="name">{fragment.label}</span>
              </Link>
              <meta itemProp="position" content={`${fragment.position}`} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
  );
}
