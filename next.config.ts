import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [20, 72, 75, 82],
  },
  async redirects() {
    return[
      /* project pages moved under their category on 2026-10-08 */
      {
        source: "/avira",
        destination: "/projects/residential/avira",
        permanent: true,
      },
      {
        source: "/evania",
        destination: "/projects/residential/evania",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-project",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/clubhouse",
        destination: "/",
        permanent: true,
      },
      {
        source: "/real-estate-insights",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kokapet-luxury-real-estate-hyderabad-2026",
        destination: "/blog/kokapet-luxury-real-estate-hyderabad-2026",
        permanent: true,
      },
      {
        source: "/our-values",
        destination: "/",
        permanent: true,
      },
      {
        source: "/site-plan",
        destination: "/",
        permanent: true,
      },
      {
        source: "/schedule-a-visit",
        destination: "/",
        permanent: true,
      },
      {
        source: "/layouts/header-simple-classic-grid",
        destination: "/",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
