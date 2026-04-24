# Milestone 1 — Foundation & Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a Next.js 15 + Payload 3.0 project with Neon Postgres, Vercel Blob media storage, all collections/globals from the spec, admin UI live at `/admin`, and a seed script that populates sample content. No public-facing storefront yet (that's M2).

**Architecture:** Single Next.js 15 App Router project. Payload 3.0 mounted via `@payloadcms/next`. Admin at `/admin`, REST API at `/api`, storefront routes will come in M2. DB schema auto-managed by Payload's Postgres adapter in dev; explicit migrations in prod.

**Tech Stack:** Next.js 15, Payload 3.0, TypeScript, Tailwind CSS, Neon Postgres, `@payloadcms/db-postgres`, `@payloadcms/storage-vercel-blob`, `@payloadcms/plugin-seo`, `pnpm`.

**Testing approach:** Payload config is declarative — unit-testing collection configs is low-value. This plan uses **verification steps** (run command, check output) for config tasks and reserves real tests for logic (seed script, access control). If a step can be verified by booting the admin and clicking something, the plan says exactly what to click and what to see.

**Prereqs before starting (human actions):**
- Neon account + project created at neon.tech → copy the pooled connection string
- Vercel account + project created → connect to the `classicalwaves` GitHub repo (create the repo too if needed)
- Vercel Blob store provisioned via Vercel dashboard → copy `BLOB_READ_WRITE_TOKEN`
- Node 20.x installed locally (`node -v` → `v20.x`)
- `pnpm` installed (`corepack enable && corepack prepare pnpm@latest --activate`)

---

## File Structure

```
cw.dev/
├── src/
│   ├── app/
│   │   ├── (payload)/
│   │   │   ├── admin/[[...segments]]/
│   │   │   │   ├── page.tsx              — admin UI entry (from Payload template)
│   │   │   │   └── not-found.tsx
│   │   │   ├── api/
│   │   │   │   ├── [...slug]/route.ts    — REST API
│   │   │   │   └── graphql/route.ts      — GraphQL API
│   │   │   ├── layout.tsx
│   │   │   └── custom.scss
│   │   ├── layout.tsx                    — root layout (minimal in M1)
│   │   └── page.tsx                      — placeholder home (M2 replaces)
│   ├── collections/
│   │   ├── Users.ts                      — admin editors, auth: true
│   │   ├── Customers.ts                  — shoppers, auth: true
│   │   ├── Media.ts                      — uploads, Vercel Blob-backed
│   │   ├── Products.ts                   — catalog with variants
│   │   ├── Orders.ts                     — purchases (minimal schema in M1)
│   │   ├── Pages.ts                      — CMS pages (fields only; blocks in M2)
│   │   ├── Posts.ts                      — journal posts (fields only; blocks in M2)
│   │   ├── PressMentions.ts              — "as seen in" items
│   │   ├── NewsletterSubscribers.ts      — email list
│   │   └── ContactSubmissions.ts         — contact form entries
│   ├── globals/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Settings.ts
│   ├── lib/
│   │   └── getPayload.ts                 — Local API helper (used by seed script)
│   ├── scripts/
│   │   └── seed.ts                       — populates sample content
│   ├── payload.config.ts                 — Payload root config
│   └── payload-types.ts                  — generated (do not edit)
├── tests/
│   └── seed.test.ts                      — seed script verification
├── .env
├── .env.example
├── .gitignore
├── next.config.ts
├── next-env.d.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── vercel.json
└── README.md
```

---

## Task 1: Initialize Next.js 15 Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `.gitignore`, `README.md`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1.1: Confirm working directory is empty**

Run:
```bash
cd /Users/grozenblat/Desktop/cw.dev && ls -la
```
Expected: only `docs/` directory (the design and plan). If there are other files, stop and ask.

- [ ] **Step 1.2: Initialize git repo**

Run:
```bash
git init && git branch -M main
```
Expected: `Initialized empty Git repository in /Users/grozenblat/Desktop/cw.dev/.git/`

- [ ] **Step 1.3: Scaffold Next.js with create-next-app**

Run:
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-pnpm
```

Answer prompts:
- "Ok to proceed?" → yes
- Any conflict with existing `docs/` directory → continue, it's expected

Expected: scaffold completes; `package.json`, `src/app/`, `tailwind.config.ts`, `tsconfig.json` exist.

- [ ] **Step 1.4: Verify Next.js boots**

Run:
```bash
pnpm dev
```
Expected: server starts on `http://localhost:3000`, default Next.js starter page loads. Kill with Ctrl+C.

- [ ] **Step 1.5: Commit**

```bash
git add .
git commit -m "chore: initialize Next.js 15 + TS + Tailwind scaffold"
```

---

## Task 2: Install Payload 3.0 and Adapters

**Files:**
- Modify: `package.json` (deps added by install)

- [ ] **Step 2.1: Install Payload core + Next.js integration**

