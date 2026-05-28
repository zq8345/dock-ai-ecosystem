import { BrandNav } from "@/components/BrandNav";

const productLinks = [
  { name: "PDF Tools", href: "/" },
  { name: "Compress", href: "/compress-pdf" },
  { name: "Merge", href: "/merge-pdf" },
  { name: "Split", href: "/split-pdf" },
  { name: "OCR", href: "/ocr-pdf" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "AI Workspace", href: "/ai-workspace" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e7dd] bg-[#fbfbf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dfdfd5] bg-white text-xs font-bold">
              DD
            </span>
            <span>DockDocs</span>
          </a>
          <BrandNav />
        </div>
        <nav aria-label="DockDocs product navigation">
          <ul className="flex gap-1 overflow-x-auto rounded-full border border-[#e2e2d8] bg-white p-1 text-sm shadow-sm">
            {productLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="block rounded-full px-3 py-2 text-[#66665d] transition hover:bg-[#f1f1e8] hover:text-[#171717]"
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
