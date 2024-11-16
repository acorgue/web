import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX(nextConfig);