Run:
```bash
pnpm add payload @payloadcms/next @payloadcms/richtext-lexical
```
Expected: `payload`, `@payloadcms/next`, `@payloadcms/richtext-lexical` appear in `package.json` dependencies.

- [ ] **Step 2.2: Install Postgres adapter**

Run:
```bash
pnpm add @payloadcms/db-postgres
```

- [ ] **Step 2.3: Install Vercel Blob storage adapter**

Run:
```bash
pnpm add @payloadcms/storage-vercel-blob
```

- [ ] **Step 2.4: Install SEO plugin**

Run:
```bash
pnpm add @payloadcms/plugin-seo
```

- [ ] **Step 2.5: Install runtime helpers**

Run:
```bash
pnpm add sharp cross-env tsx dotenv
```
(`sharp` = image processing, `cross-env` = cross-platform env vars, `tsx` = run TS scripts, `dotenv` = loads `.env` for scripts)

- [ ] **Step 2.6: Verify installs**

Run:
```bash
cat package.json | grep -E '"(payload|@payloadcms|sharp|tsx|dotenv|cross-env)"'
```
Expected: all 9 packages listed.

- [ ] **Step 2.7: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install Payload 3.0 + Postgres + Vercel Blob adapters"
```

---

## Task 3: Configure Environment Variables

**Files:**
- Create: `.env.example`, `.env`

- [ ] **Step 3.1: Create `.env.example`**

Create `.env.example`:

```bash
# Postgres — Neon pooled connection string
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Payload auth secret — generate with: openssl rand -hex 32
PAYLOAD_SECRET=replace-with-32-byte-hex

# Vercel Blob storage — from Vercel Dashboard → Storage → your Blob store
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx

# Public site URL (used by Payload for admin links, emails)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Preview secret — for Payload live preview
PAYLOAD_PUBLIC_DRAFT_SECRET=replace-with-32-byte-hex
```

- [ ] **Step 3.2: Create local `.env`**

Generate secrets and create `.env` (not committed):

```bash
PAYLOAD_SECRET_VAL=$(openssl rand -hex 32)
DRAFT_SECRET_VAL=$(openssl rand -hex 32)
cat > .env <<EOF
DATABASE_URL=<PASTE FROM NEON DASHBOARD>
PAYLOAD_SECRET=${PAYLOAD_SECRET_VAL}
BLOB_READ_WRITE_TOKEN=<PASTE FROM VERCEL DASHBOARD>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_PUBLIC_DRAFT_SECRET=${DRAFT_SECRET_VAL}
EOF
```

Ask the user to paste real values for `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` into `.env` before the next step.

- [ ] **Step 3.3: Verify `.env` is gitignored**

Run:
```bash
grep -E "^\.env$|^\.env\.local$|^\.env\*" .gitignore
```
Expected: `.env*` or `.env.local` is listed (create-next-app adds this by default). If not, add `.env` to `.gitignore`.

- [ ] **Step 3.4: Commit `.env.example`**

```bash
git add .env.example
git commit -m "chore: add .env.example with required Payload + Stripe + Neon vars"
```

---

## Task 4: Payload Root Config Skeleton

**Files:**
- Create: `src/payload.config.ts`

- [ ] **Step 4.1: Create minimal Payload config**

Create `src/payload.config.ts`:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
    },
  }),
  collections: [],
  globals: [],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
    // seoPlugin is registered in Task 18 after pages/posts/products collections exist.
  ],
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  telemetry: false,
})
```

- [ ] **Step 4.2: Update `next.config.ts` to wrap with Payload**

Replace contents of `next.config.ts`:

```typescript
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
}

export default withPayload(nextConfig)
```

- [ ] **Step 4.3: Update `tsconfig.json` path aliases**

Ensure `tsconfig.json` `paths` includes Payload config:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    }
  }
}
```

(Merge with existing; only add the `@payload-config` line if missing.)

- [ ] **Step 4.4: Commit**

```bash
git add src/payload.config.ts next.config.ts tsconfig.json
git commit -m "feat: add Payload root config with Postgres + Vercel Blob + SEO plugin"
```

---

## Task 5: Payload Admin + API Route Mounting

**Files:**
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- Create: `src/app/(payload)/api/[...slug]/route.ts`
- Create: `src/app/(payload)/api/graphql/route.ts`
- Create: `src/app/(payload)/api/graphql-playground/route.ts`
- Create: `src/app/(payload)/layout.tsx`
- Create: `src/app/(payload)/custom.scss`

- [ ] **Step 5.1: Create `src/app/(payload)/layout.tsx`**

```typescript
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  handleServerFunctions,
  RootLayout,
} from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/[[...segments]]/importMap.js'
import './custom.scss'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
```

- [ ] **Step 5.2: Create `src/app/(payload)/admin/[[...segments]]/page.tsx`**

```typescript
import type { Metadata } from 'next'
import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from './importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
```

- [ ] **Step 5.3: Create `src/app/(payload)/admin/[[...segments]]/not-found.tsx`**

```typescript
import type { Metadata } from 'next'
import config from '@payload-config'
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views'
import { importMap } from './importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
```

- [ ] **Step 5.4: Create `src/app/(payload)/api/[...slug]/route.ts`**

```typescript
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
```

- [ ] **Step 5.5: Create `src/app/(payload)/api/graphql/route.ts`**

```typescript
import config from '@payload-config'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'

