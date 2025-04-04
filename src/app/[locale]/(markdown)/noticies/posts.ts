import { routing } from "@/i18n/routing";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

interface MatterPostData {
  title: string;
  slug: string;
  subtitle: string;
  categories: string;
  author?: string;
  tags: string[];
}

export interface PostData extends MatterPostData {
  date: Date;
  fileName: string;
}

type MatchTuple = [string, string, string];

const fileNameRegExp = /^(\d{4}-\d{2}-\d{2})-(.*?)\.mdx?$/;

const postsDirectory = join(
  process.cwd(),
  `src/content/posts/${routing.defaultLocale}`,
);
export const posts = await getPosts(postsDirectory);

export const sortedPosts = Object.values(posts).toSorted(
  (a, b) => +b.date - +a.date,
);

async function getPostsFiles(directory: string) {
  if (!existsSync(directory)) {
    console.error(`Posts directory not found: ${directory}`);

    return [];
  }

  try {
    return await readdir(directory);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }

    return [];
  }
}

async function getPosts(directory: string) {
  const fileNames = await getPostsFiles(directory);
  const postEntries = fileNames.map(async (fileName) => {
    const match = fileName.match(fileNameRegExp) as MatchTuple | null;
    if (!match) {
      throw Error(
        `File ${fileName} does not match the expected ${fileNameRegExp} expression.`,
      );
    }
    const [, date] = match;

    const frontmatter = (
      await import(`/src/content/posts/${routing.defaultLocale}/${fileName}`)
    ).frontmatter as MatterPostData;

    return [
      frontmatter.slug,
      {
        date: new Date(date),
        fileName,
        ...frontmatter,
      },
    ] as [slug: string, PostData];
  });

  return Object.fromEntries(await Promise.all(postEntries));
}
