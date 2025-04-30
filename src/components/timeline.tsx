import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Timeline({
  items,
  dateFormat = Intl.DateTimeFormat(undefined, { year: "numeric" }),
}: {
  items: {
    label: ReactNode;
    date: Date;
    dateLabel?: string;
    dateTooltip?: string;
  }[];
  dateFormat?: Intl.DateTimeFormat;
}) {
  return (
    <ul role="list" className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="relative flex gap-2">
          <div
            className={cn(
              index === items.length - 1 ? "h-6" : "-bottom-6",
              "absolute top-0 left-0 flex w-6 justify-center",
            )}
          >
            <div className="w-[1px] bg-gray-200"></div>
          </div>
          <div className="relative flex size-6 flex-none items-center justify-center bg-white">
            <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
          </div>
          <p className="flex-auto py-0.5 text-xs text-gray-500">{item.label}</p>
          <time
            dateTime={item.date.toISOString()}
            className="flex-none py-0.5 text-xs text-gray-500"
            title={item.dateTooltip}
          >
            {item.dateLabel ?? dateFormat.format(item.date)}
          </time>
        </li>
      ))}
    </ul>
  );
}