export const POST = GRAPHQL_POST(config)
export const OPTIONS = REST_OPTIONS(config)
```

- [ ] **Step 5.6: Create `src/app/(payload)/api/graphql-playground/route.ts`**

```typescript
import config from '@payload-config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
```

- [ ] **Step 5.7: Create empty `src/app/(payload)/custom.scss`**

```scss
// Payload admin style overrides go here (M1: empty).
```

- [ ] **Step 5.8: Create placeholder `src/app/(payload)/admin/[[...segments]]/importMap.js`**

```javascript
export const importMap = {}
```

(Payload's `generate:importmap` CLI will populate this in a later task.)

- [ ] **Step 5.9: Add Payload scripts to `package.json`**

Update `package.json` `scripts` section to include:

```json
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev",
    "build": "cross-env NODE_OPTIONS=--no-deprecation next build",
    "start": "cross-env NODE_OPTIONS=--no-deprecation next start",
    "lint": "cross-env NODE_OPTIONS=--no-deprecation next lint",
    "generate:types": "cross-env NODE_OPTIONS=--no-deprecation payload generate:types",
    "generate:importmap": "cross-env NODE_OPTIONS=--no-deprecation payload generate:importmap",
    "migrate": "cross-env NODE_OPTIONS=--no-deprecation payload migrate",
    "migrate:create": "cross-env NODE_OPTIONS=--no-deprecation payload migrate:create",
    "seed": "cross-env NODE_OPTIONS=--no-deprecation tsx src/scripts/seed.ts"
  }
}
```

- [ ] **Step 5.10: Run import map generation**

Run:
```bash
pnpm generate:importmap
```
Expected: `src/app/(payload)/admin/[[...segments]]/importMap.js` gets populated with Payload's internal imports.

- [ ] **Step 5.11: Verify admin boots (no collections yet)**

Run:
```bash
pnpm dev
```

Open `http://localhost:3000/admin` in browser.
Expected: Payload's "Create first user" screen appears (because `users` collection isn't defined yet, this may error — that's fine, it means the admin routes are wired).

If you see a DB connection error, verify `DATABASE_URL` in `.env` is correct.

Kill dev server.

- [ ] **Step 5.12: Commit**

```bash
git add src/app/\(payload\)/ package.json
git commit -m "feat: mount Payload admin UI and API routes under /admin and /api"
```

---

## Task 6: Users Collection (Admin Editors)

**Files:**
- Create: `src/collections/Users.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 6.1: Create `src/collections/Users.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Editor', value: 'editor' },
        { label: 'Admin', value: 'admin' },
      ],
    },
  ],
}
```

- [ ] **Step 6.2: Register in `payload.config.ts`**

Edit `src/payload.config.ts` — add import at top and include in `collections`:

```typescript
import { Users } from './collections/Users'
```

Change `collections: []` to `collections: [Users]`.

- [ ] **Step 6.3: Boot admin and create first user**

Run:
```bash
pnpm dev
```

Open `http://localhost:3000/admin`.
Expected: "Create first user" form appears.

Create user:
- Email: your email
- Password: (your choice)
- Confirm password
- firstName / lastName: your name
- role: `admin`

Submit. Expected: you land on the admin dashboard.

Kill dev server.

- [ ] **Step 6.4: Generate types**

Run:
```bash
pnpm generate:types
```
Expected: `src/payload-types.ts` created with a `User` type.

- [ ] **Step 6.5: Commit**

```bash
git add src/collections/Users.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Users collection for admin editors"
```

---

## Task 7: Media Collection (Vercel Blob-backed)

**Files:**
- Create: `src/collections/Media.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 7.1: Create `src/collections/Media.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'feature', width: 1280, height: 720, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Accessibility description. Required.' },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer credit, if any.' },
    },
  ],
}
```

- [ ] **Step 7.2: Register in `payload.config.ts`**

Add import:
```typescript
import { Media } from './collections/Media'
```

Add `Media` to the `collections` array.

- [ ] **Step 7.3: Smoke-test upload**

Run:
```bash
pnpm dev
```

Open `http://localhost:3000/admin/collections/media/create`.
Upload a test image (drag/drop).
Expected: upload succeeds, image thumbnail renders, `alt` field is required.

Verify in Vercel Dashboard → Storage → Blob store that the file appears.

Kill dev server.

- [ ] **Step 7.4: Regenerate types**

```bash
pnpm generate:types
```

- [ ] **Step 7.5: Commit**

