import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

export default withNextIntl(withMDX(nextConfig));
