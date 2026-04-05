# PrintoMaterial 🖨️

[![React](https://img.shields.io/badge/React-18.3.1-brightgreen)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-orange)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.2.0-purple)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.100.1-indigo)](https://supabase.com/)

**PrintoMaterial** es una aplicación web moderna para servicios de impresión personalizada (DTF, vinilo, puff, parches y más). Construida con React, TypeScript, Tailwind CSS y shadcn/ui, integrada con Supabase para autenticación y base de datos de galería dinámica.

## ✨ Características

- **Páginas responsive**: Home, Servicios, Galería dinámica, Contacto.
- **Galería interactiva**: Productos categorizados (dtf, vinil, puff, parches, other) con datos de Supabase.
- **Calculadora de precios**: Herramienta integrada para cotizaciones.
- **Autenticación**: Integración con Supabase Auth (inicializada en carga).
- **UI moderna**: Componentes shadcn/ui, temas claro/oscuro, animaciones Tailwind.
- **Ruteo SPA**: React Router con lazy loading y Suspense.
- **Estado global**: Zustand para gestión de galería.
- **SEO**: React Helmet Async.
- **Formularios avanzados**: React Hook Form + Zod.
- **Gráficos y carruseles**: Recharts, Embla Carousel.
- **Notificaciones**: Sonner toasts.

## 🛠️ Tecnologías

| Frontend     | Backend                   | Estilos                | Utils                 |
| ------------ | ------------------------- | ---------------------- | --------------------- |
| React 18     | Supabase                  | Tailwind 4 + shadcn/ui | Zustand, React Router |
| TypeScript 5 | PostgreSQL (via Supabase) | Lucide Icons           | React Hook Form + Zod |
| Vite 6       |                           | Next Themes            | React Helmet Async    |

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18+

### Instalación

```bash
pnpm install  # o npm/yarn
```

### Variables de Entorno

Crea `.env.local` en la raíz:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...tu-clave-anonima
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173)

### Build y Preview

```bash
pnpm build
pnpm preview
```

**🧪 Test routing producción local:**

```
http://localhost:4173/gallery  ✅ No 404
http://localhost:4173/services ✅ Funciona refresh
```

## 📁 Estructura del Proyecto

```
.
├── public/              # Assets estáticos (logos, placeholders)
├── src/
│   ├── components/      # shadcn/ui + custom (Layout, Calculator)
│   │   └── ui/          # 50+ componentes UI (Button, Card, Dialog, etc.)
│   ├── hooks/           # Custom hooks (use-mobile, use-toast)
│   ├── lib/             # Utils + Supabase client
│   ├── pages/           # Rutas: Home, Gallery, Services, Contact
│   ├── store/           # Zustand stores (galleryStore)
│   └── App.tsx          # Router principal
├── scripts/             # SQL para DB (pm_tables)
├── styles/              # globals.css
├── package.json         # Deps y scripts
├── tsconfig.json        # TS config
├── vite.config.ts       # Vite config
└── tailwind.config.ts   # Tailwind (implícito via postcss)
```

## 📄 Páginas

| Ruta        | Descripción                                         |
| ----------- | --------------------------------------------------- |
| `/`         | Home: Bienvenida y overview servicios.              |
| `/gallery`  | Galería: Items dinámicos de Supabase por categoría. |
| `/services` | Servicios: Detalles impresión (DTF, vinil, etc.).   |
| `/contact`  | Contacto: Formulario con validación.                |

**Calculadora**: Componente reutilizable en páginas para cotizaciones.

## 🔧 Base de Datos (Supabase)

- Tabla `gallery_items`: `{id, title, description, image_url, category, created_at}`.
- Ejecuta `scripts/001_create_pm_tables.sql` en Supabase SQL Editor.

## 🚀 Despliegue

### 🔧 **Routing SPA (IMPORTANTE - Fix 404s)**

**Problema común**: Refresh en `/gallery` → 404 en producción.

**Soluciones automáticas (recomendado):**

```
✅ Vercel/Netlify: Auto SPA routing
✅ GitHub Pages: Crea _redirects con /*
✅ Firebase Hosting: rewrites en firebase.json
```

**Manual (Apache/Nginx):**

```apache
# Apache .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

**Vite config aplicado:**

```
base: '/'  ✅ Root deploy
preview:   ✅ Test local producción
```

### Plataformas

| Plataforma   | Config Auto  | Env Vars       | Comando      |
| ------------ | ------------ | -------------- | ------------ |
| Vercel       | ✅ SPA       | Dashboard      | `pnpm build` |
| Netlify      | ✅ SPA       | Dashboard      | `pnpm build` |
| GitHub Pages | `_redirects` | GitHub Secrets | `pnpm build` |

**Variables requeridas**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 📄 Licencia

MIT © PrintoMaterial Team

---

_Escaneado y generado automáticamente por BLACKBOXAI._
