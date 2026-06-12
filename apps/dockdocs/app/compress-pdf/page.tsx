import {
  createPdfToolMetadata,
  PdfToolPage,
  type PdfToolPageConfig,
} from "../../../../shared/templates/pdf-tool-page";
import { languageAlternates } from "@/lib/i18n";

const config = {
  slug: "compress-pdf",
  alternateLanguages: languageAlternates("compress-pdf"),
  title: "Compress PDF Online Free | DockDocs",
  description:
    "Compress PDF files online for free. Reduce PDF file size for email, uploads, and sharing inside the DockDocs AI document workspace.",
  keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf"],
  appName: "DockDocs Compress PDF",
  schemaName: "DockDocs Compress PDF",
  breadcrumbName: "Compress PDF",
  heroTitle: "Compress PDF files online — free and in your browser.",
  heroDescription:
    "Shrink PDFs that are too big for email or portal uploads. Compression runs entirely in your browser, so your files never leave your device — nothing to install and no sign-up.",
  primaryActionLabel: "Compress PDF",
  stats: [["Price", "Free"], ["Privacy", "In-browser"], ["Output", "Smaller PDF"]],
  upload: {
    title: "Upload a PDF to compress",
    description:
      "Drag and drop a PDF file here, or choose from your device.",
    buttonLabel: "Choose PDF",
    note: "PDF only. Compression runs in your browser — your file is never uploaded to a server.",
  },
  benefitsTitle: "Reduce PDF size for email and uploads",
  benefitsDescription:
    "DockDocs Compress PDF shrinks files right in your browser, so documents fit email and upload limits without ever being sent to a server.",
  benefits: [
    {
      title: "Fit email & upload limits",
      description:
        "Bring oversized PDFs down to a size that clears common email attachment caps and portal upload limits, so files send and submit the first time.",
    },
    {
      title: "Stays on your device",
      description:
        "Compression happens entirely in your browser. Your PDF is never uploaded, so sensitive documents stay private.",
    },
    {
      title: "Free with no watermark",
      description:
        "Compress as many PDFs as you need at no cost — no account, no email, and nothing stamped onto your file.",
    },
  ],
  featuresTitle: "Built for modern PDF compression",
  featuresDescription:
    "A minimal DockDocs interface for reducing PDF file size inside document workflows.",
  features: [
    {
      title: "Compress PDF files",
      description:
        "Reduce file size for email attachments, portal uploads, and document sharing.",
    },
    {
      title: "Clean workspace",
      description:
        "Upload, compress, and download in one focused DockDocs interface.",
    },
    {
      title: "Clear limits",
      description:
        "The upload card communicates supported formats, file size, and processing states.",
    },
    {
      title: "Responsive DockDocs UI",
      description:
        "The same clean DockDocs interface works across desktop, tablet, and mobile screens.",
    },
  ],
  workflowTitle: "How PDF compression fits into document work",
  workflowDescription:
    "Compress PDF is designed for common office moments: files are too large for email, a portal requires a size limit, or sharing needs to be faster.",
  steps: [
    "Select a PDF file from your device.",
    "DockDocs compresses the file while preserving readability.",
    "Download the compressed PDF ready for sharing.",
  ],
  faqTitle: "PDF compression questions",
  faq: [
    {
      question: "How do I compress a PDF file online?",
      answer:
        "Drop a PDF onto DockDocs Compress PDF and download the smaller version. Everything runs in your browser — there is no upload, no sign-up, and nothing to install.",
    },
    {
      question: "Is this PDF compressor free?",
      answer:
        "Yes. Compress PDF is completely free with no account or email required, and no watermark is added to your file.",
    },
    {
      question: "Will compression reduce quality?",
      answer:
        "To shrink the file, each page is re-rendered as an optimized image, so the biggest savings come from scanned or image-heavy PDFs. Pages stay clearly readable, but text on compressed pages is no longer selectable. If a PDF is already small — for example a plain-text document — DockDocs keeps the original instead of making it larger.",
    },
    {
      question: "Are my files uploaded anywhere?",
      answer:
        "No. Compression runs entirely inside your browser using your own device, so your PDF is never uploaded to a server and never leaves your computer.",
    },
  ],
  cta: {
    eyebrow: "Compress PDF",
    title: "Reduce PDF file size for sharing and uploads.",
    description:
      "Use DockDocs to compress PDF files for email, portals, and document handoff.",
    buttonLabel: "Compress PDF now",
  },
} satisfies PdfToolPageConfig;

export const metadata = createPdfToolMetadata(config);

export default function CompressPdfPage() {
  return <PdfToolPage config={config} />;
}
