"use client";

import { useState } from "react";

type Locale = "en" | "zh";
type Feat = { x: number; y: number; zh: string; en: string; dzh: string; den: string; href?: string; soon?: boolean };
type Cat = { x: number; y: number; zh: string; en: string; color: string; feats: Feat[] };

const CENTER = { zh: "DockDocs", subZh: "懂你的 PDF", en: "DockDocs", subEn: "understands your PDF" };

const CATS: Cat[] = [
  {
    x: 27, y: 30, zh: "PDF 工具", en: "PDF Tools", color: "#818cf8",
    feats: [
      { x: 11, y: 15, zh: "格式转换", en: "Convert", dzh: "PDF 与 Word、Excel、PPT、图片自由互转", den: "PDF ↔ Word, Excel, PPT, images", href: "/pdf-to-word" },
      { x: 8.5, y: 45, zh: "整理压缩", en: "Organize", dzh: "合并、拆分、压缩、裁剪、旋转", den: "Merge, split, compress, crop, rotate", href: "/merge-pdf" },
      { x: 38, y: 9, zh: "涂黑签名", en: "Secure", dzh: "敏感信息真删除、加密、电子签名", den: "True redaction, encryption, e-sign", href: "/redact-pdf" },
    ],
  },
  {
    x: 73, y: 30, zh: "AI 工作流", en: "AI Workflows", color: "#22d3ee",
    feats: [
      { x: 89, y: 15, zh: "PDF 问答", en: "Chat with PDF", dzh: "和 PDF 对话,答案带原文出处", den: "Ask your PDF — answers cite the source", href: "/chat-with-pdf" },
      { x: 91.5, y: 45, zh: "多文档对比", en: "Compare docs", dzh: "多份合同/报价并排对比,秒选最优", den: "Compare contracts & quotes side by side", href: "/compare" },
      { x: 62, y: 9, zh: "数据抽取", en: "Extract data", dzh: "把关键字段抽成 Excel 表格", den: "Pull key fields into a spreadsheet", href: "/extract-to-excel" },
    ],
  },
  {
    x: 27, y: 70, zh: "批量处理", en: "Batch", color: "#c084fc",
    feats: [
      { x: 11, y: 85, zh: "批量工具", en: "Batch tools", dzh: "整个文件夹一次处理:转换/压缩/水印…", den: "Process a whole folder at once", href: "/batch-compress" },
      { x: 8.5, y: 55, zh: "批量分类", en: "Batch sort", dzh: "AI 把一堆杂乱文件自动归类整理", den: "AI sorts a messy pile into folders", href: "/batch-sort" },
      { x: 38, y: 91, zh: "批量抽取", en: "Batch extract", dzh: "一堆发票 → 一张总表", den: "A pile of invoices → one sheet", href: "/batch-extract-sheet" },
    ],
  },
  {
    x: 73, y: 70, zh: "专业领域", en: "By Profession", color: "#fbbf24",
    feats: [
      { x: 89, y: 85, zh: "法律合同", en: "Legal", dzh: "合同审查、条款风险红旗", den: "Contract review, risk red-flags", soon: true },
      { x: 91.5, y: 55, zh: "财务税务", en: "Finance", dzh: "对账、票据流水线", den: "Reconciliation, invoice pipelines", soon: true },
      { x: 62, y: 91, zh: "科研学术", en: "Research", dzh: "文献综述、资料抽取", den: "Literature reviews, data extraction", soon: true },
    ],
  },
];

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export function HeroFeatureGraph({ locale = "en" }: { locale?: Locale }) {
  const zh = locale === "zh";
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="hfg-wrap">
      <style>{`
        .hfg-wrap{position:relative;width:100%;}
        @keyframes hfg-float{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-7px)}}
        @keyframes hfg-pulse{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1)}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.18)}}
        @keyframes hfg-flow{to{stroke-dashoffset:-22}}
        @keyframes hfg-in{from{opacity:0;transform:translate(-50%,-50%) scale(.6)}to{opacity:1}}
        @keyframes hfg-line-in{to{stroke-dashoffset:0}}
        .hfg-node{position:absolute;animation:hfg-in .7s cubic-bezier(.2,.8,.2,1) backwards;}
        .hfg-float{animation:hfg-in .7s cubic-bezier(.2,.8,.2,1) backwards, hfg-float var(--d,6s) ease-in-out infinite;}
        .hfg-feat{cursor:pointer;}
        .hfg-pill{white-space:nowrap;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,border-color .25s,background .25s;}
        .hfg-feat:hover .hfg-pill{transform:scale(1.09);}
        .hfg-tip{position:absolute;left:50%;transform:translateX(-50%) translateY(4px);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:30;}
        .hfg-feat:hover .hfg-tip{opacity:1;transform:translateX(-50%) translateY(0);}
        @media (prefers-reduced-motion: reduce){.hfg-float{animation:hfg-in .7s backwards}.hfg-flow{animation:none}}
      `}</style>

      {/* ── Graph (sm and up) ── */}
      <div className="relative mx-auto hidden w-full max-w-[940px] sm:block" style={{ aspectRatio: "16 / 10" }}>
        {/* connecting lines */}
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            {CATS.map((c, i) => (
              <linearGradient key={i} id={`hfg-g${i}`} x1="50" y1="50" x2={c.x} y2={c.y} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#6366f1" stopOpacity="0.55" />
                <stop offset="1" stopColor={c.color} stopOpacity="0.7" />
              </linearGradient>
            ))}
          </defs>
          {CATS.map((c, i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={c.x} y2={c.y} stroke={`url(#hfg-g${i})`} strokeWidth="0.4" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                strokeDasharray="2 2" className="hfg-flow" style={{ animation: "hfg-flow 1.4s linear infinite" }} />
              {c.feats.map((f, j) => (
                <line key={j} x1={c.x} y1={c.y} x2={f.x} y2={f.y} stroke={c.color} strokeOpacity={active === null || active === `${i}-${j}` ? 0.32 : 0.12}
                  strokeWidth="0.35" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ transition: "stroke-opacity .25s" }} />
              ))}
            </g>
          ))}
        </svg>

        {/* center pulse halo */}
        <span className="hfg-node" style={{ left: "50%", top: "50%", width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,.45), transparent 70%)", animation: "hfg-pulse 4.5s ease-in-out infinite", transform: "translate(-50%,-50%)", zIndex: 1 }} />

        {/* center node */}
        <div className="hfg-node hfg-float" style={{ left: "50%", top: "50%", zIndex: 20, ["--d" as string]: "7s" }}>
          <div className="flex flex-col items-center justify-center rounded-full border border-[rgba(129,140,248,.5)] bg-[rgba(30,32,46,.92)] px-7 py-5 text-center shadow-[0_0_42px_rgba(99,102,241,.45)]" style={{ minWidth: 168 }}>
            <span className="text-[19px] font-bold tracking-tight text-white">{CENTER[zh ? "zh" : "en"]}</span>
            <span className="mt-0.5 text-[12.5px] font-medium text-[#a5b4fc]">{zh ? CENTER.subZh : CENTER.subEn}</span>
          </div>
        </div>

        {/* category nodes */}
        {CATS.map((c, i) => (
          <div key={i} className="hfg-node hfg-float" style={{ left: `${c.x}%`, top: `${c.y}%`, zIndex: 15, animationDelay: `${0.1 + i * 0.08}s`, ["--d" as string]: `${5.5 + i * 0.7}s` }}>
            <div className="hfg-pill flex items-center gap-1.5 rounded-full border px-4 py-2 font-semibold backdrop-blur-sm"
              style={{ borderColor: `${c.color}66`, background: `${c.color}1f`, color: "#fff", boxShadow: `0 0 22px ${c.color}33`, fontSize: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
              {zh ? c.zh : c.en}
            </div>
          </div>
        ))}

        {/* feature nodes */}
        {CATS.map((c, i) => c.feats.map((f, j) => {
          const id = `${i}-${j}`;
          const tipBelow = f.y < 46;
          return (
            <a key={id} href={f.soon ? undefined : f.href} className="hfg-node hfg-feat" aria-disabled={f.soon}
              onMouseEnter={() => setActive(id)} onMouseLeave={() => setActive(null)}
              onClick={(e) => { if (f.soon) e.preventDefault(); }}
              style={{ left: `${f.x}%`, top: `${f.y}%`, zIndex: 16, animationDelay: `${0.3 + (i * 3 + j) * 0.05}s`, ["--d" as string]: `${5 + ((i + j) % 4) * 0.6}s`, textDecoration: "none" }}>
              <div className="hfg-pill flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[rgba(22,24,34,.9)] px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--foreground)] hover:border-[color:var(--line-strong)]"
                style={active === id ? { borderColor: c.color, boxShadow: `0 0 18px ${c.color}55` } : undefined}>
                {zh ? f.zh : f.en}
                {f.soon && <span className="rounded-full bg-[rgba(251,191,36,.16)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[#fbbf24]">soon</span>}
              </div>
              <div className="hfg-tip" style={{ [tipBelow ? "top" : "bottom"]: "calc(100% + 8px)" }}>
                <div className="max-w-[210px] rounded-[10px] border border-[color:var(--line)] bg-[rgba(16,17,25,.97)] px-3 py-2 text-center text-[12px] leading-snug text-[color:var(--muted)] shadow-[0_8px_30px_rgba(0,0,0,.5)]">
                  {zh ? f.dzh : f.den}
                </div>
              </div>
            </a>
          );
        }))}
      </div>

      {/* ── Mobile fallback (below sm) ── */}
      <div className="sm:hidden">
        <div className="mx-auto mb-6 w-fit rounded-full border border-[rgba(129,140,248,.5)] bg-[rgba(30,32,46,.92)] px-6 py-4 text-center shadow-[0_0_30px_rgba(99,102,241,.4)]">
          <div className="text-[20px] font-bold text-white">{CENTER[zh ? "zh" : "en"]}</div>
          <div className="text-[13px] font-medium text-[#a5b4fc]">{zh ? CENTER.subZh : CENTER.subEn}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATS.map((c, i) => (
            <div key={i} className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-3">
              <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[color:var(--foreground)]">
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
                {zh ? c.zh : c.en}
              </div>
              <ul className="mt-1.5 space-y-0.5 text-[12px] text-[color:var(--muted)]">
                {c.feats.map((f, j) => <li key={j}>{zh ? f.zh : f.en}{f.soon ? " ·soon" : ""}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
