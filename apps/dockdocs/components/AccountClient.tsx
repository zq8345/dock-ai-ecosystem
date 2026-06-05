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
import { getDockAccountState } from "@/lib/account-runtime";
import {
  createBillingCheckoutSession,
  createBillingPortalSession,
  getSubscriptionSnapshot,
  type SubscriptionSnapshot,
} from "@/lib/subscription-runtime";
import type { PaidSubscriptionPlan } from "@/lib/billing-config";

type AuthView = "loading" | "signed-out" | "sign-in" | "sign-up" | "signed-in";

const futureProviders = [
  { name: "Microsoft", icon: "⊞" },
  { name: "Apple", icon: "" },
  { name: "Email", icon: "✉" },
];

export function AccountClient() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionSnapshot | null>(null);
  const [view, setView] = useState<AuthView>("loading");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [billingLoading, setBillingLoading] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await handleAuthCallback();
        const currentUser = await getUser();
        if (!mounted) return;

        if (currentUser) {
          setUser(currentUser);
          setView("signed-in");
          const sub = await getSubscriptionSnapshot();
          setSubscription(sub);
        } else {
          setView("signed-out");
        }
      } catch {
        if (mounted) setView("signed-out");
      }
    }

    load();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsub = (onAuthChange as any)((changedUser: User | null) => {
      if (!mounted) return;
      setUser(changedUser);
      if (changedUser) {
        setView("signed-in");
      } else {
        setView("signed-out");
        setSubscription(null);
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  async function handleGoogleSignIn() {
    setError("");
    setMessage("Redirecting to Google...");
    try {
      await oauthLogin("google");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setMessage("");
    }
  }

  async function handleSignOut() {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await signup(form.email, form.password, { full_name: form.name });
      setMessage("Check your email to confirm your account.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    }
  }

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    }
  }

  async function handleBilling(plan: PaidSubscriptionPlan) {
    setBillingLoading(plan);
    setError("");
    try {
      await createBillingCheckoutSession(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBillingLoading("");
    }
  }

  async function handlePortal() {
    setBillingLoading("portal");
    setError("");
    try {
      await createBillingPortalSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Portal failed");
      setBillingLoading("");
    }
  }

  // ── Loading ──
  if (view === "loading") {
    return (
      <div className="mt-10 flex justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[color:var(--line)] border-t-[color:var(--accent)]" />
      </div>
    );
  }

  // ── Signed out ──
  if (view === "signed-out") {
    return (
      <div className="mt-8 space-y-5">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[14px] font-semibold transition hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-raised)]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {message && (
          <p className="rounded-[var(--radius-sm)] bg-[color:var(--success-surface)] px-3 py-2 text-[13px] text-[color:var(--success)]">{message}</p>
        )}
        {error && (
          <p className="rounded-[var(--radius-sm)] bg-[color:var(--error-surface)] px-3 py-2 text-[13px] text-[color:var(--error)]">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[color:var(--line)]" />
          <span className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--faint)]">or</span>
          <div className="h-px flex-1 bg-[color:var(--line)]" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setView("sign-in")}
            className="w-full rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-2.5 text-[13px] font-medium text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)]"
          >
            Sign in with email
          </button>
          <p className="text-center text-[12px] text-[color:var(--faint)]">
            No account?{" "}
            <button type="button" onClick={() => setView("sign-up")} className="font-medium text-[color:var(--accent-strong)] hover:underline">
              Create one
            </button>
          </p>
        </div>

        <div className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">Coming soon</p>
          <div className="mt-3 space-y-2">
            {futureProviders.map((p) => (
              <div key={p.name} className="flex items-center gap-3 text-[13px] text-[color:var(--faint)]">
                <span className="w-5 text-center">{p.icon}</span>
                <span>{p.name}</span>
                <span className="ml-auto text-[11px] opacity-60">Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Email sign-up ──
  if (view === "sign-up") {
    return (
      <div className="mt-8 space-y-4">
        <form onSubmit={handleEmailSignUp} className="space-y-3">
          <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-[14px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-[14px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]" />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} className="w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-[14px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]" />
          <button type="submit" className="w-full rounded-[var(--radius)] bg-[color:var(--accent)] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[color:var(--accent-hover)]">Create account</button>
        </form>
        {message && <p className="rounded-[var(--radius-sm)] bg-[color:var(--success-surface)] px-3 py-2 text-[13px] text-[color:var(--success)]">{message}</p>}
        {error && <p className="rounded-[var(--radius-sm)] bg-[color:var(--error-surface)] px-3 py-2 text-[13px] text-[color:var(--error)]">{error}</p>}
        <button type="button" onClick={() => setView("signed-out")} className="w-full text-center text-[12px] text-[color:var(--muted)] hover:text-[color:var(--foreground)]">&larr; Back</button>
      </div>
    );
  }

  // ── Email sign-in ──
  if (view === "sign-in") {
    return (
      <div className="mt-8 space-y-4">
        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-[14px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]" />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-[14px] text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]" />
          <button type="submit" className="w-full rounded-[var(--radius)] bg-[color:var(--accent)] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[color:var(--accent-hover)]">Sign in</button>
        </form>
        {error && <p className="rounded-[var(--radius-sm)] bg-[color:var(--error-surface)] px-3 py-2 text-[13px] text-[color:var(--error)]">{error}</p>}
        <button type="button" onClick={() => setView("signed-out")} className="w-full text-center text-[12px] text-[color:var(--muted)] hover:text-[color:var(--foreground)]">&larr; Back</button>
      </div>
    );
  }

  // ── Signed in ──
  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-[14px] font-semibold text-white">
            {(user?.userMetadata as Record<string,string> | undefined)?.full_name?.charAt(0) ?? user?.email?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-[15px] font-semibold">{(user?.userMetadata as Record<string,string> | undefined)?.full_name || user?.email}</p>
            <p className="text-[13px] text-[color:var(--muted)]">{user?.email}</p>
          </div>
          <span className="ml-auto rounded-full bg-[color:var(--success-surface)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--success)]">Signed in</span>
        </div>
      </div>

      {subscription && (
        <div className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">Current plan</p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[18px] font-semibold">{subscription.displayName}</p>
              <p className="text-[12px] text-[color:var(--muted)]">{subscription.statusLabel}</p>
            </div>
            {subscription.displayName === "Free" ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => handleBilling("PLUS")} disabled={billingLoading === "PLUS"} className="rounded-[var(--radius-sm)] border border-[color:var(--line)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[color:var(--foreground)] disabled:opacity-50">
                  {billingLoading === "PLUS" ? "Loading..." : "Upgrade to Plus"}
                </button>
                <button type="button" onClick={() => handleBilling("PRO")} disabled={billingLoading === "PRO"} className="rounded-[var(--radius-sm)] bg-[color:var(--accent)] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[color:var(--accent-hover)] disabled:opacity-50">
                  {billingLoading === "PRO" ? "Loading..." : "Upgrade to Pro"}
                </button>
              </div>
            ) : (
              <button type="button" onClick={handlePortal} disabled={billingLoading === "portal"} className="rounded-[var(--radius-sm)] border border-[color:var(--line)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--muted)] transition hover:border-[color:var(--line-strong)] disabled:opacity-50">
                {billingLoading === "portal" ? "Loading..." : "Manage billing"}
              </button>
            )}
          </div>
        </div>
      )}

      {error && <p className="rounded-[var(--radius-sm)] bg-[color:var(--error-surface)] px-3 py-2 text-[13px] text-[color:var(--error)]">{error}</p>}

      <button type="button" onClick={handleSignOut} className="w-full rounded-[var(--radius)] border border-[color:var(--error-line)] px-4 py-2.5 text-[13px] font-medium text-[color:var(--error)] transition hover:bg-[color:var(--error-surface)]">
        Sign out
      </button>
    </div>
  );
}
