import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Associació Catalana de l’Orgue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "organization" });
  const fontSans = await readFile(
    join(process.cwd(), "public/fonts/InterVariable.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t("name")}
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "InterVariable", data: fontSans, style: "normal" }],
    },
  );
}
