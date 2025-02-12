import {
  orgueNavigation,
  OrgueRouteParams,
} from "@/app/(markdown)/orgues/orgueNavigation";
import { routeFromParams } from "@/lib/route";
import { MapPinIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function PipeOrganHoverCard({
  params,
  children,
}: Readonly<PropsWithChildren<{ params: OrgueRouteParams }>>) {
  const orgue = orgueNavigation(params);
  if (!orgue) return children;
  return (
    <HoverCard openDelay={500} closeDelay={100}>
      <HoverCardTrigger
        href={routeFromParams(params)}
        className="no-underline box-decoration-clone rounded-sm px-[4px] py-[2px] transition-colors text-aco bg-aco/20 hover:bg-aco/15"
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              {orgue.orgue?.nom ?? orgue.edifici.nom}
            </h4>
            <p className="text-xs">
              {orgue.municipi.nom} (
              <span className="small-caps">{orgue.comarca.nom}</span>)
            </p>
            <div className="flex items-center pt-2">
              <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {orgue.edifici.adreca}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
