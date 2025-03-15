import { stripDiacritics } from "@/lib/strip-diacritics";
import { Link2Icon } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, PropsWithChildren, ReactElement, ReactNode } from "react";
import { baseURL } from "./lib/route";
import { cn } from "./lib/utils";

function HeadingLink({
  id,
  children,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"h2">>) {
  if (!id) return <h2 {...props}>{children}</h2>;

  const strippedId = stripDiacritics(id);

  return (
    <h2
      id={strippedId}
      className="flex items-center gap-2 mt-[-60px] pt-[80px]"
      {...props}
    >
      <Link
        href={{ hash: strippedId }}
        className="text-muted-foreground -ms-6 hover:text-black dark:hover:text-white transition-colors"
      >
        <Link2Icon className="size-4" />
      </Link>
      {children}
    </h2>
  );
}

/**
 * Aquesta assignació és necessària per identificar el component a producció determinísticament.
 * Vegeu {@link findMDXHeadings}.
 */
HeadingLink.displayName = "HeadingLink";

const anchorClassNames =
  "text-aco font-semibold no-underline hover:text-aco-dark transition-colors";

function Anchor({
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  if (
    !href ||
    !href.startsWith("https://") ||
    new URL(href).hostname === baseURL.hostname
  ) {
    return (
      <a href={href} className={cn(className, anchorClassNames)} {...props} />
    );
  }

  return (
    <a
      href={href}
      className={cn(className, anchorClassNames, "after:content-['_↗']")}
      target="_blank"
      rel="external nofollow noreferrer"
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Anchor,
    h2: HeadingLink,
    ...components,
  };
}

type MDXElementProps = PropsWithChildren<{ id: string }>;
type NamedCallableFunction = CallableFunction & { displayName: string };

export function findMDXHeadings(page: ReactElement<PropsWithChildren>) {
  return (
    Children.map(page.props.children, (element) => {
      if (!element || !isReactElement<MDXElementProps>(element)) return;
      if (
        (element.type as unknown as NamedCallableFunction).displayName ===
        "HeadingLink"
      ) {
        return {
          id: stripDiacritics(element.props.id),
          label: element.props.children,
        };
      }
    })?.filter(Boolean) ?? []
  );
}

function isReactElement<P>(element: ReactNode): element is ReactElement<P> {
  return Boolean(element && (element as ReactElement).props);
}
