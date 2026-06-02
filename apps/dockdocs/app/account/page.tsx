import type { Metadata } from "next";
import { CommercialAccountClient } from "@/components/CommercialAccountClient";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Create a DockDocs account, manage subscription status, view usage, and upgrade billing.",
  alternates: {
    canonical: "/account/",
  },
};

export default function AccountPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Account
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Register, manage usage, and upgrade DockDocs.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Create an account with Netlify Identity, review local usage metering,
            and start Stripe Checkout for Plus or Pro. Original PDF files are
            not stored by the account layer.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CommercialAccountClient />
        </div>
      </section>
    </main>
  );
}
