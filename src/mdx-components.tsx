import { stripDiacritics } from "@/lib/strip-diacritics";
import { Link2Icon } from "lucide-react";
import type { MDXComponents, MDXContent } from "mdx/types";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

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
        <Link2Icon className="w-4 h-4" />
      </Link>
      {children}
    </h2>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: HeadingLink,
    ...components,
  };
}

export function findMDXHeadings(page: MDXContent) {
  return (
    page({}).props.children as {
      type?: (...args: unknown[]) => unknown;
      props: { id: string; children: ReactNode };
    }[]
  )
    .filter((element) => element.type?.name === "HeadingLink")
    .map((element) => ({
      id: stripDiacritics(element.props.id),
      label: element.props.children,
    }));
}
