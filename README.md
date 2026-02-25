## y2k

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Edge%20Functions-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![React Router](https://img.shields.io/badge/React%20Router-6.x-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)

Aplicación web construida con **React + Vite + TypeScript** con UI basada en **shadcn/ui (Radix UI)**, estilos con **TailwindCSS**, ruteo con **React Router**, estado de servidor con **TanStack Query** e integración backend con **Supabase** (incluye **Edge Functions**), además de flujo de pagos con **MercadoPago**.

> Objetivo: que puedas clonar el repo y correrlo localmente en menos de **5 minutos**.

---

## Tecnologías

- **Frontend**
  - React 18 + TypeScript
  - Vite
  - React Router
  - TanStack Query
  - TailwindCSS (+ `tailwindcss-animate`)
  - shadcn/ui + Radix UI
- **Backend / BaaS**
  - Supabase (Auth, DB, Edge Functions)
- **Pagos**
  - MercadoPago
- **Tooling**
  - ESLint

---

## Características (Features)

- SPA con rutas lazy-loaded (carga diferida) para mejor performance.
- Carrito de compras (contexto global).
- Autenticación y cuentas de usuario:
  - Registro, inicio de sesión y recuperación de contraseña.
  - Perfil de usuario.
- Secciones principales:
  - Home (`/`)
  - Categorías (`/categoria/:categorySlug`)
  - Producto (`/producto/:productSlug`)
  - Carrito (`/carrito`)
  - Búsqueda (`/buscar`)
  - Admin (`/admin`)
- Integraciones Supabase:
  - **Edge Function** para checkout (creación de flujo de pago).
  - **Webhook** de MercadoPago para procesar notificaciones de pagos.
  - **Validación server-side** de URLs de imágenes.
- Notificaciones UI (toasts) y UX mejorada (tooltips).

---

## Pre-requisitos

Asegúrate de tener instalado:

- **Node.js 18+** (recomendado Node 20+)
- Un package manager:
  - **npm** (incluido con Node)  
  - (Opcional) **bun** si prefieres (el repo incluye `bun.lockb`)
- (Opcional, si usarás backend local) **Supabase CLI**  
  https://supabase.com/docs/guides/cli

---

## Instalación y Configuración

### 1) Clonar el repositorio

```bash
git clone https://github.com/ErickGC546/y2k.git
cd y2k
```

### 2) Instalar dependencias

Con **npm**:

```bash
npm install
```

O con **bun**:

```bash
bun install
```

### 3) Variables de entorno

Este proyecto usa **Supabase** y **MercadoPago**. Crea un archivo `.env` en la raíz (junto a `package.json`).

Ejemplo (ajusta los valores):

```bash
# Supabase (Frontend)
VITE_SUPABASE_URL="https://<tu-proyecto>.supabase.co"
VITE_SUPABASE_ANON_KEY="<tu-anon-key>"

# MercadoPago (si aplica en frontend o según tu implementación)
VITE_MERCADOPAGO_PUBLIC_KEY="<tu-public-key>"
```

> Nota: las **Edge Functions** (en `supabase/functions/*`) usan variables de entorno del entorno de Supabase (no necesariamente `VITE_*`). Por ejemplo en el webhook se espera `MERCADOPAGO_ACCESS_TOKEN` y opcionalmente `MERCADOPAGO_WEBHOOK_SECRET`.

---

## Uso (Local)

### Levantar entorno de desarrollo

Con npm:

```bash
npm run dev
```

Con bun:

```bash
bun run dev
```

Luego abre:

- http://localhost:5173

### Build de producción

```bash
npm run build
```

### Previsualizar el build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## (Opcional) Supabase en local

Si quieres correr la base de datos/funciones de Supabase en tu máquina:

1. Instala Supabase CLI
2. En la raíz del repo:

```bash
supabase start
```

3. Para servir funciones localmente:

```bash
supabase functions serve
```

> El repo incluye carpeta `supabase/` con migraciones y funciones (Edge Functions). Ajusta variables de entorno desde tu dashboard de Supabase o con la CLI según tu flujo.

---

## Estructura del Proyecto

```text
y2k/
├─ public/                  # Assets públicos estáticos
├─ src/
│  ├─ components/           # Componentes reutilizables (UI y features)
│  ├─ contexts/             # Context API (ej. carrito)
│  ├─ hooks/                # Custom hooks
│  ├─ integrations/         # Integraciones con servicios externos
│  ├─ lib/                  # Helpers / utilidades compartidas
│  ├─ pages/                # Páginas por ruta (React Router)
│  ├─ types/                # Tipos TypeScript
│  ├─ utils/                # Utilidades generales
│  ├─ App.tsx               # Router + Providers principales
│  └─ main.tsx              # Entry point
├─ supabase/
│  ├─ functions/            # Edge Functions (Deno)
│  ├─ migrations/           # Migraciones SQL
│  └─ config.toml           # Config del proyecto Supabase
├─ index.html
├─ vite.config.ts
├─ tailwind.config.ts
├─ eslint.config.js
└─ package.json
```

---

## Contribución

1. Haz un **Fork** del repo.
2. Crea una rama con un nombre descriptivo:

```bash
git checkout -b feat/mi-cambio
```

3. Realiza tus cambios y agrega commits:

```bash
git add .
git commit -m "feat: describe tu cambio"
```

4. Push a tu fork:

```bash
git push origin feat/mi-cambio
```

5. Abre un **Pull Request** hacia `main` con:
   - Qué cambia y por qué
   - Capturas (si aplica)
   - Pasos para probarlo

---

## Licencia

MIT.  
Si aún no existe un archivo de licencia en el repo, crea `LICENSE` con el texto de MIT.

---

### Nota sobre el análisis del repo

Para redactar este README revisé archivos y estructura del proyecto. En el directorio `supabase/` hay más archivos además de los mostrados en los resultados (GitHub limita resultados en algunas consultas). Puedes ver todo el directorio aquí:

https://github.com/ErickGC546/y2k/search?q=path%3A%2F%5Esupabase%5C%2F.*%24%2F&type=code
