import orgues from "@/database/orgues.json" with { type: "json" };

export type Provincia = (typeof orgues.provincies)[number];
export type Comarca = (typeof orgues.comarques)[number];
export type Municipi = NonNullable<
  UnwrapArray<(typeof orgues.orgues)[number]["comarques"][number]["poblacions"]>
>;
export interface Edifici {
  nom: string;
  link: string;
  adreca: string;
  geolocalitzacio: {
    latitud: number;
    longitud: number;
  };
  orgues: Orgue[];
}
export interface Orgue {
  link: string;
  nom: string;
}

export type OrgueNavigationProps =
  | {
      provincia: string;
      comarca?: never;
      municipi?: never;
      edifici?: never;
      orgue?: never;
    }
  | {
      provincia: string;
      comarca: string;
      municipi?: never;
      edifici?: never;
      orgue?: never;
    }
  | {
      provincia: string;
      comarca: string;
      municipi: string;
      edifici?: never;
      orgue?: never;
    }
  | {
      provincia: string;
      comarca: string;
      municipi: string;
      edifici: string;
      orgue?: never;
    }
  | {
      provincia: string;
      comarca: string;
      municipi: string;
      edifici: string;
      orgue: string;
    };

type UnwrapArray<A> = A extends unknown[] ? UnwrapArray<A[number]> : A;
type NonNullable<T> = Exclude<T, null | undefined>;

type OrgueNavigationReturn<T extends OrgueNavigationProps> =
  (T["provincia"] extends string ? { provincia: Provincia } : {}) &
    (T["comarca"] extends string ? { comarca: Comarca } : {}) &
    (T["municipi"] extends string ? { municipi: Municipi } : {}) &
    (T["edifici"] extends string ? { edifici: Edifici } : {}) &
    (T["orgue"] extends string ? { orgue: Orgue } : {});

export function orgueNavigation<T extends OrgueNavigationProps>(
  params: Readonly<T>,
) {
  let municipi: Municipi | undefined;
  let edifici: Edifici | undefined;
  let orgue: Orgue | undefined;

  if (params.municipi) {
    municipi = orgues.orgues
      .find(({ link }) => link === params.provincia)
      ?.comarques.find(({ link }) => link === params.comarca)
      ?.poblacions?.find(({ link }) => link === params.municipi)!;
  }
  if (params.edifici) {
    edifici = municipi?.edificis.find(
      ({ link }) => link === params.edifici,
    )! as Edifici;
  }
  if (params.orgue) {
    orgue = edifici?.orgues.find(({ link }) => link === params.orgue)!;
  }

  return {
    ...(params.provincia
      ? {
          provincia: orgues.provincies.find(
            ({ link }) => link === params.provincia,
          )!,
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
