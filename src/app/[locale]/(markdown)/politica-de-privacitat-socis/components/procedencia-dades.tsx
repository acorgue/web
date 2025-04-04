import { ExternalLink } from "@/components/external-link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, FileTextIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

export function ProcedenciaDades() {
  return (
    <ul className="not-prose flex flex-col divide-y divide-slate-200 dark:divide-slate-200/30 text-sm text-muted-foreground">
      <li className="flex-1 px-2 sm:px-4 py-2 sm:py-4">
        <ActionButton
          href="https://forms.gle/nYWSTWgjdLT4WP6S8"
          icon={<FileIcon className="size-4 me-2" aria-hidden="true" />}
        >
          Formulari en línia a Google Drive
        </ActionButton>
      </li>
      <li className="flex-1 px-2 sm:px-4 py-2 sm:py-4">
        <ActionButton
          href="https://nextcloud.acorgue.cat/s/a6jB33E8cZTwDCp/download"
          icon={<PencilIcon className="size-4 me-2" aria-hidden="true" />}
        >
          Formulari en PDF signat digitalment
        </ActionButton>
      </li>
      <li className="flex-1 px-2 sm:px-4 py-2 sm:py-4">
        <div
          className={cn(buttonVariants({ variant: "ghost" }), "w-full py-6")}
        >
          <FileTextIcon className="size-4 me-2" aria-hidden="true" />
          <span className="w-full">Formulari original (en paper)</span>
        </div>
      </li>
    </ul>
  );
}

function ActionButton({
  href,
  children,
  icon,
}: Readonly<PropsWithChildren<{ href: string; icon?: ReactNode }>>) {
  return (
    <Button asChild type="button" variant="ghost" className="w-full py-6">
      <Link href={href}>
        {icon}
        <span className="w-full">{children}</span>
        <ExternalLink tooltip="Enllaç extern" />
      </Link>
    </Button>
  );
}
