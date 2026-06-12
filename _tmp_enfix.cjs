const fs = require("fs");
const path = require("path");
const cdir = "C:\\Users\\47203\\Documents\\Dock\\apps\\dockdocs\\components";
const LT = "C:\\Users\\47203\\Documents\\Dock\\apps\\dockdocs\\lib\\localized-tools.ts";

// ---- Task A: EN page titles -> EN nav labels ----
const EN = {
  "MergePdfClient.tsx": [['title: "Merge PDF files"', 'title: "Merge PDF"']],
  "BatchCompressClient.tsx": [['title: "Compress multiple PDFs at once"', 'title: "Batch compress"']],
  "BatchPdfToImageClient.tsx": [['title: "Convert multiple PDFs to images"', 'title: "Batch PDF to image"']],
  "BatchProtectClient.tsx": [['title: "Encrypt multiple PDFs at once"', 'title: "Batch encrypt"']],
  "BatchRenameClient.tsx": [['title: "Batch rename PDFs"', 'title: "Batch rename"']],
  "BatchRotateClient.tsx": [['title: "Batch rotate PDFs"', 'title: "Batch rotate"']],
  "SplitPdfClient.tsx": [['title: "Split a PDF"', 'title: "Split PDF"']],
  "DeletePagesClient.tsx": [['title: "Delete pages from a PDF"', 'title: "Delete Pages"']],
  "RotatePagesClient.tsx": [['title: "Rotate PDF pages"', 'title: "Rotate Pages"']],
  "InsertPdfClient.tsx": [['title: "Insert pages into a PDF"', 'title: "Add Page"']],
  "WatermarkEditorClient.tsx": [['title: "Add a watermark to a PDF"', 'title: "Watermark PDF"']],
  "PageNumbersClient.tsx": [['title: "Add page numbers to a PDF"', 'title: "Add Page Numbers"']],
  "CropPdfClient.tsx": [['title: "Crop PDF margins"', 'title: "Crop PDF"']],
  "RedactPdfClient.tsx": [['title: "Redact PDF — permanently"', 'title: "Redact PDF"']],
  "SignPdfClient.tsx": [['title: "Sign a PDF"', 'title: "Sign PDF"']],
  "PdfToImageClient.tsx": [['title: "Convert PDF to images"', 'title: "PDF to Image"']],
  "ImagesToPdfClient.tsx": [['title: "Convert images to PDF"', 'title: "Image to PDF"']],
  "PageReorderClient.tsx": [['title: "Reorder PDF pages"', 'title: "Reorder Pages"']],
  "QuizClient.tsx": [['title: "Make flashcards from a PDF"', 'title: "PDF Flashcards"']],
  "RedlineClient.tsx": [['title: "Compare two PDF versions (redline)"', 'title: "Compare versions"']],
  "ExtractExcelClient.tsx": [['title: "Extract data from PDFs to a spreadsheet"', 'title: "Extract to Excel"']],
  "BatchSummaryClient.tsx": [['title: "Summarize a batch of PDFs"', 'title: "Batch summary"']],
  "BatchSortClient.tsx": [['title: "Batch sort PDFs into folders"', 'title: "Classify PDFs"']],
  "BatchSplitMergeClient.tsx": [['titleSplit: "Batch split PDFs"', 'titleSplit: "Batch split"']],
  "BatchStampClient.tsx": [['titleWm: "Batch watermark PDFs"', 'titleWm: "Batch watermark"'], ['titlePn: "Batch add page numbers to PDFs"', 'titlePn: "Batch page numbers"']],
};
let n = 0;
for (const [file, pairs] of Object.entries(EN)) {
  const fp = path.join(cdir, file);
  let c = fs.readFileSync(fp, "utf8");
  for (const [oldS, newS] of pairs) {
    if (c.split(oldS).length - 1 !== 1) throw new Error(`${file}: '${oldS}' not unique`);
    c = c.replace(oldS, newS);
  }
  fs.writeFileSync(fp, c);
  n++;
}
console.log(`Task A: ${n} files EN titles synced`);

// ---- localized-tools: protect-pdf EN breadcrumbName + add zhFaq["unlock-pdf"] ----
let lt = fs.readFileSync(LT, "utf8");
const nl = lt.includes("\r\n") ? "\r\n" : "\n";

// protect-pdf EN breadcrumb
{
  const o = 'breadcrumbName: "Password Protect"', s = 'breadcrumbName: "Protect PDF"';
  if (lt.split(o).length - 1 !== 1) throw new Error("protect breadcrumb not unique");
  lt = lt.replace(o, s);
}

// zhFaq unlock-pdf (translation of the EN faq, matching nav name PDF 解密)
const unlockZh = [
  '  "unlock-pdf": {',
  '    faqTitle: "PDF 解密常见问题",',
  '    faq: [',
  '      { question: "不知道密码也能解锁 PDF 吗？", answer: "不能。「PDF 解密」要求你知道密码——它是在你拥有密码、但想去掉限制以便自由编辑、打印或分享时使用的，并不是破解或找回密码的工具。如果忘了密码，需要联系文件的所有者。" },',
  '      { question: "在线输入 PDF 密码安全吗？", answer: "安全。整个解密过程完全在你的浏览器本地用客户端技术完成——你的 PDF 文件和密码绝不会离开你的设备，也不会上传到任何服务器。这与那些把加密 PDF 和密码发到后端处理的服务有本质区别。" },',
  '      { question: "DockDocs 能去掉哪些类型的 PDF 密码？", answer: "两种都能：所有者密码（限制编辑、打印、复制）和用户/打开密码（打开文件就要输入）——前提是你知道密码。解密之后，PDF 不再有任何限制，可以自由使用。" },',
  '      { question: "解密会影响文件质量吗？", answer: "不会。去掉密码保护不会改动 PDF 的内容、排版、图片或文字质量。除了移除密码限制外，文件与原件逐字节一致——你拿到的是完全相同的文档，只是没有了那道锁。" },',
  '      { question: "解密后还能接着压缩或合并吗？", answer: "可以。解锁后就能继续用 DockDocs 的其它工具——用「PDF 压缩」减小体积、用「批量 PDF 合并」与其它文档合并，或转成 Word/Excel。解密后的文件适用于所有 DockDocs 工具。" },',
  '    ],',
  '  },',
  '',
].join(nl);

const ZHFAQ_OPEN = 'const zhFaq: Partial<Record<ToolSlug, { faqTitle: string; faq: Array<{ question: string; answer: string }> }>> = {';
if (lt.split(ZHFAQ_OPEN).length - 1 !== 1) throw new Error("zhFaq opening not unique");
if (lt.includes('"unlock-pdf": {' + nl + '    faqTitle: "PDF 解密')) throw new Error("zhFaq unlock already present");
lt = lt.replace(ZHFAQ_OPEN + nl, ZHFAQ_OPEN + nl + unlockZh + nl);

fs.writeFileSync(LT, lt);
console.log("Task A: protect-pdf EN breadcrumb fixed");
console.log("Task B: zhFaq['unlock-pdf'] added (ZH FAQ)");
fs.unlinkSync(process.argv[1]);
