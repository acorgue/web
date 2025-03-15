import orgues from "@/database/orgues.json";
import { LinkHref } from "@/i18n/routing";
import { baseURL, route } from "@/lib/route";
import type { MetadataRoute } from "next";
import { sortedPosts } from "./[locale]/(markdown)/noticies/posts";
import { OrguesEdifici } from "./[locale]/(markdown)/orgues/orgueNavigation";

function url(url: LinkHref) {
  return new URL(url as string, baseURL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url(route("home")) },
    { url: url(route("avis-legal")) },
    { url: url(route("associacions")) },
    { url: url(route("bibliografia")) },
    { url: url(route("cicle")) },
    { url: url(route("formacio")) },
    { url: url(route("full")) },
    { url: url(route("orgues")) },
    ...sitemapOrgues(),
    { url: url(route("politica-de-privacitat")) },
    { url: url(route("politica-de-privacitat-socis")) },
    { url: url(route("noticies")) },
    ...sitemapNoticies(),
    { url: url(route("qui-som")) },
  ];
}

function sitemapOrgues(): MetadataRoute.Sitemap {
  return orgues.orgues.flatMap((provincia) => [
    { url: url(route("provincia", { provincia: provincia.link })) },
    ...provincia.comarques.flatMap((comarca) => [
      {
        url: url(
          route("comarca", {
            provincia: provincia.link,
            comarca: comarca.link,
          }),
        ),
      },
      ...(comarca.poblacions?.flatMap((municipi) => [
        {
          url: url(
            route("municipi", {
              provincia: provincia.link,
              comarca: comarca.link,
              municipi: municipi.link,
            }),
          ),
        },
        ...(municipi.edificis as OrguesEdifici[]).flatMap((edifici) => [
          {
            url: url(
              route("edifici", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
              }),
            ),
          },
          ...(edifici.orgues?.flatMap((orgue) => [
            {
              url: url(
                route("orgue", {
                  provincia: provincia.link,
                  comarca: comarca.link,
                  municipi: municipi.link,
                  edifici: edifici.link,
                  orgue: orgue.link,
                }),
              ),
            },
          ]) ?? []),
        ]),
      ]) ?? []),
    ]),
  ]);
}

function sitemapNoticies(): MetadataRoute.Sitemap {
  return sortedPosts.map((post) => ({
    url: url(route("post", { slug: post.slug })),
    lastModified: post.date,
  }));
}
