import type { Metadata } from "next";
import { ComingSoonTool } from "@/components/ComingSoonTool";

export const metadata: Metadata = {
  title: "Unlock PDF — Coming Soon | DockDocs",
  description: "PDF password removal from DockDocs is coming soon.",
  alternates: { canonical: "/unlock-pdf/" },
  robots: { index: false, follow: true },
};

export default function UnlockPdfPage() {
  return <ComingSoonTool name="Unlock PDF" nameZh="解锁 PDF" />;
}
