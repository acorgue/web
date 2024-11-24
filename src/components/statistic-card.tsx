import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface StatisticCardProps {
  label: string;
  figure: number;
}

export function StatisticCard({ label, figure }: Readonly<StatisticCardProps>) {
  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>
          <div className="text-muted-foreground">{label}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="font-bold leading-none text-5xl">{figure}</span>
      </CardContent>
    </Card>
  );
}
