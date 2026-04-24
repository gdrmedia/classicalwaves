// src/app/(storefront)/[slug]/page.tsx
import { draftMode } from 'next/headers'
import { getPage } from '@/lib/payload.server'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Page } from '@/payload-types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug) as Page | null
  if (!page) return {}
  return { title: page.title }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()

  const page = await getPage(slug, isDraft) as Page | null
  if (!page) notFound()

  return <BlockRenderer blocks={page.blocks ?? []} />
}
