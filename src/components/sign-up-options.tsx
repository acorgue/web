import { ButtonLink } from "@/components/button-link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DownloadIcon, FileIcon, MailIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function SignUpOptions() {
  return (
    <div className="not-prose flex flex-col gap-y-6">
      <SignUpOption
        title="Omplint el formulari"
        description="en línia"
        isRecommended
        callToAction={
          <ButtonLink
            href="https://forms.gle/nYWSTWgjdLT4WP6S8"
            target="_blank"
          >
            <PencilIcon className="mr-2 size-4" aria-hidden="true" /> Vés al
            formulari
          </ButtonLink>
        }
      />
      <SignUpOption
        title="Baixant la butlleta"
        content={
          <ul className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-200/30 list-none text-start text-sm text-muted-foreground p-0 my-0">
            <li className="flex-1 px-6 pt-3 pb-6 sm:py-6 m-0">
              <div className="flex justify-center mb-3">
                <MailIcon className="size-6" aria-hidden="true" />
              </div>
              Omplint-la, signant-la digitalment i enviant-la per correu
              electrònic a{" "}
              <Link href="mailto:aco@acorgue.cat">aco@acorgue.cat</Link>.
            </li>
            <li className="flex-1 px-6 pt-6 pb-3 sm:py-6 m-0">
              <div className="flex justify-center mb-3">
                <FileIcon className="size-6" aria-hidden="true" />
              </div>
              Imprimint-la, omplint-la, signant-la i enviant-la per correu
              postal a{" "}
              <a href="https://maps.app.goo.gl/81kLGSTZy1c812g39">
                Carrer de Rocafort, 242 bis, 08029 Barcelona
              </a>
              .
            </li>
          </ul>
        }
        callToAction={
          <ButtonLink href="https://nextcloud.acorgue.cat/s/a6jB33E8cZTwDCp/download">
            <DownloadIcon className="mr-2 size-4" aria-hidden="true" /> Baixa la
            butlleta
          </ButtonLink>
        }
      />
    </div>
  );
}

export function SignUpOption({
  title,
  description,
  content,
  isRecommended,
  callToAction,
  className,
}: Readonly<{
  title: string;
  description?: ReactNode;
  content?: ReactNode;
  isRecommended?: boolean;
  callToAction: ReactNode;
  className?: string;
}>) {
  return (
    <Card
      className={cn(
        "text-center flex flex-col",
        isRecommended && "border-2 border-aco",
        className,
      )}
    >
      <CardHeader className="pb-4">
        {isRecommended && (
          <div className="-mt-2 mb-2">
            <Badge variant="aco">Recomanat</Badge>
          </div>
        )}
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      <CardFooter className="flex-auto justify-center items-end">
        {callToAction}
      </CardFooter>
    </Card>
  );
}
