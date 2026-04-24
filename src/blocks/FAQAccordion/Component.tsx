// src/blocks/FAQAccordion/Component.tsx
'use client'
import type { FAQAccordionBlock } from '@/payload-types'
import { useState } from 'react'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

export function FAQAccordionComponent({ heading, items, anchor, padding, background }: FAQAccordionBlock) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-3xl mx-auto px-6">
        {heading && <h2 className="text-2xl font-semibold text-stone-900 mb-8">{heading}</h2>}
        <div className="divide-y divide-stone-200">
          {items?.map((item, i) => (
            <div key={item.id ?? i}>
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-stone-900">{item.question}</span>
                <span className="text-stone-400 ml-4 flex-shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-5 text-stone-600 leading-relaxed">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockWrapper>
  )
}
