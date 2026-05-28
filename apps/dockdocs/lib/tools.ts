export type Tool = {
  name: string;
  href: string;
  description: string;
};

export const tools: Tool[] = [
  {
    name: "JPG to PDF",
    href: "/jpg-to-pdf",
    description: "Convert JPG, PNG, and WebP images into PDF documents.",
  },
  {
    name: "Compress PDF",
    href: "/compress-pdf",
    description: "Reduce PDF file size for sharing, portals, and email.",
  },
  {
    name: "OCR PDF",
    href: "/ocr-pdf",
    description: "Extract text from scanned and image-based PDF files.",
  },
  {
    name: "AI Workspace",
    href: "/ai-workspace",
    description: "Review, summarize, and work with documents using AI layers.",
  },
];
