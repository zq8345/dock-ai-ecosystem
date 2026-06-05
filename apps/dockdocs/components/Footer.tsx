"use client";

import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { defaultLocale, isLocale } from "@/lib/i18n";

function l(pathname: string | null): string {
  const first = (pathname ?? "/").split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}
function href(path: string, locale: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

const toolCols = [
  {
    title: "AI Workspace",
    links: [
      { label: "Chat with PDF", href: "/chat-with-pdf" },
      { label: "AI Summary", href: "/ai-summary" },
      { label: "OCR Workspace", href: "/ocr" },
    ],
  },
  {
    title: "Convert",
    links: [
      { label: "Word to PDF", href: "/word-to-pdf" },
      { label: "PDF to Word", href: "/pdf-to-word" },
      { label: "Excel to PDF", href: "/excel-to-pdf" },
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
    ],
  },
  {
    title: "Edit",
    links: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "Protect PDF", href: "/protect-pdf" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const locale = l(pathname);

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Top: logo + columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href={href("/", locale)}>
              <BrandMark showWordmark={false} />
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--faint)]">
              AI-powered document tools for PDF workflows.
            </p>
          </div>
          {toolCols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={href(link.href, locale)}
                      className="text-[13px] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[color:var(--faint)]">
            &copy; {new Date().getFullYear()} DockDocs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[color:var(--faint)]">
            <a href={href("/privacy-policy", locale)} className="transition hover:text-[color:var(--muted)]">Privacy</a>
            <a href={href("/terms", locale)} className="transition hover:text-[color:var(--muted)]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
