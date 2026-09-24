import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const SITE_URL = "https://auwalabubakar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/resume`, lastModified: now, priority: 0.8 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
  ];
}
