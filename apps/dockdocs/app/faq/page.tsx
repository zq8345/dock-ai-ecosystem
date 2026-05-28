import type { Metadata } from "next";
import { Container, Section } from "@dock/shared/ui";

export const metadata: Metadata = {
  title: "FAQ | DockDocs",
  description:
    "Frequently asked questions about DockDocs PDF tools, privacy-first workflows, OCR, AI Summary, and Chat with PDF.",
  alternates: {
    canonical: "/faq/",
  },
};

const faqs = [
  {
    question: "What is DockDocs?",
    answer:
      "DockDocs is a PDF tools platform for common document workflows, with AI features added as a secondary productivity layer.",
  },
  {
    question: "Are the PDF tools real workflows?",
    answer:
      "The current pages present realistic upload, processing, and result states while the production processing engine is connected.",
  },
  {
    question: "What files does JPG to PDF support?",
    answer:
      "The JPG to PDF workflow supports image uploads such as JPG, PNG, and WebP.",
  },
  {
    question: "How does AI fit into DockDocs?",
    answer:
      "AI helps with OCR, summaries, Chat with PDF, and multi-step workflow support after the PDF task is clear.",
  },
];

export default function FaqPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <Section className="border-b border-[#cbd5e1] bg-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
            FAQ
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            DockDocs questions and answers.
          </h1>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <div className="divide-y divide-[#cbd5e1] border-y border-[#cbd5e1]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold">
                  {faq.question}
                  <span className="text-[#334155] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-[#334155]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
