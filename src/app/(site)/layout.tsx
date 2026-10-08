import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury 3, 3.5 & 4 BHK Apartments in Kokapet | AVR Developers",
  description:"Explore AVR Developers for luxury 3, 3.5 & 4 BHK apartments in Kokapet with premium amenities, gated living & excellent city connectivity for families.Enquire now!",
  keywords: ["luxury apartments in Kokapet","4 BHK flats in Kokapet Hyderabad","3.5 BHK apartments Kokapet,luxury apartments near Financial District"],
};

/** Shared chrome (nav + footer) for every real page. Excludes not-found.tsx,
 * which lives outside this route group as a bare full-bleed banner. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {/* a page whose content is shorter than the screen can mark itself
          data-fill-ink so the stretched leftover space matches it */}
      <main className="flex-1 has-[[data-fill-ink]]:bg-ink">{children}</main>
      <SiteFooter />
    </div>
  );
}
