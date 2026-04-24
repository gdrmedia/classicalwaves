// src/blocks/ContactForm/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const ContactFormBlock: Block = {
  slug: 'contact-form',
  interfaceName: 'ContactFormBlock',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Get in touch' },
    { name: 'body', type: 'textarea' },
    ...blockFields,
  ],
}
