// src/blocks/shared.ts
import type { Field } from 'payload'

export const blockFields: Field[] = [
  {
    name: 'anchor',
    label: 'Anchor ID',
    type: 'text',
    admin: { description: 'Optional ID for in-page links, e.g. "about-us".' },
  },
  {
    name: 'padding',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Small (2rem)', value: 'sm' },
      { label: 'Medium (4rem)', value: 'md' },
      { label: 'Large (6rem)', value: 'lg' },
    ],
  },
  {
    name: 'background',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Color', value: 'color' },
          { label: 'Image', value: 'image' },
        ],
      },
      {
        name: 'color',
        type: 'text',
        admin: {
          description: 'CSS color value, e.g. #f5f0eb',
          condition: (_, sibling) => sibling?.type === 'color',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: { condition: (_, sibling) => sibling?.type === 'image' },
      },
    ],
  },
]
