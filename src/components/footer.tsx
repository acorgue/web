import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Footer({ className }: { className?: string }) {
  const t = await getTranslations();

  return (
    <footer
      className={cn("bg-gray-700 text-gray-300 py-12 text-sm", className)}
    >
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {t("footer.contactWithUs")}
          </h2>
          <p className="mt-2">Rocafort, 242 bis, 08029 Barcelona</p>

          <Button asChild variant="secondary" size="sm">
            <Link href="/qui-som#com-fer-sen-soci" className="mt-2">
              {t("footer.joinUs")}
            </Link>
          </Button>

          <ul className="flex gap-2 mt-4">
            <li>
              <Link href="mailto:aco@orgue.cat" className="hover:text-white">
                <MailIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/acorgue/"
                className="hover:text-white"
              >
                <FacebookIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/acorgue"
                className="hover:text-white"
              >
                <TwitterIcon />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/acorgue/"
                className="hover:text-white"
              >
                <InstagramIcon />
              </Link>
            </li>
          </ul>
        </div>

        <nav>
          <h2 className="text-lg font-semibold text-white">
            {t("footer.links")}
          </h2>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/associacions" className="hover:text-white">
                {t("metadata.associations")}
              </Link>
            </li>
            <li>
              <Link href="/bibliografia" className="hover:text-white">
                {t("metadata.references")}
              </Link>
            </li>
            <li>
              <Link href="/cicle" className="hover:text-white">
                {t("metadata.concertSeries")}
              </Link>
            </li>
            <li>
              <Link href="/formacio" className="hover:text-white">
                {t("metadata.education")}
              </Link>
            </li>
            <li>
              <Link href="/full" className="hover:text-white">
                {t("metadata.factSheet")}
              </Link>
            </li>
            <li>
              <Link href="/orgues" className="hover:text-white">
                {t("metadata.pipeOrgans")}
              </Link>
            </li>
            <li>
              <Link href="/noticies" className="hover:text-white">
                {t("metadata.news")}
              </Link>
            </li>
            <li>
              <Link href="/qui-som" className="hover:text-white">
                {t("metadata.aboutUs")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-semibold text-white">
            {t("footer.legal")}
          </h2>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/avis-legal" className="hover:text-white">
                {t("metadata.legalNotice")}
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacitat" className="hover:text-white">
                {t("metadata.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacitat-socis"
                className="hover:text-white"
              >
                {t("metadata.privacyPolicyMembers")}
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-gray-400">
            © 1992–2024 <br /> {t("organization.name")}
          </p>
        </div>
      </div>
    </footer>
  );
}
