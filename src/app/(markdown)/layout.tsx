import type { PropsWithChildren } from "react";

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex flex-col-reverse lg:flex-row flex-1">{children}</div>
  );
}
