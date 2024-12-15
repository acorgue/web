import { CookieIcon } from "@radix-ui/react-icons";
import type { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";

const CONSENT_ACCEPTED_NAME = "isConsentAccepted";
const CONSENT_ACCEPTED_TRUE = "yes";
const CONSENT_ACCEPTED_FALSE = "no";

type ConsentValue =
  | typeof CONSENT_ACCEPTED_TRUE
  | typeof CONSENT_ACCEPTED_FALSE
  | null;

function acceptConsent() {
  localStorage.setItem(CONSENT_ACCEPTED_NAME, CONSENT_ACCEPTED_TRUE);
}

function declineConsent() {
  localStorage.setItem(CONSENT_ACCEPTED_NAME, CONSENT_ACCEPTED_FALSE);
}

function consentValue() {
  return localStorage.getItem(CONSENT_ACCEPTED_NAME) as ConsentValue;
}

function alreadyAnswered() {
  return Boolean(consentValue());
}

function showMessage(t: ReturnType<typeof useTranslations<"cookieBanner">>) {
  toast.info(t("title"), {
    id: "cookie-consent",
    description: (
      <span>
        {t("description")}
        <Link href="/politica-de-privacitat" className="block underline mt-1">
          {t("moreInfo")}
        </Link>
      </span>
    ),
    action: { label: t("accept"), onClick: acceptConsent },
    cancel: { label: t("decline"), onClick: declineConsent },
    invert: true,
    duration: Infinity,
    style: { width: 400, maxWidth: "calc(100vw - 2rem)", right: 0 },
    icon: <CookieIcon className="h-4 w-4" aria-hidden="true" />,
  });
}

export function useCookie() {
  return {
    consentValue,
    acceptConsent,
    declineConsent,
    alreadyAnswered,
    showMessage,
  };
}
