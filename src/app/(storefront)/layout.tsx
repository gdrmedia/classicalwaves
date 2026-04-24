// src/app/(storefront)/layout.tsx
import { draftMode } from 'next/headers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraft } = await draftMode()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {isDraft && <LivePreviewListener />}
    </div>
  )
}
