import orgues from "@/database/orgues.json";
import type { MetadataRoute } from "next";
import { OrguesEdifici } from "./[locale]/orgues/orgueNavigation";

export const baseURL = new URL("https://www.acorgue.cat");

function url(url: string) {
  return new URL(url, baseURL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url("/") },
    { url: url("/avis-legal") },
    { url: url("/associacions") },
    { url: url("/bibliografia") },
    { url: url("/cicle") },
    { url: url("/formacio") },
    { url: url("/full") },
    { url: url("/orgues") },
    ...sitemapOrgues(),
    { url: url("/politica-de-privacitat") },
    { url: url("/politica-de-privacitat-socis") },
    { url: url("/publicacions") },
    { url: url("/qui-som") },
  ];
}

function sitemapOrgues() {
  return orgues.orgues.flatMap((provincia) => [
    { url: url(`/orgues/${provincia.link}`) },
    ...provincia.comarques.flatMap((comarca) => [
      { url: url(`/orgues/${provincia.link}/${comarca.link}`) },
      ...(comarca.poblacions?.flatMap((municipi) => [
        {
          url: url(
            `/orgues/${provincia.link}/${comarca.link}/${municipi.link}`,
          ),
        },
        ...(municipi.edificis as OrguesEdifici[]).flatMap((edifici) => [
          {
            url: url(
              `/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`,
            ),
          },
          ...(edifici.orgues?.flatMap((orgue) => [
            {
              url: url(
                `/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}/${orgue.link}`,
              ),
            },
          ]) ?? []),
        ]),
      ]) ?? []),
    ]),
  ]);
}
