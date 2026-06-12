# SEO-008 — SEO/GEO Audit + Funnel Plan (2026-06-12)

Goal: drive the full chain **被收录 (indexed) → 被展示 (ranked/cited) → 有访问 (traffic)
→ 有使用 (activation) → 有付费 (revenue)**. Audit of the live codebase + build output,
then a prioritized plan with owners.

## Funnel scorecard

| Stage | Score | One-line state |
| --- | --- | --- |
| 被收录 Indexing | 7/10 | Foundation now solid (sitemap/canonical/hreflang/robots all fixed, SEO-005/007). **Blocked on GSC: site is not verified, sitemap never submitted.** |
| 被展示 Rank/cite | 6/10 | Strong content + rich structured data, but **no og:image anywhere**, a homepage FAQ schema/DOM mismatch, `WebApplication` instead of `SoftwareApplication`, weak tool→tool internal linking. |
| 有访问 Traffic | 4/10 | **Zero analytics live** (Clarity env unset, no GA) → flying blind. Money tools (pdf-to-excel/html/ppt, batch-*) have 0 GEO/blog pages. |
| 有使用 Activation | 7/10 | Tools work, anonymous, no signup wall — good for activation. Chat-with-PDF backend OK (`chat-with-pdf.js` exists). No activation tracking. |
| 有付费 Revenue | 2/10 | **Buying Plus/Pro unlocks nothing.** Gating is client-side localStorage on 3 of ~7 tools, fails open, bypassable; server enforces no plan. Pricing CTAs dead-end. Billing plumbing itself is well-built. |

## Critical findings

1. **No Google Search Console verification.** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is unset → no verification meta in built HTML, sitemap never submitted, indexing/queries invisible. (Bing `msvalidate.01` IS set.) This is the #1 blocker for "被收录" *measurement*.
2. **No analytics in production.** Clarity only injects when `NEXT_PUBLIC_CLARITY_ID` is set (it isn't); no GA4. We cannot see traffic, behavior, or where the funnel leaks.
3. **Revenue is non-functional.** Per the funnel audit + `dockdocs-creem-payments` memory: server AI functions (`ai-chat`, `ai-summary`, `compare-*`, `translate`, `classify`) rate-limit by IP only and never read the subscription store; gating lives in browser localStorage on 3 tools and fails open. Pricing-page Plus/Pro buttons have empty `href` → dead-end at `/account` (don't start checkout). Creem checkout is coded end-to-end but inert until env keys are set. **Buying Pro changes nothing.**
4. **No og:image** on any page → no rich social/SERP previews (lost CTR).
5. **Money tools under-marketed.** pdf-to-excel, pdf-to-html, pdf-to-markdown, pdf-to-ppt, and the batch-* tools have **0** GEO/blog pages despite real demand.
6. **Strengths to build on:** 15 blog articles with genuine depth + authentic Chinese (A+); 33 indexed priority/base GEO pages are AI-citation-ready; `llms.txt` is comprehensive; sitemap/canonical/hreflang now correct; tool pages have unique copy + FAQ/HowTo/Breadcrumb JSON-LD.
7. **Known risk, correctly handled:** 209 thin GEO pages are deliberately `noindex` (their "zh" is actually English) to dodge Google 2026 scaled-content-abuse. Keep noindex; upgrade content before indexing.

## Plan (phased, with owners)

### P0 — Open the eyes & the money door (this week; one-time info from Joe)
- **GSC verify + submit sitemap.** Needs Joe's Google account / a verification string (or DNS-verify via Netlify). Then submit `/sitemap.xml`, request indexing of top tools. → *Joe gives string; I wire it.*
- **Wire analytics.** Set `NEXT_PUBLIC_CLARITY_ID` + add GA4 (or Plausible). → *Joe creates projects + gives IDs; I wire.*
- **Set Creem production keys** in Netlify env (`CREEM_API_KEY`, product IDs). → *Joe (his account).*

### P1 — Get displayed & cited (I do directly, this week)
- **OG image**: branded 1200×630 + sitewide `openGraph.images` / `twitter.image`.
- **Structured-data fixes**: `WebApplication`→`SoftwareApplication` (+offers) on tool pages; resolve homepage FAQ schema/DOM mismatch; add sitewide `WebSite`+`SearchAction`.
- **robots**: explicitly allow GPTBot / PerplexityBot / OAI-SearchBot / ClaudeBot (GEO).
- **Titles/descriptions**: cap batch-tool titles ≤60 chars, descriptions ≤155.
- **Internal linking**: lightweight footer tool directory so every tool/GEO page links into the money tools (no change to tool-page UX/design).

### P2 — Make money real (biggest lever; Joe sets tiers, I implement)
- **Server-side entitlement gate** on the costly functions (CloudConvert + AI). This is the single change that makes Pro mean something. *Needs Joe's tier/limit decision (`dockdocs-pricing-model` is still "don't lock gating yet").* I'll build the entitlement-read helper + gate wrapper ready to flip.
- **Wire pricing CTAs to Creem checkout** (fix empty `href`). *I do — it's a bug, not a pricing decision.*
- **In-context upgrade CTAs** on tool results / at metered limits.
- **Conversion events**: sign-in, checkout-start, payment-success, tool-completion (depends on analytics).

### P3 — Grow traffic via content (I do directly, ongoing)
- **New GEO + blog pages** for under-marketed money tools: pdf-to-excel, pdf-to-html, pdf-to-ppt, batch-compress/protect/rename, sign/redact/unlock.
- **Real Chinese** for the 33–35 indexed GEO pages; keep the 209 thin pages noindex.
- **"Why DockDocs"** differentiation (privacy-first, no signup, free, in-browser) on tool heroes.

## What needs Joe (one-time, unblocks the rest)
1. GSC verification string (or OK to DNS-verify via Netlify).
2. Clarity project ID + GA4 measurement ID.
3. Creem production keys in Netlify.
4. Pricing tiers/limits sign-off → so server gating can go live.

Everything else in P1/P3 and the CTA wiring in P2, I execute autonomously.
