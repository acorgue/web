import { stripDiacritics } from "@/lib/strip-diacritics";
import { Link2Icon } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, PropsWithChildren, ReactElement, ReactNode } from "react";

const HeadingLink = ({
  id,
  children,
  ...rest
}: Readonly<PropsWithChildren<{ id?: string }>>) => {
  if (!id) return <h2 {...rest}>{children}</h2>;

  const strippedId = stripDiacritics(id);

  return (
    <h2
      id={strippedId}
      className="flex items-center gap-2 mt-[-60px] pt-[80px]"
      {...rest}
    >
      <Link
        href={`#${strippedId}`}
        className="text-muted-foreground -ms-6 hover:text-black dark:hover:text-white transition-colors"
      >
        <Link2Icon className="size-4" />
      </Link>
      {children}
    </h2>
  );
};

HeadingLink.displayName = "HeadingLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
  return Boolean((element as ReactElement).props);
}
