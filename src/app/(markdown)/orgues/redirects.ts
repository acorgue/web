import rawOrgues from "@/database/orgues.json";
import { route } from "@/lib/route";
import { OrguesEdifici, OrguesProvincia } from "./orgueNavigation";

export interface RedirectEntry {
  permanent: boolean;
  destination: string;
}

const computedRedirects = [...computeRedirects()];

/** Short slug to destination ({@link RedirectEntry}). */
export const redirects = Object.fromEntries(computedRedirects);

/** Destination to short slug. */
export const slugs = Object.fromEntries(
  computedRedirects.map(([slug, { destination }]) => [destination, slug]),
);

function redirectEntry(
  shorthand: string,
  destination: string,
): [string, RedirectEntry] {
  return [`/orgues/${shorthand}`, { destination, permanent: true }];
}

function* computeRedirects() {
  for (const provincia of rawOrgues.orgues as OrguesProvincia[]) {
    for (const comarca of provincia.comarques) {
      if (!comarca.poblacions) continue;
      for (const municipi of comarca.poblacions) {
        if (municipi.edificis.length === 0) continue;
        if (municipi.edificis.length === 1) {
          const [edifici] = municipi.edificis as OrguesEdifici[];
          if (!edifici.orgues) {
            yield redirectEntry(
              municipi.link,
              route("edifici", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
              }),
            );
          } else {
            for (const orgue of edifici.orgues) {
              yield redirectEntry(
                `${municipi.link}-${orgue.link}`,
                route("orgue", {
                  provincia: provincia.link,
                  comarca: comarca.link,
                  municipi: municipi.link,
                  edifici: edifici.link,
                  orgue: orgue.link,
                }),
              );
            }
          }
        } else {
          for (const edifici of municipi.edificis as OrguesEdifici[]) {
            if (!edifici.orgues) {
              yield redirectEntry(
                `${edifici.link}-${municipi.link}`,
                route("edifici", {
                  provincia: provincia.link,
                  comarca: comarca.link,
                  municipi: municipi.link,
                  edifici: edifici.link,
                }),
              );
            } else {
              for (const orgue of edifici.orgues) {
                yield redirectEntry(
                  `${edifici.link}-${municipi.link}-${orgue.link}`,
                  route("orgue", {
                    provincia: provincia.link,
                    comarca: comarca.link,
                    municipi: municipi.link,
                    edifici: edifici.link,
                    orgue: orgue.link,
                  }),
                );
              }
            }
          }
        }
      }
    }
  }
}
