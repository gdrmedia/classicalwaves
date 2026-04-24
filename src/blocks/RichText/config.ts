// src/blocks/RichText/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blockFields } from '../shared.ts'

export const RichTextBlock: Block = {
  slug: 'rich-text',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    ...blockFields,
  ],
}
