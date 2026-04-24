// src/app/(storefront)/page.tsx
import { draftMode } from 'next/headers'
import { getPage, getPressMentions } from '@/lib/payload.server'
import { getServerURL } from '@/lib/getServerURL'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { LivePreviewPage } from '@/components/LivePreviewPage'
import { notFound } from 'next/navigation'
import type { Page, PressMention } from '@/payload-types'

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode()
  const [page, pressMentions] = await Promise.all([
    getPage('home', isDraft) as Promise<Page | null>,
    getPressMentions() as Promise<PressMention[]>,
  ])
  if (!page) notFound()

  if (isDraft) {
    const serverURL = await getServerURL()
    return <LivePreviewPage initialData={page} serverURL={serverURL} pressMentions={pressMentions} />
  }

  return <BlockRenderer blocks={page.blocks ?? []} pressMentions={pressMentions} />
}
