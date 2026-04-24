// src/blocks/EditorialQuote/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const EditorialQuoteBlock: Block = {
  slug: 'editorial-quote',
  labels: { singular: 'Editorial Quote', plural: 'Editorial Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
    ...blockFields,
  ],
}
