// src/blocks/CTABanner/Component.tsx
import type { CTABannerBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function CTABannerComponent({ heading, body, ctaText, ctaUrl, anchor, padding, background }: CTABannerBlock) {
  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background} className="bg-stone-800 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">{heading}</h2>
        {body && <p className="text-stone-300 mb-8">{body}</p>}
        <a
          href={ctaUrl}
          className="inline-block bg-white text-stone-900 px-8 py-3 text-sm font-medium hover:bg-stone-100 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </BlockWrapper>
  )
}
