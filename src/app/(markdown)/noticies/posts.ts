import { readdirSync } from "node:fs";
import { join } from "node:path";

interface MatterPostData {
  title: string;
  slug: string;
  subtitle: string;
  categories: string;
  author: string;
  tags: string[];
}

export interface PostData extends MatterPostData {
  date: Date;
  fileName: string;
}

type MatchTuple = [string, string, string];

const postsDirectory = join(process.cwd(), "src/app/(markdown)/noticies/_posts");
const fileNameRegExp = /^(\d{4}-\d{2}-\d{2})-(.*?)\.mdx?$/;

export const posts = await getPosts();

export const sortedPosts = Object.values(posts).toSorted(
  (a, b) => +b.date - +a.date,
);

async function getPosts() {
  const fileNames = readdirSync(postsDirectory);
  const postEntries = fileNames.map(async (fileName) => {
    const match = fileName.match(fileNameRegExp) as MatchTuple | null;
    if (!match) {
      throw Error(
        `File ${fileName} does not match the expected ${fileNameRegExp} expression.`,
      );
    }
    const [, date] = match;

    const frontmatter = (await import(`./_posts/${fileName}`))
      .frontmatter as MatterPostData;

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
