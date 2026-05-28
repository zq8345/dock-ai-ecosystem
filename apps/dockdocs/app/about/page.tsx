import type { Metadata } from "next";
import { ButtonLink, Container, Section } from "@dock/shared/ui";

export const metadata: Metadata = {
  title: "About DockDocs",
  description:
    "Learn about DockDocs, a privacy-first PDF tools platform evolving into an AI document workflow workspace.",
  alternates: {
    canonical: "/about/",
  },
};

const principles = [
  "PDF tools first, AI only where it improves the workflow",
  "Clear upload, processing, result, and export states",
  "Privacy-first document work for global productivity",
  "A cohesive platform for PDF conversion, OCR, summaries, and document reuse",
];

export default function AboutPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <Section className="border-b border-[#cbd5e1] bg-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
            About DockDocs
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Privacy-first PDF workflows with an AI document layer.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#334155]">
            DockDocs is being built as a practical PDF tools platform for
            everyday document work: compressing, merging, splitting, converting,
            OCR, and preparing documents for AI-assisted review.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/jpg-to-pdf">Start with JPG to PDF</ButtonLink>
            <ButtonLink href="/ai-workspace" variant="outline">
              View AI Workspace
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section className="bg-[#f8fafc]">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm"
              >
                <p className="font-semibold">{principle}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
