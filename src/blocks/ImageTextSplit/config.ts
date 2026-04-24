// src/blocks/ImageTextSplit/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blockFields } from '../shared.ts'

export const ImageTextSplitBlock: Block = {
  slug: 'image-text-split',
  interfaceName: 'ImageTextSplitBlock',
  labels: { singular: 'Image + Text Split', plural: 'Image + Text Splits' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'richText', editor: lexicalEditor() },
    { name: 'ctaText', label: 'Button Text', type: 'text' },
    { name: 'ctaUrl', label: 'Button URL', type: 'text' },
    ...blockFields,
  ],
}
