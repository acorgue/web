import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function NotFound({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div>
      <h2>{t("title")}</h2>
      <p>{t("subtitle")}</p>
      <Link href="/">{t("backHome")}</Link>
    </div>
  );
}
