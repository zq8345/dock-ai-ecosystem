import {
  createPdfToolMetadata,
  PdfToolPage,
  type PdfToolPageConfig,
} from "../../../../shared/templates/pdf-tool-page";
import { languageAlternates } from "@/lib/i18n";

const config = {
  slug: "sign-pdf",
  alternateLanguages: languageAlternates("sign-pdf"),
  title: "Sign PDF Online Free | DockDocs",
  description:
    "Sign PDF documents online free — add electronic signatures to PDFs. No downloads, no account needed. Secure browser-based e-signing with DockDocs.",
  keywords: ["sign pdf", "electronic signature", "esign pdf", "sign pdf online", "digital signature pdf"],
  appName: "DockDocs Sign PDF",
  schemaName: "DockDocs Sign PDF",
  breadcrumbName: "Sign PDF",
  heroTitle: "Sign PDF documents online for free.",
  heroDescription:
    "Add your electronic signature to any PDF. Draw, type, or upload your signature — all in your browser with DockDocs.",
  primaryActionLabel: "Sign PDF",
  stats: [
    ["Price", "Free"],
    ["Input", "PDF"],
    ["Output", "Signed PDF"],
    ["Security", "Browser-local"],
  ],
  upload: {
    title: "Upload a PDF to sign",
    description: "Drag and drop a PDF file here, or choose from your device.",
    buttonLabel: "Choose PDF",
    note: "PDF only. Your signature and document never leave your device.",
  },
  benefitsTitle: "Why sign PDFs with DockDocs",
  benefitsDescription:
    "A fast, free, and secure way to add electronic signatures to PDF documents.",
  benefits: [
    {
      title: "Free electronic signing",
      description: "Sign PDFs without paying for expensive e-signature subscriptions. No account required.",
    },
    {
      title: "Privacy-first signing",
      description: "Your document and signature are processed in your browser. No file uploads to external servers.",
    },
    {
      title: "Multiple signature options",
      description: "Draw your signature, type it with a handwriting font, or upload a signature image.",
    },
  ],
  featuresTitle: "Built for quick document signing",
  featuresDescription:
    "A focused PDF signing tool that covers the essential e-signature workflow without complexity.",
  features: [
    {
      title: "Draw your signature",
      description: "Use your mouse, trackpad, or touchscreen to draw a natural-looking signature directly on the PDF.",
    },
    {
      title: "Type your signature",
      description: "Type your name and choose from handwriting-style fonts for a clean, professional look.",
    },
    {
      title: "Upload a signature image",
      description: "Already have a signature as a PNG or JPG? Upload it and place it on your document.",
    },
    {
      title: "Resize and position freely",
      description: "Drag, resize, and position your signature exactly where you need it on any page.",
    },
  ],
  workflowTitle: "How to sign a PDF in 3 steps",
  workflowDescription:
    "The DockDocs sign PDF workflow is simple — upload, sign, download your signed document.",
  steps: [
    "Upload the PDF document you need to sign.",
    "Draw, type, or upload your signature and place it on the document.",
    "Download the signed PDF ready to send or share.",
  ],
  faqTitle: "Frequently asked questions about signing PDFs",
  faq: [
    {
      question: "Is an electronic signature legally valid?",
      answer:
        "In most jurisdictions — including the US (ESIGN Act), EU (eIDAS), UK, Canada, Australia, and many others — electronic signatures are legally binding for most business and personal documents. DockDocs provides the tool to apply the signature; legal validity depends on your jurisdiction and document type. For highly regulated documents, consult a legal professional.",
    },
    {
      question: "What's the difference between an electronic signature and a digital signature?",
      answer:
        "An electronic signature (what DockDocs provides) is a visual mark of consent on a document — like a hand-drawn or typed signature. A digital signature is a cryptographic seal that verifies the document hasn't been altered and confirms the signer's identity through a certificate authority. DockDocs handles electronic signatures; for digital signatures with certificate-based validation, use specialized PKI tools.",
    },
    {
      question: "Do I need an account to sign PDFs with DockDocs?",
      answer:
        "No. DockDocs Sign PDF is free and requires no account, no email, and no sign-up. You upload your PDF, add your signature, and download the signed document — all in one session.",
    },
    {
      question: "Is my signature stored or shared?",
      answer:
        "No. DockDocs processes everything in your browser — your PDF and your signature never get uploaded to any server. When you close the page, nothing is saved. This is different from cloud e-signature services that store your signature and documents on their servers.",
    },
  ],
  cta: {
    eyebrow: "Sign PDF",
    title: "Sign your PDF documents for free.",
    description:
      "No downloads, no sign-up, no storage. Sign PDFs securely in your browser with DockDocs.",
    buttonLabel: "Sign PDF now",
  },
} satisfies PdfToolPageConfig;

export const metadata = createPdfToolMetadata(config);

export default function SignPdfPage() {
  return <PdfToolPage config={config} />;
}
