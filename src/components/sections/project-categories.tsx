"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { CoverImage } from "@/components/ui/cover-image";
import { commercialProjects, projects } from "@/lib/site";

type Tab = "residential" | "commercial";

const tabs: { id: Tab; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

/**
 * Residential / Commercial tabs on /projects. Both panels are always in the
 * markup (the inactive one is `hidden`) so crawlers see every project.
 * A #residential or #commercial hash (from the hero links or the nav
 * dropdown) opens that tab and scrolls the section into view.
 */
export function ProjectCategories() {
  const [active, setActive] = useState<Tab>("residential");

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "residential" || hash === "commercial") {
        setActive(hash);
        document.getElementById("categories")?.scrollIntoView();
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="categories" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="caps text-[11px] font-medium text-accent">Our Projects</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] md:text-5xl">
              Explore by category.
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Project category"
            className="flex gap-1.5 rounded-full border border-line-strong p-1.5"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`caps min-h-11 rounded-full px-6 text-[12px] font-medium transition-colors ${
                  active === tab.id ? "bg-ink text-white" : "text-ink lg:hover:text-accent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* residential */}
        <div
          role="tabpanel"
          id="panel-residential"
          aria-labelledby="tab-residential"
          hidden={active !== "residential"}
          className="mt-14 flex flex-col gap-10"
        >
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid overflow-hidden rounded-sm border border-line bg-white lg:grid-cols-2"
            >
              <div className="relative">
                {/* eager: the panels toggle with `hidden`, and a lazy image only
                    starts downloading once its tab is opened. No mobileSrc, so
                    eager doesn't fetch both crops; srcset sizes it per device. */}
                <CoverImage
                  src={project.heroImage ?? project.image}
                  alt={`${project.name} by AVR Developers`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                  className="aspect-[4/3] h-full lg:aspect-auto lg:min-h-[420px]"
                />
                <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                  {project.status}
                </span>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-10 lg:p-12">
                <p className="caps text-[11px] font-medium text-ink-55">
                  Kokapet, Hyderabad
                </p>
                <h3 className="font-serif text-4xl font-normal lg:text-[2.5rem]">{project.name}</h3>
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
                    href={`/${project.slug}`}
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
          ))}
        </div>

        {/* commercial */}
        <div
          role="tabpanel"
          id="panel-commercial"
          aria-labelledby="tab-commercial"
          hidden={active !== "commercial"}
          className="mt-14 flex flex-col gap-10"
        >
          {commercialProjects.map((project) => (
            <article
              key={project.name}
              className="grid overflow-hidden rounded-sm bg-ink text-white lg:grid-cols-2"
            >
              <div className="relative">
                <CoverImage
                  src={project.image}
                  alt={`${project.name} by AVR Developers, commercial project render`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                  /* the render's own ratio, so the whole building shows uncropped */
                  className="aspect-[1380/1352]"
                />
                <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-accent px-2.5 py-1 text-[10px] font-medium text-white">
                  {project.status}
                </span>
              </div>

              <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-12">
                <p className="caps text-[11px] font-medium text-white/70">Commercial</p>
                <h3 className="font-serif text-4xl font-normal leading-[1.05] lg:text-[3.5rem]">
                  {project.name}
                </h3>
                <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-white/75">
                  {project.blurb}
                </p>
                <Link
                  href="/contact"
                  className="group mt-2 inline-flex items-center gap-3 self-start rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
                >
                  Register Interest
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 lg:group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
