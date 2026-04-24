# M2 — Storefront & Block Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete M2 storefront — 16-block CMS library wired to Pages/Posts, public layout (Header + Footer), catch-all CMS route, product listing/detail, journal routes, and working live preview.

**Architecture:** Payload block configs in `src/blocks/<Name>/config.ts` define CMS fields; React RSC components in `src/blocks/<Name>/Component.tsx` render them on the storefront. A `BlockRenderer` server component dispatches by `blockType`. Storefront pages are Next.js RSC under `src/app/(storefront)/`, fetching via Payload Local API (`src/lib/getPayload.ts`).

**Tech Stack:** Next.js 16.2.4 App Router + RSC, Payload 3.84.1 Local API, `@payloadcms/richtext-lexical/react` for Lexical rendering, `@payloadcms/live-preview-react` for preview, Tailwind CSS v4, Vitest (node env), TypeScript

---

## File Map

**New files**

| Path | Purpose |
|------|---------|
| `src/blocks/shared.ts` | Shared anchor / padding / background fields for every block |
| `src/blocks/{Name}/config.ts` | Payload block config (16 files) |
| `src/blocks/{Name}/Component.tsx` | React component (16 files) |
| `src/components/blocks/BlockWrapper.tsx` | Wraps each block with anchor, padding, background |
| `src/components/blocks/BlockRenderer.tsx` | Maps `blockType` → component |
| `src/components/layout/Header.tsx` | Site header from `header` global |
| `src/components/layout/Footer.tsx` | Site footer from `footer` global |
| `src/components/LivePreviewListener.tsx` | Client component: triggers route refresh on Payload save |
| `src/lib/payload.server.ts` | Server-only data helpers (getPage, getPost, getProducts, …) |
| `src/app/(storefront)/layout.tsx` | Storefront layout: Header + Footer wrapper |
| `src/app/(storefront)/page.tsx` | Home page (CMS page slug="home") |
| `src/app/(storefront)/[slug]/page.tsx` | Catch-all CMS page route |
| `src/app/(storefront)/journal/page.tsx` | Journal index |
| `src/app/(storefront)/journal/[slug]/page.tsx` | Journal post detail |
| `src/app/(storefront)/shop/page.tsx` | Product listing |
| `src/app/(storefront)/shop/[slug]/page.tsx` | Product detail |
| `src/app/api/contact/route.ts` | Contact form POST handler |
| `tests/blocks.test.ts` | Block config shape tests |
| `tests/contact-api.test.ts` | Contact route unit tests |

**Modified files**

| Path | Change |
|------|--------|
| `src/collections/Pages.ts` | Add `blocks` field with all 16 block configs |
| `src/collections/Posts.ts` | Add `blocks` field with 10 content-relevant block configs |
| `src/app/page.tsx` | **Delete** — replaced by `(storefront)/page.tsx` |
| `.env` | Add `PAYLOAD_PUBLIC_DRAFT_SECRET` |

---

## Task 1: Shared block fields + server data helpers

**Files:**
- Create: `src/blocks/shared.ts`
- Create: `src/lib/payload.server.ts`

- [ ] **Step 1: Create shared block fields**

```ts
// src/blocks/shared.ts
import type { Field } from 'payload'

export const blockFields: Field[] = [
  {
    name: 'anchor',
    label: 'Anchor ID',
    type: 'text',
    admin: { description: 'Optional ID for in-page links, e.g. "about-us".' },
  },
  {
    name: 'padding',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Small (2rem)', value: 'sm' },
      { label: 'Medium (4rem)', value: 'md' },
      { label: 'Large (6rem)', value: 'lg' },
    ],
  },
  {
    name: 'background',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Color', value: 'color' },
          { label: 'Image', value: 'image' },
        ],
      },
      {
        name: 'color',
        type: 'text',
        admin: {
          description: 'CSS color value, e.g. #f5f0eb',
          condition: (_, sibling) => sibling?.type === 'color',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: { condition: (_, sibling) => sibling?.type === 'image' },
      },
    ],
  },
]
```

- [ ] **Step 2: Create server-only data helpers**

```ts
// src/lib/payload.server.ts
import { getPayload } from '@/lib/getPayload'

export async function getGlobal(slug: 'header' | 'footer' | 'settings', depth = 1) {
  const payload = await getPayload()
  return payload.findGlobal({ slug, depth })
}

export async function getPage(slug: string, draft = false) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPost(slug: string, draft = false) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    draft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPosts() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 20,
  })
  return docs
}

export async function getProducts() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'products',
    where: { status: { equals: 'published' } },
    depth: 1,
    limit: 100,
  })
  return docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getPressMentions() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'press-mentions',
    sort: '-date',
    depth: 1,
    limit: 20,
  })
  return docs
}
```

- [ ] **Step 3: Commit**

```bash
git add src/blocks/shared.ts src/lib/payload.server.ts
git commit -m "feat: add shared block fields and server data helpers"
```

---

## Task 2: Header component

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Write the Header component**

```tsx
// src/components/layout/Header.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getGlobal } from '@/lib/payload.server'

export async function Header() {
  const header = await getGlobal('header')

  return (
    <>
      {header.announcementBar?.enabled && header.announcementBar.text && (
        <div className="bg-stone-800 text-white text-center py-2 px-4 text-sm">
          {header.announcementBar.link ? (
            <a href={header.announcementBar.link} className="hover:underline">
              {header.announcementBar.text}
            </a>
          ) : (
            header.announcementBar.text
          )}
        </div>
      )}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-wide">
            {header.logo && typeof header.logo === 'object' && 'url' in header.logo && header.logo.url ? (
              <Image
                src={header.logo.url}
                alt="Classical Waves"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ) : (
              'Classical Waves'
            )}
          </Link>
          {header.navLinks && header.navLinks.length > 0 && (
            <nav className="hidden md:flex items-center gap-8">
              {header.navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-sm text-stone-700 hover:text-stone-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
          <Link href="/cart" className="text-sm text-stone-700 hover:text-stone-900">
            Cart
          </Link>
        </div>
      </header>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add Header layout component"
```

---

## Task 3: Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Write the Footer component**

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { getGlobal } from '@/lib/payload.server'

