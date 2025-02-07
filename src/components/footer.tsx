import { route } from "@/lib/route";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

export async function Footer({ className }: { className?: string }) {
  const t = await getTranslations();

  return (
    <footer
      className={cn(
        "bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 py-12 text-sm",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <FooterHeading>{t("footer.contactWithUs")}</FooterHeading>
          <p className="mt-2">Rocafort, 242 bis, 08029 Barcelona</p>

          <Button asChild variant="secondary" size="sm">
            <Link
              href={`${route("qui-som")}#com-fer-sen-soci`}
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
            <FooterListItem href="https://twitter.com/acorgue">
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
          <p className="mt-6 text-gray-400 dark:text-gray-600">
            © 1992–2024 <br /> {t("organization.name")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: Readonly<PropsWithChildren>) {
  return (
    <h2 className="text-lg font-semibold text-white dark:text-black">
      {children}
    </h2>
  );
}

function FooterListItem({
  href,
  children,
}: Readonly<PropsWithChildren<{ href: string }>>) {
  return (
    <li>
      <Link href={href} className="hover:text-white hover:dark:text-black">
        {children}
      </Link>
    </li>
  );
}
