// src/blocks/HeroHeader/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const HeroHeaderBlock: Block = {
  slug: 'hero-header',
  labels: { singular: 'Hero Header', plural: 'Hero Headers' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'ctaText', label: 'Button Text', type: 'text' },
    { name: 'ctaUrl', label: 'Button URL', type: 'text' },
    {
      name: 'overlayOpacity',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    ...blockFields,
  ],
}
