import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CoverImage } from "@/components/ui/cover-image";

const categories = [
  {
    label: "Residential",
    caption: "Luxury 3, 3.5 & 4 BHK homes in Kokapet",
    href: "/projects/residential",
    // 5:4 card on desktop, 4:5 below lg, so each breakpoint gets an Evania render cut to that shape
    image: "/projects/evania-category-card.webp",
    mobileImage: "/projects/evania-project-card.webp",
    alt: "Evania, a residential project by AVR Developers",
  },
  {
    label: "Commercial",
    caption: "Coming Soon",
    href: "/projects/commercial",
    image: "/projects/aroha-render.webp",
    alt: "Aroha, an upcoming commercial project by AVR Developers",
  },
];

/* /projects: one photo card per category, each linking to its own page. */
export function ProjectCategories() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <p className="caps text-[11px] font-medium text-accent">Our Projects</p>
        <h2 className="mt-4 font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] md:text-5xl">
          Explore by category.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative block overflow-hidden rounded-sm text-white"
            >
              <CoverImage
                src={category.image}
                mobileSrc={category.mobileImage}
                alt={category.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[4/5] lg:aspect-[5/4]"
                imageClassName="transition-transform duration-700 ease-out lg:group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10">
                <div>
                  <h3 className="font-serif text-4xl font-normal lg:text-[3rem]">{category.label}</h3>
                  <p className="mt-2 text-[14.5px] text-white/80">{category.caption}</p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent bg-accent transition-colors lg:border-white/40 lg:bg-transparent lg:group-hover:border-accent lg:group-hover:bg-accent">
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="transition-transform duration-300 lg:group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
