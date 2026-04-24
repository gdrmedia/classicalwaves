// src/blocks/NumberedCardSlider/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const NumberedCardSliderBlock: Block = {
  slug: 'numbered-card-slider',
  labels: { singular: 'Numbered Card Slider', plural: 'Numbered Card Sliders' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "01"' } },
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    ...blockFields,
  ],
}
