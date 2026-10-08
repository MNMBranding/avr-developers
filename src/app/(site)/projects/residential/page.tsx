import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { PageHeader } from "@/components/page-header";
import { ResidentialProjects } from "@/components/sections/residential-projects";

export const metadata: Metadata = {
  title: "Residential Projects in Kokapet, Hyderabad | AVR Developers",
  description:
    "Luxury 3, 3.5 & 4 BHK residences by AVR Developers in Kokapet, Hyderabad: Avira and Evania.",
  alternates: { canonical: "/projects/residential" },
};

export default function ResidentialProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Projects", path: "/projects" },
          { name: "Residential", path: "/projects/residential" },
        ]}
      />
      <PageHeader
        title="Residential Projects"
        intro="Luxury residences in Kokapet, Hyderabad's fastest-growing corridor."
        image={{
          src: "/evania/evania-hero.webp",
          mobileSrc: "/evania/evania-hero-mobile.webp",
          alt: "Evania by AVR Developers, Kokapet",
        }}
      />
      <ResidentialProjects />
    </>
  );
}
