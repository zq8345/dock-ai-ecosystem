import type { Metadata } from "next";
import { ToolWorkspacePage } from "@/components/ToolWorkspacePage";
import { getRuntimeCopy, type RuntimeLocale } from "@/lib/copy";

const pageUrl = "https://dockdocs.app/pdf-to-word/";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "PDF to Word Converter Online | DockDocs",
      description:
        "Convert PDF files into editable Word-ready documents inside the DockDocs AI document workspace.",
      isPartOf: {
        "@type": "WebSite",
        name: "DockDocs",
        url: "https://dockdocs.app/",
      },
      about: {
        "@id": `${pageUrl}#app`,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}#app`,
      name: "DockDocs PDF to Word",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      description:
        "Prepare PDF files for editable Word document workflows with DockDocs.",
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
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "DockDocs",
          item: "https://dockdocs.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "PDF to Word",
          item: pageUrl,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "PDF to Word Converter Online",
  description:
    "Convert PDF files into editable Word-ready documents with DockDocs, the AI document workspace for PDF tools and document workflows.",
  alternates: {
    canonical: "/pdf-to-word/",
  },
  openGraph: {
    title: "PDF to Word Converter Online | DockDocs",
    description:
      "Prepare PDF files for editable Word document workflows inside DockDocs.",
    url: pageUrl,
    siteName: "DockDocs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word Converter Online | DockDocs",
    description:
      "Prepare PDF files for editable Word document workflows inside DockDocs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function PdfToWordPageContent({ locale = "en" }: { locale?: RuntimeLocale }) {
  return <ToolWorkspacePage locale={locale} tool="pdfToWord" structuredData={jsonLd} />;
}

export default function PdfToWordPage() {
  return <PdfToWordPageContent />;
}
