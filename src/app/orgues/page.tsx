import { PageBreadcrumb } from "@/components/page-breadcrumb";
import Orgues from "./orgues.mdx";

export default function Page() {
  return (
    <>
      <PageBreadcrumb
        fragments={[
          { href: "/", label: "Inici", position: 1 },
          { label: "Orgues", position: 2 },
        ]}
        className="not-prose mb-8"
      />
      <Orgues />
    </>
  );
}
