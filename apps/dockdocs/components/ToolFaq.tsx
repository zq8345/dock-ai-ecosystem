type Locale = "en" | "zh";
type QA = { q: string; a: string };

// FAQ content for the custom-client tools (which don't use the PdfToolPage template).
const FAQS: Record<string, { title: { en: string; zh: string }; items: { en: QA[]; zh: QA[] } }> = {
  "merge-pdf": {
    title: { en: "Merge PDF files — FAQ", zh: "合并 PDF 常见问题" },
    items: {
      en: [
        { q: "How do I merge PDF files?", a: "Add two or more PDFs, drag the file thumbnails into the order you want, then click Merge & download. The pages are combined top-to-bottom in that order into a single PDF." },
        { q: "Can I control the order they're combined in?", a: "Yes. Each file shows a thumbnail and a number badge — drag them around to reorder before merging. You see exactly what's going where before you click, not after." },
        { q: "Are my files uploaded to a server?", a: "No. Everything runs locally in your browser — the merging is done on your device and your files are never uploaded or sent anywhere. No account or sign-up needed." },
        { q: "Is there a file size or page limit?", a: "There's no fixed cap. Since the whole job runs in your browser, the practical limit is your device's memory — very large files or a lot of them at once can get slow on low-RAM devices." },
        { q: "Why did one of my PDFs get skipped?", a: "Password-protected or encrypted PDFs can't be read, so they're left out with a notice. Unlock or remove the password first, then add the file again." },
        { q: "Is it free?", a: "Yes — completely free, with no watermark and no registration. The merged file downloads as a single PDF." },
      ],
      zh: [
        { q: "如何合并 PDF 文件？", a: "添加两个或更多 PDF，把文件缩略图拖成你想要的顺序，然后点「合并并下载」。会按这个顺序从上到下把页面合并成一个 PDF。" },
        { q: "能控制合并顺序吗？", a: "能。每个文件都有缩略图和序号，合并前拖动即可调整顺序。合并前就能看清哪个排在哪，不用合完才发现顺序错了。" },
        { q: "文件会被上传到服务器吗？", a: "不会。全程在你的浏览器本地运行，合并在你的设备上完成，文件不会上传、也不会被发送到任何地方。无需账号、无需注册。" },
        { q: "有文件大小或页数限制吗？", a: "没有固定上限。因为整个过程都在浏览器里跑，实际上限取决于你设备的内存——文件太大或一次加太多，在内存小的设备上可能会变慢。" },
        { q: "为什么有个 PDF 被跳过了？", a: "加了密码或被加密的 PDF 读不了，会被跳过并给出提示。先解除密码，再重新添加这个文件即可。" },
        { q: "免费吗？", a: "免费——完全免费，无水印、无需注册。合并结果会下载为一个 PDF 文件。" },
      ],
    },
  },
  "split-pdf": {
    title: { en: "Split a PDF — FAQ", zh: "拆分 PDF 常见问题" },
    items: {
      en: [
        { q: "How do I split a PDF?", a: "Upload the PDF, then click the ✂ between any two pages to set a cut point. You can add as many cuts as you like, or use 'Split every N pages' to place them automatically. When you hit Split & download, each segment is saved as its own PDF, all packed into a single ZIP." },
        { q: "How do I know what ends up in each file?", a: "Before you download, the pages are colour-tinted and badged 'File 1', 'File 2', and so on, and a live count tells you exactly how many files will be created — so there are no surprises." },
        { q: "Is my file uploaded anywhere?", a: "No. The whole split runs locally in your browser — the PDF is read, cut, and zipped on your device and never gets sent to a server. Nothing leaves your machine." },
        { q: "Is there a file-size or page limit?", a: "There's no fixed cap. Because everything runs in your browser, the practical limit is your device's memory — very large or high-page-count PDFs take longer to render and may strain an older phone or laptop." },
        { q: "What do I actually get back, and is it free?", a: "You get a ZIP containing one PDF per segment (named like document-part-1.pdf, document-part-2.pdf). Even if you only set one cut, the output still comes as a ZIP. It's completely free, with no sign-up or watermark. Note: password-protected PDFs need to be unlocked first." },
      ],
      zh: [
        { q: "如何拆分 PDF？", a: "上传 PDF，在任意两页之间点 ✂ 设置一个切分点。你想设几个就设几个，也可以用「每 N 页拆一份」让它自动放置切分点。点「拆分并下载」后，每一段都会保存为单独的 PDF，并打包成一个 ZIP。" },
        { q: "怎么看清每个文件包含哪些页？", a: "下载前，页面会按所属文件用颜色标注，并标上「文件1」「文件2」等，同时实时显示将生成几个文件——一目了然，不会出错。" },
        { q: "文件会被上传吗？", a: "不会。整个拆分都在你的浏览器本地完成——PDF 在你的设备上读取、切分、打包，全程不发送到任何服务器，文件不会离开你的设备。" },
        { q: "有文件大小或页数限制吗？", a: "没有固定上限。因为全部在浏览器里处理，实际限制取决于你设备的内存——页数很多或体积很大的 PDF 渲染会更慢，老旧的手机或笔记本可能比较吃力。" },
        { q: "拆分后得到什么？免费吗？", a: "你会得到一个 ZIP，里面每一段是一个 PDF（命名类似 document-part-1.pdf、document-part-2.pdf）。即使只设了一个切分点，输出也仍是 ZIP。完全免费，无需注册、不加水印。注意：带密码的 PDF 需要先解锁。" },
      ],
    },
  },
  "crop-pdf": {
    title: { en: "Crop PDF — FAQ", zh: "裁剪 PDF 常见问题" },
    items: {
      en: [
        { q: "How do I crop a PDF?", a: "Upload your PDF, then drag the top, right, bottom and left sliders to trim each edge. You'll see a live preview as you go, so just adjust until it looks right and click Crop & download." },
        { q: "Does it crop every page the same way?", a: "Yes. The margins you set are applied uniformly to every page, so the whole document stays consistent. There's no per-page cropping in this tool." },
        { q: "Is the cropped-out content actually deleted?", a: "No. Cropping changes the visible area (the crop box) — the trimmed parts are hidden, not erased. That means nothing is truly lost, but it also means someone could recover it. If you need the content gone for good, use a redaction tool instead." },
        { q: "Is my file uploaded anywhere?", a: "No. Everything runs locally in your browser — your PDF never leaves your device and nothing is sent to a server." },
        { q: "Is there a file size limit?", a: "There's no fixed limit. Because it all happens in your browser, the practical ceiling depends on your device's memory — very large files may get slow or run out of memory on weaker machines." },
        { q: "Is it free? Do I need an account?", a: "It's completely free and there's no sign-up required. Just open the page and start cropping." },
      ],
      zh: [
        { q: "如何裁剪 PDF？", a: "上传 PDF，然后拖动上、右、下、左四个滑块裁掉每一边。拖的时候能看到实时预览，调到满意了点「裁剪并下载」就行。" },
        { q: "是每一页都按同样的方式裁吗？", a: "是的。你设的边距会统一应用到每一页，整份文档保持一致。这个工具不支持单页单独裁剪。" },
        { q: "被裁掉的内容是真的删掉了吗？", a: "不是。裁剪改的是可见区域（裁剪框），被裁的部分是隐藏起来，并没有抹掉。所以内容不会真正丢失，但也意味着别人有可能恢复出来。如果想彻底去掉内容，请改用脱敏（涂黑）工具。" },
        { q: "文件会被上传到什么地方吗？", a: "不会。全部在你的浏览器里本地处理——PDF 不会离开你的设备，也不会发送到任何服务器。" },
        { q: "有文件大小限制吗？", a: "没有固定上限。因为都在浏览器里完成，实际能处理多大取决于你设备的内存——文件特别大时，配置较弱的机器可能会变慢或内存不足。" },
        { q: "免费吗？需要注册吗？", a: "完全免费，也不用注册。打开页面就能直接裁。" },
      ],
    },
  },
  "sign-pdf": {
    title: { en: "Sign PDF — FAQ", zh: "PDF 签名常见问题" },
    items: {
      en: [
        { q: "How do I sign a PDF?", a: "Upload your PDF, draw or type your signature, choose the page, position and size, then click Sign & download. You get a new file named …-signed.pdf." },
        { q: "Is my file uploaded anywhere?", a: "No. The whole thing runs in your browser — the page is rendered and your signature is stamped onto the PDF locally. Your file never leaves your device and nothing is sent to a server." },
        { q: "Can I draw my signature, or do I have to type it?", a: "Either works. Draw with your mouse or finger on the pad, or switch to Type to render your name in a script font. Hit Clear to redo a drawn signature." },
        { q: "Is there a file size limit, and does it cost anything?", a: "It's free with no sign-up. There's no fixed size cap, but because everything is processed in memory, very large PDFs depend on your device's RAM — a huge file may be slow on an older phone or laptop." },
        { q: "Where does the signature actually go, and any gotchas?", a: "It's placed by one of nine anchor positions (corners, edges, center) and scaled by the size slider — you can't drag it to an exact pixel. It's stamped on one page at a time, so repeat for each page you need to sign. Encrypted/password-protected PDFs need to be unlocked first." },
        { q: "Does this count as a legal e-signature?", a: "The signature is stamped onto the page as an image, not a certificate-based digital signature. Typed and drawn e-signatures are accepted for many everyday documents, but check the specific requirements for your use case." },
      ],
      zh: [
        { q: "如何给 PDF 签名？", a: "上传 PDF，手写或打字你的签名，选择页面、位置和大小，然后点「签名并下载」。会得到一个名为「…-signed.pdf」的新文件。" },
        { q: "文件会被上传吗？", a: "不会。整个过程都在你的浏览器中完成——页面在本地渲染，签名也在本地盖到 PDF 上。文件不会离开你的设备，不会发送到任何服务器。" },
        { q: "可以手写签名吗，还是只能打字？", a: "两种都行。用鼠标或手指在画板上手写，或切换到「打字」用签名字体写你的名字。手写错了点「清除」重来即可。" },
        { q: "有大小限制吗？要收费吗？", a: "免费、无需注册。没有固定的大小上限，但因为全程在内存中处理，超大的 PDF 受设备内存影响——文件很大时，在较旧的手机或电脑上可能会变慢。" },
        { q: "签名放在哪里？有哪些容易踩的坑？", a: "签名按九个固定锚点（四角、四边、居中）摆放，用大小滑块缩放——不能拖到精确的像素位置。一次只盖在一页上，需要签多页就逐页重复。加密/有密码的 PDF 需要先解锁。" },
        { q: "这算有法律效力的电子签名吗？", a: "签名是作为图片盖到页面上的，不是基于证书的数字签名。打字和手写电子签名在许多日常文档中被接受，具体用途请核对相关要求。" },
      ],
    },
  },
  "reorder-pages": {
    title: { en: "Reorder PDF pages — FAQ", zh: "PDF 页面排序常见问题" },
    items: {
      en: [
        { q: "How do I reorder pages in a PDF?", a: "Upload your PDF, then drag the page thumbnails into the order you want and click Apply & download. No typing page numbers — you arrange them visually." },
        { q: "Can I delete pages while I'm at it?", a: "Yes. Click the ✕ on any thumbnail to drop that page, then download. Reordering and removing pages happen in the same step." },
        { q: "Is my file uploaded anywhere?", a: "No. Everything runs locally in your browser — your PDF is never uploaded and never leaves your device." },
        { q: "Is there a file size or page limit?", a: "There's no fixed limit. Very large PDFs just depend on your device's memory, since all the work happens on your machine." },
        { q: "Will reordering lower the quality?", a: "No. Pages keep their original content and resolution — only the order changes, nothing is re-rendered or compressed." },
        { q: "Is it free? Do I need an account?", a: "It's completely free with no sign-up required." },
      ],
      zh: [
        { q: "如何给 PDF 页面排序？", a: "上传 PDF，把页面缩略图拖成你想要的顺序，然后点「应用并下载」。不用输入页码，直接拖着排。" },
        { q: "排序的同时能删除页面吗？", a: "能。点缩略图上的 ✕ 就能去掉那一页，再下载即可。排序和删除在同一步完成。" },
        { q: "文件会被上传吗？", a: "不会。全部在你的浏览器本地处理，PDF 不上传、也不会离开你的设备。" },
        { q: "有文件大小或页数限制吗？", a: "没有固定上限。因为全部在本机处理，超大的 PDF 主要受你设备内存影响。" },
        { q: "排序会降低画质吗？", a: "不会。页面内容和分辨率保持原样，只改变顺序，不会重新渲染或压缩。" },
        { q: "免费吗？需要注册吗？", a: "完全免费，也无需注册。" },
      ],
    },
  },
  "delete-page": {
    title: { en: "Delete PDF pages — FAQ", zh: "删除 PDF 页面常见问题" },
    items: {
      en: [
        { q: "How do I delete pages from a PDF?", a: "Upload your PDF, click the pages you want to remove (they turn red with an ✕), then click Delete & download. A counter shows how many pages will be deleted and how many remain." },
        { q: "What if I mark the wrong page?", a: "Just click it again to keep it — the red mark and ✕ disappear. You can mark and unmark as many times as you like before downloading." },
        { q: "Is my file uploaded anywhere?", a: "No. The whole thing runs in your browser using your device's own memory — your PDF is never sent to a server and never leaves your device." },
        { q: "Is there a file size limit?", a: "There's no fixed cap. Since the work happens locally, the practical limit is your device's memory — very large or image-heavy PDFs may be slow on low-end machines." },
        { q: "What do I get back?", a: "A new PDF with the marked pages removed, downloaded as \"yourfile-pages-removed.pdf\". The rest of the pages keep their original content and order; your original file isn't changed. You must keep at least one page." },
        { q: "Is it free?", a: "Yes — completely free, with no sign-up or account needed." },
      ],
      zh: [
        { q: "怎么删除 PDF 里的页面？", a: "上传 PDF，点击要删除的页面（会标红并出现 ✕），然后点「删除并下载」。界面会实时显示将删除几页、还剩几页。" },
        { q: "点错页面了怎么办？", a: "再点一次就会保留，红色标记和 ✕ 会消失。下载前你可以反复标记和取消，想改多少次都行。" },
        { q: "文件会被上传吗？", a: "不会。整个过程都在你的浏览器里、用你设备自己的内存完成，PDF 不会发到服务器，也不会离开你的设备。" },
        { q: "有文件大小限制吗？", a: "没有固定上限。因为是在本地处理，实际上限取决于你设备的内存——超大或图片很多的 PDF 在配置较低的设备上可能会慢一些。" },
        { q: "删完会得到什么？", a: "一个删掉了所选页面的新 PDF，文件名为「原文件名-pages-removed.pdf」。其余页面内容和顺序保持不变，原文件也不会被改动。注意至少要保留一页。" },
        { q: "免费吗？", a: "免费——完全免费，无需注册或登录。" },
      ],
    },
  },
  "rotate-page": {
    title: { en: "Rotate PDF pages — FAQ", zh: "旋转 PDF 页面常见问题" },
    items: {
      en: [
        { q: "How do I rotate pages in a PDF?", a: "Upload the PDF and click a page to turn it 90° clockwise. Keep clicking the same page to rotate it 180°, 270°, and back. Or hit Rotate all 90° to spin every page at once, then download." },
        { q: "Can I rotate just one page, or different pages by different amounts?", a: "Yes. Each page rotates on its own, so you can fix a single sideways scan or set different pages to different angles — only the pages you click change." },
        { q: "Is my file uploaded anywhere?", a: "No. Everything runs locally in your browser — the rotation is written to the PDF on your device and the file never gets sent to a server or leaves your device." },
        { q: "Is there a file size or page limit?", a: "There's no fixed limit we impose. Since it all happens in your browser, the practical ceiling depends on your device's memory — very large PDFs may get slow on low-memory phones or tablets." },
        { q: "Does rotating lose quality or change the content?", a: "No. Rotation just sets each page's orientation flag — the text, images, and resolution stay exactly the same. Nothing is re-rendered or compressed." },
        { q: "Is it free? Do I need an account?", a: "It's completely free with no sign-up. Open the page, rotate, and download." },
      ],
      zh: [
        { q: "如何旋转 PDF 页面？", a: "上传 PDF，点击某页即可顺时针旋转 90°。继续点同一页会转到 180°、270°，再点转回原位。也可以点「全部旋转 90°」一次性旋转所有页面，然后下载。" },
        { q: "能只转某一页，或给不同页面设不同角度吗？", a: "可以。每页独立旋转，你可以单独纠正一张拍歪的扫描页，也可以给不同页面设不同角度——只有你点过的页面会变。" },
        { q: "文件会被上传吗？", a: "不会。全部在你的浏览器本地处理，旋转直接写进设备上的 PDF，文件不会上传到服务器,也不会离开你的设备。" },
        { q: "有文件大小或页数限制吗？", a: "我们没有设固定上限。因为全程在浏览器里完成，实际能处理多大取决于你设备的内存——内存较小的手机或平板处理超大 PDF 可能会变慢。" },
        { q: "旋转会降低质量或改变内容吗？", a: "不会。旋转只是设置每页的方向标记，文字、图片和分辨率完全不变,不会重新渲染或压缩。" },
        { q: "免费吗？需要注册吗？", a: "完全免费，无需注册。打开页面、旋转、下载即可。" },
      ],
    },
  },
  "add-page": {
    title: { en: "Insert pages into a PDF — FAQ", zh: "向 PDF 插入页面常见问题" },
    items: {
      en: [
        { q: "How do I insert pages into a PDF?", a: "Upload your PDF, click where you want to insert (at the very start or after a specific page), then choose the file to insert there and click Insert & download." },
        { q: "What can I insert?", a: "Another PDF (all of its pages are dropped in at that spot) or a single PNG/JPG image, which is added as one new page." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser using pdf-lib — your files never leave your device, and nothing is sent to a server." },
        { q: "What do I get back?", a: "A single new PDF with the inserted pages in place, downloaded as \"<your-file>-with-insert.pdf\". Your original file isn't changed." },
        { q: "Is there a file size limit?", a: "There's no fixed limit, but since it all happens in your browser, very large PDFs depend on your device's memory. If a huge file struggles, try a smaller one." },
        { q: "Is it free?", a: "Yes — it's completely free, with no sign-up or account required." },
      ],
      zh: [
        { q: "如何向 PDF 插入页面？", a: "上传你的 PDF，点击想插入的位置（最前面或某一页之后），再选择要插入的文件，然后点「插入并下载」。" },
        { q: "可以插入什么？", a: "可以插入另一个 PDF（它的所有页面会一起插到该位置），或者一张 PNG/JPG 图片（作为一个新页面）。" },
        { q: "文件会被上传吗？", a: "不会。全部在你的浏览器本地用 pdf-lib 处理，文件不会离开你的设备，也不会发送到任何服务器。" },
        { q: "会得到什么结果？", a: "一个插入好页面的新 PDF，文件名为「<原文件名>-with-insert.pdf」，原文件不会被改动。" },
        { q: "有文件大小限制吗？", a: "没有固定上限，但因为全程在浏览器里完成，超大的 PDF 受你设备内存影响。如果文件太大处理吃力，可以换小一点的试试。" },
        { q: "是免费的吗？", a: "是，完全免费，无需注册或登录。" },
      ],
    },
  },
  "watermark-pdf": {
    title: { en: "Add a watermark to a PDF — FAQ", zh: "PDF 加水印常见问题" },
    items: {
      en: [
        { q: "How do I add a watermark to a PDF?", a: "Upload the PDF, build a text or image watermark, and adjust its position, opacity and rotation while you watch the live preview. Choose which pages to stamp, then click Apply & download." },
        { q: "Can I use an image or logo instead of text?", a: "Yes. Switch to Image mode to drop in a logo or picture as the watermark. Either way you can set the position, opacity and rotation." },
        { q: "Does it stamp every page?", a: "You decide. The watermark goes onto the pages you select, so you can mark the whole document or just specific pages." },
        { q: "Are my files uploaded anywhere?", a: "No. The watermark is applied right in your browser — your PDF never leaves your device and nothing is sent to a server." },
        { q: "Is there a file size limit?", a: "There's no fixed cap. Since everything runs locally, very large PDFs are limited only by your device's memory — on most machines that's plenty." },
        { q: "Is it free? Do I need an account?", a: "It's free and there's no sign-up. Just open the page, add your PDF, and download the watermarked file." },
      ],
      zh: [
        { q: "如何给 PDF 加水印？", a: "上传 PDF，制作文字或图片水印，一边看实时预览一边调整位置、透明度和旋转角度。选好要盖的页面，然后点「应用并下载」。" },
        { q: "可以用图片或 Logo 代替文字吗？", a: "可以。切换到「图片」模式即可把 Logo 或图片作为水印。两种模式都能设置位置、透明度和旋转。" },
        { q: "会盖到每一页吗？", a: "由你决定。水印只盖到你选中的页面，可以盖整个文档，也可以只盖指定页面。" },
        { q: "文件会被上传吗？", a: "不会。水印完全在你的浏览器本地应用，PDF 不会离开你的设备，也不会发送到任何服务器。" },
        { q: "有文件大小限制吗？", a: "没有固定上限。因为全部在本地处理，超大 PDF 只受设备内存影响——一般电脑都够用。" },
        { q: "免费吗？需要注册吗？", a: "免费，且无需注册。打开页面、添加 PDF、下载带水印的文件即可。" },
      ],
    },
  },
  "page-numbers": {
    title: { en: "Add page numbers to a PDF — FAQ", zh: "PDF 添加页码 常见问题" },
    items: {
      en: [
        { q: "How do I add page numbers to a PDF?", a: "Upload your PDF, pick where the number goes (top or bottom, left/center/right), choose the format and start number, and set the page range. The live preview shows exactly how it looks, then click Add numbers & download." },
        { q: "Is my file uploaded anywhere?", a: "No. Everything runs locally in your browser — the PDF is read, numbered, and saved on your device. Your file is never uploaded and never leaves your computer." },
        { q: "What formats and positions can I use?", a: "Four formats: just the number (1), Page 1, 1 / N, or 1 of N. Six positions: top or bottom, paired with left, center, or right. You can also set a small/medium/large margin." },
        { q: "Can I start from a specific number or only number some pages?", a: "Yes. Set Start at for the first number (handy if your cover page shouldn't count), and use the from/to range to number only part of the document. The count continues across the range you pick." },
        { q: "Is there a file size limit?", a: "There's no fixed cap. Since the work happens in your browser, very large PDFs are limited only by your device's memory — on most machines typical documents go through fine." },
        { q: "Is it free? Do I need an account?", a: "Yes, it's completely free and no sign-up is required. Just open the page and start." },
      ],
      zh: [
        { q: "怎么给 PDF 添加页码？", a: "上传 PDF,选择页码位置(上或下,左/中/右),挑好格式和起始数字,再设置页码范围。实时预览会显示最终效果,确认后点「添加页码并下载」即可。" },
        { q: "文件会被上传吗?", a: "不会。整个过程都在你的浏览器本地完成——PDF 在本地读取、加页码、保存,文件不会上传,也不会离开你的设备。" },
        { q: "支持哪些格式和位置?", a: "四种格式:纯数字(1)、第 1 页、1 / N、1 / 共 N。六个位置:上或下,分别配合左、中、右。还可以选小/中/大三种边距。" },
        { q: "可以从指定数字开始,或只给部分页加页码吗?", a: "可以。用「起始数字」设置第一个号码(封面不想计入时很方便),用「从/到」只给文档的一部分加页码,号码会在你选的范围内连续编号。" },
        { q: "有文件大小限制吗?", a: "没有固定上限。因为处理是在浏览器里完成的,超大 PDF 只受设备内存影响——一般文档在大多数电脑上都能顺利处理。" },
        { q: "免费吗?需要注册吗?", a: "完全免费,也不需要注册。打开页面直接用就行。" },
      ],
    },
  },
  "images-to-pdf": {
    title: { en: "Images to PDF — FAQ", zh: "图片转 PDF 常见问题" },
    items: {
      en: [
        { q: "How do I convert images to a PDF?", a: "Add your images, drag the thumbnails into the order you want, then click Convert to PDF. Each image becomes one page, top to bottom, in a single file you can download." },
        { q: "Which image formats are supported?", a: "JPG, PNG, WebP, GIF and BMP. HEIC (the format iPhones often save photos in) isn't supported yet — convert those to JPG first, or change your iPhone camera setting to 'Most Compatible'." },
        { q: "Can I combine many images into one PDF?", a: "Yes. Add as many as you like and drag them to reorder — they're merged into a single PDF in exactly that order, one image per page." },
        { q: "Are my images uploaded anywhere?", a: "No. Everything runs locally in your browser — the PDF is built on your device and your images are never sent to a server or stored anywhere." },
        { q: "Is there a size or file-count limit?", a: "There's no fixed limit. Since it all happens on your device, the practical ceiling is your device's memory — very large or very many high-resolution images can slow an older phone or low-RAM laptop." },
        { q: "Is it free? Do I need an account?", a: "Yes, it's completely free with no sign-up, no watermark and no email required. Just open the page and start." },
      ],
      zh: [
        { q: "如何把图片转成 PDF？", a: "添加图片，把缩略图拖成你想要的顺序，然后点「转换为 PDF」。每张图片占一页，从上到下排列，合成一个可下载的文件。" },
        { q: "支持哪些图片格式？", a: "JPG、PNG、WebP、GIF、BMP。HEIC（iPhone 常用的照片格式）暂不支持——可先转成 JPG，或把 iPhone 相机设置改为「兼容性最佳」。" },
        { q: "可以把多张图片合成一个 PDF 吗？", a: "可以。想加多少加多少，拖动即可排序——会严格按这个顺序合并成一个 PDF，每张图片一页。" },
        { q: "图片会被上传吗？", a: "不会。全部在你的浏览器本地处理——PDF 在你的设备上生成，图片不会上传到服务器，也不会被保存在任何地方。" },
        { q: "有大小或数量限制吗？", a: "没有固定上限。因为全程在本地处理，实际上限取决于设备内存——图片过大或数量过多时，旧手机或内存较小的电脑可能会变慢。" },
        { q: "免费吗？需要注册吗？", a: "完全免费，无需注册，没有水印，也不用填邮箱。打开页面即可使用。" },
      ],
    },
  },
  "pdf-to-image": {
    title: { en: "PDF to Image — FAQ", zh: "PDF 转图片常见问题" },
    items: {
      en: [
        { q: "How do I convert a PDF to JPG or PNG?", a: "Drop in a PDF and every page shows up as a thumbnail. Click pages to include or exclude them (or use Select all / Select none), pick JPG or PNG, then Convert & download. A single page comes down as one image; multiple pages are bundled into a ZIP." },
        { q: "Is my PDF uploaded anywhere?", a: "No. The whole thing runs in your browser — the PDF is read and rendered to images locally and the download is generated on your device. Nothing is sent to a server, so your file never leaves your machine." },
        { q: "JPG or PNG — which should I pick?", a: "PNG is lossless, so it's best for sharp text, line art and screenshots. JPG files are smaller and fine for photos and scans. One thing to know: JPG can't be transparent, so transparent areas of a page are flattened onto a white background." },
        { q: "Is there a file size or page limit?", a: "There's no fixed cap and no sign-up. Because everything is processed in your browser, the real limit is your device's memory — very large or very high-page-count PDFs use more RAM and take longer, especially on phones or older machines." },
        { q: "It won't open my PDF — what's wrong?", a: "The most common cause is a password-protected or encrypted PDF, which the tool can't read; remove the password first and try again. Output is rendered at 2x for crisp images, but it's still a picture — the text becomes pixels, so you can't select or search it afterwards." },
        { q: "Is it free?", a: "Yes — completely free, no account, no watermark, no limit on how many times you use it." },
      ],
      zh: [
        { q: "如何把 PDF 转成 JPG 或 PNG？", a: "把 PDF 拖进来，每一页都会显示为缩略图。点击页面来选中或排除（也可用「全选 / 全不选」），选 JPG 或 PNG，然后点「转换并下载」。单页直接下载成一张图片，多页会打包成 ZIP。" },
        { q: "我的 PDF 会被上传吗？", a: "不会。整个过程都在你的浏览器里完成——PDF 在本地读取并渲染成图片，下载文件也在你的设备上生成，不会发送到任何服务器，文件始终不离开你的设备。" },
        { q: "JPG 还是 PNG，该选哪个？", a: "PNG 是无损的，适合清晰的文字、线条图和截图；JPG 体积更小，适合照片和扫描件。有一点要注意：JPG 不支持透明，页面里透明的部分会被填成白色背景。" },
        { q: "有文件大小或页数限制吗？", a: "没有固定上限，也无需注册。因为全部在浏览器里处理，真正的限制是你设备的内存——页数很多或很大的 PDF 会占用更多内存、处理更慢，手机或老旧电脑上尤其明显。" },
        { q: "打不开我的 PDF，是怎么回事？", a: "最常见的原因是 PDF 加了密码或被加密，工具无法读取，请先去掉密码再试。输出按 2 倍分辨率渲染，画质清晰，但毕竟是图片——文字变成了像素，转换后无法再选中或搜索文字。" },
        { q: "是免费的吗？", a: "是的——完全免费，无需账号，没有水印，使用次数也没有限制。" },
      ],
    },
  },
  "redact-pdf": {
    title: { en: "Redact PDF — Frequently Asked Questions", zh: "PDF 智能涂黑 —— 常见问题" },
    items: {
      en: [
        { q: "How do I redact a PDF?", a: "Drop your PDF onto the page and DockDocs renders every page right in your browser. Drag a box over anything you want to hide — a name, an account number, a signature. DockDocs also auto-scans for likely sensitive items (emails, phone numbers, SSNs, card numbers, IPs) and pre-marks them; review those suggestions and click the ✕ on any box you don't want. When you're done, hit Apply & download to get the redacted copy." },
        { q: "Is the text actually removed, or just covered with a black box?", a: "Actually removed. A lot of \"redaction\" just lays a black rectangle on top — the original text is still in the file and anyone can copy it out or delete the box. DockDocs re-renders each page as a flat image with the black areas burned in, so the underlying text is destroyed and gone for good. That's exactly what makes the result safe to share." },
        { q: "Are my files uploaded anywhere?", a: "No. The whole thing runs inside your browser on your own device — opening the PDF, drawing the boxes, and building the redacted copy all happen locally. Your file is never sent to a server and never leaves your computer, so it's a good fit for confidential or regulated documents." },
        { q: "Are there any limits, and is it free?", a: "It's completely free with no account, email, or install required. There's no fixed file-size cap, though very large PDFs depend on your device's memory. The one hard limit is page count: a document can have up to 30 pages — if yours is longer, split it first and redact each part." },
        { q: "What does the output file look like?", a: "You get a new PDF where every page is a flattened image (around 158 DPI — clean and readable). Because the pages are now images, the redacted content is permanently gone and the rest of the text is no longer selectable or searchable. That trade-off is the whole point: text you can't select is text that can't be recovered." },
        { q: "Should I trust the auto-detected boxes on their own?", a: "Treat them as a head start, not a guarantee. The auto-scan catches common patterns like emails and numbers, but it can miss things written in unusual formats and won't know about context-specific secrets only you can recognize. Always read through the pages yourself and drag boxes over anything the detector didn't flag before you download." },
      ],
      zh: [
        { q: "怎么用它给 PDF 涂黑?", a: "把 PDF 拖进来,DockDocs 会在你浏览器里把每一页渲染出来。想遮哪里就在哪里拖一个框——姓名、账号、签名都行。它还会自动扫描可能的敏感信息(邮箱、电话、SSN、卡号、IP)并预先标好,你复核一下,不想涂的点框上的 ✕ 去掉即可。弄好后点「应用并下载」,就能拿到涂黑后的副本。" },
        { q: "是真的把文字删掉了,还是只盖了个黑框?", a: "是真的删掉。很多所谓的「涂黑」只是在上面盖一个黑色方块,原文还留在文件里,别人能从底下复制出来,甚至把黑框删掉。DockDocs 会把每一页重新拍平成图片、把黑色区域直接烧进去,底层文字被彻底销毁、再也找不回来——这正是涂黑后能放心发出去的原因。" },
        { q: "我的文件会被上传吗?", a: "不会。整个过程都在你浏览器、你自己的设备上完成:打开 PDF、画框、生成涂黑副本,全是本地处理。文件不会发到任何服务器,也不会离开你的电脑,所以处理机密或受监管的文档也比较放心。" },
        { q: "有什么限制吗?要收费吗?", a: "完全免费,不用注册、不用留邮箱、不用安装。文件大小没有固定上限,但很大的 PDF 会受你设备内存影响。唯一的硬限制是页数:单份文档最多 30 页——超了就先拆开,分段涂黑。" },
        { q: "导出的文件是什么样的?", a: "你会得到一份新的 PDF,每页都是拍平后的图片(约 158 DPI,清晰可读)。因为页面已经变成图片,被涂黑的内容永久消失,其余文字也不再能选中或搜索。这个取舍正是关键:选不中的文字,才是无法被还原的文字。" },
        { q: "自动识别的框可以直接信吗?", a: "把它当成帮你打个底,而不是万无一失。自动扫描能抓住邮箱、号码这类常见格式,但格式不太规整的可能漏掉,而且它不懂只有你才认得的、跟上下文相关的敏感信息。下载前,务必自己把每页过一遍,把检测没标到的地方手动拖框涂掉。" },
      ],
    },
  },
  "translate-pdf": {
    title: { en: "Translate a PDF — FAQ", zh: "翻译 PDF 常见问题" },
    items: {
      en: [
        { q: "How do I translate a PDF?", a: "Upload your PDF, pick a target language from the list, and click Translate. The text is pulled out of the file and translated by AI, then you can copy it or download it as a .txt file." },
        { q: "Is my file uploaded? Is this private?", a: "The PDF is read right in your browser — the file itself never leaves your device. Only the plain text extracted from it is sent to the AI to translate. The original document, formatting and images are never uploaded." },
        { q: "Is there a size limit?", a: "Yes — about 14,000 characters per run, roughly 10 pages. If your document is longer, split it into smaller chunks and translate them one at a time." },
        { q: "Which languages can I translate into?", a: "More than 18, including English, Simplified and Traditional Chinese, Spanish, French, German, Japanese, Korean, Portuguese, Italian, Russian, Arabic, Hindi, and more. The tool auto-detects the source language, so you only pick the target." },
        { q: "Does it keep the original layout? What do I get back?", a: "Not yet — this version translates the text content only and gives you the translated text to copy or download. Layout-preserving translation that rebuilds the PDF is on the roadmap. Also note: if the PDF is a scan or image with no selectable text, there's nothing to extract — run OCR on it first." },
        { q: "Is it free? Can I rely on it for legal documents?", a: "Yes, it's free to use. AI translation is great for understanding a document and getting a solid first draft, but it isn't a certified translation — for legal, official or certified purposes, have a qualified human review or translate it." },
      ],
      zh: [
        { q: "怎么翻译 PDF？", a: "上传 PDF，从列表里选好目标语言，点「翻译」。系统会把文件里的文字提取出来交给 AI 翻译，翻完后可以直接复制，或下载成 .txt 文件。" },
        { q: "文件会被上传吗？隐私安全吗？", a: "PDF 是在你的浏览器里读取的，文件本身不会离开你的设备。只有从中提取出的纯文字会发给 AI 翻译，原始文档、排版和图片都不会上传。" },
        { q: "有篇幅限制吗？", a: "有——每次大约 14000 字符，差不多 10 页。文档更长的话，先拆成几小段，分次翻译就行。" },
        { q: "能翻成哪些语言？", a: "18 种以上，包括英语、简体和繁体中文、西班牙语、法语、德语、日语、韩语、葡萄牙语、意大利语、俄语、阿拉伯语、印地语等。原文语言会自动识别，你只需要选目标语言。" },
        { q: "会保留原来的版式吗？翻完得到的是什么？", a: "暂时不会——这个版本只翻译文字内容，给你的是翻译后的文字，可复制或下载。能重排版式、还原成 PDF 的翻译还在规划中。另外要注意：如果 PDF 是扫描件或纯图片、没有可选中的文字，就没东西可提取，请先做 OCR。" },
        { q: "免费吗？法律文件能直接用吗？", a: "免费使用。AI 翻译很适合理解文档、出一份不错的初稿，但它不是认证翻译——用于法律、正式或需要认证的场景时，请找专业人士复核或翻译。" },
      ],
    },
  },
  "extract-to-excel": {
    title: { en: "Extract PDF data to a spreadsheet — FAQ", zh: "把 PDF 数据抽取成表格 — 常见问题" },
    items: {
      en: [
        { q: "How do I extract data from PDFs into a spreadsheet?", a: "Drop in your invoices, quotes, or contracts (or pick a whole folder to batch them), choose the document type, and click Extract. The AI pulls the key fields — totals, dates, parties, terms — into one table you can download as a CSV that opens in Excel, Google Sheets, or Numbers. It's free." },
        { q: "Are my files uploaded to a server?", a: "The PDF itself never leaves your device — it's read right in your browser. Only the plain text it pulls out is sent to the AI to sort into columns; the original file, with its layout and any images, stays local. If that text-out step is a dealbreaker for sensitive contracts, that's worth knowing up front." },
        { q: "How do I know the numbers are right?", a: "Every value is tagged with the exact sentence it came from in the original document, so you can spot-check it in one glance. If the AI can't clearly find a field, it leaves the cell blank instead of guessing — and we drop any source quote that doesn't actually appear in your file, so nothing is fabricated." },
        { q: "What are the limits?", a: "Up to 8 documents at a time, and the combined text caps out around 60,000 characters — roughly a stack of normal invoices, not a 200-page master agreement. For big batches, run them in a few rounds." },
        { q: "It pulled nothing out — what happened?", a: "Almost always a scanned or photographed PDF. If the text isn't selectable in a normal PDF reader, there's nothing for the browser to read and the AI gets an empty page. Run those through OCR first. Password-protected PDFs also can't be read until you unlock them." },
        { q: "Which documents work best?", a: "Structured paperwork with consistent fields — invoices, quotes, and contracts — where each preset field (vendor, total, due date, payment terms, and so on) is actually printed somewhere in the doc. Free-form letters or unusual layouts will leave more cells blank." },
      ],
      zh: [
        { q: "怎么把 PDF 里的数据抽取成表格？", a: "把发票、报价单或合同拖进来(也可以「选择文件夹」一次性批量处理),选好文档类型,点「抽取」。AI 会把关键字段——金额、日期、当事方、条款——汇总到一张表里,可下载为 CSV,用 Excel、Google 表格或 Numbers 打开。完全免费。" },
        { q: "文件会被上传到服务器吗？", a: "PDF 本身不会离开你的设备,它在你的浏览器里读取。只有读出来的纯文字会发给 AI 整理成列;原始文件连同版式和图片都留在本地。如果是很敏感的合同,这一步「发送文字」要不要做,值得你提前心里有数。" },
        { q: "怎么确认抽出来的数对不对？", a: "每个值都标注了它来自原文的哪一句,一眼就能核对。AI 找不到的字段会直接留空,而不是瞎编;而且只要 AI 给的原文引用在你的文件里实际找不到,我们就会丢弃它,绝不伪造出处。" },
        { q: "有什么限制？", a: "一次最多 8 份文档,合并文字总量约 6 万字符上限——大概是一摞普通发票的量,不是一份两百页的主合同。量大就分几批跑。" },
        { q: "什么都没抽出来,怎么回事？", a: "基本都是扫描件或拍照的 PDF。如果在普通阅读器里选不中里面的文字,浏览器就读不到内容,AI 拿到的是一张空白页。这种先做 OCR 再来。加密的 PDF 也得先解锁才能读取。" },
        { q: "哪类文档效果最好？", a: "字段固定的结构化单据——发票、报价单、合同——而且每个预设字段(供应商、总额、到期日、付款条款等)在文档里确实有写出来。自由格式的信件或排版很特别的文件,留空的格子会更多。" },
      ],
    },
  },
  "redline": {
    title: { en: "Compare PDF versions (redline) — FAQ", zh: "PDF 版本对比(红线)常见问题" },
    items: {
      en: [
        { q: "How do I compare two PDF versions?", a: "Upload the original (v1) and the revised (v2) PDF, then click Compare versions. DockDocs lines up the text and shows a single marked-up view — added text is highlighted in green, removed text is struck through in red, like track changes." },
        { q: "Are my files uploaded anywhere?", a: "No. This is a client-side tool: the text is extracted and compared entirely in your browser, so your files never leave your device. Nothing is sent to a server." },
        { q: "Does it catch reworded sentences?", a: "It compares sentence by sentence, so it marks which sentences were added and which were removed. A small reword shows up as one deletion plus one addition rather than a word-level change inside the sentence." },
        { q: "What does it actually compare — does it check formatting or images?", a: "Only the extracted text. Fonts, layout, colors, images and tables aren't part of the comparison, and scanned PDFs with no real text layer won't produce useful results. If it reports no textual changes, the wording is identical even if the look changed." },
        { q: "How large can the documents be?", a: "The whole comparison runs in your browser, so it's tuned for documents up to a few thousand sentences (it caps at 2,500 sentences per file). Very long contracts or books may be truncated or run slowly." },
        { q: "Is it free?", a: "Yes — comparing versions is completely free, with no sign-up and no limit on the number of comparisons." },
      ],
      zh: [
        { q: "如何对比两份 PDF 版本?", a: "上传原始版(v1)和修订版(v2)两个 PDF,点「对比版本」。DockDocs 会对齐文本,生成一个标注视图——新增文字用绿色高亮,删除文字用红色加删除线,类似修订模式。" },
        { q: "文件会被上传吗?", a: "不会。这是纯客户端工具:文本完全在你的浏览器中提取和对比,文件不会离开你的设备,也不会发送到任何服务器。" },
        { q: "能识别改写过的句子吗?", a: "它逐句对比,会标出哪些句子是新增、哪些是删除。小幅改写会显示为一处删除加一处新增,而不是在句子内部标出改动的几个字。" },
        { q: "它到底对比什么——会比排版或图片吗?", a: "只比对抽取出来的文字。字体、版式、颜色、图片和表格都不在对比范围内;没有真正文字层的扫描件也得不到有用结果。如果显示「未发现文字差异」,说明文字完全一致,即使外观变了。" },
        { q: "文档可以多大?", a: "整个对比都在浏览器里运行,因此适合最多几千句的文档(每个文件上限 2500 句)。特别长的合同或书籍可能被截断或变慢。" },
        { q: "是免费的吗?", a: "免费——版本对比完全免费,无需注册,对比次数也不限。" },
      ],
    },
  },
};

export function ToolFaq({ tool, locale = "en" }: { tool: string; locale?: Locale }) {
  const data = FAQS[tool];
  if (!data) return null;
  const items = data.items[locale] ?? data.items.en;
  return (
    <section className="mx-auto mt-16 max-w-3xl border-t border-[color:var(--line)] pt-10">
      <h2 className="text-lg font-semibold text-[color:var(--foreground)]">{data.title[locale] ?? data.title.en}</h2>
      <div className="mt-5 divide-y divide-[color:var(--line)]">
        {items.map((it) => (
          <div key={it.q} className="py-4">
            <h3 className="text-sm font-semibold text-[color:var(--foreground)]">{it.q}</h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{it.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
