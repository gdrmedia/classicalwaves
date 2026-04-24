// src/app/(storefront)/shop/[slug]/page.tsx
import Image from 'next/image'
import { draftMode } from 'next/headers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/payload.server'
import { getServerURL } from '@/lib/getServerURL'
import { LivePreviewRefresh } from '@/components/LivePreviewRefresh'
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
  const { isEnabled: isDraft } = await draftMode()
  const product = await getProductBySlug(slug, isDraft) as Product | null
  if (!product) notFound()

  const images = product.images?.map((i) =>
    typeof i.image === 'object' ? (i.image as Media) : null
  ).filter(Boolean) ?? []

  const primaryImg = images[0]
  const serverURL = isDraft ? await getServerURL() : null

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {isDraft && serverURL && <LivePreviewRefresh serverURL={serverURL} />}
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
