import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, LinkHref } from "@/i18n/routing";
import { Fragment } from "react";

export interface BreadcrumbFragment {
  href?: LinkHref;
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
        <BreadcrumbLink href={fragment.href as string} itemProp="item">
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
          <BreadcrumbEllipsis className="size-4" />
          <span className="sr-only">Mostra els elements amagats</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {fragments.map((fragment) => (
            <DropdownMenuItem
              key={fragment.href as string}
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
