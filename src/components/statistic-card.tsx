import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocale } from "next-intl/server";

export async function StatisticCard({
  label,
  figure,
}: Readonly<{ label: string; figure: number }>) {
  const locale = await getLocale();
  return (
    <Card className="not-prose shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground uppercase tracking-wider">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold leading-none text-5xl text-aco">
        {figure.toLocaleString(locale)}
      </CardContent>
    </Card>
  );
}
