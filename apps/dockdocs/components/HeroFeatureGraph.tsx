"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { navCategories } from "@/components/Header";

type Locale = "en" | "zh";
type Item = { name: string; slug: string };
type Vec = [number, number, number];

const CENTER = { zh: "DockDocs", subZh: "懂你的 PDF", en: "DockDocs", subEn: "understands your PDF" };
const COLORS = ["#818cf8", "#c084fc", "#22d3ee", "#fbbf24"];
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

// Four spread directions (box corners → even all-round distribution under yaw)
const RAW_DIRS: Vec[] = [
  [1, 0.7, 0.85],
  [-1, -0.7, 0.85],
  [-1, 0.7, -0.85],
  [1, -0.7, -0.85],
];
const R = 1;      // feature shell radius
const RC = 0.55;  // category-hub radius
const CAM = 2.7;  // camera distance
const TILT = -0.15;

const len = (v: Vec) => Math.hypot(v[0], v[1], v[2]) || 1;
const norm = (v: Vec): Vec => { const l = len(v); return [v[0] / l, v[1] / l, v[2] / l]; };
const sc = (v: Vec, k: number): Vec => [v[0] * k, v[1] * k, v[2] * k];
const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function frame(w: Vec): [Vec, Vec] {
  const up: Vec = Math.abs(w[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = norm(cross(up, w));
  return [u, cross(w, u)];
}
function flatItems(cat: { cols: { items: Item[] }[] }): Item[] {
  const seen = new Set<string>(); const out: Item[] = [];
  for (const col of cat.cols) for (const it of col.items ?? []) { const k = it.name + it.slug; if (!seen.has(k)) { seen.add(k); out.push(it); } }
  return out;
}

type Node = { kind: "center" | "hub" | "feat"; base: Vec; color: string; cat: number; label: string; slug?: string; desc?: { zh: string; en: string } | null; blurb?: { zh: string; en: string } };

export function HeroFeatureGraph({ locale = "en" }: { locale?: Locale }) {
  const zh = locale === "zh";
  const [hover, setHover] = useState<number | null>(null);

  const { nodes, lines } = useMemo(() => {
    const cats = (navCategories[zh ? "zh" : "en"] ?? navCategories.en).slice(0, 4);
    const nodes: Node[] = [{ kind: "center", base: [0, 0, 0], color: "#a5b4fc", cat: -1, label: "" }];
    const lines: { a: number; b: number; color: string; cat: number }[] = [];
    cats.forEach((cat, ci) => {
      const w = norm(RAW_DIRS[ci]);
      const hubIdx = nodes.length;
      nodes.push({ kind: "hub", base: sc(w, RC), color: COLORS[ci], cat: ci, label: cat.label, blurb: CAT_BLURB[ci] });
      lines.push({ a: 0, b: hubIdx, color: COLORS[ci], cat: ci });
      const feats = flatItems(cat);
      const [u, v] = frame(w);
      const n = Math.max(feats.length, 1);
      const phiMax = 0.34 + Math.min(0.46, n * 0.02);
      feats.forEach((it, k) => {
        const theta = k * 2.39996323;
        const phi = 0.13 + (phiMax - 0.13) * Math.sqrt((k + 0.5) / n);
        const dir = add(sc(w, Math.cos(phi)), sc(add(sc(u, Math.cos(theta)), sc(v, Math.sin(theta))), Math.sin(phi)));
        const fi = nodes.length;
        nodes.push({ kind: "feat", base: sc(norm(dir), R), color: COLORS[ci], cat: ci, label: it.name, slug: it.slug, desc: DESC[it.slug] ?? null });
        lines.push({ a: hubIdx, b: fi, color: COLORS[ci], cat: ci });
      });
    });
    return { nodes, lines };
  }, [zh]);

  const viewport = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const nodeEls = useRef<(HTMLElement | null)[]>([]);
  const labelEls = useRef<(HTMLElement | null)[]>([]);
  const lineEls = useRef<(SVGPathElement | null)[]>([]);
  const tip = useRef<HTMLDivElement>(null);
  const proj = useRef<{ x: number; y: number; t: number; s: number }[]>([]);
  const rot = useRef({ x: TILT, y: 0.55 });
  const vel = useRef({ x: 0, y: 0 });
  const drag = useRef<{ on: boolean; px: number; py: number; moved: boolean }>({ on: false, px: 0, py: 0, moved: false });
  const hoverRef = useRef<number | null>(null);
  const interacted = useRef(false);

  useEffect(() => {
    const vp = viewport.current; if (!vp) return;
    let raf = 0;
    const AUTO = 0.0017;

    const tick = () => {
      const w = vp.clientWidth, h = vp.clientHeight;
      if (w && h) {
        const paused = drag.current.on || hoverRef.current !== null;
        if (!drag.current.on) {
          vel.current.y = vel.current.y * 0.94 + (paused ? 0 : AUTO) * 0.06;
          vel.current.x *= 0.9;
          rot.current.y += vel.current.y;
          rot.current.x += vel.current.x + (TILT - rot.current.x) * 0.03;
        }
        const ry = rot.current.y, rx = rot.current.x;
        const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
        const SS = Math.min(w * 0.46, h * 0.5) * 0.62;
        const ox = w / 2, oy = h / 2;
        const aCat = hoverRef.current !== null ? nodes[hoverRef.current]?.cat ?? null : null;

        for (let i = 0; i < nodes.length; i++) {
          const [bx, by, bz] = nodes[i].base;
          // yaw then pitch
          let X = bx * cy + bz * sy;
          let Z = -bx * sy + bz * cy;
          let Y = by * cx - Z * sx;
          Z = by * sx + Z * cx;
          const persp = CAM / (CAM - Z);
          const px = ox + X * SS * persp;
          const py = oy - Y * SS * persp;
          const t = (Z + 1) / 2;
          proj.current[i] = { x: px, y: py, t, s: persp };

          const el = nodeEls.current[i]; if (!el) continue;
          const k = nodes[i].kind;
          const nodeScale = k === "feat" ? 0.7 + 0.55 * persp : 0.72 + 0.28 * persp;
          el.style.transform = `translate3d(${px}px,${py}px,0) translate(-50%,-50%) scale(${nodeScale})`;
          el.style.zIndex = String(200 + Math.round(t * 600) + (i === hoverRef.current ? 400 : 0));
          let op = k === "center" ? 1 : 0.28 + 0.72 * t;
          if (aCat !== null && nodes[i].cat !== aCat && k !== "center") op *= 0.22;
          el.style.opacity = String(op);
          const lab = labelEls.current[i];
          if (lab) {
            let lo = Math.max(0, Math.min(1, (t - 0.5) / 0.28));
            if (i === hoverRef.current) lo = 1;
            if (aCat !== null && nodes[i].cat !== aCat) lo *= 0.25;
            lab.style.opacity = String(lo);
          }
        }

        for (let i = 0; i < lines.length; i++) {
          const p = lineEls.current[i]; if (!p) continue;
          const a = proj.current[lines[i].a], b = proj.current[lines[i].b];
          if (!a || !b) continue;
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1;
          const c = l * 0.16;
          p.setAttribute("d", `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${(mx - dy / l * c).toFixed(1)} ${(my + dx / l * c).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
          let op = 0.07 + 0.3 * ((a.t + b.t) / 2);
          if (aCat !== null && lines[i].cat !== aCat) op *= 0.18;
          p.setAttribute("stroke-opacity", op.toFixed(3));
        }

        if (svg.current) svg.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
        const ti = tip.current;
        if (ti) {
          const hi = hoverRef.current;
          if (hi !== null && proj.current[hi] && nodes[hi].kind !== "center") {
            ti.style.opacity = "1";
            ti.style.transform = `translate3d(${proj.current[hi].x}px,${proj.current[hi].y}px,0) translate(-50%,calc(-100% - 14px))`;
          } else ti.style.opacity = "0";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      drag.current = { on: true, px: e.clientX, py: e.clientY, moved: false };
      interacted.current = true; vp.setPointerCapture?.(e.pointerId);
      vp.classList.add("hfg-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.px, dy = e.clientY - drag.current.py;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
      rot.current.y += dx * 0.0065;
      rot.current.x = Math.max(-0.5, Math.min(0.5, rot.current.x + dy * 0.0055));
      vel.current = { x: dy * 0.0055, y: dx * 0.0065 };
      drag.current.px = e.clientX; drag.current.py = e.clientY;
    };
    const onUp = () => { drag.current.on = false; vp.classList.remove("hfg-grabbing"); };
    vp.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { cancelAnimationFrame(raf); vp.removeEventListener("pointerdown", onDown); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [nodes, lines]);

  const setH = (i: number | null) => { hoverRef.current = i; setHover(i); };
  const hov = hover !== null ? nodes[hover] : null;

  return (
    <div className="hfg-wrap">
      <style>{`
        .hfg-wrap{position:relative;width:100%;}
        .hfg-vp{cursor:grab;}
        .hfg-vp.hfg-grabbing{cursor:grabbing;}
        .hfg-node{position:absolute;left:0;top:0;will-change:transform,opacity;}
        .hfg-dot{display:block;border-radius:50%;}
        .hfg-tipbox{position:absolute;left:0;top:0;opacity:0;pointer-events:none;transition:opacity .18s;z-index:1200;white-space:nowrap;will-change:transform,opacity;}
        @keyframes hfg-pulse{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}50%{opacity:.85;transform:translate(-50%,-50%) scale(1.16)}}
        @keyframes hfg-fade{from{opacity:0}to{opacity:1}}
      `}</style>

      {/* Desktop: interactive 3D constellation */}
      <div ref={viewport} className="hfg-vp relative mx-auto hidden w-full max-w-[1000px] touch-none select-none sm:block" style={{ aspectRatio: "16 / 11", animation: "hfg-fade .8s ease both" }}>
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,.42), transparent 70%)", animation: "hfg-pulse 4.5s ease-in-out infinite", zIndex: 1 }} />

        <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
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
              onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)}
              onClick={(e) => { if (drag.current.moved) e.preventDefault(); }}>
              <span className="hfg-dot" style={{ width: 9, height: 9, background: nd.color, boxShadow: `0 0 10px ${nd.color}, 0 0 3px ${nd.color}` }} />
              <span ref={(el) => { labelEls.current[i] = el; }} className="mt-1.5 whitespace-nowrap rounded-md border border-[color:var(--line)] bg-[rgba(18,20,30,.82)] px-2 py-0.5 text-[11.5px] font-medium text-[color:var(--foreground)]" style={{ opacity: 0 }}>{nd.label}</span>
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

        {/* Drag hint */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] tracking-wide text-[color:var(--faint)]" style={{ opacity: interacted.current ? 0 : 0.7, transition: "opacity .4s" }}>
          {zh ? "拖动旋转 · 悬停查看" : "drag to rotate · hover to preview"}
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
                  {feats.slice(0, 8).map((f, j) => <li key={j} className="truncate">{f.name}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
