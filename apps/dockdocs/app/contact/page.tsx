import type { Metadata } from "next";
import { ButtonLink, Container, Section } from "@dock/shared/ui";

export const metadata: Metadata = {
  title: "Contact | DockDocs",
  description:
    "Contact DockDocs for product questions, PDF workflow feedback, privacy questions, and AI document workspace inquiries.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <Section className="border-b border-[#cbd5e1] bg-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
            Contact
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Contact the DockDocs team.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#334155]">
            Use this page for product feedback, privacy questions, PDF workflow
            requests, AI Workspace ideas, and support routing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="mailto:hello@dockdocs.app">Email DockDocs</ButtonLink>
            <ButtonLink href="/help" variant="outline">
              Visit Help Center
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
