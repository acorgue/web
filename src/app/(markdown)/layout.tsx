import type { PropsWithChildren } from "react";

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="container pt-8 mx-auto px-4 prose dark:prose-invert flex-1">
      {children}
    </main>
  );
}
