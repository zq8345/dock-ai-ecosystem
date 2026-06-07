import {
  createPdfToolMetadata,
  PdfToolPage,
  type PdfToolPageConfig,
} from "../../../../shared/templates/pdf-tool-page";
import { languageAlternates } from "@/lib/i18n";

const config = {
  slug: "unlock-pdf",
  alternateLanguages: languageAlternates("unlock-pdf"),
  title: "Unlock PDF Online Free | DockDocs",
  description:
    "Remove PDF password protection online free. Unlock PDFs for editing, printing, and sharing. No downloads, no account — secure browser-based PDF unlocker from DockDocs.",
  keywords: ["unlock pdf", "remove pdf password", "pdf unlocker", "unlock pdf online", "remove pdf protection"],
  appName: "DockDocs Unlock PDF",
  schemaName: "DockDocs Unlock PDF",
  breadcrumbName: "Unlock PDF",
  heroTitle: "Remove password protection from PDFs — free.",
  heroDescription:
    "Unlock password-protected PDF files so you can edit, print, and share them freely. Works in your browser with DockDocs.",
  primaryActionLabel: "Unlock PDF",
  stats: [
    ["Price", "Free"],
    ["Input", "Protected PDF"],
    ["Output", "Unlocked PDF"],
    ["Security", "Browser-local"],
  ],
  upload: {
    title: "Upload a password-protected PDF",
    description: "Drag and drop a protected PDF file here, or choose from your device.",
    buttonLabel: "Choose PDF",
    note: "You must know the password to unlock the file. The PDF and password are processed in your browser.",
  },
  benefitsTitle: "Why unlock PDFs with DockDocs",
  benefitsDescription:
    "A fast, free, and secure way to remove PDF password protection — no software needed.",
  benefits: [
    {
      title: "Free PDF unlocking",
      description: "Remove password protection from PDFs without paying for expensive PDF software. No account required.",
    },
    {
      title: "Browser-based security",
      description: "Your PDF and password are processed locally in your browser — never uploaded to any server.",
    },
    {
      title: "Instant results",
      description: "Enter the password once, and the unlocked PDF is ready to download in seconds.",
    },
  ],
  featuresTitle: "Built for simple PDF unlocking",
  featuresDescription:
    "A focused tool that does one thing well — removes password protection from PDFs.",
  features: [
    {
      title: "Remove owner password",
      description: "Unlock PDFs restricted from editing, printing, or copying — requires knowing the password.",
    },
    {
      title: "Remove user password",
      description: "Unlock PDFs that require a password to open — enter the password once and download the unrestricted version.",
    },
    {
      title: "Preserve document quality",
      description: "Unlocking does not alter the PDF content, formatting, or quality — it only removes the password restriction.",
    },
    {
      title: "No file retention",
      description: "Nothing is stored. Your original PDF and password are discarded when you close the page.",
    },
  ],
  workflowTitle: "How to unlock a PDF in 3 steps",
  workflowDescription:
    "Upload your protected PDF, enter the password, and download the unlocked file.",
  steps: [
    "Upload the password-protected PDF file.",
    "Enter the document password when prompted.",
    "Download the unlocked PDF — ready to edit, print, and share.",
  ],
  faqTitle: "Frequently asked questions about unlocking PDFs",
  faq: [
    {
      question: "Can I unlock a PDF if I don't know the password?",
      answer:
        "No. DockDocs Unlock PDF requires you to know the password. It removes the protection for legitimate use — when you have the password but want to edit, print, or share the document without restrictions. It is not a password cracking or recovery tool. If you've forgotten the password, you'll need to contact the document owner.",
    },
    {
      question: "Is it safe to enter my PDF password online?",
      answer:
        "DockDocs Unlock PDF processes everything in your browser using client-side technology. Your PDF file and the password never leave your device — they are not uploaded to any server. This is fundamentally different from services that send your protected PDF and password to their backend for processing.",
    },
    {
      question: "What types of PDF passwords can DockDocs remove?",
      answer:
        "DockDocs can remove both owner passwords (which restrict editing, printing, and copying) and user/open passwords (which prevent opening the file) — provided you know the password. After unlocking, the PDF has no restrictions and can be used freely.",
    },
    {
      question: "Will unlocking a PDF affect the file quality?",
      answer:
        "No. Removing password protection does not alter the PDF's content, formatting, images, or text quality. The file is bit-for-bit identical except for the removal of the password restriction. You'll get the exact same document without the lock.",
    },
    {
      question: "Can I unlock a PDF and then compress or merge it?",
      answer:
        "Yes. After unlocking your PDF with DockDocs Unlock PDF, you can use any other DockDocs tool — Compress PDF to reduce file size, Merge PDF to combine with other documents, Edit PDF to add annotations, or Convert to Word/Excel. The unlocked file works with all DockDocs tools.",
    },
  ],
  cta: {
    eyebrow: "Unlock PDF",
    title: "Remove PDF password protection for free.",
    description:
      "No downloads, no account, no storage. Unlock PDFs securely in your browser with DockDocs.",
    buttonLabel: "Unlock PDF now",
  },
} satisfies PdfToolPageConfig;

export const metadata = createPdfToolMetadata(config);

export default function UnlockPdfPage() {
  return <PdfToolPage config={config} />;
}
