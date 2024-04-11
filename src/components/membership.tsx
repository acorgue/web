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

export function Membership() {
  return (
    <>
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-6 mx-0 lg:-mx-[180px] md:-mx-[70px]">
        <MembershipOption
          title="Menors d’edat"
          description=""
          price={0}
          className="flex-1"
        />
        <MembershipOption
          title="Estudiant d’orgue"
          description="menors de 35 anys"
          price={20}
          className="flex-1"
        />
        <MembershipOption
          title="Jubilat"
          description=""
          price={35}
          highlight="border-gray-500"
          className="flex-1"
        />
        <MembershipOption
          title="Numerari"
          description="per a persones i entitats"
          price={50}
          highlight="border-blue-700"
          className="flex-1"
        />
        <MembershipOption
          title="Protector"
          description="per a persones i entitats"
          price={100}
          highlight="border-yellow-600"
          className="flex-1"
        />
      </div>
    </>
  );
}

export function MembershipOption({
  title,
  description,
  price,
  highlight,
  className,
}: Readonly<{
  title: string;
  description: string;
  price: number;
  highlight?: string;
  className: string;
}>) {
  return (
    <Card
      className={cn(
        className,
        "text-center flex flex-col",
        highlight && "border-2",
        highlight
      )}
    >
      <CardHeader>
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        <CardDescription>
          <div className="text-xs">&nbsp;{description}&nbsp;</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-auto content-center">
        {price === 0 ? (
          <div className="text-2xl">Gratuït</div>
        ) : (
          <>
            <div className="text-3xl">
              {price}
              <span className="align-text-top text-xl text-muted-foreground">
                &euro;
              </span>
            </div>
            <div className="text-xs text-muted-foreground">/any</div>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <ButtonLink href="#com-fer-sen-soci" className={highlight}>
          Fes-te’n soci!
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
