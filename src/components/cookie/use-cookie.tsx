import { Link } from "@/i18n/routing";
import { CookieIcon } from "lucide-react";
import type { useTranslations } from "next-intl";

const CONSENT_ACCEPTED_NAME = "isConsentAccepted";
const CONSENT_ACCEPTED_TRUE = "yes";
const CONSENT_ACCEPTED_FALSE = "no";

export type CookieConsentValue =
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
  return localStorage.getItem(CONSENT_ACCEPTED_NAME) as CookieConsentValue;
}

function alreadyAnswered() {
  return Boolean(consentValue());
}

async function showMessage(
  t: ReturnType<typeof useTranslations<"cookieBanner">>,
) {
  const { toast } = await import("sonner");
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
    duration: Infinity,
    style: { width: 400, maxWidth: "calc(100vw - 2rem)", right: 0 },
    icon: <CookieIcon className="size-4" aria-hidden="true" />,
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
