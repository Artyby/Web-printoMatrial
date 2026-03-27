---

## Supabase Integration Plan

**Goal**: Secure backend for gallery catalog (items CRUD) + admin authentication (password-protected panel).

### Phase 1: Setup & Dependencies

- Create `.env` for `SUPABASE_URL`, `SUPABASE_ANON_KEY` (user provides).
- `pnpm add @supabase/supabase-js @supabase/auth-helpers-react @supabase/auth-ui-react`
- Create `src/lib/supabase.ts`: Supabase client init.

### Phase 2: Database Schema

- Supabase dashboard: Create `gallery_items` table matching GalleryItem (add `user_id uuid` for ownership).
- Enable Row Level Security (RLS): Auth'd users CRUD own items.
- Insert defaultItems via SQL or edge function.
- Reuse/migrate `scripts/001_create_pm_tables.sql` if relevant.

### Phase 3: Authentication

- Admin auth for gallery panel: Supabase Auth (email/password).
- Create auth wrapper (`SupabaseProvider` in `main.tsx`).
- `Gallery.tsx`: Protect add/remove/togglePanel with session check.
- Password: Store admin creds in Supabase auth users (hashed), validate on login.

### Phase 4: Migrate Gallery Store

- `galleryStore.ts`: Replace localStorage with Supabase.
  - Fetch: `supabase.from('gallery_items').select('*').order('createdAt', {ascending: false})`
  - addItem: DB insert + optimistic UI.
  - removeItem: DB delete.
  - Realtime subscriptions for live sync.
  - Offline fallback: localStorage.

### Phase 5: Pages & UI Updates

- `Gallery.tsx`: Login dialog (shadcn + supabase auth-ui), user avatar/logout.
- Loader states, error handling, auth gate for panel.

### Phase 6: Security & Polish

- RLS policies: User-based access.
- Edge functions for sensitive ops.
- Env validation, CORS in Supabase.

**File Changes:**

```
[ ] package.json (supabase deps)
[ ] .env.example (SUPABASE_*)
[ ] src/lib/supabase.ts (client)
[ ] src/store/galleryStore.ts (Supabase CRUD)
[ ] src/pages/Gallery.tsx (auth gate)
[ ] src/main.tsx (AuthProvider)
```

**Dependencies:**

```
@supabase/supabase-js @supabase/auth-helpers-react @supabase/auth-ui-react
```

**Testing:**

1. User provides Supabase keys/project.
2. `pnpm install`
3. Create table/RLS.
4. `pnpm dev` → Gallery fetches from DB, auth protects edits.
5. Migrate local data.

**Estimated Time**: 3-5 hours  
**Priority**: High (security + persistence)

## Original Website Improvement Plan (Preserved)

# Website Improvement Plan for Printo-Material

**NEW REQUIREMENT**: Convert to **SIMPLE STATIC MULTI-PAGE WEBSITE** (separate HTML files)

- HomePage (index.html)
- Gallery.html
- Contact.html
- Info.html (services/info page)

**Goal**: Professional static site to build client confidence. Fast, SEO-friendly, no JS framework complexity.

## Current State Analysis

**React SPA** → will **extract to static HTML/CSS/JS**

- Hero + Calculator → Home
- Gallery grid → Gallery page (static showcase, remove admin panel)
- Contact form → Contact page
- **NEW**: Info page (services, about, process)

