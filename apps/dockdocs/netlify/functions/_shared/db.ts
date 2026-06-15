// Document persistence helpers — thin wrappers over supabase-admin.ts.
// All writes go server-side (service_role, bypasses RLS).
// All reads can also go client-side via the publishable key + user JWT (RLS enforced).
//
// Usage pattern (in a Netlify function):
//   const doc = await saveDocument(userId, { name, mime, byteSize, pageCount });
//   await saveDocumentText(doc.id, userId, extractedText);

import { dbDelete, dbInsert, dbSelect } from "./supabase-admin";
import type { DbDocument, DbDocumentText } from "../../../lib/db-types";

// ── documents ──────────────────────────────────────────────────────────────────

export async function saveDocument(
  userId: string,
  meta: { name: string; mime?: string; byteSize?: number; pageCount?: number },
): Promise<DbDocument> {
  return dbInsert<DbDocument>("documents", {
    user_id: userId,
    name: meta.name,
    mime: meta.mime ?? "application/pdf",
    byte_size: meta.byteSize ?? null,
    page_count: meta.pageCount ?? null,
  });
}

export async function getDocuments(userId: string): Promise<DbDocument[]> {
  return dbSelect<DbDocument>(
    "documents",
    `user_id=eq.${encodeURIComponent(userId)}&order=created_at.desc`,
  );
}

export async function deleteDocument(
  documentId: string,
  userId: string,
): Promise<void> {
  // user_id guard on delete even though service_role bypasses RLS
  await dbDelete(
    "documents",
    `id=eq.${encodeURIComponent(documentId)}&user_id=eq.${encodeURIComponent(userId)}`,
  );
}

// ── document_texts ─────────────────────────────────────────────────────────────

const CHUNK_SIZE = 50_000; // chars; stay under PostgREST row size comfort zone

export async function saveDocumentText(
  documentId: string,
  userId: string,
  text: string,
): Promise<void> {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }
  if (chunks.length === 0) chunks.push("");

  await Promise.all(
    chunks.map((content, chunk_index) =>
      dbInsert<DbDocumentText>("document_texts", {
        document_id: documentId,
        user_id: userId,
        chunk_index,
        content,
      }),
    ),
  );
}

export async function getDocumentText(
  documentId: string,
  userId: string,
): Promise<string> {
  const rows = await dbSelect<DbDocumentText>(
    "document_texts",
    `document_id=eq.${encodeURIComponent(documentId)}&user_id=eq.${encodeURIComponent(userId)}&order=chunk_index.asc`,
    "content",
  );
  return rows.map((r) => r.content).join("");
}
