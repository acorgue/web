import orgues from "@/database/orgues.json";
import type { MetadataRoute } from "next";
import { Edifici } from "./orgues/orgueNavigation";

function url(url: string) {
  return new URL(url, "https://www.acorgue.cat").toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url("/") },
    { url: url("/associacions") },
    { url: url("/bibliografia") },
    { url: url("/cicle") },
    { url: url("/formacio") },
    { url: url("/full") },
    { url: url("/orgues") },
    ...orgues.orgues.flatMap((provincia) => [
      { url: url(`/orgues/${provincia.link}`) },
      ...provincia.comarques.flatMap((comarca) => [
        { url: url(`/orgues/${provincia.link}/${comarca.link}`) },
        ...(comarca.poblacions?.flatMap((municipi) => [
          {
            url: url(
              `/orgues/${provincia.link}/${comarca.link}/${municipi.link}`,
            ),
          },
          ...(municipi.edificis as Edifici[]).flatMap((edifici) => [
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
    ]),
    { url: url("/politica-de-privacitat") },
    { url: url("/publicacions") },
    { url: url("/qui-som") },
  ];
}