import {
  Orgue,
  OrgueNavigationProps,
  OrguesComarca,
  OrguesEdifici,
  OrguesMunicipi,
  OrguesProvincia,
} from "@/app/(markdown)/orgues/orgueNavigation";
import rawOrgues from "./orgues.json";

type OrgueNavigationReturn<T extends OrgueNavigationProps> =
  T["orgue"] extends string
    ? Orgue
    : T["edifici"] extends string
      ? OrguesEdifici
      : T["municipi"] extends string
        ? OrguesMunicipi
        : T["comarca"] extends string
          ? OrguesComarca
          : T["provincia"] extends string
            ? OrguesProvincia
            : never;

export function orgues<T extends OrgueNavigationProps>(
  params: Readonly<T>,
): OrgueNavigationReturn<T> {
  const provincia = rawOrgues.orgues.find(
    ({ link }) => link === params.provincia,
  );
  if (!params.comarca) return provincia as OrgueNavigationReturn<T>;

  const comarca = provincia?.comarques.find(
    ({ link }) => link === params.comarca,
  );
  if (!params.municipi) return comarca as OrgueNavigationReturn<T>;

  const municipi = comarca?.poblacions?.find(
    ({ link }) => link === params.municipi,
  );
  if (!params.edifici) return municipi as OrgueNavigationReturn<T>;

  const edifici = municipi?.edificis.find(
    ({ link }) => link === params.edifici,
  ) as OrguesEdifici;
  if (!params.orgue) return edifici as OrgueNavigationReturn<T>;

  return edifici.orgues?.find(
    ({ link }) => link === params.orgue,
  ) as OrgueNavigationReturn<T>;
}
