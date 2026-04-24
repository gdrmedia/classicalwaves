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
