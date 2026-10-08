import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProjectStatusFilter } from "@/components/project-status-filter";
import { CoverImage } from "@/components/ui/cover-image";
import { projectPath, projects } from "@/lib/site";

/* /projects/residential: one card per residential project, photo on the left,
   under the All / Ongoing / Completed / Coming Soon filter. */
export function ResidentialProjects() {
  return (
    <ProjectStatusFilter
      items={projects.map((project) => ({
        key: project.slug,
        status: project.status,
        card: (
          <article
            className="grid overflow-hidden rounded-sm border border-line bg-white lg:grid-cols-2"
          >
            <div className="relative">
              <CoverImage
                src={project.heroImage ?? project.image}
                alt={`${project.name} by AVR Developers`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] h-full lg:aspect-auto lg:min-h-[420px]"
              />
              <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                {project.status}
              </span>
            </div>

            <div className="flex flex-col gap-5 p-6 sm:p-10 lg:p-12">
              <p className="caps text-[11px] font-medium text-ink-55">Kokapet, Hyderabad</p>
              <h2 className="font-serif text-4xl font-normal lg:text-[2.5rem]">{project.name}</h2>
              <p className="text-base">{project.configuration}</p>
              <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-ink-70">
                {project.blurb}
              </p>
              <ul className="caps flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-5 text-[11px] font-medium text-ink-70">
                {project.highlights.map((item) => (
                  <li key={item.label} className="self-end">
                    {item.value && (
                      <span className="mb-1 block font-serif text-[26px] font-normal normal-case leading-tight tracking-normal text-ink">
                        {item.value}
                      </span>
                    )}
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                {project.rera && (
                  <span className="text-[12px] tracking-[0.06em] text-ink-55">{project.rera}</span>
                )}
                <Link
                  href={projectPath(project)}
                  className="group inline-flex items-center gap-3 rounded-sm bg-accent px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
                >
                  Explore {project.name}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform duration-300 lg:group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </article>
        ),
      }))}
    />
  );
}
