import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const colors = ["bg-red-600", "bg-orange-600", "bg-blue-600", "bg-green-600"];

export function StatusLabel({
  label,
  level,
}: {
  label: string;
  level?: number;
}) {
  return (
    <span className="flex gap-2 items-center">
      <Badge
        variant="circle"
        className={cn((level && colors[level - 1]) || "bg-gray-600", "size-2")}
      />
      {label}
    </span>
  );
}
