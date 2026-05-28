import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ButtonLink, Container, Section } from "../../ui";

export type PdfToolItem = {
  title: string;
  description: string;
};

export type PdfToolFaq = {
  question: string;
  answer: string;
};

export type PdfToolCta = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
};

export type PdfToolUpload = {
  title: string;
  description: string;
  buttonLabel: string;
  multiple?: boolean;
  note?: string;
  accept?: string;
  fileBadge?: string;
};

export type PdfToolPageConfig = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  appName: string;
  schemaName: string;
  breadcrumbName: string;
  heroTitle: string;
  heroDescription: string;
  primaryActionLabel: string;
  stats: Array<[string, string]>;
  upload: PdfToolUpload;
  benefits: PdfToolItem[];
  benefitsTitle: string;
  benefitsDescription: string;
  features: PdfToolItem[];
  featuresTitle: string;
  featuresDescription: string;
  workflowTitle: string;
  workflowDescription: string;
  steps: string[];
  faq: PdfToolFaq[];
  faqTitle: string;
  cta: PdfToolCta;
  relatedTools?: ReactNode | false;
};

type WorkflowState = {
  status: string;
  title: string;
  description: string;
  preview?: ReactNode;
  actionLabel?: string;
  secondaryActionLabel?: string;
};

const siteUrl = "https://dockdocs.app";

const pdfTools = [
  {
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    href: "/jpg-to-pdf",
    description: "Turn images, photos, and scans into a PDF document.",
  },
  {
    name: "Compress PDF",
    slug: "compress-pdf",
    href: "/compress-pdf",
    description: "Reduce PDF size for email, portals, and sharing.",
  },
  {
    name: "Merge PDF",
    slug: "merge-pdf",
    href: "/merge-pdf",
    description: "Combine multiple PDF files into one clean packet.",
  },
  {
    name: "Split PDF",
    slug: "split-pdf",
    href: "/split-pdf",
    description: "Extract pages or split ranges from a PDF file.",
  },
  {
    name: "PDF to Word",
    slug: "pdf-to-word",
    href: "/pdf-to-word",
    description: "Prepare PDF files for editable document work.",
  },
  {
    name: "OCR PDF",
    slug: "ocr-pdf",
    href: "/ocr-pdf",
    description: "Extract text from scanned and image-based PDFs.",
  },
];

