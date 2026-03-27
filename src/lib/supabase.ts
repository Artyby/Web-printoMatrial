// path: src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.local.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Typed row matching the DB schema ──────────────────────────
export interface GalleryItemRow {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: "dtf" | "vinil" | "puff" | "parches" | "other";
  created_at: string;
}
