import type { Metadata } from "next";
import { ComingSoonTool } from "@/components/ComingSoonTool";

export const metadata: Metadata = {
  title: "Translate PDF — Coming Soon | DockDocs",
  description: "AI PDF translation from DockDocs is coming soon.",
  alternates: { canonical: "/translate-pdf/" },
  robots: { index: false, follow: true },
};

export default function TranslatePdfPage() {
  return <ComingSoonTool name="Translate PDF" nameZh="翻译 PDF" />;
}
