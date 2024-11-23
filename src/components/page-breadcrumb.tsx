import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export interface PageBreadcrumbProps {
  crumbs: { href?: string; label: string }[];
  className?: string;
}

export function PageBreadcrumb({
  crumbs,
  className,
}: Readonly<PageBreadcrumbProps>) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map(({ href, label }, index) => (
          <>
            {!!index && <BreadcrumbSeparator />}
            <BreadcrumbItem
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {href ? (
                <BreadcrumbLink href={href} itemProp="item">
                  <span itemProp="name">{label}</span>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage itemProp="name">{label}</BreadcrumbPage>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
