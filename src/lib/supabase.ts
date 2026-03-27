/// <reference types="vite/client" />
// path: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Supabase] Faltan variables de entorno.\n' +
    'Crea un archivo .env.local en la raíz del proyecto con:\n' +
    '  VITE_SUPABASE_URL=https://xxxx.supabase.co\n' +
    '  VITE_SUPABASE_ANON_KEY=eyJ...'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Typed row matching the DB schema ──────────────────────────
export interface GalleryItemRow {
  id: string
  title: string
  description: string
  image_url: string
  category: 'dtf' | 'vinil' | 'puff' | 'parches' | 'other'
  created_at: string
}