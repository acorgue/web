import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Organization, WithContext } from "schema-dts";

export default async function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  setRequestLocale(locale);

  const t = await getTranslations("organization");

  const jsonLD: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    image: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
    url: "https://www.acorgue.cat",
    sameAs: ["https://www.acorgue.cat/qui-som"],
    logo: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
    name: t("name"),
    description: t("description"),
    email: "aco@acorgue.cat",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Rocafort, 242 bis",
      addressLocality: "Barcelona",
      addressCountry: "ES",
      addressRegion: "Barcelona",
      postalCode: "08029",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      Benvinguts
    </>
  );
}
