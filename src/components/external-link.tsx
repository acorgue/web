import { ExternalLinkIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ExternalLink({ tooltip }: Readonly<{ tooltip: string }>) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ExternalLinkIcon className="size-4 ms-4" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
