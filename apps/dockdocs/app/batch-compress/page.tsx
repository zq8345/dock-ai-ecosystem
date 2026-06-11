import type { Metadata } from "next";
import { BatchCompressClient } from "@/components/BatchCompressClient";

export const metadata: Metadata = {
  title: "Batch Compress PDFs — Shrink a Whole Folder | DockDocs",
  description:
    "Drop a whole folder of PDFs and compress them all in one go — each is shrunk in your browser and packaged into a single ZIP. Nothing is uploaded.",
  keywords: ["batch compress pdf", "compress multiple pdfs", "compress pdf folder", "bulk compress pdf", "reduce pdf size"],
};

export default function BatchCompressPage() {
  return <BatchCompressClient />;
}
