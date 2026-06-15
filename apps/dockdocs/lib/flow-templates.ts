"use client";

// Flow extraction templates — Phase A (localStorage) + Phase B (Supabase sync).
// Phase B activates only when the user has explicitly opted into the private
// encrypted workspace (user_metadata.flow_optin === true). localStorage always
// stays the source of truth; Supabase is a best-effort mirror.

import { supabase } from "@/lib/supabase";

export type FlowTemplate = {
  id: string;
  name: string;
  docType: string;
  dimensions: Array<{ key: string; label: string }>;
  createdAt: string;
};

const KEY = "dockdocs:flow-templates";

export function loadTemplates(): FlowTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTemplate);
  } catch {
    return [];
  }
}

export function saveTemplate(
  tpl: Omit<FlowTemplate, "id" | "createdAt">,
): FlowTemplate {
  const next: FlowTemplate = {
    id: `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...tpl,
  };
  const existing = loadTemplates().filter((t) => t.name !== tpl.name);
  localStorage.setItem(KEY, JSON.stringify([next, ...existing]));

  // Phase B: mirror to Supabase if user opted in. Fire-and-forget.
  void syncTemplateUpsert(next);

  return next;
}

export function deleteTemplate(id: string): void {
  const updated = loadTemplates().filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));

  // Phase B: remove from Supabase if user opted in. Fire-and-forget.
  void syncTemplateDelete(id);
}

// ── Phase B helpers ────────────────────────────────────────────────────────

async function isFlowOptedIn(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    if (data.user.user_metadata?.flow_optin !== true) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

async function syncTemplateUpsert(tpl: FlowTemplate): Promise<void> {
  const userId = await isFlowOptedIn();
  if (!userId) return;
  try {
    await supabase.from("flow_templates").upsert({
      id: tpl.id,
      user_id: userId,
      name: tpl.name,
      doc_type: tpl.docType,
      dimensions: tpl.dimensions,
      created_at: tpl.createdAt,
      updated_at: new Date().toISOString(),
    });
  } catch {
    // Best-effort — localStorage write already succeeded.
  }
}

async function syncTemplateDelete(id: string): Promise<void> {
  const userId = await isFlowOptedIn();
  if (!userId) return;
  try {
    await supabase.from("flow_templates").delete().eq("id", id).eq("user_id", userId);
  } catch {
    // Best-effort.
  }
}

function isTemplate(x: unknown): x is FlowTemplate {
  if (!x || typeof x !== "object") return false;
  const t = x as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.name === "string" &&
    typeof t.docType === "string" &&
    Array.isArray(t.dimensions) &&
    typeof t.createdAt === "string"
  );
}
