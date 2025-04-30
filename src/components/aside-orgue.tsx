import type { Orgue } from "@/lib/normalize-orgue";
import type { ReactNode } from "react";
import { StatusLabel } from "./status-label";
import { Timeline } from "./timeline";
import { AsideHeading } from "./toc";
import { Separator } from "./ui/separator";

export function AsideOrgue({ orgue, end }: { orgue: Orgue; end: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="not-prose">
        <AsideHeading>Resum històric</AsideHeading>
        <Timeline
          items={orgue.orgueners.map(
            ({
              nom,
              date,
              descripcioDate,
              descripcioDateTooltip,
              descripcio,
            }) => ({
              label: (
                <>
                  <span className="font-medium text-gray-900">{nom}</span>,{" "}
                  {descripcio}
                </>
              ),
              date,
              dateLabel: descripcioDate,
              dateTooltip: descripcioDateTooltip,
            }),
          )}
        />
      </section>
      {orgue.emplacament ? (
        <section>
          <AsideHeading>Emplaçament</AsideHeading>
          {orgue.emplacament}
        </section>
      ) : null}
      <section>
        <AsideHeading>Estat de l’instrument</AsideHeading>
        <StatusLabel
          level={orgue.estat.at(-1)?.nota}
          label={orgue.estat.at(-1)?.estat ?? "Estat desconegut"}
        />
      </section>
      <Separator />
      <section>
        <AsideHeading>Composició</AsideHeading>
        {orgue.composicio}
      </section>
      <section>
        <AsideHeading>Transmissió</AsideHeading>
        <dl>
          <dt>Notes</dt>
          <dd>{orgue.transmissio.notes}</dd>
          <dt>Registres</dt>
          <dd>{orgue.transmissio.registres}</dd>
        </dl>
      </section>
      <Separator />
      <section>
        <AsideHeading>Bisbat</AsideHeading>
      </section>
      <Separator />
      <section>
        <AsideHeading>Enllaços d’interès</AsideHeading>
      </section>
      <Separator />
      {end}
    </div>
  );
}
