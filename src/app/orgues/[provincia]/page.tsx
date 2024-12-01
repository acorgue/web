import orgues from "@/database/orgues.json" with { type: "json" };

export const dynamicParams = false;

export async function generateStaticParams() {
  return orgues.provincies.map(({ link }) => ({ provincia: link }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ provincia: string }>;
}) {
  const { provincia } = await params;
  return <div>Província: {provincia}</div>;
}
