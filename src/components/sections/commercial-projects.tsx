import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProjectStatusFilter } from "@/components/project-status-filter";
import { CoverImage } from "@/components/ui/cover-image";
import { commercialProjectPath, commercialProjects } from "@/lib/site";

/* /projects/commercial: one dark card per commercial project, render on the
   left. Under the All / Ongoing / Completed / Coming Soon filter. */
export function CommercialProjects() {
  return (
    <ProjectStatusFilter
      items={commercialProjects.map((project) => ({
        key: project.slug,
        status: project.status,
        card: (
          <article className="grid overflow-hidden rounded-sm bg-ink text-white lg:grid-cols-2">
            <div className="relative">
              <CoverImage
                src={project.image}
                alt={`${project.name} by AVR Developers, commercial project render`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-video h-full lg:aspect-auto lg:min-h-[420px]"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-12">
              <p className="caps text-[11px] font-medium text-white/70">Commercial</p>
              <h2 className="font-serif text-4xl font-normal leading-[1.05] lg:text-[3.5rem]">
                {project.name}
              </h2>
              <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-white/75">
                {project.blurb}
              </p>
              {/* links to the project's page once it's live (pageLive in site.ts) */}
              {project.pageLive ? (
                <Link
                  href={commercialProjectPath(project)}
                  className="group mt-2 inline-flex items-center gap-3 self-start rounded-sm bg-accent px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
                >
                  Explore {project.name}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform duration-300 lg:group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <span className="mt-2 inline-flex select-none items-center self-start rounded-sm bg-white/10 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60">
                  {project.status}
                </span>
              )}
            </div>
          </article>
        ),
      }))}
    />
  );
}
