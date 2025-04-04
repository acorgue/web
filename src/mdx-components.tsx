import { stripDiacritics } from "@/lib/strip-diacritics";
import { Link2Icon } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import {
  Children,
  isValidElement,
  type JSX,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { baseURL } from "./lib/route";
import { cn } from "./lib/utils";
import { TOCItem } from "./components/toc";

export type HeadingElement = Extract<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  keyof JSX.IntrinsicElements
>;

type HeadingLinkProps = {
  heading?: HeadingElement;
} & React.ComponentPropsWithoutRef<"h2">;

function HeadingLink({
  id,
  heading: Heading = "h2",
  children,
  ...props
}: Readonly<HeadingLinkProps>) {
  if (!id) return <h2 {...props}>{children}</h2>;

  const strippedId = stripDiacritics(id);

  return (
    <Heading
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
    </Heading>
  );
}

const H2 = (props: HeadingLinkProps) => <HeadingLink heading="h2" {...props} />;
const H3 = (props: HeadingLinkProps) => <HeadingLink heading="h3" {...props} />;
const H4 = (props: HeadingLinkProps) => <HeadingLink heading="h4" {...props} />;
const H5 = (props: HeadingLinkProps) => <HeadingLink heading="h5" {...props} />;
const H6 = (props: HeadingLinkProps) => <HeadingLink heading="h6" {...props} />;

// Aquestes assignacions són necessàries per identificar el component a producció determinísticament.
// Vegeu {@link findMDXHeadings}.
H2.displayName = "h2";
H3.displayName = "h3";
H4.displayName = "h4";
H5.displayName = "h5";
H6.displayName = "h6";

const availableHeadings = { h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 };
const headingNames = Object.values(availableHeadings).map(
  (heading) => heading.displayName,
);

export const anchorClassName =
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
      <a href={href} className={cn(className, anchorClassName)} {...props} />
    );
  }

  return (
    <a
      href={href}
      className={cn(className, anchorClassName, "after:content-['_↗']")}
      target="_blank"
      rel="external nofollow noreferrer"
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Anchor,
    ...availableHeadings,
    ...components,
  };
}

type MDXElementProps = PropsWithChildren<{ id: string }>;
type NamedCallableFunction = CallableFunction & { displayName: string };

export function findMDXHeadings(page: ReactElement<PropsWithChildren>) {
  const toc: TOCItem[] = [];
  const stack: TOCItem[] = [];

  const elements = Children.toArray(page.props.children);

  for (const child of elements) {
    if (!isValidElement<MDXElementProps>(child)) {
      continue;
    }

    const heading = (child.type as unknown as NamedCallableFunction)
      .displayName as HeadingElement;
    if (!headingNames.includes(heading)) continue;

    const item = {
      id: stripDiacritics(child.props.id),
      heading,
      label: child.props.children,
    };

    const level = headingNames.indexOf(heading);

    while (
      stack.length > 0 &&
      headingNames.indexOf(stack[stack.length - 1].heading) >= level
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
    } else {
      const parent = stack[stack.length - 1];
      (parent.headings ??= []).push(item);
    }

    stack.push(item);
  }

  return toc;
}
