import { BrandNav } from "@/components/BrandNav";

const productLinks = [
  { name: "PDF Tools", href: "/", primary: true },
  { name: "Compress", href: "/compress-pdf" },
  { name: "Merge", href: "/merge-pdf" },
  { name: "Split", href: "/split-pdf" },
  { name: "OCR", href: "/ocr-pdf" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "AI Workspace", href: "/ai-workspace" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#cbd5e1] bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#0f172a]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] text-xs font-bold text-white">
              DD
            </span>
            <span>DockDocs</span>
          </a>
          <BrandNav />
        </div>
        <nav aria-label="DockDocs product navigation">
          <ul className="flex gap-1 overflow-x-auto rounded-full border border-[#cbd5e1] bg-white p-1 text-sm shadow-sm">
            {productLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className={
                    link.primary
                      ? "block rounded-full bg-[#0f172a] px-3 py-2 font-semibold text-white transition hover:bg-[#111827]"
                      : "block rounded-full px-3 py-2 font-medium text-[#1f2937] transition hover:bg-[#e2e8f0] hover:text-[#0f172a]"
                  }
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

