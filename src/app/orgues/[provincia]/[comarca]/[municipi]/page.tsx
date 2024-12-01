import orgues from "@/database/orgues.json" with { type: "json" };

export const dynamicParams = false;

export async function generateStaticParams({
  params: { provincia, comarca },
}: {
  params: { provincia: string; comarca: string };
}) {
  return (
    orgues.orgues
      .find(({ link }) => link === provincia)
      ?.comarques.find(({ link }) => link === comarca)
      ?.poblacions?.map(({ link }) => ({ municipi: link })) ?? []
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ provincia: string; comarca: string; municipi: string }>;
}) {
  const { provincia, comarca, municipi } = await params;
  return (
    <div>
      Província: {provincia}
      <br />
      Comarca: {comarca}
      <br />
      Municipi: {municipi}
    </div>
  );
}
