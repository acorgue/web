import orgues from "@/database/orgues.json" with { type: "json" };

export type Provincia = (typeof orgues.provincies)[number];
export type Comarca = (typeof orgues.comarques)[number];
export type OrguesProvincia = (typeof orgues.orgues)[number];
export type OrguesComarca = OrguesProvincia["comarques"][number] & {
  de?: string;
};
export type OrguesMunicipi = NonNullable<
  UnwrapArray<OrguesComarca["poblacions"]>
> & { de_nom?: string };

export interface OrguesEdifici {
  nom: string;
  link: string;
  adreca: string;
  geolocalitzacio: {
    latitud: number;
    longitud: number;
  };
  orgues?: Orgue[];
  de?: string;
}

export interface Orgue {
  link: string;
  nom: string;
  de_nom?: string;
}

export interface OrgueRouteParams {
  provincia: string;
  comarca: string;
  municipi: string;
  edifici: string;
  orgue: string;
}

export interface OrgueNavigationData {
  provincia: Provincia;
  comarca: Comarca;
  municipi: OrguesMunicipi;
  edifici: OrguesEdifici;
  orgue: Orgue;
}

type PickOrNever<T, K extends keyof T> = {
  [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]?: never;
};

export type OrgueNavigationProps =
  | PickOrNever<OrgueRouteParams, "provincia">
  | PickOrNever<OrgueRouteParams, "provincia" | "comarca">
  | PickOrNever<OrgueRouteParams, "provincia" | "comarca" | "municipi">
  | PickOrNever<
      OrgueRouteParams,
      "provincia" | "comarca" | "municipi" | "edifici"
    >
  | OrgueRouteParams;

type UnwrapArray<A> = A extends unknown[] ? UnwrapArray<A[number]> : A;

export type OrgueNavigationReturn<T extends OrgueNavigationProps> =
  (T["provincia"] extends string ? { provincia: Provincia } : unknown) &
    (T["comarca"] extends string ? { comarca: Comarca } : unknown) &
    (T["municipi"] extends string ? { municipi: OrguesMunicipi } : unknown) &
    (T["edifici"] extends string ? { edifici: OrguesEdifici } : unknown) &
    (T["orgue"] extends string ? { orgue: Orgue } : unknown);

export function orgueNavigation<T extends OrgueNavigationProps>(
  params: Readonly<T>,
) {
  let municipi: OrguesMunicipi | undefined;
  let edifici: OrguesEdifici | undefined;
  let orgue: Orgue | undefined;

  if (params.municipi) {
    municipi = orgues.orgues
      .find(({ link }) => link === params.provincia)
      ?.comarques.find(({ link }) => link === params.comarca)
      ?.poblacions?.find(({ link }) => link === params.municipi);
  }
  if (params.edifici) {
    edifici = municipi?.edificis.find(
      ({ link }) => link === params.edifici,
    ) as OrguesEdifici;
  }
  if (params.orgue) {
    orgue = edifici?.orgues?.find(({ link }) => link === params.orgue);
  }

  return {
    ...(params.provincia
      ? {
          provincia: orgues.provincies.find(
            ({ link }) => link === params.provincia,
          ),
        }
      : {}),
    ...(params.comarca
      ? {
          comarca: orgues.comarques
            .filter((comarca) => comarca.provincia === params.provincia)
            .find(({ link }) => link === params.comarca),
        }
      : {}),
    ...(params.municipi ? { municipi } : {}),
    ...(params.edifici ? { edifici } : {}),
    ...(params.orgue ? { orgue } : {}),
  } as OrgueNavigationReturn<T>;
}
