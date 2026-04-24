// src/blocks/NewsletterSignup/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const NewsletterSignupBlock: Block = {
  slug: 'newsletter-signup',
  labels: { singular: 'Newsletter Signup', plural: 'Newsletter Signups' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Stay in the loop' },
    { name: 'body', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Subscribe' },
    ...blockFields,
  ],
}
