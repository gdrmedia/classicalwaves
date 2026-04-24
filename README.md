# Classical Waves

Custom Next.js 16 + Payload 3.0 rebuild of classicalwaves.com.

## Local setup

1. Install Node 20+ and `pnpm`.
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — Neon pooled connection string
   - `PAYLOAD_SECRET` — `openssl rand -hex 32`
   - `BLOB_READ_WRITE_TOKEN` — Vercel Blob store token
   - `PAYLOAD_PUBLIC_DRAFT_SECRET` — `openssl rand -hex 32`
3. Install deps: `pnpm install`
4. Boot dev: `pnpm dev`
5. Admin at http://localhost:3000/admin (first login prompts to create an admin user).
6. Seed DB: `pnpm seed` (after admin user created)

## Scripts

- `pnpm dev` — Next + Payload dev server
- `pnpm build` — production build
- `pnpm seed` — idempotent DB seed (home/about pages, sample product, globals)
- `pnpm generate:types` — regenerate `src/payload-types.ts`
- `pnpm generate:importmap` — regenerate admin import map
- `pnpm migrate:create <name>` — create a new DB migration
- `pnpm migrate` — apply pending migrations (required in production)
- `pnpm test` — run vitest

## Stack

- Next.js 16 (App Router)
- Payload 3.0 CMS
- Neon Postgres
- Vercel Blob (media storage)
- Stripe (commerce — wired in M3)
- Resend (transactional email — wired in M3)
- Tailwind CSS

## Milestones

- **M1 (current):** foundation + admin + data model ✅
- **M2:** public site, CMS block library, content pages
- **M3:** shop end-to-end (cart, Stripe Checkout, webhooks)
- **M4:** customer accounts (signup/login, order history)

See `docs/superpowers/specs/` for design spec and `docs/superpowers/plans/` for per-milestone plans.
