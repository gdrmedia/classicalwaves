// src/components/LivePreviewListener.tsx
'use client'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreviewListener({ serverURL }: { serverURL: string }) {
  const router = useRouter()
  return <RefreshRouteOnSave serverURL={serverURL} refresh={() => router.refresh()} />
}
