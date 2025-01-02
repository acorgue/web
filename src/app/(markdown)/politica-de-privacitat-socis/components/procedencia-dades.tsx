import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ExternalLinkIcon,
  FileIcon,
  FileTextIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function ProcedenciaDades() {
  return (
    <ul className="not-prose flex flex-col divide-y divide-slate-200 list-none text-start text-sm text-muted-foreground p-0 my-0">
      <li className="flex-1 px-6 pt-3 pb-6 sm:py-6 m-0">
        <Button asChild type="button" variant="ghost" className="w-full">
          <Link href="https://forms.gle/nYWSTWgjdLT4WP6S8">
            <FileIcon className="h-5 w-5 me-2" aria-hidden="true" />
            <span className="w-full">Formulari en línia a Google Drive</span>
            <ExternalLinkIcon className="h-4 w-4 ms-4" aria-hidden="true" />
          </Link>
        </Button>
      </li>
      <li className="flex-1 px-6 pt-3 pb-6 sm:py-6 m-0">
        <Button asChild type="button" variant="ghost" className="w-full">
          <Link href="https://nextcloud.acorgue.cat/s/a6jB33E8cZTwDCp/download">
            <Pencil2Icon className="h-5 w-5 me-2" aria-hidden="true" />
            <span className="w-full">Formulari en PDF signat digitalment</span>
            <ExternalLinkIcon className="h-4 w-4 ms-4" aria-hidden="true" />
          </Link>
        </Button>
      </li>
      <li className="flex-1 px-6 pt-3 pb-6 sm:py-6 m-0">
        <div className={cn(buttonVariants({ variant: "ghost" }), "w-full")}>
          <FileTextIcon className="h-5 w-5 me-2" aria-hidden="true" />
          <span className="w-full">Formulari original (en paper)</span>
        </div>
      </li>
    </ul>
  );
}