```bash
git add src/collections/Media.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Media collection backed by Vercel Blob"
```

---

## Task 8: Products Collection

**Files:**
- Create: `src/collections/Products.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 8.1: Create `src/collections/Products.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'basePrice', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug — lowercase, dashes, no spaces. e.g. "linen-shirt-sand".',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Price in USD cents. e.g. 4500 = $45.00.' },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each variant is a size+color combo with its own inventory and SKU.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'size', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'color', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'sku', type: 'text', required: true, unique: true, admin: { width: '25%' } },
            { name: 'inventory', type: 'number', required: true, min: 0, defaultValue: 0, admin: { width: '25%' } },
          ],
        },
        {
          name: 'priceOverride',
          type: 'number',
          min: 0,
          admin: { description: 'Only set if this variant has a different price from basePrice (cents).' },
        },
        {
          name: 'images',
          type: 'array',
          admin: { description: 'Optional: variant-specific images.' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Shown in "You may also like" on product pages.' },
    },
  ],
}
```

- [ ] **Step 8.2: Register in `payload.config.ts`**

Add import and include in `collections`.

- [ ] **Step 8.3: Regenerate types**

```bash
pnpm generate:types
```

- [ ] **Step 8.4: Verify admin renders Products**

Run:
```bash
pnpm dev
```

Open `http://localhost:3000/admin/collections/products/create`.
Verify: title, slug, status, description (rich text), basePrice, images (array of uploads), variants (array of size/color/sku/inventory/priceOverride/images), relatedProducts — all render as fields.

Create a throwaway product, save. Expected: saves successfully.
Delete it. Kill dev server.

- [ ] **Step 8.5: Commit**

```bash
git add src/collections/Products.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Products collection with nested variants + drafts"
```

---

## Task 9: Customers Collection

**Files:**
- Create: `src/collections/Customers.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 9.1: Create `src/collections/Customers.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
  },
  auth: true,
  access: {
    // Admins can manage all customers; customers can read/update their own record.
    admin: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    create: () => true, // public signup
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'customers') return { id: { equals: user.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'customers') return { id: { equals: user.id } }
      return false
    },
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Set by the Stripe webhook after first purchase.',
      },
    },
    {
      name: 'marketingOptIn',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether the customer opted into marketing emails.' },
    },
  ],
}
```

- [ ] **Step 9.2: Register in `payload.config.ts`**

Add import, add to `collections`.

- [ ] **Step 9.3: Regenerate types**

```bash
pnpm generate:types
```

- [ ] **Step 9.4: Verify admin renders Customers**

Run:
```bash
pnpm dev
```

Open `http://localhost:3000/admin/collections/customers`.
Expected: empty list with "Create new" button. Clicking create shows the fields including a password field (from `auth: true`).

Kill dev server.

- [ ] **Step 9.5: Commit**

```bash
git add src/collections/Customers.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Customers auth collection separate from Users"
```

---

## Task 10: Orders Collection

**Files:**
- Create: `src/collections/Orders.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 10.1: Create `src/collections/Orders.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'totalCents', 'status', 'createdAt'],
  },
  access: {
    // Admins only — customers read their own orders via a separate API route in M4.
    create: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    read: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: () => false,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true, description: 'Generated on creation.' },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'variantSku', type: 'text', required: true, admin: { description: 'Snapshot of the variant SKU purchased.' } },
        { name: 'variantLabel', type: 'text', required: true, admin: { description: 'e.g. "Size M / Sand".' } },
        { name: 'quantity', type: 'number', required: true, min: 1 },
        { name: 'priceAtPurchaseCents', type: 'number', required: true, admin: { description: 'Price snapshot to preserve the order ledger.' } },
      ],
    },
    {
      name: 'subtotalCents',
      type: 'number',
      required: true,
      admin: { description: 'Sum of items.' },
    },
    {
      name: 'shippingCents',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'taxCents',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'totalCents',
      type: 'number',
      required: true,
      admin: { description: 'subtotal + shipping + tax.' },
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'line1', type: 'text', required: true },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'postalCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true, defaultValue: 'US' },
      ],
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'stripeCheckoutSessionId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'trackingNumber',
      type: 'text',
    },
    {
      name: 'trackingUrl',
      type: 'text',
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: { description: 'Denormalized from customer for easy email lookup.' },
    },
  ],
}
```

- [ ] **Step 10.2: Register in `payload.config.ts`**

- [ ] **Step 10.3: Regenerate types**

```bash
pnpm generate:types
```

- [ ] **Step 10.4: Verify**

Run `pnpm dev`, open `/admin/collections/orders`. Expected: empty list. Open create form — all fields render. Kill dev.

- [ ] **Step 10.5: Commit**

```bash
git add src/collections/Orders.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Orders collection with address + Stripe + items snapshot"
```

---

## Task 11: Pages Collection (fields only, no blocks yet)

**Files:**
- Create: `src/collections/Pages.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 11.1: Create `src/collections/Pages.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const slug = data?.slug === 'home' ? '' : (data?.slug ?? '')
        return `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}?preview=true&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path. Use "home" for the homepage.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    // Blocks field intentionally omitted in M1. M2 adds it with the full block library.
  ],
}
```

- [ ] **Step 11.2: Register + regenerate types + commit**

Add to `payload.config.ts`, run `pnpm generate:types`, then:

```bash
git add src/collections/Pages.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Pages collection (fields only; blocks come in M2)"
```

---

## Task 12: Posts Collection

**Files:**
- Create: `src/collections/Posts.ts`

- [ ] **Step 12.1: Create `src/collections/Posts.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}
```

- [ ] **Step 12.2: Register + types + commit**

Add to config, generate types, commit:

```bash
git add src/collections/Posts.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Posts collection (journal entries)"
```

---

## Task 13: PressMentions Collection

**Files:**
- Create: `src/collections/PressMentions.ts`

- [ ] **Step 13.1: Create `src/collections/PressMentions.ts`**

```typescript
import type { CollectionConfig } from 'payload'

