"use client";

import { usePathname } from "next/navigation";
import { getRuntimeCopy, localeFromPathname } from "@/lib/copy";

export function BrandNav() {
  const locale = localeFromPathname(usePathname());
  const copy = getRuntimeCopy(locale).shell.brand;

  return (
    <nav aria-label={copy.aria}>
      <ul className="flex flex-wrap items-center gap-1 text-xs sm:flex-nowrap sm:gap-2 sm:text-sm">
        {copy.products.map((tool) => (
          <li key={tool.href} className="shrink-0">
            <a
              href={tool.href}
              className="block rounded-[var(--radius-sm)] px-2 py-1.5 text-[color:var(--muted)] transition hover:bg-black/5 hover:text-[color:var(--foreground)] sm:px-3 sm:py-2 dark:hover:bg-white/10"
            >
              {tool.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
