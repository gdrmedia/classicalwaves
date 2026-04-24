// src/blocks/EditorialQuote/Component.tsx
import type { EditorialQuoteBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function EditorialQuoteComponent({ quote, attribution, anchor, padding, background }: EditorialQuoteBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <blockquote className="text-3xl md:text-4xl font-light italic text-stone-800 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution && (
          <cite className="mt-6 block text-sm text-stone-500 not-italic">— {attribution}</cite>
        )}
      </div>
    </BlockWrapper>
  )
}
