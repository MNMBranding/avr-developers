import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { PageHeader } from "@/components/page-header";
import { CommercialProjects } from "@/components/sections/commercial-projects";

export const metadata: Metadata = {
  title: "Commercial Projects in Hyderabad | AVR Developers",
  description:
    "As we continue to grow, we are now venturing into commercial real estate, bringing the same commitment to quality and thoughtful development to spaces built for businesses and enterprises.",
  alternates: { canonical: "/projects/commercial" },
};

export default function CommercialProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Projects", path: "/projects" },
          { name: "Commercial", path: "/projects/commercial" },
        ]}
      />
      <PageHeader
        title="Commercial Projects"
        intro="As we continue to grow, we are now venturing into commercial real estate, bringing the same commitment to quality and thoughtful development to spaces built for businesses and enterprises."
        image={{
          src: "/projects/aroha-render.webp",
          alt: "Aroha by AVR Developers, commercial project render",
        }}
      />
      <CommercialProjects />
    </>
  );
}
