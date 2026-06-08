import type { Metadata } from "next";
import { ComingSoonTool } from "@/components/ComingSoonTool";

export const metadata: Metadata = {
  title: "Sign PDF — Coming Soon | DockDocs",
  description: "Electronic PDF signing from DockDocs is coming soon.",
  alternates: { canonical: "/sign-pdf/" },
  robots: { index: false, follow: true },
};

export default function SignPdfPage() {
  return <ComingSoonTool name="Sign PDF" nameZh="签署 PDF" />;
}
