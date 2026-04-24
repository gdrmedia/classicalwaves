// src/blocks/LookbookGallery/Component.tsx
'use client'
import type { LookbookGalleryBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function LookbookGalleryComponent({ heading, images, lightbox, anchor, padding, background }: LookbookGalleryBlock) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <h2 className="text-2xl font-semibold text-stone-900 mb-8 text-center">{heading}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images?.map((item, i) => {
            const img = typeof item.image === 'object' ? (item.image as Media) : null
            return (
              <figure
                key={item.id ?? i}
                className={`relative aspect-[3/4] overflow-hidden bg-stone-100 ${lightbox ? 'cursor-zoom-in' : ''}`}
                onClick={() => lightbox && setLightboxIndex(i)}
              >
                {img?.url && (
                  <Image
                    src={img.url}
                    alt={img.alt ?? item.caption ?? ''}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                {item.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>

      {lightbox && lightboxIndex !== null && images?.[lightboxIndex] && (() => {
        const img = typeof images[lightboxIndex].image === 'object'
          ? (images[lightboxIndex].image as Media)
          : null
        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>
            {img?.url && (
              <div className="relative max-w-4xl max-h-[90vh] w-full h-full m-4">
                <Image
                  src={img.url}
                  alt={img.alt ?? ''}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}
          </div>
        )
      })()}
    </BlockWrapper>
  )
}
