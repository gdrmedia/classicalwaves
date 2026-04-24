// src/app/(storefront)/shop/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/payload.server'
import type { Media, Product } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shop — Classical Waves' }

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export default async function ShopPage() {
  const products = await getProducts() as Product[]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-12">Shop</h1>
      {products.length === 0 ? (
        <p className="text-stone-500">Products coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const img = product.images?.[0]?.image
            const imgObj = typeof img === 'object' ? (img as Media) : null
            return (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  {imgObj?.url && (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-stone-900">{product.title}</p>
                <p className="text-sm text-stone-500 mt-0.5">{formatPrice(product.basePrice)}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
