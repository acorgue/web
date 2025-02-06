import { PostData } from "@/app/(markdown)/noticies/posts";
import { UserIcon } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle } from "./ui/card";

export async function ArticleCard({ post }: Readonly<{ post: PostData }>) {
  const locale = await getLocale();
  const dateFormat = Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card key={post.slug}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <address className="flex gap-1 items-center not-italic">
            <UserIcon className="w-4 h-4" /> {post.author}
          </address>
          <time
            dateTime={post.date.toISOString()}
            className="uppercase tracking-wide"
          >
            {dateFormat.format(post.date)}
          </time>
        </div>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Badge variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
