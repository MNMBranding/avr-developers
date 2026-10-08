"use client";

import { useState, type ReactNode } from "react";

const filters = ["All", "Ongoing", "Completed", "Coming Soon"] as const;
type Filter = (typeof filters)[number];

const emptyMessage: Record<Exclude<Filter, "All">, string> = {
  Ongoing: "No ongoing projects yet.",
  Completed: "No completed projects yet.",
  "Coming Soon": "No upcoming projects yet.",
};

/**
 * All / Ongoing / Completed / Coming Soon pills above a list of project
 * cards. Every card stays in the markup (non-matching ones are `hidden`), so
 * crawlers see every project whichever filter is active. `showFilter={false}`
 * hides the pills and just lists every card.
 */
export function ProjectStatusFilter({
  items,
  showFilter = true,
}: {
  items: { key: string; status: string; card: ReactNode }[];
  showFilter?: boolean;
}) {
  const [active, setActive] = useState<Filter>("All");
  const matches = (status: string) => active === "All" || status === active;
  const visibleCount = items.filter((item) => matches(item.status)).length;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        {showFilter && (
          <div
            role="group"
            aria-label="Filter projects by status"
            className="flex rounded-full border border-line-strong p-1 sm:inline-flex sm:gap-1.5 sm:p-1.5"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
                className={`min-h-11 flex-auto uppercase whitespace-nowrap rounded-full px-1.5 text-[10px] font-medium tracking-[0.06em] transition-colors max-[359px]:px-1 max-[359px]:text-[9.5px] max-[359px]:tracking-normal min-[400px]:px-3 min-[400px]:tracking-[0.12em] min-[400px]:text-[11px] sm:flex-none sm:px-6 sm:text-[12px] ${
                  active === filter
                    ? "bg-ink text-white"
                    : "text-ink lg:hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        <div className={`flex flex-col gap-10 ${showFilter ? "mt-12" : ""}`}>
          {items.map((item) => (
            <div key={item.key} hidden={!matches(item.status)}>
              {item.card}
            </div>
          ))}
          {visibleCount === 0 && active !== "All" && (
            <p className="border-y border-line py-16 text-center font-serif text-2xl font-light text-ink-70">
              {emptyMessage[active]}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
