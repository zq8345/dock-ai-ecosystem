import { BrandNav } from "@/components/BrandNav";
import { BrandMark } from "@/components/BrandMark";
import { HeaderProductNav } from "@/components/HeaderProductNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UserAccountControls } from "@/components/UserAccountControls";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
          <a href="/" className="min-w-0 shrink-0" aria-label="DockDocs home">
            <BrandMark />
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <HeaderProductNav />
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <BrandNav />
          <UserAccountControls />
          </div>
        </div>
      </div>
    </header>
  );
}
