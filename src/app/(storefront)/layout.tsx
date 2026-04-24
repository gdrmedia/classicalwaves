// src/app/(storefront)/layout.tsx
import { draftMode, headers } from 'next/headers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()

  let serverURL: string | null = null
  if (isDraft) {
    const h = await headers()
    const host = h.get('host')
    const proto = h.get('x-forwarded-proto') ?? 'http'
    serverURL = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {isDraft && serverURL && <LivePreviewListener serverURL={serverURL} />}
    </div>
  )
}
