import { ButtonLink } from "@dock/shared/ui";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolRuntimeClient } from "@/components/ToolRuntimeClient";
import { UploadPanel } from "@/components/UploadPanel";
import { defaultLocale, localizedPath, type Locale, type RouteSlug } from "@/lib/i18n";
import { getRuntimeCopy } from "@/lib/copy";

export type RuntimeToolKey = "summary" | "ocr" | "compress" | "pdfToWord";

type ToolWorkspacePageProps = {
  locale?: Locale;
  structuredData?: unknown;
  tool: RuntimeToolKey;
};

const toolRuntimeConfig = {
  summary: {
    accept: "application/pdf,.pdf,.doc,.docx",
    allowedExtensions: [".pdf", ".doc", ".docx"],
    route: "ai-summary",
  },
  ocr: {
    accept: "application/pdf,.pdf,image/png,.png,image/jpeg,.jpg,.jpeg",
    allowedExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
    route: "ocr",
  },
  compress: {
    accept: "application/pdf,.pdf",
    allowedExtensions: [".pdf"],
    route: "compress-pdf",
  },
  pdfToWord: {
    accept: "application/pdf,.pdf",
    allowedExtensions: [".pdf"],
    route: "pdf-to-word",
  },
} satisfies Record<
  RuntimeToolKey,
  {
    accept: string;
    allowedExtensions: string[];
    route: RouteSlug;
  }
>;

const workspaceLabels = {
  en: {
    platform: "AI Document Platform",
    workspace: "Tool Workspace",
    free: "FREE",
    plus: "PLUS",
    comingSoon: "Coming soon",
    trail: ["Home", "Tool Discovery", "Tool Workspace", "Dashboard"],
    sourceLabel: "Document source",
    resultLabel: "Result preview",
    processingLabel: "Processing state",
    suggestedTitle: "Suggested next actions",
    suggestedDescription:
      "Continue from the generated output into a document-first workflow without leaving the workspace.",
    relatedTitle: "Related workflows",
    relatedDescription:
      "Move between AI reading, extraction, conversion, and optimization with consistent upload and result states.",
    uploadFirst: "Upload first",
    ready: "Ready for output",
    nextChat: "Start a document chat",
    nextDashboard: "Review in dashboard",
    nextPricing: "Compare plans",
  },
  zh: {
    platform: "AI 文档平台",
    workspace: "工具工作区",
    free: "FREE",
    plus: "PLUS",
    comingSoon: "即将推出",
    trail: ["首页", "工具发现", "工具工作区", "控制台"],
    sourceLabel: "文档来源",
    resultLabel: "结果预览",
    processingLabel: "处理状态",
    suggestedTitle: "建议下一步",
    suggestedDescription:
      "从生成结果继续进入文档工作流，不需要离开当前工作区。",
    relatedTitle: "相关工作流",
    relatedDescription:
      "在 AI 阅读、提取、转换和优化之间切换，并保持一致的上传与结果状态。",
    uploadFirst: "先上传",
    ready: "准备输出",
    nextChat: "开始文档对话",
    nextDashboard: "前往控制台",
    nextPricing: "查看方案",
  },
} as const;

const workflowRoutes = {
  summary: ["chat-with-pdf", "ocr", "dashboard"],
  ocr: ["ai-summary", "chat-with-pdf", "dashboard"],
  compress: ["chat-with-pdf", "pdf-to-word", "dashboard"],
  pdfToWord: ["ai-summary", "chat-with-pdf", "dashboard"],
} satisfies Record<RuntimeToolKey, RouteSlug[]>;