export async function Footer() {
  const footer = await getGlobal('footer')

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {footer.linkGroups && footer.linkGroups.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footer.linkGroups.map((group) => (
              <div key={group.id}>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
                  {group.heading}
                </p>
                <ul className="space-y-2">
                  {group.links?.map((link) => (
                    <li key={link.id}>
                      <Link href={link.url} className="text-sm text-stone-600 hover:text-stone-900">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {footer.newsletterBlurb && (
          <p className="text-sm text-stone-500 mb-8 max-w-sm">{footer.newsletterBlurb}</p>
        )}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-400">
            {footer.copyright ?? `© ${new Date().getFullYear()} Classical Waves`}
          </p>
          {footer.socialLinks && footer.socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {footer.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 hover:text-stone-900 capitalize"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer layout component"
```

---

## Task 4: Storefront layout + live preview listener

**Files:**
- Create: `src/components/LivePreviewListener.tsx`
- Create: `src/app/(storefront)/layout.tsx`

- [ ] **Step 1: Install live preview package**

```bash
pnpm add @payloadcms/live-preview-react
```

- [ ] **Step 2: Add `PAYLOAD_PUBLIC_DRAFT_SECRET` to `.env`**

Open `.env` and add (use any random string):
```
PAYLOAD_PUBLIC_DRAFT_SECRET=your-random-secret-here
```

- [ ] **Step 3: Create LivePreviewListener**

```tsx
// src/components/LivePreviewListener.tsx
'use client'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreviewListener() {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      serverURL={process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}
      onSave={() => router.refresh()}
    />
  )
}
```

- [ ] **Step 4: Create storefront layout**

```tsx
// src/app/(storefront)/layout.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <LivePreviewListener />
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/LivePreviewListener.tsx src/app/(storefront)/layout.tsx package.json pnpm-lock.yaml .env
git commit -m "feat: add storefront layout, live preview listener, and draft secret"
```

---

## Task 5: Block configs — text & presentation blocks

**Files:**
- Create: `src/blocks/RichText/config.ts`
- Create: `src/blocks/EditorialQuote/config.ts`
- Create: `src/blocks/CTABanner/config.ts`
- Create: `src/blocks/SpacerDivider/config.ts`

- [ ] **Step 1: Create RichText block config**

```ts
// src/blocks/RichText/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blockFields } from '@/blocks/shared'

export const RichTextBlock: Block = {
  slug: 'rich-text',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    ...blockFields,
  ],
}
```

- [ ] **Step 2: Create EditorialQuote block config**

```ts
// src/blocks/EditorialQuote/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const EditorialQuoteBlock: Block = {
  slug: 'editorial-quote',
  labels: { singular: 'Editorial Quote', plural: 'Editorial Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
    ...blockFields,
  ],
}
```

- [ ] **Step 3: Create CTABanner block config**

```ts
// src/blocks/CTABanner/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const CTABannerBlock: Block = {
  slug: 'cta-banner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'ctaText', label: 'Button Text', type: 'text', required: true },
    { name: 'ctaUrl', label: 'Button URL', type: 'text', required: true },
    ...blockFields,
  ],
}
```

- [ ] **Step 4: Create SpacerDivider block config**

```ts
// src/blocks/SpacerDivider/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const SpacerDividerBlock: Block = {
  slug: 'spacer-divider',
  labels: { singular: 'Spacer / Divider', plural: 'Spacers & Dividers' },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'spacer',
      options: [
        { label: 'Spacer (blank space)', value: 'spacer' },
        { label: 'Divider (horizontal rule)', value: 'divider' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 5: Commit**

```bash
git add src/blocks/RichText/config.ts src/blocks/EditorialQuote/config.ts src/blocks/CTABanner/config.ts src/blocks/SpacerDivider/config.ts
git commit -m "feat: add text/presentation block configs"
```

---

## Task 6: Block configs — media blocks

**Files:**
- Create: `src/blocks/HeroHeader/config.ts`
- Create: `src/blocks/ImageTextSplit/config.ts`
- Create: `src/blocks/ImageGrid/config.ts`
- Create: `src/blocks/LookbookGallery/config.ts`
- Create: `src/blocks/VideoEmbed/config.ts`

- [ ] **Step 1: Create HeroHeader block config**

```ts
// src/blocks/HeroHeader/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const HeroHeaderBlock: Block = {
  slug: 'hero-header',
  labels: { singular: 'Hero Header', plural: 'Hero Headers' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'ctaText', label: 'Button Text', type: 'text' },
    { name: 'ctaUrl', label: 'Button URL', type: 'text' },
    {
      name: 'overlayOpacity',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 2: Create ImageTextSplit block config**

```ts
// src/blocks/ImageTextSplit/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blockFields } from '@/blocks/shared'

export const ImageTextSplitBlock: Block = {
  slug: 'image-text-split',
  labels: { singular: 'Image + Text Split', plural: 'Image + Text Splits' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'richText', editor: lexicalEditor() },
    { name: 'ctaText', label: 'Button Text', type: 'text' },
    { name: 'ctaUrl', label: 'Button URL', type: 'text' },
    ...blockFields,
  ],
}
```

- [ ] **Step 3: Create ImageGrid block config**

```ts
// src/blocks/ImageGrid/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const ImageGridBlock: Block = {
  slug: 'image-grid',
  labels: { singular: 'Image Grid', plural: 'Image Grids' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 4: Create LookbookGallery block config**

```ts
// src/blocks/LookbookGallery/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const LookbookGalleryBlock: Block = {
  slug: 'lookbook-gallery',
  labels: { singular: 'Lookbook Gallery', plural: 'Lookbook Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'lightbox', type: 'checkbox', defaultValue: true, label: 'Enable lightbox on click' },
    ...blockFields,
  ],
}
```

- [ ] **Step 5: Create VideoEmbed block config**

```ts
// src/blocks/VideoEmbed/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const VideoEmbedBlock: Block = {
  slug: 'video-embed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube, Vimeo, or direct MP4 URL.' },
    },
    { name: 'caption', type: 'text' },
    ...blockFields,
  ],
}
```

- [ ] **Step 6: Commit**

```bash
git add src/blocks/HeroHeader/config.ts src/blocks/ImageTextSplit/config.ts src/blocks/ImageGrid/config.ts src/blocks/LookbookGallery/config.ts src/blocks/VideoEmbed/config.ts
git commit -m "feat: add media block configs"
```

---

## Task 7: Block configs — interactive blocks

**Files:**
- Create: `src/blocks/FAQAccordion/config.ts`
- Create: `src/blocks/NewsletterSignup/config.ts`
- Create: `src/blocks/ContactForm/config.ts`
- Create: `src/blocks/TestimonialSlider/config.ts`
- Create: `src/blocks/NumberedCardSlider/config.ts`

- [ ] **Step 1: Create FAQAccordion block config**

```ts
// src/blocks/FAQAccordion/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const FAQAccordionBlock: Block = {
  slug: 'faq-accordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 2: Create NewsletterSignup block config**

```ts
// src/blocks/NewsletterSignup/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const NewsletterSignupBlock: Block = {
  slug: 'newsletter-signup',
  labels: { singular: 'Newsletter Signup', plural: 'Newsletter Signups' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Stay in the loop' },
    { name: 'body', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Subscribe' },
    ...blockFields,
  ],
}
```

- [ ] **Step 3: Create ContactForm block config**

```ts
// src/blocks/ContactForm/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const ContactFormBlock: Block = {
  slug: 'contact-form',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Get in touch' },
    { name: 'body', type: 'textarea' },
    ...blockFields,
  ],
}
```

- [ ] **Step 4: Create TestimonialSlider block config**

```ts
// src/blocks/TestimonialSlider/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const TestimonialSliderBlock: Block = {
  slug: 'testimonial-slider',
  labels: { singular: 'Testimonial Slider', plural: 'Testimonial Sliders' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'location', type: 'text' },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 5: Create NumberedCardSlider block config**

```ts
// src/blocks/NumberedCardSlider/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const NumberedCardSliderBlock: Block = {
  slug: 'numbered-card-slider',
  labels: { singular: 'Numbered Card Slider', plural: 'Numbered Card Sliders' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "01"' } },
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 6: Commit**

```bash
git add src/blocks/FAQAccordion/config.ts src/blocks/NewsletterSignup/config.ts src/blocks/ContactForm/config.ts src/blocks/TestimonialSlider/config.ts src/blocks/NumberedCardSlider/config.ts
git commit -m "feat: add interactive block configs"
```

---

## Task 8: Block configs — relational blocks

**Files:**
- Create: `src/blocks/FeaturedProducts/config.ts`
- Create: `src/blocks/PressStrip/config.ts`

- [ ] **Step 1: Create FeaturedProducts block config**

```ts
// src/blocks/FeaturedProducts/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const FeaturedProductsBlock: Block = {
  slug: 'featured-products',
  labels: { singular: 'Featured Products', plural: 'Featured Products Blocks' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Shop the collection' },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Select 2–6 products to feature.' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    ...blockFields,
  ],
}
```

- [ ] **Step 2: Create PressStrip block config**

```ts
// src/blocks/PressStrip/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const PressStripBlock: Block = {
  slug: 'press-strip',
  labels: { singular: 'Press Strip', plural: 'Press Strips' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'As seen in' },
    ...blockFields,
  ],
}
```

Note: PressStrip auto-fetches all `press-mentions` at render time (server component). No CMS selection needed.

- [ ] **Step 3: Commit**

```bash
git add src/blocks/FeaturedProducts/config.ts src/blocks/PressStrip/config.ts
git commit -m "feat: add relational block configs"
```

---

## Task 9: Wire blocks into Pages + Posts + generate types + migration

**Files:**
- Modify: `src/collections/Pages.ts`
- Modify: `src/collections/Posts.ts`

- [ ] **Step 1: Replace Pages.ts with full version including blocks field**

```ts
// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/config'
import { RichTextBlock } from '@/blocks/RichText/config'
import { ImageTextSplitBlock } from '@/blocks/ImageTextSplit/config'
import { ImageGridBlock } from '@/blocks/ImageGrid/config'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/config'
import { LookbookGalleryBlock } from '@/blocks/LookbookGallery/config'
import { EditorialQuoteBlock } from '@/blocks/EditorialQuote/config'
import { PressStripBlock } from '@/blocks/PressStrip/config'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSlider/config'
import { FAQAccordionBlock } from '@/blocks/FAQAccordion/config'
import { NewsletterSignupBlock } from '@/blocks/NewsletterSignup/config'
import { ContactFormBlock } from '@/blocks/ContactForm/config'
import { CTABannerBlock } from '@/blocks/CTABanner/config'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/config'
import { NumberedCardSliderBlock } from '@/blocks/NumberedCardSlider/config'
import { SpacerDividerBlock } from '@/blocks/SpacerDivider/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
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
    drafts: { autosave: { interval: 2000 } },
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
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
        FeaturedProductsBlock, LookbookGalleryBlock, EditorialQuoteBlock,
        PressStripBlock, TestimonialSliderBlock, FAQAccordionBlock,
        NewsletterSignupBlock, ContactFormBlock, CTABannerBlock,
        VideoEmbedBlock, NumberedCardSliderBlock, SpacerDividerBlock,
      ],
    },
  ],
}
```

- [ ] **Step 2: Replace Posts.ts with full version including blocks field**

```ts
// src/collections/Posts.ts
import type { CollectionConfig } from 'payload'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/config'
import { RichTextBlock } from '@/blocks/RichText/config'
import { ImageTextSplitBlock } from '@/blocks/ImageTextSplit/config'
import { ImageGridBlock } from '@/blocks/ImageGrid/config'
import { LookbookGalleryBlock } from '@/blocks/LookbookGallery/config'
import { EditorialQuoteBlock } from '@/blocks/EditorialQuote/config'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSlider/config'
import { CTABannerBlock } from '@/blocks/CTABanner/config'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/config'
import { SpacerDividerBlock } from '@/blocks/SpacerDivider/config'

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
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'blocks',
      type: 'blocks',
      admin: { description: 'Optional sections appended after the main content.' },
      blocks: [
        HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
        LookbookGalleryBlock, EditorialQuoteBlock, TestimonialSliderBlock,
        CTABannerBlock, VideoEmbedBlock, SpacerDividerBlock,
      ],
    },
  ],
}
```

- [ ] **Step 3: Generate TypeScript types**

```bash
pnpm generate:types
```

Expected: `src/payload-types.ts` updated with `HeroHeaderBlock`, `RichTextBlock`, etc. and `Page.blocks` / `Post.blocks` union arrays.

- [ ] **Step 4: Generate importmap**

```bash
pnpm generate:importmap
```

Expected: `src/app/(payload)/admin/importMap.js` regenerated (may be unchanged since we have no custom admin block components).

- [ ] **Step 5: Create DB migration for production**

```bash
pnpm migrate:create
```

Expected: a new file `src/migrations/YYYYMMDD_HHMMSS.ts` created. Commit it so production `pnpm build` can apply it.

- [ ] **Step 6: Commit**

```bash
git add src/collections/Pages.ts src/collections/Posts.ts src/payload-types.ts src/app/(payload)/admin/importMap.js src/migrations/
git commit -m "feat: add blocks field to Pages + Posts, generate types, create migration"
```

---

## Task 10: BlockWrapper + BlockRenderer

**Files:**
- Create: `src/components/blocks/BlockWrapper.tsx`
- Create: `src/components/blocks/BlockRenderer.tsx`

- [ ] **Step 1: Write BlockWrapper**

```tsx
// src/components/blocks/BlockWrapper.tsx
import React from 'react'

