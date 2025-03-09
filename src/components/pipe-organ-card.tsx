import {
  orgueNavigation,
  OrgueNavigationData,
  OrgueRouteParams,
} from "@/app/(markdown)/orgues/orgueNavigation";
import { routeFromParams } from "@/lib/route";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function PipeOrganCard({
  params,
}: Readonly<{ params: Omit<OrgueRouteParams, "orgue"> & { orgue?: string } }>) {
  const orgue = orgueNavigation(params) as OrgueNavigationData;
  if (!orgue) return;
  return (
    <article className="not-prose">
      <Link href={routeFromParams(params)}>
        <Card className="hover:bg-slate-500/5">
          <CardHeader>
            <CardTitle>{orgue.orgue?.nom ?? orgue.edifici.nom}</CardTitle>
            <CardDescription>
              {orgue.municipi.nom} ({orgue.comarca.nom})
              <span className="flex items-center pt-2">
                <MapPinIcon className="mr-2 size-4" />
                <span className="text-xs text-muted-foreground">
                  {orgue.edifici.adreca}
                </span>
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </article>
  );
}
