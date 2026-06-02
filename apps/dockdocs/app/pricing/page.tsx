import type { Metadata } from "next";
import { PricingPlans } from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DockDocs Free, Plus, and Pro pricing for AI document workspace usage.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function PricingPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Pricing
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Simple plans for DockDocs usage.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Free keeps core document workflows available. Plus and Pro unlock
            higher usage limits through Stripe Checkout when billing is
            configured.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PricingPlans />
        </div>
      </section>
    </main>
  );
}
