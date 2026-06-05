import type { Metadata } from "next";
import { AccountClient } from "@/components/AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Sign in to DockDocs with Google. Access your workspace, manage billing, and track document usage.",
  alternates: {
    canonical: "/account/",
  },
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
            Account
          </p>
          <h1 className="mt-4 text-[28px] font-semibold tracking-[-0.014em]">
            Sign in to DockDocs
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
            Access your workspace, manage billing, and keep your document history
            across devices.
          </p>
        </div>

        <AccountClient />
      </div>
    </div>
  );
}
