import { existsSync, readFileSync } from "fs";
import path from "path";
import type { MissionTone } from "@/lib/mission-control";

export type MissionIntegrationSignal = {
  label: string;
  status: string;
  detail: string;
  tone: MissionTone;
};

export type MissionControlIntegrationSnapshot = {
  premium: {
    status: string;
    detail: string;
    tone: MissionTone;
    signals: MissionIntegrationSignal[];
  };
  taskQueue: {
    status: string;
    detail: string;
    tone: MissionTone;
    counts: {
      pending: number;
      running: number;
      completed: number;
      failed: number;
      skipped: number;
    };
    signals: MissionIntegrationSignal[];
  };
};

type QueueTask = {
  status?: string;
};

const appRoot = process.cwd();

export function getMissionControlIntegrationSnapshot(): MissionControlIntegrationSnapshot {
  const premiumSignals = readPremiumSignals();
  const taskQueue = readTaskQueueSignals();

  return {
    premium: summarizeSignals({
      readyLabel: "Premium workspace integrated",
      watchLabel: "Premium workspace waiting",
      blockedLabel: "Premium workspace blocked",
      signals: premiumSignals,
    }),
    taskQueue,
  };
}

function readPremiumSignals(): MissionIntegrationSignal[] {
  const aiWorkspaceRuntime = readAppFile("lib/ai-workspace-runtime.ts");
  const dashboard = readAppFile("components/WorkspaceDashboardClient.tsx");
  const myChats = readAppFile("components/MyChatsClient.tsx");
  const aiSummary = readAppFile("components/AiSummaryWorkflow.tsx");

  return [
    createSignal({
      label: "Premium capability runtime",
      ready: Boolean(aiWorkspaceRuntime),
      readyDetail: "ai-workspace-runtime.ts is present.",
      watchDetail: "DEV-300 runtime is not present on this branch yet.",
    }),
    createSignal({
      label: "Dashboard premium cards",
      ready:
        dashboard.includes("workspace-plan-card") &&
        dashboard.includes("workspace-capability-card"),
      readyDetail: "Workspace dashboard renders plan and capability cards.",
      watchDetail: "Workspace dashboard does not expose premium capability cards yet.",
    }),
    createSignal({
      label: "My Chats plan binding",
      ready:
        myChats.includes("getSubscriptionSnapshot") &&
        myChats.includes("my-chats-plan") &&
        !myChats.includes("Plan: Free"),
      readyDetail: "My Chats reads current subscription state instead of hardcoding Free.",
      watchDetail: "My Chats plan display still needs subscription-runtime binding.",
    }),
    createSignal({
      label: "AI Summary usage metering",
      ready:
        aiSummary.includes("@/lib/usage-runtime") &&
        aiSummary.includes("canUseFeature") &&
        aiSummary.includes("recordUsage"),
      readyDetail: "AI Summary uses the shared usage runtime for summary metering.",
      watchDetail: "AI Summary metering still depends on the older commercial helper.",
    }),
  ];
}

function readTaskQueueSignals() {
  const queuePath = path.join(appRoot, "docs", "task-queue.json");
  const queue = readTaskQueue(queuePath);
  const counts = countQueueStatuses(queue);
  const exists = existsSync(queuePath);
  const hasFailures = counts.failed > 0;
  const hasWork = counts.pending + counts.running > 0;

  const signals: MissionIntegrationSignal[] = [
    createSignal({
      label: "Task queue file",
      ready: exists,
      readyDetail: "task-queue.json is available for Mission Control visibility.",
      watchDetail: "task-queue.json is not present in apps/dockdocs/docs.",
    }),
    {
      label: "Queue workload",
      status: hasWork ? "Open" : "Clear",
      detail: hasWork
        ? `${counts.pending} pending and ${counts.running} running queue item(s).`
        : "No pending or running queue items detected.",
      tone: hasWork ? "watch" : "ready",
    },
    {
      label: "Queue failures",
      status: hasFailures ? "Failed" : "Clear",
      detail: hasFailures
        ? `${counts.failed} failed queue item(s) need review.`
        : "No failed queue items detected.",
      tone: hasFailures ? "blocked" : "ready",
    },
  ];

  const summary = summarizeSignals({
    readyLabel: "Task queue clear",
    watchLabel: "Task queue active",
    blockedLabel: "Task queue needs review",
    signals,
  });

  return {
    ...summary,
    counts,
    signals,
  };
}

function summarizeSignals({
  readyLabel,
  watchLabel,
  blockedLabel,
  signals,
}: {
  readyLabel: string;
  watchLabel: string;
  blockedLabel: string;
  signals: MissionIntegrationSignal[];
}): {
  status: string;
  detail: string;
  tone: MissionTone;
  signals: MissionIntegrationSignal[];
} {
  const blocked = signals.filter((signal) => signal.tone === "blocked").length;
  const watch = signals.filter((signal) => signal.tone === "watch").length;
  const tone: MissionTone = blocked > 0 ? "blocked" : watch > 0 ? "watch" : "ready";

  return {
    status: blocked > 0 ? blockedLabel : watch > 0 ? watchLabel : readyLabel,
    detail:
      blocked > 0
        ? `${blocked} integration signal(s) need attention.`
        : watch > 0
          ? `${watch} integration signal(s) are still in watch state.`
          : "All integration signals are ready.",
    tone,
    signals,
  };
}

function createSignal({
  label,
  ready,
  readyDetail,
  watchDetail,
}: {
  label: string;
  ready: boolean;
  readyDetail: string;
  watchDetail: string;
}): MissionIntegrationSignal {
  return {
    label,
    status: ready ? "Ready" : "Watch",
    detail: ready ? readyDetail : watchDetail,
    tone: ready ? "ready" : "watch",
  };
}

function readAppFile(relativePath: string) {
  const filePath = path.join(appRoot, relativePath);
  if (!existsSync(filePath)) {
    return "";
  }

  return readFileSync(filePath, "utf8");
}

function readTaskQueue(queuePath: string): QueueTask[] {
  if (!existsSync(queuePath)) {
    return [];
  }

  try {
    const parsed = JSON.parse(readFileSync(queuePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [{ status: "failed" }];
  }
}

function countQueueStatuses(queue: QueueTask[]) {
  return queue.reduce(
    (counts, task) => {
      const status = task.status ?? "pending";
      if (status === "running") {
        counts.running += 1;
      } else if (status === "completed") {
        counts.completed += 1;
      } else if (status === "failed") {
        counts.failed += 1;
      } else if (status === "skipped") {
        counts.skipped += 1;
      } else {
        counts.pending += 1;
      }

      return counts;
    },
    {
      pending: 0,
      running: 0,
      completed: 0,
      failed: 0,
      skipped: 0,
    },
  );
}
