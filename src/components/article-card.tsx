import { PostData } from "@/app/(markdown)/noticies/posts";
import { CalendarIcon, UserIcon } from "lucide-react";
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
    <Card key={post.slug} className="hover:bg-slate-500/5">
      <CardHeader className="space-y-2">
        <CardTitle>{post.title}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {post.author ? (
            <address className="flex gap-1 items-center not-italic">
              <UserIcon className="size-4 shrink-0" />
              <span className="line-clamp-1">{post.author}</span>
            </address>
          ) : null}
          <span className="flex gap-1 items-center">
            <CalendarIcon className="size-4 shrink-0" />
            <time dateTime={post.date.toISOString()}>
              {dateFormat.format(post.date)}
            </time>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
