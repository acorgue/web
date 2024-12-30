import { Link } from "@/i18n/routing";
import { stripDiacritics } from "@/lib/stripDiacritics";
import type { MDXComponents } from "mdx/types";

const HeadingLink = ({ id, ...rest }: Readonly<{ id?: string }>) => {
  if (!id) return <h2 {...rest} />;

  const strippedId = stripDiacritics(id);

  return (
    <Link href={`#${strippedId}`} className="no-underline">
      <h2
        id={strippedId}
        className="hover:text-orange-900 mt-[-60px] pt-[80px]"
        {...rest}
      />
    </Link>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: HeadingLink,
    ...components,
  };
}
