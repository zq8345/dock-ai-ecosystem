import type { Metadata } from "next";
import { ToolWorkspacePage } from "@/components/ToolWorkspacePage";
import { getRuntimeCopy, type RuntimeLocale } from "@/lib/copy";

const pageUrl = "https://dockdocs.app/compress-pdf";

const faqs = [
  {
    question: "What is DockDocs Compress PDF?",
    answer:
      "DockDocs Compress PDF reduces file size as part of a broader AI document platform workflow.",
  },
  {
    question: "What files are supported?",
    answer:
      "This UI is focused on PDF upload and PDF output, with clear limits and processing states.",
  },
  {
    question: "Can I continue after compression?",
    answer:
      "Yes. The result surface points users toward download, copy, and follow-up document workflows.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The upload area, limits, and output preview stack into a single-column mobile layout.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}#app`,
      name: "DockDocs Compress PDF",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      description:
        "Compress PDF files with DockDocs, an AI document platform for document workflows.",
      brand: {
        "@type": "Brand",
        name: "DockDocs",
        slogan: "AI Document Platform",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: "Compress PDF Online",
  description:
    "Compress PDF files with DockDocs, the AI Document Workspace for document tools, office workflows, and PDF utilities.",
  alternates: {
    canonical: "/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online | DockDocs",
    description:
      "Reduce PDF file size in a clean, responsive DockDocs document workspace.",
    url: pageUrl,
    siteName: "DockDocs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online | DockDocs",
    description:
      "Reduce PDF file size in a clean, responsive DockDocs document workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function CompressPdfPageContent({ locale = "en" }: { locale?: RuntimeLocale }) {
  return <ToolWorkspacePage locale={locale} tool="compress" structuredData={jsonLd} />;
}

export default function CompressPdfPage() {
  return <CompressPdfPageContent />;
}
