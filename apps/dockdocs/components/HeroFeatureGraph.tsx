"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { navCategories } from "@/components/Header";

type Locale = "en" | "zh";
type Item = { name: string; slug: string };
type Vec = [number, number, number];

const CENTER = { zh: "DockDocs", subZh: "懂你的 PDF", en: "DockDocs", subEn: "understands your PDF" };
const COLORS = ["#818cf8", "#c084fc", "#22d3ee", "#fbbf24"];
// category base angles (math angle, y up): up-left / down-left / up-right / down-right
const ANG = [Math.PI * 0.75, Math.PI * 1.25, Math.PI * 0.25, Math.PI * 1.75];
const CAT_BLURB = [
  { zh: "转换 · 整理 · 加密 · 签名", en: "Convert · organize · encrypt · sign" },
  { zh: "整批 / 整文件夹一次处理", en: "Whole folders in one pass" },
  { zh: "AI 读懂 · 问答 · 对比 · 抽取", en: "AI reads · answers · compares · extracts" },
  { zh: "面向法律 / 财务 / 科研场景", en: "Legal · finance · research workflows" },
];
const DESC: Record<string, { zh: string; en: string }> = {
  "/pdf-to-word": { zh: "PDF 与 Word / Excel / PPT / 图片互转", en: "PDF ↔ Word / Excel / PPT / images" },
  "/split-pdf": { zh: "拆分、合并、压缩、整理页面", en: "Split, merge, compress, organize" },
  "/merge-pdf": { zh: "把多份 PDF 合并成一个", en: "Combine multiple PDFs into one" },
  "/protect-pdf": { zh: "加密、解锁、电子签名", en: "Encrypt, unlock, e-sign" },
  "/redact-pdf": { zh: "敏感信息真删除,不可恢复", en: "Permanently remove sensitive text" },
  "/chat-with-pdf": { zh: "和 PDF 对话,答案带出处", en: "Ask your PDF — answers cite sources" },
  "/ai-summary": { zh: "一键读懂长文档要点", en: "Grasp a long document fast" },
  "/compare": { zh: "多份合同 / 报价并排对比", en: "Compare contracts & quotes" },
  "/redline": { zh: "对比两版文档,标出增删", en: "Diff two versions, mark changes" },
  "/extract-to-excel": { zh: "把关键字段抽成表格", en: "Pull key fields into a sheet" },
  "/batch-compress": { zh: "整个文件夹一次压缩", en: "Compress a whole folder" },
  "/batch-sort": { zh: "AI 自动归类杂乱文件", en: "AI sorts a messy pile" },
};

const THETA = 1.02; // dome angular radius (~58°)
const CAM = 2.7;
const BASE_TILT = -0.12;

function flatItems(cat: { cols: { items: Item[] }[] }): Item[] {
  const seen = new Set<string>(); const out: Item[] = [];
  for (const col of cat.cols) for (const it of col.items ?? []) { const k = it.name + it.slug; if (!seen.has(k)) { seen.add(k); out.push(it); } }
  return out;
}
// place n features in a clean fan (rows of arcs) around base angle A → polar (r, phi)
function fan(n: number, A: number): { r: number; phi: number }[] {
  const out: { r: number; phi: number }[] = [];
  const perArc = 5;
  const arcs = Math.ceil(n / perArc);
  const wedge = 0.72;
  for (let a = 0; a < arcs; a++) {
    const inArc = Math.min(perArc, n - a * perArc);
    const r = 0.58 + (arcs === 1 ? 0.12 : a * (0.42 / (arcs - 1)));
    const spread = wedge * (0.5 + 0.5 * (arcs === 1 ? 1 : a / (arcs - 1)));
    for (let c = 0; c < inArc; c++) {
      const frac = inArc === 1 ? 0.5 : c / (inArc - 1);
      out.push({ r: Math.min(r, 1), phi: A + (frac - 0.5) * 2 * spread });
    }
  }
  return out;
}
// polar on dome → unit 3D position on the cap
function dome(r: number, phi: number): Vec {
  const al = r * THETA;
  return [Math.sin(al) * Math.cos(phi), Math.sin(al) * Math.sin(phi), Math.cos(al)];
}

type Node = { kind: "center" | "hub" | "feat"; base: Vec; color: string; cat: number; label: string; slug?: string; desc?: { zh: string; en: string } | null; blurb?: { zh: string; en: string }; headline?: boolean };

