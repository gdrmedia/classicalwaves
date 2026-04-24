// src/blocks/ImageGrid/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const ImageGridBlock: Block = {
  slug: 'image-grid',
  labels: { singular: 'Image Grid', plural: 'Image Grids' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    ...blockFields,
  ],
}
