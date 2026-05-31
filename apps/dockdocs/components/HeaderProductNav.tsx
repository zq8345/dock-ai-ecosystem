"use client";

import { usePathname } from "next/navigation";

import { getRuntimeCopy } from "@/lib/copy";
import { defaultLocale, isLocale, localizedPath, type RouteSlug } from "@/lib/i18n";

function currentRoute(pathname: string | null) {
  const segments = (pathname ?? "/").split("/").filter(Boolean);
  const firstSegment = segments[0];
  const hasLocalePrefix = isLocale(firstSegment);
  const slug = hasLocalePrefix ? segments[1] ?? "" : firstSegment ?? "";

  return {
    locale: hasLocalePrefix ? firstSegment : defaultLocale,
    hasLocalePrefix,
    slug,
  };
}

export function HeaderProductNav() {
  const { locale, hasLocalePrefix, slug: activeSlug } = currentRoute(usePathname());
  const copy = getRuntimeCopy(locale).shell;
  const links = copy.nav;

  return (
    <nav aria-label={copy.header.aria} className="w-full lg:w-auto">
      <ul className="flex flex-wrap gap-1 text-xs font-semibold text-[color:var(--muted)] sm:text-sm">
        {links.map((link) => {
          const slug = "slug" in link ? link.slug : undefined;
          const href = slug
            ? hasLocalePrefix
              ? localizedPath(locale, slug as RouteSlug)
              : link.href
            : link.name === "AI" && hasLocalePrefix
              ? `${localizedPath(locale, "")}#tools`
              : link.href;
          const isActive = Boolean(slug && slug === activeSlug);

          return (
            <li key={`${locale}-${link.name}`}>
              <a
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "block rounded-[var(--radius-sm)] bg-[color:var(--soft-accent)] px-2.5 py-1.5 text-[color:var(--accent-strong)] transition"
                    : "block rounded-[var(--radius-sm)] px-2.5 py-1.5 transition hover:bg-black/5 hover:text-[color:var(--foreground)] dark:hover:bg-white/10"
                }
              >
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
