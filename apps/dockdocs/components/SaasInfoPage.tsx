import { ButtonLink, Container, Section } from "@dock/shared/ui";
import {
  defaultLocale,
  localizedHref,
  type InfoPageData,
  type Locale,
} from "@/lib/i18n";

type SaasInfoPageProps = {
  page: InfoPageData;
  locale?: Locale;
  useLocalePrefix?: boolean;
};

export function SaasInfoPage({
  page,
  locale = defaultLocale,
  useLocalePrefix = false,
}: SaasInfoPageProps) {
  const crawlLinks =
    locale === "zh"
      ? [
          {
            label: "文档工作区",
            href: "/",
            description: "返回 DockDocs AI Document Platform 首页。",
          },
          {
            label: "资源中心",
            href: "/resources",
            description: "按工作流浏览 PDF、OCR、转换和 AI 文档资源。",
          },
          {
            label: "文档指南",
            href: "/guides",
            description: "阅读压缩、转换、OCR 和 AI 文档工作流指南。",
          },
          {
            label: "FAQ",
            href: "/faq",
            description: "查看隐私、上传、OCR、AI 和导出相关问题。",
          },
        ]
      : [
          {
            label: "PDF Tools",
            href: "/",
            description: "Return to the DockDocs PDF tools homepage.",
          },
          {
            label: "Resources",
            href: "/resources",
            description:
              "Browse PDF, OCR, conversion, and AI document workflow resources.",
          },
          {
            label: "PDF Guides",
            href: "/guides",
            description:
              "Read step-by-step guides for compression, merging, splitting, and conversion.",
          },
          {
            label: "FAQ",
            href: "/faq",
            description:
              "Review privacy, upload, OCR, AI, and export questions.",
          },
        ];

  return (
    <main className="bg-[color:var(--surface)] text-[color:var(--foreground)]">
      <Section className="border-b border-[color:var(--line)] bg-[color:var(--surface)]">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl break-words text-2xl font-semibold leading-tight sm:text-6xl">
            {page.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {page.heroDescription}
          </p>
          {(page.primaryAction || page.secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.primaryAction ? (
                <ButtonLink
                  href={localizedHref(
                    page.primaryAction.href,
                    locale,
                    useLocalePrefix,
                  )}
                >
                  {page.primaryAction.label}
                </ButtonLink>
              ) : null}
              {page.secondaryAction ? (
                <ButtonLink
                  href={localizedHref(
                    page.secondaryAction.href,
                    locale,
                    useLocalePrefix,
                  )}
                  variant="outline"
                >
                  {page.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          )}
        </Container>
      </Section>
      {page.sections.map((section, index) => (
        <Section
          key={section.title}
          className={index % 2 === 0 ? "bg-[color:var(--surface-subtle)]" : "bg-[color:var(--surface)]"}
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  {section.title}
                </h2>
                <p className="mt-4 leading-7 text-[color:var(--muted)]">
                  {section.description}
                </p>
              </div>
              {section.items?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-sm"
                    >
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ))}
      {page.faqs?.length ? (
        <Section className="bg-[color:var(--surface)]">
          <Container className="max-w-4xl">
            <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold">
                    {faq.question}
                    <span className="text-[color:var(--muted)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-[color:var(--muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      <Section className="border-t border-[color:var(--line)] bg-[color:var(--surface-subtle)]">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                {locale === "zh" ? "继续探索" : "Continue exploring"}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                {locale === "zh"
                  ? "相关工具、指南和支持内容。"
                  : "Related tools, guides, and support content."}
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-[color:var(--muted)]">
              {locale === "zh"
                ? "这些链接帮助用户和搜索引擎在 DockDocs 的工具页、资源页和信任页面之间建立清晰路径。"
                : "These links give users and search engines clear paths between DockDocs tools, resources, and trust pages."}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {crawlLinks.map((link) => (
              <a
                key={link.href}
                href={localizedHref(link.href, locale, useLocalePrefix)}
                className="group rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--foreground)] hover:shadow-[0_16px_32px_rgba(24,24,20,0.08)]"
              >
                <h3 className="font-semibold text-[color:var(--foreground)]">{link.label}</h3>
                <p className="mt-3 leading-6 text-[color:var(--muted)]">
                  {link.description}
                </p>
                <span className="mt-5 inline-block font-semibold text-[color:var(--foreground)] transition group-hover:translate-x-0.5">
                  {locale === "zh" ? "打开页面" : "Open page"} -&gt;
                </span>
              </a>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
