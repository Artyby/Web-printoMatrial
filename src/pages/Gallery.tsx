// path: src/pages/Gallery.tsx
"use client";

import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useGalleryStore } from "../store/galleryStore";
import type { GalleryItem } from "../store/galleryStore";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
  ZoomIn,
  Lock,
  LogIn,
  LogOut,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogClose } from "../components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../components/ui/sheet";

// ============================================
// CATEGORIES
// ============================================
const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "dtf", label: "DTF" },
  { value: "vinil", label: "Vinil Textil" },
  { value: "puff", label: "Puff 3D" },
  { value: "parches", label: "Parches" },
  { value: "other", label: "Otros" },
] as const;

type FilterValue = "all" | "dtf" | "vinil" | "puff" | "parches" | "other";

interface NewItemForm {
  title: string;
  description: string;
  imageUrl: string;
  category: "dtf" | "vinil" | "puff" | "parches" | "other";
}

// ============================================
// LOGIN MODAL — Supabase email/password
// ============================================
interface LoginModalProps {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

function LoginModal({ open, onSuccess, onCancel }: LoginModalProps) {
  const signIn = useGalleryStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    setLoading(false);

    if (authError) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      setPassword("");
      emailRef.current?.focus();
      return;
    }

    setEmail("");
    setPassword("");
    onSuccess();
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setError(null);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl p-7 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <Lock size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Acceso de Administrador
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ingresa tus credenciales de Supabase
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@printo-material.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className={cn(
                "w-full px-4 py-3 bg-input border rounded-lg text-foreground text-sm focus:outline-none transition-colors",
                error
                  ? "border-destructive"
                  : "border-border focus:border-primary",
              )}
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              <AlertCircle size={13} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground/70 hover:text-foreground transition-colors text-sm font-medium disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Entrando...
                </>
              ) : (
                <>
                  <LogIn size={14} /> Entrar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// CONFIRM DELETE MODAL
// ============================================
interface ConfirmDeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({ open, onConfirm, onCancel }: ConfirmDeleteProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl p-7 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-destructive/10 rounded-lg">
            <Trash2 size={20} className="text-destructive" />
          </div>
          <h3 className="text-base font-bold text-foreground">Eliminar Item</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          ¿Estás seguro? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-destructive text-destructive-foreground font-semibold rounded-lg hover:bg-destructive/90 transition-colors text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// GALLERY PAGE
// ============================================
export default function Gallery() {
  const {
    items,
    isLoading,
    error,
    isPanelOpen,
    togglePanel,
    addItem,
    removeItem,
    user,
    signOut,
  } = useGalleryStore();

  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [newItemForm, setNewItemForm] = useState<NewItemForm>({
    title: "",
    description: "",
    imageUrl: "",
    category: "other",
  });

  // ── Modal state ──
  const [loginModal, setLoginModal] = useState<{
    open: boolean;
    intent: "add" | "delete";
    targetId?: string;
  }>({ open: false, intent: "add" });

  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    targetId: string | null;
  }>({ open: false, targetId: null });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Derived ──
  const isAdmin = !!user;
  const isOtherFilter = activeFilter === "other";

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  // ──────────────────────────────────────────
  // ADD ITEM FLOW
  // ──────────────────────────────────────────
  const handleRequestAdd = () => {
    if (!isAdmin) {
      setLoginModal({ open: true, intent: "add" });
    } else {
      togglePanel();
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.title || !newItemForm.imageUrl) return;
    setIsSubmitting(true);
    await addItem(newItemForm);
    setIsSubmitting(false);
    setNewItemForm({
      title: "",
      description: "",
      imageUrl: "",
      category: "other",
    });
    togglePanel();
  };

  // ──────────────────────────────────────────
  // DELETE ITEM FLOW
  // ──────────────────────────────────────────
  const handleRequestDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      setLoginModal({ open: true, intent: "delete", targetId: id });
    } else {
      setConfirmDelete({ open: true, targetId: id });
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete.targetId) return;
    await removeItem(confirmDelete.targetId);
    setConfirmDelete({ open: false, targetId: null });
  };

  // ──────────────────────────────────────────
  // LOGIN SUCCESS
  // ──────────────────────────────────────────
  const handleLoginSuccess = () => {
    setLoginModal((m) => ({ ...m, open: false }));
    if (loginModal.intent === "add") {
      togglePanel();
    } else if (loginModal.intent === "delete" && loginModal.targetId) {
      setConfirmDelete({ open: true, targetId: loginModal.targetId });
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <Helmet>
        <title>
          Galería de Trabajos — Printo-Material | DTF, Vinil, Puff & Parches
        </title>
        <meta
          name="description"
          content="Explora nuestra galería de impresiones DTF, Vinil Textil, Efecto Puff 3D y Parches. Alta calidad, resultados profesionales garantizados."
        />
      </Helmet>

      {/* ── Modals ── */}
      <LoginModal
        open={loginModal.open}
        onSuccess={handleLoginSuccess}
        onCancel={() => setLoginModal((m) => ({ ...m, open: false }))}
      />
      <ConfirmDeleteModal
        open={confirmDelete.open}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete({ open: false, targetId: null })}
      />

      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
                Portafolio
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                TEXTURAS Y <span className="text-primary">RESULTADOS</span>
              </h1>
              <p className="text-foreground/60 mt-3 max-w-lg">
                Cada pieza es prueba de nuestra precisión industrial. Filtra por
                técnica.
              </p>
            </div>

            {/* Admin controls */}
            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              {isAdmin && (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground/60 hover:text-foreground hover:border-primary/40 transition-all text-sm"
                >
                  <LogOut size={15} />
                  Salir
                </button>
              )}
              {isOtherFilter && (
                <button
                  onClick={handleRequestAdd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
                >
                  <Plus size={18} />
                  Agregar Item
                </button>
              )}
            </div>
          </div>

          {/* ── Admin badge ── */}
          {isAdmin && (
            <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-primary/5 border border-primary/20 rounded-lg w-fit text-xs text-primary">
              <Lock size={12} />
              Modo administrador activo · {user.email}
            </div>
          )}

          {/* ── Global error ── */}
          {error && (
            <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {/* ── Filters ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value as FilterValue)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  activeFilter === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-foreground/60 border-border hover:border-primary/50 hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Loading skeleton ── */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl overflow-hidden border border-border animate-pulse"
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Grid ── */}
          {!isLoading && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className="aspect-[4/3] overflow-hidden relative cursor-zoom-in"
                    onClick={() => setLightboxItem(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn
                        size={32}
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      />
                    </div>
                    {/* Delete — always rendered, auth checked on click */}
                    {isAdmin && (
                      <button
                        onClick={(e) => handleRequestDelete(item.id, e)}
                        className="absolute top-3 right-3 p-2 bg-destructive/90 text-destructive-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    {/* Category badge */}
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-background/80 backdrop-blur-sm text-primary text-xs font-semibold rounded-full border border-primary/30 capitalize">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Empty state ── */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-24 border border-dashed border-border rounded-xl">
              <ImageIcon
                className="mx-auto text-muted-foreground mb-4"
                size={48}
              />
              <p className="text-muted-foreground">
                No hay items en esta categoría.
              </p>
              {isOtherFilter && (
                <button
                  onClick={handleRequestAdd}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Plus size={15} /> Agregar el primero
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <Dialog
        open={!!lightboxItem}
        onOpenChange={(open: boolean) => !open && setLightboxItem(null)}
      >
        <DialogContent className="max-w-4xl w-full bg-background/95 backdrop-blur border-border p-0 overflow-hidden">
          {lightboxItem && (
            <div className="relative">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 to-transparent">
                <h3 className="text-lg font-bold text-foreground">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {lightboxItem.description}
                </p>
              </div>
              <DialogClose className="absolute top-3 right-3 p-2 bg-background/80 rounded-lg text-foreground hover:text-primary transition-colors">
                <X size={20} />
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── ADD ITEM PANEL ── */}
      <Sheet
        open={isPanelOpen}
        onOpenChange={(open: boolean) => !open && togglePanel()}
      >
        <SheetContent
          side="right"
          className="bg-card border-border w-full max-w-md overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-primary text-xl font-bold">
              Agregar Nuevo Item
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleAddItem} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Título *
              </label>
              <input
                type="text"
                required
                value={newItemForm.title}
                onChange={(e) =>
                  setNewItemForm({ ...newItemForm, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Ej: Parche Streetwear"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción
              </label>
              <textarea
                rows={3}
                value={newItemForm.description}
                onChange={(e) =>
                  setNewItemForm({
                    ...newItemForm,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Describe el resultado..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL de Imagen *
              </label>
              <input
                type="url"
                required
                value={newItemForm.imageUrl}
                onChange={(e) =>
                  setNewItemForm({ ...newItemForm, imageUrl: e.target.value })
                }
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="https://..."
              />
              {newItemForm.imageUrl && (
                <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={newItemForm.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Categoría *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: "dtf", label: "DTF" },
                    { value: "vinil", label: "Vinil Textil" },
                    { value: "puff", label: "Puff 3D" },
                    { value: "parches", label: "Parches" },
                    { value: "other", label: "Otros" },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() =>
                      setNewItemForm({ ...newItemForm, category: cat.value })
                    }
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-semibold border transition-all",
                      newItemForm.category === cat.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground/60 border-border hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <SheetClose asChild>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
              </SheetClose>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Guardando...
                  </>
                ) : (
                  <>
                    <Plus size={18} /> Agregar
                  </>
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
