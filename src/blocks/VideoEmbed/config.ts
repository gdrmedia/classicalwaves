// src/blocks/VideoEmbed/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const VideoEmbedBlock: Block = {
  slug: 'video-embed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube, Vimeo, or direct MP4 URL.' },
    },
    { name: 'caption', type: 'text' },
    ...blockFields,
  ],
}
