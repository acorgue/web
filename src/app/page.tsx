import type { Organization, WithContext } from "schema-dts";

const jsonLD: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  image: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
  url: "https://www.acorgue.cat",
  sameAs: ["https://www.acorgue.cat/qui-som"],
  logo: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
  name: "Associació Catalana de l’Orgue",
  description:
    "L'Associació Catalana de l’Orgue (ACO) és una entitat sense ànim de lucre que pretén aglutinar tots els elements que conformen el món de l’orgue a Catalunya.",
  email: "aco@acorgue.cat",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer de Rocafort, 242 bis",
    addressLocality: "Barcelona",
    addressCountry: "ES",
    addressRegion: "Barcelona",
    postalCode: "08029",
  },
  // TODO(albertms10): dades d’exemple
  vatID: "FR12345678901",
  iso6523Code: "0199:724500PMK2A2M1SQQ228",
};

export default function Home() {
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
