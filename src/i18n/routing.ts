import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import type { ComponentProps } from "react";

export const routing = defineRouting({
  locales: ["ca", "en"],
  defaultLocale: "ca",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/associacions": {
      ca: "/associacions",
      en: "/associations",
    },
    "/avis-legal": {
      ca: "/avis-legal",
      en: "/legal-notice",
    },
    "/bibliografia": {
      ca: "/bibliografia",
      en: "/references",
    },
    "/cicle": {
      ca: "/cicle",
      en: "/concert-series",
    },
    "/formacio": {
      ca: "/formacio",
      en: "/education",
    },
    "/full": {
      ca: "/full",
      en: "/fact-sheet",
    },
    "/noticies": {
      ca: "/noticies",
      en: "/news",
    },
    "/noticies/[slug]": {
      ca: "/noticies/[slug]",
      en: "/news/[slug]",
    },
    "/orgues": {
      ca: "/orgues",
      en: "/pipe-organs",
    },
    "/orgues/[provincia]": {
      ca: "/orgues/[provincia]",
      en: "/pipe-organs/[provincia]",
    },
    "/orgues/[provincia]/[comarca]": {
      ca: "/orgues/[provincia]/[comarca]",
      en: "/pipe-organs/[provincia]/[comarca]",
    },
    "/orgues/[provincia]/[comarca]/[municipi]": {
      ca: "/orgues/[provincia]/[comarca]/[municipi]",
      en: "/pipe-organs/[provincia]/[comarca]/[municipi]",
    },
    "/orgues/[provincia]/[comarca]/[municipi]/[edifici]": {
      ca: "/orgues/[provincia]/[comarca]/[municipi]/[edifici]",
      en: "/pipe-organs/[provincia]/[comarca]/[municipi]/[edifici]",
    },
    "/orgues/[provincia]/[comarca]/[municipi]/[edifici]/[orgue]": {
      ca: "/orgues/[provincia]/[comarca]/[municipi]/[edifici]/[orgue]",
      en: "/pipe-organs/[provincia]/[comarca]/[municipi]/[edifici]/[orgue]",
    },
    "/politica-de-privacitat": {
      ca: "/politica-de-privacitat",
      en: "/privacy-policy",
    },
    "/politica-de-privacitat-socis": {
      ca: "/politica-de-privacitat-socis",
      en: "/privacy-policy-members",
    },
    "/qui-som": {
      ca: "/qui-som",
      en: "/about-us",
    },
  },
});

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  permanentRedirect,
} = createNavigation(routing);

export type LinkHref = ComponentProps<typeof Link>["href"];
