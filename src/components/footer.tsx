import { Link } from "@/i18n/routing";
import { route } from "@/lib/route";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import type { PropsWithChildren } from "react";
import { Button } from "./ui/button";

export async function Footer({ className }: { className?: string }) {
  const t = await getTranslations();

  return (
    <footer
      className={cn(
        "bg-aco dark:bg-primary text-aco-foreground dark:text-aco-dark py-12 text-sm",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <FooterHeading>{t("footer.contactWithUs")}</FooterHeading>
          <address className="mt-2 dark:text-black/80 not-italic">
            <a href="https://maps.app.goo.gl/81kLGSTZy1c812g39">
              Rocafort, 242 bis, 08029 Barcelona
            </a>
          </address>

          <Button asChild variant="secondary" size="sm">
            <Link
              href={{ pathname: "/qui-som", hash: "com-fer-sen-soci" }}
              className="mt-2"
            >
              {t("footer.joinUs")}
            </Link>
          </Button>

          <ul className="flex gap-2 mt-4">
            <FooterListItem href="mailto:aco@orgue.cat">
              <MailIcon />
            </FooterListItem>
            <FooterListItem href="https://www.facebook.com/acorgue/">
              <FacebookIcon />
            </FooterListItem>
            <FooterListItem href="https://x.com/acorgue">
              <TwitterIcon />
            </FooterListItem>
            <FooterListItem href="https://www.instagram.com/acorgue/">
              <InstagramIcon />
            </FooterListItem>
          </ul>
        </div>

        <nav>
          <FooterHeading>{t("footer.links")}</FooterHeading>
          <ul className="mt-2 space-y-1">
            <FooterListItem href={route("associacions")}>
              {t("metadata.associations")}
            </FooterListItem>
            <FooterListItem href={route("bibliografia")}>
              {t("metadata.references")}
            </FooterListItem>
            <FooterListItem href={route("cicle")}>
              {t("metadata.concertSeries")}
            </FooterListItem>
            <FooterListItem href={route("formacio")}>
              {t("metadata.education")}
            </FooterListItem>
            <FooterListItem href={route("full")}>
              {t("metadata.factSheet")}
            </FooterListItem>
            <FooterListItem href={route("orgues")}>
              {t("metadata.pipeOrgans")}
            </FooterListItem>
            <FooterListItem href={route("noticies")}>
              {t("metadata.news")}
            </FooterListItem>
            <FooterListItem href={route("qui-som")}>
              {t("metadata.aboutUs")}
            </FooterListItem>
          </ul>
        </nav>

        <div>
          <FooterHeading>{t("footer.legal")}</FooterHeading>
          <ul className="mt-2 space-y-1">
            <FooterListItem href={route("avis-legal")}>
              {t("metadata.legalNotice")}
            </FooterListItem>
            <FooterListItem href={route("politica-de-privacitat")}>
              {t("metadata.privacyPolicy")}
            </FooterListItem>
            <FooterListItem href={route("politica-de-privacitat-socis")}>
              {t("metadata.privacyPolicyMembers")}
            </FooterListItem>
          </ul>
          <p className="mt-6 text-primary-foreground/70 dark:text-primary-foreground/70">
            © 1992–2024 <br /> {t("organization.name")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: Readonly<PropsWithChildren>) {
  return (
    <h2 className="text-lg font-semibold text-primary-foreground">
      {children}
    </h2>
  );
}

function FooterListItem({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<typeof NextLink>>) {
  return (
    <li>
      <NextLink
        className={cn(
          className,
          "text-primary-foreground/85 hover:text-primary-foreground transition-colors dark:text-aco-dark dark:hover:text-aco-dark/70",
        )}
        {...props}
      />
    </li>
  );
}
