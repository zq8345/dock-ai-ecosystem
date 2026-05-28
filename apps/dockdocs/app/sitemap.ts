import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://dockdocs.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const localPages = [
    "/",
    "/jpg-to-pdf/",
    "/compress-pdf/",
    "/merge-pdf/",
    "/split-pdf/",
    "/pdf-to-word/",
    "/ocr-pdf/",
    "/ai-workspace/",
    "/about/",
    "/blog/",
    "/help/",
    "/faq/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/sitemap/",
  ];
  const now = new Date();

  return [
    ...localPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.6,
    })),
  ];
}
