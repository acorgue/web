"use client";

import { CookieIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { toast } from "sonner";

const CONSENT_ACCEPTED_NAME = "isConsentAccepted";
const CONSENT_ACCEPTED_TRUE = "yes";
const CONSENT_ACCEPTED_FALSE = "no";

function acceptConsent() {
  localStorage.setItem(CONSENT_ACCEPTED_NAME, CONSENT_ACCEPTED_TRUE);
}

function declineConsent() {
  localStorage.setItem(CONSENT_ACCEPTED_NAME, CONSENT_ACCEPTED_FALSE);
}

function alreadyAnswered() {
  return Boolean(localStorage.getItem(CONSENT_ACCEPTED_NAME));
}

export function CookieToast() {
  useEffect(() => {
    if (alreadyAnswered()) return;

    toast.info("Vols permetre l’ús de galetes?", {
      description: "Aquest web utilitza galetes de tercers (Google Analytics).",
      action: {
        label: "Accepto",
        onClick: acceptConsent,
      },
      cancel: {
        label: "Declino",
        onClick: declineConsent,
      },
      invert: true,
      duration: 10 * 60 * 1000, // 10 min
      style: { width: 400, right: 0 },
      icon: <CookieIcon className="h-4 w-4" aria-hidden="true" />,
    });
  }, []);

  return <></>;
}
