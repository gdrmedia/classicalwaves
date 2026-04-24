// src/blocks/CTABanner/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const CTABannerBlock: Block = {
  slug: 'cta-banner',
  interfaceName: 'CTABannerBlock',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'ctaText', label: 'Button Text', type: 'text', required: true },
    { name: 'ctaUrl', label: 'Button URL', type: 'text', required: true },
    ...blockFields,
  ],
}
