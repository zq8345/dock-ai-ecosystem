import type { Metadata } from "next";
import { ToolWorkspacePage } from "@/components/ToolWorkspacePage";
import { getRuntimeCopy, type RuntimeLocale } from "@/lib/copy";

const summaryCopy = getRuntimeCopy("en").summary;

export const metadata: Metadata = {
  title: "AI Summary",
  description: summaryCopy.description,
  alternates: {
    canonical: "/ai-summary/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function AiSummaryPageContent({ locale = "en" }: { locale?: RuntimeLocale }) {
  return <ToolWorkspacePage locale={locale} tool="summary" />;
}

export default function AiSummaryPage() {
  return <AiSummaryPageContent />;
}
