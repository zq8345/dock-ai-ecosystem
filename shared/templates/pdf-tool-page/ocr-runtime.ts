import type { PdfRuntimeArtifact, PdfRuntimeProgress } from "./pdf-runtime";

type OcrRuntimeInput = {
  file: File;
  outputFileName: string;
  locale: "en" | "zh";
  signal?: AbortSignal;
  onProgress?: (progress: PdfRuntimeProgress) => void;
};

type TesseractWorker = {
  recognize: (
    image: HTMLCanvasElement,
    options?: Record<string, unknown>,
    output?: Record<string, boolean>,
  ) => Promise<{ data: { text: string; confidence?: number } }>;
  terminate: () => Promise<unknown>;
};

type PdfJsDocument = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfJsPage>;
  destroy?: () => Promise<void>;
};

type PdfJsPage = {
  getViewport: (options: { scale: number }) => {
    width: number;
    height: number;
  };
  render: (options: {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => { promise: Promise<void> };
  cleanup?: () => void;
};

const maxOcrPdfSize = 25 * 1024 * 1024;
const maxRenderPixels = 4_000_000;

export async function runOcrPdfFirstPage({
  file,
  outputFileName,
  locale,
  signal,
  onProgress,
}: OcrRuntimeInput): Promise<PdfRuntimeArtifact> {
  throwIfAborted(signal);

  if (file.size > maxOcrPdfSize) {
    throw new Error(
      locale === "zh"
        ? "OCR MVP 当前支持 25 MB 以下的 PDF。请先拆分或压缩文件后重试。"
        : "The OCR MVP currently supports PDFs up to 25 MB. Split or compress the file and try again.",
    );
  }

  emitProgress(onProgress, 4, 0);
  const rendered = await renderFirstPdfPage(file, signal, (progress) => {
    emitProgress(onProgress, progress, progress < 22 ? 0 : 1);
  });

  throwIfAborted(signal);
  const ocr = await recognizeCanvas(rendered.canvas, signal, (progress) => {
    emitProgress(onProgress, 34 + progress * 58, 2);
  });
  rendered.cleanup();

  throwIfAborted(signal);
  const text = normalizeOcrText(ocr.text);
  if (!text) {
    throw new Error(
      locale === "zh"
        ? "未能从第一页识别出文字。请尝试更清晰的扫描件或图片型 PDF。"
        : "No text was recognized on the first page. Try a clearer scan or image-based PDF.",
    );
  }

  emitProgress(onProgress, 96, 3);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  emitProgress(onProgress, 100, 3);

  return {
    fileName: outputFileName,
    blob,
    outputType: "text",
    pageCount: rendered.pageCount,
    fileCount: 1,
    text,
    confidence: ocr.confidence,
    processedPages: 1,
  };
}

async function renderFirstPdfPage(
  file: File,
  signal: AbortSignal | undefined,
  onProgress: (progress: number) => void,
) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  throwIfAborted(signal);

  onProgress(8);
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url,
  ).toString();
  const documentInit = {
    data: new Uint8Array(await file.arrayBuffer()),
  } as unknown as Parameters<typeof pdfjs.getDocument>[0];
  const loadingTask = pdfjs.getDocument(documentInit);
  const pdf = (await loadingTask.promise) as unknown as PdfJsDocument;
  throwIfAborted(signal);

  if (pdf.numPages < 1) {
    throw new Error("This PDF does not contain pages.");
  }

  onProgress(18);
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(
    2,
    Math.sqrt(maxRenderPixels / (baseViewport.width * baseViewport.height)),
  );
  const viewport = page.getViewport({ scale: Math.max(1, scale) });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    throw new Error("Canvas rendering is not available in this browser.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  onProgress(24);
  await page.render({ canvas, canvasContext: context, viewport }).promise;
  throwIfAborted(signal);
  onProgress(32);

  return {
    canvas,
    pageCount: pdf.numPages,
    cleanup: () => {
      page.cleanup?.();
      void pdf.destroy?.();
    },
  };
}

async function recognizeCanvas(
  canvas: HTMLCanvasElement,
  signal: AbortSignal | undefined,
  onProgress: (progress: number) => void,
) {
  const { createWorker } = await import("tesseract.js");
  let worker: TesseractWorker | null = null;
  const abortWorker = () => {
    void worker?.terminate();
  };

  signal?.addEventListener("abort", abortWorker, { once: true });
  try {
    throwIfAborted(signal);
    worker = (await createWorker("eng", 1, {
      logger: (message) => {
        if (message.status === "recognizing text") {
          onProgress(Math.max(0.1, Math.min(0.98, message.progress)));
          return;
        }

        onProgress(Math.min(0.3, Math.max(0.02, message.progress * 0.3)));
      },
    })) as TesseractWorker;

    throwIfAborted(signal);
    const result = await worker.recognize(canvas, {}, { text: true });
    throwIfAborted(signal);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } finally {
    signal?.removeEventListener("abort", abortWorker);
    await worker?.terminate().catch(() => undefined);
  }
}

function normalizeOcrText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function emitProgress(
  onProgress: ((progress: PdfRuntimeProgress) => void) | undefined,
  progress: number,
  stepIndex: number,
) {
  onProgress?.({
    progress: Math.max(0, Math.min(100, progress)),
    stepIndex,
  });
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new Error("aborted");
  }
}
