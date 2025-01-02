import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";
import { Literata } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { Organization, WithContext } from "schema-dts";

const literata = Literata({
  subsets: ["latin"],
  style: "italic",
  weight: "900",
  display: "swap",
});

export default async function Home() {
  const t = await getTranslations();

  const jsonLD: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    image: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
    url: "https://www.acorgue.cat",
    sameAs: ["https://www.acorgue.cat/qui-som"],
    logo: "https://nextcloud.acorgue.cat/s/pRJnNJ9AZ5gWLGR/download",
    name: t("organization.name"),
    description: t("organization.description"),
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

  const mainItems = [
    { href: "/qui-som", label: t("metadata.aboutUs") },
    { href: "/orgues", label: t("metadata.pipeOrgans") },
    { href: "/bibliografia", label: t("metadata.references") },
    { href: "/cicle", label: t("metadata.concertSeries") },
  ];

  return (
    <main className="mt-[-56px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      <div className="relative">
        <div className="h-screen overflow-hidden flex items-center">
          <Image
            src="https://nextcloud.acorgue.cat/s/N2BkxyJrbNpp5yp/download"
            alt="Orgue"
            width={1920}
            height={1281}
          />
        </div>
        <div className="absolute flex flex-col justify-between h-full px-24 pt-32 pb-16 top-0">
          <h1
            className={cn(
              "text-7xl font-semibold text-white/90 w-[40%]",
              literata.className,
            )}
          >
            {t("organization.name")}
          </h1>
          <div className="grid grid-cols-4 gap-6">
            {mainItems.map((item) => (
              <Card
                key={item.href}
                className={cn(
                  "group flex rounded-2xl backdrop-blur-md text-white bg-slate-300/40 transition-colors hover:bg-slate-50/40 border-slate-300/40",
                )}
              >
                <Link
                  href={item.href}
                  className="flex flex-col justify-center w-full"
                >
                  <CardContent className="flex gap-2 justify-between p-6 items-center">
                    <h2 className="flex-1 font-semibold text-lg">
                      {item.label}
                    </h2>
                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
