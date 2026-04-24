// src/blocks/PressStrip/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const PressStripBlock: Block = {
  slug: 'press-strip',
  labels: { singular: 'Press Strip', plural: 'Press Strips' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'As seen in' },
    ...blockFields,
  ],
}
