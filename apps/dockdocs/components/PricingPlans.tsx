"use client";

import { useEffect, useState } from "react";
import { getUser, handleAuthCallback, type User } from "@netlify/identity";
import {
  billingPlans,
  createCheckoutSession,
  readBillingSnapshot,
  type BillingTier,
} from "@/lib/billing-runtime";

export function PricingPlans() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTier, setActiveTier] = useState<BillingTier>("FREE");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      await handleAuthCallback().catch(() => undefined);
      const currentUser = await getUser();
      const snapshot = await readBillingSnapshot();
      if (mounted) {
        setUser(currentUser);
        setActiveTier(snapshot.subscription.tier);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function startCheckout(tier: BillingTier) {
    setError("");
    if (tier === "FREE") {
      return;
    }

    if (!user) {
      window.location.href = `/account/?plan=${tier}`;
      return;
    }

    try {
      const url = await createCheckoutSession({
        tier,
        userId: user.id,
        email: user.email,
      });
      window.location.href = url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Billing is not configured yet.",
      );
    }
  }

  return (
    <section className="grid gap-6">
      {error ? (
        <div
          role="alert"
          className="rounded-[var(--radius)] border border-[color:var(--error-line)] bg-[color:var(--error-surface)] p-4 text-sm font-semibold text-[color:var(--error)]"
        >
          {error}
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-3">
        {billingPlans.map((plan) => (
          <article
            key={plan.tier}
            className="flex h-full flex-col rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
              {plan.name}
            </p>
            <h2 className="mt-3 text-4xl font-semibold">{plan.price}</h2>
            <p className="mt-4 min-h-20 text-sm leading-6 text-[color:var(--muted)]">
              {plan.description}
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[color:var(--muted)]">
              {plan.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => startCheckout(plan.tier)}
              disabled={plan.tier === "FREE" || plan.tier === activeTier}
              className="mt-6 min-h-11 w-full rounded-[var(--radius-sm)] bg-[color:var(--foreground)] px-4 text-sm font-semibold text-[color:var(--background)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {plan.tier === activeTier ? "Current plan" : plan.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
