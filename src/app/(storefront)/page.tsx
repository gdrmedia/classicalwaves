// src/app/(storefront)/page.tsx
import { draftMode } from 'next/headers'
import { getPage } from '@/lib/payload.server'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Page } from '@/payload-types'

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const page = await getPage('home', isDraft) as Page | null
  if (!page) notFound()

  return <BlockRenderer blocks={page.blocks ?? []} />
}
