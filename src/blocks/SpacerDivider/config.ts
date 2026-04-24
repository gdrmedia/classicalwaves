// src/blocks/SpacerDivider/config.ts
import type { Block } from 'payload'
import { blockFields } from '@/blocks/shared'

export const SpacerDividerBlock: Block = {
  slug: 'spacer-divider',
  labels: { singular: 'Spacer / Divider', plural: 'Spacers & Dividers' },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'spacer',
      options: [
        { label: 'Spacer (blank space)', value: 'spacer' },
        { label: 'Divider (horizontal rule)', value: 'divider' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    ...blockFields,
  ],
}
