// src/blocks/TestimonialSlider/Component.tsx
'use client'
import type { TestimonialSliderBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function TestimonialSliderComponent({ heading, testimonials, anchor, padding, background }: TestimonialSliderBlock) {
  const [index, setIndex] = useState(0)
  const count = testimonials?.length ?? 0

  if (!testimonials || count === 0) return null

  const current = testimonials[index]

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-10">{heading}</h2>}
        <blockquote className="text-xl font-light italic text-stone-700 leading-relaxed mb-6">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <cite className="not-italic text-sm font-medium text-stone-900">
          {current.author}
          {current.location && <span className="text-stone-400 font-normal ml-1">— {current.location}</span>}
        </cite>
        {count > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              ←
            </button>
            <span className="text-xs text-stone-400">{index + 1} / {count}</span>
            <button
              onClick={() => setIndex((i) => (i + 1) % count)}
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}
