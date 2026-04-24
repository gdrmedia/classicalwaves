// src/blocks/RichText/Component.tsx
import type { RichTextBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function RichTextComponent({ content, anchor, padding, background }: RichTextBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-3xl mx-auto px-6 prose prose-stone">
        <RichText data={content} />
      </div>
    </BlockWrapper>
  )
}
