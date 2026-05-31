"use client";

import { usePathname } from "next/navigation";

import { defaultLocale, isLocale, localizedPath, type Locale } from "@/lib/i18n";

const navCopy: Record<
  Locale,
  Array<{ name: string; href: string; localizedSlug?: "pdf-to-word" | "compress-pdf" }>
> = {
  en: [
    { name: "AI", href: "/#ai" },
    { name: "Convert", href: "/pdf-to-word", localizedSlug: "pdf-to-word" },
    { name: "Optimize", href: "/compress-pdf", localizedSlug: "compress-pdf" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Chats", href: "/my-chats" },
  ],
  zh: [
    { name: "AI", href: "/zh/#tools" },
    { name: "转换", href: "/pdf-to-word", localizedSlug: "pdf-to-word" },
    { name: "优化", href: "/compress-pdf", localizedSlug: "compress-pdf" },
    { name: "控制台", href: "/dashboard" },
    { name: "我的对话", href: "/my-chats" },
  ],
};

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
  const links = navCopy[locale];

  return (
    <nav aria-label="DockDocs navigation" className="w-full lg:w-auto">
      <ul className="flex flex-wrap gap-1 text-xs font-semibold text-[color:var(--muted)] sm:text-sm">
        {links.map((link) => {
          const href = link.localizedSlug
            ? hasLocalePrefix
              ? localizedPath(locale, link.localizedSlug)
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
