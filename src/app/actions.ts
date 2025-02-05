"use server";

import rawOrgues from "@/database/orgues.json";
import { normalizeString } from "@/lib/normalizeString";
import { Orgue, OrguesEdifici } from "./(markdown)/orgues/orgueNavigation";

const orgues = rawOrgues.orgues.flatMap((provincia) =>
  provincia.comarques.flatMap(
    (comarca) =>
      comarca.poblacions?.flatMap((municipi) => {
        const { edificis, ...restMunicipi } = municipi;
        return (edificis as OrguesEdifici[]).flatMap((edifici) => {
          const { orgues, ...restEdifici } = edifici;
          const data = {
            link: `/orgues/${provincia.link}/${comarca.link}/${municipi.link}/${edifici.link}`,
            provincia: rawOrgues.provincies.find(
              ({ link }) => link === provincia.link,
            ),
            comarca: rawOrgues.comarques.find(
              ({ link }) => link === comarca.link,
            ),
            bisbat: rawOrgues.bisbats.find(
              ({ link }) => link === municipi.bisbat,
            ),
            municipi: restMunicipi,
            edifici: restEdifici,
            orgue: undefined as Orgue | undefined,
          };
          return (
            orgues?.flatMap((orgue) => ({
              ...data,
              link: `${data.link}/${orgue.link}`,
              orgue,
            })) ?? data
          );
        });
      }) ?? [],
  ),
);

export type SearchResultOrgue = (typeof orgues)[number];

export async function findOrgues(normalizedQuery: string) {
  const filteredOrgues = orgues.filter(({ municipi, edifici, orgue }) => {
    return [municipi?.nom, edifici?.nom, orgue?.nom]
      .filter((nom) => nom !== undefined)
      .some((part) => normalizeString(part).includes(normalizedQuery));
  });
  return [
    ...(filteredOrgues.length
      ? [
          {
            group: "orgues",
            label: "Orgues",
            total: filteredOrgues.length,
            items: filteredOrgues.slice(0, 4),
            moreLink: `/orgues/?q=${normalizedQuery}`,
          },
        ]
      : []),
  ];
}
