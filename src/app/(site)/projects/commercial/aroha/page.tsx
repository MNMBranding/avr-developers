import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { commercialProjectPath, commercialProjects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aroha, Commercial Project in Hyderabad | AVR Developers",
  description:
    "Aroha, the first commercial development by AVR Developers in Hyderabad, is coming soon.",
  alternates: { canonical: "/projects/commercial/aroha" },
};

/* Full-width render of the upcoming commercial project with a "Coming Soon"
   overlay. Shown at its own 16:9 ratio below the 72px header, so the
   whole building is always visible, never cropped. id="hero" lets the site
   header sit transparent over the ink strip above it. */
export default function ArohaPage() {
  const project = commercialProjects.find((p) => p.slug === "aroha");
  if (!project?.pageLive) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Projects", path: "/projects" },
          { name: "Commercial", path: "/projects/commercial" },
          { name: project.name, path: commercialProjectPath(project) },
        ]}
      />
      <header id="hero" data-fill-ink className="relative overflow-hidden bg-ink pt-[72px] text-white">
        <div className="relative aspect-video w-full">
          <ResponsiveImage
            src={project.image}
            alt={`${project.name} by AVR Developers, commercial project render`}
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/45 px-5 text-center">
            <h1 className="sr-only">{project.name}, commercial project by AVR Developers</h1>
            <p className="font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-8xl">
              Coming Soon
            </p>
            <p className="mt-6 hidden max-w-[52ch] text-[15px] leading-relaxed text-white/85 sm:block lg:mt-8 lg:text-lg">
              {project.blurb}
            </p>
          </div>
        </div>
        {/* phones: the 16:9 banner is too short to carry the paragraph too */}
        <p className="px-5 py-10 text-center text-[15px] leading-relaxed text-white/85 sm:hidden">
          {project.blurb}
        </p>
      </header>
    </>
  );
}
