// src/blocks/FAQAccordion/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const FAQAccordionBlock: Block = {
  slug: 'faq-accordion',
  interfaceName: 'FAQAccordionBlock',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    ...blockFields,
  ],
}
