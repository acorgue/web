// @ts-nocheck
import {
  Orgue,
  OrgueNavigationProps,
  OrguesComarca,
  OrguesEdifici,
  OrguesMunicipi,
  OrguesProvincia,
} from "@/app/[locale]/orgues/orgueNavigation";
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
  )!;
  if (!params.comarca) return provincia;

  const comarca = provincia?.comarques.find(
    ({ link }) => link === params.comarca,
  )!;
  if (!params.municipi) return comarca;

  const municipi = comarca?.poblacions?.find(
    ({ link }) => link === params.municipi,
  )!;
  if (!params.edifici) return municipi;

  const edifici = municipi?.edificis.find(
    ({ link }) => link === params.edifici,
  )! as OrguesEdifici;
  if (!params.orgue) return edifici;

  return edifici.orgues?.find(({ link }) => link === params.orgue)!;
}
