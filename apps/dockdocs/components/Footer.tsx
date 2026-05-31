"use client";

import { usePathname } from "next/navigation";
import { RelatedTools } from "@/components/RelatedTools";
import { getRuntimeCopy, localeFromPathname } from "@/lib/copy";

export function Footer() {
  const locale = localeFromPathname(usePathname());
  const copy = getRuntimeCopy(locale).shell.footer;

  return (
    <footer className="border-t border-[color:var(--line)]">
      <RelatedTools compact />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-[color:var(--line)] px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[color:var(--muted)]">
          {copy.copyrightPrefix} {new Date().getFullYear()} DockDocs
        </p>
        <nav aria-label={copy.aria}>
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {copy.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
