// src/app/(storefront)/[slug]/page.tsx
import { draftMode } from 'next/headers'
import { getPage, getPressMentions } from '@/lib/payload.server'
import { getServerURL } from '@/lib/getServerURL'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { LivePreviewPage } from '@/components/LivePreviewPage'
import { notFound } from 'next/navigation'
import type { Page, PressMention } from '@/payload-types'
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
  const [page, pressMentions] = await Promise.all([
    getPage(slug, isDraft) as Promise<Page | null>,
    getPressMentions() as Promise<PressMention[]>,
  ])
  if (!page) notFound()

  if (isDraft) {
    const serverURL = await getServerURL()
    return <LivePreviewPage initialData={page} serverURL={serverURL} pressMentions={pressMentions} />
  }

  return <BlockRenderer blocks={page.blocks ?? []} pressMentions={pressMentions} />
}
