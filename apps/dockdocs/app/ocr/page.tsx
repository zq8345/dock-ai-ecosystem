import type { Metadata } from "next";
import { ToolWorkspacePage } from "@/components/ToolWorkspacePage";
import { getRuntimeCopy, type RuntimeLocale } from "@/lib/copy";

const ocrCopy = getRuntimeCopy("en").ocr;

export const metadata: Metadata = {
  title: "OCR Workspace",
  description: ocrCopy.description,
  alternates: {
    canonical: "/ocr/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

function OcrPageContent({ locale = "en" }: { locale?: RuntimeLocale }) {
  return <ToolWorkspacePage locale={locale} tool="ocr" />;
}

export default function OcrPage() {
  return <OcrPageContent />;
}
