import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for DockDocs privacy-first PDF tools and AI document workflows.",
  alternates: {
    canonical: "/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-5 leading-7 text-[color:var(--muted)]">
        DockDocs is designed around privacy-first PDF workflows. Production
        processing policies, upload handling, retention windows, and AI feature
        limits should be documented here before launch.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          "Clear upload expectations for every tool",
          "Document processing states before result export",
          "AI features presented as optional enhancements",
          "Future policy space for retention and deletion details",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm"
          >
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
