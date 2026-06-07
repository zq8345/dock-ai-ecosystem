"use client";

import { useEffect, useState } from "react";
import type { MissionControlData } from "@/lib/mission-control-v2";
import { emptyMissionControlData } from "@/lib/mission-control-v2";

/* ── Mini components ── */

function StatCard({
  label, value, sub, tone = "neutral",
}: { label: string; value: string; sub?: string; tone?: "success" | "warning" | "danger" | "neutral" }) {
  const c = { success: "text-emerald-400", warning: "text-amber-400", danger: "text-red-400", neutral: "text-[color:var(--foreground)]" };
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">{label}</p>
      <p className={`mt-2 text-[28px] font-semibold tracking-tight ${c[tone]}`}>{value}</p>
      {sub && <p className="mt-1 text-[12px] text-[color:var(--muted)]">{sub}</p>}
    </div>
  );
}

function Badge({ label, tone }: { label: string; tone: "success" | "warning" | "danger" | "neutral" }) {
  const c = { success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", warning: "bg-amber-500/15 text-amber-400 border-amber-500/30", danger: "bg-red-500/15 text-red-400 border-red-500/30", neutral: "bg-[color:var(--line)] text-[color:var(--muted)] border-[color:var(--line)]" };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${c[tone]}`}>{label}</span>;
}

function CronRow({ job }: { job: MissionControlData["cronJobs"][number] }) {
  const statusDot: Record<string, string> = { success: "🟢", error: "🔴", running: "🔵", pending: "⚪" };
  const tz = "zh-CN";
  return (
    <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span>{statusDot[job.lastStatus]}</span>
          <p className="text-[13px] font-semibold text-[color:var(--foreground)] truncate">{job.name}</p>
          <Badge label={job.schedule} tone="neutral" />
        </div>
        {job.summary && <p className="mt-1 text-[12px] text-[color:var(--muted)]">{job.summary}</p>}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[11px] text-[color:var(--muted)]">
          {job.nextRun ? `下次 ${new Date(job.nextRun).toLocaleString(tz, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}` : "—"}
        </p>
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: MissionControlData["alerts"][number] }) {
  const s = { critical: "border-red-500/30 bg-red-500/5", warning: "border-amber-500/30 bg-amber-500/5", info: "border-blue-500/30 bg-blue-500/5" };
  const icon = { critical: "🔴", warning: "🟡", info: "🔵" };
  return (
    <div className={`rounded-[var(--radius)] border px-4 py-3 ${s[alert.level]}`}>
      <div className="flex items-start gap-2">
        <span>{icon[alert.level]}</span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[color:var(--foreground)]">{alert.message}</p>
          <p className="mt-0.5 text-[12px] text-[color:var(--muted)]">来源: {alert.source}</p>
          <p className="mt-1.5 text-[13px] text-[color:var(--accent)] font-medium">→ {alert.action}</p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[15px] font-semibold text-[color:var(--foreground)]">
        {icon} {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-[12px] text-[color:var(--muted)]">{subtitle}</p>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-3 sm:grid-cols-4">{[...Array(4)].map((_, i) => <div key={i} className="h-[104px] rounded-[var(--radius-lg)] bg-[color:var(--line)]" />)}</div>
      <div className="grid gap-3 sm:grid-cols-2">{[...Array(2)].map((_, i) => <div key={i} className="h-[300px] rounded-[var(--radius-lg)] bg-[color:var(--line)]" />)}</div>
    </div>
  );
}

/* ── Architecture diagram ── */

function ArchitectureDiagram() {
  const nodes = [
    { label: "感知层", items: ["Page Detector", "Keyword Tracker", "Platform Watcher"], color: "border-blue-500/30 bg-blue-500/5" },
    { label: "策略层", items: ["Strategy Brain"], color: "border-purple-500/30 bg-purple-500/5" },
    { label: "执行层", items: ["Content Factory", "Full Health Audit", "AI Citation", "Competitor Intel", "Signal Monitor", "Internal Links"], color: "border-emerald-500/30 bg-emerald-500/5" },
    { label: "展示层", items: ["Mission Control Panel", "Cron → GitHub → Netlify"], color: "border-amber-500/30 bg-amber-500/5" },
  ];
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <SectionTitle icon="🏗️" title="系统架构" subtitle="3 层感知 → 1 层策略 → 6 层执行 → 自动部署" />
      <div className="mt-3 space-y-3">
        {nodes.map((n, i) => (
          <div key={n.label} className={`rounded-[var(--radius)] border px-4 py-3 ${n.color}`}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">L{i + 1}</span>
              <p className="text-[13px] font-semibold text-[color:var(--foreground)]">{n.label}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {n.items.map((item) => <Badge key={item} label={item} tone="neutral" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Site structure summary ── */

function SiteStructure() {
  const groups = [
    { label: "优化工具", count: 4, items: "压缩 · 合并 · 拆分 · OCR PDF" },
    { label: "转换工具", count: 12, items: "PDF↔Word · PDF↔JPG · PDF↔PNG · PDF↔Excel · PPT↔PDF · Text↔PDF · Markdown" },
    { label: "编辑工具", count: 5, items: "编辑 · 签名 · 旋转 · 排序 · 添加/删除页" },
    { label: "安全工具", count: 3, items: "加密 · 解锁 · 翻译" },
    { label: "AI 工具", count: 3, items: "AI 问答 · AI 摘要 · OCR 工作区" },
    { label: "其他页面", count: 8, items: "首页 · 定价 · 关于 · 博客 · FAQ · 帮助 · 隐私 · 条款" },
  ];
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <SectionTitle icon="🌐" title="站点结构" subtitle="42 个页面 · 30 个工具 · 全部含 JSON-LD 结构化数据" />
      <div className="mt-3 space-y-2">
        {groups.map((g) => (
          <div key={g.label} className="flex items-center justify-between rounded-[var(--radius)] border border-[color:var(--line)] px-3 py-2">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[color:var(--foreground)]">{g.label}</p>
              <p className="text-[11px] text-[color:var(--muted)] truncate">{g.items}</p>
            </div>
            <span className="shrink-0 text-[20px] font-semibold text-[color:var(--muted)]">{g.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Cost estimator ── */

function CostPanel() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <SectionTitle icon="💰" title="运行成本" subtitle="DeepSeek V4 Pro · 阿里云 ECS 2C4G" />
      <div className="mt-3 space-y-3">
        <div className="flex justify-between text-[13px]">
          <span className="text-[color:var(--muted)]">每日 LLM 调用</span>
          <span className="font-semibold text-[color:var(--foreground)]">~48 次</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[color:var(--muted)]">LLM 费用</span>
          <span className="font-semibold text-[color:var(--foreground)]">~$0.12/天</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[color:var(--muted)]">服务器</span>
          <span className="font-semibold text-[color:var(--foreground)]">~¥50/月</span>
        </div>
        <div className="border-t border-[color:var(--line)] pt-2 flex justify-between text-[13px]">
          <span className="text-[color:var(--muted)]">总计月费</span>
          <span className="font-semibold text-emerald-400">≈ ¥60/月</span>
        </div>
      </div>
    </div>
  );
}

/* ── Quick links ── */

function QuickLinks() {
  const links = [
    { label: "网站首页", href: "https://dockdocs.app" },
    { label: "GitHub 仓库", href: "https://github.com/zq8345/dock-ai-ecosystem" },
    { label: "Sitemap", href: "https://dockdocs.app/sitemap.xml" },
    { label: "Netlify 控制台", href: "https://app.netlify.com" },
    { label: "阿里云 ECS", href: "https://ecs.console.aliyun.com" },
    { label: "DeepSeek 后台", href: "https://platform.deepseek.com" },
  ];
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
      <SectionTitle icon="🔗" title="快捷入口" />
      <div className="mt-3 grid gap-1">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between rounded-[var(--radius)] px-3 py-2 text-[13px] text-[color:var(--muted)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground)]"
          >
            {l.label}
            <span>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */

export function MissionControlV2() {
  const [data, setData] = useState<MissionControlData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/mission-control-data.json")
      .then((res) => res.json())
      .then((json: MissionControlData) => { setData(json); setLoading(false); })
      .catch(() => { setData(emptyMissionControlData); setLoading(false); });
  }, []);

  if (loading) return <Skeleton />;

  const m = data ?? emptyMissionControlData;
  const pending = m.cronJobs.filter((j) => j.lastStatus === "pending").length;
  const running = m.cronJobs.filter((j) => j.lastStatus === "running" || j.lastStatus === "success").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">DockDocs · Mission Control v2</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">自动化驾驶舱</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge label={`${pending} 待执行`} tone="neutral" />
          <Badge label={`${running} 活跃`} tone="success" />
          <p className="text-[12px] text-[color:var(--muted)]">
            {new Date(m.generatedAt).toLocaleString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <StatCard label="任务总数" value={String(m.cronJobs.length)} sub="11 个自动化任务" />
        <StatCard label="站点健康" value="100%" sub={`${m.seoGeo.pagesLive} 页面全部正常`} tone="success" />
        <StatCard label="即将执行" value={String(pending)} sub="等待首次运行" tone="neutral" />
        <StatCard label="月费" value="≈ ¥60" sub="DeepSeek + 阿里云 ECS" tone="success" />
      </div>

      {/* Alerts */}
      <section className="mt-6">
        <SectionTitle icon="🔔" title="通知中心" subtitle={`${m.alerts.length} 条`} />
        <div className="mt-2 space-y-2">
          {m.alerts.map((a, i) => <AlertRow key={i} alert={a} />)}
        </div>
      </section>

      {/* 2-col layout: jobs + architecture */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Left: job list */}
        <div>
          <SectionTitle icon="🤖" title="任务状态" subtitle="11 个任务 · 点击查看详情" />
          <div className="mt-2 space-y-2">
            {m.cronJobs.map((j) => <CronRow key={j.name} job={j} />)}
          </div>
        </div>

        {/* Right: architecture + structure */}
        <div className="space-y-6">
          <ArchitectureDiagram />
          <SiteStructure />
        </div>
      </div>

      {/* Bottom row: cost + links */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <CostPanel />
        <QuickLinks />
      </div>

      {/* Footer */}
      <p className="mt-10 text-center text-[11px] text-[color:var(--muted)]">
        Mission Control v2 · 数据由 Hermes Agent 自动化生成 · Cloud: 47.251.125.101 · Model: DeepSeek V4 Pro
      </p>
    </div>
  );
}
