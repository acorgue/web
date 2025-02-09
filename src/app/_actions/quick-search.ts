"use server";

import rawOrgues from "@/database/orgues.json";
import { matchFragments } from "@/lib/match-fragments";
import { route } from "@/lib/route";
import { sortedPosts } from "../(markdown)/noticies/posts";
import { Orgue, OrguesEdifici } from "../(markdown)/orgues/orgueNavigation";

const orgues = rawOrgues.orgues.flatMap((provincia) =>
  provincia.comarques.flatMap(
    (comarca) =>
      comarca.poblacions?.flatMap((municipi) => {
        const { edificis, ...restMunicipi } = municipi;
        return (edificis as OrguesEdifici[]).flatMap((edifici) => {
          const { orgues, ...restEdifici } = edifici;
          const data = {
            link: route("edifici", {
              provincia: provincia.link,
              comarca: comarca.link,
              municipi: municipi.link,
              edifici: edifici.link,
            }),
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
              link: route("orgue", {
                provincia: provincia.link,
                comarca: comarca.link,
                municipi: municipi.link,
                edifici: edifici.link,
                orgue: orgue.link,
              }),
              orgue,
            })) ?? [data]
          );
        });
      }) ?? [],
  ),
);

export interface SearchResult {
  link: string;
  label: string;
}

export type SearchResultOrgue = (typeof orgues)[number];

export type SearchResultGroup = {
  label: string;
  total: number;
  moreLink: string;
} & (
  | { group: "orgues"; items: SearchResultOrgue[] }
  | { group: "noticies"; items: SearchResult[] }
);

export async function quickSearch(normalizedQuery: string) {
  const filteredOrgues = orgues.filter(({ municipi, edifici, orgue }) =>
    matchFragments([municipi?.nom, edifici?.nom, orgue?.nom], normalizedQuery),
  );
  const filteredPosts = sortedPosts.filter(
    ({ title, subtitle, author, tags }) =>
      matchFragments([title, subtitle, author, ...tags], normalizedQuery),
  );
  return [
    ...(filteredOrgues.length
      ? [
          {
            group: "orgues",
            label: "Orgues",
            total: filteredOrgues.length,
            items: filteredOrgues.slice(0, 4),
            moreLink: route("orgues", undefined, { q: normalizedQuery }),
          },
        ]
      : []),
    ...(filteredPosts.length
      ? [
          {
            group: "noticies",
            label: "Notícies",
            total: filteredPosts.length,
            items: filteredPosts.slice(0, 4).map((post) => ({
              link: route("post", { slug: post.slug }),
              label: post.title,
            })),
            moreLink: route("noticies", undefined, { q: normalizedQuery }),
          },
        ]
      : []),
  ] as SearchResultGroup[];
}
