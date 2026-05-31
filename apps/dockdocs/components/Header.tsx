import { BrandNav } from "@/components/BrandNav";
import { BrandMark } from "@/components/BrandMark";
import { HeaderProductNav } from "@/components/HeaderProductNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UserAccountControls } from "@/components/UserAccountControls";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <a href="/" className="shrink-0" aria-label="DockDocs home">
          <BrandMark />
        </a>
        <HeaderProductNav />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <BrandNav />
          <LanguageSwitcher />
          <UserAccountControls />
        </div>
      </div>
    </header>
  );
}
