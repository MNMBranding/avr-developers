import { CoverImage } from "@/components/ui/cover-image";

const principles = [
  {
    title: "Future-focused design",
    body: "Contemporary homes that evolve with changing lifestyles and aspirations.",
  },
  {
    title: "Quality & experience",
    body: "Thoughtfully crafted spaces with premium amenities and lasting value.",
  },
  {
    title: "Trust & innovation",
    body: "Experience combined with fresh thinking to create meaningful living experiences.",
  },
];

/* /projects intro: who AVR is and how it works, photo on the left. */
export function ProjectsAbout() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-[72px] lg:px-10 lg:py-32">
      <CoverImage
        src="/about/about-section.webp"
        mobileSrc="/about/about-section-mobile.webp"
        alt="Club Evania, an AVR Developers residence"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="aspect-[4/5] rounded-sm"
      />

      <div>
        <p className="caps text-[11px] font-medium text-accent">About AVR</p>
        <h2 className="mt-4 max-w-[20ch] font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] md:text-5xl">
          Excellence in every square foot.
        </h2>
        <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-ink-70">
          AVR Group creates new-age living spaces that respond to evolving lifestyles through fresh
          design, premium amenities, and a powerful blend of innovation, experience, and trust.
        </p>

        <h3 className="caps mt-12 text-[11px] font-medium text-ink-55">How we work</h3>
        <dl className="mt-4 border-b border-line">
          {principles.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-t border-line py-5 sm:grid-cols-[200px_1fr] sm:gap-4"
            >
              <dt className="font-serif text-[19px]">{item.title}</dt>
              <dd className="text-[14px] leading-relaxed text-ink-70">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
