"use client";

import { usePathname } from "next/navigation";

import { getRuntimeCopy } from "@/lib/copy";
import { defaultLocale, isLocale, localizedPath, type RouteSlug } from "@/lib/i18n";

function currentRoute(pathname: string | null) {
  const firstSegment = (pathname ?? "/").split("/").filter(Boolean)[0];
  const hasLocalePrefix = isLocale(firstSegment);

  return {
    locale: hasLocalePrefix ? firstSegment : defaultLocale,
    hasLocalePrefix,
  };
}

export function HeaderProductNav() {
  const { locale, hasLocalePrefix } = currentRoute(usePathname());
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

          return (
            <li key={`${locale}-${link.name}`}>
              <a
                href={href}
                className="block rounded-md px-2.5 py-1.5 transition hover:bg-black/5 hover:text-[color:var(--foreground)] dark:hover:bg-white/10"
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
