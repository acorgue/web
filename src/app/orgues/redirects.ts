import rawOrgues from "@/database/orgues.json";
import { OrguesEdifici, OrguesProvincia } from "./orgueNavigation";

export interface RedirectEntry {
  permanent: boolean;
  destination: string;
}

export const redirects = Object.fromEntries(computeRedirects());

function redirectEntry(
  source: string,
  destinationPaths: string[],
): [string, RedirectEntry] {
  return [
    `/orgues/${source}`,
    { destination: `/orgues/${destinationPaths.join("/")}`, permanent: true },
  ];
}

function* computeRedirects() {
  for (const provincia of rawOrgues.orgues as OrguesProvincia[]) {
    for (const comarca of provincia.comarques) {
      if (!comarca.poblacions) continue;
      for (const poble of comarca.poblacions) {
        if (poble.edificis.length === 0) continue;
        if (poble.edificis.length === 1) {
          const [edifici] = poble.edificis as OrguesEdifici[];
          if (!edifici.orgues) {
            yield redirectEntry(
              poble.link,
              [provincia, comarca, poble, edifici].map((e) => e.link),
            );
          } else {
            for (const orgue of edifici.orgues) {
              yield redirectEntry(
                `${poble.link}-${orgue.link}`,
                [provincia, comarca, poble, edifici, orgue].map((e) => e.link),
              );
            }
          }
        } else {
          for (const edifici of poble.edificis as OrguesEdifici[]) {
            if (!edifici.orgues) {
              yield redirectEntry(
                `${edifici.link}-${poble.link}`,
                [provincia, comarca, poble, edifici].map((e) => e.link),
              );
            } else {
              for (const orgue of edifici.orgues) {
                yield redirectEntry(
                  `${edifici.link}-${poble.link}-${orgue.link}`,
                  [provincia, comarca, poble, edifici, orgue].map(
                    (e) => e.link,
                  ),
                );
              }
            }
          }
        }
      }
    }
  }
}
