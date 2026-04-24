// src/blocks/PressStrip/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const PressStripBlock: Block = {
  slug: 'press-strip',
  interfaceName: 'PressStripBlock',
  labels: { singular: 'Press Strip', plural: 'Press Strips' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'As seen in' },
    ...blockFields,
  ],
}
