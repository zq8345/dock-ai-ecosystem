# DockDocs AI Summary Provider QA

Date: 2026-05-29

## Status

Real provider QA is not launch-passed yet because no AI Summary provider credentials are available in the local environment or repository env files.

Checked environment variables:

- `DOCKDOCS_AI_SUMMARY_API_URL`: missing
- `DOCKDOCS_AI_SUMMARY_API_KEY`: missing
- `DOCKDOCS_AI_SUMMARY_MODEL`: missing

No fake token, fake provider success, or synthetic production pass was created.

## Recommended Provider Configuration

The current `/api/ai-summary` Netlify Function expects an OpenAI-compatible Chat Completions endpoint that accepts JSON mode.

Recommended first production configuration:

```bash
DOCKDOCS_AI_SUMMARY_API_URL=https://api.openai.com/v1/chat/completions
DOCKDOCS_AI_SUMMARY_API_KEY=<real-provider-key>
DOCKDOCS_AI_SUMMARY_MODEL=gpt-4.1-mini
```

`gpt-4.1-mini` is the safest first model for the current adapter because it supports the Chat Completions endpoint and structured JSON output mode. A later task can migrate the runtime to the Responses API or add a provider abstraction for GPT-5-class models.

## Netlify Environment Setup

Set these values in the DockDocs Netlify site environment:

```bash
netlify env:set DOCKDOCS_AI_SUMMARY_API_URL https://api.openai.com/v1/chat/completions
netlify env:set DOCKDOCS_AI_SUMMARY_API_KEY <real-provider-key>
netlify env:set DOCKDOCS_AI_SUMMARY_MODEL gpt-4.1-mini
```

Then redeploy DockDocs and run the production QA matrix below.

## Runtime Behavior

The workflow keeps privacy-first behavior:

- PDF text extraction runs in the browser when the PDF has selectable text.
- For scanned PDFs, users should run OCR PDF first and paste extracted text into AI Summary.
- The AI provider receives extracted text only.
- The full PDF file is not sent to the AI provider by the AI Summary workflow.
- If provider credentials are missing, the UI shows an honest error state.

## Production QA Matrix

| Scenario | Sample | Expected result | Current status |
| --- | --- | --- | --- |
| Simple selectable text PDF | 1-page text PDF | Summary succeeds and includes all four sections | Blocked until provider key is configured |
| Long document | 8-20 page PDF, text under 24,000 chars after trimming | Summary succeeds; latency and cost recorded | Blocked until provider key is configured |
| Multi-page PDF | 3-8 selectable text pages | Browser extracts text from up to 8 pages, then summarizes | Blocked until provider key is configured |
| Chinese PDF | Selectable Chinese text PDF | Chinese summary if locale is `zh` | Blocked until provider key is configured |
| OCR extracted text | Text copied from OCR PDF output | Summary succeeds from pasted text | Blocked until provider key is configured |
| Tables / structured data | PDF with table text | Summary captures important rows and action items | Blocked until provider key is configured |
| Unsupported format | DOCX/JPG upload into PDF input | UI rejects non-PDF upload | Pass locally |
| Short text | Less than 80 chars | Honest validation error, no provider call | Pass locally |
| Provider missing | No env vars | Honest error, no fake success | Pass locally |
| Provider failure | Mocked provider error | Error state, no fake result | Pass locally |
| Summary download | Mocked successful provider response | `.txt` summary download CTA is visible in result state | Pass locally |
| Mobile | 390 / 375 / 360 px | No horizontal overflow, CTA visible | Pass locally |

## Required Output Checks

For each successful provider test, verify the response renders:

- Executive Summary
- Key Points
- Action Items
- Suggested Next Steps

Also verify:

- Upload / paste text to processing to success or error
- Cancel / Reset
- No console errors
- No horizontal overflow at 390 / 375 / 360 px
- `sitemap.xml` and `robots.txt` unchanged
- Internal links valid

## Cost Evaluation Method

Record:

- extracted character count
- estimated input tokens
- output tokens from provider response if available
- total latency
- provider status

Approximate cost:

```text
cost = (input_tokens / 1,000,000 * input_price) + (output_tokens / 1,000,000 * output_price)
```

For `gpt-4.1-mini`, OpenAI lists pricing at `$0.40` per 1M input tokens and `$1.60` per 1M output tokens as of this QA note. Example: a 6,000-token input plus 600-token output is roughly `$0.00336`.

## Known Limits

- Current text sent to provider is capped at 24,000 characters.
- Browser-side PDF text extraction works best for selectable text PDFs.
- Scanned PDFs need OCR first.
- Provider timeout is 55 seconds.
- Current adapter is OpenAI-compatible Chat Completions oriented.
- No production success QA can be claimed until a real provider key is configured.

## Production Launch Recommendation

Do not mark AI Summary production-ready until:

1. Real provider env vars are configured in Netlify.
2. The production QA matrix passes with representative PDFs.
3. Cost and latency are measured on at least five sample documents.
4. Rate-limit behavior is tested.
5. Provider failure and timeout states are verified in production.

## Recommended TASK-035

Build Chat with PDF workflow integration after AI Summary provider QA passes:

- reuse browser-side text extraction and OCR text
- create a provider adapter with citations/chunks
- add chat state, answer history, reset, and error handling
- keep full PDF files local unless a backend document store is explicitly added
