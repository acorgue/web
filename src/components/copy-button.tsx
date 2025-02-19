"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface CopyButtonProps {
  slug: string;
}

export function CopyButton({ slug }: Readonly<CopyButtonProps>) {
  const t = useTranslations("copyButton");
  const [copied, setCopied] = useState(false);

  return (
    <Tooltip open={copied || undefined}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(
              new URL(slug, window.location.origin).toString(),
            );
            setCopied(true);
            // TODO(albertms10): call clearTimeout?
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? t("copied") : t("copy")}</TooltipContent>
    </Tooltip>
  );
}
