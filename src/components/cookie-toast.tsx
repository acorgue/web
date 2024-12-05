"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const CONSENT_ACCEPTED_NAME = "isConsentAccepted";

export function CookieToast() {
  useEffect(() => {
    if (localStorage.getItem(CONSENT_ACCEPTED_NAME) === "1") return;

    toast.info(
      "Aquest web utilitza cookies essencials per al seu funcionament.",
      {
        action: {
          label: "D’acord",
          onClick: () => {
            localStorage.setItem(CONSENT_ACCEPTED_NAME, "1");
          },
        },
        dismissible: false,
        duration: 600_000, // 10 min
        icon: <span className="text-lg">🍪</span>,
      },
    );
  }, []);

  return <></>;
}