export const PressMentions: CollectionConfig = {
  slug: 'press-mentions',
  admin: {
    useAsTitle: 'publication',
    defaultColumns: ['publication', 'date', 'url'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'publication', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'textarea' },
    { name: 'url', type: 'text' },
    { name: 'date', type: 'date' },
  ],
}
```

- [ ] **Step 13.2: Register + types + commit**

```bash
git add src/collections/PressMentions.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add PressMentions collection"
```

---

## Task 14: NewsletterSubscribers Collection

**Files:**
- Create: `src/collections/NewsletterSubscribers.ts`

- [ ] **Step 14.1: Create file**

```typescript
import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'subscribedAt', 'unsubscribedAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // public newsletter signup
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'footer',
      options: [
        { label: 'Footer', value: 'footer' },
        { label: 'Block CTA', value: 'block' },
        { label: 'Checkout', value: 'checkout' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'subscribedAt', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
    { name: 'unsubscribedAt', type: 'date' },
  ],
}
```

- [ ] **Step 14.2: Register + types + commit**

```bash
git add src/collections/NewsletterSubscribers.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add NewsletterSubscribers collection"
```

---

## Task 15: ContactSubmissions Collection

**Files:**
- Create: `src/collections/ContactSubmissions.ts`

- [ ] **Step 15.1: Create file**

```typescript
import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'submittedAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // public contact form
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'submittedAt', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
    { name: 'resolved', type: 'checkbox', defaultValue: false },
  ],
}
```

- [ ] **Step 15.2: Register + types + commit**

```bash
git add src/collections/ContactSubmissions.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add ContactSubmissions collection"
```

---

## Task 16: Header Global

**Files:**
- Create: `src/globals/Header.ts`
- Modify: `src/payload.config.ts`

- [ ] **Step 16.1: Create `src/globals/Header.ts`**

```typescript
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, admin: { description: 'e.g. /shop, /about, /journal' } },
      ],
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 16.2: Register in `payload.config.ts`**

Add:
```typescript
import { Header } from './globals/Header'
```
Change `globals: []` to `globals: [Header]`.

- [ ] **Step 16.3: Types + commit**

```bash
pnpm generate:types
git add src/globals/Header.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Header global (logo, nav, announcement bar)"
```

---

## Task 17: Footer Global

**Files:**
- Create: `src/globals/Footer.ts`

- [ ] **Step 17.1: Create file**

```typescript
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'newsletterBlurb', type: 'textarea' },
    { name: 'copyright', type: 'text' },
  ],
}
```

- [ ] **Step 17.2: Register + types + commit**

```bash
pnpm generate:types
git add src/globals/Footer.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Footer global (link groups, socials, newsletter)"
```

---

## Task 18: Settings Global

**Files:**
- Create: `src/globals/Settings.ts`

- [ ] **Step 18.1: Create file**

```typescript
import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'brandName', type: 'text', required: true, defaultValue: 'Classical Waves' },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'commerce',
      type: 'group',
      fields: [
        { name: 'freeShippingThresholdCents', type: 'number', defaultValue: 7500 },
        { name: 'flatShippingRateCents', type: 'number', defaultValue: 800 },
        { name: 'supportEmail', type: 'email' },
      ],
    },
    {
      name: 'emptyCartCopy',
      type: 'text',
      defaultValue: 'Your cart is empty. Start exploring the collection.',
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'gaId', type: 'text', admin: { description: 'GA4 Measurement ID (G-XXXX).' } },
      ],
    },
  ],
}
```

- [ ] **Step 18.2: Register + types + commit**

```bash
pnpm generate:types
git add src/globals/Settings.ts src/payload.config.ts src/payload-types.ts
git commit -m "feat: add Settings global (brand, SEO defaults, commerce rules, analytics)"
```

- [ ] **Step 18.3: Enable SEO plugin (all target collections now exist)**

