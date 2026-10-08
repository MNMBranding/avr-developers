import type { MetadataRoute } from "next";
import { commercialProjectPath, commercialProjects, projectPath, projects, site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/projects",
    "/projects/residential",
    "/projects/commercial",
    "/about",
    "/blog",
    "/careers",
    "/contact",
    "/privacy-policy",
  ];

  return [
    ...routes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/privacy-policy" ? 0.3 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${site.url}${projectPath(p)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...commercialProjects.filter((p) => p.pageLive).map((p) => ({
      url: `${site.url}${commercialProjectPath(p)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
