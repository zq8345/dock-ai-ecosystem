"use client";

import { usePathname } from "next/navigation";

import {
  defaultLocale,
  isLocale,
  localizedPath,
  normalizeSlug,
  type Locale,
} from "@/lib/i18n";

const languageOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "en", label: "EN" },
  { locale: "zh", label: "中文" },
];

function currentRoute(pathname: string | null) {
  const segments = (pathname ?? "/").split("/").filter(Boolean);
  const first = segments[0];
  const locale = isLocale(first) ? first : defaultLocale;
  const slugSegments = isLocale(first) ? segments.slice(1) : segments;
  const slug = normalizeSlug(slugSegments.join("/")) ?? "";

  return { locale, slug };
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale: activeLocale, slug } = currentRoute(pathname);

  return (
    <nav aria-label="Language" className="flex items-center">
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-medium text-slate-500 shadow-sm">
        {languageOptions.map((option) => {
          const isActive = option.locale === activeLocale;

          return (
            <a
              key={option.locale}
              href={localizedPath(option.locale, slug)}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-2.5 py-1 transition ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {option.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
