import orgues from "@/database/orgues.json" with { type: "json" };

export const dynamicParams = false;

export async function generateStaticParams({
  params: { provincia },
}: {
  params: { provincia: string };
}) {
  return orgues.comarques
    .filter((comarca) => comarca.provincia === provincia)
    .map(({ link }) => ({ comarca: link }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ provincia: string; comarca: string }>;
}) {
  const { provincia, comarca } = await params;
  return (
    <div>
      Província: {provincia}
      <br />
      Comarca: {comarca}
    </div>
  );
}
