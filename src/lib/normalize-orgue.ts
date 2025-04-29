interface Element {
  nom: string;
}

interface Teclat extends Element {
  extensio: string;
  registres: {
    nom: string;
    peus?: string;
    llengueta?: boolean;
    partit?: string;
  }[];
}

type CategoriaActuacio =
  | "N"
  | "AC"
  | "AM"
  | "RO"
  | "RC"
  | "RS"
  | "RP"
  | "RH"
  | "AF"
  | "TR"
  | "TF"
  | "MO";

interface OrgueRaw {
  constructor: Element & {
    "sort-nom"?: string;
    any: number | string;
    "sort-any"?: number;
  };
  actuacions?: (Element & {
    any: number | string;
    "sort-any"?: number;
    actuacio: string;
    detall?: string;
  })[];
  diapaso: { nota: string; frequencia: number; temperatura: number };
  temperament: string;
  estat: { any: number; estat: string; nota: 1 | 2 | 3 | 4 }[];
  emplacament: string;
  transmissio: { notes: string; registres: string };
  composicio: string;
  teclats: Teclat[];
  pedal: Omit<Teclat, "nom">;
  acoblaments: Element[];
  efectes: Element[];
}

export interface Orgue {
  orgueners: (Element & {
    "sort-nom"?: string;
    date: Date;
    descripcioDate?: string;
    descripcioDateTooltip?: string;
    categories: CategoriaActuacio[];
    descripcio: string;
    detall?: string;
  })[];
  diapaso: { nota: string; frequencia: number; temperatura: number };
  temperament: string;
  estat: { date: Date; estat: string; nota: 1 | 2 | 3 | 4 }[];
  emplacament: string;
  transmissio: { notes: string; registres: string };
  composicio: string;
  teclats: Teclat[];
  pedal: Omit<Teclat, "nom">;
  acoblaments: Element[];
  efectes: Element[];
}

const categoriaActuacioToDescripcio = {
  N: "orgue nou",
  AC: "acabament",
  AM: "ampliació",
  RO: "reorganització",
  RC: "reconstrucció",
  RS: "restauració",
  RP: "reparació",
  AF: "afinació general",
  RH: "re-harmonització",
  TR: "trasllat",
  TF: "transformació",
  NE: "neteja",
  MO: "manteniment ordinari",
};

export function normalizeOrgue({
  constructor,
  actuacions,
  estat,
  ...orgue
}: OrgueRaw): Orgue {
  return {
    orgueners: [
      { ...constructor, actuacio: "N" as const },
      ...(actuacions ?? []),
    ].map(({ actuacio, "sort-any": sortAny, any, ...rest }) => {
      const categories = actuacio.split(", ") as CategoriaActuacio[];
      return {
        categories,
        descripcio: categories
          .map((categoria) => categoriaActuacioToDescripcio[categoria])
          .join(", "),
        date: new Date((sortAny ?? any).toString()),
        descripcioDate: sortAny ? normalizeYear(any.toString()) : undefined,
        descripcioDateTooltip: sortAny ? any.toString() : undefined,
        ...rest,
      };
    }),
    estat: estat.map(({ any, ...rest }) => ({
      date: new Date(any.toString()),
      ...rest,
    })),
    ...orgue,
  };
}

function normalizeYear(year: string) {
  console.log(year.match(/(\d+|s. \w+)/));
  if (year.startsWith("finals")) {
    return `s. ${year.split("s.").at(1)} ex.`;
  }
  return year;
}
