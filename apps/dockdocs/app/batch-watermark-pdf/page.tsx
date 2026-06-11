import type { Metadata } from "next";
import { BatchStampClient } from "@/components/BatchStampClient";

export const metadata: Metadata = {
  title: "Batch Watermark & Page Numbers — Stamp Many PDFs Online Free | DockDocs",
  description:
    "Add a watermark or page numbers to a whole folder of PDFs at once, packaged into one ZIP. Entirely in your browser; your files never leave your device.",
  keywords: ["batch watermark pdf", "bulk add page numbers pdf", "watermark multiple pdf", "stamp many pdfs"],
  alternates: { canonical: "/batch-watermark-pdf/" },
};

export default function BatchWatermarkPdfPage() {
  return <BatchStampClient />;
}
