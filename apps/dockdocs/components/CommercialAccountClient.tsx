"use client";

import { useEffect, useState } from "react";
import {
  getUser,
  handleAuthCallback,
  login,
  logout,
  oauthLogin,
  onAuthChange,
  signup,
  type User,
} from "@netlify/identity";
import {
  billingPlans,
  createCheckoutSession,
  markCheckoutSuccess,
  readBillingSnapshot,
  type BillingSnapshot,
  type BillingTier,
} from "@/lib/billing-runtime";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
};

export function CommercialAccountClient() {
  const [user, setUser] = useState<User | null>(null);
  const [snapshot, setSnapshot] = useState<BillingSnapshot | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await handleAuthCallback();
        const currentUser = await getUser();
        const search = new URLSearchParams(window.location.search);
        const checkout = search.get("checkout");
        const tier = search.get("tier") as BillingTier | null;
        const sessionId = search.get("session_id");

        if (
          checkout === "success" &&
          (tier === "PLUS" || tier === "PRO") &&
          sessionId
        ) {
          await markCheckoutSuccess({ tier, sessionId });
          window.history.replaceState({}, "", "/account/");
          setMessage("Payment received. Your local subscription status is active.");
        }

        if (mounted) {
          setUser(currentUser);
          setSnapshot(await readBillingSnapshot());
          setLoading(false);
        }
      } catch (loadError) {
        if (mounted) {
          setError(getErrorMessage(loadError));
          setLoading(false);
        }
      }
    }

    load();
    const unsubscribe = onAuthChange(async (_event, nextUser) => {
      setUser(nextUser);
      setSnapshot(await readBillingSnapshot());
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  async function refreshSnapshot() {
    setSnapshot(await readBillingSnapshot());
  }

  async function handleSignup() {
    setError("");
    setMessage("");
    try {
      const nextUser = await signup(form.email, form.password, {
        full_name: form.name,
      });
      setUser(nextUser);
      setForm(initialForm);
      const emailVerified = Boolean(
        (nextUser as User & { emailVerified?: boolean }).emailVerified,
      );
      setMessage(
        emailVerified
          ? "Account created. You are signed in."
          : "Account created. Check your email to confirm access.",
      );
      await refreshSnapshot();
    } catch (signupError) {
      setError(getErrorMessage(signupError));
    }
  }

  async function handleLogin() {
    setError("");
    setMessage("");
    try {
      const nextUser = await login(form.email, form.password);
      setUser(nextUser);
      setForm(initialForm);
      setMessage("Signed in.");
      await refreshSnapshot();
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    }
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    setSnapshot(await readBillingSnapshot());
  }

  async function handleUpgrade(tier: BillingTier) {
    setError("");
    setMessage("");
    if (tier === "FREE") {
      return;
    }

    if (!user) {
      setError("Create an account or sign in before upgrading.");
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
      setError(getErrorMessage(checkoutError));
    }
  }

  if (loading) {
    return (
      <section className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
        <p className="text-sm font-semibold text-[color:var(--muted)]">
          Loading account...
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="grid gap-6">
        <div className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
            Account
          </p>
          {user ? (
            <div className="mt-4 grid gap-4">
              <div>
                <h2 className="break-words text-2xl font-semibold">
                  {user.name || user.email}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  User ID: {user.id}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="min-h-11 rounded-[var(--radius-sm)] border border-[color:var(--line)] px-4 text-sm font-semibold text-[color:var(--foreground)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-4">
              <div className="grid grid-cols-2 gap-2 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-1">
                {(["signup", "login"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={
                      mode === item
                        ? "min-h-10 rounded-[var(--radius-sm)] bg-[color:var(--foreground)] px-3 text-sm font-semibold text-[color:var(--background)]"
                        : "min-h-10 rounded-[var(--radius-sm)] px-3 text-sm font-semibold text-[color:var(--muted)]"
                    }
                  >
                    {item === "signup" ? "Sign up" : "Login"}
                  </button>
                ))}
              </div>

              {mode === "signup" ? (
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Name"
                  className="min-h-11 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 text-sm outline-none"
                />
              ) : null}
              <input
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Email"
                type="email"
                className="min-h-11 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 text-sm outline-none"
              />
              <input
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="Password"
                type="password"
                className="min-h-11 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={mode === "signup" ? handleSignup : handleLogin}
                disabled={!form.email || !form.password}
                className="min-h-11 rounded-[var(--radius-sm)] bg-[color:var(--accent)] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mode === "signup" ? "Create account" : "Login"}
              </button>
              <button
                type="button"
                onClick={() => oauthLogin("google")}
                className="min-h-11 rounded-[var(--radius-sm)] border border-[color:var(--line)] px-4 text-sm font-semibold text-[color:var(--foreground)]"
              >
                Continue with Google
              </button>
            </div>
          )}

          {message ? (
            <p className="mt-4 rounded-[var(--radius-sm)] border border-[color:var(--success-line)] bg-[color:var(--success-surface)] p-3 text-sm font-semibold text-[color:var(--success)]">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="mt-4 rounded-[var(--radius-sm)] border border-[color:var(--error-line)] bg-[color:var(--error-surface)] p-3 text-sm font-semibold text-[color:var(--error)]">
              {error}
            </p>
          ) : null}
        </div>

        <SubscriptionCard snapshot={snapshot} />
      </div>

      <div className="grid gap-6">
        <PlanCards
          activeTier={snapshot?.subscription.tier ?? "FREE"}
          onUpgrade={handleUpgrade}
        />
        <UsageTable snapshot={snapshot} />
      </div>
    </section>
  );
}

function SubscriptionCard({ snapshot }: { snapshot: BillingSnapshot | null }) {
  const subscription = snapshot?.subscription;
  return (
    <section className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
        Subscription
      </p>
      <h2 className="mt-2 text-3xl font-semibold">
        {subscription?.tier ?? "FREE"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
        Status: {subscription?.status ?? "free"} · Source:{" "}
        {subscription?.source ?? "local"}
      </p>
      {subscription?.stripeSessionId ? (
        <p className="mt-2 break-words text-xs text-[color:var(--muted)]">
          Stripe checkout session: {subscription.stripeSessionId}
        </p>
      ) : null}
    </section>
  );
}

function PlanCards({
  activeTier,
  onUpgrade,
}: {
  activeTier: BillingTier;
  onUpgrade: (tier: BillingTier) => void;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {billingPlans.map((plan) => (
        <article
          key={plan.tier}
          className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
            {plan.name}
          </p>
          <h3 className="mt-2 text-3xl font-semibold">{plan.price}</h3>
          <p className="mt-3 min-h-16 text-sm leading-6 text-[color:var(--muted)]">
            {plan.description}
          </p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[color:var(--muted)]">
            {plan.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onUpgrade(plan.tier)}
            disabled={plan.tier === "FREE" || plan.tier === activeTier}
            className="mt-5 min-h-11 w-full rounded-[var(--radius-sm)] bg-[color:var(--foreground)] px-4 text-sm font-semibold text-[color:var(--background)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {plan.tier === activeTier ? "Current plan" : plan.cta}
          </button>
        </article>
      ))}
    </section>
  );
}

function UsageTable({ snapshot }: { snapshot: BillingSnapshot | null }) {
  return (
    <section className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
        Usage metering
      </p>
      <div className="mt-4 grid gap-3">
        {(snapshot?.usage ?? []).map((item) => (
          <div
            key={item.feature}
            className="grid gap-2 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-3 text-sm sm:grid-cols-[minmax(0,1fr)_120px_120px]"
          >
            <p className="font-semibold">{featureLabel(item.feature)}</p>
            <p className="text-[color:var(--muted)]">
              {item.used}/{item.limit}
            </p>
            <p className="text-[color:var(--muted)]">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function featureLabel(feature: string) {
  return feature
    .replace(/([A-Z])/g, " $1")
    .replace(/^./u, (letter) => letter.toUpperCase());
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Account action failed.";
}
