import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./button-link";

export function Pricing() {
  return (
    <>
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-6">
        <PricingColumn
          title="Menors d’edat"
          description=""
          price={0}
          className="flex-1"
        />
        <PricingColumn
          title="Estudiant d’orgue"
          description="menor de 35 anys"
          price={20}
          className="flex-1"
        />
        <PricingColumn
          title="Jubilat"
          description=""
          price={35}
          className="flex-1"
        />
        <PricingColumn
          title="Numerari"
          description="per a persones i entitats"
          price={50}
          className="flex-1"
        />
        <PricingColumn
          title="Protector"
          description="per a persones i entitats"
          price={100}
          className="flex-1"
        />
      </div>
    </>
  );
}

export function PricingColumn({
  title,
  description,
  price,
  className,
}: Readonly<{
  title: string;
  description: string;
  price: number;
  className: string;
}>) {
  return (
    <Card className={cn(className, "text-center flex flex-col")}>
      <CardHeader>
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        <CardDescription>
          <div>&nbsp;{description}&nbsp;</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {price === 0 ? (
          <div className="text-2xl">Gratuït</div>
        ) : (
          <>
            <div className="text-3xl">
              {price}
              <span className="align-super text-xl text-muted-foreground">
                &euro;
              </span>
            </div>
            <div className="text-xs text-muted-foreground">/any</div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex-auto justify-center items-end">
        <ButtonLink href="mailto:web@acorgue.cat">Fes-te’n soci!</ButtonLink>
      </CardFooter>
    </Card>
  );
}
