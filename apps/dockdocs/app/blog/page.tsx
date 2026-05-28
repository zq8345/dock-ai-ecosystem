import type { Metadata } from "next";
import { Container, Section } from "@dock/shared/ui";

export const metadata: Metadata = {
  title: "Resources and Blog | DockDocs",
  description:
    "DockDocs resources for PDF tools, OCR workflows, JPG to PDF conversion, and AI document productivity.",
  alternates: {
    canonical: "/blog/",
  },
};

const topics = [
  {
    title: "PDF workflow guides",
    description:
      "Practical guides for compressing, merging, splitting, and preparing PDF files for office work.",
  },
  {
    title: "Conversion resources",
    description:
      "Future articles for JPG to PDF, PDF to Word, scanned documents, and file handoff workflows.",
  },
  {
    title: "AI document productivity",
    description:
      "Resources for OCR, AI Summary, Chat with PDF, and document automation patterns.",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <Section className="border-b border-[#cbd5e1] bg-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
            Resources
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            PDF tools and AI document workflow resources.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#334155]">
            This page is prepared as the DockDocs content hub for future
            product guides, SEO articles, workflow explainers, and AI document
            productivity resources.
          </p>
        </Container>
      </Section>
      <Section className="bg-[#f8fafc]">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {topics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm"
              >
                <h2 className="text-xl font-semibold">{topic.title}</h2>
                <p className="mt-3 leading-7 text-[#334155]">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