export function ToolWorkspacePage({
  locale = defaultLocale,
  structuredData,
  tool,
}: ToolWorkspacePageProps) {
  const copy = getRuntimeCopy(locale);
  const page = copy[tool];
  const config = toolRuntimeConfig[tool];
  const labels = workspaceLabels[locale];
  const hasPrimaryCta = "primaryCta" in page;
  const primaryCta = hasPrimaryCta ? page.primaryCta : page.cta;
  const secondaryCta = hasPrimaryCta ? page.secondaryCta : copy.chat.workspaceTitle;
  const relatedWorkflows = workflowRoutes[tool].map((slug) => ({
    href: localizedWorkspacePath(locale, slug),
    label: workflowLabel(locale, slug),
    tier: slug === "dashboard" ? labels.plus : labels.free,
  }));

  return (
    <main data-testid="tool-workspace-page">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-8 sm:px-6 sm:py-10 lg:min-h-[calc(100vh-92px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:px-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                {labels.platform}
              </span>
              <span className="rounded-[var(--radius-sm)] border border-[color:var(--success-line)] bg-[color:var(--success-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--success)]">
                {labels.free}
              </span>
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl xl:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">
              {page.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#upload">{primaryCta}</ButtonLink>
              <ButtonLink href={localizedWorkspacePath(locale, "chat-with-pdf")} variant="outline">
                {secondaryCta}
              </ButtonLink>
            </div>
            <WorkflowTrail labels={labels.trail} locale={locale} />
          </div>
          <div className="min-w-0">
            <UploadPanel
              title={page.uploadTitle}
              description={page.uploadDescription}
              formats={page.formats}
              limit={page.limit}
              cta={page.cta}
              interactive={false}
              labels={copy.common.upload}
            />
            <div className="mt-3 grid gap-2 text-xs text-[color:var(--muted)] sm:grid-cols-3">
              {[labels.sourceLabel, labels.processingLabel, labels.resultLabel].map((item) => (
                <span
                  key={item}
                  className="rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="upload"
        className="border-b border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-12 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(320px,0.24fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                {page.outputEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {page.outputHeading}
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-[color:var(--muted)]">
                {page.outputDescription}
              </p>
            </div>
            <div className="grid gap-2 rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-3 text-sm">
              <StatusRow label={labels.uploadFirst} value={page.formats} />
              <StatusRow label={labels.ready} value={page.limit} />
            </div>
          </div>
          <div className="mt-8" data-testid="tool-runtime-workspace">
            <ToolRuntimeClient
              uploadTitle={page.runtimeUploadTitle}
              uploadDescription={page.runtimeUploadDescription}
              formats={page.formats}
              limit={page.limit}
              cta={page.cta}
              accept={config.accept}
              allowedExtensions={config.allowedExtensions}
              outputEyebrow={page.resultEyebrow}
              outputTitle={page.resultTitle}
              outputSummary={page.resultSummary}
              keyPoints={[...page.keyPoints]}
              actions={[...page.actions]}
              emptyMessage={page.emptyMessage}
              locale={locale}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.4fr)]">
          <div data-testid="tool-next-actions">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {labels.suggestedTitle}
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-[color:var(--muted)]">
              {labels.suggestedDescription}
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {page.actions.map((action, index) => (
                <a
                  key={action}
                  href={index === 0 ? localizedWorkspacePath(locale, "chat-with-pdf") : localizedWorkspacePath(locale, "dashboard")}
                  className="min-h-24 rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-4 text-sm font-semibold leading-6 transition hover:border-[color:var(--foreground)] hover:bg-[color:var(--surface)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                  <span className="mb-3 inline-flex rounded-[var(--radius-sm)] bg-[color:var(--soft-accent)] px-2 py-1 text-[10px] font-semibold text-[color:var(--accent-strong)]">
                    {index === 0 ? labels.nextChat : labels.nextDashboard}
                  </span>
                  <span className="block">{action}</span>
                </a>
              ))}
            </div>
          </div>
          <aside
            className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-4"
            data-testid="tool-related-workflows"
          >
            <p className="text-sm font-semibold">{labels.relatedTitle}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {labels.relatedDescription}
            </p>
            <div className="mt-4 grid gap-2">
              {relatedWorkflows.map((workflow) => (
                <a
                  key={workflow.href}
                  href={workflow.href}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm font-semibold transition hover:border-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                  <span>{workflow.label}</span>
                  <span className="rounded-[var(--radius-sm)] bg-[color:var(--soft-accent)] px-2 py-1 text-[10px] font-semibold text-[color:var(--accent-strong)]">
                    {workflow.tier}
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {"faqs" in page ? <LocalizedFaq title={page.faqTitle} faqs={[...page.faqs]} /> : null}
      <RelatedTools />
    </main>
  );
}

function WorkflowTrail({
  labels,
  locale,
}: {
  labels: readonly string[];
  locale: Locale;
}) {
  const hrefs = [
    localizedWorkspacePath(locale, ""),
    `${localizedWorkspacePath(locale, "")}#tools`,
    "#upload",
    localizedWorkspacePath(locale, "dashboard"),
  ];

  return (
    <nav
      aria-label="Workspace path"
      className="mt-7 flex max-w-full flex-wrap items-center gap-2 text-xs font-semibold text-[color:var(--muted)]"
    >
      {labels.map((label, index) => (
        <span key={label} className="flex items-center gap-2">
          <a
            href={hrefs[index]}
            className="rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-2.5 py-1.5 transition hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
          >
            {label}
          </a>
          {index < labels.length - 1 ? <span aria-hidden="true">/</span> : null}
        </span>
      ))}
    </nav>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[color:var(--muted)]">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function LocalizedFaq({
  faqs,
  title,
}: {
  faqs: { answer: string; question: string }[];
  title: string;
}) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-b border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
          FAQ
        </p>
        <h2 id="faq-title" className="mt-4 text-3xl font-semibold">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold">
                {faq.question}
                <span className="text-[color:var(--muted)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function workflowLabel(locale: Locale, slug: RouteSlug) {
  const copy = getRuntimeCopy(locale);

  switch (slug) {
    case "ai-summary":
      return copy.summary.title;
    case "ocr":
      return copy.ocr.title;
    case "compress-pdf":
      return copy.compress.title;
    case "pdf-to-word":
      return copy.pdfToWord.title;
    case "chat-with-pdf":
      return copy.chat.workspaceTitle;
    case "dashboard":
      return copy.dashboard.workspace;
    default:
      return slug;
  }
}

function localizedWorkspacePath(locale: Locale, slug: RouteSlug | "") {
  if (!slug) {
    return locale === defaultLocale ? "/" : localizedPath(locale, "");
  }

  return locale === defaultLocale ? `/${slug}` : localizedPath(locale, slug);
}
