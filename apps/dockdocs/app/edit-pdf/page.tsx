import {
  createPdfToolMetadata,
  PdfToolPage,
  type PdfToolPageConfig,
} from "../../../../shared/templates/pdf-tool-page";
import { languageAlternates } from "@/lib/i18n";

const config = {
  slug: "edit-pdf",
  alternateLanguages: languageAlternates("edit-pdf"),
  title: "Edit PDF Online Free | DockDocs",
  description:
    "Edit PDF files online free — add text, images, shapes, and annotations. No downloads, no watermarks, browser-based PDF editor from DockDocs.",
  keywords: ["edit pdf", "annotate pdf", "pdf editor", "edit pdf online", "free pdf editor"],
  appName: "DockDocs Edit PDF",
  schemaName: "DockDocs Edit PDF",
  breadcrumbName: "Edit PDF",
  heroTitle: "Edit PDF files online for free.",
  heroDescription:
    "Add text, images, shapes, and annotations to any PDF. No software install — edit directly in your browser with DockDocs.",
  primaryActionLabel: "Edit PDF",
  stats: [
    ["Price", "Free"],
    ["Input", "PDF"],
    ["Output", "Edited PDF"],
    ["Platform", "Browser"],
  ],
  upload: {
    title: "Upload a PDF to edit",
    description: "Drag and drop a PDF file here, or choose from your device.",
    buttonLabel: "Choose PDF",
    note: "PDF only. All processing happens in your browser — your file never leaves your device.",
  },
  benefitsTitle: "Why edit PDFs with DockDocs",
  benefitsDescription:
    "A fast, free PDF editor that works in your browser with no sign-up required.",
  benefits: [
    {
      title: "No software needed",
      description: "Edit PDFs directly in your browser — no downloads, no installations, no account required.",
    },
    {
      title: "Privacy-first editing",
      description: "Your PDF stays on your device. Browser-based processing means zero server uploads.",
    },
    {
      title: "Instant results",
      description: "Add text, draw shapes, place images, and download the edited PDF in seconds.",
    },
  ],
  featuresTitle: "Built for fast PDF editing",
  featuresDescription:
    "A focused PDF editor with the essential tools you need to annotate and mark up documents.",
  features: [
    {
      title: "Add text annotations",
      description: "Type directly onto any PDF page with full control over position and appearance.",
    },
    {
      title: "Draw shapes and lines",
      description: "Add rectangles, circles, lines, and arrows to highlight or mark up content.",
    },
    {
      title: "Insert images",
      description: "Place logos, signatures, stamps, or any image onto your PDF document.",
    },
    {
      title: "Clean, focused interface",
      description: "No clutter — just the editing tools you need, presented clearly.",
    },
  ],
  workflowTitle: "How to edit a PDF in 3 steps",
  workflowDescription:
    "The DockDocs edit PDF workflow is designed for speed — upload, edit, download.",
  steps: [
    "Upload your PDF file by dragging it onto the page or clicking to browse.",
    "Add text, shapes, or images using the built-in annotation tools.",
    "Download the edited PDF with your changes applied — ready to share.",
  ],
  faqTitle: "Frequently asked questions about editing PDFs",
  faq: [
    {
      question: "Can I edit a PDF without Adobe Acrobat?",
      answer:
        "Yes. DockDocs provides a free browser-based PDF editor that lets you add text, annotations, shapes, and images — no Adobe Acrobat or any software installation required. It works on Windows, Mac, Linux, and ChromeOS.",
    },
    {
      question: "Is online PDF editing safe for sensitive documents?",
      answer:
        "DockDocs Edit PDF processes your file entirely in the browser using client-side technology. Your PDF never gets uploaded to a server, which means sensitive documents stay on your device. No account or sign-up is needed.",
    },
    {
      question: "What types of edits can I make to a PDF?",
      answer:
        "With DockDocs Edit PDF you can add text boxes anywhere on the page, draw shapes and lines for markup, insert images like logos or signatures, and annotate documents. It covers the most common PDF editing needs without the complexity of desktop software.",
    },
    {
      question: "Do I need to create an account to edit PDFs?",
      answer:
        "No. DockDocs Edit PDF is completely free and requires no account, no email, and no sign-up. Just open the page, upload your PDF, make your edits, and download.",
    },
    {
      question: "Can I edit a scanned PDF or an image-based PDF?",
      answer:
        "For scanned or image-based PDFs where text is not selectable, you should first use DockDocs OCR PDF to convert the scan into selectable text, then edit the result. The OCR tool extracts text from images and scanned documents.",
    },
  ],
  cta: {
    eyebrow: "Edit PDF",
    title: "Start editing your PDF documents for free.",
    description:
      "No downloads, no sign-up. Edit PDFs directly in your browser with DockDocs.",
    buttonLabel: "Edit PDF now",
  },
} satisfies PdfToolPageConfig;

export const metadata = createPdfToolMetadata(config);

export default function EditPdfPage() {
  return <PdfToolPage config={config} />;
}
