import type { Metadata } from "next";
import { indexableRoutes } from "@/shared/seo/routes";

export const metadata: Metadata = {
  title: "Sitemap — DockDocs",
  description: "Complete sitemap of all DockDocs PDF tool pages and resources.",
  alternates: { canonical: "/sitemap/" },
};

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
      <h1 className="text-[28px] font-semibold tracking-[-0.014em]">Sitemap</h1>
      <p className="mt-2 text-[14px] text-[color:var(--muted)]">All DockDocs pages and tools.</p>
      <ul className="mt-8 space-y-1.5">
        {indexableRoutes.map((page) => (
          <li key={page.path}>
            <a href={page.path} className="text-[13px] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]">{page.name}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
