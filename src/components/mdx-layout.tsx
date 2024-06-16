"use client";

import { stripDiacritics } from "@/utils/stripDiacritics";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import { PropsWithChildren } from "react";

const HeadingLink = ({ id, ...rest }: Readonly<{ id?: string }>) => {
  if (!id) return <h2 {...rest} />;

  const strippedId = stripDiacritics(id);

  return (
    <Link href={`#${strippedId}`} className="no-underline">
      <h2 id={strippedId} className="hover:text-orange-900" {...rest} />
    </Link>
  );
};

export default function MDXLayout({ children }: Readonly<PropsWithChildren>) {
  return <MDXProvider components={{ h2: HeadingLink }}>{children}</MDXProvider>;
}
