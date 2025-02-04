"use server";

import rawOrgues from "@/database/orgues.json";
import { stripDiacritics } from "@/lib/stripDiacritics";
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

export async function findOrgues(query: string) {
  const strippedQuery = stripDiacritics(query).toLocaleLowerCase();
  return orgues
    .filter(({ municipi, edifici, orgue }) => {
      return [municipi?.nom, edifici?.nom, orgue?.nom]
        .filter((nom) => nom !== undefined)
        .some((nom) =>
          stripDiacritics(nom).toLocaleLowerCase().includes(strippedQuery),
        );
    })
    .slice(0, 10);
}
