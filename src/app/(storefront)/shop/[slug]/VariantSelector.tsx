// src/app/(storefront)/shop/[slug]/VariantSelector.tsx
'use client'
import type { Product } from '@/payload-types'
import { useState } from 'react'

type Variant = NonNullable<Product['variants']>[number]

export function ProductVariantSelector({ variants }: { variants: Variant[] }) {
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))]
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))]

  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null)
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null)

  const selectedVariant = variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  )

  return (
    <div className="space-y-4">
      {sizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Size</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm border ${
                  selectedSize === size
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 text-stone-700 hover:border-stone-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {colors.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Color</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-sm border ${
                  selectedColor === color
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 text-stone-700 hover:border-stone-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="pt-2">
        {selectedVariant && selectedVariant.inventory <= 0 ? (
          <p className="text-sm text-stone-400 mb-3">Out of stock</p>
        ) : null}
        <button
          disabled={!selectedVariant || selectedVariant.inventory <= 0}
          className="w-full bg-stone-900 text-white py-4 text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add to cart {/* wired in M3 */}
        </button>
      </div>
    </div>
  )
}
