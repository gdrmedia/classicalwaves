// src/blocks/FeaturedProducts/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const FeaturedProductsBlock: Block = {
  slug: 'featured-products',
  labels: { singular: 'Featured Products', plural: 'Featured Products Blocks' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Shop the collection' },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Select 2–6 products to feature.' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    ...blockFields,
  ],
}