export function HeroFeatureGraph({ locale = "en" }: { locale?: Locale }) {
  const zh = locale === "zh";
  const [hover, setHover] = useState<number | null>(null);

  const { nodes, lines } = useMemo(() => {
    const cats = (navCategories[zh ? "zh" : "en"] ?? navCategories.en).slice(0, 4);
    const nodes: Node[] = [{ kind: "center", base: dome(0, 0), color: "#a5b4fc", cat: -1, label: "" }];
    const lines: { a: number; b: number; color: string; cat: number }[] = [];
    cats.forEach((cat, ci) => {
      const hubIdx = nodes.length;
      nodes.push({ kind: "hub", base: dome(0.32, ANG[ci]), color: COLORS[ci], cat: ci, label: cat.label, blurb: CAT_BLURB[ci] });
      lines.push({ a: 0, b: hubIdx, color: COLORS[ci], cat: ci });
      const feats = flatItems(cat);
      const pts = fan(feats.length, ANG[ci]);
      feats.forEach((it, k) => {
        const fi = nodes.length;
        nodes.push({ kind: "feat", base: dome(pts[k].r, pts[k].phi), color: COLORS[ci], cat: ci, label: it.name, slug: it.slug, desc: DESC[it.slug] ?? null, headline: k === 0 });
        lines.push({ a: hubIdx, b: fi, color: COLORS[ci], cat: ci });
      });
    });
    return { nodes, lines };
  }, [zh]);

  const viewport = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ringEls = useRef<(SVGPathElement | null)[]>([]);
  const nodeEls = useRef<(HTMLElement | null)[]>([]);
  const labelEls = useRef<(HTMLElement | null)[]>([]);
  const lineEls = useRef<(SVGPathElement | null)[]>([]);
  const tip = useRef<HTMLDivElement>(null);
  const proj = useRef<{ x: number; y: number; t: number }[]>([]);
  const rot = useRef({ x: BASE_TILT, y: 0 });
  const mouse = useRef<{ over: boolean; x: number; y: number }>({ over: false, x: 0.5, y: 0.5 });
  const hoverRef = useRef<number | null>(null);

  useEffect(() => {
    const vp = viewport.current; if (!vp) return;
    let raf = 0; let f = 0;
    const RINGS = [0.32, 0.66, 1];

    const project = (b: Vec, cy: number, sy: number, cx: number, sx: number, SS: number, ox: number, oy: number) => {
      let X = b[0] * cy + b[2] * sy;
      let Z = -b[0] * sy + b[2] * cy;
      let Y = b[1] * cx - Z * sx;
      Z = b[1] * sx + Z * cx;
      const p = CAM / (CAM - Z);
      return { x: ox + X * SS * p, y: oy - Y * SS * p, t: (Z + 1) / 2, p };
    };

    const tick = () => {
      f++;
      const w = vp.clientWidth, h = vp.clientHeight;
      if (w && h) {
        // ease tilt toward target (cursor parallax, or gentle idle sway)
        let ty: number, tx: number;
        if (mouse.current.over && hoverRef.current === null) {
          ty = (mouse.current.x - 0.5) * 0.5;
          tx = BASE_TILT + (mouse.current.y - 0.5) * 0.34;
        } else {
          ty = Math.sin(f * 0.006) * 0.16;
          tx = BASE_TILT + Math.sin(f * 0.0045) * 0.05;
        }
        rot.current.y += (ty - rot.current.y) * 0.06;
        rot.current.x += (tx - rot.current.x) * 0.06;

        const ry = rot.current.y, rx = rot.current.x;
        const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
        const SS = Math.min(w * 0.5, h * 0.5) * 0.8;
        const ox = w / 2, oy = h / 2;
        const aCat = hoverRef.current !== null ? nodes[hoverRef.current]?.cat ?? null : null;

        // dome rings
        for (let ri = 0; ri < RINGS.length; ri++) {
          const el = ringEls.current[ri]; if (!el) continue;
          let d = "";
          for (let s = 0; s <= 40; s++) {
            const pr = project(dome(RINGS[ri], (s / 40) * Math.PI * 2), cy, sy, cx, sx, SS, ox, oy);
            d += (s === 0 ? "M" : "L") + pr.x.toFixed(1) + " " + pr.y.toFixed(1);
          }
          el.setAttribute("d", d + "Z");
        }

        for (let i = 0; i < nodes.length; i++) {
          const pr = project(nodes[i].base, cy, sy, cx, sx, SS, ox, oy);
          proj.current[i] = { x: pr.x, y: pr.y, t: pr.t };
          const el = nodeEls.current[i]; if (!el) continue;
          const k = nodes[i].kind;
          const nodeScale = k === "feat" ? 0.62 + 0.5 * pr.p : 0.74 + 0.26 * pr.p;
          el.style.transform = `translate3d(${pr.x}px,${pr.y}px,0) translate(-50%,-50%) scale(${nodeScale})`;
          el.style.zIndex = String(200 + Math.round(pr.t * 600) + (i === hoverRef.current ? 400 : 0));
          let op = k === "center" ? 1 : 0.45 + 0.55 * pr.t;
          if (aCat !== null && nodes[i].cat !== aCat && k !== "center") op *= 0.2;
          el.style.opacity = String(op);
          const lab = labelEls.current[i];
          if (lab) {
            let lo = nodes[i].headline ? 0.85 : 0;
            if (i === hoverRef.current) lo = 1;
            if (aCat !== null && nodes[i].cat !== aCat) lo = 0;
            lab.style.opacity = String(lo);
          }
        }

        for (let i = 0; i < lines.length; i++) {
          const p = lineEls.current[i]; if (!p) continue;
          const a = proj.current[lines[i].a], b = proj.current[lines[i].b];
          if (!a || !b) continue;
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1;
          const c = l * 0.17;
          p.setAttribute("d", `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${(mx - dy / l * c).toFixed(1)} ${(my + dx / l * c).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
          let op = 0.08 + 0.26 * ((a.t + b.t) / 2);
          if (aCat !== null && lines[i].cat !== aCat) op *= 0.15;
          p.setAttribute("stroke-opacity", op.toFixed(3));
        }

        if (svg.current) svg.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
        const ti = tip.current;
        if (ti) {
          const hi = hoverRef.current;
          if (hi !== null && proj.current[hi] && nodes[hi].kind !== "center") {
            ti.style.opacity = "1";
            ti.style.transform = `translate3d(${proj.current[hi].x}px,${proj.current[hi].y}px,0) translate(-50%,calc(-100% - 16px))`;
          } else ti.style.opacity = "0";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = vp.getBoundingClientRect();
      mouse.current = { over: true, x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };
    const onLeave = () => { mouse.current.over = false; };
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(raf); vp.removeEventListener("pointermove", onMove); vp.removeEventListener("pointerleave", onLeave); };
  }, [nodes, lines]);

  const setH = (i: number | null) => { hoverRef.current = i; setHover(i); };
  const hov = hover !== null ? nodes[hover] : null;

  return (
    <div className="hfg-wrap">
      <style>{`
        .hfg-wrap{position:relative;width:100%;}
        .hfg-node{position:absolute;left:0;top:0;will-change:transform,opacity;}
        .hfg-dot{display:block;border-radius:50%;}
        .hfg-tipbox{position:absolute;left:0;top:0;opacity:0;pointer-events:none;transition:opacity .18s;z-index:1200;white-space:nowrap;will-change:transform,opacity;}
        @keyframes hfg-pulse{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}50%{opacity:.85;transform:translate(-50%,-50%) scale(1.16)}}
        @keyframes hfg-fade{from{opacity:0}to{opacity:1}}
        .hfg-lab{transition:opacity .25s;}
      `}</style>

      {/* Desktop: convex dome of feature nodes */}
      <div ref={viewport} className="relative mx-auto hidden w-full max-w-[1040px] touch-none select-none sm:block" style={{ aspectRatio: "16 / 11", animation: "hfg-fade .8s ease both" }}>
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,.4), transparent 70%)", animation: "hfg-pulse 4.5s ease-in-out infinite", zIndex: 1 }} />

        <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {[0, 1, 2].map((ri) => (
            <path key={`r${ri}`} ref={(el) => { ringEls.current[ri] = el; }} stroke="var(--line)" strokeWidth="1" fill="none" strokeOpacity={0.14 - ri * 0.03} />
          ))}
          {lines.map((ln, i) => (
            <path key={i} ref={(el) => { lineEls.current[i] = el; }} stroke={ln.color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
          ))}
        </svg>

        {nodes.map((nd, i) => {
          if (nd.kind === "center") {
            return (
              <div key={i} ref={(el) => { nodeEls.current[i] = el; }} className="hfg-node" style={{ zIndex: 300 }}>
                <span className="flex flex-col items-center justify-center rounded-full border border-[rgba(129,140,248,.55)] bg-[rgba(28,30,44,.94)] px-6 py-4 text-center shadow-[0_0_46px_rgba(99,102,241,.5)]" style={{ minWidth: 150 }}>
                  <span className="text-[18px] font-bold tracking-tight text-white">{CENTER[zh ? "zh" : "en"]}</span>
                  <span className="mt-0.5 text-[12px] font-medium text-[#a5b4fc]">{zh ? CENTER.subZh : CENTER.subEn}</span>
                </span>
              </div>
            );
          }
          if (nd.kind === "hub") {
            return (
              <div key={i} ref={(el) => { nodeEls.current[i] = el; }} className="hfg-node" onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)}>
                <span className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold text-white backdrop-blur-sm" style={{ borderColor: `${nd.color}77`, background: `${nd.color}26`, boxShadow: `0 0 20px ${nd.color}40` }}>
                  <span className="hfg-dot" style={{ width: 7, height: 7, background: nd.color, boxShadow: `0 0 8px ${nd.color}` }} />
                  {nd.label}
                </span>
              </div>
            );
          }
          return (
            <a key={i} ref={(el) => { nodeEls.current[i] = el; }} href={nd.slug} className="hfg-node flex flex-col items-center" style={{ textDecoration: "none" }}
              onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)}>
              <span className="hfg-dot" style={{ width: 9, height: 9, background: nd.color, boxShadow: `0 0 10px ${nd.color}, 0 0 3px ${nd.color}` }} />
              <span ref={(el) => { labelEls.current[i] = el; }} className="hfg-lab mt-1.5 whitespace-nowrap rounded-md border border-[color:var(--line)] bg-[rgba(18,20,30,.85)] px-2 py-0.5 text-[11.5px] font-medium text-[color:var(--foreground)]" style={{ opacity: 0 }}>{nd.label}</span>
            </a>
          );
        })}

        {/* Single repositioned tooltip */}
        <div ref={tip} className="hfg-tipbox">
          <div className="rounded-[10px] border bg-[rgba(14,15,22,.97)] px-3 py-2 text-center shadow-[0_10px_34px_rgba(0,0,0,.55)]" style={{ borderColor: hov ? `${hov.color}66` : "var(--line)", maxWidth: 240 }}>
            <div className="text-[13px] font-semibold text-white">{hov?.label}</div>
            {hov && (hov.kind === "hub" ? hov.blurb : hov.desc) && (
              <div className="mt-0.5 text-[11.5px] leading-snug text-[color:var(--muted)]">{(() => { const d = hov.kind === "hub" ? hov.blurb : hov.desc; return d ? (zh ? d.zh : d.en) : null; })()}</div>
            )}
          </div>
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] tracking-wide text-[color:var(--faint)]" style={{ opacity: 0.6 }}>
          {zh ? "移动鼠标转动 · 悬停查看功能" : "move to tilt · hover to explore"}
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="sm:hidden">
        <div className="mx-auto mb-6 w-fit rounded-full border border-[rgba(129,140,248,.5)] bg-[rgba(30,32,46,.92)] px-6 py-4 text-center shadow-[0_0_30px_rgba(99,102,241,.4)]">
          <div className="text-[20px] font-bold text-white">{CENTER[zh ? "zh" : "en"]}</div>
          <div className="text-[13px] font-medium text-[#a5b4fc]">{zh ? CENTER.subZh : CENTER.subEn}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(navCategories[zh ? "zh" : "en"] ?? navCategories.en).slice(0, 4).map((cat, i) => {
            const feats = flatItems(cat as { cols: { items: Item[] }[] });
            return (
              <div key={i} className="rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] p-3">
                <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[color:var(--foreground)]">
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS[i] }} />{cat.label}
                </div>
                <p className="mt-1 text-[11px] leading-snug text-[color:var(--faint)]">{zh ? CAT_BLURB[i].zh : CAT_BLURB[i].en}</p>
                <ul className="mt-1.5 grid grid-cols-2 gap-x-2 text-[11.5px] text-[color:var(--muted)]">
                  {feats.slice(0, 8).map((ff, j) => <li key={j} className="truncate">{ff.name}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
