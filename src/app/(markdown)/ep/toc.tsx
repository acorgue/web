"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useState } from "react";

export function TOC() {
  const [isOpen, setIsOpen] = useState(false);

  function handleLinkClick() {
    // Només tanquem si estem en mòbil (breakpoint manual)
    if (window.innerWidth < 1024) setIsOpen(false);
  }

  return (
    <>
      {/* Mobile TOC button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mostra taula de continguts"
          variant="secondary"
        >
          Continguts
        </Button>
      </div>

      {/* TOC container */}
      <aside
        className={cn(
          isOpen ? "fixed inset-0 z-40 bg-white p-6 overflow-y-auto" : "hidden",
          "lg:block lg:static lg:w-1/5 lg:pr-6 lg:pt-8 lg:bg-transparent lg:overflow-visible",
        )}
      >
        <div className="mt-12 flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-lg font-semibold">Taula de continguts</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Tanca taula de continguts"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <nav aria-label="Taula de continguts" className="lg:sticky lg:top-8">
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="#introduccio"
                className="text-gray-700 hover:underline"
                onClick={handleLinkClick}
              >
                Introducció
              </a>
            </li>
            <li>
              <a
                href="#exemple"
                className="text-gray-700 hover:underline"
                onClick={handleLinkClick}
              >
                Exemple
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
