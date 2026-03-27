// path: src/store/galleryStore.ts
// ============================================
// Gallery Store — Supabase backend
// Auth slice handles admin session (email/password via Supabase Auth)
// Gallery slice handles CRUD against gallery_items table
// ============================================
import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { GalleryItemRow } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

// ============================================
// TYPES
// ============================================
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "dtf" | "vinil" | "puff" | "parches" | "other";
  createdAt: Date;
}

// Map DB snake_case → app camelCase
function rowToItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    category: row.category,
    createdAt: new Date(row.created_at),
  };
}

interface GalleryState {
  // ── Gallery data ──
  items: GalleryItem[];
  isLoading: boolean;
  error: string | null;

  // ── UI ──
  isPanelOpen: boolean;

  // ── Auth ──
  user: User | null;
  isAuthLoading: boolean;

  // ── Gallery actions ──
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<GalleryItem, "id" | "createdAt">) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  togglePanel: () => void;

  // ── Auth actions ──
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  initAuth: () => Promise<void>;
}

// ============================================
// STORE
// ============================================
export const useGalleryStore = create<GalleryState>()((set, get) => ({
  // ── Initial state ──
  items: [],
  isLoading: false,
  error: null,
  isPanelOpen: false,
  user: null,
  isAuthLoading: true,

  // ──────────────────────────────────────────
  // AUTH
  // ──────────────────────────────────────────

  /** Call once on app mount to restore session */
  initAuth: async () => {
    set({ isAuthLoading: true });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, isAuthLoading: false });

    // Keep session in sync across tabs
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user });
    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isPanelOpen: false });
  },

  // ──────────────────────────────────────────
  // GALLERY CRUD
  // ──────────────────────────────────────────

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }
    set({ items: (data as GalleryItemRow[]).map(rowToItem), isLoading: false });
  },

  addItem: async (item) => {
    const { user } = get();
    if (!user) return;

    // Optimistic insert with a temp id
    const tempId = `temp-${Date.now()}`;
    const optimistic: GalleryItem = {
      ...item,
      id: tempId,
      createdAt: new Date(),
    };
    set((s) => ({ items: [optimistic, ...s.items] }));

    const { data, error } = await supabase
      .from("gallery_items")
      .insert({
        title: item.title,
        description: item.description,
        image_url: item.imageUrl,
        category: item.category,
      })
      .select()
      .single();

    if (error) {
      // Roll back optimistic update
      set((s) => ({
        items: s.items.filter((i) => i.id !== tempId),
        error: error.message,
      }));
      return;
    }

    // Replace temp item with real DB row
    set((s) => ({
      items: s.items.map((i) =>
        i.id === tempId ? rowToItem(data as GalleryItemRow) : i,
      ),
    }));
  },

  removeItem: async (id) => {
    const { user } = get();
    if (!user) return;

    // Optimistic removal
    const previous = get().items;
    set((s) => ({ items: s.items.filter((i) => i.id !== id) }));

    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id);

    if (error) {
      // Roll back
      set({ items: previous, error: error.message });
    }
  },

  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
}));