All three SEO-targeted collections (`pages`, `posts`, `products`) are now defined, so the plugin can safely boot.

Edit `src/payload.config.ts`. Add import:

```typescript
import { seoPlugin } from '@payloadcms/plugin-seo'
```

Replace the SEO placeholder comment in the `plugins` array with:

```typescript
    seoPlugin({
      collections: ['pages', 'posts', 'products'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${(doc as { title?: string }).title ?? ''} — Classical Waves`,
      generateDescription: ({ doc }) => (doc as { excerpt?: string }).excerpt ?? '',
    }),
```

- [ ] **Step 18.4: Verify admin boots with SEO fields attached**

```bash
pnpm dev
```

Open `http://localhost:3000/admin/collections/pages/create`.
Expected: scrolling the form shows an "SEO" tab/section with title, description, OG image fields.

Kill dev server.

- [ ] **Step 18.5: Regenerate types + commit**

```bash
pnpm generate:types
git add src/payload.config.ts src/payload-types.ts
git commit -m "feat: enable SEO plugin for pages, posts, and products"
```

---

## Task 19: Local Payload Helper

**Files:**
- Create: `src/lib/getPayload.ts`

- [ ] **Step 19.1: Create helper**

```typescript
import { getPayload as getPayloadBase } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayloadBase>> | null = null

export async function getPayload() {
  if (!cached) {
    cached = await getPayloadBase({ config })
  }
  return cached
}
```

- [ ] **Step 19.2: Commit**

```bash
git add src/lib/getPayload.ts
git commit -m "feat: add getPayload Local API helper"
```

---

## Task 20: Seed Script

**Files:**
- Create: `src/scripts/seed.ts`
- Create: `tests/seed.test.ts` (verification)

- [ ] **Step 20.1: Write failing test**

Create `tests/seed.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest'
import { runSeed } from '@/scripts/seed'
import { getPayload } from '@/lib/getPayload'

describe('seed script output', () => {
  beforeAll(async () => {
    await runSeed()
  })

  it('creates the home page', async () => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })
    expect(result.totalDocs).toBe(1)
    expect(result.docs[0].title).toBe('Home')
  })

  it('creates at least one product', async () => {
    const payload = await getPayload()
    const result = await payload.find({ collection: 'products' })
    expect(result.totalDocs).toBeGreaterThanOrEqual(1)
  })

  it('populates the header global', async () => {
    const payload = await getPayload()
    const header = await payload.findGlobal({ slug: 'header' })
    expect(Array.isArray(header.navLinks)).toBe(true)
  })

  it('is idempotent — running twice does not duplicate', async () => {
    await runSeed()
    const payload = await getPayload()
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })
    expect(pages.totalDocs).toBe(1)
  })
})
```

- [ ] **Step 20.2: Install vitest**

Run:
```bash
pnpm add -D vitest @vitest/coverage-v8
```

Add to `package.json` scripts:
```json
{
  "test": "cross-env NODE_OPTIONS=--no-deprecation vitest run",
  "test:watch": "cross-env NODE_OPTIONS=--no-deprecation vitest"
}
```

Create `vitest.config.ts` at project root:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['dotenv/config'],
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
    },
  },
})
```

- [ ] **Step 20.3: Run test, confirm it fails**

Run:
```bash
pnpm test
```
Expected: test file errors because `src/scripts/seed.ts` does not exist yet.

- [ ] **Step 20.4: Write `src/scripts/seed.ts`**

```typescript
import 'dotenv/config'
import { fileURLToPath } from 'url'
import { getPayload } from '@/lib/getPayload'

export async function runSeed() {
  const payload = await getPayload()

  // Home page
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
      },
    })
    payload.logger.info('Created home page')
  }

  // About page
  const existingAbout = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  if (existingAbout.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: { title: 'About', slug: 'about', status: 'published' },
    })
    payload.logger.info('Created about page')
  }

  // Sample product (only if no products exist). Description intentionally omitted
  // (optional richText field). Images empty — populate via admin in M1 smoke test.
  const existingProducts = await payload.find({ collection: 'products', limit: 1 })
  if (existingProducts.totalDocs === 0) {
    await payload.create({
      collection: 'products',
      data: {
        title: 'Sample Linen Shirt',
        slug: 'sample-linen-shirt',
        status: 'published',
        basePrice: 8500,
        images: [],
        variants: [
          { size: 'S', color: 'Sand', sku: 'SLS-S-SAND', inventory: 10 },
          { size: 'M', color: 'Sand', sku: 'SLS-M-SAND', inventory: 10 },
          { size: 'L', color: 'Sand', sku: 'SLS-L-SAND', inventory: 10 },
        ],
      },
    })
    payload.logger.info('Created sample product')
  }

  // Header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: [
        { label: 'Shop', url: '/shop' },
        { label: 'Journal', url: '/journal' },
        { label: 'Lookbook', url: '/lookbook' },
        { label: 'About', url: '/about' },
      ],
      announcementBar: { enabled: false, text: '', link: '' },
    },
  })
  payload.logger.info('Updated header global')

  // Footer global
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      linkGroups: [
        {
          heading: 'Shop',
          links: [
            { label: 'All Products', url: '/shop' },
            { label: 'New Arrivals', url: '/shop' },
          ],
        },
        {
          heading: 'Support',
          links: [
            { label: 'Contact', url: '/contact' },
            { label: 'Shipping & Returns', url: '/shipping-returns' },
            { label: 'FAQ', url: '/faq' },
          ],
        },
      ],
      socialLinks: [],
      newsletterBlurb: 'Join the coastal letter.',
      copyright: `© ${new Date().getFullYear()} Classical Waves.`,
    },
  })
  payload.logger.info('Updated footer global')

  // Settings global
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      brandName: 'Classical Waves',
      commerce: {
        freeShippingThresholdCents: 7500,
        flatShippingRateCents: 800,
        supportEmail: 'support@classicalwaves.com',
      },
      emptyCartCopy: 'Your cart is empty. Start exploring the collection.',
    },
  })
  payload.logger.info('Updated settings global')

  payload.logger.info('Seed complete')
}

