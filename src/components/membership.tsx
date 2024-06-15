import { ButtonLink } from "@/components/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Membership() {
  return (
    <>
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-6 mx-0 lg:-mx-[100px]">
        <MembershipOption
          title="Jubilat"
          description=""
          price={35}
          highlight="border-gray-400"
          className="flex-1"
        />
        <MembershipOption
          title="Numerari"
          description="per a persones i entitats"
          price={50}
          highlight="border-blue-500"
          className="flex-1"
        />
        <MembershipOption
          title="Protector"
          description="per a persones i entitats"
          price={100}
          highlight="border-yellow-400"
          className="flex-1"
        />
        <MembershipOption
          title="Menors d’edat"
          description=""
          price={0}
          className="flex-1 order-last lg:order-none"
        />
        <MembershipOption
          title="Estudiant d’orgue"
          description="menors de 35 anys"
          price={20}
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
        "text-center flex flex-col min-w-[240px]",
        highlight && "border-2",
        highlight,
        className
      )}
    >
      <CardHeader className="flex-auto">
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        {description && (
          <CardDescription>
            <span className="font-medium text-xs">{description}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="content-center">
        {price === 0 ? (
          <div className="text-2xl tracking-tight">Gratuït</div>
        ) : (
          <>
            <div className="text-3xl">
              <span className="tracking-tighter">{price}</span>
              <span className="align-text-top text-xl text-muted-foreground">
                &nbsp;&euro;
              </span>
            </div>
            <div className="font-medium text-xs text-muted-foreground">
              /any
            </div>
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
