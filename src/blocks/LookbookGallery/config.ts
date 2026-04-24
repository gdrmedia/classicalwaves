// src/blocks/LookbookGallery/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const LookbookGalleryBlock: Block = {
  slug: 'lookbook-gallery',
  interfaceName: 'LookbookGalleryBlock',
  labels: { singular: 'Lookbook Gallery', plural: 'Lookbook Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'lightbox', type: 'checkbox', defaultValue: true, label: 'Enable lightbox on click' },
    ...blockFields,
  ],
}
