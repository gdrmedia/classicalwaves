// src/blocks/NumberedCardSlider/Component.tsx
'use client'
import type { NumberedCardSliderBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function NumberedCardSliderComponent({ heading, cards, anchor, padding, background }: NumberedCardSliderBlock) {
  const [index, setIndex] = useState(0)
  const count = cards?.length ?? 0

  if (!cards || count === 0) return null

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-6xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-10">{heading}</h2>}
        {/* Desktop: show all as horizontal row */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={card.id ?? i} className="border-t-2 border-stone-200 pt-6">
              <span className="text-3xl font-light text-stone-300 mb-3 block">{card.number}</span>
              <h3 className="text-lg font-medium text-stone-900 mb-2">{card.heading}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
        {/* Mobile: slider */}
        <div className="md:hidden">
          <div className="border-t-2 border-stone-200 pt-6">
            <span className="text-3xl font-light text-stone-300 mb-3 block">{cards[index].number}</span>
            <h3 className="text-lg font-medium text-stone-900 mb-2">{cards[index].heading}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{cards[index].body}</p>
          </div>
          {count > 1 && (
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="text-stone-400 hover:text-stone-900"
              >
                ←
              </button>
              <span className="text-xs text-stone-400">{index + 1} / {count}</span>
              <button
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="text-stone-400 hover:text-stone-900"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  )
}
