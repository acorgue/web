import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { getTranslations } from "next-intl/server";
import Publicacions from "./publicacions.mdx";

export default async function Page() {
  const t = await getTranslations("metadata");

  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: t("home"), position: 1 },
          { label: t("articles"), position: 2 },
        ]}
        className="not-prose mb-8"
      />
      <Publicacions />
    </>
  );
}
