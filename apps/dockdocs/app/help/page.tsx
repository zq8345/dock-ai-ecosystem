import type { Metadata } from "next";
import { Container, Section } from "@dock/shared/ui";

export const metadata: Metadata = {
  title: "Help Center | DockDocs",
  description:
    "Help for DockDocs uploads, privacy-first PDF workflows, supported formats, and AI document limits.",
  alternates: {
    canonical: "/help/",
  },
};

const helpItems = [
  {
    title: "Uploads",
    description:
      "Use each tool page upload area for the matching format. PDF tools accept PDFs; JPG to PDF accepts JPG, PNG, and WebP images.",
  },
  {
    title: "Privacy-first workflows",
    description:
      "DockDocs is designed around clear document actions, minimal interface noise, and transparent processing states.",
  },
  {
    title: "AI limits",
    description:
      "AI Workspace features are positioned as enhancement layers for OCR, summaries, chat with PDF, and workflow automation.",
  },
  {
    title: "Supported formats",
    description:
      "Core pages cover PDF, JPG, PNG, WebP, scanned PDFs, and editable document conversion workflows.",
  },
];

export default function HelpPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <Section className="border-b border-[#cbd5e1] bg-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
            Help Center
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Help for PDF tools, uploads, privacy, and AI workflows.
          </h1>
        </Container>
      </Section>
      <Section className="bg-[#f8fafc]">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {helpItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-[#334155]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
