import { route } from "@/lib/route";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div>
      <h2>{t("title")}</h2>
      <p>{t("subtitle")}</p>
      <Link href={route("home")}>{t("backHome")}</Link>
    </div>
  );
}
