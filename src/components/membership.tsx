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
import { getTranslations } from "next-intl/server";

export async function Membership() {
  const t = await getTranslations("membership");

  return (
    <div className="flex flex-col justify-around gap-x-4 gap-y-6 mx-0 mb-12">
      <MembershipOption
        title={t("retired")}
        description=""
        price={35}
        highlight="bg-aco/5 border-aco/50"
        className="flex-1"
      />
      <MembershipOption
        title={t("regularMember")}
        description={t("forIndividualsAndEntities")}
        price={50}
        highlight="bg-aco/10 border-aco/50"
        className="flex-1"
      />
      <MembershipOption
        title={t("supportingMember")}
        description={t("forIndividualsAndEntities")}
        price={100}
        highlight="bg-aco/15 border-aco/50"
        className="flex-1"
      />
      <MembershipOption
        title={t("organStudent")}
        description={t("under35")}
        price={20}
        className="flex-1"
      />
      <MembershipOption
        title={t("minor")}
        description=""
        price={0}
        className="flex-1 order-last lg:order-none"
      />
    </div>
  );
}

export async function MembershipOption({
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
  const t = await getTranslations("membership");

  return (
    <Card
      className={cn(
        "text-center flex flex-row gap-10 min-w-[240px] transition-transform hover:scale-[102%]",
        highlight && "border-2",
        highlight,
        className,
      )}
    >
      <CardHeader className="flex-auto space-y-0">
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        {description && (
          <CardDescription>
            <span className="font-medium text-xs">{description}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="content-center p-0 me-6 sm:me-0">
        {price === 0 ? (
          <div className="text-2xl tracking-tight">{t("free")}</div>
        ) : (
          <>
            <div className="text-3xl">
              <span className="tracking-tight">{price}</span>
              <span className="align-text-top text-xl text-muted-foreground">
                &nbsp;&euro;
              </span>
            </div>
            <div className="font-medium text-xs text-muted-foreground text-end me-4">
              {t("eachYear")}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-center p-0 me-6 hidden sm:flex">
        <ButtonLink href="#com-fer-sen-soci">{t("becomeAMember")}</ButtonLink>
      </CardFooter>
    </Card>
  );
}
