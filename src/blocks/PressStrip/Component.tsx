// src/blocks/PressStrip/Component.tsx
import type { PressStripBlock, Media } from '@/payload-types'
import Image from 'next/image'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'
import { getPressMentions } from '@/lib/payload.server'

export async function PressStripComponent({ heading, anchor, padding, background }: PressStripBlock) {
  const mentions = await getPressMentions()

  if (mentions.length === 0) return null

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background} className="bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        {heading && (
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8 text-center">
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {mentions.map((mention) => {
            const logo = typeof mention.logo === 'object' ? (mention.logo as Media) : null
            return (
              <div key={mention.id} className="flex items-center">
                {logo?.url ? (
                  <a
                    href={mention.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={logo.url}
                      alt={mention.publication}
                      width={120}
                      height={40}
                      className="h-6 w-auto object-contain grayscale"
                    />
                  </a>
                ) : (
                  <a
                    href={mention.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-stone-400 hover:text-stone-700"
                  >
                    {mention.publication}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </BlockWrapper>
  )
}
