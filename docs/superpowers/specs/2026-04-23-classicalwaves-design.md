# classicalwaves.com — Rebuild Design

**Date:** 2026-04-23
**Status:** Design approved, pending implementation plan
**Owner:** guillermo.rozenblat@glueiq.com

## Summary

Replace the existing Shopify store at `classicalwaves.com` with a custom Next.js 15 + Payload 3.0 single-app build on Vercel. Primary motivations: design freedom (current Shopify theme system is too limiting) and ownership of the stack. The new system ships a block-based CMS with live preview, a Stripe-backed shop with cart and customer accounts, and a full set of content pages (journal, lookbook, about, etc.). Small catalog (~6-8 SKUs apparel, size + color variants), US-only shipping, non-technical editors using the CMS daily.

## Architecture decision

**Chosen: Payload 3.0, single-app (Option 1).** One Next.js 15 project, Payload admin mounted at `/admin`, storefront at `/`. Payload's DB access, auth, and admin UI are imported directly; no separate API service. Fastest path to launch; trades bespoke admin aesthetics for speed (acceptable — admin UI can be themed later if desired).

Alternatives considered and rejected:
- **Option 2: Payload 3.0, two-app (C&C-style).** Separate admin/API and storefront deployments. Rejected: extra deployment and API surface area aren't justified at this scale.
- **Option 3: Fully custom, C&C replica.** Two apps + Auth.js + custom admin from scratch. Rejected: weeks of work rebuilding admin UI that Payload provides for free.

## Clarifying decisions (from brainstorm)