type BackgroundData = {
  type?: 'none' | 'color' | 'image' | null
  color?: string | null
  image?: { url?: string | null } | null
} | null | undefined

type Props = {
  children: React.ReactNode
  anchor?: string | null
  padding?: 'sm' | 'md' | 'lg' | null
  background?: BackgroundData
  className?: string
}

const padMap: Record<string, string> = {
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
}

export function BlockWrapper({ children, anchor, padding, background, className = '' }: Props) {
  const padClass = padMap[padding ?? 'md'] ?? 'py-16'

  const style: React.CSSProperties = {}
  if (background?.type === 'color' && background.color) {
    style.backgroundColor = background.color
  } else if (background?.type === 'image' && background.image?.url) {
    style.backgroundImage = `url(${background.image.url})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }

  return (
    <section id={anchor ?? undefined} className={`${padClass} ${className}`} style={style}>
      {children}
    </section>
  )
}
```

- [ ] **Step 2: Write BlockRenderer**

`Page['blocks']` is a union array from `payload-types.ts`. Import the generated `Page` type to pull the union, then map each block to its component.

```tsx
// src/components/blocks/BlockRenderer.tsx
import type { Page } from '@/payload-types'
import { HeroHeaderComponent } from '@/blocks/HeroHeader/Component'
import { RichTextComponent } from '@/blocks/RichText/Component'
import { ImageTextSplitComponent } from '@/blocks/ImageTextSplit/Component'
import { ImageGridComponent } from '@/blocks/ImageGrid/Component'
import { FeaturedProductsComponent } from '@/blocks/FeaturedProducts/Component'
import { LookbookGalleryComponent } from '@/blocks/LookbookGallery/Component'
import { EditorialQuoteComponent } from '@/blocks/EditorialQuote/Component'
import { PressStripComponent } from '@/blocks/PressStrip/Component'
import { TestimonialSliderComponent } from '@/blocks/TestimonialSlider/Component'
import { FAQAccordionComponent } from '@/blocks/FAQAccordion/Component'
import { NewsletterSignupComponent } from '@/blocks/NewsletterSignup/Component'
import { ContactFormComponent } from '@/blocks/ContactForm/Component'
import { CTABannerComponent } from '@/blocks/CTABanner/Component'
import { VideoEmbedComponent } from '@/blocks/VideoEmbed/Component'
import { NumberedCardSliderComponent } from '@/blocks/NumberedCardSlider/Component'
import { SpacerDividerComponent } from '@/blocks/SpacerDivider/Component'

type Block = NonNullable<Page['blocks']>[number]

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero-header':        return <HeroHeaderComponent key={i} {...block} />
          case 'rich-text':          return <RichTextComponent key={i} {...block} />
          case 'image-text-split':   return <ImageTextSplitComponent key={i} {...block} />
          case 'image-grid':         return <ImageGridComponent key={i} {...block} />
          case 'featured-products':  return <FeaturedProductsComponent key={i} {...block} />
          case 'lookbook-gallery':   return <LookbookGalleryComponent key={i} {...block} />
          case 'editorial-quote':    return <EditorialQuoteComponent key={i} {...block} />
          case 'press-strip':        return <PressStripComponent key={i} {...block} />
          case 'testimonial-slider': return <TestimonialSliderComponent key={i} {...block} />
          case 'faq-accordion':      return <FAQAccordionComponent key={i} {...block} />
          case 'newsletter-signup':  return <NewsletterSignupComponent key={i} {...block} />
          case 'contact-form':       return <ContactFormComponent key={i} {...block} />
          case 'cta-banner':         return <CTABannerComponent key={i} {...block} />
          case 'video-embed':        return <VideoEmbedComponent key={i} {...block} />
          case 'numbered-card-slider': return <NumberedCardSliderComponent key={i} {...block} />
          case 'spacer-divider':     return <SpacerDividerComponent key={i} {...block} />
          default:                   return null
        }
      })}
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/BlockWrapper.tsx src/components/blocks/BlockRenderer.tsx
git commit -m "feat: add BlockWrapper and BlockRenderer"
```

---

## Task 11: Block components — text & presentation

**Files:**
- Create: `src/blocks/RichText/Component.tsx`
- Create: `src/blocks/EditorialQuote/Component.tsx`
- Create: `src/blocks/CTABanner/Component.tsx`
- Create: `src/blocks/SpacerDivider/Component.tsx`

- [ ] **Step 1: Create RichText component**

```tsx
// src/blocks/RichText/Component.tsx
import type { RichTextBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function RichTextComponent({ content, anchor, padding, background }: RichTextBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-3xl mx-auto px-6 prose prose-stone">
        <RichText data={content} />
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 2: Create EditorialQuote component**

```tsx
// src/blocks/EditorialQuote/Component.tsx
import type { EditorialQuoteBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function EditorialQuoteComponent({ quote, attribution, anchor, padding, background }: EditorialQuoteBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <blockquote className="text-3xl md:text-4xl font-light italic text-stone-800 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution && (
          <cite className="mt-6 block text-sm text-stone-500 not-italic">— {attribution}</cite>
        )}
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 3: Create CTABanner component**

```tsx
// src/blocks/CTABanner/Component.tsx
import type { CTABannerBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function CTABannerComponent({ heading, body, ctaText, ctaUrl, anchor, padding, background }: CTABannerBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background} className="bg-stone-800 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">{heading}</h2>
        {body && <p className="text-stone-300 mb-8">{body}</p>}
        <a
          href={ctaUrl}
          className="inline-block bg-white text-stone-900 px-8 py-3 text-sm font-medium hover:bg-stone-100 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 4: Create SpacerDivider component**

```tsx
// src/blocks/SpacerDivider/Component.tsx
import type { SpacerDividerBlock } from '@/payload-types'

const sizeMap: Record<string, string> = {
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-32',
}

export function SpacerDividerComponent({ type, size, anchor }: SpacerDividerBlock) {
  if (type === 'divider') {
    return (
      <div id={anchor ?? undefined} className="max-w-6xl mx-auto px-6 py-4">
        <hr className="border-stone-200" />
      </div>
    )
  }
  return <div id={anchor ?? undefined} className={sizeMap[size ?? 'md'] ?? 'h-16'} />
}
```

- [ ] **Step 5: Commit**

```bash
git add src/blocks/RichText/Component.tsx src/blocks/EditorialQuote/Component.tsx src/blocks/CTABanner/Component.tsx src/blocks/SpacerDivider/Component.tsx
git commit -m "feat: add text/presentation block components"
```

---

## Task 12: Block components — media blocks

**Files:**
- Create: `src/blocks/HeroHeader/Component.tsx`
- Create: `src/blocks/ImageTextSplit/Component.tsx`
- Create: `src/blocks/ImageGrid/Component.tsx`
- Create: `src/blocks/LookbookGallery/Component.tsx`
- Create: `src/blocks/VideoEmbed/Component.tsx`

- [ ] **Step 1: Create HeroHeader component**

```tsx
// src/blocks/HeroHeader/Component.tsx
import type { HeroHeaderBlock, Media } from '@/payload-types'
import Image from 'next/image'

const overlayMap: Record<string, string> = {
  none: 'bg-transparent',
  light: 'bg-black/20',
  medium: 'bg-black/40',
  dark: 'bg-black/60',
}

export function HeroHeaderComponent({
  image, heading, subheading, ctaText, ctaUrl, overlayOpacity, anchor,
}: HeroHeaderBlock) {
  const img = typeof image === 'object' ? (image as Media) : null
  const overlay = overlayMap[overlayOpacity ?? 'medium'] ?? 'bg-black/40'

  return (
    <section
      id={anchor ?? undefined}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {img?.url && (
        <Image
          src={img.url}
          alt={img.alt ?? heading}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">{heading}</h1>
        {subheading && (
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">{subheading}</p>
        )}
        {ctaUrl && ctaText && (
          <a
            href={ctaUrl}
            className="inline-block bg-white text-stone-900 px-8 py-3 text-sm font-medium hover:bg-stone-100 transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create ImageTextSplit component**

```tsx
// src/blocks/ImageTextSplit/Component.tsx
import type { ImageTextSplitBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function ImageTextSplitComponent({
  image, imageSide, heading, body, ctaText, ctaUrl, anchor, padding, background,
}: ImageTextSplitBlock) {
  const img = typeof image === 'object' ? (image as Media) : null
  const isRight = imageSide === 'right'

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 relative aspect-square w-full">
          {img?.url && (
            <Image
              src={img.url}
              alt={img.alt ?? heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4 text-stone-900">{heading}</h2>
          {body && (
            <div className="prose prose-stone mb-6">
              <RichText data={body} />
            </div>
          )}
          {ctaUrl && ctaText && (
            <a
              href={ctaUrl}
              className="inline-block border border-stone-900 text-stone-900 px-6 py-2.5 text-sm hover:bg-stone-900 hover:text-white transition-colors"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 3: Create ImageGrid component**

```tsx
// src/blocks/ImageGrid/Component.tsx
import type { ImageGridBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

const colsMap: Record<string, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
}

export function ImageGridComponent({ columns, images, anchor, padding, background }: ImageGridBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid gap-4 ${colsMap[columns ?? '3'] ?? 'grid-cols-3'}`}>
          {images?.map((item, i) => {
            const img = typeof item.image === 'object' ? (item.image as Media) : null
            return (
              <figure key={item.id ?? i}>
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  {img?.url && (
                    <Image
                      src={img.url}
                      alt={img.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-xs text-stone-500 text-center">{item.caption}</figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 4: Create LookbookGallery component**

```tsx
// src/blocks/LookbookGallery/Component.tsx
'use client'
import type { LookbookGalleryBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function LookbookGalleryComponent({ heading, images, lightbox, anchor, padding, background }: LookbookGalleryBlock) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <h2 className="text-2xl font-semibold text-stone-900 mb-8 text-center">{heading}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images?.map((item, i) => {
            const img = typeof item.image === 'object' ? (item.image as Media) : null
            return (
              <figure
                key={item.id ?? i}
                className={`relative aspect-[3/4] overflow-hidden bg-stone-100 ${lightbox ? 'cursor-zoom-in' : ''}`}
                onClick={() => lightbox && setLightboxIndex(i)}
              >
                {img?.url && (
                  <Image
                    src={img.url}
                    alt={img.alt ?? item.caption ?? ''}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                {item.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>

      {lightbox && lightboxIndex !== null && images?.[lightboxIndex] && (() => {
        const img = typeof images[lightboxIndex].image === 'object'
          ? (images[lightboxIndex].image as Media)
          : null
        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>
            {img?.url && (
              <div className="relative max-w-4xl max-h-[90vh] w-full h-full m-4">
                <Image
                  src={img.url}
                  alt={img.alt ?? ''}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}
          </div>
        )
      })()}
    </BlockWrapper>
  )
}
```

- [ ] **Step 5: Create VideoEmbed component**

```tsx
// src/blocks/VideoEmbed/Component.tsx
import type { VideoEmbedBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

function toEmbedUrl(url: string): string {
  // YouTube: https://www.youtube.com/watch?v=ID → https://www.youtube.com/embed/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo: https://vimeo.com/ID → https://player.vimeo.com/video/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  // Anything else (MP4, etc.) returned as-is
  return url
}

function isMp4(url: string): boolean {
  return url.endsWith('.mp4') || url.includes('.mp4?')
}

export function VideoEmbedComponent({ url, caption, anchor, padding, background }: VideoEmbedBlock) {
  const embedUrl = toEmbedUrl(url)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="aspect-video relative bg-stone-100 overflow-hidden">
          {isMp4(url) ? (
            <video src={url} controls className="w-full h-full object-cover" />
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={caption ?? 'Embedded video'}
            />
          )}
        </div>
        {caption && (
          <p className="mt-3 text-sm text-stone-500 text-center">{caption}</p>
        )}
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/blocks/HeroHeader/Component.tsx src/blocks/ImageTextSplit/Component.tsx src/blocks/ImageGrid/Component.tsx src/blocks/LookbookGallery/Component.tsx src/blocks/VideoEmbed/Component.tsx
git commit -m "feat: add media block components"
```

---

## Task 13: Block components — interactive blocks

**Files:**
- Create: `src/blocks/FAQAccordion/Component.tsx`
- Create: `src/blocks/NewsletterSignup/Component.tsx`
- Create: `src/blocks/ContactForm/Component.tsx`
- Create: `src/blocks/TestimonialSlider/Component.tsx`
- Create: `src/blocks/NumberedCardSlider/Component.tsx`

- [ ] **Step 1: Create FAQAccordion component**

```tsx
// src/blocks/FAQAccordion/Component.tsx
'use client'
import type { FAQAccordionBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function FAQAccordionComponent({ heading, items, anchor, padding, background }: FAQAccordionBlock) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-3xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-8">{heading}</h2>}
        <div className="divide-y divide-stone-200">
          {items?.map((item, i) => (
            <div key={item.id ?? i}>
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-stone-900">{item.question}</span>
                <span className="text-stone-400 ml-4 flex-shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-5 text-stone-600 leading-relaxed">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 2: Create NewsletterSignup component**

```tsx
// src/blocks/NewsletterSignup/Component.tsx
'use client'
import type { NewsletterSignupBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function NewsletterSignupComponent({ heading, body, buttonText, anchor, padding, background }: NewsletterSignupBlock) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'block' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-xl mx-auto px-6 text-center">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-3">{heading}</h2>}
        {body && <p className="text-stone-500 mb-6">{body}</p>}
        {status === 'success' ? (
          <p className="text-stone-700">You&rsquo;re subscribed. Thank you!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-stone-900 text-white px-6 py-2.5 text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '…' : (buttonText ?? 'Subscribe')}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 3: Create ContactForm component**

```tsx
// src/blocks/ContactForm/Component.tsx
'use client'
import type { ContactFormBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactFormComponent({ heading, body, anchor, padding, background }: ContactFormBlock) {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-3">{heading}</h2>}
        {body && <p className="text-stone-500 mb-8">{body}</p>}
        {status === 'success' ? (
          <p className="text-stone-700 py-8">Message received — we&rsquo;ll be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  required
                  value={fields.name}
                  onChange={update('name')}
                  className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={fields.email}
                  onChange={update('email')}
                  className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
              <input
                required
                value={fields.subject}
                onChange={update('subject')}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={fields.message}
                onChange={update('message')}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-600 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-stone-900 text-white px-8 py-3 text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 4: Create TestimonialSlider component**

```tsx
// src/blocks/TestimonialSlider/Component.tsx
'use client'
import type { TestimonialSliderBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function TestimonialSliderComponent({ heading, testimonials, anchor, padding, background }: TestimonialSliderBlock) {
  const [index, setIndex] = useState(0)
  const count = testimonials?.length ?? 0

  if (!testimonials || count === 0) return null

  const current = testimonials[index]

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-10">{heading}</h2>}
        <blockquote className="text-xl font-light italic text-stone-700 leading-relaxed mb-6">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <cite className="not-italic text-sm font-medium text-stone-900">
          {current.author}
          {current.location && <span className="text-stone-400 font-normal ml-1">— {current.location}</span>}
        </cite>
        {count > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              ←
            </button>
            <span className="text-xs text-stone-400">{index + 1} / {count}</span>
            <button
              onClick={() => setIndex((i) => (i + 1) % count)}
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 5: Create NumberedCardSlider component**

```tsx
// src/blocks/NumberedCardSlider/Component.tsx
'use client'
import type { NumberedCardSliderBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function NumberedCardSliderComponent({ heading, cards, anchor, padding, background }: NumberedCardSliderBlock) {
  const [index, setIndex] = useState(0)
  const count = cards?.length ?? 0

  if (!cards || count === 0) return null

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-10">{heading}</h2>}
        {/* Desktop: show all as horizontal row */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={card.id ?? i} className="border-t-2 border-stone-200 pt-6">
              <span className="text-3xl font-light text-stone-300 mb-3 block">{card.number}</span>
              <h3 className="text-lg font-medium text-stone-900 mb-2">{card.heading}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
        {/* Mobile: slider */}
        <div className="md:hidden">
          <div className="border-t-2 border-stone-200 pt-6">
            <span className="text-3xl font-light text-stone-300 mb-3 block">{cards[index].number}</span>
            <h3 className="text-lg font-medium text-stone-900 mb-2">{cards[index].heading}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{cards[index].body}</p>
          </div>
          {count > 1 && (
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="text-stone-400 hover:text-stone-900"
              >
                ←
              </button>
              <span className="text-xs text-stone-400">{index + 1} / {count}</span>
              <button
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="text-stone-400 hover:text-stone-900"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/blocks/FAQAccordion/Component.tsx src/blocks/NewsletterSignup/Component.tsx src/blocks/ContactForm/Component.tsx src/blocks/TestimonialSlider/Component.tsx src/blocks/NumberedCardSlider/Component.tsx
git commit -m "feat: add interactive block components"
```

---

## Task 14: Block components — relational blocks

**Files:**
- Create: `src/blocks/FeaturedProducts/Component.tsx`
- Create: `src/blocks/PressStrip/Component.tsx`

- [ ] **Step 1: Create FeaturedProducts component**

```tsx
// src/blocks/FeaturedProducts/Component.tsx
import type { FeaturedProductsBlock, Product, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function FeaturedProductsComponent({ heading, products, anchor, padding, background }: FeaturedProductsBlock) {
  const items = (products as Product[] | null | undefined)?.filter(Boolean) ?? []

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-8">{heading}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const img = product.images?.[0]?.image
            const imgObj = typeof img === 'object' ? (img as Media) : null
            return (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  {imgObj?.url && (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-stone-900">{product.title}</p>
                <p className="text-sm text-stone-500 mt-0.5">{formatPrice(product.basePrice)}</p>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-block border border-stone-900 text-stone-900 px-8 py-3 text-sm hover:bg-stone-900 hover:text-white transition-colors"
          >
            View all products
          </Link>
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 2: Create PressStrip component**

```tsx
// src/blocks/PressStrip/Component.tsx
import type { PressStripBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'
import { getPressMentions } from '@/lib/payload.server'

export async function PressStripComponent({ heading, anchor, padding, background }: PressStripBlock) {
  const mentions = await getPressMentions()

  if (mentions.length === 0) return null

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background} className="bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8 text-center">
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {mentions.map((mention) => {
            const logo = typeof mention.logo === 'object' ? (mention.logo as Media) : null
            return (
              <div key={mention.id} className="flex items-center">
                {logo?.url ? (
                  <a
                    href={mention.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={logo.url}
                      alt={mention.publication}
                      width={120}
                      height={40}
                      className="h-6 w-auto object-contain grayscale"
                    />
                  </a>
                ) : (
                  <a
                    href={mention.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-stone-400 hover:text-stone-700"
                  >
                    {mention.publication}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </BlockWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/blocks/FeaturedProducts/Component.tsx src/blocks/PressStrip/Component.tsx
git commit -m "feat: add relational block components"
```

---

## Task 15: /api/contact route

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Write the failing test first**

```ts
// tests/contact-api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockCreate = vi.fn().mockResolvedValue({ id: 'abc123' })

vi.mock('@/lib/getPayload', () => ({
  getPayload: () => Promise.resolve({ create: mockCreate }),
}))

const { POST } = await import('@/app/api/contact/route')

describe('POST /api/contact', () => {
  beforeEach(() => mockCreate.mockClear())

  it('returns 400 when required fields are missing', async () => {
    const req = new Request('http://test/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice' }),
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
  })

  it('creates a contact submission and returns 200', async () => {
    const req = new Request('http://test/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com',
        subject: 'Hello',
        message: 'Hi there',
      }),
    })
    const res = await POST(req as any)
    expect(res.status).toBe(200)
    expect(mockCreate).toHaveBeenCalledOnce()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'contact-submissions',
        data: expect.objectContaining({ name: 'Alice', email: 'alice@example.com' }),
      }),
    )
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm test tests/contact-api.test.ts
```

Expected: FAIL — `@/app/api/contact/route` not found.

- [ ] **Step 3: Create the route**

```ts
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/getPayload'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { name, email, subject, message } = body
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  const payload = await getPayload()
  await payload.create({
    collection: 'contact-submissions',
    data: { name, email, subject, message, submittedAt: new Date().toISOString() },
  })

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test tests/contact-api.test.ts
```

Expected: 2 passing.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/contact/route.ts tests/contact-api.test.ts
git commit -m "feat: add /api/contact route with tests"
```

---

## Task 16: Home page + catch-all /[slug] route

**Files:**
- Create: `src/app/(storefront)/page.tsx`
- Create: `src/app/(storefront)/[slug]/page.tsx`
- Delete: `src/app/page.tsx`

- [ ] **Step 1: Create (storefront)/page.tsx (home)**

```tsx
// src/app/(storefront)/page.tsx
import { getPage } from '@/lib/payload.server'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Page } from '@/payload-types'

export default async function HomePage() {
  const page = await getPage('home') as Page | null
  if (!page) notFound()

  return <BlockRenderer blocks={page.blocks ?? []} />
}
```

- [ ] **Step 2: Create catch-all [slug] page**

```tsx
// src/app/(storefront)/[slug]/page.tsx
import { getPage } from '@/lib/payload.server'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Page } from '@/payload-types'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string; secret?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug) as Page | null
  if (!page) return {}
  return { title: page.title }
}

export default async function CmsPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { preview, secret } = await searchParams

  const isDraft =
    preview === 'true' && secret === process.env.PAYLOAD_PUBLIC_DRAFT_SECRET

  const page = await getPage(slug, isDraft) as Page | null
  if (!page) notFound()

  return <BlockRenderer blocks={page.blocks ?? []} />
}
```

- [ ] **Step 3: Delete the placeholder root page**

```bash
rm src/app/page.tsx
```

Next.js will now serve `(storefront)/page.tsx` at `/`.

- [ ] **Step 4: Commit**

```bash
git add src/app/(storefront)/page.tsx src/app/(storefront)/[slug]/page.tsx
git rm src/app/page.tsx
git commit -m "feat: add home and catch-all CMS page routes"
```

---

## Task 17: Journal routes

**Files:**
- Create: `src/app/(storefront)/journal/page.tsx`
- Create: `src/app/(storefront)/journal/[slug]/page.tsx`

- [ ] **Step 1: Create journal index**

```tsx
// src/app/(storefront)/journal/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/payload.server'
import type { Media, Post } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Journal — Classical Waves' }

export default async function JournalPage() {
  const posts = await getPosts() as Post[]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-12">Journal</h1>
      {posts.length === 0 ? (
        <p className="text-stone-500">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
            return (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group">
                {hero?.url && (
                  <div className="relative aspect-[4/3] bg-stone-100 mb-4 overflow-hidden">
                    <Image
                      src={hero.url}
                      alt={hero.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <p className="text-xs text-stone-400 mb-1">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : null}
                </p>
                <h2 className="font-medium text-stone-900 group-hover:underline">{post.title}</h2>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-stone-500 line-clamp-2">{post.excerpt}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create journal post detail**

```tsx
// src/app/(storefront)/journal/[slug]/page.tsx
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { getPost } from '@/lib/payload.server'
import { notFound } from 'next/navigation'
import type { Media, Post } from '@/payload-types'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string; secret?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post | null
  if (!post) return {}
  return { title: `${post.title} — Classical Waves`, description: post.excerpt ?? undefined }
}

export default async function PostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { preview, secret } = await searchParams
  const isDraft = preview === 'true' && secret === process.env.PAYLOAD_PUBLIC_DRAFT_SECRET

  const post = await getPost(slug, isDraft) as Post | null
  if (!post) notFound()

  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null

  return (
    <article>
      {hero?.url && (
        <div className="relative h-[50vh] bg-stone-100">
          <Image src={hero.url} alt={hero.alt ?? post.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs text-stone-400 mb-2">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : null}
        </p>
        <h1 className="text-4xl font-semibold text-stone-900 mb-6">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-stone-500 mb-8 border-l-2 border-stone-200 pl-4">{post.excerpt}</p>}
        {post.content && (
          <div className="prose prose-stone max-w-none">
            <RichText data={post.content} />
          </div>
        )}
      </div>
      {post.blocks && post.blocks.length > 0 && (
        <BlockRenderer blocks={post.blocks as any} />
      )}
    </article>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(storefront)/journal/page.tsx "src/app/(storefront)/journal/[slug]/page.tsx"
git commit -m "feat: add journal index and post detail routes"
```

---

## Task 18: Shop routes

**Files:**
- Create: `src/app/(storefront)/shop/page.tsx`
- Create: `src/app/(storefront)/shop/[slug]/page.tsx`

- [ ] **Step 1: Create shop listing page**

```tsx
// src/app/(storefront)/shop/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/payload.server'
import type { Media, Product } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shop — Classical Waves' }

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export default async function ShopPage() {
  const products = await getProducts() as Product[]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-12">Shop</h1>
      {products.length === 0 ? (
        <p className="text-stone-500">Products coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const img = product.images?.[0]?.image
            const imgObj = typeof img === 'object' ? (img as Media) : null
            return (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  {imgObj?.url && (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-stone-900">{product.title}</p>
                <p className="text-sm text-stone-500 mt-0.5">{formatPrice(product.basePrice)}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create product detail page**

```tsx
// src/app/(storefront)/shop/[slug]/page.tsx
'use client'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import type { Media, Product } from '@/payload-types'

// Note: product detail needs client interactivity (variant selection, add to cart).
// Data is fetched via a server action wrapper below.
import { getProductBySlugAction } from './actions'

// ... actually, for simplicity in M2 (cart/Stripe come in M3), render as an RSC:
```

Actually, the product detail page needs variant selection (client state). Since the cart is M3, we'll render the product page as RSC with a simple "Add to Cart" button that will be wired in M3. Use a server component for the page data, and a small client component for variant selection.

Replace the above with:

```tsx
// src/app/(storefront)/shop/[slug]/page.tsx
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/payload.server'
import type { Media, Product } from '@/payload-types'
import type { Metadata } from 'next'
import { ProductVariantSelector } from './VariantSelector'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null
  return product ? { title: `${product.title} — Classical Waves` } : {}
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null
  if (!product) notFound()

  const images = product.images?.map((i) =>
    typeof i.image === 'object' ? (i.image as Media) : null
  ).filter(Boolean) ?? []

  const primaryImg = images[0]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-3">
          {primaryImg?.url && (
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <Image
                src={primaryImg.url}
                alt={primaryImg.alt ?? product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          {images.slice(1).length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.slice(1).map((img, i) =>
                img?.url ? (
                  <div key={i} className="relative aspect-square bg-stone-100 overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 mb-2">{product.title}</h1>
          <p className="text-xl text-stone-700 mb-6">{formatPrice(product.basePrice)}</p>

          <ProductVariantSelector variants={product.variants ?? []} />

          {product.description && (
            <div className="mt-8 prose prose-stone prose-sm">
              <RichText data={product.description} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create VariantSelector client component**

```tsx
// src/app/(storefront)/shop/[slug]/VariantSelector.tsx
'use client'
import type { Product } from '@/payload-types'
import { useState } from 'react'

type Variant = NonNullable<Product['variants']>[number]

export function ProductVariantSelector({ variants }: { variants: Variant[] }) {
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))]
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))]

  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null)
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null)

  const selectedVariant = variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  )

  return (
    <div className="space-y-4">
      {sizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Size</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm border ${
                  selectedSize === size
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 text-stone-700 hover:border-stone-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {colors.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Color</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-sm border ${
                  selectedColor === color
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 text-stone-700 hover:border-stone-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="pt-2">
        {selectedVariant && selectedVariant.inventory <= 0 ? (
          <p className="text-sm text-stone-400 mb-3">Out of stock</p>
        ) : null}
        <button
          disabled={!selectedVariant || selectedVariant.inventory <= 0}
          className="w-full bg-stone-900 text-white py-4 text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add to cart {/* wired in M3 */}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add "src/app/(storefront)/shop/page.tsx" "src/app/(storefront)/shop/[slug]/page.tsx" "src/app/(storefront)/shop/[slug]/VariantSelector.tsx"
git commit -m "feat: add shop listing and product detail routes"
```

---

## Task 19: Block config tests

**Files:**
- Create: `tests/blocks.test.ts`

- [ ] **Step 1: Write block config shape tests**

```ts
// tests/blocks.test.ts
import { describe, it, expect } from 'vitest'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/config'
import { RichTextBlock } from '@/blocks/RichText/config'
import { ImageTextSplitBlock } from '@/blocks/ImageTextSplit/config'
import { ImageGridBlock } from '@/blocks/ImageGrid/config'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/config'
import { LookbookGalleryBlock } from '@/blocks/LookbookGallery/config'
import { EditorialQuoteBlock } from '@/blocks/EditorialQuote/config'
import { PressStripBlock } from '@/blocks/PressStrip/config'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSlider/config'
import { FAQAccordionBlock } from '@/blocks/FAQAccordion/config'
import { NewsletterSignupBlock } from '@/blocks/NewsletterSignup/config'
import { ContactFormBlock } from '@/blocks/ContactForm/config'
import { CTABannerBlock } from '@/blocks/CTABanner/config'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/config'
import { NumberedCardSliderBlock } from '@/blocks/NumberedCardSlider/config'
import { SpacerDividerBlock } from '@/blocks/SpacerDivider/config'

const allBlocks = [
  HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
  FeaturedProductsBlock, LookbookGalleryBlock, EditorialQuoteBlock,
  PressStripBlock, TestimonialSliderBlock, FAQAccordionBlock,
  NewsletterSignupBlock, ContactFormBlock, CTABannerBlock,
  VideoEmbedBlock, NumberedCardSliderBlock, SpacerDividerBlock,
]

describe('block configs', () => {
  it('exports exactly 16 blocks', () => {
    expect(allBlocks).toHaveLength(16)
  })

  it.each(allBlocks.map((b) => [b.slug, b]))(
    '%s has a slug and at least one field',
    (_, block) => {
      expect(typeof block.slug).toBe('string')
      expect(block.slug.length).toBeGreaterThan(0)
      expect(Array.isArray(block.fields)).toBe(true)
      expect(block.fields.length).toBeGreaterThan(0)
    },
  )

  it('all slugs are unique', () => {
    const slugs = allBlocks.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(allBlocks.map((b) => [b.slug, b]))(
    '%s includes the shared anchor field',
    (_, block) => {
      const hasAnchor = block.fields.some(
        (f) => 'name' in f && f.name === 'anchor',
      )
      expect(hasAnchor).toBe(true)
    },
  )
})
```

- [ ] **Step 2: Run block tests**

```bash
pnpm test tests/blocks.test.ts
```

Expected: 35+ assertions passing (16 slug checks + 16 field checks + 16 anchor checks + 2 aggregate).

- [ ] **Step 3: Run full test suite**

```bash
pnpm test
```

Expected: all tests including the existing seed tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/blocks.test.ts
git commit -m "test: add block config shape tests"
```

---

## Task 20: Final verification

- [ ] **Step 1: Type-check the project**

```bash
npx tsc --noEmit
```

Expected: no errors. Fix any type mismatches before continuing.

- [ ] **Step 2: Start the dev server and verify storefront**

```bash
pnpm dev
```

Smoke-test the following URLs in the browser:

| URL | Expected |
|-----|---------|
| `http://localhost:3000/` | Home page with Header + Footer (empty blocks if no CMS content) |
| `http://localhost:3000/admin` | Payload admin — Pages collection shows "Blocks" field with all 16 block types in the picker |
| `http://localhost:3000/shop` | Shop listing (one seed product visible) |
| `http://localhost:3000/shop/sample-linen-shirt` | Product detail with variant selector |
| `http://localhost:3000/journal` | Journal index (empty) |

- [ ] **Step 3: Verify live preview in Payload admin**

1. In admin, open the Home page.
2. Click "Live Preview" in the top bar.
3. Split pane opens with the storefront in an iframe.
4. Add a **Rich Text** block and type text.
5. After autosave (2 seconds), the iframe refreshes and shows the new block.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: M2 complete — storefront, 16-block library, CMS routes, shop, journal"
```

---

## Self-review checklist

**Spec coverage:**

| Requirement | Task |
|-------------|------|
| 16-block library | Tasks 5–8 (configs), Tasks 11–14 (components) |
| Blocks field on Pages | Task 9 |
| Blocks field on Posts | Task 9 |
| Public layout (header + footer from globals) | Tasks 2–3 |
| Catch-all /[slug] CMS route | Task 16 |
| /shop listing | Task 18 |
| /shop/[slug] product detail | Task 18 |
| /journal index | Task 17 |
| /journal/[slug] post detail | Task 17 |
| Live preview | Task 4 (listener), Task 16 (draft param) |
| /api/contact | Task 15 |
| DB migration for production | Task 9 |
| Tests | Tasks 15 (contact API), 19 (block configs) |

**Placeholder scan:** No TBD, TODO, or "similar to" references — confirmed.

**Type consistency:**
- `BlockRenderer` imports `Page['blocks']` union — matches the block slugs in configs.
- `getPressMentions()` used in `PressStripComponent` — defined in `payload.server.ts` Task 1.
- `formatPrice` defined independently in both `FeaturedProductsComponent` and `ShopPage` — intentional (no shared import needed for a one-liner).
