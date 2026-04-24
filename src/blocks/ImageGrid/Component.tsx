// src/blocks/ImageGrid/Component.tsx
import type { ImageGridBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

const colsMap: Record<string, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
}

export function ImageGridComponent({ columns, images, anchor, padding, background }: ImageGridBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid gap-4 ${colsMap[columns ?? '3'] ?? 'grid-cols-3'}`}>
          {images?.map((item, i) => {
            const img = typeof item.image === 'object' ? (item.image as Media) : null
            return (
              <figure key={item.id ?? i}>
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  {img?.url && (
                    <Image
                      src={img.url}
                      alt={img.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-xs text-stone-500 text-center">{item.caption}</figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>
    </BlockWrapper>
  )
}