| Question | Decision |
|---|---|
| Checkout flow | Persistent on-site cart → Stripe Checkout (redirect) |
| Shopify migration | Products manually re-entered in Payload; no customer/order import |
| Content scope | All content types in: lookbook, journal, about, contact, FAQ, shipping/returns, press, IG feed, newsletter |
| Database | Neon Postgres (serverless) |
| Hosting | Vercel |
| Media storage | Vercel Blob (via Payload's official adapter) |
| Transactional email | Resend |
| Sales tax | Stripe Tax (automatic US calculation) |
| Inventory | Tracked per variant; decrements on sale |
| Newsletter | Collect emails in Payload for v1; migrate to Klaviyo later if flows needed |
| Shipping | Flat-rate US-only, $8 standard, free over $75 |
| Admin users | Assume 2 editors, single "editor" role, full access |
| Customer accounts | In scope for v1 (signup, login, order history) |
| Loyalty points | Deferred to v2 |

## Stack

- **Framework:** Next.js 15 (App Router, RSC) + TypeScript
- **CMS:** Payload 3.0 with `@payloadcms/db-postgres` + `@payloadcms/storage-vercel-blob`
- **Database:** Neon Postgres
- **Hosting:** Vercel (one deployment, production domain + preview branches)
- **Payments:** Stripe (Checkout + Tax + Webhooks)
- **Email:** Resend (transactional)
- **Styling:** Tailwind CSS
- **Validation:** `zod`
- **Dates:** `date-fns`

Open-source / free tier across the board. Recurring costs: Vercel (~free to ~$20/mo at this scale), Neon (free tier likely enough), Vercel Blob (cents/GB), Resend (free up to 3k/mo), Stripe (2.9% + $0.30 + $0.50 Stripe Tax per transaction). No Payload license.

## Route layout

```
/                      → storefront home (CMS page, slug "home")
/shop                  → collection listing
/shop/[slug]           → product detail
/cart                  → cart page
/checkout              → redirects to Stripe Checkout
/order/[id]            → post-payment confirmation
/account               → customer profile (auth-gated)
/account/orders        → order history
/account/orders/[id]   → single order view
/account/login, /account/signup, /account/forgot-password  → auth flows
/journal               → blog index
/journal/[slug]        → blog post
/lookbook, /about, /contact, /faq,
  /shipping-returns, /press         → CMS pages via catch-all [slug]
/api/checkout                       → Stripe Checkout Session creation
/api/webhooks/stripe                → Stripe webhook receiver
/api/contact                        → contact form submission
/admin                              → Payload admin UI
```

Two kinds of pages:
- **Commerce routes** — hardcoded React components, data from Payload collections (shop, cart, checkout, account, product detail).
- **Content routes** — rendered from the `pages` or `posts` collection via block composition, edited visually in the CMS.

## Data model

### Collections

| Collection | Purpose | Key fields |
|---|---|---|
| `users` | Admin editors (`auth: true`) | email, password, role |
| `customers` | Shoppers (`auth: true`, separate from users) | email, password, firstName, lastName, stripeCustomerId |
| `products` | Catalog | slug, title, description (rich text), images[], basePrice, variants[], relatedProducts, SEO fields |
| `orders` | Completed purchases | orderNumber, customer (rel), items[] (product + variant + qty + priceAtPurchase), totals, shippingAddress, stripePaymentIntentId, status (pending/paid/shipped/delivered/refunded), tracking |
| `media` | Images + files (Vercel Blob-backed) | filename, alt, caption, auto-generated sizes (thumbnail/card/feature/hero) |
| `pages` | Flexible CMS pages | slug, title, blocks[], SEO fields |
| `posts` | Journal entries | slug, title, excerpt, heroImage, content (rich text + blocks), author (rel), publishedAt, tags, SEO |
| `press-mentions` | "As seen in" items | publication, logo, quote, url, date |
| `newsletter-subscribers` | Email list | email, subscribedAt, source, unsubscribedAt |
| `contact-submissions` | Contact form entries | name, email, subject, message, submittedAt |

### Globals

- `header` — logo, nav links, announcement bar
- `footer` — link groups, social icons, newsletter blurb, copyright
- `settings` — site-wide config: brand name, default SEO, analytics IDs, empty-cart copy, notices

### Design choices

- **Variants nested inside products as an array field** (not a separate collection). Each variant = `{ size, color, sku, priceOverride?, inventory, images[]? }`. Right shape for ~6-8 products; simpler admin UX.
- **`customers` is a separate auth collection from `users`.** Admins don't accidentally get customer sessions and vice versa. Clean access control.
- **Orders snapshot the price at purchase.** `items[].priceAtPurchase` prevents historical orders from mutating when product prices change.
- **Policies (Shipping & Returns, Privacy, Terms) live as `pages`**, not hardcoded routes. Edit them in the CMS like any other page.

### Relationships

```
customers  ──1:N──>  orders
products   ──N:M──>  orders  (via orders.items[])
posts      ──N:1──>  users   (author)
products   ──N:M──>  products (relatedProducts)
media      ──used by──>  products, pages, posts, header, footer
```

## CMS block library (v1)

All blocks selectable from a "Select Layout Module" modal when editing a page (native Payload UX, same pattern user liked in Conch & Coconut).

| Block | Use |
|---|---|
| Hero Header | Full-bleed image or video + headline + subheadline + CTA button |
| Rich Text | Prose, headings, lists, links (Lexical editor) |
| Image + Text Split | 50/50, image left or right, copy opposite |
| Image Grid | 2/3/4-column responsive grid |
| Featured Products | Editor picks N products; renders as carousel or grid |
| Lookbook Gallery | Full-bleed editorial imagery, optional captions, optional lightbox |
| Editorial Quote | Large pull quote + attribution |
| Press Strip | Row of press logos; pulls from `press-mentions` |
| Testimonial Slider | Horizontal-scroll customer quotes |
| FAQ Accordion | Expandable Q&A list |
| Newsletter Signup | Inline email capture CTA |
| Contact Form | Name/email/subject/message → `contact-submissions` + Resend notification |
| CTA Banner | Full-width color/image band with headline + button |
| Video Embed | YouTube, Vimeo, or self-hosted MP4 |
| Numbered Card Slider | Numbered horizontal cards (for "How It's Made," "Our Process," etc.) |
| Spacer / Divider | Vertical whitespace or horizontal rule |

Every block has consistent layout options: background color/image, padding (sm/md/lg), anchor ID for in-page links.

### Editorial UX

- **Split-pane live preview** (native Payload 3.0): form fields left, site in iframe right, updates on every change.
- **Drafts + publish workflow.** Editors work on drafts; "Publish" button in top-right; public site serves only published versions.
- **Versions + rollback.** Auto-saved versions; diff and revert in admin.
- **SEO fields per page.** Title, meta description, OG image, canonical URL via Payload's SEO plugin.

## Commerce flow

### Cart (client-side, `localStorage`)
- `useCart()` hook manages add/remove/update-quantity; syncs to `localStorage`.
- Cart UI lives on `/cart` and in a drawer/sheet.
- No DB writes until purchase. Cart does not sync across devices in v1 (acceptable; upgrade path documented in "Deferred").

### Checkout (`POST /api/checkout`)
1. Server re-fetches each product from Payload; re-validates price and stock (never trusts client-submitted values).
2. Creates Stripe Checkout Session: line items, flat-rate shipping ($8 standard / free over $75), Stripe Tax enabled, US-only address collection, customer email pre-filled if logged in.
3. Returns Stripe-hosted URL; browser redirects.

### Payment
- Stripe's hosted page (branded with logo + colors from Stripe Dashboard).

### Webhook (`POST /api/webhooks/stripe`, signature-verified)
- `checkout.session.completed` → create `orders` record, decrement variant inventory, send confirmation via Resend, cart cleared on next page load.
- `charge.refunded` → update order `status` to `refunded`.
- Idempotent via `stripePaymentIntentId` unique check (never double-create orders).

### Confirmation
- `/order/[sessionId]` renders the new order from Payload.
- Resend email fires from the webhook with order details, items, shipping address, expected timeline.

## Customer dashboard (`/account/*`)

- `/account` — profile: view/edit name, email, password.
- `/account/orders` — order list, newest first, with status + total.
- `/account/orders/[id]` — line items, shipping address, tracking info, status.
- `/account/login`, `/account/signup`, `/account/forgot-password` — auth flows.

Access gated by Payload's `customers` session cookie. Data fetched via Payload Local API in server components (no client-side fetches for auth'd data).

