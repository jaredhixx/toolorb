import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { toolDefinitions } from "../lib/tools/tool-registry";

const staticPages = [
  {
    path: "",
    lastModified: "2026-04-29",
  },
  {
    path: "/tools",
    lastModified: "2026-04-29",
  },
  {
    path: "/about",
    lastModified: "2026-04-29",
  },
  {
    path: "/contact",
    lastModified: "2026-04-29",
  },
  {
    path: "/privacy",
    lastModified: "2026-04-29",
  },
  {
    path: "/terms",
    lastModified: "2026-04-29",
  },
  {
    path: "/disclaimer",
    lastModified: "2026-04-29",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(page.lastModified),
  }));

  const toolEntries: MetadataRoute.Sitemap = toolDefinitions.map((tool) => ({
    url: `${baseUrl}${tool.seo.canonicalPath}`,
    lastModified: new Date(tool.meta.lastUpdated),
  }));

  return [...staticEntries, ...toolEntries];
}