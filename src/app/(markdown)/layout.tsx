import type { PropsWithChildren } from "react";

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="container pt-8 sm:max-md:px-8 md:px-0 prose dark:prose-invert flex-1">
      {children}
    </main>
  );
}
