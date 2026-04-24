// src/blocks/FeaturedProducts/Component.tsx
import type { FeaturedProductsBlock, Product, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function FeaturedProductsComponent({ heading, products, anchor, padding, background }: FeaturedProductsBlock) {
  const items = (products as Product[] | null | undefined)?.filter(Boolean) ?? []

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-8">{heading}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => {
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
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-block border border-stone-900 text-stone-900 px-8 py-3 text-sm hover:bg-stone-900 hover:text-white transition-colors"
          >
            View all products
          </Link>
        </div>
      </div>
    </BlockWrapper>
  )
}
