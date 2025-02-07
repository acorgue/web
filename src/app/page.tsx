import { HomeCarousel } from "@/components/home-carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Literata } from "next/font/google";
import Link from "next/link";
import type { Organization, WithContext } from "schema-dts";

const literata = Literata({
  subsets: ["latin"],
  style: "italic",
  weight: "900",
  display: "swap",
});

const images = [
  "https://nextcloud.acorgue.cat/s/wgJtL7nXzm4cHo8/download",
  "https://nextcloud.acorgue.cat/s/BArgTXw9r2Ck7Ho/download",
  "https://nextcloud.acorgue.cat/s/sMLoEZarY4c9Fzd/download",
];

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
        <div className="min-h-[600px] h-[calc(100vh-3rem)] overflow-hidden flex items-center">
          <HomeCarousel images={images} />
        </div>
        <div className="absolute flex flex-col justify-between gap-24 h-full w-full px-4 min-[425px]:px-8 sm:px-18 md:px-24 lg:px-32 pt-24 sm:pt-32 pb-8 sm:pb-16 top-0">
          <h1
            className={cn(
              "text-5xl lg:text-6xl xl:text-7xl font-semibold text-white/90 drop-shadow-2xl [text-shadow:_0_5px_50px_rgb(0_0_0_/_0.6)] sm:[text-shadow:_0_5px_50px_rgb(0_0_0_/_0.4)]",
              literata.className,
            )}
          >
            Associació
            <br />
            Catalana
            <br />
            de l’Orgue
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mainItems.map((item) => (
              <Card
                key={item.href}
                className={cn(
                  "group flex rounded-2xl border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border",
                )}
              >
                <Link
                  href={item.href}
                  className="flex flex-col justify-center w-full"
                >
                  <CardContent className="flex gap-2 justify-between px-4 py-2 sm:p-6 items-center">
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
