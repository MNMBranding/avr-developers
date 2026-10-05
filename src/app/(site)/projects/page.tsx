import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { PageHeader } from "@/components/page-header";
import { ProjectCategories } from "@/components/sections/project-categories";
import { ProjectsAbout } from "@/components/sections/projects-about";

export const metadata: Metadata = {
  title: "Residential & Commercial Projects in Hyderabad | AVR Developers",
  description:
    "Explore AVR Developers' projects: luxury 3, 3.5 & 4 BHK residences Avira and Evania in Kokapet, Hyderabad, and Aroha, our upcoming commercial development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projects", path: "/projects" }]} />
      <PageHeader
        title="Addresses for the young spirited."
        titleClassName="max-w-[16ch] font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[4.5rem]"
        intro="From luxury residences in Kokapet to our first commercial development, every AVR project is built on quality, integrity and customer trust."
        image={{
          src: "/about/About-hero.webp",
          mobileSrc: "/about/about-page-hero-mobile.webp",
          alt: "Aerial view of an AVR Developers project, set among mature greenery",
          position: "center 40%",
        }}
      />
      <ProjectsAbout />
      <ProjectCategories />
    </>
  );
}
