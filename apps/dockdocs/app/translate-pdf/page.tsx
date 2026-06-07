import {
  createPdfToolMetadata,
  PdfToolPage,
  type PdfToolPageConfig,
} from "../../../../shared/templates/pdf-tool-page";
import { languageAlternates } from "@/lib/i18n";

const config = {
  slug: "translate-pdf",
  alternateLanguages: languageAlternates("translate-pdf"),
  title: "Translate PDF Online Free | DockDocs",
  description:
    "Translate PDF documents online free with AI. Preserve fonts, layout, and formatting. Supports 30+ languages. No downloads, no account required — DockDocs AI PDF translator.",
  keywords: ["translate pdf", "pdf translator", "ai translate pdf", "translate pdf online", "pdf language translator"],
  appName: "DockDocs Translate PDF",
  schemaName: "DockDocs Translate PDF",
  breadcrumbName: "Translate PDF",
  heroTitle: "Translate PDF documents with AI — free.",
  heroDescription:
    "Translate entire PDFs while keeping the original fonts, layout, and formatting. AI-powered translation across 30+ major languages with DockDocs.",
  primaryActionLabel: "Translate PDF",
  stats: [
    ["Price", "Free"],
    ["Languages", "30+"],
    ["Input", "PDF"],
    ["Output", "Translated PDF"],
  ],
  upload: {
    title: "Upload a PDF to translate",
    description: "Drag and drop a PDF file here, or choose from your device.",
    buttonLabel: "Choose PDF",
    note: "PDF only. AI-powered translation preserves formatting and layout.",
  },
  benefitsTitle: "Why translate PDFs with AI on DockDocs",
  benefitsDescription:
    "Fast, free AI-powered PDF translation that keeps your document looking professional.",
  benefits: [
    {
      title: "Preserves formatting",
      description: "Unlike copy-paste translation tools, DockDocs AI keeps the original layout, fonts, and structure of your PDF.",
    },
    {
      title: "30+ languages supported",
      description: "Translate between major world languages including Chinese, Japanese, Korean, Spanish, French, German, Arabic, Hindi, and more.",
    },
    {
      title: "No manual extraction",
      description: "Upload the PDF directly — no need to copy text, paste into a translator, and reformat. The AI handles the entire document.",
    },
  ],
  featuresTitle: "AI-powered PDF translation features",
  featuresDescription:
    "DockDocs Translate PDF combines AI language models with document processing for professional results.",
  features: [
    {
      title: "Full document translation",
      description: "Translate the entire PDF in one pass — all pages, all text, preserving the document structure.",
    },
    {
      title: "Layout preservation",
      description: "The translated output maintains the original positioning of text, tables, headers, and footers.",
    },
    {
      title: "Wide language coverage",
      description: "Supported languages include English, Chinese (Simplified & Traditional), Japanese, Korean, French, German, Spanish, Portuguese, Italian, Russian, Arabic, Hindi, and many more.",
    },
    {
      title: "Business document ready",
      description: "Output quality is suitable for business contracts, reports, academic papers, and official correspondence.",
    },
  ],
  workflowTitle: "How to translate a PDF in 3 steps",
  workflowDescription:
    "Upload your PDF, select the target language, and download the translated document.",
  steps: [
    "Upload the PDF document you want to translate.",
    "Select the target language — DockDocs AI translates the entire document.",
    "Download the translated PDF with formatting and layout preserved.",
  ],
  faqTitle: "Frequently asked questions about PDF translation",
  faq: [
    {
      question: "What languages can DockDocs translate PDFs to and from?",
      answer:
        "DockDocs Translate PDF supports over 30 languages including English, Chinese (Simplified & Traditional), Japanese, Korean, French, German, Spanish, Portuguese, Italian, Russian, Arabic, Hindi, Dutch, Polish, Turkish, Vietnamese, Thai, Indonesian, and more. The full list of supported languages is shown in the language selector when you upload a document.",
    },
    {
      question: "Is AI PDF translation accurate enough for business documents?",
      answer:
        "DockDocs uses state-of-the-art AI language models that produce professional-quality translations suitable for business correspondence, reports, and general documentation. For legally binding contracts or certified translations, we recommend a professional human translator for final review — AI translation is a powerful first pass, not a certified legal translation.",
    },
    {
      question: "Will the translated PDF keep the same layout and formatting?",
      answer:
        "Yes. Unlike copying text into a web translator and manually reformatting, DockDocs AI PDF translator preserves the original fonts, layout, text positioning, tables, and document structure in the translated output. This is the key advantage over traditional translation workflows.",
    },
    {
      question: "How is DockDocs PDF translation different from Google Translate?",
      answer:
        "Google Translate works on text snippets and loses formatting. DockDocs translates the entire PDF document in one pass, preserving the visual layout and structure. You don't need to extract text, translate piece by piece, and reformat — the PDF comes out ready to use.",
    },
    {
      question: "Is there a file size limit for PDF translation?",
      answer:
        "DockDocs Translate PDF works best with documents under 50MB and 200 pages. For larger documents, try splitting the PDF first using DockDocs Split PDF, translate each part, then merge them back with Merge PDF.",
    },
  ],
  cta: {
    eyebrow: "Translate PDF",
    title: "Translate your PDF documents with AI.",
    description:
      "Free, fast, and format-preserving. Translate PDFs into 30+ languages with DockDocs AI.",
    buttonLabel: "Translate PDF now",
  },
} satisfies PdfToolPageConfig;

export const metadata = createPdfToolMetadata(config);

export default function TranslatePdfPage() {
  return <PdfToolPage config={config} />;
}
