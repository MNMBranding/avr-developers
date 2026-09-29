import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ProjectGallery } from "@/components/project-gallery";
import { Amenities } from "@/components/amenities";
import { ProjectVideo } from "@/components/project-video";
import { Clubhouse } from "@/components/clubhouse";
import { FloorPlans } from "@/components/floor-plans";
import { LocationSection } from "@/components/location-section";
import { Reveal } from "@/components/ui/reveal";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { site, type Project } from "@/lib/site";
import { withBreaks, paragraphs } from "@/lib/with-breaks";

export function ProjectPage({ project }: { project: Project }) {
  const residenceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: `${project.name} by ${site.name}`,
    description: project.blurb,
    url: `${site.url}/${project.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(project.rera ? { identifier: project.rera } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceJsonLd) }}
      />
      <BreadcrumbJsonLd items={[{ name: project.name, path: `/${project.slug}` }]} />

      {/* hero */}
      <section
        id="hero"
        className="relative flex min-h-dvh flex-col justify-end overflow-hidden text-white"
      >
        <ResponsiveImage
          src={project.heroImage ?? project.image}
          mobileSrc={project.heroImageMobile}
          alt={`${project.name} by AVR Developers`}
          priority
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/40" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-28 lg:px-10 lg:pb-24">
          {project.logo && (
            <div className="relative mb-4 h-14 w-[190px] lg:h-16 lg:w-[220px]">
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                title={`${project.name} logo`}
                fill
                sizes="220px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          )}
          {project.rera && (
            <p className="caps mb-6 inline-block w-fit rounded-xs border border-white/25 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
              RERA: {project.rera}
            </p>
          )}
          <h1 className="font-serif text-4xl font-light leading-none tracking-[-0.03em] sm:text-5xl lg:text-8xl">
            {withBreaks(project.headline ?? project.name)}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[15px] text-white/85">
            {project.configuration}
          </p>
        </div>
      </section>

      {/* about */}
      <section id="about" className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-14 lg:px-10 lg:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-2xl font-light leading-[1.08] sm:text-3xl md:text-5xl">
              {withBreaks(project.aboutHeading ?? "Homes For The|New-age Living Stories")}
            </h2>
            <div
              className={
                project.aboutImageContain
                  ? "relative mt-10 aspect-[5/14] max-w-[280px]"
                  : "relative mt-10 aspect-[16/10] overflow-hidden rounded-sm"
              }
            >
              <Image
                src={project.aboutImage ?? project.image}
                alt={`${project.name} by AVR Developers`}
                title={`${project.name} by AVR Developers`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className={project.aboutImageContain ? "object-contain object-bottom" : "object-cover"}
              />
            </div>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:pt-3">
            {paragraphs(project.about ?? project.blurb).map((para, i) => (
              <p
                key={i}
                className={`text-[15px] leading-relaxed text-ink-70 ${i > 0 ? "mt-4" : ""}`}
              >
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* site plan: Evania's desktop render is near-square (1500x1302) while
          Avira's is a true 16:9 (1920x1080), and both mobile renders are a tall
          9:16 portrait. No single crop box fits all three without cutting into
          one of them, so this uses object-contain (full plan always visible,
          letterboxed on whichever axis doesn't match) inside a capped-height box
          instead of object-cover. */}
      <section id="site-plan" className="scroll-mt-32 px-5 lg:px-10">
        <div className="relative mx-auto h-[70vh] max-h-[600px] max-w-[1330px]">
          <ResponsiveImage
            src={project.sitePlanImage ?? project.image}
            mobileSrc={project.sitePlanImageMobile}
            alt={`${project.name} master site plan`}
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </section>

      {/* amenities (animated icons) */}
      <Amenities heading={project.amenitiesHeading} items={project.amenityItems} />

      {/* video walkthrough */}
      {project.videoId && (
        <ProjectVideo
          videoId={project.videoId}
          title={project.videoTitle ?? project.name}
          playButton={project.videoPlayButton}
        />
      )}

      {/* clubhouse */}
      {project.clubhouseSpaces?.length ? (
        <Clubhouse
          spaces={project.clubhouseSpaces}
          projectName={project.name}
          eyebrow={project.clubEyebrow}
          heading={project.clubHeading}
          body={project.clubBody}
        />
      ) : (
        <section id="club" className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-14 lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="max-w-[16ch] font-serif text-3xl font-light leading-[1.08] md:text-5xl">
              {project.noClubhouseHeading ?? "Life beyond the front door."}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
              {project.noClubhouseBody ??
                "A resident-only club, pool deck, courts and green courtyards, so the best part of the day can happen without leaving home."}
            </p>
          </Reveal>
        </section>
      )}

      {/* floor plans (gated) */}
      {project.floorPlans?.length ? (
        <FloorPlans heading={project.floorPlansHeading} plans={project.floorPlans} />
      ) : null}

      {/* brochure CTA: scrolls to the footer enquiry form (#contact), which
          downloads the brochure on submit, keeping it behind the lead form */}
      {project.brochure && (
        <section id="brochure" className="border-t border-line">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-14 md:grid-cols-12 md:gap-16 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:p-0">
            {/* brochure cover as a slightly tilted booklet, two paper sheets behind it;
                on desktop, solid rose and navy blocks are offset behind it like layered paper */}
            {project.brochureCover && (
              <Reveal className="md:col-span-5 lg:col-span-1 lg:flex lg:items-center lg:justify-center lg:py-24">
                <div className="group relative mx-auto aspect-[11/16] w-[min(300px,78%)] lg:w-[min(340px,70%)]">
                  <div
                    className="absolute -left-[24%] -top-[8%] hidden h-[78%] w-[92%] rounded-xs bg-rose lg:block"
                    style={project.brochureBlocks && { backgroundColor: project.brochureBlocks.front }}
                  />
                  <div
                    className="absolute -bottom-[10%] -right-[26%] hidden h-[58%] w-[72%] rounded-xs bg-ink lg:block"
                    style={project.brochureBlocks && { backgroundColor: project.brochureBlocks.back }}
                  />
                  <div className="absolute inset-0 translate-x-2.5 translate-y-2 rotate-3 rounded-r-sm bg-[#ddd6c9]" />
                  <div className="absolute inset-0 translate-x-1 translate-y-1 rotate-[1.5deg] rounded-r-sm bg-[#efe9df]" />
                  <div className="absolute inset-0 -rotate-3 overflow-hidden rounded-r-sm shadow-[0_30px_50px_-20px_rgba(23,35,59,0.55)] transition-transform duration-700 ease-luxe motion-reduce:transition-none lg:group-hover:-translate-y-1.5 lg:group-hover:rotate-0">
                    <Image
                      src={project.brochureCover}
                      alt={`${project.name} brochure cover`}
                      title={`${project.name} brochure cover`}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                    <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 to-transparent" />
                  </div>
                </div>
              </Reveal>
            )}
            <Reveal index={1} className={`lg:self-center lg:px-16 lg:py-24 xl:px-24 ${project.brochureCover ? "md:col-span-7 lg:col-span-1" : "md:col-span-12 lg:col-span-2"}`}>
              <p className="caps mb-4 text-[12px] font-medium text-accent">
                Brochure
              </p>
              <h2 className="font-serif text-3xl font-light leading-[1.08] md:text-5xl">
                See every detail, page by page.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
                Floor plans, specifications, amenities and location, all in one booklet.
              </p>
              <p className="mb-8 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] tabular-nums text-ink-70">
                <span>{project.name} brochure</span>
                {project.brochurePages && (
                  <>
                    <span className="size-1 rounded-full bg-rose" />
                    <span>{project.brochurePages} pages</span>
                  </>
                )}
                <span className="size-1 rounded-full bg-rose" />
                <span>PDF</span>
              </p>
              {/* scrolls to the footer enquiry form; the PDF downloads after submit */}
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
              >
                <DownloadSimple size={16} weight="bold" />
                Download Brochure
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* gallery (full-bleed carousel) */}
      <div id="gallery" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 pt-14 lg:px-10 lg:pt-28">
          <Reveal>
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              Gallery
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="font-serif text-3xl font-light leading-[1.08] md:whitespace-nowrap md:text-5xl">
              {project.galleryHeading ?? `The ${project.name} Experience`}
            </h2>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProjectGallery name={project.name} gallery={project.gallery ?? []} />
        </div>
      </div>

      {/* location */}
      <LocationSection project={project} />
    </>
  );
}
