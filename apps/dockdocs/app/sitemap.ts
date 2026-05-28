import type { MetadataRoute } from "next";
import {
  blogArticleAlternates,
  blogArticlePath,
  blogArticleSlugs,
} from "@/lib/blog";
import {
  languageAlternates,
  locales,
  localizedPath,
  pathForSlug,
  routeSlugs,
} from "@/lib/i18n";

export const dynamic = "force-static";

const baseUrl = "https://dockdocs.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...routeSlugs.map((slug) =>
      createSitemapEntry(pathForSlug(slug), now, languageAlternates(slug)),
    ),
    ...locales.flatMap((locale) =>
      routeSlugs.map((slug) =>
        createSitemapEntry(
          localizedPath(locale, slug),
          now,
          languageAlternates(slug),
        ),
      ),
    ),
    ...blogArticleSlugs.map((slug) =>
      createSitemapEntry(blogArticlePath(slug), now, blogArticleAlternates(slug)),
    ),
    ...locales.flatMap((locale) =>
      blogArticleSlugs.map((slug) =>
        createSitemapEntry(
          blogArticlePath(slug, locale),
          now,
          blogArticleAlternates(slug),
        ),
      ),
    ),
  ];
}

function createSitemapEntry(
  path: string,
  lastModified: Date,
  languages: Record<string, string>,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path.includes("/blog/")
      ? "weekly"
      : path === "/"
        ? "weekly"
        : "monthly",
    priority: path === "/" ? 1 : path.includes("/blog/") ? 0.7 : 0.6,
    alternates: {
      languages,
    },
  };
}