## Infrastructure

**Vercel**
- Production domain: `classicalwaves.com` (DNS cutover at launch; Shopify stays live until then)
- Preview deploys per branch
- Env vars: `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`

**Neon**
- One production DB branch.
- Preview DB branches can auto-create per Vercel preview (optional — useful for CMS schema experiments).

**Stripe**
- Webhook endpoint: `classicalwaves.com/api/webhooks/stripe`
- Products/prices created dynamically per Checkout Session — no Stripe product sync job. Payload remains source of truth.
- Stripe Tax enabled in Stripe Dashboard.

**Vercel Blob**
- Read/write token in env vars; Payload's storage adapter handles uploads transparently.

**Development**
- Pre-launch work on a preview domain (e.g., `cw-dev.vercel.app`).
- DNS cutover from Shopify → Vercel at go-live.

## Project structure

```
cw.dev/
├── src/
│   ├── app/
│   │   ├── (storefront)/
│   │   │   ├── page.tsx                — home (CMS page, slug "home")
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── order/[id]/page.tsx
│   │   │   ├── account/
│   │   │   ├── journal/
│   │   │   ├── [slug]/page.tsx         — catch-all for CMS pages
│   │   │   └── layout.tsx
│   │   ├── (payload)/                  — Payload admin + API
│   │   ├── api/
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   └── contact/route.ts
│   │   └── layout.tsx
│   ├── blocks/                         — one folder per block (React + Payload config)
│   ├── collections/                    — Payload collection configs
│   ├── globals/                        — Payload global configs
│   ├── components/                     — shared storefront UI
│   ├── lib/                            — stripe, resend, cart, payload helpers
│   └── payload.config.ts
├── public/
├── .env
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## v1 scope

**Ships**

- Block-based CMS with live preview, drafts, versions, SEO fields
- Product catalog with variants + inventory tracking
- Client-side cart (`localStorage`)
- Stripe Checkout (redirect) with Stripe Tax + flat-rate US shipping
- Order confirmation email via Resend
- Customer accounts (signup, login, password reset)
- Order history (customer dashboard)
- Journal/blog (index + post detail)
- All content pages: home, about, lookbook, contact, FAQ, shipping/returns, press
- Newsletter email collection (stored in Payload, exportable)
- Contact form → `contact-submissions` + Resend notification to site owner
- Responsive design (mobile-first)
- Brand theming to match user's visual direction (designs to be fed in during implementation)

**Deferred (v2+)**

- Loyalty points program
- Abandoned-cart email flows (would require Klaviyo or custom worker)
- Real-time carrier shipping rates (Shippo / EasyPost)
- International shipping
- Custom admin theming / component overrides (stock Payload UI for v1)
- Product reviews / ratings
- Wishlists
- DB-backed cart sync across devices
- Saved shipping addresses in dashboard (at checkout, addresses are collected by Stripe; reusing stored addresses deferred)

## Open items surfaced during brainstorm

None blocking. Screenshots of intended storefront design will be fed in during implementation to inform Tailwind theming and block layout styling. CMS structure and data model are design-complete.

## Next step

Hand off to `writing-plans` skill to produce an ordered, testable implementation plan.
