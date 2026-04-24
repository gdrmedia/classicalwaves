'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Page, PressMention } from '@/payload-types'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export function LivePreviewPage({
  initialData,
  serverURL,
  pressMentions,
}: {
  initialData: Page
  serverURL: string
  pressMentions: PressMention[]
}) {
  const { data } = useLivePreview<Page>({
    initialData,
    serverURL,
    depth: 2,
  })
  return <BlockRenderer blocks={data.blocks ?? []} pressMentions={pressMentions} />
}
