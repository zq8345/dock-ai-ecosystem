const fs = require("fs");
function escRe(x){return x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
function reLF(x){return new RegExp(x.split("\n").map(escRe).join("\\r?\\n"));}
function edit(path, edits){
  let s = fs.readFileSync(path, "utf8");
  const nl = s.includes("\r\n") ? "\r\n" : "\n";
  for (const [find, replace, label] of edits){
    const re = reLF(find);
    const m = s.match(re);
    if (!m) throw new Error("NOT FOUND ["+path.split("/").pop()+" :: "+label+"]");
    if (s.indexOf(m[0], s.indexOf(m[0])+1) >= 0) throw new Error("NOT UNIQUE ["+label+"]");
    s = s.replace(re, () => replace.replace(/\n/g, nl));
  }
  fs.writeFileSync(path, s);
  console.log("edited: " + path.split("/").pop());
}
const D = "C:/Users/47203/Documents/Dock/apps/dockdocs/";

// ── BatchSortClient: fold in classify's tags ──
edit(D + "components/BatchSortClient.tsx", [
  ['category?: string; msg?: string }', 'category?: string; tags?: string[]; msg?: string }', "bs-type"],
  ['updated[i] = { ...it, status: "done", category: String(data.category) };',
   'updated[i] = { ...it, status: "done", category: String(data.category), tags: Array.isArray(data.tags) ? data.tags : [] };', "bs-store"],
  ['{it.status === "done" ? <span className="rounded-full bg-[color:var(--soft-accent)] px-2 py-0.5 text-[11.5px] font-medium text-[color:var(--accent-strong)]">{it.category}</span>',
   '{it.status === "done" ? <span className="inline-flex flex-wrap items-center justify-end gap-1"><span className="rounded-full bg-[color:var(--soft-accent)] px-2 py-0.5 text-[11.5px] font-medium text-[color:var(--accent-strong)]">{it.category}</span>{(it.tags || []).slice(0, 3).map((tg) => (<span key={tg} className="rounded-[var(--radius-sm)] border border-[color:var(--line)] px-1.5 py-0.5 text-[10.5px] text-[color:var(--muted)]">{tg}</span>))}</span>', "bs-render"],
]);

// ── Header nav: one classify tool in AI workflows; drop the batch-processing dup ──
edit(D + "components/Header.tsx", [
  ['\n            { name: "Batch classify PDFs", slug: "/batch-sort" },', "", "nav-en-rm"],
  ['\n            { name: "批量 PDF 分类", slug: "/batch-sort" },', "", "nav-zh-rm"],
  ['{ name: "Auto-classify", slug: "/classify" },', '{ name: "Classify PDFs", slug: "/batch-sort" },', "nav-en-rename"],
  ['{ name: "自动分类", slug: "/classify" },', '{ name: "PDF 智能分类", slug: "/batch-sort" },', "nav-zh-rename"],
]);

// ── repoint /classify to the merged tool ──
edit(D + "app/[locale]/[[...slug]]/page.tsx", [
  ['  if (slug === "classify") {\n    return <ClassifyClient locale={rawLocale} />;\n  }',
   '  if (slug === "classify") {\n    return <BatchSortClient locale={rawLocale} />;\n  }', "ca-repoint"],
]);
// app/classify/page.tsx -> render BatchSortClient (swap the component everywhere)
{
  const cp = D + "app/classify/page.tsx";
  let s = fs.readFileSync(cp, "utf8");
  if (s.indexOf("ClassifyClient") < 0) throw new Error("classify page: ClassifyClient not found");
  s = s.split("ClassifyClient").join("BatchSortClient");
  fs.writeFileSync(cp, s);
  console.log("edited: classify/page.tsx -> BatchSortClient");
}

fs.unlinkSync(process.argv[1]);
console.log("ALL DONE");
