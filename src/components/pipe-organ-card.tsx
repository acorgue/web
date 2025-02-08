import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PipeOrganCardProps {
  href: string;
  title: string;
  description: string;
}

export function PipeOrganCard({
  href,
  title,
  description,
}: Readonly<PipeOrganCardProps>) {
  return (
    <article className="not-prose">
      <Link href={href}>
        <Card className="hover:bg-slate-500/5">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </article>
  );
}