// Run as CLI when invoked directly (pnpm seed), not when imported by tests.
const isCli = process.argv[1] === fileURLToPath(import.meta.url)
if (isCli) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed failed:', err)
      process.exit(1)
    })
}
```

- [ ] **Step 20.5: Run seed**

```bash
pnpm seed
```
Expected: logs "Created home page", "Created about page", "Created sample product", "Updated header global", "Updated footer global", "Updated settings global", "Seed complete".

If it's run twice, existing records are skipped (idempotent via `existingHome.totalDocs === 0` checks).

- [ ] **Step 20.6: Run tests, confirm they pass**

```bash
pnpm test
```
Expected: all 3 tests pass.

- [ ] **Step 20.7: Verify in admin**

Run `pnpm dev`, open `/admin/collections/pages`. Expected: "Home" and "About" pages listed, both published. Open `/admin/collections/products` → "Sample Linen Shirt" listed. Open `/admin/globals/header` → nav links populated. Kill dev.

- [ ] **Step 20.8: Commit**

```bash
git add src/scripts/seed.ts tests/seed.test.ts vitest.config.ts package.json pnpm-lock.yaml
git commit -m "feat: add idempotent seed script + vitest verification"
```

---

## Task 21: Production Migrations Setup

**Files:**
- Modify: `package.json`
- Generate: `src/migrations/*`

- [ ] **Step 21.1: Create initial migration**

Run:
```bash
pnpm migrate:create initial
```
Expected: new file created at `src/migrations/<timestamp>_initial.ts` containing the current schema.

- [ ] **Step 21.2: Apply migration locally**

Run:
```bash
pnpm migrate
```
Expected: "Migration initial complete." If DB schema was already auto-synced by dev mode, output may say "no migrations to run" — that's fine; the migration file is still the source of truth for production.

- [ ] **Step 21.3: Disable dev auto-sync**

Edit `src/payload.config.ts` — inside `postgresAdapter` options, add:

```typescript
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL!,
  },
  push: process.env.NODE_ENV === 'development', // auto-sync schema in dev only
}),
```

- [ ] **Step 21.4: Commit**

```bash
git add src/migrations/ src/payload.config.ts
git commit -m "chore: add initial migration + gate auto-push to dev only"
```

---

## Task 22: Storefront Placeholder Page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 22.1: Replace starter home with placeholder**

Replace `src/app/page.tsx`:

```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">Classical Waves</h1>
      <p className="mt-4 max-w-md text-sm opacity-70">
        Storefront coming in M2. The CMS is live at{' '}
        <a className="underline" href="/admin">/admin</a>.
      </p>
    </main>
  )
}
```

- [ ] **Step 22.2: Clean up root layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classical Waves',
  description: 'Coastal lifestyle apparel.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 22.3: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "chore: add storefront placeholder page (M2 will replace)"
```

---

## Task 23: README

**Files:**
- Modify: `README.md`

- [ ] **Step 23.1: Replace README contents**

```markdown
# Classical Waves

Custom Next.js 15 + Payload 3.0 rebuild of classicalwaves.com.

## Local setup

1. Install Node 20.x and `pnpm`.
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — Neon pooled connection string
   - `PAYLOAD_SECRET` — `openssl rand -hex 32`
   - `BLOB_READ_WRITE_TOKEN` — Vercel Blob store token
   - `PAYLOAD_PUBLIC_DRAFT_SECRET` — `openssl rand -hex 32`
3. Install deps: `pnpm install`
4. Seed DB: `pnpm seed`
5. Boot dev: `pnpm dev`
6. Admin at http://localhost:3000/admin (first login prompts to create an admin user).

## Scripts

- `pnpm dev` — Next + Payload dev server
- `pnpm build` — production build
- `pnpm seed` — idempotent DB seed (home/about pages, sample product, globals)
- `pnpm generate:types` — regenerate `src/payload-types.ts`
- `pnpm generate:importmap` — regenerate admin import map (after adding custom components)
- `pnpm migrate:create <name>` — create a new DB migration
- `pnpm migrate` — apply pending migrations (required in production)
- `pnpm test` — run vitest

## Stack

- Next.js 15 (App Router)
- Payload 3.0 CMS
- Neon Postgres
- Vercel Blob (media storage)
- Stripe (commerce — wired in M3)
- Resend (transactional email — wired in M3)
- Tailwind CSS

## Milestones

- **M1 (current):** foundation + admin + data model
- **M2:** public site, CMS block library, content pages
- **M3:** shop end-to-end (cart, Stripe Checkout, webhooks)
- **M4:** customer accounts (signup/login, order history)

See `docs/superpowers/specs/` for the design spec and `docs/superpowers/plans/` for per-milestone plans.
```

- [ ] **Step 23.2: Commit**

```bash
git add README.md
git commit -m "docs: add README with local setup + milestone overview"
```

---

## Task 24: Vercel Deployment

**Files:**
- Create: `vercel.json` (optional)

- [ ] **Step 24.1: Push to GitHub**

Assumes the user has created a GitHub repo `classicalwaves` and added it as a remote.

```bash
git remote add origin git@github.com:<user>/classicalwaves.git
git push -u origin main
```

Ask the user for the GitHub repo URL if not known.

- [ ] **Step 24.2: Link Vercel to repo**

In the Vercel dashboard:
1. "Add New" → "Project"
2. Import the GitHub repo
3. Framework preset: Next.js (auto-detected)
4. Root directory: `./`
5. Build command: `pnpm build` (default)
6. Install command: `pnpm install` (default)
7. Add environment variables (from `.env`):
   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` (set to the preview URL after first deploy, e.g. `https://cw-dev.vercel.app`)
   - `PAYLOAD_PUBLIC_DRAFT_SECRET`
8. Deploy.

- [ ] **Step 24.3: Run migration on first deploy**

Vercel will attempt to boot the app; if the DB schema isn't applied yet, requests fail. Two options:

(a) Run migration locally against the production DB:
```bash
DATABASE_URL=<prod-url> pnpm migrate
```
(Temporarily swap `.env` `DATABASE_URL` to the production one, or use `export`.)

(b) Add a postbuild step that runs migrations. Modify `package.json`:
```json
{
  "scripts": {
    "build": "cross-env NODE_OPTIONS=--no-deprecation payload migrate && next build"
  }
}
```
(Recommended — migrations run automatically on every Vercel deploy.)

Push the change:
```bash
git add package.json
git commit -m "chore: run migrations as part of production build"
git push
```

- [ ] **Step 24.4: Verify deploy**

After Vercel finishes deploying:
1. Open the preview URL (e.g. `https://cw-dev.vercel.app`).
2. Expected: placeholder storefront renders.
3. Navigate to `/admin`. Expected: "Create first user" form (fresh prod DB).
4. Create an admin user.
5. Seed prod DB. Run locally:
   ```bash
   DATABASE_URL=<prod-url> pnpm seed
   ```
6. Refresh `/admin/collections/pages` in the deployed site. Expected: Home + About pages appear.

- [ ] **Step 24.5: Update `NEXT_PUBLIC_SITE_URL`**

Set it in Vercel env vars to the actual production URL (e.g. `https://cw-dev.vercel.app`). Trigger a redeploy.

- [ ] **Step 24.6: Commit any final changes**

```bash
git status
# If clean, M1 is done.
```

---

## Milestone 1 Exit Criteria

All of the following must pass:

- [ ] `pnpm dev` starts cleanly (no errors in console).
- [ ] `http://localhost:3000/admin` loads; you can log in as an admin user.
- [ ] Creating a product via the admin succeeds and persists.
- [ ] Uploading an image in the admin stores it in Vercel Blob (verify in dashboard).
- [ ] `pnpm seed` is idempotent (running twice does not error or duplicate).
- [ ] `pnpm test` passes all seed tests.
- [ ] Production deploy on Vercel loads the placeholder home and `/admin`.
- [ ] Production DB has been seeded at least once and admin user created.
- [ ] All 22+ commits are pushed to `main` on GitHub.

## What's next

Milestone 2 — Public site + CMS block library. Starts from the state left here: admin live, data model complete, sample content seeded. M2 will:

- Add the `blocks` field to `Pages` and `Posts` with all 16 blocks from the spec.
- Build each block's React component under `src/blocks/`.
- Build the public layout (header + footer from globals).
- Wire the catch-all `/[slug]` route to render CMS pages.
- Build the `/shop` + `/shop/[slug]` product listing/detail pages.
- Build the `/journal` index + post detail pages.
- Confirm Payload live preview works in the split-pane UI.