export function createPdfToolMetadata(config: PdfToolPageConfig): Metadata {
  const pageUrl = `${siteUrl}/${config.slug}/`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: `/${config.slug}/`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: pageUrl,
      siteName: "DockDocs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createPdfToolSchema(config: PdfToolPageConfig) {
  const pageUrl = `${siteUrl}/${config.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: config.title,
        description: config.description,
        isPartOf: {
          "@type": "WebSite",
          name: "DockDocs",
          url: siteUrl,
        },
        about: {
          "@id": `${pageUrl}#app`,
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#app`,
        name: config.schemaName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: pageUrl,
        description: config.description,
        featureList: config.keywords,
        brand: {
          "@type": "Brand",
          name: "DockDocs",
          slogan: "Privacy-first PDF tools with AI document workflows",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: `How to use ${config.appName}`,
        description: config.workflowDescription,
        step: config.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          text: step,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: config.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "DockDocs",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: config.breadcrumbName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function PdfToolPage({ config }: { config: PdfToolPageConfig }) {
  const schema = createPdfToolSchema(config);

  return (
    <main className="bg-white text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroSection config={config} />
      <WorkflowSimulator config={config} />
      <BenefitsSection config={config} />
      <FeaturesSection config={config} />
      <HowItWorksSection config={config} />
      <FaqSection config={config} />
      {config.relatedTools === false ? null : config.relatedTools ?? (
        <RelatedPdfTools currentSlug={config.slug} />
      )}
      <CtaSection config={config} />
    </main>
  );
}

function HeroSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section className="border-b border-[#cbd5e1] bg-white py-0">
      <Container className="grid min-h-[72vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="inline-flex rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#334155] shadow-sm">
            DockDocs PDF Tools
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] sm:text-6xl">
            {config.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#334155] sm:text-lg">
            {config.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="#upload"
              className="shadow-[0_10px_24px_rgba(23,23,23,0.16)]"
            >
              {config.primaryActionLabel}
            </ButtonLink>
            <ButtonLink href="#workflow-preview" variant="outline" className="bg-white">
              Preview workflow
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {config.stats.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#475569]">
                  {label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[#0f172a]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <UploadCard upload={config.upload} slug={config.slug} />
      </Container>
    </Section>
  );
}

function UploadCard({
  upload,
  slug,
}: {
  upload: PdfToolUpload;
  slug: string;
}) {
  const accept = upload.accept ?? "application/pdf";
  const badge = upload.fileBadge ?? (slug === "jpg-to-pdf" ? "IMG" : "PDF");

  return (
    <div
      id="upload"
      aria-labelledby="upload-title"
      className="rounded-2xl border border-[#cbd5e1] bg-white p-4 shadow-[0_32px_90px_rgba(24,24,20,0.10)]"
    >
      <div className="rounded-xl border border-dashed border-[#94a3b8] bg-[#f8fafc] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#0f172a] text-lg font-semibold text-white">
          {badge}
        </div>
        <h2 id="upload-title" className="mt-6 text-2xl font-semibold">
          {upload.title}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#334155]">
          {upload.description}
        </p>
        <label className="mt-6 inline-flex cursor-pointer rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,23,23,0.16)] transition hover:bg-[#111827]">
          {upload.buttonLabel}
          <input
            type="file"
            accept={accept}
            multiple={upload.multiple}
            className="sr-only"
          />
        </label>
        {upload.note ? (
          <p className="mt-4 text-xs font-medium text-[#475569]">
            {upload.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function WorkflowSimulator({ config }: { config: PdfToolPageConfig }) {
  const states = getWorkflowStates(config);

  return (
    <Section id="workflow-preview" className="border-b border-[#cbd5e1] bg-[#f8fafc]">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
              Tool workflow
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              A realistic flow from upload to output.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-[#334155]">
            These tool pages now present the real product workflow states users
            expect before the processing engine is connected.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {states.map((state, index) => (
            <div
              key={state.title}
              className="rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="rounded-full border border-[#cbd5e1] px-3 py-1 text-xs font-semibold text-[#334155]">
                  {state.status}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{state.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#334155]">
                {state.description}
              </p>
              {state.preview ? (
                <div className="mt-5 rounded-lg border border-[#cbd5e1] bg-[#f8fafc] p-4 text-sm text-[#334155]">
                  {state.preview}
                </div>
              ) : null}
              {state.actionLabel ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white shadow-sm"
                  >
                    {state.actionLabel}
                  </button>
                  {state.secondaryActionLabel ? (
                    <button
                      type="button"
                      className="rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#0f172a]"
                    >
                      {state.secondaryActionLabel}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BenefitsSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section className="border-b border-[#cbd5e1] bg-white">
      <Container>
        <SectionIntro
          eyebrow="Benefits"
          title={config.benefitsTitle}
          description={config.benefitsDescription}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {config.benefits.map((benefit) => (
            <InfoCard key={benefit.title} item={benefit} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeaturesSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section id="features" className="border-b border-[#cbd5e1] bg-[#f8fafc]">
      <Container>
        <SectionIntro
          eyebrow="Features"
          title={config.featuresTitle}
          description={config.featuresDescription}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {config.features.map((feature) => (
            <InfoCard key={feature.title} item={feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HowItWorksSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section className="border-b border-[#cbd5e1] bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
        <SectionIntro
          eyebrow="Workflow"
          title={config.workflowTitle}
          description={config.workflowDescription}
        />
        <ol className="grid gap-4 sm:grid-cols-2">
          {config.steps.map((step, index) => (
            <li key={step}>
              <div className="h-full rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 font-semibold text-[#0f172a]">{step}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function FaqSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section id="faq" className="border-b border-[#cbd5e1] bg-white">
      <Container className="max-w-4xl">
        <SectionIntro eyebrow="FAQ" title={config.faqTitle} />
        <div className="mt-8 divide-y divide-[#cbd5e1] border-y border-[#cbd5e1]">
          {config.faq.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-[#0f172a]">
                {faq.question}
                <span className="text-[#334155] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-[#334155]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RelatedPdfTools({ currentSlug }: { currentSlug: string }) {
  const related = pdfTools.filter((tool) => tool.slug !== currentSlug);

  return (
    <Section id="related-tools" className="border-b border-[#cbd5e1] bg-[#f8fafc]">
      <Container>
        <SectionIntro
          eyebrow="Related Tools"
          title="Continue with another PDF workflow."
          description="Move between DockDocs PDF tools without leaving the product platform."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {related.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0f172a] hover:shadow-[0_16px_32px_rgba(24,24,20,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-[#0f172a]">{tool.name}</h3>
                <span className="text-[#334155] transition group-hover:translate-x-0.5 group-hover:text-[#0f172a]">
                  -&gt;
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#334155]">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CtaSection({ config }: { config: PdfToolPageConfig }) {
  return (
    <Section bordered={false} className="bg-white">
      <Container>
        <div className="flex flex-col gap-6 rounded-2xl border border-[#cbd5e1] bg-[#0f172a] p-6 text-white shadow-[0_24px_60px_rgba(24,24,20,0.10)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              {config.cta.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{config.cta.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              {config.cta.description}
            </p>
          </div>
          <ButtonLink href="#upload" variant="inverse">
            {config.cta.buttonLabel}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#334155]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0f172a]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-7 text-[#334155]">{description}</p>
      ) : null}
    </div>
  );
}

function InfoCard({ item }: { item: PdfToolItem }) {
  return (
    <div className="h-full rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm transition hover:border-[#0f172a]">
      <h3 className="text-lg font-semibold text-[#0f172a]">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#334155]">
        {item.description}
      </p>
    </div>
  );
}

function ProgressPreview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-[#0f172a]">{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white">
        <div className="h-2 w-2/3 rounded-full bg-[#0f172a]" />
      </div>
    </div>
  );
}

function FileListPreview({ files }: { files: string[] }) {
  return (
    <ol className="space-y-2">
      {files.map((file, index) => (
        <li
          key={file}
          className="flex items-center justify-between gap-3 rounded-md border border-[#cbd5e1] bg-white px-3 py-2"
        >
          <span className="font-medium text-[#0f172a]">{file}</span>
          <span className="text-xs text-[#475569]">#{index + 1}</span>
        </li>
      ))}
    </ol>
  );
}

function RangePreview() {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#475569]">
        Page ranges
      </span>
      <input
        readOnly
        value="1-4, 12-18, 30"
        className="mt-2 w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 font-medium text-[#0f172a]"
      />
    </label>
  );
}

function TextOutputPreview() {
  return (
    <textarea
      readOnly
      rows={4}
      value={
        "Invoice total: $248.00\nDue date: May 31, 2026\nVendor: DockDocs sample scan"
      }
      className="w-full resize-none rounded-md border border-[#cbd5e1] bg-white p-3 leading-6 text-[#0f172a]"
    />
  );
}

function DocumentPreview() {
  return (
    <div className="rounded-md border border-[#cbd5e1] bg-white p-3 text-[#0f172a]">
      <p className="font-semibold">Editable contract draft</p>
      <p className="mt-2 text-xs leading-5 text-[#334155]">
        Heading, paragraphs, and table structure detected for DOCX export.
      </p>
    </div>
  );
}

function ImageOrderPreview() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {["receipt-1.jpg", "receipt-2.png", "notes.webp"].map((file, index) => (
        <div
          key={file}
          className="rounded-md border border-[#cbd5e1] bg-white p-2 text-center"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#0f172a] text-xs font-semibold text-white">
            {index + 1}
          </div>
          <p className="mt-2 truncate text-xs">{file}</p>
        </div>
      ))}
    </div>
  );
}

function getWorkflowStates(config: PdfToolPageConfig): WorkflowState[] {
  switch (config.slug) {
    case "compress-pdf":
      return [
        {
          status: "Upload",
          title: "Upload PDF",
          description: "Choose a PDF and review file size before compression.",
          preview: "quarterly-report.pdf - 12.4 MB",
        },
        {
          status: "Compressing",
          title: "Optimization running",
          description: "The workflow simulates image cleanup and file-size reduction.",
          preview: <ProgressPreview label="Compressing" value="68%" />,
        },
        {
          status: "Result",
          title: "Download compressed PDF",
          description: "A clear result state prepares the user for a download CTA.",
          preview: "quarterly-report-compressed.pdf - 6.4 MB",
          actionLabel: "Download compressed PDF",
        },
      ];
    case "merge-pdf":
      return [
        {
          status: "Multi-file",
          title: "Upload multiple PDFs",
          description: "Add several files and prepare them for one merged packet.",
          preview: "proposal.pdf + invoice.pdf + appendix.pdf",
        },
        {
          status: "Reorder",
          title: "Arrange document order",
          description: "A simulated reorder list shows how final packets are assembled.",
          preview: (
            <FileListPreview
              files={["proposal.pdf", "invoice.pdf", "appendix.pdf"]}
            />
          ),
        },
        {
          status: "Result",
          title: "Download merged PDF",
          description: "The final state points users to one organized output file.",
          preview: "client-packet-merged.pdf",
          actionLabel: "Download merged PDF",
        },
      ];
    case "split-pdf":
      return [
        {
          status: "Upload",
          title: "Upload PDF",
          description: "Choose a file and review the pages available for splitting.",
          preview: "handbook.pdf - 42 pages",
        },
        {
          status: "Range",
          title: "Enter page ranges",
          description: "A clear range field helps users extract focused sections.",
          preview: <RangePreview />,
        },
        {
          status: "Export",
          title: "Download split ZIP",
          description: "Split outputs are grouped as a ZIP-ready export.",
          preview: "handbook-split-pages.zip",
          actionLabel: "Export ZIP",
        },
      ];
    case "pdf-to-word":
      return [
        {
          status: "Upload",
          title: "Upload PDF",
          description: "Choose a PDF and prepare it for editable document conversion.",
          preview: "contract.pdf",
        },
        {
          status: "Converting",
          title: "Build Word structure",
          description: "The flow simulates text, headings, and layout conversion.",
          preview: <ProgressPreview label="Converting to DOCX" value="72%" />,
        },
        {
          status: "Preview",
          title: "Editable document output",
          description: "A Word-ready preview gives users confidence before download.",
          preview: <DocumentPreview />,
          actionLabel: "Download DOCX",
        },
      ];
    case "ocr-pdf":
      return [
        {
          status: "Upload",
          title: "Upload scanned PDF",
          description: "Choose a scanned file or image-based PDF for text extraction.",
          preview: "scanned-receipts.pdf",
        },
        {
          status: "OCR",
          title: "Extract text",
          description: "The workflow simulates OCR detection and clean text output.",
          preview: <ProgressPreview label="Recognizing text" value="81%" />,
        },
        {
          status: "Text",
          title: "Copy or download text",
          description: "The result state includes copy text and download text actions.",
          preview: <TextOutputPreview />,
          actionLabel: "Copy text",
          secondaryActionLabel: "Download .txt",
        },
      ];
    case "jpg-to-pdf":
      return [
        {
          status: "Images",
          title: "Upload JPG, PNG, or WebP",
          description: "Add photos, scans, or image files for document creation.",
          preview: "receipt-1.jpg + receipt-2.png + notes.webp",
        },
        {
          status: "Order",
          title: "Arrange page order",
          description: "A simulated preview shows image pages before PDF export.",
          preview: <ImageOrderPreview />,
        },
        {
          status: "Export",
          title: "Download PDF",
          description: "The final state prepares a single PDF export CTA.",
          preview: "photos-to-document.pdf",
          actionLabel: "Export PDF",
        },
      ];
    default:
      return [
        {
          status: "Upload",
          title: "Upload document",
          description: "Choose a file and prepare it for the selected workflow.",
          preview: "Document selected",
        },
        {
          status: "Process",
          title: "Process workflow",
          description: "The tool simulates the document action step.",
          preview: "Processing...",
        },
        {
          status: "Result",
          title: "Download result",
          description: "The result state prepares users for final export.",
          preview: "Output ready",
        },
      ];
  }
}
