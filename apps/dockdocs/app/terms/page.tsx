import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for DockDocs PDF tools, document workflows, and AI document workspace features.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Terms</h1>
      <p className="mt-5 leading-7 text-[color:var(--muted)]">
        These terms outline the expected use of DockDocs PDF tools, simulated
        workflow states, AI document enhancements, and future processing
        capabilities. Production terms should be finalized before public launch.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          "Use the tools for lawful document workflows",
          "Review outputs before sharing or filing documents",
          "AI features may assist but do not replace professional review",
          "Production processing rules will be documented before launch",
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
