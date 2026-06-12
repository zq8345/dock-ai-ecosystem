"use client";

import { navCategories } from "@/components/Header";

type Locale = "en" | "zh";
type Item = { name: string; slug: string };

const COPY = {
  en: {
    eyebrow: "AI Document Intelligence",
    title: "Everything you need to do with a PDF.",
    desc: "Free tools, batch automation, and AI that actually reads your documents — most run right in your browser, so your files never leave your device.",
    primary: "Chat with a PDF", primaryHref: "/chat-with-pdf",
    secondary: "Compare documents", secondaryHref: "/compare",
    toolsLabel: "tools",
    explore: "Explore every tool",
    stats: [["Grounded", "Answers cite the source"], ["Private", "Files stay on your device"], ["Secure", "Files auto-delete after use"]],
  },
  zh: {
    eyebrow: "AI 文档智能",
    title: "围绕 PDF 的全方位解决方案。",
    desc: "免费工具、批量自动化，加上真正读懂文档的 AI——大多在浏览器内完成，文件不外泄。",
    primary: "与 PDF 对话", primaryHref: "/chat-with-pdf",
    secondary: "多文档对比", secondaryHref: "/compare",
    toolsLabel: "个工具",
    explore: "浏览全部工具",
    stats: [["可溯源", "答案可点回原文"], ["隐私", "文件留在你的设备"], ["安全", "文件用后自动删除"]],
  },
} as const;

const BLURB = [
  { zh: "转换、整理、加密、签名——全套基础 PDF 处理", en: "Convert, organize, encrypt and sign — the full PDF toolkit" },
  { zh: "整批 / 整文件夹一次处理,省下重复劳动", en: "Process whole folders in one pass — no repetitive clicking" },
  { zh: "让 AI 读懂、问答、对比、抽取你的文档", en: "AI that reads, answers, compares and extracts your docs" },
  { zh: "面向法律 / 财务 / 科研等场景的专项方案", en: "Tailored workflows for legal, finance, research and more" },
];

// category icons by nav index (0 PDF · 1 Batch · 2 AI · 3 Profession)
const ICONS = [
  <path key="i0" d="M7 3h6l4 4v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M13 3v4h4" />,
  <path key="i1" d="M4 8l8-4 8 4-8 4-8-4Z M4 12l8 4 8-4 M4 16l8 4 8-4" />,
  <path key="i2" d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3L12 3Z M18 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />,
  <path key="i3" d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />,
];

function flatItems(cat: { cols: { items: Item[] }[] }): Item[] {
  const seen = new Set<string>(); const out: Item[] = [];
  for (const col of cat.cols) for (const it of col.items ?? []) { const k = it.name + it.slug; if (!seen.has(k)) { seen.add(k); out.push(it); } }
  return out;
}

export function HeroBento({ locale = "en" }: { locale?: Locale }) {
  const zh = locale === "zh";
  const c = COPY[zh ? "zh" : "en"];
  const cats = (navCategories[zh ? "zh" : "en"] ?? navCategories.en).slice(0, 4);
  const path = (slug: string) => (zh ? `/zh${slug}` : slug);
  // bento order: PDF tools (wide, full row) then AI · Batch · Profession
  const order = [0, 2, 1, 3];

  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      {/* ── Headline block ── */}
      <div className="mx-auto max-w-3xl text-center">
        <span className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 py-1 text-[11px] font-semibold text-[color:var(--muted)] ${zh ? "" : "uppercase tracking-[0.14em]"}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          {c.eyebrow}
        </span>

        <h1 className="mt-6 text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-[color:var(--foreground)] sm:text-[50px] lg:text-[56px]">
          {c.title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[color:var(--muted)] sm:text-[17px]">
          {c.desc}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={path(c.primaryHref)} className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-[14px] font-semibold transition hover:bg-[color:var(--accent-hover)]">
            {c.primary}
          </a>
          <a href={path(c.secondaryHref)} className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-6 text-[14px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--foreground)]">
            {c.secondary}
          </a>
        </div>

        {/* Trust chips */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {c.stats.map(([val, label]) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--muted)]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[color:var(--accent)]"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="font-semibold text-[color:var(--foreground)]">{val}</span>
              <span className="text-[color:var(--faint)]">{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Bento grid of categories ── */}
      <p className="mt-16 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--faint)]">{c.explore}</p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {order.map((ci) => {
          const cat = cats[ci];
          if (!cat) return null;
          const tools = flatItems(cat as { cols: { items: Item[] }[] });
          const wide = ci === 0;
          return (
            <div key={ci} className={`group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition-colors duration-200 hover:border-[color:var(--line-strong)] ${wide ? "md:col-span-3" : "md:col-span-1"}`}>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(460px circle at 28% 0%, rgba(62,207,142,0.07), transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--accent)]">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[ci]}</svg>
                  </span>
                  <h3 className="text-[15.5px] font-semibold text-[color:var(--foreground)]">{cat.label}</h3>
                  <span className="ml-auto text-[11px] font-medium text-[color:var(--faint)]">{tools.length} {c.toolsLabel}</span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[color:var(--muted)]">{zh ? BLURB[ci].zh : BLURB[ci].en}</p>
                <div className={`mt-4 flex flex-wrap gap-x-4 gap-y-1.5 ${wide ? "" : "max-w-full"}`}>
                  {tools.map((t, k) => (
                    <a key={k} href={path(t.slug)} className="text-[12.5px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent-strong)]">{t.name}</a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
