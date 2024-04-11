import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EnvelopeClosedIcon, FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode } from "react";
import { ButtonLink } from "./button-link";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export function SignUp() {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <SignUpOption
          title="Omplint el formulari"
          description="en línia"
          isRecommended
          cta={
            <ButtonLink href="https://forms.gle/nYWSTWgjdLT4WP6S8">
              Vés al formulari
            </ButtonLink>
          }
          className="flex-0"
        />
        <SignUpOption
          title="Baixant la butlleta"
          description={
            <ul className="flex list-none h-32 text-start p-0 mb-0">
              <li className="flex-1 px-6">
                <div className="flex justify-center mb-3">
                  <EnvelopeClosedIcon width={24} height={24} />
                </div>
                Omplint-la, signant-la digitalment i enviant-la per correu
                electrònic a{" "}
                <Link href="mailto:aco@acorgue.cat">aco@acorgue.cat</Link>.
              </li>
              <Separator orientation="vertical" />
              <li className="flex-1 px-6">
                <div className="flex justify-center mb-3">
                  <FileIcon width={24} height={24} />
                </div>
                Imprimint-la, omplint-la, signant-la i enviant-la per correu
                postal a{" "}
                <Link href="https://maps.app.goo.gl/81kLGSTZy1c812g39">
                  Carrer de Rocafort 242 bis, 08029 Barcelona
                </Link>
                .
              </li>
            </ul>
          }
          cta={
            <ButtonLink href="https://nextcloud.acorgue.cat/s/a6jB33E8cZTwDCp/download">
              Baixa la butlleta
            </ButtonLink>
          }
          className="flex-0"
        />
      </div>
    </>
  );
}

export function SignUpOption({
  title,
  description,
  isRecommended,
  cta,
  className,
}: Readonly<{
  title: string;
  description: ReactNode;
  isRecommended?: boolean;
  cta: ReactNode;
  className: string;
}>) {
  return (
    <Card
      className={cn(
        className,
        "text-center flex flex-col",
        isRecommended && "border-2 border-gray-800"
      )}
    >
      <CardHeader>
        {isRecommended && (
          <div className="-mt-2 mb-2">
            <Badge>Recomanat</Badge>
          </div>
        )}
        <CardTitle className="m-0 text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex-auto justify-center items-end">
        {cta}
      </CardFooter>
    </Card>
  );
}
