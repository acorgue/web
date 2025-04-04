"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error.stack);
  }, [error]);

  return (
    <div>
      <h1>{t("title")}</h1>
      <button onClick={reset}>{t("retry")}</button>
    </div>
  );
}
