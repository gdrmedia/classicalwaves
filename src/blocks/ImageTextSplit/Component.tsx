// src/blocks/ImageTextSplit/Component.tsx
import type { ImageTextSplitBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function ImageTextSplitComponent({
  image, imageSide, heading, body, ctaText, ctaUrl, anchor, padding, background,
}: ImageTextSplitBlock) {
  const img = typeof image === 'object' ? (image as Media) : null
  const isRight = imageSide === 'right'

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 relative aspect-square w-full">
          {img?.url && (
            <Image
              src={img.url}
              alt={img.alt ?? heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4 text-stone-900">{heading}</h2>
          {body && (
            <div className="prose prose-stone mb-6">
              <RichText data={body} />
            </div>
          )}
          {ctaUrl && ctaText && (
            <a
              href={ctaUrl}
              className="inline-block border border-stone-900 text-stone-900 px-6 py-2.5 text-sm hover:bg-stone-900 hover:text-white transition-colors"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </BlockWrapper>
  )
}
