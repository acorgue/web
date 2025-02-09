type OrgueParams = {
  provincia: string;
  comarca: string;
  municipi: string;
  edifici: string;
  orgue: string;
};

interface RouteBuilders {
  associacions: undefined;
  "avis-legal": undefined;
  bibliografia: undefined;
  cicle: undefined;
  formacio: undefined;
  full: undefined;
  home: undefined;
  noticies: undefined;
  post: { slug: string };
  orgues: undefined;
  provincia: Pick<OrgueParams, "provincia">;
  comarca: Pick<OrgueParams, "provincia" | "comarca">;
  municipi: Pick<OrgueParams, "provincia" | "comarca" | "municipi">;
  edifici: Pick<OrgueParams, "provincia" | "comarca" | "municipi" | "edifici">;
  orgue: OrgueParams;
  "politica-de-privacitat": undefined;
  "politica-de-privacitat-socis": undefined;
  "qui-som": undefined;
}

export const baseURL = new URL("https://www.acorgue.cat");

const routeBuilders = {
  associacions: function () {
    return ["associacions"];
  },
  "avis-legal": function () {
    return ["avis-legal"];
  },
  bibliografia: function () {
    return ["bibliografia"];
  },
  cicle: function () {
    return ["cicle"];
  },
  formacio: function () {
    return ["formacio"];
  },
  full: function () {
    return ["full"];
  },
  home: function () {
    return [""];
  },
  noticies: function () {
    return ["noticies"];
  },
  post: function ({ slug }: RouteBuilders["post"]) {
    return [...this.noticies(), slug];
  },
  orgues: function () {
    return ["orgues"];
  },
  provincia: function ({ provincia }: RouteBuilders["provincia"]) {
    return [...this.orgues(), provincia];
  },
  comarca: function ({ comarca, ...rest }: RouteBuilders["comarca"]) {
    return [...this.provincia(rest), comarca];
  },
  municipi: function ({ municipi, ...rest }: RouteBuilders["municipi"]) {
    return [...this.comarca(rest), municipi];
  },
  edifici: function ({ edifici, ...rest }: RouteBuilders["edifici"]) {
    return [...this.municipi(rest), edifici];
  },
  orgue: function ({ orgue, ...rest }: RouteBuilders["orgue"]) {
    return [...this.edifici(rest), orgue];
  },
  "politica-de-privacitat": function () {
    return ["politica-de-privacitat"];
  },
  "politica-de-privacitat-socis": function () {
    return ["politica-de-privacitat-socis"];
  },
  "qui-som": function () {
    return ["qui-som"];
  },
} as const;

export function route<T extends keyof RouteBuilders>(
  route: T,
  options?: RouteBuilders[T],
  query?: Record<string, string>,
) {
  const url = new URL(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routeBuilders[route](options as any).join("/"),
    baseURL,
  );
  url.search = new URLSearchParams(query).toString();
  return url.pathname + url.search;
}
