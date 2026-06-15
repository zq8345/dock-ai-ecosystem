// TypeScript interfaces for Supabase Postgres rows (nf-flow-foundation schema).
// Column names match the SQL schema in supabase/migrations/001_flow_foundation.sql.
// Imported by both server-side (_shared/db.ts) and client-side components.

export type DbDocument = {
  id: string;
  user_id: string;
  name: string;
  mime: string;
  byte_size: number | null;
  page_count: number | null;
  storage_path: string | null;
  created_at: string;
};

export type DbDocumentText = {
  id: string;
  document_id: string;
  user_id: string;
  chunk_index: number;
  content: string;
  created_at: string;
};
