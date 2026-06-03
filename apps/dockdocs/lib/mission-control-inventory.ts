export type InventoryItem = {
  id: string;
  label: string;
  status: string;
  detail: string;
};

export type ProjectInventory = {
  project: {
    name: string;
    phase: string;
    status: string;
  };
  tasks: InventoryItem[];
  branches: InventoryItem[];
  prs: InventoryItem[];
  agents: InventoryItem[];
  queue: {
    mode: string;
    runner: string;
    hardened: string;
    pending: number;
    running: number;
    completed: number;
    failed: number;
    next: string;
  };
  recommendations: string[];
};

export const projectInventory: ProjectInventory = {
  project: {
    name: "DockDocs",
    phase: "Mission Control 2.0",
    status: "Operational baseline",
  },
  tasks: [
    {
      id: "DEV-100",
      label: "Commercialization MVP",
      status: "Completed / Production",
      detail: "Commercial account and production baseline are tracked as shipped.",
    },
    {
      id: "DEV-200",
      label: "Billing MVP",
      status: "Completed / Production",
      detail: "Billing MVP is treated as production baseline scope.",
    },
    {
      id: "DEV-300",
      label: "AI Workspace Premium",
      status: "Completed / PR or Review",
      detail: "Premium workspace branch is complete and awaiting release decision.",
    },
    {
      id: "UI-300",
      label: "Workspace UX acceptance",
      status: "In Progress",
      detail: "UI acceptance remains active for workspace experience checks.",
    },
    {
      id: "OPS-100",
      label: "Mission Control Phase 1",
      status: "Completed / Merged",
      detail: "Internal Mission Control route is merged into master.",
    },
    {
      id: "OPS-102",
      label: "Codex Task Queue Runner",
      status: "Completed / Merged",
      detail: "Local task queue runner prototype is merged into master.",
    },
    {
      id: "OPS-102A",
      label: "Harden Task Queue Runner",
      status: "Completed / Merged",
      detail: "Queue runner guardrails and timestamp fields are merged into master.",
    },
    {
      id: "OPS-103",
      label: "Mission Control x Task Queue",
      status: "Completed / PR or Review",
      detail: "Queue status integration is complete and awaiting merge decision.",
    },
    {
      id: "OPS-104",
      label: "Project Inventory",
      status: "In Progress",
      detail: "Static project inventory is being added to Mission Control.",
    },
  ],
  branches: [
    {
      id: "master",
      label: "Production branch",
      status: "Active",
      detail: "Current release baseline includes OPS-100 and OPS-102.",
    },
    {
      id: "dev-300-ai-workspace-premium-clean",
      label: "DEV-300 branch",
      status: "Review",
      detail: "Premium workspace branch remains separate from this OPS task.",
    },
    {
      id: "ops-103-mission-control-task-queue",
      label: "OPS-103 branch",
      status: "Review",
      detail: "Task Queue integration branch is not assumed merged.",
    },
    {
      id: "ops-104-project-inventory",
      label: "OPS-104 branch",
      status: "In Progress",
      detail: "Project Inventory branch for this static snapshot.",
    },
  ],
  prs: [
    {
      id: "OPS-100",
      label: "Mission Control Phase 1",
      status: "Merged",
      detail: "Merged into master.",
    },
    {
      id: "OPS-102",
      label: "Codex Task Queue Runner",
      status: "Merged",
      detail: "Merged into master with OPS-102A hardening.",
    },
    {
      id: "OPS-103",
      label: "Mission Control x Task Queue",
      status: "Open / Review",
      detail: "Pending review after OPS-100 and OPS-102 reached master.",
    },
    {
      id: "DEV-300",
      label: "AI Workspace Premium",
      status: "Open / Review",
      detail: "Product implementation branch stays outside OPS-104.",
    },
    {
      id: "OPS-104",
      label: "Project Inventory",
      status: "In Progress",
      detail: "Static inventory branch is being prepared.",
    },
  ],
  agents: [
    {
      id: "GPT",
      label: "Strategy / product direction",
      status: "Active",
      detail: "Defines direction and task priorities.",
    },
    {
      id: "Hermes PMO",
      label: "Project board / task state",
      status: "Active",
      detail: "Keeps board state and handoffs coordinated.",
    },
    {
      id: "Hermes DEV",
      label: "Engineering coordination",
      status: "Active",
      detail: "Coordinates implementation and development review.",
    },
    {
      id: "Hermes UI",
      label: "UX acceptance criteria",
      status: "Active",
      detail: "Owns interface acceptance and visual quality checks.",
    },
    {
      id: "Codex OPS",
      label: "Infrastructure execution",
      status: "Active",
      detail: "Runs build, deploy, branch, and production validation workflows.",
    },
    {
      id: "Codex DEV",
      label: "Product implementation",
      status: "Active",
      detail: "Executes scoped product implementation tasks when assigned.",
    },
  ],
  queue: {
    mode: "Local DEV/QA only",
    runner: "OPS-102",
    hardened: "OPS-102A",
    pending: 0,
    running: 0,
    completed: 3,
    failed: 0,
    next: "OPS-103 / OPS-104 validation",
  },
  recommendations: [
    "Merge OPS-103 after OPS-100 and OPS-102 are confirmed in master.",
    "Merge DEV-300 after review.",
    "Use Mission Control as single source of truth.",
    "Do not start new product features until project inventory is visible.",
  ],
};

export function getInventorySummary() {
  return {
    taskCount: projectInventory.tasks.length,
    branchCount: projectInventory.branches.length,
    prCount: projectInventory.prs.length,
    agentCount: projectInventory.agents.length,
    queueCompleted: projectInventory.queue.completed,
    projectStatus: projectInventory.project.status,
  };
}
